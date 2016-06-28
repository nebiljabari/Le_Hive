app.directive('login', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/p1_login/login.html',
		controllerAs: 'loginCtrlAs',
		controller: function($scope, $reactive, $state) {
			$reactive(this).attach($scope);

			this.username = '', this.password = '';

			this.login = function() {
				Meteor.loginWithPassword(this.username, this.password, function(error) {
					if (error) {return console.log('unvalid login');}
				});

				$state.go('todolist');

				this.username = '', this.password = '';
			};
		}
	}
});