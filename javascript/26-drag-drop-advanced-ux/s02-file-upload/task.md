# Stage 2 - Attaching files with UploadSet

Business records need documents - a signed PO, a delivery note, a photo. UI5's modern
control for this is **`sap.m.upload.UploadSet`**: a complete file area with drag-to-upload,
a list of attachments, progress, and download/remove - mostly out of the box. We add an
**Attachments** section to the order detail.

## UploadSet

```xml
<mvc:View ... xmlns:upload="sap.m.upload" ...>
    ...
    <upload:UploadSet id="attachments" instantUpload="false" uploadEnabled="true" />
```

- **`UploadSet`** - renders the whole attachment experience: an "Add" button, a drop zone,
  and a list of uploaded items with icons, sizes and actions.
- **`uploadEnabled="true"`** - uploading is allowed.
- **`instantUpload="false"`** - the key behaviour choice: **collect files first, send on
  confirm**. With `false`, selected files queue up and are uploaded when you call
  `upload()` (typically on Save) - which fits our draft-style editing, where you stage
  changes and commit them together. With `true`, each file uploads the instant it is
  picked. Choosing between them is a real UX decision: batch-on-save vs immediate.

In a full app you would set `uploadUrl` to your backend's upload endpoint (CAP can expose
one) and handle the completion events. Here we focus on the control and the
instant-vs-deferred decision; wiring it to a real CAP upload endpoint is a worthwhile
extension to verify against your service.

(Legacy note: the older control was **`sap.m.UploadCollection`**. `UploadSet` is its
modern successor - prefer it for new work.)

## Your coding task

In `Detail.view.xml`, configure the `UploadSet` to **collect files first and upload on
confirm** (`instantUpload="false"`).

## What the check verifies (and where you are free)

- The detail page has an **`UploadSet`**.
- Its configuration (upload url, file-type restrictions, instant vs deferred) is **yours** -
  any valid UploadSet passes.

## Run it yourself

Open an order and scroll to **Attachments**: drag a file onto the area or use Add - it
appears in the list. With `instantUpload="false"` it waits to be sent; wire `uploadUrl`
and a Save action to push the queue to your backend.

---

### Where this came from

`sap.m.upload.UploadSet`, `instantUpload`/`uploadEnabled`/`uploadUrl`, and the deprecation
of `sap.m.UploadCollection` follow the SAPUI5 "UploadSet" documentation and API Reference
at <https://ui5.sap.com/>. Wiring to a CAP upload endpoint is left to verify.
