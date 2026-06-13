const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const ctrl = read("webapp/controller/List.controller.js");
describe("Lesson 18 Stage 4 - export", () => {
	test("the export reads the rows from the table's binding", () => { expect(/getAllCurrentContexts\(\)/.test(ctrl)).toBe(true); });
	test("it builds a CSV file and triggers a download", () => { expect(/new\s+Blob\(/.test(ctrl)).toBe(true); expect(/\.csv/.test(ctrl)).toBe(true); });
	test("it does not rely on the SAPUI5-only export library (we are on OpenUI5)", () => { expect(/sap\/ui\/export/.test(ctrl)).toBe(false); });
});
