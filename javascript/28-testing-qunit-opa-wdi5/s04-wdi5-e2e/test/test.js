const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const e2e = read("webapp/test/e2e/Orders.e2e.js");
const conf = read("webapp/test/e2e/wdio.conf.js");
describe("Lesson 28 Stage 4 - wdi5 e2e", () => {
	test("it drives the real app via wdi5 (browser.asControl)", () => {
		expect(/browser\.asControl\(/.test(e2e)).toBe(true);
		expect(/selector\s*:/.test(e2e)).toBe(true);
	});
	test("there is a wdi5/WebdriverIO config", () => {
		expect(/exports\.config/.test(conf)).toBe(true);
		expect(/services\s*:\s*\[[^\]]*["']ui5["']/.test(conf)).toBe(true);
	});
});
