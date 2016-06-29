(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('EditTicketController', EditTicketController);

    EditTicketController.$inject = ['$state', '$http', '$q'];
    function EditTicketController($state, $http, $q) {
        var vm = this;
        vm.$state = $state;
        activate();
        vm.isConnected = isConnected;
        vm.ticketDetail = {};
        vm.userID = window.localStorage.getItem('ID');

        vm.ticketID = $state.params.id;

        ////////////////

        function activate() {
            if (!isConnected()) {
                vm.$state.go('login');
            }
        }

        function isConnected() {
            if (window.localStorage.getItem('isConnected')) {
                return true;
            } else {
                return false;
            }
        }

        function getDetail() {
            $http.get('http://localhost/tickets/' + vm.ticketID)
                .then(function (response) {
                    vm.ticketDetail = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function editTicket() {
            let mypatch = [
                { "op": "replace", "path": "/priority", "value": vm.ticketDetail.priority },
                { "op": "replace", "path": "/status", "value": vm.ticketDetail.status },
                { "op": "replace", "path": "/description", "value": vm.ticketDetail.description },
                { "op": "replace", "path": "/summary", "value": vm.ticketDetail.summary }
            ];

            var req = new XMLHttpRequest();
            req.open('PATCH', 'http://localhost/tickets/' + vm.ticketID, false);
            req.send(JSON.stringify(mypatch));
            if (req.status == 200) {
                var responseText = JSON.parse(req.responseText);
                $state.go('myTickets');
            };
        }






    }
})();