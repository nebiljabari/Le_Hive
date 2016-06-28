app = angular.module('hive-app', ['angular-meteor', 'ui.router', 'angular-meteor.auth']);

// used to control the uniqueness of Orders creation
time = new Date().getTime();

// used to control the DB duplication from the cloneDB function in navbar.js
cloneCreated = false;


// - - - *** Meteor Cordova *** - - - //
function onReady() {
	angular.bootstrap(document, ['hive-app'], {
		strictDi: true
	});
}

if (Meteor.isCordova) {
	angular.element(document).on('deviceready', onReady);
}
	else { angular.element(document).ready(onReady); }