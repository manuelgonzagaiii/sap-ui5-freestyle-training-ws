const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/Detail.view.xml");
describe("Lesson 12 Stage 4 - ObjectPageLayout", () => {
	test("the detail is an ObjectPageLayout", () => { expect(/<uxap:ObjectPageLayout/.test(view)).toBe(true); });
	test("it is divided into sections", () => {
		expect((view.match(/<uxap:ObjectPageSection/g) || []).length).toBeGreaterThanOrEqual(1);
	});
	test("each section has a title (your wording)", () => {
		const m = view.match(/<uxap:ObjectPageSection[^>]*title\s*=\s*"([^"]+)"/);
		expect(m).not.toBeNull();
		expect(m[1].trim().length).toBeGreaterThan(0);
	});
});
