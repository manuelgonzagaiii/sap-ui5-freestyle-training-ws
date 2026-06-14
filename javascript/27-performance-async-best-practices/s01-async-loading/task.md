# Stage 1 - Asynchronous loading: the first rule of performance

Phase F is about making the app **production-grade**: fast, tested, built and shipped. We
start with the single most important performance rule in UI5 - **load everything
asynchronously**. It sounds like a checkbox, but understanding *why* it matters, and where
the switches are, is the foundation everything else builds on.

## Why async, and what "sync" costs

When UI5 loads a module **synchronously**, the browser **stops and waits** - it cannot do
anything else until that file arrives. Do that for dozens of modules and the page freezes,
visibly, during startup. **Asynchronous** loading lets the browser fetch many files **in
parallel** and keep working, so the app starts far faster and never blocks the UI thread.

Synchronous loading is not just slow - it is **deprecated and removed** in modern UI5. So
this is both a performance rule and a correctness rule: async is mandatory, and the checks
in this stage enforce it (this is the "rule of law" - async off, where it must be on, is
simply wrong).

## The async switches, and where they live

Async is set in three coordinated places, all of which our app already uses - your job is
to recognise and own them:

- **The bootstrap** (`index.html`): `data-sap-ui-async="true"` - load the core and its
  dependencies asynchronously from the very first byte.
- **The Component** (`Component.js`): the `sap.ui.core.IAsyncContentCreation` interface -
  tells UI5 to create the root view and its content asynchronously.
- **Routing** (`manifest.json`): `"async": true` in the routing config - load each route's
  view asynchronously as the user navigates.

```json
"routing": {
    "config": { "routerClass": "sap.f.routing.Router", ..., "async": true }
}
```

Together these mean **nothing on the critical path blocks**: the core, the component, the
views, the route targets - all loaded in parallel, none freezing the page. This is why the
app felt responsive from Lesson 1; now you know the switches behind it.

## Your coding task

In `manifest.json`, set routing to **load views asynchronously** (`"async": true`).

## What the check verifies

- **Routing is asynchronous** (`async: true`) - enforced, because sync routing is wrong.
- The component declares **async content creation**.
- The **bootstrap is asynchronous**.

## Run it yourself

Open the app with the network tab on "slow" throttling: requests fan out in parallel and
the UI stays responsive while they load, rather than freezing on each one. That is async
loading - invisible when it works, painfully visible when it does not.

---

### Where this came from

Asynchronous loading (`data-sap-ui-async`, `IAsyncContentCreation`, routing `async`), and
the removal of synchronous loading in modern UI5, follow the SAPUI5 "Performance: Speed Up
Your App" and "Is Your Application Ready for Asynchronous Loading?" documentation at
<https://ui5.sap.com/>.
