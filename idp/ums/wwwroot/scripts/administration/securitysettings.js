var styleSrcChipData = [];
var scriptSrcChipData = [];
var fontSrcChipData = [];
var imgSrcChipData = [];
var connectSrcChipData = [];
var frameSrcChipData = [];
var isStyleSrcChipBinded = false;
var isScriptSrcsChipBinded = false;
var isFontSrcChipBinded = false;
var isImgSrcChipBinded = false;
var isConnectSrcChipBinded = false;
var isFrameSrcChipBinded = false;
$(document).ready(function () {
    var numericBox = new ejs.inputs.NumericTextBox({
        cssClass: 'e-outline e-custom',
        min:6,
        max:64,
        format: '###.##'
    });
    numericBox.appendTo("#min-len");
    document.getElementById("min-len").ej2_instances[0].value = passwordLength;

    if (styleSourcesList != null && styleSourcesList != "") {
        for (i = 0; i < styleSourcesList.length; i++) {
            styleSrcChipData[i] = styleSourcesList[i];
            if (styleSrcChipData[i].length != 0) {
                srcChipConversion(styleSrcChipData, "style-src-chip-content", "#txt-stylesrc");
            }
        }
    }

    if (scriptSourcesList != null && scriptSourcesList != "") {
        for (i = 0; i < scriptSourcesList.length; i++) {
            scriptSrcChipData[i] = scriptSourcesList[i];
            if (scriptSrcChipData[i].length != 0) {
                srcChipConversion(scriptSrcChipData, "script-src-chip-content", "#txt-scriptsrc");
            }
        }
    }

    if (fontSourcesList != null && fontSourcesList != "") {
        for (i = 0; i < fontSourcesList.length; i++) {
            fontSrcChipData[i] = fontSourcesList[i];
            if (fontSrcChipData[i].length != 0) {
                srcChipConversion(fontSrcChipData, "font-src-chip-content", "#txt-fontsrc");
            }
        }
    }

    if (imgSourcesList != null && imgSourcesList != "") {
        for (i = 0; i < imgSourcesList.length; i++) {
            imgSrcChipData[i] = imgSourcesList[i];
            if (imgSrcChipData[i].length != 0) {
                srcChipConversion(imgSrcChipData, "img-src-chip-content", "#txt-imgsrc");
            }
        }
    }

    if (connectSourcesList != null && connectSourcesList != "") {
        for (i = 0; i < connectSourcesList.length; i++) {
            connectSrcChipData[i] = connectSourcesList[i];
            if (connectSrcChipData[i].length != 0) {
                srcChipConversion(connectSrcChipData, "connect-src-chip-content", "#txt-connectsrc");
            }
        }
    }

    if (frameSourcesList != null && frameSourcesList != "") {
        for (i = 0; i < frameSourcesList.length; i++) {
            frameSrcChipData[i] = frameSourcesList[i];
            if (frameSrcChipData[i].length != 0) {
                srcChipConversion(frameSrcChipData, "frame-src-chip-content", "#txt-framesrc");
            }
        }
    }

    diableOrEnableCSPSettingsForm()

    if ($("#lax-cookie").is(":checked")) {
        $(".cookie-notification").html(window.Server.App.LocalizationContent.LaxInformation);
        $(".cookie-notification").show();
    }
    else if ($("#none-cookie").is(":checked")) {
        $(".cookie-notification").html(window.Server.App.LocalizationContent.NoneInformation.format("</br></br>", "<b>", "</b>"));
        $(".cookie-notification").show();
    }
    else if ($("#strict-cookie").is(":checked")) {
        $(".cookie-notification").html(window.Server.App.LocalizationContent.StrictInformation);
        $(".cookie-notification").show();
    }

    if ($("#security-settings-container").is(":visible")) {
        if (location.href.match(/cookie-options/)) {
            $("#cookie-options-tab").tab("show");
            $("#csp").hide();
            $("#x-frame-options").hide();
            $("#password-policy").hide();

            $("#update-cookie-settings").show();
            $("#update-x-frame-options-settings").hide();
            $("#update-csp-settings").hide();
            $("#update-password-settings").hide();

            var query = (window.location.search).toString();
            if (query != "?view=cookie-options") {
                history.pushState(null, '', '?view=cookie-options');
            }
        }
        else if (location.href.match(/x-frame-options/)) {
            $("#x-frame-options-tab").tab("show");
            $("#cookie-options").hide();
            $("#csp").hide();
            $("#password-policy").hide();

            $("#update-x-frame-options-settings").show();
            $("#update-csp-settings").hide();
            $("#update-cookie-settings").hide();
            $("#update-password-settings").hide();

            var query = (window.location.search).toString();
            if (query != "?view=x-frame-options") {
                history.pushState(null, '', '?view=x-frame-options');
            }
        }
        else if (location.href.match(/csp/)) {
            $("#csp-tab").tab("show");
            $("#cookie-options").hide();
            $("#x-frame-options").hide();
            $("#password-policy").hide();
            $("#update-csp-settings").show();
            $("#update-x-frame-options-settings").hide();
            $("#update-cookie-settings").hide();
            $("#update-password-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?view=csp-settings") {
                history.pushState(null, '', '?view=csp-settings');
            }
        }
        else {
            $("#password-policy-tab").tab("show");
            $("#cookie-options").hide();
            $("#csp").hide();
            $("#x-frame-options").hide();

            $("#update-password-settings").show();
            $("#update-x-frame-options-settings").hide();
            $("#update-csp-settings").hide();
            $("#update-cookie-settings").hide();

            var query = (window.location.search).toString();
            if (query != "?view=user-account") {
                history.pushState(null, '', '?view=user-account');
            }
        }

    }

    $("a[data-toggle='tab']").on('click', function (e) {
        if ($(this).attr("id") == "x-frame-options-tab") {
            $("#x-frame-options").show();
            $("#csp").hide();
            $("#cookie-options").hide();
            $("#password-policy").hide();

            $("#update-x-frame-options-settings").show();
            $("#update-csp-settings").hide();
            $("#update-cookie-settings").hide();
            $("#update-password-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?view=x-frame-options") {
                history.pushState(null, '', '?view=x-frame-options');
            }
        }
        else if ($(this).attr("id") == "csp-tab") {
            $("#csp").show();
            $("#cookie-options").hide();
            $("#x-frame-options").hide();
            $("#password-policy").hide();

            $("#update-csp-settings").show();
            $("#update-x-frame-options-settings").hide();
            $("#update-cookie-settings").hide();
            $("#update-password-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?view=csp-settings") {
                history.pushState(null, '', '?view=csp-settings');
            }
        }
        else if ($(this).attr("id") == "cookie-options-tab") {
            $("#cookie-options").show();
            $("#csp").hide();
            $("#x-frame-options").hide();
            $("#password-policy").hide();

            $("#update-cookie-settings").show();
            $("#update-x-frame-options-settings").hide();
            $("#update-csp-settings").hide();
            $("#update-password-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?view=cookie-options") {
                history.pushState(null, '', '?view=cookie-options');
            }
        }
        else if ($(this).attr("id") == "password-policy-tab") {
            $("#password-policy").show();
            $("#csp").hide();
            $("#cookie-options").hide();
            $("#x-frame-options").hide();

            $("#update-password-settings").show();
            $("#update-x-frame-options-settings").hide();
            $("#update-csp-settings").hide();
            $("#update-cookie-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?view=user-account") {
                history.pushState(null, '', '?view=user-account');
            }
        }
    });

    var sameSiteDialog = new ej.popups.Dialog({
        content: document.getElementById("samesite-dialog-content"),
        buttons: [
            { click: confirmation, buttonModel: { content: window.Server.App.LocalizationContent.OKButton, isPrimary: true} } 
        ],
        width: "424px",
        isModal: true,
        animationSettings: { effect: 'Zoom' },
        visible: false
    });
    sameSiteDialog.appendTo("#samesite-dialog");

});

