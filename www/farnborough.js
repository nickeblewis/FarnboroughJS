angular.module('place', ['ngRoute', 'firebase','xeditable'])
 
.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
})

.value('fbURL', 'https://farnborough.firebaseio.com/places/')
 
.factory('Places', function($firebase, fbURL) {
  var ref = new Firebase(fbURL);
  return $firebase(ref);
})
 
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'ListCtrl',
      templateUrl:'list.html'
    })
    .when('/edit/:placeId', {
      controller:'EditCtrl',
      templateUrl:'detail.html'
    })
    .when('/new', {
      controller:'CreateCtrl',
      templateUrl:'detail.html'
    })
    .otherwise({
      redirectTo:'/'
    });    
})

.controller('ListCtrl', function($scope, Places) {
  $scope.places = Places;

  $scope.places.$on("loaded", function() {
    $scope.status = "Watch this spot for live updates across the site!";
    $scope.loaded = 1;
  });

  $scope.places.$on("child_changed", function(snapshot) {
    var placeName = snapshot.snapshot.value.name;
    $scope.status = placeName + " has been updated";
    // console.log(snapshot.snapshot.value.name);
  });

  $scope.places.$on("child_added", function(snapshot) {
      var placeName = snapshot.snapshot.value.name;
      $scope.status = placeName + " has been added";
  });

  $scope.places.$on("child_removed", function(snapshot) {
      var placeName = snapshot.snapshot.value.name;
      $scope.status = placeName + " has been removed";
  });

  $scope.save = function() {
      $scope.places.$save();
      // $location.path('/');
    };

})
 
.controller('CreateCtrl', function($scope, $location, $timeout, Places) {
  $scope.save = function() {
    Places.$add($scope.place, function() {
      $timeout(function() { $location.path('/'); });
    });
  };
})
 
.controller('EditCtrl',
  function($scope, $location, $routeParams, $firebase, fbURL) {
    var placeUrl = fbURL + $routeParams.placeId;
    $scope.place = $firebase(new Firebase(placeUrl));
 
    $scope.destroy = function() {
      $scope.place.$remove();
      $location.path('/');
    };
 
    $scope.save = function() {
      $scope.place.$save();
      $location.path('/');
    };
});