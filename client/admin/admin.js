app.directive('admin', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/admin/admin.html',
		controllerAs: 'adminCtrlAs',
		controller: function($scope, $reactive) {
			$reactive(this).attach($scope);

			this.select = 'DB_DrinkRegular'; this.newProduct = {quantity: 0, deactivate: false};
			this.init = 'DB_DrinkRegular', this.btn = ['active'];

			this.menuHeader = function(value) {
				this.init = value;
				if (value == 'DB_DrinkHappy') {
					this.newProduct.display = 'DB_DrinkHappy',
					this.newProduct.check = 'goToBar';
					this.btn = ['', 'active'];
					return DB_DrinkHappy;
				}
				else if (value == 'DB_DrinkRegular') {
					this.newProduct.display = 'DB_DrinkRegular',
					this.newProduct.check = 'goToBar';
					this.btn = ['active'];
					return DB_DrinkRegular;
				}
				else if (value == 'DB_Food') {
					this.newProduct.display = 'DB_Food',
					this.newProduct.check = 'goToKitchen';
					this.btn = ['', '', 'active'];
					return DB_Food;
				}
			}

			this.helpers({
				findInSelectedDB: function() {
				 	return this.menuHeader(this.getReactively('init')).find({}, {sort: {option: 1, product: 1}});
				}
			});

			this.insertProduct = function() {
				this.menuHeader(this.getReactively('init')).insert(this.newProduct);
				this.newProduct = {quantity: 0, deactivate: false};
			}

			this.deactivate = function(document) {
				this.menuHeader(this.getReactively('init')).update({_id: document._id},
																   {$set: {deactivate: document.deactivate}});
			}

			this.remove = function(document) {
				if (confirm('delete product')) {
					this.menuHeader(this.getReactively('init')).remove({_id: document._id});
				}
			}

			this.logout = function() {
				Meteor.logout();
			}
		}
	}
});
