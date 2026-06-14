# Stage 3 - Page objects: readable, reusable journeys

Inline `waitFor` blocks work, but as journeys grow they repeat the same selectors and turn
into noise. **Page objects** fix this: you give each screen a small vocabulary of named
**actions** and **assertions**, and journeys read like plain English. This is the standard
way real OPA5 suites are organised, and this stage refactors ours into it.

## Defining a page object

`Opa5.createPageObjects` registers, per screen, a set of `actions` (things a user does) and
`assertions` (things you check) - each a method wrapping a `waitFor`:

```js
Opa5.createPageObjects({
    onTheOrdersList: {
        actions: {
            iSearchForCustomer: function (sQuery) {
                return this.waitFor({
                    controlType: "sap.m.SearchField",
                    actions: function (oSearchField) { oSearchField.fireSearch({ query: sQuery }); }
                });
            }
        },
        assertions: {
            iShouldSeeTheOrdersTable: function () {
                return this.waitFor({
                    id: "ordersTable", viewName: "List",
                    success: function () { Opa5.assert.ok(true, "The orders table is visible"); }
                });
            }
        }
    }
});
```

- **`onTheOrdersList`** - the page object's name. Journeys reach it as `When.onTheOrdersList`
  and `Then.onTheOrdersList`.
- **`actions`** - reusable user actions (search, press, navigate), each a `waitFor` that
  *does* something.
- **`assertions`** - reusable checks, each a `waitFor` whose `success` asserts.

Now the journey is just a sentence:

```js
When.onTheOrdersList.iSearchForCustomer("Aurora");
Then.onTheOrdersList.iShouldSeeTheOrdersTable();
```

The payoff: **selectors live in one place** (change the table id once, every journey still
works), and journeys describe *behaviour*, not DOM. This separation - intent in journeys,
mechanics in page objects - is what keeps a large test suite maintainable.

## Your coding task

In `pages/OrdersList.js`, complete the assertion's `waitFor` so it **waits for the orders
table** by its id and view.

## What the check verifies (and where you are free)

- A **page object with `actions` and `assertions`** is defined.
- The **journey uses the page object**.
- Which actions and assertions you define, and their names, are **yours** - any valid page
  object the journey uses passes.

## Run it yourself

Run the integration test page: the journey now reads as `iSearchForCustomer` then
`iShouldSeeTheOrdersTable`, and the mechanics sit in the page object. Add a second journey
and you reuse the same vocabulary - the point of page objects.

---

### Where this came from

`Opa5.createPageObjects`, the `actions`/`assertions` structure and the page-object pattern
follow the SAPUI5 "Integration Testing with OPA5 - Page Objects" documentation at
<https://ui5.sap.com/>. The page object is this course's own.
