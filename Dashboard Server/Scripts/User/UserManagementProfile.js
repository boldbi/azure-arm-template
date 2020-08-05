var isKeyUp = false;
var isFreshLoad = true;
var userDetails;
var updatedIsolationCode = "";
var browser = ej.browserInfo();

$(document).ready(function () {
    var custompath;
    var currentDate = $.now();
    var uploadFileName;
    var extension;
    var ruleName;
    var rules;
    addPlacehoder("body");
    $("#avatar-upload-box").ejDialog({
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        width: "600px",
        enableModal: true,
        close: "DialogBoxClose",
        closeOnEscape: true,
        showHeader: false,
        showRoundedCorner: true
    });
    $("#userprofile-delete-confirmation").ejDialog({
        width: "400px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        height: "187px",
        enableModal: true,
        close: "onDeleteDialogClose",
        open: "onDeleteDialogOpen"
    });

    $.validator.addMethod("isValidEmail", function (value, element) {
        if (value.trim() == "") {
            return true;
        } else {
            return IsEmail(value);
        }
    }, window.Server.App.LocalizationContent.IsValidEmail);

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, window.Server.App.LocalizationContent.ItemNameValidator);

    $.validator.addMethod("isValidName", function (value, element) {
        return IsValidName("name", value);
    }, window.Server.App.LocalizationContent.AvoidSpecialCharactors);

    $.validator.addMethod("isValidPhoneNumber", function (value, element) {
        return IsValidContactNumber(value);
    }, window.Server.App.LocalizationContent.PhoneNumberValidator);

    $.validator.addMethod("isValidIsolationCode", function (value, element) {
        return ValidateIsolationCode(value);
    }, window.Server.App.LocalizationContent.IsolationCodeValidator);

    addPlacehoder("#user-phonenumber");

    $('.edit-user-isolation-form').validate({
        errorElement: 'span',
        onkeyup: function (element, event) {
            $("#isolation-validation-message").html("");
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false;
            }
            else
                true;
        },
        onfocusout: function (element) {
            $(element).valid();
            $("#isolation-validation-message").html("");
        },
        rules: {
            "isolation-code": {
                isValidIsolationCode: true
            }
        },
        highlight: function (element) {
            var read = $("#" + element.id).not(":disabled");
            if (read) {
                $(element).closest('div').addClass("has-error");
            }
        },
        unhighlight: function (element) {
            $(element).closest("div").removeClass('has-error');
            $(element).closest("div").find("span").html("");
        },
        errorPlacement: function (error, element) {
            var read = $("#" + element.context.id).not(":disabled");
            if (read) {
                $(element).closest('div').find("span").html(error.html());
            }
        }
    });

    $('.edit-user-profile-form').validate({
        errorElement: 'span',
        onkeyup: function (element, event) {
            $("#updation-validation-message").html("");
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false
            }
            else
                true;
        },
        onfocusout: function (element) {
            $(element).valid();
            $("#updation-validation-message").html("");
        },
        rules: {
            "user-email": {
                isValidName: true,
                isValidEmail: true
            },
            "user-firstname": {
                isRequired: true,
                isValidName: true
            },
            "user-lastname": {
                isValidName: true
            },
            "user-phonenumber": {
                isValidPhoneNumber: true
            }
        },
        highlight: function (element) {
            var read = $("#" + element.id).not(":disabled");
            if (read) {
                $(element).closest('div').addClass("has-error");
            }
        },
        unhighlight: function (element) {
            $(element).closest("div").removeClass('has-error');
            $(element).closest("div").find("span").html("");
        },
        errorPlacement: function (error, element) {
            var read = $("#" + element.context.id).not(":disabled");
            if (read) {
                $(element).closest('div').find("span").html(error.html());
            }
        },
        messages: {
            "user-firstname": {
                isRequired: window.Server.App.LocalizationContent.FirstNameValidator
            }
        }

    });

    $("#new-password").bind("keyup", function () {
        if ($("#new-password").val() == $("#confirm-password").val()) {
            $("#confirm-password").closest('div').removeClass('has-error');
            $("#confirm-password").closest('tr').next("tr").find("span").html("");
        }
        else if ($("#confirm-password").val() != '') {
            $("#confirm-password").closest('div').addClass("has-error");
            $("#confirm-password").closest('div').next("div").find("span").html(window.Server.App.LocalizationContent.PasswordMismatch).css("display", "block");
        }
        createPasswordPolicyRules();
    });

    $.validator.addMethod("isUserPassword", function (value, element) {
        var validateMethods = new Array();
        validateMethods.push(validateUserpassword.p_policy_uppercase);
        validateMethods.push(validateUserpassword.p_policy_lowercase);
        validateMethods.push(validateUserpassword.p_policy_number);
        validateMethods.push(validateUserpassword.p_policy_specialcharacter);
        validateMethods.push(validateUserpassword.p_policy_length);
        for (var n = 0; n < validateMethods.length; n++) {
            var currentMethodName = validateMethods[n];
            if (currentMethodName(value) != "" && currentMethodName(value) != undefined) {
                ruleName = currentMethodName(value);
                if ($('#password_policy_rules').find('li#' + ruleName + ' span').attr("class") != "su-tick") {
                    $('#password_policy_rules').find('li#' + ruleName + ' span').addClass("su su-tick").removeClass("su su-close");
                    $('#password_policy_rules').find('li#' + ruleName).addClass("clear-error");
                    ruleName = ""
                }
            }
            else {
                ruleName = name;
                $(element).closest('div').addClass("has-error");
                if ($('#password_policy_rules').find('li#' + ruleName + ' span').attr("class") == "su-tick") {
                    $('#password_policy_rules').find('li#' + ruleName + ' span').addClass("su su-close").removeClass("su-tick");
                    $('#password_policy_rules').find('li#' + ruleName).removeClass("clear-error");
                    ruleName = "";
                }
            }
        }
        if ($('#password_policy_rules li>span.su-tick').length == $('#password_policy_rules').find('li>span').length)
            return true;
    }, "");
    $('.change-password-form').validate({
        errorElement: 'span',
        onkeyup: function (element, event) {
            $("#success-message").html("");
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false;
            }
            else
                true;
        },
        onfocusout: function (element) { $(element).valid(); $("#success-message").html(""); },
        rules: {
            "new-password": {
                required: true,
                isUserPassword: true
            },
            "confirm-password": {
                required: true,
                equalTo: "#new-password"
            }

        },
        highlight: function (element) {
            $(element).closest('div').addClass("has-error");
            if ($(element).attr('id') == "new-password") {
                for (var i = 0; i < $('#password_policy_rules').find('li>span').length; i++) {
                    if ($($('#password_policy_rules').find('li>span')[i]).attr('class') == "su-tick")
                        $(element).closest('div').removeClass("has-error");
                    else
                        rules = "unsatisfied-rule";
                }
                if (rules != "" && rules != undefined) {
                    $(element).closest('div').addClass("has-error");
                    rules = "";
                }
            }
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('has-error');
            if ($(element).attr('id') == "new-password") {
                for (var i = 0; i < $('#password_policy_rules').find('li>span').length; i++) {
                    if ($($('#password_policy_rules').find('li>span')[i]).attr('class') != "su-tick")
                        rules = "unsatisfied-rule";
                    if ($($('#password_policy_rules').find('li>span')[i]).attr('class') == "su-tick")
                        $(element).closest('div').removeClass("has-error");
                }
                if (rules != "" && rules != undefined) {
                    $(element).closest('div').addClass("has-error");
                    rules = "";
                }
            }
            $(element).closest('div').find(".password-validate-holder").html("");
        },
        errorPlacement: function (error, element) {
            $(element).closest('div').find(".password-validate-holder").html(error.html());
        },
        messages: {
            "new-password": {
                required: window.Server.App.LocalizationContent.NewPasswordValidator,
            },
            "confirm-password": {
                required: window.Server.App.LocalizationContent.ConfirmNewPasswordValidator,
                equalTo: window.Server.App.LocalizationContent.PasswordMismatch
            }
        }
    });



    $('#new-password').on("change", function () {
        createPasswordPolicyRules();
        $("#new-password").valid();
    });
    function createPasswordPolicyRules() {
        if ($("#new-password").val() != '' && $("#new-password").next("ul").length == 0) {
            $("#new-password").after("<ul id='password_policy_rules'></ul>");
            $("#password_policy_rules").append("<li id='p_policy_heading'>" + window.Server.App.LocalizationContent.PasswordRule1 + "</li>")
            $("#password_policy_rules").append("<li id='p_policy_length'><span class='su su-close'></span>" + window.Server.App.LocalizationContent.PasswordRule2 + "</li>")
            $("#password_policy_rules").append("<li id='p_policy_uppercase'><span class='su su-close'></span>" + window.Server.App.LocalizationContent.PasswordRule3 + "</li>")
            $("#password_policy_rules").append("<li id='p_policy_lowercase'><span class='su su-close'></span>" + window.Server.App.LocalizationContent.PasswordRule4 + "</li>")
            $("#password_policy_rules").append("<li id='p_policy_number'><span class='su su-close'></span>" + window.Server.App.LocalizationContent.PasswordRule5 + "</li>")
            $("#password_policy_rules").append("<li id='p_policy_specialcharacter'><span class='su su-close'></span>" + window.Server.App.LocalizationContent.PasswordRule6 + "</li>")
            if (($(parent.window).width()) > 1400) {
                $("#confirm-password-section").css("margin-top", "-103px")
            }
            if (($(parent.window).width()) < 1400) {
                $("#confirm-password-section").css("margin-top", "-73px")
            }
        }
        if ($("#new-password").val() == '' && $("#new-password").next("ul").length != 0) {
            $("#new-password").next("ul").remove();
            $("#confirm-password-section").css("margin-top", "5px")
        }
    }

    $(".edit-user-profile-field").bind("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            SaveUserdetails();
            return false;
        }
    });

    $(".password-fields-user-profile-edit").bind("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            onUserChangePasswordClick();
            this.blur();
            return false;
        }
    });

    $("#isolation-code.edit-isolation-code").bind("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            saveIsolationCode();
            return false;
        }
    });

    $('#upload-image').click(function () {
        var isUpdated = $(".img-container").children("img").attr("src");
        var userId = $("#user-id").val();
        var isNewFile = false;

        if (isUpdated != dashboardServerResourceUrl + "/images/preview.jpg") {
            isNewFile = true;

            var data =
                {
                    "selection.LeftOfCropArea": parseInt($('input[name=LeftOfCropArea]').val()),
                    "selection.TopOfCropArea": parseInt($('input[name=TopOfCropArea]').val()),
                    "selection.LeftToCropArea": parseInt($('input[name=LeftToCropArea]').val()),
                    "selection.TopToCropArea": parseInt($('input[name=TopToCropArea]').val()),
                    "selection.height": parseInt($('input[name=height]').val()),
                    "selection.width": parseInt($('input[name=width]').val()),
                    "selection.UserId": userId,
                    "selection.ImageName": $("#image").val(),
                    "selection.IsNewFile": isNewFile
                };

            $.ajax({
                type: "POST",
                data: JSON.stringify(data),
                url: updateprofilepictureUrl,
                contentType: "application/json; charset=utf-8",
                beforeSend: ShowWaitingProgress("#avatar-upload-box", "show"),
                dataType: "json",
                success: function (result) {
                    var isLoggedUser = $("#logged-user").html().toLowerCase();
                    parent.messageBox("su-image", window.Server.App.LocalizationContent.ChangeAvatar, window.Server.App.LocalizationContent.AvatarUpdateSuccess, "success", function () {
                        parent.$("#user-profile-picture").attr("src", avatarUrl + "?email=" + $("#user-email").val() + "&imageSize=110&v=" + $.now());
                        if ($("#user-name").val() == isLoggedUser) {
                            parent.$(".profile-picture,#profile-picture-menu").find("img").attr("src", avatarUrl + "?email=" + $("#user-email").val() + "&imageSize=32&v=" + $.now());
                        }
                        var value = parent.$("#avatar-delete-click").length;
                        if (value == 0) {
                            $(".img-view-holder").on("mouseenter", function () {
                                if ($("#avatar-delete-click").length == 0) {
                                    $("<span>", { class: "su su-delete", id: "avatar-delete-click", title: window.Server.App.LocalizationContent.DeleteAvatar }).insertAfter("#avatar-button-click").addClass("profile-picture-edit-button").css("left", "86px");
                                }
                            });
                            $(".img-view-holder").on("mouseleave", function () {
                                $("#avatar-delete-click").css("display", "none");
                            });
                        }
                        parent.onCloseMessageBox();
                    });
                    $("#image-path").val("browse image path");
                    $("#profile-picture").attr("src", dashboardServerResourceUrl + "/images/preview.jpg");
                    $('#upload-image').attr("disabled", "disabled");
                    if ($(".img-container").children().hasClass("jcrop-active")) {
                        $('#profile-picture').data('Jcrop').destroy();
                    }
                    $("#avatar-upload-box").ejDialog("close");
                    ShowWaitingProgress("#avatar-upload-box", "hide");
                },
                error: function (result) {
                    parent.messageBox("su-open", window.Server.App.LocalizationContent.ChangeAvatar, window.Server.App.LocalizationContent.AvatarUpdateError, "error", function () {
                        parent.onCloseMessageBox();
                    });
                }
            });
        }
    });

    $(document).on("click", "#avatar-delete-click", function () {
        messageBox("su-delete", window.Server.App.LocalizationContent.DeleteAvatar, window.Server.App.LocalizationContent.AvatarDelete, "error", function () {
            deleteUserAvatar();
        });
    });

    $("#avatar-button-click").click(function () {
        $("#image-path").val("browse image path").removeClass("ValidationErrorImage");
        $("#image-path").closest("div").removeClass("has-error");
        $("#avatar-upload-box").ejDialog("open");
        $("#cancel-avatar-popup").click(function () {
            $("#profile-picture").attr("src", dashboardServerResourceUrl + "/images/preview.jpg");
            $('#upload-image').attr("disabled", "disabled");
            if ($(".img-container").children().hasClass("jcrop-active")) {
                $('#profile-picture').data('Jcrop').destroy();
            }
            $("#avatar-upload-box").ejDialog("close");
        });

        $('.e-uploadinput').attr({ title: window.Server.App.LocalizationContent.UploadSelect, accept: ".png, .jpg ,.jpeg" });

        if (browser.name.toLowerCase() == "msie" || browser.name.toLowerCase() == "webkit") {
            $(".e-selectpart").addClass("upload-box");
        }
        else {
            $(".e-selectpart").removeClass("upload-box");
        }
    });

    $("#upload-picture").ejUploadbox({
        saveUrl: window.fileUploadUrl + "?imageType=profileimage&&email=" + $("#user-email").val() + "&&timeStamp=" + currentDate,
        autoUpload: true,
        showFileDetails: false,
        fileSize: 31457280,
        extensionsAllow: ".PNG,.png,.jpg,.JPG,.jpeg,.JPEG",
        extensionsDeny: "",
        buttonText: { browse: "..." },
        begin: function () {
            ShowWaitingProgress("#avatar-upload-box", "show");
        },
        fileSelect: function (e) {
            currentDate = $.now();
            extension = e.files[0].extension.toLowerCase();
            uploadFileName = e.files[0].name;
            this.model.saveUrl = fileUploadUrl + "?imageType=profileimage&&email=" + $("#user-email").val() + "&&timeStamp=" + currentDate;
        },
        error: function (e) {
            if (extension != ".png" && extension != ".jpg" && extension != ".jpeg") {
                $("#image-path").val(window.Server.App.LocalizationContent.InValidFileFormat).addClass("ValidationErrorImage");
                $("#image-path").closest("div").addClass("has-error");
                $(".e-uploadinput").val("").attr("title", window.Server.App.LocalizationContent.UploadSelect);
            }
        },
        complete: function fileselect(e) {
            var filename = "profile_picture_" + currentDate + ".png";
            filename = filename.replace('"', '');
            $("#image-path").removeClass("ValidationErrorImage");
            $("#image").removeClass("ValidationErrorImage").val(filename);
            $("#image-path").closest("div").removeClass("has-error");
            custompath = filename;
            $("#upload-picture").attr("data-filename", filename);
            $('.e-uploadinput').attr('title', uploadFileName);
            $("#image-path").closest("div").removeClass("has-error");
            $("#image-path").val(uploadFileName);
            $(".jcrop-selection.jcrop-current").children("button").css("background", "");
            $("#profile-picture").attr("src", dashboardServerResourceUrl + "/images/profilepictures/" + $("#user-name").val() + "/" + filename + "?v=" + $.now());
            var cb, filter;

            jQuery(function ($) {
                var CircleSel = function () { };
                CircleSel.prototype = new $.Jcrop.component.Selection();

                $.extend(CircleSel.prototype, {
                    zoomscale: 1,
                    attach: function () {
                        this.frame.css({
                            background: 'url(' + $('#profile-picture')[0].src.replace('750', '750') + ')'
                        });
                    },
                    positionBg: function (b) {
                        var midx = (b.x + b.x2) / 2;
                        var midy = (b.y + b.y2) / 2;
                        var ox = (-midx * this.zoomscale) + (b.w / 2);
                        var oy = (-midy * this.zoomscale) + (b.h / 2);
                        this.frame.css({ backgroundPosition: -(b.x + 1) + 'px ' + (-b.y - 1) + 'px' });
                    },
                    redraw: function (b) {
                        $.Jcrop.component.Selection.prototype.redraw.call(this, b);

                        this.positionBg(this.last);
                        return this;
                    },
                    prototype: $.Jcrop.component.Selection.prototype
                });
                var jcrop_api;
                $('#profile-picture').Jcrop({

                    selectionComponent: CircleSel,
                    applyFilters: ['constrain', 'extent', 'backoff', 'ratio', 'round'],
                    aspectRatio: 1,
                    setSelect: [25, 25, 100, 100],
                    handles: ['n', 's', 'e', 'w'],

                    dragbars: [],
                    borders: [],
                    onChange: function (coordinates) {
                        onPictureCropEnd(coordinates);
                    }
                }, function () {
                    this.container.addClass('jcrop-circle-demo');
                    interface_load(this);
                    jcrop_api = this;
                });

                function interface_load(obj) {
                    cb = obj;
                    cb.container.append($('<div />').addClass('custom-shade'));

                    function random_coords() {
                        return [
                            Math.random() * 300,
                            Math.random() * 200,
                            (Math.random() * 540) + 50,
                            (Math.random() * 340) + 60
                        ];
                    }
                    $(document.body).on('click', '[data-setting]', function (e) {
                        var $targ = $(e.target),
                            setting = $targ.data('setting'),
                            value = $targ.data('value'),
                            opt = {};

                        opt[setting] = value;
                        cb.setOptions(opt);

                        $targ.closest('.btn-group').find('.active').removeClass('active');
                        $targ.addClass('active');

                        if ((setting == 'multi') && !value) {
                            var m = cb.ui.multi, s = cb.ui.selection;

                            for (var i = 0; i < m.length; i++)
                                if (s !== m[i]) m[i].remove();

                            cb.ui.multi = [s];
                            s.focus();
                        }

                        e.preventDefault();
                    });

                    $(document.body).on('click', '[data-action]', function (e) {
                        var $targ = $(e.target);
                        var action = $targ.data('action');

                        switch (action) {
                            case 'random-move':
                                cb.ui.selection.animateTo(random_coords());
                                break;
                        }

                        cb.ui.selection.refresh();

                    }).on('selectstart', function (e) {
                        e.preventDefault();
                    }).on('click', 'a[data-action]', function (e) {
                        e.preventDefault();
                    });
                }

            });
            ShowWaitingProgress("#avatar-upload-box", "hide");
            $('#upload-image').removeAttr("disabled");
        }
    });

    window.addEventListener("popstate", function (e) {
        var query = window.location.search.contains("tab") ? window.location.search.split("&")[1] : window.location.search;
        if (query.contains("tab=profile")) {
            $("#user-profile").attr("href", "#user-profile-tab");
            $('a[href="#user-profile-tab"]').tab("show");
        }
        else if (query.contains("tab=attributes")) {
            $("#user-attribute").attr("href", "#user-attribute-tab");
            $('a[href="#user-attribute-tab"]').tab("show");
        }
        else {
            $("#user-profile").attr("href", "#user-profile-tab");
            $('a[href="#user-profile-tab"]').tab("show");
        } 
    });
});

