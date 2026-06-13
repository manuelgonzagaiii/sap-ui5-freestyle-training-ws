# Stage 1 - V4 list binding and query options

The app now talks to a real OData V4 server, but it is still asking for data the lazy
way: "give me everything." A real backend can do far more for you - count, sort,
trim - if you ask precisely. OData V4 bindings let you attach **query options** that
the framework sends to the server, so the **server** does the heavy lifting and the app
fetches only what it needs. This stage tunes the orders list with those options.

## The extended binding, with parameters

You met the extended (object) binding form back in Lesson 6 for sorting a JSON list.
With OData V4 it becomes essential, because it carries the **query parameters** sent to
the server:

```xml
<List items="{
    path: '/SalesOrders',
    parameters: {
        $count: true,
        $orderby: 'orderDate desc',
        $select: 'orderId,customer,status,amount,currency,priority'
    }
}" />
```

- **`$count: true`** - ask the server to also report the **total number** of orders, so
  controls can show "238 orders" and page correctly through them.
- **`$orderby: 'orderDate desc'`** - **sort on the server**, newest first. The database
  orders the rows; the app receives them already sorted.
- **`$select: 'orderId,customer,...'`** - request **only these fields**. Why download
  twenty columns when the list shows six? `$select` shrinks every response.

These are real OData URL options. When the binding loads, the framework sends something
like `GET /odata/v4/sales/SalesOrders?$count=true&$orderby=orderDate desc&$select=...` -
and you wrote none of that URL by hand.

## Why push work to the server

This is the central lesson of server-backed apps. With a 50,000-row table:

- Sorting **in the browser** means downloading all 50,000 rows first - slow and
  wasteful. Sorting **on the server** (`$orderby`) means the database sorts and you get
  back only the page you show.
- The same goes for filtering (`$filter`, which your search field already produces) and
  paging (`$top`/`$skip`, which the list does as you scroll).

Our model is configured for this with `operationMode: "Server"` (from the manifest) and
`autoExpandSelect: true`, which even lets the model add `$select`/`$expand` for you based
on what your bindings reference. The principle to keep: **ask the server for exactly what
you need, and let it do the work.** That is what makes an OData app scale.

## Your coding task

In `List.view.xml`, add the query option that **sorts the orders on the server, newest
first** (`$orderby`).

## What the check verifies (and where you are free)

- The list binding uses the **extended form with parameters**.
- At least one **server-side query option** is declared (`$count` / `$orderby` /
  `$select`).
- **Which** options you add, the sort field and direction, and exactly which fields you
  `$select` are **your design choices** - any valid OData V4 query option passes. The
  check insists only that you push *some* work to the server through a real query option,
  not on a specific one.

## Run it yourself

With both servers running (`cds watch` and `ui5 serve`), watch the network tab: the
list request now carries `$orderby`, `$count` and `$select`, and the response is sorted,
counted and trimmed by CAP. Same screen, far less data moved.

---

### Where this came from

OData V4 list-binding parameters (`$count`, `$orderby`, `$select`, `operationMode`,
`autoExpandSelect`) follow the SAPUI5 "OData V4" documentation and API Reference at
<https://ui5.sap.com/> (from the author's knowledge; verify against the running CAP
service). The chosen options are this course's own.
