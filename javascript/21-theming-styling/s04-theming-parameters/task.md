# Stage 4 - Reading theme values in JavaScript

CSS can read theme colours with `var(--sapNegativeColor)`. But sometimes you need a
theme value **in JavaScript** - to paint a `<canvas`> chart, to compute a colour, to pass
to a non-UI5 library. UI5 exposes every theme value through the **Theming Parameters**
API, and using it correctly means understanding one subtlety: the theme may not be
loaded yet. This final stage reads a parameter the right way and closes the theming
lesson.

## `Parameters.get` - and why it is asynchronous

The module is `sap/ui/core/theming/Parameters`. The modern call takes an **object** with
a name and a **callback**:

```js
const sColor = Parameters.get({
    name: "sapUiBrandColor",
    callback: (sAsyncColor) => this._applyBrand(sAsyncColor)
});
if (sColor) { this._applyBrand(sColor); }
```

The two-path shape is deliberate and worth understanding:

- **If the theme is already loaded**, `Parameters.get` **returns the value synchronously**
  - so `sColor` is the colour and the `if` applies it immediately.
- **If the theme has not finished loading**, it returns `undefined` now and **calls your
  `callback` later**, when the value is known.

This is the whole lesson: **theme parameters can resolve late.** A theme is CSS and data
that loads asynchronously; ask for a value too early and it is not there yet. The
callback form handles both cases, so your code is correct whether the theme is ready or
not. (The old synchronous-only `Parameters.get("name")` string form still exists but can
return `undefined` during startup and is discouraged - prefer the callback form.)

We read `sapUiBrandColor` (a semantic theme value) and push it into a CSS custom property
`--salesBrand` so the rest of the app can use it - a small but real round trip from theme
to JavaScript to the page.

## The wider theming map

Across this lesson you have touched every layer of theming, lightest to deepest:

- **Pick a theme** and switch it live (`Theming`).
- **Match density** to the device (`sapUiSize*`).
- **Add scoped custom CSS** that borrows theme colours as CSS variables.
- **Read theme values in JS** (`Parameters.get`).

One more you will meet in big branded projects, worth knowing by name: the **UI Theme
Designer**, a web tool for building a fully custom theme (your company's colours and
logo) on top of a base theme, which the app then loads like any other. (From the author's
knowledge - it is a separate SAP tool; verify availability for your platform.)

## Your coding task

In `App.controller.js`, complete `_readBrandColor` so it **reads the `sapUiBrandColor`
theme parameter using the asynchronous callback form** of `Parameters.get`.

## What the check verifies (and where you are free)

- It imports the **theming Parameters** module.
- It **reads a parameter by name** (any parameter name is fine).
- It uses the **callback form**, because the theme may not be loaded yet - this is the
  part the check insists on, since the synchronous form is the bug-prone one.

## Run it yourself

Open the app with the console showing: `--salesBrand` is set on the document from the
live theme value, and it updates when you switch themes. You have read a theme value in
JavaScript, correctly, with no assumption about load timing.

## End of Lesson 21

The app now owns its appearance: a switchable Horizon theme (light/dark), device-matched
density, scoped custom CSS that follows the theme, and JavaScript access to theme values.
In **Lesson 22** we hand styling *and layout* power to the end user - SAP's flexibility
services: right-click adaptation (RTA), saveable view variants, and table
personalisation, all persisted without you writing storage code.

---

### Where this came from

`sap/ui/core/theming/Parameters`, the synchronous-or-callback behaviour of
`Parameters.get`, and the note on the UI Theme Designer follow the SAPUI5 "Theming
Parameters" / "Using Theme Parameters in JavaScript" documentation at
<https://ui5.sap.com/>. The parameter name and its use are this course's own.
