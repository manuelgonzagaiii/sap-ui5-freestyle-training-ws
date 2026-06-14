# Stage 1 - Two component worlds, and the bridge between them

Everything you have built uses **classic UI5 controls** - `sap.m.Button`, your own
`PriorityIndicator` - loaded by the UI5 loader and rendered by UI5's RenderManager. There
is a *second*, newer family from SAP: **UI5 Web Components**. Knowing what they are, why
they exist, and how to bring one into a freestyle UI5 app is exactly the kind of rare,
boundary-crossing knowledge this phase is about.

## Classic controls vs UI5 Web Components

- **Classic UI5 controls** (`sap.m`, `sap.ui.core`, ...) are tied to the UI5 framework:
  the UI5 loader, bootstrap, models and binding. Brilliant *inside* a UI5 app; they do
  not exist outside it.
- **UI5 Web Components** (`@ui5/webcomponents`) are **standards-based custom elements** -
  real `<ui5-button>`, `<ui5-rating-indicator>` HTML tags built on the browser's Web
  Components standard. They are **framework-agnostic**: the same `<ui5-button>` works in
  React, Angular, Vue, plain HTML - **or** a UI5 app. SAP built them so the Fiori look and
  feel can be used *outside* UI5, on any stack.

So the honest, modern positioning: **UI5 Web Components are primarily for non-UI5
front-ends.** In a UI5 freestyle app you normally use classic controls. But sometimes you
want a specific web component in a UI5 app - and UI5 gives you a clean bridge.

(One thing to know so you are not misled by older projects: SAP once shipped wrapper
libraries `sap.ui.webc.main` / `sap.ui.webc.fiori` that pre-wrapped the web components as
UI5 controls. Those are now **deprecated** - do not start new work on them. The supported,
current way to bring a web component into UI5 is the base class below. This positioning is
from the author's knowledge - verify the current guidance at <https://ui5.sap.com/>.)

## The bridge: `sap.ui.core.webc.WebComponent`

UI5 ships a base class, **`sap.ui.core.webc.WebComponent`**, that wraps any custom element
as a first-class UI5 control - so it binds, fits in aggregations, and behaves like the
controls you know. You extend it and name the **tag**:

```js
sap.ui.define(["sap/ui/core/webc/WebComponent"], (WebComponent) => {
    "use strict";
    return WebComponent.extend("ui5.sales.control.Rating", {
        metadata: {
            tag: "ui5-rating-indicator"
        }
    });
});
```

- **`WebComponent.extend(...)`** - just like `Control.extend` in Lesson 20, but the base
  class renders a **custom element** instead of calling a renderer you write.
- **`metadata.tag`** - the custom-element tag this control wraps (`ui5-rating-indicator`,
  a real `@ui5/webcomponents` element). UI5 renders `<ui5-rating-indicator>` and keeps it
  in sync with the control.

For the tag to actually render, the web component must be loaded - which is why we add
**`@ui5/webcomponents`** as a dependency. (Loading npm ES modules into a classic UI5 app
needs a bundler or a tooling middleware such as `ui5-tooling-modules`; that build setup is
the real-world cost of mixing the two worlds, and we cover what it takes in stage 4. This
stage builds the UI5-side wrapper.)

## Your coding task

In `webapp/control/Rating.js`, set the **`tag`** to the custom element this control wraps
(`ui5-rating-indicator`).

## What the check verifies (and where you are free)

- The wrapper **extends `sap.ui.core.webc.WebComponent`**.
- It declares a **custom-element tag** (a name with a hyphen, as the standard requires).
- **`@ui5/webcomponents`** is a dependency.
- *Which* web component you wrap is your choice - any valid custom-element tag passes.

## Run it yourself

This stage builds the wrapper class and adds the dependency. Seeing the web component on
screen also needs `npm install` and the module middleware (stage 4) - so the live render
comes together at the end of the lesson. For now, confirm the wrapper loads without error.

---

### Where this came from

UI5 Web Components (`@ui5/webcomponents`), the classic-vs-web-component distinction, the
deprecated `sap.ui.webc.*` wrapper libraries, and the `sap.ui.core.webc.WebComponent` base
class follow the SAPUI5 "Web Components" / "Integrating Web Components" documentation at
<https://ui5.sap.com/> and the UI5 Web Components site. The integration details are
version-sensitive and from the author's knowledge - **verify the `WebComponent` base class
and current interop guidance for your UI5 version.**
