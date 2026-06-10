const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
const ctrl = read("webapp/controller/App.controller.js");
describe("Lesson 6 Stage 2 - element binding", () => {
	test("list items are pressable", () => {
		expect(/<ObjectListItem[^>]*press\s*=\s*"\.?\w+"/.test(view)).toBe(true);
	});
	test("there is a detail area to bind", () => {
		expect(/id\s*=\s*"detailPanel"/.test(view)).toBe(true);
	});
	test("the handler reads the pressed item's binding context", () => {
		expect(/getBindingContext\(/.test(ctrl)).toBe(true);
	});
	test("the handler binds the detail area to that context with bindElement", () => {
		expect(/bindElement\(/.test(ctrl)).toBe(true);
	});
});
