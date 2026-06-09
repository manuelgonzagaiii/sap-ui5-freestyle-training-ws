sap.ui.define([
	"sap/m/Button",
	"sap/m/MessageToast"
], (Button, MessageToast) => {
	"use strict";

	new Button({
		text: "Say hello",
		press: () => {
			MessageToast.show("Hello from the Sales Order app");
		}
	}).placeAt("content");
});
