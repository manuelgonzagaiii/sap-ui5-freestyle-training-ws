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
			const sPath = oEvent.getSource().getBindingContext().getPath();
			this.getOwnerComponent().getRouter().navTo("detail", { orderIndex: sPath.split("/").pop() });
		},
		onCreate() {
			this.getView().setModel(new JSONModel({ customer: "", amount: 0, currency: "EUR" }), "create");
			if (!this._pCreateDialog) { this._pCreateDialog = this.loadFragment({ name: "ui5.sales.view.fragment.CreateOrder" }); }
			this._pCreateDialog.then((oDialog) => oDialog.open());
		},
		onSaveOrder() {
			MessageToast.show("New order for: " + this.getView().getModel("create").getProperty("/customer"));
			this.byId("createOrderDialog").close();
		},
		onCancelOrder() { this.byId("createOrderDialog").close(); }
	});
});
