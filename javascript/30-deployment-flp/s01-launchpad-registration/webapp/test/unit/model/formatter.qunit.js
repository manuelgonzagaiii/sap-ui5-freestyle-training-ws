sap.ui.define([
	"ui5/sales/model/formatter"
], (formatter) => {
	"use strict";

	QUnit.module("formatter.statusState");

	QUnit.test("maps known statuses to semantic states", (assert) => {
		assert.strictEqual(formatter.statusState("Completed"), "Success", "Completed -> Success");
		assert.strictEqual(formatter.statusState("In Process"), "Warning", "In Process -> Warning");
		assert.strictEqual(formatter.statusState("Cancelled"), "Error", "Cancelled -> Error");
	});

	QUnit.test("falls back to None for an unknown status", (assert) => {
		assert.strictEqual(formatter.statusState("Anything else"), "None", "unknown -> None");
	});
});
