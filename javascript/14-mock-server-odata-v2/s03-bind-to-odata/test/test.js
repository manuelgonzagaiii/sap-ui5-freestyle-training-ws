const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const view = read("webapp/view/List.view.xml");
const detail = read("webapp/controller/Detail.controller.js");
describe("Lesson 14 Stage 3 - bind the UI to the OData service", () => {
	test("the list binds to the SalesOrders entity set", () => {
		expect(/items\s*=\s*"\{\/SalesOrders\}"/.test(view)).toBe(true);
	});
	test("the detail binds to a single order by its key", () => {
		expect(/createKey\(\s*["']\/SalesOrders["']/.test(detail)).toBe(true);
		expect(/bindElement\(/.test(detail)).toBe(true);
	});
});
