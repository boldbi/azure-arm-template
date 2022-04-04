$(document).ready(function () {
    var getResponseDialog = new ej.popups.Dialog({
        header: "<div class='dlg-title'>" + window.TM.App.LocalizationContent.APIResponse + "</div>",
        content: document.getElementById("get-request-response-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: onGetResponseDialogClose, buttonModel: { content: window.TM.App.LocalizationContent.OKButton } }
        ],
        width: "500px",
        height: "auto",
        isModal: true,
        visible: false
    });
    getResponseDialog.appendTo("#get-request-response");

    $(document).on("keyup", "#get-request-end-point", function (event) {
        var urlRegex =  /(?:^|[ \t])((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)/;
        if ($(this).val() != "") {
            if (!urlRegex.test($(this).val())) {
                $("#get-request-end-point").closest('div').addClass('has-error');
                $(".validation-message").html(window.TM.App.LocalizationContent.IsValidUrl);
                $("#get-response").prop("disabled", true);
            }
            else {
                $("#get-request-end-point").closest('div').removeClass('has-error');
                $(".validation-message").html("");
                $("#get-response").prop("disabled", false);
            }
        }
        else {
            $("#get-request-end-point").closest('div').addClass('has-error');
            $(".validation-message").html(window.TM.App.LocalizationContent.Urlvalidator);
            $("#get-response").prop("disabled", true);
        }
    });

    $(document).on("click", "#validate-token", function () {
        $.ajax({
            type: "GET",
            url: validateTokenRequestUrl,
            beforeSend: showWaitingPopup($("#server-app-container")),
            success: function (data) {
                hideWaitingPopup($("#server-app-container"));
                messageBox("", window.TM.App.LocalizationContent.IdpTokenAPI, data.Message, "success", function () {
                    onCloseMessageBox();
                });
            },
            error: function () {
                hideWaitingPopup($("#server-app-container"));
            }
        });
    });

    $(document).on("click", "#get-response", function () {
        var requestUrl = $("#get-request-end-point").val();
        $.ajax({
            type: "POST",
            url: getEndpointResponseRequestUrl,
            beforeSend: showWaitingPopup($("#server-app-container")),
            data: { getRequestUrl: requestUrl },
            success: function (response) {
                hideWaitingPopup($("#server-app-container"));
                document.getElementById("get-request-response").ej2_instances[0].show();
                $(".api-end-point").html(requestUrl);
                $(".response-code").html(response.Data.StatusCode);
                $(".response-message").html(response.Data.ApiResponse);
                if (isJsonString(response.Data.ApiResponse)) {
                    $(".response-message").html(JSON.stringify(JSON.parse(response.Data.ApiResponse), undefined, 4));
                } else {
                    $(".response-message").html(response.Data.ApiResponse);
                }
            },
            error: function () {
                hideWaitingPopup($("#server-app-container"));
            }
        });
    });
});

function onGetResponseDialogClose() {
    document.getElementById("get-request-response").ej2_instances[0].hide();
}

