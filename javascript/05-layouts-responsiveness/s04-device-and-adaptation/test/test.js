const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
const ctrl = read("webapp/controller/App.controller.js");
describe("Lesson 5 Stage 4 - adapting to the device", () => {
	test("the controller loads sap.ui.Device", () => {
		expect(/["']sap\/ui\/Device["']/.test(ctrl)).toBe(true);
	});
	test("a named 'device' model is created from the device info", () => {
		expect(/,\s*["']device["']\s*\)/.test(ctrl)).toBe(true);
		expect(/Device\.system\.phone/.test(ctrl)).toBe(true);
	});
	test("a control adapts to the device via a binding on the device model", () => {
		expect(/device>\/\w+/.test(view)).toBe(true);
	});
});
