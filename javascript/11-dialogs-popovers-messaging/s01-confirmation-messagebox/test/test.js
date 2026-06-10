const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const view = read("webapp/view/Detail.view.xml");
const ctrl = read("webapp/controller/Detail.controller.js");
describe("Lesson 11 Stage 1 - confirmation with MessageBox", () => {
	test("the detail has a Delete action", () => { expect(/press\s*=\s*"\.onDeleteOrder"/.test(view)).toBe(true); });
	test("the controller loads MessageBox", () => { expect(/["']sap\/m\/MessageBox["']/.test(ctrl)).toBe(true); });
	test("delete asks for confirmation before acting", () => { expect(/MessageBox\.(confirm|show)\(/.test(ctrl)).toBe(true); });
});
