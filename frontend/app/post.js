/**
 * Created by gail on 4/11/15.
 */
angular.module ('app').controller ('Post',
  function ($scope, $http, $location, $state, toastr) {

    var id = $location.search ().id;

    $scope.minDate = new Date ();


    $scope.time = new Date ();


    $scope.opened = false;


    $scope.open = function ($event) {
      $event.preventDefault ();
      $event.stopPropagation ();
      $scope.opened = !$scope.opened;

    };

    $scope.delete = deletePost;

    function getPost(id) {
      $http.get ('/api/post/' + id).then (function (post) {
        $scope.message = post.data.message;
        var datetime = new Date (post.data.datetime);

        $scope.date = datetime;
        $scope.time = datetime;
      });
    }

    if (isEditingPost ()) {
      $scope.isEditing = true;
      getPost (id);
      $scope.save = editPost;
    } else {
      $scope.save = newPost;
    }

    function newPost() {
      var datetime = new Date (
        $scope.date.getFullYear ()
        , $scope.date.getMonth ()
        , $scope.date.getDate ()
        , $scope.time.getHours ()
        , $scope.time.getMinutes ()
      );

      $http.post ('/api/post/tweet', {
        message:  $scope.message,
        datetime: datetime
      }).then (function (data) {
        toastr.success ("new post created");
        $state.go ('posts');
      });
    }

    function editPost() {
      var datetime = new Date (
        $scope.date.getFullYear ()
        , $scope.date.getMonth ()
        , $scope.date.getDate ()
        , $scope.time.getHours ()
        , $scope.time.getMinutes ()
      );

      $http.post ('/api/post/update/' + id, {
        message:  $scope.message,
        datetime: datetime
      }).then (function (data) {
        toastr.success ("post was updated successfully");
        $state.go ('posts');
      });
    }

    function deletePost() {
      $http.post ('/api/post/destroy/' + id).then (
        function (data) {
          toastr.info ("post was deleted");
          $state.go ('posts');
        });
    }

    function isEditingPost() {
      return !!id;
    }
  });


angular.module ('app').directive ('datepickerPopup', function () {
  return {
    restrict: 'EAC',
    require:  'ngModel',
    link:     function (scope, element, attr, controller) {
      //remove the default formatter from the input directive to prevent conflict
      controller.$formatters.shift ();
    }
  }
});
