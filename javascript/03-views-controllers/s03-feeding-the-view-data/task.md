# Stage 3 - Feeding the view data

Everything on screen so far has been hard-coded text. Real apps show **data** -
products, orders, customer names - and that data changes. This stage introduces
the piece of MVC we have been missing: the **model**. You will give the view some
data and connect a control to it, and you will see the idea that makes UI5 worth
using in the first place: **data binding**.

## What is a model?

A **model** is a container for data, sitting between your real data and the
screen. The simplest kind is the **`JSONModel`**, which just holds a plain
JavaScript object:

```js
const oModel = new JSONModel({
    appTitle: "Sales Order Management",
    ordersToday: 0
});
this.getView().setModel(oModel);
```

`setModel` attaches this model to the view. Because we gave it no name, it becomes
the view's **default model** - the one controls use unless told otherwise. (Models
can be named, which we use later for things like i18n; the default model is for
your app's main data.)

We do this in `onInit`, because preparing the model is exactly the kind of
one-time setup that hook is for.

## Binding: the idea that changes everything

Now the magic. Instead of writing code to copy data into a control, you **bind**
the control to a path in the model:

```xml
<Text text="{/appTitle}" />
```

`{/appTitle}` means "take the `appTitle` property from the root (`/`) of the
default model and use it as this `Text`'s text." You never wrote a line to push
the value in. And here is the real payoff: if `appTitle` in the model changes
later, the `Text` **updates itself automatically**. The control and the data stay
in sync, both ways, without glue code.

**Why this matters so much.** Without binding, every screen is a tangle of "read
this value, set that label, when this changes update that field" by hand. It is
where most UI bugs are born. Binding replaces all of it with a declaration: "this
control shows that piece of data." You will spend much of this course getting
fluent in binding, because once it clicks, building data-driven screens stops
being tedious and starts being almost declarative. This stage is just the first
taste; Lesson 6 covers binding properly - the kinds, the modes, lists, and more.

The `{ }` syntax is **binding syntax**, distinct from a plain string. `text="Hello"`
is a fixed string; `text="{/appTitle}"` is a live connection to the model.

## Your coding task

1. In `App.controller.js`, attach the model to the view (set it), and give
   `appTitle` **any starting value you like**.
2. In `App.view.xml`, **bind** the `Text` to the `appTitle` property of the model.

## What the check verifies (and where you are free)

- A `JSONModel` is loaded and **created** in the controller.
- The model is **set on the view** (`getView().setModel(...)`).
- A control in the view is **bound to a model property** with `{ /... }` syntax.
- The actual data value (the title text) is **yours** - any starting value passes.

The mechanism (a model, set on the view, bound from the view) is the rule of law;
the data you put in it is your own.

## Run it yourself

```
npx ui5 serve --open index.html
```

The `Text` now shows whatever you put in the model - not because you copied it
there, but because it is *bound* to it. That small indirection is the seed of
every data-driven screen you will build from here on.

---

### Where this came from

The `JSONModel`, `setModel` and property binding follow the official **SAPUI5
Walkthrough, Step 7 "JSON Model"** (`UI5/openui5`, `.../walkthrough/07`). The data
values are this course's own.
