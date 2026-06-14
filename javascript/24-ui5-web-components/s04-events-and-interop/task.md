# Stage 4 - Events, theming, and what it really takes to ship

Properties flow *into* a web component; **events** flow *out*. To finish the bridge, the
wrapper must translate the component's native DOM events into UI5 events your controllers
can handle. Then we face the honest part of web-component interop - **theming and the
build setup** - so you know the real cost, not a tutorial fantasy.

## Events: from the web component to your controller

A web component fires native DOM events (`<ui5-rating-indicator>` fires `change` when the
user picks a rating). The wrapper re-exposes them as UI5 events:

```js
metadata: {
    tag: "ui5-rating-indicator",
    properties: { value: { ... }, max: { ... }, readonly: { ... } },
    events: {
        change: {}
    }
}
```

Declaring `change` lets a view attach `change=".onRatingChange"` and a controller handle
it - just like any UI5 control event. The base class listens to the custom element's DOM
event and refires it as the UI5 event, so your controller never touches the DOM. The
bridge is now two-way: **properties in, events out**, both translated.

## The honest part: theming and the build

Mixing web components into a classic UI5 app has real costs you must plan for:

- **Theming.** Web components have **their own** theming system (`@ui5/webcomponents-base`),
  separate from the UI5 theme you set in Lesson 21. To keep them visually consistent you
  must **sync the themes** - tell the web components to use the same Horizon variant UI5
  is using - or the page looks half-light, half-dark. (The sync API is from the author's
  knowledge - verify `@ui5/webcomponents-base` theming against its docs.)
- **The build.** `@ui5/webcomponents` are **npm ES modules**. A classic UI5 app loads AMD
  modules through the UI5 loader, so to use them live you need either a real bundler or a
  tooling middleware such as **`ui5-tooling-modules`** that makes npm ESM importable by
  UI5. That build step - `npm install`, configure the middleware in `ui5.yaml` - is the
  price of admission, and it is why teams weigh whether a single web component is worth it.

So the real decision, which this lesson exists to give you: **in a UI5 app, prefer classic
controls; reach for a wrapped web component only when you specifically need one** that UI5
does not offer - and budget for the theming sync and the build setup when you do. The
web components' real home is non-UI5 front-ends; now you know how to borrow one when it
earns its keep.

## Your coding task

In `webapp/control/Rating.js`, **expose the component's `change` event** as a UI5 event.

## What the check verifies (and where you are free)

- The wrapper **exposes a web-component event** (`change`) as a UI5 event.
- Which events you expose are **yours** - any valid event declaration passes.

## Run it yourself

With `@ui5/webcomponents` installed and the module middleware configured (per the note
above), the wrapped rating renders and, if not read-only, fires `change` into your
controller. You have bridged two component worlds in one app - and you know exactly what
that costs.

## End of Lesson 24

You now understand UI5's two component families and can bring a standards-based web
component into a freestyle app: wrapped with `sap.ui.core.webc.WebComponent`, properties
mapped, used with binding, events exposed - plus a clear-eyed view of the theming and
build realities and the deprecated wrappers to avoid. In **Lesson 25** we make the app
usable by *everyone* - accessibility: ARIA, keyboard fast-navigation, and high-contrast
themes.

---

### Where this came from

Web-component event mapping, the separate `@ui5/webcomponents-base` theming, and the
`ui5-tooling-modules` build requirement follow the SAPUI5 "Web Components - Events" and
the UI5 Web Components documentation, plus the `ui5-tooling-modules` project. These
interop and build details are version-sensitive and from the author's knowledge - **verify
the theming sync and middleware setup against the current docs before relying on them.**
