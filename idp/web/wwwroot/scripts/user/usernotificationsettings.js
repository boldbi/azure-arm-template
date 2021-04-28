var updatedNotificationSettings;
$(document).ready(function () {
    $(".notification-disabled").attr("disabled", true).selectpicker("refresh");
    $(".selectpicker").removeClass("enable");
    var contentAreaWaitingPopupTemplateId = createLoader("content-area");
	$("#content-area").ejWaitingPopup({ template:$("#" + contentAreaWaitingPopupTemplateId)});
    $(document).on("click", "#edit-settings", function (e) {
        updatedNotificationSettings = {
            EnableSystemNotification: parseInt($("#system-notify-status").val()),
            EnableMailNotification: parseInt($("#mail-notify-status").val()),
        };
        $(".notification-disabled").attr("disabled", false).selectpicker("refresh");
        $(".selectpicker").addClass("enable");
        $("#edit-settings").hide();
        $("#update-notification-settings").show();
        $("#cancel-settings").css("display", "inline");
    });
    $(document).on("click", "#update-notification-settings", function () {
        $("#success-msg").html("");
        notificationSettings = {
            EnableSystemNotification: parseInt($("#system-notify-status").val()),
            EnableMailNotification: parseInt($("#mail-notify-status").val()),
        };
        $("#content-area").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: "/user/savenotificationsettings",
            data: { notificationSettings: JSON.stringify(notificationSettings) },
            success: function (result) {
                if (result.Status) {
                    updatedNotificationSettings = {
                        EnableSystemNotification: parseInt($("#system-notify-status").val()),
                        EnableMailNotification: parseInt($("#mail-notify-status").val()),
                    };
                    SuccessAlert("Update Notification Settings", "Notification settings have been updated successfully.", 7000);
                }
                else {
                    WarningAlert("Update Notification Settings", "Error while updating notification settings.", 7000);
                }
                $("#content-area").ejWaitingPopup("hide");
            }
        });
        $(".notification-disabled").attr("disabled", true).selectpicker("refresh");
        $(".selectpicker").removeClass("enable");
        $("#edit-settings").show();
        $("#update-notification-settings").hide();
        $("#cancel-settings").hide();
    });
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