sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], (Controller, MessageToast) => {
	"use strict";

	return Controller.extend("ui5.sales.controller.App", {
		onInit() {
			// Runs once, when the controller is created - before the UI is rendered.
		},

		onAfterRendering() {
			// Runs after the view is on screen, so the DOM exists and we can, for
			// example, move keyboard focus to a control.
			this.byId("helloButton").focus();
		},

		onShowHello() {
			MessageToast.show("Hello from the Sales Order app");
		}
	});
});
