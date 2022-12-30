const additionalSpecialChar = /^[a-zA-Z_0-9`~!\$\^()=\-\.\{\} ]+$/;

$(document).ready(function () {
    addPlacehoder("#font-upload-dialog");
    var fontUploadDialog = new ejs.popups.Dialog({
        header: window.Server.App.LocalizationContent.UploadFont,
        showCloseIcon: true,
        width: '472px',
        close: onUploadFontDialogClose,
        isModal: true,
        visible: false,
        animationSettings: { effect: 'Zoom' }
    });
    fontUploadDialog.appendTo("#font-upload-dialog");

    dropDownListInitialization('#fontfamily', window.Server.App.LocalizationContent.LookAndFeel, true);
    if (document.getElementById("fontfamily") != null) {
        document.getElementById("fontfamily").ej2_instances[0].value = selectedFontValue;
        document.getElementById("fontfamily").ej2_instances[0].text = selectedFontText;
    }

    dropDownListInitialization('#application-theme', window.Server.App.LocalizationContent.ApplicationTheme, true);
    dropDownListInitialization('#dashboard-theme', window.Server.App.LocalizationContent.DashboardTheme, true);
    if (document.getElementById("application-theme") != null && document.getElementById("dashboard-theme") != null) {
        document.getElementById("application-theme").ej2_instances[0].value = selectedApplicationThemeValue;
        document.getElementById("application-theme").ej2_instances[0].text = selectedApplicationThemeText;
        document.getElementById("dashboard-theme").ej2_instances[0].value = selectedDashboardThemeValue;
        document.getElementById("dashboard-theme").ej2_instances[0].text = selectedDashboardThemeText;
    } else {
        $('.font-section').addClass("remove-section");
    }


    var applicationThemeUploadDialog = new ejs.popups.Dialog({
        header: window.Server.App.LocalizationContent.ApplicationTheme,
        showCloseIcon: true,
        width: '472px',
        close: onUploadApplicationThemeDialogClose,
        isModal: true,
        visible: false,
        animationSettings: { effect: 'Zoom' }
    });
    applicationThemeUploadDialog.appendTo("#application-theme-upload-dialog");

    var dashboardThemeUploadDialog = new ejs.popups.Dialog({
        header: window.Server.App.LocalizationContent.DashboardTheme,
        showCloseIcon: true,
        width: '472px',
        close: onUploadDashboardThemeDialogClose,
        isModal: true,
        visible: false,
        animationSettings: { effect: 'Zoom' }
    });
    dashboardThemeUploadDialog.appendTo("#dashboard-theme-upload-dialog");

    $.validator.addMethod("additionalSpecialCharValidation", function (value) {
        if (additionalSpecialChar.test(value) || value === "") {
            return true;
        }
    }, window.Server.App.LocalizationContent.AvoidSpecailCharacters);

    $.validator.addMethod("isRequired", function (value) {
        return !isEmptyOrWhitespace(value);
    }, window.Server.App.LocalizationContent.EnterName);

    $(".upload-form").validate({
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
            "filename": {
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
        }
    });

    $(document).on("click", ".upload-box", function (e) {
        $('input[type="file"]').val(null);
        if (e.target.classList.contains("trigger-font-upload"))
            $("#font-file").trigger("click");
        if (e.target.classList.contains("trigger-app-theme-upload"))
            $("#applicationtheme-file").trigger("click");
        if (e.target.classList.contains("trigger-dash-theme-upload"))
            $("#dashboardtheme-file").trigger("click");
    });

    $(document).on("click", "#update-lookandfeel-settings", function () {
        var fontFamily = null;
        var theme = null;
        if (document.getElementById("fontfamily") != null) {
            fontFamily =document.getElementById("fontfamily").ej2_instances[0].value;
        }

        if (document.getElementById("application-theme") != null) {
            theme = {
                Appearance: $("input:radio[name=appearance]:checked").val(),
                ApplicationTheme: document.getElementById("application-theme").ej2_instances[0].value,
                DashboardTheme: document.getElementById("dashboard-theme").ej2_instances[0].value
            };
        }

        var lookAndFeelSettings = {
            FontFamily: fontFamily,
            Theme: theme
        };
        showWaitingPopup('body');
        $.ajax({
            type: "POST",
            url: updateFontThemeSettingsUrl,
            data: { updateSettings: lookAndFeelSettings },
            success: function (result) {
                if (result.status) {
                    SuccessAlert(window.Server.App.LocalizationContent.LookAndFeelSettings, window.Server.App.LocalizationContent.LookAndFeelSettingsSuccess, 7000);
                    window.location.href = window.location.href;
                } else {
                    WarningAlert(window.Server.App.LocalizationContent.LookAndFeelSettings, window.Server.App.LocalizationContent.LookAndFeelSettingsFailure, result.Message, 7000);
                }
                hideWaitingPopup('body');
            }
        });
    });

    $(document).on("click", "#upload-font", function () {
        showWaitingPopup('body');     
    });
});

function onFontChange() {
    var selectedFontFamily = document.getElementById("fontfamily").ej2_instances[0].value;
    var fontElements = document.getElementsByClassName("font-ref");
    fontElements[0].href = fontReferenceUrl + "?family=" + selectedFontFamily;
}

function onApplicationThemeChange() {
    var applicationTheme = document.getElementById("application-theme").ej2_instances[0].value;
    applicationTheme = applicationTheme === "Default" ? $("input:radio[name=appearance]:checked").val() : applicationTheme;
    var applicationElements = document.getElementsByClassName("application-theme-ref");
    applicationElements[0].href = applicationThemeReferenceUrl + "?theme=" + applicationTheme;
}

$(document).on("change", "#font-file", function (e) {
    var fileName = e.target.files[0].name;
    var fontName = fileName.substring(0, fileName.indexOf('.'));
    $("#font-file-name").val(fileName);
    $("#font-name").val(fontName);
    $(".validation").closest("div").removeClass("has-error");
    $(".validation-message").css("display", "none");
    $("#upload-font").attr("disabled", false);

});

function onChangeTheme(defaultTheme) {
    document.getElementById("application-theme").ej2_instances[0].text = "Default";
    var appearanceTheme = "lighttheme.css";
    if (defaultTheme === "dark") {
        appearanceTheme = "darktheme.css";
    }
    var themeElements = document.getElementsByClassName("theme-ref");
    themeElements[0].href = baseRootUrl + "bundles/css/" + appearanceTheme;
    
    var applicationElements = document.getElementsByClassName("application-theme-ref");
    applicationElements[0].href = applicationThemeReferenceUrl + "?theme=" + defaultTheme;
}

$(document).on("change", "input[name='appearance']", function (e) {
    var theme = $("input:radio[name=appearance]:checked").val();
    onChangeTheme(theme);
});

function onUploadFontDialogClose() {
    $("#upload-font").attr("disabled", true);
    $("#font-name").val('');
    $('input[type="file"]').val(null);
    $("#font-file-name").val(window.Server.App.LocalizationContent.BrowseFont);
    $(".validation").closest("div").removeClass("has-error");
    $(".validation-message").css("display", "none");
    document.getElementById("font-upload-dialog").ej2_instances[0].hide();
}

function onUploadFontDialogOpen() {
    document.getElementById("font-upload-dialog").ej2_instances[0].show();
}

function onUploadApplicationThemeDialogOpen() {
    document.getElementById("application-theme-upload-dialog").ej2_instances[0].show();
}

function onUploadDashboardThemeDialogOpen() {
    document.getElementById("dashboard-theme-upload-dialog").ej2_instances[0].show();
}

function onUploadApplicationThemeDialogClose() {
    $("#upload-applicationtheme").attr("disabled", true);
    $("#applicationtheme-name").val('');
    $('input[type="file"]').val(null);
    $("#application-theme-file-name").val('');
    $('#applicationtheme-file').closest('div').removeClass("has-error");
    $(".validation").closest("div").removeClass("has-error");
    $(".validation-message").html("");
    document.getElementById("application-theme-upload-dialog").ej2_instances[0].hide();
}

function onUploadDashboardThemeDialogClose() {
    $("#upload-dashboardtheme").attr("disabled", true);
    $("#dashboardtheme-name").val('');
    $('input[type="file"]').val(null);
    $("#dashboard-theme-file-name").val('');
    $('#dashboardtheme-file').closest('div').removeClass("has-error");
    $(".validation").closest("div").removeClass("has-error");
    $(".validation-messages").html("");
    document.getElementById("dashboard-theme-upload-dialog").ej2_instances[0].hide();
}

$(document).on("change", "#applicationtheme-file", function (e) {
    var fileName = e.target.files[0].name;
    var themeName = fileName.substring(0, fileName.indexOf('.'));
    $("#application-theme-file-name").val(fileName);
    $('#upload-applicationtheme').attr("disabled", "disabled");

    var fileInput = document.getElementById('applicationtheme-file');
    var filePath = fileInput.value;
    var allowedExtensions = /(\.css)$/i;
    if (!allowedExtensions.exec(filePath)) {
        $('#applicationtheme-file').closest('div').addClass("has-error");
        $("#invalid-applicationthemefile-name").html(window.Server.App.LocalizationContent.CssFile);
        $('#upload-applicationtheme,#applicationtheme-name').attr("disabled", "disabled");
    }
    else {
        var applicationTheme = document.getElementById("application-theme").ej2_instances[0];
        var applicationThemeList = applicationTheme.getItems();
        $('#applicationtheme-file').closest('div').removeClass("has-error");
        $(".validation-message").html("");
        $('#upload-applicationtheme,#applicationtheme-name').removeAttr("disabled");
        $('#applicationtheme-name').closest('div').removeClass("has-error");
        $("#applicationtheme-name").val(themeName);
        for (var item = 0; item < applicationThemeList.length; item++) {
            if (themeName === applicationThemeList[item].dataset.value) {
                $('#applicationtheme-name').closest('div').addClass("has-error");
                $("#invalid-applicationtheme-name").html(window.Server.App.LocalizationContent.CssFileExist);
                $('#upload-applicationtheme').attr("disabled", "disabled");
            }
        }
    }
});

$(document).on("change", "#dashboardtheme-file", function (e) {
    var fileName = e.target.files[0].name;
    var themeName = fileName.substring(0, fileName.indexOf('.'));
    $("#dashboard-theme-file-name").val(fileName);
    $('#upload-dashboardtheme').attr("disabled", "disabled");

    var fileInput = document.getElementById('dashboardtheme-file');
    var filePath = fileInput.value;
    var allowedExtensions = /(\.css)$/i;
    if (!allowedExtensions.exec(filePath)) {
        $('#applicationtheme-name').closest('div').addClass("has-error");
        $("#invalid-applicationtheme-name").html(window.Server.App.LocalizationContent.AvoidSpecailCharacters);
        $('.upload-theme').attr("disabled", "disabled");
        $(".validation-message").html("");
    }
    else {
        var dashboardTheme = document.getElementById("dashboard-theme").ej2_instances[0];
        var dashboardThemeList = dashboardTheme.getItems();
        $('#dashboardtheme-file').closest('div').removeClass("has-error");
        $('#upload-dashboardtheme').removeAttr("disabled");
        $('#dashboardtheme-name').removeAttr("disabled");
        $('#dashboardtheme-name').closest('div').removeClass("has-error");
        $(".validation-message").html("");
        $("#dashboardtheme-name").val(themeName);
        for (var item = 0; item < dashboardThemeList.length; item++) {
            if (themeName === dashboardThemeList[item].dataset.value) {
                $('#dashboardtheme-name').closest('div').addClass("has-error");
                $("#invalid-dashboardtheme-name").html(window.Server.App.LocalizationContent.CssFileExist);
                $('#upload-dashboardtheme').attr("disabled", "disabled");
            }
        }
    }
});

function keyvalidation(id) {
    var name = $(id).val();
    var invalid = id === "#applicationtheme-name" ? "#invalid-applicationtheme-name" : "#invalid-dashboardtheme-name";
    var themename = id === "#applicationtheme-name" ? "application-theme" : "dashboard-theme";
    var theme = document.getElementById(themename).ej2_instances[0];
    var themeList = theme.getItems();
    if (name != "") {
        for (var item = 0; item < themeList.length; item++) {
            if ( name.toLowerCase().trim() === themeList[item].dataset.value.toLowerCase() || name.toLowerCase().trim() == "light" || name.toLowerCase().trim() == "dark") {
                $(id).closest('div').addClass("has-error");
                $(invalid).html(window.Server.App.LocalizationContent.CssFileExist);
                $('.upload-theme').attr("disabled", "disabled");
                break;
            }
            else {
                $(id).closest('div').removeClass("has-error");
                $(".validation-message").html("");
                $('.upload-theme').removeAttr("disabled");
            }
        }
    }
}

$(document).on("keyup", "#applicationtheme-name", function () {
    keyvalidation("#applicationtheme-name");
});

$(document).on("keyup", "#dashboardtheme-name", function () {
    keyvalidation("#dashboardtheme-name");
});

function uploadformValidation() {
    return $(".upload-form").valid();
}
