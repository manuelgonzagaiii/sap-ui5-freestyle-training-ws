# SAPUI5 Freestyle — Guided Project

A JetBrains **EduTools guided project** that teaches SAPUI5 Freestyle from the
very basics to its most advanced (and rarely used) features by building **one
real SAP-style business app**: **Sales Order Management** (Products · Sales
Orders · Customers) with a Fiori user experience.

## How this course is organised

This is a **guided project**, so each lesson is an EduTools **framework lesson**:
your app code propagates from one stage to the next, and each lesson continues
the app where the previous one left off. You are always working on the *same*
growing application.

Two parallel tracks are provided as top-level sections:

| Folder | Track | Notes |
| --- | --- | --- |
| [`javascript/`](javascript) | JavaScript | 30 lessons, the full curriculum |
| [`typescript/`](typescript) | TypeScript | Same 30 lessons + a `00-typescript-setup` prologue |

See [CURRICULUM.md](CURRICULUM.md) for the full lesson-by-lesson roadmap.

## Prerequisites

- Solid **JavaScript** (and **TypeScript** for the TS track). These languages
  are **not** taught here.
- **Node.js 20+** and **npm**.
- A JetBrains IDE (WebStorm / IntelliJ Ultimate) with the **EduTools** plugin.

## Backend — free & open source only

No S/4HANA or paid satellite systems are required. The course uses only tooling
a trainee can run locally:

1. **UI5 mock server** for the early lessons (no backend process at all).
2. **SAP CAP + SQLite** from Lesson 15 onward — SAP's own open-source framework,
   serving real **OData V4** (drafts, `$batch`, annotations) entirely on your
   machine.

## Status

**Skeleton.** The section/lesson structure and roadmap are in place. Each
lesson currently has a single *Overview & roadmap* stage; we populate the
hands-on stages **section by section**.

## References

- SAPUI5 Demo Kit — https://ui5.sap.com/
- UI5 tutorials — https://github.com/UI5/tutorials
- UI5 org repositories — https://github.com/UI5
- SAP CAP — https://cap.cloud.sap/
