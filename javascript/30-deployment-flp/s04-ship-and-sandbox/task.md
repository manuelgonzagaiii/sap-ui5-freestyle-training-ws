# Stage 4 - Shipping it: the launchpad sandbox, and the finish line

Everything is ready: registered, navigable, built, deployable. The last step is to actually
**see the app in a launchpad** - and you can, for free, locally, with no SAP system, using
the **FLP sandbox**. This final stage runs our app as a launchpad tile and closes the
JavaScript track.

## The FLP sandbox: a launchpad on your machine

The **sandbox** is a local implementation of the Fiori launchpad shell that UI5 ships for
exactly this - developing and previewing launchpad behaviour without a real FLP. You boot it
from an HTML page (`flpSandbox.html`) that configures the shell and registers your app as a
tile:

```html
<script>
window["sap-ushell-config"] = {
    defaultRenderer: "fiori2",
    applications: {
        "SalesOrder-display": {
            title: "Sales Orders",
            additionalInformation: "SAPUI5.Component=ui5.sales",
            applicationType: "URL",
            url: "../"
        }
    }
};
</script>
<script src=".../sap/ushell/bootstrap/sandbox.js"></script>
<script id="sap-ui-bootstrap" src=".../sap-ui-core.js" data-sap-ui-libs="sap.m, sap.ushell" ...></script>
<script>
    sap.ui.getCore().attachInit(() => sap.ushell.Container.createRenderer().placeAt("content"));
</script>
```

- **`sap-ushell-config`** - configures the sandbox shell and its **applications** (tiles).
- **`additionalInformation: "SAPUI5.Component=ui5.sales"`** - the key line: it registers
  **our component** (`ui5.sales`) as what the `SalesOrder-display` tile launches. The tile's
  intent (stage 1) meets the component here.
- **`sandbox.js`** then `sap-ui-core.js` with `sap.ushell` - bootstraps the local launchpad.
- **`createRenderer().placeAt("content")`** - draws the launchpad.

Open this page and you get a real launchpad home with a **Sales Orders tile**; click it and
the app opens *inside the shell*, with the header, back button, and the cross-app navigation
from stage 2 all live. That is your app, delivered, in its natural habitat - and it cost
nothing but a static file.

## Your coding task

In `flpSandbox.html`, **register the app component** as the tile's target
(`SAPUI5.Component=ui5.sales`).

## What the check verifies (and where you are free)

- There is a **launchpad sandbox configuration** (`sap-ushell-config` + the sandbox
  bootstrap).
- The **app component is registered** as the tile target.
- The tile's title, description and other apps you register are **yours**.

## Run it yourself

Serve the app and open `flpSandbox.html`: a launchpad appears with your Sales Orders tile.
Click it - the app you have built across thirty lessons runs inside a Fiori launchpad, on
your own machine, with no SAP system anywhere. That is the whole delivery story, free and
end to end.

## End of Lesson 30 - and the end of the JavaScript track

Stand back and look at what you have built and learned. You started with an empty folder and
a bootstrap. You now have a complete, professional SAP application - **Sales Order
Management** - and, more importantly, you understand **every layer of it**:

- **Foundations** - bootstrap, MVC, components, the descriptor, controls and layouts.
- **Binding & structure** - models, formatters, expression binding, i18n, routing,
  fragments, dialogs, Fiori layouts, forms and validation.
- **Data** - a mock OData V2 server, then a real **SAP CAP** backend with CDS, SQLite and
  drafts; OData V4 binding, full CRUD, batching, side effects, enterprise tables and value
  help.
- **The advanced corners** - custom controls, theming, flexibility and personalization,
  integration cards, web components, accessibility, and power-user UX.
- **Quality and delivery** - performance, the real testing tools (QUnit, OPA5, wdi5), the
  build pipeline, and shipping to a launchpad.

You did it the hard way - by hand, in a plain editor, with open-source tools - and that is
the point: you now know **what** SAP's generators and IDEs do for you, and **why**, because
you have done it yourself. That is the difference between someone who configures SAP tools
and someone who understands SAPUI5.

Next, the course mirrors this entire journey in **TypeScript** - the same app, the same
reasoning, with types - so you carry these foundations into the language modern SAP
development is moving toward.

---

### Where this came from

The FLP sandbox (`sap-ushell-config`, `sandbox.js`, `SAPUI5.Component` registration,
`createRenderer`) follows the SAPUI5 "Fiori Launchpad Sandbox" and "Bootstrapping from
Content Delivery Network" documentation at <https://ui5.sap.com/>. The sandbox setup is
from the author's knowledge - verify the bootstrap URLs and config for your UI5 version.
