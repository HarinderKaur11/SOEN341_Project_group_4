(function (angular) {
    angular.module('main').controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$http', '$location'];

    function loginCtrl($http, $location) {
        var vm = this;
        vm.showError = false;

        vm.credentials = {
            username : "",
            password : ""
        };

        vm.onSubmit = function () {
            vm.errorMessage = "";
            
            // Check if username or password is empty
            if (vm.credentials.username && vm.credentials.password) {
                $http({
                    method: 'POST',
                    url: '/login',
                    data: vm.credentials
                }).then(function success(response) {
                    if (response.data.error === undefined) {
                        window.location = "/authenticated/";
                    } else {
                        vm.errorMessage = "Login attempt failed.";
                    }
                }).catch(function error(response) {
                    if (response.status !== 200) {
                        vm.errorMessage = "Login attempt failed.";
                    }
                });
            } else {
                vm.errorMessage = "Username and password cannot be empty";
            }
        };
    }
})(angular);