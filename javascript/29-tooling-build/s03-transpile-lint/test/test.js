const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const y = read("ui5.yaml");
describe("Lesson 29 Stage 3 - transpile", () => {
	test("a transpile task and middleware are configured", () => {
		expect(/ui5-tooling-transpile-task/.test(y)).toBe(true);
		expect(/ui5-tooling-transpile-middleware/.test(y)).toBe(true);
	});
});
