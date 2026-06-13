# Stage 2 - Editing with a deferred group

Creating is one operation; **editing** is the one users do most. A naive edit saves
every keystroke straight to the server, which is chatty and gives no "Cancel". The
professional pattern - and the foundation of **drafts** - is to **collect edits and send
them together** only when the user saves, with a clean Cancel that throws them away. In
OData V4 you get this with **deferred update groups**. This stage makes the order detail
editable the right way.

## The problem with saving immediately

By default our model uses the `$auto` group, which sends changes as they happen. For a
display that is fine, but for an edit form it is wrong: there is no moment of "commit",
no way to abandon a half-finished change, and a flurry of requests as the user types.
What we want is a buffer: edits accumulate, then go to the server in **one** save, or get
discarded on cancel.

## Deferred groups

You buffer edits by binding the detail to a **named update group** instead of `$auto`:

```js
this.getView().bindElement({
    path: "/SalesOrders(orderId='" + sOrderId + "')",
    parameters: { $expand: "items", $$updateGroupId: "editGroup" }
});
```

Now any change made through this binding's fields is **collected in `editGroup`** and not
sent automatically. The editable field is a plain two-way-bound `Input`:

```xml
<Input value="{customer}" />
```

Edit it and nothing reaches the server yet. Two handlers then control the commit:

```js
onSave() {
    this.getView().getModel().submitBatch("editGroup");   // send the buffered edits
}
onCancelEdit() {
    this.getView().getModel().resetChanges("editGroup");  // discard the buffered edits
}
```

- **`submitBatch("editGroup")`** sends everything in the group as one `$batch` request -
  the user's whole edit, committed atomically.
- **`resetChanges("editGroup")`** rolls back the buffered edits, restoring the original
  values. That is your "Cancel".

This is the **draft pattern in miniature**: changes live safely in a buffer until the
user deliberately commits or abandons them.

## How this relates to CAP drafts

Back in Lesson 15 we annotated the entity with **`@odata.draft.enabled`**. That turns on
the *full* Fiori draft choreography on the server: a real draft record is created, can be
edited across sessions, and is `draftActivate`-d to go live - so a user can close the
browser mid-edit and resume later. The deferred-group approach here is the lighter,
client-side cousin: same idea (buffer, then commit or cancel), without server-side draft
persistence. SAP's Fiori Elements consume the full draft flow automatically; in a
freestyle app you choose the level you need - a deferred group for simple edits, full
drafts for long-running ones. Knowing both, and when each fits, is the judgement here.

## Your coding task

In `Detail.controller.js`, complete `onSave` so it **submits the buffered edits** in the
`editGroup` batch. (The editable field, the deferred binding and Cancel are in place.)

## What the check verifies

- Edits go to a **deferred update group** (`$$updateGroupId: "editGroup"`).
- **Save submits** the group and **Cancel resets** it.
- The detail has an **editable field**.

## Run it yourself

Open an order, change the customer name, and press Save - one `$batch` request commits it
to CAP. Try again but press Cancel - the change vanishes, nothing sent. Edits are safe in
the buffer until you decide.

---

### Where this came from

V4 deferred update groups (`$$updateGroupId`, `submitBatch`, `resetChanges`) follow the
SAPUI5 "OData V4 - Batch Control" docs at <https://ui5.sap.com/>; `@odata.draft.enabled`
is the CAP feature from Lesson 15 (<https://cap.cloud.sap/>). Verify against the running
service.
