const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const card = JSON.parse(read("webapp/cards/ordersCard.json"));
describe("Lesson 23 Stage 3 - card types and header", () => {
	test("the card uses a numeric (KPI) header", () => {
		expect(card["sap.card"].header.type).toBe("Numeric");
		expect(card["sap.card"].header.mainIndicator).toBeTruthy();
	});
});
