# Stage 4 - ObjectPageLayout

A sales order has more to it than fits comfortably on one flat screen - general
info, line items, history, attachments. The Fiori pattern for showing a rich
**single object** is the **`sap.uxap.ObjectPageLayout`**: a header that describes the
object, then **scrollable sections** with an **anchor bar** to jump between them. We
turn the order detail into one, completing the app's Fiori look and finishing
Phase C.

## What an ObjectPage is for

A `DynamicPage` (last stage) is for a *page* of content - typically a list. An
**ObjectPageLayout** is for *one object* shown in depth. It gives you:

- a **header title** describing the object (the customer, the order id, key
  actions);
- any number of **sections**, each a chunk of related information;
- an automatic **anchor bar** - a row of section links at the top that scrolls you
  straight to a section, and highlights where you are as you scroll.

It is the standard "object detail" page across SAP Fiori - whenever you open *a*
product, *an* order, *a* customer, you are almost certainly looking at an
ObjectPage.

## Sections and subsections

The structure nests in a way worth understanding:

```xml
<uxap:ObjectPageLayout>
    <uxap:headerTitle>
        <uxap:ObjectPageHeader objectTitle="{customer}" objectSubtitle="{orderId}" />
    </uxap:headerTitle>

    <uxap:ObjectPageSection title="{i18n>generalSection}">
        <uxap:ObjectPageSubSection>
            ... status, amount, date ...
        </uxap:ObjectPageSubSection>
    </uxap:ObjectPageSection>

    <uxap:ObjectPageSection title="{i18n>itemsSection}">
        <uxap:ObjectPageSubSection>
            ... item count ...
        </uxap:ObjectPageSubSection>
    </uxap:ObjectPageSection>
</uxap:ObjectPageLayout>
```

- **`headerTitle`** - the `ObjectPageHeader` describing the object (title, subtitle,
  and an actions area, where our Close button lives).
- **`ObjectPageSection`** - a top-level section. Its **`title`** is what appears in
  the **anchor bar**. We have "General" and "Items"; you could add "History",
  "Attachments", and they would simply appear as more anchors.
- **`ObjectPageSubSection`** - sections hold subsections, which hold the actual
  content controls. (Sections group; subsections lay out.)

The whole control comes from the **`sap.uxap`** library (UX Application Patterns) -
declared in the manifest dependencies, like any library you add. The section titles
are genuine content you author, which is why they live in the i18n bundle and are
yours to choose.

## The mental model

**A list uses a DynamicPage; a single object uses an ObjectPage.** When a thing has
enough facets that a flat page would scroll forever or feel cluttered, you give it
sections and an anchor bar, and suddenly a dense object becomes navigable. Choosing
the right page control for the job - Page, DynamicPage, or ObjectPage - is a real
Fiori design decision, and now you can make it deliberately.

## Your coding task

In `Detail.view.xml`, give the first `ObjectPageSection` a **title** (it becomes its
label in the anchor bar). It is a free choice - "General", "Overview", or whatever
reads well.

## What the check verifies (and where you are free)

- The detail is an **`ObjectPageLayout`** divided into **sections**.
- Each section has a **non-empty title** - the wording is **yours**. A real title
  passes; an empty one fails.

## End of Lesson 12 - and the end of Phase C

The app now wears the full Fiori look: a **FlexibleColumnLayout** showing list and
detail side by side, with full-screen and close controls; a **DynamicPage** list
with a snapping, pinnable header; and an **ObjectPage** detail with sections and an
anchor bar. Combined with the dialogs, popovers and messaging from Lesson 11, and
the fragments from Lesson 10, the interaction layer is complete - this looks and
behaves like real SAP software.

In **Lesson 13**, the last of Phase C, we add the piece every business app needs:
proper **forms with validation** - typed inputs, required fields, value states, and
the Message Manager and MessagePopover we deferred - so the "New order" dialog
actually checks what the user enters.

---

### Where this came from

`sap.uxap.ObjectPageLayout`, `ObjectPageSection`, `ObjectPageSubSection` and
`ObjectPageHeader` are documented in the SAPUI5 API Reference and the "Object Page"
topic at <https://ui5.sap.com/>. The sections and their content are this course's own.