function activateDeactivateUser(statusToBeUpdated) {
    ShowWaitingProgress("#content-area", "show");
    $.ajax({
        type: "POST", url: activateDeactivateUserUrl, data: { email: $("#user-email").val(), status: statusToBeUpdated },
        success: function (data) {
            if ($.type(data) == "object") {
                if (data.Data.result == "success") {

                    $(".deactivate-user-option").removeClass("show").addClass("hide");
                    if (statusToBeUpdated) {
                        $(".activate-user-option").removeClass("show").addClass("hide");
                        $(".deactivate-user-option").removeClass("hide").addClass("show");
                        $("#status-user").val(window.Server.App.LocalizationContent.Active);
                        SuccessAlert(window.Server.App.LocalizationContent.ActivateUser, window.Server.App.LocalizationContent.UserActivated, 7000);
                    }
                    else {
                        $(".activate-user-option").removeClass("hide").addClass("show");
                        $(".deactivate-user-option").removeClass("show").addClass("hide");
                        $("#status-user").val(window.Server.App.LocalizationContent.Inactive);
                        SuccessAlert(window.Server.App.LocalizationContent.DeactivateUser, window.Server.App.LocalizationContent.UserDeactivated, 7000);
                    }

                }
                else if (data.IsUserLimitExceed) {
                    $("#limit-user").ejDialog("open");
                    $("#user-account-activation .licensed-user-count").html(data.LicenseUserCount);
                    $("#user-account-activation").show();
                }
                else {
                    WarningAlert(statusToBeUpdated ? window.Server.App.LocalizationContent.ActivateUser : window.Server.App.LocalizationContent.DeactivateUser, window.Server.App.LocalizationContent.InternalServerError, 7000);
                }
            }

            ShowWaitingProgress("#content-area", "hide");
        }
    });
}

