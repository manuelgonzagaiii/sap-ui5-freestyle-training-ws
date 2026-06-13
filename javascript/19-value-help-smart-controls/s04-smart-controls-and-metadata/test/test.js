const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
function has(f) { return fs.existsSync(path.join(__dirname, "..", f)); }

const ann = read("srv/annotations.cds");
describe("Lesson 19 Stage 4 - labels in metadata", () => {
	test("entity fields carry @title labels in the service metadata", () => {
		expect(/@title\s*:\s*'[^']+'/.test(ann)).toBe(true);
		expect((ann.match(/@title/g) || []).length).toBeGreaterThanOrEqual(4);
	});
});
