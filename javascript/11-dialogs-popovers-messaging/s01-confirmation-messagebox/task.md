# Stage 1 - Confirmation with MessageBox

Some actions are dangerous. Deleting an order should not happen the instant a
finger brushes a button - the user should be asked "are you sure?" first. UI5 gives
you a whole family of ways to talk to the user, and this stage introduces the two
you will use most: the gentle **`MessageToast`** for "it worked", and the
attention-getting **`MessageBox`** for "I need a decision." Knowing which to reach
for is a real UX judgement.

## The feedback family

UI5's messaging controls form a spectrum, from least to most intrusive:

- **`MessageToast`** - a small message that appears briefly and fades. Non-blocking.
  For "Saved", "Copied", quiet confirmations. (You have used it since Lesson 1.)
- **`MessageBox`** - a modal pop-up that **stops everything** until the user
  responds. For questions, warnings and errors that must be acknowledged.
- **`MessageStrip`** - an inline banner inside the page (Stage 4).
- **`MessagePopover` / Message Manager** - structured validation messages
  (introduced here, used in full in the Forms lesson).

The rule of thumb: **the more the user must not miss it, the more intrusive the tool.**
A successful save is a toast; a "this will delete data" is a MessageBox. Using a
blocking dialog for a trivial confirmation annoys users; using a toast for a
destructive warning loses them data. Matching the tool to the stakes is the skill.

## MessageBox for a destructive action

We add a **Delete** button to the order detail. Deleting is irreversible, so it must
confirm first:

```js
onDeleteOrder() {
    const sText = this.getView().getModel("i18n").getResourceBundle().getText("deleteConfirm");
    MessageBox.confirm(sText, {
        onClose: (sAction) => {
            if (sAction === MessageBox.Action.OK) {
                MessageToast.show("Order deleted (demo)");
                this.onBack();
            }
        }
    });
}
```

- **`MessageBox.confirm(text, options)`** shows a modal dialog with OK and Cancel.
  There are siblings for every situation: `MessageBox.error`, `.warning`,
  `.success`, `.information`, and the general `.show`. Each picks the right icon and
  buttons for you.
- **`onClose`** is the callback. It receives **which button was pressed**
  (`MessageBox.Action.OK`, `.CANCEL`, ...). Only on `OK` do we actually delete -
  here, show a toast and navigate back. Cancel does nothing, which is exactly what
  the user expects.
- Notice the confirm text comes from the **i18n bundle**, fetched with
  `getModel("i18n").getResourceBundle().getText(...)` - the way to read a translated
  string from controller code (Lesson 8 reaches the same bundle from the view).

The mental model: **a MessageBox is a question, and you only act on the answer.**
That single habit - confirm before anything destructive - separates an app users
trust from one that loses their work.

## Your coding task

In `Detail.controller.js`, complete `onDeleteOrder` so it **asks the user to
confirm** before deleting (using the right `MessageBox` method).

## What the check verifies

- The detail has a **Delete** action.
- The controller loads **`MessageBox`**.
- Delete **asks for confirmation before acting** (`MessageBox.confirm`/`.show`).

## Run it yourself

```
npx ui5 serve --open index.html
```

Open an order and press Delete - a confirmation dialog blocks the screen. Press
Cancel and nothing happens; press OK and you get a toast and return to the list. The
user is in control, and a misclick costs nothing.

---

### Where this came from

`sap.m.MessageBox`, `sap.m.MessageToast` and reading i18n text in a controller
follow the official **SAPUI5 Walkthrough** ("Message Toast", "Error Handling") and
the SAPUI5 documentation at <https://ui5.sap.com/>. The delete flow is this course's
own.
