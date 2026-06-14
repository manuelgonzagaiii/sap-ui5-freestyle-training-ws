# Stage 2 - Mapping the web component's properties

A bare wrapper renders the element but cannot configure it. To make
`<ui5-rating-indicator>` useful, we expose its attributes - `value`, `max`, `readonly` -
as **UI5 properties** on the wrapper. Then they bind, set and update exactly like any UI5
control property. This is the heart of the bridge: translating between two property
systems.

## Declaring mapped properties

In the wrapper's metadata, each property you declare becomes a UI5 property **and** is
mapped onto the web component:

```js
metadata: {
    tag: "ui5-rating-indicator",
    properties: {
        value:    { type: "float",   defaultValue: 0,     mapping: "property" },
        max:      { type: "int",     defaultValue: 5,     mapping: "property" },
        readonly: { type: "boolean", defaultValue: false, mapping: "property" }
    }
}
```

- **`type`** - the UI5 type (`float`, `int`, `boolean`, `string`), giving you typed,
  bindable getters and setters just like Lesson 20.
- **`mapping: "property"`** - tells the base class to push this value onto the **DOM
  property** of the custom element. When UI5 `value` changes, the wrapper sets the
  `value` property on `<ui5-rating-indicator>`, and the component re-renders itself.

The mental model: **the wrapper is a translator.** UI5 binding sets a UI5 property; the
`mapping` forwards it to the web component's own property; the component reacts. You
declare the dictionary once, and the two worlds stay in sync.

## Your coding task

In `webapp/control/Rating.js`, expose the rating's **`value`** as a mapped UI5 property
(a `float`, mapped to the component's `property`).

## What the check verifies (and where you are free)

- The wrapper **maps properties** to UI5 properties, including **`value`** with a type.
- Which properties you expose and their defaults are **yours** - any valid mapped
  property declaration passes.

## Run it yourself

Still assembling - the wrapper now has a configurable, bindable `value` (and `max`,
`readonly`). Stage 3 binds it to live order data; stage 4 completes the build setup so it
renders.

---

### Where this came from

The `WebComponent` metadata `properties` with `mapping`, and mapping UI5 property types
onto custom-element DOM properties, follow the SAPUI5 "Web Components - Properties"
documentation at <https://ui5.sap.com/>. The exact `mapping` options are version-sensitive
and from the author's knowledge - verify against the API Reference.
