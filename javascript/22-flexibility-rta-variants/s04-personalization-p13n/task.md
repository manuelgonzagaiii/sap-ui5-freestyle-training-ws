# Stage 4 - End-user personalization with the p13n engine

Variants *save* a table state; **personalization** is how the user *changes* it -
the dialog where they tick which columns to show, set sort order, add filters. The
modern, reusable machinery for this is the **`sap.m.p13n` engine**, and pairing it with
the VariantManagement from stage 3 means a user's personalization can be **saved into
their variants**. This closing stage wires it up and steps back to the whole flexibility
map.

## The personalization engine

`sap.m.p13n.Engine` is a framework for "let the user personalize this control". You
**register** a control with it once - describing the personalizable fields and which
panels to offer - then **show** the dialog on demand:

```js
// register, in onInit
Engine.getInstance().register(oTable, {
    helper: new MetadataHelper([
        { key: "orderId", label: "Order", path: "orderId" },
        { key: "customer", label: "Customer", path: "customer" },
        ...
    ]),
    controller: {
        Columns: new SelectionController({ targetAggregation: "columns", control: oTable })
    }
});

// open it, from a button
Engine.getInstance().show(this.byId("ordersTable"), "Columns");
```

- **`register(control, config)`** - declare what can be personalized. The **`helper`**
  (a `MetadataHelper`) lists the fields with a key, a label and a data path. The
  **`controller`** maps each panel name to a personalization controller -
  `SelectionController` for the **Columns** panel handles which columns show and in what
  order. (You can add `Sorter`, `Group` and `Filter` controllers for more panels.)
- **`show(control, panel)`** - open the personalization dialog with the given panel(s).

The engine applies the user's choices to the table and, because the app is
`flexEnabled` with a `VariantManagement`, can **persist** them as USER-layer flexibility
and roll them into saved variants.

## The whole flexibility map

Step back and see what Lesson 22 assembled, by *who* changes the UI and *how widely*:

- **`flexEnabled` + stable IDs** (s1) - the foundation: changes stored as data, keyed by
  control id.
- **RTA / key-user adaptation** (s2) - an **admin** reshapes the app for a **whole scope**
  (KEY USER layer).
- **VariantManagement** (s3) - a **user** saves named views (USER layer).
- **p13n engine** (s4) - the **user** personalizes a control, saved into those views.

Every piece stores changes through `sap.ui.fl` without you writing persistence code, and
none of it edits your source. This is the SAP answer to "every customer wants the app
slightly different": give them flexibility, not forks.

## Your coding task

In `List.controller.js`, complete `onPersonalize` so it **opens the personalization
dialog** for the orders table (the `Columns` panel). The table is already registered with
the engine in `onInit`.

## What the check verifies

- The **personalization engine** is used (registered).
- A **personalization dialog is opened** for the table.
- A control opens personalization.

## Run it yourself

Click the settings button: a dialog lets you tick columns on and off and reorder them;
the table updates. Now **Save As** a variant (stage 3) - your column choice is captured.
Switch variants and the columns follow. End-user personalization, persisted, with no
storage code.

## End of Lesson 22

You have given control of the UI to the people who use it: flexibility enabled on stable
IDs, key-user runtime adaptation, saveable variants, and engine-driven personalization -
the full `sap.ui.fl` stack that powers adaptable SAP apps. In **Lesson 23** we embed
**integration cards**: self-contained, manifest-described widgets that show service data
and can be dropped into dashboards and the Fiori launchpad.

---

### Where this came from

`sap.m.p13n.Engine`, `MetadataHelper`, `SelectionController`, `register`/`show`, and the
USER-vs-KEY-USER flexibility layering follow the SAPUI5 "Personalization" / "sap.m.p13n"
documentation at <https://ui5.sap.com/>. **The p13n engine API has evolved across
versions and this wiring is from the author's knowledge - verify `Engine.register`/`show`,
`MetadataHelper` and `SelectionController` against the API Reference for your UI5 version
before relying on it.**
