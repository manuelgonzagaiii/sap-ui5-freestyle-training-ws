# Stage 4 - Back navigation and not-found

Master-detail navigation works, but two things separate a demo from a real app: a
clear way **back**, and graceful behaviour when a URL points to **nothing**. In this
final stage of Phase B you add a working back button and a not-found page - the
polish that makes an app feel trustworthy instead of fragile.

## A back button that belongs

`sap.m.Page` has a built-in back arrow. You switch it on and wire it to a handler:

```xml
<Page title="{i18n>detailTitle}" showNavButton="true" navButtonPress=".onBack" />
```

```js
onBack() {
    this.getOwnerComponent().getRouter().navTo("list");
}
```

- **`showNavButton="true"`** shows the back arrow in the page header.
- **`navButtonPress=".onBack"`** runs `onBack` when it is pressed.
- **`navTo("list")`** returns to the list route - no parameters needed, because the
  list pattern is empty.

A note on a more advanced option you will meet later: instead of always going to the
list, apps often use the browser **`History`** to go back to wherever the user
actually came from (`window.history.back()` when there is history, else `navTo` to a
sensible default). We keep it simple here with a direct `navTo("list")`; the idea to
remember is that "back" is a deliberate destination you choose, not magic.

## When the URL points to nothing

What happens if a user edits the URL to `#/orders/999`, or follows a stale link to a
route that no longer exists? Without handling, they get a blank, broken-looking
screen. A robust app shows a friendly **not-found** page instead. You set that up in
the routing config:

```json
"config": { ..., "bypassed": { "target": "notFound" } },
"targets": {
    "notFound": { "id": "notFound", "name": "NotFound" }
}
```

- **`bypassed.target`** tells the router: "if a URL matches **no** route, show this
  target." It loads `NotFound.view.xml` - a simple `sap.m.MessagePage` explaining
  that nothing was found.

This is defensive design. Users *will* hit URLs that do not resolve - typos, old
bookmarks, deleted records - and the difference between a clear "Not found" message
and a blank white screen is the difference between an app that feels solid and one
that feels broken. Handling the unhappy path is a hallmark of a professional
developer, not an afterthought.

## Your coding task

In `Detail.controller.js`, make `onBack` **navigate back to the list** route. (The
nav button is already wired in the view, and the not-found target is configured for
you - read both so you understand how they fit.)

## What the check verifies

- The detail page's nav button is **wired to a back handler**.
- The back handler **navigates to the list** route.
- A **not-found target** catches unmatched URLs (`bypassed.target`).

## End of Lesson 9 - and the end of Phase B

Step back and look at what you have built. Your Sales Order Management app now has a
**master list and a detail page**, each with its own URL; it navigates between them
with the back button working as users expect; it deep-links straight to any order;
and it fails gracefully on bad URLs. Underneath, it is the whole of Phase B working
together - responsive layout, real data binding, formatters and types, full
internationalisation, and now routing - the complete machinery of a real
single-page SAP application.

You did all of it against a local data file. In **Phase C** we begin connecting the
app to real services and richer interaction patterns - dialogs and messaging, Fiori
layouts like the flexible column layout, and proper forms with validation - and
later, real OData backends. Everything you built here carries straight into them.

---

### Where this came from

`Page` `showNavButton`/`navButtonPress`, `bypassed` not-found handling and
`sap.m.MessagePage` follow the official **SAPUI5 Walkthrough** routing steps and
`UI5/sample-app` at <https://ui5.sap.com/>. The back and not-found design are this
course's own.
