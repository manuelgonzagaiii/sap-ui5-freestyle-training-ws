# Stage 1 - FlexibleColumnLayout

Until now, opening an order *replaced* the list with a full-screen detail page. On a
wide monitor that wastes most of the screen, and it makes the user lose their place
in the list. The signature SAP Fiori answer is the **FlexibleColumnLayout** (FCL):
the list and the detail sit **side by side**, in resizable columns, collapsing to a
single column on a phone. This stage swaps our master-detail onto an FCL - the
biggest structural change in the course - and it is what makes the app finally look
like real Fiori software.

## What the FCL is

`sap.f.FlexibleColumnLayout` is a container that shows **up to three columns** at
once - **begin**, **mid** and **end** - and animates between layouts as the user
drills in:

- one column (just the list),
- two columns (list + detail),
- three columns (list + detail + a sub-detail),
- or any of those with one column expanded to full screen.

Which arrangement is showing is the FCL's **`layout`** property, a value from a
fixed set (`OneColumn`, `TwoColumnsMidExpanded`, `MidColumnFullScreen`, and so on).
Change that one property and the FCL slides between arrangements for you. This is
the standard list-detail pattern across SAP Fiori.

## Three wiring changes

Moving to an FCL touches three places, and seeing how they fit is the lesson:

**1. The root view becomes the FCL.** `App.view.xml` swaps `<App>` for:

```xml
<f:FlexibleColumnLayout id="fcl" layout="{fcl>/layout}" />
```

The `layout` is **bound** to a property in a model named `fcl` - so the current
arrangement is data, and changing it is just setting a value.

**2. Routing fills columns, not pages.** The router now needs to know *which column*
each view goes in. So the config uses the **`sap.f.routing.Router`**, points
`controlId` at our `fcl`, and each target names a column aggregation:

```json
"targets": {
    "list":   { "name": "List",   "controlAggregation": "beginColumnPages" },
    "detail": { "name": "Detail", "controlAggregation": "midColumnPages" }
},
"routes": [
    { "name": "list",   "pattern": "",                "target": "list",            "layout": "OneColumn" },
    { "name": "detail", "pattern": "orders/{orderIndex}", "target": ["list", "detail"], "layout": "TwoColumnsMidExpanded" }
]
```

Notice the detail route targets **both** `list` and `detail` (so the list stays
visible in the begin column) and declares a **`layout`** - the arrangement that
route should show.

**3. The App controller applies each route's layout.** A small controller listens
for navigation and copies the route's `layout` into the `fcl` model:

```js
_onRouteMatched(oEvent) {
    const sLayout = oEvent.getParameter("config").layout;
    if (sLayout) {
        this.getOwnerComponent().getModel("fcl").setProperty("/layout", sLayout);
    }
}
```

So the flow is: navigate -> the route declares a layout -> the controller writes it
to the model -> the bound FCL slides to that arrangement. The URL still drives
everything (deep linking still works); the FCL just renders it as columns.

## Your coding task

1. In `App.view.xml`, **bind** the FCL's `layout` to the `fcl` model.
2. In `manifest.json`, set the detail route's **layout** to the two-column
   arrangement.

## What the check verifies

- The root view is a **`FlexibleColumnLayout`** with its `layout` **bound** to the
  `fcl` model.
- Routing uses the **`sap.f.routing.Router`** with **`beginColumnPages` /
  `midColumnPages`** aggregations.
- The detail route opens a **two-column** layout.
- The App controller **updates the layout on every navigation**.

## Run it yourself

```
npx ui5 serve --open index.html
```

On a wide window, click an order - the list stays on the left and the detail opens
on the right, side by side. Narrow the window and it collapses back to one column.
That is the Fiori master-detail experience, and the list never disappears under you.

---

### Where this came from

`sap.f.FlexibleColumnLayout` and `sap.f.routing.Router` are documented in the SAPUI5
API Reference and the "Flexible Column Layout" topic at <https://ui5.sap.com/>. The
FCL routing wiring follows SAP's standard FCL application pattern (from the
author's knowledge of that template, since `UI5/sample-app` itself is
single-column) - verify the column behaviour in the browser.
