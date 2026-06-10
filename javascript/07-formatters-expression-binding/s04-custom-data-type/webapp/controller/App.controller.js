sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/Device",
	"ui5/sales/model/formatter"
], (Controller, MessageToast, JSONModel, Filter, FilterOperator, Device, formatter) => {
	"use strict";

	return Controller.extend("ui5.sales.controller.App", {
		// Expose the formatter module so the view can call it as ".formatter.xxx".
		formatter: formatter,

		onInit() {
			this.getView().setModel(new JSONModel({ isPhone: Device.system.phone }), "device");
		},

		onOrderPress(oEvent) {
			const oContext = oEvent.getSource().getBindingContext();
			this.byId("detailPanel").bindElement(oContext.getPath());
		},

		onSearch(oEvent) {
			const sQuery = oEvent.getParameter("query");
			const aFilters = sQuery ? [new Filter("customer", FilterOperator.Contains, sQuery)] : [];
			this.byId("ordersList").getBinding("items").filter(aFilters);
		},

		onCreate() {
			MessageToast.show("Create a new sales order");
		}
	});
});
