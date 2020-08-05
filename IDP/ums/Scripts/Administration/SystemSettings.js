var isKeyUp = false;
$(document).ready(function () {
    addPlacehoder("body");
    var loginFileExtension;
    var mainFileExtension;
    var favExtension;
    var loginFileName;
    var mainFileName;
    var favName;
    var currentDate = $.now();
    if ($("#time_format").is(":checked")) {
        $(".time").html(window.TM.App.LocalizationContent.TimeFormatTrue);
    } else {
        $(".time").html(window.TM.App.LocalizationContent.TimeFormatFalse);
    }
    $("#mail-password").show();
    $(".input-group-addon .btn.selectpicker").css("height", window.innerWidth <= 1366 ? "28" : "32");
    
    $("#upload-login-image").ejUploadbox({

        saveUrl: window.fileUploadUrl + "?imageType=loginlogo&&timeStamp=" + currentDate,
        autoUpload: true,
        showFileDetails: false,
        buttonText: { browse: ".  .  ." },
        extensionsAllow: ".PNG,.png,.jpg,.JPG,.jpeg,.JPEG",
        height: window.innerWidth <= 1366 ? 26 : 30,
        begin: function () {
            ShowWaitingProgress("#content-area", "show");
        },
        fileSelect: function (e) {
            loginFileExtension = e.files[0].extension.toLowerCase();
            loginFileName = e.files[0].name;
        },
        error: function () {
            if (loginFileExtension !== ".png" && loginFileExtension !== ".jpg" && loginFileExtension !== ".jpeg") {
                $("#upload-login-image-textbox").addClass("validation-error-image").val(window.TM.App.LocalizationContent.InValidFileFormat);
                $("#upload-login-image-textbox").closest("div").addClass("has-error");
                $("#upload-login-image-textbox").parent().find(".e-box").addClass("upload-error-border");
            }
        },
        complete: function () {
            window.SystemSettingsProperties.LoginLogo = "login_logo_" + currentDate + ".png";
            var imageUrl = window.baseRootUrl + "/content/images/application/" + "login_logo_" + currentDate + ".png?v=" + $.now();
            $("#display-login-logo").attr("src", imageUrl);
            $("#upload-login-image-textbox").removeClass("ValidationErrorImage").val(loginFileName);
            $("#upload-login-image-textbox").closest("div").removeClass("has-error");
            $("#upload-login-image-textbox").parent().find(".e-box").removeClass("upload-error-border");
            ShowWaitingProgress("#content-area", "hide");
        }
        
    });
    
    $("#upload-Main-screen-image").ejUploadbox({
        saveUrl: window.fileUploadUrl + "?imageType=mainlogo&&timeStamp=" + currentDate,
        autoUpload: true,
        showFileDetails: false,
        buttonText: { browse: ".  .  ." },
        extensionsAllow: ".PNG,.png,.jpg,.JPG,.jpeg,.JPEG",
        height: window.innerWidth <= 1366 ? 26 : 30,
        begin: function () {
            ShowWaitingProgress("#content-area", "show");
        },
        fileSelect: function (e) {
            mainFileExtension = e.files[0].extension.toLowerCase();
            mainFileName = e.files[0].name;
        },
        error: function () {
            if (mainFileExtension !== ".png" && mainFileExtension !== ".jpg" && mainFileExtension !== ".jpeg") {
                $("#upload-main-screen-image-textbox").addClass("validation-error-image").val(window.TM.App.LocalizationContent.InValidFileFormat);
                $("#upload-main-screen-image-textbox").closest("div").addClass("has-error");
                $("#upload-main-screen-image-textbox").parent().find(".e-box").addClass("upload-error-border");
            }
        },
        complete: function () {
            window.SystemSettingsProperties.MainScreenLogo = "main_logo_" + currentDate + ".png";
            var imageUrl = window.baseRootUrl + "/Content/Images/Application/" + "main_logo_" + currentDate + ".png?v=" + $.now();
            $("#mainscreen_logo_img").attr("src", imageUrl);
            $("#upload-main-screen-image-textbox").removeClass("ValidationErrorImage").val(mainFileName);
            $("#upload-main-screen-image-textbox").closest("div").removeClass("has-error");
            $("#upload-main-screen-image-textbox").parent().find(".e-box").removeClass("upload-error-border");
            ShowWaitingProgress("#content-area", "hide");
        }
    });

    $("#upload-favicon-image").ejUploadbox({
        saveUrl: window.fileUploadUrl + "?imageType=favicon&&timeStamp=" + currentDate,
        autoUpload: true,
        showFileDetails: false,
        buttonText: { browse: ".  .  ." },
        extensionsAllow: ".PNG,.png,.jpg,.JPG,.jpeg,.JPEG",
        height: window.innerWidth <= 1366 ? 26 : 30,
        begin: function () {
            ShowWaitingProgress("#content-area", "show");
        },
        fileSelect: function (e) {
            favExtension = e.files[0].extension.toLowerCase();
            favName = e.files[0].name;
        },
        error: function (e) {
            if (favExtension !== ".png" && favExtension !== ".jpg" && favExtension !== ".jpeg") {
                $("#upload-favicon-image-textbox").addClass("validation-error-image").val(window.TM.App.LocalizationContent.InValidFileFormat);
                $("#upload-favicon-image-textbox").closest("div").addClass("has-error");
                $("#upload-favicon-image-textbox").parent().find(".e-box").addClass("upload-error-border");
            }
        },
        complete: function () {
            window.SystemSettingsProperties.FavIcon = "favicon_" + currentDate + ".png";
            var imageUrl = window.baseRootUrl + "/Content/Images/Application/" + "favicon_" + currentDate + ".png?v=" + $.now();
            $("#favicon_logo_img").attr("src", imageUrl);
            $("#upload-favicon-image-textbox").removeClass("ValidationErrorImage").val(favName);
            $("#upload-favicon-image-textbox").closest("div").removeClass("has-error");
            $("#upload-favicon-image-textbox").parent().find(".e-box").removeClass("upload-error-border");
            ShowWaitingProgress("#content-area", "hide");
        }
    });

    $("div.date-format-radio input[type=radio]").each(function () {
        if (this.value == window.SystemSettingsProperties.DateFormat) {
            $("#" + this.id).attr("checked", "checked");
        }
    });

    $(".mail-settings-fields:not('#mail-password')").keyup(function (e) {
        getEmailPassword();
    });

    $("#enable-ssl").on("change", function () {
        if ($(this).val() === "https") {
            $("#help_text").css("display", "block");
        } else {
            $("#help_text").css("display", "none");
        }
    });

    $("#help_text").on("click", function () {
        $("#ssl-help-message").toggle();
    });

    $("#UpdateSystemSettings,#UpdateSystemSettings-bottom,#UpdateDatabaseSettings-bottom,#update-mail-settings").on("click", function () {
        var messageHeader = $(this).hasClass("update-system-settings") ? window.TM.App.LocalizationContent.SiteSettings : window.TM.App.LocalizationContent.EmailSettings;
        var enableSecureMail = $("#secure-mail-authentication").is(":checked");
        RemoveUploadBoxError();
        if (!$("#look-and-feel-form").valid() || !$("#email-setting-form").valid()) {
            return;
        }

        var isUrlChange = false;
        if ($("#site_url").attr("data-original-value") != $("#site_url").val()) {
            isUrlChange = true;
        }
        var isReloadPage = false;
        if ($("#enable-ssl").val() != $("#scheme_value").attr("data-value") || $("#site_url").attr("data-original-value") !== $("#site_url").val()) {
            isReloadPage = true;
        }
        var siteURL = $("#site_url").val();
        var isMailSettingsChanged = false;
        var isMailPasswordChanged = false;
        var mailSettings = new Object;
        if (parseInt($("#port-number").val()) != window.SystemSettingsProperties.MailSettingsPort
            || $("#smtp-address").val() != window.SystemSettingsProperties.MailSettingsHost
            || $("#mail-display-name").val() != window.SystemSettingsProperties.MailSettingsSenderName
            || $("#mail-user-name").val() != window.SystemSettingsProperties.MailSettingsAddress
            || enableSecureMail != window.SystemSettingsProperties.MailSettingsIsSecureAuthentication) {
            isMailSettingsChanged = true;

            mailSettings = {
                Address: $("#mail-user-name").val(),
                Password: $("#mail_password").val(),
                Host: $("#smtp-address").val(),
                SenderName: $("#mail-display-name").val(),
                Port: parseInt($("#port-number").val()),
                IsSecureAuthentication: enableSecureMail
            }
        }

        if ($("#mail-password").val() !== "") {
            isMailPasswordChanged = true;
        }

        var systemSettingsData = {
            OrganizationName: $("#site-orgname").val(),
            LoginLogo: window.SystemSettingsProperties.LoginLogo,
            MainScreenLogo: window.SystemSettingsProperties.MainScreenLogo,
            FavIcon: window.SystemSettingsProperties.FavIcon,
            WelcomeNoteText: $("#txt_welcome_note").val(),
            TimeZone: $("#time-zone").val(),
            DateFormat: $("input:radio[name=date_format]:checked").val(),
            MailSettingsAddress: $("#mail-user-name").val(),
            MailSettingsAuthType: parseInt($("#mail-authentication-type").val()),
            MailSettingsUserName: parseInt($("#mail-authentication-type").val()) === 1 ? $("#sender-user-name").val() : "",
            MailSettingsPassword: parseInt($("#mail-authentication-type").val()) === 1 ? $("#mail-password").val() : "",
            MailSettingsHost: $("#smtp-address").val(),
            MailSettingsSenderName: $("#mail-display-name").val(),
            MailSettingsPort: parseInt($("#port-number").val()),
            MailSettingsIsSecureAuthentication: enableSecureMail,
            BaseUrl: $("#enable-ssl").val() + "://" + $("#site_url").val(),
            MachineName: $("#machineName").val(),
            HostDomain: $("#hostDomain").val(),
            IsSecureConnection: $("#enable-ssl").val() === "https",
            Language: $("#language").val(),
            IsEnablePoweredBySyncfusion: $("#enablepoweredbysyncfusion").is(":checked"),
            IsEnableCopyrightInfo: $("#enablecopyrightinfo").is(":checked"),
            TimeFormat: $("#time_format").is(":checked")
            };

        $.ajax({
            type: "POST",
            url: window.updateSystemSettingsUrl,
            data: { systemSettingsData: JSON.stringify(systemSettingsData) },
            beforeSend: showWaitingPopup($("#server-app-container")),
            success: function (result) {
                if (isReloadPage) {
                    if (isUrlChange) {
                        window.location.href = $("#enable-ssl").val() + "://" + siteURL + location.pathname;
                    }
                    else {
                        window.location.href = $("#enable-ssl").val() + "://" + location.host + location.pathname;
                    }
                } else {
                    $("#application-logo").attr("src", window.baseRootUrl + "/content/images/application/" + systemSettingsData.MainScreenLogo);
                    var link = document.createElement("link");
                    link.type = "image/x-icon";
                    link.rel = "shortcut icon";
                    link.href = window.baseRootUrl + "/content/images/application/" + systemSettingsData.FavIcon;
                    document.getElementsByTagName("head")[0].appendChild(link);
                    var pageTitle = $("#site-orgname").val() + " | " + document.title.split("-")[1];
                    document.title = pageTitle;
                }

                if (result.status) {
                   if($("#enablepoweredbysyncfusion").is(":checked")){
                            $("#poweredbysyncfusion").removeClass("hide").addClass("show");
                        } else {
                            $("#poweredbysyncfusion").removeClass("show").addClass("hide");
                        }
                   if ($("#enablecopyrightinfo").is(":checked")) {
                            $("#copyrightinfo").removeClass("hide").addClass("show");
                        } else {
                            $("#copyrightinfo").removeClass("show").addClass("hide");
                        }
                   if ($("#enablepoweredbysyncfusion").is(":checked") && $("#enablecopyrightinfo").is(":checked")) {
                            $("#footer-separator").removeClass("hide").addClass("show");
                        } else {
                            $("#footer-separator").removeClass("show").addClass("hide");
                   }
                    SuccessAlert(messageHeader, window.TM.App.LocalizationContent.SiteSettingsUpdated, 7000);
                    SetCookie();
                } else {
                    WarningAlert(messageHeader, window.TM.App.LocalizationContent.SiteSettingsUpdateFalied, 7000);
                    $(".error-message, .success-message").css("display", "none");
                }
                hideWaitingPopup($("#server-app-container"));
            }
        });
    });

    $(document).on("click", "#time_format", function () {
        if ($("#time_format").is(":checked")) {
            $(".time").html(window.TM.App.LocalizationContent.TimeFormatTrue);
        } else {
            $(".time").html(window.TM.App.LocalizationContent.TimeFormatFalse);
        }
    });

    $("#update-active-dir-settings").on("click", function () {
        var adSettingsData = {
            UserName: $("#username").val().trim(),
            Password: $("#password").val().trim(),
            LdapURL: $("#ldapurl").val().trim(),
            EnableSsl: $("#enable-ldap-ssl").is(":checked"),
            DistinguishedName: $("#distinguished-name").val(),
            PortNo: $("#ldap-port-number").val().trim()
        };

        $.ajax({
            type: "POST",
            url: window.updateAdSettingsUrl,
            data: { ADSettingsData: JSON.stringify(adSettingsData) },
            beforeSend: showWaitingPopup($("#server-app-container")),
            success: function (result) {
                if (result.status) {
                    SuccessAlert(window.TM.App.LocalizationContent.ADSettings, window.TM.App.LocalizationContent.SiteSettingsUpdated, 7000);
                }
                else {
                    WarningAlert(window.TM.App.LocalizationContent.ADSettings, window.TM.App.LocalizationContent.SiteSettingsUpdateFalied, 7000);
                }
                $(".error-message, .success-message").css("display", "none");
            },
            complete: function() {
                hideWaitingPopup($("#server-app-container"));
            }
        });
    });

    $.validator.addMethod("isValidUrl", function (value, element) {
        var givenUrl = $("#enable-ssl").val() + "://" + $("#site_url").val();
        var url = parseURL(givenUrl);
        if (parseInt(url.port) > 65535)
            return false;
        else
            return true;
    }, window.TM.App.LocalizationContent.IsValidUrl);

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, window.TM.App.LocalizationContent.EnterName);

    $.validator.addMethod("isValidName", function (value, element) {
        return IsValidName("name", value);
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters);

    $.validator.addMethod("isValidEmail", function (value, element) {
        return IsEmail(value);
    }, window.TM.App.LocalizationContent.InvalidEmailAddress);

    $("#look-and-feel-form").validate({
        errorElement: "span",
        onkeyup: function (element, event) {
            if (event.keyCode !== 9)
                $(element).valid();
            else
                true;
        },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            "site_url": {
                isRequired: true,
                isValidUrl: true
            }
        },
        highlight: function (element) {
            $(element).closest("div").addClass("has-error");
        },
        unhighlight: function (element) {
            $(element).closest("div").removeClass("has-error");
            $(element).parent().parent().next().next().find("span.validation-errors").html("");
        },
        errorPlacement: function (error, element) {
            $(element).parent().parent().next().next().find("span.validation-errors").html(error);
        },
        messages: {
            "site_url": {
                isRequired: window.TM.App.LocalizationContent.Urlvalidator
            }
        }
    });

    $("#email-setting-form").validate({
        errorElement: "span",
        onkeyup: function (element, event) {
            if (event.keyCode != 9) {
                isKeyUp = true;
                if (element.id !== "mail-password") {
                    $(element).valid();
                }
                else {
                    if ($(element).val() !== "") {
                        $(element).valid();
                    }
                }
                isKeyUp = false;
            }
            else
                true;
        },
        onfocusout: function (element) {
            if (element.id !== "mail-password") {
                $(element).valid();
            }
            else {
                if ($(element).val() === "") {
                    $(element).valid();
                }
            }
        },
        rules: {
            "smtp_address": {
                isRequired: true
            },
            "port_number": {
                isRequired: true
            },
            "mail_display_name": {
                isRequired: true,
                isValidName: true
            },
            "mail_user_name": {
                isRequired: true,
                isValidEmail: true
            },
            "mail_password": {
                required: true
            },
            "sender_user_name": {
                required: true
            }
        },
        highlight: function (element) {
            $(element).closest(".form-group").addClass("has-error");
        },
        unhighlight: function (element) {
            $(element).closest(".form-group").removeClass("has-error");
            $(element).parent().find("span.validation-errors").html("");
        },
        errorPlacement: function (error, element) {
            $(element).parent().find("span.validation-errors").html(error);
        },
        messages: {
            "smtp_address": {
                isRequired: window.TM.App.LocalizationContent.MailSMTPServerValidator
            },
            "port_number": {
                isRequired: window.TM.App.LocalizationContent.MailSMTPPortValidator
            },
            "mail_display_name": {
                isRequired: window.TM.App.LocalizationContent.SenderNameValidator
            },
            "mail_user_name": {
                isRequired: window.TM.App.LocalizationContent.SenderEmailValidator
            },
            "mail_password": {
                required: window.TM.App.LocalizationContent.PasswordValidator
            },
            "sender_user_name": {
                required: window.TM.App.LocalizationContent.UserNameValidator
            }
        }
    });

    $(document).on("change", "#mail-password , #sender-user-name",function () {
        if ($("#mail-password").val() !== "" )
            $("#mail-password-error").remove();
        if ($("#sender-user-name").val() !== "")
            $("#sender-user-name-error").remove();
            });
  
    $("a[data-toggle='tab']").on('click', function (e) {
        if ($(this).attr("id") == "azure-ad") {
            $("#update-active-dir-settings").hide();
            $("#UpdateAzureADSettings-bottom").removeClass("hidden");
            $("#save-db-settings").hide();
            $("#connect-database").hide();
            $("#change-connection").hide();
            $("#azure-ad-tab span.validation-message").addClass("ng-hide").parent().removeClass("has-error");
        }
        else if ($(this).attr("id") == "windows-ad") {
            $("#UpdateAzureADSettings-bottom").addClass("hidden");
            $("#update-active-dir-settings").show();
            $("#save-db-settings").hide();
            $("#connect-database").hide();
            $("#change-connection").hide();
            $("#windows-ad-tab .error").hide().parent().parent().removeClass("has-error");
        }
        else {
            if ($("#schema-selection").length == 0) {
                    $("#connect-database").show();
                    $("#save-db-settings").hide();
                    $("#update-active-dir-settings").hide();
                    $("#change-connection").hide();
                    $("#UpdateAzureADSettings-bottom").addClass("hidden");
            } else {
                $("#change-connection").trigger("click");
                $("#connect-database").show();
                $("#save-db-settings").hide();
                $("#update-active-dir-settings").hide();
                $("#change-connection").hide();
                $("#UpdateAzureADSettings-bottom").addClass("hidden");
            }
        }
        $(".success-message, .error-message").hide();
    });
  
    if($("#active-directory-container").is(":visible")){
        var query = (window.location.search).toString();
        if (query == "?tab=azure-ad") { 
            $("#azure-ad").tab("show");
            $("#update-active-dir-settings").hide();
            $("#UpdateAzureADSettings-bottom").removeClass("hidden");
        }
    }

    $(document).ready(function () {
        if ($("#active-directory-container").is(":visible")) {
            if (location.href.match(/azure-ad/)) {
                $("#azure-ad").tab("show");
                $("#update-active-dir-settings").hide();
                $("#UpdateAzureADSettings-bottom").removeClass("hidden");
                $("#save-db-settings").hide();
                $("#connect-database").hide();
                $("#change-connection").hide();

            }
            else if (location.href.match(/database-settings/)) {
                $("#database-settings").tab("show");
                $("#connect-database").show();
                $("#save-db-settings").hide();
                $("#update-active-dir-settings").hide();
                $("#UpdateAzureADSettings-bottom").addClass("hidden");
                $("#change-connection").hide();

            } else {
                $("#windows-ad").tab("show");
                $("#update-active-dir-settings").show();
                //$("#UpdateAzureADSettings-bottom").addClass("hidden");
                $("#save-db-settings").hide();
                $("#connect-database").hide();
                $("#change-connection").hide();

            }

        }
    });

    $(document).on("change", "#enablepoweredbysyncfusion", function () {
        if ($("#enablepoweredbysyncfusion").is(":checked") == false) {
            $("#poweredbysyncfusion").removeClass("show").hide();
        }
        else {
            $("#poweredbysyncfusion").removeClass("hide").show();
        }
        addFooterSeparator();
    });

    $(document).on("change", "#enablecopyrightinfo", function () {
        if ($("#enablecopyrightinfo").is(":checked") == false) {
            $("#copyrightinfo").removeClass("show").hide();
        }
        else {
            $("#copyrightinfo").removeClass("hide").show();
        }
        addFooterSeparator();
    });
    $("#mail-authentication-type").selectpicker("refresh");
});

