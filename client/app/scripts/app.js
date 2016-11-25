'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngRoute',
    'restangular'
  ])
  .config(function ($routeProvider, RestangularProvider) {
    RestangularProvider.setBaseUrl('http://localhost:3000' );
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/movies', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl',
        controllerAs: 'movies'
      })
      .when('/movie/:id/delete', {
        templateUrl: 'views/movie-delete.html',
        controller: 'MovieDeleteCtrl',
        controllerAs: 'movieDelete'
      })
      .when('/movie/:id', {
        templateUrl: 'views/movie-view.html',
        controller: 'MovieViewCtrl',
        controllerAs: 'movieView'
      })
      .when('/create/movie', {
        templateUrl: 'views/movie-add.html',
        controller: 'MovieAddCtrl',
        controllerAs: 'movieAdd'
      })
      .when('/movie/:id/edit', {
        templateUrl: 'views/movie-edit.html',
        controller: 'MovieEditCtrl',
        controllerAs: 'movieEdit'
      })
      .otherwise({
        redirectTo: '/'
      });
    })

  //changing name of fields since restapi gives _id as result
    .factory('MovieRestangular', function(Restangular){
        return Restangular.withConfig(function(RestangularProvider){
        RestangularProvider.setRestangularFields({
          'id': '_id'
        });
      });
    })
    //ability to create new movie, service args 'movie' is url from restapi exressjs
    .factory('Movie', function (MovieRestangular){
      return MovieRestangular.service('movie');
        //movie is server url
    })
    .directive('youtube', function(){
      return {
        restrict : 'E', //restricted to the element 
        scope: {
          src: '='
        },
        templateUrl : 'views/youtube.html'
      };
    })
    .filter('trusted', function($sce){
        return function(url){
          return $sce.trustAsResourceUrl (url);
      };
    });
  