function onResendActivationClick() {
    ShowWaitingProgress("#content-area", "show");
    $.ajax({
        type: "POST", url: resendactivationcodeUrl, data: { email: $("#user-email").val() },
        success: function (data) {
            if ($.type(data) == "object") {
                if (data.Data.result == "success") {
                    SuccessAlert(window.Server.App.LocalizationContent.ResendActivationCode, window.Server.App.LocalizationContent.ActivationCodeSent, 7000);
                }
                else if (data.IsUserLimitExceed) {
                    $("#limit-user").ejDialog("open");
                    $("#user-account-activation .licensed-user-count").html(data.LicenseUserCount);
                    $("#user-account-activation").show();
                }
                else {
                    WarningAlert(window.Server.App.LocalizationContent.ResendActivationCode, window.Server.App.LocalizationContent.InternalServerError, 7000);
                }
            }

            ShowWaitingProgress("#content-area", "hide");
        }
    });
}

function successMessage() {
    if ($("#invalid-firstname, #invalid-lastname, #invalid-email").css("display") == "block") {
        $("#updation-validation-message").css("display", "none");
    }
}


function onUserChangePasswordClick() {
    var userId = $("#user-id").val();
    $(".password-validate-holder").html("");
    $("#new-password-validate, #confirm-password-validate").closest("div").prev("div").removeClass("has-error");
    var isValid = true;
    isValid = $('.change-password-form').valid();

    if (isValid && $("#new-password").val() != $("#confirm-password").val()) {
        $("#confirm-password-validate").html(window.Server.App.LocalizationContent.PasswordMismatch);
        $("#confirm-password-validate").closest("div").prev("div").addClass("has-error");
        isValid = false;
    }

    if (isValid == false) {
        return;
    }

    ShowWaitingProgress("#content-area", "show");
    doAjaxPost('POST', UpdatePasswordUrl, { newpassword: $("#new-password").val(), confirmpassword: $("#confirm-password").val(), userId: $("#user-id").val() },
        function (result) {
            $("input[type='password']").val("");
            ShowWaitingProgress("#content-area", "hide");
            $("#password_policy_rules").remove();
            $("#confirm-password-section").removeAttr("style");
            if (!result.Data.status && result.Data.key == "password") {
                $("#old-password-validate").html(result.Data.value);
                $("#old-password-validate").closest("div").prev("div").addClass("has-error");
            }
            else if (!result.Data.status) {
                WarningAlert(window.Server.App.LocalizationContent.UpdatePassword, window.Server.App.LocalizationContent.PasswordFailure, 7000);
            }
            else {
                SuccessAlert(window.Server.App.LocalizationContent.UpdatePassword, window.Server.App.LocalizationContent.PasswordSuccess, 7000);
            }
        }
    );

}
function editUser(fulldata) {
    var specficuserdetails = fulldata;
    userDetails = fulldata;
    $("#user-email").val(specficuserdetails.Email);
    $("#user-head").html(specficuserdetails.FirstName + " " + specficuserdetails.LastName);
    $("#status-user").val(specficuserdetails.StatusDescription);
    $("#activation-div").val();

    if (fulldata.FirstName != null && fulldata.FirstName != "") {
        $("#user-firstname").val(fulldata.FirstName);
    }
    else {
        $("#user-firstname").val(specficuserdetails.FullName);
    }
    if (fulldata.LastName != null && fulldata.LastName != "") {
        $("#user-lastname").val(fulldata.LastName);
    }
    if (fulldata.ContactNumber != null && fulldata.ContactNumber != "") {
        $("#user-phonenumber").val(fulldata.ContactNumber);
    }
}
function SaveUserdetails() {
    $("#updation-validaton-message").html("");
    $("#email-duplicate-validation").closest("div").prev("div").removeClass("has-error");
    var firstName = $("#user-firstname").val().trim();
    var emailid = $('#user-email').val().trim();
    var isValid = $('.edit-user-profile-form').valid();
    if (isValid) {
        $(".userprofile-validation-messages").css("display", "none");
        var userStatus = $("#user-status").val();
        ShowWaitingProgress("#content-area", "show");
        doAjaxPost('POST',
            updateUserProfileUrl,
            {
                email: emailid,
                picturename: $("#upload-picture").attr("data-filename"),
                firstname: firstName,
                lastname: $("#user-lastname").val(),
                mobile: $("#user-phonenumber").val().trim()
            },
            function (result) {
                ShowWaitingProgress("#content-area", "hide");
                if (result.Data.status) {
                    var updateddetails = result.Data.profileinfo;
                    var updatedfirstname = (updateddetails.firstName != null) ? $("#user-firstname").val(updateddetails.firstName) : $("#user-firstname").val(updateddetails.previousFirstName);
                    var updatedlastname = (updateddetails.lastName != null) ? $("#user-lastname").val(updateddetails.lastName) : $("#user-lastname").val(updateddetails.previousLastName);
                    var updatedemail = (updateddetails.email != null) ? $("#user-email").val(updateddetails.email) : $("#user-email").val(updateddetails.previousMail);
                    var updatedmobile = (updateddetails.mobile != null) ? $("#user-phonenumber").val(updateddetails.mobile) : $("#user-phonenumber").val(updateddetails.previousMobile);
                    var displayName = $("#user-firstname").val() + " " + $("#user-lastname").val();
                    $("#profile-name-text").attr("data-display-name", displayName);
                    $("#profile-name-text").attr("data-original-title", displayName);
                    generateProfileAvatar();
                    userDetails = {
                        FirstName: updatedfirstname.val(),
                        LastName: updatedlastname.val(),
                        ContactNumber: updatedmobile.val(),
                        Email: updatedemail.val()
                    };
                    SuccessAlert(window.Server.App.LocalizationContent.UpdateProfile, result.Data.value, 7000);

                    $("#password-updation-validation").css("display", "none");
                    $(".userpassword-validation-messages").css("display", "none");
                    $("#new-password-validate").closest("div").prev("div").removeClass("has-error");
                    $("#confirm-password-validate").closest("div").prev("div").removeClass("has-error");
                    if (result.Data.isCurrentUser) {
                        $("#display-name").html(updatedfirstname.val() + " " + updatedlastname.val().trim());
                    }
                    $("#display-name").html(updatedfirstname.val() + " " + updatedlastname.val().trim());

                }
                else if (!result.Data.status && result.Data.key == "email") {
                    $("#email-duplicate-validation").html(result.Data.value).css("display", "block");
                    $("#email-duplicate-validation").closest("div").prev("div").addClass("has-error");
                } else {
                    WarningAlert(window.Server.App.LocalizationContent.UpdateProfile, result.Data.value, 7000);
                    $("#password-updation-validation").css("display", "none");
                    $(".userpassword-validation-messages").css("display", "none");
                }

            }

        );
        $(".edit-user-profile-field").attr("disabled", true).removeClass("enable");
        $("#save-button,#cancel-button,#status-dom").hide();
        $("#edit,#group-div,#status-show").show();
        $("#status-div").removeClass("top-margin");
    }
}

