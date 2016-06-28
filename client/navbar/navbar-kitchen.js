app.directive('navbarKitchen', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/navbar/navbar-kitchen.html',
		controllerAs: 'navbarCtrlAs',
		controller: function($scope, $reactive) {
			$reactive(this).attach($scope);

			this.logout = function() {
				Meteor.logout();
			}
		}
	}
});