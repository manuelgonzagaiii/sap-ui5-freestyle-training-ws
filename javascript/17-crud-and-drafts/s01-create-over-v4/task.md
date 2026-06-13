# Stage 1 - Create over OData V4

The "Create" button has been a placeholder since we moved to CAP. Now it works - and
creating data in OData V4 looks different from V2, in a way that is worth
understanding. In V4 you do not call a `create` method on the *model*; you create
**through the list binding**, which hands you a **transient context** that becomes a
real entity once the server accepts it. This stage makes that happen.

## V4 create goes through the list binding

In Lesson 14 (V2) we created with `oModel.create("/SalesOrders", ...)`. OData V4 takes a
more binding-centric approach: the list you are showing *is* the collection, so you ask
**its binding** to create a new entry:

```js
onCreate() {
    const oBinding = this.byId("ordersList").getBinding("items");
    const oContext = oBinding.create({
        orderId: "SO-" + Date.now(), customer: "New customer", status: "Open",
        amount: "0.00", currency: "EUR", orderDate: "2026-01-01", priority: "Medium", itemCount: 1
    });
    oContext.created().then(
        () => MessageToast.show("Order created"),
        () => MessageToast.show("Create failed")
    );
}
```

- **`getBinding("items").create({...})`** - create a new order in the bound collection.
  The new row appears in the list **immediately**, optimistically.

## The transient context

`create` returns a **transient context** - a context for an entity that exists in the
app but **not yet on the server**. It is real enough to bind to (you could open an edit
form on it) but pending. When the model sends it (in the next `$batch`) and the server
accepts it, it becomes a normal, persisted context.

You wait for that with **`created()`**:

```js
oContext.created().then(success, failure);
```

`created()` is a promise that resolves when the new order is **saved on the server**,
or rejects if the server refuses it (a duplicate key, a validation error). So the user
sees the row instantly (optimistic), and you confirm or roll back once the server has
spoken.

The mental model shift from V2: **the collection binding owns creation, and a new
entity starts life as a transient context that the server later makes permanent.** This
is the same binding-first philosophy as the rest of V4 - you work through bindings and
contexts, not through model-level method calls.

## Your coding task

In `List.controller.js`, complete `onCreate` so it **creates a new order through the
list binding** (and awaits the transient context with `created()`).

## What the check verifies

- `onCreate` creates through the **list binding** (not `model.create`).
- It **awaits the transient context** being persisted (`created()`).

## Run it yourself

With both servers running, press **Create**. A new "New customer" order appears in the
list immediately and is saved to CAP; the toast confirms once the server has it. Check
the database via `cds watch` - the order is really there.

> V4 create semantics (transient contexts, `created()`) are precise. The check confirms
> the structure; verify the round trip against the running CAP service.

---

### Where this came from

OData V4 `ODataListBinding#create`, transient contexts and `Context#created` follow the
SAPUI5 "OData V4 - Creating an Entity" documentation at <https://ui5.sap.com/>. From the
author's knowledge - verify against the running service.
