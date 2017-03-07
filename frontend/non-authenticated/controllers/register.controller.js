(function (angular) {
  angular.module('main').controller('registerCtrl', registerCtrl);
  registerCtrl.$inject = ['$http'];

  function registerCtrl($http) {
    var vm = this;

    vm.username = '';
    vm.password_one = '';
    vm.password_two = '';

    vm.register = function() {
      $http({
        method: 'POST',
        url: '/register',
        data: {
          username: vm.username,
          password: vm.password_one
        }
      }).then(function success(response) {
        if (response.data.error === undefined) {
          window.location = "/authenticated/";
        } else {
          vm.submitted = true;
        }
      }).catch(function error(response) {
        if (response.status !== 200) {
          vm.showError = true;
        }
      });
    }
  }
})(angular);