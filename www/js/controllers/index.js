angular.module('mean.system').controller('IndexController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
        
    angular.extend($scope, {
        farnborough: {
            lat: 51.293,
            lng: -0.75,
            zoom: 16
        },
        marker: {
            lat: 51.293,
            lng: -0.75,
            focus: true,
            draggable: true

        },
        markers: {
            farnboroughMarker: {
                lat: 51,
                lng: -0.75,
                message: "I want to travel here!",
                focus: true,
                draggable:  true
        }
    },
    defaults: {
        maxZoom: 18,
        minZoom: 1,
        zoom: 6,
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