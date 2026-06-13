const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const manifest = JSON.parse(read("webapp/manifest.json"));
const ui5 = read("ui5.yaml");
const comp = read("webapp/Component.js");
describe("Lesson 15 Stage 3 - connect the UI to the CAP V4 service", () => {
	test("the data source targets the CAP OData V4 endpoint", () => { const ds = manifest["sap.app"].dataSources.mainService; expect(ds.settings.odataVersion).toBe("4.0"); expect(ds.uri).toMatch(/\/odata\/v4\//); });
	test("the default model is an OData V4 model", () => { expect(manifest["sap.ui5"].models[""].type).toMatch(/odata\.v4\.ODataModel/); });
	test("a proxy forwards requests to the CAP server", () => { expect(/ui5-middleware-simpleproxy/.test(ui5)).toBe(true); expect(/4004/.test(ui5)).toBe(true); });
	test("the mock server is no longer started", () => { expect(/mockserver/.test(comp)).toBe(false); });
});
