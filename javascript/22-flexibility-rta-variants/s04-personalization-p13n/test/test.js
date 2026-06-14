const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const list = read("webapp/controller/List.controller.js");
const view = read("webapp/view/List.view.xml");
describe("Lesson 22 Stage 4 - personalization", () => {
	test("the personalization engine is used", () => {
		expect(/["']sap\/m\/p13n\/Engine["']/.test(list)).toBe(true);
		expect(/Engine\.getInstance\(\)\s*\.register\(/.test(list)).toBe(true);
	});
	test("a personalization dialog is opened for the table", () => {
		expect(/Engine\.getInstance\(\)\s*\.show\(/.test(list)).toBe(true);
	});
	test("a control opens personalization", () => { expect(/press\s*=\s*["']\.onPersonalize["']/.test(view)).toBe(true); });
});
