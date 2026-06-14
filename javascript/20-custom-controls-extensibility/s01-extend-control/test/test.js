const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const ctrl = read("webapp/control/PriorityIndicator.js");
describe("Lesson 20 Stage 1 - a custom control", () => {
	test("it extends sap.ui.core.Control", () => {
		expect(/Control\.extend\(\s*["']ui5\.sales\.control\.PriorityIndicator["']/.test(ctrl)).toBe(true);
		expect(/["']sap\/ui\/core\/Control["']/.test(ctrl)).toBe(true);
	});
	test("its metadata declares a 'value' property", () => {
		expect(/metadata\s*:/.test(ctrl)).toBe(true);
		expect(/properties\s*:[\s\S]*value\s*:/.test(ctrl)).toBe(true);
	});
	test("it has a renderer (modern apiVersion 2)", () => {
		expect(/renderer\s*:/.test(ctrl)).toBe(true);
		expect(/apiVersion\s*:\s*2/.test(ctrl)).toBe(true);
	});
});
