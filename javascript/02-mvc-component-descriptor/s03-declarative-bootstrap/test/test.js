const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const html = read("webapp/index.html");

describe("Lesson 2 Stage 3 - declarative component bootstrap", () => {
	test("the bootstrap runs ComponentSupport", () => {
		const m = html.match(/data-sap-ui-onInit\s*=\s*["']([^"']+)["']/i);
		expect(m && m[1]).toBe("module:sap/ui/core/ComponentSupport");
	});
	test("the page declares the component to start (data-sap-ui-component, data-name ui5.sales)", () => {
		expect(/data-sap-ui-component/.test(html)).toBe(true);
		expect(/data-name\s*=\s*["']ui5\.sales["']/.test(html)).toBe(true);
	});
});
