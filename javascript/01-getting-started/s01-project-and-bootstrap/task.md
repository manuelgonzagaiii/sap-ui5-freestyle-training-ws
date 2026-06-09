# Stage 1 - The project and the bootstrap

Welcome. Over this whole course you will build one real application,
**Sales Order Management**, the kind of app an SAP business uses to look after
its products, customers and sales orders. We start at the very bottom: a single
web page that loads the SAPUI5 framework. By the end of this stage you will
understand what a UI5 app actually *is* and you will have wired up its starting
point yourself.

## First, the big picture: what is a SAPUI5 app, really?

It is easy to think of UI5 as something mysterious and "SAP-only". It is not.
Strip away the buzzwords and a UI5 app is just **three kinds of files that a
normal web browser already knows how to run**:

- **HTML** - the page skeleton.
- **JavaScript** - the logic and the user interface.
- **CSS** - the styling.

SAPUI5 itself is a large **JavaScript framework**. Your browser downloads it and
runs it, exactly like it would run any other website. There is no magic compiler
and nothing SAP-specific happening in the browser - it is plain web technology.
That is good news: everything you already know about the web still applies.

So what does the framework give you that plain HTML does not? Three big things,
which this course is really about:

1. **Ready-made UI building blocks** called *controls* (buttons, tables, input
   fields, whole page layouts) that already look and behave like professional
   SAP software.
2. **Data binding** - a way to connect those controls to your data so the screen
   updates automatically when the data changes, and you do not write that glue
   code by hand.
3. **Structure** - proven patterns (Model-View-Controller, components, routing)
   so a large app stays organised and maintainable.

We will meet all three. For now, our only job is to get the framework to load.

## The project layout

Look at the files in this stage. This is the standard, recommended shape of a
UI5 app:

```
ui5.sales/
├── webapp/            <- everything the browser will load lives in here
│   ├── index.html     <- the single web page (the entry point)
│   └── manifest.json  <- the app's "ID card" (we expand it in Lesson 2)
├── ui5.yaml           <- config for the UI5 command-line tools
└── package.json       <- Node.js project file (dependencies + scripts)
```

**Why a `webapp/` folder?** It is a strong convention in the UI5 world: *only*
the files inside `webapp/` are meant to be served to the browser. Keeping them in
one folder cleanly separates "the app the user downloads" from "developer tooling
and config that stays on your machine" (`ui5.yaml`, `package.json`, tests). The
UI5 build tool assumes this layout, so following it means everything else just
works. You *can* name it differently, but you would then have to reconfigure the
tooling for no real benefit - so we follow the convention.

**Why is there only one HTML page?** Because UI5 apps are **Single-Page
Applications (SPAs)**. The browser loads `index.html` once, and from then on
JavaScript builds and rebuilds the screen as the user navigates - no full page
reloads. This is what makes the app feel fast and app-like instead of like a
classic website that reloads on every click. The cost is that the first load has
to pull in the framework; we will spend a whole lesson later (Performance) making
that fast.

## The star of this stage: the bootstrap

Open `webapp/index.html`. The most important part is this `<script>` tag, called
the **bootstrap**:

```html
<script
    id="sap-ui-bootstrap"
    src="resources/sap-ui-core.js"
    data-sap-ui-theme="sap_horizon"
    ... >
</script>
```

"Bootstrapping" just means **loading and starting up the framework**. This one
script tag is how a plain HTML page becomes a UI5 application. Let us go through
every attribute, because each one is a real decision a developer makes.

- **`src="resources/sap-ui-core.js"`** - already done for you. This loads
  `sap-ui-core.js`, a small *loader*. It does **not** contain the whole
  framework; it knows how to fetch the rest **on demand**. That on-demand loading
  is a core UI5 performance idea: the browser only downloads the parts your app
  actually uses.
  - *Why `resources/...`?* When you run the app with the UI5 tooling (stage 4),
    the tool serves the framework under the `resources/` path. So this relative
    URL resolves to the framework on your own machine - no internet needed once
    set up.

