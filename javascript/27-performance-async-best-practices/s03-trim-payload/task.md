# Stage 3 - Move less data: trimming the payload

The fastest request is the one that returns the least. A list that shows six columns has
no reason to download twenty fields per row - yet that is the default if you do not say
otherwise. **`$select`** tells the server to send only the fields you use, and on a large
table it is one of the biggest wins available. This stage trims the orders list.

## `$select`: ask for the columns you show

You met `$select` in Lesson 16; here we apply it as a deliberate performance measure on the
main list binding:

```xml
<Table items="{
    path: '/SalesOrders',
    parameters: {
        $count: true,
        $orderby: 'orderDate desc',
        $select: 'orderId,customer,status,amount,currency,priority'
    }
}" ... >
```

- **`$select: 'orderId,customer,...'`** - the server returns **only these properties**, not
  the whole entity. If `SalesOrder` had thirty fields, the response just dropped to six -
  a fraction of the bytes, parsed and bound faster, on every page the user scrolls.

This compounds with everything else: `$count` for paging, `$orderby` for server-side
sorting, `$select` for narrow rows, and `growing` (Lesson 18) so only a page loads at a
time. Together they mean a 50,000-row table moves *kilobytes per page*, not megabytes up
front.

A note on `autoExpandSelect`: our V4 model sets `autoExpandSelect: true` (Lesson 15), which
lets UI5 **infer** `$select`/`$expand` from what your bindings reference. Declaring
`$select` explicitly on a hot binding is still worthwhile - it is precise, visible, and not
dependent on inference - and it documents your intent. The principle to keep: **never
fetch a field you will not display.**

## Your coding task

In `List.view.xml`, add **`$select`** to the list binding so it requests **only the fields
the list shows**.

## What the check verifies (and where you are free)

- The list binding **selects only the fields it needs** (`$select`).
- *Which* fields you select are **yours** - they must match what your columns show; any
  valid `$select` passes. The check requires that you trim the payload, not a specific
  field list.

## Run it yourself

Open the network tab and look at the `SalesOrders` response before and after: with
`$select`, each row carries only the selected fields - a smaller, faster response, more
noticeable the wider the entity and the larger the table.

---

### Where this came from

`$select` as a payload-trimming measure, its interplay with `autoExpandSelect`, `$count`,
`$orderby` and `growing` follow the SAPUI5 "OData V4" and "Performance" documentation at
<https://ui5.sap.com/>. The field list matches this app's columns.
