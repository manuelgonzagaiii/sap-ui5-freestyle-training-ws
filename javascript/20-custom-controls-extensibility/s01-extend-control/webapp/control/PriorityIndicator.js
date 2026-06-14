sap.ui.define([
	"sap/ui/core/Control"
], (Control) => {
	"use strict";

	return Control.extend("ui5.sales.control.PriorityIndicator", {
		metadata: {
			properties: {
				value: { type: "string", defaultValue: "Medium" }
			}
		},

		renderer: {
			apiVersion: 2,
			render(rm, oControl) {
				rm.openStart("span", oControl);
				rm.openEnd();
				rm.text(oControl.getValue());
				rm.close("span");
			}
		}
	});
});
