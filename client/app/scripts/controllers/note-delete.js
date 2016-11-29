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
       $scope.note = Note.one($routeParams.id).get().$object;
      $scope.deleteNote = function() {
        $scope.note.remove().then(function() {
          $location.path('/note');
        });
      };
      $scope.back = function() {
        $location.path('/note/' + $routeParams.id);
      };
});
