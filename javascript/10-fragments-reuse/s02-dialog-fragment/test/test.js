const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const ctrl = read("webapp/controller/List.controller.js");
describe("Lesson 10 Stage 2 - a dialog fragment", () => {
	test("the CreateOrder dialog fragment exists", () => {
		expect(has("webapp/view/fragment/CreateOrder.fragment.xml")).toBe(true);
		expect(/<Dialog/.test(read("webapp/view/fragment/CreateOrder.fragment.xml"))).toBe(true);
	});
	test("onCreate loads the dialog fragment and opens it", () => {
		expect(/loadFragment\(\s*\{\s*name\s*:\s*["']ui5\.sales\.view\.fragment\.CreateOrder["']/.test(ctrl)).toBe(true);
		expect(/\.open\(\)/.test(ctrl)).toBe(true);
	});
});
