sap.ui.define([
	"sap/ui/model/SimpleType"
], (SimpleType) => {
	"use strict";
	return SimpleType.extend("ui5.sales.model.ItemCountType", {
		formatValue(iCount) { return iCount + (iCount === 1 ? " item" : " items"); },
		parseValue(sValue) { return parseInt(sValue, 10); },
		validateValue() {}
	});
});
