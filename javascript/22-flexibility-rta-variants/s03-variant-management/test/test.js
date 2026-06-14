const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const view = read("webapp/view/List.view.xml");
describe("Lesson 22 Stage 3 - variant management", () => {
	test("a VariantManagement control is present", () => {
		expect(/xmlns:fl\s*=\s*["']sap\.ui\.fl\.variants["']/.test(view)).toBe(true);
		expect(/<fl:VariantManagement\b/.test(view)).toBe(true);
	});
	test("it is associated with the orders table", () => {
		expect(/<fl:VariantManagement[^>]*for\s*=\s*["']ordersTable["']/.test(view)).toBe(true);
	});
});
