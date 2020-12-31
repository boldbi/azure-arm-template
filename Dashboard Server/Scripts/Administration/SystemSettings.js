var isKeyUp = false;
var oauthLogoChanged = false;
var openidLogoChanged = false;
var switchToggle = false;
var loginDisclaimerDetails = [];

if (!isSelfHosted) {
    var consentContentInfoDialogObj = "";
    var consentMessageText = "";
    var consentMessagetHTML = "";
    var simpleMdeLoaded = false;

    serverApp.controller('LoginDisclaimerInfoCtrl', ["$scope", "$timeout", function ($scope, $timeout) {
        $scope.loginDisclaimerEnabled = loginDisclaimer.IsEnabled;
        $scope.consentContentEnabled = loginDisclaimer.IsConsentCheckboxEnabled;
        $scope.consentContent = loginDisclaimer.ConsentContent === "" || loginDisclaimer.ConsentContent == null ? $scope.consentContentEnabled ? "I have read and accept the login disclaimer." : "By logging in you accept our login disclaimer." : loginDisclaimer.ConsentContent;
        $scope.consentTitle = loginDisclaimer.Title;

        $scope.openConsentContentInfo = function () {
            if (!simpleMdeLoaded) {
                $("#login-temp-container").hide();
                $("#login-disclaimer-container").show();
                initializeSimpleMde();
                $timeout(function () {
                    $("#login-disclaimer-container").hide();
                    $("#login-temp-container").show();
                }, 100);
            }
            consentContentInfoDialogObj.show();
            $("#consent-message").html(consentMessagetHTML);
            $("#consent-content-dialog").show();
        };

        $scope.enableLoginDisclaimer = function () {
            $scope.loginDisclaimerEnabled = $("#enablelogindisclaimer").is(":checked");
            $scope.consentContent = $scope.consentContent === "" ? $scope.consentContentEnabled ? window.Server.App.LocalizationContent.EnableConsentContent : window.Server.App.LocalizationContent.DisableConsentContent : $scope.consentContent;
            $timeout(function () {
                $scope.consentContentSplit();
            }, 100);
        };

        $scope.enableConsentContent = function () {
            $scope.consentContentEnabled = $("#enablecheckboxconsent").is(":checked");
            $timeout(function () {
                $scope.consentContentSplit();
            }, 100);
        };

        $scope.consentContentSplit = function () {
            var consentContentValue = $("#consent-content").val();
            if (consentContentValue.includes("login disclaimer")) {
                var splitContent = consentContentValue.split("login disclaimer");
                var consentContentHtml = "";
                for (var i = 0; i < splitContent.length - 1; i++) {
                    consentContentHtml += splitContent[i] + "<a onClick='openConsentContentInfo()'>login disclaimer</a>";
                }
                consentContentHtml += splitContent[splitContent.length - 1];
                consentContentValue = consentContentHtml;
            } else {
                consentContentValue += "<span id='consent-content-info'><i class='su su-info' onclick='openConsentContentInfo()'></i></span>";
            }
            $(".content-disclaimer-name").html(consentContentValue);
        };

        $scope.closeConsentContentInfo = function () {
            consentContentInfoDialogObj.hide();
        };

        $timeout(function () {
            $scope.consentContentSplit();
        }, 100);
    }]);
}

