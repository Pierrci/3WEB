

(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$state', '$http', '$q'];
    function HomeController($state, $http, $q) {
        var vm = this;    
        vm.$state = $state;    
        activate();


        ////////////////

        function activate() {
            if (!window.localStorage.getItem('isConnected')) {
                vm.$state.go('login');
            }
        }

    }
})();