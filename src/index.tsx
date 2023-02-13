import { CSSProperties, forwardRef, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createShadowRoot, cssPropertiesToString } from "./utils";

export function isShadowRootSupported() {
    return typeof window !== "undefined"
        && window.Element
        && Object.prototype.hasOwnProperty.call(window.Element, "attachShadow");
}

type ShadowProps = {
    style?: CSSProperties,
    DomChildren?: () => JSX.Element,
    children: JSX.Element,
}

type ShadowDivProps = ShadowProps & {
    shadowStyle?: CSSProperties,
}

type ShadowRootProps = ShadowProps & {
    reactDomRoot: ReactDOM.Root | undefined,
}

export function Shadow(props: ShadowProps) {
    const root = useRef<HTMLDivElement | null>(null);
    const [reactDomRoot, setReactDomRoot] = useState<ReactDOM.Root | undefined>(undefined);

    useEffect(() => {
        createShadowRoot(root, setReactDomRoot, document.createElement("slot"));
    }, []);

    return (
        <ShadowRoot
            {...props}
            ref={root}
            reactDomRoot={reactDomRoot}
        />
    );
}

export function ShadowDiv(props: ShadowDivProps) {
    const { shadowStyle } = props;

    const root = useRef<HTMLDivElement | null>(null);
    const [reactDomRoot, setReactDomRoot] = useState<ReactDOM.Root | undefined>(undefined);
    const [shadowRootElement, setShadowRootElement] = useState<HTMLDivElement | undefined>(undefined);

    useEffect(() => {
        const shadowRootElement = createShadowRoot(root, setReactDomRoot, document.createElement("div"));
        if (shadowRootElement !== undefined) {
            setShadowRootElement(shadowRootElement);
        }
    }, []);

    useEffect(() => {
        if (shadowRootElement !== undefined && shadowStyle !== undefined) {
            shadowRootElement.style.cssText = cssPropertiesToString(shadowStyle);
        }
    }, [shadowRootElement, shadowStyle]);

    return (
        <ShadowRoot
            {...props}
            ref={root}
            reactDomRoot={reactDomRoot}
        />
    );
}

const ShadowRoot = forwardRef<HTMLDivElement, ShadowRootProps>(({ style, DomChildren, children, reactDomRoot }, ref) => {
    useEffect(() => {
        if (reactDomRoot !== undefined) {
            reactDomRoot.render(children);
        }
    }, [reactDomRoot, children]);

    return (
        <div style={style} ref={ref}>
            {DomChildren !== undefined ? (
                <DomChildren />
            ) : undefined}
        </div>
    );
});