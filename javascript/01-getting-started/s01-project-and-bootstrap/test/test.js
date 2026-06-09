const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const html = read("webapp/index.html");
const js = read("webapp/index.js");

function bootAttr(name) {
	const m = html.match(new RegExp("data-sap-ui-" + name + "\\s*=\\s*([\"'])([\\s\\S]*?)\\1", "i"));
	return m ? m[2].trim() : null;
}

describe("Stage 1 - bootstrap (valid values required, design choices are free)", () => {
	test("a real, modern theme is set (any Horizon variant is allowed)", () => {
		const allowed = ["sap_horizon", "sap_horizon_dark", "sap_horizon_hcb", "sap_horizon_hcw"];
		expect(allowed).toContain(bootAttr("theme"));
	});
	test("the sap.m library is loaded (extra libraries are allowed too)", () => {
		const libs = (bootAttr("libs") || "").split(",").map((s) => s.trim()).filter(Boolean);
		expect(libs).toContain("sap.m");
	});
	test("compatVersion is 'edge' or a valid version number", () => {
		const v = bootAttr("compatVersion");
		expect(v === "edge" || /^\d+(\.\d+){0,2}$/.test(v || "")).toBe(true);
	});
	test("async loading is ON - mandatory, not a preference", () => {
		expect(bootAttr("async")).toBe("true");
	});
	test("resourceroots is valid JSON and maps ui5.sales to ./", () => {
		const raw = bootAttr("resourceroots");
		let json; expect(() => { json = JSON.parse(raw); }).not.toThrow();
		expect(json["ui5.sales"]).toBe("./");
	});
	test("the bootstrap runs your start-up module ui5/sales/index", () => {
		expect(bootAttr("onInit")).toBe("module:ui5/sales/index");
	});
	test("index.js defines a module with sap.ui.define", () => {
		expect(/sap\.ui\.define\s*\(/.test(js)).toBe(true);
	});
});
