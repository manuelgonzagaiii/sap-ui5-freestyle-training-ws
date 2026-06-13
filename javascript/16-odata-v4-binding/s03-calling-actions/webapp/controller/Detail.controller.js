sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "ui5/sales/model/formatter"], (Controller, MessageToast, formatter) => {
	"use strict";
	return Controller.extend("ui5.sales.controller.Detail", {
		formatter: formatter,
		onInit() { this.getOwnerComponent().getRouter().getRoute("detail").attachPatternMatched(this._onMatched, this); },
		_onMatched(oEvent) {
			const sOrderId = oEvent.getParameter("arguments").orderId;
			this.getView().bindElement({
				path: "/SalesOrders(orderId='" + sOrderId + "')",
				parameters: { $expand: "items" }
			});
		},
		onSetCompleted() {
			const oContext = this.getView().getBindingContext();
			const oOperation = this.getView().getModel().bindContext("SalesService.setCompleted(...)", oContext);
			oOperation.invoke().then(
				() => MessageToast.show("Order marked completed"),
				() => MessageToast.show("Action failed")
			);
		},
		onClose() { this.getOwnerComponent().getRouter().navTo("list"); }
	});
});
