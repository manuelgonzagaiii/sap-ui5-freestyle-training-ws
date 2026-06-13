const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const frag = read("webapp/view/fragment/CreateOrder.fragment.xml");
const schema = read("db/schema.cds");
describe("Lesson 19 Stage 1 - suggestions while typing", () => {
	test("the backend has a Customers entity with seed data", () => { expect(/entity\s+Customers/.test(schema)).toBe(true); expect(has("db/data/ui5.sales-Customers.csv")).toBe(true); });
	test("the customer input offers suggestions from the Customers entity", () => {
		expect(/showSuggestion\s*=\s*"true"/.test(frag)).toBe(true);
		expect(/suggestionItems\s*=\s*"\{[^"]*\/Customers/.test(frag)).toBe(true);
	});
});
