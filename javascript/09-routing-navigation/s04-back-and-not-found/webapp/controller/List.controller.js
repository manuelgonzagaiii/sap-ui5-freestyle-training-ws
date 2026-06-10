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

	return Controller.extend("ui5.sales.controller.List", {
		formatter: formatter,

		onInit() {
			this.getView().setModel(new JSONModel({ isPhone: Device.system.phone }), "device");
		},

		onSearch(oEvent) {
			const sQuery = oEvent.getParameter("query");
			const aFilters = sQuery ? [new Filter("customer", FilterOperator.Contains, sQuery)] : [];
			this.byId("ordersList").getBinding("items").filter(aFilters);
		},

		onOrderPress(oEvent) {
			// Turn the pressed item's binding context (e.g. /salesOrders/3) into the
			// row index, and navigate to the detail route with it as a parameter.
			const sPath = oEvent.getSource().getBindingContext().getPath();
			const sIndex = sPath.split("/").pop();
			this.getOwnerComponent().getRouter().navTo("detail", { orderIndex: sIndex });
		},

		onCreate() {
			MessageToast.show("Create a new sales order");
		}
	});
});
