sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], (Controller, MessageToast, JSONModel, Device) => {
	"use strict";

	return Controller.extend("ui5.sales.controller.App", {
		onInit() {
			// The main data model is declared in manifest.json (model/salesOrders.json).
			// Here we only add the small named "device" model.
			this.getView().setModel(new JSONModel({ isPhone: Device.system.phone }), "device");
		},

		onCreate() {
			MessageToast.show("Create a new sales order");
		}
	});
});
