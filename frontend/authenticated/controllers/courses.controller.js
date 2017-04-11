(function (angular) {
    angular.module('main').controller('coursesCtrl', coursesCtrl);
    coursesCtrl.$inject = ['$http', 'cfpLoadingBar'];

    function coursesCtrl($http, cfpLoadingBar) {
        var vm = this;
        vm.enableCourseCreator = enableCourseCreator;
        vm.createCourse = createCourse;
        vm.getAccountType = getAccountType;
        vm.getAllCourses = getAllCourses;
        vm.getMyCourses  = getMyCourses;
        vm.$onInit = onInit;

        vm.userType = "student";
        vm.myCourses = [];
        vm.makingRequest = false;
        vm.loading = true;
        vm.showCourseCreator = false;

        function onInit() {
            getAccountType();
            vm.makingRequest = false;
            getMyCourses().then(function() {
                vm.loading = false;
            });
        }

        function enableCourseCreator() {
            vm.showCourseCreator = true;
        }

        function createCourse() {
            if (!vm.makingRequest) {
                vm.makingRequest = true;
                cfpLoadingBar.start();

                return $http({
                    method: 'POST',
                    url: '/api/createCourse',
                    data: {
                        name: vm.courseName,
                        shortName: vm.courseShortName
                    }
                }).then(function(response) {
                    vm.myCourses = response.data.courses;
                    vm.showCourseCreator = false;
                    cfpLoadingBar.complete();
                    vm.makingRequest = false;
                }, function(error) {
                    console.log(error);
                    cfpLoadingBar.complete();
                    vm.makingRequest = false;
                })
            }
        }

        function deleteCourse() {

        }

        function joinCourse() {

        }

        function leaveCourse() {

        }

        function getAccountType() {
            if (!vm.makingRequest) {
                vm.makingRequest = true;
                cfpLoadingBar.start();

                return $http({
                    method: 'GET',
                    url: '/api/getAccountType',
                    data: {}
                }).then(function(response) {
                    vm.userType = response.data.type;
                    cfpLoadingBar.complete();
                    vm.makingRequest = false;
                }, function(error) {
                    cfpLoadingBar.complete();
                    vm.makingRequest = false;
                });
            }
        }

        function getAllCourses() {
            if (!vm.makingRequest) {
                vm.makingRequest = true;
                cfpLoadingBar.start();

                return $http({
                    method: 'GET',
                    url: '/api/getAllCourses',
                    data: {}
                }).then(function(response) {
                    vm.courses = response.data.courses;
                    cfpLoadingBar.complete();
                    vm.makingRequest = false;
                }, function(error) {
                    cfpLoadingBar.complete();
                    vm.makingRequest = false;
                });
            }
        }

        function getMyCourses() {
            if (!vm.makingRequest) {
                vm.makingRequest = true;
                cfpLoadingBar.start();

                return $http({
                    method: 'GET',
                    url: '/api/getMyCourses',
                    data: {}
                }).then(function(response) {
                    vm.myCourses = response.data.courses;
                    console.log(vm.myCourses);
                    cfpLoadingBar.complete();
                    vm.makingRequest = false;
                }, function(error) {
                    cfpLoadingBar.complete();
                    vm.makingRequest = false;
                });
            }
        }
    }
})(angular);
