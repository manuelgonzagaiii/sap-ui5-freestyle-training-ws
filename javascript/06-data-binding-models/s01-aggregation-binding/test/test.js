const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
const raw = read("webapp/model/salesOrders.json");
const manifest = read("webapp/manifest.json");
describe("Lesson 6 Stage 1 - models and aggregation binding", () => {
	test("the data file is valid JSON with a salesOrders array", () => {
		const data = JSON.parse(raw);
		expect(Array.isArray(data.salesOrders)).toBe(true);
		expect(data.salesOrders.length).toBeGreaterThan(0);
	});
	test("the default model is declared in the manifest, loaded from the data file", () => {
		const m = JSON.parse(manifest)["sap.ui5"].models[""];
		expect(m.type).toMatch(/JSONModel/);
		expect(m.uri).toMatch(/salesOrders\.json/);
	});
	test("a List binds its items aggregation to the salesOrders collection", () => {
		expect(/items\s*=\s*"\{\/salesOrders\}"/.test(view)).toBe(true);
	});
	test("the item template uses relative bindings (e.g. {customer})", () => {
		expect(/\{customer\}/.test(view)).toBe(true);
	});
});