$(document).on("click", "#update-password-settings", function () {
    var securitySettings = {
        PasswordSettings:
        {
            LowerCaseRequired: $("#enable-lower-case").is(":checked"),
            UpperCaseRequired: $("#enable-upper-case").is(":checked"),
            NumberRequired: $("#enable-numeric").is(":checked"),
            SpecialCharactersRequired: $("#enable-special-char").is(":checked"),
            MinimumLength: $("#min-len").val()
        },
        LockUserAccounts: $("#enable-user-restrict").is(":checked")
    };
    showWaitingPopup('body');
    $.ajax({
        type: "POST",
        url: updateSecuritySettingsUrl,
        data: { securitySettingsData: securitySettings },
        success: function (data) {
            if (data.result) {
                SuccessAlert(window.Server.App.LocalizationContent.SecuritySettings, window.Server.App.LocalizationContent.SiteSettingsUpdated, 7000);
            } else {
                WarningAlert(window.Server.App.LocalizationContent.SecuritySettings, window.Server.App.LocalizationContent.SiteSettingsUpdateFalied, data.Message, 7000);
            }
            hideWaitingPopup('body');
        },
        error: function () {
            WarningAlert(window.Server.App.LocalizationContent.SecuritySettings, window.Server.App.LocalizationContent.SiteSettingsUpdateFalied, data.Message, 7000);
            hideWaitingPopup('body');
        }
    });
});

$(document).on("keyup", "#min-len", function () {
    if ($("#min-len").val() == 0) {
        $('#min-len').closest('div').addClass("has-error");
        $("#min-len-validation").html(window.Server.App.LocalizationContent.MinLengthEmpty).css("display", "block");
        $(".min-len-validation-messages").css("display", "block");
        $('#update-password-settings').attr("disabled", "disabled");
    }
    else if (($("#min-len").val() > 0 && $("#min-len").val() < 6) || $("#min-len").val() < 0) {
        $('#min-len').closest('div').addClass("has-error");
        $("#min-len-validation").html(window.Server.App.LocalizationContent.MinLengthNeeded).css("display", "block");
        $(".min-len-validation-messages").css("display", "block");
        $('#update-password-settings').attr("disabled", "disabled");
    }
    else {
        $(".min-len-validation-messages").css("display", "none");
        $('#update-password-settings').removeAttr("disabled");
    }
});

document.querySelector("html").onclick = check;
function check(e) {
    var s = $("#min-len").val();
    if (s >= 6) {
        $(".min-len-validation-messages").css("display", "none");
        $('#update-password-settings').removeAttr("disabled");
    }
}

$(document).on("click", "#x-frame", function () {
    if ($("#x-frame").is(":checked")) {
        $("#x-frame-checkbox-label").css("padding-bottom", "20px");
        $(".x-frame-notification").show();
    }
    else {
        $(".x-frame-notification").hide();
        $("#x-frame-checkbox-label").css("padding-bottom", "32px");
    }
});

$(document).on("click", "#update-x-frame-options-settings", function () {
    var key = "IsXFrameOptionsEnabled"
    var isXFrameOptionsEnabled = $("#x-frame").is(":checked");
    $.ajax({
        type: "POST",
        url: updateXFrameHeaderSettingsUrl,
        data: { systemSettingValue: isXFrameOptionsEnabled, key: key },
        success: function (result) {
            if (result.status) {
                SuccessAlert(window.Server.App.LocalizationContent.SecuritySettings, window.Server.App.LocalizationContent.SiteSettingsUpdated, 7000);
            } else {
                WarningAlert(window.Server.App.LocalizationContent.SecuritySettings, window.Server.App.LocalizationContent.SiteSettingsUpdateFalied, result.message, 7000);
            }
        }
    });
});

