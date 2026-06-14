# Stage 1 - The UI5 Tooling, and ui5.yaml

You have typed `ui5 serve` and `ui5 build` since Lesson 1 without looking closely at what
runs them. That is the **UI5 Tooling** - the official, open-source build and development
toolchain - and its control file is **`ui5.yaml`**. Phase F's delivery story starts here:
understanding the tooling that serves, builds and ships your app.

## What the UI5 Tooling does

The **UI5 Tooling** (the `@ui5/cli`, the `ui5` command) is a Node.js toolchain that:

- **serves** the app in development (`ui5 serve`) - a dev server that resolves UI5 from the
  framework, applies middleware, and live-reloads;
- **builds** it for production (`ui5 build`) - bundling, minifying and optimizing into a
  `dist/` folder ready to deploy;
- is **extensible** - custom **middleware** (dev-time) and **tasks** (build-time) plug into
  it, which is how the proxy to CAP (Lesson 15) and the build steps in the next stages
  attach.

It is **open source** and framework-version-agnostic - the same tooling serves OpenUI5 and
SAPUI5. This is the toolchain that makes a freestyle app buildable without SAP's IDEs - the
point the welcome page made about doing it yourself.

## ui5.yaml: the project descriptor for the tooling

Where `manifest.json` describes the app to *UI5 at runtime*, **`ui5.yaml`** describes the
project to *the tooling at build/serve time*:

```yaml
specVersion: "4.0"
metadata:
  name: "ui5.sales"
type: application
framework:
  name: OpenUI5
  version: "1.148.0"
  libraries:
    - name: sap.m
    - name: sap.ui.core
    ...
server:
  customMiddleware:
    - name: ui5-middleware-simpleproxy
      ...
```

- **`specVersion`** - the ui5.yaml format version.
- **`type: application`** - this project is an app (vs `library`).
- **`framework`** - which UI5 **distribution** (`OpenUI5`) and **version** (`1.148.0`, our
  pin from Lesson 1) the tooling downloads, and the **libraries** it must fetch. This list
  must include every library the app uses - notice it now lists the Phase E additions
  (`sap.ui.fl`, `sap.ui.rta`, `sap.ui.integration`, `sap.suite.ui.microchart`); if a library
  the app loads is missing here, the tooling cannot resolve it and the app breaks.
- **`server/customMiddleware`** - dev-server plugins (our CAP proxy).

## Your coding task

In `ui5.yaml`, set the **pinned OpenUI5 version** the tooling should use (`1.148.0`).

## What the check verifies (and where you are free)

- The project is an **application on OpenUI5**.
- The **framework version is a valid version** - an invalid version string fails (the rule
  of law from Lesson 1), but you are free to pin a different *valid* version.
- The **libraries the app uses are declared** for the tooling.

## Run it yourself

`ui5 serve` reads this file to resolve OpenUI5 1.148.0 and its libraries, apply the proxy
middleware, and serve the app. Change the version to an invalid string and the tooling
errors immediately - the descriptor is the tooling's contract.

---

### Where this came from

The UI5 Tooling (`@ui5/cli`, `ui5 serve`/`ui5 build`), `ui5.yaml` (`specVersion`, `type`,
`framework`, `server`) and the library-resolution requirement follow the SAPUI5 "UI5
Tooling" documentation at <https://sap.github.io/ui5-tooling/> and <https://ui5.sap.com/>.
