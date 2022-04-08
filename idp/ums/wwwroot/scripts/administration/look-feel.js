$(document).ready(function () {
    addPlacehoder("#font-upload-dialog");
    $("#font-upload-dialog").ejDialog({
        width: "500px",
        height: "auto",
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        title: window.TM.App.LocalizationContent.UploadFont,
        showHeader: false,
        enableModal: true,
        close: "onUploadFontDialogClose",
        closeOnEscape: true,
        open: "onUploadFontDialogOpen"
    });

    fontDropDownListInitialization('#fontfamily', window.TM.App.LocalizationContent.LookAndFeel);
    document.getElementById("fontfamily").ej2_instances[0].value = selectedFontValue;
    document.getElementById("fontfamily").ej2_instances[0].text = selectedFontText;

    $.validator.addMethod("additionalSpecialCharValidation", function (value) {
        if (/^[a-zA-Z_0-9`~!\$\^()=\-\.\{\} ]+$/.test(value) || value === "") {
            return true;
        }
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters);

    $.validator.addMethod("isRequired", function (value) {
        return !isEmptyOrWhitespace(value);
    }, window.TM.App.LocalizationContent.EnterName);

    $("#upload-font-form").validate({
        errorElement: 'span',
        onkeyup: function (element, event) {
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false;
            }
            else
                true;
        },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            "fontname": {
                isRequired: true,
                additionalSpecialCharValidation: true
            },
        },
        highlight: function (element) {
            $(element).closest('div').addClass("has-error");
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('has-error');
            if (!$(element).closest('div').hasClass('upload-box')) {
                $(element).closest('div').find("span").html("");
            }
        },
        errorPlacement: function (error, element) {
            $(element).closest('div').find("span").html(error.html()).css("display", "block");
        },
        messages: {
            "fontname": {
                isRequired: window.TM.App.LocalizationContent.UserNameValidator
            }
        }
    });

    $(document).on("click", "#trigger-file, #font-file-name", function () {
        $('input[type="file"]').val(null);
        $("#font-file").trigger("click");
    });

    $(document).on("click", "#update-font-settings", function () {
        var fontSettings = { FontFamily: document.getElementById("fontfamily").ej2_instances[0].value };
        showWaitingPopup($("#body"));
        $.ajax({
            type: "POST",
            url: updateFontSettingsUrl,
            data: { fontFamilySettings: fontSettings },
            success: function (result) {
                if (result.status) {
                    SuccessAlert(window.TM.App.LocalizationContent.FontSettings, window.TM.App.LocalizationContent.SiteSettingsUpdated, 7000);
                    window.location.href = window.location.href;
                } else {
                    WarningAlert(window.TM.App.LocalizationContent.FontSettings, window.TM.App.LocalizationContent.SiteSettingsUpdateFalied, 7000);
                }
                hideWaitingPopup($("#body"));
            }
        });
    });

    $(document).on("click", "#upload-font", function () {
        showWaitingPopup($("#body"));     
    });
});

function onFontChange() {
    var selectedFontFamily = document.getElementById("fontfamily").ej2_instances[0].value;
    var fontElements = document.getElementsByClassName("font-ref");
    fontElements[0].href = fontReferenceUrl + "?family=" + selectedFontFamily;
}


$(document).on("change", "#font-file", function (e) {
    var fileName = e.target.files[0].name;
    var fontName = fileName.substring(0, fileName.indexOf('.'));
    $("#font-file-name").val(fileName);
    $("#font-name").val(fontName);
    $(".validation").closest("div").removeClass("has-error");
    $(".fontupload-validation-messages").css("display", "none");
    $("#upload-font").attr("disabled", false);

});

function uplodformValidation() {
    return $("#upload-font-form").valid();
}

function onUploadFontDialogClose() {
    $("#upload-font").attr("disabled", true);
    $("#font-name").val('');
    $('input[type="file"]').val(null);
    $("#font-file-name").val(window.TM.App.LocalizationContent.BrowseFont);
    $(".validation").closest("div").removeClass("has-error");
    $(".fontupload-validation-messages").css("display", "none");
    $("#font-upload-dialog").ejDialog("close");
}

function onUploadFontDialogOpen() {
    $("#font-upload-dialog").ejDialog("open");
    $(".e-dialog-icon").attr("title", "Close");
}


