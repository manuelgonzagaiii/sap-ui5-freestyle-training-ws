# Stage 2 - Your first control

In stage 1 the page loaded the framework and then sat there, blank. That blank
page was correct: we had not told UI5 to draw anything yet. Now we will. By the
end of this stage your app shows its first real piece of user interface, and you
will understand two ideas that the entire framework is built on: **modules** and
**controls**.

## Idea 1: modules (and why `sap.ui.define`)

Open `webapp/index.js`. Every line of UI5 application code you write lives inside
a call like this:

```js
sap.ui.define([
    "sap/m/Text"
], (Text) => {
    "use strict";
    // your code
});
```

This is a **module**. A module is just a self-contained file of code that
declares, up front, the other pieces it needs to do its job. `sap.ui.define`
takes two things:

1. A **list of dependencies** - the modules this file needs, written as paths
   (`"sap/m/Text"` means the `Text` control from the `sap.m` library).
2. A **factory function** - your code. The framework loads the dependencies
   first, then calls your function and hands them in as arguments, **in the same
   order** as the list. So `"sap/m/Text"` arrives as the `Text` parameter.

**Why bother? What problem does this solve?** In the early days of the web,
everything was a global variable, and scripts had to be loaded in exactly the
right order or things broke mysteriously. Modules fix that:

- **No globals, no collisions.** `Text` exists only inside this function, not for
  the whole page.
- **Loaded on demand, in parallel.** The framework fetches only what you ask for,
  and it can do it asynchronously (remember `data-sap-ui-async="true"`).
- **Honest dependencies.** Anyone reading the file sees exactly what it needs at
  the top. This is the modern, recommended way to structure all UI5 code.

`"use strict";` turns on JavaScript's stricter rules, which catch silent mistakes
(like a typo creating an accidental global). It is a one-line safety net and a
standard best practice.

## Idea 2: controls

A **control** is a ready-made, reusable piece of user interface. `sap.m.Text` is
one of the simplest: it shows a line of text. You create a control the same way
you create any JavaScript object - with `new` - and you configure it by passing a
**settings object**:

```js
new Text({
    text: "Sales Order Management"
});
```

`text` here is a **property** of the `Text` control - one of its configurable
characteristics. Every control has its own set of properties (a `Button` has
`text` and `enabled`, an `Input` has `value` and `placeholder`, and so on). You
will spend a lot of this course learning which controls exist and what they can
do; the [API Reference](https://ui5.sap.com/) is where you look them up.

## Putting it on screen: `placeAt`

Creating a control in memory is not enough - the browser cannot show something
that is not attached to the page. `placeAt` does the attaching:

```js
new Text({ text: "Sales Order Management" }).placeAt("content");
```

`"content"` is the `id` of the `<body>` element from stage 1. So this line says:
"render this control inside the element with id `content`." When UI5 renders a
control it generates the actual HTML and inserts it - you never write that HTML
yourself, which is the whole point of a control.

(Placing controls one-by-one with `placeAt` is fine for a first screen, but real
apps do not build their whole UI this way. From Lesson 2 onward we move to
**views**, which describe the UI declaratively. For now, `placeAt` keeps the
moving parts to a minimum so the ideas above stay clear.)

## Your coding task

In `webapp/index.js`, fill in the two blanks so the app loads a `sap.m` control
and renders it:

1. The **dependency path** of the control to load.
2. The **id of the render target** passed to `placeAt`.

The solution loads `sap/m/Text`, but other valid `sap.m` controls that show text
(for example `sap/m/Title`) are fine too - that is your choice. The render
target, however, must be `content`, because that is the element the page gives
us.

## What the check verifies

- The file defines a module with `sap.ui.define` (rule of law - all UI5 code does).
- A control **from the `sap.m` library** is loaded as a dependency (so an
  invented or non-existent path fails, but you may pick which `sap.m` control).
- A control is created with `new` and rendered with `placeAt("content")`.

The exact control and its text are yours to decide; the structure is not.

## Run it yourself

After `npm install` at the project root (once), run the dev server from this
stage's folder:

```
npx ui5 serve --open index.html
```

This time the page is **not** blank - you should see your text. If you do not,
open the browser console (F12): a typo in the dependency path is the usual cause,
and the console will tell you which module failed to load.

---

### Where this came from

The module pattern and `placeAt` follow the official **SAPUI5 Walkthrough, Step 3
"Controls"** (source: `UI5/openui5`,
`src/sap.m/test/sap/m/demokit/tutorial/walkthrough/03`). The text shown and the
`ui5.sales` namespace are this course's own choice.
