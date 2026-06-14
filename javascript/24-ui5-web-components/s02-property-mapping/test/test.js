const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const ctrl = read("webapp/control/Rating.js");
describe("Lesson 24 Stage 2 - property mapping", () => {
	test("the wrapper maps web-component properties to UI5 properties", () => {
		expect(/properties\s*:/.test(ctrl)).toBe(true);
		expect(/value\s*:\s*\{[^}]*type\s*:/.test(ctrl)).toBe(true);
	});
});
