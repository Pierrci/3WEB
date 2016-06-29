(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('DetailController', DetailController);

    DetailController.$inject = ['$state', '$http', '$q'];
    function DetailController($state, $http, $q) {
        var vm = this;
        vm.$state = $state;
        vm.isConnected = isConnected;
        vm.ticketDetail = {};
        vm.ticketID = $state.params.id
        vm.roleID = window.localStorage.getItem('roleID');
        vm.authorID = window.localStorage.getItem('ID');
        vm.commentaire = "";
        vm.showStart = showStart;
        vm.showStop = showStop;
        vm.createComment = createComment;
        vm.comments = [];
        var rolePO;
        var roleDev;
        vm.startWorking = startWorking;
        vm.stopWorking = stopWorking;
        activate();
        ////////////////

        function activate() {
            if (!isConnected()) {
                vm.$state.go('login');
            }
            getRoles();
            getDetail();
            getComments();
        }


        function getRoles() {
            $http.get('http://localhost/roles')
                .then(function (response) {
                    response.data.forEach(function (item) {
                        if (item.slug == "productOwner") {
                            rolePO = item._id;
                        }
                        if (item.slug == "developer") {
                            roleDev = item._id;
                        }
                    });
                })
                .catch(function(error){
                    console.log(error);
                })
        }

        function showStart() {
            if (vm.ticketDetail.status == 'new') {
                if (vm.roleID == roleDev) {
                    
                    return true;
                } else {
                    console.log(vm.roleID);
                    console.log(roleDev);
                    return false;
                }
            } else {
                console.log('4');
                return false;
            }
        }

        function showStop() {
            if (vm.ticketDetail.status == 'IN_PROGRESS') {
                if (vm.ticketDetail.developer == author_id) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
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
            console.log(vm.ticketID);
            $http.get('http://localhost/tickets/' + vm.ticketID)
                .then(function (response) {
                    vm.ticketDetail = response.data;
                    console.log(vm.ticketDetail);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function startWorking() {
            let mypatch = [
                { "op": "replace", "path": "/developer", "value": vm.authorID },
                { "op": "replace", "path": "/status", "value": 'IN_PROGRESS' },
            ];

            var req = new XMLHttpRequest();
            req.open('PATCH', 'http://localhost/tickets/' + vm.ticketID, false);
            req.send(JSON.stringify(mypatch));
            if (req.status == 200) {
                var responseText = JSON.parse(req.responseText);
                $state.go('myTickets');
            };
        }

        function stopWorking() {
            let mypatch = [
                { "op": "replace", "path": "/status", "value": 'FINISHED' },
            ];

            var req = new XMLHttpRequest();
            req.open('PATCH', 'http://localhost/tickets/' + vm.ticketID, false);
            req.send(JSON.stringify(mypatch));
            if (req.status == 200) {
                var responseText = JSON.parse(req.responseText);
                $state.go('allTickets');
            };
        }

        function getComments() {
            console.log('ouais');
            $http.get('http://localhost/tickets/' + vm.ticketID + '/comments')
                .then(function (response) {
                    vm.comments = response.data;
                    console.log(vm.comments);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function createComment() {
            let send = {
                content: vm.newComment,
                author_id: vm.authorID
            }
            console.log(send);
            $http.post("http://localhost/tickets/" + vm.ticketID + "/comments", send)
                .then(function (response) {
                    vm.comments.push(response.data);
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

        function deleteTicket() {
            $http.delete("http://localhost/tickets/" + vm.ticketID)
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }













    }
})();