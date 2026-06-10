const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/List.view.xml");
describe("Lesson 12 Stage 3 - DynamicPage", () => {
	test("the list is a DynamicPage", () => { expect(/<f:DynamicPage[\s>]/.test(view)).toBe(true); });
	test("it has a snapping, pinnable header", () => {
		expect(/<f:DynamicPageHeader[^>]*pinnable\s*=\s*"(true|false)"/.test(view)).toBe(true);
	});
	test("the title lives in a DynamicPageTitle", () => { expect(/<f:DynamicPageTitle/.test(view)).toBe(true); });
});
