var isKeyUp = false;
var userDetails;
var browser = ej.browserInfo();
$(document).ready(function () {
    var extension;
    var custompath;
    var currentDate = $.now();
    var uploadFileName;
    var ruleName;
    var rules;
    addPlacehoder("body");
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

    $.validator.addMethod("isValidEmail", function (value, element) {
        if (value.trim() == "") {
            return true;
        } else {
            return IsEmail(value);
        }
    }, "Please enter a valid email address");

    $.validator.addMethod("isValidName", function (value, element) {
        return IsValidName("name", value)
    }, "Please avoid special characters");

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, "Please enter the name");

    $.validator.addMethod("isValidPhoneNumber", function (value, element) {
        return IsValidContactNumber(value);
    }, "Please enter the valid phone number");

    var isAdminUser = false;
    if (isAdmin) {
        isAdminUser = isAdmin;
    }

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
            "user-email": {
                isRequired: isAdminUser,
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
                isRequired: "Please enter your email address"
            },
            "user-firstname": {
                isRequired: "Please enter your first name"
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
        var userId = $("#user-id").val();
        var isNewFile = false;
        if (isUpdated != tanantManagementServerResourceUrl + "/images/common/preview.jpg") {
            isNewFile = true;

            var data =
            {
                "selection.LeftOfCropArea": parseInt($('input[name=LeftOfCropArea]').val()),
                "selection.TopOfCropArea": parseInt($('input[name=TopOfCropArea]').val()),
                "selection.LeftToCropArea": parseInt($('input[name=LeftToCropArea]').val()),
                "selection.TopToCropArea": parseInt($('input[name=TopToCropArea]').val()),
                "selection.height": parseInt($('input[name=height]').val()),
                "selection.width": parseInt($('input[name=width]').val()),
                "selection.UserName": $("#user-name").val(),
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
                    parent.messageBox("su-image", "Change Profile picture", "Profile picture has been saved successfully.", "success", function () {
                        parent.$("#user-profile-picture").attr("src", avatarUrl + "?username=" + $("#user-name").val() + "&imageSize=110&v=" + $.now());
                        parent.$(".profile-picture,#profile-picture-menu").find("img").attr("src", avatarUrl + "?username=" + $("#user-name").val() + "&imageSize=32&v=" + $.now());
                        var value = parent.$("#avatar-delete-click").length;
                        if (value == 0) {
                            $(".img-view-holder").on("mouseenter", function () {
                                if ($("#avatar-delete-click").length == 0) {
                                    if ($("#user-profile-picture").attr("src") == "/user/getdefaultavatar") {
                                        $("#avatar-delete-click").css("display", "none");
                                    }
                                    else {
                                        $("<span>", { class: "su su-delete", id: "avatar-delete-click", title: "Delete profile picture" }).insertAfter("#avatar-button-click").addClass("profile-picture-edit-button").css("left", "86px");
                                    }
                                }
                            });
                            $(".img-view-holder").on("mouseleave", function () {
                                $("#avatar-delete-click").css("display", "none");
                            });

                        }
                        parent.onCloseMessageBox();
                    });
                    $("#image-path").val("browse image path");
                    $("#profile-picture").attr("src", tanantManagementServerResourceUrl + "/images/common/preview.jpg");
                    $('#upload-image').attr("disabled", "disabled");
                    if ($(".img-container").children().hasClass("jcrop-active")) {
                        $('#profile-picture').data('Jcrop').destroy();
                    }
                    $("#avatar-upload-box").ejDialog("close");
                    ShowWaitingProgress("#avatar-upload-box", "hide");
                },
                error: function (result) {
                    parent.messageBox("su-open", "Change Profile picture", "Failed to update the Profile picture, try again later.", "error", function () {
                        parent.onCloseMessageBox();
                    });
                }
            });
        }
    });

    $(document).on("click", "#avatar-delete-click", function () {
        messageBox("su-delete", "Delete Profile Picture", "Are you sure you want to delete the profile picture?", "error", function () {
            deleteUserAvatar();
        });
    });

    $(".img-view-holder").on("mouseenter", function () {
        $("#user-profile-picture").addClass("user-profile-picture");
        $("#avatar-button-click,#avatar-delete-click").css("display", "inline-block");

        if ($("#user-profile-picture").attr("src") == "/user/getdefaultavatar") {
            $("#avatar-delete-click").css("display", "none");
        }
        else {
            $("#avatar-delete-click").css("display", "inline");
        }
    });

    $(".img-view-holder").on("mouseleave", function () {
        $("#user-profile-picture").removeClass("user-profile-picture");
        $("#avatar-button-click,#avatar-delete-click").css("display", "none");
    });

    $("#avatar-button-click").click(function () {
        $("#image-path").val("browse image path").removeClass("ValidationErrorImage");
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
        $('.e-uploadinput').attr({ title: "No file selected.", accept: ".png, .jpg ,.jpeg" });

        if (browser.name.toLowerCase() == "msie" || browser.name.toLowerCase() == "webkit") {
            $(".e-selectpart").addClass("upload-box");
        }
        else {
            $(".e-selectpart").removeClass("upload-box");
        }
        var maxIndex = getMaxZIndex() + 2;
        $("#avatar-upload-box a.popup-close").trigger('mouseover').mouseover(function () { $(".tooltip").css("z-index", maxIndex); });
    });

    $("#upload-picture").ejUploadbox({
        saveUrl: "/ums/en-us/fileupload/upload" + "?imageType=profileimage&&userName=" + $("#user-name").val() + "&&timeStamp=" + currentDate,
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
                $(".e-uploadinput").val("").attr("title", "No file selected.");;
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

});

