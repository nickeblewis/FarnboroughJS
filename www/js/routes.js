angular.module('fg')
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
      .when('/show/:placeId', {
        controller:'ShowCtrl',
        templateUrl:'views/show.html'
      })
      .when('/signup', {
        controller:'SignupCrl',
        templateUrl:'views/signup.html'
      })
      .when('/signin', {
        controller:'SigninCrl',
        templateUrl:'views/signin.html'
      })
      .otherwise({
        redirectTo:'/'
      });    
  });