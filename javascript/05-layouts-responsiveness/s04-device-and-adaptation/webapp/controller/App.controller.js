sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], (Controller, MessageToast, JSONModel, Device) => {
	"use strict";

	return Controller.extend("ui5.sales.controller.App", {
		onInit() {
			this.getView().setModel(new JSONModel({
				kpi: { open: 12, inProcess: 5, completed: 27, revenue: 184250 }
			}));

			// A separate, named "device" model exposes what kind of device we are
			// on, so the view can adapt declaratively.
			this.getView().setModel(new JSONModel({
				isPhone: Device.system.phone
			}), "device");
		},

		onCreate() {
			MessageToast.show("Create a new sales order");
		}
	});
});
