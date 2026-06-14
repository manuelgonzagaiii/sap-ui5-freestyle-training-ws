const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const y = read("ui5-deploy.yaml");
describe("Lesson 30 Stage 3 - deployment", () => {
	test("a deployment descriptor with a target and app is present", () => {
		expect(/customTasks\s*:/.test(y)).toBe(true);
		expect(/target\s*:/.test(y)).toBe(true);
		expect(/app\s*:/.test(y)).toBe(true);
		expect(/name\s*:\s*\S+/.test(y)).toBe(true);
	});
});
