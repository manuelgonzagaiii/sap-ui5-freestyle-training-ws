# Getting Started

> **Track:** TypeScript  ·  **Phase A · Foundations**
> **Status:** Skeleton — stages to be populated.

This is a **guided-project (framework) lesson**: your app code carries forward
from one stage to the next, and from the previous lesson into this one. This
overview page is the roadmap for the lesson; each numbered item below will
become a hands-on stage.

## What you'll learn
- What SAPUI5 is and how the runtime bootstraps in the browser
- UI5 Tooling project layout (ui5.yaml, webapp/, package.json)
- The bootstrap script: data-sap-ui config, async, resourceroots, theme
- Render your first sap.m control via declarative ComponentSupport / placeAt

## Planned stages
1. Initialise a UI5 Tooling app (ui5 init, ui5.yaml, webapp/index.html)
2. Configure the bootstrap (libs, theme=sap_horizon, compatVersion, async)
3. Place a sap.m.Text / Button programmatically with placeAt('content')
4. Switch to declarative bootstrap with data-sap-ui-oninit + ComponentSupport
5. Run with `ui5 serve` and inspect the UI5 Diagnostics (Ctrl+Shift+Alt+S)

## SAPUI5 features covered
- `sap.ui.core bootstrap`
- `sap.m.Text/Button/Page/App`
- `UI5 Tooling (ui5 serve)`
- `Horizon theme`

## Backend for this lesson
**none**

---
<div class="hint">
This lesson is part of the <b>Sales Order Management</b> guided project. By the
end of the course your app supports Products, Sales Orders and Customers with a
Fiori-style UX, real OData V4 (via open-source SAP CAP + SQLite), tests and a
production build — using nothing a trainee cannot run locally for free.
</div>
