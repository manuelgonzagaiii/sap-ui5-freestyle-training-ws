const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const ctrl = read("webapp/controller/Detail.controller.js");
const view = read("webapp/view/Detail.view.xml");
describe("Lesson 17 Stage 3 - delete", () => {
	test("a Delete action is offered", () => { expect(/press\s*=\s*"\.onDelete"/.test(view)).toBe(true); });
	test("delete removes the bound entity via its context", () => { expect(/getBindingContext\(\)\.delete\(\)/.test(ctrl)).toBe(true); });
});
