	// TODO: add this back? 'iso.directives'
	window.app = angular.module('mean', ['firebase','ngCookies', 'ngResource', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.articles','mean.places','leaflet-directive','contenteditable','xeditable']);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.places', []);

app.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});