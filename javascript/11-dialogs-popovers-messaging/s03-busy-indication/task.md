# Stage 3 - Busy indication

When an app does something that takes a moment - loading data, saving to a server -
the worst thing it can do is *look frozen*. The user does not know if it is working
or broken, so they click again, or give up. The fix is to **show that the app is
busy**. UI5 makes this almost free with the **busy indicator**, and using it well is
a small thing that makes an app feel solid. We add a "Reload" action that shows busy
state while it works.

## Why busy indication matters

A wait with no feedback is a wait that feels broken. A spinner says "I heard you,
I'm working, hold on." That tiny reassurance is the difference between an app that
feels responsive and one that feels dead. Any operation the user might out-wait -
anything that is not instant - deserves a busy indicator.

## `setBusy`: the easy way

Almost every UI5 control has a **`setBusy`** method. Set it `true` and the control
shows an animated overlay and blocks interaction; set it `false` to clear it. You
can make a single control busy (just a table while it loads) or a whole view:

```js
onReload() {
    const oView = this.getView();
    oView.setBusy(true);                                  // show the spinner
    setTimeout(() => oView.setBusy(false), 1000);         // ... and clear it when done
}
```

Here we make the **whole detail view** busy for a simulated one-second reload. In a
real app you would set busy `true` before the server call and `false` in its
response handler - the principle is identical: **busy on before the wait, busy off
when it finishes.** Choosing the *scope* is a design call: blank the whole page for a
full reload, or just the one list while it refreshes, so the rest stays usable.

## The busy family

`setBusy` is the everyday tool, but know its relatives:

- **`setBusy(true)`** on any control - the standard, scoped spinner.
- **`busyIndicatorDelay`** - a property that waits a moment before showing the
  spinner, so fast operations do not flash one annoyingly. A nice touch for snappy
  apps.
- **`sap.m.BusyDialog`** - a full modal spinner with a message, for a global "please
  wait" that should block the entire app (a long save, say).

The mental model: **busy = "this part of the screen is working."** Scope it to what
is actually waiting, and always pair the `true` with a `false` so it cannot get
stuck on. A spinner that never clears is its own kind of broken.

## Your coding task

In `Detail.controller.js`, complete `onReload` so it **shows the busy indicator**
while the (simulated) reload runs. (The code to clear it afterwards is already there.)

## What the check verifies

- The detail has a **Reload** action.
- Reload **shows the busy indicator** (`setBusy(true)`)...
- ...and **clears it afterwards** (`setBusy(false)`).

## Run it yourself

```
npx ui5 serve --open index.html
```

Open an order and press "Reload" - the detail shows a spinner for a second, then
returns. The app clearly communicated "working" instead of just appearing to hang.

---

### Where this came from

`setBusy`, `busyIndicatorDelay` and `sap.m.BusyDialog` are documented in the SAPUI5
API Reference at <https://ui5.sap.com/>. The simulated reload is this course's own.
