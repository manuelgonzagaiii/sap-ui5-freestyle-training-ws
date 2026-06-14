const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const view = read("webapp/view/List.view.xml");
describe("Lesson 25 Stage 2 - InvisibleText labelling", () => {
	test("there is a hidden label for the table", () => {
		expect(/<core:InvisibleText\b[^>]*id\s*=\s*["']ordersTableLabel["']/.test(view)).toBe(true);
	});
	test("the table references it via ariaLabelledBy", () => {
		expect(/<Table[^>]*ariaLabelledBy\s*=\s*["']ordersTableLabel["']/.test(view)).toBe(true);
	});
});
