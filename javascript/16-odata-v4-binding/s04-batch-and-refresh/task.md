# Stage 4 - Batch groups and refresh

After "Mark completed" runs, the server has the new status - but the screen may still
show the old one, because the app does not magically know the server changed something.
This stage fixes that with a **refresh**, and uses the moment to explain how OData V4
sends requests efficiently in **batches** and **groups**. Together these are the last
pieces of fluent V4 work.

## Why the screen can lag the server

When the action updates the order on the server, the app's copy of that order is now
stale. OData V4 does not poll the server, so it does not notice. You have to tell it to
**re-fetch** the data you know has changed:

```js
oOperation.invoke().then(() => {
    MessageToast.show("Order marked completed");
    this.getView().getBindingContext().refresh();   // re-fetch this order
});
```

**`refresh()`** on the order's context throws away the cached copy and loads it again
from the server, so the bound fields (including `status`) update to the new values. You
refresh the *smallest* thing that changed - here, one order's context - rather than the
whole model, to keep it cheap.

(A more surgical option exists, **`requestSideEffects([...])`**, which refreshes only
named properties - perfect after an action you know touched just the `status`. We use the
simpler full-context `refresh` here; the idea is the same: after a change, pull the truth
back from the server.)

## Batching: many requests, one round trip

Now the efficiency idea that defines V4. The model does **not** fire a separate HTTP call
for every binding and change. It **collects** them and sends them together in a single
**`$batch`** request. So when the list, the detail and a count all need data, that can be
*one* network round trip instead of several - a big win, especially on high-latency
connections.

You control this with **group IDs**:

- **`$auto`** (our model's default `groupId`) - the model automatically bundles together
  everything that happens in the same **tick** (one turn of the browser's event loop -
  effectively "the same instant", before the page next pauses for I/O) into one batch and
  sends it. You get batching for free.
- **Custom / deferred groups** - you can assign requests to a named group and send them
  on demand, which is how an edit form commits several changes together (we use this for
  drafts in the next lesson).

So the mental model for V4 traffic is: **changes and reads accumulate into a group, the
group goes to the server as one `$batch`, and after a change you `refresh` what you need
to see.** You rarely manage this by hand - the `$auto` default does the right thing - but
knowing it explains why V4 apps feel snappy and why a `refresh` is sometimes needed.

## Your coding task

In `Detail.controller.js`, after the action succeeds, **refresh the order's context** so
the screen shows its new status.

## What the check verifies

- After the action, the **context is refreshed** to show the new data.

## End of Lesson 16

You now wield OData V4 on the SAPUI5 side with intent: list bindings with server-side
`$count`, `$orderby` and `$select`; context binding with `$expand` to pull related items
in one request; operation bindings to invoke server actions; and `refresh` plus an
understanding of `$batch` grouping to keep the UI in sync efficiently. The front end is
finally using the real service to its full extent.

In **Lesson 17** we complete the data story with full **CRUD and draft handling** over
V4 - creating orders through a list binding, editing safely with drafts, deleting, and
handling concurrency - the operations a real order-management app lives on.

---

### Where this came from

`Context#refresh`, `requestSideEffects`, `$batch` and group IDs (`$auto`, deferred groups)
follow the SAPUI5 "OData V4 - Batch Control" / "Context API" documentation at
<https://ui5.sap.com/>. From the author's knowledge - verify against the running CAP
service in the browser.
