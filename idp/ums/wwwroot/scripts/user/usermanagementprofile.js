var isKeyUp = false;
var userDetails;
//var browser = ej.browserInfo();
$(document).ready(function () {
    var custompath;
    var currentDate = $.now();
    var uploadFileName;
    var extension;
    var ruleName;
    var rules;
    addPlacehoder("body");

    // Yet to convert from EJ1 to EJ2
    //$("#avatar-upload-box").ejDialog({
    //    showOnInit: false,
    //    allowDraggable: true,
    //    enableResize: false,
    //    width: "600px",
    //    enableModal: true,
    //    close: "DialogBoxClose",
    //    closeOnEscape: true,
    //    showHeader: false,
    //    showRoundedCorner: true
    //});
    
    $.validator.addMethod("isValidEmail", function (value, element) {
        if (value.trim() == "") {
            return true;
        } else {
            return IsEmail(value);
        }
    }, window.TM.App.LocalizationContent.InvalidEmailAddress);

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, window.TM.App.LocalizationContent.EnterName);

    $.validator.addMethod("isValidName", function (value, element) {
        return IsValidName("name", value);
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters);

    $.validator.addMethod("isValidUsername", function (value, element) {
        return IsValidUsername(value);
    }, window.TM.App.LocalizationContent.InvalidUsername);

    $.validator.addMethod("isValidUsernameLength", function (value, element) {
        return IsValidUsernameLength(value);
    }, window.TM.App.LocalizationContent.UsernameExceeds);

    $.validator.addMethod("isValidPhoneNumber", function (value, element) {
        return IsValidContactNumber(value);
    }, window.TM.App.LocalizationContent.PhoneNumberValidator);

    addPlacehoder("#user-phonenumber");

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
            "user-username": {
                isRequired: true,
                isValidUsernameLength: true,
                isValidUsername: true
            },
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
                isRequired: window.TM.App.LocalizationContent.FirstNameValidator
            }
        }

    });

    $(document).on("keyup", "#new-password", function () {
        if ($("#new-password").val() == $("#confirm-password").val()) {
            $("#confirm-password").closest('div').removeClass('has-error');
            $("#confirm-password").closest('tr').next("tr").find("span").html("");
        }
        else if ($("#confirm-password").val() != '') {
            $("#confirm-password").closest('div').addClass("has-error");
            $("#confirm-password").closest('div').next("div").find("span").html(window.TM.App.LocalizationContent.PasswordMismatch).css("display", "block");
        }
        passwordPolicyPopover("#new-password", $("#new-password").val());
    });

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
                isValidPassword: true
            },
            "confirm-password": {
                required: true,
                equalTo: "#new-password"
            }

        },
        highlight: function (element) {
            $(element).closest('div').addClass("has-error");
            passwordBoxHightlight(element);
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('has-error');
            passwordBoxUnhightlight(element);
            $(element).closest('div').find(".validation-message").html("");
        },
        errorPlacement: function (error, element) {
            $(element).closest('div').find(".validation-message").html(error.html());
        },
        messages: {
            "new-password": {
                required: window.TM.App.LocalizationContent.NewPasswordValidator,
            },
            "confirm-password": {
                required: window.TM.App.LocalizationContent.ConfirmPasswordValidator,
                equalTo: window.TM.App.LocalizationContent.PasswordMismatch
            }
        }
    });

    $('#new-password').on("change", function () {
        passwordPolicyPopover("#new-password", $("#new-password").val());
        $("#new-password").valid();
    });

    $(".edit-user-profile-field").on("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            SaveUserdetails();
            return false;
        }
    });

    $(".password-fields-user-profile-edit").on("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            onUserChangePasswordClick();
            this.blur();
            return false;
        }
    });

    $(document).on('click', "#activate-button-click", function () {
        $(".success-message").hide();
        $("#activate-button-click").attr("disabled", true).css("cursor", "default");
        var id = $(this).attr("id");
        $.ajax({
            type: "POST", url: activateUserUrl, data: { username: $("#user-name").val(), email: $("#user-email").val(), firstname: $("#user-firstname").val() },
            success: function (data) {
                $("#activate-button-click").attr("disabled", false);
                if ($.type(data) == "object") {
                    if (data.Data.result == "success" && data.Data.type == 1) {
                        $("#" + id).hide();
                        $("<input>", { class: "primary-button password-save-button", type: "button", id: "resend-button-click", value: "Resend Activation Code", title: "" }).insertAfter('#' + id);
                        CheckMailSettingsAndNotify(window.TM.App.LocalizationContent.ActivationCodeGenerated + " <a href='" + emailSettingsUrl + "'>" + window.TM.App.LocalizationContent.ConfigureEmailSettings + "</a>", $("#alert-message"), window.TM.App.LocalizationContent.ActivationCodeSent);
                    }
                    else if (data.Data.result == "success") {
                        $("#inactive-user").hide();
                        $('<span id="active-user">Active</span>').insertAfter('#inactive-user').addClass("content-size status");
                        $("#user-status").val("true");
                        $("#status-user").val("Active");
                        $("#" + id).attr("disabled", true);
                        ValidateMailSettingsAndShowToast("", $("#alert-message"), window.TM.App.LocalizationContent.UserAccountHasActivated);
                    }
                }
            }
        });
    });

    $(document).on('click', '#resend-button-click', function () {
        $(".success-message").hide();
        $("#resend-button-click").attr("disabled", true).css("cursor", "default");
        var id = $(this).attr("id");
        $.ajax({
            type: "POST", url: resendactivationcodeUrl, data: { username: $("#user-name").val(), email: $("#user-email").val(), firstname: $("#user-firstname").val() },
            success: function (data) {
                $("#resend-button-click").attr("disabled", false);
                if ($.type(data) == "object") {
                    if (data.Data.result == "success") {
                        CheckMailSettingsAndNotify(window.TM.App.LocalizationContent.ActivationCodeGenerated + " <a href='" + emailSettingsUrl + "'>" + window.TM.App.LocalizationContent.ConfigureEmailSettings + "</a>", $("#alert-message"), window.TM.App.LocalizationContent.ActivationCodeResent);
                        $("#edit").addClass("adjustment");
                    }
                }
            }
        });
    });

    //$('#upload-image').click(function () {
    //    var isUpdated = $(".img-container").children("img").attr("src");
    //    var userId = $("#user-id").val();
    //    var isNewFile = false;

    //    if (isUpdated != tanantManagementServerResourceUrl + "/images/common/preview.jpg") {
    //        isNewFile = true;

    //        var data =
    //        {
    //            "selection.LeftOfCropArea": parseInt($('input[name=LeftOfCropArea]').val()),
    //            "selection.TopOfCropArea": parseInt($('input[name=TopOfCropArea]').val()),
    //            "selection.LeftToCropArea": parseInt($('input[name=LeftToCropArea]').val()),
    //            "selection.TopToCropArea": parseInt($('input[name=TopToCropArea]').val()),
    //            "selection.height": parseInt($('input[name=height]').val()),
    //            "selection.width": parseInt($('input[name=width]').val()),
    //            "selection.UserName": $("#user-name").val(),
    //            "selection.UserId": userId,
    //            "selection.ImageName": $("#image").val(),
    //            "selection.IsNewFile": isNewFile
    //        };

    //        $.ajax({
    //            type: "POST",
    //            data: JSON.stringify(data),
    //            url: updateprofilepictureUrl,
    //            contentType: "application/json; charset=utf-8",
    //            beforeSend: ShowWaitingProgress("#avatar-upload-box", "show"),
    //            dataType: "json",
    //            success: function (result) {
    //                var isLoggedUser = $("#logged-user").html().toLowerCase();
    //                parent.messageBox("su-image", window.TM.App.LocalizationContent.ChangeProfilepicture, window.TM.App.LocalizationContent.ProfilePictureSaved, "success", function () {
    //                    parent.onCloseMessageBox();
    //                });
    //                $("#image-path").val("browse image path");
    //                $("#profile-picture").attr("src", tanantManagementServerResourceUrl + "/images/common/preview.jpg");
    //                $('#upload-image').attr("disabled", "disabled");
    //                if ($(".img-container").children().hasClass("jcrop-active")) {
    //                    $('#profile-picture').data('Jcrop').destroy();
    //                }
    //                $("#avatar-upload-box").ejDialog("close");
    //                ShowWaitingProgress("#avatar-upload-box", "hide");
    //            },
    //            error: function (result) {
    //                parent.messageBox("su-open", window.TM.App.LocalizationContent.ChangeProfilepicture, window.TM.App.LocalizationContent.ProfilePictureSaveFailed, "error", function () {
    //                    parent.onCloseMessageBox();
    //                });
    //            }
    //        });
    //    }
    //});

    $(document).on("click", "#avatar-delete-click", function () {
        messageBox("su-delete", window.TM.App.LocalizationContent.DeleteProfilePicture, window.TM.App.LocalizationContent.DeleteProfilePictureConfirm, "error", function () {
            deleteUserAvatar();
        });
    });

    $("#avatar-button-click").click(function () {
        $("#image-path").val(window.TM.App.LocalizationContent.BrowseImagePath).removeClass("ValidationErrorImage");
        $("#image-path").closest("div").removeClass("has-error");
        $("#avatar-upload-box").ejDialog("open");
        $("#cancel-avatar-popup").click(function () {
            $("#profile-picture").attr("src", tanantManagementServerResourceUrl + "/images/common/preview.jpg");
            $('#upload-image').attr("disabled", "disabled");
            if ($(".img-container").children().hasClass("jcrop-active")) {
                $('#profile-picture').data('Jcrop').destroy();
            }
            $("#avatar-upload-box").ejDialog("close");
        });

        $('.e-uploadinput').attr({ title: window.TM.App.LocalizationContent.NoFileSelected, accept: ".png, .jpg ,.jpeg" });

        if (browser.name.toLowerCase() == "msie" || browser.name.toLowerCase() == "webkit") {
            $(".e-selectpart").addClass("upload-box");
        }
        else {
            $(".e-selectpart").removeClass("upload-box");
        }
        var maxIndex = getMaxZIndex() + 2;
        $("#avatar-upload-box a.popup-close").trigger('mouseover').mouseover(function () { $(".tooltip").css("z-index", maxIndex); });
    });

    //$("#upload-picture").ejUploadbox({
    //    saveUrl: fileUploadUrl + "?imageType=profileimage&&userName=" + $("#user-name").val() + "&&timeStamp=" + currentDate,
    //    autoUpload: true,
    //    showFileDetails: false,
    //    fileSize: 31457280,
    //    extensionsAllow: ".PNG,.png,.jpg,.JPG,.jpeg,.JPEG",
    //    extensionsDeny: "",
    //    buttonText: { browse: "..." },
    //    begin: function () {
    //        ShowWaitingProgress("#avatar-upload-box", "show");
    //    },
    //    fileSelect: function (e) {
    //        currentDate = $.now();
    //        extension = e.files[0].extension.toLowerCase();
    //        uploadFileName = e.files[0].name;
    //        this.model.saveUrl = fileUploadUrl + "?imageType=profileimage&&userName=" + $("#user-name").val() + "&&timeStamp=" + currentDate;
    //    },
    //    error: function (e) {
    //        if (extension != ".png" && extension != ".jpg" && extension != ".jpeg") {
    //            $("#image-path").val(window.TM.App.LocalizationContent.InValidFileFormat).addClass("ValidationErrorImage");
    //            $("#image-path").closest("div").addClass("has-error");
    //            $(".e-uploadinput").val("").attr("title", window.TM.App.LocalizationContent.NoFileSelected);
    //        }
    //    },
    //    complete: function fileselect(e) {
    //        var filename = "profile_picture_" + currentDate + ".png";
    //        filename = filename.replace('"', '');
    //        $("#image-path").removeClass("ValidationErrorImage");
    //        $("#image").removeClass("ValidationErrorImage").val(filename);
    //        $("#image-path").closest("div").removeClass("has-error");
    //        custompath = filename;
    //        $("#upload-picture").attr("data-filename", filename);
    //        $('.e-uploadinput').attr('title', uploadFileName);
    //        $("#image-path").closest("div").removeClass("has-error");
    //        $("#image-path").val(uploadFileName);
    //        $(".jcrop-selection.jcrop-current").children("button").css("background", "");
    //        $("#profile-picture").attr("src", rootBaseUrl + "/content/images/profilepictures/" + $("#user-name").val() + "/" + filename + "?v=" + $.now());
    //        var cb, filter;

    //        jQuery(function ($) {
    //            var CircleSel = function () { };
    //            CircleSel.prototype = new $.Jcrop.component.Selection();

    //            $.extend(CircleSel.prototype, {
    //                zoomscale: 1,
    //                attach: function () {
    //                    this.frame.css({
    //                        background: 'url(' + $('#profile-picture')[0].src.replace('750', '750') + ')'
    //                    });
    //                },
    //                positionBg: function (b) {
    //                    var midx = (b.x + b.x2) / 2;
    //                    var midy = (b.y + b.y2) / 2;
    //                    var ox = (-midx * this.zoomscale) + (b.w / 2);
    //                    var oy = (-midy * this.zoomscale) + (b.h / 2);
    //                    this.frame.css({ backgroundPosition: -(b.x + 1) + 'px ' + (-b.y - 1) + 'px' });
    //                },
    //                redraw: function (b) {
    //                    $.Jcrop.component.Selection.prototype.redraw.call(this, b);

    //                    this.positionBg(this.last);
    //                    return this;
    //                },
    //                prototype: $.Jcrop.component.Selection.prototype
    //            });
    //            var jcrop_api;
    //            $('#profile-picture').Jcrop({

    //                selectionComponent: CircleSel,
    //                applyFilters: ['constrain', 'extent', 'backoff', 'ratio', 'round'],
    //                aspectRatio: 1,
    //                setSelect: [25, 25, 100, 100],
    //                handles: ['n', 's', 'e', 'w'],

    //                dragbars: [],
    //                borders: [],
    //                onChange: function (coordinates) {
    //                    onPictureCropEnd(coordinates);
    //                }
    //            }, function () {
    //                this.container.addClass('jcrop-circle-demo');
    //                interface_load(this);
    //                jcrop_api = this;
    //            });

    //            function interface_load(obj) {
    //                cb = obj;
    //                cb.container.append($('<div />').addClass('custom-shade'));

    //                function random_coords() {
    //                    return [
    //                        Math.random() * 300,
    //                        Math.random() * 200,
    //                        (Math.random() * 540) + 50,
    //                        (Math.random() * 340) + 60
    //                    ];
    //                }
    //                $(document.body).on('click', '[data-setting]', function (e) {
    //                    var $targ = $(e.target),
    //                        setting = $targ.data('setting'),
    //                        value = $targ.data('value'),
    //                        opt = {};

    //                    opt[setting] = value;
    //                    cb.setOptions(opt);

    //                    $targ.closest('.btn-group').find('.active').removeClass('active');
    //                    $targ.addClass('active');

    //                    if ((setting == 'multi') && !value) {
    //                        var m = cb.ui.multi, s = cb.ui.selection;

    //                        for (var i = 0; i < m.length; i++)
    //                            if (s !== m[i]) m[i].remove();

    //                        cb.ui.multi = [s];
    //                        s.focus();
    //                    }

    //                    e.preventDefault();
    //                });

    //                $(document.body).on('click', '[data-action]', function (e) {
    //                    var $targ = $(e.target);
    //                    var action = $targ.data('action');

    //                    switch (action) {
    //                        case 'random-move':
    //                            cb.ui.selection.animateTo(random_coords());
    //                            break;
    //                    }

    //                    cb.ui.selection.refresh();

    //                }).on('selectstart', function (e) {
    //                    e.preventDefault();
    //                }).on('click', 'a[data-action]', function (e) {
    //                    e.preventDefault();
    //                });
    //            }

    //        });
    //        ShowWaitingProgress("#avatar-upload-box", "hide");
    //        $('#upload-image').removeAttr("disabled");
    //    }
    //});

    createWaitingPopup('make-admin-confirmation');
    createWaitingPopup('remove-admin-confirmation');
    createWaitingPopup('singleuser-delete-confirmation');

    var makeAdminDialog = new ej.popups.Dialog({
        header: window.TM.App.LocalizationContent.AssignRole,
        content: document.getElementById("make-admin-confirmation-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: MakeSingleUserAdmin, buttonModel: { content: window.TM.App.LocalizationContent.YesButton, isPrimary: true } },
            { click: onMakeAdminDialogClose, buttonModel: { content: window.TM.App.LocalizationContent.NoButton } }
        ],
        width: "472px",
        height: "auto",
        isModal: true,
        visible: false,
        animationSettings: { effect: 'Zoom' },
    });
    makeAdminDialog.appendTo("#make-admin-confirmation");

    var removeAdminDialog = new ej.popups.Dialog({
        header: window.TM.App.LocalizationContent.RemoveRole,
        content: document.getElementById("remove-admin-confirmation-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: removeAdmin, buttonModel: { content: window.TM.App.LocalizationContent.YesButton, isPrimary: true } },
            { click: onRemoveAdminDialogClose, buttonModel: { content: window.TM.App.LocalizationContent.NoButton } }
        ],
        width: "472px",
        height: "auto",
        isModal: true,
        visible: false,
        animationSettings: { effect: 'Zoom' },
    });
    removeAdminDialog.appendTo("#remove-admin-confirmation");

    var singleUserDeleteDialog = new ej.popups.Dialog({
        header: window.TM.App.LocalizationContent.DeleteUser,
        content: document.getElementById("singleuser-delete-confirmation-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: deleteSingleUser, buttonModel: { content: window.TM.App.LocalizationContent.YesButton, isPrimary: true } },
            { click: onSingleDeleteDialogClose, buttonModel: { content: window.TM.App.LocalizationContent.NoButton } }
        ],
        width: "472px",
        height: "auto",
        isModal: true,
        animationSettings: { effect: 'Zoom' },
        visible: false
    });
    singleUserDeleteDialog.appendTo("#singleuser-delete-confirmation");
});

