(function () {
    'use strict';

    angular
        .module('app.login')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = [
        'loginService',
        'localStorageService',
        '$state'
    ];

    function LoginCtrl(loginService, localStorageService, $state) {
        var vm = this;

        vm.error ='';
        vm.login = login;

        function login() {
            loginService.login(vm.user).then(function (data) {
                if(data.token){
                    // console.log(data.token);
                    localStorageService.set('userToken', data.token);
                    $state.go('main.experience');
                } else if (data.error) {
                    vm.error = data.error;
                    vm.user = {};
                    vm.loginForm.$setPristine();
                    vm.loginForm.$setUntouched();
                    vm.loginForm.$submitted = false;
                }
            });
        }
    }
})();
