# Curriculum Roadmap

One guided project — **Sales Order Management** — built lesson by lesson. Every
lesson is a framework lesson (code carries forward). The list below is the
contract for what we populate, section by section. Both the `javascript/` and
`typescript/` tracks follow the same sequence; the TS track adds a setup
prologue.

## Phase A · Foundations
1. **Getting Started** — UI5 Tooling, bootstrap, first control
2. **Component & App Descriptor (MVC)** — `Component.js`, `manifest.json`
3. **Views & Controllers** — XML/JS/JSON/HTML/Typed views, lifecycle
4. **Controls & Libraries** — control metadata, `sap.m`, app scaffolding

## Phase B · UI Composition
5. **Layouts & Responsiveness** — Flex, Grid, Splitter, cssgrid, Device
6. **Data Binding & Models** — `JSONModel`, binding types & modes, Sorter/Filter
7. **Formatters, Types & Expression Binding** — formatters, composite, custom types
8. **Internationalisation & Formatting** — `ResourceModel`, Date/Number/Currency, RTL
9. **Routing & Navigation** — routes/targets/patterns, params, History

## Phase C · Interaction
10. **Fragments & UI Reuse** — `Fragment` factory, id scoping, BlockLayout
11. **Dialogs, Popovers & Messaging** — Dialog/Popover, MessageManager/Popover
12. **Fiori Layouts** — FlexibleColumnLayout, DynamicPage, ObjectPageLayout
13. **Forms, Input & Validation** — SimpleForm, model types + constraints, valueState

## Phase D · Data & Backend
14. **Mock Server & OData V2** — `MockServer`, `odata.v2.ODataModel`, `$batch`
15. **Open-Source Backend with SAP CAP** — CDS model, OData V4, SQLite, drafts
16. **OData V4 Binding** — `odata.v4.ODataModel`, context/list binding, operations
17. **CRUD & Draft Handling** — transient contexts, draft lifecycle, side effects
18. **Tables, Filtering, Sorting & Grouping** — m/ui table, ViewSettings, export
19. **Value Help & Smart Controls** — ValueHelpDialog, SmartField/Table/FilterBar

## Phase E · Advanced & Rare
20. **Custom Controls & Extensibility** — `Control`+Renderer, EventBus, reuse
21. **Theming & Styling** — Theming Parameters, Horizon, density, custom CSS
22. **Flexibility, Adaptation & Variants** — `sap.ui.fl`, RTA, VariantManagement, p13n
23. **Integration Cards** — `sap.ui.integration` cards, host actions
24. **UI5 Web Components Interop** — `@ui5/webcomponents` in a freestyle app
25. **Accessibility (a11y)** — ARIA, F6 fast nav, high-contrast
26. **Drag & Drop, Uploads, Wizards & Charts** — dnd, UploadSet, Wizard, micro charts / viz

## Phase F · Quality & Delivery
27. **Performance & Best Practices** — async, asyncHints, preload, Support Assistant
28. **Testing: QUnit, OPA5 & wdi5** — unit, integration, Test Recorder, e2e, coverage
29. **UI5 Tooling & Build** — middleware/tasks, transpile, linting, production build
30. **Fiori Launchpad & Delivery** — FLP sandbox, tiles, cross-app nav, hosting

## TypeScript prologue
- **00 · TypeScript Setup & Tooling** — `@sapui5/types`, `ui5-tooling-transpile`,
  typed controllers, `@ui5/ts-interface-generator`

---

### Feature coverage map (high level)
- **Core/MVC:** bootstrap, Component, descriptor, views (all types), controllers, fragments
- **Binding:** JSON/OData V2/OData V4, all binding types & modes, formatters, types, i18n
- **UI:** `sap.m`, `sap.ui.layout`, `sap.f`, `sap.uxap`, `sap.ui.table`, `sap.ui.comp`, `sap.ui.integration`
- **UX:** Fiori FCL/DynamicPage/ObjectPage, theming, density, a11y, dnd, uploads, wizard, charts
- **Data/Backend:** mock server, SAP CAP (OData V4), CRUD, drafts, batch, value help, annotations
- **Advanced:** custom controls, flexibility/RTA, variants/p13n, web components, EventBus
- **Quality:** QUnit, OPA5, wdi5, Support Assistant, linting, UI5 Tooling build, FLP delivery
