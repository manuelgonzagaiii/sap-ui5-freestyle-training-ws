# Stage 2 - Common input controls

A business app is mostly forms: fields the user fills, options they pick, boxes
they tick. SAPUI5 gives you a rich set of ready-made input controls so you almost
never build these from scratch. In this stage you add a couple of them and, more
importantly, learn **how to discover and reason about any control you have not met
before** - because there are hundreds, and nobody memorises them all.

## A small tour of `sap.m` inputs

You already use `sap.m.Input` (free text). A few more you will reach for
constantly:

- **`Input`** - single-line text. Properties like `value`, `placeholder`,
  `type` (so it can be an email or number field).
- **`Select`** - a dropdown of fixed choices.
- **`ComboBox`** - like a Select, but the user can also type to filter.
- **`CheckBox`** - a single on/off choice.
- **`RadioButtonGroup`** - pick one of several.
- **`DatePicker`**, **`TimePicker`** - calendar and clock inputs.
- **`Slider`**, **`StepInput`** - numeric input by dragging or stepping.

We add a `Select` and a `CheckBox` to feel two things: a control with an
**aggregation of options**, and a simple **boolean** control.

```xml
<Select id="prioritySelect">
    <items>
        <core:Item key="low" text="Low" />
        <core:Item key="high" text="High" />
    </items>
</Select>
<CheckBox text="Urgent" />
```

Look at the `Select`: its choices are not a property, they are an **aggregation**
called `items`, filled with `sap.ui.core.Item` controls. Each `Item` has a `key`
(the value your code works with) and a `text` (what the user sees). This is the
same properties-and-aggregations model from stage 1 - a dropdown is just a control
that *contains* its options. The `xmlns:core="sap.ui.core"` line at the top of the
view is what lets us write `<core:Item>`; `Item` lives in the core library, not in
`sap.m`.

## How to meet a control you do not know

This is the skill that outlasts any list I could give you. When you hit a control
you have never used:

1. **Open the API Reference** at [ui5.sap.com](https://ui5.sap.com/) and read its
   four lists: properties, aggregations, associations, events.
2. **Open its Samples** in the Demo Kit - live, runnable examples you can read.
3. **Use the worklist/sample apps** as a pattern - the official `UI5/sample-app`
   shows real controls wired up the right way.

Do that, and you never need to memorise controls - you need to know *how to read
one*. That is the difference between a developer who is stuck without an example
to copy and one who can pick the right control for a job they have never done
before.

## Your coding task

In `App.view.xml`:

1. Give the `Select` its options by filling the correct **aggregation**.
2. Give the `CheckBox` a **label** of your choosing.

## What the check verifies (and where you are free)

- A `Select` is present and fills its **`items`** aggregation with `Item`
  options (rule of law - a Select with no items is empty and useless).
- A `CheckBox` is present, with a **label that is yours to write**.

## Run it yourself

```
npx ui5 serve --open index.html
```

Open the dropdown and tick the box - real input controls, with no custom widget
code on your part. That is the payoff of a control library: the common things are
already built, tested and accessible.

---

### Where this came from

`sap.m.Select`, `sap.m.CheckBox` and `sap.ui.core.Item` are documented in the
SAPUI5 API Reference at <https://ui5.sap.com/>. The chosen options and labels are
this course's own.
