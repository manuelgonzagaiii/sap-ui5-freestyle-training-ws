const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const ctrl = read("webapp/control/PriorityIndicator.js");
describe("Lesson 20 Stage 2 - the renderer", () => {
	test("the renderer uses apiVersion 2", () => { expect(/apiVersion\s*:\s*2/.test(ctrl)).toBe(true); });
	test("it opens an element bound to the control (openStart with the control)", () => {
		expect(/openStart\(\s*["'][a-z]+["']\s*,\s*oControl\s*\)/.test(ctrl)).toBe(true);
	});
	test("it writes a CSS class and the value text", () => {
		expect(/\.class\(/.test(ctrl)).toBe(true);
		expect(/\.text\(/.test(ctrl)).toBe(true);
	});
});
