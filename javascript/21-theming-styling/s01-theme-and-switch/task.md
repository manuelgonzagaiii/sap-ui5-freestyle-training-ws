# Stage 1 - The theme, and switching it at runtime

Everything you have built has been wearing SAP's **Horizon** theme without you choosing
it on purpose. A theme is not a skin you bolt on at the end - it is a coordinated system
of colours, fonts, sizes and semantic meanings that every control reads from. This
lesson is about owning that system. We start by understanding themes and adding a
**runtime theme switch** - light to dark with one button.

## What a theme actually is

A UI5 **theme** is a complete set of design values - background colours, text colours,
the meaning of "this is an error" (a specific red), spacing, border radius, fonts -
that all controls consume. Because controls never hard-code colours and instead read
**theme parameters**, swapping the theme restyles the entire app consistently, with no
change to your views.

The current family is **Horizon**, SAP's latest design language, in several variants:

- **`sap_horizon`** - the default light theme.
- **`sap_horizon_dark`** - dark mode.
- **`sap_horizon_hcb`** / **`sap_horizon_hcw`** - high-contrast black / white, for
  accessibility (Lesson 25 returns to these).

Older themes you will still meet - **`sap_fiori_3`** (Quartz) and **`sap_belize`** - are
**legacy**: fine to recognise, but new apps use Horizon. (From the author's knowledge of
the theme line-up - verify the exact variant names for your UI5 version at
<https://ui5.sap.com/>.)

The **initial** theme is set in the bootstrap, in `index.html`:

```html
<script id="sap-ui-bootstrap" ... data-sap-ui-theme="sap_horizon" ...></script>
```

## Switching the theme at runtime

To change the theme while the app runs, use the modern **`sap/ui/core/Theming`** module:

```js
const sCurrent = Theming.getTheme();
Theming.setTheme(sCurrent === "sap_horizon_dark" ? "sap_horizon" : "sap_horizon_dark");
```

- **`Theming.getTheme()`** - the active theme id.
- **`Theming.setTheme(id)`** - apply a different theme **live**; UI5 re-reads every
  parameter and every control restyles itself. No reload, no view change.

We wire this to a palette button in the table toolbar. (Legacy note: older code used
`sap.ui.getCore().applyTheme(...)`; `sap/ui/core/Theming` is the current, core-free
replacement - prefer it.)

## Your coding task

In `List.controller.js`, complete `onToggleTheme` so it **switches between the light and
dark Horizon themes** with `Theming.setTheme(...)`.

## What the check verifies (and where you are free)

- The bootstrap sets a **valid SAP theme** (any `sap_*` theme id - the check validates
  the *format*, not a specific theme, so choosing a different valid theme passes).
- The controller switches the theme through the **`Theming`** module.
- Every theme id you pass to `setTheme` is a **valid `sap_` theme** - an invalid string
  fails, but *which* valid themes you toggle between is your choice.
- A control triggers the switch.

## Run it yourself

Run the app and click the palette button: the whole UI flips to dark and back, instantly
and consistently - your custom PriorityIndicator included. That is the theme system: one
value changes, everything follows.

---

### Where this came from

The Horizon theme family, the `data-sap-ui-theme` bootstrap option, and the
`sap/ui/core/Theming` module (`getTheme`/`setTheme`) follow the SAPUI5 "Theming",
"Available Themes" and API Reference documentation at <https://ui5.sap.com/>. The exact
variant names are from the author's knowledge - verify them for your version.
