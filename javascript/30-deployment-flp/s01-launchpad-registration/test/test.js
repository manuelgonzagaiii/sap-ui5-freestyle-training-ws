const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const manifest = JSON.parse(read("webapp/manifest.json"));
describe("Lesson 30 Stage 1 - launchpad registration", () => {
	test("the app declares a launchpad inbound", () => {
		const inbounds = manifest["sap.app"].crossNavigation && manifest["sap.app"].crossNavigation.inbounds;
		expect(inbounds).toBeTruthy();
		const first = inbounds && Object.values(inbounds)[0];
		expect(first.semanticObject).toBeTruthy();
		expect(first.action).toBeTruthy();
	});
});
