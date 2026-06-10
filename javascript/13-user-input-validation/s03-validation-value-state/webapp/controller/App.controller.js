sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"], (Controller, JSONModel) => {
	"use strict";
	return Controller.extend("ui5.sales.controller.App", {
		onInit() {
			this.getOwnerComponent().setModel(new JSONModel({ layout: "OneColumn" }), "fcl");
			this.getOwnerComponent().getRouter().attachRouteMatched(this._onRouteMatched, this);
		},
		_onRouteMatched(oEvent) { const sLayout = oEvent.getParameter("config").layout; if (sLayout) { this.getOwnerComponent().getModel("fcl").setProperty("/layout", sLayout); } }
	});
});
