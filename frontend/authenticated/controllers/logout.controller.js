(function (angular) {
    angular.module('main').controller('logoutCtrl', logoutCtrl);
    logoutCtrl.$inject = ['$http', '$location'];

    function logoutCtrl($http, $location) {
        var vm = this;
        vm.showError = false;

        vm.onSubmit = function () {
            vm.errorMessage = "";

            $http({
                method: 'POST',
                url: '/logout'
            }).then(function success(response) {
                window.location = "/";
            }).catch(function error(response) {
                if (response.status !== 200) {
                    vm.errorMessage = "Logout attempt failed.";
                }
            });
        };
    }
})(angular);