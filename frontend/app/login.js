/**
 * Created by gail on 4/10/15.
 */

angular.module('app').controller('Login', function($scope, $auth, $http) {
  $scope.login = function() {
    $auth.authenticate('twitter');
  };

  $scope.tweet = function() {
    $http.post('/api/post/tweet', '').then(function() {

    });
  }
});