$(document).on("click", "#enable-csp", function () {
    diableOrEnableCSPSettingsForm();
});

function diableOrEnableCSPSettingsForm() {
    if ($("#enable-csp").is(":checked")) {
        $(".src-input-class").removeClass("src-disabled");
        $(".src-input-class .src-input-ship .e-chip").removeClass("disable-bg-color");
        $(".txt-input-src").prop('disabled', false);
    }
    else {
        $(".txt-input-src").val("");
        $(".style-src-validation .script-src-validation .font-src-validation .img-src-validation .connect-src-validation .frame-src-validation").html("");
        $(".src-input-class").addClass("src-disabled");
        $(".src-input-class .src-input-ship .e-chip").addClass("disable-bg-color");
        $(".txt-input-src").prop('disabled', true);
        getSrcInstance("style-src-chip-content");
        getSrcInstance("script-src-chip-content");
        getSrcInstance("font-src-chip-content");
        getSrcInstance("img-src-chip-content");
        getSrcInstance("connect-src-chip-content");
        getSrcInstance("frame-src-chip-content");
        styleSrcChipData = [];
        scriptSrcChipData = [];
        fontSrcChipData = [];
        imgSrcChipData = [];
        connectSrcChipData = [];
        frameSrcChipData = [];
    }
}

$(document).on("focusin", ".txt-input-src", function (e) {
    if (e.target.id == "txt-stylesrc") {
        $("#style-src-content").addClass("focused");
    }
    else if (e.target.id == "txt-scriptsrc") {
        $("#script-src-content").addClass("focused");
    }
    else if (e.target.id == "txt-fontsrc") {
        $("#font-src-content").addClass("focused");
    }
    else if (e.target.id == "txt-imgsrc") {
        $("#img-src-content").addClass("focused");
    }
    else if (e.target.id == "txt-connectsrc") {
        $("#connect-src-content").addClass("focused");
    }
    else if (e.target.id == "txt-framesrc") {
        $("#frame-src-content").addClass("focused");
    }
});

$(".txt-input-src").focusout(function (e) {
    var targetId = e.target.id;
    if (targetId == "txt-stylesrc") {
        var styleSrcNames = $("#txt-stylesrc").val() + ",";
        if (styleSrcNames.length > 1) {
            objectConvertAsSrcDirectiveChip(styleSrcNames, targetId);
        }
        $("#style-src-content").removeClass("focused");
    }
    else if (targetId == "txt-scriptsrc") {
        var scritptSrcNames = $("#txt-scriptsrc").val() + ",";
        if (scritptSrcNames.length > 1) {
            objectConvertAsSrcDirectiveChip(scritptSrcNames, targetId);
        }
        $("#script-src-content").removeClass("focused");
    }
    else if (targetId == "txt-fontsrc") {
        var fontSrcNames = $("#txt-fontsrc").val() + ",";
        if (fontSrcNames.length > 1) {
            objectConvertAsSrcDirectiveChip(fontSrcNames, targetId);
        }
        $("#font-src-content").removeClass("focused");
    }
    else if (targetId == "txt-imgsrc") {
        var imgSrcNames = $("#txt-imgsrc").val() + ",";
        if (imgSrcNames.length > 1) {
            objectConvertAsSrcDirectiveChip(imgSrcNames, targetId);
        }
        $("#img-src-content").removeClass("focused");
    }
    else if (targetId == "txt-connectsrc") {
        var connectSrcNames = $("#txt-connectsrc").val() + ",";
        if (connectSrcNames.length > 1) {
            objectConvertAsSrcDirectiveChip(connectSrcNames, targetId);
        }
        $("#connect-src-content").removeClass("focused");
    }
    else if (targetId == "txt-framesrc") {
        var frameSrcNames = $("#txt-framesrc").val() + ",";
        if (frameSrcNames.length > 1) {
            objectConvertAsSrcDirectiveChip(frameSrcNames, targetId);
        }
        $("#frame-src-content").removeClass("focused");
    }

});

$(document).on("keyup", ".txt-input-src", function (e) {
    var targetId = e.target.id;
    if ($("#" + targetId).length == 1) {
        $("#" + targetId).focus();
    }
    if (e.keyCode == keyCode.Comma || e.keyCode == keyCode.Enter) {
        var directiveValues = $("#" + targetId).val();
        objectConvertAsSrcDirectiveChip(directiveValues, targetId);
    }
});


$(document).on("keyup", "#style-src-content", function (e) {
    var styleInstance = document.getElementById("style-src-chip-content").ej2_instances;
    if (styleInstance != undefined && (styleInstance[0].chips == null || styleInstance[0].chips == 0)) {
        if ($("#txt-stylesrc").val() == "") {
            applySrcContainer("#txt-stylesrc");
        }
        styleInstance[0].chips = [];
        setTimeout(function () {
            $("#style-src-chip-content").html("");
        }, 100);
    } else if (styleInstance == undefined && $("#txt-stylesrc").val().length == 0) {
        applySrcContainer("#txt-stylesrc");
    }
});


$(document).on("keyup", "#script-src-content", function (e) {
    var scriptInstance = document.getElementById("script-src-chip-content").ej2_instances;
    if (scriptInstance != undefined && (scriptInstance[0].chips == null || scriptInstance[0].chips == 0)) {
        if ($("#txt-scriptsrc").val() == "") {
            applySrcContainer("#txt-scriptsrc");
        }
        scriptInstance[0].chips = [];
        setTimeout(function () {
            $("#script-src-chip-content").html("");
        }, 100);
    } else if (scriptInstance == undefined && $("#txt-scriptsrc").val().length == 0) {
        applySrcContainer("#txt-scriptsrc");
    }
});


