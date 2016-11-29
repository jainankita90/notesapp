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
  	$scope.note = {};

  	Note.one($routeParams.id).put().then(function(note){
  		$scope.note = note;
      console.log(note)
  		$scope.saveNote = function(){
        console.log("hello ankita");
    			$scope.note.save().then(function() {
          console.log("======test============")
  				$location.path('/note/edit/', $routeParams.id);
  			}, function(response){
          console.log('response: ' + response.status)
          console.log('response' + response)
      }); 
  		};

  	});
  });
