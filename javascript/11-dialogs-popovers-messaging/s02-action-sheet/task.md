# Stage 2 - Action sheet (the popover family)

A detail screen often has more actions than fit comfortably in a toolbar - Edit,
Duplicate, Share, Delete. Cramming them all in is cluttered; the clean answer is a
**"More" button that opens a small menu anchored to it**. That menu is a
**`sap.m.ActionSheet`**, and it belongs to a family of **anchored pop-ups** - the
popovers - that you will use constantly. This stage builds one and teaches the
pattern behind all of them.

## Anchored pop-ups: the popover family

Unlike a `Dialog` (centred, modal, blocks everything), a **popover** appears
**attached to the control that opened it**, with a little arrow pointing at it, and
closes when you tap elsewhere. It is for lightweight, contextual things. UI5 gives
you a few flavours:

- **`Popover`** - a free-form bubble you fill with any content (a quick info card, a
  mini form).
- **`ActionSheet`** - a popover specialised for **a list of action buttons**. On a
  phone it sensibly slides up from the bottom; on desktop it pops by the button.
- **`ResponsivePopover`** - adapts between a popover (desktop) and a full dialog
  (phone) automatically.

They share one defining method, which is the whole point of this stage: **`openBy`**.

## Building and opening an ActionSheet

The sheet itself is a fragment (reuse from Lesson 10) holding action buttons:

```xml
<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core">
    <ActionSheet id="moreActionSheet">
        <Button text="{i18n>editAction}" icon="sap-icon://edit" press=".onEditOrder" />
        <Button text="{i18n>duplicateAction}" icon="sap-icon://copy" press=".onDuplicateOrder" />
    </ActionSheet>
</core:FragmentDefinition>
```

The controller loads it (cached, like any fragment) and opens it **by** the button
that was pressed:

```js
onMoreActions(oEvent) {
    const oButton = oEvent.getSource();
    if (!this._pMoreActions) {
        this._pMoreActions = this.loadFragment({ name: "ui5.sales.view.fragment.MoreActions" });
    }
    this._pMoreActions.then((oSheet) => oSheet.openBy(oButton));
}
```

- **`oEvent.getSource()`** is the "More" button (the event skill from Lesson 3).
- **`openBy(oButton)`** is the anchored-popup signature: "open this popup pointing at
  *that* control." The framework positions it, draws the arrow, and handles closing
  on outside-tap. A `Dialog` has `open()` (no anchor); a popover has `openBy(control)`
  (anchored). That one difference is the essence of the popover family.

Everything else you already know carries over: fragments, caching, `this.byId`, the
begin/end conventions. **`openBy` is the new idea, and it is the same call for
`Popover`, `ActionSheet` and `ResponsivePopover`** - learn it once, use it for all
three.

## Your coding task

In `Detail.controller.js`, complete `onMoreActions` so it **opens the action sheet
anchored to the pressed button**.

## What the check verifies

- A **MoreActions** `ActionSheet` fragment exists.
- The controller **opens the sheet anchored to the button** (`loadFragment` + 
  `openBy`).

## Run it yourself

```
npx ui5 serve --open index.html
```

Open an order and press "More" - a small menu pops up next to the button with Edit
and Duplicate. Tap one (a toast), or tap outside to dismiss. Resize to a narrow
window and press it again to see the sheet adapt to a phone-style presentation.

---

### Where this came from

`sap.m.ActionSheet`, the popover family and `openBy` are documented in the SAPUI5
API Reference and "Popover"/"Action Sheet" topics at <https://ui5.sap.com/>. The
actions are this course's own.
