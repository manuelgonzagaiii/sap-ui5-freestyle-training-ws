sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], (Controller, JSONModel, MessageToast) => {
	"use strict";

	return Controller.extend("ui5.sales.controller.App", {
		onInit() {
			this.getOwnerComponent().setModel(new JSONModel({ layout: "OneColumn" }), "fcl");
			this.getOwnerComponent().getRouter().attachRouteMatched(this._onRouteMatched, this);
			this.getOwnerComponent().getEventBus().subscribe("orders", "priorityPressed", this._onPriorityPressed, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		_onRouteMatched(oEvent) {
			const s = oEvent.getParameter("config").layout;
			if (s) { this.getOwnerComponent().getModel("fcl").setProperty("/layout", s); }
		},
		_onPriorityPressed(sChannel, sEvent, oData) {
			const oBundle = this.getView().getModel("i18n").getResourceBundle();
			MessageToast.show(oBundle.getText("priorityToast", [oData.value]));
		}
	});
});
