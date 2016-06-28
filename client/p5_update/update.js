app.directive('update', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/p5_update/update.html',
		controllerAs: 'updateCtrlAs',
		controller: function($scope, $reactive, $stateParams, $state) {
			$reactive(this).attach($scope);

			Meteor.call('updateCloneDB', time);

			this.timeLocal = time, this.updateId = $stateParams.updateId;

			this.init = 'DB_DrinkRegular', this.validate = false, this.btn = ['active'],
			this.quantity = 0, this.notesDrink = '', this.notesFood = '', this.totalCount = 0;

			this.menuHeader = function(value) {
				this.init = value;
				if (value == 'DB_DrinkHappy') {
					this.btn = ['', 'active'];
				}
				else if (value == 'DB_DrinkRegular') {
					this.btn = ['active'];
				}
				else if (value == 'DB_Food') {
					this.btn = ['', '', 'active'];
				}
			}

			this.helpers({
				ordersDB: function() {
					if (this.getReactively('init') == 'DB_DrinkHappy') {
						return DB_UpdateOrders.find({createdAt: this.timeLocal, check_validate: false, display: 'DB_DrinkHappy'},
											  {sort: {option: 1, product: 1}});
					}
					else if (this.getReactively('init') == 'DB_Food') {
						return DB_UpdateOrders.find({createdAt: this.timeLocal, check_validate: false, display: 'DB_Food'},
											  {sort: {option: 1, product: 1}});
					}
					else if (this.getReactively('init') == 'DB_DrinkRegular' || 'initReset') {
						return DB_UpdateOrders.find({createdAt: this.timeLocal, check_validate: false, display: 'DB_DrinkRegular'},
											  {sort: {option: 1, product: 1}});
					}
				},
				nameOrder: function() {
						return DB_FinalOrders.findOne({_id: this.updateId});
				}
			});

			// - - - Menu Navbar Buttons (Menu to Validate Area) - - - //
			this.unvalidate = function() {
				this.validate = false;
			}

			this.validatePage = function() {
				this.validate = true;

				this.helpers({
					underValidation: function() {
						return DB_UpdateOrders.find({createdAt: this.timeLocal, quantity: {$gte: 1}},
											  {sort: {product: 1, option: 1}});
					}
				});
			}
			// - - - Menu Navbar Buttons (Menu to Validate Area) - - - //

			this.quantityDecrease = function(doc) {
				if (doc.quantity == 0) { return; }
					else {
						this.totalCount -= doc.price;

						DB_UpdateOrders.update({_id: doc._id},
										 {$inc: {quantity: -1, cost: -doc.price} });
					}
			}

			this.quantityIncrease = function(doc) {
				this.totalCount += doc.price;

				if (doc.quantity == 0) {
					DB_UpdateOrders.update({_id: doc._id},
									 {$inc: {quantity: 1, cost: (1 * doc.price)} });
				}
					else {
						DB_UpdateOrders.update({_id: doc._id},
										 {$inc: {quantity: 1, cost: doc.price} });
					}
			}

			this.finalValidation = function() {
				if (this.totalCount === 0) {
					Meteor.call('updateRemove', time), alert('return to orders');
					return $state.go('orders');
				}
				if (confirm('update order')) {
					Meteor.call('updateFinalValidation', time, this.updateId, this.nameOrder,
														 this.notesDrink, this.notesFood, this.totalCount);

					console.log('update order: ' + this.nameOrder.nameOrder);

					$state.go('orders');
				}
			}
		}
	}
});
