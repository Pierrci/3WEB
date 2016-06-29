(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('NewTicketsController', NewTicketsController);

    NewTicketsController.$inject = ['$state', '$http', '$q'];
    function NewTicketsController($state, $http, $q) {
        var vm = this;
        vm.$state = $state;
        activate();
        vm.isConnected = isConnected;
        vm.newTickets = [];

        vm.isListEmpty = isListEmpty;

        ////////////////

        function activate() {
            if (!isConnected()) {
                vm.$state.go('login');
            }
            getNewTickets();
        }

        function isConnected(){
            if(window.localStorage.getItem('isConnected')){
                return true;
            } else {
                return false;
            }
        }

        function isListEmpty(){
            if(vm.newTickets && vm.newTickets.length>0){
                return false;
            } else {
               return true;
            }
        }

        function getNewTickets(){
            $http.get('http://localhost/tickets')
                .then(function(response){
                    vm.newTickets = [];
                    response.data.forEach(function(item){
                        if (item.status=='new'){
                            vm.newTickets.push(item);
                        }
                    })
                })
                .catch(function(error){
                    console.log(error);
                })
        }



     

       

    }
})();