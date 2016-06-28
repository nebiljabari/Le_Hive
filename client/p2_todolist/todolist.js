app.directive('todolist', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/p2_todolist/todolist.html',
		controllerAs: 'todolistCtrlAs',
		controller: function($scope, $reactive, $state) {
			$reactive(this).attach($scope);

			// place for the Admin token to be re-directed to Admin section
			if (Meteor.userId() === '') return $state.go('admin');

			this.text = '', this.activeBtn = 'active';

			this.helpers({
				findInDB: function() {
					return DB_Todolist.find({});
				}
			});

			this.insert = function() {
				DB_Todolist.insert({
					text: this.text,
					createdAt: new Date(),
					checked: false
				});
				this.text = '';
			}

			this.update = function(document) {
				DB_Todolist.update({_id: document._id}, {$set: {checked: document.checked}});
			}

			this.remove = function(document) {
					DB_Todolist.remove({_id: document._id});
			}
		}
	}
});
