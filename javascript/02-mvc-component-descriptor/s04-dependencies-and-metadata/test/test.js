const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const raw = read("webapp/manifest.json");

describe("Lesson 2 Stage 4 - dependencies and app metadata", () => {
	test("manifest.json is valid JSON", () => {
		expect(() => JSON.parse(raw)).not.toThrow();
	});
	test("the app has a non-empty title (your wording is free)", () => {
		expect((JSON.parse(raw)["sap.app"].title || "").trim().length).toBeGreaterThan(0);
	});
	test("applicationVersion.version is a valid version number", () => {
		expect(/^\d+\.\d+\.\d+$/.test(JSON.parse(raw)["sap.app"].applicationVersion.version)).toBe(true);
	});
	test("a valid minUI5Version is declared", () => {
		expect(/^\d+\.\d+(\.\d+)?$/.test(JSON.parse(raw)["sap.ui5"].dependencies.minUI5Version)).toBe(true);
	});
	test("sap.m is declared as a library dependency", () => {
		expect(JSON.parse(raw)["sap.ui5"].dependencies.libs["sap.m"]).toBeDefined();
	});
});
