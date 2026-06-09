const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
const ctrl = read("webapp/controller/App.controller.js");

describe("Lesson 3 Stage 2 - lifecycle and byId", () => {
	test("the button has an id in the view", () => {
		expect(/<Button[^>]*\bid\s*=\s*"([^"]+)"/.test(view)).toBe(true);
	});
	test("a lifecycle hook is implemented", () => {
		expect(/(onInit|onBeforeRendering|onAfterRendering|onExit)\s*\(/.test(ctrl)).toBe(true);
	});
	test("the controller looks the button up with byId, using the same id as the view", () => {
		const id = view.match(/<Button[^>]*\bid\s*=\s*"([^"]+)"/)[1];
		expect(new RegExp('byId\\(\\s*["\']' + id + '["\']').test(ctrl)).toBe(true);
	});
	test("it moves keyboard focus to the button after rendering", () => {
		expect(/onAfterRendering\s*\(/.test(ctrl)).toBe(true);
		expect(/\.focus\(\)/.test(ctrl)).toBe(true);
	});
});
