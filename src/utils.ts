import { CSSProperties, MutableRefObject, Dispatch, SetStateAction } from "react";
import ReactDOM from "react-dom/client";

export function createShadowRoot<T extends HTMLElement>(
    root: MutableRefObject<HTMLDivElement | null>,
    setReactDomRoot: Dispatch<SetStateAction<ReactDOM.Root | undefined>>,
    shadowRootElement: T
): T | undefined {
    if (root.current !== null && root.current.shadowRoot === null) {
        root.current
            .attachShadow({ mode: "open" })
            .appendChild(shadowRootElement);

        setReactDomRoot(ReactDOM.createRoot(shadowRootElement));

        return shadowRootElement;
    } else {
        return undefined;
    }
}

export function cssPropertiesToString(cssProperties: CSSProperties): string {
    function getCssKey(key: string) {
        const kebabCase = (str: string) => str.replace(new RegExp(/[A-Z]/g), v => `-${v.toLowerCase()}`);
        return kebabCase(key);
    }

    function getCssValue(value: unknown) {
        switch (typeof value) {
            case "string":
                return value.replaceAll("'", "");
            case "number":
                return value.toString();
            default:
                return undefined;
        }
    }

    return Object.entries(cssProperties).reduce((accumulator, entry) => {
        const [key, value] = entry;
        const cssKey = getCssKey(key);
        const cssValue = getCssValue(value);

        return accumulator + (cssValue !== undefined ? `${cssKey}:${cssValue};` : "");
    }, "");
}