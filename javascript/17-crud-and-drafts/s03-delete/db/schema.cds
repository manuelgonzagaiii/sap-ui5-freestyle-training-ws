namespace ui5.sales;

entity SalesOrders {
	key orderId : String(10);
	customer    : String(40);
	status      : String(20);
	amount      : Decimal(15, 2);
	currency    : String(3);
	orderDate   : Date;
	priority    : String(10);
	itemCount   : Integer;
	items       : Composition of many SalesOrderItems on items.order = $self;
}

entity SalesOrderItems {
	key ID   : UUID;
	order    : Association to SalesOrders;
	product  : String(60);
	quantity : Integer;
	price    : Decimal(15, 2);
}
