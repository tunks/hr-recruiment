/*
 * http service - rest client service that fetch data
 */
angular.module('ngJobportal')
       .factory('restService', ['$http','$q', function ($http, $q){
            var serverAddress = "localhost";
            var basePort = '8088';
            var baseUrl = 'http://' + serverAddress+ ':'+basePort+'/att/reports/';          

            function requestUrl(path){
               return path.url || baseUrl+path;
            }
            function getConfig(){
                return { headers: {
                                     'Content-Type': 'application/json' 
                                    }
                               };
            }
            
            return {
             
                get: function (path,params) {
                    var defer = $q.defer();
                    $http.get(requestUrl(path),params)
                            .success(function (data) {
                                // alter data if needed
                                defer.resolve(data);
                            })
                            .error(function (data, status, headers, config) {
                                defer.reject();
                            });
                    return defer.promise;
                },
                 post: function (path,data) {            
                    var defer = $q.defer(),
                        config = getConfig();
                    $http.post(requestUrl(path),data, config)
                            .then(function (response) {
                                defer.resolve(response);
                            },function (error) {
                                defer.reject();
                            });
                    return defer.promise;
                },
                 put: function (path,data) {            
                    var defer = $q.defer(),
                        config = getConfig();
                    $http.put(requestUrl(path),data, config)
                            .then(function (response) {
                                defer.resolve(response);
                            },function (error) {
                                defer.reject();
                            });
                    return defer.promise;
                },
                load: function(path, successCallback, errorCallback){
                   $http.get(path)
                         .success(successCallback)
                         .error(function (data, status, headers, config) {
                              
                         });
                },
                getServerAddress: function(){
                    return  serverAddress;
                }
            };
      }]);
