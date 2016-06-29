(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('AddTicketsController', AddTicketsController);

    AddTicketsController.$inject = ['$state', '$http', '$q'];
    function AddTicketsController($state, $http, $q) {
        var vm = this;
        vm.$state = $state;
        activate();
        vm.isConnected = isConnected;        
         vm.ticketDetail = {};
        vm.userID = window.localStorage.getItem('ID');
        vm.createTicket = createTicket;

        ////////////////

        function activate() {
            if (!isConnected()) {
                vm.$state.go('login');
            }
        }

        function isConnected(){
            if(window.localStorage.getItem('isConnected')){
                return true;
            } else {
                return false;
            }
        }

        function createTicket(){
            let ticket = {
                summary : vm.ticketDetail.summary,
                description : vm.ticketDetail.description,
                priority: vm.ticketDetail.priority,
                status : 'new',
                productOwner_id: vm.userID
            }
            $http.post('http://localhost/tickets',ticket)
                .then(function(response){
                    // console.log(response);
                    $state.go('allTickets');
                })
                .catch(function(error){
                    console.log(error);
                })
        }
     

       

    }
})();