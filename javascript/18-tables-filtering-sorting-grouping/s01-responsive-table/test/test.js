const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const view = read("webapp/view/List.view.xml");
describe("Lesson 18 Stage 1 - a responsive table", () => {
	test("the orders are shown in a sap.m.Table with columns", () => { expect(/<Table[\s>]/.test(view)).toBe(true); expect((view.match(/<Column[\s>]/g) || []).length).toBeGreaterThanOrEqual(3); });
	test("each row is a ColumnListItem whose cells match the columns", () => { expect(/<ColumnListItem/.test(view)).toBe(true); expect(/<cells>/.test(view)).toBe(true); });
});
