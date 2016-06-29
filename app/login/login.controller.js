(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state', '$http', '$q'];
    function LoginController($state, $http, $q) {
        var vm = this;
        vm.$state = $state;
        activate();
        vm.submit = submit;
        vm.isConnected = isConnected;
        vm.disconnect = disconnect;
        vm.isDev ;


        ////////////////
        function activate() {
            if (!window.localStorage.getItem('isConnected')) {
                vm.$state.go('login');
            }
            setIsDev();

        }

        function isConnected() {
            return window.localStorage.getItem('isConnected')
        }

        function submit() {
            if (vm.signin.email && vm.signin.password) {
                validateSignIn();
            }
        }

        function disconnect() {
            window.localStorage.removeItem('isConnected');
            window.localStorage.removeItem('ID');
            window.localStorage.removeItem('username');
            window.localStorage.removeItem('roleID');
            window.localStorage.removeItem('firstname');
            window.localStorage.removeItem('lastname');
        }

        function getSavedLogin() {
            if (window.localStorage.getItem('email') && window.localStorage.getItem('password')) {
                vm.signin.email = window.localStorage.getItem('email');
                vm.signin.password = window.localStorage.getItem('password');
                vm.signin.rememberMe = true;
            }
        }

        function rememberMe() {
            if (vm.signin.rememberMe == true) {
                window.localStorage.setItem('email', vm.signin.email);
                window.localStorage.setItem('password', vm.signin.password);
            }
        }

        function setIsDev(){
            $http.get('http://localhost/roles')
                .then(function(response){
                    response.data.forEach(function(item){
                        if(item.slug=="developer"){
                            if(window.localStorage.getItem('roleID')==item._id){
                                vm.isDev= true;
                            } else {
                                vm.isDev= false;
                            }
                        } else {
                            vm.isDev= false;
                        }
                    })
                    
                })
                .catch(function(error){
                    console.log(error);
                })
        }

        function validateSignIn() {
            rememberMe();
            let user = {
                username: vm.signin.email,
                password: vm.signin.password
            }
            $http.post('http://localhost/authentication', user)
                .then(function (res) {
                    let data = {};
                    // console.log(res);

                    if (res.data.developer == null) {
                        data = res.data.productOwner.user;
                        window.localStorage.setItem('2ID',res.data.productOwner._id)
                    } else {
                        data = res.data.developer.user;
                        window.localStorage.setItem('2ID',res.data.developer._id)
                    }
                    window.localStorage.setItem('isConnected', true);
                    window.localStorage.setItem('ID', data._id);
                    window.localStorage.setItem('username', data.username);
                    window.localStorage.setItem('firstname', data.firstName);
                    window.localStorage.setItem('lastname', data.lastName);
                    window.localStorage.setItem('roleID', data.role);
                    
                    $state.go('allTickets');

                })
                .catch(function (error) {
                    console.log(error);
                });

        }
    }
})();