$(document).ready(function () {
    generateProfileAvatar();
    addPlacehoder("body");
    var loginFileExtension;
    var mainFileExtension;
    var favExtension;
    var loginFileName;
    var mainFileName;
    var favName;
    var currentDate = $.now();
    if (!isSelfHosted) {
        consentMessageText = loginDisclaimer.Message;
        $("#login-disclaimer-temp").html(loginDisclaimer.Message);
        $("#login-disclaimer-message").html(loginDisclaimer.Message);
        if (!loginDisclaimer.IsConsentCheckboxEnabled) {
            $("#image-container.disclaimer-content-container").addClass("hide-disclaimer-checkbox");
        }

        consentContentInfoDialogObj = new ejs.popups.Dialog({
            isModal: true,
            closeOnEscape: true,
            width: '500px',
            visible: false,
            animationSettings: { effect: 'Zoom' }
        });

        consentContentInfoDialogObj.appendTo("#consent-content-dialog");
        }

    if ($("#time_format").is(":checked")) {
        $(".time").html(window.Server.App.LocalizationContent.TimeFormat);
    } else {
        $(".time").html(window.Server.App.LocalizationContent.TimeFormatFalse);
    }

    $(document).on("change", "#system-language-preference", function () {
        switchToggle = true;
    });

    $(".input-group-addon .btn.selectpicker").css("height", window.innerWidth <= 1366 ? "28" : "32");
    $("#upload-login-image").ejUploadbox({
        saveUrl: window.fileUploadUrl + "?imageType=loginlogo&&timeStamp=" + currentDate,
        autoUpload: true,
        showFileDetails: false,
        buttonText: { browse: ".  .  ." },
        extensionsAllow: ".PNG,.png,.jpg,.JPG,.jpeg,.JPEG",
        height: window.innerWidth <= 1366 ? 26 : 30,
        begin: function () {
            ShowWaitingProgress("#server-app-container", "show");
        },
        fileSelect: function (e) {
            loginFileExtension = e.files[0].extension.toLowerCase();
            loginFileName = e.files[0].name;
        },
        error: function () {
            if (loginFileExtension !== ".png" && loginFileExtension !== ".jpg" && loginFileExtension !== ".jpeg") {
                $("#upload-login-image-textbox").addClass("validation-error-image").val(window.Server.App.LocalizationContent.InValidFileFormat);
                $("#upload-login-image-textbox").closest("div").addClass("has-error");
                $("#upload-login-image-textbox").parent().find(".e-box").addClass("upload-error-border");
            }
        },
        complete: function () {
            window.SystemSettingsProperties.LoginLogo = "login_logo_" + currentDate + ".png";
            var imageUrl = rootUrl + "/Content/images/Application/" + "login_logo_" + currentDate + ".png?v=" + $.now();
            $("#display-login-logo").attr("src", imageUrl);
            $("#upload-login-image-textbox").removeClass("ValidationErrorImage").val(loginFileName);
            $("#upload-login-image-textbox").closest("div").removeClass("has-error");
            $("#upload-login-image-textbox").parent().find(".e-box").removeClass("upload-error-border");
            ShowWaitingProgress("#server-app-container", "hide");
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
            ShowWaitingProgress("#server-app-container", "show");
        },
        fileSelect: function (e) {
            mainFileExtension = e.files[0].extension.toLowerCase();
            mainFileName = e.files[0].name;
        },
        error: function () {
            if (mainFileExtension !== ".png" && mainFileExtension !== ".jpg" && mainFileExtension !== ".jpeg") {
                $("#upload-main-screen-image-textbox").addClass("validation-error-image").val(window.Server.App.LocalizationContent.InValidFileFormat);
                $("#upload-main-screen-image-textbox").closest("div").addClass("has-error");
                $("#upload-main-screen-image-textbox").parent().find(".e-box").addClass("upload-error-border");
            }
        },
        complete: function () {
            window.SystemSettingsProperties.MainScreenLogo = "main_logo_" + currentDate + ".png";
            var imageUrl = rootUrl + "/Content/images/Application/" + "main_logo_" + currentDate + ".png?v=" + $.now();
            $("#mainscreen_logo_img").attr("src", imageUrl);
            $("#upload-main-screen-image-textbox").removeClass("ValidationErrorImage").val(mainFileName);
            $("#upload-main-screen-image-textbox").closest("div").removeClass("has-error");
            $("#upload-main-screen-image-textbox").parent().find(".e-box").removeClass("upload-error-border");
            ShowWaitingProgress("#server-app-container", "hide");
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
            ShowWaitingProgress("#server-app-container", "show");
        },
        fileSelect: function (e) {
            favExtension = e.files[0].extension.toLowerCase();
            favName = e.files[0].name;
        },
        error: function (e) {
            if (favExtension !== ".png" && favExtension !== ".jpg" && favExtension !== ".jpeg") {
                $("#upload-favicon-image-textbox").addClass("validation-error-image").val(window.Server.App.LocalizationContent.InValidFileFormat);
                $("#upload-favicon-image-textbox").closest("div").addClass("has-error");
                $("#upload-favicon-image-textbox").parent().find(".e-box").addClass("upload-error-border");
            }
        },
        complete: function () {
            window.SystemSettingsProperties.FavIcon = "favicon_" + currentDate + ".png";
            var imageUrl = rootUrl + "/Content/images/Application/" + "favicon_" + currentDate + ".png?v=" + $.now();
            $("#favicon_logo_img").attr("src", imageUrl);
            $("#upload-favicon-image-textbox").removeClass("ValidationErrorImage").val(favName);
            $("#upload-favicon-image-textbox").closest("div").removeClass("has-error");
            $("#upload-favicon-image-textbox").parent().find(".e-box").removeClass("upload-error-border");
            ShowWaitingProgress("#server-app-container", "hide");
        }
    });

    $("#upload-emaillogo-image").ejUploadbox({
        saveUrl: window.fileUploadUrl + "?imageType=emaillogo&&timeStamp=" + currentDate,
        autoUpload: true,
        showFileDetails: false,
        buttonText: { browse: ".  .  ." },
        extensionsAllow: ".PNG,.png,.jpg,.JPG,.jpeg,.JPEG",
        height: window.innerWidth <= 1366 ? 26 : 30,
        begin: function () {
            ShowWaitingProgress("#server-app-container", "show");
        },
        fileSelect: function (e) {
            emaillogoExtension = e.files[0].extension.toLowerCase();
            emaillogoName = e.files[0].name;
        },
        error: function (e) {
            if (emaillogoExtension !== ".png" && emaillogoExtension !== ".jpg" && emaillogoExtension !== ".jpeg") {
                $("#upload-emaillogo-image-textbox").addClass("validation-error-image").val(window.Server.App.LocalizationContent.InValidFileFormat);
                $("#upload-emaillogo-image-textbox").closest("div").addClass("has-error");
                $("#upload-emaillogo-image-textbox").parent().find(".e-box").addClass("upload-error-border");
            }
        },
        complete: function () {
            window.SystemSettingsProperties.EmailLogo = "email_logo_" + currentDate + ".png";
            var imageUrl = rootUrl + "/Content/images/Application/" + "email_logo_" + currentDate + ".png?v=" + $.now();
            $("#email_logo_img").attr("src", imageUrl);
            $("#upload-emaillogo-image-textbox").removeClass("ValidationErrorImage").val(emaillogoName);
            $("#upload-emaillogo-image-textbox").closest("div").removeClass("has-error");
            $("#upload-emaillogo-image-textbox").parent().find(".e-box").removeClass("upload-error-border");
            ShowWaitingProgress("#server-app-container", "hide");
        }
    });

    $("div.date-format-radio input[type=radio]").each(function () {
        if (this.value == window.SystemSettingsProperties.DateFormat) {
            $("#" + this.id).attr("checked", "checked");
        }
    });

    $("#help_text").on("click", function () {
        $("#ssl-help-message").toggle();
    });

    $("#UpdateSystemSettings,#UpdateSystemSettings-bottom,#UpdateDatabaseSettings-bottom,#update-mail-settings").on("click", function () {
        var messageHeader = $(this).hasClass("update-system-settings") ? window.Server.App.LocalizationContent.SiteSettings : window.Server.App.LocalizationContent.EmailSettings;
        var enableSecureMail = $("#secure-mail-authentication").is(":checked");
        RemoveUploadBoxError();
        if (!$("#look-and-feel-form").valid() || (isSelfHosted && !$("#email-setting-form").valid())) {
            return;
        }

        if (!isSelfHosted && consentMessageText === "") {
            $("#login-disclaimer-container .validation-errors").html(window.Server.App.LocalizationContent.LoginDisclaimerMessageValidator);
            return;
        }
        var siteURL = $("#site-base-url").val();
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

        if (!isSelfHosted) {
            loginDisclaimerDetails = {
                IsEnabled: $("#enablelogindisclaimer").is(":checked"),
                IsConsentCheckboxEnabled: $("#enablecheckboxconsent").is(":checked"),
                ConsentContent: $("#consent-content").val().trim(),
                Title: $("#login-disclaimer-title").val().trim(),
                Message: consentMessageText
            };
        }

        var systemSettingsData = {
            OrganizationName: $("#site-orgname").val(),
            LoginLogo: window.SystemSettingsProperties.LoginLogo,
            MainScreenLogo: window.SystemSettingsProperties.MainScreenLogo,
            FavIcon: window.SystemSettingsProperties.FavIcon,
            EmailLogo: window.SystemSettingsProperties.EmailLogo,
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
            MachineName: $("#machineName").val(),
            HostDomain: $("#hostDomain").val(),
            Language: $("#language").val(),
            ModelLanguage: $("#model-language").val(),
            IsEnablePoweredBySyncfusion: $("#enablepoweredbysyncfusion").is(":checked"),
            IsEnableCopyrightInfo: $("#enablecopyrightinfo").is(":checked"),
            TimeFormat: $("#time_format").is(":checked"),
            ActivationType: $("input:radio[name=activation]:checked").val(),
            IsSecureConnection: $("#enable-ssl").val() === "https",
            IsSystemLanguagePreference: $("#system-language-preference").is(":checked"),
            LoginDisclaimer: loginDisclaimerDetails
        };

        var isUrlChange = false;
        var isReloadPage = false;
        if (isSelfHosted) {
            if ($("#site-base-url").attr("data-original-value") != $("#site-base-url").val()) {
                isUrlChange = true;
            }
            if ($("#enable-ssl").val() != $("#scheme_value").attr("data-value") || $("#site-base-url").attr("data-original-value") !== $("#site-base-url").val()) {
                isReloadPage = true;
            }

            systemSettingsData.BaseUrl = $("#enable-ssl").val() + "://" + $("#site-base-url").val();
        }

        $.ajax({
            type: "POST",
            url: window.updateSystemSettingsUrl,
            data: { systemSettingsData: JSON.stringify(systemSettingsData) },
            beforeSend: showWaitingPopup($("#server-app-container")),
            success: function (result) {
                if (isReloadPage) {
                    if (isUrlChange) {
                        window.location.href = $("#enable-ssl").val() + "://" + siteURL + "/administration";
                    }
                    else {
                        window.location.href = $("#enable-ssl").val() + "://" + location.host + location.pathname;
                    }
                } else {
                    $("#main_screen_logo a img").attr("src", rootUrl + "/Content/images/Application/" + systemSettingsData.MainScreenLogo);
                    var link = document.createElement("link");
                    link.type = "image/x-icon";
                    link.rel = "shortcut icon";
                    link.href = rootUrl + "/Content/images/Application/" + systemSettingsData.FavIcon;
                    document.getElementsByTagName("head")[0].appendChild(link);
                    var pageTitle = document.title.split("-")[0] + " - " +  $("#site-orgname").val();
                    document.title = pageTitle;
                }

                if (result.status) {
                    if ($("#enablepoweredbysyncfusion").is(":checked")) {
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
                    SuccessAlert(messageHeader, window.Server.App.LocalizationContent.SettingsSuccessAlert, 7000);
                    SetCookie();
                } else {
                    WarningAlert(messageHeader, window.Server.App.LocalizationContent.SettingsWarningAlert, 7000);
                    $(".error-message, .success-message").css("display", "none");
                }
                hideWaitingPopup($("#server-app-container"));
            }
        });
    });

    $(document).on("click", "#time_format", function () {
        if ($("#time_format").is(":checked")) {
            $(".time").html(window.Server.App.LocalizationContent.TimeFormatTrue);
        } else {
            $(".time").html(window.Server.App.LocalizationContent.TimeFormatFalse);
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
                    SuccessAlert(window.Server.App.LocalizationContent.ADSettings, window.Server.App.LocalizationContent.SettingsSuccessAlert, 7000);
                    if (result.redirectTo !== undefined && result.redirectTo !== "") {
                        window.location.href = result.redirectTo;
                    }
                }
                else {
                    WarningAlert(window.Server.App.LocalizationContent.ADSettings, window.Server.App.LocalizationContent.SettingsWarningAlert, 7000);
                }
                $(".error-message, .success-message").css("display", "none");
            },
            complete: function () {
                hideWaitingPopup($("#server-app-container"));
            }
        });
    });

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, window.Server.App.LocalizationContent.ItemNameValidator);

    $.validator.addMethod("isValidName", function (value, element) {
        return IsValidName("name", value);
    }, window.Server.App.LocalizationContent.AvoidSpecialCharactors);

    $.validator.addMethod("isValidEmail", function (value, element) {
        return IsEmail(value);
    }, window.Server.App.LocalizationContent.IsValidEmail);

    if (isSelfHosted) {
        $.validator.addMethod("isValidUrl", function (value, element) {
            var givenUrl = $("#enable-ssl").val() + "://" + $("#site-base-url").val();
            var url = parseURL(givenUrl);
            if (isValidUrl(value) == false || parseInt(url.port) > 65535)
                return false;
            else
                return true;
        }, window.Server.App.LocalizationContent.IsValidUrl);

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
                "site-base-url": {
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
                "site-base-url": {
                    isRequired: window.Server.App.LocalizationContent.Urlvalidator
                }
            }
        });
    }
    else {
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
                "consent-content": {
                    isRequired: true
                },
                "login-disclaimer-title": {
                    isRequired: true,
                    isValidName: true
                },
                "login-disclaimer-temp": {
                    isRequired: true
                }
            },
            highlight: function (element) {
                $(element).closest("div").addClass("has-error");
            },
            unhighlight: function (element) {
                $(element).closest("div").removeClass("has-error");
                $(element).parent().find("div.validation-errors").html("");
            },
            errorPlacement: function (error, element) {
                $(element).parent().find("div.validation-errors").html(error);
            },
            messages: {
                "consent-content": {
                    isRequired: window.Server.App.LocalizationContent.ConsentContentValidator
                },
                "login-disclaimer-title": {
                    isRequired: window.Server.App.LocalizationContent.LoginDisclaimerTitleValidator
                },
                "login-disclaimer-temp": {
                    isRequired: window.Server.App.LocalizationContent.LoginDisclaimerMessageValidator
                }
            }
        });
    }

    $("a[data-toggle='tab']").on('click', function (e) {
        if ($(this).attr("id") == "azure-ad") {
            $("#update-active-dir-settings").hide();
            $("#UpdateAzureADSettings-bottom").removeClass("hidden");
            $("#save-db-settings").hide();
            $("#connect-database").hide();
            $("#change-connection").hide();
            $("#update-oauth-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-auth-control").hide();
            $("#azure-ad-tab span.validation-message").addClass("ng-hide").parent().removeClass("has-error");
            $(".online-help-link").attr("href", userDirectoryAzure);
            var query = (window.location.search).toString();
            if (query != "?tab=azure-ad") {
                history.pushState(null, '', '?tab=azure-ad');
                addUserDirectoryLog("azure");
            }
        }
        else if ($(this).attr("id") == "windows-ad") {
            $("#UpdateAzureADSettings-bottom").addClass("hidden");
            $("#update-active-dir-settings").show();
            $("#save-db-settings").hide();
            $("#connect-database").hide();
            $("#change-connection").hide();
            $("#update-oauth-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-auth-control").hide();
            $("#windows-ad-tab .error").hide().parent().parent().removeClass("has-error");
            $(".online-help-link").attr("href", userDirectoryWindows);
            var query = (window.location.search).toString();
            if (query != "?tab=windows-ad") {
                history.pushState(null, '', '?tab=windows-ad');
                addUserDirectoryLog("windows");
            }
        }
        else if ($(this).attr("id") == "auth-control") {
            $("#update-auth-control").show();
            $("#UpdateAzureADSettings-bottom").addClass("hidden");
            $("#update-active-dir-settings").hide();            
            $("#save-db-settings").hide();
            $("#connect-database").hide();
            $("#change-connection").hide();
            $("#update-oauth-settings").hide();
            $("#update-openid-settings").hide();
            $("#windows-ad-tab .error").hide().parent().parent().removeClass("has-error");
            $(".online-help-link").attr("href", userDirectoryAuthControl);
            var query = (window.location.search).toString();
            if (query != "?tab=auth-control") {
                history.pushState(null, '', '?tab=auth-control');
                addUserDirectoryLog("auth-control");
            }
        }
        else if ($(this).attr("id") == "oauth-settings") {
            $("#update-oauth-settings").show();
            $("#UpdateAzureADSettings-bottom").addClass("hidden");
            $("#update-active-dir-settings").hide();
            $("#save-db-settings").hide();
            $("#connect-database").hide();
            $("#change-connection").hide();
            $("#update-openid-settings").hide();
            $("#update-auth-control").hide();
            $("#windows-ad-tab .error").hide().parent().parent().removeClass("has-error");
            $(".online-help-link").attr("href", userDirectoryOauth);
            var query = (window.location.search).toString();
            if (query != "?tab=oauth-settings") {
                history.pushState(null, '', '?tab=oauth-settings');
                addUserDirectoryLog("oauth");
            }
        }
        else if ($(this).attr("id") == "openid-settings") {
            $("#update-openid-settings").show();
            $("#UpdateAzureADSettings-bottom").addClass("hidden");
            $("#update-active-dir-settings").hide();
            $("#save-db-settings").hide();
            $("#connect-database").hide();
            $("#change-connection").hide();
            $("#update-oauth-settings").hide(); 
            $("#update-auth-control").hide();
            $("#windows-ad-tab .error").hide().parent().parent().removeClass("has-error");
            $(".online-help-link").attr("href", userDirectoryOpenid);
            var query = (window.location.search).toString();
            if (query != "?tab=openid-settings") {
                history.pushState(null, '', '?tab=openid-settings');
                addUserDirectoryLog("openid");
            }
        }
        else {
            $("#update-oauth-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-auth-control").hide();
            if ($("#schema-selection").length == 0) {
                $("#connect-database").show();
                $("#save-db-settings").hide();
                $("#update-active-dir-settings").hide();
                $("#change-connection").hide();
                $("#UpdateAzureADSettings-bottom").addClass("hidden");
                var query = (window.location.search).toString();
                if (query != "?tab=database-settings") {
                    history.pushState(null, '', '?tab=database-settings');
                    addUserDirectoryLog("database");
                }
            } else {
                $("#change-connection").trigger("click");
                $("#connect-database").show();
                $("#save-db-settings").hide();
                $("#update-active-dir-settings").hide();
                $("#change-connection").hide();
                $("#UpdateAzureADSettings-bottom").addClass("hidden");
                var query = (window.location.search).toString();
                if (query != "?tab=database-settings") {
                    history.pushState(null, '', '?tab=database-settings');
                    addUserDirectoryLog("database");
                }
            }
            $(".online-help-link").attr("href", userDirectoryDatabase);
        }
        $(".success-message, .error-message").hide();
    });

    if ($("#active-directory-container").is(":visible")) {
        var query = (window.location.search).toString();
        if (query == "?tab=azure-ad") {
            $("#azure-ad").tab("show");
            $("#update-active-dir-settings").hide();
            $("#UpdateAzureADSettings-bottom").removeClass("hidden");
        }
    }

    $(document).ready(function () {
        if ($("#active-directory-container").is(":visible")) {
            if (location.href.match(/azure-ad/) || (isSelfHosted && isAzureApplication)) {
                $("#azure-ad").tab("show");
                $("#update-active-dir-settings").hide();
                $("#UpdateAzureADSettings-bottom").removeClass("hidden");
                $("#save-db-settings").hide();
                $("#connect-database").hide();
                $("#change-connection").hide();
                $("#update-oauth-settings").hide();
                $("#update-openid-settings").hide();
                $("#update-auth-control").hide();
                $(".online-help-link").attr("href", userDirectoryAzure);
                addUserDirectoryLog("azure");
            }
            else if (location.href.match(/database-settings/)) {
                $("#database-settings").tab("show");
                $("#connect-database").show();
                $("#save-db-settings").hide();
                $("#update-active-dir-settings").hide();
                $("#UpdateAzureADSettings-bottom").addClass("hidden");
                $("#change-connection").hide();
                $("#update-oauth-settings").hide();
                $("#update-openid-settings").hide();
                $("#update-auth-control").hide();
                $(".online-help-link").attr("href", userDirectoryDatabase);
                addUserDirectoryLog("database");
            }
            else if (location.href.match(/auth-control/)) {
                $("#auth-control").tab("show");
                $("#update-auth-control").show();
                $("#update-active-dir-settings").hide();
                $("#UpdateAzureADSettings-bottom").addClass("hidden");
                $("#save-db-settings").hide();
                $("#connect-database").hide();
                $("#change-connection").hide();
                $("#update-openid-settings").hide();
                $("#update-oauth-settings").hide();
                $(".online-help-link").attr("href", userDirectoryAuthControl);
                addUserDirectoryLog("auth-control");
            }
            else if (location.href.match(/oauth-settings/)) {
                $("#oauth-settings").tab("show");
                $("#update-active-dir-settings").hide();
                $("#UpdateAzureADSettings-bottom").addClass("hidden");
                $("#save-db-settings").hide();
                $("#connect-database").hide();
                $("#change-connection").hide();
                $("#update-openid-settings").hide();
                $("#update-auth-control").hide();
                $(".online-help-link").attr("href", userDirectoryOauth);
                addUserDirectoryLog("oauth");
            }
            else if (location.href.match(/openid-settings/)) {
                $("#openid-settings").tab("show");
                $("#update-active-dir-settings").hide();
                $("#UpdateAzureADSettings-bottom").addClass("hidden");
                $("#save-db-settings").hide();
                $("#connect-database").hide();
                $("#change-connection").hide();
                $("#update-oauth-settings").hide();
                $("#update-auth-control").hide();
                $(".online-help-link").attr("href", userDirectoryOpenid);
                addUserDirectoryLog("openid");
            }
            else {
                $("#windows-ad").tab("show");
                $("#update-active-dir-settings").show();
                isSelfHosted ? $("#UpdateAzureADSettings-bottom").addClass("hidden") : $("#UpdateAzureADSettings-bottom").removeClass("hidden");
                $("#save-db-settings").hide();
                $("#connect-database").hide();
                $("#change-connection").hide();
                $("#update-oauth-settings").hide();
                $("#update-openid-settings").hide();
                $("#update-auth-control").hide();
                $(".online-help-link").attr("href", userDirectoryWindows);
                addUserDirectoryLog("windows");
            }

        }
        setTimeout(function () {
            addTitleForDropdownList("#databasetype-holder");
        }, 1000);
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
});

