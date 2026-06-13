# Stage 4 - Export the table

Ask any business user what they want from a table and "can I get this in a
spreadsheet?" is near the top of the list. Exported data is where it goes to be
re-sorted, annotated and mailed around, and a business app that cannot export feels
incomplete. This stage adds an export button and closes the table lesson - and the
*way* we do it teaches a real lesson about the difference between commercial SAPUI5
and the free OpenUI5 we build on.

## First, the library you will meet in real projects

In a licensed **SAPUI5** app, the standard answer is a dedicated library,
**`sap.ui.export`**, whose `Spreadsheet` class builds a genuine `.xlsx` file in the
browser straight from your table's binding:

```js
// SAPUI5 only - not available in OpenUI5
const oSheet = new Spreadsheet({
    workbook: { columns: [{ label: "Order", property: "orderId" }, ...] },
    dataSource: this.byId("ordersTable").getBinding("items"),
    fileName: "SalesOrders.xlsx"
});
oSheet.build();
```

You should recognise this - you will see it in many existing SAP projects, and on a
commercial SAPUI5 stack it is the right tool. But there is a catch that matters for
this course: **`sap.ui.export` ships only with SAPUI5, the licensed SAP distribution.
It is not part of OpenUI5**, the free, open-source build we pinned the app to in
Lesson 2. Load it here and the app breaks with a missing-module error. (This is from
the author's knowledge of the two distributions - verify against the SAPUI5 vs.
OpenUI5 feature list at <https://ui5.sap.com/> for your version.)

This is exactly the kind of trap that makes the open-source-only rule of this course
worth following: a feature that "just works" in a tutorial built on the licensed
distribution silently does not exist for you. So we export a different way - one that
works on *any* UI5 build, because it uses nothing but the binding and the browser.

## Exporting with the web platform: CSV

A `.csv` (comma-separated values) file opens in Excel, Numbers, Google Sheets and
every other spreadsheet program. Producing one needs no SAP library at all - just the
data and three lines of standard browser code. Here is the whole `onExport`:

```js
onExport() {
    const oBinding = this.byId("ordersTable").getBinding("items");
    const aFields = ["orderId", "customer", "status", "amount", "currency", "priority"];
    const aRows = oBinding.getAllCurrentContexts().map((oContext) => {
        const oData = oContext.getObject();
        return aFields.map((sField) => {
            const sValue = String(oData[sField] == null ? "" : oData[sField]);
            return /[",\n]/.test(sValue) ? '"' + sValue.replace(/"/g, '""') + '"' : sValue;
        }).join(",");
    });
    const sCsv = aFields.join(",") + "\n" + aRows.join("\n");
    const oLink = document.createElement("a");
    oLink.href = URL.createObjectURL(new Blob([sCsv], { type: "text/csv;charset=utf-8" }));
    oLink.download = "SalesOrders.csv";
    oLink.click();
    URL.revokeObjectURL(oLink.href);
}
```

Walk through it, because every line is a concept you will reuse:

- **`getBinding("items").getAllCurrentContexts()`** - read the rows **from the
  binding**, not from the rendered table. This is the important part. The binding
  holds the model contexts for the data it has loaded *in the current, filtered and
  sorted state* - so the export reflects what the user is actually looking at, not the
  raw, unfiltered collection. (`getAllCurrentContexts` returns the loaded contexts; on
  a `growing` table that is the rows fetched so far. To guarantee *every* matching row
  regardless of paging you would page the binding to the end first - out of scope
  here, but worth knowing the distinction.)
- **`oContext.getObject()`** - turn a context into a plain data object so we can read
  its fields by name.
- **The quote-escaping** (`/[",\n]/...`) - CSV's one real rule: if a value contains a
  comma, a quote or a newline, it must be wrapped in double quotes and any inner quote
  doubled. Skip this and a customer named `Smith, Inc.` would split into two columns.
  Small detail, but it is the difference between a file that opens cleanly and one that
  is subtly corrupt.
- **`new Blob([...], { type: "text/csv" })`** - a Blob is the browser's in-memory
  "file". We hand it the CSV text and tell it the MIME type.
- **`URL.createObjectURL` + a temporary `<a download>` that we `click()`** - the
  standard browser idiom for "save this generated data as a file". We create an
  invisible link pointing at the Blob, click it programmatically to trigger the
  download, then `revokeObjectURL` to release the memory. No server endpoint, no file
  streaming - the file is built and saved entirely in the page.

The mental model: **a table export is just "read the binding's rows, format them as
text, and hand the browser a file."** The licensed `sap.ui.export` library wraps that
in a polished `.xlsx` generator; underneath, the shape of the job is the same, and on
free OpenUI5 you write the small portable version yourself - which also means you
finally see what that library was doing for you.

## Your coding task

In `List.controller.js`, complete `onExport` so it **reads the rows from the table's
binding** (`getAllCurrentContexts()`) and builds the CSV. The Blob-and-download
plumbing is written for you; the blank is the call that pulls the data out of the
binding.

## What the check verifies (and where you are free)

- The export reads its rows **from the table's binding**
  (`getAllCurrentContexts()`), not from a hard-coded array or the DOM.
- It builds a **CSV file** (a `Blob`, a `.csv` download).
- It **does not** depend on `sap/ui/export` - because that library is not in OpenUI5
  and would break the app.
- Which fields you export, the column order and the file name are **yours** - any
  valid configuration passes.

## End of Lesson 18

The order list is now an enterprise-grade table: real aligned columns in a responsive
`sap.m.Table`, server-side paging through `growing`, user-controlled sorting and
grouping through the standard `ViewSettingsDialog`, and a one-click export that runs on
any UI5 build - all driven by the same OData V4 binding underneath. Eight rows or
eighty thousand, this screen now copes.

In **Lesson 19**, the last of Phase D, we polish data *entry* the same way: **value
help** - suggestions as you type, a selection dialog for picking customers, and the
value-list annotations that power SAP's smart and metadata-driven controls.

---

### Where this came from

`ODataListBinding#getAllCurrentContexts` and binding-based reads follow the SAPUI5
OData V4 API Reference at <https://ui5.sap.com/>. The `Blob` / `URL.createObjectURL` /
`<a download>` download idiom is standard web-platform API (MDN). The point that
`sap.ui.export` is part of licensed SAPUI5 and not OpenUI5 is from the author's
knowledge of the two distributions - verify it against the SAPUI5 vs. OpenUI5
documentation before relying on it. The exported columns are this course's own.
