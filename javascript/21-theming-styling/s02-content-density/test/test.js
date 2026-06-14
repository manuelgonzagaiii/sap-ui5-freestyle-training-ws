const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const comp = read("webapp/Component.js");
const app = read("webapp/controller/App.controller.js");
const manifest = JSON.parse(read("webapp/manifest.json"));
describe("Lesson 21 Stage 2 - content density", () => {
	test("the component computes a density class (compact or cozy)", () => {
		expect(/getContentDensityClass\s*\(/.test(comp)).toBe(true);
		expect(/sapUiSizeCompact/.test(comp)).toBe(true);
		expect(/sapUiSizeCozy/.test(comp)).toBe(true);
	});
	test("the root view applies the density class", () => {
		expect(/addStyleClass\(\s*this\.getOwnerComponent\(\)\.getContentDensityClass\(\)\s*\)/.test(app)).toBe(true);
	});
	test("the descriptor declares both content densities", () => {
		expect(manifest["sap.ui5"].contentDensities).toMatchObject({ compact: true, cozy: true });
	});
});
