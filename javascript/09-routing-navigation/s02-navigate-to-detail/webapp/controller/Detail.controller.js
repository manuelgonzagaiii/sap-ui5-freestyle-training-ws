sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"ui5/sales/model/formatter"
], (Controller, formatter) => {
	"use strict";

	return Controller.extend("ui5.sales.controller.Detail", {
		formatter: formatter,

		onInit() {
		}
	});
});
