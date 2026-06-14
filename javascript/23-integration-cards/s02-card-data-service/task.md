# Stage 2 - Feeding a card from the real service

Our card shows hard-coded sample data. Real cards show **live** data, and a card fetches
it **itself**, declaratively, straight from a service - no controller, no model wiring.
This stage points the card at the CAP OData service it has been ignoring next door.

## The `data` section: a card fetches its own data

Swap the inline `json` for a **`request`**:

```json
"content": {
    "data": {
        "request": {
            "url": "/odata/v4/sales/SalesOrders",
            "parameters": { "$top": "5", "$orderby": "orderDate desc", "$select": "customer,status,amount,currency" }
        },
        "path": "/value"
    },
    "item": { "title": "{customer}", "description": "{status}", "info": { "value": "{amount} {currency}" } }
}
```

- **`request.url`** - the card issues this HTTP request when it loads. We point it at the
  same `/odata/v4/sales/SalesOrders` endpoint the app uses, with OData query options
  (`$top`, `$orderby`, `$select`) right in the manifest - server-side trimming, declared
  as data.
- **`path: "/value"`** - where in the response the rows are. OData V4 wraps a collection
  as `{ "value": [ ... ] }`, so the items live at `/value`. (For a different API you would
  point `path` at wherever its array sits.)
- The **item template** now binds to real fields (`{customer}`, `{status}`,
  `{amount} {currency}`).

The striking part: a card is a **self-contained data consumer**. It knows how to call a
service, page it, and bind the result - all from JSON. That is what lets the same card run
in a launchpad with no host code: it does not depend on the app around it for data.

## Your coding task

In `webapp/cards/ordersCard.json`, set the request **url** so the card **fetches orders
from the live OData service** (`/odata/v4/sales/SalesOrders`).

## What the check verifies (and where you are free)

- The card **requests its data** from the OData service (url under `/odata/v4/sales/`).
- It reads the **OData V4 result array** (`path: "/value"`).
- The query options and which fields you bind are **yours** - any request to the service
  with the right result path passes.

## Run it yourself

With `cds watch` running, reopen the detail page: the Insights card now lists **real**
orders, newest first, fetched by the card itself from CAP. Add an order in the app and
reload - the card shows it. No model, no controller; the manifest did it all.

---

### Where this came from

The card `data/request` section, manifest-level OData query parameters, and the `/value`
result path for OData V4 follow the SAPUI5 "Integration Cards - Data" documentation and
Card Explorer at <https://ui5.sap.com/>, plus the OData V4 response shape from Lesson 16.
Verify the card's request against the running CAP service.
