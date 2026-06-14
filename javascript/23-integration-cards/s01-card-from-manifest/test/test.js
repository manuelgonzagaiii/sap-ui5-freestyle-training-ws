const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const card = JSON.parse(read("webapp/cards/ordersCard.json"));
const detail = read("webapp/view/Detail.view.xml");
const manifest = JSON.parse(read("webapp/manifest.json"));
describe("Lesson 23 Stage 1 - a card", () => {
	test("the integration library is declared", () => {
		expect(Object.keys(manifest["sap.ui5"].dependencies.libs)).toContain("sap.ui.integration");
	});
	test("the card manifest is a List card with an item template", () => {
		expect(card["sap.card"].type).toBe("List");
		expect(typeof card["sap.card"].content.item.title).toBe("string");
		expect(card["sap.card"].content.item.title).toMatch(/\{.+\}/);
	});
	test("the detail page embeds the card", () => {
		expect(/xmlns:integration\s*=\s*["']sap\.ui\.integration\.widgets["']/.test(detail)).toBe(true);
		expect(/<integration:Card[^>]*manifest\s*=/.test(detail)).toBe(true);
	});
});
