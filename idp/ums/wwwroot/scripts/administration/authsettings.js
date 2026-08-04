var oauthLogoChanged = false;
var openidLogoChanged = false;
var jwtLogoChanged = false;
var azureB2CLogoChanged = false;
var dialog;

$(document).ready(function () {
    jwtSigningKeyShowHide();
    addPlacehoder("body");

    signingKeyConfirmationDlg();
    var scope = createAuthSettingsState();

    function createAuthSettingsState() {
        var noOp = function () { };
        return {
            oauthLogoUrl: "",
            openidLogoUrl: "",
            jwtLogoUrl: "",
            azureB2CLogoUrl: "",
            oauthSettingsForm: { $setUntouched: noOp, $setPristine: noOp, $invalid: false, isValidOAuthLogoUrl: true, isValidOpenIdLogoUrl: true },
            openidSettingsForm: { $setUntouched: noOp, $setPristine: noOp, $invalid: false },
            jwtSettingsForm: { $setUntouched: noOp, $setPristine: noOp, $invalid: false, isValidjwtLogoUrl: true },
            ssoSettingsForm: { $setUntouched: noOp, $setPristine: noOp, $invalid: false },
            ssoSettingsb2cForm: { $setUntouched: noOp, $setPristine: noOp, $invalid: false, isValidAzureB2CLogoUrl: true },
            windowsadSettingsForm: { $setUntouched: noOp, $setPristine: noOp, $invalid: false },
            $apply: function (callback) {
                if (typeof callback === "function") {
                    callback();
                }
            }
        };
    }

    scope.$apply(function () {
        var oauthLogo = $("#oauth-image-upload-box .js-image-preview").css("background-image");
        var openidLogo = $("#openid-image-upload-box .js-image-preview").css("background-image");
        var jwtLogo = $("#jwt-image-upload-box .js-image-preview").css("background-image");
        var azureB2CLogo = $("#azure-b2c-image-upload-box .js-image-preview").css("background-image");
        scope.oauthLogoUrl = scope.oauthLogoUrl || oauthLogo;
        scope.openidLogoUrl = scope.openidLogoUrl || openidLogo;
        scope.jwtLogoUrl = scope.jwtLogoUrl || jwtLogo;
        scope.azureB2CLogoUrl = scope.azureB2CLogoUrl || azureB2CLogo;
        scope.oauthSettingsForm.isValidOAuthLogoUrl = !!scope.oauthLogoUrl && scope.oauthLogoUrl !== "none";
        scope.oauthSettingsForm.isValidOpenIdLogoUrl = !!scope.openidLogoUrl && scope.openidLogoUrl !== "none";
        scope.jwtSettingsForm.isValidjwtLogoUrl = !!scope.jwtLogoUrl && scope.jwtLogoUrl !== "none";
        scope.ssoSettingsb2cForm.isValidAzureB2CLogoUrl = !!scope.azureB2CLogoUrl && scope.azureB2CLogoUrl !== "none";
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

    var defaultAuthenticationDialog = new ejs.popups.Dialog({
        header: window.Server.App.LocalizationContent.DefaultAuthenticationConfirmation,
        showCloseIcon: true,
        width: '472px',
        close: "authenticationDialogBoxClose",
        isModal: true,
        visible: false,
        animationSettings: { effect: 'Zoom' },
        buttons: [
            {
                click: function () {
                    authenticationDialogBoxClose();
                },
                buttonModel: {
                    content: window.Server.App.LocalizationContent.NoButton
                }
            },
            {
                click: function () {
                    document.getElementById("default-authentication-confirmation-diolog").ej2_instances[0].hide();
                    if (this.id === 'oauth' || this.id === 'openid') {
                        var isValidAuthSettings = this.id === "oauth" ? validateOAuthSettingsForm({ showErrors: true }) : validateOpenIdSettingsForm({ showErrors: true });
                        if (isValidAuthSettings) {
                            updateSetting(this.id);
                        }
                    }
                    else if (this.id === 'jwt') {
            if (validateJwtSettingsForm({ showErrors: true })) {
                updateJwtSetting();
            }
        }
                    else if (this.id === 'sso') {
                        if (validateAzureAdSettingsForm({ showErrors: true })) {
                            updatesamlSetting();
                        }
                    }
                    else if (this.id === 'sso-b2c') {
                        if (validateAzureAdB2CSettingsForm({ showErrors: true })) {
                            updateAzureB2CSetting();
                        }
                    }
                    else if (this.id === 'windows-ad') {
                        updateWindowsSettings();
                    }
                },
                buttonModel: {
                    content: window.Server.App.LocalizationContent.YesButton,
                    isPrimary: true,
                    cssClass: 'update-oauth-or-openid-settings'
                }
            }
        ],
    });
    defaultAuthenticationDialog.appendTo("#default-authentication-confirmation-diolog");

    dropDownListInitialization("#login-provider-type", window.Server.App.LocalizationContent.DefaultAuthenticationSettings);
    dropDownListInitialization("#token-method-type", '');
    dropDownListInitialization("#user-info-method-type", '');
    groupImportDropDownListInitialization("#group-import-provider-oauth", window.Server.App.LocalizationContent.Provider, "Oauth");
    groupImportDropDownListInitialization("#group-import-provider-openid", window.Server.App.LocalizationContent.Provider, "OpenId");
    dropDownListInitialization("#response-type-dropdown", '');
    
    if (providerNameCount != 0) {
        document.getElementById("login-provider-type").ej2_instances[0].value = selectedDefaultAuthValue;
        document.getElementById("login-provider-type").ej2_instances[0].text = selectedDefaultAuthText;
    }

    if (providerNameCount != 0) {
        // Record initial provider and enable Save only on user-initiated provider changes (ignore programmatic init).
        var providerElem = document.getElementById("login-provider-type");
        if (providerElem && providerElem.ej2_instances && providerElem.ej2_instances[0]) {
            var loginProviderInstance = providerElem.ej2_instances[0];
            var initialDefaultProvider = loginProviderInstance.value;
            var defaultProviderInitCompleted = false;
            setTimeout(function () { defaultProviderInitCompleted = true; }, 0);

            function handleLoginProviderChange() {
                if (!defaultProviderInitCompleted) return;
                var currentVal = loginProviderInstance && loginProviderInstance.value !== undefined ? loginProviderInstance.value : (providerElem.value || '');
                var isDifferent = currentVal.toString() !== (initialDefaultProvider || '').toString();
                var shouldEnable = $("#enable-defaultauthentication").is(":checked") && isDifferent;
                $("#update-defaultauthlogin-settings").prop("disabled", !shouldEnable);
            }

            // primary: EJ2 DropDownList change event (if available)
            if (typeof loginProviderInstance.addEventListener === 'function') {
                loginProviderInstance.addEventListener('change', handleLoginProviderChange);
            }

            // minimal fallback: native/select change
            $(document).on('change', '#login-provider-type', handleLoginProviderChange);
        }
    }

    if (typeof defaultAuthEnabled !== "undefined") {
        $("#enable-defaultauthentication").prop("checked", !!defaultAuthEnabled);
    }

    initializeWindowsAdSettings();
    initializeAzureAdSettings();
    initializeAzureAdB2CSettings();
    initializeOAuthSettings();
    initializeOpenIdSettings();
    initializeJwtSettings();


    if (!$("#enable-defaultauthentication").is(":checked")) {
        $("#update-defaultauthlogin-settings").prop("disabled", true);
        if (providerNameCount != 0) {
            document.getElementById("login-provider-type").ej2_instances[0].enabled = false;
        }
    }

    $(document).on("click", "#enable-defaultauthentication", function () {
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

    function initializeWindowsAdSettings() {
        syncWindowsAdDomainState();
        validateWindowsAdDomainInput();
    }

    function syncWindowsAdDomainState() {
        var isEnabled = $("#enable-windows-ad").is(":checked");
        $("#windowsad-Settings-Domain").prop("disabled", !isEnabled);
        if (!isEnabled) {
            toggleWindowsAdDomainValidation(false, false);
            $("#update-windowsad-settings").prop("disabled", false);
        }
    }

    function validateWindowsAdDomainInput() {
        var isEnabled = $("#enable-windows-ad").is(":checked");
        if (!isEnabled) {
            toggleWindowsAdDomainValidation(false, false);
            return true;
        }

        var domain = ($("#windowsad-Settings-Domain").val() || "").trim();
        var isRequiredInvalid = domain.length === 0;
        var isPatternInvalid = !isRequiredInvalid && !/^[a-z0-9]+([\-.]{1}[a-z0-9]+)*\.[a-z]{2,6}$/i.test(domain);
        toggleWindowsAdDomainValidation(isRequiredInvalid, isPatternInvalid);
        $("#update-windowsad-settings").prop("disabled", isRequiredInvalid || isPatternInvalid);
        return !(isRequiredInvalid || isPatternInvalid);
    }

    function toggleWindowsAdDomainValidation(isRequiredInvalid, isPatternInvalid) {
        $("#windowsad-domain-required-validation").toggleClass("display-none", !isRequiredInvalid);
        $("#windowsad-domain-pattern-validation").toggleClass("display-none", !isPatternInvalid);
        $("#windowsad-domain-field-container").toggleClass("has-error", isRequiredInvalid || isPatternInvalid);
    }

    $(document).on("change", "#enable-windows-ad", function () {
        syncWindowsAdDomainState();
        validateWindowsAdDomainInput();
    });

    $(document).on("input blur", "#windowsad-Settings-Domain", function () {
        validateWindowsAdDomainInput();
    });
    function initializeAzureAdSettings() {
        syncAzureAdFieldState();
        validateAzureAdSettingsForm({ showErrors: false });
    }

    function syncAzureAdFieldState() {
        var isEnabled = $("#enable-sso").is(":checked");
        $("#application-id, #application-id-uri, #tenant-name, #mobile-app-id, #enable-slo").prop("disabled", !isEnabled);
        if (!isEnabled) {
            toggleAzureAdFieldError("application-id", false, false, true);
            toggleAzureAdFieldError("application-id-uri", false, false, true);
            toggleAzureAdFieldError("tenant-name", false, false, true);
            $("#update-saml-settings").prop("disabled", false);
        }
    }

    function validateAzureAdSettingsForm(options) {
        var showErrors = shouldShowValidationErrors(options);
        var isEnabled = $("#enable-sso").is(":checked");
        if (!isEnabled) {
            toggleAzureAdFieldError("application-id", false, false, true);
            toggleAzureAdFieldError("application-id-uri", false, false, true);
            toggleAzureAdFieldError("tenant-name", false, false, true);
            return true;
        }

        var applicationId = ($("#application-id").val() || "").trim();
        var applicationIdUri = ($("#application-id-uri").val() || "").trim();
        var tenantName = ($("#tenant-name").val() || "").trim();
        var tenantRegex = /^(?!(ftp|https?):\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-]+(\.[a-z]{2,6})?(:\d{1,5})?(\/[a-zA-Z0-9]+[a-zA-Z0-9]*(\.[a-z]{2,8})?)*?$/;

        var appIdRequiredInvalid = applicationId.length === 0;
        var appIdUriRequiredInvalid = applicationIdUri.length === 0;
        var tenantRequiredInvalid = tenantName.length === 0;
        var tenantPatternInvalid = !tenantRequiredInvalid && !tenantRegex.test(tenantName);

        toggleAzureAdFieldError("application-id", appIdRequiredInvalid, false, showErrors);
        toggleAzureAdFieldError("application-id-uri", appIdUriRequiredInvalid, false, showErrors);
        toggleAzureAdFieldError("tenant-name", tenantRequiredInvalid, tenantPatternInvalid, showErrors);

        var hasInvalid = appIdRequiredInvalid || appIdUriRequiredInvalid || tenantRequiredInvalid || tenantPatternInvalid;
        $("#update-saml-settings").prop("disabled", hasInvalid);
        return !hasInvalid;
    }

    function toggleAzureAdFieldError(fieldId, isRequiredInvalid, isPatternInvalid, showErrors) {
        $("#azuread-" + fieldId + "-required-validation").toggleClass("display-none", !(showErrors && isRequiredInvalid));
        if (fieldId === "tenant-name") {
            $("#azuread-tenant-name-pattern-validation").toggleClass("display-none", !(showErrors && isPatternInvalid));
            $("#azuread-tenant-name-container").toggleClass("has-error", showErrors && (isRequiredInvalid || isPatternInvalid));
            return;
        }

        $("#azuread-" + fieldId + "-container").toggleClass("has-error", showErrors && isRequiredInvalid);
    }

    $(document).on("change", "#enable-sso", function () {
        syncAzureAdFieldState();
        validateAzureAdSettingsForm({ showErrors: false });
    });

    $(document).on("input blur", "#application-id, #application-id-uri, #tenant-name", function () {
        validateAzureAdSettingsForm({ showErrors: true });
    });
    function initializeAzureAdB2CSettings() {
        var currentLogo = $("#azure-b2c-image-upload-box .js-image-preview").css("background-image");
        if (scope && (scope.azureB2CLogoUrl === null || scope.azureB2CLogoUrl === undefined || scope.azureB2CLogoUrl === "")) {
            scope.azureB2CLogoUrl = currentLogo;
        }

        syncAzureAdB2CFieldState();
        validateAzureAdB2CSettingsForm({ showErrors: false });
    }

    function syncAzureAdB2CFieldState() {
        var isEnabled = $("#enable-sso-b2c").is(":checked");
        $("#azure-b2c-provider-name, #application-id-b2c, #tenant-name-b2c, #tenant-id-b2c, #client-secret-b2c, #policy-b2c, #enable-slo-b2c, #azure-b2c-image-upload-box .image-upload").prop("disabled", !isEnabled);
        if (!isEnabled) {
            toggleAzureAdB2CFieldError("provider-name", false, false, true);
            toggleAzureAdB2CFieldError("application-id", false, false, true);
            toggleAzureAdB2CFieldError("tenant-name", false, false, true);
            toggleAzureAdB2CFieldError("tenant-id", false, false, true);
            toggleAzureAdB2CFieldError("client-secret", false, false, true);
            toggleAzureAdB2CFieldError("policy", false, false, true);
            $("#azureb2c-logo-validation").addClass("display-none").html("");
            $("#update-azure-b2c-settings").prop("disabled", false);
        }
    }

    function validateAzureAdB2CSettingsForm(options) {
        var showErrors = shouldShowValidationErrors(options);
        var isEnabled = $("#enable-sso-b2c").is(":checked");
        if (!isEnabled) {
            $("#update-azure-b2c-settings").prop("disabled", false);
            return true;
        }

        var providerName = ($("#azure-b2c-provider-name").val() || "").trim();
        var applicationId = ($("#application-id-b2c").val() || "").trim();
        var tenantName = ($("#tenant-name-b2c").val() || "").trim();
        var tenantId = ($("#tenant-id-b2c").val() || "").trim();
        var clientSecret = ($("#client-secret-b2c").val() || "").trim();
        var policy = ($("#policy-b2c").val() || "").trim();
        var tenantRegex = /^(?!(ftp|https?):\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-]+(\.[a-z]{2,6})?(:\d{1,5})?(\/[a-zA-Z0-9]+[a-zA-Z0-9]*(\.[a-z]{2,8})?)*?$/;

        var providerRequiredInvalid = providerName.length === 0;
        var providerMaxLengthInvalid = providerName.length > 20;
        var appIdRequiredInvalid = applicationId.length === 0;
        var tenantRequiredInvalid = tenantName.length === 0;
        var tenantPatternInvalid = !tenantRequiredInvalid && !tenantRegex.test(tenantName);
        var tenantIdRequiredInvalid = tenantId.length === 0;
        var clientSecretRequiredInvalid = clientSecret.length === 0;
        var policyRequiredInvalid = policy.length === 0;

        var logoValue = scope && scope.azureB2CLogoUrl ? scope.azureB2CLogoUrl : $("#azure-b2c-image-upload-box .js-image-preview").css("background-image");
        var isValidLogo = scope && scope.ssoSettingsb2cForm ? scope.ssoSettingsb2cForm.isValidAzureB2CLogoUrl : true;
        var logoInvalid = isLogoInvalid(logoValue, "#azureb2c-logo-validation", isValidLogo);

        toggleAzureAdB2CFieldError("provider-name", providerRequiredInvalid, providerMaxLengthInvalid, showErrors);
        toggleAzureAdB2CFieldError("application-id", appIdRequiredInvalid, false, showErrors);
        toggleAzureAdB2CFieldError("tenant-name", tenantRequiredInvalid, tenantPatternInvalid, showErrors);
        toggleAzureAdB2CFieldError("tenant-id", tenantIdRequiredInvalid, false, showErrors);
        toggleAzureAdB2CFieldError("client-secret", clientSecretRequiredInvalid, false, showErrors);
        toggleAzureAdB2CFieldError("policy", policyRequiredInvalid, false, showErrors);
        toggleAuthLogoError("#azureb2c-logo-validation", logoInvalid, showErrors);

        var hasInvalid = providerRequiredInvalid || providerMaxLengthInvalid || appIdRequiredInvalid || tenantRequiredInvalid || tenantPatternInvalid || tenantIdRequiredInvalid || clientSecretRequiredInvalid || policyRequiredInvalid || logoInvalid;
        $("#update-azure-b2c-settings").prop("disabled", hasInvalid);
        return !hasInvalid;
    }

    function toggleAzureAdB2CFieldError(fieldId, isRequiredInvalid, isPatternOrMaxInvalid, showErrors) {
        if (fieldId === "provider-name") {
            $("#azureb2c-provider-name-required-validation").toggleClass("display-none", !(showErrors && isRequiredInvalid));
            $("#azureb2c-provider-name-maxlength-validation").toggleClass("display-none", !(showErrors && isPatternOrMaxInvalid));
            $("#azureb2c-provider-name-container").toggleClass("has-error", showErrors && (isRequiredInvalid || isPatternOrMaxInvalid));
            return;
        }

        if (fieldId === "tenant-name") {
            $("#azureb2c-tenant-name-required-validation").toggleClass("display-none", !(showErrors && isRequiredInvalid));
            $("#azureb2c-tenant-name-pattern-validation").toggleClass("display-none", !(showErrors && isPatternOrMaxInvalid));
            $("#azureb2c-tenant-name-container").toggleClass("has-error", showErrors && (isRequiredInvalid || isPatternOrMaxInvalid));
            return;
        }

        $("#azureb2c-" + fieldId + "-required-validation").toggleClass("display-none", !(showErrors && isRequiredInvalid));
        $("#azureb2c-" + fieldId + "-container").toggleClass("has-error", showErrors && isRequiredInvalid);
    }

    $(document).on("change", "#enable-sso-b2c", function () {
        syncAzureAdB2CFieldState();
        validateAzureAdB2CSettingsForm({ showErrors: false });
    });

    $(document).on("input blur", "#azure-b2c-provider-name, #application-id-b2c, #tenant-name-b2c, #tenant-id-b2c, #client-secret-b2c, #policy-b2c", function () {
        validateAzureAdB2CSettingsForm({ showErrors: true });
    });

    function initializeOAuthSettings() {
        var currentLogo = $("#oauth-image-upload-box .js-image-preview").css("background-image");
        if (scope && (scope.oauthLogoUrl === null || scope.oauthLogoUrl === undefined || scope.oauthLogoUrl === "")) {
            scope.oauthLogoUrl = currentLogo;
        }

        syncOAuthFieldState();
        validateOAuthSettingsForm({ showErrors: false });
    }

    function setGroupImportFieldState(authType, isEnabled) {
        var groupImportSelector = authType === "oauth" ? "#oauth-group-import" : "#openid-group-import";
        $(groupImportSelector).find("input[type='text'], input[type='password']").prop("disabled", !isEnabled);
    }

    function hasVisibleValidationMessage(selector) {
        return $(selector).not(".display-none").filter(function () {
            return $.trim($(this).text()).length > 0;
        }).length > 0;
    }

    function shouldShowValidationErrors(options) {
        return options && options.showErrors === true;
    }

    function isLogoInvalid(logoValue, validationSelector, isValidLogo) {
        return isValidLogo === false || !logoValue || logoValue === "none" || hasVisibleValidationMessage(validationSelector);
    }

    function toggleAuthLogoError(selector, isInvalid, showErrors) {
        var existingMessage = $.trim($(selector).text());
        $(selector)
            .toggleClass("display-none", !(showErrors && isInvalid))
            .html(showErrors && isInvalid ? (existingMessage || window.Server.App.LocalizationContent.SelectAuthProviderLogo) : "");
    }

    function validateGroupImportSettingsForm(authType, options) {
        var showErrors = shouldShowValidationErrors(options);
        var groupImportSelector = authType === "oauth" ? "#oauth-group-import" : "#openid-group-import";
        var isEnabled = authType === "oauth" ? $("#oauthIsEnabled").is(":checked") : $("#openidIsEnabled").is(":checked");
        var isValid = true;

        if (!isEnabled) {
            $(groupImportSelector).find(".validation-message").addClass("display-none");
            $(groupImportSelector).find(".input-field-margin").removeClass("has-error");
            return true;
        }

        $(groupImportSelector).find(".input-field-margin:visible input[type='text'], .input-field-margin:visible input[type='password']").each(function () {
            var isEmpty = $.trim($(this).val()).length === 0;
            $(this).siblings(".validation-message").toggleClass("display-none", !(showErrors && isEmpty));
            $(this).closest(".input-field-margin").toggleClass("has-error", showErrors && isEmpty);
            isValid = isValid && !isEmpty;
        });

        return isValid;
    }

    function syncOAuthFieldState() {
        var isEnabled = $("#oauthIsEnabled").is(":checked");
        $("#oauth-provider-name, #oauth-image-upload-box .image-upload, #oauth-authorization-endpoint, #oauth-token-endpoint, #oauth-userinfo-endpoint, #oauth-issuer-endpoint, #oauth-Jwks-endpoint, #oauth-client-id, #oauth-client-secret, #oauth-scopes, #oauth-logout-endpoint, #enable-oauth-account-creation, #user-info-email, #user-info-firstname, #user-info-lastname").prop("disabled", !isEnabled);
        document.getElementById("group-import-provider-oauth").ej2_instances[0].enabled = isEnabled;
        document.getElementById("token-method-type").ej2_instances[0].enabled = isEnabled;
        document.getElementById("user-info-method-type").ej2_instances[0].enabled = isEnabled;
        setGroupImportFieldState("oauth", isEnabled);

        if (!isEnabled) {
            toggleOAuthFieldError("provider-name", false, false, true);
            toggleOAuthFieldError("authorization-endpoint", false, false, true);
            toggleOAuthFieldError("token-endpoint", false, false, true);
            toggleOAuthFieldError("userinfo-endpoint", false, false, true);
            toggleOAuthFieldError("issuer-endpoint", false, false, true);
            toggleOAuthFieldError("jwks-endpoint", false, false, true);
            toggleOAuthFieldError("client-id", false, false, true);
            toggleOAuthFieldError("client-secret", false, false, true);
            toggleOAuthFieldError("scopes", false, false, true);
            toggleOAuthFieldError("logout-endpoint", false, false, true);
            toggleOAuthFieldError("user-info-email", false, false, true);
            $("#oauth-logo-validation").addClass("display-none").html("");
            $("#oauth-group-import .validation-message").addClass("display-none");
            $("#oauth-group-import .input-field-margin").removeClass("has-error");
            $("#update-oauth-settings").prop("disabled", false);
        }
    }

    function validateOAuthSettingsForm(options) {
        var showErrors = shouldShowValidationErrors(options);
        var isEnabled = $("#oauthIsEnabled").is(":checked");
        if (!isEnabled) {
            $("#update-oauth-settings").prop("disabled", false);
            return true;
        }

        var endpointRegex = /^(https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(?:\/\S*)?$/i;
        var providerName = ($("#oauth-provider-name").val() || "").trim();
        var authorizationEndPoint = ($("#oauth-authorization-endpoint").val() || "").trim();
        var tokenEndPoint = ($("#oauth-token-endpoint").val() || "").trim();
        var userInfoEndPoint = ($("#oauth-userinfo-endpoint").val() || "").trim();
        var issuerEndPoint = ($("#oauth-issuer-endpoint").val() || "").trim();
        var jwksEndPoint = ($("#oauth-Jwks-endpoint").val() || "").trim();
        var clientId = ($("#oauth-client-id").val() || "").trim();
        var clientSecret = ($("#oauth-client-secret").val() || "").trim();
        var scopes = ($("#oauth-scopes").val() || "").trim();
        var logoutEndPoint = ($("#oauth-logout-endpoint").val() || "").trim();
        var userInfoEmail = ($("#user-info-email").val() || "").trim();

        var providerNameRequiredInvalid = providerName.length === 0;
        var providerNameMaxInvalid = providerName.length > 20;
        var authorizationRequiredInvalid = authorizationEndPoint.length === 0;
        var authorizationPatternInvalid = !authorizationRequiredInvalid && !endpointRegex.test(authorizationEndPoint);
        var tokenRequiredInvalid = tokenEndPoint.length === 0;
        var tokenPatternInvalid = !tokenRequiredInvalid && !endpointRegex.test(tokenEndPoint);
        var userInfoRequiredInvalid = userInfoEndPoint.length === 0;
        var userInfoPatternInvalid = !userInfoRequiredInvalid && !endpointRegex.test(userInfoEndPoint);
        var issuerPatternInvalid = issuerEndPoint.length > 0 && !endpointRegex.test(issuerEndPoint);
        var jwksPatternInvalid = jwksEndPoint.length > 0 && !endpointRegex.test(jwksEndPoint);
        var clientIdRequiredInvalid = clientId.length === 0;
        var clientSecretRequiredInvalid = clientSecret.length === 0;
        var scopesRequiredInvalid = scopes.length === 0;
        var logoutPatternInvalid = logoutEndPoint.length > 0 && !endpointRegex.test(logoutEndPoint);
        var userInfoEmailRequiredInvalid = userInfoEmail.length === 0;
        var logoValue = scope && scope.oauthLogoUrl ? scope.oauthLogoUrl : $("#oauth-image-upload-box .js-image-preview").css("background-image");
        var isValidLogo = scope && scope.oauthSettingsForm ? scope.oauthSettingsForm.isValidOAuthLogoUrl : true;
        var logoInvalid = isLogoInvalid(logoValue, "#oauth-logo-validation", isValidLogo);
        var groupImportInvalid = !validateGroupImportSettingsForm("oauth", options);

        toggleOAuthFieldError("provider-name", providerNameRequiredInvalid, providerNameMaxInvalid, showErrors);
        toggleOAuthFieldError("authorization-endpoint", authorizationRequiredInvalid, authorizationPatternInvalid, showErrors);
        toggleOAuthFieldError("token-endpoint", tokenRequiredInvalid, tokenPatternInvalid, showErrors);
        toggleOAuthFieldError("userinfo-endpoint", userInfoRequiredInvalid, userInfoPatternInvalid, showErrors);
        toggleOAuthFieldError("issuer-endpoint", false, issuerPatternInvalid, showErrors);
        toggleOAuthFieldError("jwks-endpoint", false, jwksPatternInvalid, showErrors);
        toggleOAuthFieldError("client-id", clientIdRequiredInvalid, false, showErrors);
        toggleOAuthFieldError("client-secret", clientSecretRequiredInvalid, false, showErrors);
        toggleOAuthFieldError("scopes", scopesRequiredInvalid, false, showErrors);
        toggleOAuthFieldError("logout-endpoint", false, logoutPatternInvalid, showErrors);
        toggleOAuthFieldError("user-info-email", userInfoEmailRequiredInvalid, false, showErrors);
        toggleAuthLogoError("#oauth-logo-validation", logoInvalid, showErrors);

        var hasInvalid = providerNameRequiredInvalid || providerNameMaxInvalid || authorizationRequiredInvalid || authorizationPatternInvalid || tokenRequiredInvalid || tokenPatternInvalid || userInfoRequiredInvalid || userInfoPatternInvalid || issuerPatternInvalid || jwksPatternInvalid || clientIdRequiredInvalid || clientSecretRequiredInvalid || scopesRequiredInvalid || logoutPatternInvalid || userInfoEmailRequiredInvalid || logoInvalid || groupImportInvalid;
        $("#update-oauth-settings").prop("disabled", hasInvalid);
        return !hasInvalid;
    }

    function toggleOAuthFieldError(fieldId, isRequiredInvalid, isPatternOrMaxInvalid, showErrors) {
        if (fieldId === "provider-name") {
            $("#oauth-provider-name-required-validation").toggleClass("display-none", !(showErrors && isRequiredInvalid));
            $("#oauth-provider-name-maxlength-validation").toggleClass("display-none", !(showErrors && isPatternOrMaxInvalid));
            $("#oauth-provider-name-container").toggleClass("has-error", showErrors && (isRequiredInvalid || isPatternOrMaxInvalid));
            return;
        }

        $("#oauth-" + fieldId + "-required-validation").toggleClass("display-none", !(showErrors && isRequiredInvalid));
        $("#oauth-" + fieldId + "-pattern-validation").toggleClass("display-none", !(showErrors && isPatternOrMaxInvalid));
        $("#oauth-" + fieldId + "-container").toggleClass("has-error", showErrors && (isRequiredInvalid || isPatternOrMaxInvalid));
    }

    $(document).on("change", "#oauthIsEnabled", function () {
        syncOAuthFieldState();
        validateOAuthSettingsForm({ showErrors: false });
    });

    $(document).on("input blur", "#oauth-provider-name, #oauth-authorization-endpoint, #oauth-token-endpoint, #oauth-userinfo-endpoint, #oauth-issuer-endpoint, #oauth-Jwks-endpoint, #oauth-client-id, #oauth-client-secret, #oauth-scopes, #oauth-logout-endpoint, #user-info-email", function () {
        validateOAuthSettingsForm({ showErrors: true });
    });

    $(document).on("input blur", "#oauth-group-import input[type='text'], #oauth-group-import input[type='password']", function () {
        validateOAuthSettingsForm({ showErrors: true });
    });

    function initializeOpenIdSettings() {
        var currentLogo = $("#openid-image-upload-box .js-image-preview").css("background-image");
        if (scope && (scope.openidLogoUrl === null || scope.openidLogoUrl === undefined || scope.openidLogoUrl === "")) {
            scope.openidLogoUrl = currentLogo;
        }

        syncOpenIdFieldState();
        validateOpenIdSettingsForm({ showErrors: false });
    }

    function syncOpenIdFieldState() {
        var isEnabled = $("#openidIsEnabled").is(":checked");
        var tokenStorage = $("#enable-openid-token-storage");
        var usePkce = $("#enable-openid-pkce");
        $("#openid-provider-name, #openid-image-upload-box .image-upload, #openid-authority, #openid-client-id, #openid-client-secret, #openid-identifier, #openid-logout-endpoint, #enable-openid-account-creation").prop("disabled", !isEnabled);
        tokenStorage.prop("disabled", !isEnabled);
        usePkce.prop("disabled", !(isEnabled && tokenStorage.is(":checked")));
        if (!(isEnabled && tokenStorage.is(":checked"))) {
            usePkce.prop("checked", false);
        }
        document.getElementById("group-import-provider-openid").ej2_instances[0].enabled = isEnabled;
        document.getElementById("response-type-dropdown").ej2_instances[0].enabled = isEnabled;
        setGroupImportFieldState("openid", isEnabled);

        if (!isEnabled) {
            toggleOpenIdFieldError("provider-name", false, false, true);
            toggleOpenIdFieldError("authority", false, false, true);
            toggleOpenIdFieldError("client-id", false, false, true);
            toggleOpenIdFieldError("client-secret", false, false, true);
            toggleOpenIdFieldError("identifier", false, false, true);
            toggleOpenIdFieldError("logout-endpoint", false, false, true);
            $("#openid-logo-validation").addClass("display-none").html("");
            $("#openid-group-import .validation-message").addClass("display-none");
            $("#openid-group-import .input-field-margin").removeClass("has-error");
            $("#update-openid-settings").prop("disabled", false);
        }
    }

    function validateOpenIdSettingsForm(options) {
        var showErrors = shouldShowValidationErrors(options);
        var isEnabled = $("#openidIsEnabled").is(":checked");
        if (!isEnabled) {
            $("#update-openid-settings").prop("disabled", false);
            return true;
        }

        var endpointRegex = /^(https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(?:\/\S*)?$/i;
        var providerName = ($("#openid-provider-name").val() || "").trim();
        var authority = ($("#openid-authority").val() || "").trim();
        var clientId = ($("#openid-client-id").val() || "").trim();
        var clientSecret = ($("#openid-client-secret").val() || "").trim();
        var identifier = ($("#openid-identifier").val() || "").trim();
        var logoutEndpoint = ($("#openid-logout-endpoint").val() || "").trim();

        var providerRequiredInvalid = providerName.length === 0;
        var providerMaxLengthInvalid = providerName.length > 20;
        var authorityRequiredInvalid = authority.length === 0;
        var authorityPatternInvalid = !authorityRequiredInvalid && !endpointRegex.test(authority);
        var clientIdRequiredInvalid = clientId.length === 0;
        var clientSecretRequiredInvalid = clientSecret.length === 0;
        var identifierRequiredInvalid = identifier.length === 0;
        var logoutPatternInvalid = logoutEndpoint.length > 0 && !endpointRegex.test(logoutEndpoint);
        var logoValue = scope && scope.openidLogoUrl ? scope.openidLogoUrl : $("#openid-image-upload-box .js-image-preview").css("background-image");
        var isValidLogo = scope && scope.oauthSettingsForm ? scope.oauthSettingsForm.isValidOpenIdLogoUrl : true;
        var logoInvalid = isLogoInvalid(logoValue, "#openid-logo-validation", isValidLogo);
        var groupImportInvalid = !validateGroupImportSettingsForm("openid", options);

        toggleOpenIdFieldError("provider-name", providerRequiredInvalid, providerMaxLengthInvalid, showErrors);
        toggleOpenIdFieldError("authority", authorityRequiredInvalid, authorityPatternInvalid, showErrors);
        toggleOpenIdFieldError("client-id", clientIdRequiredInvalid, false, showErrors);
        toggleOpenIdFieldError("client-secret", clientSecretRequiredInvalid, false, showErrors);
        toggleOpenIdFieldError("identifier", identifierRequiredInvalid, false, showErrors);
        toggleOpenIdFieldError("logout-endpoint", false, logoutPatternInvalid, showErrors);
        toggleAuthLogoError("#openid-logo-validation", logoInvalid, showErrors);

        var hasInvalid = providerRequiredInvalid || providerMaxLengthInvalid || authorityRequiredInvalid || authorityPatternInvalid || clientIdRequiredInvalid || clientSecretRequiredInvalid || identifierRequiredInvalid || logoutPatternInvalid || logoInvalid || groupImportInvalid;
        $("#update-openid-settings").prop("disabled", hasInvalid);
        return !hasInvalid;
    }

    function toggleOpenIdFieldError(fieldId, isRequiredInvalid, isPatternOrMaxInvalid, showErrors) {
        if (fieldId === "provider-name") {
            $("#openid-provider-name-required-validation").toggleClass("display-none", !(showErrors && isRequiredInvalid));
            $("#openid-provider-name-maxlength-validation").toggleClass("display-none", !(showErrors && isPatternOrMaxInvalid));
            $("#openid-provider-name-container").toggleClass("has-error", showErrors && (isRequiredInvalid || isPatternOrMaxInvalid));
            return;
        }

        $("#openid-" + fieldId + "-required-validation").toggleClass("display-none", !(showErrors && isRequiredInvalid));
        $("#openid-" + fieldId + "-pattern-validation").toggleClass("display-none", !(showErrors && isPatternOrMaxInvalid));
        $("#openid-" + fieldId + "-container").toggleClass("has-error", showErrors && (isRequiredInvalid || isPatternOrMaxInvalid));
    }

    $(document).on("change", "#openidIsEnabled", function () {
        syncOpenIdFieldState();
        validateOpenIdSettingsForm({ showErrors: false });
    });

    $(document).on("change", "#enable-openid-token-storage", function () {
        var isEnabled = $("#openidIsEnabled").is(":checked");
        var tokenStorageEnabled = $(this).is(":checked");
        $("#enable-openid-pkce").prop("disabled", !(isEnabled && tokenStorageEnabled));
        if (!(isEnabled && tokenStorageEnabled)) {
            $("#enable-openid-pkce").prop("checked", false);
        }
    });

    $(document).on("input blur", "#openid-provider-name, #openid-authority, #openid-client-id, #openid-client-secret, #openid-identifier, #openid-logout-endpoint", function () {
        validateOpenIdSettingsForm({ showErrors: true });
    });

    $(document).on("input blur", "#openid-group-import input[type='text'], #openid-group-import input[type='password']", function () {
        validateOpenIdSettingsForm({ showErrors: true });
    });
    if ($("#auth-settings-container").is(":visible")) {
        if (location.href.match(/openid-settings/)) {
            $("#openid-settings").closest("li").addClass("active");
            $("#openid-settings").tab("show");
            $("#update-oauth-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-jwt-settings").hide();
            $("#update-saml-settings").hide();
            $("#update-azure-b2c-settings").hide();
        }
        else if (location.href.match(/oauth-settings/)) {
            $("#oauth-settings").closest("li").addClass("active");
            $("#oauth-settings").tab("show");
            $("#update-openid-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-jwt-settings").hide();
            $("#update-saml-settings").hide();
            $("#update-azure-b2c-settings").hide();
        }
        else if (location.href.match(/jwt-settings/)) {
            $("#jwt-settings").closest("li").addClass("active");
            $("#jwt-settings").tab("show");
            $("#update-saml-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-azure-b2c-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-oauth-settings").hide();
        }
        else if (location.href.match(/azure-ad-settings/)) {
            $("#azure-ad-settings").closest("li").addClass("active");
            $("#azure-ad-settings").tab("show");
            $("#update-azure-b2c-settings").hide();
            $("#update-jwt-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-oauth-settings").hide();
        }
        else if (location.href.match(/azure-ad-b2c-settings/)) {
            $("#azure-ad-b2c-settings").closest("li").addClass("active");
            $("#azure-ad-b2c-settings").tab("show");
            $("#update-saml-settings").hide();
            $("#update-jwt-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-oauth-settings").hide();
        }
        else if (location.href.match(/windows-ad-settings/)) {
            $("#windows-ad-settings").closest("li").addClass("active");
            $("#windows-ad-settings").tab("show");
            $("#update-jwt-settings").hide();
            $("#update-saml-settings").hide();
            $("#update-azure-b2c-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-oauth-settings").hide();
        }
        else {
            $("#default-authentication-settings").closest("li").addClass("active");
            $("#default-authentication-settings").tab("show");
            $("#update-oauth-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-jwt-settings").hide();
            $("#update-saml-settings").hide();
            $("#update-azure-b2c-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?view=default-authentication") {
                history.pushState(null, '', '?view=default-authentication');
            }
        }
    }

    $("a[data-bs-toggle='tab']").on('click', function (e) {
        $("ul.nav.nav-tabs li").removeClass("active");
        if ($(this).attr("id") == "oauth-settings") {
            $(this).closest("li").addClass("active");
            $("#update-oauth-settings").show();
            $("#update-openid-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-jwt-settings").hide();
            $("#update-saml-settings").hide();
            $("#update-azure-b2c-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?view=oauth-settings") {
                history.pushState(null, '', '?view=oauth-settings');
            }
            validateOAuthSettingsForm({ showErrors: false });
        }
        else if ($(this).attr("id") == "openid-settings") {
            $(this).closest("li").addClass("active");
            $("#update-openid-settings").show();
            $("#update-oauth-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-jwt-settings").hide();
            $("#update-saml-settings").hide();
            $("#update-azure-b2c-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?view=openid-settings") {
                history.pushState(null, '', '?view=openid-settings');
            }
            validateOpenIdSettingsForm({ showErrors: false });
        }
        else if ($(this).attr("id") == "default-authentication-settings") {
            $(this).closest("li").addClass("active");
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
            $("#update-azure-b2c-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?view=default-authentication") {
                history.pushState(null, '', '?view=default-authentication');
            }
        }
        else if ($(this).attr("id") == "default-authentication-settings-info") {
            $(this).closest("li").addClass("active");
            $("#update-defaultauthlogin-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-oauth-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-jwt-settings").hide();
            $("#update-saml-settings").hide();
            $("#update-azure-b2c-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?tab=defaultauth-settings") {
                history.pushState(null, '', '?tab=defaultauth-settings');
            } updateauthsettingsUrl
        }
        else if ($(this).attr("id") == "jwt-settings") {
            $(this).closest("li").addClass("active");
            $("#update-jwt-settings").show();
            $("#update-saml-settings").hide();
            $("#update-azure-b2c-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-oauth-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?view=jwt-settings") {
                history.pushState(null, '', '?view=jwt-settings');
            }
            validateJwtSettingsForm({ showErrors: false });
        }
        else if ($(this).attr("id") == "azure-ad-settings") {
            $(this).closest("li").addClass("active");
            $("#update-saml-settings").show();
            $("#update-azure-b2c-settings").hide();
            $("#update-jwt-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-oauth-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?view=azure-ad-settings") {
                history.pushState(null, '', '?view=azure-ad-settings');
            }
            validateAzureAdSettingsForm({ showErrors: false });
        }
        else if ($(this).attr("id") == "azure-ad-b2c-settings") {
            $(this).closest("li").addClass("active");
            $("#update-saml-settings").hide();
            $("#update-azure-b2c-settings").show();
            $("#update-jwt-settings").hide();
            $("#update-windowsad-settings").hide();
            $("#update-defaultauthlogin-settings").hide();
            $("#update-openid-settings").hide();
            $("#update-oauth-settings").hide();
            var query = (window.location.search).toString();
            if (query != "?view=azure-ad-b2c-settings") {
                history.pushState(null, '', '?view=azure-ad-b2c-settings');
            }
            validateAzureAdB2CSettingsForm({ showErrors: false });
        }
        else if ($(this).attr("id") == "windows-ad-settings") {
            $(this).closest("li").addClass("active");
            $("#update-windowsad-settings").show();
            $("#update-saml-settings").hide();
            $("#update-azure-b2c-settings").hide();
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

    function initializeJwtSettings() {
        var logo = $("#jwt-image-upload-box .js-image-preview").css("background-image");
        if (!scope.jwtLogoUrl || scope.jwtLogoUrl === "none") {
            scope.jwtLogoUrl = logo;
        }

        syncJwtFieldState();
        syncJwtEncryptionState();
        validateJwtSettingsForm({ showErrors: false });
    }

    function syncJwtFieldState() {
        var isEnabled = $("#enable-jwt").is(":checked");
        $("#jwt-provider-name, #jwt-authority, #jwt-client-id, #jwt-image-upload-box .image-upload").prop("disabled", !isEnabled);
        $("#enable-jwt-encryption").prop("disabled", !isEnabled);

        if (!isEnabled) {
            toggleJwtFieldError("provider-name", false, false, false, true);
            toggleJwtFieldError("login-url", false, false, false, true);
            toggleJwtFieldError("logout-url", false, false, false, true);
            $("#jwt-logo-validation").addClass("display-none").html("");
        }
    }

    function syncJwtEncryptionState() {
        var isJwtEnabled = $("#enable-jwt").is(":checked");
        var isEncryptionEnabled = isJwtEnabled && $("#enable-jwt-encryption").is(":checked");
        $("#jwt-encryption-key").prop("disabled", !isEncryptionEnabled);
        $("#show-encryption-key,#copy-encryption-key,#generate-encryption-key").toggleClass("display-none", !isEncryptionEnabled);
    }

    function toggleJwtFieldError(fieldName, requiredInvalid, patternInvalid, maxLengthInvalid, showErrors) {
        var isInvalid = requiredInvalid || patternInvalid || maxLengthInvalid;
        var containerId = fieldName === "provider-name" ? "#jwt-provider-name-container" : fieldName === "login-url" ? "#jwt-login-url-container" : "#jwt-logout-url-container";
        $(containerId).toggleClass("has-error", showErrors && !!isInvalid);

        if (fieldName === "provider-name") {
            $("#jwt-provider-name-required-validation").toggleClass("display-none", !(showErrors && requiredInvalid));
            $("#jwt-provider-name-maxlength-validation").toggleClass("display-none", !(showErrors && maxLengthInvalid));
        }
        else if (fieldName === "login-url") {
            $("#jwt-login-url-required-validation").toggleClass("display-none", !(showErrors && requiredInvalid));
            $("#jwt-login-url-pattern-validation").toggleClass("display-none", !(showErrors && patternInvalid));
        }
        else {
            $("#jwt-logout-url-pattern-validation").toggleClass("display-none", !(showErrors && patternInvalid));
        }
    }

    function validateJwtSettingsForm(options) {
        var showErrors = shouldShowValidationErrors(options);
        var isEnabled = $("#enable-jwt").is(":checked");
        if (!isEnabled) {
            $("#update-jwt-settings").prop("disabled", false);
            return true;
        }

        var providerName = ($("#jwt-provider-name").val() || "").trim();
        var loginUrl = ($("#jwt-authority").val() || "").trim();
        var logoutUrl = ($("#jwt-client-id").val() || "").trim();
        var logo = scope.jwtLogoUrl || $("#jwt-image-upload-box .js-image-preview").css("background-image");

        var urlRegex = /^(https?:\/\/)?(localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?$/i;
        var providerRequiredInvalid = providerName.length === 0;
        var providerMaxLengthInvalid = providerName.length > 20;
        var loginRequiredInvalid = loginUrl.length === 0;
        var loginPatternInvalid = !loginRequiredInvalid && !urlRegex.test(loginUrl);
        var logoutPatternInvalid = logoutUrl.length > 0 && !urlRegex.test(logoutUrl);
        var isValidLogo = scope && scope.jwtSettingsForm ? scope.jwtSettingsForm.isValidjwtLogoUrl : true;
        var logoMissing = isLogoInvalid(logo, "#jwt-logo-validation", isValidLogo);

        toggleJwtFieldError("provider-name", providerRequiredInvalid, false, providerMaxLengthInvalid, showErrors);
        toggleJwtFieldError("login-url", loginRequiredInvalid, loginPatternInvalid, false, showErrors);
        toggleJwtFieldError("logout-url", false, logoutPatternInvalid, false, showErrors);

        toggleAuthLogoError("#jwt-logo-validation", logoMissing, showErrors);

        var isInvalid = providerRequiredInvalid || providerMaxLengthInvalid || loginRequiredInvalid || loginPatternInvalid || logoutPatternInvalid || logoMissing;
        $("#update-jwt-settings").prop("disabled", isInvalid);
        return !isInvalid;
    }

    $(document).on("change", "#enable-jwt", function () {
        syncJwtFieldState();
        syncJwtEncryptionState();
        validateJwtSettingsForm({ showErrors: false });
    });

    $(document).on("change", "#enable-jwt-encryption", function () {
        syncJwtEncryptionState();
    });

    $(document).on("input blur", "#jwt-provider-name, #jwt-authority, #jwt-client-id", function () {
        validateJwtSettingsForm({ showErrors: true });
    });
    $(document).on("focusout", "#oauth-provider-name, #oauth-authorization-endpoint", function (e) {
        OAuthOpenIdImageValidation(e);
    });

    $(document).on("focusout", "#openid-provider-name, #openid-authority", function (e) {
        OAuthOpenIdImageValidation(e);
    });

    $(document).on("focusout", "#jwt-provider-name", function (e) {
        OAuthOpenIdImageValidation(e);
    });

    $(document).on("focusout", "#application-id-b2c, #tenant-name-b2c", function (e) {
        OAuthOpenIdImageValidation(e);
    });

    function OAuthOpenIdImageValidation(e) {
        var name = e.currentTarget.name || "";
        var isOAuth = name === "oauthLogoUrl" || name === "oauthProviderName" || name === "oauthAuthorizationEP";
        var isOpenId = name === "openidLogoUrl" || name === "openidProviderName" || name === "openidAuthority";
        var isAzureB2C = name === "azureB2CLogoUrl" || name === "application-id-b2c" || name === "tenant-name-b2c";

        var authLogo = isOAuth ? (scope && scope.oauthLogoUrl ? scope.oauthLogoUrl : $("#oauth-image-upload-box .js-image-preview").css("background-image"))
            : isOpenId ? (scope && scope.openidLogoUrl ? scope.openidLogoUrl : $("#openid-image-upload-box .js-image-preview").css("background-image"))
                : isAzureB2C ? (scope && scope.azureB2CLogoUrl ? scope.azureB2CLogoUrl : $("#azure-b2c-image-upload-box .js-image-preview").css("background-image"))
                    : (scope && scope.jwtLogoUrl ? scope.jwtLogoUrl : $("#jwt-image-upload-box .js-image-preview").css("background-image"));

        if (authLogo === null || authLogo === undefined || authLogo === '' || authLogo === 'none') {
            if (isOAuth) {
                $("#oauth-logo-validation").removeClass("display-none").html(window.Server.App.LocalizationContent.SelectAuthProviderLogo);
            }
            else if (isOpenId) {
                $("#openid-logo-validation").removeClass("display-none").html(window.Server.App.LocalizationContent.SelectAuthProviderLogo);
            }
            else if (isAzureB2C) {
                $("#azureb2c-logo-validation").removeClass("display-none").html(window.Server.App.LocalizationContent.SelectAuthProviderLogo);
            }
            else {
                $("#jwt-logo-validation").removeClass("display-none").html(window.Server.App.LocalizationContent.SelectAuthProviderLogo);
            }
        }

        if (isOAuth) {
            validateOAuthSettingsForm({ showErrors: true });
        }
        else if (isOpenId) {
            validateOpenIdSettingsForm({ showErrors: true });
        }
        else if (isAzureB2C) {
            scope.ssoSettingsb2cForm.isValidAzureB2CLogoUrl = false;
            validateAzureAdB2CSettingsForm({ showErrors: true });
        }
        else {
            scope.jwtSettingsForm.isValidjwtLogoUrl = false;
            validateJwtSettingsForm({ showErrors: true });
        }
    }

    $(document).on("click", ".image-upload", function (e) {
        OAuthOpenIdImageValidation(e);
    });

    $(".update-oauth-or-openid-settings").click(function () {
        document.getElementById("default-authentication-confirmation-diolog").ej2_instances[0].hide();
        if (this.id === 'oauth' || this.id === 'openid') {
            var isValidAuthSettings = this.id === "oauth" ? validateOAuthSettingsForm({ showErrors: true }) : validateOpenIdSettingsForm({ showErrors: true });
            if (isValidAuthSettings) {
                updateSetting(this.id);
            }
        }
        else if (this.id === 'jwt') {
            if (validateJwtSettingsForm({ showErrors: true })) {
                updateJwtSetting();
            }
        }
        else if (this.id === 'sso') {
            if (validateAzureAdSettingsForm({ showErrors: true })) {
                updatesamlSetting();
            }
        }
        else if (this.id === 'sso-b2c') {
            if (validateAzureAdB2CSettingsForm({ showErrors: true })) {
                updateAzureB2CSetting();
            }
        }
        else if (this.id === 'windows-ad') {
            updateWindowsSettings();
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
        else if (this.id === 'update-azure-b2c-settings') {
            authPrefix = 'sso-b2c';
            provider = $("input[name='azureADB2CAuthenticationProvider']").val().trim();
        }
        else if (this.id === 'update-windowsad-settings') {
            authPrefix = 'windows-ad';
            provider = $("input[name='windowsAuthenticationProvider']").val().trim();
        }

        var isShowDefaultAlert = false;
        if (defaultAuthentication == provider) {
            isShowDefaultAlert = (this.id === 'update-oauth-settings' || this.id === 'update-openid-settings') ? !($("#" + authPrefix + "IsEnabled").is(":checked")) : !($("#enable-" + authPrefix).is(":checked"));
        }
        if (isShowDefaultAlert) {
            document.getElementById("default-authentication-confirmation-diolog").ej2_instances[0].show();
            $(".update-oauth-or-openid-settings").attr("id", authPrefix);
        }
        else {
            if (this.id === 'update-oauth-settings' || this.id === 'update-openid-settings') {
                if ($("#" + authPrefix + "IsEnabled").is(":checked")) {
                    var isValidAuthSettings = authPrefix === "oauth" ? validateOAuthSettingsForm({ showErrors: true }) : validateOpenIdSettingsForm({ showErrors: true });
                    if (isValidAuthSettings) {
                        updateSetting(authPrefix);
                    }
                }
                else {
                    updateSetting(authPrefix);
                }
            }
            else if (this.id === 'update-jwt-settings') {
                if (validateJwtSettingsForm({ showErrors: true })) {
                    updateJwtSetting();
                }
            }
            else if (this.id === 'update-saml-settings') {
                if (validateAzureAdSettingsForm({ showErrors: true })) {
                    updatesamlSetting();
                }
            }
            else if (this.id === 'update-azure-b2c-settings') {
                if (validateAzureAdB2CSettingsForm({ showErrors: true })) {
                    updateAzureB2CSetting();
                }
            }
            else if (this.id === 'update-windowsad-settings') {
                updateWindowsSettings();
            }

        }
    });

    function updatesamlSetting() {
        var isEnabled = $("#enable-sso").is(":checked");
        var isSloEnabled = $("#enable-slo").is(":checked");
        var ssoSettingsData = {
            IsEnabled: isEnabled,
            IsSloEnabled: isSloEnabled,
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
                if (data.result) {
                    SuccessAlert(window.Server.App.LocalizationContent.SSOSettings, window.Server.App.LocalizationContent.SSOSettingsUpdated, 7000);
                    reloadPage();
                } else {
                    WarningAlert(window.Server.App.LocalizationContent.SSOSettings, window.Server.App.LocalizationContent.SSOSettingsUpdateError, data.Message, 7000);
                }
            },
            error: function (data) {
                WarningAlert(window.Server.App.LocalizationContent.SSOSettings, window.Server.App.LocalizationContent.SSOSettingsUpdateError, data.Message, 7000);
            }
        });
    };

    function updateAzureB2CSetting() {
        var isEnabled = $("#enable-sso-b2c").is(":checked");
        var isSloEnabled = $("#enable-slo-b2c").is(":checked");
        var authSettingsData = {
            IsEnabled: isEnabled,
            AuthProvider: $("input[name='azureADB2CAuthenticationProvider']").val().trim(),
            LogoUrl: scope && scope.azureB2CLogoUrl ? scope.azureB2CLogoUrl : $("#azure-b2c-image-upload-box .js-image-preview").css("background-image"),
            IsLogoChanged: azureB2CLogoChanged,
            AzureADB2CSettings: {
                IsSloEnabled: isSloEnabled,
                Logo: $("input[name='azureB2CLogo']").val().trim(),
                ApplicationId: $("input[name='ApplicationIdB2C']").val().trim(),
                TenantName: $("input[name='TenantNameB2C']").val().trim(),
                TenantId: $("input[name='TenantIdB2C']").val().trim(),
                ClientSecret: $("input[name='ClientSecretB2C']").val().trim(),
                SigninPolicy: $("input[name='PolicyB2C']").val().trim(),
                AzureB2CProviderName: $("input[name='AzureB2CProviderName']").val().trim()

                //PasswordResetPolicy: $("input[name='PasswordPolicyB2C']").val().trim()
            }
        };
        $.ajax({
            url: updateauthsettingsUrl,
            type: "POST",
            data: { AuthSettingsData: JSON.stringify(authSettingsData) },
            success: function (data) {
                scope.categories = data;
                if (data.result) {
                    SuccessAlert(window.Server.App.LocalizationContent.AzureB2CSettings, window.Server.App.LocalizationContent.AzureB2CSettingsUpdated, 7000);
                    reloadPage();
                } else {
                    WarningAlert(window.Server.App.LocalizationContent.AzureB2CSettings, window.Server.App.LocalizationContent.AzureB2CSettingsUpdateError, data.Message, 7000);
                }
            },
            error: function (data) {
                WarningAlert(window.Server.App.LocalizationContent.AzureB2CSettings, window.Server.App.LocalizationContent.AzureB2CSettingsUpdateError, data.Message, 7000);
            }
        });
    };


    function updateWindowsSettings() {
        var authSettingsData = {
            IsEnabled: $("#enable-windows-ad").is(":checked"),
            AuthProvider: "WindowsAD",
            WindowsADSettings: {
                Domain: $("input[name='windowsadSettingsDomain']").val().trim()
            }
        };
        $.ajax({
            url: updateauthsettingsUrl,
            type: "POST",
            data: { AuthSettingsData: JSON.stringify(authSettingsData) },
            beforeSend: showWaitingPopup('server-app-container'),
            success: function (result) {
                hideWaitingPopup('server-app-container');
                if (result.IsSuccess) {
                    reloadPage();
                    SuccessAlert(window.Server.App.LocalizationContent.WindowsAdSettings, window.Server.App.LocalizationContent.WindowsAdSettingsUpdated, 7000);
                }
                else {
                    WarningAlert(window.Server.App.LocalizationContent.WindowsAdSettings, window.Server.App.LocalizationContent.WindowsAdSettingsUpdateError, result.Message, 7000);
                }
            },
            error: function () {
                hideWaitingPopup('server-app-container');
            }
        });
    };

    function updateJwtSetting() {
        var jwtEnabled = $("#enable-jwt").is(":checked");
        var encryptionInfo = {
            IsEncryptionEnabled: $("#enable-jwt-encryption").is(":checked"),
            PublicKey: "",
            PrivateKey: ""
        };
        var authSettingsData = {
            IsEnabled: jwtEnabled,
            AuthProvider: $("input[name='jwtAuthenticationProvider']").val().trim(),
            LogoUrl: scope && scope.jwtLogoUrl ? scope.jwtLogoUrl : $("#jwt-image-upload-box .js-image-preview").css("background-image"),
            IsLogoChanged: jwtLogoChanged,
            JwtSettings: {
                Name: $("input[name='jwtName']").val().trim(),
                LoginUrl: $("input[name='jwtLoginUrl']").val().trim(),
                LogOutUrl: $("input[name='jwtLogOutUrl']").val().trim(),
                Logo: $("input[name='jwtLogo']").val().trim(),
                EncryptionValues: JSON.stringify(encryptionInfo)
            }
        };
        $.ajax({
            type: "POST",
            url: updateauthsettingsUrl,
            data: { AuthSettingsData: JSON.stringify(authSettingsData) },
            beforeSend: showWaitingPopup('server-app-container'),
            success: function (result) {
                hideWaitingPopup('server-app-container');
                if (result.IsSuccess) {
                    SuccessAlert(window.Server.App.LocalizationContent.AuthenticationSettings, window.Server.App.LocalizationContent.AuthSettingsUpdated, 7000);
                    reloadPage();
                }
                else {
                    WarningAlert(window.Server.App.LocalizationContent.AuthenticationSettings, window.Server.App.LocalizationContent.AuthSettingsUpdatedError, result.Message, 7000);
                }
            },
            error: function () {
                hideWaitingPopup('server-app-container');
            }
        });
    }

    $(document).on("click", ".update-defaultauth-settings", function () {
        var authProvider = $("#enable-defaultauthentication").is(":checked") ? document.getElementById("login-provider-type").ej2_instances[0].value : "0";
        $.ajax({
            type: "POST",
            url: defaultauthsettingsUrl,
            data: { AuthProvider: authProvider },
            beforeSend: showWaitingPopup('server-app-container'),
            success: function (result) {
                if (result.Status) {
                    hideWaitingPopup('server-app-container');
                    defaultAuthentication = result.AuthProvider;
                    $(".modal-body").find("p:first").find("span").html(getDefaultAuthDisplayName(defaultAuthentication));
                    SuccessAlert(window.Server.App.LocalizationContent.AuthenticationSettings, window.Server.App.LocalizationContent.AuthSettingsUpdated, 7000);
                }
                else {
                    hideWaitingPopup('server-app-container');
                    WarningAlert(window.Server.App.LocalizationContent.AuthenticationSettings, window.Server.App.LocalizationContent.AuthSettingsUpdatedError, result.Message, 7000);
                }
            },
            error: function (result) {
                hideWaitingPopup('server-app-container');
                WarningAlert(window.Server.App.LocalizationContent.AuthenticationSettings, window.Server.App.LocalizationContent.AuthSettingsUpdatedError, result.Message, 7000);
            }

        });

    });

    function updateSetting(authPrefix) {
        var authSettingsData = getAuthSettingsToPost(authPrefix);
        $.ajax({
            type: "POST",
            url: window.updateauthsettingsUrl,
            data: { AuthSettingsData: JSON.stringify(authSettingsData) },
            beforeSend: showWaitingPopup('content-area'),
            success: function (result) {
                hideWaitingPopup('content-area');
                if (result.IsSuccess) {
                    SuccessAlert(window.Server.App.LocalizationContent.AuthenticationSettings, window.Server.App.LocalizationContent.AuthSettingsUpdated, 7000);
                    authPrefix === 'oauth' ? oauthLogoChanged = false : openidLogoChanged = false;
                    reloadPage();
                }
                else {
                    WarningAlert(window.Server.App.LocalizationContent.AuthenticationSettings, window.Server.App.LocalizationContent.AuthSettingsUpdatedError, result.Message, 7000);
                }
            },
            error: function () {
                hideWaitingPopup('content-area');
            }
        });
    }

    function getAuthSettingsToPost(authPrefix) {
        var isEnabled = $("#" + authPrefix + "IsEnabled").is(":checked");
        var authSettingsData;
        if (isEnabled) {
            if (authPrefix === 'oauth') {
                authSettingsData = {
                    IsEnabled: isEnabled,
                    OverwriteSiteSetting: $("input[name='oauthOverwriteSiteSetting']").is(":checked"),
                    AuthProvider: $("input[name='oauthAuthenticationProvider']").val().trim(),
                    LogoUrl: scope && scope.oauthLogoUrl ? scope.oauthLogoUrl : $("#oauth-image-upload-box .js-image-preview").css("background-image"),
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
                        GroupImportSettings: getGroupImportSettings("oauth"),
                        CanCreateAccount: $("#enable-oauth-account-creation").is(":checked"),
                        IssuerEndPoint: $("input[name='oauthIssuerEP']").val().trim(),
                        JwksEndPoint: $("input[name='oauthJwksEP']").val().trim(),
                    }
                };
            }
            else if (authPrefix === 'openid') {
                authSettingsData = {
                    IsEnabled: isEnabled,
                    OverwriteSiteSetting: $("input[name='openidOverwriteSiteSetting']").is(":checked"),
                    AuthProvider: $("input[name='openidAuthenticationProvider']").val().trim(),
                    LogoUrl: scope && scope.openidLogoUrl ? scope.openidLogoUrl : $("#openid-image-upload-box .js-image-preview").css("background-image"),
                    IsLogoChanged: openidLogoChanged,
                    OIDCAuthSettings: {
                        ProviderName: $("input[name='openidProviderName']").val().trim(),
                        ClientId: $("input[name='openidClientId']").val().trim(),
                        ClientSecret: $("input[name='openidClientSecret']").val().trim(),
                        Identifier: $("input[name='openidIdentifier']").val().trim(),
                        Authority: $("input[name='openidAuthority']").val().trim(),
                        Logo: $("input[name='openidLogo']").val().trim(),
                        LogoutUrl: $("input[name='openidLogoutUrl']").val().trim(),
                        GroupImportSettings: getGroupImportSettings("openid"),
                        CanCreateAccount: $("#enable-openid-account-creation").is(":checked"),
                        EnableTokenStorage: $("#enable-openid-token-storage").is(":checked"),
                        UsePkce: $("#enable-openid-pkce").is(":checked"),
                        ResponseType: document.getElementById("response-type-dropdown").ej2_instances[0].value
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

    window.BoldId = window.BoldId || {};
    window.BoldId.validateOAuthSettingsForm = validateOAuthSettingsForm;
    window.BoldId.validateOpenIdSettingsForm = validateOpenIdSettingsForm;

    var oauthUploadBox = $("#oauth-image-upload-box");
    var openidUploadBox = $("#openid-image-upload-box");
    var jwtUploadBox = $("#jwt-image-upload-box");
    var azureB2CUploadBox = $("#azure-b2c-image-upload-box");
    oauthUploadBox.find(".image-upload")[0].addEventListener('change', getFile);
    openidUploadBox.find(".image-upload")[0].addEventListener('change', getFile);
    jwtUploadBox.find(".image-upload")[0].addEventListener('change', getFile);
    azureB2CUploadBox.find(".image-upload")[0].addEventListener('change', getFile);

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
        else if (name === "azureB2CLogoUrl") {
            img = azureB2CUploadBox.find('.js-image-preview');
        }

        var reader = new FileReader();

        reader.onload = function () {
            var imageUrl = 'url(' + reader.result + ')';
            img.css('backgroundImage', imageUrl);

            if (name === 'openidLogoUrl') {
                openidLogoChanged = true;
            }
            else if (name === "oauthLogoUrl") {
                oauthLogoChanged = true;
            }
            else if (name === "jwtLogoUrl") {
                jwtLogoChanged = true;
            }
            else if (name === "azureB2CLogoUrl") {
                azureB2CLogoChanged = true;
            }

            if (scope && scope.$apply) {
                scope.$apply(function () {
                    if (name === 'openidLogoUrl') {
                        scope.openidLogoUrl = imageUrl;
                    }
                    else if (name === "oauthLogoUrl") {
                        scope.oauthLogoUrl = imageUrl;
                    }
                    else if (name === "jwtLogoUrl") {
                        scope.jwtLogoUrl = imageUrl;
                    }
                    else if (name === "azureB2CLogoUrl") {
                        scope.azureB2CLogoUrl = imageUrl;
                    }
                });
            }

            if (name === "oauthLogoUrl") {
                $("#oauth-logo-validation").addClass("display-none").html("");
                validateOAuthSettingsForm({ showErrors: false });
            }
            else if (name === "openidLogoUrl") {
                $("#openid-logo-validation").addClass("display-none").html("");
                validateOpenIdSettingsForm({ showErrors: false });
            }
            else if (name === "azureB2CLogoUrl") {
                $("#azureb2c-logo-validation").addClass("display-none").html("");
                validateAzureAdB2CSettingsForm({ showErrors: false });
            }
            else {
                $("#jwt-logo-validation").addClass("display-none").html("");
                validateJwtSettingsForm({ showErrors: false });
            }
        };
        reader.readAsDataURL(file);
    }

    function checkType(file, name) {
        var valMsgTag = $('input[name="' + name + '"]').parents(".auth-image-upload-box").siblings(".validation-message");
        try {
            var validImageTypes = ["image/jpg", "image/jpeg", "image/png", "image/svg+xml"];
            var sizeKb = file.size / 1024;
            if ($.inArray(file.type, validImageTypes) < 0) {
                throw window.Server.App.LocalizationContent.AuthImageAllowedFormat;
            }
            else if (sizeKb > 500) {
                throw window.Server.App.LocalizationContent.AuthImageAllowedSize;
            }
            else if (!file) {
                throw window.Server.App.LocalizationContent.InvalidFile;
            }
            else {
                previewImage(file, name);
                valMsgTag.html("");
                if (scope && scope.$apply) {
                    scope.$apply(function () {
                        if (name === 'openidLogoUrl') {
                            scope.oauthSettingsForm.isValidOpenIdLogoUrl = true;
                        }
                        else if (name === "oauthLogoUrl") {
                            scope.oauthSettingsForm.isValidOAuthLogoUrl = true;
                        }
                        else if (name === "jwtLogoUrl") {
                            scope.jwtSettingsForm.isValidjwtLogoUrl = true;
                        }
                        else if (name === "azureB2CLogoUrl") {
                            scope.ssoSettingsb2cForm.isValidAzureB2CLogoUrl = true;
                        }
                    });
                }
            }
        }
        catch (ex) {
            valMsgTag.html(ex);
            if (name === "oauthLogoUrl") {
                $("#oauth-logo-validation").removeClass("display-none").html(ex);
                validateOAuthSettingsForm({ showErrors: true });
            }
            else if (name === "openidLogoUrl") {
                $("#openid-logo-validation").removeClass("display-none").html(ex);
                validateOpenIdSettingsForm({ showErrors: true });
            }
            else if (name === "azureB2CLogoUrl") {
                $("#azureb2c-logo-validation").removeClass("display-none").html(ex);
                validateAzureAdB2CSettingsForm({ showErrors: true });
            }
            else if (name === "jwtLogoUrl") {
                $("#jwt-logo-validation").removeClass("display-none").html(ex);
                validateJwtSettingsForm({ showErrors: true });
            }
            if (scope && scope.$apply) {
                scope.$apply(function () {
                    if (name === 'openidLogoUrl') {
                        scope.oauthSettingsForm.isValidOpenIdLogoUrl = false;
                    }
                    else if (name === "oauthLogoUrl") {
                        scope.oauthSettingsForm.isValidOAuthLogoUrl = false;
                    }
                    else if (name === "jwtLogoUrl") {
                        scope.jwtSettingsForm.isValidjwtLogoUrl = false;
                    }
                    else if (name === "azureB2CLogoUrl") {
                        scope.ssoSettingsb2cForm.isValidAzureB2CLogoUrl = false;
                    }
                });
            }
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

            case "FusionAuth":
                groupImportSettings = {
                    KnownProviderType: providerType,
                    FusionAuth: {
                        ApiKey: groupImportDiv.find("input[name='fusionauthapikey']").val().trim(),
                        TenantId: groupImportDiv.find("input[name='fusionauthtenantid']").val().trim(),
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
    document.getElementById("default-authentication-confirmation-diolog").ej2_instances[0].hide();
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
    else if (provider.toLowerCase() === "azureadb2c") {
        return "Azure AD B2C";
    }
}

function validateTextBoxes(authPrefix) {
    var isValid = true;
    var authElement = authPrefix == "oauth" ? $('#oauth-group-import .input-field-margin input[type="text"]') : $('#openid-group-import .input-field-margin input[type="text"]')
    authElement.each(function () {
        if ($(this).closest('.input-field-margin').is(':visible') && $(this).val() === '') {
            $(this).siblings('.validation-message').removeClass('display-none');
            $(this).closest(".input-field-margin").addClass("has-error");
            isValid = false;
        } else {
            $(this).siblings('.validation-message').addClass('display-none');
            $(this).closest(".input-field-margin").removeClass("has-error");
        }
    });
    return isValid;
}

$('#oauth-group-import input[type="text"], #openid-group-import input[type="text"]').on('keyup keydown', function () {
    var errorMessage = $(this).siblings('.validation-message');
    var inputFieldMargin = $(this).closest('.input-field-margin');

    if ($(this).val().trim() === '') {
        errorMessage.removeClass('display-none');
        inputFieldMargin.addClass('has-error');
    } else {
        errorMessage.addClass('display-none');
        inputFieldMargin.removeClass('has-error');
    }

    if ($(this).closest("#oauth-group-import").length && window.BoldId && typeof window.BoldId.validateOAuthSettingsForm === "function") {
        window.BoldId.validateOAuthSettingsForm({ showErrors: true });
    }
    else if ($(this).closest("#openid-group-import").length && window.BoldId && typeof window.BoldId.validateOpenIdSettingsForm === "function") {
        window.BoldId.validateOpenIdSettingsForm({ showErrors: true });
    }
});

    function fnCopySigningKey(inputId, buttonId) {
    if ($("#enable-jwt").is(":checked")) {
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
            $(buttonId).attr("data-bs-original-title", window.Server.App.LocalizationContent.Copied);
            $(buttonId).tooltip('show');
        }, 200);
        setTimeout(function () {
            $(buttonId).attr("data-bs-original-title", window.Server.App.LocalizationContent.ClickToCopy);
            $(buttonId).tooltip();
        }, 3000);
    }
}

function signingKeyConfirmationDlg() {
    var footerTemplate = '<button id="sendButton" class="e-control e-btn e-primary secondary-button">' + window.Server.App.LocalizationContent.OKButton + ' </button>';
    var sendbutton = new ej.buttons.Button();
    dialog = new ej.popups.Dialog({
        header: 'Regenerate Signing Key',
        footerTemplate: footerTemplate,
        content: document.getElementById("dlgContent"),
        showCloseIcon: true,
        width: '472px',
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
        headers: { "RequestVerificationToken": $("input[name='__RequestVerificationToken']").val() },
        success: function (data) {
            if (data != false) {
                SuccessAlert(window.Server.App.LocalizationContent.RegenerateKey, window.Server.App.LocalizationContent.RegenerateKeySuccess, 7000);
                $("#jwt-signing-key").val(data);
            } else {
                WarningAlert(window.Server.App.LocalizationContent.RegenerateKey, window.Server.App.LocalizationContent.RegenerateKeyError, null, 7000);
            }
        },
        error: function () {
            WarningAlert(window.Server.App.LocalizationContent.RegenerateKey, window.Server.App.LocalizationContent.RegenerateKeyError, null, 7000);
        }
    });
}

function fnRegenerateEncryptionKey() {
    $.ajax({
        type: "POST",
        url: refreshEncryptionKeyUrl,
        headers: { "RequestVerificationToken": $("input[name='__RequestVerificationToken']").val() },
        success: function (data) {
            if (data != false) {
                SuccessAlert(window.Server.App.LocalizationContent.RegenerateEncryptionKey, window.Server.App.LocalizationContent.RegenerateEncryptionKeySuccess, 7000);
                $("#jwt-encryption-key").val(data);
            } else {
                WarningAlert(window.Server.App.LocalizationContent.RegenerateEncryptionKey, window.Server.App.LocalizationContent.RegenerateEncryptionKeyError, null, 7000);
            }
        },
        error: function () {
            WarningAlert(window.Server.App.LocalizationContent.RegenerateEncryptionKey, window.Server.App.LocalizationContent.RegenerateEncryptionKeyError, null, 7000);
        }
    });
}

function onRegenerateSigningKeyDialogOpen() {
    if ($("#enable-jwt").is(":checked")) {
        dialog.show();
    }
}

$("#enable-jwt").change(function () {
    jwtSigningKeyShowHide();
})

function jwtSigningKeyShowHide() {
    if ($("#enable-jwt").is(":checked")) {
        $("#jwt-signing-key,#jwt-encryption-key,#enable-jwt-encryption").prop("disabled", false);
        $("#show-signing-key,#show-encryption-key,#copy-signing-key,#generate-signing-key,#copy-encryption-key,#generate-encryption-key").removeAttr("disabled").tooltip("enable").css("cursor", "pointer");
    }
    else {
        $("#jwt-signing-key,#jwt-encryption-key,#enable-jwt-encryption").prop("disabled", true);
        $("#show-signing-key,#show-encryption-key,#copy-signing-key,#generate-signing-key,#copy-encryption-key,#generate-encryption-key").attr("disabled", true).tooltip("disable").css("cursor", "default");
       
    }
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
    groupImportDiv.find(".cognito-fields, .auth0-fields, .okta-fields, .onelogin-fields, .fusion-auth-fields").addClass("display-none");
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
        case "FusionAuth":
            groupImportDiv.find(".fusion-auth-fields").removeClass("display-none");
            break;

        default:
            break;
    }

    if (args.element.id === 'group-import-provider-oauth' && window.BoldId && typeof window.BoldId.validateOAuthSettingsForm === "function") {
        window.BoldId.validateOAuthSettingsForm({ showErrors: false });
    }
    else if (args.element.id === 'group-import-provider-openid' && window.BoldId && typeof window.BoldId.validateOpenIdSettingsForm === "function") {
        window.BoldId.validateOpenIdSettingsForm({ showErrors: false });
    }
}

$(document).on("click", "#generate-encryption-key", function () {
    fnRegenerateEncryptionKey();
});

$(document).on("click", "#generate-signing-key", function () {
    onRegenerateSigningKeyDialogOpen();
});

$(document).on("click", "#copy-signing-key", function () {
    fnCopySigningKey('#jwt-signing-key', '#copy-signing-key');
});

$(document).on("click", "#copy-encryption-key", function () {
    fnCopySigningKey('#jwt-encryption-key', '#copy-encryption-key');
});

$(document).on("click", "#openid-mobile-callback-link-copy", function () {
    copyToClipboard('#openid-mobile-callback-link', '#openid-mobile-callback-link-copy');
});

$(document).on("click", "#openid-callback-link-copy", function () {
    copyToClipboard('#openid-callback-link', '#openid-callback-link-copy');
});

$(document).on("click", "#oauth-mobile-callback-link-copy", function () {
    copyToClipboard('#oauth-mobile-callback-link', '#oauth-mobile-callback-link-copy');
});

$(document).on("click", "#oauth-callback-link-copy", function () {
    copyToClipboard('#oauth-callback-link', '#oauth-callback-link-copy');
});

    function reloadPage(){
    setTimeout(function() {
        window.location.href = window.location.href;
    }, 1000);
}
