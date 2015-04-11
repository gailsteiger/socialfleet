/**
 * Created by gail on 4/10/15.
 */

angular.module('app', ['satellizer'])
  .config(function($authProvider) {
  $authProvider.twitter({
    url: '/api/user/login'
  });
});
