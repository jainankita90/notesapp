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
    console.log('its already hit')
    $scope.note={};
    $scope.saveNote = function(){
      console.log ($scope);
    	//scope note will change as soon there is update in text field, so no listner is required
    	  Note.post($scope.note).then(function(){
    		$location.path('/note/add')
    	}, function(response){
          console.log('response: ' + response.status)
          console.log('response' + response)
      });
    };
});
