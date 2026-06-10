# Stage 2 - Layout states

Two columns is the default, but users want control: sometimes they want the detail
**full screen** to concentrate, and a clear way to **close** it and get the list
back. Because we made the FCL's layout a single bound value in Stage 1, switching
arrangements is now wonderfully simple - just set that value. This stage adds a
full-screen toggle and a close action, and teaches you the family of **layout
states**.

## The layout states

The FCL's `layout` accepts a value from a fixed set (the `sap.f.LayoutType` enum).
The ones you reach for most:

- **`OneColumn`** - just the begin column (the list, full width).
- **`TwoColumnsMidExpanded`** - list + detail, detail wider. The everyday view.
- **`TwoColumnsBeginExpanded`** - list + detail, list wider.
- **`MidColumnFullScreen`** - the detail fills the screen, list hidden.
- **`ThreeColumnsMidExpanded`** / **`EndColumnFullScreen`** - for a third,
  sub-detail column (list -> detail -> sub-detail).

They are an **enum**, so only these values are valid - exactly the kind of field the
course's checking treats strictly (a real state passes, a made-up one fails).

## Switching states is just setting a value

Because the layout is one bound property, the detail can change the whole
arrangement with a single line:

```js
onFullScreen() {
    this.getOwnerComponent().getModel("fcl").setProperty("/layout", "MidColumnFullScreen");
}
```

Setting the model property updates the bound FCL, and it animates the detail to full
screen. Closing is even simpler - just navigate back to the list route, whose
`layout` (`OneColumn`) the App controller applies for you:

```js
onClose() {
    this.getOwnerComponent().getRouter().navTo("list");
}
```

This is the payoff of binding the layout to a model in Stage 1: layout changes are
ordinary data changes, reachable from anywhere, instead of tangled control code. One
model, one property, the whole arrangement.

## A note on the production tool

We are setting layout values directly, which is clear for learning. Real Fiori apps
usually use a helper called **`FlexibleColumnLayoutSemanticHelper`**, which looks at
the current state and *computes* the right "full screen", "exit full screen" and
"close" layouts for you (including the correct three-column transitions), so you do
not hard-code them. It is worth knowing it exists; the underlying idea is identical
to what you are doing here - it just picks the layout value for you.

## Your coding task

In `Detail.controller.js`, complete `onFullScreen` so it sets the FCL layout to the
**full-screen** state. (The close handler is already in place.)

## What the check verifies (and where you are free)

- The full-screen action sets a **valid FCL layout** value (from the `LayoutType`
  enum - `MidColumnFullScreen` is the natural one, but any real layout state passes;
  an invented value fails). Same rule as always: valid choices are free, invalid
  ones are wrong.
- The close action **returns to the single-column list**.

## Run it yourself

```
npx ui5 serve --open index.html
```

Open an order, press "Full screen" - the detail expands to fill the window. Press
"Close" - you are back to the list. The arrangement bends to the user's intent, all
through one bound value.

---

### Where this came from

`sap.f.LayoutType` and `FlexibleColumnLayoutSemanticHelper` are documented in the
SAPUI5 API Reference and "Flexible Column Layout" topic at <https://ui5.sap.com/>.
The direct-set approach is this course's own simplification for teaching.
