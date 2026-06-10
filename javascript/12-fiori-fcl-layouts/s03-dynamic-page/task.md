# Stage 3 - DynamicPage

Our list sits in a plain `sap.m.Page` with a fixed title bar. Fiori's signature page
gives you something better: a **header that snaps away as you scroll** to make room
for content, and that the user can **pin** open if they want it to stay. That is the
**`sap.f.DynamicPage`**, and converting the list to one is this stage. It is the page
control you will use for almost every real Fiori screen.

## What a DynamicPage adds over a plain Page

A `sap.m.Page` has a static header that is always there, taking the same space
whether you are at the top of the list or scrolled deep into it. A
**`sap.f.DynamicPage`** is smarter, and it has three distinct parts:

- a **title** (`DynamicPageTitle`) - always visible, with the heading and the main
  actions;
- a **header** (`DynamicPageHeader`) - rich content (our KPI tiles and search) that
  **collapses ("snaps") as the user scrolls down**, so the list gets the room, and
  expands again when they scroll back up;
- the **content** - the list itself.

```xml
<f:DynamicPage>
    <f:title>
        <f:DynamicPageTitle>
            <f:heading><Title text="{i18n>pageTitle}" /></f:heading>
        </f:DynamicPageTitle>
    </f:title>
    <f:header>
        <f:DynamicPageHeader pinnable="true">
            ... KPI grid + search ...
        </f:DynamicPageHeader>
    </f:header>
    <f:content>
        ... the orders list ...
    </f:content>
</f:DynamicPage>
```

## Snapping and pinning - the point of it

The behaviour is the whole reason to use it:

- **Snapping.** Scroll down through a long order list and the KPI/search header rolls
  up out of the way - the data takes the screen. Scroll back to the top and it
  returns. The header is there when you want context, gone when you want content.
- **`pinnable="true"`.** This adds a small pin button so the user can *lock* the
  header open if they prefer to always see the KPIs and search while scrolling. It
  puts the choice in their hands - a small, considerate touch that is pure Fiori.

The mental model: **a DynamicPage separates "always-there title + actions" from
"contextual header that gets out of the way".** That separation is what lets a screen
show rich summary information *and* a long list without the two fighting for space.
Once you have it, going back to a fixed header feels cramped.

## Your coding task

In `List.view.xml`, complete the `DynamicPageHeader` so its header is **pinnable**
(lettings users keep it open while scrolling).

## What the check verifies

- The list is a **`DynamicPage`**.
- It has a **snapping, pinnable header** (`DynamicPageHeader` with a `pinnable`
  setting).
- The title lives in a **`DynamicPageTitle`**.

## Run it yourself

```
npx ui5 serve --open index.html
```

Scroll the order list - the KPI/search header snaps away to give the list room, then
returns at the top. Use the pin button to lock it open. The same content as before,
but the page now behaves like real Fiori.

---

### Where this came from

`sap.f.DynamicPage`, `DynamicPageTitle`, `DynamicPageHeader` and `pinnable` follow
the official **`UI5/sample-app`** (`webapp/view/App.view.xml`, which uses a
`DynamicPage` with a `DynamicPageHeader pinnable="..."`) and the SAPUI5 API Reference
at <https://ui5.sap.com/>. The header content is this course's own.
