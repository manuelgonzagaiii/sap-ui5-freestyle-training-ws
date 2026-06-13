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
