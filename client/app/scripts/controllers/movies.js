'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MoviesCtrl
 * @description
 * # MoviesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MoviesCtrl', function ($scope, Movie) {
    // $scope.moviess = [
    // {
    // 	title: 'a',
    // 	url: 'www.google.com/a'
    // },
    // {
 
    // 	title: 'b',
    // 	url: 'www.google.com/b'
    // },
    // {

    // 	title: 'b',
    // 	url: 'www.google.com/c'
    // }
    // ];    

	$scope.moviess = Movie.getList().$object;
 // $object : autopupulates with results, goes to server , fetches list and dynamical changes the object 
 //bcoz of angular js autopopulates, asynchronus, 2 way binding 
});  

