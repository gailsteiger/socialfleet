/**
 * Created by gail on 4/10/15.
 */

angular.module('app', ['satellizer', 'ui.bootstrap'])
  .config(function($authProvider) {
  $authProvider.twitter({
    url: '/api/user/login'
  });
});
