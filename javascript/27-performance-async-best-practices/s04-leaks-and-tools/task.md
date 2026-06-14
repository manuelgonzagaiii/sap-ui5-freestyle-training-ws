# Stage 4 - Preventing leaks, and letting the tools find the rest

Fast startup is half of performance; the other half is **not getting slower over time**.
Long-lived single-page apps leak memory when controls are created but never destroyed -
and the worst offenders are exactly the lazily-loaded dialogs and fragments we have been
adding. This closing stage plugs that leak and points you at the tool that finds the
problems you cannot see.

## Dialogs and fragments must be destroyed

We create dialogs lazily and reuse them (`loadFragment`, cached on `this._p...`). That is
good for performance - but a dialog created with `loadFragment` becomes a **dependent of
the view, not destroyed automatically** when the view goes away. Across many
open/close/navigate cycles, orphaned dialogs accumulate. The fix is a **`onExit`** lifecycle
method that cleans up what the controller created:

```js
onExit() {
    if (this._pCreateDialog) {
        this._pCreateDialog.then((oDialog) => oDialog.destroy());
    }
}
```

- **`onExit`** - called when the controller's view is destroyed. The right place to release
  anything you created outside the view's own aggregations.
- **`oDialog.destroy()`** - frees the control and its DOM. (Because the dialog is a promise,
  we destroy it once resolved.)

The rule: **if you created it lazily, you destroy it on exit** - dialogs, popovers,
fragments, message managers, intervals, event subscriptions. Standard controls inside the
view are cleaned up for you; the things you instantiate by hand are yours to release.

## The Support Assistant: let the tool find the rest

You cannot eyeball every leak, slow binding or accessibility gap. UI5 ships the **Support
Assistant** - a built-in diagnostic you open in the running app (via the support bootstrap,
or `Ctrl+Shift+Alt+P`) that runs a library of rules and reports **performance, memory,
accessibility and best-practice issues**, with the offending control and a fix suggestion.

Make it part of your workflow: run the Support Assistant before you ship, fix what it
flags, and you catch the problems reviews miss. (The exact shortcut and rule set are from
the author's knowledge - verify the Support Assistant for your UI5 version at
<https://ui5.sap.com/>.)

## Your coding task

In `List.controller.js`, complete `onExit` so it **destroys the lazily-created dialog**
when the view is torn down.

## What the check verifies

- The controller **cleans up on exit** (`onExit` + `destroy()`).

## End of Lesson 27

The app is now built to stay fast: everything loads asynchronously, heavy libraries load
lazily, the data payload is trimmed to what is shown, leaks are cleaned up on exit, and you
know the Support Assistant will catch the rest. In **Lesson 28** we make it *trustworthy* -
the subject's own testing tools: QUnit for units, OPA5 for integration journeys, and wdi5
for end-to-end - the tests that prove the app works, distinct from the grader that checks
your lessons.

---

### Where this came from

The `onExit` lifecycle, `destroy()` for lazily-created controls, the leak pattern with
cached fragments, and the Support Assistant follow the SAPUI5 "Memory Management",
"Lifecycle" and "Support Assistant" documentation at <https://ui5.sap.com/>. The shortcut
is from the author's knowledge - verify it for your version.
