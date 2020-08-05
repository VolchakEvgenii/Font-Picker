(function () {
    'use strict';

    angular
        .module('app.main', [])
        .config(mainConfig);

    mainConfig.$inject = [
        '$stateProvider'
    ];

    function mainConfig($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                abstract: true,
                templateUrl: 'components/main/main.template.html',
                controller: 'MainController as vm'
            });
    }
})();

(function () {
    'use strict';

    angular
        .module('app.main')
        .controller('MainController', MainController);

    MainController.$inject = [
        '$mdSidenav'
    ];

    function MainController($mdSidenav) {
        var vm = this;

        vm.toggleSidenav = toggleSidenav;

        function toggleSidenav(menuId) {
            $mdSidenav(menuId).toggle();
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.constructor', [])
        .config(constructorConfig);

    constructorConfig.$inject = [
        '$stateProvider'
    ];

    function constructorConfig($stateProvider) {
        $stateProvider
            .state('main.constructor', {
                url: 'constructor',
                views: {
                    'main': {
                        templateUrl: 'components/main/constructor/constructor.template.html',
                        controller: 'ConstructorController as vm'
                    }
                },
            });
    }
})();

(function () {
    'use strict';

    angular
        .module('app.constructor')
        .controller('ConstructorController', ConstructorController);

    ConstructorController.$inject = ['$mdDialog', '$scope', 'apiService'];

    function ConstructorController($mdDialog, $scope, apiService) {
        var vm = this;

        vm.fontList = [];
        vm.fontModel = {};
        vm.fontStyle = '';
        vm.tinymceOptions = {
            plugins: 'link image code',
            toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
        };
        vm.openTextEditDialog = openTextEditDialog;
        vm.dialogSave = dialogSave;
        vm.dialogClose = dialogClose;
        vm.dialogClose = dialogClose;
        vm.onChangedFont = onChangedFont;

        vm.originHtml = '<div class="page" title="Page 1">\n' +
            '<div class="section">\n' +
            '<div class="layoutArea">\n' +
            '<div class="column">\n' +
            '<p><span style="font-size: 10.000000pt;">Lorem Ipsum<br /> Where does it come from? </span></p>\n' +
            '<p><span style="font-size: 10.000000pt;">Lorem Ipsum is simply dummy text of the printing and typesetting industry.' +
            ' Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley' +
            ' of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into' +
            ' electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets' +
            ' containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </span></p>\n' +
            '</div>\n' +
            '</div>\n' +
            '</div>\n' +
            '</div>';

        onInit();

        function onInit() {
            getFont();
            copyOriginText();
        }

        function getFont() {
            apiService.fontsGET().then(function (res) {
                vm.fontList = res.data.items;
            });
        }

        function onChangedFont() {
            var link = document.createElement("link");

            link.setAttribute("rel", "stylesheet");
            link.setAttribute("type", "text/css");
            link.setAttribute("href", "https://fonts.googleapis.com/css?family=" + vm.fontModel.family);

            document.getElementsByTagName("head")[0].appendChild(link);

            vm.fontStyle = 'font-family: ' + vm.fontModel.family + '; url(' + vm.fontModel.files.regular + ') format(\'truetype\')';
        }

        function openTextEditDialog() {
            copyOriginText();

            $mdDialog.show({
                scope: $scope,
                templateUrl: 'components/_global/templates/text-edit.dialog.html',
                preserveScope: true,
                bindToController: true,
                escapeToClose: true,
                fullscreen: true
            });
        }

        function saveTextToOrigin() {
            vm.originHtml = vm.tinymceHtml;
        }

        function copyOriginText() {
            vm.tinymceHtml = vm.originHtml;
        }

        function dialogSave() {
            saveTextToOrigin();

            vm.dialogClose();
        }

        function dialogClose() {
            $mdDialog.hide();
        }
    }
})();




(function () {
    'use strict';

    angular
        .module('app.about', [])
        .config(aboutConfig);

    aboutConfig.$inject = [
        '$stateProvider'
    ];

    function aboutConfig($stateProvider) {
        $stateProvider
            .state('main.about', {
                url: 'about',
                views: {
                    'main': {
                        templateUrl: 'components/main/about/about.template.html',
                        controller: 'AboutController as vm'
                    }
                }
            });
    }
})();

(function () {
    'use strict';

    angular
        .module('app.about')
        .controller('AboutController', AboutController);

    AboutController.$inject = [];

    function AboutController() {}
})();




(function () {
    'use strict';

    angular
        .module('app.login', [])
        .config(loginConfig);

    loginConfig.$inject = [
        '$stateProvider'
    ];
    function loginConfig($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'components/login/login.html',
                controller: 'LoginCtrl as vm'
            });
    }
})();

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

(function () {
    'use strict';

    angular
        .module('app', [
            'app.config',
            'app.login',
            'app.main',
            'app.constructor',
            'app.about'
        ])
        .run(bootstrap);

    bootstrap.$inject = [
        '$location'
    ];

    function bootstrap($location) {
        $location.path('/constructor');
    }
})();

