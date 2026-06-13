sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "ui5/sales/model/formatter"], (Controller, MessageToast, Filter, FilterOperator, formatter) => {
	"use strict";
	return Controller.extend("ui5.sales.controller.List", {
		formatter: formatter,
		onSearch(oEvent) { const q = oEvent.getParameter("query"); this.byId("ordersList").getBinding("items").filter(q ? [new Filter("customer", FilterOperator.Contains, q)] : []); },
		onOrderPress(oEvent) {
			const sOrderId = oEvent.getSource().getBindingContext().getProperty("orderId");
			this.getOwnerComponent().getRouter().navTo("detail", { orderId: sOrderId });
		},
		onCreate() { MessageToast.show("Creating over OData V4 comes in the CRUD lesson"); }
	});
});
