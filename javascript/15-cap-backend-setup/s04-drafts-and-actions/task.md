# Stage 4 - Drafts and a bound action

Our CAP service offers the standard create/read/update/delete for free. Real SAP apps
add two things on top: **draft editing** (so a half-finished edit is saved safely and
can be resumed, not lost) and **actions** (custom operations beyond plain CRUD, like
"mark completed"). CAP gives you both with almost no code - a single annotation and a
small handler. This stage adds them and closes the backend lesson.

## Drafts: editing without fear

In a plain CRUD service, editing is all-or-nothing: you change a record and save, and
if you navigate away mid-edit, your work is gone. **Draft handling** fixes this. When
the user starts editing, the server creates a private **draft** copy; they change it
freely, and only **activating** the draft commits it to the real data. Close the
browser and the draft is still there to resume. This is the standard Fiori editing
experience, and CAP turns it on with one annotation:

```cds
@odata.draft.enabled
entity SalesOrders as projection on my.SalesOrders actions { ... };
```

Behind that single line, CAP implements the whole **draft choreography**:

- **Create a draft** - `POST` to the collection makes a draft (`IsActiveEntity=false`).
- **Edit the draft** - `PATCH` the draft entity; changes are saved but not yet live.
- **Activate** - `POST .../draftActivate` promotes the draft to the real, active
  record.

You did not write any of that - the annotation generated it. (The front end consumes
this choreography automatically when you build edit screens against a draft-enabled
service.)

**One consequence to remember:** enabling drafts **adds a second key field,
`IsActiveEntity`, to the entity.** From now on a single order is addressed not just by
`orderId` but by `orderId` *and* whether you mean the active record or the draft -
`SalesOrders(orderId='SO-1004',IsActiveEntity=true)` for the live one,
`...,IsActiveEntity=false` for its draft. That is why our detail page (read
`Detail.controller.js`) binds to `/SalesOrders(orderId='...',IsActiveEntity=true)` rather
than the bare `(orderId='...')` we used before drafts. It is the single most common
surprise when you first turn drafts on. (Confirmed against the SAP CAP "Draft Support"
guide.)

## Actions: operations beyond CRUD

Create, read, update and delete cover *data*, but business apps need *verbs*: approve,
cancel, "mark completed". Those are **actions** - custom operations you declare on the
service and implement in code. We add a **bound** action (bound to a specific order):

```cds
entity SalesOrders as projection on my.SalesOrders actions {
    action setCompleted() returns SalesOrders;
};
```

- **`actions { action setCompleted() returns SalesOrders; }`** - declares an action
  callable *on an order*, returning the updated order.

And the logic lives in `srv/sales-service.js` - a file CAP automatically pairs with
`sales-service.cds` **by name**: a `.js` file sitting next to a `.cds` service file is
loaded as that service's implementation. The conventional shape is a class that extends
CAP's `ApplicationService` and registers handlers in `init()`:

```js
const cds = require("@sap/cds");

module.exports = class SalesService extends cds.ApplicationService {
    init() {
        const { SalesOrders } = this.entities;   // the entities this service exposes

        this.on("setCompleted", SalesOrders, async (req) => {
            const { orderId } = req.params[req.params.length - 1];
            await UPDATE(SalesOrders).set({ status: "Completed" }).where({ orderId });
            return SELECT.one.from(SalesOrders).where({ orderId });
        });

        return super.init();
    }
};
```

- **`module.exports = class ... extends cds.ApplicationService`** - the standard way to
  give a CAP service custom code. CAP instantiates this class for you.
- **`const { SalesOrders } = this.entities`** - `this.entities` is the set of entities
  the service exposes; we pull out `SalesOrders` so we can refer to it in handlers and
  queries. (This is where the `SalesOrders` used below comes from.)
- **`this.on("setCompleted", SalesOrders, handler)`** - run this handler when the
  `setCompleted` action is invoked on a `SalesOrders` entity.
- **`UPDATE(...).set(...).where(...)`** and **`SELECT.one.from(...)`** - **CQL (CDS
  Query Language)**, CAP's built-in query API: update the order's status, then return
  the fresh record. It reads like SQL but is plain JavaScript, so queries are written
  inline, type-checked against your model, and database-independent. This is how you add
  real business logic to a CAP service - small, readable, server-side.

The mental model: **annotations give you standard behaviour for free (drafts); handlers
add the behaviour that is yours alone (actions).** A real backend is mostly the former
with a little of the latter.

## Your coding task

In `srv/sales-service.cds`, **enable draft editing** for the `SalesOrders` projection.

## What the check verifies

- The `SalesOrders` projection is **draft-enabled**.
- A **bound action** is declared on the entity.

## End of Lesson 15

You now have a genuine SAP backend, built with free tooling: a CDS data model, an OData
V4 service exposing it, a SQLite database seeded from CSV, draft editing, and a custom
action - all running locally with `cds watch`, and your SAPUI5 app talking to it over a
proxy. This is, in miniature, exactly how production SAP applications are built. No
S/4HANA, no paid system - and you understand every layer.

In **Lesson 16** we go deep on the **OData V4 binding** on the SAPUI5 side: context and
list bindings, `$expand`/`$select`/`$count`, and invoking actions like the
`setCompleted` you just wrote - so the front end fully exploits the real service.

---

### Where this came from

`@odata.draft.enabled`, the draft choreography (including the `IsActiveEntity` key
predicate), bound actions and CQL handlers follow the official **SAP CAP documentation**
("Serving SAP Fiori UIs > Draft Support" and "Actions and Functions") at
<https://cap.cloud.sap/>; the draft-key behaviour here was checked against that Draft
Support guide. The action is this course's own; verify it with `cds watch`.
