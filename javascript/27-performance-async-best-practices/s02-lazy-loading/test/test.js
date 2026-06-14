const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const manifest = JSON.parse(read("webapp/manifest.json"));
describe("Lesson 27 Stage 2 - lazy loading", () => {
	test("at least one heavy library is declared lazy", () => {
		const libs = manifest["sap.ui5"].dependencies.libs;
		const lazy = Object.keys(libs).filter((k) => libs[k] && libs[k].lazy === true);
		expect(lazy.length).toBeGreaterThan(0);
	});
});
