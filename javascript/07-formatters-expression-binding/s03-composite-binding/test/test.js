const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
const fmt = read("webapp/model/formatter.js");
describe("Lesson 7 Stage 3 - composite binding", () => {
	test("a binding combines several fields via parts", () => {
		expect(/parts\s*:\s*\[[^\]]+\]/.test(view)).toBe(true);
	});
	test("the composite binding runs through a formatter", () => {
		expect(/parts\s*:\s*\[[^\]]+\][^}]*formatter\s*:/.test(view)).toBe(true);
	});
	test("the formatter module provides the combining function", () => {
		expect(/customerLine\s*\(/.test(fmt)).toBe(true);
	});
});
