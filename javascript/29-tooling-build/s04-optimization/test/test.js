const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const y = read("ui5.yaml");
describe("Lesson 29 Stage 4 - optimization", () => {
	test("cache busting is configured", () => {
		expect(/cachebuster\s*:/.test(y)).toBe(true);
		expect(/signatureType\s*:\s*(time|hash)/.test(y)).toBe(true);
	});
});
