# Stage 2 - The app descriptor (manifest.json)

In stage 1 we wrote the root view directly into the component's `metadata`. That
works, but it scatters configuration through JavaScript. Real apps keep all their
configuration in one declarative place: a file called **`manifest.json`**, the
app's **descriptor**. This stage moves our config there and is one of the most
important steps in the whole course, because `manifest.json` becomes the heart of
every app you will ever build.

## What is the descriptor, and why does it exist?

Think of `manifest.json` as your application's **ID card and settings panel in one
file**. It answers, in plain data, every "who and what" question about the app:

- Who am I? (a unique id, a title, a version)
- What do I depend on? (which framework libraries, which minimum version)
- How do I start? (which view is the root, which models to create, which routes)

**Why put this in a JSON file instead of in code?** Because configuration that
lives as *data* can be read by things that are not your running app:

- The **UI5 tooling** reads it to build and bundle your app correctly.
- The **Fiori Launchpad** reads it to show your app as a tile and launch it.
- Your **future self** reads it to understand the app's shape in thirty seconds,
  without tracing through JavaScript.

A setting buried in code can only be understood by running the code. A setting in
the descriptor is declared once, in the open, and everyone can read it. That is
why moving config out of `Component.js` and into `manifest.json` is not
busywork - it is the difference between a toy and a real application.

## The three sections

Open `webapp/manifest.json`. A descriptor is organised into namespaced sections.
The three you will use constantly:

- **`sap.app`** - *what the app is*: its `id`, `type`, `title`, `description`,
  version. Identity and human-facing metadata.
- **`sap.ui`** - *how it relates to the UI technology and devices*: that it is a
  UI5 app, which device types it supports.
- **`sap.ui5`** - *how the framework should run it*: the root view, library
  dependencies, models, routing. The most active section for a developer.

In this stage we keep it lean: an `id` and `type` in `sap.app`, and the `rootView`
in `sap.ui5`. We fill in dependencies and metadata in stage 4.

```json
{
  "sap.app": { "id": "ui5.sales", "type": "application" },
  "sap.ui5": {
    "rootView": { "viewName": "ui5.sales.view.App", "type": "XML", "id": "app" }
  }
}
```

The **`id` must match your app's namespace** (`ui5.sales`). It is the unique name
the whole platform uses to identify your app, so it is not a free choice - get it
wrong and the framework looks for your files in the wrong place.

## Telling the Component to use the descriptor

Now the component stops carrying config itself and instead points at the manifest:

```js
metadata: {
    interfaces: ["sap.ui.core.IAsyncContentCreation"],
    manifest: "json"
},

init() {
    UIComponent.prototype.init.apply(this, arguments);
}
```

- **`manifest: "json"`** says "my configuration lives in `manifest.json` next to
  me - go read it." The `rootView` we hard-coded in stage 1 now comes from the
  descriptor instead.
- **`init()`** runs when the component starts. The single most important rule
  here: **always call the parent's `init` first**
  (`UIComponent.prototype.init.apply(this, arguments)`). That parent call is what
  actually reads the manifest and sets the app up. Forget it, and your app
  mysteriously does nothing - a classic beginner trap.

## Your coding task

1. In `manifest.json`, set the **`sap.app.id`** to your app's namespace.
2. In `Component.js`, tell the component to read its configuration **from the
   manifest**.

## What the check verifies (and where you are free)

- `manifest.json` is **valid JSON** (a stray comma or missing quote fails here -
  and a broken descriptor breaks the whole app, so this is strict on purpose).
- `sap.app.id` is **`ui5.sales`** (rule of law - it is the app's identity).
- The descriptor declares the **root view**.
- The component uses **`manifest: "json"`** and **calls the parent `init`**.

There is little free design in this stage - a descriptor is mostly facts that must
be right. The freedom comes back in stage 4, where the title and version are yours.

## Run it yourself

```
npx ui5 serve --open index.html
```

The app looks identical - and that is the point. We changed *where* the
configuration lives, not what it does. From now on, when you need to change how
the app behaves, your first instinct should be: "which part of the manifest is
that?"

---

### Where this came from

The descriptor and `manifest: "json"` follow the official **SAPUI5 Walkthrough,
Step 10 "Descriptor for Applications"** (`UI5/openui5`, `.../walkthrough/10`) and
**`UI5/sample-app`** (`webapp/manifest.json`). The app id and domain are this
course's own choice.
