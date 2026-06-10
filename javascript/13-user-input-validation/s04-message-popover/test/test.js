const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const ctrl = read("webapp/controller/List.controller.js");
describe("Lesson 13 Stage 4 - MessagePopover and validate on save", () => {
	test("a MessagePopover fragment exists", () => {
		expect(has("webapp/view/fragment/MessagePopover.fragment.xml")).toBe(true);
		expect(/<MessagePopover/.test(read("webapp/view/fragment/MessagePopover.fragment.xml"))).toBe(true);
	});
	test("save is blocked when there are validation messages", () => {
		expect(/getMessageModel\(\)\.getData\(\)\.length\s*>\s*0/.test(ctrl)).toBe(true);
	});
});
