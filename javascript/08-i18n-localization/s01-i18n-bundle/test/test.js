const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
const manifest = read("webapp/manifest.json");
const props = read("webapp/i18n/i18n.properties");
describe("Lesson 8 Stage 1 - i18n bundle and ResourceModel", () => {
	test("an i18n ResourceModel is declared in the manifest", () => {
		const m = JSON.parse(manifest)["sap.ui5"].models.i18n;
		expect(m.type).toMatch(/ResourceModel/);
		expect(m.settings.bundleName).toMatch(/i18n/);
	});
	test("the view reads text from the i18n model", () => {
		expect(/\{i18n>\w+\}/.test(view)).toBe(true);
	});
	test("the properties bundle defines the keys used", () => {
		expect(/pageTitle\s*=/.test(props)).toBe(true);
	});
});
