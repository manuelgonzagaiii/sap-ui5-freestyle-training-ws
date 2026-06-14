# Stage 2 - Labelling controls with InvisibleText

`aria-label` is perfect for a string you compute. But often the label you want is **real,
translatable text** that simply should not be *shown* (a table whose purpose is obvious to
a sighted user but not announced to a screen reader). UI5's tool for that is
**`sap.ui.core.InvisibleText`** plus the **`ariaLabelledBy`** association. This stage
labels the orders table the proper way.

## InvisibleText + ariaLabelledBy

The pattern has two parts:

```xml
<core:InvisibleText id="ordersTableLabel" text="{i18n>ordersTableAria}" />
...
<Table id="ordersTable" ariaLabelledBy="ordersTableLabel" ...>
```

- **`InvisibleText`** - renders text into the DOM that is **invisible on screen but read
  by screen readers**. Because it is a normal control bound to i18n, the label is
  **translatable** - a real advantage over a hard-coded `aria-label`.
- **`ariaLabelledBy="ordersTableLabel"`** - an **association** that points the table at
  that text. UI5 turns it into the ARIA `aria-labelledby` attribute, so assistive tech
  announces "Sales orders, sortable table" when focus enters the table.

This is the difference between the two labelling tools:

- **`aria-label`** (stage 1) - a string you provide directly. Good for computed,
  control-internal names.
- **`ariaLabelledBy` + InvisibleText** - point at existing/translatable text. Good for
  labelling standard controls and regions, and for reusing a visible label that lives
  elsewhere.

Most SAP controls expose an `ariaLabelledBy` (and often `ariaDescribedBy`) association for
exactly this. Reaching for it is the idiomatic way to add accessible names in UI5.

## Your coding task

In `List.view.xml`, **label the table for screen readers** by pointing its
`ariaLabelledBy` at the `InvisibleText`.

## What the check verifies

- There is a **hidden label** for the table (`InvisibleText`).
- The table **references it** via `ariaLabelledBy`.

## Run it yourself

With a screen reader on, move focus into the table: it now announces its translatable
purpose. Nothing changed visually - the label exists only for assistive technology, which
is exactly the point.

---

### Where this came from

`sap.ui.core.InvisibleText`, the `ariaLabelledBy`/`ariaDescribedBy` associations, and
their mapping to WAI-ARIA `aria-labelledby` follow the SAPUI5 "Accessibility" and API
Reference documentation at <https://ui5.sap.com/>. The label text is this course's own.