$(document).on("keyup", "#font-src-content", function (e) {
    var fontInstance = document.getElementById("font-src-chip-content").ej2_instances;
    if (fontInstance != undefined && (fontInstance[0].chips == null || fontInstance[0].chips == 0)) {
        if ($("#txt-fontsrc").val() == "") {
            applySrcContainer("#txt-fontsrc");
        }
        fontInstance[0].chips = [];
        setTimeout(function () {
            $("#font-src-chip-content").html("");
        }, 100);
    } else if (fontInstance == undefined && $("#txt-fontsrc").val().length == 0) {
        applySrcContainer("#txt-fontsrc");
    }
});

$(document).on("keyup", "#img-src-content", function (e) {
    var imgSrcInstance = document.getElementById("img-src-chip-content").ej2_instances;
    if (imgSrcInstance != undefined && (imgSrcInstance[0].chips == null || imgSrcInstance[0].chips == 0)) {
        if ($("#txt-imgsrc").val() == "") {
            applySrcContainer("#txt-imgsrc");
        }
        imgSrcInstance[0].chips = [];
        setTimeout(function () {
            $("#img-src-chip-content").html("");
        }, 100);
    } else if (imgSrcInstance == undefined && $("#txt-imgsrc").val().length == 0) {
        applySrcContainer("#txt-imgsrc");
    }
});

$(document).on("keyup", "#connect-src-content", function (e) {
    var connectSrcInstance = document.getElementById("connect-src-chip-content").ej2_instances;
    if (connectSrcInstance != undefined && (connectSrcInstance[0].chips == null || connectSrcInstance[0].chips == 0)) {
        if ($("#txt-connectsrc").val() == "") {
            applySrcContainer("#txt-connectsrc")
        }
        connectSrcInstance[0].chips = [];
        setTimeout(function () {
            $("#connect-src-chip-content").html("");
        }, 100);
    } else if (connectSrcInstance == undefined && $("#txt-connectsrc").val().length == 0) {
        applySrcContainer("#txt-connectsrc");
    }
});

$(document).on("keyup", "#frame-src-content", function (e) {
    var frameSrcInstance = document.getElementById("frame-src-chip-content").ej2_instances;
    if (frameSrcInstance != undefined && (frameSrcInstance[0].chips == null || frameSrcInstance[0].chips == 0)) {
        if ($("#txt-framesrc").val() == "") {
            applySrcContainer("#txt-framesrc");
        }
        frameSrcInstance[0].chips = [];
        setTimeout(function () {
            $("#frame-src-chip-content").html("");
        }, 100);
    } else if (frameSrcInstance == undefined && $("#txt-framesrc").val().length == 0) {
        applySrcContainer("#txt-framesrc");
    }
});

$(document).on("keyup", "#frame-src-content", function (e) {
    var frameSrcInstance = document.getElementById("frame-src-chip-content").ej2_instances;
    if (frameSrcInstance != undefined && (frameSrcInstance[0].chips == null || frameSrcInstance[0].chips == 0)) {
        if ($("#txt-framesrc").val() == "") {
            applySrcContainer("#txt-framesrc");
        }
        frameSrcInstance[0].chips = [];
        setTimeout(function () {
            $("#frame-src-chip-content").html("");
        }, 100);
    } else if (frameSrcInstance == undefined && $("#txt-framesrc").val().length == 0) {
        applySrcContainer("#txt-framesrc");
    }
});
$(document).on("paste", "#txt-stylesrc", function (e) {
    var data = e.originalEvent.clipboardData.getData('Text').trim();
    var content = data.split(/[\s,;\r?\n]+/);
    if (content.length > 1) {
        for (var i = 0; i < content.length; i++) {
            var value = content[i];
            if (isSrcChipAlreadyExists(value, "style-src-chip-content") && value != "") {
                styleSrcChipData.push(value);
                srcChipConversion(styleSrcChipData, "style-src-chip-content", "#txt-stylesrc");
            }
        }
        setTimeout(function () {
            $("#txt-stylesrc").val("");
        }, 100);
    }
});

$(document).on("paste", "#txt-scriptsrc", function (e) {
    var data = e.originalEvent.clipboardData.getData('Text').trim();
    var content = data.split(/[\s,;\r?\n]+/);
    if (content.length > 1) {
        for (var i = 0; i < content.length; i++) {
            var value = content[i];
            if (isSrcChipAlreadyExists(value, "script-src-chip-content") && value != "") {
                scriptSrcChipData.push(value);
                srcChipConversion(scriptSrcChipData, "script-src-chip-content", "#txt-scriptsrc");
            }
        }
        setTimeout(function () {
            $("#txt-scriptsrc").val("");
        }, 100);
    }
});

$(document).on("paste", "#txt-fontsrc", function (e) {
    var data = e.originalEvent.clipboardData.getData('Text').trim();
    var content = data.split(/[\s,;\r?\n]+/);
    if (content.length > 1) {
        for (var i = 0; i < content.length; i++) {
            var value = content[i];
            if (isSrcChipAlreadyExists(value, "font-src-chip-content") && value != "") {
                fontSrcChipData.push(value);
                srcChipConversion(fontSrcChipData, "font-src-chip-content", "#txt-fontsrc");
            }
        }
        setTimeout(function () {
            $("#txt-fontsrc").val("");
        }, 100);
    }
});

$(document).on("paste", "#txt-imgsrc", function (e) {
    var data = e.originalEvent.clipboardData.getData('Text').trim();
    var content = data.split(/[\s,;\r?\n]+/);
    if (content.length > 1) {
        for (var i = 0; i < content.length; i++) {
            var value = content[i];
            if (isSrcChipAlreadyExists(value, "img-src-chip-content") && value != "") {
                imgSrcChipData.push(value);
                srcChipConversion(imgSrcChipData, "img-src-chip-content", "#txt-imgsrc");
            }
        }
        setTimeout(function () {
            $("#txt-imgsrc").val("");
        }, 100);
    }
});

