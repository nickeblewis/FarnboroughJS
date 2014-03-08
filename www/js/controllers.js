var fg = angular.module('fg');

fg.controller('ListCtrl', function($scope, fbRequestUrl, fbEvents, fbAUTH) {

  var ref = new Firebase(fbAUTH);
  var auth = new FirebaseSimpleLogin(ref, function(error, user) {
    if (error) {
        // an error ocurred during login
        console.log(error);
      } else if (user) {
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
      } else {
        // User has logged out
      }  
    });

  $scope.status = "Loading...";

  $scope.places = fbRequestUrl;

  $scope.places.$on("loaded", function() {
        $scope.status = "Watch this spot for live updates across the site!";
        $scope.loaded = 1;
    });

  fbEvents.on("child_changed", function(snapshot) {    
    var placeName = snapshot.val().name;
    $scope.status = placeName + " has been updated";
    // console.log(snapshot.snapshot.value.name);
  });

  fbEvents.on("child_added", function(snapshot) {    
      var placeName = snapshot.val().name;
      $scope.status = placeName + " has been added";
  });

  fbEvents.on("child_removed", function(snapshot) {    
      var placeName = snapshot.val().name;
      $scope.status = placeName + " has been removed";
  });

  $scope.save = function() {
      $scope.places.$save();
      // $location.path('/');
    };
});
 
fg.controller('CreateCtrl', function($scope, $location, $timeout, fbRequestUrl) {
  $scope.save = function() {
    fbRequestUrl.$add($scope.place, function() {
      $timeout(function() { $location.path('/'); });
    });
  };
});

fg.controller('ShowCtrl', function($scope, $location, $routeParams, $firebase, fbURL, fbRequestUrl, fbEvents) {
  var placeUrl = fbURL + $routeParams.placeId;
  $scope.place = $firebase(new Firebase(placeUrl));
  $scope.map = {
    center: {
      latitude: 51.293,
      longitude: -0.75
    },
    zoom: 18
  };

  $scope.searchLocationMarker = {
    coords: {
      latitude: 51.293,
      longitude: -0.75
    }
    // options: { draggable: true },
    // events: {
    //     dragend: function (marker, eventName, args) {
    //         $log.log('marker dragend');
    //         $log.log(marker.getPosition().lat());
    //         $log.log(marker.getPosition().lng());
    //     }
    // }
  };
   
  $scope.place.$on('loaded', function(snapshot) {
    $scope.map.center.latitude = snapshot.lat;
    $scope.map.center.longitude = snapshot.lng;
    $scope.searchLocationMarker.coords.latitude = snapshot.lat;
    $scope.searchLocationMarker.coords.longitude = snapshot.lng;    
  });
  // $scope.destroy = function() {
  //   $scope.place.$remove();
  //   $location.path('/');
  // };

  // $scope.save = function() {
  //   $scope.place.$save();
  //   $location.path('/');
  // };
});

fg.controller('EditCtrl', 
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

fg.controller('SignupCtrl', 
  function($scope, $location, $routeParams, $firebase, fbAUTH) {

  var ref = new Firebase(fbAUTH);
  var auth = new FirebaseSimpleLogin(ref, function(error, user) {
    if (error) {
        // an error ocurred during login
        console.log(error);
      } else if (user) {
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
      } else {
        // User has logged out
      }  
    });
  
  $scope.signup = function() {
    auth.createUser($scope.user.email, $scope.user.password, function(error, user) {
      if (!error) {
        $scope.message = "one";
      } else {
        $scope.message = "Two";
      }
    });
  };
});

fg.controller('SigninCtrl', 
  function($scope, $location, $routeParams, $firebase, fbAUTH) {
  
    var ref = new Firebase(fbAUTH);
    var auth = new FirebaseSimpleLogin(ref, function(error, user) {
      if (error) {
        // an error ocurred during login
        console.log(error);
      } else if (user) {
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
      } else {
        // User has logged out
      }

    });
  
    $scope.signin = function() {
      auth.login('password', {
        email: $scope.user.email,
        password: $scope.user.password
      });
    };
});