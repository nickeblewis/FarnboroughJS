// TODO: Add some big and fancy comment block at the top of this code
// TODO: errrr, testing,testing yeah

// NOTE: iso.directives listed below is commented out as I had problems with this and the real-time nature of the system
angular.module('place', ['ngRoute', 'firebase','xeditable'])
//angular.module('place', ['ngRoute', 'firebase','xeditable','iso.directives'])
 
.run(function(editableOptions) {
  editableOptions.theme = 'bs3';
})

.value('fbURL', 'https://farnborough.firebaseio.com/places/')
 
.factory('Places', function($firebase, fbURL) {
  var ref = new Firebase(fbURL);
  var auth = new FirebaseSimpleLogin(ref, function(error, user) {
    // TODO: What goes in here???
  });

  return $firebase(ref);
})
 
.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'ListCtrl',
      templateUrl:'views/list.html'
    })
    .when('/edit/:placeId', {
      controller:'EditCtrl',
      templateUrl:'views/detail.html'
    })
    .when('/new', {
      controller:'CreateCtrl',
      templateUrl:'views/detail.html'
    })
    .otherwise({
      redirectTo:'/'
    });    
})

.controller('ListCtrl', function($scope, fbURL, Places) {

  var ref = new Firebase(fbURL);
  var auth = new FirebaseSimpleLogin(ref, function(error, user) {
    // TODO: What goes in here???
  });

  $scope.status = "Loading...";

  $scope.places = Places;

  $scope.places.$on("loaded", function() {
    $scope.status = "Watch this spot for live updates across the site!";
    $scope.loaded = 1;
  });

  $scope.places.$on("child_changed", function(snapshot) {
    // TODO: Not happy about the following line, I had to change it to this and not sure why?????!!!
    var placeName = snapshot.val();
    $scope.status = placeName + " has been updated";
    // console.log(snapshot.snapshot.value.name);
  });

  $scope.places.$on("child_added", function(snapshot) {
    // TODO: Not happy about the following line, I had to change it to this and not sure why?????!!!
      var placeName = snapshot.snapshot.value.name;
      $scope.status = placeName + " has been added";
  });

  $scope.places.$on("child_removed", function(snapshot) {
    // TODO: Not happy about the following line, I had to change it to this and not sure why?????!!!
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