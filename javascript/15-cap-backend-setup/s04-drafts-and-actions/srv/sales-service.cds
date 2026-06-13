using { ui5.sales as my } from '../db/schema';

@path: 'sales'
service SalesService {
	// @odata.draft.enabled turns on the Fiori draft choreography: editing creates
	// a private draft, and "draftActivate" commits it. The bound action lets a
	// client mark one order completed.
	@odata.draft.enabled
	entity SalesOrders as projection on my.SalesOrders actions {
		action setCompleted() returns SalesOrders;
	};
	entity SalesOrderItems as projection on my.SalesOrderItems;
}
