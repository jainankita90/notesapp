angular.module('clientApp').controller('LogoutCtrl',function (
	$scope,
	User,
	$location) {
  console.log('logout')
    $scope.logout = function () {

      // call logout from service
      User.get($scope.user)
        .then(function () {
          $location.path('/user/logout');
        });

    };

});