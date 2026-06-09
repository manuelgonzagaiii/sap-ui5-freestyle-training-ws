# Stage 1 - The page frame (Bar and Title)

We have spent three lessons on structure and behaviour. Now we widen out and get
to know the **controls** themselves - the building blocks you assemble into real
screens. This last lesson of the foundations is a guided tour of the most useful
ones, and we start by giving our screen a proper frame: a real header built from a
**Bar** and a **Title**, slotted into the **Page**'s header aggregation.

## A control is properties, aggregations, associations, events

Before we add controls, lock in the mental model that makes every one of them
predictable. Any UI5 control is described by four kinds of thing:

- **Properties** - simple values that describe it (`text`, `enabled`, `width`).
- **Aggregations** - the controls it *contains* (a `Page`'s `content`, a `Bar`'s
  `contentMiddle`). Parent-child relationships.
- **Associations** - controls it *refers to* but does not own (we meet these in
  stage 3).
- **Events** - the moments it announces (`press`, `change`).

When you meet a new control, you are really asking four questions: what can I set,
what can it hold, what can it point at, and what does it tell me? Answer those from
the API Reference and the control stops being a mystery. **This is the single most
useful habit in UI5 development** - it turns "I don't know this control" into "let
me read its four lists."

## The Page and its aggregations

`sap.m.Page` is the frame of one screen, and it has several named aggregations,
each a slot for a different part of the screen:

- **`content`** - the main body (where our text, input and button live).
- **`customHeader`** - a header you build yourself (instead of the simple
  `title` property we used before).
- **`subHeader`** - an optional second bar under the header.
- **`footer`** - a bar pinned to the bottom (we use it in stage 4).

Using `customHeader` lets us put *real controls* in the header rather than just a
text title:

```xml
<Page>
    <customHeader>
        <Bar>
            <contentMiddle>
                <Title text="Sales Orders" level="H1" />
            </contentMiddle>
        </Bar>
    </customHeader>
    <content> ... </content>
</Page>
```

## Bar and Title

- **`sap.m.Bar`** is a horizontal container with three slots of its own:
  **`contentLeft`**, **`contentMiddle`** and **`contentRight`**. It is the
  standard way to lay out a header or footer - put a back button on the left, a
  title in the middle, actions on the right. Those three slots are aggregations,
  the same idea you already know, just named for position.
- **`sap.m.Title`** is a semantic heading. Its `level` (`H1`, `H2`, ...) tells
  assistive technology how important the heading is, which matters for
  accessibility - a real heading is not just big text, it carries meaning.

Notice the pattern repeating from Lesson 1: **set properties, fill aggregations.**
A `Page` holds a `Bar` in `customHeader`; the `Bar` holds a `Title` in
`contentMiddle`; the `Title` has a `text` property. Once you see controls as nested
slots, any screen is just this pattern, repeated.

## Your coding task

In `App.view.xml`:

1. Place the `Bar` in the correct **Page aggregation** so it becomes the header.
2. Give the header `Title` its **text**.

## What the check verifies (and where you are free)

- The `Page` uses a **`customHeader`** containing a **`Bar`** (rule of law - that
  is what makes it the header).
- The header shows a **`Title`** whose text is **non-empty** - the wording is
  **yours**.

## Run it yourself

```
npx ui5 serve --open index.html
```

The screen now has a real header bar instead of a plain title strip - the first
visible step toward looking like a professional app.

---

### Where this came from

`sap.m.Page`, `sap.m.Bar` and `sap.m.Title`, and their aggregations, are
documented in the SAPUI5 API Reference at <https://ui5.sap.com/>; the header-Bar
pattern follows **`UI5/sample-app`** (`webapp/view/App.view.xml`, which uses a
`ShellBar` header in the same spirit). The title text is this course's own choice.
