const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const view = read("webapp/view/List.view.xml");
describe("Lesson 25 Stage 3 - keyboard fast navigation", () => {
	test("the custom-data namespace is declared", () => {
		expect(/xmlns:app\s*=\s*["']http:\/\/schemas\.sap\.com\/sapui5\/extension\/sap\.ui\.core\.CustomData\/1["']/.test(view)).toBe(true);
	});
	test("a region is marked as an F6 fast-nav group", () => {
		expect(/app:sap-ui-fastnavgroup\s*=\s*["']true["']/.test(view)).toBe(true);
	});
});
