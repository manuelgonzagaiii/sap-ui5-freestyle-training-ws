sap.ui.define([
	"sap/m/App",
	"sap/m/Page",
	"sap/m/Button",
	"sap/m/MessageToast"
], (App, Page, Button, MessageToast) => {
	"use strict";

	const oButton = new Button({
		text: "Say hello",
		press: () => {
			MessageToast.show("Hello from the Sales Order app");
		}
	});

	new App({
		pages: [
			new Page({
				title: "Sales Orders",
				content: [oButton]
			})
		]
	}).placeAt("content");
});
