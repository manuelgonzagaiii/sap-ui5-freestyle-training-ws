# Stage 4 - Filtering and search

Eight orders fit on a screen; eight hundred do not. Real users find what they need
by **searching and filtering**. UI5 filters a bound list the same way it sorts one:
you describe *which* rows you want, and the binding shows only those - the data is
never touched. In this stage you add a search field that filters the orders by
customer as the user types, and you meet the **`Filter`** object that powers every
filtered list in SAP software.

## The Filter object

A **`Filter`** describes a condition a row must meet to be shown. The common form
takes three parts:

```js
new Filter("customer", FilterOperator.Contains, "atlas")
```

- **`"customer"`** - the field to test.
- **`FilterOperator.Contains`** - how to test it. The operators are an enum:
  `Contains`, `EQ` (equals), `GT`/`LT` (greater/less than), `BT` (between),
  `StartsWith`, and more.
- **`"atlas"`** - the value to compare against.

Read together: "keep orders whose `customer` contains 'atlas'." Pick a different
operator and you get a different question - `EQ` for an exact match, `GT` for
amounts over a threshold, and so on. Choosing the right operator is part of
designing a good search.

## Applying filters to a binding

A search field hands you the user's query; you turn it into filters and apply them
to the list's **items binding**:

```js
onSearch(oEvent) {
    const sQuery = oEvent.getParameter("query");
    const aFilters = sQuery
        ? [new Filter("customer", FilterOperator.Contains, sQuery)]
        : [];
    this.byId("ordersList").getBinding("items").filter(aFilters);
}
```

- **`getBinding("items")`** reaches the live binding behind the list's `items`
  aggregation - the object that actually manages which rows show.
- **`.filter(aFilters)`** applies your conditions. Pass an **empty array** to clear
  the filter and show everything again - which is exactly what we do when the search
  box is emptied, so the user can get back to the full list.

You can pass **several** filters at once (an array), to combine conditions - search
text *and* a status, say. The same `filter` call handles one or many.

## Sorting and filtering are the same idea

Notice the symmetry with last stage: sorting changes the *order* of the rows,
filtering changes *which* rows appear, and both are instructions you give the
binding rather than changes to the data. And both are portable: against a
`JSONModel` they run in the browser; against an OData service the very same
`Filter` is sent to the server so the database does the work and only matching rows
travel back. Learn the object once, use it everywhere.

## Your coding task

In `App.controller.js`'s `onSearch`, build the filter so it keeps orders whose
**customer** field **contains** the search text:

1. The **field** to filter on.
2. The **operator** that matches text containing the query.

The `SearchField` is already wired to `onSearch`, and the result is already applied
to the list binding.

## What the check verifies (and where you are free)

- A `SearchField` is wired to a search handler.
- The handler builds a **`Filter`** with a **`FilterOperator`** and applies it to
  the list binding with `.filter(...)`.

Which field and operator you choose is a design decision - search customers with
`Contains`, or filter by exact `status` with `EQ` - as long as you build a valid
`Filter`. Rule of law: a real filter applied to the binding. Freedom: what you let
the user search for.

## End of Lesson 6

Your Sales Orders app now has a beating heart. It loads real data from a model
declared in the manifest, renders a list from a template with aggregation binding,
shows a selected order through element binding, sorts the rows, and filters them
from a search field. Every one of these is binding doing the heavy lifting, with
your code only *describing* what you want - which is the entire promise of UI5.

In **Lesson 7** we make that data look professional: **formatters and expression
binding** to turn a raw `"Open"` into a coloured status, a bare `1250.5` into a
tidy figure, and a date string into something a human wants to read.

---

### Where this came from

`sap.ui.model.Filter`, `FilterOperator` and applying filters to a binding follow
the SAPUI5 "Sorting, Grouping, and Filtering" topic and the official `UI5/sample-app`
(`webapp/controller/App.controller.js`, which filters a todo list the same way) at
<https://ui5.sap.com/>. The search design is this course's own.
