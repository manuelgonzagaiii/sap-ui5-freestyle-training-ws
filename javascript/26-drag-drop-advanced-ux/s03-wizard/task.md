# Stage 3 - A guided wizard for creating an order

Some tasks are too involved for a single form - they have steps, and skipping ahead before
the earlier ones are valid leads to errors. The **`sap.m.Wizard`** control guides the user
through an ordered sequence of steps, unlocking each only when the previous one is valid.
We add a guided, multi-step way to create an order alongside the quick dialog.

## The Wizard control

A Wizard is a container of **`WizardStep`** controls, shown one at a time with a progress
bar:

```xml
<Wizard id="createWizard" finish=".onWizardComplete">
    <WizardStep title="Customer" validated="true">
        <Input value="{create>/customer}" />
    </WizardStep>
    <WizardStep title="Amount" validated="true">
        <Input value="{create>/amount}" />
        <Input value="{create>/currency}" />
    </WizardStep>
</Wizard>
```

- **`WizardStep`** - one step, with a `title` shown in the progress indicator and its own
  content (ordinary controls, bound to the `create` model as in the quick dialog).
- **`validated`** - whether the step is complete enough to advance. Bind it to a real
  expression (`validated="{= !!${create>/customer} }"`) and the Wizard **blocks Next until
  the step is valid** - the guard rail that makes wizards feel safe. (We set it `true` here
  to keep the focus on structure; binding `validated` to your validation is the natural
  next step.)
- **`finish=".onWizardComplete"`** - the handler that runs when the user completes the last
  step. Ours creates the order through the list binding (the same V4 `create` from Lesson
  17) and closes the dialog.

The mental model: a Wizard is a **state machine with a UI** - linear steps, each gated by
validity, ending in a finish action. Use it when a task genuinely has ordered stages
(onboarding, configuration, checkout); for a handful of always-valid fields, a plain form
is better. Knowing *when not* to reach for it is part of the judgement.

## Your coding task

In `CreateWizard.fragment.xml`, wire the Wizard's **`finish`** to `onWizardComplete`. The
handler (which creates the order) is implemented for you.

## What the check verifies

- The fragment defines a **multi-step Wizard** (two or more `WizardStep`s).
- The wizard's **finish is handled**.

## Run it yourself

Click **Guided create**: a wizard opens at step 1 (Customer); fill it and advance to step 2
(Amount); finish, and the order is created just like the quick dialog - but through a
guided, staged flow.

---

### Where this came from

`sap.m.Wizard`, `sap.m.WizardStep`, the `validated` gating and the `finish` event follow
the SAPUI5 "Wizard" documentation and API Reference at <https://ui5.sap.com/>. The create
logic reuses Lesson 17's V4 `create`.
