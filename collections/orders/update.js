DB_UpdateOrders = new Mongo.Collection('update');

Meteor.methods({
	updateCloneDB: function(time) {
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
						itemDone: false,
						check: doc.check,
						check_validate: false };

				DB_UpdateOrders.insert(obj);
			});
		}
	},

	updateFinalValidation: function(time, updateId, nameOrder, notesDrink, notesFood, totalCount) {
		var update = DB_UpdateOrders.find({createdAt: time, quantity: {$gt: 0}}, 
								   		 {fields: {_id: 0, product: 1, option: 1, price: 1, 
								   		 		   quantity: 1, cost: 1, itemDone: 1, check: 1} }).fetch();

		var updateOrder = DB_FinalOrders.findOne({_id: updateId, updateOrder: {$exists: true}}, 
												 {fields: {createdAt: 1, nameOrder: 1}});

		var updateForBar = {updateOrder: update, 
							'check.doneBar': false, 'thunder.bar': false, 'star.bar1': false, 'star.bar2': false,
							total: nameOrder.total + totalCount, totalG: nameOrder.totalG + totalCount};

		var updateForKitchen = {updateOrder: update, 
								'check.doneKitchen': false, 'thunder.kitchen': false, 'star.kitchen1': false, 'star.kitchen2': false,
								total: nameOrder.total + totalCount, totalG: nameOrder.totalG + totalCount};

		// used to evaluate if a push notification is send to Bar and/or Kitchen
		var checkForPushBar = DB_UpdateOrders.find({createdAt: time, quantity: {$gt: 0}, check: {$ne: 'goToKitchen'}},
												   {fields: {_id: 0, check: 1} }).fetch();

		var checkForPushKitchen = DB_UpdateOrders.find({createdAt: time, quantity: {$gt: 0}, check: {$ne: 'goToBar'}},
													   {fields: {_id: 0, check: 1} }).fetch();

		var remove = DB_UpdateOrders.remove({createdAt: time, check_validate: false});

		Meteor.call('pushUpdateFinalValidation', checkForPushBar, checkForPushKitchen, nameOrder.nameOrder);

		if (notesDrink !== '') {
			var orderNotesDrink = DB_FinalOrders.findOne({_id: updateId}, {fields: {_id: 0, notesDrink: 1} });
			updateForBar.notesDrink = orderNotesDrink.notesDrink + ' // ' + notesDrink;
		}
		
		if (notesFood !== '') {
			var orderNotesFood = DB_FinalOrders.findOne({_id: updateId}, {fields: {_id: 0, notesFood: 1} });
			updateForKitchen.notesFood = orderNotesFood.notesFood + ' // ' + notesFood;
		}

		if (updateOrder === undefined) {
			for (var i = 0; i < update.length; i++) {
				if (update[i].check == 'goToBar') {
					DB_FinalOrders.update({_id: updateId}, {$set: updateForBar });
					remove;
				}
				if (update[i].check == 'goToKitchen') {
					DB_FinalOrders.update({_id: updateId}, {$set: updateForKitchen });
					remove
				}
			}
		}
		else {
			for (var i = 0; i < update.length; i++) {
				if (update[i].check == 'goToBar') {
					delete updateForBar.updateOrder;
					DB_FinalOrders.update({_id: updateId}, {$push: {updateOrder: {$each: update }}, // $set: updateForBar,
															$set: updateForBar }); //$addToSet: {updateOrder: {$each: update }}, 
					remove; break
				}
				if (update[i].check == 'goToKitchen') {
					delete updateForKitchen.updateOrder;
					DB_FinalOrders.update({_id: updateId}, {$push: {updateOrder: {$each: update }}, 
															$set: updateForKitchen });
					remove; break
				}
			}
		}
	},

	updateRemove: function(time) {
		DB_UpdateOrders.remove({createdAt: time, check_validate: false});
	}
});