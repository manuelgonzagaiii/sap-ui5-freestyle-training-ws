const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const view = read("webapp/view/List.view.xml");
const ctrl = read("webapp/controller/List.controller.js");
describe("Lesson 26 Stage 1 - drag and drop", () => {
	test("the table declares drag and drop info", () => {
		expect(/xmlns:dnd\s*=\s*["']sap\.ui\.core\.dnd["']/.test(view)).toBe(true);
		expect(/<dnd:DragInfo\b/.test(view)).toBe(true);
		expect(/<dnd:DropInfo\b/.test(view)).toBe(true);
	});
	test("a drop handler is wired and implemented", () => {
		expect(/<dnd:DropInfo[^>]*drop\s*=\s*["']\.onDropOrder["']/.test(view)).toBe(true);
		expect(/onDropOrder\s*\(/.test(ctrl)).toBe(true);
	});
});
