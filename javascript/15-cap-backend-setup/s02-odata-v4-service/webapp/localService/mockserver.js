sap.ui.define(["sap/ui/core/util/MockServer"], (MockServer) => {
	"use strict";
	return { init() { const s = new MockServer({ rootUri: "/sales/" }); s.simulate("localService/metadata.xml", { sMockdataBaseUrl: "localService/mockdata", bGenerateMissingMockData: true }); s.start(); } };
});
