Meteor.startup(function() {
	if (DB_Orders.find().count() !== 0) { DB_Orders.remove({}); }
	if (DB_UpdateOrders.find().count() !== 0) {DB_UpdateOrders.remove({}); }
});