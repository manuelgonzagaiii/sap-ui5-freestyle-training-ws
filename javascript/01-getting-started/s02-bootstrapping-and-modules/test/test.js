const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const js = read("webapp/index.js");

describe("Stage 2 - your first control", () => {
	test("the module is defined with sap.ui.define", () => {
		expect(/sap\.ui\.define\s*\(/.test(js)).toBe(true);
	});
	test("a control from the sap.m library is loaded as a dependency", () => {
		expect(/["']sap\/m\/\w+["']/.test(js)).toBe(true);
	});
	test("a control is created with 'new' and rendered with placeAt('content')", () => {
		expect(/new\s+\w+\s*\(/.test(js)).toBe(true);
		expect(/\.placeAt\(\s*["']content["']\s*\)/.test(js)).toBe(true);
	});
});
