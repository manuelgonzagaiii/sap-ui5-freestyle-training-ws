# Mock Server & OData V2

> **Track:** JavaScript  ·  **Phase D · Data & Backend**
> **Status:** Skeleton — stages to be populated.

This is a **guided-project (framework) lesson**: your app code carries forward
from one stage to the next, and from the previous lesson into this one. This
overview page is the roadmap for the lesson; each numbered item below will
become a hands-on stage.

## What you'll learn
- The UI5 mock server: metadata.xml + mockdata, no backend process
- sap.ui.model.odata.v2.ODataModel and metadata-driven binding
- CRUD over OData V2, deferred groups and $batch
- Filtering, sorting, paging and URL parameters

## Planned stages
1. Add metadata.xml and JSON mockdata for Products/Orders/Customers
2. Start the mock server in a localService module and wire the V2 model
3. Bind a growing table to an entity set
4. Perform create/update/remove with deferred groups + submitChanges
5. Add server-side $filter/$orderby/$skip/$top

## SAPUI5 features covered
- `sap.ui.core.util.MockServer`
- `odata.v2.ODataModel`
- `$batch / deferred groups`
- `OData filtering`

## Backend for this lesson
**UI5 mock server (OData V2)**

---
<div class="hint">
This lesson is part of the <b>Sales Order Management</b> guided project. By the
end of the course your app supports Products, Sales Orders and Customers with a
Fiori-style UX, real OData V4 (via open-source SAP CAP + SQLite), tests and a
production build — using nothing a trainee cannot run locally for free.
</div>
