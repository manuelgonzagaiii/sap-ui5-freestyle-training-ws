# Stage 4 - Labels in metadata, and the smart-control family

One annotation taught the service where a field's values live. This closing stage of
Phase D adds the simplest and most useful annotation of all - **labels** - and then
steps back to give you the map of SAP's **metadata-driven controls**: the smart
controls you will meet in older projects, and their modern successors. After this, no
generated SAP screen will ever look like magic to you again.

## `@title`: the label lives with the data

Every screen so far has carried its own labels in the i18n bundle. But "the human name
of the `customer` field is *Customer*" is - like the value list - really a fact about
the service. CDS lets you declare it once, in the metadata:

```cds
annotate SalesService.SalesOrders with {
    orderId   @title: 'Order';
    customer  @title: 'Customer';
    status    @title: 'Status';
    amount    @title: 'Amount';
    ...
};
```

CAP publishes each `@title` as a `Common.Label` annotation in `$metadata`.
Metadata-driven UIs use these as column headers and form labels automatically - declare
once, every client agrees. (In a fully translated service these labels go through CAP's
own i18n mechanism, the same idea as Lesson 8 on the server side.)

## The smart-control family - and its successors

Now the map. SAP ships controls that build themselves from exactly the annotations you
have been writing:

- **`sap.ui.comp.smartfield.SmartField`** - give it a binding and it renders the right
  editor for the field's metadata: a text input, a date picker, a value-help dialog
  (from `Common.ValueList` - your stage 3 annotation), with the label from
  `Common.Label`.
- **`sap.ui.comp.smarttable.SmartTable`** - generates a whole table, columns and all,
  from the entity's metadata.
- **`sap.ui.comp.smartfilterbar.SmartFilterBar`** - generates a filter bar with the
  right filter controls per field.

One critical fact before you reach for them: **the `sap.ui.comp` library works with
OData V2 only.** In a V2 freestyle app they are a legitimate, powerful shortcut, and
you will meet them in many existing projects - which is why you should know them. Our
app is OData V4, where the same metadata-driven idea continues in two modern forms:

- **`sap.ui.mdc`** (metadata-driven controls) - the V4-era successor library: fields,
  tables and filter bars that build from metadata through adaptable **delegates** (a
  delegate is a small piece of code you supply that tells the generic control how to read
  *your* service - the hook that adapts a one-size-fits-all control to a specific
  backend). It is powerful but lower-level, aimed at framework builders more than app
  developers.
- **SAP Fiori Elements** - whole floorplans (list report, object page) generated from
  the service and its annotations, with no freestyle UI code at all. This is what RAP
  teams (ABAP RESTful Application Programming, introduced in stage 3) and CAP teams
  usually pair with their services.

So the decision tree you take away from Phase D: **freestyle + V4** (this course) -
you build the UI, annotations document the service; **V2 + sap.ui.comp** - smart
controls assemble screens from annotations; **Fiori Elements** - the service and
annotations *are* the app. All three stand on the same foundation you now know how to
write by hand: entities, services, and annotations. The generated screen is no longer
magic - it is your stage 3 and stage 4 annotations, consumed by a smarter client.

## Your coding task

In `srv/annotations.cds`, give the **customer** field its human **label** with
`@title`.

## What the check verifies (and where you are free)

- Entity fields carry **`@title` labels** in the service metadata (at least four). The
  exact wording of each label is **yours** - any non-empty label passes.

## End of Lesson 19 - and the end of Phase D

Step back and look at the whole phase. You started with a JSON file pretending to be a
backend. You now have: a mock OData V2 server and a real **SAP CAP** backend with a CDS
data model, SQLite persistence and CSV seed data; an **OData V4** client doing
server-side query options, `$expand`, bound actions, batching and side effects; full
**CRUD** with transient contexts, deferred-group editing and ETag concurrency; an
enterprise **table** with paging, sort/group and spreadsheet export; and a complete
**value-help** stack from suggestions to dialogs to the service annotations that power
SAP's generated UIs. That is the entire data backbone of a professional SAP
application - built with free, open-source tools, and understood end to end.

**Phase E** turns to the advanced and rare corners that make you the person the team
asks: custom controls, theming, UI adaptation and personalisation, integration cards,
web components, accessibility, and the drag-and-drop, upload and chart features that
round out a power user's app.

---

### Where this came from

`@title` / `Common.Label` follow the SAP CAP documentation at <https://cap.cloud.sap/>.
The smart-control family (`sap.ui.comp`, V2-only), `sap.ui.mdc` and Fiori Elements are
described in the SAPUI5 documentation at <https://ui5.sap.com/> - from the author's
knowledge of their scope and constraints; verify against the current docs before
relying on the V2/V4 support details.
