const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
describe("Lesson 4 Stage 1 - the page frame", () => {
	test("the Page uses a customHeader", () => {
		expect(/<customHeader>/.test(view)).toBe(true);
	});
	test("the header is a Bar", () => {
		expect(/<Bar[\s>]/.test(view)).toBe(true);
	});
	test("the header shows a Title with non-empty text (the wording is yours)", () => {
		const m = view.match(/<Title[^>]*\btext\s*=\s*"([^"]*)"/);
		expect(m).not.toBeNull();
		expect(m[1].trim().length).toBeGreaterThan(0);
	});
});
