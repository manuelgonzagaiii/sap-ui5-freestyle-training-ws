# Stage 3 - Bind the UI to the OData service

The OData model is running, but the screen is still bound to the old JSON paths. In
this stage we re-point the list and the detail at the OData service. The list binding
barely changes - but the detail does something genuinely new: it looks an order up by
its **key**, the OData way. Understanding that shift is the point of this stage.

## The list: one path changes

The orders list was bound to the JSON array `{/salesOrders}`. The OData entity set is
`{/SalesOrders}`:

```xml
<List items="{/SalesOrders}"> ... </List>
```

That is it. The template, the relative bindings (`{customer}`, `{amount}`,
`{status}`), the sorter, the search filter - **all unchanged**. This is the reward of
the binding system: the *source* of the collection swapped from a file to a server,
and the UI did not care. Behind the scenes, the framework now sends
`GET /sales/SalesOrders` and renders the response.

There is a real upgrade hidden in this, though: with OData, your **search and sort go
to the server**. When you type in the search field, the framework sends
`?$filter=substringof('atlas',customer)` and the server returns only matching rows.
On a real dataset of thousands of orders, that is the difference between fetching
everything and fetching only what you need - and you wrote the same `Filter` and
`Sorter` as in Lesson 6.

## The detail: addressing one order by key

This is the new idea. With the JSON array, our detail page found an order by its
**position** (`/salesOrders/3`). OData does not work that way - it addresses a single
entity by its **key**, the `orderId` we declared in the metadata:

```
/SalesOrders('SO-1004')
```

So the routing now carries the **`orderId`** (not an array index), and the detail
builds that key path to bind to:

```js
_onMatched(oEvent) {
    const sOrderId = oEvent.getParameter("arguments").orderId;
    const sPath = this.getView().getModel().createKey("/SalesOrders", { orderId: sOrderId });
    this.getView().bindElement(sPath);
}
```

- **`createKey("/SalesOrders", { orderId: sOrderId })`** builds the proper key path -
  `/SalesOrders('SO-1004')` - and handles the quoting and encoding for you. Always use
  it rather than gluing the string together by hand.
- **`bindElement(sPath)`** then binds the detail to that one entity, just like Lesson
  6 - only now the path is a key, and the data comes from the server.

Why is key-based better than index-based? Because a key is **stable and meaningful**:
`SO-1004` is *that* order forever, no matter how the list is sorted or filtered.
Position 3 is whatever happens to be third right now. This is also what makes the URL
`#/orders/SO-1004` a real, shareable deep link to a specific order.

## Your coding task

In `List.view.xml`, bind the list's items to the **`SalesOrders`** OData entity set.
(The detail's key-based binding is already wired for you - read it to see how
`createKey` works.)

## What the check verifies

- The list binds to the **`SalesOrders`** entity set.
- The detail binds to a **single order by its key** (`createKey` + `bindElement`).

## Run it yourself

```
npx ui5 serve --open index.html
```

The list and detail look the same, but watch the network tab: selecting an order
fires `GET /sales/SalesOrders('SO-1004')`, and searching fires a `$filter` request.
The app is now fully driven by OData, with stable, shareable order URLs.

---

### Where this came from

OData entity-set binding, key predicates and `ODataModel.createKey` follow the SAPUI5
"OData V2 Model" documentation and API Reference at <https://ui5.sap.com/>. The
routing change is this course's own.
