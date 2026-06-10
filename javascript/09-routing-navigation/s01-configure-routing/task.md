# Stage 1 - Set up the router

Our whole app has lived on one screen. Real apps have many - a list, a detail, a
settings page - and users move between them, bookmark them, and press the browser's
back button expecting it to work. The piece that makes all of that happen is the
**router**. This lesson, the finale of Phase B, turns the app into a proper
**master-detail** application, and it starts here by setting the router up and
moving the list onto it.

## What routing solves

Recall from Lesson 1 that a UI5 app is a **single-page application**: the browser
loads `index.html` once and never does a full page reload. So how do you have
"pages" and a working back button? The answer is the **router**. It watches the part
of the URL after the `#` (the *hash*), and shows the view that matches it:

- `index.html#/` -> the list
- `index.html#/orders/3` -> the detail of order 3

Because the state lives in the URL, **every screen becomes bookmarkable and
shareable**, and the browser's back/forward buttons just work - the router maps each
URL to a view. You declare the mapping once; the framework does the navigation.

## The three parts of routing config

Routing is configured in the manifest under `sap.ui5/routing`, in three parts:

```json
"routing": {
    "config": {
        "routerClass": "sap.m.routing.Router",
        "viewType": "XML",
        "path": "ui5.sales.view",
        "controlId": "app",
        "controlAggregation": "pages"
    },
    "routes": [
        { "name": "list", "pattern": "", "target": "list" }
    ],
    "targets": {
        "list": { "id": "list", "name": "List" }
    }
}
```

- **`config`** - shared settings. The important two: **`controlId: "app"`** and
  **`controlAggregation: "pages"`** tell the router *where* to put views - into the
  `pages` aggregation of the control with id `app`. That control is a `NavContainer`
  (an `sap.m.App`), which is built to hold pages and animate between them.
- **`routes`** - the URL-to-target map. A **`pattern`** of `""` means "the default,
  empty URL," so the `list` route is what shows when the app first opens.
- **`targets`** - what each route displays. The `list` target loads the `List` view
  (from the `path`).

## The App shell and starting the router

Two small wiring steps make it run:

- **The root view becomes a shell.** `App.view.xml` is now just
  `<App id="app" />` - an empty `NavContainer` with the id the router places views
  into. It holds no content of its own; the router fills it.
- **The Component starts the router.** In `Component.js`, after the parent `init`,
  we call `this.getRouter().initialize()`. That reads the config and displays the
  view matching the current URL. Forget this call and you get a blank app and a
  very confusing afternoon.

The list itself moved out of `App.view.xml` and into its own **`List.view.xml`**
(with a `List.controller.js`) - the router's `list` target. The app looks the same,
but the list is now a *routed page* instead of the whole app.

## Your coding task

1. In `Component.js`, **start the router** after the parent `init`.
2. In `manifest.json`, set the **`controlId`** so the router knows which control to
   place pages into.

## What the check verifies

- The Component **starts the router** (`getRouter().initialize()`).
- The routing config targets the **App control** (`controlId: "app"`,
  `controlAggregation: "pages"`).
- A default **`list`** route (empty pattern) shows the list view.
- The root view is the **App shell** that hosts routed pages.

This is rule-of-law wiring - routing either connects or it does not - but understand
the shape: a control to host pages, a Component that starts the router, and a
route-to-target map in the manifest.

## Run it yourself

```
npx ui5 serve --open index.html
```

The list appears exactly as before - but look at the URL: it now carries a hash.
The list is being shown *by the router*, which is the foundation for everything in
the rest of this lesson.

---

### Where this came from

`sap.m.routing.Router`, the manifest `routing` block and `getRouter().initialize()`
follow the official **SAPUI5 Walkthrough** ("Routing and Navigation" steps) and
`UI5/sample-app` at <https://ui5.sap.com/>. The route design is this course's own.
