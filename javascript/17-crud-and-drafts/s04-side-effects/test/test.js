const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const ctrl = read("webapp/controller/Detail.controller.js");
describe("Lesson 17 Stage 4 - side effects", () => {
	test("after the action, only the changed fields are refreshed", () => { expect(/requestSideEffects\(\s*\[[^\]]+\]\s*\)/.test(ctrl)).toBe(true); });
});
