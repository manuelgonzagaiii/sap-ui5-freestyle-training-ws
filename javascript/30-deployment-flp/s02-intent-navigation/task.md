# Stage 2 - Navigating between apps by intent

The launchpad's real power is that apps **navigate to each other** - from a sales order to
the customer who placed it, from an invoice to its order - **without knowing each other's
URLs**. They navigate by **intent** (the semantic object + action from stage 1), and the
launchpad resolves which app, in which system, actually serves it. This stage adds a jump
from our order list to a (hypothetical) customer app.

## Intent-based navigation

Instead of `window.location = "https://.../customerApp"`, you ask the launchpad's
**CrossApplicationNavigation** service to go to an **intent**:

```js
onOpenCustomerApp() {
    sap.ushell.Container.getServiceAsync("CrossApplicationNavigation").then((oCrossApp) => {
        oCrossApp.toExternal({ target: { semanticObject: "Customer", action: "display" } });
    });
}
```

- **`sap.ushell.Container.getServiceAsync("CrossApplicationNavigation")`** - get the
  launchpad's navigation service (available when the app runs inside an FLP or the sandbox).
- **`toExternal({ target: { semanticObject, action } })`** - navigate to the **intent**
  `Customer-display`. The launchpad finds *whatever app* is registered for that intent (its
  inbound, stage 1) and opens it - you never name a URL or an app.

Why this matters: **the navigating app is decoupled from the target.** If the customer app
moves, gets replaced, or differs per system, your code is unchanged - it asks for the
*intent*, and the launchpad resolves it. This is the same decoupling idea as the EventBus
(Lesson 20) and integration card actions (Lesson 23), now at the **app-to-app** level. It
is how a landscape of hundreds of Fiori apps navigates coherently.

(This service lives in `sap.ushell`, present in a launchpad or the sandbox - so it works in
stage 4's sandbox, not in the bare `ui5 serve`. The exact service name is version-sensitive;
a newer unified `Navigation` service also exists - from the author's knowledge, verify
`CrossApplicationNavigation` vs `Navigation` for your platform.)

## Your coding task

In `List.controller.js`, set the **intent of the app to open** - the customer app's
semantic object and action.

## What the check verifies (and where you are free)

- It **navigates by intent** through the launchpad service (`toExternal` with a semantic
  object).
- A control **triggers** the navigation.
- The target intent is **yours** - any valid `semanticObject`/`action` passes.

## Run it yourself

In stage 4's launchpad sandbox, click **Customers**: the launchpad resolves the
`Customer-display` intent. (With no customer app registered it reports "cannot navigate" -
register one, and the same code opens it. That is intent resolution at work.)

---

### Where this came from

`sap.ushell` `CrossApplicationNavigation` (`getServiceAsync`, `toExternal`) and intent-based
navigation follow the SAPUI5 "Navigation" / "Cross Application Navigation" documentation at
<https://ui5.sap.com/>. The service is launchpad-only and version-sensitive - from the
author's knowledge; verify for your platform.