$(document).on("mouseenter", ".tooltip-container", function () {
    var image = $(this).attr("data-image").toLowerCase();

    $(".highlight-image[data-image='" + image + "']").find(".form-control, .input-group-addon").addClass("primary-color-class");
});

$(document).on("mouseleave", ".tooltip-container", function () {
    var image = $(this).attr("data-image").toLowerCase();

    $(".highlight-image[data-image='" + image + "']").find(".form-control, .input-group-addon").removeClass("primary-color-class");
});

function initializeSimpleMde() {
    simpleMdeLoaded = true;
    var postmd = renderMdeFn("#login-disclaimer-message");
    cursorPos = postmd;
    cursorPos = postmd.value("");
    if (postmd.isPreviewActive()) {
        postmd.togglePreview();
    }
    setTimeout(function () {
        cursorPos.codemirror.focus(); cursorPos.codemirror.setCursor({ line: 0, ch: 0 });
    }, 500);

    $('#login-disclaimer-container > .CodeMirror').on("keypress, keyup", "textarea", function (e) {
        consentMessageText = postmd.value();
        if (consentMessageText.length !== 0) {
            if (consentMessageText.length <= 4000) {
                $("#login-disclaimer-container .validation-errors").html("");
                consentMessagetHTML = postmd.options.previewRender(consentMessageText).replace("#", "");
            } else {
                e.preventDefault();
                $("#login-disclaimer-container .validation-errors").html(window.Server.App.LocalizationContent.LoginDisclaimerMessageExceeds);
            }
        } else {
            $("#login-disclaimer-container .validation-errors").html(window.Server.App.LocalizationContent.LoginDisclaimerMessageValidator);
        }
    });

    postmd.value(loginDisclaimer.Message);
    consentMessagetHTML = postmd.options.previewRender(consentMessageText).replace("#", "");
}

