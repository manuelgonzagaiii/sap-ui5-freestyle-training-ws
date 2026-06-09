const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
const ctrl = read("webapp/controller/App.controller.js");

describe("Lesson 3 Stage 3 - feeding the view data", () => {
	test("a JSONModel is loaded as a dependency", () => {
		expect(/["']sap\/ui\/model\/json\/JSONModel["']/.test(ctrl)).toBe(true);
	});
	test("a JSONModel is created", () => {
		expect(/new\s+JSONModel\s*\(/.test(ctrl)).toBe(true);
	});
	test("the model is set on the view", () => {
		expect(/getView\(\)\.setModel\(/.test(ctrl)).toBe(true);
	});
	test("a control in the view is bound to a model property", () => {
		expect(/\{\s*\/\w+\s*\}/.test(view)).toBe(true);
	});
});
