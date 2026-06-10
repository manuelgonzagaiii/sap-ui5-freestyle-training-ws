# Stage 2 - A dialog as a fragment

The "Create" button in our footer only shows a toast. Real apps pop up a **dialog** -
a small window over the page - to collect input. Dialogs are the most common use of
fragments, for a reason you will understand by the end of this stage, and they
introduce **loading a fragment on demand from a controller**. We build a "New sales
order" dialog and open it.

## Why a dialog is a fragment, not part of the view

A dialog is not part of the page layout - it floats *above* everything, centred on
the screen, and most of the time it is not shown at all. Putting it inside your
view's content would be wrong: it does not belong in the page's flow, and you would
pay to build it even when it is never opened.

So a dialog lives in **its own fragment file**, separate from the view, and you
**load it only when the user asks for it**. That is the pattern: the dialog's markup
is defined once, but the control is created lazily, the first time it is needed.

Our dialog fragment (`CreateOrder.fragment.xml`) is a `sap.m.Dialog`:

```xml
<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core">
    <Dialog id="createOrderDialog" title="{i18n>newOrderTitle}">
        <content>
            <Label text="{i18n>customerLabel}" labelFor="newCustomerInput" />
            <Input id="newCustomerInput" />
        </content>
        <beginButton>
            <Button text="{i18n>saveButton}" type="Emphasized" press=".onSaveOrder" />
        </beginButton>
        <endButton>
            <Button text="{i18n>cancelButton}" press=".onCancelOrder" />
        </endButton>
    </Dialog>
</core:FragmentDefinition>
```

- **`beginButton` / `endButton`** are the dialog's action slots. By convention the
  **begin** button is the confirming action (Save) and the **end** button is the
  dismissing one (Cancel); the framework places them correctly for the locale,
  including for right-to-left.
- The buttons' `press` handlers (`.onSaveOrder`, `.onCancelOrder`) point at the
  *host controller* - because, remember, a fragment has no controller of its own. It
  borrows the controller of whoever loads it.

## Loading and opening from the controller

```js
onCreate() {
    this.loadFragment({ name: "ui5.sales.view.fragment.CreateOrder" })
        .then((oDialog) => oDialog.open());
}
```

- **`this.loadFragment({ name })`** is a controller helper that loads a fragment,
  wires it to *this* controller (so its `press` handlers resolve), and returns a
  promise for the created control. It also adds the dialog as a dependent of the
  view, so it inherits the view's models (i18n, your data) automatically.
- **`.then((oDialog) => oDialog.open())`** opens it once it is ready. Loading is
  asynchronous - the always-async principle again - hence the promise.

Press Cancel and `onCancelOrder` closes the dialog; press Save and `onSaveOrder`
(for now) shows a toast and closes. The dialog is built the moment you first click
Create, and shown over the list.

## Your coding task

In `List.controller.js`, complete `onCreate` so it loads the **CreateOrder** dialog
fragment (and opens it).

## What the check verifies

- The **CreateOrder** dialog fragment exists and contains a `Dialog`.
- `onCreate` **loads the dialog fragment and opens it**.

## Run it yourself

```
npx ui5 serve --open index.html
```

Click "Create" - a dialog slides in asking for a customer, with Save and Cancel
buttons. The dialog was not part of the page; it was loaded on demand, exactly when
you needed it.

---

### Where this came from

Dialog fragments, `Controller.loadFragment` and the begin/end button convention
follow the official **SAPUI5 Walkthrough, "Dialogs and Fragments"** and
`UI5/sample-app` at <https://ui5.sap.com/>. The dialog design is this course's own.
