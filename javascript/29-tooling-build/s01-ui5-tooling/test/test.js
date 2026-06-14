const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const y = read("ui5.yaml");
describe("Lesson 29 Stage 1 - ui5.yaml", () => {
	test("it is an application project on OpenUI5", () => {
		expect(/type:\s*application/.test(y)).toBe(true);
		expect(/name:\s*OpenUI5/.test(y)).toBe(true);
	});
	test("the framework version is a valid version", () => {
		const m = y.match(/version:\s*["']?(\d+\.\d+\.\d+)["']?/);
		expect(m).not.toBeNull();
	});
	test("the libraries the app uses are declared for the tooling", () => {
		expect(/name:\s*sap\.m\b/.test(y)).toBe(true);
	});
});
