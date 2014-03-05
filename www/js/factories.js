angular.module('fg')
	.factory('fbRequestUrl', function($firebase, fbURL, fbAuthToken) {
		var ref = new Firebase(fbURL);
		var auth = new FirebaseSimpleLogin(ref, function(error, user) {
			// TODO: What goes in here???
		});

		return $firebase(ref);
	})

	.factory('fbEvents', function($firebase, fbURL, fbAuthToken) {
		var firebase = new Firebase(fbURL);
		firebase.auth(fbAuthToken);
		return firebase;
	});