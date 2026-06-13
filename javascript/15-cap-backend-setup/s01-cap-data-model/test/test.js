const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const schema = read("db/schema.cds");
describe("Lesson 15 Stage 1 - the CAP data model", () => {
	test("a SalesOrders entity is defined with a key", () => { expect(/entity\s+SalesOrders\s*\{/.test(schema)).toBe(true); expect(/key\s+orderId/.test(schema)).toBe(true); });
	test("it models a relationship (composition or association)", () => { expect(/(Composition|Association)\s+of|Association\s+to/.test(schema)).toBe(true); });
});
