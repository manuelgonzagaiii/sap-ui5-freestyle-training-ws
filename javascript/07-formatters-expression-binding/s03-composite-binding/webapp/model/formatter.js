sap.ui.define([], () => {
	"use strict";

	return {
		statusState(sStatus) {
			switch (sStatus) {
				case "Completed":
					return "Success";
				case "In Process":
					return "Warning";
				case "Cancelled":
					return "Error";
				default:
					return "None";
			}
		},

		// Combine two fields into one readable line, e.g. "Atlas Trading (SO-1001)".
		customerLine(sCustomer, sOrderId) {
			return sCustomer + " (" + sOrderId + ")";
		}
	};
});
