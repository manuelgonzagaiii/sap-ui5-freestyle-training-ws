# Stage 2 - Expose an OData V4 service

We have a data model, but a model is private - nothing can talk to it yet. In CAP you
publish data by defining a **service**: a thin layer that exposes chosen entities as a
real **OData V4** API. This stage writes that service, gives the database some starting
data, and configures the project so `cds watch` brings the whole backend to life on
your machine.

## A service is a projection

A CAP service does not duplicate your model - it **projects** it. In
`srv/sales-service.cds`:

```cds
using { ui5.sales as my } from '../db/schema';

@path: 'sales'
service SalesService {
    entity SalesOrders     as projection on my.SalesOrders;
    entity SalesOrderItems as projection on my.SalesOrderItems;
}
```

- **`using ... from '../db/schema'`** - import the data model so the service can
  reference it.
- **`service SalesService { ... }`** - declare a service that exposes entities.
- **`entity SalesOrders as projection on my.SalesOrders`** - publish the `SalesOrders`
  table through the service. A projection can expose all fields (as here) or a subset,
  rename them, add computed ones - it is your chance to shape *what the outside sees*
  separately from how data is stored.
- **`@path: 'sales'`** - the service's URL segment. With CAP's default OData V4 base
  path, the service is served at **`/odata/v4/sales/`**, and the orders at
  `/odata/v4/sales/SalesOrders`.

That is the entire API definition. CAP reads it and generates a fully working OData V4
service - with read, create, update, delete, `$filter`, `$orderby`, `$top`, paging -
without a line of handler code.

## Seeding the database

A backend with no data is not much of a demo. CAP loads **CSV files** from `db/data/`
into the database automatically. The file name encodes the namespace and entity:

```
db/data/ui5.sales-SalesOrders.csv

orderId,customer,status,amount,currency,orderDate,priority,itemCount
SO-1001,Atlas Trading,Open,1250.50,EUR,2026-05-12,High,3
...
```

The header row matches the entity's elements; each line is a record. On start-up CAP
imports these into the (SQLite) database, so the service comes up already populated
with our eight orders.

## Configuring the project

The backend is a Node.js project. `package.json` declares the dependencies and the
database choice:

```json
{
    "dependencies": { "@sap/cds": "^9" },
    "devDependencies": { "@cap-js/sqlite": "^2", ... },
    "cds": { "requires": { "db": "sqlite" } }
}
```

- **`@sap/cds`** - the CAP runtime and tooling.
- **`@cap-js/sqlite`** - the free, file-based database for local development. No server
  to install; CAP creates an in-memory SQLite database on start-up.
- **`"cds": { "requires": { "db": "sqlite" } }`** - tells CAP to use SQLite.

To run it (after `npm install`):

```
cds watch
```

`cds watch` compiles your CDS, sets up the SQLite database, loads the CSVs, and serves
the OData V4 API - reloading whenever you change a file. Open
`http://localhost:4004/odata/v4/sales/$metadata` and you will see the service contract
CAP generated from your model, and `http://localhost:4004/odata/v4/sales/SalesOrders`
returns your orders as real OData V4 JSON.

## Your coding task

In `srv/sales-service.cds`, complete the projection so the service exposes the
**`SalesOrders`** entity from the schema.

## What the check verifies

- A **service** projects the **`SalesOrders`** entity.
- **CSV seed data** exists for the entity.
- The project **depends on CAP** and is configured for **SQLite**.

## Run it yourself

```
npm install
cds watch
```

Then open `http://localhost:4004` - CAP shows an index of your service and entities.
You now have a genuine OData V4 backend running locally, for free. Next we point the
app at it.

---

### Where this came from

CAP services, projections, `@path`, CSV seed data and the SQLite/`cds watch` setup
follow the official **SAP CAP documentation** ("Providing Services", "Adding Initial
Data", "Databases") at <https://cap.cloud.sap/> (grounded via the SAP CAP
documentation tool). The service is this course's own.
