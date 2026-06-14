# Stage 4 - Reuse and decoupling with the EventBus

The PriorityIndicator fires a `press` event, and the List controller hears it. But what
if a *different* part of the app - a header, a logger, the detail page - also needs to
know? Wiring every interested party directly to the source gets tangled fast. UI5's
answer is the **EventBus**: a built-in, app-wide publish/subscribe channel that lets
components talk **without knowing about each other**. This closing stage uses it, and
steps back to the broader theme of **reuse**.

## The EventBus: publish/subscribe across the app

Every Component owns one EventBus. A publisher announces that something happened; any
number of subscribers react - and neither holds a reference to the other:

```js
// publisher (List controller) - "a priority was pressed"
this.getOwnerComponent().getEventBus()
    .publish("orders", "priorityPressed", { value: "High" });

// subscriber (App controller, in onInit) - "tell me when one is"
this.getOwnerComponent().getEventBus()
    .subscribe("orders", "priorityPressed", this._onPriorityPressed, this);
```

- **`publish(channel, event, data)`** - broadcast on a named **channel** (`"orders"`)
  with an **event** name (`"priorityPressed"`) and an optional data object. The publisher
  does not know or care who is listening.
- **`subscribe(channel, event, handler, listener)`** - register interest. The handler is
  called as `handler(channel, event, data)` whenever a matching message is published.
  We subscribe in the App controller's `onInit` and show a toast from there - proving the
  message crossed from the List view to the App view with no direct link between them.

The mental model: **the EventBus is a noticeboard.** Publishers pin notes to a channel;
subscribers watch the channels they care about. It is the right tool for **decoupled,
cross-view, occasional** communication. (It is *not* a replacement for data binding -
shared *state* belongs in a model; the EventBus is for *notifications* that something
happened.)

## The bigger picture: extensibility and reuse

This lesson has walked the whole extensibility ladder, lightest to heaviest:

- **Compose** existing controls (every earlier lesson) - the default.
- **Custom control** (stages 1-3) - new rendering and behaviour, packaged as a
  first-class control with metadata, a renderer, properties and events.
- **EventBus** (this stage) - decouple parts of an app that must react to each other.

Two more you will meet in larger projects, worth knowing by name:

- **Extending an existing control** - `sap.m.Input.extend(...)` to tweak one behaviour
  instead of building from scratch.
- **Reuse components** - packaging a whole feature (views, controllers, i18n) as a
  separate UIComponent that many apps embed via `ComponentContainer`. That is how SAP
  ships reusable building blocks across products.

Together these are what "extensibility" means in UI5: you are never stuck with the
built-ins - you can extend, compose, decouple and package at whatever level the problem
needs.

## Your coding task

In `List.controller.js`, complete `onPriorityPress` so it **publishes** the press on the
component's EventBus (channel `"orders"`, event `"priorityPressed"`, with the value). The
App controller already subscribes.

## What the check verifies (and where you are free)

- The list **publishes** on the component EventBus.
- The app **subscribes** on the EventBus.
- Publish and subscribe **use the same channel and event name** - because a noticeboard
  only works if both sides agree on the board. The exact channel and event *names* are
  **yours**; the check only requires the two sides to match.

## Run it yourself

Run the app and click a priority. The toast now comes from the **App** controller, via
the EventBus - the click crossed view boundaries with no direct wiring. Change the
channel name on one side only and it stops working: proof that the agreement, not a
reference, is what connects them.

## End of Lesson 20

You can now build controls, not just use them: a real custom control with metadata,
a modern `apiVersion: 2` renderer, bindable properties and semantic events, plus the
EventBus for decoupled communication and a map of the wider reuse options. In
**Lesson 21** we make the app *look* the part - theming, the Horizon theme, content
density, theming parameters, and the custom CSS that finally styles the very classes
this control emits.

---

### Where this came from

`sap.ui.core.EventBus`, `Component#getEventBus`, `publish`/`subscribe`, and the notes on
extending controls and reuse components follow the SAPUI5 "EventBus", "Extending
Controls" and "Reuse Components" documentation at <https://ui5.sap.com/>. The channel
and message are this course's own.
