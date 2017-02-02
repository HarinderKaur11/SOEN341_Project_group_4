(function (angular) {
  angular.module('main').controller('loginCtrl', loginCtrl);
  loginCtrl.$inject = ['$state', '$http'];

  function loginCtrl($state, $http) {
    var vm = this;

    vm.credentials = {
      username : "",
      password : ""
    };

    vm.onSubmit = function () {
      $http({
        method: 'POST',
        url: '/login',
        data: vm.credentials
      }).then(function success(response) {
        if (response.data.error === undefined) {
          $state.go('main', {}, {});
        }
      });
    };
  }
})(angular);
