namespace ui5.sales;

// The persistent data model. CAP turns these definitions into database tables
// (SQLite for local development) and the OData service's entity types.
entity SalesOrders {
	key orderId : String(10);
	customer    : String(40);
	status      : String(20);
	amount      : Decimal(15, 2);
	currency    : String(3);
	orderDate   : Date;
	priority    : String(10);
	itemCount   : Integer;
	// An order is made of line items. "Composition" means the items belong to
	// the order and live and die with it (a parent-child relationship).
	items       : Composition of many SalesOrderItems on items.order = $self;
}

entity SalesOrderItems {
	key ID   : UUID;
	order    : Association to SalesOrders;
	product  : String(60);
	quantity : Integer;
	price    : Decimal(15, 2);
}
