using SalesService from './sales-service';

// A value list annotation: machine-readable metadata that says "valid values for
// SalesOrders.customer come from the Customers entity, field name". Annotation-
// driven clients (Fiori Elements, smart and mdc controls) read this and build
// the value help UI automatically.
annotate SalesService.SalesOrders:customer with @(
	Common.ValueList: {
		$Type: 'Common.ValueListType',
		CollectionPath: 'Customers',
		Parameters: [{
			$Type: 'Common.ValueListParameterInOut',
			LocalDataProperty: customer,
			ValueListProperty: 'name'
		}]
	}
);

// Human-readable labels for the fields, declared once in the service metadata.
// Metadata-driven UIs use these as column headers and form labels automatically.
annotate SalesService.SalesOrders with {
	orderId   @title: 'Order';
	customer  @title: 'Customer';
	status    @title: 'Status';
	amount    @title: 'Amount';
	currency  @title: 'Currency';
	orderDate @title: 'Order date';
	priority  @title: 'Priority';
	itemCount @title: 'Items';
};
