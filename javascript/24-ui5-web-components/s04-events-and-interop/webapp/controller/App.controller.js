sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/ui/core/theming/Parameters"
], (Controller, JSONModel, MessageToast, Parameters) => {
	"use strict";

	return Controller.extend("ui5.sales.controller.App", {
		onInit() {
			this.getOwnerComponent().setModel(new JSONModel({ layout: "OneColumn" }), "fcl");
			this.getOwnerComponent().getRouter().attachRouteMatched(this._onRouteMatched, this);
			this.getOwnerComponent().getEventBus().subscribe("orders", "priorityPressed", this._onPriorityPressed, this);
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			this._readBrandColor();
		},
		_onRouteMatched(oEvent) {
			const s = oEvent.getParameter("config").layout;
			if (s) { this.getOwnerComponent().getModel("fcl").setProperty("/layout", s); }
		},
		_onPriorityPressed(sChannel, sEvent, oData) {
			const oBundle = this.getView().getModel("i18n").getResourceBundle();
			MessageToast.show(oBundle.getText("priorityToast", [oData.value]));
		},
		_readBrandColor() {
			const sColor = Parameters.get({ name: "sapUiBrandColor", callback: (sAsync) => this._applyBrand(sAsync) });
			this._applyBrand(sColor);
		},
		_applyBrand(sColor) {
			if (sColor) { document.documentElement.style.setProperty("--salesBrand", sColor); }
		}
	});
});
