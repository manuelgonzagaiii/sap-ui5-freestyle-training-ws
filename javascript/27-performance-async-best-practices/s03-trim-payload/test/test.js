const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const view = read("webapp/view/List.view.xml");
describe("Lesson 27 Stage 3 - trim payload", () => {
	test("the list binding selects only the fields it needs", () => {
		expect(/items\s*=\s*"[^"]*\$select\s*:/.test(view)).toBe(true);
	});
});
