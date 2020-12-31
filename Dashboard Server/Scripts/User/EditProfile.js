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
    }, window.Server.App.LocalizationContent.IsValidEmail);

    $.validator.addMethod("isValidName", function (value, element) {
        return IsValidName("name", value)
    }, window.Server.App.LocalizationContent.AvoidSpecialCharactors);

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, window.Server.App.LocalizationContent.ItemNameValidator);

    $.validator.addMethod("isValidPhoneNumber", function (value, element) {
        return IsValidContactNumber(value);
    }, window.Server.App.LocalizationContent.PhoneNumberValidator);
   
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
                isRequired: Window.EmailAddressValidator
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
});

function editUser(fulldata) {
    var specficuserdetails = fulldata;
    userDetails = fulldata;
    $("#user-email").val(specficuserdetails.Email);
    $("#user-head").html(specficuserdetails.FirstName + " " + specficuserdetails.LastName);
    if (specficuserdetails.Avatar.trim() == "") {
        $("#user-profile-picture").siblings("#avatar-delete-click").remove();
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
        ShowWaitingProgress("#content-area", "show");
        doAjaxPost('POST',
            updateUserProfileUrl,
            {
                defaulthomepage: $("#default-homepage").val()
            },  
              function (result) {
                  ShowWaitingProgress("#content-area", "hide");
                  if (result.Data.status) {
                      if ($("#default-homepage").val() != "" && $("#default-homepage").val() != undefined) {
                          if ($("#default-homepage").find("option:selected").val() != "null") {
                              var selectedValue = $("#default-homepage").find("option:selected").text();
                              $("#homepage-name").text(selectedValue).removeClass("hide").attr("data-original-title", selectedValue);
                              if ($("#default-homepage option:eq(0)").hasClass("remove-default-homepage") == false) {
                                  $("#default-homepage option:eq(0)").before("<option class='remove-default-homepage' value='null'>" + window.Server.App.LocalizationContent.NoDefaultHomepage + "</option>");
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
                      SuccessAlert(window.Server.App.LocalizationContent.UpdateProfile, result.Data.value, 7000);
                  }else {
                      WarningAlert(window.Server.App.LocalizationContent.UpdateProfile, result.Data.value, 7000);
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

function onPictureCropEnd(coordinates) {
    $("input[name=LeftOfCropArea]").val(coordinates.x);
    $("input[name=TopOfCropArea]").val(coordinates.y);
    $("input[name=LeftToCropArea]").val(coordinates.x2);
    $("input[name=TopToCropArea]").val(coordinates.y2);
    $("input[name=height]").val(coordinates.h);
    $("input[name=width]").val(coordinates.w);
}

function saveModelLanguage() {
    ShowWaitingProgress("#content-area", "show");
    $.ajax({
        type: "POST",
        url: dataLanguageUrl,
        data: { modelLanguage: $("#model-language").val() },
        success: function (result) {
            ShowWaitingProgress("#content-area", "hide");
            if (result.Status) {
                SuccessAlert(window.Server.App.LocalizationContent.UpdateProfile, result.Message, 7000);
            } else {
                WarningAlert(window.Server.App.LocalizationContent.UpdateProfile, result.Message, 7000);
            }
            $("#user-model-dropdown-container").removeClass("data-language-cloud");
            $("#model-language").attr("disabled", true);
            $("#cancel-model-language").hide();
            $("#save-model-language").hide();
            $("#edit-model-language").show();
        }
    });
}

$(document).on("click", "#edit-model-language", function (e) {
    $("#user-model-dropdown-container").addClass("data-language-cloud");
    $("#model-language").attr("disabled", false).selectpicker("refresh");
    $("#edit-model-language").hide();
    $("#cancel-model-language").show();
    $("#save-model-language").show();
});

$(document).on("click", "#cancel-model-language", function (e) {
    $("#user-model-dropdown-container").removeClass("data-language-cloud");
    $("#model-language").attr("disabled", true);
    $("#cancel-model-language").hide();
    $("#save-model-language").hide();
    $("#edit-model-language").show();
});

$(document).on("click", "#edit", function (e) {
    var isAdUser = $("#is-aduser").html().toLowerCase();
    $("#edit,#group-div").hide();
    $("#default-homepage").val($("#default-homepage").attr("data-original-value")).selectpicker("refresh");
    $("#homepage-list").removeClass("hide");
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

function SaveUserAutosaveFilter() {
    $(".material-switch").parent().append($("<span class='col-xs-1 loader-gif'><div class='loader-blue loader-icon' id='loader-icon'><svg class='circular'><circle class='path' cx='27' cy='27' r='13' fill='none' stroke-width='4' stroke-miterlimit='10'></circle></svg></div></span>"));
    AutosaveFilterValue = {
        AutosaveFilter: $("#restrict-auto-save-filter").is(":checked")
    };

    $.ajax({
        type: "POST",
        url: userAutosaveFilterSettingsUrl,
        dataType: "json",
        data: { userAutoSaveFilterValueSettings: JSON.stringify(AutosaveFilterValue) },
        success: function (result) {
            $(".loader-gif").remove();
            if (!result.Status) {
                if (AutosaveFilterValue.AutosaveFilter) {
                    $("#restrict-auto-save-filter").prop('checked', false);
                }
                else {
                    $("#restrict-auto-save-filter").prop('checked', true);
                }
            }
        }
    });
}