sap.ui.define([], () => {
	"use strict";

	return {
		// Map an order status to a semantic colour (a sap.ui.core.ValueState).
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
		}
	};
});
