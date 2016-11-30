




angular.module('clientApp')
.controller('LoginCtrl', function(
  $scope, User, $location) {
  console.log('correct ctrl')

    $scope.credentials = {"username":"", "password":""};
    $scope.login = function () {
      console.log("login from controller")
      User.post($scope.lg).then(function(){
        $location.path('/note/')
      })
     }
});