- **`data-sap-ui-theme`** - the visual theme (colours, spacing, fonts). We use
  **`sap_horizon`**, the current modern SAP theme (the "Morning Horizon" look).
  - *Why this and not others?* Older apps used themes like `sap_belize` or
    `sap_fiori_3`. Those still exist but are previous generations. Best practice
    today is the Horizon family, so trainees should default to it. (Horizon also
    ships dark and high-contrast variants, which we use in the Accessibility and
    Theming lessons.)

- **`data-sap-ui-libs`** - which framework **libraries** to load up front. A
  library is a bundle of related controls. **`sap.m`** is the main library of
  responsive controls (buttons, inputs, lists, pages) used in every modern UI5
  app - the "m" originally stood for *mobile*, because these controls adapt to
  any screen size.
  - *Trade-off:* listing a library here loads it eagerly at start-up. That is
    fine for libraries you know you need immediately (like `sap.m`). For others
    it is better to declare them in `manifest.json` (Lesson 2) so the framework
    can load them more cleverly. Loading everything eagerly would slow the first
    paint - a common beginner mistake.

- **`data-sap-ui-compatVersion="edge"`** - sets the compatibility behaviour to
  **`edge`**, meaning "use the latest, most modern default behaviours of the
  framework". The alternative is pinning an old version number to keep
  long-deprecated behaviour. For new apps, `edge` is the right, modern choice.

- **`data-sap-ui-async="true"`** - load framework files **asynchronously**
  (in parallel, without blocking the page). This is one of the most important
  performance settings in all of UI5.
  - *Why it matters:* the old, synchronous way loaded files one-by-one and froze
    the browser while doing so. Async loading is faster and is **mandatory best
    practice**. You will see this same "always async" principle again in the
    component, the views, and the build.

- **`data-sap-ui-resourceroots`** - this is a small JSON object that maps a
  **namespace** to a **folder**. We map `"ui5.sales"` to `"./"` (the current
  folder, i.e. `webapp/`).
  - *What is a namespace?* It is a unique name for your app, written with dots,
    like a package name: `ui5.sales`. Later, when our code asks for a file like
    `ui5.sales.controller.App`, the framework uses this mapping to find it on
    disk at `webapp/controller/App.js`. Getting this mapping right is what lets
    the framework locate *your* files (as opposed to the framework's own files).

- **`data-sap-ui-onInit`** - which of *your* modules to run once the framework
  has finished loading. We point it at `module:ui5/sales/index`, which resolves
  (via the namespace mapping above) to `webapp/index.js`.
  - *Why it matters:* the bootstrap loads the framework, but the framework has no
    idea what *your* app wants to do. `onInit` is the hand-off point - the single
    line that says "now run my code". Right now `index.js` is an empty start-up
    module; you give it something to do in the next stage. The older approach was
    to put a `<script>` with your code lower in the page; pointing the bootstrap
    at a proper module is the modern, recommended way.

Finally, the body:

```html
<body class="sapUiBody" id="content">
</body>
```

- **`id="content"`** - an empty container. Right now nothing is inside it. In the
  next stages, our JavaScript will render UI5 controls *into* this element. Think
  of it as the stage on which the whole app will be drawn.
- **`class="sapUiBody"`** - applies UI5's base page styling (the right background
  colour and font) so the page matches the theme.

## The two config files (a quick orientation)

You do not need to master these yet - we devote stage 4 to the tooling - but you
should know what they are:

- **`ui5.yaml`** tells the **UI5 command-line tools** how to serve and build this
  project: that it is an `application`, which framework version to use
  (`OpenUI5 1.148.0`), and which libraries to fetch. This is what provides that
  `resources/` path the bootstrap relies on.
- **`package.json`** lives at the **project root** (not in this folder). It is
  the standard Node.js project file and lists two developer tools: the test
  runner that powers the **Check** button, and `@ui5/cli` (the UI5 tooling you
  use to run the app). It is for your development machine only; it is never
  shipped to users. You install it once with `npm install` at the root.

