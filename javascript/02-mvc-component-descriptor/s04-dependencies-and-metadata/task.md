# Stage 4 - Dependencies and app metadata

Our descriptor is minimal: just an id and a root view. In this stage we fill it
out into a real app descriptor by declaring the app's **identity** (title,
description, version), its **device support and density**, and - most
importantly - its **library dependencies**. By the end you will understand why the
manifest, not the bootstrap, is the proper home for "what this app needs", and the
"democratic but lawful" checking returns in full: your title is yours, but a
version number must be a real version.

## Declaring dependencies (and why here, not in the bootstrap)

Back in Lesson 1 we loaded `sap.m` in the HTML bootstrap with
`data-sap-ui-libs="sap.m"`. That was fine to get started, but the proper place to
declare what your app depends on is the descriptor:

```json
"sap.ui5": {
  "dependencies": {
    "minUI5Version": "1.120.0",
    "libs": {
      "sap.ui.core": {},
      "sap.m": {}
    }
  }
}
```

Why is the manifest the better home for this?

- **The framework can load smarter.** Declared here, your dependencies become part
  of the component's definition, so UI5 can preload them efficiently as a unit
  instead of discovering them as it goes.
- **It is honest and complete.** Anyone (or any tool) can see the app's full
  dependency list in one place, the same way a `package.json` lists a Node
  project's dependencies.
- **`minUI5Version`** records the **oldest framework version your app is allowed to
  run on**. It protects your users: if someone tries to run the app on an older
  runtime that lacks a feature you rely on, the framework can warn instead of
  failing in a confusing way. It must be a real version number.

## App identity and device behaviour

The rest of the descriptor describes the app to humans and to host environments:

```json
"sap.app": {
  "id": "ui5.sales",
  "type": "application",
  "title": "Sales Order Management",
  "description": "Manage products, sales orders and customers",
  "applicationVersion": { "version": "1.0.0" }
},
"sap.ui": {
  "technology": "UI5",
  "deviceTypes": { "desktop": true, "tablet": true, "phone": true }
},
"sap.ui5": {
  "contentDensities": { "compact": true, "cozy": true }
}
```

- **`title` and `description`** are what a user sees - on a Launchpad tile, in a
  browser tab, in app listings. These are genuinely **yours to write**.
- **`applicationVersion.version`** is your app's own version (not the framework's),
  written as a normal three-part version like `1.0.0`. You bump it as you ship
  changes.
- **`deviceTypes`** declares that this app is built to run on desktop, tablet and
  phone - a promise the responsive `sap.m` controls help you keep.
- **`contentDensities`** declares that the app supports both **Cozy** (roomy,
  touch-friendly spacing) and **Compact** (denser, mouse-and-keyboard spacing).
  UI5 picks the right one for the device. Supporting both is standard for a
  business app that runs on phones *and* desktops.

## Your coding task

In `webapp/manifest.json`, fill in:

1. The app's **title** - the human-facing name.
2. The **`minUI5Version`** - the minimum framework version the app supports.

## What the check verifies (and where you are free)

This stage is the "democratic but lawful" rule in action:

- **Free:** the **title** can be anything non-empty. `Sales Order Management`,
  `Orders`, your company's name - all pass. It is your app's name to choose.
- **Rule of law:** the **`applicationVersion.version`** must look like a real
  version (`1.0.0`), and **`minUI5Version`** must be a valid version number. A
  word like `latest` or a typo fails, because an invalid version is simply wrong.
- **Rule of law:** **`sap.m`** must be declared as a library dependency - the app
  is built from its controls.

So two learners can ship completely different titles and both pass; neither can
ship a nonsense version and pass. That is the boundary this course holds: free in
design, strict on validity.

## Run it, and look at what you built

```
npx ui5 serve --open index.html
```

Open the **UI5 Diagnostics** (Ctrl/Cmd + Shift + Alt + S) and find the **App**
information - you will see your declared version, libraries and the active content
density, all coming straight from the descriptor you just wrote.

## End of Lesson 2

Your app is now a proper, portable **Component** described by a complete
**manifest.json**, started declaratively, with its dependencies and identity all
in one readable place. This is the exact skeleton of every professional UI5 app.

In **Lesson 3** we bring the app back to life: we add **controllers**, restore the
button's behaviour the right way, learn the view lifecycle, and feed the view real
data. The structure is in place; now we make it *do* things.

---

### Where this came from

The descriptor structure (dependencies, `minUI5Version`, `sap.app`, `sap.ui`,
`contentDensities`) follows the official **SAPUI5 Walkthrough, Step 10** and the
**`UI5/sample-app`** `manifest.json`. The chosen versions, title and description
are this course's own values - check <https://ui5.sap.com/> for current versions.
