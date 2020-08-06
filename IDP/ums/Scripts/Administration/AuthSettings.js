var oauthLogoChanged = false;
var openidLogoChanged = false;

$(document).ready(function () {
    addPlacehoder("body");
    $("[data-toggle='tooltip']").tooltip();
    $("[data-toggle='popover']").popover({
        container: 'body'
    });
    var scope = angular.element('#active-directory-container').scope();

    scope.$apply(function () {
        scope.oauthSettingsForm.isValidOAuthLogoUrl = (scope.oauthLogoUrl.$viewValue != '');
        scope.oauthSettingsForm.isValidOpenIdLogoUrl = (scope.openidLogoUrl.$viewValue != '');
    });

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

    $("#default-authentication-confirmation-diolog").ejDialog({
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        width: "600px",
        enableModal: true,
        showHeader: false,
        close: "authenticationDialogBoxClose",
        closeOnEscape: true
    });

    $(document).on('click',
        function (e) {
            if ($(".popover").children().hasClass("popover-content")) {
                $(".popover-content").attr("id", "popover-content");
                $(".arrow").attr("id", "arrow");
            }

            var popoverIds = [
                "popover-content",
                "arrow",
                "oauth-overwrite-settings-info",
                "oauth-provider-name-info",
                "oauth-logo-info",
                "oauth-auth-endpoint-info",
                "oauth-token-endpoint-info",
                "oauth-scopes-info",
                "oauth-user-info-endpoint-info",
                "oauth-user-data-info",
                "openid-overwrite-settings-info",
                "openid-provider-name-info",
                "openid-logo-info",
                "openid-authority-info",
                "openid-identifier-info",
                "oauth-callback-info",
                "openid-callback-info",
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

    $(document).on("click", "#oauth-callback-link-copy, #openid-callback-link-copy, #oauth-mobile-callback-link-copy, #openid-mobile-callback-link-copy", function (e) {
        $(this).siblings("input").select();
        if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
            $(this).removeClass("su su-copy");
            $(this).attr("data-original-title", "");
        }
        else {
            document.execCommand('copy');
            $(this).attr("data-original-title", "Copied");
            $(this).tooltip("hide").attr("data-original-title", window.TM.App.LocalizationContent.Copied).tooltip("fixTitle").tooltip("show");
            setTimeout(function () { $(this).attr("data-original-title", window.TM.App.LocalizationContent.ClickToCopy); $(this).tooltip(); }, 3000);
        }
    });

    $('[data-id="login-provider-type"]').css('cssText', 'outline: none !important');
    $('#login-provider-type').css('cssText', 'outline: none !important');

    if (!$("#enable-defaultauthentication").is(":checked")) {
        //$("#update-defaultauthlogin-settings").prop("disabled", true);
        $("#login-provider-type").prop("disabled", true);
    }

    $("#enable-defaultauthentication").click(function () {
        $('[data-id="login-provider-type"]').css('cssText', 'outline: none !important');
        var isChecked = $("#enable-defaultauthentication").is(":checked");
        if (isChecked) {
            var textValue = $('[data-id="login-provider-type"]').next().find("li:last").text();
            $('[data-id="login-provider-type"]').removeClass("disabled").children("span:first").text(textValue);
            if ($('[data-id="login-provider-type"]').children("span:first").text() == "None") {
                $("#update-defaultauthlogin-settings").prop("disabled", true);
            }
            $("#login-provider-type").prop("disabled", false);
            $('[data-id="login-provider-type"]').removeClass("disabled").next().find("li").removeClass("disabled");
            if ($('[data-id="login-provider-type"]').removeClass("disabled").next().find("li:first").text() == "None") {
                $('[data-id="login-provider-type"]').removeClass("disabled").next().find("li:first").addClass("disabled");
            }
        }
        else {
            $("#login-provider-type").prop("disabled", true);
            $('[data-id="login-provider-type"]').addClass("disabled").next().find("li:first").removeClass("disabled");
            $('[data-id="login-provider-type"]').children("span:first").text("None");
            $("#none-default").prop("disabled", false);
            $("#update-defaultauthlogin-settings").prop("disabled", false);
        }
    });

    if ($("#active-directory-container").is(":visible")) {
        if (location.href.match(/openid-settings/)) {
            $("#openid-settings").tab("show");
            $("#update-oauth-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
        }
        else if (location.href.match(/oauth-settings/)) {
            $("#oauth-settings").tab("show");
            $("#update-openid-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
        }
        else {
            $("#default-authentication-settings").tab("show");
            $("#update-oauth-settings").hide();
            $("#update-openid-settings").hide();
        }
    }

    $("a[data-toggle='tab']").on('click', function (e) {
        if ($(this).attr("id") == "oauth-settings") {
            $("#update-oauth-settings").show();
            $("#update-openid-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?tab=oauth-settings") {
                history.pushState(null, '', '?tab=oauth-settings');
            }
        }
        else if ($(this).attr("id") == "openid-settings") {
            $("#update-openid-settings").show();
            $("#update-oauth-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?tab=openid-settings") {
                history.pushState(null, '', '?tab=openid-settings');
            }
        }
        else if ($(this).attr("id") == "default-authentication-settings") {
            $("#update-defaultauthlogin-settings").show();
            $("#update-openid-settings").hide();
            $("#update-oauth-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?tab=defaultauth-settings") {
                history.pushState(null, '', '?tab=defaultauth-settings');
            }
        }
        else if ($(this).attr("id") == "default-authentication-settings-info") {
            $("#update-defaultauthlogin-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-oauth-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?tab=defaultauth-settings") {
                history.pushState(null, '', '?tab=defaultauth-settings');
            } updateauthsettingsUrl        }
        $(".success-message, .error-message").hide();
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

    $(document).on("click", ".image-upload", function (e) {
        var authLogo = this.name === "oauthLogoUrl" ? scope.oauthLogoUrl : scope.openidLogoUrl;
        if (authLogo === null || authLogo === undefined || authLogo === '') {
            this.name === "oauthLogoUrl" ? $("#oauth-image-upload-box").siblings(".validation-message").html(window.TM.App.LocalizationContent.SelectAuthProviderLogo)
                : $("#openid-image-upload-box").siblings(".validation-message").html(window.TM.App.LocalizationContent.SelectAuthProviderLogo);

            scope.$apply(function () {
                this.name === "oauthLogoUrl" ? scope.oauthSettingsForm.isValidOAuthLogoUrl = false : scope.oauthSettingsForm.isValidOpenIdLogoUrl = false;
            });
        }
    });

    $(".update-oauth-or-openid-settings").click(function () {
        $("#default-authentication-confirmation-diolog").ejDialog("close");
        updateSetting(this.id);
        defaultAuthentication = "";
    });

    $(document).on("click", ".update-auth-settings", function () {
        $(".logo-container .validation-message").html("");
        var authPrefix = this.id === 'update-oauth-settings' ? 'oauth' : 'openid';
        var provider = this.id === 'update-oauth-settings' ? 'oauth 2.0' : 'openid connect';
        if ((defaultAuthentication == provider) && !($("#enable-" + authPrefix).is(":checked"))) {
            $("#default-authentication-confirmation-diolog").ejDialog("open");
            $(".update-oauth-or-openid-settings").attr("id", authPrefix);
        }
        else {
            updateSetting(authPrefix);
        }
    });

    $(document).on("click", ".update-defaultauth-settings", function () {
        var authProvider = $("#enable-defaultauthentication").is(":checked") ? $('[data-id="login-provider-type"]').children("span:first").text().toLowerCase() == "oauth 2.0" ? "CustomOAuth" : "CustomOIDC" : "DefaultAuthentication";

        $.ajax({
            type: "POST",
            url: defaultauthsettingsUrl,
            data: { AuthProvider: authProvider },
            beforeSend: showWaitingPopup($("#server-app-container")),
            success: function (result) {
                hideWaitingPopup($("#server-app-container"));
                defaultAuthentication = $('#login-provider-type').find(":selected").text().toLowerCase();
                SuccessAlert(window.TM.App.LocalizationContent.AuthenticationSettings, window.TM.App.LocalizationContent.AuthSettingsUpdated, 7000);
            },
            error: function () {
                hideWaitingPopup($("#server-app-container"));
                WarningAlert(window.TM.App.LocalizationContent.AuthenticationSettings, window.TM.App.LocalizationContent.AuthSettingsUpdatedError, 7000);
            }

        });

    });

    function updateSetting(authPrefix) {
        var authSettingsData = getAuthSettingsToPost(authPrefix);
        $.ajax({
            type: "POST",
            url: window.updateauthsettingsUrl,
            data: { AuthSettingsData: JSON.stringify(authSettingsData) },
            beforeSend: showWaitingPopup($("#server-app-container")),
            success: function (result) {
                hideWaitingPopup($("#server-app-container"));
                if (result.isSuccess && result.isRestart) {
                    messageBox("su-lock",
                        window.TM.App.LocalizationContent.OpenIDConnectSettings,
                        window.TM.App.LocalizationContent.OpenIDUpdatedRestartText,
                        "success",
                        function () {
                            onCloseMessageBox();
                            $.post(unloadAppDomainUrl,   // url
                                { myData: '' }, // data to be submit
                                function (data, status) {// success callback
                                    if (data.status) {
                                        location.href = authSettingsUrl + location.search;
                                    }
                                });
                        });
                }
                else if (result.isSuccess) {
                    SuccessAlert(window.TM.App.LocalizationContent.AuthenticationSettings, window.TM.App.LocalizationContent.AuthSettingsUpdated, 7000);
                    authPrefix === 'oauth' ? oauthLogoChanged = false : openidLogoChanged = false;
                }
                else {
                    WarningAlert(window.TM.App.LocalizationContent.AuthenticationSettings, window.TM.App.LocalizationContent.AuthSettingsUpdatedError, 7000);
                }
            },
            error: function () {
                hideWaitingPopup($("#server-app-container"));
            }
        });
    }

    function getAuthSettingsToPost(authPrefix) {        
        var isEnabled = $("input[name='" + authPrefix + "IsEnabled']").is(":checked");
        var authSettingsData;
        if (isEnabled) {
            if (authPrefix === 'oauth') {
                authSettingsData = {
                    IsEnabled: isEnabled,
                    OverwriteSiteSetting: $("input[name='oauthOverwriteSiteSetting']").is(":checked"),
                    AuthProvider: $("input[name='oauthAuthenticationProvider']").val().trim(),
                    LogoUrl: scope.oauthLogoUrl,
                    IsLogoChanged: oauthLogoChanged,
                    OAuthAuthSettings: {
                        ProviderName: $("input[name='oauthProviderName']").val().trim(),
                        ClientId: $("input[name='oauthClientId']").val().trim(),
                        ClientSecret: $("input[name='oauthClientSecret']").val().trim(),
                        AuthorizationEndPoint: $("input[name='oauthAuthorizationEP']").val().trim(),
                        TokenEndPoint: $("input[name='oauthTokenEP']").val().trim(),
                        TokenEndPointMethod: $("#token-method-type").val(),
                        UserInfoEndPoint: $("input[name='oauthUserInfoEP']").val().trim(),
                        UserInfoEndPointMethod: $("#user-info-method-type").val(),
                        Scopes: $("input[name='oauthScopes']").val().trim(),
                        UserInfoEmail: $("input[name='userInfoEmail']").val().trim(),
                        UserInfoFirstname: $("input[name='userInfoFirstname']").val().trim(),
                        UserInfoLastname: $("input[name='userInfoLastname']").val().trim(),
                        Logo: $("input[name='oauthLogo']").val().trim(),
                        GroupImportSettings: getGroupImportSettings("oauth")
                    }
                };
            }
            else if (authPrefix === 'openid') {
                authSettingsData = {
                    IsEnabled: isEnabled,
                    OverwriteSiteSetting: $("input[name='openidOverwriteSiteSetting']").is(":checked"),
                    AuthProvider: $("input[name='openidAuthenticationProvider']").val().trim(),
                    LogoUrl: scope.openidLogoUrl,
                    IsLogoChanged: openidLogoChanged,
                    OIDCAuthSettings: {
                        ProviderName: $("input[name='openidProviderName']").val().trim(),
                        ClientId: $("input[name='openidClientId']").val().trim(),
                        ClientSecret: $("input[name='openidClientSecret']").val().trim(),
                        Identifier: $("input[name='openidIdentifier']").val().trim(),
                        Authority: $("input[name='openidAuthority']").val().trim(),
                        Logo: $("input[name='openidLogo']").val().trim(),
                        GroupImportSettings: getGroupImportSettings("openid")
                    }
                };
            }
            else {
                authSettingsData = {
                    IsEnabled: isEnabled,
                    LoginProvider: $("#login-provider-type").val()
                };
            }
        }
        else {
            authSettingsData = {
                IsEnabled: isEnabled,
                AuthProvider: $("input[name='" + authPrefix + "AuthenticationProvider']").val().trim()
            };
        }

        return authSettingsData;
    }

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
                throw window.TM.App.LocalizationContent.AuthImageAllowedFormat;
            }
            else if (sizeKb > 500) {
                throw window.TM.App.LocalizationContent.AuthImageAllowedSize;
            }
            else if (!file) {
                throw window.TM.App.LocalizationContent.InvalidFile;
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
                    KnownProviderType: providerType,
                    Cognito: {
                        UserPoolId: groupImportDiv.find("input[name='userPoolId']").val().trim(),
                        AwsAccesskeyId: groupImportDiv.find("input[name='awsAccesskeyId']").val().trim(),
                        AwsAccesskeySecret: groupImportDiv.find("input[name='awsAccesskeySecret']").val().trim(),
                        Region: groupImportDiv.find("input[name='cognitoRegion']").val().trim(),
                    }
                };
                break;
            case "Auth0":
                groupImportSettings = {
                    KnownProviderType: providerType,
                    Auth0: {
                        Audience: groupImportDiv.find("input[name='audience']").val().trim(),
                        ExtensionURL: groupImportDiv.find("input[name='extensionUrl']").val().trim(),
                    }                    
                };
                break;
            case "Okta":
                groupImportSettings = {
                    KnownProviderType: providerType,
                    Okta: {
                        ApiToken: groupImportDiv.find("input[name='apiToken']").val().trim(),
                    }                    
                };
                break;
            case "OneLogin":
                groupImportSettings = {
                    KnownProviderType: providerType,
                    OneLogin: {
                        ApiClientId: groupImportDiv.find("input[name='apiClientId']").val().trim(),
                        ApiClientSecret: groupImportDiv.find("input[name='apiClientSecret']").val().trim(),
                        Region: groupImportDiv.find("input[name='oneloginRegion']").val().trim(),
                    }                    
                };
                break;

            default:
                groupImportSettings = {
                    KnownProviderType: providerType,
                };
                break;
        }

        return groupImportSettings;
    }
});

function authenticationDialogBoxClose() {
    $("#default-authentication-confirmation-diolog").ejDialog("close");
}
