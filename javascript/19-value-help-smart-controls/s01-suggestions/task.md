# Stage 1 - Suggestions while typing

Typing a customer name into a free-text field invites trouble: "Atlas Trading",
"atlas trading" and "Altas Trading" all look fine to the field and create three
different customers in your data. Real business apps never let users invent master
data by typo - they **help the user pick from what exists**. That family of features
is called **value help**, and this final lesson of Phase D builds it up in layers,
starting with the lightest: **suggestions while typing**.

## The Customers entity: something to suggest from

Value help needs a source of valid values. Our CAP backend gains a proper master-data
entity:

```cds
entity Customers {
    key ID  : UUID;
    name    : String(40);
    country : String(40);
}
```

It is exposed read-only in the service (`@readonly entity Customers as projection
on my.Customers`) and seeded from `db/data/ui5.sales-Customers.csv` - ten customers.
This mirrors how real systems work: orders reference customers, and the customer list
is maintained centrally, not invented per order. (The "Create" dialog from Phase C
also returns in this lesson, so there is a customer field to help.)

## `showSuggestion`: the lightest value help

`sap.m.Input` has type-ahead built in. Switch it on and bind the suggestions to the
customer list:

```xml
<Input id="newCustomerInput" value="{create>/customer}"
    showSuggestion="true"
    suggestionItems="{ path: '/Customers', templateShareable: false }">
    <suggestionItems>
        <core:Item text="{name}" />
    </suggestionItems>
</Input>
```

- **`showSuggestion="true"`** - as the user types, a dropdown of matching entries
  appears under the field.
- **`suggestionItems`** - an aggregation binding (Lesson 6 again) to `/Customers`.
  Each suggestion is an `Item` whose text is the customer's `name`; the framework
  filters them against what has been typed.
- Because `/Customers` is an OData V4 collection, the suggestions come from the
  **server** - the same binding machinery as everywhere else, now powering type-ahead.

The user can still type anything (we tighten that later in the value-help spectrum),
but the common case - start typing, pick the right customer - is now two keystrokes
and a tap, with no typos.

## The value-help spectrum

Suggestions are step one of a spectrum you will complete in this lesson:

1. **Suggestions** (this stage) - help while typing, free entry still allowed.
2. **A value help dialog** (next stage) - a full picker with search, for when the
   user wants to browse.
3. **Value list annotations** (stage 3) - the *metadata* version, where the service
   itself declares where valid values live and smart clients build the UI from it.

Choosing how much help a field needs - none, suggestions, a full dialog - is a design
decision you make per field, based on how many values exist and how well users know
them. A three-value status needs a `Select`; a ten-thousand-customer field needs a
dialog with search.

## Your coding task

In `CreateOrder.fragment.xml`, switch the customer input's **suggestions on** so it
offers matching customers while typing.

## What the check verifies

- The backend has a **Customers** entity with seed data.
- The customer input **offers suggestions from the Customers entity**
  (`showSuggestion` + `suggestionItems` bound to `/Customers`).

## Run it yourself

With both servers running, press Create and type "a" into the Customer field -
matching customers drop down from the live CAP data. Pick one. No typos, no invented
customers.

---

### Where this came from

`sap.m.Input` suggestions (`showSuggestion`, `suggestionItems`) follow the SAPUI5 API
Reference and samples at <https://ui5.sap.com/>; the Customers entity and CSV seeding
follow the SAP CAP documentation at <https://cap.cloud.sap/>. The customer list is
this course's own.
