sap.ui.define([
	"sap/ui/test/opaQunit",
	"sap/ui/test/Opa5",
	"ui5/sales/test/integration/pages/OrdersList"
], (opaTest, Opa5) => {
	"use strict";

	Opa5.extendConfig({ autoWait: true, viewNamespace: "ui5.sales.view." });

	QUnit.module("Orders list");

	opaTest("search keeps the orders table visible", (Given, When, Then) => {
		Given.iStartMyUIComponent({ componentConfig: { name: "ui5.sales" } });
		When.onTheOrdersList.iSearchForCustomer("Aurora");
		Then.onTheOrdersList.iShouldSeeTheOrdersTable();
		Then.iTeardownMyUIComponent();
	});
});
