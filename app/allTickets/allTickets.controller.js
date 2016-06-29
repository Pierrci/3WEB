(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('AllTicketsController', AllTicketsController);

    AllTicketsController.$inject = ['$state', '$http', '$q'];
    function AllTicketsController($state, $http, $q) {
        var vm = this;
        vm.$state = $state;
        activate();
        vm.isConnected = isConnected;
        vm.allTickets = [];

        vm.isListEmpty = isListEmpty;

        ////////////////

        function activate() {
            if (!isConnected()) {
                vm.$state.go('login');
            }
            getAllTickets();
        }

        function isConnected(){
            if(window.localStorage.getItem('isConnected')){
                return true;
            } else {
                return false;
            }
        }

        function isListEmpty(){
            if(vm.allTickets && vm.allTickets.length>0){
                return false;
            } else {
               return true;
            }
        }

        function getAllTickets(){
            $http.get('http://localhost/tickets')
                .then(function(response){
                    vm.allTickets=response.data;
                    // console.log(vm.allTickets);
                })
                .catch(function(error){
                    console.log(error);
                })
        }

     

       

    }
})();