'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NoteDeleteCtrl
 * @description
 * # NoteDeleteCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('NoteDeleteCtrl', function (
  	$scope,
  	$routeParams,
  	Note,
  	$location
  	) {
    $scope.notess = Note.one($routeParams.id).get().$object;
    $scope.deleteNote = function(){
      console.log($scope.notess)
    	$scope.notess.remove().then(function(){
    		$location.path('/note');
    	});
    };
    $scope.back = function(){
    	$location.path('note/delete/' + $routeParams.id);
    };
  });
