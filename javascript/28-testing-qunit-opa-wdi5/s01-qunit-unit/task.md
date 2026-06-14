# Stage 1 - Unit testing with QUnit

A feature is not finished until it is **tested** - and from here on we use the *subject's
own* testing tools, not the grader. (Important distinction: the green/red **Check** in this
course is run by Jest, which grades your *lessons*. The tests in this lesson - **QUnit**,
**OPA5**, **wdi5** - are how you test a *real UI5 app*. They are different tools for
different jobs, and this lesson teaches the real-app ones.) We start at the base of the
**testing pyramid**: fast, isolated **unit tests** with **QUnit**.

## QUnit: the UI5 unit-test framework

**QUnit** is the framework UI5 itself is built and tested with, and the one its tooling
runs. A unit test takes one small piece - a formatter, a helper, a single function - and
checks its output for given inputs, in **isolation**, with no UI and no server. They run in
milliseconds, so you run hundreds of them constantly.

A QUnit test file has a simple shape:

```js
sap.ui.define(["ui5/sales/model/formatter"], (formatter) => {
    "use strict";

    QUnit.module("formatter.statusState");          // a group of related tests

    QUnit.test("maps known statuses to semantic states", (assert) => {
        assert.strictEqual(formatter.statusState("Completed"), "Success", "Completed -> Success");
        assert.strictEqual(formatter.statusState("In Process"), "Warning", "In Process -> Warning");
    });
});
```

- **`QUnit.module("...")`** - names a group of related tests (here, the `statusState`
  formatter).
- **`QUnit.test("...", (assert) => { ... })`** - one test case. The `assert` object carries
  the checks.
- **`assert.strictEqual(actual, expected, message)`** - the workhorse assertion: *actual
  must equal expected*, with a message shown in the result. (`assert.ok`, `assert.deepEqual`
  and others exist for other shapes.)

We test the `statusState` formatter from Lesson 7 - perfect unit-test material: pure input
to output, no dependencies. Give it `"Completed"`, expect `"Success"`.

## Your coding task

In `webapp/test/unit/model/formatter.qunit.js`, write the assertion that **`statusState("Completed")`
returns `"Success"`**.

## What the check verifies (and where you are free)

- The file is a **QUnit test module** (`QUnit.module` + `QUnit.test`).
- It **exercises the formatter** with **assertions**.
- *Which* cases you assert and your messages are **yours** - any real QUnit assertion of
  the formatter passes. The check grades that you wrote a valid unit test, not a specific
  one.

## Run it yourself

A UI5 app runs QUnit tests through a test page (`test/unit/unitTests.qunit.html`) opened in
the browser, or headless via the UI5 tooling / Karma. You see each test green or red with
its message. (Wiring the test runner page is part of the test setup - verify the exact
runner for your project against the docs.)

---

### Where this came from

QUnit (`QUnit.module`/`QUnit.test`/`assert`) as UI5's unit-test framework, and the
testing-pyramid positioning, follow the SAPUI5 "Unit Testing with QUnit" and "Testing"
documentation at <https://ui5.sap.com/>. The formatter under test is this course's own.
