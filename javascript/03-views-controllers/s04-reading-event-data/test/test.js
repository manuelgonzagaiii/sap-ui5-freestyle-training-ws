const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
const ctrl = read("webapp/controller/App.controller.js");

describe("Lesson 3 Stage 4 - reading event data", () => {
	test("the view has an Input wired to a change handler", () => {
		const m = view.match(/<Input[^>]*\b(change|liveChange)\s*=\s*"\.?(\w+)"/);
		expect(m).not.toBeNull();
	});
	test("the change handler exists on the controller", () => {
		const handler = view.match(/<Input[^>]*\b(?:change|liveChange)\s*=\s*"\.?(\w+)"/)[1];
		expect(new RegExp("\\b" + handler + "\\s*\\(").test(ctrl)).toBe(true);
	});
	test("the handler reads data from the event object", () => {
		expect(/oEvent\.getParameter\(|oEvent\.getSource\(/.test(ctrl)).toBe(true);
	});
});
