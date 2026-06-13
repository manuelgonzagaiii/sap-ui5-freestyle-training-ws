const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }

const ctrl = read("webapp/controller/Detail.controller.js");
describe("Lesson 16 Stage 4 - refreshing after a change", () => {
	test("after the action, the context is refreshed to show the new data", () => { expect(/\.refresh\(\)/.test(ctrl)).toBe(true); });
});
