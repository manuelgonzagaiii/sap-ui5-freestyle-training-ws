# Stage 1 - The Fiori launchpad, and registering the app

The app is built and tested. Now we deliver it - and SAP apps are almost never delivered
alone. They live in the **Fiori launchpad (FLP)**: the home screen of SAP, a shell of
**tiles** users click to open apps, with shared navigation, search and a consistent header.
This lesson ships our app into that world. It starts with how an app **registers** itself
with the launchpad.

## What the Fiori launchpad is

The **FLP** is the runtime shell that hosts Fiori apps. Instead of standalone URLs, users
see a **launchpad** of tiles grouped by role; clicking a tile launches the app *inside* the
shell, which provides the header, back navigation, user menu, and - crucially -
**navigation between apps**. Your app becomes one citizen of a larger workspace.

For an app to appear and be launchable, it must tell the launchpad **what it does**, using
an **intent**: a **semantic object** (the business thing) plus an **action** (what you do to
it). `SalesOrder-display` means "display a sales order". This intent is how tiles target the
app and how other apps navigate to it.

## Registering via `crossNavigation/inbounds`

You declare the app's intents in `manifest.json`, under `sap.app`:

```json
"sap.app": {
    ...
    "crossNavigation": {
        "inbounds": {
            "SalesOrder-display": {
                "semanticObject": "SalesOrder",
                "action": "display",
                "title": "{{appTitle}}",
                "signature": { "parameters": {}, "additionalParameters": "allowed" }
            }
        }
    }
}
```

- **`inbounds`** - the ways the app can be **entered** from the launchpad.
- **`semanticObject: "SalesOrder"`** - the **business object** this app deals with. Shared
  across SAP: any app or tile that wants "a sales order" uses this same semantic object.
- **`action: "display"`** - what the app does with it (`display`, `manage`, `create`...).
- **`signature`** - which URL parameters the inbound accepts (here, any additional
  parameters are allowed).

Together `semanticObject` + `action` form the **intent** (`SalesOrder-display`) that a tile
launches and that other apps navigate to (stage 2). This registration is the app's address
in the launchpad world.

## Your coding task

In `manifest.json`, set the **business object this app handles** (`semanticObject: "SalesOrder"`)
in the launchpad inbound.

## What the check verifies (and where you are free)

- The app declares a **launchpad inbound** with a **semantic object** and an **action**.
- The exact semantic object and action names are **yours** (within your app's domain) -
  any valid intent passes; the check requires that the app registers one.

## Run it yourself

This stage adds the registration; stage 4 runs the app in a local launchpad sandbox where
you will see the tile this intent produces. The inbound is what makes the app launchable as
`#SalesOrder-display`.

---

### Where this came from

The Fiori launchpad, intents (semantic object + action), and `crossNavigation/inbounds` in
the descriptor follow the SAPUI5 "Descriptor for Applications - crossNavigation" and "Fiori
Launchpad" documentation at <https://ui5.sap.com/>. The semantic object is this app's own.
