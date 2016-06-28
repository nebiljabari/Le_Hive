app.directive('navbar', function() {
	return {
		restrict: 'E',
		templateUrl: 'client/navbar/navbar.html',
		controllerAs: 'navbarCtrlAs',
		controller: function($scope, $reactive) {
			$reactive(this).attach($scope);

			this.logout = function() {
				Meteor.call('removeClone', time); cloneCreated = false;
				Meteor.logout();
			}

			this.cloneDB = function() {
				if (cloneCreated) { return console.log('clone already created'); }

				if (!cloneCreated) { Meteor.call('cloneDB', time); }

				// cloneCreated is a global var -> Coming from: app.js
				cloneCreated = true;
			}

			this.removeClone = function() {
				if (!cloneCreated) { Meteor.call('removeClone', time); }
			}
		}
	}
});
