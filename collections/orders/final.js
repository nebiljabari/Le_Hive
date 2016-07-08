DB_FinalOrders = new Mongo.Collection('final');

DB_FinalOrders.allow({
  insert: function() { return true; },
  update: function() { return true; },
  remove: function() { return true; }
});

Meteor.methods({
	updateDecrease: function(doc, index) {
		var keyQuantity = 'finalOrder.' + index.toString() + '.quantity',
			keyCost = 'finalOrder.' + index.toString() + '.cost',
			price = doc.finalOrder[index].price;

		var incOperator = {};
			incOperator[keyQuantity] = -1,
			incOperator[keyCost] = -price,
			incOperator['total'] = -price;

		DB_FinalOrders.update({_id: doc._id }, {$inc: incOperator});
	},

	updateOffer: function(doc, index) {
		var keyOffer = 'finalOrder.' + index.toString() + '.offer',
			cost = doc.finalOrder[index].cost;

		var setOperator = {};
			setOperator[keyOffer] = true,
			setOperator['total'] = (doc.total - cost);

		DB_FinalOrders.update({_id: doc._id }, {$set: setOperator});
	},

	updateDecreaseNew: function(docId, order, index) {
		var keyQuantity = 'updateOrder.' + index.toString() + '.quantity',
			keyCost = 'updateOrder.' + index.toString() + '.cost',
			price = order.price;

		var incOperator = {};
			incOperator[keyQuantity] = -1,
			incOperator[keyCost] = -price,
			incOperator['total'] = -price;

		DB_FinalOrders.update({_id: docId }, {$inc: incOperator});
	},

	updateOfferNew: function(docId, docTotal, order, index) {
		var keyOffer = 'updateOrder.' + index.toString() + '.offer',
			cost = order.cost;

		var setOperator = {};
			setOperator[keyOffer] = true,
			setOperator['total'] = (docTotal - cost);

		DB_FinalOrders.update({_id: docId }, {$set: setOperator});
	},

	totalCheck: function(doc) {
		DB_FinalOrders.update({_id: doc._id }, 
							  {$set: {total: 0, finalBtn: 'sign'} });
	},

	totalCheckNew: function(docId) {
		DB_FinalOrders.update({_id: docId }, 
							  {$set: {total: 0, finalBtn: 'sign'} });
	},

	checkAllBarItem: function(docId, docFinalOrder, docUpdateOrder) {
		if (docUpdateOrder == undefined) { 
			var checkBar = {}, checkTmp = '', itemDone = '', i = 0;

			for (i; i < docFinalOrder.length; i++) {
				checkTmp = docFinalOrder[i].check;
				if (checkTmp == 'goToKitchen') continue;

				itemDone = 'finalOrder.' + i + '.itemDone';
				checkBar[itemDone] = true;
				DB_FinalOrders.update({_id: docId, 'finalOrder.check': 'goToBar' },
									  {$set: checkBar });
			}
		}

		if (docUpdateOrder == undefined) return;

		else if (docUpdateOrder !== undefined) {
			var checkBar = {}, checkTmp = '', itemDone = '', j = 0;

			for (j; j < docUpdateOrder.length; j++) {
				checkTmp = docUpdateOrder[j].check;
				if (checkTmp == 'goToKitchen') continue;

				itemDone = 'updateOrder.' + j + '.itemDone';
				checkBar[itemDone] = true;
				DB_FinalOrders.update({_id: docId, 'updateOrder.check': 'goToBar' },
									  {$set: checkBar });
			}
		}
	},

	checkAllKitchenItem: function(docId, docFinalOrder, docUpdateOrder) {
		if (docUpdateOrder == undefined) {
			var checkBar = {}, checkTmp = '', itemDone = '', i = 0;

			for (i; i < docFinalOrder.length; i++) {
				checkTmp = docFinalOrder[i].check;
				if (checkTmp == 'goToBar') continue;

				itemDone = 'finalOrder.' + i + '.itemDone';
				checkBar[itemDone] = true;
				DB_FinalOrders.update({_id: docId, 'finalOrder.check': 'goToKitchen' },
									  {$set: checkBar });
			}
		}

		if (docUpdateOrder == undefined) return;

		else if (docUpdateOrder !== undefined) {
			var checkBar = {}, checkTmp = '', itemDone = '', j = 0;

			for (j; j < docUpdateOrder.length; j++) {
				checkTmp = docUpdateOrder[j].check;
				if (checkTmp == 'goToBar') continue;

				itemDone = 'updateOrder.' + j + '.itemDone';
				checkBar[itemDone] = true;
				DB_FinalOrders.update({_id: docId, 'updateOrder.check': 'goToKitchen' },
									  {$set: checkBar });
			}
		}
	}
});
