# Stage 4 - Side effects and concurrency

When you mark an order completed, the server changes its `status` - but maybe also a
"completedOn" date, a total, an audit field you cannot see. Refreshing the *whole* order
to catch those is wasteful; refreshing the wrong fields misses them. OData V4 has a
precise tool for "after this action, re-read exactly these fields": **side effects**. This
final stage of the CRUD lesson swaps our blunt full refresh for a targeted one, and
explains the **concurrency** safety net that protects edits.

## Side effects: refresh only what changed

In Lesson 16 we refreshed the whole order context after the action. **`requestSideEffects`**
is the surgical version: you name the fields (or related entities) that the action might
have changed, and the model re-reads just those:

```js
this.getView().getModel().bindContext("SalesService.setCompleted(...)", oContext)
    .invoke().then(
        () => oContext.requestSideEffects(["status"]),
        () => MessageToast.show("Action failed")
    );
```

- **`requestSideEffects(["status"])`** - "the action changed `status`; please re-fetch
  that from the server." The model issues a tiny request for just that property, and the
  bound `ObjectStatus` updates. You could list several fields, or a whole navigation
  (`"items"`) if the action affected line items.

Why bother over a full `refresh`? On a fat entity with many fields and expands, refreshing
everything after a one-field change is needless traffic. **Side effects let you say
exactly what to re-read**, so the UI stays correct with the least possible work. In real
Fiori apps, services even *declare* their side effects via annotations so the client knows
automatically; calling `requestSideEffects` is the explicit, hand-driven version of the
same idea.

## Concurrency: not overwriting someone else's change

One more thing every multi-user app must handle, and V4 does it for you. Imagine two people
open the same order, and both edit it. Without protection, whoever saves last silently
overwrites the other - a lost update. OData V4 prevents this with **ETags** (optimistic
concurrency):

- Each entity carries an **ETag**, a token that changes whenever the entity changes.
- When you save, the model sends the ETag you originally read. If someone else has changed
  the entity since (so the server's ETag differs), the server **rejects** your save with a
  conflict, instead of clobbering their work.

CAP adds ETags automatically when an entity is annotated for it, and the SAPUI5 V4 model
sends and checks them for you - so you get safe concurrent editing largely for free. The
job left to you is to **handle the conflict gracefully**: catch the rejection, tell the
user "this order changed - please reload", and let them re-apply their edit. Knowing this
exists is what separates a toy CRUD app from one safe for a team.

## Your coding task

In `Detail.controller.js`, change the completed action so that, on success, it refreshes
**only the field the action changed** using `requestSideEffects`.

## What the check verifies

- After the action, **only the changed fields are refreshed**
  (`requestSideEffects([...])`).

## End of Lesson 17

Your app now does full, real CRUD over OData V4 against the CAP backend: it **creates**
orders through the list binding with transient contexts, **edits** them safely in a
deferred group (the draft pattern) with Save and Cancel, **deletes** through the context,
and refreshes precisely with **side effects** - all while V4's **ETag** concurrency keeps
concurrent edits safe. This is the data heart of a genuine order-management application.

In **Lesson 18** we make the *list* itself enterprise-grade: choosing between the
responsive and grid tables, server-side **filtering, sorting and grouping**, growing/paging
for large datasets, and exporting to a spreadsheet - the features users expect when there
are thousands of orders, not eight.

---

### Where this came from

`Context#requestSideEffects` and V4 ETag-based optimistic concurrency follow the SAPUI5
"OData V4 - Side Effects" and "Optimistic Concurrency" documentation at
<https://ui5.sap.com/>; CAP's ETag support is documented at <https://cap.cloud.sap/>.
Verify against the running service.
