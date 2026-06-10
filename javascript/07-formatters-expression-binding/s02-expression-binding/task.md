# Stage 2 - Expression binding

A formatter is the right tool when the logic is real (a switch over statuses, a
calculation). But sometimes the logic is tiny - "is this over 1000?", "is the
priority High?" - and writing a whole function for it feels heavy. For those, UI5
gives you **expression binding**: a little bit of logic written *inside the
binding itself*. In this stage you use it to flag high-priority orders with a red
edge.

## The `{= ... }` syntax

An ordinary binding is `{path}`. An **expression** binding starts with `{=` and
lets you write a small JavaScript-like expression:

```xml
<ObjectListItem highlight="{= ${priority} === 'High' ? 'Error' : 'None' }" />
```

- **`{= ... }`** - the `=` marks this as an expression, not a plain path.
- **`${priority}`** - inside an expression, a model value is written `${...}`
  (with the dollar sign), because the bare `{...}` syntax is already taken by
  normal bindings. So `${priority}` is "this order's priority."
- The rest is a normal ternary: if the priority is `High`, evaluate to `Error`
  (which gives `highlight` a red bar); otherwise `None`.

`sap.m.ObjectListItem` has a **`highlight`** property - a coloured strip down the
left edge of the row - made for exactly this kind of at-a-glance signal.

## When to use expression binding (and when not to)

This is a genuine design judgement, so here is the rule of thumb:

- **Use expression binding** for short, presentation-only logic: a comparison, a
  ternary, a boolean for `visible` or `enabled`. It keeps the intent right next to
  the control, with no function to hunt for. You already used one in Lesson 5
  (`{= !${device>/isPhone} }`).
- **Use a formatter** when the logic is more than a line, needs more than one
  value in a non-trivial way, or you want to unit-test it. A `switch` over four
  statuses belongs in a formatter; `> 1000` does not.

The anti-pattern to avoid is cramming a paragraph of logic into a binding string -
it becomes unreadable and untestable. Expression binding is a scalpel, not a
hammer: small, sharp, local.

## Your coding task

In `App.view.xml`, complete the `highlight` expression so that **high-priority**
orders show a red (`Error`) highlight and the rest show `None`.

## What the check verifies (and where you are free)

- The list item's `highlight` uses **expression binding** (`{= ... }`).
- The expression **references a model property** (`${...}`).

The exact rule is your design choice - you might highlight `High` priority in red,
or large amounts, or anything that helps the user - as long as it is a real
expression reading real data. Rule of law: a valid expression binding. Freedom:
what you choose to flag.

## Run it yourself

```
npx ui5 serve --open index.html
```

High-priority orders now carry a red strip down their left edge, computed inline
from the data. Try changing the condition (say, highlight `Medium` in orange with
`'Warning'`) to feel how expression binding reacts.

---

### Where this came from

Expression binding (`{= ... }`, the `${...}` syntax) and the `ObjectListItem`
`highlight` property are documented in the SAPUI5 "Expression Binding" topic and
API Reference at <https://ui5.sap.com/>. The highlight rule is this course's own.
