# Stage 2 - Element binding

A list shows many orders at once. But the moment a user clicks one, they want to
see *that* order in detail. The clean way to wire "the thing they selected" to a
detail area is **element binding**, and it rests on a concept you must understand
to ever build a master-detail screen: the **binding context**. Get this, and
routing to a detail page (Lesson 9) will feel obvious.

## The binding context: "which one am I?"

When aggregation binding stamps out a row per order, each row quietly carries a
**binding context** - a pointer to the single order it represents. The row's
relative bindings (`{customer}`, `{status}`) work *because* of that context: they
resolve against the order the context points to.

When the user presses a row, we can ask it for that context:

```js
onOrderPress(oEvent) {
    const oContext = oEvent.getSource().getBindingContext();
    this.byId("detailPanel").bindElement(oContext.getPath());
}
```

- **`oEvent.getSource()`** is the pressed `ObjectListItem` (the event skill from
  Lesson 3).
- **`.getBindingContext()`** returns that item's context - its pointer to one
  order.
- **`.getPath()`** turns the context into a model path, like `/salesOrders/3`.

## Element binding: bind a whole control to one object

```js
this.byId("detailPanel").bindElement("/salesOrders/3");
```

**`bindElement`** binds an entire control - here our detail `Panel` - to a single
object's path. From that moment, every **relative** binding *inside* the panel
resolves against that order:

```xml
<Panel id="detailPanel">
    <Text text="Customer: {customer}" />
    <Text text="Status: {status}" />
    <Text text="Amount: {amount} {currency}" />
</Panel>
```

Notice the panel's children use the same relative paths as the list template -
`{customer}`, `{status}` - with no array index anywhere. They do not need one,
because the panel now *has a context*: the order you bound it to. Press a different
row and the panel re-binds and shows that order instead. You wrote the detail
markup once; element binding points it at whichever order is selected.

## Why this is the foundation of master-detail

This is the exact pattern behind every list-and-detail screen in SAP software, and
behind the routing we build in Lesson 9. The only thing that changes there is
*where* the detail lives (a separate page reached by a URL) - the mechanism is
identical: a context identifies one object, and a control bound to that context
shows it. Once "a context is a pointer to one row, and relative bindings resolve
against it" is second nature, half of UI5 stops being mysterious.

## Your coding task

In `App.controller.js`'s `onOrderPress`, fill in the two steps:

1. Read the pressed item's **binding context**.
2. **Bind the detail panel** to that context's path.

The list items are already pressable and the detail `Panel` already exists with
relative bindings - your job is to connect the selection to the panel.

## What the check verifies

- List items are **pressable** and a **detail area** exists.
- The handler reads the pressed item's **binding context**
  (`getBindingContext`).
- It binds the detail area to that context with **`bindElement`**.

## Run it yourself

```
npx ui5 serve --open index.html
```

Click any order in the list and watch the detail panel below fill with that order's
customer, status and amount. Click another - it updates. One panel, any order,
driven entirely by the binding context.

---

### Where this came from

Binding contexts and `bindElement` are documented in the SAPUI5 "Element Binding"
topic and API Reference at <https://ui5.sap.com/>; the master-detail pattern
follows the official Walkthrough's later steps. The example is this course's own.
