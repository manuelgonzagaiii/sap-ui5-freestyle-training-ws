const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const opa = read("webapp/test/integration/OrdersJourney.js");
describe("Lesson 28 Stage 2 - OPA5 integration", () => {
	test("it is an OPA5 journey", () => {
		expect(/opaTest\(/.test(opa)).toBe(true);
		expect(/iStartMyUIComponent\(/.test(opa)).toBe(true);
		expect(/iTeardownMyUIComponent\(/.test(opa)).toBe(true);
	});
	test("it waits for UI and asserts", () => {
		expect(/\.waitFor\(/.test(opa)).toBe(true);
	});
});
