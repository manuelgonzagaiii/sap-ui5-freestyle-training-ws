# Stage 3 - Validation handling and value state

The fields have rules now, but break one and nothing visible happens - no red
border, no message. That is because UI5 needs to be told to **handle** the validation
errors the types raise. Flip that one switch and the form comes alive: invalid
fields turn red, with an explanation, the instant the user leaves them. This stage
connects the rules to the feedback through the **Message Manager**.

## Validation errors need a handler

When a type fails to parse or validate input, it raises a **validation message**. By
default, nobody is listening, so it goes nowhere. To make those messages drive the
UI - the red **value state** on the field, the message text - you **register your
view** with the framework's messaging service, asking it to handle validation:

```js
sap.ui.define([ ..., "sap/ui/core/Messaging" ], (..., Messaging) => {
    ...
    onInit() {
        Messaging.registerObject(this.getView(), true);
        this.getView().setModel(Messaging.getMessageModel(), "message");
    }
});
```

- **`Messaging.registerObject(this.getView(), true)`** - "watch this view (and its
  dependents, like our dialog) and **handle validation** (`true`) for it." From now
  on, a field whose type rejects the input automatically shows an **error value
  state** - the red border and message - and the error is recorded centrally.
- **`Messaging.getMessageModel()`** - the framework keeps all current messages in one
  model. We expose it to the view as a named **`message`** model, which the next
  stage uses to *show* the collected messages.

That is the whole connection: rules (types) raise messages, and a registered view
turns those messages into visible value states. You wrote no per-field error code.

## Value state: the red field

**Value state** is a control's built-in way of signalling its validity - `None`
(normal), `Error` (red), `Warning` (orange), `Success` (green). When validation is
handled, the framework sets a field's value state to `Error` automatically the moment
its input violates the type or constraints, and clears it when fixed. The user sees
the problem field-by-field, as they go, instead of being surprised at save time. This
immediate, local feedback is what makes a form feel helpful rather than punishing.

## A note on the modern API

We use the **`sap/ui/core/Messaging`** module, which is the current way to reach the
messaging service. Older code calls
`sap.ui.getCore().getMessageManager().registerObject(...)` - that still works but is
**deprecated**, so prefer `Messaging`. (This is a recently modernised API; if your
UI5 version behaves differently, check the "Message Handling" topic on
ui5.sap.com - the concept is identical either way.)

## Your coding task

In `List.controller.js`, complete `onInit` so it **registers the view** for
validation handling (the `Messaging` import and the message-model line are already
there).

## What the check verifies

- The controller uses the **`Messaging`** module.
- It **registers the view** so validation is tracked
  (`registerObject(this.getView(), true)`).

## Run it yourself

```
npx ui5 serve --open index.html
```

Open the dialog, clear the customer field or type letters into the amount, and click
away - the field turns red with a message, instantly. Fix it and the red clears. The
rules you declared in Stage 2 are now visibly enforced, with zero per-field code.

---

### Where this came from

`sap.ui.core.Messaging`, `registerObject`, the message model and value-state-from-
validation follow the SAPUI5 "Message Handling" / "Validation" topics at
<https://ui5.sap.com/> (the modern `Messaging` replaces the deprecated
`getMessageManager`). The setup is this course's own - verify the API in your UI5
version.
