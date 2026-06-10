# Stage 4 - Custom data type

Formatters are one-way: they turn model data into display text, and that is all.
But what about an **editable** field, where the user types something that has to be
turned *back* into a model value - and checked for validity? For that, UI5 has a
richer tool than a formatter: a **type**. In this stage you build your own custom
type, and in doing so you learn the real difference between a formatter and a type -
a distinction that matters the moment you build forms.

## Formatter vs type: the key distinction

- A **formatter** does one direction: model value -> display. Great for read-only
  text.
- A **type** does **three** things:
  1. **`formatValue`** - model value -> display (like a formatter),
  2. **`parseValue`** - user input -> model value (the way back),
  3. **`validateValue`** - check the value is acceptable, and complain if not.

So a type is what you use on **two-way bound, editable** fields: it formats what
the user sees, parses what they type back into the model, and validates it on the
way. A formatter simply cannot do the last two. (You will lean on built-in types
heavily in the next lesson for currencies and dates, and in the validation lesson
for form input.)

## Building a custom type

A custom type extends **`sap.ui.model.SimpleType`**. Ours formats an item count as
a friendly "3 items":

```js
return SimpleType.extend("ui5.sales.model.ItemCountType", {
    formatValue(iCount) {
        return iCount + (iCount === 1 ? " item" : " items");
    },
    parseValue(sValue) {
        return parseInt(sValue, 10);
    },
    validateValue() {
        // nothing to validate for this simple example
    }
});
```

Notice `formatValue` even handles the singular ("1 item" vs "3 items") - the kind
of polish a type makes easy. `parseValue` shows the round trip: if this were on an
editable input, typing "5 items" would parse back to the number `5` in the model.

## Using a type in a binding

You attach a type with the `type` key in the extended binding syntax:

```xml
<Text text="{ path: 'itemCount', type: 'ui5.sales.model.ItemCountType' }" />
```

The framework loads your type by its name and runs the value through
`formatValue`. On an `Input` instead of a `Text`, the same type would also parse
and validate the user's edits - the binding does not change, only the control does.

## The mental model

**Formatter for display-only, type for editable.** When a value is just shown,
a formatter is lighter and fine. The moment the user can *edit* it - and you need
to convert their input back and guard against nonsense - you want a type. Knowing
which to reach for is exactly the kind of design call this course exists to build.

## Your coding task

In `App.view.xml`'s detail panel, bind the item-count `Text` using your **custom
type** (`ItemCountType.js` is written for you).

## What the check verifies

- A custom **`SimpleType`** is defined with a **`formatValue`** method.
- A binding in the view uses the **custom type**.

## End of Lesson 7

Your orders now *look* like a real business app: statuses are colour-coded by a
formatter, high-priority rows are flagged by an inline expression, the detail panel
combines fields with composite binding, and a custom type formats values with the
machinery to parse and validate them later. You can now control not just *what*
data appears, but exactly *how* it reads - all without ever touching the data.

In **Lesson 8** we make that presentation speak every user's language:
**internationalisation**. You will move all text into a translation file and format
amounts and dates the way each locale expects - so `1250.5` becomes `1.250,50 EUR`
for a German user and `$1,250.50` for an American one, from the same data.

---

### Where this came from

`sap.ui.model.SimpleType` and the `type` binding option are documented in the
SAPUI5 "Data Types" topic and API Reference at <https://ui5.sap.com/>. The
`ItemCountType` is this course's own example.
