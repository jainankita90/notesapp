angular.module('clientApp').controller('LogoutCtrl',function (
	$scope,
	User,
	$location) {
    $scope.logout = function () {

      // call logout from service
      User.get($scope.User)
        .then(function () {
          $location.path('/user/logout');
        });

    };

});