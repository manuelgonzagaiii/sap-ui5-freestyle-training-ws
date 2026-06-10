# Stage 4 - Inline messaging (MessageStrip)

Not every message should interrupt. A toast is fleeting, a MessageBox blocks the
screen - but sometimes you want a message that simply *stays on the page*, in
context, as long as it is relevant. "This order has been cancelled" is exactly that:
a standing note that belongs next to the order, not a pop-up. The control for it is
the **`sap.m.MessageStrip`**, and wiring it to the data with expression binding is a
satisfying way to close this lesson.

## MessageStrip: a message that lives in the page

A `MessageStrip` is a coloured inline banner - a strip of text with an icon, in one
of the four semantic colours. It sits in the content flow, not over it:

```xml
<MessageStrip
    text="{i18n>cancelledMessage}"
    type="Warning"
    showIcon="true"
    visible="{= ${status} === 'Cancelled' }" />
```

- **`type`** - `Information`, `Success`, `Warning` or `Error`, which sets the colour
  and icon. (Same semantic-colour idea as the `ObjectStatus` from Lesson 7.)
- **`showIcon`** - whether to show the matching icon.
- **`visible="{= ${status} === 'Cancelled' }"`** - this is the clever part. Using
  the **expression binding** from Lesson 7, the strip shows **only when the bound
  order's status is "Cancelled"**, and hides itself otherwise. No controller code:
  the data decides whether the message appears.

Open a cancelled order and the warning is there; open any other and it is gone. The
message is driven entirely by the data, in context, for exactly as long as it
applies. That is the niche `MessageStrip` fills perfectly: a persistent,
contextual, non-intrusive note.

## The full messaging picture

You have now met UI5's whole feedback spectrum, and it is worth seeing it as one
toolkit:

| Tool | Intrusiveness | Use for |
| --- | --- | --- |
| `MessageToast` | lowest - fleeting | "Saved", quiet confirmations |
| `MessageStrip` | low - inline, persistent | contextual notes on the page |
| `MessageBox` | high - blocks the screen | questions, errors to acknowledge |
| `MessagePopover` + Message Manager | structured | a *list* of validation messages |

The last one - the **Message Manager** feeding a **`MessagePopover`** - is the
heavyweight: it collects validation messages from across a form into one place the
user can review. It deserves a real form to shine, so we build it properly in
**Lesson 13 (Forms & Validation)**. For now, know it exists and where it fits.

The mental model to carry out of this lesson: **match the message to the moment.**
Fleeting success -> toast. Standing context -> strip. A decision -> box. A pile of
validation errors -> the message popover. A thoughtful developer reaches for the
right one instead of using a blocking dialog for everything.

## Your coding task

In `Detail.view.xml`, complete the `MessageStrip`'s `visible` expression so it shows
**only for cancelled orders**.

## What the check verifies (and where you are free)

- A **`MessageStrip`** is shown for the order.
- It appears **only for cancelled orders, via expression binding** that references
  the status. The exact condition is yours to shape - you might also warn on a
  different status - as long as it is a valid expression binding driven by the data.

## End of Lesson 11

The app can now hold a proper conversation with its user: it confirms destructive
actions, offers contextual menus from anchored pop-ups, shows it is working during
waits, and surfaces standing notes inline - each with the right level of
intrusiveness. That fluency in feedback is what makes software feel considerate.

In **Lesson 12** we step up to **Fiori layouts**: the `FlexibleColumnLayout` that
shows the list and detail side by side, the `DynamicPage` with its snapping header,
and the `ObjectPageLayout` - the signature page patterns that make an app look and
behave like real SAP Fiori software.

---

### Where this came from

`sap.m.MessageStrip` and the messaging overview follow the SAPUI5 API Reference and
"Message Handling" documentation at <https://ui5.sap.com/>. The cancelled-order note
is this course's own; the Message Manager / MessagePopover are covered in full in
Lesson 13.
