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
			const sPath = oEvent.getSource().getBindingContext().getPath();
			this.getOwnerComponent().getRouter().navTo("detail", { orderIndex: sPath.split("/").pop() });
		},

		onCreate() {
			// Cache the dialog so it is built only once and reused on every open.
			if (!this._pCreateDialog) {
				this._pCreateDialog = this.loadFragment({ name: "ui5.sales.view.fragment.CreateOrder" });
			}
			this._pCreateDialog.then((oDialog) => oDialog.open());
		},

		onSaveOrder() {
			// Fragment controls loaded via loadFragment are scoped to this view,
			// so this.byId reaches the dialog's input by its id.
			const sCustomer = this.byId("newCustomerInput").getValue();
			MessageToast.show("New order for: " + sCustomer);
			this.byId("createOrderDialog").close();
		},

		onCancelOrder() {
			this.byId("createOrderDialog").close();
		}
	});
});
