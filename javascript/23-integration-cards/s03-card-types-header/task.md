# Stage 3 - The card family, and a KPI header

A list is one shape of card. There is a whole family, each for a different job, and the
**header** has its own variants too. This stage gives our card a **numeric (KPI) header** -
a big headline number over the list - and maps out the card types so you can choose the
right one.

## The card types

The `sap.card/type` decides the card's shape:

- **`List`** - a list of items (ours). Good for "recent X", "top Y".
- **`Table`** - rows and columns; more data per item than a list.
- **`Object`** - the details of one entity (labels and values, groups) - like a small
  object page as a card.
- **`Analytical`** - a chart (line, bar, donut) over the data.
- **`Component`** - an escape hatch: a card backed by a full UI5 component when JSON is
  not enough. Powerful, but you are back to writing code, so reach for it last.

The lesson: **pick the type to the data**. A single record - `Object`. A trend -
`Analytical`. A short ranked list - `List`. The manifest changes; the embedding does not.

## A numeric header

Headers also have types. The default shows a title and subtitle; the **`Numeric`** header
adds a **KPI** - a prominent number with a trend and a semantic colour:

```json
"header": {
    "type": "Numeric",
    "title": "Sales orders",
    "subtitle": "Recent activity",
    "mainIndicator": { "number": "12", "unit": "open", "state": "Good" }
}
```

- **`type: "Numeric"`** - switch the header to the KPI variant.
- **`mainIndicator`** - the headline figure: a `number`, a `unit`, and a semantic
  **`state`** (`Good`/`Critical`/`Error`) that colours it. Here it is a fixed number; in a
  real card you would bind it to a value from the card's data (for example a `$count`
  request) - the same binding idea, applied to the header. (Binding the KPI to live data
  is worth verifying against the Card Explorer for your version.)

This is how dashboards get their wall of KPI tiles: each is a card with a numeric header.

## Your coding task

In `webapp/cards/ordersCard.json`, make the header a **numeric (KPI) header**
(`"type": "Numeric"`).

## What the check verifies (and where you are free)

- The card uses a **numeric header** with a **`mainIndicator`**.
- The number, unit and state are **yours** - any valid numeric header passes.

## Run it yourself

The Insights card now leads with a KPI number above the order list - the same content,
now headlined like a dashboard tile. Try switching `type` to `Object` or `Analytical` in
the manifest (with matching content) to feel how one field changes the whole card.

---

### Where this came from

The card type family (`List`/`Table`/`Object`/`Analytical`/`Component`) and the
`Numeric` header with `mainIndicator` follow the SAPUI5 "Integration Cards - Types" and
"Card Header" documentation and Card Explorer at <https://ui5.sap.com/>. Binding the KPI
to live data is from the author's knowledge - verify the exact header-data wiring for your
version.
