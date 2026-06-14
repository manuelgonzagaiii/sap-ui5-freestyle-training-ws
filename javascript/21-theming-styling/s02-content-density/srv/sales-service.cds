using { ui5.sales as my } from '../db/schema';

@path: 'sales'
service SalesService {
	entity SalesOrders as projection on my.SalesOrders actions { action setCompleted() returns SalesOrders; };
	entity SalesOrderItems as projection on my.SalesOrderItems;

	@readonly
	entity Customers as projection on my.Customers;
}
