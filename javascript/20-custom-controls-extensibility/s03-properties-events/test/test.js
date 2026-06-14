const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const ctrl = read("webapp/control/PriorityIndicator.js");
const view = read("webapp/view/List.view.xml");
describe("Lesson 20 Stage 3 - properties, events, binding", () => {
	test("the control declares a 'press' event in metadata", () => {
		expect(/events\s*:[\s\S]*press\s*:/.test(ctrl)).toBe(true);
	});
	test("it fires the event (firePress)", () => { expect(/firePress\(\)/.test(ctrl)).toBe(true); });
	test("the list uses the custom control, bound and with a press handler", () => {
		expect(/xmlns:sales\s*=\s*["']ui5\.sales\.control["']/.test(view)).toBe(true);
		expect(/<sales:PriorityIndicator[^>]*value\s*=\s*["']\{priority\}["']/.test(view)).toBe(true);
		expect(/<sales:PriorityIndicator[^>]*press\s*=/.test(view)).toBe(true);
	});
});
