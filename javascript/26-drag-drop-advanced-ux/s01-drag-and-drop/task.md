# Stage 1 - Drag and drop

Phase E ends with the flourishes that make an app feel like a *power tool* - the
interactions users reach for without thinking. First, **drag and drop**: UI5 makes it
declarative, so you describe *what can be dragged* and *where it can be dropped*, and the
framework handles the pointer choreography. We make the orders list rows draggable.

## Declarative drag and drop

You do not write `mousedown`/`mousemove` handlers. You add two config objects to a
control's `dragDropConfig` aggregation:

```xml
<Table id="ordersTable" ... >
    <dragDropConfig>
        <dnd:DragInfo sourceAggregation="items" />
        <dnd:DropInfo targetAggregation="items" dropPosition="Between" drop=".onDropOrder" />
    </dragDropConfig>
```

- **`DragInfo`** - declares what is draggable. `sourceAggregation="items"` means "the rows
  of this table can be dragged".
- **`DropInfo`** - declares where things can be dropped and what happens. `targetAggregation="items"`
  accepts a drop onto the rows; `dropPosition="Between"` means you drop *between* rows (to
  reorder, not onto a row); and **`drop=".onDropOrder"`** names the handler that runs when
  a drop completes.

UI5 draws the drag ghost, the drop indicator line, and fires the event. Your handler just
reacts:

```js
onDropOrder(oEvent) {
    const oDragged = oEvent.getParameter("draggedControl");
    const oDropped = oEvent.getParameter("droppedControl");
    // reorder using the dragged and dropped rows' contexts
}
```

The handler receives the **dragged** and **dropped** controls; from their binding contexts
you know which orders they are. (Persisting a new order *permanently* needs a sequence
field on the entity to sort by - our service has none, so here we acknowledge the move;
the lesson is the declarative dnd wiring, which is identical whether you reorder in memory
or save a sort order. This persistence note is worth verifying against your data model.)

## Your coding task

In `List.view.xml`, wire the `DropInfo` so a dropped row **calls `onDropOrder`**
(`drop=".onDropOrder"`). The handler is implemented for you.

## What the check verifies

- The table declares **drag and drop info** (`DragInfo` + `DropInfo`).
- A **drop handler is wired** and implemented.

## Run it yourself

Run the app and drag an order row up or down: UI5 shows a drop line between rows, and on
release `onDropOrder` reports the move. Declarative drag and drop, with no pointer code.

---

### Where this came from

`sap.ui.core.dnd.DragInfo` / `DropInfo`, the `dragDropConfig` aggregation and the `drop`
event follow the SAPUI5 "Drag and Drop" documentation and API Reference at
<https://ui5.sap.com/>. Persisting a reorder depends on the data model - verify against
your service.
