const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const ctrl = read("webapp/controller/Detail.controller.js");
const view = read("webapp/view/Detail.view.xml");
describe("Lesson 11 Stage 3 - busy indication", () => {
	test("the detail has a Reload action", () => { expect(/press\s*=\s*"\.onReload"/.test(view)).toBe(true); });
	test("reload shows the busy indicator", () => { expect(/setBusy\(\s*true\s*\)/.test(ctrl)).toBe(true); });
	test("and clears it afterwards", () => { expect(/setBusy\(\s*false\s*\)/.test(ctrl)).toBe(true); });
});