function EnableDisclaimerMessage() {
    $("#login-temp-container").hide();
    $("#login-disclaimer-container").show();
    if (!simpleMdeLoaded) {
        initializeSimpleMde();
    }
}

function openConsentContentInfo() {
    var scope = angular.element('[ng-controller=LoginDisclaimerInfoCtrl]').scope();
    scope.openConsentContentInfo();
}

function renderMdeFn(id) {
    var simplemde = new EasyMDE({
        element: $(id)[0],
        status: false,
        spellChecker: false,
        autoDownloadFontAwesome: false,
        toolbar: [{
            name: "bold",
            action: EasyMDE.toggleBold,
            className: "su su-bold",
            title: window.Server.App.LocalizationContent.Bold
        },
        {
            name: "italic",
            action: EasyMDE.toggleItalic,
            className: "su su-italic",
            title: window.Server.App.LocalizationContent.Italic
        },
        {
            name: "heading",
            action: EasyMDE.toggleHeadingSmaller,
            className: "su su-header",
            title: window.Server.App.LocalizationContent.Heading
        },
            "|",
        {
            name: "quote",
            action: EasyMDE.toggleBlockquote,
            className: "su su-quote",
            title: window.Server.App.LocalizationContent.Quote
        },
        {
            name: "unordered-list",
            action: EasyMDE.toggleUnorderedList,
            className: "su su-list-ul",
            title: window.Server.App.LocalizationContent.Generic
        },
        {
            name: "ordered-list",
            action: EasyMDE.toggleOrderedList,
            className: "su su-list-ol",
            title: window.Server.App.LocalizationContent.Number
        },
            "|",
        {
            name: "link",
            action: EasyMDE.drawLink,
            className: "su su-link",
            title: window.Server.App.LocalizationContent.Link
        },
        {
            name: "preview",
            action: EasyMDE.togglePreview,
            className: "su su-preview no-disable",
            title: window.Server.App.LocalizationContent.Preview
        }
        ]
    });
    return simplemde;
}

