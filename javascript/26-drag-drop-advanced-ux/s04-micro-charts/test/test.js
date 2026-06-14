const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const view = read("webapp/view/List.view.xml");
const manifest = JSON.parse(read("webapp/manifest.json"));
describe("Lesson 26 Stage 4 - micro charts", () => {
	test("the microchart library is declared", () => {
		expect(Object.keys(manifest["sap.ui5"].dependencies.libs)).toContain("sap.suite.ui.microchart");
	});
	test("a micro chart is shown, bound to data", () => {
		expect(/xmlns:microchart\s*=\s*["']sap\.suite\.ui\.microchart["']/.test(view)).toBe(true);
		expect(/<microchart:RadialMicroChart[^>]*percentage\s*=\s*["']\{[^}]+\}["']/.test(view)).toBe(true);
	});
});
