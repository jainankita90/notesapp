angular.module('clientApp').controller('LoginCtrl', function(
  $scope, User, $location) {

    $scope.user = {}
    $scope.login = function () {
      User.post($scope.user).then(function(){
        $location.path('/user/login');
      })
    };
});


