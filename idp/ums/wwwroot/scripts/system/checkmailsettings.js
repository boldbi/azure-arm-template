function CheckMailSettingsAndNotify(args,selection,successMessage) {
    ShowWaitingProgress(".Sticky-header", "show");
    $.ajax({
        type: "POST",
        url: checkMailSettingUrl,
        success: function (result) {
            if (result.result == "success" || result.activation == 0) {
                if (typeof selection != 'undefined') {
                    selection.html("<span class='SuccessMessage'>" + successMessage + "</span>");
                }
            }
            else if (result.result == "failure" && result.isAdmin == true && result.activation == 1) {
                if (typeof selection != 'undefined') {
                    selection.html("<span class='alert alert-danger'>" + args + "</span>");
                }
            }
        }
    });    
}

function ValidateMailSettingsAndShowToast(args, selection, successMessage) {
     $.ajax({
        type: "POST",
        url: checkMailSettingUrl,
        success: function (result) {
            if (result.result == "success" || result.activation == 0) {
                if (typeof selection != 'undefined') {
                    SuccessAlert("Activate User", successMessage, 7000);
                }
            }
            else if (result.result == "failure" && result.isAdmin == true && result.activation == 1) {
                if (typeof selection != 'undefined') {
                    selection.html("<span class='alert alert-danger'>" + args + "</span>");
                }
            }
        }
    });
}