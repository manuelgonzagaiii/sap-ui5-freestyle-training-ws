const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
describe("Lesson 5 Stage 2 - flex alignment and wrapping", () => {
	const fb = (view.match(/<FlexBox[^>]*>/) || [""])[0];
	test("justifyContent is set to a valid value", () => {
		const m = fb.match(/\bjustifyContent\s*=\s*"([^"]*)"/);
		expect(m).not.toBeNull();
		expect(["Start", "End", "Center", "SpaceBetween", "SpaceAround", "SpaceEvenly"]).toContain(m[1]);
	});
	test("wrapping is enabled with a valid wrap value", () => {
		const m = fb.match(/\bwrap\s*=\s*"([^"]*)"/);
		expect(m).not.toBeNull();
		expect(["NoWrap", "Wrap", "WrapReverse"]).toContain(m[1]);
	});
});
