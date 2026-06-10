sap.ui.define([
	"sap/ui/core/UIComponent"
], (UIComponent) => {
	"use strict";

	return UIComponent.extend("ui5.sales.Component", {
		metadata: {
			interfaces: ["sap.ui.core.IAsyncContentCreation"],
			manifest: "json"
		},

		init() {
			UIComponent.prototype.init.apply(this, arguments);

			// Start the router. It reads the routing config from the manifest and
			// displays the view that matches the current URL.
			this.getRouter().initialize();
		}
	});
});
