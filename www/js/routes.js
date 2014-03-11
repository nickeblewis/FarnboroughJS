angular.module('fg')
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        controller:'ListCtrl',
        templateUrl:'views/list.html'
      })
      .when('/map', {
        controller:'MapCtrl',
        templateUrl:'views/map.html'
      })
      .when('/feed', {
        controller:'FeedCtrl',
        templateUrl:'views/feed.html'
      })
      .when('/edit/:placeId', {
        controller:'EditCtrl',
        templateUrl:'views/detail.html'
      })
      .when('/new', {
        controller:'CreateCtrl',
        templateUrl:'views/detail.html'
      })
      .when('/show/:placeId', {
        controller:'ShowCtrl',
        templateUrl:'views/show.html'
      })
      .when('/signup', {
        controller:'SignupCtrl',
        templateUrl:'views/signup.html'
      })
      .when('/signin', {
        controller:'SigninCtrl',
        templateUrl:'views/signin.html'
      })
      .otherwise({
        redirectTo:'/'
      });    
  });