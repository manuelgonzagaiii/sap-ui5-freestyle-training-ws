exports.config = {
	services: ["ui5"],
	framework: "mocha",
	specs: ["./Orders.e2e.js"],
	baseUrl: "http://localhost:8080/index.html",
	capabilities: [{ browserName: "chrome" }],
	wdi5: { logLevel: "error" }
};
