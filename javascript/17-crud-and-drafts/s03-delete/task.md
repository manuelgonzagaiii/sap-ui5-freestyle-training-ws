# Stage 3 - Delete

Create and edit are done; the last of the four core operations is **delete**. In OData
V4 it is the simplest of all, because you already hold the thing to delete: the
**context** of the order the detail is showing. One call removes it. This short stage
adds a Delete action and rounds out full CRUD.

## Delete works on the context

The detail page is bound to one order's **context** (from `bindElement`). That context
*is* the handle to the entity, so deleting is just asking it to delete itself:

```js
onDelete() {
    this.getView().getBindingContext().delete().then(
        () => { MessageToast.show("Order deleted"); this.onClose(); },
        () => MessageToast.show("Delete failed")
    );
}
```

- **`getBindingContext()`** - the order's context (the same one you used for the action
  and the edit group).
- **`.delete()`** - send a `DELETE` request for that entity. It returns a **promise**, so
  you confirm on success and warn on failure.
- On success we **navigate back to the list** (`onClose`), since the order it was showing
  no longer exists. The list refreshes and the row is gone.

That is the whole operation. Notice the symmetry across V4 CRUD: you work through
**bindings and contexts** throughout - create on the *list binding*, edit through the
*element binding*'s group, delete on the *context*. There is no model-level "delete by
path"; the context you are already holding is the entity, and you act on it directly.

## A word on confirmation

We delete immediately here to keep the focus on the V4 mechanics, but in a real app a
destructive action should **confirm first** - exactly the `MessageBox.confirm` pattern you
built in Lesson 11. Combining them ("are you sure?" then `context.delete()`) is how you
would ship this. The framework gives you the deletion; the considerate confirmation is
your responsibility, and you already know how to add it.

## Your coding task

In `Detail.controller.js`, complete `onDelete` so it **deletes the order through its
context**.

## What the check verifies

- A **Delete** action is offered on the detail.
- Delete **removes the bound entity via its context** (`getBindingContext().delete()`).

## Run it yourself

Open an order and press **Delete** - it is removed from CAP and you return to the list,
where the row is gone. Check `cds watch`: the record is really deleted.

---

### Where this came from

`Context#delete` follows the SAPUI5 "OData V4 - Context API" documentation at
<https://ui5.sap.com/>; combine with `MessageBox.confirm` from Lesson 11 for production.
Verify against the running service.
