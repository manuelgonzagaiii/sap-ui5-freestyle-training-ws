# Stage 1 - Accessibility, and the accessible name

An app that only works for sighted mouse users is a broken app for a lot of people - and,
for most organisations, a legal problem. **Accessibility (a11y)** means everyone can use
it: people using a screen reader, a keyboard only, or high contrast. SAP takes this
seriously, and so should you. The good news is that **standard UI5 controls are already
accessible**; the work is mostly in the custom code you add - which is exactly where this
lesson focuses. We start with the single most important concept: the **accessible name**.

## Why a11y, concretely

- **Screen-reader users** hear the UI instead of seeing it. Every meaningful element must
  expose a **name** and a **role** so it can be announced.
- **Keyboard-only users** (including many power users) must reach and operate everything
  without a mouse.
- **Low-vision users** need sufficient **contrast** and the ability to enlarge.
- For public bodies and large enterprises, conformance (WCAG, and SAP's own a11y
  standards) is often a **legal requirement**, not a nicety.

UI5's built-in controls handle most of this. The trap is **custom controls** - like our
PriorityIndicator - which are accessible only if *you* make them so.

## ARIA: name and role

Screen readers read the **accessibility tree**, driven by **ARIA** attributes. Two matter
most:

- **role** - *what the element is* ("button", "list", "dialog"). We already set
  `role="button"` on the PriorityIndicator in Lesson 20.
- **accessible name** - *what it is called*. Without a name, a screen reader announces
  "button" - useless. We give it one with **`aria-label`**:

```js
rm.openStart("span", oControl);
rm.class("salesPriority");
rm.attr("tabindex", "0");
rm.attr("role", "button");
rm.attr("aria-label", sValue + " priority");   // "High priority"
rm.openEnd();
```

Now a screen reader announces "High priority, button" - meaningful. Together with the
`tabindex="0"` that makes it keyboard-focusable, the control is now perceivable and
operable by assistive technology.

(Best practice note: a user-facing string like this should come from the i18n bundle, not
be hard-coded - so it translates. We inline it here to keep the focus on the ARIA
mechanism; in production, pass the label in or read it from a resource bundle.)

## Your coding task

In `webapp/control/PriorityIndicator.js`, give the control an **accessible name** with
`aria-label` in its renderer.

## What the check verifies (and where you are free)

- The custom control **writes an accessible name** (`aria-label`).
- It keeps its **role** and is **focusable** (`tabindex`).
- The exact label text is **yours** - any `aria-label` passes; the check insists only that
  an accessible name is provided.

## Run it yourself

Run the app with a screen reader (VoiceOver on macOS, NVDA on Windows) and tab to a
priority badge: it now announces a real name, not a bare "button". You have made your own
control accessible - the part the framework cannot do for you.

---

### Where this came from

ARIA roles, the accessible name, `aria-label`, and the principle that custom controls must
provide their own accessibility follow the SAPUI5 "Accessibility" and "Creating Accessible
Controls" documentation at <https://ui5.sap.com/> and the WAI-ARIA standard.
