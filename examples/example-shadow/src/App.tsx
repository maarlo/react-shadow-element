import { CSSProperties, useState } from "react";
import { Shadow } from "react-shadow-element";
import './App.css';

export default function App() {
    return (
        <div className="app">
            <Shadow className="w-100" style={{ height: "100%" }} shadowChildren={<ShadowChildren />} >
                <DomChildren />
            </Shadow>
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
