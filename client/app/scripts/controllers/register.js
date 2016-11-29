
angular.module('clientApp').controller('RegisterCtrl', function (
  $scope,
  User, 
  $location, 
  AuthService) {

    $scope.user = {};
    $scope.register = function () {
    User.post($scope.user).then(function(){
        $location.path('/user/create');
    })

    };

});