$(document).on("change", "#secure-mail-authentication", function () {
    getEmailPassword();
});

$(document).on("change", "#mail-authentication-type", function () {
    var authTextBoxes = $(".mail-credentials");

    if (parseInt($(this).val()) === 1) {
        authTextBoxes.removeAttr("disabled");
    } else {
        authTextBoxes.attr("disabled", "disabled").val("").parent().parent().removeClass("has-error");
        authTextBoxes.siblings(".validation-errors").text("");
    }
});

$(document).on("mouseenter", ".highlight-image", function () {
    var image = $(this).attr("data-image").toLowerCase();

    $("#image-container").find(".tooltip-container[data-image='" + image + "']").tooltip("show");
});

$(document).on("mouseleave", ".highlight-image", function () {
    var image = $(this).attr("data-image").toLowerCase();

    $("#image-container").find(".tooltip-container[data-image='" + image + "']").tooltip("hide");
});

$(document).on("mouseenter", ".tooltip-container", function () {
    var image = $(this).attr("data-image").toLowerCase();

    $(".highlight-image[data-image='" + image + "']").find(".form-control, .input-group-addon").css({ "border-color": "#009AEF", "box-shadow": "0 2px 2px 2px #E8F9FF" });
});

$(document).on("mouseleave", ".tooltip-container", function () {
    var image = $(this).attr("data-image").toLowerCase();

    $(".highlight-image[data-image='" + image + "']").find(".form-control, .input-group-addon").removeAttr("style");
});

