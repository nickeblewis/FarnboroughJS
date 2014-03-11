angular.module('fg', ['ngRoute', 'firebase','xeditable','google-maps','ngSanitize','ngAnimate'])
//angular.module('place', ['ngRoute', 'firebase','xeditable','iso.directives'])
// angular.module('mean', ['firebase','ngCookies', 'ngResource', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.articles','mean.places','leaflet-directive','contenteditable','xeditable']);

	.value('fbAuthToken', 'b9b3dbbcf69fdad7365f3fb61ad21927')
	.value('fbURL', 'https://farnborough.firebaseio.com/places/')
	.value('fbAUTH', 'https://farnborough.firebaseio.com')
 
	.run(function(editableOptions) {
		editableOptions.theme = 'bs3';
	});

