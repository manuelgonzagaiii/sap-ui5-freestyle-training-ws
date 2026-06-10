const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const frag = read("webapp/view/fragment/OrderHeader.fragment.xml");
const detail = read("webapp/view/Detail.view.xml");
describe("Lesson 10 Stage 1 - XML fragments", () => {
	test("the OrderHeader fragment is a FragmentDefinition with an ObjectHeader", () => {
		expect(/<core:FragmentDefinition/.test(frag)).toBe(true);
		expect(/<ObjectHeader/.test(frag)).toBe(true);
	});
	test("the detail view includes the fragment by name", () => {
		expect(/<core:Fragment[^>]*fragmentName\s*=\s*"ui5\.sales\.view\.fragment\.OrderHeader"/.test(detail)).toBe(true);
	});
});
