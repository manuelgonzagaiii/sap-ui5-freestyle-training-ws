const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const manifest = JSON.parse(read("webapp/manifest.json"));
const css = read("webapp/css/style.css");
describe("Lesson 21 Stage 3 - custom CSS", () => {
	test("the descriptor registers a CSS resource", () => {
		const list = manifest["sap.ui5"].resources && manifest["sap.ui5"].resources.css;
		expect(Array.isArray(list)).toBe(true);
		expect(list.some((e) => /\.css$/.test(e.uri))).toBe(true);
	});
	test("the stylesheet styles the custom control's classes", () => {
		expect(/\.salesPriority\b/.test(css)).toBe(true);
	});
});
