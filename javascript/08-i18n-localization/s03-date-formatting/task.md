# Stage 3 - Date formatting

The order detail shows a date like `2026-05-12` - a machine-friendly string, not
something you would print for a person, and again, not what every locale expects
(an American reads `5/12/2026`, a German reads `12.05.2026`). Dates have the same
problem as money, and the same clean solution: a built-in **`Date` type** that
formats them for the user's locale. This stage adds it, and teaches the one twist
dates have that money does not.

## The twist: source format vs display format

Money was a number. A date in our data is a **string** (`"2026-05-12"`), and the
framework cannot know that string is a date, or how it is written, unless you tell
it. So the `Date` type takes two formats:

- a **source** format - how the raw value is written in the data,
- a **display** format - how to show it to the user (driven by locale + a style).

```xml
<Text text="{
    path: 'orderDate',
    type: 'sap.ui.model.type.Date',
    formatOptions: {
        source: { pattern: 'yyyy-MM-dd' },
        style: 'long'
    }
}" />
```

- **`source: { pattern: 'yyyy-MM-dd' }`** - "the data stores dates as
  year-month-day strings." This lets the type parse `"2026-05-12"` into a real
  date. Forget it, and the type does not know how to read your string - a very
  common first mistake.
- **`style: 'long'`** - how to display it: `short`, `medium`, `long` or `full`. The
  *style* is locale-aware, so `long` becomes "12 May 2026" in English and
  "12. Mai 2026" in German, automatically. You pick the level of detail; the locale
  picks the words and order.

## Why patterns and styles are separate

This separation is deliberate and worth understanding. The **source pattern** is a
fact about your *data* - it does not change with the user. The **style** is a choice
about *presentation* - and the framework maps your style to each locale's
conventions. So you state the data fact once, choose a style once, and every user
sees a correctly formatted date in their own language. Hard-coding a single output
pattern (say `MM/dd/yyyy`) would look wrong to most of the planet; styles avoid that
trap.

## Your coding task

In `App.view.xml`'s detail panel, set the **type** on the order date so it is
formatted as a locale-aware date (the `source` pattern and `style` are already
provided).

## What the check verifies

- The order date uses the **`sap.ui.model.type.Date`** type.
- It declares the **source pattern** of the raw date string.

## Run it yourself

```
npx ui5 serve --open index.html
```

Select an order; the date now reads "12 May 2026" instead of "2026-05-12". Append
`?sap-ui-language=de` to the URL and it becomes "12. Mai 2026" - same data, the
reader's own format.

---

### Where this came from

`sap.ui.model.type.Date`, source/target formats and display styles are documented
in the SAPUI5 "Data Types" and "Date Format" topics at <https://ui5.sap.com/>. The
example is this course's own.
