$(document).ready(function () {

    dropDownListInitialization('#enable-ssl', '');
    document.getElementById("enable-ssl").ej2_instances[0].value = isSecureConnection ? "https" : "http";
    document.getElementById("enable-ssl").ej2_instances[0].text = isSecureConnection ? "https" : "http";

    if (ignoreSslValidation) {
        $("#ssl-certificate").prop("checked", true);
    }
    else {
        $("#ssl-certificate").prop("checked", false);
    }

    $.validator.addMethod("isValidUrl", function (value, element) {
        var givenUrl = getSslValue() + "://" + $("#site_url").val();
        var url = parseURL(givenUrl);
        if (parseInt(url.port) > 65535)
            return false;
        else
            return true;
    }, window.Server.App.LocalizationContent.IsValidUrl);

});

$(document).on("click", "#update-proxy-settings", function () {

    if ($("#site_url").val().length > 0) {
        validateIPWhitelisted();
    }
    if (($("#proxy-settings-form").find(".has-error").length == 0)) {


        var isUrlChange = false;
        if ($("#site_url").attr("data-original-value") != $("#site_url").val()) {
            isUrlChange = true;
        }

        var isReloadPage = false;
        if (getSslValue() != $("#scheme_value").attr("data-value") || $("#site_url").attr("data-original-value") !== $("#site_url").val()) {
            isReloadPage = true;
        }

        var siteURL = $("#site_url").val();

        var systemSettingsData = {

            BaseUrl: getSslValue() + "://" + $("#site_url").val(),
            EnableDomainChange: $("#domain-change").is(":checked"),
            IsSecureConnection: getSslValue() === "https",
            IgnoreSslValidation: $("#ssl-certificate").is(":checked")
        };

        $.ajax({
            type: "POST",
            url: window.proxySettingsUrl,
            data: { systemSettingsData: JSON.stringify(systemSettingsData) },
            beforeSend: showWaitingPopup('server-app-container'),
            success: function (result) {
                if (isReloadPage) {
                    if (isUrlChange) {
                        var restartLinkHtml = "<a href='" + restartLink + "' target='_blank'>click here.</a>";
                        messageBox("", window.Server.App.LocalizationContent.RestartApplication, window.Server.App.LocalizationContent.RestartApplicationLink + restartLinkHtml, "success", function () {
                            parent.onCloseMessageBox();
                            var currentURL = window.location.pathname;
                            window.location.href = getSslValue() + "://" + siteURL + currentURL.substring(currentURL.indexOf("/ums/administration"));
                        });
                    } else {
                        window.location.href = getSslValue() + "://" + location.host + location.pathname;
                    }
                }

                if (result.status) {
                    SuccessAlert(window.Server.App.LocalizationContent.ProxySettings, window.Server.App.LocalizationContent.ProxySettingsUpdated, 7000);
                } else {
                    WarningAlert(window.Server.App.LocalizationContent.ProxySettings, window.Server.App.LocalizationContent.ProxySettingsUpdateFalied, result.Message, 7000);
                    $(".error-message, .success-message").css("display", "none");
                }
                hideWaitingPopup('server-app-container');
            }
        });
    }
});

$(document).on("change click", '#site_url', function () {
    onBaseUrlChange();
});


$("#proxy-settings-form").validate({
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
        if (element.id == "site_url") {
            $(element).parent().parent().next().html("");
        }
        else {
            $(element).parent().find("span.validation-errors").html("");
        }
    },
    errorPlacement: function (error, element) {
        if (element.attr("id") == "site_url") {
            $(element).parent().parent().next().html(error);
        }
        else {
            $(element).parent().find("span.validation-errors").html(error);
        }
    },
    messages: {
        "site_url": {
            isRequired: window.Server.App.LocalizationContent.Urlvalidator
        }
    }
});

function onBaseUrlChange() {
    $(".exist-domain-info").show();
};

function getSslValue() {
    return document.getElementById("enable-ssl").ej2_instances[0].value;
}

function validateIPWhitelisted() {
    var domain = getSslValue() + "://" + $("#site_url").val();
    $.ajax({
        type: "POST",
        url: validateIPWhitelistedUrl,
        async: false,
        data: { domain: domain },
        success: function (data) {
            if (!data.Data) {
                $("#site_url").closest("div").addClass("has-error");
                $("#site-url-validation").css("display", "block");
                $("#site-url-validation").html(window.Server.App.LocalizationContent.InvalidIpDomain);
            }
            else {
                $("#site_url").closest("div").removeClass("has-error");
                $("#site-url-validation").css("display", "none");
                $("#site-url-validation").html("");
            }
        }
    });
}