using { ui5.sales as my } from '../db/schema';

// Expose the data model as an OData V4 service. With @path 'sales' and CAP's
// default OData V4 base path, the service is served at /odata/v4/sales/.
@path: 'sales'
service SalesService {
	entity SalesOrders     as projection on my.SalesOrders;
	entity SalesOrderItems as projection on my.SalesOrderItems;
}
