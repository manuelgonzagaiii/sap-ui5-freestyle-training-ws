# Stage 4 - Fragment id scoping

Our Save button shows a fixed message; it should read what the user actually typed.
To do that, the controller has to reach a control that lives *inside the fragment* -
the customer input. This raises a question that trips up many UI5 beginners: when a
fragment has a control with `id="newCustomerInput"`, how do you find it, and what
stops it from clashing with an id somewhere else? The answer is **id scoping**, and
understanding it is the last fragment skill you need.

## The id-clash problem fragments could cause

A fragment is meant to be reusable - dropped into many views, maybe even twice in the
same view. But its controls have ids (`createOrderDialog`, `newCustomerInput`). If
those ids were *global*, two uses of the same fragment would collide, and
`document.getElementById` style lookups would grab the wrong one. Reusable UI with
fixed ids sounds like a recipe for disaster.

## How `loadFragment` solves it

When you load a fragment with **`this.loadFragment(...)`**, the framework **scopes
the fragment's ids to the host view**. Behind the scenes the real ids get the view's
prefix, so they are unique even if the same fragment is used elsewhere. And because
they are scoped to *your* view, you reach them exactly the way you reach any control
in your view - with `this.byId`:

```js
onSaveOrder() {
    const sCustomer = this.byId("newCustomerInput").getValue();
    MessageToast.show("New order for: " + sCustomer);
    this.byId("createOrderDialog").close();
}
```

`this.byId("newCustomerInput")` finds the input inside the loaded fragment, reads its
value, and `this.byId("createOrderDialog").close()` closes the dialog. The same
`byId` you used for view controls in Lesson 3 just works - because `loadFragment`
made the fragment part of this view's id space.

The rule to remember: **a fragment loaded via `loadFragment` belongs to the host
view, so reach its controls with `this.byId`** - never with a raw global lookup, and
never by guessing the prefixed id. This is the same "always go through `this.byId`"
discipline from Lesson 3, now extended to fragments.

## Why this matters for reuse

Because ids are scoped per host, the *same* fragment can be loaded into two different
views - or the `OrderHeader` fragment from Stage 1 can appear in several places - and
nothing collides. Each host owns its copy and its ids. That is what makes a fragment
truly reusable, rather than a copy-paste that breaks the second time you use it. The
scoping you just learned is the quiet machinery that makes "reusable UI" actually
safe.

## Your coding task

In `List.controller.js`, complete `onSaveOrder` so it reads the **customer input**
from the dialog by its id (and then shows it and closes the dialog).

## What the check verifies

- The save handler reads the dialog's input via **`byId("newCustomerInput")`**.
- The dialog is closed via its **scoped id** (`byId("createOrderDialog").close()`).

## End of Lesson 10

You now command fragments: you can extract a piece of UI into a reusable
`FragmentDefinition`, include it statically in a view, load a dialog fragment on
demand, cache it as a singleton, and reach its controls safely through scoped ids.
These are the foundations for everything interactive that follows.

In **Lesson 11** we build on exactly this: **dialogs, popovers and messaging**. The
"New order" dialog gets real actions, you add popovers and action sheets, and you
learn UI5's family of feedback tools - toasts, message boxes, and the message manager
that drives validation - so the app can talk back to the user properly.

---

### Where this came from

Fragment id scoping and reaching scoped controls with `this.byId` follow the SAPUI5
"Instantiation of Fragments" / "Fragments" documentation at <https://ui5.sap.com/>
and `UI5/sample-app`. The example is this course's own.
