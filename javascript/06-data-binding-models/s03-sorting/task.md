# Stage 3 - Sorting

A list of orders in random order is hard to scan. Users expect the newest first,
or alphabetical by customer, or grouped by status. UI5 lets you **sort a bound
list without touching the data** - you describe the order you want and the binding
arranges the rows for you. Learning this also introduces the **extended binding
syntax**, a more powerful way to write bindings that you will need again and again.

## Two ways to write a binding

So far our bindings have been the short form: `items="{/salesOrders}"`. That is
fine when all you need is a path. But a binding can carry more than a path - a
sorter, filters, parameters - and for that you switch to the **extended (object)
form**:

```xml
items="{
    path: '/salesOrders',
    sorter: { path: 'orderDate', descending: true }
}"
```

It is the same binding, just written as an object so it has room for extra
settings. `path` is still the collection; `sorter` is the new part. Recognising
that `"{...}"` with a `path:` inside is "a binding with options" is an important
reading skill - you will meet it constantly.

## The Sorter

A **sorter** describes how to order the rows:

- **`path: 'orderDate'`** - the field to sort by.
- **`descending: true`** - largest/latest first (omit it or set `false` for
  ascending).

So `{ path: 'orderDate', descending: true }` means "newest orders at the top." Want
alphabetical customers instead? `{ path: 'customer' }`. The data file never
changes; only the *view* of it does. That separation - data is data, ordering is a
presentation choice - is exactly why binding is worth it.

Sorters can also **group**: add `group: true` and the list shows group headers
(all "Open" orders together, etc.). And you can sort by several fields by giving an
array of sorters. We keep it to one here; the mechanism is the same.

## Where the sorting happens

Because our data is a local `JSONModel`, the sorting happens **in the browser**,
over the array already in memory. Later, with an OData service, the very same
sorter can be sent to the **server** instead, so the database does the ordering and
only the sorted page comes back. You write the sorter once; where it runs depends
on the model. That portability is a deliberate strength of the binding system.

## Your coding task

In `App.view.xml`, the list now uses the extended binding form. Fill in the
**field the sorter sorts by** so the orders show newest first (the `descending`
flag is already set).

## What the check verifies (and where you are free)

- The list binding uses the **extended (object) form** (`path:` inside the
  binding).
- A **sorter** is declared with a non-empty field to sort by. The field is your
  choice - sort by `orderDate`, `customer`, `amount`, whatever makes sense to you -
  as long as it is a real field. That is the rule again: **a valid sort field
  passes; an empty or malformed sorter fails.**

## Run it yourself

```
npx ui5 serve --open index.html
```

The orders are now ordered (newest first, if you sorted by `orderDate descending`).
Try sorting by `customer` instead and reload to see the list rearrange - same data,
different presentation, your call.

---

### Where this came from

`sap.ui.model.Sorter` and the extended binding syntax are documented in the SAPUI5
"Sorting, Grouping, and Filtering" topic and API Reference at
<https://ui5.sap.com/>. The chosen sort is this course's own.
