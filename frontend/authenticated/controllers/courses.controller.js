(function (angular) {
    angular.module('main').controller('coursesCtrl', coursesCtrl);
    coursesCtrl.$inject = ['$http'];

    function coursesCtrl($http) {
        var vm = this;
        vm.getAccountType = getAccountType;
        vm.getAllCourses = getAllCourses;
        vm.getMyCourses  = getMyCourses;
        vm.$onInit = onInit;

        vm.userType = "student";
        vm.myCourses = [];

        function onInit() {
            getAccountType();
            getMyCourses();
        }

        function createCourse() {

        }

        function deleteCourse() {

        }

        function joinCourse() {

        }

        function leaveCourse() {

        }

        function getAccountType() {
            $http({
                method: 'GET',
                url: '/api/getAccountType',
                data: {}
            }).then(function(response) {
                vm.userType = response.data.type;
            }, function(error) {})
        }

        function getAllCourses() {
            $http({
                method: 'GET',
                url: '/api/getAllCourses',
                data: {}
            }).then(function(response) {
                vm.courses = response.data.courses;
            }, function(error) {});
        }

        function getMyCourses() {
            $http({
                method: 'GET',
                url: '/api/getMyCourses',
                data: {}
            }).then(function(response) {
                vm.myCourses = response.data.courses;
            }, function(error) {});
        }
    }
})(angular);