function editUser(fulldata) {
    var specficuserdetails = fulldata;
    userDetails = fulldata;
    $("#user-name").val(specficuserdetails.UserName);
    $("#user-email").val(specficuserdetails.Email);
    $("#user-head").html(specficuserdetails.FirstName + " " + specficuserdetails.LastName);
    if (specficuserdetails.Picture.trim() == "") {
        $("#user-profile-picture").siblings("#avatar-delete-click").remove();
    }
    $("#user-profile-picture").attr('src', avatarUrl + "?Username=" + specficuserdetails.UserName + "&ImageSize=110");
    $("#upload-picture").attr("data-filename", specficuserdetails.Picture.replace("Content//images//profilepictures//" + specficuserdetails.UserName + "//", ""));

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

function SaveProfile() {
    $("#success-message").html("");
    $("#email-duplicate-validation").closest("div").prev("div").removeClass("has-error");
    var isValid = $('.edit-profile-form').valid();

    if (isValid) {
        ShowWaitingProgress("#content-area", "show");
        doAjaxPost('POST',
            updateUserProfileUrl,
            {
                username: $("#user-name").val(),
                email: $("#user-email").val(),
                picturename: $("#upload-picture").attr("data-filename"),
                firstname: $("#user-firstname").val(),
                lastname: $("#user-lastname").val(),
                mobile: $("#user-phonenumber").val(),
                defaulthomepage: $("#default-homepage").val()
            },
            function (result) {
                ShowWaitingProgress("#content-area", "hide");
                if (result.Data.status) {
                    var updateddetails = result.Data.profileinfo;
                    var updatedfirstname = (updateddetails.firstName != null) ? $("#user-firstname").val(updateddetails.firstName) : $("#user-firstname").val(updateddetails.previousFirstName);
                    var updatedlastname = (updateddetails.lastName != null) ? $("#user-lastname").val(updateddetails.lastName) : $("#user-lastname").val(updateddetails.previousLastName);
                    var updatedemail = (updateddetails.email != null) ? $("#user-email").val(updateddetails.email) : $("#user-email").val(updateddetails.previousMail);
                    var updatedmobile = (updateddetails.mobile != null) ? $("#user-phonenumber").val(updateddetails.mobile) : $("#user-phonenumber").val(updateddetails.previousMobile);
                    userDetails = {
                        FirstName: updatedfirstname.val(),
                        LastName: updatedlastname.val(),
                        ContactNumber: updatedmobile.val(),
                        Email: updatedemail.val()
                    };
                    var newFirtName = $("#user-firstname").val().trim();
                    var newLastName = $("#user-lastname").val().trim();
                    var newEmail = $("#user-email").val();
                    $("#profile-name").text(newFirtName + " " + newLastName);
                    $("#profile-email").text(newEmail);
                    if ($("#default-homepage").val() != "" && $("#default-homepage").val() != undefined) {
                        if ($("#default-homepage").find("option:selected").val() != "null") {
                            var selectedValue = $("#default-homepage").find("option:selected").text();
                            $("#homepage-name").text(selectedValue).removeClass("hide").attr("data-original-title", selectedValue);
                            if ($("#default-homepage option:eq(0)").hasClass("remove-default-homepage") == false) {
                                $("#default-homepage option:eq(0)").before("<option class='remove-default-homepage' value='null'>No default Homepage</option>");
                            }
                        }
                        else {
                            $("#homepage-name").text("");
                            $("#no-default-homepage").removeClass("hide");
                            $("#default-homepage .remove-default-homepage").remove();
                        }
                        $("#default-homepage").attr("data-original-value", $("#default-homepage").find("option:selected").val());
                        $("#default-homepage").selectpicker("refresh");
                    }
                    else {
                        $("#no-default-homepage").removeClass("hide");
                    }
                    SuccessAlert("Update Profile", result.Data.value, 7000);
                }
                else if (!result.Data.status && result.Data.key == "email") {
                    $("#email-duplicate-validation").html(result.Data.value).css("display", "block");
                    $("#email-duplicate-validation").closest("div").prev("div").addClass("has-error");
                } else {
                    WarningAlert("Update Profile", result.Data.value, 7000);
                }
            }
        );
        $(".edit-profile-field").attr("disabled", true).removeClass("enable");
        $("#save-button").hide();
        $("#cancel-button").css("display", "none");
        $("#homepage-list").addClass("hide");
        $("#homepage-container").removeClass("line-spacing");
        $("#edit,#group-div,#homepage-name").show();
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
    $("#default-homepage").val($("#default-homepage").attr("data-original-value")).selectpicker("refresh");
    $("#homepage-list").removeClass("hide");
    $("#homepage-container").addClass("line-spacing");
    $("#save-button").show();
    $("#cancel-button").css("display", "inline");
    if (isAdUser == "false") {
        $(".edit-profile-field").attr("disabled", false).addClass("enable");
    }
    else {
        $(".edit-profile-field").attr("disabled", true).removeClass("enable");
    }
    if ($("#homepage-name").hasClass("hide")) {
        $("#no-default-homepage").addClass("hide");
    }
    else {
        $("#homepage-name").addClass("hide");
    }
    addHomepageListToolTip();
});

$(document).on("click", "#cancel-button", function (e) {
    $("#user-firstname").val(userDetails.FirstName);
    $("#user-email").val(userDetails.Email);
    $("#user-lastname").val(userDetails.LastName);
    $("#user-phonenumber").val(userDetails.ContactNumber);
    $(".edit-profile-field").attr("disabled", true).removeClass("enable");
    $("#homepage-list").addClass("hide");
    $("#homepage-container").removeClass("line-spacing");
    $(".alert-messages").closest("div").removeClass("has-error form-control");
    $(".alert-messages").html("");
    $("#save-button,#cancel-button").hide();
    $("#edit, #group-div,#homepage-name,#no-default-homepage").show();
    if ($("#homepage-name").text().trim() == "") {
        $("#no-default-homepage").removeClass("hide");
    }
    else {
        $("#homepage-name").removeClass("hide");
    }
});

function addHomepageListToolTip() {
    $("#default-homepage").selectpicker("refresh");
    for (var i = 0; i < $("button[data-id=default-homepage]").next().find("ul li").length; i++) {
        var title = $("button[data-id=default-homepage]").next().find(".dropdown-menu.selectpicker li").eq(i).find("a .text").text();
        $("button[data-id=default-homepage]").next().find(".dropdown-menu.selectpicker li").eq(i).find('a').attr("title", title);
    }
}
