# Stage 2 - The controller lifecycle and byId

A controller is not just a bag of event handlers. It has a **life**: it is born,
its view is rendered, the user works with it, and eventually it is destroyed. The
framework calls special methods on your controller at each of these moments, and
knowing which is which is the difference between code that works and code that
mysteriously does not. In this stage you meet the **lifecycle hooks** and learn
how a controller reaches a specific control with **`byId`**.

## The lifecycle hooks

These four methods are optional, but if you define them, the framework calls them
at the right time:

- **`onInit`** - runs **once**, when the controller is created, **before** the
  view is on screen. The place for one-time setup: creating models, reading
  start-up parameters, preparing state. The DOM does not exist yet here.
- **`onBeforeRendering`** - runs before each (re)render. Rarely needed.
- **`onAfterRendering`** - runs **after** the view has been rendered to the page,
  so the real HTML now exists. The place for anything that needs the rendered DOM,
  such as moving keyboard focus or measuring an element.
- **`onExit`** - runs when the controller is destroyed. The place to clean up
  anything you created (timers, event subscriptions) so it does not leak.

The single most useful thing to internalise: **`onInit` is "set things up",
`onAfterRendering` is "the screen is now real".** A classic beginner bug is trying
to focus or measure a control in `onInit` and being puzzled that it does not work -
because at `onInit` time, the control has not been drawn yet. That is exactly why
we put our `focus()` call in `onAfterRendering`:

```js
onInit() {
    // one-time setup goes here (nothing to render yet)
},

onAfterRendering() {
    this.byId("helloButton").focus();   // the button exists on screen now
}
```

## Reaching a control with `byId`

To work with a specific control from the controller, you need to get hold of it.
You give the control an `id` in the view:

```xml
<Button id="helloButton" text="Say hello" press=".onShowHello" />
```

and look it up in the controller with **`this.byId("helloButton")`**.

**Why `this.byId` and not the browser's `document.getElementById`?** Because UI5
gives every control a *prefixed*, globally-unique id behind the scenes (so two
views can both have a `helloButton` without clashing). `this.byId` knows about
that prefixing and finds the control **within this view**; `getElementById` does
not and would fail or grab the wrong element. Rule of thumb: **inside a
controller, always reach controls with `this.byId`.** It also returns the UI5
*control* (with all its methods like `.focus()`, `.setText()`), not a raw DOM
node.

## Your coding task

The view gives the button the id `helloButton`. In `App.controller.js`,
`onAfterRendering` is where focus belongs - fill in the blanks so it:

1. Looks the button up by **its id** (the same one the view uses).
2. Moves keyboard **focus** to it.

Read the view first to find the id - matching ids between view and controller is a
real, everyday skill.

## What the check verifies

- The button has an `id` in the view.
- A lifecycle hook is implemented.
- The controller looks the button up with **`byId`, using the same id as the
  view** (the check reads the id from the view, so if you rename it, just keep both
  sides in agreement).
- Focus is moved **after rendering** (`onAfterRendering` + `.focus()`).

This stage is mostly rule-of-law: lifecycle timing and id-matching are things that
are either right or wrong. The judgement you are building is *where* code belongs,
which is a design skill that pays off for the rest of your career.

## Run it yourself

```
npx ui5 serve --open index.html
```

When the page loads, the button already has keyboard focus - press Space or Enter
and it fires without you touching the mouse. Small touch, real lesson: the right
behaviour in the right lifecycle hook.

---

### Where this came from

The controller lifecycle and `byId` are documented in the SAPUI5 documentation
(Controller / "Methods of a Controller") at <https://ui5.sap.com/>. The example
is this course's own.
