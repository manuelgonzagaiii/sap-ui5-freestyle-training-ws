const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
describe("Lesson 8 Stage 3 - date formatting", () => {
	test("the order date uses the locale-aware Date type", () => {
		expect(/type\s*:\s*'sap\.ui\.model\.type\.Date'/.test(view)).toBe(true);
	});
	test("it declares the source pattern of the raw date string", () => {
		expect(/source\s*:\s*\{[^}]*pattern/.test(view)).toBe(true);
	});
});
