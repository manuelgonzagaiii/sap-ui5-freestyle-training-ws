# Stage 4 - Reading event data

In stage 1 you wired an event to a handler. But a handler that only ever shows the
same fixed message is not very useful. Most of the time, when an event fires, you
need to know *something about what happened*: which item was selected, what the
user typed, which control fired. That information arrives in the **event object**,
and learning to read it is the last core skill of this lesson.

## Every handler receives an event

When the framework calls your handler, it passes in an **event object**, usually
written `oEvent`:

```js
onInputChange(oEvent) {
    const sValue = oEvent.getParameter("value");
    MessageToast.show("You typed: " + sValue);
}
```

We have added an `Input` to the view whose `change` event is wired to this
handler:

```xml
<Input placeholder="Type a customer name" change=".onInputChange" />
```

Type in the field, leave it, and the handler runs - now reacting to *what you
actually typed*, not a canned response.

## The two things you read from an event

- **`oEvent.getParameter("...")`** - data **specific to this event**. A `change`
  event carries the new `value`; a list's `selectionChange` carries the selected
  item; and so on. Each event documents its own parameters in the API Reference.
  This is how you answer "what just happened?"
- **`oEvent.getSource()`** - the **control that fired the event**. Useful when one
  handler serves several controls, or when you want to read or change the control
  that was just used (for example `oEvent.getSource().getValue()`).

The mental model: **the event object is the framework handing you the context of
the moment.** `getParameter` tells you *what* happened; `getSource` tells you
*where* it happened. Almost every interactive feature you will ever write reaches
for one or both.

This is also why we do not call handlers ourselves. The framework calls them, and
only the framework can supply that event context. Your job is to *describe* the
handler; the framework runs it, at the right time, with the right information.

## Your coding task

1. In `App.view.xml`, wire the `Input`'s **change** event to a handler.
2. In `App.controller.js`, make that handler **read the typed value from the
   event** and do something with it (we show it in a message).

## What the check verifies (and where you are free)

- The view has an `Input` wired to a `change` (or `liveChange`) handler, and
  **that handler exists on the controller** (the check matches the name across
  both, so you may name it what you like).
- The handler **reads data from the event object** (`getParameter` or
  `getSource`) - rule of law, because that is the whole point of the stage.

What you *do* with the value (the message wording, where you show it) is up to you.

## Run it yourself

```
npx ui5 serve --open index.html
```

Type a name and tab out of the field - your handler reads exactly what you typed
and reacts to it.

## End of Lesson 3

The app is alive again, and this time on solid foundations. You have a controller
linked to its view, you understand the lifecycle and *when* code should run, you
have fed the view data through a model and bound a control to it, and you can read
the details of any user interaction from the event object. That is the full MVC
loop working together.

In **Lesson 4** we widen out from this single screen and take a proper tour of the
**controls and libraries** UI5 gives you - the building blocks you will assemble
into the real Sales Order app: inputs, lists, toolbars and the structural controls
that frame a professional screen.

---

### Where this came from

The event object, `getParameter` and `getSource` are documented in the SAPUI5
documentation and API Reference at <https://ui5.sap.com/> (see `sap.ui.base.Event`).
The example is this course's own.
