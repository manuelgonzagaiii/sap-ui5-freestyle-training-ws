sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/Sorter", "ui5/sales/model/formatter"], (Controller, MessageToast, Filter, FilterOperator, Sorter, formatter) => {
	"use strict";
	return Controller.extend("ui5.sales.controller.List", {
		formatter: formatter,
		onSearch(oEvent) { const q = oEvent.getParameter("query"); this.byId("ordersTable").getBinding("items").filter(q ? [new Filter("customer", FilterOperator.Contains, q)] : []); },
		onOrderPress(oEvent) { this.getOwnerComponent().getRouter().navTo("detail", { orderId: oEvent.getSource().getBindingContext().getProperty("orderId") }); },
		onCreate() {
			const oBinding = this.byId("ordersTable").getBinding("items");
			const oContext = oBinding.create({ orderId: "SO-" + Date.now(), customer: "New customer", status: "Open", amount: "0.00", currency: "EUR", orderDate: "2026-01-01", priority: "Medium", itemCount: 1 });
			oContext.created().then(() => MessageToast.show("Order created"), () => MessageToast.show("Create failed"));
		},
		onOpenViewSettings(oEvent) {
			const oButton = oEvent.getSource();
			if (!this._pVSD) { this._pVSD = this.loadFragment({ name: "ui5.sales.view.fragment.ViewSettings" }); }
			this._pVSD.then((oDialog) => oDialog.open());
		},
		onConfirmViewSettings(oEvent) {
			const p = oEvent.getParameters();
			const aSorters = [];
			if (p.groupItem) { aSorters.push(new Sorter(p.groupItem.getKey(), p.groupDescending, true)); }
			if (p.sortItem) { aSorters.push(new Sorter(p.sortItem.getKey(), p.sortDescending)); }
			this.byId("ordersTable").getBinding("items").sort(aSorters);
		}
	});
});
