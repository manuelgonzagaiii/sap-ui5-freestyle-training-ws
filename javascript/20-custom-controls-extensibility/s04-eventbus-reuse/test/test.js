const fs = require("fs");
const path = require("path");
function read(f) { return fs.readFileSync(path.join(__dirname, "..", f), "utf8"); }
const list = read("webapp/controller/List.controller.js");
const app = read("webapp/controller/App.controller.js");
describe("Lesson 20 Stage 4 - EventBus reuse", () => {
	test("the list publishes on the component EventBus", () => {
		expect(/getEventBus\(\)\s*\.publish\(/.test(list)).toBe(true);
	});
	test("the app subscribes on the EventBus", () => {
		expect(/getEventBus\(\)\s*\.subscribe\(/.test(app)).toBe(true);
	});
	test("publish and subscribe use the same channel and event name", () => {
		const ch = list.match(/\.publish\(\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']/);
		const su = app.match(/\.subscribe\(\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']/);
		expect(ch).not.toBeNull(); expect(su).not.toBeNull();
		expect(ch[1]).toBe(su[1]); expect(ch[2]).toBe(su[2]);
	});
});
