sap.ui.define([
	"sap/ui/core/util/MockServer"
], (MockServer) => {
	"use strict";

	return {
		// Start an in-browser fake OData server that answers requests to /sales/
		// using our metadata and mock data. No real backend, no network.
		init() {
			const oMockServer = new MockServer({ rootUri: "/sales/" });
			oMockServer.simulate("localService/metadata.xml", {
				sMockdataBaseUrl: "localService/mockdata",
				bGenerateMissingMockData: true
			});
			oMockServer.start();
		}
	};
});
