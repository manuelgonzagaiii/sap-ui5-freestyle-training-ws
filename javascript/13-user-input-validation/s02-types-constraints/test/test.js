const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const frag = read("webapp/view/fragment/CreateOrder.fragment.xml");
describe("Lesson 13 Stage 2 - types and constraints", () => {
	test("an input is bound with a model type", () => { expect(/type\s*:\s*'sap\.ui\.model\.type\.\w+'/.test(frag)).toBe(true); });
	test("the binding declares constraints", () => { expect(/constraints\s*:\s*\{[^}]+\}/.test(frag)).toBe(true); });
});
