const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const view = read("webapp/view/Detail.view.xml");
describe("Lesson 11 Stage 4 - inline messaging", () => {
	test("a MessageStrip is shown for the order", () => { expect(/<MessageStrip/.test(view)).toBe(true); });
	test("it appears only for cancelled orders, via expression binding", () => {
		const m = view.match(/visible\s*=\s*"([^"]*)"/);
		expect(m).not.toBeNull();
		expect(/^\{=/.test(m[1].trim())).toBe(true);
		expect(/status/.test(m[1])).toBe(true);
	});
});
