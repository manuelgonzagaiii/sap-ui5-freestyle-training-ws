const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const list = read("webapp/controller/List.controller.js");
describe("Lesson 25 Stage 4 - high contrast", () => {
	test("the theme rotation includes a high-contrast theme", () => {
		expect(/sap_horizon_hc[bw]|sap_fiori_3_hc[bw]|_hcb|_hcw/.test(list)).toBe(true);
	});
	test("every theme id used is a valid sap_ theme", () => {
		const arr = list.match(/\[([^\]]*sap_[^\]]*)\]/);
		expect(arr).not.toBeNull();
		const ids = arr[1].match(/["']([^"']+)["']/g) || [];
		expect(ids.length).toBeGreaterThan(0);
		ids.forEach((q) => expect(/^["']sap_[a-z0-9_]+["']$/.test(q)).toBe(true));
	});
});
