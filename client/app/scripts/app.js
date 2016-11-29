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
      .when('/note', {
        templateUrl: 'views/notes.html',
        controller: 'NoteCtrl',
        controllerAs: 'notes'
      })
      .when('/note/delete/:id', {
        templateUrl: 'views/note-delete.html',
        controller: 'NoteDeleteCtrl',
        controllerAs: 'noteDelete'
      })
      .when('/note/:id', {
        templateUrl: 'views/note-view.html',
        controller: 'NoteViewCtrl',
        controllerAs: 'noteView'
      })
      .when('/create/note', {
        templateUrl: 'views/note-add.html',
        controller: 'NoteAddCtrl',
        controllerAs: 'noteAdd'
      })
      .when('/note/edit/:id', {
        templateUrl: 'views/note-edit.html',
        controller: 'NoteEditCtrl',
        controllerAs: 'noteEdit'
      })
      .when('/login',{
        templateUrl: 'views/login.html',
        controllerAs: 'LoginCtrl'
      })
      .when('/logout',{
        controller: 'LogoutCtrl',
        access: {restricted: false}
      })
      .when('/register',{
        templateUrl: 'views/register.html',
        controllerAs: 'RegisterCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    })

  //changing name of fields since restapi gives _id as result
    .factory('NoteRestangular', function(Restangular){
        return Restangular.withConfig(function(RestangularProvider){
        RestangularProvider.setRestangularFields({
          'id': 'identifier',
        });
      });
    })
    //ability to create new note, service args 'note' is url from restapi exressjs
    .factory('Note', function (NoteRestangular){
      return NoteRestangular.service('note');
        //note is server url
    })
    .factory('UserRestangular', function(Restangular){
        return Restangular.withConfig(function(RestangularProvider){
        RestangularProvider.setRestangularFields({
          'id': 'id',
        });
      });
    })
    .factory('User', function(UserRestangular){
        return UserRestangular.service('user')
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