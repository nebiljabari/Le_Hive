app.directive('orders', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/p4_orders/orders.html',
		controllerAs: 'ordersCtrlAs',
		controller: function($scope, $reactive) {
			$reactive(this).attach($scope);

			this.clicked = false, this.showMore = 30, this.activeBtn = 'active';

			this.addBtn = function() {
				this.showMore += 10;
			}

			this.helpers({
				validateOrders: function() {
					return DB_FinalOrders.find({check_validate: true}, {sort: {createdAt: -1}, limit: this.getReactively('showMore')});
				}
			});

			this.thunderBar = function(docTotal, docId, docThunder, nameOrder) {
				if (docTotal === 0) { return; }
				else if (!docThunder) {
					this.clicked = true;
					DB_FinalOrders.update({_id: docId}, {$set: {'thunder.bar': this.clicked} });

					Meteor.call('pushReminderFromWaiterToBar', nameOrder);
				}
				else if (docThunder) {
					this.clicked = false;
					DB_FinalOrders.update({_id: docId}, {$set: {'thunder.bar': this.clicked} });
				}
			}
			this.thunderKitchen = function(docTotal, docId, docThunder, nameOrder) {
				if (docTotal === 0) { return; }
				else if (!docThunder) {
					this.clicked = true;
					DB_FinalOrders.update({_id: docId}, {$set: {'thunder.kitchen': this.clicked} });

					Meteor.call('pushReminderFromWaiterToKitchen', nameOrder);
				}
				else if (docThunder) {
					this.clicked = false;
					DB_FinalOrders.update({_id: docId}, {$set: {'thunder.kitchen': this.clicked} });
				}
			}

			this.updateDecrease = function(doc, index) {
				var quantity = doc.finalOrder[index].quantity,
					offer = doc.finalOrder[index].offer,
					close = doc.total - doc.finalOrder[index].price;

				if (close == 0) {
					if (confirm('close order')) return Meteor.call('updateDecrease', doc, index);
				}
				else if (quantity == 0 || offer == true) { return; }
				else if (doc.total == 0) { return; }
					else Meteor.call('updateDecrease', doc, index);
			}
			this.updateOffer = function(doc, index) {
				var offer = doc.finalOrder[index].offer,
					price = doc.finalOrder[index].price * doc.finalOrder[index].quantity,
					close = doc.total - price;

				if (close == 0) {
					if (confirm('close order')) return Meteor.call('updateOffer', doc, index),
													   Meteor.call('totalCheck', doc);
				}
				else if (offer == true) { return; }
				else if (doc.total === 0) { return; }
				else if (confirm('offer to client')) {
					Meteor.call('updateOffer', doc, index);
				}
			}

			this.updateDecreaseNew = function(docId, docTotal, order, index) {
				var quantity = order.quantity,
					offer = order.offer,
					close = docTotal - order.price;

				if (close == 0) {
					if (confirm('close order')) return Meteor.call('updateDecreaseNew', docId, order, index);
				}

				if (quantity == 0 || offer == true) { return; }
				else if (docTotal == 0) { return; }
					else Meteor.call('updateDecreaseNew', docId, order, index);
			}
			this.updateOfferNew = function(docId, docTotal, order, index) {
				var offer = order.offer,
					price = order.price * order.quantity,
					close = docTotal - price;

				if (close == 0) {
					if (confirm('close order')) return Meteor.call('updateOfferNew', docId, docTotal, order, index),
													   Meteor.call('totalCheckNew', docId);
				}

				if (offer == true) { return; }
				else if (docTotal === 0) { return; }
				else if (confirm('offer to client')) {
					Meteor.call('updateOfferNew', docId, docTotal, order, index);
				}
			}

			this.totalCheck = function(doc) {
				if (doc.total === 0) { return; }
				else if (confirm('close order')) {
					Meteor.call('totalCheck', doc);
				}
			}
		}
	}
});