function successMessage() {
    if ($("#invalid-firstname, #invalid-lastname, #invalid-email").css("display") == "block") {
        $("#updation-validation-message").css("display", "none");
    }
}


function onUserChangePasswordClick() {
    var userId = $("#user-id").val();
    $(".validation-message").html("");
    $("#new-password-validate, #confirm-password-validate").closest("div").prev("div").removeClass("has-error");
    var isValid = true;
    isValid = $('.change-password-form').valid();

    if (isValid && $("#new-password").val() != $("#confirm-password").val()) {
        $("#confirm-password-validate").html(window.TM.App.LocalizationContent.PasswordsMismatch);
        $("#confirm-password-validate").closest("div").prev("div").addClass("has-error");
        isValid = false;
    }

    if (isValid == false) {
        return;
    }

    showWaitingPopup('content-area');
    doAjaxPost('POST', UpdatePasswordUrl, { newpassword: $("#new-password").val(), confirmpassword: $("#confirm-password").val(), userId: $("#user-id").val() },
        function (result) {
            $("input[type='password']").val("");
            hideWaitingPopup('content-area');
            $("#password_policy_rules").remove();
            $("#confirm-password-section").removeAttr("style");
            if (!result.Data.status) {
                WarningAlert(window.TM.App.LocalizationContent.UpdatePassword, window.TM.App.LocalizationContent.PasswordFailure, 7000);
            }
            else {
                SuccessAlert(window.TM.App.LocalizationContent.UpdatePassword, window.TM.App.LocalizationContent.PasswordSuccess, 7000);
            }
        }
    );

}
function editUser(fulldata) {
    var specficuserdetails = fulldata;
    userDetails = fulldata;
    $("#user-name").val(specficuserdetails.UserName);
    $("#user-email").val(specficuserdetails.Email.toString().includes(autoGeneratedEmail) ? "" : specficuserdetails.Email);
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
    if (fulldata.Contact != null && fulldata.Contact != "") {
        $("#user-phonenumber").val(fulldata.Contact);
    }
}
function SaveUserdetails() {
    $("#updation-validaton-message").html("");
    $("#email-duplicate-validation").closest("div").prev("div").removeClass("has-error");
    var firstName = $("#user-firstname").val().trim();
    var emailid = $('#user-email').val().trim();
    var isValid = $('.edit-user-profile-form').valid();
    var isActive = true;
    if (isValid) {
        $(".userprofile-validation-messages").css("display", "none");
        var userStatus = $("#user-status").val();
        if ($("#show-active").hasClass("show")) {
            isActive = true;
        }
        else {
            isActive = $("#container-select").hasClass("show") ? userStatus : false;
        }
        showWaitingPopup('content-area');
        doAjaxPost('POST',
            updateUserProfileUrl,
            {
                username: $("#user-name").val(),
                email: emailid,
                picturename: $("#upload-picture").attr("data-filename"),
                firstname: firstName,
                lastname: $("#user-lastname").val(),
                mobile: $("#user-phonenumber").val().trim(),
                status: isActive
            },
            function (result) {
                hideWaitingPopup('content-area');
                if (result.Data.status) {
                    var updateddetails = result.Data.profileinfo;
                    var updatedfirstname = (updateddetails.firstName != null) ? $("#user-firstname").val(updateddetails.firstName) : $("#user-firstname").val(updateddetails.previousFirstName);
                    var updatedlastname = (updateddetails.lastName != null) ? $("#user-lastname").val(updateddetails.lastName) : $("#user-lastname").val(updateddetails.previousLastName);
                    var updatedemail = (updateddetails.email != null) ? $("#user-email").val(updateddetails.email) : $("#user-email").val(updateddetails.previousMail);
                    var updatedmobile = (updateddetails.mobile != null) ? $("#user-phonenumber").val(updateddetails.mobile) : $("#user-phonenumber").val(updateddetails.previousMobile);
                    if (updateddetails.status.toLowerCase() == "false") {
                        var status = $("#status-user").val("Inactive");
                    }
                    else {
                        var status = $("#status-user").val("Active");
                    }
                    userDetails = {
                        FirstName: updatedfirstname.val(),
                        LastName: updatedlastname.val(),
                        ContactNumber: updatedmobile.val(),
                        Email: updatedemail.val(),
                        Status: status.val(),
                    };
                    SuccessAlert("Update Profile", result.Data.value, 7000);

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
                    SuccessAlert("Update Profile", result.Data.value, 7000);
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

function onPictureCropEnd(coordinates) {
    $("input[name=LeftOfCropArea]").val(coordinates.x);
    $("input[name=TopOfCropArea]").val(coordinates.y);
    $("input[name=LeftToCropArea]").val(coordinates.x2);
    $("input[name=TopToCropArea]").val(coordinates.y2);
    $("input[name=height]").val(coordinates.h);
    $("input[name=width]").val(coordinates.w);
}

$(document).on("click", "#edit", function (e) {
    $("#save-button,#status-dom").show();
    $("#cancel-button").css("display", "inline");
    $("#group-div,#status-show,#edit,#activation-div").hide();
    $("#resend-button-click").removeClass("show");
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
    if (userDetails.Status == 0) {
        $("#status-user").html("Active");
    }
    else {
        $("#status-user").html("InActive");
    }
    $(".alert-messages").closest("div").removeClass("has-error form-control");
    $(".alert-messages").html("");
    $(".edit-user-profile-field").attr("disabled", true).removeClass("enable");
    $("#save-button,#status-dom,#cancel-button").hide();
    $("#edit, #status-show, #group-div,#activation-div").show();
    if ($("#status-user").val == "Active") {
        $("#activate-button-click").hide();
    }
});

if ($("#status-user").val == "InActive") {
    $("#activate-button-click").removeClass("hide");
}

$(document).on("click", ".delete-class", function () {
    $(this).parent("li").addClass("is-delete");
    onSingleDeleteDialogOpen();
});

$(document).on("click", ".make-admin-class", function () {
    $(this).parent("li").addClass("make-admin");
    onMakeAdminDialogOpen();
});

$(document).on("click", ".remove-admin-class", function () {
    $(this).parent("li").addClass("remove-admin");
    onRemoveAdminDialogOpen();
});

function onSingleDeleteDialogOpen() {
    $("#singleuser-delete-confirmation").find("button.e-primary").addClass("critical-action-button");
    document.getElementById("singleuser-delete-confirmation").ej2_instances[0].show();
}

function onMakeAdminDialogOpen() {
    document.getElementById("make-admin-confirmation").ej2_instances[0].show();
}

function onRemoveAdminDialogOpen() {
    document.getElementById("remove-admin-confirmation").ej2_instances[0].show();
}

function MakeSingleUserAdmin() {
    var userId = $(".make-admin").attr("data-content");
    showWaitingPopup('make-admin-confirmation');
    $.ajax({
        type: "POST",
        url: makeAdminUrl,
        data: "&users=" + userId,
        success: function (result) {
            hideWaitingPopup('make-admin-confirmation');
            onMakeAdminDialogClose();
            window.location.reload();
        }
    });

}

function onMakeAdminDialogClose() {
    document.getElementById("make-admin-confirmation").ej2_instances[0].hide();
}

function removeAdmin() {
    var userId = $(".remove-admin").attr("data-content");
    showWaitingPopup('remove-admin-confirmation');
    $.ajax({
        type: "POST",
        url: removeAdminUrl,
        data: { "userId": userId },
        success: function (result) {
            hideWaitingPopup("remove-admin-confirmation");
            onRemoveAdminDialogClose();
            window.location.reload();
        }
    });
}

function onRemoveAdminDialogClose() {
    document.getElementById("remove-admin-confirmation").ej2_instances[0].hide();
}

function deleteSingleUser() {
    showWaitingPopup('singleuser-delete-confirmation');
    var userId = $(".is-delete").attr("data-content");
    doAjaxPost("POST", deleteSingleFromUserListUrl, "UserId=" + userId, function (data) {
        if (data.status) {
            window.location.href = userPageUrl;
        } else {
            hideWaitingPopup('singleuser-delete-confirmation');
            onSingleDeleteDialogClose();
            window.location.reload();
        }
    });
}

function onSingleDeleteDialogClose() {
    document.getElementById("singleuser-delete-confirmation").ej2_instances[0].hide();
}
