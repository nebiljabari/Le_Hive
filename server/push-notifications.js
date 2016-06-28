Push.allow({
	send: function(userId, notification) {
		return true; // Allow all users to send
	}
});

Meteor.methods({
	pushFinalValidation: function(checkForPushBar, checkForPushKitchen, nameOrder) {
		if (checkForPushBar.length !== 0 && checkForPushKitchen.length !== 0) {
			// console.log('goToBar and goToKitchen - you have a new order: ' + nameOrder);
			Push.send({
				from: 'Waiter',
				title: 'Le Hive',
				text: 'you have a new order: ' + nameOrder,
				query: [{userId: 'HiveBar'}, {userId: 'HiveKitchen'}],
				apn: {sound: 'www/application/app/sound.wav'},
				gcm: {sound: 'sound'}
			});
		}
		else if (checkForPushBar.length !== 0) { 
			Push.send({
				from: 'Waiter',
				title: 'Le Hive',
				text: 'you have a new order: ' + nameOrder,
				query: {userId: 'HiveBar'},
				apn: {sound: 'www/application/app/sound.wav'},
				gcm: {sound: 'sound'}
			});
		}
			else { 
				Push.send({
					from: 'Waiter',
					title: 'Le Hive',
					text: 'you have a new order: ' + nameOrder,
					query: {userId: 'HiveKitchen'},
					apn: {sound: 'www/application/app/sound.wav'},
					gcm: {sound: 'sound'}
				});
			}
	},
	pushReminderFromWaiterToBar: function(nameOrder) {
		Push.send({
			from: 'Waiter',
			title: 'Le Hive',
			text: 'REMINDER FROM WAITER - you have a new order: ' + nameOrder,
			query: {userId: 'HiveBar'},
			apn: {sound: 'www/application/app/sound.wav'},
			gcm: {sound: 'sound'}
		});
	},
	pushReminderFromWaiterToKitchen: function(nameOrder) {
		Push.send({
			from: 'Waiter',
			title: 'Le Hive',
			text: 'REMINDER FROM WAITER - you have a new order: ' + nameOrder,
			query: {userId: 'HiveKitchen'},
			apn: {sound: 'www/application/app/sound.wav'},
			gcm: {sound: 'sound'}
		});
	},

	pushReceiveFromBar: function(nameOrder) {
		Push.send({
			from: 'Bar',
			title: 'Le Hive',
			text: 'Bar: order ' + nameOrder + ' received',
			query: {userId: 'HiveService'},
			apn: {sound: 'www/application/app/sound.wav'},
			gcm: {sound: 'sound'}
		});
	},
	pushReadyFromBar: function(nameOrder) {
		Push.send({
			from: 'Bar',
			title: 'Le Hive',
			text: 'Bar: order ' + nameOrder + ' ready',
			query: {userId: 'HiveService'},
			apn: {sound: 'www/application/app/sound.wav'},
			gcm: {sound: 'sound'}
		});
	},
	pushReminderFromBar: function(nameOrder) {
		Push.send({
			from: 'Bar',
			title: 'Le Hive',
			text: 'REMINDER FROM BAR - order ' + nameOrder + ' ready',
			query: {userId: 'HiveService'},
			apn: {sound: 'www/application/app/sound.wav'},
			gcm: {sound: 'sound'}
		});
	},

	pushReceiveFromKitchen: function(nameOrder) {
		Push.send({
			from: 'Kitchen',
			title: 'Le Hive',
			text: 'Kitchen: order ' + nameOrder + ' received',
			query: {userId: 'HiveService'},
			apn: {sound: 'www/application/app/sound.wav'},
			gcm: {sound: 'sound'}
		});
	},
	pushReadyFromKitchen: function(nameOrder) {
		Push.send({
			from: 'Kitchen',
			title: 'Le Hive',
			text: 'Kitchen: order ' + nameOrder + ' ready',
			query: {userId: 'HiveService'},
			apn: {sound: 'www/application/app/sound.wav'},
			gcm: {sound: 'sound'}
		});
	},
	pushReminderFromKitchen: function(nameOrder) {
		Push.send({
			from: 'Kitchen',
			title: 'Le Hive',
			text: 'REMINDER FROM KITCHEN - order ' + nameOrder + ' ready',
			query: {userId: 'HiveService'},
			apn: {sound: 'www/application/app/sound.wav'},
			gcm: {sound: 'sound'}
		});
	},

	pushUpdateFinalValidation: function(checkForPushBar, checkForPushKitchen, nameOrder) {
		if (checkForPushBar.length !== 0 && checkForPushKitchen.length !== 0) {
			Push.send({
				from: 'Waiter',
				title: 'Le Hive',
				text: '[UPDATE] order: ' + nameOrder,
				query: [{userId: 'HiveBar'}, {userId: 'HiveKitchen'}],
				apn: {sound: 'www/application/app/sound.wav'},
				gcm: {sound: 'sound'}
			});
		}
		else if (checkForPushBar.length !== 0) { 
			Push.send({
				from: 'Waiter',
				title: 'Le Hive',
				text: '[UPDATE] order: ' + nameOrder,
				query: {userId: 'HiveBar'},
				apn: {sound: 'www/application/app/sound.wav'},
				gcm: {sound: 'sound'}
			});
		}
			else { 
				Push.send({
					from: 'Waiter',
					title: 'Le Hive',
					text: '[UPDATE] order: ' + nameOrder,
					query: {userId: 'HiveKitchen'},
					apn: {sound: 'www/application/app/sound.wav'},
					gcm: {sound: 'sound'}
				});
			}
	},
});