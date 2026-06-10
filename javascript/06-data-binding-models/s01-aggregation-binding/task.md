# Stage 1 - Models and aggregation binding

This is the stage where the app gets a heartbeat. Until now every value on screen
was hard-coded. Now we load a real set of **sales orders** and let UI5 render a
**list** of them from the data alone - no loop, no "create a row, set its text,
repeat." This is **aggregation binding**, and it is the single most powerful idea
in the whole framework.

## The data, and where the model comes from

Open `webapp/model/salesOrders.json`. It holds our app's data: a `kpi` object (the
summary numbers) and a `salesOrders` array (eight orders, each with a customer,
status, amount, date and so on). In a real app this would come from a server; for
now a local file is perfect, and everything you learn here works identically when
we switch to a live OData service later.

Notice we did **not** create this model in the controller. Instead it is declared
in `manifest.json`:

```json
"models": {
    "": {
        "type": "sap.ui.model.json.JSONModel",
        "uri": "model/salesOrders.json"
    }
}
```

The empty key `""` means this is the **default model**. The `uri` tells UI5 to
load the file and wrap it in a `JSONModel` for us. This is the descriptor doing its
job again (Lesson 2): configuration that lives as data, declared in the open,
rather than buried in code. The controller is now free of model-creation
boilerplate.

## The three kinds of binding

You have already met two of the three binding types. Here is the full set, because
naming them makes them click:

- **Property binding** - one control property to one value: `text="{customer}"`.
- **Aggregation binding** - one control's aggregation to a **collection**, so the
  control repeats a template for each entry. This is the new one.
- **Element binding** - a whole control bound to a single object's context (next
  stage).

## Aggregation binding: a list from a template

Here is the magic:

```xml
<List items="{/salesOrders}">
    <ObjectListItem title="{customer}" number="{amount}" numberUnit="{currency}">
        <attributes>
            <ObjectAttribute text="{orderId}" />
            <ObjectAttribute text="{status}" />
        </attributes>
    </ObjectListItem>
</List>
```

Two things are happening, and the difference between them is the key insight:

- **`items="{/salesOrders}"`** is an **absolute** binding - the leading `/` means
  "from the root of the model." It binds the `List`'s `items` aggregation to the
  whole array. The `ObjectListItem` inside is not one item; it is a **template**.
- The bindings **inside** the template - `{customer}`, `{amount}`, `{status}` -
  are **relative**: no leading slash. UI5 stamps out one `ObjectListItem` per
  order and resolves each relative binding **against that order**. So `{customer}`
  means "this row's customer."

That is the whole trick: **bind the aggregation to the list, and write the row once
as a template with relative bindings.** Eight orders, or eight thousand, the markup
is the same. Change the data and the list redraws itself. You will use this on
every list, table and dropdown you ever build.

## A word on binding modes

By default, a `JSONModel` binds **two-way** (changes flow both directions), while
controls reading data you do not edit are effectively **one-way** (model to
screen). There is also **one-time** (read once, never update). You rarely set these
by hand at first; just know the vocabulary - we use a two-way binding deliberately
when we build edit forms later.

## Your coding task

In `App.view.xml`:

1. Bind the `List`'s `items` to the **`salesOrders`** collection (an absolute
   path).
2. In the template, bind the item title to each order's **customer** (a relative
   path).

## What the check verifies

- The data file is valid JSON with a non-empty `salesOrders` array.
- The default model is declared **in the manifest**, loaded from the data file.
- The `List` binds `items` to **`{/salesOrders}`** (absolute).
- The template uses **relative** bindings such as `{customer}`.

This is rule-of-law wiring - the paths must be right or nothing renders - but the
understanding you are building (absolute for the collection, relative for the row)
is the mental model behind every data-driven screen.

## Run it yourself

```
npx ui5 serve --open index.html
```

A list of eight sales orders appears, each rendered from the data by a single
template. You wrote one row; the framework drew them all.

---

### Where this came from

Aggregation binding, the declarative manifest model and the absolute/relative path
rules follow the official **SAPUI5 Walkthrough** (Steps 7-8 and the "Data Binding"
documentation) at <https://ui5.sap.com/> and `UI5/sample-app`. The sales-order data
is this course's own.
