# Stage 2 - Growing and paging

Our table loads all the orders at once. With eight rows nobody notices; with eight
thousand, the first load would take seconds, move megabytes, and render thousands of
rows nobody has scrolled to. The professional answer is **paging**: load a page, and
fetch more only when the user actually wants it. On a responsive table that feature is
called **growing**, and it is one property away.

## Growing: the table fetches as you scroll

```xml
<Table
    items="{ path: '/SalesOrders', parameters: { $count: true, $orderby: 'orderDate desc' } }"
    growing="true"
    growingThreshold="20"
    growingScrollToLoad="true">
```

- **`growing="true"`** - do not render the whole dataset; show a first chunk and let
  the user request more.
- **`growingThreshold="20"`** - the page size: how many rows to load per chunk.
- **`growingScrollToLoad="true"`** - fetch the next chunk automatically when the user
  scrolls to the bottom (instead of showing a "More" button). Both behaviours are
  legitimate; scrolling feels natural for long lists, the button gives the user explicit
  control.

## What happens underneath: server-side paging

This is the part worth understanding. With an OData V4 binding, growing does not load
everything and *display* it in chunks - it **requests** in chunks. The table asks the
binding for 20 rows; the binding sends:

```
GET /odata/v4/sales/SalesOrders?$top=20&$skip=0&...
```

Scroll down, and the next request is `$top=20&$skip=20` - the next page, fetched from
CAP only when needed. The `$count: true` we set in Lesson 16 is what lets the table
show "Sales orders (8)" and know when it has reached the end.

So three layers cooperate, each doing its part: the **table** decides *when* more rows
are needed (the user scrolled), the **binding** translates that into *which* rows
(`$top`/`$skip`), and the **server** returns only those. You configure one property;
the protocol does the rest. This is the same "push work to the server" principle as
`$orderby` and `$filter` - applied to volume.

The mental model: **a growing table is a window over a server-side dataset, not a copy
of it.** That is what lets the same screen handle eight rows or eight hundred thousand
without changing a line.

## Your coding task

In `List.view.xml`, switch the table to **growing** so it pages instead of loading
everything at once.

## What the check verifies (and where you are free)

- The table **grows** (`growing="true"`). The threshold and whether you use
  scroll-to-load or the "More" button are **your design choices** - any sensible paging
  setup passes; loading everything eagerly does not.

## Run it yourself

With only eight orders the paging will not visibly trigger - so open the network tab
and look at the request: it now carries `$top` and `$skip`. Add more rows to
`db/data/ui5.sales-SalesOrders.csv` (copy lines with new `orderId`s), restart
`cds watch`, and watch the table fetch them page by page as you scroll.

---

### Where this came from

`growing`, `growingThreshold`, `growingScrollToLoad` and V4 `$top`/`$skip` paging follow
the SAPUI5 API Reference (`sap.m.ListBase`) and "OData V4" documentation at
<https://ui5.sap.com/>; the official `UI5/sample-app` uses the same growing pattern on
its list. The page size is this course's own choice.
