'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NoteViewCtrl
 * @description
 * # NoteViewCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('NoteViewCtrl', function (
  	$scope,
  	$routeParams,
  	Note
  	) {
  	$scope.viewNote = true;
  	//$scope.editNote = false;
  	console.log('view.js   ' + $routeParams.id)
  	$scope.notess = Note.one($routeParams.id).get().$object;

  });