$(document).on("paste", "#txt-connectsrc", function (e) {
    var data = e.originalEvent.clipboardData.getData('Text').trim();
    var content = data.split(/[\s,;\r?\n]+/);
    if (content.length > 1) {
        for (var i = 0; i < content.length; i++) {
            var value = content[i];
            if (isSrcChipAlreadyExists(value, "connect-src-chip-content") && value != "") {
                connectSrcChipData.push(value);
                srcChipConversion(connectSrcChipData, "connect-src-chip-content", "#txt-connectsrc");
            }
        }
        setTimeout(function () {
            $("#txt-connectsrc").val("");
        }, 100);
    }
});

$(document).on("paste", "#txt-framesrc", function (e) {
    var data = e.originalEvent.clipboardData.getData('Text').trim();
    var content = data.split(/[\s,;\r?\n]+/);
    if (content.length > 1) {
        for (var i = 0; i < content.length; i++) {
            var value = content[i];
            if (isSrcChipAlreadyExists(value, "frame-src-chip-content") && value != "") {
                frameSrcChipData.push(value);
                srcChipConversion(frameSrcChipData, "frame-src-chip-content", "#txt-framesrc");
            }
        }
        setTimeout(function () {
            $("#txt-framesrc").val("");
        }, 100);
    }
});

function objectConvertAsSrcDirectiveChip(inputValue, id) {
    if (inputValue.endsWith(",") || inputValue.endsWith(";") || inputValue.endsWith("\n")) {
        inputValue = inputValue.slice(0, -1).trim();
    }
    if (inputValue.length != 0) {
        if (isValidOrigin(inputValue)) {
            if (id == "txt-stylesrc") {
                if (isSrcChipAlreadyExists(inputValue, "style-src-chip-content")) {
                    styleSrcChipData.push(inputValue);
                    srcChipConversion(styleSrcChipData, "style-src-chip-content", "#txt-stylesrc");
                }
                $("#" + id).parent().next().html("");
            }
            else if (id == "txt-scriptsrc") {
                if (isSrcChipAlreadyExists(inputValue, "script-src-chip-content")) {
                    scriptSrcChipData.push(inputValue);
                    srcChipConversion(scriptSrcChipData, "script-src-chip-content", "#txt-scriptsrc");
                }
                $("#" + id).parent().next().html("");
            }
            else if (id == "txt-fontsrc") {
                if (isSrcChipAlreadyExists(inputValue, "font-src-chip-content")) {
                    fontSrcChipData.push(inputValue);
                    srcChipConversion(fontSrcChipData, "font-src-chip-content", "#txt-fontsrc");
                }
                $("#" + id).parent().next().html("");
            }
            else if (id == "txt-imgsrc") {
                if (isSrcChipAlreadyExists(inputValue, "img-src-chip-content")) {
                    imgSrcChipData.push(inputValue);
                    srcChipConversion(imgSrcChipData, "img-src-chip-content", "#txt-imgsrc");
                }
                $("#" + id).parent().next().html("");
            }
            else if (id == "txt-connectsrc") {
                if (isSrcChipAlreadyExists(inputValue, "connect-src-chip-content")) {
                    connectSrcChipData.push(inputValue);
                    srcChipConversion(connectSrcChipData, "connect-src-chip-content", "#txt-connectsrc");
                }
                $("#" + id).parent().next().html("");
            }
            else if (id == "txt-framesrc") {
                if (isSrcChipAlreadyExists(inputValue, "frame-src-chip-content")) {
                    frameSrcChipData.push(inputValue);
                    srcChipConversion(frameSrcChipData, "frame-src-chip-content", "#txt-framesrc");
                }
                $("#" + id).parent().next().html("");
            }
        }
        else {
            $("#" + id).val(inputValue);
            $("#" + id).parent().next().html(window.Server.App.LocalizationContent.ValidationMessage);
        }
    }
    else {
        ClearSettingsFields();
         }
}

function ClearSettingsFields() {
    $("#txt-stylesrc").val("");
    var scriptSrcInstance = document.getElementById("style-src-chip-content").ej2_instances;
    if (scriptSrcInstance == undefined && $("#txt-stylesrc").val().length == 0) {
        applySrcContainer("#txt-stylesrc");
    }
    $("#txt-scriptsrc").val("");
    var scriptSrcInstance = document.getElementById("script-src-chip-content").ej2_instances;
    if (scriptSrcInstance == undefined && $("#txt-scriptsrc").val().length == 0) {
        applySrcContainer("#txt-scriptsrc");
    }

    $("#txt-fontsrc").val("");
    var fontSrcInstance = document.getElementById("font-src-chip-content").ej2_instances;
    if (fontSrcInstance == undefined && $("#txt-fontsrc").val().length == 0) {
        applySrcContainer("#txt-fontsrc");
    }

    $("#txt-imgsrc").val("");
    var imgSrcInstance = document.getElementById("img-src-chip-content").ej2_instances;
    if (imgSrcInstance == undefined && $("#txt-imgsrc").val().length == 0) {
        applySrcContainer("#txt-imgsrc");
    }

    $("#txt-connectsrc").val("");
    var connectSrcInstance = document.getElementById("connect-src-chip-content").ej2_instances;
    if (connectSrcInstance == undefined && $("#txt-connectsrc").val().length == 0) {
        applySrcContainer("#txt-connectsrc");
    }

    $("#txt-framesrc").val("");
    var frameSrcInstance = document.getElementById("frame-src-chip-content").ej2_instances;
    if (frameSrcInstance == undefined && $("#txt-framesrc").val().length == 0) {
        applySrcContainer("#txt-framesrc");
    }
}

