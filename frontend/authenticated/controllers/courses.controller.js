(function (angular) {
    angular.module('main').controller('coursesCtrl', coursesCtrl);
    coursesCtrl.$inject = ['$http', 'cfpLoadingBar'];

    function coursesCtrl($http, cfpLoadingBar) {
        var vm = this;
        vm.enableCourseRegistration = enableCourseRegistration;
        vm.disableCourseRegistration = disableCourseRegistration;
        vm.enableCourseCreator = enableCourseCreator;
        vm.disableCourseCreator = disableCourseCreator;
        vm.createCourse = createCourse;
        vm.removeCourse = removeCourse;
        vm.deleteCourse = deleteCourse;
        vm.joinCourse = joinCourse;
        vm.leaveCourse = leaveCourse;
        vm.getAccountType = getAccountType;
        vm.getAllCourses = getAllCourses;
        vm.getMyCourses  = getMyCourses;
        vm.registered = registered;
        vm.$onInit = onInit;

        vm.userType = "student";
        vm.courses = [];
        vm.myCourses = [];
        vm.makingRequest = false;
        vm.loading = true;
        vm.showCourseCreator = false;
        vm.showCourseRegistration = false;

        function onInit() {
            getAccountType();
            vm.makingRequest = false;
            getMyCourses().then(function() {
                vm.loading = false;
            });
        }

        function enableCourseRegistration() {
            vm.getAllCourses().then(function() {
                vm.showCourseRegistration = true;
            });
        }

        function disableCourseRegistration() {
            vm.showCourseRegistration = false;
        }

        function enableCourseCreator() {
            vm.showCourseCreator = true;
        }

        function disableCourseCreator() {
            vm.showCourseCreator = false;
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
                    cfpLoadingBar.complete();
                    vm.makingRequest = false;
                })
            }
        }

        function removeCourse(courseId) {
            if (vm.userType === 'teacher') {
                vm.deleteCourse(courseId);
            } else if (vm.userType === 'student') {
                vm.leaveCourse(courseId);
            }
        }

        function deleteCourse(courseId) {
            if (!vm.makingRequest) {
                vm.makingRequest = true;
                cfpLoadingBar.start();

                return $http({
                    method: 'POST',
                    url: '/api/deleteCourse',
                    data: {
                        courseId: courseId
                    }
                }).then(function(response) {
                    vm.myCourses = response.data.courses;
                    cfpLoadingBar.complete();
                    vm.makingRequest = false;
                }, function(error) {
                    cfpLoadingBar.complete();
                    vm.makingRequest = false;
                });
            }
        }

        function leaveCourse(courseId) {
            if (!vm.makingRequest) {
                vm.makingRequest = true;
                cfpLoadingBar.start();

                return $http({
                    method: 'POST',
                    url: '/api/leaveCourse',
                    data: {
                        courseId: courseId
                    }
                }).then(function(response) {
                    vm.myCourses = response.data.courses;
                    cfpLoadingBar.complete();
                    vm.makingRequest = false;
                    vm.getAllCourses();
                }, function(error) {
                    cfpLoadingBar.complete();
                    vm.makingRequest = false;
                });
            }
        }

        function joinCourse(courseId) {
            if (!vm.makingRequest) {
                vm.makingRequest = true;
                cfpLoadingBar.start();

                return $http({
                    method: 'POST',
                    url: '/api/joinCourse',
                    data: {
                        courseId: courseId
                    }
                }).then(function(response) {
                    vm.myCourses = response.data.courses;
                    cfpLoadingBar.complete();
                    vm.makingRequest = false;
                    vm.getAllCourses();
                }, function(error) {
                    cfpLoadingBar.complete();
                    vm.makingRequest = false;
                });
            }
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
                    cfpLoadingBar.complete();
                    vm.makingRequest = false;
                }, function(error) {
                    cfpLoadingBar.complete();
                    vm.makingRequest = false;
                });
            }
        }

        function registered(courseId) {
            var registered = false;

            for (var courseIndex = 0; courseIndex < vm.myCourses.length; courseIndex++) {
                if (vm.myCourses[courseIndex]._id == courseId) {
                    registered = true;
                }
            }

            return registered;
        }
    }
})(angular);
