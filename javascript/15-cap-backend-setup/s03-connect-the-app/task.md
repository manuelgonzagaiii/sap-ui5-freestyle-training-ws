# Stage 3 - Connect the app to the CAP service

The CAP backend is running and serving real OData V4. Now we point our SAPUI5 app at
it - replacing the mock server for good. This is the moment the app becomes a true
client of a real server. It involves three changes (a proxy, the data source, the
model) and one conceptual step up: from **OData V2** (the mock) to **OData V4** (CAP).

## Two servers, one origin: the proxy

In development you run **two** processes: the CAP backend on **port 4004** and the
SAPUI5 dev server (`ui5 serve`) on **port 8080**. The browser, for security, does not
let a page on 8080 freely call 4004. The clean fix is a **proxy**: the UI dev server
forwards backend requests to CAP, so to the browser everything looks like one origin.
We configure it in `ui5.yaml`:

```yaml
server:
    customMiddleware:
        - name: ui5-middleware-simpleproxy
          afterMiddleware: compression
          mountPath: /odata
          configuration:
              baseUri: "http://localhost:4004"
```

Any request to `/odata/...` from the app is forwarded to the CAP server. So in
development you run `cds watch` in one terminal and `ui5 serve` in another, and they
work together.

`ui5-middleware-simpleproxy` is a **community** package (open source, on npm), not part
of the UI5 tooling core, so it is listed in `package.json` as a dev dependency and named
in `ui5.yaml`. It is the common choice for this job; SAP's own `@sap/ux-ui5-tooling`
ships a similar `fiori-tools-proxy`. (Which proxy middleware exists is from the author's
knowledge - verify the current package and its options on npm before pinning a version.)

## Pointing the model at OData V4

In `manifest.json`, the data source now targets CAP's V4 endpoint, and the model
becomes an **OData V4 model**:

```json
"dataSources": {
    "mainService": { "uri": "/odata/v4/sales/", "type": "OData",
        "settings": { "odataVersion": "4.0" } }
},
"models": {
    "": { "dataSource": "mainService", "type": "sap.ui.model.odata.v4.ODataModel",
        "settings": { "operationMode": "Server", "autoExpandSelect": true, "groupId": "$auto" } }
}
```

And the **mock server is gone**: `Component.js` no longer starts it, and the
`localService` files are removed. We have a real backend now.

## V2 vs V4: what changes (and what does not)

OData V4 is the newer, leaner version of the protocol, and it is what all new SAP
development uses. The good news first: **your bindings barely change.** The list still
binds `{/SalesOrders}`; `{customer}`, `{amount}`, `{status}` all work. The binding
system shields you from most of the difference.

A few things do differ, and they are worth knowing:

- **The model class** is `sap.ui.model.odata.v4.ODataModel` (not `v2`). V4 has its own,
  more modern implementation.
- **Model settings** like `operationMode: "Server"` (do filtering/sorting on the
  server) and `autoExpandSelect: true` (let the model request exactly the fields a
  binding needs, via `$select`/`$expand`) are V4 conveniences that make it efficient.
  **`groupId: "$auto"`** tells the model to **batch** the requests a screen makes and
  send them automatically, together, in one `$batch` round trip - so opening a page does
  not fire five separate HTTP calls. (The alternative, `$direct`, sends each request on
  its own; `$auto` is the sensible default, and we return to request groups in Lesson
  16.)
- **Addressing one entity** uses the same key-predicate idea, written
  `/SalesOrders(orderId='SO-1004')`. (V4 has no `createKey`, so the detail builds that
  path directly - read `Detail.controller.js` to see it.)
- **Creating** data works differently in V4 (through a list binding, not
  `model.create`) - so our "Create" button is a placeholder for now, and we implement
  V4 create properly in the CRUD lesson.

The takeaway: **V4 is the modern default, and the binding layer keeps the transition
gentle** - you change the model and a couple of paths, not your whole app.

## Your coding task

In `webapp/manifest.json`, set the default model to the **OData V4 model** class so the
app talks to the CAP service.

## What the check verifies

- The data source targets the CAP **OData V4** endpoint.
- The default model is an **OData V4 model**.
- A **proxy** forwards requests to the CAP server (port 4004).
- The **mock server is no longer started**.

## Run it yourself

Two terminals:

```
cds watch                     # terminal 1: the CAP backend on :4004
npx ui5 serve --open index.html   # terminal 2: the app on :8080, proxied to CAP
```

The app loads its orders from your real CAP server over OData V4. Watch the network
tab: requests now go to `/odata/v4/sales/SalesOrders`, answered by CAP from SQLite.

> Because this stage spans two running processes and the OData V4 runtime, it is the
> one to verify live in the browser. The structural checks confirm the wiring; the
> proof is the app loading real data with both servers up.

---

### Where this came from

The CAP OData V4 endpoint and SQLite serving are grounded in the **SAP CAP docs**
(<https://cap.cloud.sap/>). The SAPUI5 side - `odata.v4.ODataModel`, its settings, V4
key predicates, and the proxy middleware - follows the SAPUI5 "OData V4" documentation
at <https://ui5.sap.com/> (from the author's knowledge; verify the running app in
the browser).