function saveIsolationCode() {
    $("#isolation-validaton-message").html("");
    var emailid = $('#user-email').val().trim();
    var isValid = $('.edit-user-isolation-form').valid();
    if (isValid) {
        ShowWaitingProgress("#content-area", "show");
        doAjaxPost('POST',
            saveIsolationCodeUrl,
            {
                email: emailid,
                isolationcode: $("#isolation-code").val()
            },
            function (result) {
                ShowWaitingProgress("#content-area", "hide");
                if (result.status) {
                    updatedIsolationCode = result.updatedValue != null ? result.updatedValue : updatedIsolationCode;
                    $("#isolation-code").val(updatedIsolationCode);
                    SuccessAlert(window.Server.App.LocalizationContent.IsolationCode, result.statusMessage, 7000);
                } else {
                    WarningAlert(window.Server.App.LocalizationContent.IsolationCode, result.statusMessage, 7000);
                }
            });
    }

    $("#isolation-code-validation.alert-messages").closest("div").removeClass("has-error form-control");
    $("#isolation-code-validation.alert-messages").html("");
    $("#isolation-code").val(updatedIsolationCode).attr("disabled", true).removeClass("enable");
    $("#save-cancel-buttons").hide();
    $("#edit-isolation").show();
}
function cancelIsolationCode() {
    $("#save-cancel-buttons").hide();
    $("#edit-isolation").show();
    $("#isolation-code").val(updatedIsolationCode).attr("disabled", true).removeClass("enable");
    $("#isolation-code-validation.alert-messages").closest("div").removeClass("has-error form-control");
    $("#isolation-code-validation.alert-messages").html("");
}

