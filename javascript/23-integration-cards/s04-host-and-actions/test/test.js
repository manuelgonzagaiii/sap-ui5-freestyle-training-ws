const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const card = JSON.parse(read("webapp/cards/ordersCard.json"));
describe("Lesson 23 Stage 4 - actions", () => {
	test("card items declare an action", () => {
		const actions = card["sap.card"].content.item.actions;
		expect(Array.isArray(actions)).toBe(true);
		expect(actions.length).toBeGreaterThan(0);
		expect(actions[0].type).toBeTruthy();
	});
});
