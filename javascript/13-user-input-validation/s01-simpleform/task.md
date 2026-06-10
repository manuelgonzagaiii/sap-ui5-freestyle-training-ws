# Stage 1 - Building a form (SimpleForm)

Our "New order" dialog has a single input. A real order needs several fields -
customer, amount, currency - laid out neatly, with labels, aligned, and responsive
on small screens. Throwing a pile of `Label` and `Input` controls into a `VBox` and
hand-aligning them is miserable and breaks on mobile. UI5 gives you a control built
for exactly this: the **`SimpleForm`**. This last lesson of Phase C builds a proper
form and then makes it validate what the user types.

## Why a form control, not just inputs

A form is not just a stack of fields. It has to:

- line up labels and fields into tidy columns,
- reflow gracefully from a wide desktop (labels beside fields) to a phone (labels
  above fields),
- group related fields and handle spacing consistently.

Doing that by hand with layout containers is fiddly and fragile. **`SimpleForm`**
does all of it for you: you just list labels and fields, and it arranges them.

## SimpleForm: list the fields, get a form

`sap.ui.layout.form.SimpleForm` takes an alternating list of **labels and fields**
and lays them out:

```xml
<form:SimpleForm layout="ResponsiveGridLayout" editable="true">
    <Label text="{i18n>customerLabel}" labelFor="newCustomerInput" required="true" />
    <Input id="newCustomerInput" value="{create>/customer}" />
    <Label text="{i18n>amountLabel}" labelFor="newAmountInput" required="true" />
    <Input id="newAmountInput" value="{create>/amount}" />
    <Label text="{i18n>currencyLabel}" labelFor="newCurrencySelect" />
    <Select id="newCurrencySelect" selectedKey="{create>/currency}"> ... </Select>
</form:SimpleForm>
```

- **`layout="ResponsiveGridLayout"`** - the responsive layout that reflows by screen
  size. It is the one you want for almost every form; alternatives exist for special
  cases.
- **`editable="true"`** - this is a data-entry form (not a read-only display), so
  inputs render in their editable style.
- Each **`Label`** uses `labelFor` (the association from Lesson 4!) to bind itself to
  its field for accessibility, and **`required="true"`** shows the asterisk that
  marks a mandatory field.

## The "create" model: a draft to edit

The form fields are bound to a separate **`create`** model - a small `JSONModel`
holding the draft order:

```js
this.getView().setModel(new JSONModel({ customer: "", amount: 0, currency: "EUR" }), "create");
```

The fields two-way bind to it (`{create>/customer}`, etc.), so as the user types, the
draft fills in; on save, you read the draft. Using a dedicated draft model - separate
from the real order list - is the clean pattern: the user can edit freely and cancel
without touching real data, and you commit only on save.

## Your coding task

In `CreateOrder.fragment.xml`, set the `SimpleForm`'s **layout** to the responsive
one so the form reflows on small screens.

## What the check verifies

- The dialog uses a **`SimpleForm`** with a **responsive** layout.
- The form has **labels and inputs** bound to a **`create`** model.

## Run it yourself

```
npx ui5 serve --open index.html
```

Click "Create" - the dialog now shows a tidy form with Customer, Amount and Currency
fields, labels aligned, required fields marked. Narrow the window and the labels move
above the fields. No alignment code on your part.

---

### Where this came from

`sap.ui.layout.form.SimpleForm` and `ResponsiveGridLayout` are documented in the
SAPUI5 API Reference and "Forms" topic at <https://ui5.sap.com/>. The draft-model
pattern is this course's own.
