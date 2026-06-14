const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const card = JSON.parse(read("webapp/cards/ordersCard.json"));
describe("Lesson 23 Stage 2 - card data from the service", () => {
	test("the card requests its data from the OData service", () => {
		const data = card["sap.card"].content.data;
		expect(data.request).toBeTruthy();
		expect(data.request.url).toMatch(/\/odata\/v4\/sales\//);
	});
	test("it reads the OData V4 result array (path /value)", () => {
		expect(card["sap.card"].content.data.path).toBe("/value");
	});
});
