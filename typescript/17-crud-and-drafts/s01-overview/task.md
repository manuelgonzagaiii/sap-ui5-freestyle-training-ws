# CRUD & Draft Handling

> **Track:** TypeScript  ·  **Phase D · Data & Backend**
> **Status:** Skeleton — stages to be populated.

This is a **guided-project (framework) lesson**: your app code carries forward
from one stage to the next, and from the previous lesson into this one. This
overview page is the roadmap for the lesson; each numbered item below will
become a hands-on stage.

## What you'll learn
- Create/update/delete with the V4 model and transient contexts
- Draft handling (CAP @odata.draft.enabled) and the draft lifecycle
- Side effects (requestSideEffects) and optimistic UI
- Concurrency, ETags and error handling

## Planned stages
1. Create a new order via bindList.create() (transient context)
2. Edit a draft and persist with draft activation
3. Delete with context.delete() and refresh
4. Request side effects after a field change
5. Handle messages + ETag conflicts gracefully

## SAPUI5 features covered
- `transient contexts`
- `draft lifecycle`
- `requestSideEffects`
- `ETag / messages`

## Backend for this lesson
**SAP CAP + SQLite (OData V4)**

---
<div class="hint">
This lesson is part of the <b>Sales Order Management</b> guided project. By the
end of the course your app supports Products, Sales Orders and Customers with a
Fiori-style UX, real OData V4 (via open-source SAP CAP + SQLite), tests and a
production build — using nothing a trainee cannot run locally for free.
</div>
