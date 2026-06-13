# Stage 3 - Sort and group dialog

Hard-coding "newest first" was fine while we decided everything. But users want to
order the table *their* way - by customer, by amount, grouped by status - and they
expect a standard place to say so. UI5's standard place is the **ViewSettingsDialog**:
the sort/group/filter dialog you have seen in every Fiori app. This stage wires one to
our table, and in doing so revisits the `Sorter` from Lesson 6 with one new trick -
**grouping**.

## The ViewSettingsDialog

`sap.m.ViewSettingsDialog` is a ready-made dialog with tabs for sorting, grouping and
filtering. You declare what *can* be sorted and grouped; it handles the UI, the state,
and tells you what the user chose. It lives in a fragment (the Lesson 10 pattern -
loaded lazily, cached):

```xml
<ViewSettingsDialog id="viewSettingsDialog" confirm=".onConfirmViewSettings">
    <sortItems>
        <ViewSettingsItem key="orderDate" text="Order date" selected="true" />
        <ViewSettingsItem key="customer" text="Customer" />
        <ViewSettingsItem key="amount" text="Amount" />
    </sortItems>
    <groupItems>
        <ViewSettingsItem key="status" text="Status" />
        <ViewSettingsItem key="priority" text="Priority" />
    </groupItems>
</ViewSettingsDialog>
```

Each `ViewSettingsItem`'s **`key`** is the model field it stands for - that is what you
will feed the `Sorter`.

## From the user's choice to the binding

When the user confirms, the dialog's `confirm` event hands you their choices, and you
translate them into **sorters** applied to the table's binding:

```js
onConfirmViewSettings(oEvent) {
    const p = oEvent.getParameters();
    const aSorters = [];
    if (p.groupItem) {
        aSorters.push(new Sorter(p.groupItem.getKey(), p.groupDescending, true));
    }
    if (p.sortItem) {
        aSorters.push(new Sorter(p.sortItem.getKey(), p.sortDescending));
    }
    this.byId("ordersTable").getBinding("items").sort(aSorters);
}
```

Two things to understand here:

- **Grouping is a `Sorter` with a third argument.** `new Sorter(path, descending,
  true)` means "sort by this field *and* render a group header whenever its value
  changes." That is all grouping is: sort the rows so equal values sit together, then
  draw headers between the runs. Once you see that, grouping stops being a separate
  feature and becomes a flavour of sorting.
- **Order matters.** The group sorter must come **first** in the array, then the
  user's sort within each group. Group by status, sort by amount inside each status -
  not the other way round.

Because this is an OData V4 binding in server mode, `sort()` sends the request as
`$orderby` - the database does the sorting, exactly as in Lesson 16, only now the user
chooses the field.

## Why a dialog instead of clickable column headers?

Both exist in the wild. The `ViewSettingsDialog` wins for responsive apps because it
works identically on a phone (where column headers are cramped targets) and scales to
sort + group + filter in one consistent place users already know from other SAP apps.
Consistency with the platform is a feature: your users have used this exact dialog
before, so there is nothing to learn.

## Your coding task

In `List.controller.js`, complete `onConfirmViewSettings` so the chosen sorters are
**applied to the table's items binding**.

## What the check verifies (and where you are free)

- A **ViewSettingsDialog** fragment exists.
- Confirming **applies `Sorter`s (including grouping) to the table binding**. Which
  fields you offer for sorting and grouping is **your design choice** - any real model
  fields pass.

## Run it yourself

Press the Sort button, group by Status and sort by Amount descending - the table
reorders with group headers, and the network tab shows the `$orderby` your sorters
produced. The user now owns the table's order.

---

### Where this came from

`sap.m.ViewSettingsDialog`, `ViewSettingsItem` and grouping via `Sorter(path,
descending, vGroup)` follow the SAPUI5 API Reference and samples at
<https://ui5.sap.com/>. The offered fields are this course's own.
