const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
const ctrl = read("webapp/controller/App.controller.js");

describe("Lesson 3 Stage 1 - your first controller", () => {
	test("the view names its controller ui5.sales.controller.App", () => {
		expect(/controllerName\s*=\s*"ui5\.sales\.controller\.App"/.test(view)).toBe(true);
	});
	test("the controller extends Controller with that same name", () => {
		expect(/Controller\.extend\(\s*["']ui5\.sales\.controller\.App["']/.test(ctrl)).toBe(true);
	});
	test("the button is wired to a handler, and that handler exists on the controller", () => {
		const m = view.match(/press\s*=\s*"\.?(\w+)"/);
		expect(m).not.toBeNull();
		const handler = m[1];
		expect(new RegExp("\\b" + handler + "\\s*\\(").test(ctrl)).toBe(true);
	});
	test("the handler gives the user feedback (the wording is yours)", () => {
		expect(/MessageToast\.show\(\s*["'][^"']+["']/.test(ctrl)).toBe(true);
	});
});
