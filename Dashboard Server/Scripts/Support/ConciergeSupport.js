$(document).ready(function () {
    var bodyWaitingPopupTemplateId = createLoader("body");
    $("#body").ejWaitingPopup({ template:$("#" + bodyWaitingPopupTemplateId) });
});

$(document).on("click", "#update-concierge-settings", function () {
    $(".confirmationMessage").html("");

    var allowAccess =  $("#concierge-support-access").is(":checked")
    $("#body").ejWaitingPopup("show");
    $.ajax({
        type: "POST",
        url: $(this).data("url"),
        data: { allowAccess: allowAccess },
        success: function (result) {
            if (result.Status) {
                SuccessAlert(window.Server.App.LocalizationContent.ConciergeSettings, window.Server.App.LocalizationContent.SettingsSuccessAlert, 7000);
            } else {
                WarningAlert(window.Server.App.LocalizationContent.ConciergeSettings, window.Server.App.LocalizationContent.SettingsWarningAlert, 7000);
            }
            $("#body").ejWaitingPopup("hide");
        }
    });
});