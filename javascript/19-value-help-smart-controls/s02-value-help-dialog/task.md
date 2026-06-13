# Stage 2 - A value help dialog

Suggestions work when the user roughly knows the name. But sometimes they do not -
they want to **browse**: open a list of all customers, search it, look at the
countries, then pick. That calls for the second rung of the value-help ladder: a
**dialog**. The field gets a small value-help icon, and pressing it opens a searchable
picker. This stage builds it with `sap.m.SelectDialog`.

## The value-help button on the Input

Two attributes turn the plain input into one with an attached helper:

```xml
<Input id="newCustomerInput" value="{create>/customer}"
    showSuggestion="true"
    showValueHelp="true"
    valueHelpRequest=".onCustomerValueHelp"
    ... >
```

- **`showValueHelp="true"`** - renders the little square icon at the end of the field
  that every SAP user recognises as "there is a picker here."
- **`valueHelpRequest`** - the event fired when they press it. Our handler opens the
  dialog (a cached fragment - the Lesson 10 pattern, fourth time now).

## SelectDialog: a searchable picker

`sap.m.SelectDialog` is a ready-made list-picker dialog: a search field on top, a list
below, confirm on selection:

```xml
<SelectDialog id="customerSelectDialog" title="{i18n>selectCustomerTitle}"
    items="{/Customers}" search=".onCustomerSearch" confirm=".onCustomerSelected">
    <StandardListItem title="{name}" description="{country}" />
</SelectDialog>
```

Its two events do the work in the controller:

```js
onCustomerSearch(oEvent) {
    const sValue = oEvent.getParameter("value");
    oEvent.getParameter("itemsBinding")
        .filter(sValue ? [new Filter("name", FilterOperator.Contains, sValue)] : []);
},
onCustomerSelected(oEvent) {
    const oItem = oEvent.getParameter("selectedItem");
    if (oItem) { this.getView().getModel("create").setProperty("/customer", oItem.getTitle()); }
}
```

- **`search`** hands you the typed value *and* the dialog's own **items binding** -
  you filter it with the same `Filter` you have used since Lesson 6 (and against V4,
  the filtering happens on the server).
- **`confirm`** hands you the **selected item**; we write its title into the draft
  model, and the input updates through its binding. Closing is automatic.

Note the composition: a fragment, a cached load, `openBy`-style anchoring is not even
needed (SelectDialog centres itself), an aggregation binding, a filter, and a model
write. Every piece is something you already know - value help is not a new system,
just a thoughtful assembly of the toolkit you have.

## About the heavyweight: `ValueHelpDialog`

For completeness: SAP also ships a much bigger control,
`sap.ui.comp.valuehelpdialog.ValueHelpDialog` - a full screen of filter rows, a
result table, range conditions ("between A and F"), and multi-select tokens. It is the
picker you see in classic SAP transactions, and it belongs to the `sap.ui.comp`
library, which is designed around **OData V2** services and annotations. For a modern
V4 freestyle app, `SelectDialog` (or its sibling `TableSelectDialog`, which shows
columns instead of a simple list) covers most needs with a fraction of the weight -
and the metadata-driven successors are covered in stage 4. Choosing the lightest
control that serves the user is good design, not corner-cutting.

## Your coding task

In `List.controller.js`, complete `onCustomerSelected` so the **chosen customer is
written into the draft** (which updates the input through its binding).

## What the check verifies

- The input **shows a value help** and requests it (`showValueHelp` +
  `valueHelpRequest`).
- A customer **SelectDialog** exists and **search filters it**.
- Confirming **writes the chosen customer into the draft**.

## Run it yourself

Press Create, then the value-help icon on the Customer field. Search "gra", pick
Granite Supplies - the dialog closes and the field is filled. Browse-and-pick, the
SAP way.

---

### Where this came from

`sap.m.SelectDialog`, `showValueHelp`/`valueHelpRequest` and the search/confirm events
follow the SAPUI5 API Reference and samples at <https://ui5.sap.com/>;
`sap.ui.comp.valuehelpdialog.ValueHelpDialog` and its V2 orientation are from the same
API Reference. The flow is this course's own.
