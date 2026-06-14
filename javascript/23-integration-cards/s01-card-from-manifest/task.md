# Stage 1 - Integration cards: a whole widget from a manifest

Some of the most useful SAP UI is not written as views and controllers at all - it is
described as **data**. An **integration card** is a self-contained widget - a header and
some content - defined entirely by a **JSON manifest**, that can be dropped into a
dashboard, the Fiori launchpad, SAP Build Work Zone, or (as here) any UI5 app. You
describe *what* the card shows; the framework builds it. This lesson teaches cards, and
this stage builds and embeds our first one.

## What a card is, and why it exists

A card answers a recurring need: "show this one slice of information as a tidy,
self-contained tile, the same way, everywhere." Because a card is **just a manifest**, the
same card definition renders identically in an app, a launchpad, or a dashboard - and
non-developers can configure and arrange cards without touching code. That portability is
the whole point.

A card manifest has two namespaces, like the app descriptor you already know:

```json
{
    "sap.app":  { "id": "ui5.sales.cards.orders", "type": "card", "title": "Recent orders" },
    "sap.card": {
        "type": "List",
        "header":  { "title": "Recent orders", "subtitle": "Latest activity" },
        "content": {
            "data": { "json": [ { "name": "Aurora Retail", "status": "Open", "amount": "1250.00 EUR" }, ... ] },
            "maxItems": 5,
            "item": { "title": "{name}", "description": "{status}", "info": { "value": "{amount}" } }
        }
    }
}
```

- **`sap.card/type`** - the card kind. We use **`List`** (a list of items). Stage 3 tours
  the other types.
- **`header`** - the card's title bar.
- **`content/data`** - where the card's data comes from. Here it is **static JSON**
  inline; stage 2 points it at the real OData service.
- **`content/item`** - a **template** for each row, with bindings into the data:
  `title: "{name}"` means "each row's title is its `name` field". This is the same binding
  idea as a UI5 list - one template, repeated per data row.

## Embedding a card in the app

A card is hosted by the **`sap.ui.integration.widgets.Card`** control. We declare the
library, then place the card on the order detail page, pointing it at the manifest file:

```xml
<mvc:View ... xmlns:integration="sap.ui.integration.widgets" ...>
    ...
    <integration:Card manifest="cards/ordersCard.json" width="20rem" height="22rem" />
```

The `Card` control loads the manifest and renders the whole widget for you - you wrote no
list, no items, no renderer, just JSON.

## Your coding task

In `webapp/cards/ordersCard.json`, complete the item template so each row's **title binds
to the `name` field** (`"{name}"`).

## What the check verifies (and where you are free)

- The integration **library is declared**.
- The card is a **List card with an item template** whose title is a **binding**.
- The detail page **embeds the card**.
- The static data, titles and labels are **yours** - any valid List card with a bound
  item template passes.

## Run it yourself

Open an order's detail page and scroll to **Insights**: a card lists the sample orders,
each row built from the manifest's item template. A complete widget, defined as data.

---

### Where this came from

`sap.ui.integration` cards, the `sap.card` manifest (`type`/`header`/`content`/`item`)
and the `Card` widget follow the SAPUI5 "Integration Cards" documentation and Card
Explorer at <https://ui5.sap.com/>. The `manifest` URL resolves relative to the app when
served - verify the card loads in the browser. The sample data is this course's own.
