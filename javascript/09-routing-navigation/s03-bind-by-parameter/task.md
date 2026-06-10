# Stage 3 - Bind the detail by route parameter

Clicking an order now takes us to the detail page and puts its index in the URL -
but the page is empty, because nothing reads that parameter yet. In this stage the
detail page **listens for its route, reads the parameter, and binds itself to the
right order**. This closes the master-detail loop, and it is the same element
binding you learned in Lesson 6, now driven by the URL instead of a click.

## Listening for "my route was matched"

The detail controller needs to know when the user has navigated to *its* route, and
with *which* order. The router fires an event for exactly this:

```js
onInit() {
    this.getOwnerComponent().getRouter()
        .getRoute("detail")
        .attachPatternMatched(this._onMatched, this);
}
```

- **`getRoute("detail")`** reaches the specific route object.
- **`attachPatternMatched(handler, this)`** says "call `_onMatched` every time the
  URL matches this route." It fires on the first navigation *and* on every later one
  (clicking a different order, or opening a `#/orders/5` link directly), so the page
  always reflects the current URL.

Wiring this in `onInit` is important: the controller sets up the listener once, when
it is created, and from then on reacts to navigation automatically.

## Reading the parameter and binding

When the route matches, the handler reads the parameter and binds the view:

```js
_onMatched(oEvent) {
    const sIndex = oEvent.getParameter("arguments").orderIndex;
    this.getView().bindElement("/salesOrders/" + sIndex);
}
```

- **`oEvent.getParameter("arguments")`** gives you the route's parameters as an
  object; `.orderIndex` is the value the list passed in `navTo`.
- **`bindElement("/salesOrders/" + sIndex)`** binds the *whole view* to that one
  order's path - exactly the element binding from Lesson 6, only the path now comes
  from the URL. Every relative binding in the detail view (`{customer}`, `{status}`,
  `{amount}`) resolves against that order.

That is the entire trick, and it is worth pausing on: **the URL is the source of
truth, and the page binds itself from it.** Because of this, `#/orders/3` is not just
an internal navigation - paste it into a fresh browser tab and the detail page opens
straight to order 3. Deep linking and bookmarking come for free, precisely because
the page reads its state from the URL rather than from whatever click happened to
precede it.

## Your coding task

In `Detail.controller.js`, complete `_onMatched` so it **binds the view** to the
order identified by the route's `orderIndex` parameter. (The `attachPatternMatched`
wiring in `onInit` is already in place.)

## What the check verifies

- The detail controller **listens for its route** being matched
  (`attachPatternMatched`).
- It **reads the route parameter** (`getParameter("arguments")`) and **binds the
  view** to that order (`bindElement`).

## Run it yourself

```
npx ui5 serve --open index.html
```

Click any order - the detail page now shows that order's customer, status, amount,
date and item count, all formatted from earlier lessons. Then try pasting a URL like
`index.html#/orders/2` into a new tab: it opens straight to that order. That is deep
linking, and you got it just by reading the parameter.

---

### Where this came from

`attachPatternMatched`, the `arguments` event parameter and binding from a route
follow the official **SAPUI5 Walkthrough** routing steps and `UI5/sample-app` at
<https://ui5.sap.com/>. The example is this course's own.
