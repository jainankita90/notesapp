'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NoteAddCtrl
 * @description
 * # NoteAddCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('NoteAddCtrl', function (
  	$scope,
  	Note,
  	$location
  	) {
  $scope.note = {};
  $scope.saveNote = function() {
    //console.log($scope.note)
    Note.post($scope.note).then(function(note) {
      console.log(note)
      $location.path('/note');
    }, function(res){
      console.log(res)
    });
  };
});
