app.directive('menu', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/p3_menu/menu.html',
		controllerAs: 'menuCtrlAs',
		controller: function($scope, $reactive) {
			$reactive(this).attach($scope);

			this.activeBtn = 'active';

			this.init = 'DB_DrinkRegular', this.validate = false, this.btn = ['active'],
			this.quantity = 0, this.notesDrink = '', this.notesFood = '',
			this.nameOrder = '', this.totalCount = 0;

			this.timeLocal = time;

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
						return DB_Orders.find({createdAt: time, check_validate: false, deactivate: false, display: 'DB_DrinkHappy'},
											  {sort: {option: 1, product: 1}});
					}
					else if (this.getReactively('init') == 'DB_Food') {
						return DB_Orders.find({createdAt: time, check_validate: false, deactivate: false, display: 'DB_Food'},
											  {sort: {option: 1, product: 1}});
					}
					else if (this.getReactively('init') == 'DB_DrinkRegular' || 'initReset') {
						return DB_Orders.find({createdAt: time, check_validate: false, deactivate: false, display: 'DB_DrinkRegular'},
											  {sort: {option: 1, product: 1}});
					}
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
						return DB_Orders.find({createdAt: this.timeLocal, quantity: {$gte: 1}},
											  {sort: {product: 1, option: 1}});
					}
				});
			}
			// - - - Menu Navbar Buttons (Menu to Validate Area) - - - //

			this.quantityDecrease = function(doc) {
				if (doc.quantity == 0) { return; }
				if (this.totalCount == 0) {
					this.totalCount = 0;

					DB_Orders.update({_id: doc._id},
									 {$inc: {quantity: -1, cost: -doc.price} });
				}
					else {
						this.totalCount -= doc.price;

						DB_Orders.update({_id: doc._id},
										 {$inc: {quantity: -1, cost: -doc.price} });
					}
			}

			this.quantityIncrease = function(doc) {
				this.totalCount += doc.price;

				if (doc.quantity == 0) {
					DB_Orders.update({_id: doc._id},
									 {$inc: {quantity: 1, cost: (1 * doc.price)} });
				}
					else {
						DB_Orders.update({_id: doc._id},
										 {$inc: {quantity: 1, cost: doc.price} });
					}
			}

			this.finalValidation = function() {
				if (!this.nameOrder) { return alert('please enter a name'); }

				if (confirm('send order')) {
					if (this.totalCount === 0) { return alert('empty orders not allowed');}

					Meteor.call('finalValidation', time, this.nameOrder, this.notesDrink, this.notesFood, this.totalCount);

					console.log('order send: ' + this.nameOrder);

					this.quantity = 0, this.notesDrink = '', this.notesFood = '',
					this.nameOrder = '', this.totalCount = 0, this.btn = ['active'];

					cloneCreated = true, this.validate = false;

					time = new Date().getTime(), this.timeLocal = time, this.init = 'initReset';

					Meteor.call('cloneDB', time);
				}
			}
		}
	}
});
