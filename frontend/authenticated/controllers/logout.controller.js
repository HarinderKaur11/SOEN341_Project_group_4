(function (angular) {
    angular.module('main').controller('logoutCtrl', logoutCtrl);
    logoutCtrl.$inject = ['$http', '$location'];

    function logoutCtrl($http, $location) {
        var vm = this;
        vm.showError = false;

        vm.onSubmit = function () {
            vm.errorMessage = "";
            window.location = "/logout";
        };

    }
})(angular);
