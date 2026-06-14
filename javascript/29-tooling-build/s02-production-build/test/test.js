const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const y = read("ui5.yaml");
describe("Lesson 29 Stage 2 - production build", () => {
	test("the builder bundles a Component-preload", () => {
		expect(/builder\s*:/.test(y)).toBe(true);
		expect(/componentPreload\s*:/.test(y)).toBe(true);
		expect(/namespaces\s*:/.test(y)).toBe(true);
	});
});
