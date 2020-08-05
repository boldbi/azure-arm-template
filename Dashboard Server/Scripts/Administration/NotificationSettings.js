$(document).ready(function () {
var notificationBodyWaitingPopupTemplateId = createLoader("body");
    $("#body").ejWaitingPopup({ template:$("#" + notificationBodyWaitingPopupTemplateId) });
});

$(document).on("click", "#update-notification-settings", function () {
    var notificationSettingsPost = {
        EnableSystemNotification: $("#enable-system-notification").is(":checked"),
        EnableMailNotification: $("#enable-mail-notification").is(":checked"),
        EnableAutoWatchOfCommentsOfCreatedItems: $("#enable-autowatch-created").is(":checked"),
        EnableAutoWatchOfCommentsOfAccessibleItems: $("#enable-autowatch-access").is(":checked")
    };

    var notificationAdministrationPost = {
        EnableSystemNotification: $("#restrict-system-notification").is(":checked"),
        EnableMailNotification: $("#restrict-mail-notification").is(":checked"),
        EnableAutoWatchOfCommentsOfCreatedItems: $("#restrict-autowatch-created").is(":checked"),
        EnableAutoWatchOfCommentsOfAccessibleItems: $("#restrict-autowatch-access").is(":checked")
    };

    $("#body").ejWaitingPopup("show");

    $.ajax({
        type: "POST",
        url: $(this).data("url"),
        data: { notificationSettings: JSON.stringify(notificationSettingsPost), notificationAdministration: JSON.stringify(notificationAdministrationPost) },
        success: function (result) {
            if (result.Status) {
                SuccessAlert(window.Server.App.LocalizationContent.NotificationSettings, window.Server.App.LocalizationContent.SettingsSuccessAlert, 7000);
            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.NotificationSettings, window.Server.App.LocalizationContent.SettingsWarningAlert, 7000);
            }
            $("#body").ejWaitingPopup("hide");
        }
    });
});