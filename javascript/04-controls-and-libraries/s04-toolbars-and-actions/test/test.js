const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
describe("Lesson 4 Stage 4 - toolbars and actions", () => {
	test("the Page has a footer", () => {
		expect(/<footer>/.test(view)).toBe(true);
	});
	test("the footer uses an OverflowToolbar", () => {
		expect(/<OverflowToolbar[\s>]/.test(view)).toBe(true);
	});
	test("a ToolbarSpacer pushes the actions to the right", () => {
		expect(/<ToolbarSpacer[\s/>]/.test(view)).toBe(true);
	});
	test("there is at least one action Button", () => {
		expect((view.match(/<Button[\s>]/g) || []).length).toBeGreaterThan(0);
	});
});
