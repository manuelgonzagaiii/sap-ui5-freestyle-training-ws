# Stage 3 - Declarative component bootstrap

We have a component, and a small piece of JavaScript (`index.js`) whose only job
is to start it. In this short stage we remove that JavaScript entirely and let the
HTML start the component declaratively. The result is the exact setup the official
SAP sample app uses, and it teaches a principle worth absorbing: **prefer
declaring what you want over writing code to make it happen.**

## Two ways to start a component

You have already seen the **programmatic** way - `index.js` creates a
`ComponentContainer` by hand:

```js
new ComponentContainer({ name: "ui5.sales", ... }).placeAt("content");
```

The **declarative** way says the same thing with no JavaScript at all. The
bootstrap loads a small helper, `ComponentSupport`, and you describe the component
you want as an HTML element:

```html
<script ... data-sap-ui-onInit="module:sap/ui/core/ComponentSupport"></script>
...
<body class="sapUiBody" id="content">
    <div data-sap-ui-component data-name="ui5.sales" data-id="container"
         data-settings='{ "id": "sales" }'></div>
</body>
```

Read it like a sentence: "on start-up, run `ComponentSupport`; it finds the
element marked `data-sap-ui-component`, reads its `data-name`, and creates that
component for me." No container to construct, no `placeAt` to call.

## Why is declarative the better default?

- **Less code is less to get wrong.** There is no `index.js` to maintain, no
  chance of a typo in container-creation logic.
- **It states intent, not mechanism.** The HTML says *what* the page contains (a
  `ui5.sales` component); it does not spell out *how* to build it. That is easier
  to read and harder to break.
- **It is what the official sample app and tooling expect.** The canonical
  `UI5/sample-app` boots exactly this way. Following the standard means generators,
  guides and teammates all recognise your setup instantly.

This mirrors the bigger lesson of this whole chapter: we keep moving configuration
*out* of imperative JavaScript and *into* declarative places - the view (XML), the
descriptor (`manifest.json`), and now the bootstrap (HTML). Each move makes the
app easier to read and to tool.

## About `index.js`

Once the component starts declaratively, **`index.js` has no job left**. We have
emptied it (and left a note saying so); you could delete it without consequence.
Seeing a file become unnecessary is itself a small lesson: good refactoring often
*removes* code, and an app you understand is one where every remaining file earns
its place.

## Your coding task

In `webapp/index.html`, fill in the blank so the bootstrap starts your app the
declarative way:

1. Point `data-sap-ui-onInit` at the **component bootstrapper module**
   (`module:sap/ui/core/ComponentSupport`).

The `<div data-sap-ui-component ...>` element that names your component is already
in the page body - read it and make sure you understand what each `data-` attribute
is telling the framework.

## What the check verifies

- The bootstrap's `onInit` runs **`module:sap/ui/core/ComponentSupport`**.
- The page contains a **`data-sap-ui-component`** element whose **`data-name`** is
  your component, `ui5.sales`.

Both are rule-of-law here: this is wiring that must be exact, or the app never
starts. There is no design choice to make in this stage - just a cleaner, more
modern way to do something you already understood.

## Run it yourself

```
npx ui5 serve --open index.html
```

Same app, started a cleaner way - and now with one fewer file to worry about.

---

### Where this came from

`ComponentSupport` and the declarative component element follow the official
**SAPUI5 Walkthrough, Step 10** (`UI5/openui5`, `.../walkthrough/10`, see
`index.html`) and **`UI5/sample-app`** (`webapp/index.html`).
