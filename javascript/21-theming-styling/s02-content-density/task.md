# Stage 2 - Content density: compact for the mouse, cozy for the thumb

The same table that feels right on a touchscreen feels *wasteful* on a desktop, where a
mouse can hit smaller targets and you want more rows on screen. UI5 solves this with
**content density** - two sizing modes the whole app can switch between. This stage
detects the device and applies the right one.

## Cozy vs Compact

UI5 ships two density modes, applied as CSS classes on a container:

- **`sapUiSizeCozy`** - larger controls, more padding, bigger touch targets. Right for
  **touch** devices (phones, tablets).
- **`sapUiSizeCompact`** - tighter spacing, smaller rows, more data per screen. Right
  for **mouse-and-keyboard** desktops.

The class is set on a parent element (here the root view) and **inherited** by every
control inside it - so one decision restyles the whole app's density. The descriptor
already advertises that the app supports both:

```json
"contentDensities": { "compact": true, "cozy": true }
```

## Choosing at runtime, from the device

Best practice is to pick the density from the device's capabilities. We add a helper to
the **Component** (the natural home for app-wide decisions), using `sap/ui/Device`:

```js
getContentDensityClass() {
    if (this._sContentDensityClass === undefined) {
        this._sContentDensityClass = Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact";
    }
    return this._sContentDensityClass;
}
```

- **`Device.support.touch`** - true on touch devices. Touch gets `Cozy`; everything else
  gets `Compact`.
- We **cache** the result in `_sContentDensityClass` so it is computed once.

Then the **App controller** applies it to the root view in `onInit`:

```js
this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
```

`addStyleClass` puts the class on the view's root element; every control beneath
inherits the density. The mental model: **density is one class, set high in the tree,
inherited by all** - which is exactly why you decide it once, at the top.

## Your coding task

In `App.controller.js`, in `onInit`, **apply the density class to the root view**
(`addStyleClass(getContentDensityClass())`). The Component already computes which class.

## What the check verifies

- The Component computes a **density class** (`sapUiSizeCompact` or `sapUiSizeCozy`).
- The root view **applies** that class.
- The descriptor declares **both** content densities.

## Run it yourself

On a desktop the app renders compact (tighter rows, more orders visible); in a
touch-device emulation it renders cozy (roomier). Same app, density matched to the
input device.

---

### Where this came from

Content density (`sapUiSizeCompact`/`sapUiSizeCozy`), `contentDensities` in the
descriptor, the `Device.support.touch` check and `addStyleClass` follow the SAPUI5
"Content Densities" and "Device API" documentation at <https://ui5.sap.com/>.
