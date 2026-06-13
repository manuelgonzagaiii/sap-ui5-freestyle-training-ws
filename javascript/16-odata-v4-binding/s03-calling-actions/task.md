# Stage 3 - Calling a bound action

Reading and writing fields covers data, but business apps need **verbs**: approve,
cancel, complete. Back in Lesson 15 you declared a CAP **action**, `setCompleted`, on the
order. Now we call it from the app. Invoking an OData action from SAPUI5 uses a special
kind of binding - an **operation binding** - and learning it lets you trigger any
server-side operation your backend offers.

## Actions are operations, not data

A plain create/update changes *fields*. An **action** runs *logic* on the server - here,
"mark this order completed" sets its status and applies whatever business rules the
backend enforces. The client does not change the status itself; it **asks the server to
do it**, and the server is the authority. That separation is important: the rules live
on the server, where they cannot be bypassed.

`setCompleted` is a **bound** action - bound to a specific order (as opposed to an
**unbound** action/function, which is global, like "recalculate all totals"). To call a
bound action you need the **context** of the order it acts on.

## Operation bindings: bind, then execute

In OData V4 you invoke an operation through an **operation binding**. You create it from
the model with the action's qualified name, anchored to the order's context, then
execute it:

```js
onSetCompleted() {
    const oContext = this.getView().getBindingContext();      // the current order
    const oOperation = this.getView().getModel()
        .bindContext("SalesService.setCompleted(...)", oContext);
    oOperation.invoke().then(
        () => MessageToast.show("Order marked completed"),
        () => MessageToast.show("Action failed")
    );
}
```

- **`getBindingContext()`** - the order the detail page is showing (the context from
  Stage 2).
- **`bindContext("SalesService.setCompleted(...)", oContext)`** - create an operation
  binding for the action. The name is its **fully qualified** name from the service
  (`SalesService.setCompleted`), and the trailing **`(...)`** is the V4 model's
  *binding-path* marker for "an operation to be invoked later" - it is a SAPUI5
  convention, not text that appears in the eventual HTTP request, which carries the real
  parameters. The binding is anchored to `oContext` (the order).
- **`invoke()`** - send the request. It returns a **promise**, because it is a network
  call - so you handle success and failure, just like the create in Lesson 14. (Older
  code calls **`invoke()`** for this; it is the deprecated alias - SAPUI5 renamed it to
  `invoke()` in version 1.123, so on a modern app you use `invoke()`.)

The pattern to remember: **operation binding = "bind the action to a context, then
invoke and await the result."** Functions (read-only operations that return a value)
work the same way. Once you have this, you can drive any custom verb your CAP service
exposes - the `setCompleted` you wrote, or a dozen others.

## Your coding task

In `Detail.controller.js`, complete `onSetCompleted` so it binds and invokes the bound
**`setCompleted`** action on the current order.

## What the check verifies

- A **"Mark completed"** action is offered on the detail.
- The handler **invokes the bound action** via an operation binding
  (`bindContext(...).invoke()`).

## Run it yourself

Open an "Open" order and press **Mark completed**. The app calls the CAP action; the
server updates the status. (You may need the refresh from the next stage to *see* the new
status immediately - read on.)

> Operation-binding syntax is precise and version-sensitive. The structural check
> confirms the call; verify the action actually runs against `cds watch` in the browser.

---

### Where this came from

OData V4 operation bindings (`bindContext("...(...)", ctx).invoke()`) and bound-vs-unbound
operations follow the SAPUI5 "OData V4 - Operations" documentation at
<https://ui5.sap.com/>; the `setCompleted` action is the CAP one from Lesson 15. From the
author's knowledge - verify against the running service.
