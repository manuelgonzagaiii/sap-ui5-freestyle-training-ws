const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const ctrl = read("webapp/controller/List.controller.js");
const frag = read("webapp/view/fragment/CreateOrder.fragment.xml");
describe("Lesson 19 Stage 2 - a value help dialog", () => {
	test("the input shows a value help and requests it", () => { expect(/showValueHelp\s*=\s*"true"/.test(frag)).toBe(true); expect(/valueHelpRequest\s*=\s*"\.onCustomerValueHelp"/.test(frag)).toBe(true); });
	test("a customer SelectDialog exists and search filters it", () => {
		expect(has("webapp/view/fragment/CustomerSelect.fragment.xml")).toBe(true);
		expect(/<SelectDialog/.test(read("webapp/view/fragment/CustomerSelect.fragment.xml"))).toBe(true);
		expect(/itemsBinding[\s\S]*filter\(/.test(ctrl)).toBe(true);
	});
	test("confirming writes the chosen customer into the draft", () => { expect(/selectedItem/.test(ctrl)).toBe(true); expect(/setProperty\(\s*["']\/customer["']/.test(ctrl)).toBe(true); });
});
