const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const ann = read("srv/annotations.cds");
describe("Lesson 19 Stage 3 - value list annotations", () => {
	test("the customer field carries a Common.ValueList annotation", () => { expect(/Common\.ValueList/.test(ann)).toBe(true); });
	test("it points at the Customers collection and maps the name field", () => { expect(/CollectionPath\s*:\s*'Customers'/.test(ann)).toBe(true); expect(/ValueListProperty\s*:\s*'name'/.test(ann)).toBe(true); });
});
