var fg = angular.module('fg');

fg.controller('ListCtrl', function($scope, fbRequestUrl, fbEvents, fbAUTH) {

  var isAuthorised = false;

  var ref = new Firebase(fbAUTH);
  var auth = new FirebaseSimpleLogin(ref, function(error, user) {
    if (error) {
        // an error ocurred during login
        console.log(error);
      } else if (user) {
        // You are logged in
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
        isAuthorised = true;
      } else {
        // User has logged out
        console.log('User has logged out');
      }  
    });

  $scope.isAuthorised = false;

  $scope.authmessage = "";

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

  // $scope.isAuthorised = function() {
  //   return isAuthorised;
  // };

  $scope.logOut = function() {
    $scope.isAuthorised = false;
    $scope.authmessage = "You have successfully logged out";
    //auth.logout();
  };

  $scope.logIn = function() {
    $scope.isAuthorised = true;
    $scope.authmessage = "You have successfully logged in";
  }
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

  
  // $scope.map = {
  //   center: {
  //     latitude: 51.293,
  //     longitude: -0.75
  //   },
  //   zoom: 16,
  //   marker: {
  //     latitude: 51.293,
  //     longitude: -0.75
  //   }
  // };

  // $scope.place.$on('loaded', function(snapshot) {
  //   $scope.map.marker.latitude = snapshot.map.latitude;
  //   $scope.map.marker.longitude = snapshot.map.longitude;
  //   $scope.map.center.latitude = snapshot.map.latitude;
  //   $scope.map.center.longitude = snapshot.map.longitude;
  // });

  // $scope.searchLocationMarker = {
  //   coords: {
  //     latitude: 51.293,
  //     longitude: -0.75
  //   }
    // options: { draggable: true },
    // events: {
    //     dragend: function (marker, eventName, args) {
    //         $log.log('marker dragend');
    //         $log.log(marker.getPosition().lat());
    //         $log.log(marker.getPosition().lng());
    //     }
    // }
  // };
   
  // $scope.place.$on('loaded', function(snapshot) {
  //   $scope.map.center.latitude = snapshot.lat;
  //   $scope.map.center.longitude = snapshot.lng;
  //   $scope.searchLocationMarker.coords.latitude = snapshot.lat;
  //   $scope.searchLocationMarker.coords.longitude = snapshot.lng;    
  // });
  // $scope.destroy = function() {
  //   $scope.place.$remove();
  //   $location.path('/');
  // };

  // $scope.save = function() {
  //   $scope.place.$save();
  //   $location.path('/');
  // };
});

fg.controller('MapCtrl', function($scope, $location, $routeParams, $firebase, fbURL, fbRequestUrl, fbEvents) {
  $scope.places = fbRequestUrl;
  $scope.map = {
    center: {
      latitude: 51.293,
      longitude: -0.75
    },
    zoom: 12
  };
});

fg.controller('FeedCtrl', function($scope, $location, $routeParams, $firebase, fbURL, fbRequestUrl, fbEvents) {
  $scope.places = fbRequestUrl;
  
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