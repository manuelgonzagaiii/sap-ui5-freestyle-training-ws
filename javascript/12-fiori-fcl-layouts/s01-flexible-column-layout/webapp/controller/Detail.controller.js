sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast", "ui5/sales/model/formatter"
], (Controller, MessageBox, MessageToast, formatter) => {
	"use strict";
	return Controller.extend("ui5.sales.controller.Detail", {
		formatter: formatter,
		onInit() { this.getOwnerComponent().getRouter().getRoute("detail").attachPatternMatched(this._onMatched, this); },
		_onMatched(oEvent) { this.getView().bindElement("/salesOrders/" + oEvent.getParameter("arguments").orderIndex); },
		onReload() { const oView = this.getView(); oView.setBusy(true); setTimeout(() => oView.setBusy(false), 1000); },
		onDeleteOrder() {
			MessageBox.confirm("Delete this sales order?", { onClose: (sAction) => { if (sAction === MessageBox.Action.OK) { MessageToast.show("Order deleted (demo)"); this.onClose(); } } });
		},
		onClose() {
			this.getOwnerComponent().getRouter().navTo("list");
		}
	});
});
