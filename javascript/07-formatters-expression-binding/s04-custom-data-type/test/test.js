const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
const type = read("webapp/model/ItemCountType.js");
describe("Lesson 7 Stage 4 - custom data type", () => {
	test("a custom SimpleType is defined with formatValue", () => {
		expect(/SimpleType\.extend\(/.test(type)).toBe(true);
		expect(/formatValue\s*\(/.test(type)).toBe(true);
	});
	test("a binding in the view uses the custom type", () => {
		expect(/type\s*:\s*'ui5\.sales\.model\.ItemCountType'/.test(view)).toBe(true);
	});
});
