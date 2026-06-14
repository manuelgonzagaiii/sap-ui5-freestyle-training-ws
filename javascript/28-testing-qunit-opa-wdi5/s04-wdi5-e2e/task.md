# Stage 4 - End-to-end testing with wdi5

QUnit tests a function; OPA5 tests the app in a frame. The top of the pyramid is **wdi5** -
true **end-to-end** tests that drive the app in a **real browser**, over the **real
network**, against the **real backend**, exactly as a user's machine would. It is the
slowest and most realistic layer, and the one that catches what the others cannot. This
final stage writes a wdi5 test and pulls the whole testing story together.

## wdi5: UI5-aware end-to-end

**wdi5** is a UI5 wrapper around **WebdriverIO** (the standard browser-automation tool). Its
superpower is **`browser.asControl`** - select a real control by its UI5 selector (id, view,
type, bindings) and call its **UI5 API** (`getItems`, `getTitle`, `press`) across the wire,
instead of fighting raw DOM:

```js
const { wdi5 } = require("wdio-ui5-service");

describe("Sales Orders - end to end", () => {
    it("shows the orders table with rows", async () => {
        const oTable = await browser.asControl({
            selector: { id: "ordersTable", viewName: "ui5.sales.view.List" }
        });
        const aItems = await oTable.getItems();
        await expect(aItems.length).toBeGreaterThan(0);
    });
});
```

- **`browser.asControl({ selector })`** - find a real UI5 control in the live browser by id
  and view. You then call its actual control methods - this is UI5-aware automation, not
  brittle CSS-selector clicking.
- It runs against a **real, deployed app and backend**, in a real Chrome - the closest a
  test gets to a user. A **`wdio.conf.js`** configures it (the `ui5` service, the spec
  files, the base URL).

(The wdi5 API and config are version-sensitive and from the author's knowledge - verify
`browser.asControl` and the `wdio.conf` shape against the wdi5 docs before relying on them.)

## The testing pyramid - and the grader, one more time

Step back and see the whole strategy:

- **QUnit (unit)** - many, fast, isolated. Functions and formatters. Run constantly.
- **OPA5 (integration)** - fewer, in a frame. User journeys through the app's screens.
- **wdi5 (end-to-end)** - fewest, slowest, most real. The whole stack in a real browser.

Write **many** unit tests, **some** integration journeys, and a **few** end-to-end tests -
that shape (the pyramid) gives the best confidence per second of runtime. SAP's **Test
Recorder** helps author OPA and wdi5 selectors; coverage tools report how much code your
tests exercise.

And the distinction this lesson opened with, now clear: **these tools test the app**;
**the Jest "Check" tests your lessons**. They never mix - in a real project you would not
see Jest at all, you would write QUnit, OPA5 and wdi5. Knowing all three, and which layer
fits which question, is what makes you trusted to ship.

## Your coding task

In `Orders.e2e.js`, **select the orders table** by its id and view
(`browser.asControl({ selector: ... })`).

## What the check verifies (and where you are free)

- The test **drives the real app via wdi5** (`browser.asControl` with a `selector`).
- There is a **wdi5/WebdriverIO config** (the `ui5` service).
- *What* you assert is **yours** - any real wdi5 control interaction passes.

## End of Lesson 28

The app is now testable at every level: QUnit units, OPA5 journeys, and wdi5 end-to-end -
the subject's real testing tools, the pyramid that balances them, and a clear line between
testing the app and grading the course. In **Lesson 29** we turn to the **build**: the UI5
Tooling, custom middleware and tasks, transpilation, and the optimized production bundle.

---

### Where this came from

wdi5 (`browser.asControl`, `wdio.conf.js`, the `ui5` service), WebdriverIO, the testing
pyramid, the Test Recorder and coverage follow the SAPUI5 "Testing" documentation and the
wdi5 project at <https://ui5.sap.com/> and the wdi5 docs. The wdi5 specifics are
version-sensitive and from the author's knowledge - verify before relying on them.
