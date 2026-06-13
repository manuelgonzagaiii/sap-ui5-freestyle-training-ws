const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const ctrl = read("webapp/controller/List.controller.js");
describe("Lesson 17 Stage 1 - create over OData V4", () => {
	test("onCreate creates through the list binding (not model.create)", () => { expect(/getBinding\(\s*["']items["']\s*\)/.test(ctrl)).toBe(true); expect(/\.create\(\{/.test(ctrl)).toBe(true); });
	test("it awaits the transient context being persisted", () => { expect(/\.created\(\)/.test(ctrl)).toBe(true); });
});
