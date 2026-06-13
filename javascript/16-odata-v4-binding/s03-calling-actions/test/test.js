const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const ctrl = read("webapp/controller/Detail.controller.js");
const view = read("webapp/view/Detail.view.xml");
describe("Lesson 16 Stage 3 - calling a bound action", () => {
	test("a 'Mark completed' action is offered", () => { expect(/press\s*=\s*"\.onSetCompleted"/.test(view)).toBe(true); });
	test("the handler invokes the bound action via an operation binding", () => { expect(/bindContext\(\s*"SalesService\.setCompleted\(\.\.\.\)"/.test(ctrl)).toBe(true); expect(/\.invoke\(\)/.test(ctrl)).toBe(true); });
});
