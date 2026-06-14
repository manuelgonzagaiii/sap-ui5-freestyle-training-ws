const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const list = read("webapp/controller/List.controller.js");
const view = read("webapp/view/List.view.xml");
const html = read("webapp/index.html");
describe("Lesson 21 Stage 1 - theme", () => {
	test("the bootstrap sets a valid SAP theme", () => {
		const m = html.match(/data-sap-ui-theme\s*=\s*["']([^"']+)["']/);
		expect(m).not.toBeNull();
		expect(/^sap_[a-z0-9_]+$/.test(m[1])).toBe(true);
	});
	test("the controller switches the theme at runtime via the Theming module", () => {
		expect(/["']sap\/ui\/core\/Theming["']/.test(list)).toBe(true);
		expect(/Theming\.setTheme\(/.test(list)).toBe(true);
	});
	test("every theme id passed to setTheme is a valid sap_ theme", () => {
		const call = list.match(/Theming\.setTheme\(([^;]*)\)/);
		expect(call).not.toBeNull();
		const ids = call[1].match(/["']([^"']+)["']/g) || [];
		expect(ids.length).toBeGreaterThan(0);
		ids.forEach((q) => expect(/^["']sap_[a-z0-9_]+["']$/.test(q)).toBe(true));
	});
	test("a control triggers the theme switch", () => { expect(/press\s*=\s*["']\.onToggleTheme["']/.test(view)).toBe(true); });
});
