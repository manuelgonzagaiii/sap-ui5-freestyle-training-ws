sap.ui.define([
	"sap/ui/model/SimpleType"
], (SimpleType) => {
	"use strict";

	// A custom data type. Unlike a formatter (display only), a type can also
	// parse user input back and validate it - which is what makes it usable on
	// editable fields with two-way binding.
	return SimpleType.extend("ui5.sales.model.ItemCountType", {
		formatValue(iCount) {
			return iCount + (iCount === 1 ? " item" : " items");
		},

		parseValue(sValue) {
			return parseInt(sValue, 10);
		},

		validateValue() {
			// Nothing to validate for this simple example.
		}
	});
});