function addTitleForDropdownList(className) {
    var selecterPickerList = $(className + " .selectpicker option");
    for (var i = 0; i < selecterPickerList.length; i++) {
        var hoveredtext = selecterPickerList.eq(i).attr("title");
        if (typeof (hoveredtext) !== "undefined") {
            $(className + " .btn-group .dropdown-menu li").eq(i).find("a").attr("title", hoveredtext).attr("data-toggle", "tooltip").attr("data-placement", "right").attr("data-container", "body");
        }
    }
    $("[data-toggle='tooltip'], .selectpicker").tooltip();
}

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
        complete: function () {
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
        complete: function () {
            hideWaitingPopup($("#server-app-container"));
        }
    });
}

function RemoveUploadBoxError() {
    $("#upload-login-image-textbox").removeClass("ValidationErrorImage").val(window.Server.App.LocalizationContent.BrowsePath);
    $("#upload-login-image-textbox").closest("div").removeClass("has-error");
    $("#upload-login-image-textbox").parent().find(".e-box").removeClass("upload-error-border");
    $("#upload-main-screen-image-textbox").removeClass("ValidationErrorImage").val(window.Server.App.LocalizationContent.BrowsePath);
    $("#upload-main-screen-image-textbox").closest("div").removeClass("has-error");
    $("#upload-main-screen-image-textbox").parent().find(".e-box").removeClass("upload-error-border");
    $("#upload-favicon-image-textbox").removeClass("ValidationErrorImage").val(window.Server.App.LocalizationContent.BrowsePath);
    $("#upload-favicon-image-textbox").closest("div").removeClass("has-error");
    $("#upload-favicon-image-textbox").parent().find(".e-box").removeClass("upload-error-border");
    $("#upload-emaillogo-image-textbox").removeClass("ValidationErrorImage").val(window.Server.App.LocalizationContent.BrowsePath);
    $("#upload-emaillogo-image-textbox").closest("div").removeClass("has-error");
    $("#upload-emaillogo-image-textbox").parent().find(".e-box").removeClass("upload-error-border");
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
    if ($("#lang_tag").val() !== $("#language").val() || switchToggle) {
        $.ajax({
            type: "POST",
            url: window.setLanguageUrl,
            data: { langtag: $("#language").val(), returnUrl: $("#return_url").val() + "/administration" },
            success: function (result) {
                if (typeof($("#return_url").val()) != "undefined") {
                    window.location.href = result.Data;
                }
            }
        });
    }
}

$(document).on("click", "#UpdateAzureADSettings-bottom", function () {
    var adSettingsData = {
        TenantName: $("#tenantName").val().trim(),
        ClientID: $("#clientId").val().trim(),
        ClientKey: $("#clientKey").val().trim(),
        EnableGroupUserImport: $("#import-azure-ad-group-user").is(":checked")
    };

    $.ajax({
        type: "POST",
        url: window.updateAzureADSettingsUrl,
        data: { ADSettingsData: JSON.stringify(adSettingsData) },
        beforeSend: showWaitingPopup($("#server-app-container")),
        success: function (result) {
            if (result.status) {
                SuccessAlert(window.Server.App.LocalizationContent.AzureADSettings, window.Server.App.LocalizationContent.SettingsSuccessAlert, 7000);
                if (result.redirectTo !== undefined && result.redirectTo !== "") {
                    window.location.href = result.redirectTo;
                }
            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.AzureADSettings, window.Server.App.LocalizationContent.SettingsWarningAlert, 7000);
            }
            $(".azure-ad-button-area .error-message, .azure-ad-button-area .success-message").css("display", "none");
            hideWaitingPopup($("#server-app-container"));
        },
        error: function () {
            hideWaitingPopup($("#server-app-container"));
        }
    });
});

