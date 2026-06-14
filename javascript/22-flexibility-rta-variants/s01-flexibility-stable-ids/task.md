# Stage 1 - Flexibility: changing the app without changing the code

So far *you* decide how the app looks. SAP applications let the **end user** and the
**key user** (an admin-like power user) reshape the UI too - hide a field, reorder a
section, save a personal table layout - and have those changes **persist**, surviving
reloads, without anyone touching your source. The engine behind this is **SAP UI5
Flexibility** (`sap.ui.fl`), and this lesson teaches its whole stack. We begin with the
foundation: enabling flexibility, and the humble detail that makes it all work - **stable
IDs**.

## What flexibility actually is

Flexibility stores UI **changes as data, separate from the app**. When the app loads,
`sap.ui.fl` fetches the relevant changes and **replays them onto your controls** before
the user sees the screen. Your code renders the base app; the flexibility layer adds
"...and this user hid the Amount column, and the key user moved this section up."

These changes live in **layers**, by who made them and how widely they apply:

- **USER** - one person's personalization (their saved table layout). Visible only to
  them.
- **KEY USER / CUSTOMER** - an admin adapting the app for a whole company or role (via
  RTA, stage 2). Visible to everyone in that scope.
- **VENDOR** - changes shipped by the app's author.

Higher layers stack on lower ones. The beauty is that **none of it edits your app** - the
base code is untouched; changes are overlaid at runtime and can be reset.

## Turn it on: `flexEnabled`

You opt the app into flexibility in the descriptor:

```json
"sap.ui5": {
    "flexEnabled": true,
    ...
}
```

This tells UI5 to load the flexibility runtime and apply stored changes for this app.

## Why **stable IDs** are non-negotiable

Here is the catch that trips up real projects. A change is stored as "hide the control
with id `...ordersTable`". For that to still mean something after a reload - or after you
ship a new version - **the id must be stable**: the same every time the app runs.

- **Stable** (good): you assign `id="ordersTable"` yourself. It never changes.
- **Generated** (bad for flex): if you let UI5 auto-assign (`__table0`, `__table1`...),
  the id can differ between runs, and a stored change can no longer find its control -
  the personalization silently breaks.

So the rule the moment you enable flexibility: **give every control a user might adapt,
or that contains adaptable content, an explicit, stable `id`.** Our table already has
`id="ordersTable"` - which is exactly why it is ready to be adapted in the next stages.

## Your coding task

In `manifest.json`, **enable flexibility** for the app (`flexEnabled: true`).

## What the check verifies

- The descriptor **enables flexibility**.
- The orders table has a **stable id** (so changes can find it).

## Run it yourself

Nothing visibly changes yet - flexibility is now armed, waiting for the adaptation and
variant features we add next. (If you open the app and check the network tab, UI5 now
makes a flexibility request on load.)

---

### Where this came from

`sap.ui.fl`, the `flexEnabled` descriptor flag, the change layers (USER / KEY USER /
VENDOR) and the stable-id requirement follow the SAPUI5 "Flexibility", "Stable IDs" and
"SAPUI5 Flexibility: Adapting UIs Made Easy" documentation at <https://ui5.sap.com/>.
