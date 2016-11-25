'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MovieDeleteCtrl
 * @description
 * # MovieDeleteCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MovieDeleteCtrl', function (
  	$scope,
  	$routeParams,
  	Movie,
  	$location
  	) {
    $scope.moviess = Movie.one($routeParams.id).get().$object;
    $scope.deleteMovie = function(){
    	$scope.moviess.remove().then(function(){
    		$location.path('/movies');
    	});
    };
    $scope.back = function(){
    	$location.path('/movie/' + $routeParams.id);
    };
  });
