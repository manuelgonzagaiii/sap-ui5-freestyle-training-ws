const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const manifest = JSON.parse(read("webapp/manifest.json"));
const comp = read("webapp/Component.js");
const html = read("webapp/index.html");
describe("Lesson 27 Stage 1 - async loading", () => {
	test("routing is asynchronous", () => {
		expect(manifest["sap.ui5"].routing.config.async).toBe(true);
	});
	test("the component declares async content creation", () => {
		expect(/IAsyncContentCreation/.test(comp)).toBe(true);
	});
	test("the bootstrap is asynchronous", () => {
		expect(/data-sap-ui-async\s*=\s*["']true["']/.test(html)).toBe(true);
	});
});
