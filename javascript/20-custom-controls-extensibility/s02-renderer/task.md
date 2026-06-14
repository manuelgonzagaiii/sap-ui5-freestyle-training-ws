# Stage 2 - The renderer

A control with metadata but no renderer is invisible. The **renderer** is the function
that turns your control's state into HTML, and UI5's modern rendering API is worth
learning properly - it is how every control on screen, including SAP's own, gets drawn.
This stage writes the PriorityIndicator's renderer.

## The RenderManager and semantic rendering

When UI5 needs to draw your control, it calls your `render` function and hands it a
**RenderManager** (`rm`) - a small API for emitting DOM. We use the modern
**`apiVersion: 2`** ("semantic") renderer, where you describe elements with typed calls
instead of concatenating HTML strings:

```js
renderer: {
    apiVersion: 2,
    render(rm, oControl) {
        const sValue = oControl.getValue();
        const sState = sValue === "High" ? "salesPriorityHigh"
            : sValue === "Low" ? "salesPriorityLow" : "salesPriorityMedium";
        rm.openStart("span", oControl);   // <span ...> bound to this control
        rm.class("salesPriority");
        rm.class(sState);
        rm.openEnd();                      // finishes the opening tag
        rm.text(sValue);                   // escaped text content
        rm.close("span");                  // </span>
    }
}
```

Reading it line by line, because each call earns its place:

- **`rm.openStart("span", oControl)`** - begin a `<span>` **and associate it with this
  control**. Passing `oControl` makes the RenderManager stamp the control's **ID** (and
  framework data) onto the element. That association is not cosmetic: it is how UI5
  later finds this DOM to route events to it, apply bindings, and re-render just this
  control. Forget it and your control renders but is "dead" - no events, no updates.
- **`rm.class("salesPriority")`** - add a CSS class. We add a base class and a
  state-specific one (`salesPriorityHigh` and friends) computed from the value. The
  classes are unstyled for now; **Lesson 21 (Theming) styles them** - a deliberate
  hand-off, so you see the same classes from both sides.
- **`rm.openEnd()`** - close the opening `>`. (Between `openStart` and `openEnd` you add
  classes, attributes and styles; after `openEnd` you add content.)
- **`rm.text(sValue)`** - write text content, **automatically escaped**. This is a
  security point: `rm.text` HTML-escapes, so a value can never inject markup. Building
  HTML by hand is where cross-site-scripting bugs come from; the semantic API closes
  that door by default.
- **`rm.close("span")`** - the closing tag.

### Why apiVersion 2 (and what the old way was)

The legacy renderer (`apiVersion: 1`) built strings: `rm.write("<span")`,
`rm.writeControlData(oControl)`, `rm.write(">")`. It worked but re-created all the DOM
on every render and was easy to get wrong (unescaped writes, forgotten control data).
**`apiVersion: 2`** does **semantic, in-place DOM patching** - it updates only what
changed, escapes by default, and writes control data for you when you pass the control
to `openStart`. It is the current best practice; use it for every control you write.

## Your coding task

In `webapp/control/PriorityIndicator.js`, complete the renderer's first line so it
**opens a `span` bound to the control** (`rm.openStart("span", oControl)`).

## What the check verifies

- The renderer uses **`apiVersion: 2`**.
- It **opens an element bound to the control** (`openStart(tag, oControl)`).
- It writes a **CSS class** and the **value text**.

## Run it yourself

Still not visible until stage 3 wires the control into the table - but the renderer is
now complete, so the moment we use it, it will draw.

---

### Where this came from

The `RenderManager`, `apiVersion: 2` semantic rendering, `openStart`/`openEnd`/`text`/
`class` and the auto-escaping behaviour follow the SAPUI5 "Custom Controls" and
"RenderManager" API documentation at <https://ui5.sap.com/>. The class names are this
course's own.
