const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const ctrl = read("webapp/controller/List.controller.js");
const view = read("webapp/view/List.view.xml");
describe("Lesson 30 Stage 2 - intent navigation", () => {
	test("it navigates by intent through the launchpad service", () => {
		expect(/getServiceAsync\(\s*["']CrossApplicationNavigation["']\s*\)/.test(ctrl)).toBe(true);
		expect(/toExternal\(/.test(ctrl)).toBe(true);
		expect(/semanticObject\s*:/.test(ctrl)).toBe(true);
	});
	test("a control triggers the navigation", () => { expect(/press\s*=\s*["']\.onOpenCustomerApp["']/.test(view)).toBe(true); });
});
