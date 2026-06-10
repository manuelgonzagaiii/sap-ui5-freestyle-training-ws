sap.ui.define(["sap/ui/model/SimpleType"], (SimpleType) => {
	"use strict";
	return SimpleType.extend("ui5.sales.model.ItemCountType", { formatValue(i) { return i + (i === 1 ? " item" : " items"); }, parseValue(s) { return parseInt(s, 10); }, validateValue() {} });
});
