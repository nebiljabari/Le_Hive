DB_Orders = new Mongo.Collection('orders');

Meteor.methods({
	// function shared (between menu.js & navbar.js) to clone the DB
	cloneDB: function(time) {
		var cloneDB = [DB_DrinkRegular.find({}), DB_DrinkHappy.find({}), DB_Food.find({})];

		for (var i = 0; i < cloneDB.length; i++) {
			cloneDB[i].forEach(function(doc) {
				obj = { createdAt: time,
						display: doc.display,
						product: doc.product,
						option: doc.option,
						price: doc.price,
						quantity: doc.quantity,
						cost: 0,
						total: 0,
						deactivate: doc.deactivate,
						itemDone: false,
						check: doc.check,
						check_validate: false };

				DB_Orders.insert(obj);
			});
		}
	},

	removeClone: function(time) {
		DB_Orders.remove({createdAt: time, check_validate: false});
		return time = new Date().getTime();
	},

	// method link to : menu.js
	finalValidation: function(time, nameOrder, notesDrink, notesFood, totalCount) {
		var newDate = new Date(), day = newDate.getDate(),
								  month = newDate.getMonth() + 1, 
								  year = newDate.getFullYear(),
								  hours = newDate.getHours(),
								  minutes = newDate.getMinutes();

		var date = day + '.' + month + '.' + year;
		var hoursAndMinutes = '';

		if (minutes < 10) {
			hoursAndMinutes = hours + 'h' + 0 + minutes;
		} 
		else hoursAndMinutes = hours + 'h' + minutes;

		var fetch = DB_Orders.find({createdAt: time, quantity: {$gt: 0}}, 
								   {fields: {_id: 0, product: 1, option: 1, price: 1, 
								   			 quantity: 1, cost: 1, itemDone: 1, check: 1} }).fetch();

		// used to evaluate if a push notification is send to Bar and/or Kitchen
		var checkForPushBar = DB_Orders.find({createdAt: time, quantity: {$gt: 0}, check: {$ne: 'goToKitchen'}},
											 {fields: {_id: 0, check: 1} }).fetch();

		var checkForPushKitchen = DB_Orders.find({createdAt: time, quantity: {$gt: 0}, check: {$ne: 'goToBar'}},
												 {fields: {_id: 0, check: 1} }).fetch();

		Meteor.call('pushFinalValidation', checkForPushBar, checkForPushKitchen, nameOrder);

			addData = { nameOrder: nameOrder,
						createdAt: time,
						date: date.toString(),
						hoursAndMinutes: hoursAndMinutes.toString(),
						finalOrder: fetch,
						finalBtn: 'circle', // Bootstrap button (ending) name
						notesDrink: notesDrink, 
						notesFood: notesFood,
						totalG: totalCount,
						total: totalCount,
						star: {bar1: false, bar2: false,
							   kitchen1: false, kitchen2: false},
						thunder: {bar: false, kitchen: false},
						check: {doneBar: false, doneKitchen: false},
						check_validate: true };

		DB_FinalOrders.insert(addData);
		DB_Orders.remove({createdAt: time, check_validate: false});
	}
});