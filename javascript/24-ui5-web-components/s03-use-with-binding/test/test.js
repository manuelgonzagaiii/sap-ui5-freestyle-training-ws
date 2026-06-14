const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const detail = read("webapp/view/Detail.view.xml");
describe("Lesson 24 Stage 3 - using the web component", () => {
	test("the detail view uses the wrapped web component", () => {
		expect(/xmlns:sales\s*=\s*["']ui5\.sales\.control["']/.test(detail)).toBe(true);
		expect(/<sales:Rating\b/.test(detail)).toBe(true);
	});
	test("its value is bound to data", () => {
		expect(/<sales:Rating[^>]*value\s*=\s*["']\{[^}]+\}["']/.test(detail)).toBe(true);
	});
});
