const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
describe("Lesson 4 Stage 3 - associations (labelFor)", () => {
	test("a Label is present and points at a control via labelFor", () => {
		const m = view.match(/<Label[^>]*\blabelFor\s*=\s*"([^"]+)"/);
		expect(m).not.toBeNull();
		const id = m[1];
		expect(new RegExp('\\bid\\s*=\\s*"' + id + '"').test(view)).toBe(true);
	});
});
