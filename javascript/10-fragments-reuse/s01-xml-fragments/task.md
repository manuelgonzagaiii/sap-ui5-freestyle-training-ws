# Stage 1 - XML fragments

Welcome to Phase C, where the app becomes genuinely interactive. We start with a
quiet but important tool: the **fragment**. As an app grows, you find yourself
wanting to reuse a chunk of UI in more than one place, or to lift a self-contained
piece (a dialog, a form, a header) out of a crowded view. A fragment is exactly
that - **a reusable piece of UI markup with no view or controller of its own** -
and learning it now sets up dialogs, forms and reuse for the rest of the course.

## What a fragment is (and is not)

A **fragment** is a snippet of controls defined in its own file, but - and this is
the key difference from a view - **it has no controller and is not a control
itself.** It is pure, reusable markup. When you use a fragment, its controls become
part of whatever view *hosts* it, and they share that host's controller and models.

Think of a view as a complete room and a fragment as a piece of furniture you can
place in any room. The furniture has no electricity of its own; it plugs into
whatever room it sits in.

A fragment file is wrapped in a `FragmentDefinition`:

```xml
<core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core">
    <ObjectHeader title="{customer}" number="...">
        <attributes>
            <ObjectAttribute title="Order" text="{orderId}" />
        </attributes>
    </ObjectHeader>
</core:FragmentDefinition>
```

Notice the bindings (`{customer}`, `{orderId}`) are **relative** and ordinary. The
fragment does not know or care which model they come from - they resolve against the
*host view's* model when the fragment is placed. That is what makes a fragment
reusable: it describes shape, not data source.

## Using a fragment by including it

We have moved the order detail's `ObjectHeader` out of `Detail.view.xml` and into
`OrderHeader.fragment.xml`. The view now pulls it back in with a one-line include:

```xml
<Page ...>
    <content>
        <core:Fragment fragmentName="ui5.sales.view.fragment.OrderHeader" type="XML" />
    </content>
</Page>
```

- **`<core:Fragment>`** drops the fragment's content right here.
- **`fragmentName`** is the dotted path to the file
  (`ui5.sales.view.fragment.OrderHeader`).
- **`type="XML"`** says it is an XML fragment.

The rendered result is identical to before - but the header is now a self-contained,
reusable unit. The detail view got shorter and clearer, and that header can be
dropped into any other view that has an order in its model.

## Why bother? The payoff of extraction

- **Reuse.** Define a piece of UI once, use it in many views - no copy-paste, one
  place to change.
- **Readability.** A long view broken into named fragments reads like a table of
  contents instead of a wall of XML.
- **On-demand loading.** Fragments can be loaded only when needed (next stage) -
  important for things like dialogs that are not on screen at first.

The judgement to build: **when a view gets long, or a piece of it wants to live
somewhere else too, extract it into a fragment.** It is the same instinct as pulling
a function out of a long method.

## Your coding task

In `Detail.view.xml`, complete the `<core:Fragment>` include so it pulls in the
**OrderHeader** fragment.

## What the check verifies

- The `OrderHeader` fragment is a **`FragmentDefinition`** containing the
  `ObjectHeader`.
- The detail view **includes the fragment by name**.

## Run it yourself

```
npx ui5 serve --open index.html
```

Open an order's detail - it looks exactly as it did, but the header now comes from a
reusable fragment. Same screen, cleaner structure, and a piece you can reuse
elsewhere.

---

### Where this came from

`sap.ui.core.Fragment`, `FragmentDefinition` and `<core:Fragment>` includes follow
the official **SAPUI5 Walkthrough** ("Reuse Dialogs"/"Fragment Callbacks" steps) and
the SAPUI5 documentation at <https://ui5.sap.com/>. The extraction is this course's
own.
