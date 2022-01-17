var isKeyUp = false;
var userDetails;
$(document).ready(function () {
    var extension;
    var custompath;
    var currentDate = $.now();
    var uploadFileName;
    var ruleName;
    var rules;
    addPlacehoder("body");
    $("#user-name").val(userId);
    $("#avatar-upload-box").ejDialog({
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        width: "600px",
        enableModal: true,
        showHeader: false,
        close: "DialogBoxClose",
        closeOnEscape: true
    });
    $('[data-toggle="popover"]').popover();
    $.validator.addMethod("isValidEmail", function (value, element) {
        return IsEmail(value);
    }, window.Server.App.LocalizationContent.IsValidEmailAddress);

    $.validator.addMethod("isValidUsername", function (value, element) {
        return IsValidUsername(value);
    }, window.Server.App.LocalizationContent.InvalidUsername);

    $.validator.addMethod("isValidUsernameLength", function (value, element) {
        return IsValidUsernameLength(value);
    }, window.Server.App.LocalizationContent.UsernameExceeds);

    $.validator.addMethod("isValidName", function (value, element) {
        return IsValidName("name", value)
    }, window.Server.App.LocalizationContent.AvoidSpecialCharactors);

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, window.Server.App.LocalizationContent.ItemNameValidator);

    $.validator.addMethod("isValidPhoneNumber", function (value, element) {
        return IsValidContactNumber(value);
    }, window.Server.App.LocalizationContent.PhoneNumberValidator);

    $(".edit-profile-form").validate({
        errorElement: "span",
        onkeyup: function (element, event) {
            $("#success-message").html("");
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false
            } else true
        },
        onfocusout: function (element) { $(element).valid(); $("#success-message").html(""); },
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
            $(element).closest("div").removeClass("has-error");
            $(element).closest("div").find("span").html("");
        },
        errorPlacement: function (error, element) {
            var read = $("#" + element.context.id).not(":disabled");
            if (read) {
                $(element).closest('div').find("span").html(error.html());
            }
        },
        messages: {
            "user-email": {
                isRequired: window.Server.App.LocalizationContent.EmailAddressValidator
            },
            "user-firstname": {
                isRequired: window.Server.App.LocalizationContent.FirstNameValidator
            }
        }
    });

    $(".edit-profile-field").bind("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            SaveProfile();
            return false;
        }
    });

    $('#upload-image').click(function () {
        var isUpdated = $(".img-container").children("img").attr("src");
        var isNewFile = false;

        if (isUpdated != "") {
            isNewFile = true;

            var data =
            {
                "LeftOfCropArea": parseInt($('input[name=LeftOfCropArea]').val() || 0),
                "TopOfCropArea": parseInt($('input[name=TopOfCropArea]').val() || 0),
                "LeftToCropArea": parseInt($('input[name=LeftToCropArea]').val() || 0),
                "TopToCropArea": parseInt($('input[name=TopToCropArea]').val() || 0),
                "Height": parseInt($('input[name=height]').val() || 0),
                "Width": parseInt($('input[name=width]').val() || 0),
                "UserName": $("#user-name").val(),
                "UserId": userId,
                "ImageName": $("#image").val(),
                "IsNewFile": isNewFile
            };

            if (data["selection.height"] != 0 && data["selection.width"] != 0) {
                $.ajax({
                    type: "POST",
                    data: JSON.stringify(data),
                    url: updateprofilepictureUrl,
                    contentType: "application/json; charset=utf-8",
                    beforeSend: ShowWaitingProgress("#avatar-upload-box", "show"),
                    cache: false,
                    success: function (result) {
                        if (window.location.toString().includes("return_url")) {
                            var redirectTo = window.location.toString().split("return_url=")[1];
                            window.location.href = redirectTo;
                        }
                        else {
                            window.location.reload();
                        }
                        SuccessAlert(window.Server.App.LocalizationContent.ChangeAvatar, window.Server.App.LocalizationContent.AvatarUpdateSuccess, 7000);
                        parent.$("#user-profile-picture").attr("src", avatarUrl + "?id=" + userId + "&imageSize=110&v=" + $.now());
                        parent.$(".profile-picture,#profile-picture-menu").find("img").attr("src", avatarUrl + "?id=" + userId + "&imageSize=32&v=" + $.now());
                        var value = parent.$("#avatar-delete-click").length;
                        if (value == 0) {
                            $(".img-view-holder").on("mouseenter", function () {
                                if ($("#avatar-delete-click").length == 0) {
                                    if ($("#user-profile-picture").attr("src") == "/user/getdefaultavatar") {
                                        $("#avatar-delete-click").css("display", "none");
                                    }
                                    else {
                                        $("<span>", { class: "su su-delete", id: "avatar-delete-click", title: window.Server.App.LocalizationContent.DeleteAvatar }).insertAfter("#avatar-button-click").addClass("profile-picture-edit-button").css("left", "86px");
                                    }
                                }

                            });
                            $(".img-view-holder").on("mouseleave", function () {
                                $("#avatar-delete-click").css("display", "none");
                            });


                        }
                        $("#image-path").val(window.Server.App.LocalizationContent.BrowseProfileImagePath);
                        $("#image-preview-text").show();
                        $("#profile-picture").hide();
                        $('#upload-image').attr("disabled", "disabled");
                        if ($(".img-container").children().hasClass("jcrop-active")) {
                            $('#profile-picture').data('Jcrop').destroy();
                        }
                        $("#avatar-upload-box").ejDialog("close");
                        ShowWaitingProgress("#avatar-upload-box", "hide");
                    },
                    error: function (result) {
                        WarningAlert(window.Server.App.LocalizationContent.ChangeAvatar, window.Server.App.LocalizationContent.AvatarUpdateError, 7000);
                    }
                });
            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.ChangeAvatar, window.Server.App.LocalizationContent.AvatarUpdateError, 7000);
            }
        }
    });

    $(document).on("click", "#avatar-delete-click", function () {
        messageBox("su-delete", window.Server.App.LocalizationContent.DeleteAvatar, window.Server.App.LocalizationContent.AvatarDelete, "error", function () {
            deleteUserAvatar();
            onCloseMessageBox();
        });
    });

    $(".img-view-holder").on("mouseenter", function () {
        $("#user-profile-picture").addClass("user-profile-picture");
        $("#avatar-button-click,#avatar-delete-click").css("display", "inline-block");
    });

    $(".img-view-holder").on("mouseleave", function () {
        $("#user-profile-picture").removeClass("user-profile-picture");
        $("#avatar-button-click,#avatar-delete-click").css("display", "none");
    });

    $("#avatar-button-click").click(function () {
        $("#image-path").val(window.Server.App.LocalizationContent.BrowseProfileImagePath).removeClass("ValidationErrorImage");
        $("#image-path").closest("div").removeClass("has-error");
        $("#avatar-upload-box").ejDialog("open");
        $("#cancel-avatar-popup").click(function () {
            $("#image-preview-text").show();
            $("#profile-picture").hide();
            $('#upload-image').attr("disabled", "disabled");
            if ($(".img-container").children().hasClass("jcrop-active")) {
                $('#profile-picture').data('Jcrop').destroy();
            }
            $("#avatar-upload-box").ejDialog("close");
        });
        $('.e-uploadinput').val("").attr({ title: "No file selected.", accept: ".png, .jpg ,.jpeg" });
    });

    $(document).on("click", "#image-path", function () {
        $("#upload-picture").find(".e-uploadinput").trigger("click");
    });

    $("#upload-picture").ejUploadbox({
        saveUrl: fileUploadUrl + "?imageType=profileimage&&userName=" + $("#user-name").val() + "&&timeStamp=" + currentDate,
        autoUpload: true,
        showFileDetails: false,
        fileSize: 31457280,
        extensionsAllow: ".PNG,.png,.jpg,.JPG,.jpeg,.JPEG",
        buttonText: { browse: "..." },
        begin: function () {
            ShowWaitingProgress("#avatar-upload-box", "show");
        },
        fileSelect: function (e) {
            currentDate = $.now();
            extension = e.files[0].extension.toLowerCase();
            uploadFileName = e.files[0].name;
            this.model.saveUrl = fileUploadUrl + "?imageType=profileimage&&userName=" + $("#user-name").val() + "&&timeStamp=" + currentDate
        },
        error: function (e) {
            if (extension != ".png" && extension != ".jpg" && extension != ".jpeg") {
                $("#image-path").val("Invalid file format").addClass("ValidationErrorImage");
                $("#image-path").closest("div").addClass("has-error");
                $(".e-uploadinput").val("").attr("title", window.Server.App.LocalizationContent.UploadSelect);;
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
            $("#profile-picture").attr("src", rootBaseUrl + "/content/images/profilepictures/" + $("#user-name").val() + "/" + filename + "?v=" + $.now());
            $("#image-preview-text").hide();
            $("#profile-picture").show();

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
});

function editUser(fulldata) {
    var specficuserdetails = fulldata;
    userDetails = fulldata;
    $("#user-name").val(specficuserdetails.UserId);
    $("#userid").val(specficuserdetails.UserId);
    $("#user-username").val(specficuserdetails.Username);
    $("#user-email").val(specficuserdetails.Email.toString().includes(autoGeneratedEmail) ? "" : specficuserdetails.Email);
    $("#user-head").html(specficuserdetails.FirstName + " " + specficuserdetails.LastName);
    if (specficuserdetails.Picture == null || specficuserdetails.Picture.trim() == "") {
        $("#user-profile-picture").siblings("#avatar-delete-click").remove();
    }
    $("#user-profile-picture").attr('src', avatarUrl + "?id=" + specficuserdetails.UserId + "&ImageSize=110");

    if (specficuserdetails.Picture != null) {
        $("#upload-picture").attr("data-filename", specficuserdetails.Picture.replace("Content//images//profilepictures//" + specficuserdetails.UserName + "//", ""));
    }

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

function SaveProfile() {
    $("#success-message").html("");
    $("#email-duplicate-validation").closest("div").prev("div").removeClass("has-error");
    var isValid = $('.edit-profile-form').valid();

    if (isValid) {
        ShowWaitingProgress("#content-area", "show");
        doAjaxPost('POST',
            updateUserProfile,
            {
                username: $('#user-username').val(),
                email: $("#user-email").val(),
                picturename: $("#upload-picture").attr("data-filename"),
                firstname: $("#user-firstname").val(),
                lastname: $("#user-lastname").val(),
                mobile: $("#user-phonenumber").val(),
                userid: userId,
                returnurl: $("#hidden-return-url").val()
            },
            function (result) {
                if (result.IsUserNameExist) {
                    if (result.IsUserNameExist) {
                        $('#user-username').closest('div').addClass("has-error");
                        $("#username-duplicate-validation").html(window.Server.App.LocalizationContent.IsUserNameExist).css("display", "block");
                        $(".validation-message").css("display", "block");
                        ShowWaitingProgress("#content-area", "hide");
                    }                    
                    $(".edit-profile-field").attr("disabled", false).addClass("enable");
                    $("#save-button").show();
                    $("#cancel-button").css("display", "block");
                    $("#cancel-link-button").css("display", "block");
                    $("#edit,#group-div").hide();
                    return;
                }
                else if (result.Data.status) {
                    if (result.Data.isTenantUserEdit) {
                        $("<form action='" + result.Data.returnUrl + "'><input type='hidden' name='token' value='" + result.Data.token + "'></form>").appendTo('body').submit().remove();
                    } else {
                        ShowWaitingProgress("#content-area", "hide");
                        var updateddetails = result.Data.profileinfo;
                        var updatedfirstname = $("#user-firstname").val(updateddetails.FirstName);
                        var updatedlastname = $("#user-lastname").val(updateddetails.LastName);
                        var updatedusername = $("#user-username").val(updateddetails.Username);
                        var updatedemail = $("#user-email").val(updateddetails.Email);
                        var updatedmobile = $("#user-phonenumber").val(updateddetails.Contact);
                        userDetails = {
                            FirstName: updatedfirstname.val(),
                            LastName: updatedlastname.val(),
                            ContactNumber: updatedmobile.val(),
                            Username: updatedusername.val(),
                            Email: updatedemail.val()
                        };
                        var newFirtName = $("#user-firstname").val().trim();
                        var newLastName = $("#user-lastname").val().trim();
                        var newEmail = $("#user-email").val();
                        $("#profile-name").text(newFirtName + " " + newLastName);
                        $("#profile-email").text(newEmail);
                        SuccessAlert(window.Server.App.LocalizationContent.UpdateProfile, result.Data.value, 7000);
                    }
                } else {
                    ShowWaitingProgress("#content-area", "hide");
                    WarningAlert(window.Server.App.LocalizationContent.UpdateProfile, result.Data.value, 7000);
                }
            }
        );
        $(".edit-profile-field").attr("disabled", true).removeClass("enable");
        $("#save-button").hide();
        $("#cancel-button").css("display", "none");
        $("#cancel-link-button").css("display", "none");
        $("#edit,#group-div").show();
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
    var isAdUser = $("#is-aduser").html().toLowerCase();
    $("#edit,#group-div").hide();
    $("#save-button").show();
    $("#cancel-button").css("display", "inline");
    $("#cancel-link-button").css("display", "inline");
    if (isAdUser == "false") {
        $(".edit-profile-field").attr("disabled", false).addClass("enable");
    }
    else {
        $(".edit-profile-field").attr("disabled", true).removeClass("enable");
    }
});

$(document).on("click", "#cancel-button", function (e) {
    $("#user-firstname").val(userDetails.FirstName);
    $("#user-username").val(userDetails.Username);
    $("#user-email").val(userDetails.Email);
    $("#user-lastname").val(userDetails.LastName);
    $("#user-phonenumber").val(userDetails.ContactNumber);
    $(".edit-profile-field").attr("disabled", true).removeClass("enable");
    $(".alert-messages").closest("div").removeClass("has-error form-control");
    $(".alert-messages").html("");
    $("#save-button,#cancel-button,#cancel-link-button").hide();
    $("#edit, #group-div").show();
});

$(document).on("click", "#edit-language", function (e) {
    $("#edit-language").hide();
    $("#language-save-button").show();
    $("#language-cancel-button").css("display", "inline");
    $("#language-cancel-link-button").css("display", "inline");
    $("#language").attr("disabled", false).addClass("enable").selectpicker("refresh");
    $("#model-language").attr("disabled", false).addClass("enable").selectpicker("refresh");
});

$(document).on("click", "#language-cancel-button", function (e) {
    $("#language-save-button,#language-cancel-button,#language-cancel-link-button").hide();
    $("#language").attr("disabled", true).removeClass("enable").selectpicker("refresh");
    $("#model-language").attr("disabled", true).removeClass("enable").selectpicker("refresh");
    $("#edit-language").show();
});

function SaveUserPreference() {
    $("#success-message").html("");
    var language = typeof ($("#language").val()) === "undefined" ? "en-us" : $("#language").val();
    if ($("#lang_tag").val() !== $("#language").val() || $("#model-lang_tag").val() !== $("#model-language").val()) {
        ShowWaitingProgress("#content-area", "show");
        doAjaxPost('POST',
            updateUserPreferenceUrl,
            {
                returnurl: $("#hidden-return-url").val(),
                languageSettings: language,
                modelLanguageSettings: $("#model-language").val()
            },
            function (result) {
                if (result.Data.status) {
                    if (result.Data.isTenantUserLanguage) {
                        $("<form action='" + result.Data.returnUrl + "'><input type='hidden' name='token' value='" + result.Data.token + "'></form>").appendTo('body').submit().remove();
                    } else {
                        ShowWaitingProgress("#content-area", "hide");
                        SuccessAlert(window.Server.App.LocalizationContent.UpdateAccountPreference, result.Data.value, 7000);
                        location.reload();
                    }
                } else {
                    ShowWaitingProgress("#content-area", "hide");
                    WarningAlert(window.Server.App.LocalizationContent.UpdateAccountPreference, result.Data.value, 7000);
                    location.reload();
                }
            }
        );
        $("#language").attr("disabled", true).selectpicker("refresh").removeClass("enable");
        $("#mode-language").attr("disabled", true).selectpicker("refresh").removeClass("enable");
        $("#language-save-button").hide();
        $("#language-cancel-button").css("display", "none");
        $("#language-cancel-link-button").css("display", "none");
        $("#edit-language").show();
    }
}

function SetCookie() {
    doAjaxPost('POST',
        setLanguageUrl,
        {
            langtag: $("#language").val(),
            returnUrl: requestUrl
        },
        function (result) {
            window.location.href = result.Data;
        }
    );
}
