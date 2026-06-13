# Stage 1 - OData metadata and mock data

For thirteen lessons our data has lived in a local JSON file we made up. Real SAP
apps talk to a **server** over a protocol called **OData**, and that changes how
data flows in important ways. Phase D connects our app to a real backend. But you
do not need a running server to *start* - UI5 can fake one in the browser. The first
step, and this stage, is to define the **shape** of the service: its **metadata**
and some **mock data**.

## What is OData?

**OData** (Open Data Protocol) is a standard way for a server to expose data over
HTTP so that clients can read and change it with ordinary web requests. SAP backends
speak OData; it is the native language of Fiori. Two ideas matter for us:

- The server exposes **entity sets** (collections, like `SalesOrders`) made of
  **entities** (records) with typed **properties**.
- The client asks for data with URLs and standard query options
  (`?$filter=...`, `?$orderby=...`, `?$top=10`) - so filtering and sorting can happen
  **on the server**, over the whole dataset, not just the page in memory.

This is the big shift from a JSON file: with OData, the data lives on a server, and
the framework talks to it for you.

## The metadata: a contract for the service

Before any data flows, OData services publish a **metadata document** (in a format
called EDMX) that describes exactly what the service offers - every entity, its
properties and their types. It is a **contract**: the client reads it to know what
exists and how to talk to it. Open `webapp/localService/metadata.xml`:

```xml
<EntityType Name="SalesOrder">
    <Key><PropertyRef Name="orderId" /></Key>
    <Property Name="orderId"  Type="Edm.String" Nullable="false" MaxLength="10" />
    <Property Name="customer" Type="Edm.String" MaxLength="40" />
    <Property Name="amount"   Type="Edm.Decimal" Precision="15" Scale="2" />
    ...
</EntityType>
<EntityContainer Name="Container" m:IsDefaultEntityContainer="true">
    <EntitySet Name="SalesOrders" EntityType="ui5.sales.SalesOrder" />
</EntityContainer>
```

- **`EntityType "SalesOrder"`** - the shape of one order: typed properties
  (`Edm.String`, `Edm.Decimal`, `Edm.Int32` - the OData type system), with lengths
  and precision.
- **`<Key>`** - the **primary key**, `orderId`. Every entity needs one, because OData
  addresses a single record by its key: `/SalesOrders('SO-1004')`. (This is why,
  later, our detail page will look orders up by `orderId` instead of by array index.)
- **`EntitySet "SalesOrders"`** - the collection the client queries.

This contract is why an OData app is robust: the client and server agree, in
writing, on the shape of the data before a single byte moves.

## The mock data

`webapp/localService/mockdata/SalesOrders.json` holds sample records that match the
metadata - the same eight orders, now in the form the fake server will serve. In the
next stage a **mock server** reads the metadata and this data and answers OData
requests with it, so the whole app runs with no real backend.

## Your coding task

In `webapp/localService/metadata.xml`, complete the service container so it
**exposes the `SalesOrders` entity set** (built from the `SalesOrder` entity type).

## What the check verifies

- The metadata defines a **`SalesOrder`** entity type with a **key**.
- It exposes a **`SalesOrders`** entity set.
- The mock data is a **non-empty array** of orders.

## A note before you run it

This stage only *defines* the service - the app is still reading the old JSON file,
so it looks unchanged. We switch it onto the OData service (via the mock server) in
the next stage.

---

### Where this came from

OData, EDMX metadata, entity types/sets/keys and the UI5 mock-server file layout
follow the SAPUI5 "Mock Server" and "OData V2 Model" documentation at
<https://ui5.sap.com/> (and standard UI5 freestyle project structure - from the
author's knowledge; verify the service runs in the browser). The data is this
course's own.
