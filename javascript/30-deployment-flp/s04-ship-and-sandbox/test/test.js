const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const flp = read("webapp/flpSandbox.html");
describe("Lesson 30 Stage 4 - launchpad sandbox", () => {
	test("there is a launchpad sandbox configuration", () => {
		expect(/sap-ushell-config/.test(flp)).toBe(true);
		expect(/ushell\/bootstrap\/sandbox/.test(flp)).toBe(true);
	});
	test("the app component is registered as a tile target", () => {
		expect(/SAPUI5\.Component\s*=\s*ui5\.sales/.test(flp)).toBe(true);
	});
});
