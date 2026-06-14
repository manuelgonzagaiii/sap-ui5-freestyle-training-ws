const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const ctrl = read("webapp/control/Rating.js");
const pkg = JSON.parse(read("package.json"));
describe("Lesson 24 Stage 1 - web component wrapper", () => {
	test("the wrapper extends the WebComponent base class", () => {
		expect(/["']sap\/ui\/core\/webc\/WebComponent["']/.test(ctrl)).toBe(true);
		expect(/WebComponent\.extend\(/.test(ctrl)).toBe(true);
	});
	test("it declares the custom-element tag to wrap", () => {
		const m = ctrl.match(/tag\s*:\s*["']([^"']+)["']/);
		expect(m).not.toBeNull();
		expect(m[1]).toMatch(/^[a-z][a-z0-9]*-[a-z0-9-]+$/);
	});
	test("the web components package is a dependency", () => {
		const deps = Object.assign({}, pkg.dependencies, pkg.devDependencies);
		expect(Object.keys(deps)).toContain("@ui5/webcomponents");
	});
});
