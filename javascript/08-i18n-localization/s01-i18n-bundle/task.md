# Stage 1 - The i18n bundle and ResourceModel

Look at our app and you will find English text hard-coded all over the view:
"Sales Orders", "Search by customer", "Create". That is fine until someone needs
the app in German, or you need to fix one label in forty places. Professional apps
keep **every word the user reads in one file**, separate from the code. That file
is the **i18n bundle**, and wiring it up is this stage - the foundation of an app
that can speak any language.

## What "i18n" means and why it matters

**i18n** is shorthand for *internationalisation* (an "i", then 18 letters, then an
"n"). The idea is simple: **no user-facing text lives in your views or code.** Every
label, button and message is looked up by a **key** from a translation file. To
support a new language you add a new file - you never touch the app.

The benefits are concrete:

- **Translation without code changes.** A translator edits a `.properties` file;
  developers are not involved.
- **One source of truth.** Change "Create" to "New order" once, and it updates
  everywhere it is used.
- **Consistency.** The same key always yields the same wording across the app.

## The bundle: `i18n/i18n.properties`

A bundle is a plain text file of `key=value` lines:

```properties
pageTitle=Sales Orders
searchPlaceholder=Search by customer
createButton=Create
```

The keys (`pageTitle`) are stable identifiers your app refers to; the values are
the actual words, which translators replace per language. Keep keys meaningful and
the file becomes self-documenting.

## The ResourceModel and the `i18n>` syntax

To make the bundle available to the app, we declare a **`ResourceModel`** - a model
backed by a properties file - in the manifest, under the **named** model `i18n`:

```json
"models": {
    "i18n": {
        "type": "sap.ui.model.resource.ResourceModel",
        "settings": { "bundleName": "ui5.sales.i18n.i18n", "supportedLocales": ["", "de"], "fallbackLocale": "" }
    }
}
```

`bundleName` is the path to the file in dotted form (`ui5.sales` + `i18n.i18n`).
Now any control binds its text from that model with the `i18n>` prefix:

```xml
<Title text="{i18n>pageTitle}" />
<Button text="{i18n>createButton}" />
```

The `i18n>` says "from the named `i18n` model" (just as `device>` did in Lesson 5).
There is one more touch: in `manifest.json` itself you will see
`"title": "{{appTitle}}"` - the double-brace form is how the *descriptor* pulls a
translated value from the same bundle, so even the app's registered title is
translatable.

## Your coding task

1. In `manifest.json`, point the i18n `ResourceModel` at the **bundle** that holds
   the texts.
2. In `App.view.xml`, bind the page `Title` to its **translated** value.
3. In `i18n/i18n.properties`, give `pageTitle` the **text** you want shown.

## What the check verifies (and where you are free)

- An i18n **`ResourceModel`** is declared in the manifest with a `bundleName`.
- The view reads text **from the i18n model** (`{i18n>...}`).
- The bundle **defines the keys** used.
- The actual words in the bundle are **yours** - "Sales Orders", "Orders", your
  team's wording all pass. Rule of law: the wiring (model, prefix, keys) must be
  right. Freedom: every word a translator (or you) writes.

## Run it yourself

```
npx ui5 serve --open index.html
```

The app looks the same - but now not a single label is hard-coded. Every word comes
from the bundle, ready to be translated. That invisibility is the point: you have
made the app multilingual-ready without changing how it looks.

---

### Where this came from

The `ResourceModel`, `i18n.properties` bundle, the `{i18n>key}` and `{{key}}`
syntaxes follow the official **SAPUI5 Walkthrough, Step 8 "Translatable Texts"**
and Step 10 (manifest i18n) at <https://ui5.sap.com/> and `UI5/sample-app`. The
wording is this course's own.
