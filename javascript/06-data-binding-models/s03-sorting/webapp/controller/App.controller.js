sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], (Controller, MessageToast, JSONModel, Device) => {
	"use strict";

	return Controller.extend("ui5.sales.controller.App", {
		onInit() {
			this.getView().setModel(new JSONModel({ isPhone: Device.system.phone }), "device");
		},

		onOrderPress(oEvent) {
			// The pressed item carries a binding context - the single order it shows.
			const oContext = oEvent.getSource().getBindingContext();
			// Bind the detail panel to that context, so its relative bindings resolve
			// against this one order.
			this.byId("detailPanel").bindElement(oContext.getPath());
		},

		onCreate() {
			MessageToast.show("Create a new sales order");
		}
	});
});
