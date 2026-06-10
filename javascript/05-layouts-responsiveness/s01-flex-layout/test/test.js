const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
describe("Lesson 5 Stage 1 - flex layout", () => {
	test("a FlexBox lays out the summary tiles", () => {
		expect(/<FlexBox[\s>]/.test(view)).toBe(true);
	});
	test("the FlexBox direction is a valid value (Row, Column, ...)", () => {
		const m = view.match(/<FlexBox[^>]*\bdirection\s*=\s*"([^"]*)"/);
		expect(m).not.toBeNull();
		expect(["Row", "Column", "RowReverse", "ColumnReverse"]).toContain(m[1]);
	});
	test("there are several tiles (VBox columns) inside", () => {
		expect((view.match(/<VBox[\s>]/g) || []).length).toBeGreaterThanOrEqual(2);
	});
});