function ActiveDirectoryFormValidate() {
    $(".success-message").hide();
        var postData = {
            username: $("#username").val().trim(),
            password: $("#password").val().trim(),
            ldapurl: $("#ldapurl").val().trim(),
            portNo: $("#ldap-port-number").val().trim()
        }

        $.ajax({
            type: "POST",
            url: window.adTestconnectionUrl,
            data: postData,
            beforeSend: showWaitingPopup($("#server-app-container")),
            success: function (data) {
                if (data.status) {
                    $("#active-directory-setting .success-message").html("<span style='color:green'>" + data.value + "</span>");
                    $("#active-directory-setting .error-message").css("display", "none");
                    $("#active-directory-setting .success-message").css("display", "block");
                }
                else {
                    $("#active-directory-setting .error-message").html("<span style='color:red'>" + data.value + "</span>");
                    $("#active-directory-setting .success-message").css("display", "none");
                    $("#active-directory-setting .error-message").css("display", "block");
                }
            },
            complete: function() {
                hideWaitingPopup($("#server-app-container"));
            }
        });
}

function AzureADFormValidate() {
    $(".success-message").hide();
        var postData = {
            tenantName: $("#tenantName").val().trim(),
            clientId: $("#clientId").val().trim(),
            clientKey: $("#clientKey").val().trim()
        };

        $.ajax({
            type: "POST",
            url: window.azureadTestconnectionUrl,
            data: postData,
            beforeSend: showWaitingPopup($("#server-app-container")),
            success: function (data) {
                if (data.status) {
                    $("#azure-ad-setting .success-message").html("<span style='color:green'>" + data.value + "</span>");
                    $("#azure-ad-setting .error-message").css("display", "none");
                    $("#azure-ad-setting .success-message").css("display", "block");
                }
                else {
                    $("#azure-ad-setting .error-message").html("<span style='color:red'>" + data.value + "</span>");
                    $("#azure-ad-setting .success-message").css("display", "none");
                    $("#azure-ad-setting .error-message").css("display", "block");
                }
            },
            complete: function() {
                hideWaitingPopup($("#server-app-container"));
            }
        });
}

