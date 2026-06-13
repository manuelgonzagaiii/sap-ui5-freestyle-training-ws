# Stage 1 - A responsive table

Our orders have been shown as a *list* - one tidy line each. That is great on a phone,
but on a wide screen a business user wants a **table**: aligned columns they can scan,
compare and sort. This stage swaps the list for a proper table and teaches the most
important table decision in UI5 - **which** table to use, because there are two, for two
different jobs.

## Two tables, two purposes

UI5 gives you two main table controls, and choosing correctly matters:

- **`sap.m.Table`** (the "responsive table") - rows are made of normal `sap.m` controls,
  and on a narrow screen columns can hide or **pop in** below each other. It adapts from
  desktop to phone. Use it for most business lists, especially anything that must work on
  mobile. **This is the default choice.**
- **`sap.ui.table.Table`** (the "grid table") - a dense, Excel-like grid that
  **virtualises** rows (renders only what is visible) so it handles *huge* datasets and
  many columns, with fixed columns and cell-level editing. But it is **not responsive** -
  it is for desktop analytical screens. Use it only when you genuinely need that scale or
  density.

The rule of thumb: **reach for `sap.m.Table` unless you have thousands of rows and a
desktop-only, spreadsheet-like screen** - then consider the grid table. We use the
responsive table, which fits an order list that must also work on a tablet.

## Building a responsive table

A `sap.m.Table` is **columns plus a row template**, bound just like the list was:

```xml
<Table id="ordersTable" items="{ path: '/SalesOrders', ... }">
    <columns>
        <Column><Text text="{i18n>orderCol}" /></Column>
        <Column><Text text="{i18n>customerCol}" /></Column>
        <Column minScreenWidth="Tablet" demandPopin="true"><Text text="{i18n>statusCol}" /></Column>
        <Column hAlign="End" minScreenWidth="Tablet" demandPopin="true"><Text text="{i18n>amountCol}" /></Column>
        <Column minScreenWidth="Desktop" demandPopin="true"><Text text="{i18n>priorityCol}" /></Column>
    </columns>
    <items>
        <ColumnListItem type="Navigation" press=".onOrderPress">
            <cells>
                <Text text="{orderId}" />
                <Text text="{customer}" />
                <ObjectStatus text="{status}" state="{ path: 'status', formatter: '.formatter.statusState' }" />
                <Text text="{ parts: ['amount','currency'], type: 'sap.ui.model.type.Currency', formatOptions: { showMeasure: false } }" />
                <Text text="{priority}" />
            </cells>
        </ColumnListItem>
    </items>
</Table>
```

The crucial idea: **the `cells` in each `ColumnListItem` line up, in order, with the
`columns`.** The first cell goes under the first column, the second under the second, and
so on. Get the order or the count wrong and the table looks scrambled - so reading a table
is really reading two parallel lists (columns and cells) and keeping them aligned. The
cells are ordinary controls (a coloured `ObjectStatus` for the status, a `Currency`-typed
`Text` for the amount), so everything you learned about controls and formatting still
applies, just arranged in columns.

`type="Navigation"` gives each row the drill-in chevron and keeps `press` working, so
selecting a row still opens the detail.

## What makes it *responsive*: pop-in

A table with five columns is fine on a laptop and unreadable on a phone. The responsive
table's answer is **pop-in**: when the screen is too narrow for a column, instead of
scrolling sideways the column's value drops down **underneath** the first cell, labelled,
as part of the same row. Two `Column` properties control it:

- **`minScreenWidth`** - the smallest screen width at which this column stays a normal
  side-by-side column. It takes the device sizes `Phone`, `Tablet` and `Desktop` (or an
  explicit width like `"600px"`). `minScreenWidth="Tablet"` means "keep me as a column on
  a tablet and wider; below that, do something else with me."
- **`demandPopin="true"`** - that "something else": instead of *hiding* the column when it
  no longer fits, **pop it in** below the row. Without `demandPopin`, a too-narrow column
  simply disappears; with it, the data is preserved, just re-flowed.

So in our table the first two columns (Order, Customer) have no settings - they always
show. Status and Amount carry `minScreenWidth="Tablet"`, so they pop in on a phone.
Priority carries `minScreenWidth="Desktop"`, so it pops in earlier, on a tablet too -
because it is the least important to see at a glance. That ranking is a genuine design
decision: **you decide which columns are essential and which may re-flow first.** The
control does the work; you supply the priorities.

## Your coding task

In `List.view.xml`, fill in the **priority cell** so it lines up with the Priority column.

## What the check verifies

- The orders are shown in a **`sap.m.Table`** with columns.
- Each row is a **`ColumnListItem`** whose **cells match the columns**.

## Run it yourself

With both servers running, the orders now appear as a table with Order, Customer, Status,
Amount and Priority columns. Now drag the window narrower: at tablet width Priority drops
**below** each row instead of beside it, and at phone width Status and Amount pop in too -
the data never disappears, it re-flows. That is `minScreenWidth` and `demandPopin` at
work, and the responsive table earning its name.

---

### Where this came from

`sap.m.Table` vs `sap.ui.table.Table`, `Column`, `ColumnListItem`, `cells`, and the
`minScreenWidth` / `demandPopin` pop-in properties follow the SAPUI5 API Reference and
"Tables: Which One Should I Choose?" documentation at <https://ui5.sap.com/>. The columns
are this course's own.
