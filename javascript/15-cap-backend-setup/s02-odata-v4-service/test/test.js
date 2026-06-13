const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const svc = read("srv/sales-service.cds");
const pkg = JSON.parse(read("package.json"));
describe("Lesson 15 Stage 2 - expose an OData V4 service", () => {
	test("a service projects the SalesOrders entity", () => { expect(/service\s+SalesService/.test(svc)).toBe(true); expect(/projection on my\.SalesOrders/.test(svc)).toBe(true); });
	test("CSV seed data exists for the SalesOrders entity", () => { expect(has("db/data/ui5.sales-SalesOrders.csv")).toBe(true); expect(/orderId/.test(read("db/data/ui5.sales-SalesOrders.csv"))).toBe(true); });
	test("the project depends on CAP and is configured for sqlite", () => { expect(pkg.dependencies["@sap/cds"]).toBeDefined(); expect(JSON.stringify(pkg.cds.requires.db)).toMatch(/sqlite/); });
});
