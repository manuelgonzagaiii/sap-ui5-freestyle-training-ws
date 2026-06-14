# Stage 3 - Custom CSS, done the right way

Remember the classes the PriorityIndicator emitted back in Lesson 20 -
`salesPriority`, `salesPriorityHigh` and friends? They have been sitting on the page
**unstyled**. Now we style them. This stage is about adding your *own* CSS to a UI5 app
**properly** - registered through the descriptor, scoped to your classes, and reusing
the theme's own colours so it survives a theme switch.

## Add a stylesheet, register it in the descriptor

Put app CSS in `webapp/css/style.css` and **register it in `manifest.json`** so UI5 loads
it with the app:

```json
"sap.ui5": {
    ...
    "resources": { "css": [ { "uri": "css/style.css" } ] }
}
```

Why through the descriptor rather than a `<link>` in `index.html`? Because the component
should be **self-contained**: anything that embeds your component (another app, the Fiori
launchpad) loads its CSS automatically from the manifest, with no HTML to remember. It is
the same dependency discipline as declaring libraries.

## Style your classes - and borrow the theme's colours

```css
.salesPriority {
    display: inline-block;
    padding: 0.125rem 0.5rem;
    border-radius: 0.75rem;
    color: #ffffff;
}
.salesPriorityHigh   { background-color: var(--sapNegativeColor, #bb0000); }
.salesPriorityMedium { background-color: var(--sapCriticalColor, #e76500); }
.salesPriorityLow    { background-color: var(--sapPositiveColor, #107e3e); }
```

Two best practices are doing real work here:

- **Scope to your own classes.** Every rule targets a `salesPriority*` class you created.
  Never restyle SAP's own control classes (`.sapMBtn` and the like) - those are internal
  and change between versions; overriding them is the classic way to break on upgrade.
- **Reuse theme parameters as CSS variables.** `var(--sapNegativeColor, #bb0000)` reads
  the theme's *semantic negative colour* (with a hard-coded fallback). Because we borrow
  the theme's own value, our badge turns the right shade of red in light mode **and** in
  dark mode - it follows the theme switch from stage 1 for free. Hard-code `#bb0000`
  instead and it would look wrong the moment someone switches to dark.

This is the whole philosophy of styling in UI5: **add little, scope tightly, and lean on
the theme** rather than fighting it.

## Your coding task

In `manifest.json`, **register the stylesheet** as a CSS resource so the app loads
`css/style.css`.

## What the check verifies (and where you are free)

- The descriptor **registers a CSS resource** (any `.css` uri).
- The stylesheet **styles the custom control's `salesPriority` classes**.
- The actual colours, padding and shape are **yours** - design the badge however you
  like; the check only requires that your CSS targets your classes and is registered.

## Run it yourself

The priority badges are finally coloured - red for High, amber for Medium, green for
Low. Now switch to dark mode (stage 1's button): the badges shift to the dark theme's
semantic colours, because we borrowed them instead of hard-coding. That is custom CSS
that respects the theme.

---

### Where this came from

The descriptor `sap.ui5/resources/css` registration, the advice to scope custom CSS and
to consume theme parameters as CSS custom properties (`--sapNegativeColor` and friends)
follow the SAPUI5 "Adding Custom CSS" / "Theming Parameters as CSS Variables"
documentation at <https://ui5.sap.com/>. The exact CSS variable names are from the
author's knowledge - verify them for your theme version.
