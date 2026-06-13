# Stage 3 - Value list annotations

So far, *we* decided in the front end that the customer field gets value help, and
*we* built the dialog. But notice something: the knowledge "valid customers live in
the Customers entity, shown by their name" is really a fact about the **service**, not
about one screen. OData has a way to state such facts as machine-readable metadata:
**annotations**. This stage adds a **value list annotation** in CAP, and explains the
idea that powers SAP's entire annotation-driven UI world.

## Annotations: facts about data, attached to metadata

An **annotation** is a label attached to a service's metadata - to an entity or a
field - that tells clients something the type system alone cannot: "this field's valid
values come from over there", "this is the human label", "this field is the price and
that one is its currency." Clients that understand the vocabulary can build UI from
it automatically.

In CAP, annotations are written in CDS, typically in their own file
(`srv/annotations.cds`) so the service definition stays clean:

```cds
using SalesService from './sales-service';

annotate SalesService.SalesOrders:customer with @(
    Common.ValueList: {
        $Type: 'Common.ValueListType',
        CollectionPath: 'Customers',
        Parameters: [{
            $Type: 'Common.ValueListParameterInOut',
            LocalDataProperty: customer,
            ValueListProperty: 'name'
        }]
    }
);
```

Read it as a sentence: "the `customer` field of `SalesOrders` has a value list; the
values live in the **`Customers`** collection; the field's value corresponds to a
customer's **`name`** (in *and* out - picking writes `name` back into `customer`)."
CAP publishes this in the service's `$metadata`, and any client can read it.

## Why put this in the service?

Because it is **one fact, declared once, consumed everywhere**:

- Every UI built on this service - yours, a colleague's, a generated one - learns
  where the customer values live from the same metadata, instead of each hard-coding
  it.
- **Annotation-driven clients build the UI for you.** SAP Fiori Elements (the
  framework that generates whole apps from metadata) sees `Common.ValueList` and
  renders a complete value-help dialog - search, columns, the lot - with zero front-end
  code. The smart controls in the next stage do the same.
- Even your freestyle app benefits: the annotation documents the relationship, and
  tooling can validate it.

This is the deeper lesson of the whole RAP/CAP/Fiori-Elements world your welcome page
talks about (**RAP** is SAP's ABAP RESTful Application Programming model, the
server-side counterpart of CAP on the S/4HANA side; both produce annotated OData
services): those generators are not magic - **they read annotations like this one and
assemble standard UI from them.** Now you have written one yourself, you know exactly
what the generated apps are standing on.

## Your coding task

In `srv/annotations.cds`, complete the value list so it points at the **Customers**
collection.

## What the check verifies

- The customer field carries a **`Common.ValueList`** annotation.
- It points at the **Customers** collection and maps the **name** field.

## Run it yourself

Restart `cds watch` and open
`http://localhost:4004/odata/v4/sales/$metadata` - search for `ValueList` and you will
find your annotation, published as part of the service contract, ready for any
annotation-aware client to consume.

---

### Where this came from

`Common.ValueList`, `ValueListParameterInOut` and CDS `annotate` follow the SAP CAP
documentation ("Serving Fiori UIs") at <https://cap.cloud.sap/> and the OData Common
vocabulary. The annotation is this course's own.
