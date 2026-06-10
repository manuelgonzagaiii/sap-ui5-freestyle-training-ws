# Stage 4 - Multiple languages and RTL

We did the hard part in Stage 1: every word now comes from a bundle. Adding a whole
new language is, as promised, almost free - you create one more file. In this stage
you add a German translation, tell the app it supports German, and learn how UI5
chooses a language and how it handles **right-to-left** scripts like Arabic and
Hebrew. This is where the payoff of internationalisation becomes obvious.

## One language = one file

A translation is just another `.properties` file with the **same keys** and
translated **values**:

```properties
# i18n.properties (English)        # i18n_de.properties (German)
pageTitle=Sales Orders             pageTitle=Verkaufsauftraege
createButton=Create                createButton=Anlegen
```

The naming convention does the magic: `i18n_de.properties` is the German variant of
`i18n.properties`. The keys are identical; only the words differ. The app's views
never change - they still bind `{i18n>pageTitle}` - they just resolve to a different
file depending on the user's language.

> The German strings here are illustrative (from the assistant's own knowledge of
> German). For a real release, have translations reviewed by a native speaker - this
> is exactly the kind of thing the i18n setup makes easy to hand off.

## How UI5 picks the language

You declare which languages you support in the manifest:

```json
"settings": {
    "bundleName": "ui5.sales.i18n.i18n",
    "supportedLocales": ["", "de"],
    "fallbackLocale": ""
}
```

- **`supportedLocales`** - the languages you ship. `""` is the default bundle
  (English here); `"de"` adds German. Listing them lets UI5 load only what exists
  and skip pointless network requests for languages you do not have.
- **`fallbackLocale`** - what to use when the user's language is not supported. With
  `""`, a French user (no `i18n_fr`) falls back to the default English bundle, so
  the app is never blank.

At runtime UI5 reads the **browser's language** and loads the matching bundle. You
can override it for testing with the URL parameter **`?sap-ui-language=de`** - the
same trick you used in the last two stages to preview German formatting.

## Right-to-left (RTL)

Some languages - Arabic, Hebrew, Persian - are written **right to left**, and a good
app mirrors its entire layout for them: the navigation moves to the right, text
aligns right, icons flip. UI5 handles this for you when the language is an RTL one,
or you can force it for testing with **`?sap-ui-rtl=true`**. Because you built the
layout with framework controls and logical spacing (not hard-coded left/right
pixels), **it mirrors correctly with no extra work** - another quiet reward for
doing things the framework's way rather than fighting it with custom CSS.

## Your coding task

1. In `manifest.json`, add **German** to the list of supported locales.
2. In `i18n/i18n_de.properties`, provide the German text for the **Create** button.

## What the check verifies (and where you are free)

- **German** is declared as a supported locale.
- A **German bundle** exists with the **same keys** as the English one (a missing
  key would leave that label untranslated). The translations themselves are yours -
  the check ensures the structure is complete, not that your German is perfect.

## End of Lesson 8

Your app now speaks more than one language. Every word lives in a bundle, a second
language is one file away, money and dates format themselves correctly for each
locale, and the layout will even mirror for right-to-left scripts. You have built
something that works for users anywhere - and you did it by *declaring* intent, not
by writing locale code.

In **Lesson 9**, the finale of Phase B, we make the app navigable: **routing**. The
detail will move from a panel into its own page, reached by its own URL, with the
browser's back button working as users expect - the master-detail experience at the
heart of every Fiori app.

---

### Where this came from

`supportedLocales`, `fallbackLocale`, the `_de` bundle convention, `sap-ui-language`
and `sap-ui-rtl` are documented in the SAPUI5 "Localization" and Walkthrough topics
at <https://ui5.sap.com/>. The German translations are from the assistant's own
knowledge - please have them reviewed.
