# Stage 3 - Keyboard access and F6 fast navigation

A screen reader is one half of accessibility; the **keyboard** is the other. Everything a
mouse can do, a keyboard must do too - and in a dense business app, users need to move
**between regions** quickly, not Tab through fifty controls. UI5 gives you both: full
keyboard operability out of the box, and **F6 fast navigation** between groups. This stage
marks a region as a fast-nav group.

## Keyboard operability (mostly free, with a catch)

Standard UI5 controls are fully keyboard-operable: Tab moves between focusable controls,
Enter/Space activate, arrow keys move within a list or table. You get this for nothing -
**as long as custom controls join in**. Our PriorityIndicator does, because we gave it
`tabindex="0"` (focusable) and a `role` and fire `press` (Lesson 20) - so Tab reaches it
and Enter/Space activate it. The lesson: **a custom control must be keyboard-operable or
it is a dead spot** for keyboard users.

## F6: jumping between regions

Tabbing through every control is slow. **F6** (and Shift+F6) jumps between **fast-nav
groups** - logical regions like "the header", "the table", "the footer" - so a user lands
where they want in one or two presses. You mark a container as a group with a piece of
**custom data** that UI5 writes to the DOM:

```xml
<mvc:View ... xmlns:app="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1" ...>
    ...
    <f:DynamicPage id="listDynamicPage" app:sap-ui-fastnavgroup="true">
```

- The **`app:` namespace** is UI5's standard way to attach **custom data** to a control
  in XML. (It is the declarative form of `sap.ui.core.CustomData`.)
- **`app:sap-ui-fastnavgroup="true"`** - UI5 recognises this special key and renders the
  region as an **F6 group**. Press F6 and focus jumps to the next such group.

Mark your main regions (header, content, footer) as groups and keyboard users navigate the
app in a handful of keystrokes - the same fast paths SAP's standard apps provide.

## Your coding task

In `List.view.xml`, **mark the page region as an F6 fast-navigation group** with the
custom-data attribute.

## What the check verifies

- The **custom-data namespace** is declared.
- A region is **marked as an F6 fast-nav group**.

## Run it yourself

Run the app and press **F6** repeatedly: focus jumps between the marked region(s) instead
of crawling control by control. Add the marker to more containers and you build the
keyboard "express lanes" power users rely on.

---

### Where this came from

Keyboard handling, F6/Shift+F6 group navigation, the `sap-ui-fastnavgroup` marker and the
custom-data XML namespace follow the SAPUI5 "Keyboard Handling" / "Accessibility"
documentation at <https://ui5.sap.com/>. The custom-data namespace URI is from the
author's knowledge - verify it for your UI5 version.
