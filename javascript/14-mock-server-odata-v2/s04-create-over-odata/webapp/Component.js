sap.ui.define([
	"sap/ui/core/UIComponent",
	"ui5/sales/localService/mockserver"
], (UIComponent, mockserver) => {
	"use strict";
	return UIComponent.extend("ui5.sales.Component", {
		metadata: { interfaces: ["sap.ui.core.IAsyncContentCreation"], manifest: "json" },
		init() {
			// Start the mock server BEFORE the parent init creates the OData model
			// (declared in the manifest), so the model talks to the fake backend.
			mockserver.init();
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
		}
	});
});
