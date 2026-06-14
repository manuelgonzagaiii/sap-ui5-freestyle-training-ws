# Stage 4 - Micro charts, and the end of Phase E

Numbers in a table tell you the data; a small chart tells you the *shape* of it at a
glance. UI5's **micro charts** (`sap.suite.ui.microchart`) are tiny, embeddable charts
designed to sit inside headers, cards and tiles - a sparkline-sized visual, not a full
dashboard chart. We add one to the orders header to finish the app and Phase E.

## Micro charts

The micro chart family includes a radial gauge, a comparison bar set, a line, a bullet and
more - each compact enough to live beside a KPI. We use the **`RadialMicroChart`**, a
percentage ring:

```xml
<mvc:View ... xmlns:microchart="sap.suite.ui.microchart" ...>
    ...
    <microchart:RadialMicroChart size="S" percentage="{ui>/kpi/completionRate}" />
```

- **`RadialMicroChart`** - draws a ring filled to a percentage, with the number in the
  middle - perfect for "61% complete".
- **`percentage="{ui>/kpi/completionRate}"`** - **bound** to a value in our `ui` model, so
  the ring reflects live data and updates when it changes. Same binding you have used all
  along, now driving a visual instead of text.
- We declare the **`sap.suite.ui.microchart`** library in the descriptor first - the
  dependency discipline from Lesson 2, one last time.

For full, interactive charts (axes, tooltips, legends, drill-down) UI5 has the heavier
**`sap.viz`** / VizFrame and chart-container controls; for a quick at-a-glance figure in a
header or card, a micro chart is the right, lightweight tool. Choosing the lighter control
when it suffices is the judgement to take away.

## Your coding task

In `List.view.xml`, **bind the radial micro chart to the completion rate**
(`{ui>/kpi/completionRate}`).

## What the check verifies (and where you are free)

- The **micro chart library is declared**.
- A **micro chart is shown, bound to data**.
- Which chart and which value you bind are **yours** - any micro chart bound to a model
  value passes.

## Run it yourself

The orders header now shows a completion ring beside the KPI tiles, filled to the bound
rate. Change `completionRate` in the model and the ring follows - a live, glanceable visual
in a few lines.

## End of Lesson 26 - and the end of Phase E

Look back at what Phase E added to a working business app: your own **custom control** with
a renderer and events; full **theming** - switchable, density-aware, custom-CSS'd, and
read from JavaScript; user-and-admin **flexibility** with RTA, variants and
personalization; manifest-driven **integration cards** fed from the service; a bridge to
standards-based **web components**; thorough **accessibility**; and the power-user finish -
**drag and drop, uploads, a wizard, and charts.** These are the advanced, rarely-taught
corners that turn a competent UI5 developer into the one the team asks.

**Phase F** closes the course with what makes all of this production-grade: **performance
and async best practices, testing (QUnit, OPA5, wdi5), the build pipeline, and deployment**
to the Fiori launchpad. The app is feature-complete; next we make it fast, tested, built
and shipped.

---

### Where this came from

`sap.suite.ui.microchart` (`RadialMicroChart` and the micro chart family), the
`sap.viz`/VizFrame alternative for full charts, and binding chart values follow the SAPUI5
"Micro Charts" and "sap.viz" documentation and API Reference at <https://ui5.sap.com/>.
The completion rate is this course's own sample value.
