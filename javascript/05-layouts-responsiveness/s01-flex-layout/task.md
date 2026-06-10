# Stage 1 - Flex layout (FlexBox, VBox, HBox)

Welcome to Phase B, where the app stops being a teaching sandbox and starts
becoming the real thing. In Phase A you toured controls on a scratch screen. Now
we build the actual **Sales Orders** application, and the first job is **layout**:
deciding how things sit on the screen. We begin with the workhorse of UI5 layout -
the **flex box** - and a summary strip of business numbers across the top of the
page.

## Why layout needs its own controls

A control like `Button` knows how to draw *itself*, but not where it belongs
relative to its neighbours. Put three controls in a `Page`'s content and, by
default, they stack vertically. The moment you want two things side by side, or
evenly spaced, or to reflow on a smaller screen, you need a **layout container** -
a control whose only job is to arrange its children.

UI5's most-used layout container is **`sap.m.FlexBox`**, a thin, friendly wrapper
over the same CSS Flexbox the whole web uses. You will reach for it constantly.

## Direction: rows and columns

A `FlexBox` lays its children out in one **direction**:

```xml
<FlexBox direction="Row">
    <VBox> ... tile ... </VBox>
    <VBox> ... tile ... </VBox>
</FlexBox>
```

- **`direction="Row"`** places children left-to-right (a horizontal strip).
- **`direction="Column"`** stacks them top-to-bottom.

Two shortcuts you will see everywhere are just FlexBoxes with the direction baked
in: **`HBox`** is a `FlexBox` in `Row`, and **`VBox`** is one in `Column`. We use a
`FlexBox` for the outer strip (so the direction is explicit and yours to choose)
and `VBox` tiles inside it, each stacking a number above its label.

The mental model: **a layout is a tree of boxes, each box flowing its children in
one direction.** Rows of columns, columns of rows - nest them and you can build
any arrangement. This is the same idea as the property/aggregation model from
Phase A: the `FlexBox`'s children live in its default aggregation, and `direction`
is just a property.

## What we are building

A KPI strip - Open, In process, Completed, Revenue - bound to a small model in the
controller (the same `JSONModel` + binding you learned in Lesson 3). The numbers
are real bindings; this stage is about *arranging* them.

## Your coding task

In `App.view.xml`, set the **`direction`** of the summary `FlexBox` so the four
tiles sit in a horizontal row.

## What the check verifies (and where you are free)

- A `FlexBox` lays out the tiles, with several `VBox` tiles inside.
- Its **`direction`** is a **valid value** - `Row`, `Column`, `RowReverse` or
  `ColumnReverse`. `Row` is what makes a horizontal strip, but the check accepts
  any real `FlexDirection`: an invented value like `"sideways"` fails, a valid one
  passes. This is the course rule again - **strict on validity, free on the design
  decision** of how you want your tiles to flow.

## Run it yourself

```
npx ui5 serve --open index.html
```

You should see the four KPI tiles laid out in a row beneath the header. Try
changing `direction` to `Column` and reloading to feel the difference - both are
valid, and which you want is a design call.

---

### Where this came from

`sap.m.FlexBox`, `HBox` and `VBox` are documented in the SAPUI5 API Reference at
<https://ui5.sap.com/>. The Sales Orders KPI strip is this course's own design.
