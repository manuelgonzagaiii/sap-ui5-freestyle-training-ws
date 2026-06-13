# Stage 1 - The CAP data model

The mock server gave us a backend that *pretends*. Now we build a **real** one - and
we do it with SAP's own framework, **CAP**, which is **free to use, with its core
components open source** (the database plugins such as `@cap-js/sqlite` are Apache-2.0;
verify the licence of each package you adopt). No S/4HANA, no paid system, no cloud
account: just Node.js and a file-based database on your own machine. This stage defines
the heart of that backend - the **data model** - in CAP's modelling language, **CDS**.

## What is CAP, and why use it here?

**CAP** (the SAP Cloud Application Programming model) is SAP's framework for building
services and backends. It is the same technology SAP uses for real products, but it
runs locally, for free, on plain Node.js with a small SQLite database. That makes it
the perfect way to learn how a real SAP backend works without any of the cost or
infrastructure - exactly what this course needs.

The remarkable thing about CAP is how little you write. You **describe** your data and
service in a concise language, and CAP generates the database tables, the OData
service, and most of the standard behaviour (create, read, update, delete, paging,
filtering) for you. You declare *what* you want; CAP provides *how*.

## CDS: describing data, not coding it

**CDS** (Core Data Services) is CAP's modelling language. You define your domain in
`db/schema.cds`, and CAP turns each entity into a database table and an OData entity
type. Here is our sales-order model:

```cds
namespace ui5.sales;

entity SalesOrders {
    key orderId : String(10);
    customer    : String(40);
    status      : String(20);
    amount      : Decimal(15, 2);
    currency    : String(3);
    orderDate   : Date;
    priority    : String(10);
    itemCount   : Integer;
    items       : Composition of many SalesOrderItems on items.order = $self;
}

entity SalesOrderItems {
    key ID   : UUID;
    order    : Association to SalesOrders;
    product  : String(60);
    quantity : Integer;
    price    : Decimal(15, 2);
}
```

- **`namespace ui5.sales`** - groups the definitions under a name (like a package),
  which also feeds the CSV file names and the OData types.
- **`entity SalesOrders`** - one table / entity type, with typed elements. The CDS
  types map to both database columns and OData property types. Two are worth a word:
  **`Decimal(15, 2)`** is a fixed-point number with 15 total digits and 2 after the
  decimal point - the correct type for money, because it never rounds the way a binary
  floating-point number does. **`UUID`** is a Universally Unique Identifier, a long
  random string like `8f3b...-...` that CAP can generate for you, so a line item gets a
  guaranteed-unique key without you inventing a numbering scheme. Notice the field names
  match what our front end already binds (`customer`, `amount`, `status`) - by design,
  so the UI barely changes.
- **`key orderId`** - the primary key, as in any database and any OData entity.

## Relationships: Association and Composition

CDS makes relationships first-class, and there are two kinds worth distinguishing:

- **`Association to`** - a *reference* to another entity that exists on its own. The
  `SalesOrderItems.order` field points back to its order. Like a foreign key.
- **`Composition of many`** - a *part-of* relationship. `SalesOrders.items` says an
  order is **made of** its line items: they belong to it, are created and deleted with
  it, and have no independent life. A composition is a stronger bond than an
  association.

The mental model: **an association is "refers to"; a composition is "is made of".** An
order *refers to* nothing it owns, but it *is made of* its items. Choosing correctly
between them is real data-modelling judgement, and CAP uses the choice to drive
behaviour (deleting an order deletes its items, because they are composed in it).

## Your coding task

In `db/schema.cds`, model the order's line **items** as a part-of relationship - the
kind that means the items belong to and live with the order.

## What the check verifies

- A **`SalesOrders`** entity is defined with a **key**.
- It models a **relationship** (a composition or association).

## A note before running it

There is nothing to run yet - we have described the data but not exposed it. In the
next stage we turn this model into a live OData V4 service and load it with data.

---

### Where this came from

CDS entities, `Association`/`Composition` and namespaces follow the official **SAP
CAP documentation** ("Domain Modelling" and "The Bookshop Sample") at
<https://cap.cloud.sap/>. The Sales Order model is this course's own.
