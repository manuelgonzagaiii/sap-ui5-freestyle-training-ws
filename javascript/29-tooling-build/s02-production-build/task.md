# Stage 2 - Building for production: Component-preload

`ui5 serve` is for development - many small files, readable, live-reloading. Shipping that
to users would mean **hundreds of HTTP requests** on every load. `ui5 build` solves this:
it produces an optimized `dist/` folder, and its centrepiece is the **Component-preload** -
your whole app bundled into a few files. This stage configures it.

## What `ui5 build` produces

Running `ui5 build` creates a `dist/` directory containing a production-ready app:

- **`Component-preload.js`** - **all your modules** (views, controllers, fragments, i18n,
  the manifest) concatenated into **one file**. Instead of the browser fetching 40 files,
  it fetches one. This is the single biggest startup win a build provides.
- **minified** JavaScript, XML and JSON - smaller payloads.
- **version-replaced** resources and a clean, deployable tree.

## Configuring the preload

The build is driven by a **`builder`** section in `ui5.yaml`:

```yaml
builder:
  componentPreload:
    namespaces:
      - ui5/sales
```

- **`builder`** - the build-time configuration block (sibling of `server`).
- **`componentPreload/namespaces`** - which namespace(s) to bundle. `ui5/sales` is our app
  (the slash form of `ui5.sales`), so the build packs every module under it into
  `Component-preload.js`.

The mental model: **development serves many small files for editability; the build packs
them into few for speed.** Same app, two shapes, one command between them - and the
manifest's `flexEnabled`, async flags and lazy libraries all still apply, now on top of a
bundled baseline.

## Your coding task

In `ui5.yaml`, set the **app namespace to bundle** into the Component-preload (`ui5/sales`).

## What the check verifies (and where you are free)

- The **builder bundles a Component-preload** with a namespace.
- The namespace must be your app's; the check requires that a preload is configured.

## Run it yourself

Run `ui5 build` and look in `dist/`: where `webapp/` had dozens of files, `dist/` has a
`Component-preload.js` containing them all, minified. Serve `dist/` and the app loads in a
handful of requests instead of dozens.

---

### Where this came from

`ui5 build`, the `builder` configuration, `componentPreload` and the `dist/` output follow
the SAPUI5 "UI5 Tooling - Builder" documentation at <https://sap.github.io/ui5-tooling/>
and <https://ui5.sap.com/>.
