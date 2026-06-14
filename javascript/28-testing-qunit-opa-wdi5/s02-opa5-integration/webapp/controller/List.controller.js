sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/model/json/JSONModel", "sap/ui/model/Filter", "sap/ui/model/FilterOperator", "sap/ui/model/Sorter", "sap/ui/core/Theming", "sap/ui/rta/api/startKeyUserAdaptation", "sap/m/p13n/Engine", "sap/m/p13n/MetadataHelper", "sap/m/p13n/SelectionController", "ui5/sales/model/formatter"], (Controller, MessageToast, JSONModel, Filter, FilterOperator, Sorter, Theming, startKeyUserAdaptation, Engine, MetadataHelper, SelectionController, formatter) => {
	"use strict";
	return Controller.extend("ui5.sales.controller.List", {
		formatter: formatter,
		onExit() {
			if (this._pCreateDialog) { this._pCreateDialog.then((oDialog) => oDialog.destroy()); }
		},
		onInit() {
			const oTable = this.byId("ordersTable");
			Engine.getInstance().register(oTable, {
				helper: new MetadataHelper([
					{ key: "orderId", label: "Order", path: "orderId" },
					{ key: "customer", label: "Customer", path: "customer" },
					{ key: "status", label: "Status", path: "status" },
					{ key: "amount", label: "Amount", path: "amount" },
					{ key: "priority", label: "Priority", path: "priority" }
				]),
				controller: { Columns: new SelectionController({ targetAggregation: "columns", control: oTable }) }
			});
		},
		onPersonalize() {
			Engine.getInstance().show(this.byId("ordersTable"), "Columns");
		},
		onSearch(oEvent) { const q = oEvent.getParameter("query"); this.byId("ordersTable").getBinding("items").filter(q ? [new Filter("customer", FilterOperator.Contains, q)] : []); },
		onToggleTheme() {
			const aThemes = ["sap_horizon", "sap_horizon_dark", "sap_horizon_hcb"];
			const iNext = (aThemes.indexOf(Theming.getTheme()) + 1) % aThemes.length;
			Theming.setTheme(aThemes[iNext]);
		},
		onStartAdaptation() {
			startKeyUserAdaptation({ rootControl: this.getOwnerComponent().getRootControl() });
		},
		onOrderPress(oEvent) { this.getOwnerComponent().getRouter().navTo("detail", { orderId: oEvent.getSource().getBindingContext().getProperty("orderId") }); },
		onPriorityPress(oEvent) { this.getOwnerComponent().getEventBus().publish("orders", "priorityPressed", { value: oEvent.getSource().getValue() }); },
		onDropOrder(oEvent) {
			const oDragged = oEvent.getParameter("draggedControl");
			const oDropped = oEvent.getParameter("droppedControl");
			MessageToast.show("Moved " + oDragged.getBindingContext().getProperty("orderId") + " next to " + oDropped.getBindingContext().getProperty("orderId"));
		},
		onOpenViewSettings() { if (!this._pVSD) { this._pVSD = this.loadFragment({ name: "ui5.sales.view.fragment.ViewSettings" }); } this._pVSD.then((oDialog) => oDialog.open()); },
		onConfirmViewSettings(oEvent) {
			const p = oEvent.getParameters();
			const aSorters = [];
			if (p.groupItem) { aSorters.push(new Sorter(p.groupItem.getKey(), p.groupDescending, true)); }
			if (p.sortItem) { aSorters.push(new Sorter(p.sortItem.getKey(), p.sortDescending)); }
			this.byId("ordersTable").getBinding("items").sort(aSorters);
		},
		onExport() {
			const oBinding = this.byId("ordersTable").getBinding("items");
			const aFields = ["orderId", "customer", "status", "amount", "currency", "priority"];
			const aRows = oBinding.getAllCurrentContexts().map((oContext) => {
				const oData = oContext.getObject();
				return aFields.map((sField) => {
					const sValue = String(oData[sField] == null ? "" : oData[sField]);
					return /[",\n]/.test(sValue) ? '"' + sValue.replace(/"/g, '""') + '"' : sValue;
				}).join(",");
			});
			const sCsv = aFields.join(",") + "\n" + aRows.join("\n");
			const oLink = document.createElement("a");
			oLink.href = URL.createObjectURL(new Blob([sCsv], { type: "text/csv;charset=utf-8" }));
			oLink.download = "SalesOrders.csv";
			oLink.click();
			URL.revokeObjectURL(oLink.href);
		},
		onCreate() {
			this.getView().setModel(new JSONModel({ customer: "", amount: "0.00", currency: "EUR" }), "create");
			if (!this._pCreateDialog) { this._pCreateDialog = this.loadFragment({ name: "ui5.sales.view.fragment.CreateOrder" }); }
			this._pCreateDialog.then((oDialog) => oDialog.open());
		},
		onSaveOrder() {
			const oDraft = this.getView().getModel("create").getData();
			const oBinding = this.byId("ordersTable").getBinding("items");
			const oContext = oBinding.create({ orderId: "SO-" + Date.now(), customer: oDraft.customer, status: "Open", amount: oDraft.amount, currency: oDraft.currency, orderDate: "2026-01-01", priority: "Medium", itemCount: 0 });
			oContext.created().then(() => MessageToast.show("Order created"), () => MessageToast.show("Create failed"));
			this.byId("createOrderDialog").close();
		},
		onCancelOrder() { this.byId("createOrderDialog").close(); },
		onOpenWizard() {
			this.getView().setModel(new JSONModel({ customer: "", amount: "0.00", currency: "EUR" }), "create");
			if (!this._pWizard) { this._pWizard = this.loadFragment({ name: "ui5.sales.view.fragment.CreateWizard" }); }
			this._pWizard.then((oDialog) => oDialog.open());
		},
		onWizardComplete() {
			const oDraft = this.getView().getModel("create").getData();
			const oBinding = this.byId("ordersTable").getBinding("items");
			const oContext = oBinding.create({ orderId: "SO-" + Date.now(), customer: oDraft.customer, status: "Open", amount: oDraft.amount, currency: oDraft.currency, orderDate: "2026-01-01", priority: "Medium", itemCount: 0 });
			oContext.created().then(() => MessageToast.show("Order created"), () => MessageToast.show("Create failed"));
			this.byId("wizardDialog").close();
		},
		onCancelWizard() { this.byId("wizardDialog").close(); },
		onCustomerValueHelp() {
			if (!this._pCustomerDialog) { this._pCustomerDialog = this.loadFragment({ name: "ui5.sales.view.fragment.CustomerSelect" }); }
			this._pCustomerDialog.then((oDialog) => oDialog.open());
		},
		onCustomerSearch(oEvent) {
			const sValue = oEvent.getParameter("value");
			oEvent.getParameter("itemsBinding").filter(sValue ? [new Filter("name", FilterOperator.Contains, sValue)] : []);
		},
		onCustomerSelected(oEvent) {
			const oItem = oEvent.getParameter("selectedItem");
			if (oItem) { this.getView().getModel("create").setProperty("/customer", oItem.getTitle()); }
		}
	});
});
