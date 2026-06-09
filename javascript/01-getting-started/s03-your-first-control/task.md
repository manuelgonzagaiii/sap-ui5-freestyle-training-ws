# Stage 3 - Handling user interaction

A screen that only displays text is a poster, not an application. An application
*reacts*: the user does something, and the app responds. In this stage you add a
button and make it do something when clicked. The new idea is **events**, and it
is one you will use in every screen you ever build.

## What is an event?

An **event** is the framework's way of telling you "something just happened" -
the user pressed a button, typed in a field, selected a row. Controls announce
these moments through named events. A `Button`, for example, fires a **`press`**
event when it is clicked or tapped.

Your job is to say *what should happen* when that event fires. You do that by
giving the event a **handler** - a function the framework calls for you at the
right moment:

```js
new Button({
    text: "Say hello",
    press: () => {
        MessageToast.show("Hello from the Sales Order app");
    }
});
```

Here `press` is not a property like `text`; it is an **event**. The function you
assign to it is the handler. Notice the shape of this: you are not calling the
function yourself, you are handing it to the framework to call **later**, when the
press actually happens. That "describe now, run later" style is the heart of all
user-interface programming, and getting comfortable with it is the real goal of
this stage.

## Giving the user feedback: `MessageToast`

When the user acts, they expect a response. `sap.m.MessageToast` is the lightest
form of feedback: a small message that appears briefly at the bottom of the
screen and fades away on its own.

```js
MessageToast.show("Hello from the Sales Order app");
```

We load it as a dependency just like any control:

```js
sap.ui.define(["sap/m/Button", "sap/m/MessageToast"], (Button, MessageToast) => { ... });
```

**Why a toast, and not an alert box?** A browser `alert()` freezes the whole page
until the user clicks OK - intrusive, and it looks nothing like SAP software. A
toast is non-blocking and on-brand. UI5 gives you a whole family of feedback
tools for different situations - `MessageToast` (quick confirmation),
`MessageBox` (a decision the user must make), `MessagePopover` (a list of
validation messages) - and we cover them properly in the Dialogs and Messaging
lesson. For a simple "it worked" signal, the toast is the right, idiomatic choice.

## Your coding task

In `webapp/index.js`, the file now creates a `Button` and renders it. Fill in the
two blanks:

1. The **dependency path** for the feedback control (`MessageToast`).
2. The **body of the press handler** - what should happen when the button is
   clicked. Show a message with `MessageToast.show(...)`.

The button text and the message text are entirely yours - write whatever reads
well to you. The check does not care what the words are, only that pressing the
button shows a message.

## What the check verifies

- The module is defined with `sap.ui.define`.
- `sap/m/MessageToast` is loaded as a dependency (the app needs it to give
  feedback).
- A `Button` is created and rendered with `placeAt("content")`.
- The button's `press` event is wired to a handler.
- The handler shows a message via `MessageToast.show(...)` - **the wording is
  your choice** (any non-empty message passes).

So two learners can show completely different messages and both be correct. What
the check insists on is the *mechanism*: an event wired to a handler that gives
feedback.

## Run it yourself

```
npx ui5 serve --open index.html
```

Click the button - your message should slide in at the bottom of the screen. If
nothing happens, open the console (F12) and check for an error in the handler.

---

### Where this came from

Wiring an event handler and using `MessageToast` follow the official **SAPUI5
Walkthrough, Steps 5-6** (source: `UI5/openui5`,
`src/sap.m/test/sap/m/demokit/tutorial/walkthrough/05` and `06`). The button and
message wording are this course's own choice.
