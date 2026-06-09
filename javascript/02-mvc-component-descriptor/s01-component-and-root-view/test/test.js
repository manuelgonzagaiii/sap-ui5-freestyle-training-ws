const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const comp = read("webapp/Component.js");
const view = read("webapp/view/App.view.xml");
const idx = read("webapp/index.js");

describe("Lesson 2 Stage 1 - the Component and its root view", () => {
	test("the Component extends sap.ui.core.UIComponent", () => {
		expect(/UIComponent\.extend\(/.test(comp)).toBe(true);
		expect(/["']sap\/ui\/core\/UIComponent["']/.test(comp)).toBe(true);
	});
	test("it declares a rootView pointing at ui5.sales.view.App", () => {
		expect(/rootView/.test(comp)).toBe(true);
		expect(/ui5\.sales\.view\.App/.test(comp)).toBe(true);
	});
	test("it opts into async content creation (best practice)", () => {
		expect(/IAsyncContentCreation/.test(comp)).toBe(true);
	});
	test("the root view is an XML view containing an App and a Page", () => {
		expect(/<mvc:View/.test(view)).toBe(true);
		expect(/<App/.test(view)).toBe(true);
		expect(/<Page/.test(view)).toBe(true);
	});
	test("the page has a non-empty title (the wording is your choice)", () => {
		const m = view.match(/<Page[^>]*\btitle\s*=\s*"([^"]*)"/);
		expect(m).not.toBeNull();
		expect(m[1].trim().length).toBeGreaterThan(0);
	});
	test("index.js starts the component with a ComponentContainer named ui5.sales", () => {
		expect(/ComponentContainer/.test(idx)).toBe(true);
		expect(/name\s*:\s*["']ui5\.sales["']/.test(idx)).toBe(true);
	});
});
