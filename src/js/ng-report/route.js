'use strict';
/**
 * Route configuration for the ngJobportal module.
 */
angular.module('ngJobportal').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/main.html'
            })
            .state('profile',{
                url: '/profile/:id',
                templateUrl: 'templates/profile.html'
            });
    }
]);