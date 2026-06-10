const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
describe("Lesson 6 Stage 3 - sorting", () => {
	test("the list binding uses the extended (object) form", () => {
		expect(/items\s*=\s*"\{\s*path\s*:/.test(view)).toBe(true);
	});
	test("a sorter is declared with a field to sort by", () => {
		const m = view.match(/sorter\s*:\s*\{[^}]*path\s*:\s*'([^']+)'/);
		expect(m).not.toBeNull();
		expect(m[1].trim().length).toBeGreaterThan(0);
	});
});
