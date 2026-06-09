const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const js = read("webapp/index.js");

describe("Stage 4 - a proper app shell", () => {
	test("the module is defined with sap.ui.define", () => {
		expect(/sap\.ui\.define\s*\(/.test(js)).toBe(true);
	});
	test("sap.m.App and sap.m.Page are loaded as dependencies", () => {
		expect(/["']sap\/m\/App["']/.test(js)).toBe(true);
		expect(/["']sap\/m\/Page["']/.test(js)).toBe(true);
	});
	test("an App is created and rendered with placeAt('content')", () => {
		expect(/new\s+App\s*\(/.test(js)).toBe(true);
		expect(/\.placeAt\(\s*["']content["']\s*\)/.test(js)).toBe(true);
	});
	test("a Page is created with a non-empty title (the text is your design choice)", () => {
		expect(/new\s+Page\s*\(/.test(js)).toBe(true);
		const m = js.match(/title\s*:\s*["']([^"']*)["']/);
		expect(m).not.toBeNull();
		expect(m[1].trim().length).toBeGreaterThan(0);
	});
});
