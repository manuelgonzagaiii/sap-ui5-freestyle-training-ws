const cds = require("@sap/cds");
module.exports = class SalesService extends cds.ApplicationService {
	init() {
		const { SalesOrders } = this.entities;
		this.on("setCompleted", SalesOrders, async (req) => {
			const { orderId } = req.params[req.params.length - 1];
			await UPDATE(SalesOrders).set({ status: "Completed" }).where({ orderId });
			return SELECT.one.from(SalesOrders).where({ orderId });
		});
		return super.init();
	}
};
