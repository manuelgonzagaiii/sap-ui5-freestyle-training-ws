# Stage 3 - Transpilation and linting

We have written modern JavaScript - arrow functions, `const`, modules - and it has run
because the browsers we target understand it. But UI5 also lets you write **TypeScript** or
bleeding-edge JS and **transpile** it down to what every supported browser runs. That is a
build-time concern, plugged into the tooling as a **middleware** (dev) and a **task**
(build). This stage adds it - and it is the bridge to the TypeScript track.

## Why transpile

- **TypeScript** - the TS track of this course is written in TypeScript, which browsers do
  not run directly; it must be **transpiled to JavaScript** first. The same plugin handles
  it.
- **Modern JS for old targets** - if you must support an older browser, transpilation
  rewrites modern syntax into compatible code.

The community/SAP package **`ui5-tooling-transpile`** does this, in two halves that mirror
the tooling's two modes:

```yaml
server:
  customMiddleware:
    - name: ui5-tooling-transpile-middleware
      afterMiddleware: compression
builder:
  customTasks:
    - name: ui5-tooling-transpile-task
      afterTask: replaceVersion
```

- **`ui5-tooling-transpile-middleware`** - transpiles **on the fly during `ui5 serve`**, so
  you edit TS/modern JS and the dev server delivers runnable JS.
- **`ui5-tooling-transpile-task`** - transpiles **during `ui5 build`**, so `dist/` contains
  plain, compatible JavaScript.

This is exactly what makes the **TypeScript track** of this course build and run with the
same tooling - the only addition is this plugin and a `tsconfig`. (`ui5-tooling-transpile`
is an npm add-on, not part of the core CLI - from the author's knowledge; verify the
package name and config against its docs for your setup.)

## Linting

Alongside transpilation, **linting** keeps code consistent and catches mistakes before they
run. UI5 projects use **ESLint** (often with UI5-aware rules) and, for the descriptors and
project structure, SAP's own checks. Wire the linter into your editor and CI so it runs on
every change - the cheapest quality gate there is.

## Your coding task

In `ui5.yaml`, add the **build task that transpiles** modern JS/TS
(`ui5-tooling-transpile-task`). The middleware is configured for you.

## What the check verifies (and where you are free)

- A **transpile task and middleware** are configured.
- The exact `afterTask`/`afterMiddleware` anchors are configurable; the check requires that
  both halves of transpilation are wired.

## Run it yourself

With the middleware in place, `ui5 serve` will serve transpiled output; with the task,
`ui5 build` writes compatible JS to `dist/`. This is the switch that lets the TypeScript
track run on the very same toolchain.

---

### Where this came from

`ui5-tooling-transpile` (middleware and task), its role for TypeScript and modern-JS
transpilation, and ESLint for UI5 follow the UI5 Tooling ecosystem documentation at
<https://sap.github.io/ui5-tooling/> and the `ui5-tooling-transpile` project. The package
specifics are from the author's knowledge - verify them for your version.
