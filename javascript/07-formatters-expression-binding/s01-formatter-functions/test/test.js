const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
const fmt = read("webapp/model/formatter.js");
describe("Lesson 7 Stage 1 - formatter functions", () => {
	test("the formatter maps statuses to valid value states", () => {
		expect(/statusState\s*\(/.test(fmt)).toBe(true);
		["Success", "Warning", "Error"].forEach((s) => expect(fmt.includes('"' + s + '"')).toBe(true));
	});
	test("the view colours the status via the formatter", () => {
		expect(/<ObjectStatus[^>]*state\s*=\s*"\{[^"]*formatter\s*:\s*'\.formatter\.statusState'/.test(view)).toBe(true);
	});
});
