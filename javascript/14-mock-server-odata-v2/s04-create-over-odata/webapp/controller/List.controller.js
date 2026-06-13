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
		onCreate() {
			// Create a new SalesOrder through the OData model. The model batches the
			// change and sends it to the (mock) service; the list refreshes itself.
			this.getView().getModel().create("/SalesOrders", {
				orderId: "SO-" + Date.now(),
				customer: "New customer",
				status: "Open",
				amount: "0.00",
				currency: "EUR",
				orderDate: "2026-01-01",
				priority: "Medium",
				itemCount: 1
			}, {
				success: () => MessageToast.show("Order created"),
				error: () => MessageToast.show("Create failed")
			});
		}
	});
});
