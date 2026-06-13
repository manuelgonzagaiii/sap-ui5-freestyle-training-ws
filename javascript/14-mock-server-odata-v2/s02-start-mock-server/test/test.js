const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const comp = read("webapp/Component.js");
const manifest = JSON.parse(read("webapp/manifest.json"));
describe("Lesson 14 Stage 2 - start the mock server and declare the OData model", () => {
	test("the Component starts the mock server before init", () => {
		expect(/mockserver/.test(comp)).toBe(true);
		expect(/\.init\(\)/.test(comp)).toBe(true);
	});
	test("a data source points at the OData service with the local metadata", () => {
		const ds = manifest["sap.app"].dataSources.mainService;
		expect(ds.settings.odataVersion).toBe("2.0");
		expect(ds.settings.localUri).toMatch(/metadata\.xml/);
	});
	test("the default model is an OData V2 model bound to that data source", () => {
		const m = manifest["sap.ui5"].models[""];
		expect(m.dataSource).toBe("mainService");
		expect(m.type).toMatch(/odata\.v2\.ODataModel/);
	});
});
