# Stage 1 - The Component and its root view

At the end of Lesson 1 our whole app lived in one file, building its UI by hand
with `new` and `placeAt`. That is fine for a demo and hopeless for a real app.
In this lesson we give the application a proper backbone. The first piece of that
backbone is the **Component**, and meeting it means meeting the pattern the entire
SAPUI5 world is organised around: **MVC**.

## The idea: Model-View-Controller

MVC is just a way of splitting an app into three jobs so they do not tangle:

- **Model** - the data (your products, orders, customers).
- **View** - what the user sees (the screens and controls).
- **Controller** - the logic that connects them (what happens when the user acts).

Keeping these separate is what lets an app grow to dozens of screens without
turning into spaghetti. You change how something *looks* without touching the
logic, and change the logic without touching the look. We meet controllers
properly in Lesson 3; this stage is about the view, and the thing that owns it.

## What is a Component, and why does every real app have one?

A **Component** is a self-contained, reusable bundle that *is* your application:
its UI, its configuration, its dependencies, all wrapped up behind one entry
point. Think of it as the app's front door.

Why bother, instead of just placing controls like we did in Lesson 1?

- **It can be loaded anywhere.** A component can run standalone, be embedded in
  another app, or be placed as a tile in the Fiori Launchpad - without changing a
  line of its code. That portability is the whole point.
- **It owns its setup.** Models, routing, dependencies and configuration all hang
  off the component in one predictable place, instead of being scattered across
  `index.js`.
- **It is the standard.** Every modern UI5 app is a component. Tooling, testing
  and the Launchpad all assume it. Building an app without one is swimming against
  the entire framework.

Our component is `webapp/Component.js`. It **extends** `sap.ui.core.UIComponent`,
the base class that provides all this machinery:

```js
return UIComponent.extend("ui5.sales.Component", {
    metadata: {
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
        rootView: {
            viewName: "ui5.sales.view.App",
            type: "XML",
            id: "app"
        }
    }
});
```

- **`rootView`** tells the component which view to show first - the top of the UI
  tree. We point it at `ui5.sales.view.App`, which the namespace mapping resolves
  to `webapp/view/App.view.xml`.
- **`IAsyncContentCreation`** is an *interface* the component declares it supports.
  It is the "always async" rule from Lesson 1, applied here: it lets the framework
  build the view asynchronously. Declaring it is current best practice; leaving it
  off forces older, slower synchronous behaviour.

## The view: describing UI instead of building it

Open `webapp/view/App.view.xml`. This is the same `App` + `Page` + `Button` from
Lesson 1, but written **declaratively** as XML instead of assembled in JavaScript:

```xml
<mvc:View xmlns="sap.m" xmlns:mvc="sap.ui.core.mvc" displayBlock="true">
    <App>
        <Page title="Sales Orders">
            <Button text="Say hello" />
        </Page>
    </App>
</mvc:View>
```

The two `xmlns` lines are **namespaces**: `xmlns="sap.m"` means "plain tags like
`<App>` and `<Page>` come from the `sap.m` library", and `xmlns:mvc` brings in the
view tag itself. This XML *is* the control tree - the framework reads it and
creates the same controls you would have written by hand, but now the structure
is something you can see at a glance. (We explore view types and controllers in
depth in Lesson 3; here we just need a face for the component to show.)

You will notice the button no longer does anything when clicked. That is on
purpose: wiring an event in a view needs a **controller**, which is the very next
lesson. We are restructuring first, then restoring behaviour the right way.

## Starting the component

Something still has to put the component on the page. That is the
`ComponentContainer` in `webapp/index.js`:

```js
new ComponentContainer({
    name: "ui5.sales",
    settings: { id: "sales" },
    async: true
}).placeAt("content");
```

It loads the component named `ui5.sales` and renders it into our `content`
element. (In stage 3 we replace even this small piece of JavaScript with a
declarative one-liner in the HTML.)

## Your coding task

1. In `Component.js`, fill in the **base class** the component extends and the
   **name of the root view** it should display.
2. In `App.view.xml`, give the `Page` a **title**.

## What the check verifies (and where you are free)

- The component **extends `UIComponent`** and declares a **`rootView` pointing at
  `ui5.sales.view.App`** (rule of law - a wrong name means a blank app).
- It declares **`IAsyncContentCreation`** (best practice).
- The view is an XML view containing an `App` and a `Page`.
- The page title is **non-empty** - the exact wording is **your choice**.
- `index.js` starts the component via a `ComponentContainer` named `ui5.sales`.

## Run it yourself

```
npx ui5 serve --open index.html
```

You should see the same titled page as before - but now it is produced by a real
component showing a real view, which is the structure every screen we add from
here will plug into.

---

### Where this came from

The Component, `rootView` and `ComponentContainer` follow the official **SAPUI5
Walkthrough, Step 9 "Component Configuration"** (`UI5/openui5`,
`.../walkthrough/09`) and the canonical **`UI5/sample-app`** (`webapp/Component.js`,
`webapp/view/App.view.xml`). The `ui5.sales` namespace and the Sales Order domain
are this course's own choice.
