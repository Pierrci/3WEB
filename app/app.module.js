(function () {
    'use strict'

    angular
        .module('myApp', ['ui.router'])
        .config(function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/readMe');

            $stateProvider


                .state('login', {
                    url: '/login',
                    templateUrl: '/app/login/login.html',
                    controller: 'LoginController',
                    controllerAs: 'login'
                })

                .state('home', {
                    url: '/home',
                    templateUrl: 'app/home/home.html',
                    controller: 'HomeController',
                    controllerAs: 'home'
                })

                .state('newTickets', {
                    url: '/newTickets',
                    templateUrl: 'app/newTickets/newTickets.html',
                    controller: 'NewTicketsController',
                    controllerAs: 'newT'
                })

                .state('readMe', {
                    url: '/readMe',
                    templateUrl: 'app/readMe/readMe.html',
                    controller: 'ReadMeController',
                    controllerAs: 'readme'
                })

                .state('addTicket', {
                    url: '/addTickets',
                    templateUrl: 'app/addTicket/addTicket.html',
                    controller: 'AddTicketsController',
                    controllerAs: 'addT'
                })

                .state('editTicket', {
                    url: '/editTicket/:id',
                    templateUrl: 'app/editTicket/editTicket.html',
                    controller: 'EditTicketController',
                    controllerAs: 'edit'
                })

                .state('myTickets', {
                    url: '/myTickets',
                    templateUrl: 'app/myTickets/myTickets.html',
                    controller: 'MyTicketsController',
                    controllerAs: 'myT'
                })

                .state('allTickets', {
                    url: '/allTickets',
                    templateUrl: 'app/allTickets/allTickets.html',
                    controller: 'AllTicketsController',
                    controllerAs: 'allT'
                })

                .state('detail', {
                    url: '/detail/:id',
                    templateUrl: 'app/detail/detail.html',
                    controller: 'DetailController',
                    controllerAs: 'detail'
                });

                // .state('about', {
                //     templateUrl: '/app/about/about.html',
                //     url: '/about'
                // });





        });
})()