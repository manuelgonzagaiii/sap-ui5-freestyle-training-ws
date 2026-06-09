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
			// Always call the parent init first - it reads and applies the manifest.
			UIComponent.prototype.init.apply(this, arguments);
		}
	});
});
