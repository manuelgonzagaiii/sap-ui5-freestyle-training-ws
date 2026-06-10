const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const frag = read("webapp/view/fragment/CreateOrder.fragment.xml");
describe("Lesson 13 Stage 1 - SimpleForm", () => {
	test("the dialog uses a SimpleForm", () => { expect(/<form:SimpleForm/.test(frag)).toBe(true); });
	test("the form uses a responsive layout", () => { expect(/layout\s*=\s*"ResponsiveGridLayout"/.test(frag)).toBe(true); });
	test("the form has labels and inputs bound to a create model", () => {
		expect((frag.match(/<Label/g) || []).length).toBeGreaterThanOrEqual(2);
		expect(/create>\//.test(frag)).toBe(true);
	});
});
