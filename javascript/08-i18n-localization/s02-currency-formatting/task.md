# Stage 2 - Currency formatting

Our orders show amounts like `1250.5` - a raw number that looks nothing like money
and, worse, looks *wrong* to half the world. A German user expects `1.250,50`; an
American expects `1,250.50`; the number of decimals even depends on the currency
(yen has none). Getting this right by hand is a nightmare. UI5 does it for you with
a built-in **`Currency` type** that formats money correctly for the user's locale.
This stage puts it to work.

## Why money is harder than it looks

The same amount is written differently around the world:

- `1.250,50 EUR` in Germany (dot for thousands, comma for decimals),
- `$1,250.50` in the US (the reverse),
- `¥1,251` in Japan (no decimals at all).

The locale decides the separators; the *currency* decides the decimal places. Code
that hard-codes any of this is wrong somewhere. The right answer is to declare
"this is money" and let the framework format it for whoever is looking.

## The `sap.ui.model.type.Currency` type

This is a built-in **type** (recall Lesson 7: a type formats, and can parse and
validate). It needs **two inputs** - the amount and the currency code - so it is
bound with the **composite `parts`** syntax you learned last lesson:

```xml
<ObjectListItem
    number="{
        parts: ['amount', 'currency'],
        type: 'sap.ui.model.type.Currency',
        formatOptions: { showMeasure: false }
    }"
    numberUnit="{currency}" />
```

- **`parts: ['amount', 'currency']`** - the type receives the amount *and* its
  currency, so it knows how many decimals to use (two for EUR, none for JPY).
- **`type: 'sap.ui.model.type.Currency'`** - the framework's money formatter. It
  applies the right separators for the active locale automatically.
- **`formatOptions: { showMeasure: false }`** - options that tune the type. Here we
  hide the currency code *inside* the number (because the `ObjectListItem` shows it
  separately in `numberUnit`), so we do not print "EUR" twice.

Everything is declarative. You did not write a single line of formatting logic; you
*declared* that the value is a currency, and UI5 formats `1250.5` as `1,250.50` (or
`1.250,50`, depending on locale) for free.

## The bigger pattern: built-in types

`Currency` is one of a family of built-in types - `Integer`, `Float`, `Date`,
`Time`, `DateTime`, `Unit` - that all do locale-aware formatting (and parsing and
validation) for common value kinds. The lesson to carry: **before you format
anything "by hand", check for a built-in type.** Dates, numbers, money and units
all have one, and using it gets you correctness across every locale that you would
otherwise have to handle yourself.

## Your coding task

In `App.view.xml`, set the **type** on the order amount so it is formatted as a
locale-aware currency (the composite `parts` are already in place).

## What the check verifies

- The amount is formatted with the **`sap.ui.model.type.Currency`** type.
- It feeds **both** the amount and the currency code via composite `parts`.

## Run it yourself

```
npx ui5 serve --open index.html
```

The amounts now read as proper money with thousands separators and two decimals.
Add `?sap-ui-language=de` to the URL and reload - the very same data now uses German
separators (`1.250,50`). One declaration, every locale.

---

### Where this came from

`sap.ui.model.type.Currency` and `formatOptions` are documented in the SAPUI5 "Data
Types" topic and API Reference at <https://ui5.sap.com/>. The example is this
course's own.
