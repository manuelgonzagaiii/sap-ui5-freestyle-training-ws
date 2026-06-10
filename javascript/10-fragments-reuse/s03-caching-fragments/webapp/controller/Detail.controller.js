sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"ui5/sales/model/formatter"
], (Controller, formatter) => {
	"use strict";

	return Controller.extend("ui5.sales.controller.Detail", {
		formatter: formatter,

		onInit() {
			this.getOwnerComponent().getRouter().getRoute("detail").attachPatternMatched(this._onMatched, this);
		},

		_onMatched(oEvent) {
			const sIndex = oEvent.getParameter("arguments").orderIndex;
			this.getView().bindElement("/salesOrders/" + sIndex);
		},

		onBack() {
			this.getOwnerComponent().getRouter().navTo("list");
		}
	});
});
