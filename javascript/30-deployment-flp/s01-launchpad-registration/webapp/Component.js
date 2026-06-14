sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device"
], (UIComponent, Device) => {
	"use strict";

	return UIComponent.extend("ui5.sales.Component", {
		metadata: { interfaces: ["sap.ui.core.IAsyncContentCreation"], manifest: "json" },

		init() {
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
		},

		getContentDensityClass() {
			if (this._sContentDensityClass === undefined) {
				this._sContentDensityClass = Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact";
			}
			return this._sContentDensityClass;
		}
	});
});
