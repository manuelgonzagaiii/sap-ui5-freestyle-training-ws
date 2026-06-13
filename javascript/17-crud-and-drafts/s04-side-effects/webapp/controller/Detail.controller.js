sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "ui5/sales/model/formatter"], (Controller, MessageToast, formatter) => {
	"use strict";
	return Controller.extend("ui5.sales.controller.Detail", {
		formatter: formatter,
		onInit() { this.getOwnerComponent().getRouter().getRoute("detail").attachPatternMatched(this._onMatched, this); },
		_onMatched(oEvent) {
			const sOrderId = oEvent.getParameter("arguments").orderId;
			this.getView().bindElement({ path: "/SalesOrders(orderId='" + sOrderId + "')", parameters: { $expand: "items", $$updateGroupId: "editGroup" } });
		},
		onSave() {
			// Send the edits collected in the deferred "editGroup" batch.
			this.getView().getModel().submitBatch("editGroup").then(() => MessageToast.show("Saved"));
		},
		onCancelEdit() {
			// Throw away the unsent edits.
			this.getView().getModel().resetChanges("editGroup");
		},
		onDelete() {
			this.getView().getBindingContext().delete().then(() => { MessageToast.show("Order deleted"); this.onClose(); }, () => MessageToast.show("Delete failed"));
		},
		onSetCompleted() {
			const oContext = this.getView().getBindingContext();
			this.getView().getModel().bindContext("SalesService.setCompleted(...)", oContext).invoke().then(
				// Refresh only the field the action changed, not the whole entity.
				() => oContext.requestSideEffects(["status"]),
				() => MessageToast.show("Action failed")
			);
		},
		onClose() { this.getOwnerComponent().getRouter().navTo("list"); }
	});
});
