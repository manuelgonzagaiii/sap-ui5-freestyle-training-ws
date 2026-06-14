const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const frag = read("webapp/view/fragment/CreateWizard.fragment.xml");
const ctrl = read("webapp/controller/List.controller.js");
describe("Lesson 26 Stage 3 - wizard", () => {
	test("the fragment defines a multi-step Wizard", () => {
		expect(/<Wizard\b/.test(frag)).toBe(true);
		expect((frag.match(/<WizardStep\b/g) || []).length).toBeGreaterThanOrEqual(2);
	});
	test("the wizard's finish is handled", () => {
		expect(/<Wizard[^>]*finish\s*=\s*["']\.onWizardComplete["']/.test(frag)).toBe(true);
		expect(/onWizardComplete\s*\(/.test(ctrl)).toBe(true);
	});
});
