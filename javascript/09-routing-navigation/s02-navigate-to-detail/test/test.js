const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const list = read("webapp/controller/List.controller.js");
const manifest = JSON.parse(read("webapp/manifest.json"));
describe("Lesson 9 Stage 2 - navigate to a detail route", () => {
	test("a detail view and controller exist", () => {
		expect(has("webapp/view/Detail.view.xml")).toBe(true);
		expect(has("webapp/controller/Detail.controller.js")).toBe(true);
	});
	test("a 'detail' route with a parameter is configured", () => {
		const r = manifest["sap.ui5"].routing;
		const d = r.routes.find((x) => x.name === "detail");
		expect(d).toBeDefined();
		expect(/\{\w+\}/.test(d.pattern)).toBe(true);
		expect(r.targets.detail).toBeDefined();
	});
	test("pressing an order navigates to the detail route with a parameter", () => {
		expect(/navTo\(\s*["']detail["']\s*,/.test(list)).toBe(true);
	});
});
