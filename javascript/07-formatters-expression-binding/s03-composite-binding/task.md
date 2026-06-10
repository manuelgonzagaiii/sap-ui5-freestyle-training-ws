# Stage 3 - Composite binding

So far each binding has read **one** value. But often the thing you want to show is
built from **several** fields: a full name from first and last, a label like
"Atlas Trading (SO-1001)" from a customer and an order id. Stitching those together
is **composite binding** - one binding, many inputs, run through a formatter that
combines them.

## The problem composite binding solves

You might be tempted to write two controls side by side, or to concatenate in the
data. Both are clumsy. What you actually want is a *single* bound text whose value
depends on *two* model fields, updating if either changes. That is precisely
composite binding:

```xml
<Text text="{
    parts: ['customer', 'orderId'],
    formatter: '.formatter.customerLine'
}" />
```

- **`parts: ['customer', 'orderId']`** - the list of fields to feed in. Each entry
  is a binding path; you can have as many as you need.
- **`formatter: '.formatter.customerLine'`** - a formatter that receives those
  parts **as arguments, in order**, and returns the combined string.

The formatter mirrors that argument order:

```js
customerLine(sCustomer, sOrderId) {
    return sCustomer + " (" + sOrderId + ")";
}
```

So `parts[0]` arrives as the first parameter, `parts[1]` as the second. The result -
`Atlas Trading (SO-1001)` - is one piece of text, bound to two fields, and it
re-computes automatically if either field changes. That live, multi-field reaction
is the difference between composite binding and just gluing strings together once.

## The same formatter idea, more inputs

Notice composite binding is really just the formatter from Stage 1 with **more than
one input**. A single-value formatter took one argument; a composite one takes
several, listed in `parts`. Same module, same `.formatter.xxx` wiring, same
"presentation logic lives in one tested place" principle - scaled up to combine
fields. Once you see formatters and composite binding as one idea (a function
between data and display), the whole formatting toolkit collapses into something
simple.

## Your coding task

In `App.view.xml`'s detail panel, complete the composite binding by listing the
**fields to combine** in `parts` (the `customerLine` formatter is already written
for you).

## What the check verifies

- A binding combines several fields via a **`parts`** array.
- That composite binding runs through a **formatter**.
- The formatter module provides the combining function (`customerLine`).

This is rule-of-law wiring (the parts must match what the formatter expects), but
the skill is recognising *when* a display value is really several fields in a
trench coat - and reaching for `parts` instead of a hack.

## Run it yourself

```
npx ui5 serve --open index.html
```

Select an order; the detail panel now shows a combined "Customer (Order id)" line,
built from two fields by one binding.

---

### Where this came from

Composite binding (`parts` + `formatter`) is documented in the SAPUI5 "Composite
Binding" topic and API Reference at <https://ui5.sap.com/>; the `formatMessage`
helper in `UI5/sample-app` uses the same idea. The combined line is this course's
own.
