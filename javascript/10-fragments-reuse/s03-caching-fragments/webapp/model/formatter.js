sap.ui.define([], () => {
	"use strict";
	return {
		statusState(sStatus) {
			switch (sStatus) {
				case "Completed": return "Success";
				case "In Process": return "Warning";
				case "Cancelled": return "Error";
				default: return "None";
			}
		}
	};
});
