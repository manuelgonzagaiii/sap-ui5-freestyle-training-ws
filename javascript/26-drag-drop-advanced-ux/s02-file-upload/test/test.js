const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const detail = read("webapp/view/Detail.view.xml");
describe("Lesson 26 Stage 2 - upload", () => {
	test("the detail page has an UploadSet", () => {
		expect(/xmlns:upload\s*=\s*["']sap\.m\.upload["']/.test(detail)).toBe(true);
		expect(/<upload:UploadSet\b/.test(detail)).toBe(true);
	});
});
