const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const ctrl = read("webapp/controller/List.controller.js");
describe("Lesson 14 Stage 4 - create over OData V2", () => {
	test("onCreate creates a SalesOrder through the OData model", () => {
		expect(/getModel\(\)\.create\(\s*["']\/SalesOrders["']/.test(ctrl)).toBe(true);
	});
	test("it handles success and error of the request", () => {
		expect(/success\s*:/.test(ctrl)).toBe(true);
		expect(/error\s*:/.test(ctrl)).toBe(true);
	});
});
