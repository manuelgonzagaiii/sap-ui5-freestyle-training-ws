sap.ui.define([
	"sap/ui/core/Control"
], (Control) => {
	"use strict";

	return Control.extend("ui5.sales.control.PriorityIndicator", {
		metadata: {
			properties: {
				value: { type: "string", defaultValue: "Medium" }
			},
			events: {
				press: {}
			}
		},

		renderer: {
			apiVersion: 2,
			render(rm, oControl) {
				const sValue = oControl.getValue();
				const sState = sValue === "High" ? "salesPriorityHigh"
					: sValue === "Low" ? "salesPriorityLow" : "salesPriorityMedium";
				rm.openStart("span", oControl);
				rm.class("salesPriority");
				rm.class(sState);
				rm.attr("tabindex", "0");
				rm.attr("role", "button");
				rm.attr("aria-label", sValue + " priority");
				rm.openEnd();
				rm.text(sValue);
				rm.close("span");
			}
		},

		onclick() {
			this.firePress();
		}
	});
});
