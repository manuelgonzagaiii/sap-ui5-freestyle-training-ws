sap.ui.define(["sap/ui/core/UIComponent", "ui5/sales/localService/mockserver"], (UIComponent, mockserver) => {
	"use strict";
	return UIComponent.extend("ui5.sales.Component", {
		metadata: { interfaces: ["sap.ui.core.IAsyncContentCreation"], manifest: "json" },
		init() { mockserver.init(); UIComponent.prototype.init.apply(this, arguments); this.getRouter().initialize(); }
	});
});
