# Stage 3 - Variants: saving named views

Key-user adaptation reshapes the app for *everyone*. **Variants** are the personal
counterpart: a single user arranges the table the way they like - a filter, a sort, which
columns show - and **saves that arrangement under a name**, then switches between named
"views" with one click. "My open high-priority orders", "Everything this quarter",
"Default". The **`VariantManagement`** control gives you this, and flexibility stores the
variants per user. This stage adds it.

## The VariantManagement control

`sap.ui.fl.variants.VariantManagement` is the little title-with-a-dropdown you see at the
top of standard Fiori list reports - the current variant's name, clickable to switch,
save, or manage variants. You place it and **associate it with the control it manages**:

```xml
<mvc:View ... xmlns:fl="sap.ui.fl.variants" ...>
    ...
    <fl:VariantManagement id="pageVariant" for="ordersTable" />
```

- **`for="ordersTable"`** - the **association** that ties this VariantManagement to our
  table. This is the key line: it tells flexibility *which* control's personalizable
  state (filters, sorts, column layout, and any RTA-style personalization) each saved
  variant captures and restores.
- We put it in the page **heading**, replacing the plain title - because in Fiori the
  **current variant name is the page title**. Selecting a different variant changes both
  the heading and the table's state together.

Saving and loading the variants is handled by `sap.ui.fl` against the USER layer (stage
1) - you declare the control and the association; the framework persists the rest. That
is the recurring theme of this whole lesson: **you wire the control to the data; the
flexibility services do the storage.**

## Your coding task

In `List.view.xml`, complete the `VariantManagement` so it **manages variants for the
orders table** (the `for` association).

## What the check verifies (and where you are free)

- A **`VariantManagement`** control is present.
- It is **associated with the orders table** via `for`.
- The control's id and placement are yours; the check requires only that a
  VariantManagement is wired to the table it manages.

## Run it yourself

The page now shows a variant title ("Standard") with a dropdown. Adjust the table -
search, sort, hide a column via the personalization (next stage) - then open the variant
menu and **Save As** a new name. Switch back to Standard and to your variant: the table's
whole state follows the variant, saved for your next visit.

---

### Where this came from

`sap.ui.fl.variants.VariantManagement`, the `for` association and per-user variant
persistence follow the SAPUI5 "Variant Management" / "Flexibility" documentation and API
Reference at <https://ui5.sap.com/>. The placement is this course's own.
