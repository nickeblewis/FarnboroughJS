angular.module('mean.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma',
      'One more thing'
    ];

    $scope.places = [
    	'Lorem ipsum dolor sit amet',
    	'Lorem ipsum dolor sit amet',
    	'Restaurants',
    	'Abbey',
    	'Airport',
    	'Restaurants',
    	'Abbey',
    	'Airport',
    	'Restaurants',
    	'Abbey',
    	'Airport',
    	'Restaurants',
    	'Abbey',
    	'Airport',
    	'Restaurants',
    	'Abbey',
    	'Airport',
    	'Restaurants',
    	'Pubs'
    ];

    angular.extend($scope, {
                farnborough: {
                    lat: 51.293,
                    lng: -0.75,
                    zoom: 18
                },
                markers: {
                  farnboroughMarker: {
                    lat: 51,
                    lng: -0.75,
                    message: "I want to travel here!",
                    focus: true,
                    draggable: true
                    }
                },
                defaults: {
                    tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
                    zoomControlPosition: 'topright',
                    tileLayerOptions: {
                        opacity: 0.9,
                        detectRetina: true,
                        reuseTiles: true,
                    },
                    scrollWheelZoom: false
                }
            });
}]);