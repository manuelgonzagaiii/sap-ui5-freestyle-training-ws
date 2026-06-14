sap.ui.define([
	"sap/ui/test/opaQunit",
	"sap/ui/test/Opa5"
], (opaTest, Opa5) => {
	"use strict";

	Opa5.extendConfig({ autoWait: true, viewNamespace: "ui5.sales.view." });

	QUnit.module("Orders list");

	opaTest("shows the orders table on start", (Given, When, Then) => {
		Given.iStartMyUIComponent({ componentConfig: { name: "ui5.sales" } });

		Then.waitFor({
			id: "ordersTable",
			viewName: "List",
			success: function () { Opa5.assert.ok(true, "The orders table is rendered"); },
			errorMessage: "The orders table was not found"
		});

		Then.iTeardownMyUIComponent();
	});
});
