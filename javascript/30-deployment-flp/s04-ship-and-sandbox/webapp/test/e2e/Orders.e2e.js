const { wdi5 } = require("wdio-ui5-service");

describe("Sales Orders - end to end", () => {
	it("shows the orders table with rows", async () => {
		const oTable = await browser.asControl({
			selector: { id: "ordersTable", viewName: "ui5.sales.view.List" }
		});
		const aItems = await oTable.getItems();
		await expect(aItems.length).toBeGreaterThan(0);
	});
});
