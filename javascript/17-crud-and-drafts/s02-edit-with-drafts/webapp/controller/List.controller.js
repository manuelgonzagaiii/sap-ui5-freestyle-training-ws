sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "ui5/sales/model/formatter"], (Controller, MessageToast, Filter, FilterOperator, formatter) => {
	"use strict";
	return Controller.extend("ui5.sales.controller.List", {
		formatter: formatter,
		onSearch(oEvent) { const q = oEvent.getParameter("query"); this.byId("ordersList").getBinding("items").filter(q ? [new Filter("customer", FilterOperator.Contains, q)] : []); },
		onOrderPress(oEvent) { this.getOwnerComponent().getRouter().navTo("detail", { orderId: oEvent.getSource().getBindingContext().getProperty("orderId") }); },
		onCreate() {
			// In OData V4 you create through the LIST BINDING, which returns a
			// transient context that becomes a real entity once the server accepts it.
			const oBinding = this.byId("ordersList").getBinding("items");
			const oContext = oBinding.create({
				orderId: "SO-" + Date.now(), customer: "New customer", status: "Open",
				amount: "0.00", currency: "EUR", orderDate: "2026-01-01", priority: "Medium", itemCount: 1
			});
			oContext.created().then(() => MessageToast.show("Order created"), () => MessageToast.show("Create failed"));
		}
	});
});
