# Stage 2 - Start the mock server and declare the OData model

We have a service contract and some data, but nothing is serving them yet. In this
stage we start the **mock server** - a fake OData backend that runs entirely in the
browser - and point the app's data model at it. After this, the app stops reading a
JSON file and starts making real OData requests, exactly as it will against a true
server. It is the moment the app gets a "backend".

## The mock server: a backend with no backend

`sap.ui.core.util.MockServer` intercepts the app's HTTP requests to a service URL and
answers them from your metadata and mock data - implementing the OData protocol in
the browser. It is invaluable: you build and demo the whole app, with realistic OData
behaviour (filtering, paging, CRUD), **before any server exists**, and your code does
not change when you later switch to the real one.

`webapp/localService/mockserver.js` sets it up:

```js
const oMockServer = new MockServer({ rootUri: "/sales/" });
oMockServer.simulate("localService/metadata.xml", {
    sMockdataBaseUrl: "localService/mockdata",
    bGenerateMissingMockData: true
});
oMockServer.start();
```

It says: answer requests under `/sales/`, using this metadata, with data from the
mockdata folder. Once started, any OData call to `/sales/SalesOrders` is served
locally.

## Starting it at the right time

The mock server must be running **before** the OData model makes its first request -
which happens during the component's start-up. So `Component.js` starts it first:

```js
init() {
    mockserver.init();                              // 1. fake backend up
    UIComponent.prototype.init.apply(this, arguments); // 2. parent init creates the OData model (from the manifest)
    this.getRouter().initialize();
}
```

Order matters: the model (declared in the manifest) is created by the parent `init`,
so the mock server has to be up just before it. (In a real app you would only start
the mock server in a test variant, not in production - but while we have no real
backend, starting it here keeps the app runnable.)

## Declaring the OData model in the manifest

The descriptor now describes a real service. A **data source** names it, and the
default **model** is an **OData V2 model** bound to that source:

```json
"sap.app": {
    "dataSources": {
        "mainService": { "uri": "/sales/", "type": "OData",
            "settings": { "odataVersion": "2.0", "localUri": "localService/metadata.xml" } }
    }
},
"sap.ui5": {
    "models": {
        "": { "dataSource": "mainService", "type": "sap.ui.model.odata.v2.ODataModel" },
        "ui": { "type": "sap.ui.model.json.JSONModel", "uri": "model/ui.json" }
    }
}
```

- **`dataSources.mainService`** - the service: its URL (`/sales/`, matching the mock
  server) and its `localUri` (the metadata file). `odataVersion: "2.0"` says it is
  OData V2 (V4 comes with the CAP backend next lesson).
- **The default model `""`** is now a **`sap.ui.model.odata.v2.ODataModel`** - the
  same binding you know, but backed by a server instead of a JSON object.
- **The `ui` model** is a small JSON model that now holds the KPI numbers. (Those
  were in the old default JSON model; since the default is now OData orders, the
  summary numbers move to their own model - which is why the KPI tiles bind
  `{ui>/kpi/...}`.)

The beautiful part: **your bindings barely change.** `{customer}`, `{amount}`,
`{status}` work identically; the framework now fetches them over OData instead of
reading a file.

## Your coding task

In `Component.js`, **start the mock server** before the parent `init`, so the OData
model talks to the fake backend.

## What the check verifies

- The Component **starts the mock server** before init.
- A **data source** points at the OData service with the local metadata.
- The default model is an **OData V2 model** bound to that data source.

## Run it yourself

```
npx ui5 serve --open index.html
```

The app looks the same - but open the browser's network tab (F12) and you will see
real **OData requests** to `/sales/SalesOrders`, answered by the mock server. Your
app is now a client-server app, even though the server is fake.

---

### Where this came from

`sap.ui.core.util.MockServer`, the manifest `dataSources`, and `odata.v2.ODataModel`
follow the SAPUI5 "Mock Server" and "OData V2 Model" docs at <https://ui5.sap.com/>
and standard UI5 project structure (from the author's knowledge - verify in the
browser). The setup is this course's own.
