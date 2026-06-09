const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
describe("Lesson 4 Stage 2 - common input controls", () => {
	test("a Select is present", () => {
		expect(/<Select[\s>]/.test(view)).toBe(true);
	});
	test("the Select fills its items aggregation with options", () => {
		expect(/<items>/.test(view)).toBe(true);
		expect(/<core:Item[\s>]/.test(view)).toBe(true);
	});
	test("a CheckBox is present", () => {
		expect(/<CheckBox[\s>]/.test(view)).toBe(true);
	});
});
