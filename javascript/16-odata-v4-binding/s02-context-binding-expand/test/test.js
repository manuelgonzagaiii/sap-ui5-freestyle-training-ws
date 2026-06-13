const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const ctrl = read("webapp/controller/Detail.controller.js");
const view = read("webapp/view/Detail.view.xml");
describe("Lesson 16 Stage 2 - context binding and \$expand", () => {
	test("the detail binds with an \$expand parameter to load related items", () => { expect(/\$expand\s*:\s*"items"/.test(ctrl)).toBe(true); });
	test("the detail shows the order's items via a relative aggregation binding", () => { expect(/items\s*=\s*"\{items\}"/.test(view)).toBe(true); });
});
