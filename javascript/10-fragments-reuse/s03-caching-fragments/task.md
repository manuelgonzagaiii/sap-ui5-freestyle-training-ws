# Stage 3 - Caching the fragment

Our dialog works, but there is a bug hiding in it: every time the user clicks
"Create", `loadFragment` builds a **brand-new** dialog. Open it five times and you
have five dialogs lingering in memory, each a duplicate with the same id. This stage
fixes that with **caching** - build the fragment once, reuse it forever - which is
the standard, expected way to handle any dialog in UI5.

## The problem with loading every time

```js
onCreate() {
    this.loadFragment({ name: "..." }).then((oDialog) => oDialog.open());
}
```

Each call to `loadFragment` creates a new instance. The consequences:

- **Memory leaks.** Old dialogs are never cleaned up; they pile up.
- **Duplicate ids.** Two controls with the same id (`createOrderDialog`) is an error
  waiting to happen - `byId` no longer knows which one you mean.
- **Lost state.** Anything the user typed and left is gone, because next time it is a
  fresh dialog.

A dialog should be a **singleton**: created once, opened and closed many times.

## The cache pattern

The fix is a one-time guard. Store the dialog (its promise) on the controller, and
only build it if it does not exist yet:

```js
onCreate() {
    if (!this._pCreateDialog) {
        this._pCreateDialog = this.loadFragment({ name: "ui5.sales.view.fragment.CreateOrder" });
    }
    this._pCreateDialog.then((oDialog) => oDialog.open());
}
```

- **`this._pCreateDialog`** is a field on the controller (the `_p` prefix is a
  common convention for "a promise I am holding"). The first click sets it; every
  later click finds it already set.
- **`if (!this._pCreateDialog)`** is the guard: build only when missing.
- We store the **promise**, not the dialog, so even rapid double-clicks before
  loading finishes still share one load. Both `.then` callbacks open the same
  dialog.

After this, no matter how often the user opens the dialog, there is exactly **one**
instance. This is not an optional optimisation - it is the correct pattern, and you
will write it for every dialog, popover and on-demand fragment you ever create. Once
it is muscle memory, you stop leaking controls without thinking about it.

## A note on cleanup

For completeness: a singleton dialog held on the controller is cleaned up when the
view is destroyed, because `loadFragment` made it a *dependent* of the view. So you
get correct lifecycle management for free - another reason to use `loadFragment`
rather than building fragments by hand.

## Your coding task

In `List.controller.js`, complete the guard so the dialog is **built only when it
does not exist yet** (and reused otherwise).

## What the check verifies

- The dialog is **stored on the controller** and **only built when missing** (a
  field assigned from `loadFragment`, behind an `if (!this._...)` guard).

This is rule-of-law: the caching pattern is either there or it is not, and without
it the app misbehaves. The understanding to keep is *why* - a dialog is a singleton,
and recreating it leaks memory and breaks ids.

## Run it yourself

```
npx ui5 serve --open index.html
```

Open and close the dialog several times. It behaves identically - but now there is
only ever one dialog instance behind the scenes. Type something, cancel, reopen, and
(because it is the same dialog) your text is still there.

---

### Where this came from

The cache-the-dialog pattern with `loadFragment` follows the official **SAPUI5
Walkthrough** dialog steps and the SAPUI5 documentation ("Instantiation of
Fragments") at <https://ui5.sap.com/>. The example is this course's own.
