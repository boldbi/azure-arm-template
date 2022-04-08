var oauthLogoChanged = false;
var openidLogoChanged = false;
var jwtLogoChanged = false;
var dialog;

$(document).ready(function () {
    addPlacehoder("body");

    signingKeyConfirmationDlg();
    var scope = angular.element('#auth-settings-container').scope();

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

    dropDownListInitialization("#login-provider-type", window.TM.App.LocalizationContent.DefaultAuthenticationSettings);
    dropDownListInitialization("#token-method-type", '');
    dropDownListInitialization("#user-info-method-type", '');
    groupImportDropDownListInitialization("#group-import-provider-oauth", window.TM.App.LocalizationContent.Provider, "Oauth");
    groupImportDropDownListInitialization("#group-import-provider-openid", window.TM.App.LocalizationContent.Provider, "OpenId");
    
    if (providerNameCount != 0) {
        document.getElementById("login-provider-type").ej2_instances[0].value = selectedDefaultAuthValue;
        document.getElementById("login-provider-type").ej2_instances[0].text = selectedDefaultAuthText;
    }

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

    if (!$("#enable-defaultauthentication").is(":checked")) {
        $("#update-defaultauthlogin-settings").prop("disabled", true);
        if (providerNameCount != 0) {
            document.getElementById("login-provider-type").ej2_instances[0].enabled = false;
        }
    }

    $("#enable-defaultauthentication").click(function () {
        var isChecked = $("#enable-defaultauthentication").is(":checked");
        if (isChecked) {
            if (providerNameCount != 0) {
                document.getElementById("login-provider-type").ej2_instances[0].enabled = true;
            }
            $('[data-id="login-provider-type"]').removeClass("disabled").next().find("li").removeClass("disabled");
            $("#update-defaultauthlogin-settings").attr("disabled", false);
        }
        else {
            if (providerNameCount != 0) {
                document.getElementById("login-provider-type").ej2_instances[0].enabled = false;
            }
            $('[data-id="login-provider-type"]').addClass("disabled");
            $("#update-defaultauthlogin-settings").prop("disabled", false);
        }
    });

    if ($("#auth-settings-container").is(":visible")) {
        if (location.href.match(/openid-settings/)) {
            $("#openid-settings").tab("show");
            $("#update-oauth-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-jwt-settings").hide();
            $("#update-saml-settings").hide();
        }
        else if (location.href.match(/oauth-settings/)) {
            $("#oauth-settings").tab("show");
            $("#update-openid-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-jwt-settings").hide();
            $("#update-saml-settings").hide();
        }
        else if (location.href.match(/jwt-settings/)) {
            $("#jwt-settings").tab("show");
            $("#update-saml-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-oauth-settings").hide();
        }
        else if (location.href.match(/azure-ad-settings/)) {
            $("#azure-ad-settings").tab("show");
            $("#update-jwt-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-oauth-settings").hide();
        }
        else if (location.href.match(/windows-ad-settings/)) {
            $("#windows-ad-settings").tab("show");
            $("#update-jwt-settings").hide();
            $("#update-saml-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-oauth-settings").hide();
        }
        else {
            $("#default-authentication-settings").tab("show");
            $("#update-oauth-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-jwt-settings").hide();
            $("#update-saml-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?view=default-authentication") {
                history.pushState(null, '', '?view=default-authentication');
            }
        }
    }

    $("a[data-toggle='tab']").on('click', function (e) {
        if ($(this).attr("id") == "oauth-settings") {
            $("#update-oauth-settings").show();
            $("#update-openid-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-jwt-settings").hide();
            $("#update-saml-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?view=oauth-settings") {
                history.pushState(null, '', '?view=oauth-settings');
            }
        }
        else if ($(this).attr("id") == "openid-settings") {
            $("#update-openid-settings").show();
            $("#update-oauth-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-jwt-settings").hide();
            $("#update-saml-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?view=openid-settings") {
                history.pushState(null, '', '?view=openid-settings');
            }
        }
        else if ($(this).attr("id") == "default-authentication-settings") {
            if (providerNameCount == 0) {
                $("#update-defaultauthlogin-settings").hide();
            }
            else {
                $("#update-defaultauthlogin-settings").show();
            }
            $("#update-openid-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-oauth-settings").hide();
            $("#update-jwt-settings").hide();
            $("#update-saml-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?view=default-authentication") {
                history.pushState(null, '', '?view=default-authentication');
            }
        }
        else if ($(this).attr("id") == "default-authentication-settings-info") {
            $("#update-defaultauthlogin-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-oauth-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-jwt-settings").hide();
            $("#update-saml-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?tab=defaultauth-settings") {
                history.pushState(null, '', '?tab=defaultauth-settings');
            } updateauthsettingsUrl
        }
        else if ($(this).attr("id") == "jwt-settings") {
            $("#update-jwt-settings").show();
            $("#update-saml-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-oauth-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?view=jwt-settings") {
                history.pushState(null, '', '?view=jwt-settings');
            }
        }
        else if ($(this).attr("id") == "azure-ad-settings") {
            $("#update-saml-settings").show();
            $("#update-jwt-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-oauth-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?view=azure-ad-settings") {
                history.pushState(null, '', '?view=azure-ad-settings');
            }
        }
        else if ($(this).attr("id") == "windows-ad-settings") {
            $("#update-windowsad-settings").show();
            $("#update-saml-settings").hide();
            $("#update-jwt-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-oauth-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?view=windows-ad-settings") {
                history.pushState(null, '', '?view=windows-ad-settings');
            }
        }
        $(".success-message, .error-message").hide();
    });

    scope.hideValidationMessage = function (data, name) {
        var updateAuthSettingsButton;
        if (name === "oauth") {
            updateAuthSettingsButton = $("#update-oauth-settings");
        }
        else if (name === "openid") {
            updateAuthSettingsButton = $("#update-openid-settings");
        }
        else if (name === "jwt") {
            updateAuthSettingsButton = $("#update-jwt-settings");
        }
        else if (name === "azuread") {
            updateAuthSettingsButton = $("#update-saml-settings");
        }
        else if (name === "defaultauthentication") {
            updateAuthSettingsButton = $("#update-defaultauthlogin-settings");
        }

        if (!data) {
            if (name === "oauth") {
                scope.oauthSettingsForm.$setUntouched();
                scope.oauthSettingsForm.$setPristine();
                $("#oauth-image-upload-box").siblings(".validation-message").html("");
            }
            else if (name === "openid") {
                scope.openidSettingsForm.$setUntouched();
                scope.openidSettingsForm.$setPristine();
                $("#openid-image-upload-box").siblings(".validation-message").html("");
            }
            else if (name === "jwt") {
                scope.jwtSettingsForm.$setUntouched();
                scope.jwtSettingsForm.$setPristine();
                $("#jwt-image-upload-box").siblings(".validation-message").html("");
            }
            else if (name === "azuread") {
                scope.ssoSettingsForm.$setUntouched();
                scope.ssoSettingsForm.$setPristine();
            }
            updateAuthSettingsButton.prop("disabled", false);
        } else {
            if (name === "oauth" && scope.oauthSettingsForm.$invalid) {
                updateAuthSettingsButton.prop("disabled", true);
            }
            else if (name === "openid" && scope.openidSettingsForm.$invalid) {
                updateAuthSettingsButton.prop("disabled", true);
            }
            else if (name === "jwt" && scope.jwtSettingsForm.$invalid) {
                updateAuthSettingsButton.prop("disabled", true);
            }
            else if (name === "azuread" && scope.ssoSettingsForm.$invalid) {
                updateAuthSettingsButton.prop("disabled", true);
            }
            else if (name === "defaultauthentication") {
                updateAuthSettingsButton.prop("disabled", true);
            }
        }

        if (name === "oauth" || name === "openid") {
            document.getElementById("group-import-provider-" + name).ej2_instances[0].enabled = $("#" + name + "IsEnabled").is(":checked");
            document.getElementById("token-method-type").ej2_instances[0].enabled = $("#" + name + "IsEnabled").is(":checked");
            document.getElementById("user-info-method-type").ej2_instances[0].enabled = $("#" + name + "IsEnabled").is(":checked");
        }

        $("span.validation-message").addClass("ng-hide");
    };

    $(document).on("focusout", "#oauth-provider-name, #oauth-authorization-endpoint", function (e) {
        OAuthOpenIdImageValidation(e);
    });

    $(document).on("focusout", "#openid-provider-name, #openid-authority", function (e) {
        OAuthOpenIdImageValidation(e);
    });

    $(document).on("focusout", "#jwt-provider-name", function (e) {
        OAuthOpenIdImageValidation(e);
    });

    function OAuthOpenIdImageValidation(e) {
        var authLogo = e.currentTarget.name === "oauthLogoUrl" || e.currentTarget.name === "oauthProviderName" || e.currentTarget.name === "oauthAuthorizationEP" ? scope.oauthLogoUrl : (e.currentTarget.name === "openidLogoUrl" || e.currentTarget.name === "openidProviderName" || e.currentTarget.name === "openidAuthority" ? scope.openidLogoUrl : scope.jwtLogoUrl);
        if (authLogo === null || authLogo === undefined || authLogo === '') {
            e.currentTarget.name === "oauthLogoUrl" || e.currentTarget.name === "oauthProviderName" || e.currentTarget.name === "oauthAuthorizationEP" ? $("#oauth-image-upload-box").siblings(".validation-message").removeClass("ng-hide").html(window.TM.App.LocalizationContent.SelectAuthProviderLogo) : ((e.currentTarget.name === "openidLogoUrl" || e.currentTarget.name === "openidProviderName" || e.currentTarget.name === "openidAuthority") ? $("#openid-image-upload-box").siblings(".validation-message").removeClass("ng-hide").html(window.TM.App.LocalizationContent.SelectAuthProviderLogo)
                : $("#jwt-image-upload-box").siblings(".validation-message").removeClass("ng-hide").html(window.TM.App.LocalizationContent.SelectAuthProviderLogo));
        }

        scope.$apply(function () {
            e.currentTarget.name === "oauthLogoUrl" || e.currentTarget.name === "oauthProviderName" || e.currentTarget.name === "oauthAuthorizationEP" ? scope.oauthSettingsForm.isValidOAuthLogoUrl = false : (e.currentTarget.name === "openidLogoUrl" || e.currentTarget.name === "openidProviderName" || e.currentTarget.name === "openidAuthority" ? scope.openidSettingsForm.isValidOpenIdLogoUrl = false : scope.jwtSettingsForm.isValidjwtLogoUrl = false);
        });
    }

    $(document).on("click", ".image-upload", function (e) {
        OAuthOpenIdImageValidation(e);
    });

    $(".update-oauth-or-openid-settings").click(function () {
        $("#default-authentication-confirmation-diolog").ejDialog("close");
        if (this.id === 'oauth' || this.id === 'openid') {
            updateSetting(this.id);
        }
        else if (this.id === 'jwt') {
            updateJwtSetting();
        }
        else if (this.id === 'sso') {
            updatesamlSetting();
        }
    });

    $(document).on("click", ".update-auth-settings", function () {
        $(".logo-container .validation-message").html("");
        var authPrefix;
        var provider;

        if (this.id === 'update-oauth-settings') {
            authPrefix = 'oauth';
            provider = $("input[name='oauthAuthenticationProvider']").val().trim();
        }
        else if (this.id === 'update-openid-settings') {
            authPrefix = 'openid';
            provider = $("input[name='openidAuthenticationProvider']").val().trim();
        }
        else if (this.id === 'update-jwt-settings') {
            authPrefix = 'jwt';
            provider = $("input[name='jwtAuthenticationProvider']").val().trim();
        }
        else if (this.id === 'update-saml-settings') {
            authPrefix = 'sso';
            provider = $("input[name='azureADAuthenticationProvider']").val().trim();
        }
        if ((defaultAuthentication == provider) && !($("#enable-" + authPrefix).is(":checked"))) {
            $("#default-authentication-confirmation-diolog").ejDialog("open");
            $(".update-oauth-or-openid-settings").attr("id", authPrefix);
        }
        else {
            if (this.id === 'update-oauth-settings' || this.id === 'update-openid-settings') {
                updateSetting(authPrefix);
            }
            else if (this.id === 'update-jwt-settings') {
                updateJwtSetting();
            }
            else if (this.id === 'update-saml-settings') {
                updatesamlSetting();
            }
            else if (this.id === 'update-windowsad-settings') {
                updateWindowsSettings();
            }

        }
    });

    scope.tenantRegex = '^(?!(ftp|https?):\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-]+(\.[a-z]{2,6})?(:\d{1,5})?(\/[a-zA-Z0-9]+[a-zA-Z0-9]*(\.[a-z]{2,8})?)*?$';

    scope.saveSsoSettings = function () {
        updatesamlSetting();
    };

    scope.saveJwtSettings = function () {
        updateJwtSetting();
    };

    function updatesamlSetting() {
        var isEnabled = $("#enable-sso").is(":checked");
        var ssoSettingsData = {
            IsEnabled: isEnabled,
            ApplicationId: $("input[name='ApplicationId']").val().trim(),
            ApplicationIdURI: $("input[name='ApplicationIdURI']").val().trim(),
            TenantName: $("input[name='TenantName']").val().trim(),
            MobileApplicationId: $("input[name='MobileApplicationId']").val().trim(),
        };
        $.ajax({
            url: updatesamlsettingsUrl,
            type: "POST",
            data: { samlSettingsData: ssoSettingsData },
            success: function (data) {
                scope.categories = data;
                if (data) {
                    SuccessAlert(window.TM.App.LocalizationContent.SSOSettings, window.TM.App.LocalizationContent.SSOSettingsUpdated, 7000);
                    window.location.href = window.location.href;
                } else {
                    WarningAlert(window.TM.App.LocalizationContent.SSOSettings, window.TM.App.LocalizationContent.SSOSettingsUpdateError, 7000);
                }
            },
            error: function (data) {
                WarningAlert(window.TM.App.LocalizationContent.SSOSettings, window.TM.App.LocalizationContent.SSOSettingsUpdateError, 7000);
            }
        });
    };

    function updateWindowsSettings() {
        var authSettingsData = {
            IsEnabled: scope.windowsAdEnabled,
            AuthProvider: "WindowsAD",
        };
        $.ajax({
            url: updateauthsettingsUrl,
            type: "POST",
            data: { AuthSettingsData: JSON.stringify(authSettingsData) },
            beforeSend: showWaitingPopup($("#server-app-container")),
            success: function (result) {
                hideWaitingPopup($("#server-app-container"));
                if (result.IsSuccess) {
                    window.location.href = window.location.href;
                    SuccessAlert(window.TM.App.LocalizationContent.WindowsAdSettings, window.TM.App.LocalizationContent.WindowsAdSettingsUpdated, 7000);
                }
                else {
                    WarningAlert(window.TM.App.LocalizationContent.WindowsAdSettings, window.TM.App.LocalizationContent.WindowsAdSettingsUpdateError, 7000);
                }
            },
            error: function () {
                hideWaitingPopup($("#server-app-container"));
            }
        });
    };

    function updateJwtSetting() {
        var jwtEnabled = $("#enable-jwt").is(":checked");
        var authSettingsData = {
            IsEnabled: jwtEnabled,
            AuthProvider: $("input[name='jwtAuthenticationProvider']").val().trim(),
            LogoUrl: scope.jwtLogoUrl,
            IsLogoChanged: jwtLogoChanged,
            JwtSettings: {
                Name: $("input[name='jwtName']").val().trim(),
                LoginUrl: $("input[name='jwtLoginUrl']").val().trim(),
                LogOutUrl: $("input[name='jwtLogOutUrl']").val().trim(),
                Logo: $("input[name='jwtLogo']").val().trim(),
            }
        };
        $.ajax({
            type: "POST",
            url: updateauthsettingsUrl,
            data: { AuthSettingsData: JSON.stringify(authSettingsData) },
            beforeSend: showWaitingPopup($("#server-app-container")),
            success: function (result) {
                hideWaitingPopup($("#server-app-container"));
                if (result.IsSuccess) {
                    window.location.href = window.location.href;
                    SuccessAlert(window.TM.App.LocalizationContent.AuthenticationSettings, window.TM.App.LocalizationContent.AuthSettingsUpdated, 7000);

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

    $(document).on("click", ".update-defaultauth-settings", function () {
        var authProvider = $("#enable-defaultauthentication").is(":checked") ? document.getElementById("login-provider-type").ej2_instances[0].value : "0";
        $.ajax({
            type: "POST",
            url: defaultauthsettingsUrl,
            data: { AuthProvider: authProvider },
            beforeSend: showWaitingPopup($("#server-app-container")),
            success: function (result) {
                if (result.Status) {
                    hideWaitingPopup($("#server-app-container"));
                    defaultAuthentication = result.AuthProvider;
                    $(".modal-body").find("p:first").find("span").html(getDefaultAuthDisplayName(defaultAuthentication));
                    SuccessAlert(window.TM.App.LocalizationContent.AuthenticationSettings, window.TM.App.LocalizationContent.AuthSettingsUpdated, 7000);
                }
                else {
                    hideWaitingPopup($("#server-app-container"));
                    WarningAlert(window.TM.App.LocalizationContent.AuthenticationSettings, window.TM.App.LocalizationContent.AuthSettingsUpdatedError, 7000);
                }
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
            beforeSend: ShowWaitingProgress("#content-area", "show"),
            success: function (result) {
                ShowWaitingProgress("#content-area", "hide");
                if (result.IsSuccess) {
                    SuccessAlert(window.TM.App.LocalizationContent.AuthenticationSettings, window.TM.App.LocalizationContent.AuthSettingsUpdated, 7000);
                    authPrefix === 'oauth' ? oauthLogoChanged = false : openidLogoChanged = false;
                    window.location.href = window.location.href;
                }
                else {
                    WarningAlert(window.TM.App.LocalizationContent.AuthenticationSettings, window.TM.App.LocalizationContent.AuthSettingsUpdatedError, 7000);
                }
            },
            error: function () {
                ShowWaitingProgress("#content-area", "hide");
            }
        });
    }

    function getAuthSettingsToPost(authPrefix) {
        var isEnabled = $("#"+authPrefix + "IsEnabled").is(":checked");
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
                        TokenEndPointMethod: document.getElementById("token-method-type").ej2_instances[0].value,
                        UserInfoEndPoint: $("input[name='oauthUserInfoEP']").val().trim(),
                        UserInfoEndPointMethod: document.getElementById("user-info-method-type").ej2_instances[0].value,
                        Scopes: $("input[name='oauthScopes']").val().trim(),
                        UserInfoEmail: $("input[name='userInfoEmail']").val().trim(),
                        UserInfoFirstname: $("input[name='userInfoFirstname']").val().trim(),
                        UserInfoLastname: $("input[name='userInfoLastname']").val().trim(),
                        Logo: $("input[name='oauthLogo']").val().trim(),
                        LogoutEndPoint: $("input[name='oauthLogoutEndpoint']").val().trim(),
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
                        LogoutUrl: $("input[name='openidLogoutUrl']").val().trim(),
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
    var jwtUploadBox = $("#jwt-image-upload-box");
    oauthUploadBox.find(".image-upload")[0].addEventListener('change', getFile);
    openidUploadBox.find(".image-upload")[0].addEventListener('change', getFile);
    jwtUploadBox.find(".image-upload")[0].addEventListener('change', getFile);

    function getFile(e) {
        var file = e.currentTarget.files[0];
        checkType(file, e.srcElement.name);
    }

    function previewImage(file, name) {
        var img;
        if (name === "oauthLogoUrl") {
            img = oauthUploadBox.find('.js-image-preview');
        }
        else if (name === "openidLogoUrl") {
            img = openidUploadBox.find('.js-image-preview');
        }
        else if (name === "jwtLogoUrl") {
            img = jwtUploadBox.find('.js-image-preview');
        }

        var reader = new FileReader();

        reader.onload = function () {
            scope.$apply(function () {
                var imageUrl = 'url(' + reader.result + ')';
                img.css('backgroundImage', imageUrl);
                if (name === 'openidLogoUrl') {
                    scope.openidLogoUrl = imageUrl;
                    openidLogoChanged = true;
                }
                else if (name === "oauthLogoUrl") {
                    scope.oauthLogoUrl = imageUrl;
                    oauthLogoChanged = true;
                }
                else if (name === "jwtLogoUrl") {
                    scope.jwtLogoUrl = imageUrl;
                    jwtLogoChanged = true;
                }

                name === "openidLogoUrl" ? $("#openid-image-upload-box").siblings(".validation-message").html("") : $("#oauth-image-upload-box").siblings(".validation-message").html("");
            });
        }
        reader.readAsDataURL(file);
    }

    function checkType(file, name) {
        var valMsgTag = $('input[name="' + name + '"]').parents(".auth-image-upload-box").siblings(".validation-message");
        try {
            var validImageTypes = ["image/jpg", "image/jpeg", "image/png", "image/svg+xml"];
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
                    if (name === 'openidLogoUrl') {
                        scope.oauthSettingsForm.isValidOpenIdLogoUrl = true;
                    }
                    else if (name === "oauthLogoUrl") {
                        scope.oauthSettingsForm.isValidOAuthLogoUrl = true
                    }
                    else if (name === "jwtLogoUrl") {
                        scope.jwtSettingsForm.isValidjwtLogoUrl = true;
                    }
                });
            }
        }
        catch (ex) {
            valMsgTag.html(ex);
            scope.$apply(function () {
                if (name === 'openidLogoUrl') {
                    scope.oauthSettingsForm.isValidOpenIdLogoUrl = true;
                }
                else if (name === "oauthLogoUrl") {
                    scope.oauthSettingsForm.isValidOAuthLogoUrl = true
                }
                else if (name === "jwtLogoUrl") {
                    scope.jwtSettingsForm.isValidjwtLogoUrl = true;
                }
            });
        }
    }

    function getGroupImportSettings(authType) {
        var groupImportDiv = authType === "oauth" ? $("#oauth-group-import") : $("#openid-group-import");
        var providerType = authType === "oauth" ? document.getElementById("group-import-provider-oauth").ej2_instances[0].value : document.getElementById("group-import-provider-openid").ej2_instances[0].value;
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

function getDefaultAuthDisplayName(provider) {
    if (provider.toLowerCase() === "customoauth") {
        return "OAuth 2.0";
    }
    else if (provider.toLowerCase() === "customoidc") {
        return "OpenID Connect";
    }
    else if (provider.toLowerCase() === "jwtsso") {
        return "JWT SSO";
    }
    else if (provider.toLowerCase() === "azuread") {
        return "Azure ADs";
    }
}

function fnCopySigningKey(inputId, buttonId) {
    if (typeof (navigator.clipboard) != 'undefined') {
        var value = $(inputId).val();
        navigator.clipboard.writeText(value)
    }
    else {
        var copyText = $(inputId);
        copyText.attr("type", "text").select();
        document.execCommand("copy");
        copyText.attr("type", "password");
    }

    setTimeout(function () {
        $(buttonId).attr("data-original-title", "Copied");
        $(buttonId).tooltip('show');
    }, 200);
    setTimeout(function () {
        $(buttonId).attr("data-original-title", "Click to Copy");
        $(buttonId).tooltip();
    }, 3000);
}

function signingKeyConfirmationDlg() {
    ej.base.enableRipple(true);
    var icontemp = '<button id="sendButton" class="e-control e-btn e-primary" data-ripple="true">' + 'OK </button>';
    var sendbutton = new ej.buttons.Button();
    dialog = new ej.popups.Dialog({
        header: 'Regenerate Signing Key',
        footerTemplate: icontemp,
        content: document.getElementById("dlgContent"),
        showCloseIcon: true,
        width: '400px',
        height: '200px',
        isModal: true,
        visible: false,
        beforeOpen: onBeforeopen

    });
    dialog.appendTo('#dialog');
    sendbutton.appendTo('#sendButton');
}

function onBeforeopen() {
    document.getElementById('dlgContent').style.visibility = 'visible';
}

function fnRegenerateSigningKey() {
    $.ajax({
        type: "POST",
        url: refreshSigningKeyUrl,
        success: function (data) {
            if (data != false) {
                SuccessAlert(window.TM.App.LocalizationContent.RegenerateKey, window.TM.App.LocalizationContent.RegenerateKeySuccess, 7000);
                $("#jwt-signing-key").val(data);
            } else {
                WarningAlert(window.TM.App.LocalizationContent.RegenerateKey, window.TM.App.LocalizationContent.RegenerateKeyError, 7000);
            }
        },
        error: function () {
            WarningAlert(window.TM.App.LocalizationContent.RegenerateKey, window.TM.App.LocalizationContent.RegenerateKeyError, 7000);
        }
    });
}

function onRegenerateSigningKeyDialogOpen() {
    dialog.show();
}

$(document).on("click", "#sendButton", function () {
    dialog.hide();
    fnRegenerateSigningKey();
});

$(document).on("keypress", "#dialog", function (ev) {
    if (ev.keyCode == 13) {
        dialog.hide();
        fnRegenerateSigningKey();
    }
});

function ongroupImportchange(args) {
    if (args.element.id === 'group-import-provider-oauth') {
        var groupImportDiv = $(".group-import-provider-type-oauth").parent(".e-input-group").closest(".group-import");
    } else {
        var groupImportDiv = $(".group-import-provider-type-openid").parent(".e-input-group").closest(".group-import");
    }
    groupImportDiv.find(".cognito-fields, .auth0-fields, .okta-fields, .onelogin-fields").addClass("display-none");
    var value = this.value;
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
}
