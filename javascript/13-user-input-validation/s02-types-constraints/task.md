# Stage 2 - Types and constraints

A form that accepts anything is a form that produces bad data. "abc" in the amount
field, an empty customer, a thousand-character name - garbage in, garbage stored.
The professional way to stop this is **not** to write checking code in your save
handler; it is to declare, on each field, **what a valid value looks like**, and let
the framework enforce it. You do that with **model types** (Lesson 7) and their
**constraints**. This stage makes the form's fields self-validating.

## Types do the parsing and checking

Recall from Lesson 7 that a **type** formats a value, **parses** user input back, and
**validates** it. On an editable, two-way-bound field, that middle-and-last part
matter: when the user types, the type tries to **parse** their text into the model's
value, and **validate** it against rules. If it cannot, it raises a validation error -
no `if` statements from you.

You attach a type in the binding, exactly as in Lesson 7:

```xml
<Input value="{
    path: 'create>/amount',
    type: 'sap.ui.model.type.Float',
    constraints: { minimum: 0 }
}" />
```

Now the amount field only accepts a number, and only a non-negative one. Type "abc"
and the type cannot parse it; type "-5" and the constraint rejects it.

## Constraints: the rules of a valid value

**`constraints`** is where you state the field's rules, and they differ by type:

- **`sap.ui.model.type.Float`** / `Integer` - `minimum`, `maximum` (so an amount
  cannot be negative, a quantity cannot exceed stock).
- **`sap.ui.model.type.String`** - `minLength`, `maxLength`, even a `search` regular
  expression (so a customer name is present and not absurdly long):

```xml
<Input value="{ path: 'create>/customer', type: 'sap.ui.model.type.String', constraints: { minLength: 1, maxLength: 40 } }" />
```

`minLength: 1` makes the field effectively required (empty fails); `maxLength: 40`
caps it. The `required="true"` you set on the label in Stage 1 shows the asterisk;
the constraint is what actually *enforces* it.

## Why declare rules instead of coding them

This is the design lesson worth internalising. You *could* write validation in the
save handler - check the amount is a number, check the customer is not empty, and so
on. But that scatters rules far from the fields, runs only on save (so the user finds
out late), and you re-write it for every form. Declaring the rule **on the field**
puts it where it belongs, runs it **as the user types**, gives a consistent message,
and works for free. **The field knows its own rules.** That is the mindset of a good
UI5 developer: describe the constraints, let the framework enforce them.

One thing to notice: at this stage the rules are declared, but the red highlighting
and messages do not appear yet - that needs one more switch, which is the next stage.

## Your coding task

In `CreateOrder.fragment.xml`, give the amount input a **constraint** so it cannot be
negative.

## What the check verifies (and where you are free)

- An input is bound with a **model type**.
- The binding declares **constraints**. Which constraints you choose is a design
  decision - a non-negative amount, a max-length name, your own limits - as long as
  they are real constraints. Valid rules pass; the point is that you *declare* them.

## Run it yourself

```
npx ui5 serve --open index.html
```

The fields now have rules. (You will see them enforced visibly in the next stage,
once validation handling is switched on.) The data your form can produce is already
constrained at the source.

---

### Where this came from

`sap.ui.model.type.Float`/`String` and their `constraints` are documented in the
SAPUI5 "Data Types" topic and API Reference at <https://ui5.sap.com/>. The chosen
rules are this course's own.
