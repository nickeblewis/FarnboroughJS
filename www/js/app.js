	// TODO: add this back? 'iso.directives'
	window.app = angular.module('mean', ['firebase','ngCookies', 'ngResource', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.articles','mean.places','leaflet-directive','contenteditable']);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.places', []);