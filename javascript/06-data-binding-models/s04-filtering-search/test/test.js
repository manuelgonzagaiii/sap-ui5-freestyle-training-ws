const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
const ctrl = read("webapp/controller/App.controller.js");
describe("Lesson 6 Stage 4 - filtering and search", () => {
	test("a SearchField is wired to a search handler", () => {
		expect(/<SearchField[^>]*search\s*=\s*"\.?\w+"/.test(view)).toBe(true);
	});
	test("the handler builds a Filter with a FilterOperator", () => {
		expect(/new\s+Filter\(/.test(ctrl)).toBe(true);
		expect(/FilterOperator\.\w+/.test(ctrl)).toBe(true);
	});
	test("the handler applies the filter to the list binding", () => {
		expect(/getBinding\(\s*["']items["']\s*\)\.filter\(/.test(ctrl)).toBe(true);
	});
});
