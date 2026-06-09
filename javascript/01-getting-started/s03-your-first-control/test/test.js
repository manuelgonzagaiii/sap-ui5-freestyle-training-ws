const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const js = read("webapp/index.js");

describe("Stage 3 - handling user interaction", () => {
	test("the module is defined with sap.ui.define", () => {
		expect(/sap\.ui\.define\s*\(/.test(js)).toBe(true);
	});
	test("MessageToast is loaded as a dependency", () => {
		expect(/["']sap\/m\/MessageToast["']/.test(js)).toBe(true);
	});
	test("a Button is created and rendered with placeAt('content')", () => {
		expect(/new\s+Button\s*\(/.test(js)).toBe(true);
		expect(/\.placeAt\(\s*["']content["']\s*\)/.test(js)).toBe(true);
	});
	test("the button's press event is wired to a handler", () => {
		expect(/press\s*:/.test(js)).toBe(true);
	});
	test("the handler shows a message with MessageToast.show(...) - the text is yours to choose", () => {
		expect(/MessageToast\.show\(\s*["'][^"']+["']/.test(js)).toBe(true);
	});
});
