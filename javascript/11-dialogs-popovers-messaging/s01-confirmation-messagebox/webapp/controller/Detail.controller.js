sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/m/MessageBox", "sap/m/MessageToast", "ui5/sales/model/formatter"
], (Controller, MessageBox, MessageToast, formatter) => {
	"use strict";
	return Controller.extend("ui5.sales.controller.Detail", {
		formatter: formatter,
		onInit() { this.getOwnerComponent().getRouter().getRoute("detail").attachPatternMatched(this._onMatched, this); },
		_onMatched(oEvent) { this.getView().bindElement("/salesOrders/" + oEvent.getParameter("arguments").orderIndex); },
		onDeleteOrder() {
			const sText = this.getView().getModel("i18n").getResourceBundle().getText("deleteConfirm");
			MessageBox.confirm(sText, {
				onClose: (sAction) => {
					if (sAction === MessageBox.Action.OK) {
						MessageToast.show("Order deleted (demo)");
						this.onBack();
					}
				}
			});
		},
		onBack() { this.getOwnerComponent().getRouter().navTo("list"); }
	});
});
