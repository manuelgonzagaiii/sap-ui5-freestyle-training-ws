const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/List.view.xml");
describe("Lesson 16 Stage 1 - V4 list binding and query options", () => {
	test("the list binding uses the extended form with parameters", () => { expect(/items\s*=\s*"\{\s*path\s*:\s*'\/SalesOrders'/.test(view)).toBe(true); expect(/parameters\s*:/.test(view)).toBe(true); });
	test("a server-side query option is declared (\$count / \$orderby / \$select)", () => { expect(/\$count|\$orderby|\$select/.test(view)).toBe(true); });
});
