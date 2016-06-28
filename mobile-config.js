App.info({
	id: '',
	name: 'Le Hive',
	version: '1.0.2',
	description: 'Design to simplified the global order process',
	author: 'JaNe',
	website: 'https://github.com/nebiljabari'
});

App.icons({
	// iOS
	'iphone': 'resources/icons/ios/icon-60.png',
	'iphone_2x': 'resources/icons/ios/icon-60@2x.png',
	'iphone_3x': 'resources/icons/ios/icon-60@3x.png',
	'ipad': 'resources/icons/ios/icon-76.png',
	'ipad_2x': 'resources/icons/ios/icon-76@2x.png',

	// Android
	'android_ldpi': 'resources/icons/android/icon-36.png',
	'android_mdpi': 'resources/icons/android/icon-48.png',
	'android_hdpi': 'resources/icons/android/icon-72.png',
	'android_xhdpi': 'resources/icons/android/icon-96.png'
});

App.launchScreens({
	// iOS
	'iphone': 'resources/launchscreens/ios/image-320x480.png',
	'iphone_2x': 'resources/launchscreens/ios/image-640x1136.png',
	'ipad_portrait': 'resources/launchscreens/ios/image-768x1024.png',

	// Android
	'android_ldpi_portrait': 'resources/launchscreens/android/image-200x320.png',
	'android_mdpi_portrait': 'resources/launchscreens/android/image-320x480.png',
	'android_hdpi_portrait': 'resources/launchscreens/android/image-480x800.png',
	'android_xhdpi_portrait': 'resources/launchscreens/android/image-720x1280.png'
});

App.accessRule('*');

App.setPreference('DisallowOverscroll', 'true');
App.setPreference('Orientation', 'portrait');
App.setPreference('Orientation', 'portrait', 'ios');
