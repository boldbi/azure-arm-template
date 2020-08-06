$(document).ready(function () {
    publishInfoDialogObj = new ejs.popups.Dialog({
        isModal: true,
        closeOnEscape: true,
        width: '500px',
        visible: false,
        animationSettings: { effect: 'Zoom' }
    });

    publishInfoDialogObj.appendTo("#publish-info-popup");
});

serverApp.controller('PublishInfoCtrl', ["$scope", "$timeout", function ($scope, $timeout) {
    $scope.PublishedItemDetails = null;
    $scope.openItemInfo = function (publishDetails) {
        $scope.PublishedItemDetails = publishDetails;
        publishInfoDialogObj.show();
        $("#publish-info-popup").show();
        $timeout(function () {
            $scope.$apply();
        }, 100);
    };

    $scope.closeItemInfo = function () {
        publishInfoDialogObj.hide();
    };
}]);

if (typeof (angularManualBootstrap) != "undefined" && angularManualBootstrap) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['serverApp']);
    });
}