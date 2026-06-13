sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter", "sap/ui/model/FilterOperator", "ui5/sales/model/formatter"
], (Controller, MessageToast, JSONModel, Filter, FilterOperator, formatter) => {
	"use strict";
	return Controller.extend("ui5.sales.controller.List", {
		formatter: formatter,
		onSearch(oEvent) {
			const sQuery = oEvent.getParameter("query");
			const aFilters = sQuery ? [new Filter("customer", FilterOperator.Contains, sQuery)] : [];
			this.byId("ordersList").getBinding("items").filter(aFilters);
		},
		onOrderPress(oEvent) {
			const sOrderId = oEvent.getSource().getBindingContext().getProperty("orderId");
			this.getOwnerComponent().getRouter().navTo("detail", { orderId: sOrderId });
		},
		onCreate() { MessageToast.show("Create dialog comes later"); }
	});
});