There are two more small files here:

- **`webapp/index.js`** - your application's start-up module, the one the
  bootstrap's `onInit` points at. For now it is empty; you fill it in next stage.
- **`webapp/manifest.json`** is, for now, almost empty - it just declares the
  app's id (`ui5.sales`). It grows into the app's full "descriptor" (its ID card)
  in Lesson 2, where it becomes one of the most important files in the project.

## Your coding task

Open `webapp/index.html`. The six values in the bootstrap are shown as blanks
(highlighted placeholders such as "theme name"). Fill each one in:

1. `data-sap-ui-theme` -> a modern Horizon theme
2. `data-sap-ui-libs` -> the responsive controls library
3. `data-sap-ui-compatVersion` -> the recommended "latest defaults" value
4. `data-sap-ui-async` -> turn asynchronous loading on
5. `data-sap-ui-resourceroots` -> a JSON object mapping the namespace to `./`
6. `data-sap-ui-onInit` -> run your start-up module, written as
   `module:ui5/sales/index`

If you get stuck, use **Peek Solution** to reveal a correct answer. When you are
done, press **Check**.

## What the check verifies (and why) - and where you are free

This check follows the course's guiding rule: **it enforces what must be valid,
but lets you make your own design choices.** Think of it as the rule of law -
strict on what is genuinely right or wrong, free everywhere else.

You are **free** to choose:

- **The theme** - any real Horizon variant passes: `sap_horizon` (light),
  `sap_horizon_dark`, `sap_horizon_hcb` / `sap_horizon_hcw` (high contrast). Pick
  the look you like.
- **Extra libraries** - loading more than `sap.m` is fine.
- **The compatibility value** - `edge` (recommended) *or* a real version number
  like `1.120` both pass.

The check **insists** on (because the app would otherwise be wrong or broken):

- **`async` must be `true`.** Synchronous loading is bad practice in modern UI5,
  so there is no design freedom here.
- **`sap.m` must be loaded.** Every control we use lives there.
- **A real theme name.** An invented name like `ocean_blue` fails - it is not a
  valid value.
- **`resourceroots` must be valid JSON mapping `ui5.sales` to `./`.** We actually
  parse it as JSON, because a single missing quote or brace is one of the most
  common reasons a real app silently fails to find its own files. The namespace
  is fixed by this guided project, since later code depends on it.
- **`onInit` must run `module:ui5/sales/index`.** This is the line that starts
  your code; if it is wrong, the app loads the framework and then does nothing.

So if you and a classmate hand in different files - one light theme, one dark,
one pinning a version - **you can both be correct.** That is intentional. You are
learning to make valid decisions, not to memorise one answer.

## Run it yourself

The course's tools (the Jest grader plus the UI5 tooling) install once, from the
**project root**:

```
npm install
```

Then launch this stage's app in a browser by running the UI5 dev server from
**this stage's folder** (it reads the `ui5.yaml` here):

```
npx ui5 serve --open index.html
```

The browser opens a **blank page**. That is the correct result for this stage,
and it is worth understanding *why*: the framework has loaded successfully, but
we have not told it to draw anything into `#content` yet. We do that in stage 2
and 3. If you open the browser's developer console (F12) and see no red errors,
your bootstrap is working.

---

### Where this came from

The bootstrap structure and attribute values follow the official **SAPUI5
Walkthrough, Steps 1-2** (source: `UI5/openui5`,
`src/sap.m/test/sap/m/demokit/tutorial/walkthrough/01` and `02`) and the project
layout follows the official **`UI5/sample-app`** (`ui5.yaml`, `package.json`).
The application domain (Sales Order Management) and the `ui5.sales` namespace are
this course's own choice. The OpenUI5 version `1.148.0` is the version used by
`UI5/sample-app` at the time of writing - check <https://ui5.sap.com/> for the
latest released version.
