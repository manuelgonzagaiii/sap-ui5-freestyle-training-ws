# Stage 3 - Responsive Grid

Wrapping a `FlexBox` is great for a simple strip, but when you want content to lay
out in **neat, predictable columns that rearrange themselves by screen size** -
the way a real dashboard does - you want a proper **grid**. UI5's
`sap.ui.layout.Grid` gives you a classic 12-column responsive grid, and using it
teaches a second lesson too: how to **pull in a library your app did not have
before**.

## Adding a library (a recap that matters)

`Grid` lives in the **`sap.ui.layout`** library, which our app has not used until
now. Adding it is exactly the descriptor work from Lesson 2:

- in `ui5.yaml`, `sap.ui.layout` is listed under `framework/libraries` so the
  tooling fetches it;
- in `manifest.json`, it is declared under `sap.ui5/dependencies/libs` so the
  framework loads it.

Both are already done for you here, but notice the pattern: **a new control means
a new dependency, declared in the open.** This is why we put dependencies in the
manifest - so adding a feature is a visible, one-line decision, not a mystery.

In the view, a namespace prefix lets us use the control:

```xml
<mvc:View ... xmlns:l="sap.ui.layout">
    <l:Grid defaultSpan="XL3 L3 M6 S12"> ... </l:Grid>
```

`xmlns:l="sap.ui.layout"` means "`<l:Grid>` comes from `sap.ui.layout`", the same
mechanism as `xmlns:mvc` and `xmlns:core` you already use.

## The 12-column idea

A `Grid` divides the available width into **12 invisible columns**. Each child
declares how many of those 12 columns it should span - and, crucially, it can
declare a **different span for different screen sizes**. That is what
`defaultSpan` does for all children at once:

```
defaultSpan="XL3 L3 M6 S12"
```

Read it as four breakpoints:

- **`XL3`** - on extra-large screens, each tile spans **3** of 12 columns -> **4
  tiles per row**.
- **`L3`** - large screens: 3 columns -> 4 per row.
- **`M6`** - medium (tablet): 6 columns -> **2 per row**.
- **`S12`** - small (phone): the full 12 columns -> **1 per row**.

So the same markup shows four tiles across on a desktop and one-per-line on a
phone, automatically. This is the heart of responsive design in UI5: **you do not
write code for each screen size; you declare how much room a thing should take at
each size, and the framework does the rest.**

## Grid vs FlexBox - when to use which

- **`FlexBox`** - simplest, content-driven flow. Great for toolbars, a strip of
  buttons, a label-and-field pair. Reach for it first.
- **`Grid`** - when you want aligned columns and explicit, breakpoint-by-breakpoint
  control over how many fit per row. Great for dashboards and forms.

Neither is "better"; they are different tools. Knowing which to pick is the design
judgement this stage builds.

## Your coding task

On the `<l:Grid>`, fill in the **`defaultSpan`** so the tiles show four-across on
large screens, two on tablets, and one on phones.

## What the check verifies (and where you are free)

- The layout uses a `sap.ui.layout` **`Grid`**.
- **`defaultSpan`** is a **valid span string** - one to four `XL`/`L`/`M`/`S`
  entries, each with a column count from 1 to 12 (for example `XL3 L3 M6 S12`).
  Garbage like `"big medium small"` fails; any valid combination passes, so the
  exact responsive breakpoints you choose are **your design decision**.

## Run it, then resize it

```
npx ui5 serve --open index.html
```

Widen and narrow the window and watch the tiles snap from four-across to two to
one. Try different spans (say `XL4 L4 M12 S12`) to feel how the breakpoints change
the layout - all valid, all yours to tune.

---

### Where this came from

`sap.ui.layout.Grid` and its `defaultSpan` breakpoint syntax are documented in the
SAPUI5 API Reference at <https://ui5.sap.com/>. The chosen layout is this course's
own.
