# Stage 2 - Flex alignment and wrapping

Our tiles sit in a row, but they huddle together at the left edge and, on a narrow
window, they get squashed or clipped. A row of boxes is only half a layout; the
other half is **how the space between and around them is distributed**, and **what
happens when there is not enough room**. Those are the `FlexBox` properties you
tune in this stage, and they are the difference between a layout that looks
deliberate and one that looks accidental.

## Distributing space: `justifyContent` and `alignItems`

A flex container has a **main axis** (the direction it flows - here, horizontal)
and a **cross axis** (the perpendicular one - here, vertical). Two properties
control alignment along each:

- **`justifyContent`** - how children are spread along the **main axis**. Common
  values:
  - `Start` (default) - bunched at the beginning.
  - `Center` - centred.
  - `SpaceBetween` - first and last pinned to the edges, equal gaps between.
  - `SpaceAround` / `SpaceEvenly` - equal space around each item.
- **`alignItems`** - how children line up along the **cross axis**: `Start`,
  `Center`, `End`, `Stretch`.

For a KPI strip, `SpaceBetween` reads well: the tiles spread to fill the width with
even gaps, instead of clustering on the left. But this is a genuine design choice -
`Center` or `SpaceAround` are equally valid looks.

## Surviving small screens: `wrap`

By default a `FlexBox` keeps everything on **one line**, even if that means
shrinking or overflowing its children. That is fine on a wide desktop and ugly on
a phone. The fix is one property:

- **`wrap="Wrap"`** lets children **flow onto new lines** when the row runs out of
  width. Your four tiles become two-by-two, then one-per-line, as the window
  narrows - no media queries, no JavaScript.

This is your first taste of **responsive design**: the layout reacts to the
available space on its own. `wrap` is the cheapest responsiveness you can buy, and
forgetting it is one of the most common reasons a layout "breaks on mobile."

The mental model: **`justifyContent` and `alignItems` decide where items sit when
there is room to spare; `wrap` decides what happens when there is not.** Together
they turn a rigid row into a layout that holds up across screen sizes.

## Your coding task

On the summary `FlexBox`, fill in:

1. **`justifyContent`** - how to distribute the free space between the tiles.
2. **`wrap`** - allow the tiles to wrap onto new lines on narrow screens.

## What the check verifies (and where you are free)

- **`justifyContent`** is a **valid** value (`Start`, `Center`, `SpaceBetween`,
  `SpaceAround`, `SpaceEvenly`) - pick the spread you like; an invalid value fails.
- **`wrap`** is a valid value (`NoWrap`, `Wrap`, `WrapReverse`).

How you distribute the tiles is your design call; that the values are real flex
settings is the rule of law.

## Run it, then resize it

```
npx ui5 serve --open index.html
```

Drag the browser window from wide to narrow and watch the tiles spread out, then
wrap onto new lines instead of overflowing. That graceful reflow is `wrap` and
`justifyContent` doing their jobs.

---

### Where this came from

`FlexBox` `justifyContent`, `alignItems` and `wrap` are documented in the SAPUI5
API Reference at <https://ui5.sap.com/> (and mirror the CSS Flexbox model). The
chosen look is this course's own.
