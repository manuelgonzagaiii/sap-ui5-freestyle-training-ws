# Stage 1 - Your first controller

Our app has structure now, but it is frozen: the button sits there and does
nothing, because in Lesson 2 we moved the UI into a view and left its behaviour
behind. This stage gives the view a brain. That brain is the **controller**, the
"C" in MVC, and connecting a view to its controller is something you will do for
every screen you ever build.

## View and controller: a partnership

Remember the split from Lesson 2:

- The **view** (`App.view.xml`) decides *what the screen looks like*.
- The **controller** (`App.controller.js`) decides *what happens when the user
  interacts with it*.

Keeping them apart is the whole point of MVC. A designer can rework the view
without touching logic; you can change logic without disturbing the layout. They
meet through two small links:

```xml
<mvc:View controllerName="ui5.sales.controller.App" ...>
    <Button text="Say hello" press=".onShowHello" />
</mvc:View>
```

```js
return Controller.extend("ui5.sales.controller.App", {
    onShowHello() {
        MessageToast.show("Hello from the Sales Order app");
    }
});
```

- **`controllerName`** on the view names the controller that backs it. The
  framework loads that controller and pairs the two together. The name must match
  the controller's `extend` name exactly, or the view has no brain.
- **`press=".onShowHello"`** wires the button's `press` event to a **method on the
  controller**. The leading **dot** is important: it means "look for this function
  on my controller." When the button is pressed, the framework calls
  `onShowHello` for you.

This is the same "describe now, run later" idea from Lesson 1, but now the handler
lives in a controller instead of inline - which is where it belongs in a real app,
because it keeps logic out of the markup.

## A quick word on view types

We write our views in **XML**, and you should too. But it is worth knowing the
family, because you will see the others in older code and the API:

- **XML views** (what we use) - the recommended default. Declarative, easy to
  read, tooling-friendly, and they keep structure and logic cleanly separated.
- **JS views** - the UI built in JavaScript. Powerful for rare cases where the
  layout itself is highly dynamic, but they mix structure and code, so they are
  discouraged for normal screens.
- **JSON and HTML views** - legacy options, rarely used today.
- **Typed views** - a modern TypeScript-friendly variant of XML/JS views; we
  meet them in the TypeScript track.

The mental model: **prefer the declarative one (XML) until you have a concrete
reason not to.** Ninety-nine screens out of a hundred are XML, and that is a
feature, not a limitation - boring and consistent is exactly what a large app
wants.

## Your coding task

1. In `App.view.xml`, name the **controller** that backs this view.
2. In `App.controller.js`, make the `onShowHello` handler **give the user
   feedback** (show a message).

The button is already wired to `onShowHello`; your job is to connect the view to
its controller and to make the handler actually do something.

## What the check verifies (and where you are free)

- The view's `controllerName` is **`ui5.sales.controller.App`**, and the
  controller **extends `Controller` with that same name** (rule of law - they must
  match, or nothing is wired up).
- The button is wired to a handler, **and that handler actually exists on the
  controller** (the check reads the handler name from the view and looks for it in
  the controller, so you are free to rename it as long as both sides agree).
- The handler shows a message - **the wording is entirely yours**.

## Run it yourself

```
npx ui5 serve --open index.html
```

Click the button - it works again, but this time the behaviour lives in a proper
controller, exactly where a growing app keeps it.

---

### Where this came from

`controllerName`, the `press=".handler"` wiring and the controller follow the
official **SAPUI5 Walkthrough, Steps 5-6** (`UI5/openui5`, `.../walkthrough/05`,
`06`). The message wording is this course's own choice.
