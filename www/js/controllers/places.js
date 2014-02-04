angular.module('mean.places').controller('PlacesController', ['$scope', '$firebase', '$routeParams', '$location', 'Global', function ($scope, $firebase, $routeParams, $location, Global) {
    $scope.global = Global;
    var placesURL= "https://farnborough.firebaseio.com";
    
    $scope.places = {};
    var dataRef = new Firebase(placesURL + '/places');
    $scope.places = $firebase(dataRef);

    var objs = [
{ name : 'Whatever' , has : 'value' , etc : 'etc' },
{ name : 'Whatever' , has : 'value' , etc : 'etc' },
{ name : 'Whatever' , has : 'value' , etc : 'etc' }
]

    angular.extend($scope, {
        status: "Hold on tight, loading feed...",
        loaded: 0,
        center: {
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
            m1: {
                lat: 51.293,
                lng: -0.75,
                message: "Grab this marker in order to set the new location!",
                focus: true,
                draggable:  true
        },
        place: {
            title: "Thingy majuke"
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

    $scope.title = "new entry title - just start typing in these boxes!";
    $scope.content = "Just fill this bit out with the details for your business, place, organisation, church, charity or whatever it may be. So long as it is in Farnborough and relevant to the town, we want to know about it and so does the rest of the World!<br /><br />You don't need a profile to create an item for the Farnborough Guide but it should be something you would consider if you want to use this site often. We will review your entry and will invoice you accordingly - more details on our pricing can be found under the pricing section...";
    
    $scope.places.$on("loaded", function() {
        $scope.status = "Enjoy exploring what your town has to offer, we are constantly updating our database";
        $scope.loaded = 1;
    });

    dataRef.on("child_changed", function(snapshot) {
        var placeName = snapshot.val().name, userData = snapshot.val();
        $scope.status = "Place " + placeName + " has been updated";
    });

    dataRef.on("child_added", function(snapshot) {
        var placeName = snapshot.val().name, userData = snapshot.val();
        $scope.status = "Place " + placeName + " has been added";
    });

    dataRef.on("child_removed", function(snapshot) {
        var placeName = snapshot.val().name, userData = snapshot.val();
        $scope.status = "Place " + placeName + " has been removed";
    });

    // $scope.places.$on("change", function() {
    //     if ($scope.loaded === 1) {
    //         $scope.status = "Changing data....";
    //     }
    // });

    $scope.create = function() {
        $scope.places.$add({
            name: this.name,
            description: this.description,
            lat: $scope.marker.lat,
            lng: $scope.marker.lng,
            address: {
                contact: this.contact,
                number: this.number,
                street: this.street,
                postcode: this.postcode,
                telephone: this.telephone,
                fax: this.fax,
                email: this.email
            }
           

            });
       
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

        place.lat = $scope.marker.lat;
        place.lng = $scope.marker.lng;

        place.updated.push(new Date().getTime());

        place.$update(function() {
            $location.path('places/' + place._id);
        });
    };

    $scope.find = function() {
        // Places.query(function(places) {
        //     $scope.places = places;
        // });
       
    };

    $scope.findOne = function() {

        $scope.place = {};

        var dataRef = new Firebase('https://farnborough.firebaseio.com/places/' + $routeParams.placeId);
    
        dataRef.on('value', function(snapshot) {
            console.log(snapshot.val());
              $scope.place = snapshot.val();
              
              $scope.center.lat = snapshot.val().lat;
              $scope.center.lng = snapshot.val().lng;
            $scope.marker.lat = snapshot.val().lat;
              $scope.marker.lng = snapshot.val().lng;
         });
        // Places.get({
        //     placeId: $routeParams.placeId
        // }, function(place) {
        //     $scope.place = place;
        //     $scope.center.lat = place.lat;
        //     $scope.center.lng = place.lng;
        //     $scope.marker.lat = place.lat;
        //     $scope.marker.lng = place.lng;
        // });
    };
}]);