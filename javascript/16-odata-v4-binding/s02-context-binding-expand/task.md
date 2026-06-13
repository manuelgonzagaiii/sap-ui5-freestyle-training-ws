# Stage 2 - Context binding and $expand

An order is not just its own fields - it is made of **line items** (remember the
`Composition` in the CAP model). When the user opens an order, they want to see those
items too. OData V4 lets you fetch an entity **together with its related data in one
request** using **`$expand`**, and the framework binds it all from a single context.
This stage shows the order's items, and teaches how related data flows in V4.

## Context binding: one entity, many fields

The detail page uses **context binding** - the whole view bound to one order's context,
which you set with `bindElement`. Its relative bindings (`{customer}`, `{status}`)
resolve against that order. You have done this since Lesson 6; the V4 version builds the
key path directly:

```js
this.getView().bindElement({
    path: "/SalesOrders(orderId='" + sOrderId + "')",
    parameters: { $expand: "items" }
});
```

The new part is the **`parameters`** - and specifically `$expand`.

## `$expand`: fetch related data in one round trip

By default, loading an order brings back its own columns, not its items. **`$expand`**
tells the server to include related entities in the same response:

```
GET /odata/v4/sales/SalesOrders(orderId='SO-1001')?$expand=items
```

The server returns the order **with its `items` array nested inside**. One request,
everything you need - instead of loading the order, then making a second request for its
items. On a slow connection, that difference is felt.

Once the items are loaded, the view binds to them with a plain **relative aggregation
binding** - the same `items="{...}"` from Lesson 6, but the collection is now the order's
own `items` association:

```xml
<Table items="{items}">
    <items><ColumnListItem><cells>
        <Text text="{product}" /> <Text text="{quantity}" /> <Text text="{price}" />
    </cells></ColumnListItem></items>
</Table>
```

`items="{items}"` means "bind to *this order's* items" (relative, no leading slash), and
each row's `{product}`, `{quantity}`, `{price}` resolve against one line item. It is
aggregation binding again - the difference is only that the collection comes from an
expand, not the model root.

## The mental model

**A composition or association is a doorway to related data, and `$expand` walks through
it in the same request.** Think in terms of the *graph* of your data - an order, its
items, maybe their products - and `$expand` lets you pull a slice of that graph in one
call, then bind the pieces with ordinary relative bindings. (With `autoExpandSelect`
on, the model can even add expands for you when a binding references related fields - but
declaring it explicitly here makes the idea concrete.)

## Your coding task

In `Detail.controller.js`, add the **`$expand`** parameter so the order is loaded
together with its line **items**.

## What the check verifies

- The detail binds with an **`$expand`** parameter to load related items.
- The detail shows the order's items via a **relative aggregation binding**
  (`items="{items}"`).

## Run it yourself

Open an order with line items (SO-1001 has two). The Items section fills with a table of
products, quantities and prices - all fetched in the single `$expand` request you can see
in the network tab.

---

### Where this came from

Context binding, `$expand` and relative aggregation binding follow the SAPUI5 "OData V4"
documentation and API Reference at <https://ui5.sap.com/>; the line-item seed data is
served by the CAP composition from Lesson 15. Verify the expanded data in the browser.
