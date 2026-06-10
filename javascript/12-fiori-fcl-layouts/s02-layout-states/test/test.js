const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const ctrl = read("webapp/controller/Detail.controller.js");
describe("Lesson 12 Stage 2 - layout states", () => {
	test("a full-screen action sets a valid FCL layout", () => {
		const m = ctrl.match(/setProperty\(\s*["']\/layout["']\s*,\s*["'](\w+)["']/);
		expect(m).not.toBeNull();
		expect(["MidColumnFullScreen", "EndColumnFullScreen", "OneColumn", "TwoColumnsMidExpanded", "TwoColumnsBeginExpanded", "ThreeColumnsMidExpanded"]).toContain(m[1]);
	});
	test("a close action returns to the single-column list", () => {
		expect(/navTo\(\s*["']list["']\s*\)/.test(ctrl)).toBe(true);
	});
});