(function () {
    'use strict';

    angular
        .module('app.config', [
            'ngMaterial',
            'restangular',
            'ui.router',
            'LocalStorageModule',
            'ngMessages',
            'ui.tinymce',
            'ngSanitize'
        ])
        .config(appConfig)
        .constant('keys', {
            googleFonts: 'AIzaSyD5XbiYbY4uGqrGbNh819SgtO0vPH0Yq4o'
        })
        .constant('api', {
            url: 'https://reqres.in/'
        })
        .run(runAppConfig);

    appConfig.$inject = [
        '$mdThemingProvider',
        'localStorageServiceProvider',
        '$locationProvider'
    ];

    function appConfig($mdThemingProvider, localStorageServiceProvider, $locationProvider) {
        $locationProvider.hashPrefix('');

        localStorageServiceProvider.setPrefix('font-picker');

        $mdThemingProvider.definePalette('font-picker', {
            '50': 'f5fae9',
            '100': 'e7f2c7',
            '200': 'd7eaa2',
            '300': 'c6e27c',
            '400': 'badb60',
            '500': 'aed544',
            '600': 'a7d03e',
            '700': '9dca35',
            '800': '94c42d',
            '900': '84ba1f',
            'A100': 'fafff2',
            'A200': 'e7ffbf',
            'A400': 'd4ff8c',
            'A700': 'cbff73',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
                '50',
                '100',
                '200',
                '300',
                '400',
                '500',
                '600',
                '700',
                '800',
                '900',
                'A100',
                'A200',
                'A400',
                'A700'
            ],
            'contrastLightColors': []
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('font-picker')
            .accentPalette('brown');
    }

    function runAppConfig(Restangular, api) {
        Restangular.setBaseUrl(api.url);
    }
})();

(function () {
    'use strict';

    angular
        .module('app.config')
        .factory('loginService', loginService);
    loginService.$inject = ['Restangular'];

    function loginService(Restangular) {
        return {
            api: Restangular.service('api'),
            login: function (options) {
                return this.api.one('login').customPOST(options).then(function (data) {
                    return data;
                }, function (error) {
                    return error.data;
                });
            }
        };
    }
})();

(function () {
    'use strict';

    angular
        .module('app.config')
        .factory('apiService', apiService);
    apiService.$inject = ['Restangular', '$http'];

    function apiService(Restangular, $http) {
        return {
            api: Restangular.service('api'),

            fontsGET: function () {
                return $http({
                    method: 'GET',
                    url: 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyD5XbiYbY4uGqrGbNh819SgtO0vPH0Yq4o'
                }).then(
                    function success(data) {
                        return data;
                    },
                    function error(error) {
                        return error;
                    }
                );
            },
        };
    }
})();

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/_global/_global.footer.html',
    '');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/_global/_global.header.html',
    '<head><meta charset="utf-8"><meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"><meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width"><title>Font Picker</title><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous"><script src="https://kit.fontawesome.com/bf6f317d24.js"></script><script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script><link rel="stylesheet" href="styles.css"></head>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/login/login.html',
    '<div class="login-wrapper layout-column layout-align-center-center"><md-card><md-card-title><md-card-title-text class="layout-align-center-center"><h4 class="md-title">Login</h4></md-card-title-text></md-card-title><md-card-content><form name="vm.loginForm" role="form" novalidate="" ng-submit="vm.login(user)" class="layout-column"><md-input-container ng-class="{ \'md-input-invalid\' : vm.loginForm.username.$invalid &amp;&amp; !vm.loginForm.username.$pristine }"><label>Email</label> <input type="email" required="" ng-model="vm.user.email" name="email" ng-minlength="10" ng-maxlength="100"><div ng-messages="vm.loginForm.email.$error" ng-if="vm.loginForm.email.$dirty || vm.loginForm.email.$touched" class="error-container"><div ng-message="required" class="error">Email field is required</div><div ng-message="email" class="error">The email you entered is not valid</div><div ng-message="minlength" class="error">Your email is too short.</div></div></md-input-container><md-input-container ng-class="{ \'md-input-invalid\' : vm.loginForm.password.$invalid &amp;&amp; !vm.loginForm.password.$pristine }"><label>Password</label> <input type="password" required="" ng-model="vm.user.password" name="password" ng-minlength="6" ng-maxlength="20"><div ng-messages="vm.loginForm.password.$error" ng-if="vm.loginForm.password.$dirty || vm.loginForm.password.$touched" class="error-container"><div ng-message="required" class="error">Password field is required</div><div ng-message="minlength" class="error">Your password must be between 6 and 20 characters long.</div><div ng-message="maxlength" class="error">Your password must be between 6 and 20 characters long.</div></div></md-input-container><label ng-if="vm.error &amp;&amp; !vm.loginForm.$dirty" class="error">{{vm.error}}</label><md-button type="submit" ng-disabled="!vm.loginForm.$valid" class="md-raised md-primary">Login</md-button></form></md-card-content></md-card></div>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/main/main.template.html',
    '<md-sidenav md-component-id="mainLeft" class="main-sidenav md-whiteframe-z2"><md-list><md-list-item class="layout-row layout-align-start-center"><md-button aria-label="Constructor" ui-sref="main.constructor" ui-sref-active="md-active" ng-click="vm.toggleSidenav(\'mainLeft\')" class="flex">Constructor</md-button></md-list-item><md-list-item class="layout-row layout-align-start-center"><md-button aria-label="About" ui-sref="main.about" ui-sref-active="md-active" ng-click="vm.toggleSidenav(\'mainLeft\')" class="flex">About</md-button></md-list-item></md-list></md-sidenav><md-toolbar class="main-toolbar"><div class="md-toolbar-tools layout-row hide-gt-sm"><md-button aria-label="open menu" ng-click="vm.toggleSidenav(\'mainLeft\')" class="md-raised flex-20"><i aria-hidden="true" class="fa fa-bars"></i></md-button><div class="flex-60"></div><a ui-sref="main.constructor" class="logo layout-row layout-align-center-center"><span>Font Picker</span></a></div><div class="md-toolbar-tools flex-gt-sm-80 flex-offset-gt-sm-10 hide-sm hide-xs"><a ui-sref="main.constructor" class="logo layout-row layout-align-center-center"><span>Font Picker</span></a><md-nav-bar nav-bar-aria-label="navigation links" md-no-ink-bar="true" class="flex"><md-nav-item md-nav-sref="main.constructor" name="constructor" ui-sref-active="md-active">Constructor</md-nav-item><md-nav-item md-nav-sref="main.about" name="about" ui-sref-active="md-active">about</md-nav-item></md-nav-bar></div></md-toolbar><md-content class="main-content flex"><div ui-view="main" class="flex-gt-sm-80 flex-offset-gt-sm-10 md-padding"></div></md-content><footer class="main-footer"><p>If you have any questions, pleas contact me.</p><div class="layout-row layout-align-space-around-center"><a aria-label="skype" href="skype:volchak_jeka?chat" class="social-btn"><i aria-hidden="true" class="fab fa-skype"></i><span class="hide-sm hide-xs">volchak_jeka</span></a><a aria-label="skype" href="https://t.me/EugeneVol" target="_blank" class="social-btn"><i aria-hidden="true" class="fab fa-telegram-plane"></i><span class="hide-sm hide-xs">EugeneVol</span></a><a aria-label="phone" href="tel:+380932251761" class="social-btn"><i aria-hidden="true" class="fas fa-phone"></i><span class="hide-sm hide-xs">+380932251761</span></a><a aria-label="email" href="mailto:evgeniy.volchak@gmail.com" class="social-btn"><i aria-hidden="true" class="fas fa-envelope"></i><span class="hide-sm hide-xs">evgeniy.volchak@gmail.com</span></a></div></footer>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/_global/templates/text-edit.dialog.html',
    '<md-dialog class="user-edit-dialog dialog"><md-dialog-content><textarea data-ui-tinymce="data-ui-tinymce" data-ng-model="vm.tinymceHtml"></textarea></md-dialog-content><md-dialog-actions class="layout-row layout-align-center-center"><md-button ng-click="vm.dialogSave()" class="flex-xs-33 md-raised md-primary">Save</md-button><md-button ng-click="vm.dialogClose()" class="flex-xs-33 md-raised md-primary">Close</md-button></md-dialog-actions></md-dialog>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/main/about/about.template.html',
    '<h2>Font Picker Ability</h2><ul><li><p>Show list the cross-platform system fonts;</p></li><li><p>Change example text for better visualization</p></li><li><p>Allow user to select the font;</p></li><li><p>The demo page should demonstrate the font selection where some text on the page changes font</p></li></ul><p>All Google Fonts was gotten via Google Fonts API. Google Fonts API is well documented. You can find all the necessary information here:<a href="https://developers.google.com/fonts/docs/developer_api">google fonts api</a></p><h3>Techstack</h3><ul><li><a href="https://angularjs.org/">AngularJS</a></li><li><a href="https://material.angularjs.org/latest/">Angular Material</a></li><li><a href="https://www.tiny.cloud/">TinyMCE</a></li><li><a href="https://developers.google.com/fonts/">Google Fonts:</a></li></ul>');
}]);

angular.module('app').run(['$templateCache', function($templateCache) {
  $templateCache.put('components/main/constructor/constructor.template.html',
    '<div class="summary-page"><div class="layout-row layout-xs-column"><div class="flex-30 flex-xs-100"><div class="layout-row"><md-input-container class="flex-100"><label>Choose Font</label><md-select ng-model="vm.fontModel" ng-change="vm.onChangedFont()"><md-option ng-value="font" ng-repeat="font in vm.fontList">{{ font.family }}</md-option></md-select></md-input-container></div></div><div class="flex-70 flex-xs-100"><div style="{{vm.fontStyle}}" class="layout-row layout-align-center-center"><div ng-bind-html="vm.originHtml" class="flex-70"></div></div><div class="layout-row layout-align-center-center"><md-button aria-label="edit button" ng-click="vm.openTextEditDialog()" class="md-raised md-primary"><span class="md-padding">Edit Text</span><i aria-hidden="true" class="fas fa-edit"></i></md-button></div></div></div></div>');
}]);
