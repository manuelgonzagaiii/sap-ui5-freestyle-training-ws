const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const raw = read("webapp/manifest.json");
const comp = read("webapp/Component.js");

describe("Lesson 2 Stage 2 - the app descriptor (manifest.json)", () => {
	test("manifest.json is valid JSON", () => {
		expect(() => JSON.parse(raw)).not.toThrow();
	});
	test("sap.app.id is the app namespace ui5.sales", () => {
		expect(JSON.parse(raw)["sap.app"].id).toBe("ui5.sales");
	});
	test("the descriptor declares the root view", () => {
		expect(JSON.parse(raw)["sap.ui5"].rootView.viewName).toBe("ui5.sales.view.App");
	});
	test("the Component now loads its configuration from the manifest", () => {
		expect(/manifest\s*:\s*["']json["']/.test(comp)).toBe(true);
	});
	test("the Component calls the parent init so the manifest is processed", () => {
		expect(/UIComponent\.prototype\.init\.apply/.test(comp)).toBe(true);
	});
});
