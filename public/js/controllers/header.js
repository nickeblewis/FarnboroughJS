angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        "title": "Create new place",
        "link": "places/create"
    }];

    $scope.isCollapsed = false;
}]);