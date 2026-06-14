# Stage 2 - Lazy loading: don't pay for what you don't use yet

Async loading makes the *necessary* files load fast and in parallel. The next lever is
loading **less** up front: defer the heavy things the user may never touch until the moment
they do. This is **lazy loading**, and UI5 gives you a one-word switch for libraries.

## The cost of eager dependencies

Our app declares several libraries, and some are heavyweight. `sap.ui.rta` (runtime
adaptation, Lesson 22) is large - but **most users never open the adaptation editor**.
Loading it during startup makes *everyone* pay, on every visit, for a feature *few* use.
That is exactly the kind of waste that adds up to a slow first load.

## `lazy: true`

Mark such a library lazy in the descriptor:

```json
"dependencies": {
    "libs": {
        "sap.m": {},
        "sap.ui.rta": { "lazy": true }
    }
}
```

- **`"lazy": true`** - the library is **registered but not loaded at startup**. UI5 loads
  it the first time something actually needs it (when the user clicks "Adapt UI"). The
  startup payload shrinks; the feature still works, just loaded on demand.

The judgement: **make heavy, rarely-used libraries lazy; keep the core, always-used ones
eager.** `sap.m` (every screen uses it) stays eager - lazy-loading it would just delay the
first render. `sap.ui.rta`, `sap.ui.integration`, charting - candidates for lazy, because
they serve specific, occasional features.

The same principle runs through UI5: **fragments load on first use** (our dialogs, via
`loadFragment` - Lesson 10), **route targets load on navigation** (stage 1), and a
production **build** bundles a `Component-preload` so even the eager modules arrive in one
request instead of many. Lazy where possible, bundled where eager - that is the recipe.

## Your coding task

In `manifest.json`, mark a **heavy, rarely-used library as lazy** (`"lazy": true`) so it
loads only when needed.

## What the check verifies (and where you are free)

- At least one **heavy library is declared lazy**.
- *Which* library you make lazy is your judgement - the check requires only that you defer
  something. (Making `sap.m` lazy would be a poor choice, but the *technique* is what is
  graded here; choosing well is the skill to practise.)

## Run it yourself

Reload with the network tab on: the lazy library is **not** among the startup requests.
Click "Adapt UI" and watch it load **then** - on demand, paid for only by the user who
uses it.

---

### Where this came from

The `lazy` library flag, lazy fragment/route loading and `Component-preload` bundling
follow the SAPUI5 "Performance" and "Descriptor for Applications" documentation at
<https://ui5.sap.com/>. Which libraries are heavy is from the author's knowledge - verify
the load impact in the network tab.
