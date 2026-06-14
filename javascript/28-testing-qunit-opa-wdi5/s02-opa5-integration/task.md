# Stage 2 - Integration testing with OPA5

Unit tests prove a *piece* works. **Integration tests** prove the *app* works - that a user
can actually do a thing: open the app, see the list, search, navigate. UI5's tool for this
is **OPA5** (One Page Acceptance testing), which drives the **real, running app** the way a
user would, and checks what appears on screen. This stage writes our first OPA5 journey.

## OPA5: testing the app like a user

OPA5 starts your app, performs **actions** (press, type, navigate), and makes **assertions**
about the resulting UI - all asynchronously, **waiting** for controls to appear before
acting (real UIs are async, so the test must be too). A journey reads almost like a
sentence:

```js
sap.ui.define(["sap/ui/test/opaQunit", "sap/ui/test/Opa5"], (opaTest, Opa5) => {
    "use strict";
    Opa5.extendConfig({ autoWait: true, viewNamespace: "ui5.sales.view." });
    QUnit.module("Orders list");

    opaTest("shows the orders table on start", (Given, When, Then) => {
        Given.iStartMyUIComponent({ componentConfig: { name: "ui5.sales" } });
        Then.waitFor({
            id: "ordersTable",
            viewName: "List",
            success: function () { Opa5.assert.ok(true, "The orders table is rendered"); }
        });
        Then.iTeardownMyUIComponent();
    });
});
```

- **`opaTest("...", (Given, When, Then) => {...})`** - one journey. The three parameters are
  the **arrangement** (Given - set up), **actions** (When - do), and **assertions** (Then -
  check). Even when a step is an assertion, the Given/When/Then naming keeps journeys
  readable.
- **`iStartMyUIComponent({ componentConfig: { name: "ui5.sales" } })`** - **boots the whole
  real component** in a test frame. This is integration testing: the actual app, actual
  routing, actual controls.
- **`waitFor({ id, viewName, success, errorMessage })`** - the heart of OPA5: **wait until
  a matching control exists**, then run `success`. If it never appears, `errorMessage` fails
  the test. This waiting is what makes OPA reliable against an async UI.
- **`iTeardownMyUIComponent()`** - shut the app down cleanly after the journey.

## Your coding task

In `OrdersJourney.js`, **start the whole app component** for the test
(`iStartMyUIComponent`).

## What the check verifies

- It is an **OPA5 journey** (`opaTest`, `iStartMyUIComponent`, `iTeardownMyUIComponent`).
- It **waits for UI** and asserts (`waitFor`).

## Run it yourself

OPA journeys run through an integration test page (`test/integration/opaTests.qunit.html`)
in the browser: you watch the real app start in a frame, the test drive it, and each
journey report green or red. (The runner page is part of the test setup - verify it for
your project.)

---

### Where this came from

OPA5 (`opaTest`, `iStartMyUIComponent`, `waitFor`, the Given/When/Then structure) follows
the SAPUI5 "Integration Testing with OPA5" documentation at <https://ui5.sap.com/>. The
journey is this course's own. SAP's **Test Recorder** can generate OPA `waitFor` snippets
by pointing at a running app - worth verifying as a way to bootstrap journeys.
