# Stage 4 - A proper app shell

So far our controls have been floating directly on the page. Real SAP apps do not
look like that - they have a framed screen with a title bar at the top, content
in the middle, and room to navigate between screens. In this stage you give the
app that structure using two foundational controls, **`App`** and **`Page`**, and
you finish Lesson 1 with something that genuinely looks like the start of a
business application. Along the way you will meet the idea of **aggregations**,
and learn how to look *inside* a running UI5 app with its diagnostic tools.

## Building a tree of controls

Up to now we created one control and placed it. But user interfaces are
**trees**: a screen contains a list, the list contains rows, a row contains a
checkbox and some text. UI5 mirrors that: controls can contain other controls.

- **`sap.m.Page`** is one screen. It has a `title` (shown in its header bar) and a
  `content` area where you put the controls the user sees.
- **`sap.m.App`** is the outermost container. It holds one or more pages and
  manages moving between them (with the right animations on phone, tablet and
  desktop). Every `sap.m` app has exactly one `App` at its root.

Here is the tree we build:

```js
new App({
    pages: [
        new Page({
            title: "Sales Orders",
            content: [oButton]
        })
    ]
}).placeAt("content");
```

## Properties vs aggregations (an important distinction)

Look closely at the `Page`. `title` and `content` are configured the same way -
both inside the settings object - but they are different *kinds* of thing, and
the difference matters for the rest of the course:

- **`title: "Sales Orders"`** is a **property**: a single, simple value
  (text, number, boolean) that describes the control.
- **`content: [oButton]`** is an **aggregation**: a parent-child relationship. An
  aggregation holds **other controls**, often a list of them (hence the array).
  `pages` on the `App` is an aggregation too.

The mental model: **properties describe a control; aggregations nest controls
inside it.** Almost everything you build in UI5 is "set some properties, fill some
aggregations." Once that clicks, new controls stop being mysterious - you just
ask "what are its properties, and what can it contain?"

## Your coding task

`webapp/index.js` now builds an `App` containing a `Page` that holds the button
from stage 3. Fill in the blank:

1. The **page title** - the text shown in the header bar.

This is a genuine design choice. The solution says `Sales Orders`, but if you
prefer `Sales Order Management`, `Orders`, or your company's name, use it. The
check only requires that the title is not empty.

## What the check verifies

- The module is defined with `sap.ui.define`.
- `sap.m.App` and `sap.m.Page` are loaded as dependencies.
- An `App` is created and rendered with `placeAt("content")`.
- A `Page` is created with a **non-empty title** - **the exact text is your
  choice**.

The structure (an `App` containing a `Page`) is the rule of law; the wording of
the title is your freedom.

## Run it, then look inside it

```
npx ui5 serve --open index.html
```

You now have a titled screen with your button in it - the skeleton of a real app.

Now meet a tool you will rely on for the rest of your UI5 career. With the app
open in the browser, press **Ctrl + Shift + Alt + S** (Windows/Linux) or
**Ctrl + Option + Shift + S** (macOS) to open the **UI5 Diagnostics** window. It
lets you:

- browse the live **control tree** (you will see your `App` > `Page` > `Button`),
- inspect any control's current properties,
- check which libraries and which framework version actually loaded.

There is also the **UI5 Support Assistant** (in the same window), which scans your
running app and reports best-practice and accessibility problems. Get into the
habit of opening these when something looks wrong - reading the live control tree
is far faster than guessing. We use both tools in depth in the Performance and
Accessibility lessons.

## End of Lesson 1

You started with an empty HTML file and now have a running, themed,
component-free SAP-style screen - and, more importantly, you understand the
bootstrap, modules, controls, events, and the property/aggregation model behind
every one of them.

There is one honest limitation: we built this UI by hand in JavaScript with
`new` and `placeAt`. That does not scale to a real app with dozens of screens.
In **Lesson 2** we package the app properly - as a **Component** with a
**manifest** (its descriptor) - and in **Lesson 3** we stop writing UI in
JavaScript and start describing it declaratively in **views**. Everything you
learned here still applies; we are about to give it a much better structure.

---

### Where this came from

`sap.m.App` and `sap.m.Page` usage follows the official **`UI5/sample-app`**
(`webapp/view/App.view.xml`) and the SAPUI5 API Reference at
<https://ui5.sap.com/>. The Diagnostics shortcut and Support Assistant are
documented in the SAPUI5 documentation (Troubleshooting / Support Assistant). The
page title and app domain are this course's own choice.