function isSrcChipAlreadyExists(obj, chipId) {
    if (chipId == "style-src-chip-content") {
        var styleSrcInstance = document.getElementById("style-src-chip-content").ej2_instances;
        if (styleSrcInstance != undefined && styleSrcInstance[0].chips != 0 && styleSrcInstance[0].chips != null) {
            for (i = 0; i < styleSrcInstance[0].chips.length; i++) {
                if (styleSrcInstance[0].chips[i].toLowerCase() == obj.toLowerCase()) {
                    $("#txt-stylesrc").val("");
                    return false;
                }
            }
        }
        return true;
    }
    else if (chipId == "script-src-chip-content") {
        var scriptSrcInstance = document.getElementById("script-src-chip-content").ej2_instances;
        if (scriptSrcInstance != undefined && scriptSrcInstance[0].chips != 0 && scriptSrcInstance[0].chips != null) {
            for (i = 0; i < scriptSrcInstance[0].chips.length; i++) {
                if (scriptSrcInstance[0].chips[i].toLowerCase() == obj.toLowerCase()) {
                    $("#txt-scriptsrc").val("");
                    return false;
                }
            }
        }
        return true;
    }
    else if (chipId == "font-src-chip-content") {
        var fontSrcInstance = document.getElementById("font-src-chip-content").ej2_instances;
        if (fontSrcInstance != undefined && fontSrcInstance[0].chips != 0 && fontSrcInstance[0].chips != null) {
            for (i = 0; i < fontSrcInstance[0].chips.length; i++) {
                if (fontSrcInstance[0].chips[i].toLowerCase() == obj.toLowerCase()) {
                    $("#txt-fontsrc").val("");
                    return false;
                }
            }
        }
        return true;
    }
    else if (chipId == "img-src-chip-content") {
        var imgSrcInstance = document.getElementById("img-src-chip-content").ej2_instances;
        if (imgSrcInstance != undefined && imgSrcInstance[0].chips != 0 && imgSrcInstance[0].chips != null) {
            for (i = 0; i < imgSrcInstance[0].chips.length; i++) {
                if (imgSrcInstance[0].chips[i].toLowerCase() == obj.toLowerCase()) {
                    $("#txt-imgsrc").val("");
                    return false;
                }
            }
        }
        return true;
    }
    else if (chipId == "connect-src-chip-content") {
        var connectSrcInstance = document.getElementById("connect-src-chip-content").ej2_instances;
        if (connectSrcInstance != undefined && connectSrcInstance[0].chips != 0 && connectSrcInstance[0].chips != null) {
            for (i = 0; i < connectSrcInstance[0].chips.length; i++) {
                if (connectSrcInstance[0].chips[i].toLowerCase() == obj.toLowerCase()) {
                    $("#txt-connectsrc").val("");
                    return false;
                }
            }
        }
        return true;
    }
    else if (chipId == "frame-src-chip-content") {
        var frameSrcInstance = document.getElementById("frame-src-chip-content").ej2_instances;
        if (frameSrcInstance != undefined && frameSrcInstance[0].chips != 0 && frameSrcInstance[0].chips != null) {
            for (i = 0; i < frameSrcInstance[0].chips.length; i++) {
                if (frameSrcInstance[0].chips[i].toLowerCase() == obj.toLowerCase()) {
                    $("#txt-framesrc").val("");
                    return false;
                }
            }
        }
        return true;
    }
}

function srcChipConversion(srcChipData, chipId, inputId) {
    if (inputId == "#txt-stylesrc") {
        if (!isStyleSrcChipBinded) {
            new ej.buttons.ChipList({ chips: srcChipData, enableDelete: true, delete: onStyleSrcChipDelete}, "#" + chipId);
            isStyleSrcChipBinded = true;
        } else {
            var styleSrcInstance = document.getElementById(chipId).ej2_instances;
            styleSrcInstance[0].chips = [];
            styleSrcInstance[0].chips = srcChipData;
            styleSrcInstance[0].createChip();
            styleSrcInstance[0].refresh();
        }
    }

    else if (inputId == "#txt-scriptsrc") {
        if (!isScriptSrcsChipBinded) {
            new ejs.buttons.ChipList({ chips: srcChipData, enableDelete: true, delete: onScriptSrcChipDelete}, '#script-src-chip-content');
            isScriptSrcsChipBinded = true;
        } else {
            var scriptSrcInstance = document.getElementById("script-src-chip-content").ej2_instances;
            scriptSrcInstance[0].chips = [];
            scriptSrcInstance[0].chips = scriptSrcChipData;
            scriptSrcInstance[0].createChip();
            scriptSrcInstance[0].refresh();
        }
    }

    else if (inputId == "#txt-fontsrc") {
        if (!isFontSrcChipBinded) {
            new ejs.buttons.ChipList({ chips: srcChipData, enableDelete: true, delete: onFontSrcChipDelete}, '#font-src-chip-content');
            isFontSrcChipBinded = true;
        } else {
            var fontSrcInstance = document.getElementById("font-src-chip-content").ej2_instances;
            fontSrcInstance[0].chips = [];
            fontSrcInstance[0].chips = fontSrcChipData;
            fontSrcInstance[0].createChip();
            fontSrcInstance[0].refresh();
        }
    }

    else if (inputId == "#txt-imgsrc") {
        if (!isImgSrcChipBinded) {
            new ejs.buttons.ChipList({ chips: srcChipData, enableDelete: true, delete: onImgSrcChipDelete}, '#img-src-chip-content');
            isImgSrcChipBinded = true;
        } else {
            var imgSrcInstance = document.getElementById("img-src-chip-content").ej2_instances;
            imgSrcInstance[0].chips = [];
            imgSrcInstance[0].chips = imgSrcChipData;
            imgSrcInstance[0].createChip();
            imgSrcInstance[0].refresh();
        }
    }

    else if (inputId == "#txt-connectsrc") {
        if (!isConnectSrcChipBinded) {
            new ejs.buttons.ChipList({ chips: srcChipData, enableDelete: true, delete: onConnectSrcChipDelete}, '#connect-src-chip-content');
            isConnectSrcChipBinded = true;
        } else {
            var connectSrcInstance = document.getElementById("connect-src-chip-content").ej2_instances;
            connectSrcInstance[0].chips = [];
            connectSrcInstance[0].chips = connectSrcChipData;
            connectSrcInstance[0].createChip();
            connectSrcInstance[0].refresh();
        }
    }

    else if (inputId == "#txt-framesrc") {
        if (!isFrameSrcChipBinded) {
            new ejs.buttons.ChipList({ chips: srcChipData, enableDelete: true, delete: onFrameSrcChipDelete}, '#frame-src-chip-content');
            isFrameSrcChipBinded = true
        } else {
            var frameSrcInstance = document.getElementById("frame-src-chip-content").ej2_instances;
            frameSrcInstance[0].chips = [];
            frameSrcInstance[0].chips = frameSrcChipData;
            frameSrcInstance[0].createChip();
            frameSrcInstance[0].refresh();
        }
    }

    if ($("#" + chipId).height() > 140) {
        var element = document.getElementById(chipId);
        element.scrollTop = element.scrollHeight;
    }
    removeSrcContainer(chipId, inputId);
}

