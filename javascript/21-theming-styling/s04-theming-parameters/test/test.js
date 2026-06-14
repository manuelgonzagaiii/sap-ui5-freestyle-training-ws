const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const app = read("webapp/controller/App.controller.js");
describe("Lesson 21 Stage 4 - theming parameters in JS", () => {
	test("it imports the theming Parameters module", () => {
		expect(/["']sap\/ui\/core\/theming\/Parameters["']/.test(app)).toBe(true);
	});
	test("it reads a parameter by name", () => {
		expect(/Parameters\.get\(/.test(app)).toBe(true);
		expect(/name\s*:\s*["'][^"']+["']/.test(app)).toBe(true);
	});
	test("it uses the asynchronous callback form (theme may not be loaded yet)", () => {
		expect(/callback\s*:/.test(app)).toBe(true);
	});
});
