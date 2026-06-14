# Stage 4 - Making cards interactive: actions and the host

A card that only displays is a poster. Real cards **do** things - click a row to navigate,
press a header button to refresh, ask the surrounding app to open a detail. Two concepts
make that work: **actions** (declared in the manifest) and the **host** (the environment
the card runs in). This closing stage adds an action and explains the host.

## Actions: declared interactivity

You make parts of a card interactive by declaring **`actions`** on them - on items, on
the header, on buttons:

```json
"item": {
    "title": "{customer}",
    "actions": [ { "type": "Navigation", "parameters": { "url": "https://ui5.sap.com/" } } ]
}
```

- **`type`** - the kind of action. **`Navigation`** goes somewhere (a URL, or an
  app-internal target). Others include actions that submit data or call a service.
- **`parameters`** - where/what: a `url` here. When the action targets *inside* the host
  app rather than an external URL, the **host** resolves it.

Declaring the action makes the whole item clickable and gives it the right affordance -
no event handler in your code, just JSON.

## The host: where a card lives

A card never runs alone; it runs inside a **host** - your app, the Fiori launchpad, SAP
Build Work Zone. The host is represented by **`sap.ui.integration.Host`**, and it is the
bridge between the sandboxed card and the world:

- the card raises an **action**, and the host **decides what it means** ("Navigation to
  order SO-1004" - the launchpad opens the order app; our app would route to the detail
  page);
- the host can supply **context and host data** the card requests (the current user,
  environment values).

In code you create a `Host`, handle its `action` event, and set it on the card with
`oCard.setHost(oHost)`. We keep the manifest-level action here and leave the host wiring
as the verify-and-explore step, because the host's job depends on where the card is
deployed - the same card behaves differently in your app versus a launchpad, and that is
exactly the decoupling cards are designed for. (The `Host` API is from the author's
knowledge - verify `sap.ui.integration.Host` and `Card#setHost` against the API Reference.)

## Your coding task

In `webapp/cards/ordersCard.json`, make each row trigger a **navigation action**
(`"type": "Navigation"`).

## What the check verifies (and where you are free)

- Card items **declare an action** with a type.
- The action's target and type are **yours** - any valid action passes; the check only
  requires that the items are interactive.

## Run it yourself

Reopen the card: rows now show a press affordance, and clicking one triggers the
navigation. Wire a real `Host` (see the docs) and the same action can route inside your
app instead of opening a URL - the card stays the same; the host gives it meaning.

## End of Lesson 23

You can now build and embed integration cards: a List card from a manifest, fed live from
the OData service, headlined with a KPI, and made interactive with actions - plus the host
model that lets one card definition behave correctly in an app, a launchpad, or a
dashboard. In **Lesson 24** we go the other direction and bring **UI5 Web Components** -
standards-based custom elements - into the freestyle app, mixing two component worlds in
one page.

---

### Where this came from

Card `actions` (`Navigation` and friends), `sap.ui.integration.Host` and `Card#setHost`
follow the SAPUI5 "Integration Cards - Actions" and "Host" documentation and Card Explorer
at <https://ui5.sap.com/>. The host wiring is from the author's knowledge - verify the
`Host` API for your version. The action target is this course's own.
