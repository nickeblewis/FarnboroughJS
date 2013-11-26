	window.app = angular.module('mean', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.route', 'mean.system', 'mean.articles','mean.places','iso.directives','leaflet-directive','contenteditable']);

angular.module('mean.system', []);
angular.module('mean.articles', []);
angular.module('mean.places', []);