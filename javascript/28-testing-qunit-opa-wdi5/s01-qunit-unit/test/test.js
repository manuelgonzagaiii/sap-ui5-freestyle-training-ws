const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const qunit = read("webapp/test/unit/model/formatter.qunit.js");
describe("Lesson 28 Stage 1 - QUnit unit test", () => {
	test("it is a QUnit test module", () => {
		expect(/QUnit\.module\(/.test(qunit)).toBe(true);
		expect(/QUnit\.test\(/.test(qunit)).toBe(true);
	});
	test("it exercises the formatter with assertions", () => {
		expect(/formatter\.statusState\(/.test(qunit)).toBe(true);
		expect(/assert\.(strictEqual|equal|deepEqual)\(/.test(qunit)).toBe(true);
	});
});
