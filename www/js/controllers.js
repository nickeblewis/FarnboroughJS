var fg = angular.module('fg');

fg.controller('ListCtrl', function($scope, $timeout, fbRequestUrl, fbEvents, fbAUTH) {

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

  $scope.$watch('places', function() {
    console.log('Places has updated ');
    // if($scope.loaded === 1)
    //   $('.isotope').isotope();
  });

  $scope.places.$on("loaded", function() {
      $scope.status = "Watch this spot for live updates across the site!";
      $scope.loaded = 1;
      $scope.$emit('iso-init');
  });

  fbEvents.on("child_changed", function(snapshot) {    
    var placeName = snapshot.val().name;
    $scope.status = placeName + " has been updated";    
    console.log('FB has updated ');
    // if($scope.loaded === 1)
    //   $('.isotope').isotope('reloadItems').isotope();
    // $scope.$emit('iso-init');
    $timeout(function() {
      $scope.$emit('my-iso-method', {name:null, params:null});
    }, 3000);
  });

  fbEvents.on("child_added", function(snapshot) {    
      var placeName = snapshot.val().name;
      $scope.status = placeName + " has been added";
      //$scope.$emit('iso-updated');
      $timeout(function() {
      $scope.$emit('my-iso-method', {name:null, params:null});
    });
  });

  fbEvents.on("child_removed", function(snapshot) {    
      var placeName = snapshot.val().name;
      $scope.status = placeName + " has been removed";
      // $scope.$emit('iso-init');
      $timeout(function() {
      $scope.$emit('my-iso-method', {name:null, params:null});
    });
  });

  $scope.modalShown = false;
 
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };
  
  $scope.logOut = function() {
    $scope.isAuthorised = false;
    $scope.authmessage = "You have successfully logged out";
    //auth.logout();
  };

  $scope.logIn = function() {
    $scope.isAuthorised = true;
    $scope.authmessage = "You have successfully logged in";
  };

  $scope.save = function() {
    $scope.places.$save();
  };

  $scope.timeAgo = function(ms) {
    return moment(ms).fromNow();
  };

});
 
fg.controller('CreateCtrl', function($scope, $location, $timeout, fbRequestUrl) {
  $scope.save = function() {
    $scope.place.updated = (new Date).getTime();
    fbRequestUrl.$add($scope.place, function() {
      $timeout(function() { $location.path('/'); });
    });
  };
});

fg.controller('ShowCtrl', function($scope, $location, $routeParams, $firebase, fbURL, fbRequestUrl, fbEvents) {
  var placeUrl = fbURL + $routeParams.placeId;
  $scope.place = $firebase(new Firebase(placeUrl));
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
      $scope.place.updated = (new Date).getTime();
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

fg.controller('MyCtrl', ['$scope', function($scope) {
  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };
}]);