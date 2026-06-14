# Stage 1 - Building your own control

For twenty lessons you have *used* SAP's controls. Now you build one. A **custom
control** is a reusable UI building block you define yourself - your own tag, with its
own properties, that renders and behaves exactly how you need. This is the deepest form
of extensibility UI5 offers, and understanding it is what separates someone who wires
up screens from someone who can extend the framework itself.

Our app shows each order's priority as plain text. We will replace it with a
**PriorityIndicator** - a small control that shows the priority and (by the end of this
lesson) reacts to clicks and broadcasts events. We build it up across four stages;
this one creates the control and its **metadata**.

## When to build a control (and when not to)

First, judgement, because this is a decision you will face for real:

- **Compose first.** Most "custom" UI is just existing controls arranged in a fragment
  or a simple view extension. That is cheaper and more maintainable. Reach for a real
  control only when you need *new rendering* or *new behaviour* that no combination of
  existing controls gives you.
- **Build a control when** you need a genuinely new visual (a custom gauge, a badge
  with bespoke markup), reusable across many screens, with its own properties and
  events - something that should feel like a first-class UI5 control to whoever uses it.

A PriorityIndicator is a fair example: a tiny, reusable, self-rendering badge we will
want in tables and detail pages alike.

## Extending `sap.ui.core.Control`

Every visible UI5 control descends from **`sap.ui.core.Control`**. You create one by
**extending** it, in `webapp/control/PriorityIndicator.js`:

```js
sap.ui.define(["sap/ui/core/Control"], (Control) => {
    "use strict";
    return Control.extend("ui5.sales.control.PriorityIndicator", {
        metadata: {
            properties: {
                value: { type: "string", defaultValue: "Medium" }
            }
        },
        renderer: { apiVersion: 2, render(rm, oControl) { /* ... */ } }
    });
});
```

Two ideas carry the whole control:

### `metadata` - the control's public contract

`metadata` declares what your control *has*, and UI5 turns each entry into real,
working API for free:

- **`properties`** - typed, bindable values. Declaring `value` gives you a generated
  **`getValue()`/`setValue()`**, makes `value="{priority}"` bindable in a view, and -
  crucially - makes the control **re-render automatically** when the value changes.
  Each property has a `type` (`string`, `int`, `boolean`, ...) and an optional
  `defaultValue`.
- (Later stages add **`events`**. A control can also declare **`aggregations`** - child
  controls it contains - and **`associations`** - references to other controls.)

You write the declaration; UI5 writes the getters, setters, binding support and
invalidation. That is the payoff of the metadata contract: a few lines of description
become a fully functional control API.

### `Control` vs `Element`

Why `sap.ui.core.Control` and not `sap.ui.core.Element`? An **Element** is a managed
object with metadata but **no rendering** (a `Column`, a `ListItem` cell definition).
A **Control** is an Element that **renders to the DOM** and can be placed in an
aggregation that shows on screen. We want pixels, so we extend `Control`.

## Your coding task

In `webapp/control/PriorityIndicator.js`, declare the control's **`value` property** in
its `metadata` (a `string`, defaulting to `"Medium"`).

## What the check verifies (and where you are free)

- The control **extends `sap.ui.core.Control`**.
- Its `metadata` declares a **`value` property**.
- It has a **renderer** using the modern **`apiVersion: 2`**.
- The default value and the property's exact options are **yours** - any valid metadata
  passes. The check insists only that a `value` property exists.

## Run it yourself

Nothing changes on screen yet - the control exists but is not used in a view until
stage 3. We are building the class first, then wiring it in. (You can confirm it loads
without error in the browser console once the app is running.)

---

### Where this came from

`sap.ui.core.Control`, `Control.extend`, the `metadata` contract (properties /
aggregations / associations / events) and the Control-vs-Element distinction follow the
SAPUI5 "Developing Controls" / "Custom Controls" documentation and API Reference at
<https://ui5.sap.com/>. The PriorityIndicator is this course's own; verify the control
loads in the browser.
