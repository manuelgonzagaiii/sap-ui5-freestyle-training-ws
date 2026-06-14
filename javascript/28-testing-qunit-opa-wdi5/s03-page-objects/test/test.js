const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const page = read("webapp/test/integration/pages/OrdersList.js");
const journey = read("webapp/test/integration/OrdersJourney.js");
describe("Lesson 28 Stage 3 - page objects", () => {
	test("a page object with actions and assertions is defined", () => {
		expect(/Opa5\.createPageObjects\(/.test(page)).toBe(true);
		expect(/actions\s*:/.test(page)).toBe(true);
		expect(/assertions\s*:/.test(page)).toBe(true);
	});
	test("the journey uses the page object", () => {
		expect(/onTheOrdersList\./.test(journey)).toBe(true);
	});
});
