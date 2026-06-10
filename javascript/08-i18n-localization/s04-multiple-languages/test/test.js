const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const manifest = read("webapp/manifest.json");
const en = read("webapp/i18n/i18n.properties");
const de = read("webapp/i18n/i18n_de.properties");
function keys(s) { return s.split("\n").map((l) => l.split("=")[0].trim()).filter((k) => k && !k.startsWith("#")); }
describe("Lesson 8 Stage 4 - multiple languages", () => {
	test("German is declared as a supported locale", () => {
		expect(JSON.parse(manifest)["sap.ui5"].models.i18n.settings.supportedLocales).toContain("de");
	});
	test("a German bundle exists with the same keys as the English one", () => {
		const ek = keys(en), dk = keys(de);
		ek.forEach((k) => expect(dk).toContain(k));
	});
});
