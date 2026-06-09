sap.ui.define([
	"sap/ui/core/UIComponent"
], (UIComponent) => {
	"use strict";

	return UIComponent.extend("ui5.sales.Component", {
		metadata: {
			interfaces: ["sap.ui.core.IAsyncContentCreation"],
			rootView: {
				viewName: "ui5.sales.view.App",
				type: "XML",
				id: "app"
			}
		}
	});
});
