(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('MyTicketsController', MyTicketsController);

    MyTicketsController.$inject = ['$state', '$http', '$q'];
    function MyTicketsController($state, $http, $q) {
        var vm = this;
        vm.$state = $state;
        activate();
        vm.isConnected = isConnected;
        vm.allTickets = [];
        vm.show = show;
        var roleDev = {};
        var rolePO = {};
        var role = window.localStorage.getItem('roleID');
        var idDev = window.localStorage.getItem('2ID');
        vm.isListEmpty = isListEmpty;

        ////////////////

        function activate() {
            if (!isConnected()) {
                vm.$state.go('login');
            }
            getAllRoles();
        }

        function isConnected() {
            if (window.localStorage.getItem('isConnected')) {
                return true;
            } else {
                return false;
            }
        }

        function getAllRoles() {
            $http.get('http://localhost/roles')
                .then(function (response) {  
                    // console.log(response);                  
                    response.data.forEach(function (item) {
                        if (item.slug == "productOwner") {
                            rolePO = item._id;
                        }
                        if (item.slug == "developer") {
                            roleDev + item._id;
                        }
                    });
                    getTickets();
                    
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

        function isListEmpty() {
            if (vm.allTickets && vm.allTickets.length > 0) {
                return false;
            } else {
                return true;
            }
        }

        function getTickets() {
            if (role == roleDev) {
                getMyTicketsDev();
            } else if (role == rolePO) {
                getMyTicketsPo();
            }
        }

        function show(id) {
            $state.go('detail/' + id);
        }

        function getMyTicketsDev() {
            $http.get('http://localhost/roles/' + role + '/developer/' + idDev + '/tickets')
                .then(function (response) {
                    vm.allTickets = response.data;
                    vm.allTickets.foreach(function (item) {
                        $http.get('http://localhost/' + role + '/developers/' + item.developer.id)
                            .then(function (res) {
                                item.author.firstname = res.firstname;
                                item.author.lastname = res.lastname;
                            })
                    })
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function getMyTicketsPo() {
            $http.get('http://localhost/roles/' + role + '/productOwner/' + idDev + '/tickets')
                .then(function (response) {
                    vm.allTickets = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }




    }
})();