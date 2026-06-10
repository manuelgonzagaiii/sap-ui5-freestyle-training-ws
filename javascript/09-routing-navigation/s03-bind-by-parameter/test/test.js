const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const detail = read("webapp/controller/Detail.controller.js");
describe("Lesson 9 Stage 3 - bind the detail by route parameter", () => {
	test("the detail controller listens for its route being matched", () => {
		expect(/attachPatternMatched\(/.test(detail)).toBe(true);
	});
	test("it reads the route parameter and binds the view to that order", () => {
		expect(/getParameter\(\s*["']arguments["']\s*\)/.test(detail)).toBe(true);
		expect(/bindElement\(/.test(detail)).toBe(true);
	});
});
