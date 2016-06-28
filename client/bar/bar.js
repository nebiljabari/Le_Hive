app.directive('bar', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/bar/bar.html',
		controllerAs: 'barCtrlAs',
		controller: function($scope, $reactive) {
			$reactive(this).attach($scope);

			this.clicked = false, this.activeBtn = 'active';

			this.helpers({
				barOrders: function() {
					return DB_FinalOrders.find({check_validate: true, $or: [{'check.doneBar': false}, {'updateOrder.check': true}]},
											   {sort: {createdAt: 1}} );
				}
			});

			this.star1 = function(docId, docStar1, nameOrder) {
				if (!docStar1) {
					this.clicked = true;
					DB_FinalOrders.update({_id: docId}, {$set: {'star.bar1': this.clicked} });

					Meteor.call('pushReceiveFromBar', nameOrder);
				}
				if (docStar1) {
					this.clicked = false;
					DB_FinalOrders.update({_id: docId}, {$set: {'star.bar1': this.clicked} });
				}
			}
			this.star2 = function(docId, docStar2, nameOrder) {
				if (!docStar2) {
					this.clicked = true;
					DB_FinalOrders.update({_id: docId}, {$set: {'star.bar2': this.clicked} });

					Meteor.call('pushReadyFromBar', nameOrder)
				}
				if (docStar2) {
					this.clicked = false;
					DB_FinalOrders.update({_id: docId}, {$set: {'star.bar2': this.clicked} });
				}
			}
			this.thunder = function(docId, docThunder, nameOrder) {
				if (!docThunder) {
					this.clicked = true;
					DB_FinalOrders.update({_id: docId}, {$set: {'thunder.bar': this.clicked} });

					Meteor.call('pushReminderFromBar', nameOrder)
				}
				if (docThunder) {
					this.clicked = false;
					DB_FinalOrders.update({_id: docId}, {$set: {'thunder.bar': this.clicked} });
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
					DB_FinalOrders.update({_id: docId}, {$set: {'check.doneBar': true}});

					Meteor.call('checkAllBarItem', docId, docFinalOrder, docUpdateOrder);
				}
			}
		}
	}
});
