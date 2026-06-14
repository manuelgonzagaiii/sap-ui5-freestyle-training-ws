# Stage 2 - Runtime Adaptation: editing the UI inside the running app

Flexibility is armed. Now we give a **key user** the tool to use it: **Runtime
Adaptation (RTA)** - an editor that opens *on top of the live app*, where they can
rearrange, rename, hide and add fields by direct manipulation, and the changes are saved
as flexibility changes for everyone in their scope. No development environment, no
redeploy - the app adapts itself. This stage launches RTA from a button.

## What RTA is

**RTA** (`sap.ui.rta`) overlays the running app with an editing layer. In adaptation
mode the key user can:

- **hide or reveal** fields and sections,
- **reorder** them by drag and drop,
- **rename** labels,
- **add** fields that exist in the data but were not on screen,
- **combine** or split controls, depending on the control.

When they save, RTA writes the result as **KEY USER layer** flexibility changes (stage
1's layer system). Every user in that scope then sees the adapted layout, applied at load
by `sap.ui.fl` - while your source code stays exactly as you wrote it.

This is how large SAP customers tailor standard apps to their processes without forking
the code. It is also why stable IDs (stage 1) matter so much: RTA records each change
against a control id.

## Launching RTA

We add the `sap.ui.rta` and `sap.ui.fl` libraries to the descriptor, then start the
editor from a controller, pointing it at the app's **root control**:

```js
startKeyUserAdaptation({
    rootControl: this.getOwnerComponent().getRootControl()
});
```

- **`startKeyUserAdaptation`** (from `sap/ui/rta/api/startKeyUserAdaptation`) - opens the
  adaptation editor.
- **`rootControl`** - the top of the control tree RTA may edit; the component's root
  control covers the whole app.

We wire it to a wrench button in the toolbar. In a real deployment, access to this is
restricted to users with a key-user role - you would not show the button to everyone.

## Your coding task

In `List.controller.js`, complete `onStartAdaptation` so it **starts key-user adaptation
on the app's root control**.

## What the check verifies

- The **`sap.ui.rta`** library is declared.
- The controller **starts runtime adaptation** (`startKeyUserAdaptation`).
- A control **launches** it.

## Run it yourself

Run the app and click the wrench. The app enters adaptation mode: hover a field and a
blue overlay appears; right-click for options like Hide or Rename; drag to reorder. Make
a change and save, then leave adaptation mode - your change persists across reloads,
stored as a flexibility change, with no code edited.

---

### Where this came from

`sap.ui.rta`, `sap/ui/rta/api/startKeyUserAdaptation` and the key-user adaptation concept
follow the SAPUI5 "Runtime Adaptation" / "Adaptation Project" / "Flexibility" documentation
at <https://ui5.sap.com/>. The exact RTA API entry point is version-sensitive and from the
author's knowledge - **verify `startKeyUserAdaptation` (vs older `RuntimeAuthoring`) against
the API Reference for your UI5 version** before relying on it.
