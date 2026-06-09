sap.ui.define([
	"sap/ui/core/ComponentContainer"
], (ComponentContainer) => {
	"use strict";

	new ComponentContainer({
		name: "ui5.sales",
		settings: { id: "sales" },
		async: true
	}).placeAt("content");
});
