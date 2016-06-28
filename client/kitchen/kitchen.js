app.directive('kitchen', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/kitchen/kitchen.html',
		controllerAs: 'kitchenCtrlAs',
		controller: function($scope, $reactive) {
			$reactive(this).attach($scope);

			this.clicked = false, this.activeBtn = 'active';

			this.helpers({
				kitchenOrders: function() {
					return DB_FinalOrders.find({check_validate: true, 'check.doneKitchen': false}, {sort: {createdAt: 1}} );
				}
			});

			this.star1 = function(docId, docStar1, nameOrder) {
				if (!docStar1) {
					this.clicked = true;
					DB_FinalOrders.update({_id: docId}, {$set: {'star.kitchen1': this.clicked} });

					Meteor.call('pushReceiveFromKitchen', nameOrder);
				}
				if (docStar1) {
					this.clicked = false;
					DB_FinalOrders.update({_id: docId}, {$set: {'star.kitchen1': this.clicked} });
				}
			}
			this.star2 = function(docId, docStar2, nameOrder) {
				if (!docStar2) {
					this.clicked = true;
					DB_FinalOrders.update({_id: docId}, {$set: {'star.kitchen2': this.clicked} });

					Meteor.call('pushReadyFromKitchen', nameOrder);
				}
				if (docStar2) {
					this.clicked = false;
					DB_FinalOrders.update({_id: docId}, {$set: {'star.kitchen2': this.clicked} });
				}
			}
			this.thunder = function(docId, docThunder, nameOrder) {
				if (!docThunder) {
					this.clicked = true;
					DB_FinalOrders.update({_id: docId}, {$set: {'thunder.kitchen': this.clicked} });

					Meteor.call('pushReminderFromKitchen', nameOrder);
				}
				if (docThunder) {
					this.clicked = false;
					DB_FinalOrders.update({_id: docId}, {$set: {'thunder.kitchen': this.clicked} });
				}
			}
			this.checkItem = function(docId, docItemDone, index) {
				var checkItem = 'finalOrder.' + index + '.itemDone';

				var check = {};
					check[checkItem] = docItemDone;

				DB_FinalOrders.update({_id: docId}, {$set: check});
			}
			this.updateCheckItem = function(docId, docItemDone, index) {
				var checkItem = 'updateOrder.' + index + '.itemDone';

				var check = {};
					check[checkItem] = docItemDone;

				DB_FinalOrders.update({_id: docId}, {$set: check});
			}
			this.checkDone = function(docId, docFinalOrder, docUpdateOrder) {
				if (confirm('delete order')) {
					DB_FinalOrders.update({_id: docId}, {$set: {'check.doneKitchen': true}});

					Meteor.call('checkAllKitchenItem', docId, docFinalOrder, docUpdateOrder);
				}
			}
		}
	}
});
