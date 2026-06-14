# Stage 3 - Properties, events and binding

A control that only displays is half a control. Real controls **react** - they raise
events their host can handle - and they slot into data binding like any built-in. This
stage gives the PriorityIndicator a **`press` event**, makes it **clickable**, and finally
**uses it in the orders table**, bound to each row's priority.

## Declaring and firing an event

Events are declared in `metadata`, exactly like properties:

```js
metadata: {
    properties: { value: { type: "string", defaultValue: "Medium" } },
    events: {
        press: {}
    }
}
```

Declaring `press` gives you a generated **`firePress()`** method and lets a host attach a
handler with `press="..."` in XML (just like `sap.m.Button`). The empty `{}` means "no
custom parameters"; you could declare `press: { parameters: { value: { type: "string" } } }`
to pass data to the handler.

To actually raise it, we handle the browser click. UI5 routes DOM events to specially
named methods on your control - **`onclick`**, `onkeydown`, and so on - so we add:

```js
onclick() {
    this.firePress();
}
```

When the user clicks the rendered `<span>`, UI5 (which knows the span belongs to this
control, because stage 2's `openStart(..., oControl)` tied them together) calls
`onclick`, and we fire our semantic `press` event. Notice the layering: a low-level DOM
`click` becomes a high-level, meaningful `press` - the host does not care about clicks,
it cares about "the priority was pressed."

We also made the span focusable in the renderer (`tabindex="0"`, `role="button"`) so it
can be reached and activated from the keyboard - a first taste of accessibility, which
Lesson 25 covers in full.

## Using the control in a view

A custom control is used like any other - declare its namespace and place its tag. In
`List.view.xml` we add the namespace and swap the plain priority text for our control:

```xml
<mvc:View ... xmlns:sales="ui5.sales.control" ...>
    ...
    <sales:PriorityIndicator value="{priority}" press=".onPriorityPress" />
```

- **`xmlns:sales="ui5.sales.control"`** - maps the `sales:` prefix to our control's
  package (the manifest already roots `ui5.sales` at the app, so `ui5.sales.control`
  resolves to `webapp/control/`).
- **`value="{priority}"`** - **data binding into a custom property**. Because `value` is
  a declared property, this binds exactly like a binding on any SAP control, and the
  control re-renders when the bound value changes. This is the metadata contract paying
  off: your control is now a first-class citizen of the binding world.
- **`press=".onPriorityPress"`** - wires our `press` event to a controller handler, which
  for now just shows the value in a toast (stage 4 turns this into an app-wide
  broadcast).

## Your coding task

In `webapp/control/PriorityIndicator.js`: **declare the `press` event** in metadata, and
**fire it** from `onclick` (`this.firePress()`).

## What the check verifies

- The control's metadata declares a **`press` event**.
- It **fires** that event (`firePress()`).
- The list **uses the custom control**, with `value` **bound** to `{priority}` and a
  `press` handler attached.

## Run it yourself

Run the app (`cds watch` + `ui5 serve`). The priority column now shows your control, and
clicking a priority pops a toast with its value. Your own control, bound and interactive,
sitting in the table next to SAP's.

---

### Where this came from

Control `events`, generated `fireX` methods, DOM-event handler methods (`onclick`),
binding into custom properties, and using a custom control via an XML namespace follow
the SAPUI5 "Custom Controls" / "Event Handler Methods" documentation at
<https://ui5.sap.com/>. The wiring is this course's own.
