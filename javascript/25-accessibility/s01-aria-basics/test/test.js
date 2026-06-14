const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const ctrl = read("webapp/control/PriorityIndicator.js");
describe("Lesson 25 Stage 1 - ARIA basics", () => {
	test("the custom control writes an accessible name", () => {
		expect(/aria-label/.test(ctrl)).toBe(true);
		expect(/rm\.attr\(\s*["']aria-label["']/.test(ctrl)).toBe(true);
	});
	test("it keeps its semantic role and is focusable", () => {
		expect(/rm\.attr\(\s*["']role["']/.test(ctrl)).toBe(true);
		expect(/rm\.attr\(\s*["']tabindex["']/.test(ctrl)).toBe(true);
	});
});
