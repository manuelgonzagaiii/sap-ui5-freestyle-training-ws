sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter", "sap/ui/model/FilterOperator", "ui5/sales/model/formatter",
	"sap/ui/core/Messaging"
], (Controller, MessageToast, JSONModel, Filter, FilterOperator, formatter, Messaging) => {
	"use strict";
	return Controller.extend("ui5.sales.controller.List", {
		formatter: formatter,
		onInit() {
			// Let the framework collect validation messages (from typed bindings) for
			// this view, and expose them as a named "message" model for the UI.
			Messaging.registerObject(this.getView(), true);
			this.getView().setModel(Messaging.getMessageModel(), "message");
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
			this.getView().setModel(new JSONModel({ customer: "", amount: 0, currency: "EUR" }), "create");
			if (!this._pCreateDialog) { this._pCreateDialog = this.loadFragment({ name: "ui5.sales.view.fragment.CreateOrder" }); }
			this._pCreateDialog.then((oDialog) => oDialog.open());
		},
		onSaveOrder() {
			if (Messaging.getMessageModel().getData().length > 0) {
				MessageToast.show(this.getView().getModel("i18n").getResourceBundle().getText("fixErrors"));
				return;
			}
			MessageToast.show("New order for: " + this.getView().getModel("create").getProperty("/customer"));
			this.byId("createOrderDialog").close();
		},
		onCancelOrder() { this.byId("createOrderDialog").close(); },
		onShowMessages(oEvent) {
			const oButton = oEvent.getSource();
			if (!this._pMessagePopover) { this._pMessagePopover = this.loadFragment({ name: "ui5.sales.view.fragment.MessagePopover" }); }
			this._pMessagePopover.then((oPopover) => oPopover.openBy(oButton));
		}
	});
});
