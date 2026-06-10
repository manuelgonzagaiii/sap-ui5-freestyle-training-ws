sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel"
], (Controller, MessageToast, JSONModel) => {
	"use strict";

	return Controller.extend("ui5.sales.controller.App", {
		onInit() {
			this.getView().setModel(new JSONModel({
				kpi: { open: 12, inProcess: 5, completed: 27, revenue: 184250 }
			}));
		},

		onCreate() {
			MessageToast.show("Create a new sales order");
		}
	});
});
