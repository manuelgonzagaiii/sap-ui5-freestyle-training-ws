const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const ctrl = read("webapp/controller/List.controller.js");
describe("Lesson 10 Stage 4 - fragment id scoping", () => {
	test("the save handler reads the dialog's input via byId", () => {
		expect(/byId\(\s*["']newCustomerInput["']\s*\)/.test(ctrl)).toBe(true);
	});
	test("the dialog is closed via its scoped id", () => {
		expect(/byId\(\s*["']createOrderDialog["']\s*\)\.close\(\)/.test(ctrl)).toBe(true);
	});
});
