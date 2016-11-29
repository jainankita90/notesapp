'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NoteEditCtrl
 * @description
 * # NoteEditCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('NoteEditCtrl', function (
  	$scope,
  	$routeParams,
  	$location,
  	Note
  ) {
      $scope.editNote = true;
      $scope.note = {}
      Note.one($routeParams.id).get().then(function(note) {
      $scope.note = note;
      $scope.saveNote = function() {
        $scope.note.put().then(function() {          
          $location.path('/note/' + $routeParams.id);
        },
        function(response){
          console.log(response)
        })
        };
      
    });
  });

