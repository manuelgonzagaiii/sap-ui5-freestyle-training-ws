const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const meta = read("webapp/localService/metadata.xml");
describe("Lesson 14 Stage 1 - OData metadata and mock data", () => {
	test("metadata defines a SalesOrder entity type with a key", () => {
		expect(/<EntityType\s+Name="SalesOrder"/.test(meta)).toBe(true);
		expect(/<PropertyRef\s+Name="orderId"/.test(meta)).toBe(true);
	});
	test("metadata exposes a SalesOrders entity set", () => {
		expect(/<EntitySet\s+Name="SalesOrders"/.test(meta)).toBe(true);
	});
	test("mock data is a non-empty array of orders", () => {
		const data = JSON.parse(read("webapp/localService/mockdata/SalesOrders.json"));
		expect(Array.isArray(data)).toBe(true);
		expect(data.length).toBeGreaterThan(0);
		expect(data[0].orderId).toBeDefined();
	});
});
