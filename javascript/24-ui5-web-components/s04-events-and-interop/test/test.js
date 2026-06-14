const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const ctrl = read("webapp/control/Rating.js");
describe("Lesson 24 Stage 4 - events and interop", () => {
	test("the wrapper exposes a web-component event as a UI5 event", () => {
		expect(/events\s*:/.test(ctrl)).toBe(true);
		expect(/change\s*:/.test(ctrl)).toBe(true);
	});
});
