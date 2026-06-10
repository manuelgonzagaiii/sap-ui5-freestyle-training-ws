const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const detail = read("webapp/controller/Detail.controller.js");
const detailView = read("webapp/view/Detail.view.xml");
const manifest = JSON.parse(read("webapp/manifest.json"));
describe("Lesson 9 Stage 4 - back navigation and not-found", () => {
	test("the detail page's nav button is wired to a back handler", () => {
		expect(/navButtonPress\s*=\s*"\.?\w+"/.test(detailView)).toBe(true);
	});
	test("the back handler navigates to the list route", () => {
		expect(/navTo\(\s*["']list["']\s*\)/.test(detail)).toBe(true);
	});
	test("a not-found target catches unmatched URLs", () => {
		const r = manifest["sap.ui5"].routing;
		expect(r.targets.notFound).toBeDefined();
		expect(r.config.bypassed && r.config.bypassed.target).toBe("notFound");
	});
});
