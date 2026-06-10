const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const comp = read("webapp/Component.js");
const manifest = JSON.parse(read("webapp/manifest.json"));
describe("Lesson 9 Stage 1 - set up the router", () => {
	test("the Component starts the router after init", () => {
		expect(/getRouter\(\)\.initialize\(\)/.test(comp)).toBe(true);
	});
	test("the manifest has a routing config that targets the App control", () => {
		const r = manifest["sap.ui5"].routing;
		expect(r.config.controlId).toBe("app");
		expect(r.config.controlAggregation).toBe("pages");
	});
	test("a default 'list' route shows the list view", () => {
		const r = manifest["sap.ui5"].routing;
		const list = r.routes.find((x) => x.name === "list");
		expect(list).toBeDefined();
		expect(list.pattern).toBe("");
		expect(r.targets.list).toBeDefined();
	});
	test("the root view is the App shell that hosts routed pages", () => {
		expect(/<App\s+id="app"/.test(read("webapp/view/App.view.xml"))).toBe(true);
	});
});
