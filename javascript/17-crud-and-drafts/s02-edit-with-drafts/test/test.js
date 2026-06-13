const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const ctrl = read("webapp/controller/Detail.controller.js");
const view = read("webapp/view/Detail.view.xml");
describe("Lesson 17 Stage 2 - editing with a deferred group", () => {
	test("edits go to a deferred update group", () => { expect(/\$\$updateGroupId\s*:\s*"editGroup"/.test(ctrl)).toBe(true); });
	test("Save submits the group and Cancel resets it", () => { expect(/submitBatch\(\s*"editGroup"\s*\)/.test(ctrl)).toBe(true); expect(/resetChanges\(\s*"editGroup"\s*\)/.test(ctrl)).toBe(true); });
	test("the detail has an editable field", () => { expect(/<Input\s+value="\{customer\}"/.test(view)).toBe(true); });
});
