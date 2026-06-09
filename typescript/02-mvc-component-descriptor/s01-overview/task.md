# Component & App Descriptor (MVC)

> **Track:** TypeScript  ·  **Phase A · Foundations**
> **Status:** Skeleton — stages to be populated.

This is a **guided-project (framework) lesson**: your app code carries forward
from one stage to the next, and from the previous lesson into this one. This
overview page is the roadmap for the lesson; each numbered item below will
become a hands-on stage.

## What you'll learn
- The MVC pattern in UI5 and why apps are packaged as Components
- Component.js (UIComponent) and the ComponentContainer
- manifest.json — the app descriptor (sap.app / sap.ui / sap.ui5)
- Declaring models, rootView, dependencies and resourceRoots in the descriptor

## Planned stages
1. Create Component.js extending sap.ui.core.UIComponent with manifest:'json'
2. Author manifest.json: sap.app id/type, sap.ui5 rootView + dependencies
3. Boot the Component via ComponentSupport in index.html
4. Register the i18n + a JSONModel declaratively in manifest 'models'
5. Add minUI5Version, dependencies.libs and handleValidation

## SAPUI5 features covered
- `sap.ui.core.UIComponent`
- `ComponentContainer`
- `manifest.json descriptor`
- `manifest models`

## Backend for this lesson
**none**

---
<div class="hint">
This lesson is part of the <b>Sales Order Management</b> guided project. By the
end of the course your app supports Products, Sales Orders and Customers with a
Fiori-style UX, real OData V4 (via open-source SAP CAP + SQLite), tests and a
production build — using nothing a trainee cannot run locally for free.
</div>
