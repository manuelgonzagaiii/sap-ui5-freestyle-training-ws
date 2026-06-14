# Stage 3 - Where the built app goes: deployment targets

`ui5 build` produced a `dist/` (Lesson 29). Deployment is getting that `dist/` onto a server
users reach. There are several targets, and the right one depends on your landscape -
understanding the options, and that **the free path needs no SAP system at all**, is this
stage.

## The deployment targets

- **Static hosting (the free path).** `dist/` is **plain static files** - HTML, JS, JSON.
  Any web server serves them: nginx, Apache, GitHub Pages, an S3 bucket, a Node static
  server. **No SAP system required.** This is the open-source-friendly option, and the one
  that fits this course's "nothing you cannot have" rule - build, copy `dist/` to a static
  host, done. (The OData backend still needs hosting too - your CAP service - but the UI is
  just static files.)
- **ABAP repository (on-prem / S/4HANA).** Deploy into an ABAP system's BSP repository, where
  the launchpad serves it. Done with SAP's **`@sap/ux-ui5-tooling`** deploy task, configured
  by a **`ui5-deploy.yaml`**:

```yaml
builder:
  customTasks:
    - name: deploy-to-abap
      configuration:
        target: { url: https://my-abap-system.example.com:44300, client: "100" }
        app:    { name: ZUI5_SALES, package: ZSALES_PKG, transport: NPLK900000 }
```

- **`target`** - the ABAP system and client.
- **`app`** - the **BSP application name**, package and transport request the app deploys
  into.

- **Cloud Foundry / SAP BTP.** Bundle the app (and an approuter, and the CAP service) as an
  **MTA** (multi-target application, `mta.yaml`) and deploy to BTP Cloud Foundry. This is
  the cloud counterpart, common for CAP-backed apps.

## The judgement

**Match the target to the landscape:** an on-prem S/4 shop deploys to the ABAP repository; a
BTP project ships an MTA to Cloud Foundry; a demo, a POC, or this course hosts the static
`dist/` anywhere. The UI is the same `dist/` in every case - only the *hosting* differs.

(The ABAP and BTP targets need a real system and credentials, which this course
deliberately does not require - so treat `ui5-deploy.yaml` here as the **shape** of an ABAP
deployment to recognise, and use static hosting to actually run it. The deploy-task
configuration is version-sensitive - verify `@sap/ux-ui5-tooling` and `ui5-deploy.yaml`
against its docs before deploying for real.)

## Your coding task

In `ui5-deploy.yaml`, set the **deployment application name** (the BSP app name,
`ZUI5_SALES`).

## What the check verifies (and where you are free)

- A **deployment descriptor with a target and app** is present.
- The app name, target url, package and transport are **yours** - they depend on your
  system; any valid descriptor passes. (Without a real system you cannot run this deploy -
  the free path is static hosting of `dist/`.)

## Run it yourself

The real, runnable delivery in this course is **static**: `ui5 build`, then serve `dist/`
from any static server (or the launchpad sandbox in stage 4). The `ui5-deploy.yaml` is the
ABAP option, ready for when you have a system to deploy to.

---

### Where this came from

The deployment targets (static hosting, ABAP repository via `@sap/ux-ui5-tooling` /
`ui5-deploy.yaml`, Cloud Foundry/BTP via MTA) follow the SAPUI5 and SAP Fiori tools
"Deployment" documentation at <https://ui5.sap.com/>. The deploy configuration is
system-specific and from the author's knowledge - verify before deploying.
