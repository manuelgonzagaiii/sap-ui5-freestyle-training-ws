# Stage 3 - A web component, bound like any control

Here is the payoff of the wrapper: because `Rating` is a real UI5 control now, you place
it in an XML view and **bind it** exactly like `sap.m.Text` or your own
`PriorityIndicator`. The two component worlds meet in a single view, and data binding
flows across the bridge without you doing anything special.

## Using it in the view

We add the control namespace and drop the rating into the order's General section, bound
to the order's data:

```xml
<mvc:View ... xmlns:sales="ui5.sales.control" ...>
    ...
    <sales:Rating value="{itemCount}" max="10" readonly="true" />
```

- **`xmlns:sales="ui5.sales.control"`** - the same control package as your
  PriorityIndicator; the wrapper lives right beside it.
- **`value="{itemCount}"`** - **standard UI5 binding into the web component**. The order's
  `itemCount` flows: model -> UI5 property (stage 2) -> mapped DOM property -> the
  `<ui5-rating-indicator>` redraws. A change in the model updates the web component
  automatically. The fact that the underlying control is a *web component*, not a classic
  control, is completely hidden - that is the bridge working.
- **`readonly="true"`** - here it is a read-only visual of the order's line-item count.

The lesson: once wrapped, a web component is **indistinguishable from any other UI5
control** to the view author. Binding, aggregations, the model - all just work. You can mix
classic controls and web components freely in one screen.

## Your coding task

In `Detail.view.xml`, **bind the rating's `value`** to the order's item count
(`{itemCount}`).

## What the check verifies (and where you are free)

- The detail view **uses the wrapped web component**.
- Its `value` is **bound to data**.
- *Which* field you bind and the `max`/`readonly` settings are **yours** - any data
  binding into the control passes.

## Run it yourself

With the build setup from stage 4 in place, the order detail shows a rating reflecting the
item count, updating with the data - a standards-based web component, living inside your
UI5 object page, fed by the same model as everything around it.

---

### Where this came from

Using a wrapped web component in an XML view and binding its mapped properties follow the
SAPUI5 "Web Components - Usage" documentation at <https://ui5.sap.com/>. The binding to
`itemCount` is this course's own.
