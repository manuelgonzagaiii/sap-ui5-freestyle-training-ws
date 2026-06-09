# Stage 4 - Toolbars and actions

A screen needs somewhere to put its **actions** - the buttons that *do* things:
Create, Save, Delete, Refresh. Scattering them around the content looks messy and
leaves users hunting. The professional answer is a **toolbar**, and the smartest
version, the **`OverflowToolbar`**, is what we add to the footer of our page to
finish the foundations.

## Toolbars: a home for actions

A **`sap.m.Toolbar`** is a horizontal strip that holds controls - usually buttons,
plus the occasional title or search field. You place it in a structural slot, most
often a `Page`'s `footer` (bottom of the screen) or as part of a header.

The **`sap.m.OverflowToolbar`** is the one you should reach for by default. It does
something a plain `Toolbar` cannot: when the window is too narrow to show every
action, it automatically moves the lower-priority ones into an **overflow menu**
(the "..." button) instead of letting them overlap or disappear. On a phone, your
five actions collapse gracefully; on a wide desktop, they all show. You get
responsive behaviour for free - which is exactly the kind of thing BAS or a
generator would set up for you without you ever noticing it was a decision.

```xml
<footer>
    <OverflowToolbar>
        <ToolbarSpacer />
        <Button text="Create" type="Emphasized" press=".onCreate" />
        <Button text="Refresh" icon="sap-icon://refresh" />
    </OverflowToolbar>
</footer>
```

## The pieces that make a toolbar read well

- **`ToolbarSpacer`** - an empty, stretchy element that eats up the free space.
  Put it first and everything after it is pushed to the **right** - the
  conventional place for primary actions. Remove it and the buttons huddle on the
  left. It is the small trick behind almost every nicely aligned toolbar you have
  ever seen.
- **`Button type="Emphasized"`** - marks the **primary** action so it stands out.
  A screen should have one obvious "main" button (here, Create); the rest stay
  default. Choosing which action is primary is a real design decision, not
  decoration.
- **`icon="sap-icon://refresh"`** - UI5 ships a large icon font; `sap-icon://`
  names pull from it, so you rarely need image files for standard actions.

The mental model for actions: **group them in a toolbar, push the important ones
right with a spacer, emphasise the single primary one, and let `OverflowToolbar`
handle small screens.** That one sentence describes the action area of most SAP
apps you will ever see.

## Your coding task

In `App.view.xml`'s footer `OverflowToolbar`:

1. Add the element that **pushes the actions to the right**.
2. Give the primary action button a **label** of your choosing.

## What the check verifies (and where you are free)

- The `Page` has a **`footer`** containing an **`OverflowToolbar`** (rule of law -
  that is the responsive, correct home for actions).
- A **`ToolbarSpacer`** is present (so the actions align right).
- There is at least one action **`Button`** - and its **label is yours**.

## Run it, then resize it

```
npx ui5 serve --open index.html
```

Drag the browser window narrow and watch the toolbar collapse the extra action
into an overflow menu, then widen it and watch them return. You did not write a
line of responsive logic - the control did it.

## End of Lesson 4 - and the end of Phase A

Take a moment, because you have come a long way. You started with a blank HTML
file. You now have a properly structured SAPUI5 application: bootstrapped the
modern way, packaged as a **Component** with a complete **manifest**, organised
with **MVC** (views, controllers, a model, data binding, event handling), and
framed with real **controls** - a header `Bar`, input controls, an accessible
`Label`, and a responsive action toolbar. More importantly, you can explain *why*
every one of those pieces exists.

That is the whole foundation. From here, **Phase B** builds on it to make the app
real: responsive layouts, proper data binding and models, formatting and
internationalisation, and routing between screens - the machinery that turns this
single page into the multi-screen Sales Order Management app.

---

### Where this came from

`sap.m.OverflowToolbar`, `Toolbar`, `ToolbarSpacer` and `Button` (types, icons)
are documented in the SAPUI5 API Reference at <https://ui5.sap.com/>; the
footer-toolbar action pattern follows **`UI5/sample-app`**
(`webapp/view/App.view.xml`). The action labels are this course's own choice.
