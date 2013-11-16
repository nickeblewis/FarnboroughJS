angular.module('mean.places').controller('PlacesController', ['$scope', '$routeParams', '$location', 'Global', 'Places', function ($scope, $routeParams, $location, Global, Places) {
    $scope.global = Global;

    $scope.create = function() {
        var place = new Places({
            title: this.title,
            content: this.content,
            lat: this.lat,
            lng: this.lng
        });
        place.$save(function(response) {
            $location.path("places/" + response._id);
        });

        this.title = "";
        this.content = "";
    };

    $scope.remove = function(place) {
        place.$remove();  

        for (var i in $scope.places) {
            if ($scope.places[i] == place) {
                $scope.places.splice(i, 1);
            }
        }
    };

    $scope.update = function() {
        var place = $scope.place;
        if (!place.updated) {
            place.updated = [];
        }
        place.updated.push(new Date().getTime());

        place.$update(function() {
            $location.path('places/' + place._id);
        });
    };

    $scope.find = function() {
        Places.query(function(places) {
            $scope.places = places;
        });
    };

    $scope.findOne = function() {
        Places.get({
            placeId: $routeParams.placeId
        }, function(place) {
            $scope.place = place;
        });
    };
}]);