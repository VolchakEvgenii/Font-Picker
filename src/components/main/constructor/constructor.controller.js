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



