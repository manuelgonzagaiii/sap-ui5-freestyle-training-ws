# Stage 4 - Optimization and cache busting

The build is fast; the last concern is making sure users actually *get* each new build.
Aggressive browser caching - which you *want* for speed - can leave users running a stale
version after you deploy. **Cache busting** solves it, and it closes the tooling lesson.

## The caching dilemma, and cache busting

Browsers cache static files hard, so a returning user does not re-download unchanged code -
great for speed. But after you deploy a fix, that same caching can serve the **old** file.
You need both: cache aggressively, *and* guarantee a new build is fetched fresh.

**Cache busting** does this by putting a **signature** (a hash or timestamp) into resource
URLs, so a new build produces new URLs the browser has never cached:

```yaml
builder:
  componentPreload:
    namespaces:
      - ui5/sales
  cachebuster:
    signatureType: time
```

- **`cachebuster`** - turns on signed resource URLs in the build.
- **`signatureType: time`** - sign with a build **timestamp** (`hash` signs with a content
  hash instead). Either way, a new build = new signature = new URLs, so users always load
  the latest, while unchanged builds stay fully cached.

## The build pipeline, all together

Step back at the whole `ui5 build` pipeline this lesson assembled:

- **Component-preload** - bundle modules into few files.
- **Minification** - shrink JS/XML/JSON.
- **Transpilation** - modern JS/TS down to compatible JavaScript.
- **Cache busting** - signed URLs so deploys take effect.
- (plus version replacement, and any custom tasks you add)

One command, `ui5 build`, runs them all and writes a `dist/` that is fast to load, broadly
compatible, and safe to deploy repeatedly. That `dist/` is what Lesson 30 actually ships.

## Your coding task

In `ui5.yaml`, set **how the cachebuster signs resources** (`signatureType: time`).

## What the check verifies (and where you are free)

- **Cache busting is configured** with a valid `signatureType` (`time` or `hash`).
- Which signature type you choose is **yours** - both are valid; an invalid value fails.

## End of Lesson 29

The app now has a real production pipeline: the UI5 Tooling configured in `ui5.yaml`, a
`ui5 build` that bundles a Component-preload, transpiles modern JS/TS, and cache-busts the
output. In **Lesson 30** - the last of the JavaScript track - we ship it: the Fiori
launchpad, the local sandbox, intent-based navigation, and the deployment options that put
the `dist/` you just built in front of users.

---

### Where this came from

`ui5 build` optimization, the `cachebuster` configuration (`signatureType`) and the build
pipeline follow the SAPUI5 "UI5 Tooling - Builder" and "Cache Buster" documentation at
<https://sap.github.io/ui5-tooling/> and <https://ui5.sap.com/>.
