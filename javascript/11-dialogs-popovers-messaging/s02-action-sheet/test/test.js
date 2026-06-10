const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const ctrl = read("webapp/controller/Detail.controller.js");
describe("Lesson 11 Stage 2 - action sheet (popover family)", () => {
	test("a MoreActions ActionSheet fragment exists", () => {
		expect(has("webapp/view/fragment/MoreActions.fragment.xml")).toBe(true);
		expect(/<ActionSheet/.test(read("webapp/view/fragment/MoreActions.fragment.xml"))).toBe(true);
	});
	test("the controller opens the sheet anchored to the button", () => {
		expect(/loadFragment\(\s*\{\s*name\s*:\s*["']ui5\.sales\.view\.fragment\.MoreActions["']/.test(ctrl)).toBe(true);
		expect(/\.openBy\(/.test(ctrl)).toBe(true);
	});
});
