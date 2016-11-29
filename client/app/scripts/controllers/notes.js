'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:NotesCtrl
 * @description
 * # NotesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('NoteCtrl', function ($scope, Note) {
 

	$scope.notess = Note.getList().$object;
    
 // $object : autopupulates with results, goes to server , fetches list and dynamical changes the object 
 //bcoz of angular js autopopulates, asynchronus, 2 way binding 
});  

