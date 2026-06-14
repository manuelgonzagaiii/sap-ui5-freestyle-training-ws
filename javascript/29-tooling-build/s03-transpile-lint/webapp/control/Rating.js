sap.ui.define([
	"sap/ui/core/webc/WebComponent"
], (WebComponent) => {
	"use strict";

	return WebComponent.extend("ui5.sales.control.Rating", {
		metadata: {
			tag: "ui5-rating-indicator",
			properties: {
				value: { type: "float", defaultValue: 0, mapping: "property" },
				max: { type: "int", defaultValue: 5, mapping: "property" },
				readonly: { type: "boolean", defaultValue: false, mapping: "property" }
			},
			events: {
				change: {}
			}
		}
	});
});
