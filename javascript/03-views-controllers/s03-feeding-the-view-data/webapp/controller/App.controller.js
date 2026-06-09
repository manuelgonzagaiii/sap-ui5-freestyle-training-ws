sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], (Controller, MessageToast, JSONModel) => {
	"use strict";

	return Controller.extend("ui5.sales.controller.App", {
		onInit() {
			const oModel = new JSONModel({
				appTitle: "Sales Order Management",
				ordersToday: 0
			});
			this.getView().setModel(oModel);
		},

		onAfterRendering() {
			this.byId("helloButton").focus();
		},

		onShowHello() {
			MessageToast.show("Hello from the Sales Order app");
		}
	});
});
