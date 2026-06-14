# Stage 4 - High-contrast themes, and the accessibility toolkit

The last group to design for is **low-vision users**, who need much stronger contrast than
a standard theme provides. SAP ships **high-contrast themes** for exactly this, and -
nicely - they plug straight into the theme switch you built in Lesson 21. This closing
stage adds high contrast and pulls the whole a11y toolkit together.

## High-contrast themes

Alongside the light and dark Horizon themes are **high-contrast** variants:

- **`sap_horizon_hcb`** - high-contrast **black** (light text on near-black, maximal
  contrast).
- **`sap_horizon_hcw`** - high-contrast **white**.

They are full themes like any other, so enabling them is just adding them to the rotation
in our theme switcher:

```js
onToggleTheme() {
    const aThemes = ["sap_horizon", "sap_horizon_dark", "sap_horizon_hcb"];
    const iNext = (aThemes.indexOf(Theming.getTheme()) + 1) % aThemes.length;
    Theming.setTheme(aThemes[iNext]);
}
```

Because every control reads its colours from the theme, switching to `sap_horizon_hcb`
restyles the entire app - including your custom badge, which borrows theme colours (Lesson
21) - to a high-contrast palette. No per-control work; the theme system carries it.

## The accessibility toolkit, all together

Step back and see everything this lesson assembled into a complete a11y practice:

- **Semantic controls** - use the right control with the right role (free with standard
  controls; *your job* in custom ones).
- **Accessible names** - `aria-label` for computed names, `InvisibleText` +
  `ariaLabelledBy` for translatable labels.
- **Keyboard** - everything operable without a mouse; F6 fast-nav between regions.
- **Contrast** - high-contrast themes for low-vision users.
- **Test it** - keyboard-only walkthroughs, a real screen reader, and SAP's
  accessibility-checking tooling. Accessibility is verified, not assumed.

The throughline: **standard UI5 is accessible; your custom additions are accessible only
if you make them so.** You now know how.

## Your coding task

In `List.controller.js`, **include a high-contrast theme** in the theme rotation
(`sap_horizon_hcb`).

## What the check verifies (and where you are free)

- The rotation **includes a high-contrast theme** (any `_hcb`/`_hcw` variant).
- Every theme id in the rotation is a **valid `sap_` theme** - an invalid id fails, but
  which valid themes you rotate through is your choice.

## Run it yourself

Click the theme button through the cycle: light, dark, then **high contrast** - the whole
app, custom controls included, snaps to a maximal-contrast palette. That is the full set
of users covered: sighted, screen-reader, keyboard-only, and low-vision.

## End of Lesson 25

The app is now accessible: ARIA names on custom controls, translatable labels via
InvisibleText, full keyboard operation with F6 fast-nav, and high-contrast theming - the
practice that makes a UI5 app usable by everyone and compliant where it must be. In
**Lesson 26**, the last of Phase E, we add the power-user flourishes: drag and drop,
file uploads, a guided wizard, and charts.

---

### Where this came from

High-contrast themes (`sap_horizon_hcb`/`hcw`), their integration with `Theming`, and the
broader accessibility practice (names, keyboard, contrast, testing) follow the SAPUI5
"Accessibility" and "Available Themes" documentation at <https://ui5.sap.com/>. The exact
high-contrast theme names are from the author's knowledge - verify them for your version.
