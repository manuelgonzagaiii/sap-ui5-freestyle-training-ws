# Stage 4 - Create over OData V2

Reading from a server is half the story; real apps also **write** to it. In this
stage the "Create" button actually creates a new sales order through the OData model.
You will see how writing to OData differs from changing a JSON object - it is a
request to a server that can succeed or fail - and meet the **change lifecycle** that
governs every create, update and delete you will ever do over OData.

## Writing is a request, not an assignment

With the JSON model, "adding an order" was just pushing onto an array - instant, local,
and it could never fail. Over OData, creating an order is a **request to a server**:
it travels the network, the server validates and stores it, and it can come back with
success **or** an error (a duplicate key, a validation failure, a lost connection).
Your code has to handle both outcomes. That is not a burden - it is honesty about what
is really happening, and it is why server-backed apps are robust.

## `create` on the OData V2 model

The V2 model gives you `create`, `update` and `remove` for the three write
operations. Creating an order:

```js
onCreate() {
    this.getView().getModel().create("/SalesOrders", {
        orderId: "SO-" + Date.now(),
        customer: "New customer",
        status: "Open",
        amount: "0.00",
        currency: "EUR",
        orderDate: "2026-01-01",
        priority: "Medium",
        itemCount: 1
    }, {
        success: () => MessageToast.show("Order created"),
        error: () => MessageToast.show("Create failed")
    });
}
```

- **`create("/SalesOrders", oData, { success, error })`** - "create this entity in the
  `SalesOrders` set." The data object matches the entity's properties from the
  metadata.
- **`success` / `error`** - the two outcomes. You confirm to the user on success and
  warn on failure. (Right now we send placeholder values; in a real app you would read
  them from the form you built in Lesson 13 and submit those.)

After a successful create, the model **refreshes the affected bindings automatically**,
so the new order appears in the list with no extra code from you.

## The change lifecycle: batching and `$batch`

There is one more idea that defines OData writes, and it is worth knowing even though
the model handles it: **changes are batched**. The V2 model collects your changes and
sends them together in a single **`$batch`** request, rather than one HTTP call per
change. This is more efficient and lets several changes succeed or fail as a unit.

- By default the model can **auto-submit** after a change (what we rely on here).
- You can also work in **deferred groups**: make several changes, then call
  `submitChanges()` once to send them all in a batch (and `resetChanges()` to discard).
  This is how an edit form with many fields commits everything in one go.

So the mental model for any OData write is: **make the change, let it batch, handle
the server's answer.** Create, update and delete all follow this same shape - learn it
once here, and the next lessons (V4 CRUD and drafts) are variations on the theme.

## Your coding task

In `List.controller.js`, complete `onCreate` so it **creates a new order in the
`SalesOrders` entity set** through the OData model (the success/error handlers are
already there).

## What the check verifies

- `onCreate` **creates a `SalesOrder`** through the OData model
  (`getModel().create("/SalesOrders", ...)`).
- It **handles success and error** of the request.

## End of Lesson 14

Your app is no longer reading a static file - it is a real OData client. It loads
orders over the protocol, searches and sorts on the server, addresses single orders by
their key for stable deep links, and creates new orders with proper success/error
handling - all against a mock server that behaves like the real thing.

In **Lesson 15** we replace the mock with a *genuine* backend: **SAP CAP** with
**SQLite** - SAP's own framework, free to run locally - serving real **OData V4**. You
will define the data model in CDS, run the server locally, and point this same app at
it. The frontend you have built will barely change; it will simply be talking to a
real server at last.

---

### Where this came from

`ODataModel.create`, success/error handlers and the `$batch`/deferred-group change
model follow the SAPUI5 "OData V2 Model" documentation and API Reference at
<https://ui5.sap.com/>. The create flow is this course's own; verify it against the
mock server in the browser.