function onStyleSrcChipDelete() {
    $("#txt-stylesrc").focus();
    setTimeout(function () {
        $(".style-src-validation").html("");
    }, 100);
    var styleSrcInstance = document.getElementById("style-src-chip-content").ej2_instances;
    if (styleSrcInstance[0].chips.length == 1) {
        applySrcContainer("#txt-stylesrc");
    }
}

function onScriptSrcChipDelete() {
    $("#txt-scriptsrc").focus();
    setTimeout(function () {
        $(".script-src-validation").html("");
    }, 100);
    var scriptSrcInstance = document.getElementById("script-src-chip-content").ej2_instances;
    if (scriptSrcInstance[0].chips.length == 1) {
        applySrcContainer("#txt-scriptsrc");
    }
}

function onFontSrcChipDelete() {
    $("#txt-fontsrc").focus();
    setTimeout(function () {
        $(".font-src-validation").html("");
    }, 100);
    var fontSrcInstance = document.getElementById("font-src-chip-content").ej2_instances;
    if (fontSrcInstance[0].chips.length == 1) {
        applySrcContainer("#txt-fontsrc");
    }
}

function onImgSrcChipDelete() {
    $("#txt-imgsrc").focus();
    setTimeout(function () {
        $(".img-src-validation").html("");
    }, 100);
    var imgSrcInstance = document.getElementById("img-src-chip-content").ej2_instances;
    if (imgSrcInstance[0].chips.length == 1) {
        applySrcContainer("#txt-imgsrc");
    }
}

function onConnectSrcChipDelete() {
    $("#txt-connectsrc").focus();
    setTimeout(function () {
        $(".connect-src-validation").html("");
    }, 100);
    var connectSrcInstance = document.getElementById("connect-src-chip-content").ej2_instances;
    if (connectSrcInstance[0].chips.length == 1) {
        applySrcContainer("#txt-connectsrc");
    }
}

function onFrameSrcChipDelete() {
    $("#txt-framesrc").focus();
    setTimeout(function () {
        $(".frame-src-validation").html("");
    }, 100);
    var frameSrcInstance = document.getElementById("frame-src-chip-content").ej2_instances;
    if (frameSrcInstance[0].chips.length == 1) {
        applySrcContainer("#txt-framesrc");
    }
}

function getSrcInstance(chipId) {
    var srcInstance = document.getElementById(chipId).ej2_instances;
    if (chipId == "style-src-chip-content") {
        if (srcInstance != undefined) {
            srcInstance[0].chips = [];
            applySrcContainer("#txt-stylesrc");
        }
    }
    else if (chipId == "script-src-chip-content") {
        if (srcInstance != undefined) {
            srcInstance[0].chips = [];
            applySrcContainer("#txt-scriptsrc");
        }
    }
    else if (chipId == "font-src-chip-content") {
        if (srcInstance != undefined) {
            srcInstance[0].chips = [];
            applySrcContainer("#txt-fontsrc");
        }
    }
    else if (chipId == "img-src-chip-content") {
        if (srcInstance != undefined) {
            srcInstance[0].chips = [];
            applySrcContainer("#txt-imgsrc");
        }
    }
    else if (chipId == "connect-src-chip-content") {
        if (srcInstance != undefined) {
            srcInstance[0].chips = [];
            applySrcContainer("#txt-connectsrc");
        }
    }
    else if (chipId == "frame-src-chip-content") {
        if (srcInstance != undefined) {
            srcInstance[0].chips = [];
            applySrcContainer("#txt-framesrc");
        }
    }
    $("#" + chipId).html("");
}

function applySrcContainer(inputId) {
    if (inputId == "#txt-stylesrc") {
        $("#txt-stylesrc").css("width", "100%").attr("placeholder", window.Server.App.LocalizationContent.CspPlaceHolder);
        $("#style-src-chip-content").hide();
        $(".style-src-validation").html("");
    }
    else if (inputId == "#txt-scriptsrc") {
        $("#txt-scriptsrc").css("width", "100%").attr("placeholder", window.Server.App.LocalizationContent.CspPlaceHolder);
        $("#script-src-chip-content").hide();
        $(".script-src-validation").html("");
    }
    else if (inputId == "#txt-fontsrc") {
        $("#txt-fontsrc").css("width", "100%").attr("placeholder", window.Server.App.LocalizationContent.CspPlaceHolder);
        $("#font-src-chip-content").hide();
        $(".font-src-validation").html("");
    }
    else if (inputId == "#txt-imgsrc") {
        $("#txt-imgsrc").css("width", "100%").attr("placeholder", window.Server.App.LocalizationContent.CspPlaceHolder);
        $("#img-src-chip-content").hide();
        $(".img-src-validation").html("");
    }
    else if (inputId == "#txt-connectsrc") {
        $("#txt-connectsrc").css("width", "100%").attr("placeholder", window.Server.App.LocalizationContent.CspPlaceHolder);
        $("#connect-src-chip-content").hide();
        $(".connect-src-validation").html("");
    }
    else if (inputId == "#txt-framesrc") {
        $("#txt-framesrc").css("width", "100%").attr("placeholder", window.Server.App.LocalizationContent.CspPlaceHolder);
        $("#frame-src-chip-content").hide();
        $(".frame-src-validation").html("");
    }
}

