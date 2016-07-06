(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('ReadMeController', ReadMeController);

    ReadMeController.$inject = ['$state', '$http', '$q'];
    function ReadMeController($state, $http, $q) {
        var vm = this;
        vm.$state = $state;
        
        vm.roles = [];
        vm.users = [];    
        vm.showUsers = false;

        vm.createRoles = createRoles;
        vm.createUsers = createUsers;

        activate();
        ////////////////

        function activate() {        
          var storageUsers = JSON.parse(window.localStorage.getItem('usersdemo'));
            if (storageUsers) {
                vm.users = storageUsers;
            }
          
            if(vm.users.length){
                vm.showUsers = true;
            }
        }

        function createRoles(){
            let roles = [
                {
                    name : 'productOwner',
                    slug : 'productOwner'
                },
                {
                    name : 'developer',
                    slug : 'developer'
                }
            ];
            roles.forEach(function(item){
                $http.post('http://localhost/roles',item)
                    .then(function(response){
                        vm.roles.push(response.data);
                    })
                    .catch(function(error){
                        console.log(error);
                    })

            });
            
        }


        function createUsers(){
            let productOwner = {
                username : 'Ludo',
                password : 'Supinfo31*',
                first_name : 'Ludovic',
                last_name : 'Stmnt',
                email : 'ludo@connit.fr'
            }

            let developer = {
                username : 'Pierrci',
                password : 'Toulouse31!',
                first_name : 'Pierric',
                last_name : 'Cistac',
                email : 'pierric@connit.fr'
            }        

            $http.post('http://localhost/roles/'+vm.roles[0]._id+'/productOwners',productOwner)
                .then(function(response){
                    vm.users.push(response.data);                    
                    $http.post('http://localhost/roles/'+vm.roles[1]._id+'/developers',developer)
                        .then(function(res){
                            vm.users.push(res.data);
                            window.localStorage.setItem('usersdemo',JSON.stringify(vm.users));
                            console.log(vm.users);
                            vm.showUsers = true;
                        })
                })
        }


    }
})();