# React Shadow Element

``React Shadow Element`` provides a ``JSX.Element`` with a Shadow DOM and, optionally, with a Light DOM, allowing the easy usage of named slots.

## Installation

```bash
npm i react-shadow-element
```

## Examples

At **examples** folder there are examples of usage.

## Usage

Two ``JSX.Element`` are exported:

1. **Shadow**: In which the shadow tree root is a ``<slot>``.
2. **ShadowDiv**: In which the shadow tree root is a ``<div>``.

### Shadow

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` |   | Shadow DOM Children Elements. |
| `style` | `CSSProperties` |  `undefined` | Styles of the DOM Root DIV where the Shadow DOM and Light DOM is attached. |
| `className` | `string` | `undefined` | ClassNames of the DOM Root DIV where the Shadow DOM and Light DOM is attached. |
| `DomChildren` | `JSX.Element` | `undefined` | Light DOM Children Elements. |

### ShadowDiv

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `JSX.Element` |   | Shadow DOM Children Elements. |
| `shadowStyle` | `CSSProperties` |  `undefined` | Styles of the Shadow Root DIV where the Shadow DOM is attached. |
| `style` | `CSSProperties` |  `undefined` | Styles of the DOM Root DIV where the Shadow DOM and Light DOM is attached. |
| `className` | `string` | `undefined` | ClassNames of the DOM Root DIV where the Shadow DOM and Light DOM is attached. |
| `DomChildren` | `JSX.Element` | `undefined` | Light DOM Children Elements. |