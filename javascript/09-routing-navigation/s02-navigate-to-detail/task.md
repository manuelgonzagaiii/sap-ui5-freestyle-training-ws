# Stage 2 - Navigate to a detail route

The list is now a routed page. Next we add a **second** page - the order detail -
and make clicking a list row take the user to it. This introduces the two ideas
that make navigation useful: a **route with a parameter** (so one route can show
*any* order), and **`navTo`** (the call that moves between pages).

## A route that carries data

We do not want one route per order - that would be madness. We want a single
`detail` route that can show *whichever* order the user picked. You do that with a
**pattern parameter**:

```json
{ "name": "detail", "pattern": "orders/{orderIndex}", "target": "detail" }
```

The `{orderIndex}` in the pattern is a placeholder. So:

- `#/orders/3` matches this route with `orderIndex = 3`,
- `#/orders/7` matches it with `orderIndex = 7`.

One route, every order. The matching `detail` target loads a new
**`Detail.view.xml`** (with its own controller) - a second page, sitting in the
same `app` `NavContainer`, ready for the router to show.

## Navigating with `navTo`

When the user presses an order, the list controller asks the router to navigate:

```js
onOrderPress(oEvent) {
    const sPath = oEvent.getSource().getBindingContext().getPath();  // "/salesOrders/3"
    const sIndex = sPath.split("/").pop();                            // "3"
    this.getOwnerComponent().getRouter().navTo("detail", { orderIndex: sIndex });
}
```

- We reuse the **binding context** skill from Lesson 6: the pressed row's context
  path (`/salesOrders/3`) tells us *which* order it is, and we take the index from
  it.
- **`getOwnerComponent().getRouter()`** reaches the app's router (the router belongs
  to the Component, not one view).
- **`navTo("detail", { orderIndex: sIndex })`** is the heart of it: "go to the
  `detail` route, filling its `{orderIndex}` placeholder with this value." The
  router updates the URL to `#/orders/3` and shows the detail page.

Notice what `navTo` does *not* do: it does not reach into the detail view and push
data in. It only changes the route and its parameter. The detail page is
responsible for reading that parameter and showing the right order - which is the
next stage. This separation is deliberate and powerful: **navigation is about the
URL; what each page shows is the page's own job.** It is what makes those URLs
bookmarkable.

## Your coding task

1. In `manifest.json`, give the **detail route** a URL pattern with an
   **`{orderIndex}` parameter**.
2. In `List.controller.js`, make `onOrderPress` **navigate to the detail route**,
   passing the order's index.

## What the check verifies

- A **detail view and controller** exist.
- A **`detail` route with a parameter** is configured, with a matching target.
- Pressing an order **navigates to the detail route** with a parameter.

## Run it yourself

```
npx ui5 serve --open index.html
```

Click an order. The app slides to a (still mostly empty) detail page, and the URL
becomes `#/orders/...`. Press the browser back button - you return to the list, for
free, because the navigation lives in the URL. Next stage, we make the detail page
actually show the order.

---

### Where this came from

Route parameters, `navTo` and the owner-component router follow the official
**SAPUI5 Walkthrough** routing steps and `UI5/sample-app` at <https://ui5.sap.com/>.
The route and parameter design are this course's own.
