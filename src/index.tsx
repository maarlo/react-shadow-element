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
    className?: string,
    children?: JSX.Element,
    shadowChildren: JSX.Element,
}

type ShadowDivProps = ShadowProps & {
    shadowStyle?: CSSProperties,
}

type ShadowRootProps = ShadowProps & {
    reactDomRoot: ReactDOM.Root | undefined,
}

export const Shadow = forwardRef<HTMLDivElement, ShadowProps>((props, ref) => {
    const root = useRef<HTMLDivElement | null>(null);
    const [reactDomRoot, setReactDomRoot] = useState<ReactDOM.Root | undefined>(undefined);

    const setRef = (node: HTMLDivElement | null) => {
        if (ref !== null) {
            typeof ref === "function"
                ? ref(node)
                : ref.current = node;
        }

        root.current = node;
    }

    useEffect(() => {
        createShadowRoot(root, setReactDomRoot, document.createElement("slot"));
    }, []);

    return (
        <ShadowRoot
            {...props}
            ref={setRef}
            reactDomRoot={reactDomRoot}
        />
    );
});

export const ShadowDiv = forwardRef<HTMLDivElement, ShadowDivProps>((props, ref) => {
    const { shadowStyle } = props;

    const root = useRef<HTMLDivElement | null>(null);
    const [reactDomRoot, setReactDomRoot] = useState<ReactDOM.Root | undefined>(undefined);
    const [shadowRootElement, setShadowRootElement] = useState<HTMLDivElement | undefined>(undefined);

    const setRef = (node: HTMLDivElement | null) => {
        if (ref !== null) {
            typeof ref === "function"
                ? ref(node)
                : ref.current = node;
        }

        root.current = node;
    }

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
            ref={setRef}
            reactDomRoot={reactDomRoot}
        />
    );
});

const ShadowRoot = forwardRef<HTMLDivElement, ShadowRootProps>(({ style, className, shadowChildren, children, reactDomRoot }, ref) => {
    useEffect(() => {
        if (reactDomRoot !== undefined) {
            reactDomRoot.render(shadowChildren);
        }
    }, [reactDomRoot, shadowChildren]);

    return (
        <div style={style} className={className} ref={ref}>
            {children}
        </div>
    );
});