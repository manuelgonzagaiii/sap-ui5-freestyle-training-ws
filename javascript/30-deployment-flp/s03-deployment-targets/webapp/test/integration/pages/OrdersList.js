sap.ui.define([
	"sap/ui/test/Opa5"
], (Opa5) => {
	"use strict";

	Opa5.createPageObjects({
		onTheOrdersList: {
			actions: {
				iSearchForCustomer: function (sQuery) {
					return this.waitFor({
						controlType: "sap.m.SearchField",
						actions: function (oSearchField) { oSearchField.fireSearch({ query: sQuery }); },
						errorMessage: "Could not find the search field"
					});
				}
			},
			assertions: {
				iShouldSeeTheOrdersTable: function () {
					return this.waitFor({
						id: "ordersTable",
						viewName: "List",
						success: function () { Opa5.assert.ok(true, "The orders table is visible"); },
						errorMessage: "The orders table is not visible"
					});
				}
			}
		}
	});
});
