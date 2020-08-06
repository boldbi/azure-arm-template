var updatedNotificationSettings;

$(document).ready(function () {
    $(".notification-disabled").attr("disabled", true).selectpicker("refresh");
    $(".selectpicker").removeClass("enable");
    var usernotificationWaitingPopupTemplateId = createLoader("body");
    $("#body").ejWaitingPopup({ template: $("#" + usernotificationWaitingPopupTemplateId) });
    $(document).on("click", "#edit-settings", function (e) {
        updatedNotificationSettings = {
            EnableSystemNotification: parseInt($("#system-notify-status").val()),
            EnableMailNotification: parseInt($("#mail-notify-status").val()),
            EnableAutoWatchOfCommentsOfCreatedItems: parseInt($("#autowatch-created-comment-status").val()),
            EnableAutoWatchOfCommentsOfAccessibleItems: parseInt($("#autowatch-access-comment-status").val())
        };
        $(".notification-disabled").attr("disabled", false).selectpicker("refresh");
        $(".selectpicker").addClass("enable");
        $("#edit-settings").hide();
        $("#update-notification-settings").show();
        $("#cancel-settings").css("display", "inline");
    });
    $(document).on("click", "#update-notification-settings", function () {
        notificationSettings = {
            EnableSystemNotification: parseInt($("#system-notify-status").val()),
            EnableMailNotification: parseInt($("#mail-notify-status").val()),
            EnableAutoWatchOfCommentsOfCreatedItems: parseInt($("#autowatch-created-comment-status").val()),
            EnableAutoWatchOfCommentsOfAccessibleItems: parseInt($("#autowatch-access-comment-status").val())
        };
        $("#body").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: saveUserNotificationSettingsUrl,
            data: { notificationSettings: JSON.stringify(notificationSettings) },
            success: function (result) {
                if (result.Status) {
                    updatedNotificationSettings = {
                        EnableSystemNotification: parseInt($("#system-notify-status").val()),
                        EnableMailNotification: parseInt($("#mail-notify-status").val()),
                        EnableAutoWatchOfCommentsOfCreatedItems: parseInt($("#autowatch-created-comment-status").val()),
                        EnableAutoWatchOfCommentsOfAccessibleItems: parseInt($("#autowatch-access-comment-status").val())

                    };
                    SuccessAlert(window.Server.App.LocalizationContent.UserNotificationSettings, window.Server.App.LocalizationContent.UserNotificationSettingsSuccess, 7000);
                }
                else {
                    WarningAlert(window.Server.App.LocalizationContent.UserNotificationSettings, window.Server.App.LocalizationContent.UserNotificationSettingsError, 7000);
                }
                $("#body").ejWaitingPopup("hide");
            }
        });
        $(".notification-disabled").attr("disabled", true).selectpicker("refresh");
        $(".selectpicker").removeClass("enable");
        $("#edit-settings").show();
        $("#update-notification-settings").hide();
        $("#cancel-settings").hide();
    });

    $(document).on("click", "#cancel-settings", function (e) {
        cancelSettings(updatedNotificationSettings);
    });

    function cancelSettings(updatedNotificationSettings) {
        $("#system-notify-status").val(updatedNotificationSettings.EnableSystemNotification);
        $("#mail-notify-status").val(updatedNotificationSettings.EnableMailNotification);
        $("#autowatch-created-comment-status").val(updatedNotificationSettings.EnableAutoWatchOfCommentsOfCreatedItems);
        $("#autowatch-access-comment-status").val(updatedNotificationSettings.EnableAutoWatchOfCommentsOfAccessibleItems);
        $(".notification-disabled").attr("disabled", true).selectpicker("refresh");
        $(".selectpicker").removeClass("enable");
        $("#edit-settings").show();
        $("#update-notification-settings").hide();
        $("#cancel-settings").hide();
    }


    $(window).load(function () {
        $(".hidden-visibility").removeClass("hidden-visibility");
    });
});