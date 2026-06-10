const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const app = read("webapp/view/App.view.xml");
const appCtrl = read("webapp/controller/App.controller.js");
const manifest = JSON.parse(read("webapp/manifest.json"));
describe("Lesson 12 Stage 1 - FlexibleColumnLayout", () => {
	test("the root view is a FlexibleColumnLayout whose layout is bound", () => {
		expect(/<f:FlexibleColumnLayout[^>]*id="fcl"/.test(app)).toBe(true);
		expect(/layout\s*=\s*"\{fcl>\/layout\}"/.test(app)).toBe(true);
	});
	test("routing uses the sap.f router with column aggregations", () => {
		const r = manifest["sap.ui5"].routing;
		expect(r.config.routerClass).toBe("sap.f.routing.Router");
		expect(r.targets.list.controlAggregation).toBe("beginColumnPages");
		expect(r.targets.detail.controlAggregation).toBe("midColumnPages");
	});
	test("the detail route opens a two-column layout", () => {
		const d = manifest["sap.ui5"].routing.routes.find((x) => x.name === "detail");
		expect(d.layout).toBe("TwoColumnsMidExpanded");
	});
	test("the App controller updates the layout on every navigation", () => {
		expect(/attachRouteMatched\(/.test(appCtrl)).toBe(true);
		expect(/getModel\(\s*["']fcl["']\s*\)\.setProperty\(/.test(appCtrl)).toBe(true);
	});
});
