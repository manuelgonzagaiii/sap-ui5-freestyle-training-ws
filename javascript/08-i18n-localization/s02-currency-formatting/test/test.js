const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
describe("Lesson 8 Stage 2 - currency formatting", () => {
	test("the amount is formatted with the locale-aware Currency type", () => {
		expect(/type\s*:\s*'sap\.ui\.model\.type\.Currency'/.test(view)).toBe(true);
	});
	test("it feeds both the amount and the currency code (composite parts)", () => {
		expect(/parts\s*:\s*\[[^\]]*'amount'[^\]]*'currency'/.test(view)).toBe(true);
	});
});
