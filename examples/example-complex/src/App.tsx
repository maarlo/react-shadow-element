import { useEffect, useState, Fragment, useCallback } from "react";
import { Shadow } from "react-shadow-element";
import './App.css';

type CardsFunctions = {
    addDiv: () => void
}

type CardsProps = {
    setCardsFunctions: React.Dispatch<React.SetStateAction<CardsFunctions | undefined>>
}

type DomChildProps = {
    id: string
}

type ShadowChildProps = {
    id: string,
    removeDiv: (id: string) => void
}

export default function App() {
    const [cardsFunctions, setCardsFunctions] = useState<CardsFunctions | undefined>(undefined);

    return (
        <div className="app">
            <div style={{ backgroundColor: "#777", padding: "0.5em", marginBottom: "10px" }}>
                <button onClick={() => cardsFunctions?.addDiv()}>Add DIV</button>
            </div>
            <Cards setCardsFunctions={setCardsFunctions} />
        </div>
    );
}

function Cards({ setCardsFunctions }: CardsProps) {
    const [shadowChildren, setShadowChildren] = useState<{ [id: string]: JSX.Element }>({});
    const [domChildren, setDomChildren] = useState<{ [id: string]: JSX.Element }>({});

    const addDiv = useCallback(() => {
        const id = Date.now().toString();

        setShadowChildren(s => ({
            ...s,
            [id]: <ShadowChild id={id} removeDiv={removeDiv} />
        }));

        setDomChildren(s => ({
            ...s,
            [id]: <DomChild id={id} />
        }));
    }, []);

    const removeDiv = (id: string) => {
        const removeProperty = (property: string, { [property]: exclProp, ...restProps }: { [id: string]: JSX.Element }) => restProps;

        setShadowChildren(s => removeProperty(id, s));
        setDomChildren(s => removeProperty(id, s));
    };

    useEffect(() => {
        setCardsFunctions({ addDiv });
    }, [setCardsFunctions, addDiv]);

    return (
        <Shadow
            className="w-100"
            shadowChildren={
                <div style={{ width: "100%", height: "100%" }}>
                    {Object.entries(shadowChildren).map(([id, element]) => (
                        <Fragment key={id}>
                            {element}
                        </Fragment>
                    ))}
                </div>
            }
        >
            <>
                {Object.entries(domChildren).map(([id, element]) => (
                    <Fragment key={id}>
                        {element}
                    </Fragment>
                ))}
            </>
        </Shadow>
    )
}

function ShadowChild({ id, removeDiv }: ShadowChildProps) {
    const [flag, setFlag] = useState<boolean>(false);
    const backgroundColor = flag ? "#99000055" : "#00990055";

    return (
        <div style={{ marginBottom: "10px" }}>
            <div style={{ backgroundColor: "#555", paddingTop: "0.5em", paddingBottom: "0.5em" }}>
                <button style={{ marginRight: "10px" }} onClick={() => setFlag(s => !s)}>Change background color</button>
                <button onClick={() => removeDiv(id)}>Remove</button>
            </div>

            <div style={{ backgroundColor }}>
                <slot name={id} />
            </div>
        </div>
    );
}

function DomChild({ id }: DomChildProps) {
    const date = new Date();

    return (
        <div slot={id}>
            <div className="card">
                Today is {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} at {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}.{date.getMilliseconds()}
            </div>
        </div>
    );
}
