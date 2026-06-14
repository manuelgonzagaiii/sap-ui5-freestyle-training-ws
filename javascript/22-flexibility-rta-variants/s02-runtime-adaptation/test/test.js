const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const list = read("webapp/controller/List.controller.js");
const manifest = JSON.parse(read("webapp/manifest.json"));
const view = read("webapp/view/List.view.xml");
describe("Lesson 22 Stage 2 - RTA", () => {
	test("the RTA library is declared", () => {
		expect(Object.keys(manifest["sap.ui5"].dependencies.libs)).toContain("sap.ui.rta");
	});
	test("the controller starts runtime adaptation", () => {
		expect(/sap\/ui\/rta\/api\/startKeyUserAdaptation/.test(list)).toBe(true);
		expect(/startKeyUserAdaptation\(/.test(list)).toBe(true);
	});
	test("a control launches adaptation", () => { expect(/press\s*=\s*["']\.onStartAdaptation["']/.test(view)).toBe(true); });
});
