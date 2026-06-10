const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
describe("Lesson 7 Stage 2 - expression binding", () => {
	test("the list item uses expression binding for its highlight", () => {
		const m = view.match(/highlight\s*=\s*"(\{=[^"]*\})"/);
		expect(m).not.toBeNull();
	});
	test("the expression references a model property", () => {
		const m = view.match(/highlight\s*=\s*"(\{=[^"]*\})"/);
		expect(/\$\{\w+\}/.test(m[1])).toBe(true);
	});
});
