(function (angular) {
    angular.module('main').controller('registerCtrl', registerCtrl);
    registerCtrl.$inject = ['$http'];

    function registerCtrl($http) {
        var vm = this;

        vm.name = '';
        vm.username = '';
        vm.password_one = '';
        vm.password_two = '';

        //function that will verify the registration process
        vm.register = function() {
            vm.errorMessage = "";
            vm.password_two_error = "";
            
            if (vm.password_one !== vm.password_two) {
                vm.password_two_error = "Both passwords must match.";
            }
            
            if (!vm.username || !vm.password_one || !vm.password_two || !vm.name){
                vm.errorMessage = "All fields are required.";
            }
            
            if (!vm.password_two_error && !vm.errorMessage) {
                $http({
                    method: 'POST',
                    url: '/api/register',
                    data: {
                        name: vm.name,
                        username: vm.username,
                        password: vm.password_one
                    }
                }).then(function success(response) {
                    if (response.data.error === undefined) {
                        window.location = "/authenticated/";
                    } else {
                        console.log(response.data.error);
                        vm.submitted = true;
                      }
                }).catch(function error(response) {
                    if (response.status !== 200) {
                        vm.errorMessage = response.data.error;
                    }
                });
            }
        }
    }
})(angular);
