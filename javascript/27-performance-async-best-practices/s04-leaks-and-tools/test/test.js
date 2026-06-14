const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const ctrl = read("webapp/controller/List.controller.js");
describe("Lesson 27 Stage 4 - cleanup", () => {
	test("the controller cleans up on exit", () => {
		expect(/onExit\s*\(/.test(ctrl)).toBe(true);
		expect(/\.destroy\(\)/.test(ctrl)).toBe(true);
	});
});
