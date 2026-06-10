const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const ctrl = read("webapp/controller/List.controller.js");
describe("Lesson 10 Stage 3 - caching the fragment", () => {
	test("the dialog is stored on the controller and only built when missing", () => {
		expect(/this\._\w+\s*=\s*this\.loadFragment\(/.test(ctrl)).toBe(true);
		expect(/if\s*\(\s*!\s*this\._\w+/.test(ctrl)).toBe(true);
	});
});
