const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const svc = read("srv/sales-service.cds");
describe("Lesson 15 Stage 4 - drafts and a bound action", () => {
	test("the SalesOrders projection is draft-enabled", () => { expect(/@odata\.draft\.enabled/.test(svc)).toBe(true); });
	test("a bound action is declared on the entity", () => { expect(/actions\s*\{[\s\S]*action\s+\w+/.test(svc)).toBe(true); });
});