function addPlacehoder(object) {
    if (regexIe8.test(userAgent)) {
        $(object).find("input[type=text][class!='hidden-input'],input[type=password][class!='hidden-input'],textarea[id='txt_welcome_note']").each(function () {
            if ($(this).val() === "") {
                $($("<div>", { "class": "placeholder", text: $(this).attr("placeholder") })).insertAfter(this).show();
            }
            else {
                $($("<div>", { "class": "placeholder", text: $(this).attr("placeholder"), "style": "display:block" })).insertAfter(this).hide();
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

$(document).on("click", "#upload-favicon-image-textbox", function () {
    $("#upload-favicon-image").children().find(".e-uploadinput").trigger("click");
    $("#upload-favicon-image").focus();
});

$(document).on("click", "#upload-emaillogo-image-textbox", function () {
    $("#upload-emaillogo-image").children().find(".e-uploadinput").trigger("click");
    $("#upload-emaillogo-image").focus();
});

$(document).on("click", "#upload-main-screen-image-textbox", function () {
    $("#upload-Main-screen-image").children().find(".e-uploadinput").trigger("click");
    $("#upload-Main-screen-image").focus();
});

$(document).on("click", "#upload-login-image-textbox", function () {
    $("#upload-login-image").children().find(".e-uploadinput").trigger("click");
    $("#upload-login-image").focus();
});

$(document).on('click',
    function (e) {

        $("[data-toggle='tooltip']").tooltip();
        $("[data-toggle='popover']").popover({
            container: 'body'
        });

        if ($(".popover").children().hasClass("popover-content")) {
            $(".popover-content").attr("id", "popover-content");
            $(".arrow").attr("id", "arrow");
        }

        var popoverIds = [
            "popover-content",
            "arrow",
            "oauth-provider-name-info",
            "oauth-logo-info",
            "oauth-auth-endpoint-info",
            "oauth-token-endpoint-info",
            "oauth-scopes-info",
            "oauth-user-info-endpoint-info",
            "oauth-user-data-info",
            "openid-provider-name-info",
            "openid-logo-info",
            "openid-authority-info",
            "openid-identifier-info",
            "oauth-callback-info",
            "openid-callback-info",
            "azure-ad-group-user-import-info"
        ];

        if (jQuery.inArray(e.target.id, popoverIds) === -1) {
            $(".popover").css("display", "none");
        }
        $('.popover').each(function () {
            if (!($(this).is(e.target) || $(this).has(e.target).length > 0) &&
                $(this).siblings('.popover').length !== 0 &&
                $(this).siblings('.popover').has(e.target).length === 0) {
                $(this).popover().remove();
            }
        });
    });

$(document).ready(function () {
    if ($('#active-directory-container').length > 0 && $('#auth-control').length > 0) {
        addPlacehoder("body");

        function addPlacehoder(object) {
            if (regexIe8.test(userAgent)) {
                $(object).find(
                    "input[type=text][class!='hidden-input'],input[type=password][class!='hidden-input'],textarea[id='txt_welcome_note']")
                    .each(function () {
                        if ($(this).val() === "") {
                            $($("<div>", { "class": "placeholder", text: $(this).attr("placeholder") }))
                                .insertAfter(this).show();
                        } else {
                            $($("<div>",
                                {
                                    "class": "placeholder",
                                    text: $(this).attr("placeholder"),
                                    "style": "display:block"
                                })).insertAfter(this).hide();
                        }
                    });
            }
        }
        
        $(document).on("click", "#oauth-callback-link-copy, #openid-callback-link-copy, #oauth-mobile-callback-link-copy, #openid-mobile-callback-link-copy", function (e) {
            $(this).siblings("input").select();
            if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
                $(this).removeClass("su su-copy");
                $(this).attr("data-original-title", "");
            }
            else {
                document.execCommand('copy');
                $(this).attr("data-original-title", window.Server.App.LocalizationContent.Copysuccess);
                $(this).tooltip("hide").attr("data-original-title", window.Server.App.LocalizationContent.Copysuccess).tooltip("fixTitle").tooltip("show");
                setTimeout(function () { $(this).attr("data-original-title", window.Server.App.LocalizationContent.LinkCopy); $(this).tooltip(); }, 3000);
            }
        });

        var scope = angular.element('#active-directory-container').scope();

        scope.$apply(function () {
            scope.oauthSettingsForm.isValidOAuthLogoUrl = (scope.oauthLogoUrl.$viewValue != '');
            scope.oauthSettingsForm.isValidOpenIdLogoUrl = (scope.openidLogoUrl.$viewValue != '');
        });

        scope.hideValidationMessage = function (data, name) {
            var updateAuthSettingsButton = name === "oauth" ? $("#update-oauth-settings") : $("#update-openid-settings");
            if (!data) {
                if (name === "oauth") {
                    scope.oauthSettingsForm.$setUntouched();
                    scope.oauthSettingsForm.$setPristine();
                    $("#oauth-image-upload-box").siblings(".validation-message").html("");
                }
                else {
                    scope.openidSettingsForm.$setUntouched();
                    scope.openidSettingsForm.$setPristine();
                    $("#openid-image-upload-box").siblings(".validation-message").html("");
                }

                updateAuthSettingsButton.prop("disabled", false);
            } else if (scope.oauthSettingsForm.$invalid) {
                updateAuthSettingsButton.prop("disabled", true);
            }

            $("#token-method-type").selectpicker("refresh");
            $("#user-info-method-type").selectpicker("refresh");
            $(".group-import-provider-type").selectpicker("refresh");
        };

        $(document).on("click", "#update-auth-control", function () {
            if (isSelfHosted) {
                var authControlData = "";
                if ($(".enable-global-external-providers-label").length < 1) {
                    var authControl = [];
                    authControl.push(
                        {
                            auth_type: $("#oauth-control-type").val().trim(),
                            is_enabled: $("#enable-global-oauth").is(":checked")
                        },
                        {
                            auth_type: $("#openid-control-type").val().trim(),
                            is_enabled: $("#enable-global-openid").is(":checked")
                        }
                    );

                    authControlData = JSON.stringify(authControl);
                }
                else {
                    var authControlSettings = [];
                    authControlSettings.push(
                        {
                            name: $("#external-providers-type").val().trim(),
                            is_enabled: $("#enable-global-external-providers").is(":checked")
                        }
                    );

                    var authControl = {
                        settings: authControlSettings
                    };

                    authControlData = JSON.stringify(authControl);
                }

                $.ajax({
                    type: "POST",
                url: window.updateauthcontrolUrl,
                    data: { AuthControlData: authControlData },
                    beforeSend: showWaitingPopup($("#server-app-container")),
                    success: function (result) {
                        hideWaitingPopup($("#server-app-container"));
                        if (result.Status) {
                            SuccessAlert(window.Server.App.LocalizationContent.AuthControl, window.Server.App.LocalizationContent.AuthControlUpdated, 7000);
                        } else {
                            WarningAlert(window.Server.App.LocalizationContent.AuthControl, window.Server.App.LocalizationContent.AuthControlUpdatedError + "<br/><br/>" + data.Message, 0);
                        }
                    },
                    error: function () {
                        hideWaitingPopup($("#server-app-container"));
                    }
                });
            }
            else {
                var settingsKey = "LoginOptions";
                var loginOptions = {
                    HideAzureADLogin: isNullOrWhitespace($("#login-options").val()) || !$("#login-options").val().includes("Azure AD"),
                    HideSyncfusionLogin: isNullOrWhitespace($("#login-options").val()) || !$("#login-options").val().includes("Syncfusion Login")
                }

                $.ajax({
                    type: "POST",
                    url: window.updateLoginOptionsUrl,
                    data: { systemSettingValue: JSON.stringify(loginOptions), key: settingsKey },
                    beforeSend: showWaitingPopup($("#server-app-container")),
                    success: function (result) {
                        hideWaitingPopup($("#server-app-container"));
                        if (result.Status) {
                            SuccessAlert(window.Server.App.LocalizationContent.AuthControl, window.Server.App.LocalizationContent.AuthControlUpdated, 7000);
                        } else {
                            WarningAlert(window.Server.App.LocalizationContent.AuthControl, window.Server.App.LocalizationContent.AuthControlUpdatedError, 7000);
                        }
                    },
                    error: function () {
                        hideWaitingPopup($("#server-app-container"));
                    }
                });
            }
        });

        $(document).on("click", ".update-auth-settings", function () {
            $(".logo-container .validation-message").html("");
            var authPrefix = this.id === 'update-oauth-settings' ? 'oauth' : 'openid';
            var authSettingsData = getAuthSettingsToPost(authPrefix);

            $.ajax({
                type: "POST",
                url: window.updateauthsettingsUrl,
                data: { AuthSettingsData: JSON.stringify(authSettingsData) },
                beforeSend: showWaitingPopup($("#server-app-container")),
                success: function (result) {
                    hideWaitingPopup($("#server-app-container"));
                    if (result.Status) {
                        SuccessAlert(window.Server.App.LocalizationContent.AuthenticationSettings, window.Server.App.LocalizationContent.AuthSettingsUpdated, 7000);
                        authPrefix === 'oauth' ? oauthLogoChanged = false : openidLogoChanged = false;
                    } else {
                        WarningAlert(window.Server.App.LocalizationContent.AuthenticationSettings, window.Server.App.LocalizationContent.AuthSettingsUpdatedError, 0);
                    }

                    if (typeof (result.redirectTo) !== "undefined" && result.redirectTo !== "") {
                        window.location.href = result.redirectTo;
                    }
                },
                error: function () {
                    hideWaitingPopup($("#server-app-container"));
                }
            });
        });

        function getAuthSettingsToPost(authPrefix) {
            var scope = angular.element('#active-directory-container').scope();
            var isEnabled = $("input[name='" + authPrefix + "IsEnabled']").is(":checked");
            var authSettingsData;
            if (isEnabled) {
                if (authPrefix === 'oauth') {
                    authSettingsData = {
                        is_enabled: isEnabled,
                        auth_provider: $("input[name='oauthAuthenticationProvider']").val().trim(),
                        logo_url: scope.oauthLogoUrl,
                        is_logo_changed: oauthLogoChanged,
                        o_auth_auth_settings: {
                            provider_name: $("input[name='oauthProviderName']").val().trim(),
                            client_id: $("input[name='oauthClientId']").val().trim(),
                            client_secret: $("input[name='oauthClientSecret']").val().trim(),
                            authorization_end_point: $("input[name='oauthAuthorizationEP']").val().trim(),
                            token_end_point: $("input[name='oauthTokenEP']").val().trim(),
                            token_end_point_method: $("#token-method-type").val(),
                            user_info_end_point: $("input[name='oauthUserInfoEP']").val().trim(),
                            user_info_end_point_method: $("#user-info-method-type").val(),
                            scopes: $("input[name='oauthScopes']").val().trim(),
                            user_info_email: $("input[name='userInfoEmail']").val().trim(),
                            user_info_firstname: $("input[name='userInfoFirstname']").val().trim(),
                            user_info_lastname: $("input[name='userInfoLastname']").val().trim(),
                            logo: $("input[name='oauthLogo']").val().trim(),
                            group_import_settings: getGroupImportSettings("oauth")
                        }
                    };
                }
                else {
                    authSettingsData = {
                        is_enabled: isEnabled,
                        auth_provider: $("input[name='openidAuthenticationProvider']").val().trim(),
                        logo_url: scope.openidLogoUrl,
                        is_logo_changed: openidLogoChanged,
                        oidc_auth_settings: {
                            provider_name: $("input[name='openidProviderName']").val().trim(),
                            client_id: $("input[name='openidClientId']").val().trim(),
                            client_secret: $("input[name='openidClientSecret']").val().trim(),
                            identifier: $("input[name='openidIdentifier']").val().trim(),
                            authority: $("input[name='openidAuthority']").val().trim(),
                            logo: $("input[name='openidLogo']").val().trim(),
                            group_import_settings: getGroupImportSettings("openid")
                        }
                    };
                }
            }
            else {
                authSettingsData = {
                    is_enabled: isEnabled,
                    auth_provider: $("input[name='" + authPrefix + "AuthenticationProvider']").val().trim()
                };
            }

            return authSettingsData;
        }

        $(document).on("click", ".image-upload", function (e) {
            var authLogo = this.name === "oauthLogoUrl" ? scope.oauthLogoUrl : scope.openidLogoUrl;
            if (authLogo === null || authLogo === undefined || authLogo === '') {
                this.name === "oauthLogoUrl" ? $("#oauth-image-upload-box").siblings(".validation-message").html(window.Server.App.LocalizationContent.SelectAuthProviderLogo)
                    : $("#openid-image-upload-box").siblings(".validation-message").html(window.Server.App.LocalizationContent.SelectAuthProviderLogo)

                scope.$apply(function () {
                    this.name === "oauthLogoUrl" ? scope.oauthSettingsForm.isValidOAuthLogoUrl = false : scope.oauthSettingsForm.isValidOpenIdLogoUrl = false;
                });
            }
        });

        var oauthUploadBox = $("#oauth-image-upload-box");
        var openidUploadBox = $("#openid-image-upload-box");
        oauthUploadBox.find(".image-upload")[0].addEventListener('change', getFile);
        openidUploadBox.find(".image-upload")[0].addEventListener('change', getFile);

        function getFile(e) {
            var file = e.currentTarget.files[0];
            checkType(file, e.srcElement.name);
        }

        function previewImage(file, name) {
            let img = name === 'openidLogoUrl' ? openidUploadBox.find('.js-image-preview') : oauthUploadBox.find('.js-image-preview'),
                reader = new FileReader();

            reader.onload = function () {
                scope.$apply(function () {
                    var imageUrl = 'url(' + reader.result + ')';
                    img.css('backgroundImage', imageUrl);
                    if (name === 'openidLogoUrl') {
                        scope.openidLogoUrl = imageUrl;
                        openidLogoChanged = true;
                    }
                    else {
                        scope.oauthLogoUrl = imageUrl;
                        oauthLogoChanged = true;
                    }

                    name === "openidLogoUrl" ? $("#openid-image-upload-box").siblings(".validation-message").html("") : $("#oauth-image-upload-box").siblings(".validation-message").html("");
                });
            }
            reader.readAsDataURL(file);
        }

        function checkType(file, name) {
            var valMsgTag = $('input[name="' + name + '"]').parents(".auth-image-upload-box").siblings(".validation-message");
            try {
                var validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
                var sizeKb = file.size / 1024;
                if ($.inArray(file.type, validImageTypes) < 0) {
                    throw window.Server.App.LocalizationContent.AuthImageAllowedFormat;
                }
                else if (sizeKb > 500) {
                    throw window.Server.App.LocalizationContent.AuthImageAllowedSize;
                }
                else if (!file) {
                    throw "Invalid file";
                } else {
                    previewImage(file, name);
                    valMsgTag.html("");
                    scope.$apply(function () {
                        name === "oauthLogoUrl" ? scope.oauthSettingsForm.isValidOAuthLogoUrl = true : scope.oauthSettingsForm.isValidOpenIdLogoUrl = true;
                    }); 
                }
            }
            catch (ex) {
                valMsgTag.html(ex);
                scope.$apply(function () {
                    name === "oauthLogoUrl" ? scope.oauthSettingsForm.isValidOAuthLogoUrl = false : scope.oauthSettingsForm.isValidOpenIdLogoUrl = false;
                });
            }
        }

        $(".group-import-provider-type").on("change", function () {
            var groupImportDiv = $(this).closest(".group-import");
            groupImportDiv.find(".cognito-fields, .auth0-fields, .okta-fields, .onelogin-fields").addClass("display-none");
            groupImportDiv.find("input[type='text']").val("");
            switch (this.value) {
                case "CognitoAWS":
                    groupImportDiv.find(".cognito-fields").removeClass("display-none");
                    break;
                case "Auth0":
                    groupImportDiv.find(".auth0-fields").removeClass("display-none");
                    break;
                case "Okta":
                    groupImportDiv.find(".okta-fields").removeClass("display-none");
                    break;
                case "OneLogin":
                    groupImportDiv.find(".onelogin-fields").removeClass("display-none");
                    break;

                default:
                    break;
            }
        });

        function getGroupImportSettings(authType) {
            var groupImportDiv = authType === "oauth" ? $("#oauth-group-import") : $("#openid-group-import");
            var providerType = groupImportDiv.find("select.group-import-provider-type").val();
            var groupImportSettings = null;
            switch (providerType) {
                case "CognitoAWS":
                    groupImportSettings = {
                        known_provider_type: providerType,
                        cognito: {
                            user_pool_id: groupImportDiv.find("input[name='userPoolId']").val().trim(),
                            aws_accesskey_id: groupImportDiv.find("input[name='awsAccesskeyId']").val().trim(),
                            aws_accesskey_secret: groupImportDiv.find("input[name='awsAccesskeySecret']").val().trim(),
                            region: groupImportDiv.find("input[name='cognitoRegion']").val().trim(),
                        }                        
                    };
                    break;
                case "Auth0":
                    groupImportSettings = {
                        known_provider_type: providerType,
                        auth0: {
                            audience: groupImportDiv.find("input[name='audience']").val().trim(),
                            extension_url: groupImportDiv.find("input[name='extensionUrl']").val().trim(),
                        }
                    };
                    break;
                case "Okta":
                    groupImportSettings = {
                        known_provider_type: providerType,
                        okta: {
                            api_token: groupImportDiv.find("input[name='apiToken']").val().trim(),
                        }                        
                    };
                    break;
                case "OneLogin":
                    groupImportSettings = {
                        known_provider_type: providerType,
                        one_login: {
                            api_client_id: groupImportDiv.find("input[name='apiClientId']").val().trim(),
                            api_client_secret: groupImportDiv.find("input[name='apiClientSecret']").val().trim(),
                            region: groupImportDiv.find("input[name='oneloginRegion']").val().trim(),
                        }                        
                    };
                    break;

                default:
                    groupImportSettings = {
                        known_provider_type: providerType,
                    };
                    break;
            }

            return groupImportSettings;
        }
    }
});  

$(document).on("click", "#enablelogindisclaimer", function () {
    if ($("#enablelogindisclaimer").is(":checked")) {
        $("#enablecheckboxconsent, #consent-content, #login-disclaimer-title, #login-disclaimer-temp, #login-disclaimer-message").removeAttr("disabled");
    }
    else {
        $("#enablecheckboxconsent, #consent-content, #login-disclaimer-title, #login-disclaimer-temp, #login-disclaimer-message").attr("disabled", "disabled");
        $("#consent-content, #login-disclaimer-title, #login-disclaimer-temp").closest("div").removeClass("has-error");
        $("#consent-content, #login-disclaimer-title, #login-disclaimer-temp").parent().find("div.validation-errors").html("");
        $("#login-disclaimer-temp").html(consentMessageText);
        $("#login-disclaimer-container").hide();
        $("#login-temp-container").show();
    }
});

$(document).on("click", "#enablecheckboxconsent", function () {
    if ($("#enablecheckboxconsent").is(":checked")) {
        $("#image-container.disclaimer-content-container").removeClass("hide-disclaimer-checkbox");
        $("#consent-content").val(window.Server.App.LocalizationContent.EnableConsentContent);
    }
    else {
        $("#image-container.disclaimer-content-container").addClass("hide-disclaimer-checkbox");
        $("#consent-content").val(window.Server.App.LocalizationContent.DisableConsentContent);
    }
});

$(document).on("click", ".login-option-dropdown .bootstrap-select .dropdown-menu .selectpicker li a", function (e) {
    e.stopPropagation();
    if (isNullOrWhitespace($("#login-options").val())) {
        $(".login-option-dropdown .filter-option").html(window.Server.App.LocalizationContent.SelectLoginProviders);
    }
});