function RemoveUploadBoxError() {
    $("#upload-login-image-textbox").removeClass("ValidationErrorImage").val(window.TM.App.LocalizationContent.BrowsePath);
    $("#upload-login-image-textbox").closest("div").removeClass("has-error");
    $("#upload-login-image-textbox").parent().find(".e-box").removeClass("upload-error-border");
    $("#upload-main-screen-image-textbox").removeClass("ValidationErrorImage").val(window.TM.App.LocalizationContent.BrowsePath);
    $("#upload-main-screen-image-textbox").closest("div").removeClass("has-error");
    $("#upload-main-screen-image-textbox").parent().find(".e-box").removeClass("upload-error-border");
    $("#upload-favicon-image-textbox").removeClass("ValidationErrorImage").val(window.TM.App.LocalizationContent.BrowsePath);
    $("#upload-favicon-image-textbox").closest("div").removeClass("has-error");
    $("#upload-favicon-image-textbox").parent().find(".e-box").removeClass("upload-error-border");
}

function parseURL(str) {
    var o = parseURL.options,
		m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
		uri = {},
		i = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
};

parseURL.options = {
    strictMode: true,
    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
    q: {
        name: "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};

function SetCookie() {
    if ($("#lang_tag").val() !== $("#language").val()) {
        $.ajax({
            type: "POST",
            url: window.setLanguageUrl,
            data: { langtag: $("#language").val(), returnUrl: $("#return_url").val() + "/ums/administration" },
            success: function (result) {
                window.location.href = result.Data;
            }
        });
    }
}

$(document).on("click", "#UpdateAzureADSettings-bottom", function () {
    var adSettingsData = {
        TenantName: $("#tenantName").val().trim(),
        ClientID: $("#clientId").val().trim(),
        ClientKey: $("#clientKey").val().trim()
    };

    $.ajax({
        type: "POST",
        url: window.updateAzureADSettingsUrl,
        data: { ADSettingsData: JSON.stringify(adSettingsData) },
        beforeSend: showWaitingPopup($("#server-app-container")),
        success: function (result) {
            if (result.status) {
                SuccessAlert(window.TM.App.LocalizationContent.AzureADSettings, window.TM.App.LocalizationContent.SiteSettingsUpdated, 7000);
            }
            else {
                WarningAlert(window.TM.App.LocalizationContent.AzureADSettings, window.TM.App.LocalizationContent.SiteSettingsUpdateFalied, 7000);
            }
            $(".azure-ad-button-area .error-message, .azure-ad-button-area .success-message").css("display", "none");
            hideWaitingPopup($("#server-app-container"));
        },
        error: function() {
            hideWaitingPopup($("#server-app-container"));
        }
    });
});

function getEmailPassword() {
    var mailPassword = $("#mail-password");
    if (mailPassword.val() === "") {
        if (parseInt($("#port-number").val()) !== window.SystemSettingsProperties.MailSettingsPort ||
            $("#smtp-address").val() !== window.SystemSettingsProperties.MailSettingsHost ||
            $("#mail-display-name").val() !== window.SystemSettingsProperties.MailSettingsSenderName ||
            $("#mail-user-name").val() !== window.SystemSettingsProperties.MailSettingsAddress ||
            $("#secure-mail-authentication").is(":checked") !== window.SystemSettingsProperties.MailSettingsIsSecureAuthentication) {
            mailPassword.attr("placeholder", window.TM.App.LocalizationContent.PasswordPlaceholder).siblings(".placeholder").html(window.TM.App.LocalizationContent.PasswordPlaceholder);
        } else {
            mailPassword.attr("placeholder", "●●●●●●●●").siblings(".placeholder").html("●●●●●●●●");
        }
    }
}

function addPlacehoder(object) {
    if (regexIe8.test(userAgent)) {
        $(object).find("input[type=text][class!='hidden-input'],input[type=password][class!='hidden-input'],textarea[id='txt_welcome_note']").each(function () {
            if ($(this).val() === "") {
                $($("<div>", { "class": "placeholder", text: $(this).attr("placeholder") })).insertAfter(this).show();
            }
            else {
                $($("<div>", { "class": "placeholder", text: $(this).attr("placeholder"), "style":"display:block" })).insertAfter(this).hide();
            }
        });
    }
}

function addFooterSeparator() {
    if ($("#enablepoweredbysyncfusion").is(":checked") == true && $("#enablecopyrightinfo").is(":checked") == true) {
        $("#footer-separator").removeClass("hide").show();
    }
    else {
        $("#footer-separator").removeClass("show").hide();
    }
}