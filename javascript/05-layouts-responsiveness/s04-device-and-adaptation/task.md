# Stage 4 - Adapting to the device

`wrap` and `Grid` handle most responsiveness by *reflowing* the same content. But
sometimes you want to do something different on a phone than on a desktop - show a
control, hide it, change a label, switch a whole layout. For that you need to
**know what device you are on**, and UI5 hands you that knowledge through
**`sap.ui.Device`**. This stage closes the layout lesson by making the UI adapt to
the device, the clean, declarative way.

## `sap.ui.Device`: the app's awareness of its surroundings

`sap.ui.Device` is a small module that reports facts about the current
environment: the system type (`phone`, `tablet`, `desktop`), the browser,
touch support, the current screen-size range, and orientation. You load it like
any dependency:

```js
sap.ui.define([ ..., "sap/ui/Device" ], (..., Device) => {
    // Device.system.phone   -> true on a phone
    // Device.system.desktop -> true on a desktop
});
```

## Exposing device info to the view (the right way)

You *could* read `Device` inside handlers and poke controls by hand. Do not. The
clean approach is the one that fits everything else you have learned: **put the
information in a model and let the view bind to it.**

```js
this.getView().setModel(new JSONModel({
    isPhone: Device.system.phone
}), "device");
```

This creates a **named model** called `device` (named, because the default model
is for our business data). Now any control can react to the device declaratively:

```xml
<Button text="Refresh" visible="{= !${device>/isPhone} }" />
```

Read that binding carefully, because it shows two new things:

- **`{device>/isPhone}`** - a binding to the **`isPhone`** property of the
  **`device`** model. The `device>` prefix selects the named model; without a
  prefix you get the default model.
- **`{= ... }`** - **expression binding**. The `=` lets you write a small bit of
  logic right in the binding. Here `!${device>/isPhone}` means "NOT on a phone", so
  the Refresh button is shown on desktop and tablet but hidden on a phone (where the
  toolbar's overflow menu handles it instead). We cover expression binding
  properly in Lesson 7; this is a first, useful taste.

## Declarative vs programmatic adaptation

The principle to take away: **prefer adapting through a model and bindings over
writing code that reaches into controls.** A bound `visible` updates itself and
keeps your controller clean; a controller that manually calls `setVisible(false)`
scatters layout decisions through your logic and is harder to follow. Reach for
imperative device code only when a binding genuinely cannot express what you need.

## Your coding task

1. In `App.controller.js`, populate the `device` model with whether the app is
   running **on a phone** (`Device.system.phone`).
2. In `App.view.xml`, bind the Refresh button's `visible` property so it shows
   **only when not on a phone**.

## What the check verifies

- The controller loads **`sap/ui/Device`** and creates a **named `device` model**
  from `Device.system.phone`.
- A control in the view **adapts via a binding on the `device` model**.

This stage is mostly rule-of-law wiring - device facts are facts - but the
judgement you are practising is a design one: deciding *what* should change between
phone and desktop, which is the essence of responsive design.

## End of Lesson 5

Your Sales Orders screen now has a real, responsive summary header: tiles laid out
with flex, distributed and wrapped, arranged in a breakpoint-aware grid, and
adapting to the device. You can reason about *where* things go on any screen size,
which is a skill every later screen depends on.

In **Lesson 6** we give the app its heart: real **data**. You will load a set of
sales orders into a model and bind a **list** to them, so the screen finally shows
live business data instead of a fixed summary - and you will learn the data binding
that makes UI5 worth using.

---

### Where this came from

`sap.ui.Device` and the named-model pattern follow the official **`UI5/sample-app`**
(`webapp/controller/App.controller.js`, which builds a `view` model from
`Device.browser.mobile`) and the SAPUI5 documentation at <https://ui5.sap.com/>.
The adaptation choice is this course's own.