function onPictureCropEnd(coordinates) {
    $("input[name=LeftOfCropArea]").val(coordinates.x);
    $("input[name=TopOfCropArea]").val(coordinates.y);
    $("input[name=LeftToCropArea]").val(coordinates.x2);
    $("input[name=TopToCropArea]").val(coordinates.y2);
    $("input[name=height]").val(coordinates.h);
    $("input[name=width]").val(coordinates.w);
}

function editIsolationMethod() {
    $("#isolation-code").attr("disabled", false).addClass("enable");
    $("#edit-isolation").hide();
    $("#save-cancel-buttons").show();
    updatedIsolationCode = $("#isolation-code").val();
}

$(document).on("click", "#edit", function (e) {
    $("#save-button,#status-dom").show();
    $("#cancel-button").css("display", "inline");
    $("#group-div,#edit,#activation-div").hide();
    $("#status-div").addClass("top-margin");
    $("#show-active,#show-inactive,#show-active-user").find("span").addClass("margin-top");
    $(".edit-user-profile-field").attr("disabled", false).addClass("enable");
});

$(document).on("click", "#cancel-button", function (e) {
    $("#user-firstname").val(userDetails.FirstName);
    $("#user-email").val(userDetails.Email);
    $("#user-lastname").val(userDetails.LastName);
    $("#user-phonenumber").val(userDetails.ContactNumber);
    $("#status-div").removeClass("top-margin");
    $("#show-active,#show-inactive,#show-active-user").find("span").removeClass("margin-top");
    $(".alert-messages").closest("div").removeClass("has-error form-control");
    $(".alert-messages").html("");
    $(".edit-user-profile-field").attr("disabled", true).removeClass("enable");
    $("#save-button,#status-dom,#cancel-button").hide();
    $("#edit, #status-show, #group-div,#activation-div").show();
    if ($("#status-user").val == "Active") {
        $("#activate-button-click").hide();
    }
});

$(document).on("shown.bs.tab", 'a[data-toggle="tab"]', function (e) {
    var target = $(e.target).attr("href"); // activated tab
    var data;

    if (target.indexOf("#user-profile-tab") !== -1) {
        data = "profile";
    }
    else if (target.indexOf("#user-attribute-tab") !== -1) {
        data = "attributes";
    }
    pushUrl(data);
});

function pushUrl(data) {
    if (isFreshLoad) {
        history.replaceState(data, null, window.location.pathname + window.location.search.split("&")[0] + "&tab=" + data);
        isFreshLoad = false;
    }
    else {
        history.pushState(data, null, window.location.pathname + window.location.search.split("&")[0] + "&tab=" + data);
    }  
}