function removeSrcContainer(chipId, inputId) {
    $(inputId).css("width", "10%").removeAttr('placeholder').val("");
    $("#" + chipId).css("display", "inline");
}

$(document).on("click", "#update-csp-settings", function () {
    var contentSecurityPolicySettings = "";
    var styleSrcList = [];
    var scriptSrcList = [];
    var fontSrcList = [];
    var imgSrcList = [];
    var connectSrcList = [];
    var frameSrcList = [];

     if ($(".style-src-validation").text() != "" || $(".script-src-validation").text() != "" || $(".font-src-validation").text() != "" || $(".img-src-validation").text() != "" || $(".connect-src-validation").text() != "" || $(".frame-src-validation").text() != "") {
        return;
    }

    var styleSrcInstance = document.getElementById("style-src-chip-content").ej2_instances;
    if (styleSrcInstance != undefined) {
        styleSrcList = styleSrcInstance[0].chips;
        if (styleSrcList == null) {
            styleSrcList = [];
        }
    }

    var scriptSrcInstance = document.getElementById("script-src-chip-content").ej2_instances;
    if (scriptSrcInstance != undefined) {
        scriptSrcList = scriptSrcInstance[0].chips;
        if (scriptSrcList == null) {
            scriptSrcList = [];
        }
    }

    var fontSrcInstance = document.getElementById("font-src-chip-content").ej2_instances;
    if (fontSrcInstance != undefined) {
        fontSrcList = fontSrcInstance[0].chips;
        if (fontSrcList == null) {
            fontSrcList = [];
        }
    }

    var imgSrcInstance = document.getElementById("img-src-chip-content").ej2_instances;
    if (imgSrcInstance != undefined) {
        imgSrcList = imgSrcInstance[0].chips;
        if (imgSrcList == null) {
            imgSrcList = [];
        }
    }

    var connectSrcInstance = document.getElementById("connect-src-chip-content").ej2_instances;
    if (connectSrcInstance != undefined) {
        connectSrcList = connectSrcInstance[0].chips;
        if (connectSrcList == null) {
            connectSrcList = [];
        }
    }

    var frameSrcInstance = document.getElementById("frame-src-chip-content").ej2_instances;
    if (frameSrcInstance != undefined) {
        frameSrcList = frameSrcInstance[0].chips;
        if (frameSrcList == null) {
            frameSrcList = [];
        }
    }

    if ($("#enable-csp").is(":checked")) {
        contentSecurityPolicySettings = {
            EnableCSP: $("#enable-csp").is(":checked"),
            StyleSource: styleSrcList.toString(),
            ScriptSource: scriptSrcList.toString(),
            FontSource: fontSrcList.toString(),
            ImageSource: imgSrcList.toString(),
            ConnectSource: connectSrcList.toString(),
            FrameSource: frameSrcList.toString()
        };
    }

    var systemSettingsData = {
        ContentSecurityPolicy: contentSecurityPolicySettings
    };

    $.ajax({
        type: "POST",
        url: updateCSPSettingsUrl,
        data: { systemSettingsData: JSON.stringify(systemSettingsData) },
        success: function (result) {
            if (result.status) {
                SuccessAlert(window.Server.App.LocalizationContent.SecuritySettings, window.Server.App.LocalizationContent.SiteSettingsUpdated, 7000);
            } else {
                WarningAlert(window.Server.App.LocalizationContent.SecuritySettings, window.Server.App.LocalizationContent.SiteSettingsUpdateFalied, result.message, 7000);
            }
        }
    });
});

$(document).on("change", "#lax-cookie", function () {
    if ($("#lax-cookie").is(":checked")) {
        $(".cookie-notification").html(window.Server.App.LocalizationContent.LaxInformation);
        $(".cookie-notification").show();
    }
    else {
        $(".cookie-notification").hide();
    }
});

$(document).on("change", "#strict-cookie", function () {
    if ($("#strict-cookie").is(":checked")) {
        $(".cookie-notification").html(window.Server.App.LocalizationContent.StrictInformation);
        $(".cookie-notification").show();
    }
    else {
        $(".cookie-notification").hide();
    }
});

$(document).on("change", "#none-cookie", function () {
    if ($("#none-cookie").is(":checked")) {
        $(".cookie-notification").html(window.Server.App.LocalizationContent.NoneInformation.format("</br></br>", "<b>", "</b>"));
        $(".cookie-notification").show();
    }
    else {
        $(".cookie-notification").hide();
    }
});

function confirmation() {
    document.getElementById("samesite-dialog").ej2_instances[0].hide();
    var userSettings = {
        SameSiteAttribute: $("input:radio[name=cookie]:checked").val(),
    };
    $.ajax({
        type: "POST",
        url: updateCookieSettingsUrl,
        data: { systemSettingsData: userSettings },
        success: function (result) {
            if (result.status) {
                SuccessAlert(window.Server.App.LocalizationContent.SecuritySettings, window.Server.App.LocalizationContent.SiteSettingsUpdated, 7000);
                window.location.href = loginUrl;
            } else {
                WarningAlert(window.Server.App.LocalizationContent.SecuritySettings, window.Server.App.LocalizationContent.SiteSettingsUpdateFalied, result.message, 7000);
            }
        }
    });
}

$(document).on("click", "#update-cookie-settings", function () {
    document.getElementById("samesite-dialog").ej2_instances[0].show();
});