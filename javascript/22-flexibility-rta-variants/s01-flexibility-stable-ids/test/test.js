const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const manifest = JSON.parse(read("webapp/manifest.json"));
const view = read("webapp/view/List.view.xml");
describe("Lesson 22 Stage 1 - flexibility", () => {
	test("the descriptor enables flexibility", () => {
		expect(manifest["sap.ui5"].flexEnabled).toBe(true);
	});
	test("the table that users will adapt has a stable id", () => {
		expect(/<Table[^>]*id\s*=\s*["']ordersTable["']/.test(view)).toBe(true);
	});
});
