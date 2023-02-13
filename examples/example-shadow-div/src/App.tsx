import { CSSProperties, useState } from "react";
import { ShadowDiv } from "react-shadow-element";
import './App.css';

export default function App() {
    const [flag, setFlag] = useState<boolean>(false);

    return (
        <div className="app">
            <div style={{ backgroundColor: "#555", padding: "0.5em" }}>
                <button onClick={() => setFlag(s => !s)}>Change height</button>
            </div>
            <ShadowDiv
                className="w-100"
                style={{ height: "100%" }}
                DomChildren={DomChildren}
                shadowStyle={{ width: "100%", height: flag ? "100%" : "50%" }}
            >
                <ShadowChildren />
            </ShadowDiv>
        </div>
    );
}

function DomChildren() {
    const date = new Date();

    return (
        <div slot="date">
            <div className="card">
                Today is {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()} at {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}.{date.getMilliseconds()}
            </div>
        </div>
    );
}

function ShadowChildren() {
    const [flag, setFlag] = useState<boolean>(false);
    const baseStyle: CSSProperties = { width: "100%", height: "100%" };

    const backgroundColor = flag ? "#99000055" : "#00990055";

    return (
        <div style={baseStyle}>
            <div style={{ backgroundColor: "#999", padding: "0.5em" }}>
                <button onClick={() => setFlag(s => !s)}>Change background</button>
            </div>
            <div style={{ ...baseStyle, backgroundColor: backgroundColor }}>
                <slot name="date"></slot>
            </div>
        </div>
    );
}
