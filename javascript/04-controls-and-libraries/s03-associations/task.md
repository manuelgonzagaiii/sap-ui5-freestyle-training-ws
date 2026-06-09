# Stage 3 - Associations (labelFor)

You now know three of a control's four relationships: properties, aggregations and
events. This stage introduces the fourth and most often misunderstood one: the
**association**. It is a small idea with a big payoff for clean, accessible apps,
and the classic example - a **`Label`** that knows which field it describes - is
exactly what we add here.

## Aggregation vs association: ownership vs reference

The difference is about **ownership**:

- An **aggregation** is *containment*. A `Page` **owns** its `content`; a `Select`
  **owns** its `items`. Destroy the parent and the children go with it. In XML, an
  aggregation's children are nested *inside* the parent tag.
- An **association** is *a reference*. One control **points at** another that it
  does **not** own. The two controls live independently; the association is just a
  link between them, expressed as an **id**, not by nesting.

The everyday example is a form label:

```xml
<Label text="Customer" labelFor="customerInput" />
<Input id="customerInput" placeholder="Type a customer name" />
```

The `Label` does not *contain* the `Input` - they are siblings. The `Label` simply
**refers** to it by id through the **`labelFor`** association. That is why
`labelFor` takes an id string, not a nested control: associations are links, not
ownership.

## Why this matters (it is not just tidiness)

Connecting a label to its field with `labelFor` is one of the highest-value,
lowest-effort things you can do, for two reasons:

- **Accessibility.** A screen reader, on reaching the input, announces "Customer,
  edit field" instead of just "edit field". For a user who cannot see the layout,
  that label *is* the form. Without the association, the visual proximity means
  nothing to them.
- **Usability.** Clicking the label moves focus into the field, the behaviour
  users expect from every well-built form on the web.

You get both for free, from one attribute - but only if you make the link
explicit. The framework cannot guess that a `Label` sitting above an `Input` is
*for* that input; you have to say so. This is a recurring theme in good UI5: the
framework gives you the tools, but a thoughtful developer is the one who wires them
up for the people who will actually use the app.

## Your coding task

In `App.view.xml`:

1. Make the `Label` describe the customer `Input` by pointing its **`labelFor`**
   association at the input's **id**.

Read the `Input`'s `id` and use that exact value - an association is only as good
as the id it points to.

## What the check verifies

- A `Label` is present and its **`labelFor`** points at a control whose **id
  actually exists** in the view (the check follows the reference, so a label
  pointing at nothing - a real bug - fails).

This is rule-of-law by nature: an association either resolves to a real control or
it does not. The design judgement you are practising is *remembering to make the
link at all*, which is what separates an accessible app from one that only looks
finished.

## Run it yourself

```
npx ui5 serve --open index.html
```

Click the word "Customer" - focus jumps into the field. Small, correct, and the
mark of someone who builds forms properly.

---

### Where this came from

The `Label.labelFor` association and the aggregation-versus-association distinction
are documented in the SAPUI5 API Reference and the "Associations" topic at
<https://ui5.sap.com/>. The example is this course's own.
