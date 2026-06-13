const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const view = read("webapp/view/List.view.xml");
describe("Lesson 18 Stage 2 - growing and paging", () => {
	test("the table grows (pages) instead of loading everything at once", () => { expect(/<Table[^>]*growing\s*=\s*"true"/.test(view)).toBe(true); });
});
