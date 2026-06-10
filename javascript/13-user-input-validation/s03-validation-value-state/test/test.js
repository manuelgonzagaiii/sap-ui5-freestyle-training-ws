const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const ctrl = read("webapp/controller/List.controller.js");
describe("Lesson 13 Stage 3 - validation handling and value state", () => {
	test("the controller uses the Messaging module", () => { expect(/["']sap\/ui\/core\/Messaging["']/.test(ctrl)).toBe(true); });
	test("it registers the view so validation is tracked", () => { expect(/registerObject\(\s*this\.getView\(\)\s*,\s*true\s*\)/.test(ctrl)).toBe(true); });
});
