sap.ui.define(["sap/ui/core/mvc/Controller", "ui5/sales/model/formatter"], (Controller, formatter) => {
	"use strict";
	return Controller.extend("ui5.sales.controller.Detail", {
		formatter: formatter,
		onInit() { this.getOwnerComponent().getRouter().getRoute("detail").attachPatternMatched(this._onMatched, this); },
		_onMatched(oEvent) {
			const sOrderId = oEvent.getParameter("arguments").orderId;
			const sPath = this.getView().getModel().createKey("/SalesOrders", { orderId: sOrderId });
			this.getView().bindElement(sPath);
		},
		onClose() { this.getOwnerComponent().getRouter().navTo("list"); }
	});
});
