# Stage 4 - MessagePopover and validate on save

Per-field red borders are great while typing, but on a long form a user wants **one
place to see everything that is wrong**, and the app must **refuse to save** while
errors remain. This stage adds the **`MessagePopover`** - the structured message list
deferred all the way back from Lesson 11 - and a save guard. It completes both the
form and Phase C.

## One model, every message

Stage 3 already did the hard part: registering the view collects all validation
messages into the **message model**. The `MessagePopover` simply **binds to that
model** and shows the list:

```xml
<MessagePopover id="messagePopover" items="{message>/}">
    <MessageItem type="{message>type}" title="{message>message}" />
</MessagePopover>
```

- **`items="{message>/}"`** - aggregation binding (Lesson 6) to the message model's
  root: one `MessageItem` per current message.
- Each **`MessageItem`** shows the message's **`type`** (Error/Warning) and **text**.

It is opened like any popover, anchored to a "Messages" button (the `openBy` skill
from Lesson 11). We show that button only when there are messages:

```xml
<Button ... press=".onShowMessages" visible="{= ${message>/}.length > 0 }" />
```

Expression binding again: the button appears exactly when the message list is
non-empty. The user gets a single, reliable place to review every problem.

## Refusing to save with errors

The final piece is the save guard. Before committing, check whether any messages
remain, and stop if so:

```js
onSaveOrder() {
    if (Messaging.getMessageModel().getData().length > 0) {
        MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("fixErrors"));
        return;
    }
    // ... no errors: commit the draft ...
    this.byId("createOrderDialog").close();
}
```

`getMessageModel().getData()` is the array of current messages; if it is not empty,
there are unresolved errors, so we tell the user and **return early** instead of
saving. This is the safety net behind the per-field feedback: even if a user ignores
a red field, the form will not let bad data through. **Validate as they type, and
verify again at the gate** - that double check is what makes a form trustworthy.

## The whole validation story, assembled

Look back at what the four stages built together, because this is the complete,
idiomatic UI5 validation flow:

1. **Declare** each field's rules with a **type + constraints** (Stage 2).
2. **Register** the view so the framework turns rule violations into **value states**
   and messages (Stage 3).
3. **Show** all messages in one place with a **MessagePopover**, and **block save**
   while any remain (Stage 4).

No hand-written per-field checking, no save-time spaghetti - just declared rules and
the framework doing the enforcement. That is how a professional UI5 form is built.

## Your coding task

In `List.controller.js`, complete `onSaveOrder` so it **blocks the save when there
are validation messages** (and only commits the draft when the form is clean).

## What the check verifies

- A **`MessagePopover`** fragment exists.
- **Save is blocked** when there are validation messages
  (`getMessageModel().getData().length > 0`).

## End of Lesson 13 - and the end of Phase C

The "New order" dialog is now a real, validating form: a tidy responsive `SimpleForm`,
fields that declare their own rules with types and constraints, instant per-field
value states, a `MessagePopover` listing every problem, and a save that refuses bad
data. With this, Phase C - the interaction layer - is complete: fragments, dialogs,
popovers, messaging, Fiori layouts, and now forms and validation.

Your app is, at this point, a complete and polished front end. What it still lacks is
a **real backend** - so far all data has lived in a local JSON file. **Phase D**
fixes that: in Lesson 14 you connect to a mock **OData** service, and from Lesson 15
to a genuine **SAP CAP** server (free and open source) serving real OData V4 - the
same app, now talking to a server the way production Fiori apps do.

---

### Where this came from

`sap.m.MessagePopover`, `MessageItem`, the message model and validate-on-save follow
the SAPUI5 "Message Handling" topic and API Reference at <https://ui5.sap.com/>. The
save guard is this course's own.
