var dialog;

$(document).ready(function () {
    clientSecretConfirmationDlg();
});

function clientSecretConfirmationDlg() {

    ej.base.enableRipple(true);
    var icontemp = '<button id="sendButton" class="e-control e-btn e-primary" data-ripple="true">' + 'OK </button>';
    var sendbutton = new ej.buttons.Button();
    dialog = new ej.popups.Dialog({
        header: 'Regenerate Client Secret',
        footerTemplate: icontemp,
        content: document.getElementById("dlgContent"),
        showCloseIcon: true,
        width: '400px',
        height: '200px',
        isModal: true,
        visible: false,
        beforeOpen: onBeforeopen

    });
    dialog.appendTo('#dialog');
    sendbutton.appendTo('#sendButton');
}

function onBeforeopen() {
    document.getElementById('dlgContent').style.visibility = 'visible';
}

function fnRegenerateClientSecret() {
    var id = $("#application-id").val();
    $.ajax({
        type: "POST",
        data: { "id": id },
        dataType: "json",
        url: refreshclientsecretUrl,
        success: function (data) {
            if (data != false) {
                SuccessAlert("Regenerate Client Secret", "Client secret generated successfully.", 7000);
                $("#mySecret").val(data);
            } else {
                WarningAlert("Regenerate Client Secret", "Error while generating client secret.", 7000);
            }
        },
        error: function () {
            WarningAlert("Regenerate Client Secret", "Error while generating client secret.", 7000);
        }
    });
}

function onRegenerateClientSecretDialogOpen() {
    dialog.show();
}

$(document).on("click", "#sendButton", function () {
    dialog.hide();
    fnRegenerateClientSecret();
});

$(document).on("keypress", "#dialog", function (ev) {
    if (ev.keyCode == 13) {
        dialog.hide();
        fnRegenerateClientSecret();
    }
});