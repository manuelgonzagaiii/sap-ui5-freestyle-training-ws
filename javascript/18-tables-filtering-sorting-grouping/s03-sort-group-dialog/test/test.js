const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const ctrl = read("webapp/controller/List.controller.js");
describe("Lesson 18 Stage 3 - sort and group dialog", () => {
	test("a ViewSettingsDialog fragment exists", () => { expect(has("webapp/view/fragment/ViewSettings.fragment.xml")).toBe(true); expect(/<ViewSettingsDialog/.test(read("webapp/view/fragment/ViewSettings.fragment.xml"))).toBe(true); });
	test("confirming applies sorters (with grouping) to the table binding", () => { expect(/new\s+Sorter\(/.test(ctrl)).toBe(true); expect(/getBinding\(\s*["']items["']\s*\)\.sort\(/.test(ctrl)).toBe(true); });
});
