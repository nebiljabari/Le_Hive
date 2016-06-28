// cleaner (and certainly smarter) to put the logic filter inside
// controller: function() {} instead template: function() {}

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
	$locationProvider.html5Mode(true);

	// place for Meteor.userId() token
	// ex: var appUsers = ['abcd123', 'efgh456', 'ijkl789'];
	// For the Admin section the re-direction operate in the todolist.js file
	var appUsers = [];

	$stateProvider
		.state('login', {
			url: '/login',
			template: '<login></login>'
		})
		.state('todolist', {
			url: '/todolist',
			template: function() {
				if (Meteor.userId() == null) {
					return console.log('userId = null'), $state.go('login');
				}
				if (Meteor.userId() === appUsers[1]) {
					return '<todolist></todolist> <navbar-bar></navbar-bar>';
				}
				else if (Meteor.userId() === appUsers[3]) {
					return '<todolist></todolist> <navbar-kitchen></navbar-kitchen>';
				}
				else if (Meteor.userId() == appUsers[2] || appUsers[4]) {
					return '<todolist></todolist> <navbar></navbar>';
				}
				else if (Meteor.userId() === appUsers[0]) {
					return '<todolist></todolist>';
				}
			},
			resolve: {
				user: function($auth) {
						return $auth.requireValidUser(function(user) {
							if (appUsers.indexOf(user._id) !== -1) {
								$auth.currentUser = Meteor.userId();
								return $auth.currentUser, true;
							}
								else return false;
						});
				},
				defer: function($q, $timeout) {
						var deferred = $q.defer();
						$timeout(function() { deferred.resolve(); }, 400);
						return deferred.promise;
				}
			}
		})
		.state('products', {
			url: '/menu',
			template: function() {
				if (Meteor.userId() == null) {
					return console.log('userId = null');
				}
				if (Meteor.userId() == appUsers[1]) {
					return '<menu></menu> <navbar-bar></navbar-bar>';
				}
				else if (Meteor.userId() == appUsers[2] || appUsers[4]) {
					return '<menu></menu> <navbar></navbar>';
				}
			}
		})
		.state('orders', {
			url: '/orders',
			template: function() {
				if (Meteor.userId() == appUsers[1]) {
					return '<orders></orders> <navbar-bar></navbar-bar>';
				}
				else if (Meteor.userId() == appUsers[2] || appUsers[4]) {
					return '<orders></orders> <navbar></navbar>';
				}
			}
		})
		.state('update', {
			url: '/update/:updateId',
			template: function() {
				if (Meteor.userId() == appUsers[1]) {
					return '<update></update>';
				}
				else if (Meteor.userId() == appUsers[2] || appUsers[4]) {
					return '<update></update>';
				}
			}
		})
		.state('bar', {
			url: '/bar',
			template: '<bar></bar> <navbar-bar></navbar-bar>',
			controller: function($state) {
				if (Meteor.userId() !== appUsers[1]) { return $state.go('login');}
			}
		})
		.state('kitchen', {
			url: '/kitchen',
			template: '<kitchen></kitchen> <navbar-kitchen></navbar-kitchen>',
			controller: function($state) {
				if (Meteor.userId() !== appUsers[3]) { return $state.go('login');}
			}
		})
		.state('admin', {
			url: '/admin',
			template: '<admin></admin>',
			controller: function($state) {
				if (Meteor.userId() !== appUsers[0]) { return $state.go('login');}
			}
		});

	$urlRouterProvider.otherwise('/login');
});
