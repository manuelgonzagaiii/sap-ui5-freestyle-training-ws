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
			// Load the dialog fragment, then open it. (Loaded fresh each time for now.)
			this.loadFragment({ name: "ui5.sales.view.fragment.CreateOrder" }).then((oDialog) => oDialog.open());
		},

		onSaveOrder() {
			MessageToast.show("Order saved (demo)");
			this.byId("createOrderDialog").close();
		},

		onCancelOrder() {
			this.byId("createOrderDialog").close();
		}
	});
});
