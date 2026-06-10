const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const view = read("webapp/view/App.view.xml");
describe("Lesson 5 Stage 3 - responsive grid", () => {
	test("the layout uses a sap.ui.layout Grid", () => {
		expect(/xmlns:\w+\s*=\s*"sap\.ui\.layout"/.test(view)).toBe(true);
		expect(/<\w+:Grid[\s>]/.test(view)).toBe(true);
	});
	test("the Grid declares a responsive defaultSpan (e.g. XL3 L3 M6 S12)", () => {
		const m = view.match(/defaultSpan\s*=\s*"([^"]*)"/);
		expect(m).not.toBeNull();
		expect(/^(?:(?:XL|L|M|S)([1-9]|1[0-2])\s*){1,4}$/.test(m[1].trim())).toBe(true);
	});
});
