angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Articles",
        "link": "articles"
    }, {
        "title": "Create New Article",
        "link": "articles/create"
    }, {
        "title": "Places",
        "link": "places"
    }, {
        "title": "Create new place",
        "link": "places/create"
    }];

    $scope.isCollapsed = false;
}]);