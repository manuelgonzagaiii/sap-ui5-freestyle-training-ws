# Stage 1 - Formatter functions

Our list shows the raw word `Open` or `Completed` as plain grey text. A user
scanning fifty orders wants to *see* status at a glance - green for done, red for
cancelled. The data does not change; only how we *present* it does. That
translation, from a raw value to something display-ready, is the job of a
**formatter**, and it is one of the most-used tools in everyday UI5 work.

## What a formatter is

A formatter is just **a normal JavaScript function that takes a raw value and
returns the value to display**. Nothing more. We keep them together in a small
module, `webapp/model/formatter.js`:

```js
sap.ui.define([], () => {
    "use strict";
    return {
        statusState(sStatus) {
            switch (sStatus) {
                case "Completed": return "Success";
                case "In Process": return "Warning";
                case "Cancelled": return "Error";
                default: return "None";
            }
        }
    };
});
```

`statusState` maps an order's status to a **`sap.ui.core.ValueState`** - one of
`Success` (green), `Warning` (orange), `Error` (red) or `None` (neutral). These are
the framework's semantic colours; using them, rather than hard-coding colours,
means your app automatically looks right in every theme, including dark and
high-contrast.

## Wiring a formatter into a binding

A formatter is attached to a binding with the extended syntax you met in Lesson 6:

```xml
<ObjectStatus
    text="{status}"
    state="{ path: 'status', formatter: '.formatter.statusState' }" />
```

Read it as: "bind `state` to the `status` field, but run it through
`.formatter.statusState` first." Two details matter:

- The leading **dot** in `.formatter.statusState` means "on my controller." For
  this to resolve, the controller exposes the module as a property:
  `formatter: formatter` (already done for you in `App.controller.js`). This is the
  standard way to make a whole module of formatters available to a view.
- `sap.m.ObjectStatus` is a control built for exactly this: a piece of status text
  whose **colour is driven by its `state`**. We use it for the order status, with
  the text bound straight and the colour bound *through* the formatter.

## Formatter vs plain binding - the mental model

A plain binding (`text="{status}"`) shows the value as-is. A **formatted** binding
runs it through a function first. So the rule is simple: **the moment "what to
show" is not literally "the value in the model", you reach for a formatter.** Status
colours, "3 items" from a number, a friendly date from a raw string - all
formatters. Keeping that logic in one tested module (rather than scattered in the
view) is what keeps a large app maintainable.

## Your coding task

1. In `webapp/model/formatter.js`, return the correct value state for a
   **completed** order.
2. In `App.view.xml`, point the `ObjectStatus`'s `state` binding at **the
   formatter** that colours the status.

## What the check verifies (and where you are free)

- The formatter maps statuses to **valid value states** (`Success`, `Warning`,
  `Error`). Which status maps to which colour is partly yours - a sensible mapping
  passes; the constraint is that you return real `ValueState` values, not invented
  ones.
- The view's `ObjectStatus` colours the status **through the formatter**.

## Run it yourself

```
npx ui5 serve --open index.html
```

The order statuses are now colour-coded - green completed, orange in-process, red
cancelled. The list went from a wall of grey text to something you can read at a
glance, and the data file never changed.

---

### Where this came from

Formatter functions, the `.formatter` controller convention and
`sap.m.ObjectStatus` follow the official **SAPUI5 Walkthrough** ("Formatters" step)
and `UI5/sample-app` at <https://ui5.sap.com/>. The status-to-colour mapping is this
course's own.
