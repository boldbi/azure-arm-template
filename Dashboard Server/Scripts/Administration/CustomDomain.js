$(document).ready(function (e) {
    $("#custom-domain-popup").ejDialog({
        width: "440px",
        height: "auto",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        showHeader: false,
        enableModal: true,
        open: "OnCustomDomainOpen",
        close: "OnCustomDomainClose"
    });

    UploadSslCertificateFile();

    $(document).on("click", "#card-pay-now-button", function (e) {
        e.preventDefault();
        if ($("#card-pay-now-button").is(":visible")) {
            buyCustomDomain();
        }
    });
});

$(document).on("click", "#add-custom-domain", function (e) {
    $("#custom-domain-popup").show();
    $("#custom-domain-popup").ejDialog("open");
});

$(document).on("click", ".close-custom-domain", function (e) {
    $("#custom-domain-popup").ejDialog("close");
});

$(document).on("click", ".registration-success-close", function (e) {
    $("#custom-domain-popup").ejDialog("close");
    location.reload();
});

function ResetCustomDomainDialog() {
    $("#custom-domain-name").val("");
    $(".charge-custom-domain-div").show();
    $(".validate-custom-domain-div").hide();
    $(".upload-ssl-certificate-div").hide();
    $(".domain-registration-success").hide();
    $("#billing-address-container").hide();
    $("#card-payment-container").hide();
    clearCardAndBillingAddressValue();
    $("#custom-domain-popup").ejDialog({ width: 440 });
    $("#custom-domain-popup").ejDialog("refresh");
}

$(document).on("click", "#custom-domain-buy-button", function (e) {
    $(".charge-custom-domain-div").hide();
    if (isCardExist.toLowerCase() === "true") {
        $(".validate-custom-domain-div").show();
        $("#custom-domain-name").removeAttr("disabled").val("");
        refreshCustomDomainDialogBoxPosition();
    }
    else {
        $("#billing-address-container").show();
        $("#custom-domain-popup").ejDialog({ width: 560 });
        $("#custom-domain-popup").ejDialog("refresh");
        $("#pay-form-info-fullname").focus();
    }
});

$(document).on("click", "#billing-address-validate-button", function (e) {
    if ($("#billing-address-validate-button").is(":visible")) {
        if ($("#card-form-id").valid()) {
            e.preventDefault();
            $("#card-payment-container").show();
            $("#billing-address-container").hide();
            $("#custom-domain-popup").ejDialog({ width: 440 });
            $("#custom-domain-popup").ejDialog("refresh");
            card.focus();
        }
    }
});

$(document).on("click", "#ssl-certificate-validate-back", function (e) {
    $(".validate-custom-domain-div").show();
    $(".upload-ssl-certificate-div").hide();
});

$(document).on("click", ".custom-domain-link-copy", function (e) {
    var copyBtn = $(".custom-domain-link-copy");
    $(".custom-domain-link").select();

    if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
        copyBtn.removeClass("su su-copy").attr("data-original-title", "");
    }
    else {
        document.execCommand("copy");
        copyBtn.tooltip("hide").attr("data-original-title", window.Server.App.LocalizationContent.Copysuccess).tooltip("fixTitle").tooltip("show");
        setTimeout(function () {
            copyBtn.attr("data-original-title", window.Server.App.LocalizationContent.LinkCopy);
            copyBtn.tooltip();
        }, 7000);
    }
});

$(document).on("click", "#card-pay-back", function (e) {
    $("#billing-address-container").show();
    $("#card-payment-container").hide();
    $("#custom-domain-popup").ejDialog({ width: 560 });
    $("#custom-domain-popup").ejDialog("refresh");
    $("#pay-form-info-fullname").focus();
});

$(document).on("keyup", "#custom-domain-name", function (e) {
    this.value = this.value.toLowerCase();
    var customDomainName = $("#custom-domain-name").val().trim();

    if (customDomainName.length > 0 && IsValidDomainName(customDomainName)) {
        $(".custom-domain-input").removeClass("has-error");
        $("#custom-domain-validate-button").removeAttr("disabled");
        if (e.which == 13) {
            $("#custom-domain-validate-button").click();
        }
    } else {
        $("#custom-domain-validate-button").attr("disabled", true);
    }
});

$(document).on("keyup", "#billing-address-container", function (e) {
    if (e.which == 13) {
        if ($("#billing-address-container").is(":visible")) {
            if ($("#card-form-id").valid()) {
                $("#billing-address-validate-button").click();
            }
        }
    }
});

$(document).on("keyup", "#ssl-certificate-password", function (e) {
    if (validateSSLCertificateForm()) {
        if (e.which == 13) {
            $("#ssl-certificate-validate-button").click();
        }
    }
});

$(document).on("change", ".input-ssl-certificate", function (e) {
    validateSSLCertificateForm();
});

function validateSSLCertificateForm() {
    var sslCertificateFile = $(".input-ssl-certificate").prop('files');
    var sslPass = $("#ssl-certificate-password").val();
    $("#certificate-upload-validation-message").text("");

    if (sslCertificateFile.length > 0 && sslPass.length > 0) {
        $(".custom-domain-input").removeClass("has-error");
        $("#ssl-certificate-validate-button").removeAttr("disabled");
        return true;
    } else {
        $("#ssl-certificate-validate-button").attr("disabled", true);
        return false;
    }
}

$(document).on("click", "#custom-domain-validate-button", function () {
    $("#custom-domain-name, #custom-domain-validate-button").attr("disabled", true);
    $("#domain-validation-message").text("");
    var customDomainName = $("#custom-domain-name").val().trim();
    if (customDomainName.length > 0 && IsValidDomainName(customDomainName)) {
        $("#custom-domain-validate-button").append($("<span class='col-sm-4 no-padding loader-gif'><div class='loader-blue loader-icon' id='schedule-name-validation-loader-icon'><svg class='circular'><circle class='path' cx='27' cy='27' r='10' fill='none' stroke-width='4' stroke-miterlimit='10'></circle></svg></div></span>"));
        $.ajax({
            type: "POST",
            url: validateCustomDomainUrl,
            data: { customHostName: customDomainName },
            success: function (result) {
                $("#custom-domain-name").removeAttr("disabled");
                $("span.loader-gif").remove();
                if (result.Status) {
                    $(".validate-custom-domain-div").hide();
                    $(".upload-ssl-certificate-div").show();
                    $(".input-ssl-certificate, .ssl-browsefile-input, #ssl-certificate-password").val("");
                    $("#certificate-upload-validation-message").text("");
                    $("#ssl-certificate-validate-button").attr("disabled", true);
                }
                else {
                    $(".custom-domain-input").addClass("has-error");
                    $("#domain-validation-message").text(result.StatusMessage);
                    $("#custom-domain-name").focus();
                }
            },
            error: function () {
                $("#custom-domain-name").removeAttr("disabled");
            }
        });
    }
});

$(document).on("click", "#ssl-certificate-validate-button", function () {
    if (validateSSLCertificateForm()) {
        $("#ssl-certificate-validate-button").append($("<span class='col-sm-4 no-padding loader-gif'><div class='loader-blue loader-icon' id='schedule-name-validation-loader-icon'><svg class='circular'><circle class='path' cx='27' cy='27' r='10' fill='none' stroke-width='4' stroke-miterlimit='10'></circle></svg></div></span>"));
        $("#ssl-certificate-password, .ssl-browsefile-button, .ssl-browsefile-input, #ssl-certificate-validate-back, #ssl-certificate-validate-button").attr("disabled", true);
        var customDomainName = $("#custom-domain-name").val().trim();
        var fd = new FormData();
        var files = $(".input-ssl-certificate")[0].files[0];
        fd.append("pfxBlobArray", files);
        fd.append("password", $("#ssl-certificate-password").val());
        fd.append("customHostName", customDomainName);

        $.ajax({
            type: "POST",
            url: addCustomDomainUrl,
            data: fd,
            contentType: false,
            processData: false,
            success: function (result) {
                $("span.loader-gif").remove();
                $("#ssl-certificate-password, .ssl-browsefile-button, .ssl-browsefile-input, #ssl-certificate-validate-back").removeAttr("disabled");
                $("#ssl-certificate-password").val("");
                if (result.Status) {
                    $(".upload-ssl-certificate-div").hide();
                    $(".custom-domain-address").text(customDomainName);
                    $(".custom-domain-address").attr("href", "https://" + customDomainName);
                    $(".valid-until-date").text(result.ExpirationDate);
                    $(".domain-registration-success").show();
                }
                else {
                    $("#certificate-upload-validation-message").text(result.StatusMessage);
                }
            },
            error: function () {
                $("#ssl-certificate-password, .ssl-browsefile-button, .ssl-browsefile-input, #ssl-certificate-validate-back").removeAttr("disabled");
                $("#ssl-certificate-password").val("");
            }
        });
    }
});

function OnCustomDomainOpen() {
    $("#custom-domain-name").focus();
}

function OnCustomDomainClose() {
    ResetCustomDomainDialog();
}

function UploadSslCertificateFile() {
    $(".input-file").before(
        function () {
            if (!$(this).prev().hasClass('input-ghost')) {
                var element = $("<input type='file' class='input-ssl-certificate' name='sslfile' accept='.pfx' style='visibility:hidden; height:0'>");
                element.attr("name", $(this).attr("name"));
                element.change(function () {
                    element.next(element).find("input").val((element.val()).split("\\").pop());
                });
                $(this).find("button.btn-choose").click(function () {
                    element.click();
                });
                $(this).find("button.btn-reset").click(function () {
                    element.val(null);
                    $(this).parents(".input-file").find('input').val('');
                });
                $(this).find('input').css("cursor", "pointer");
                $(this).find('input').mousedown(function () {
                    $(this).parents('.input-file').prev().click();
                    return false;
                });
                return element;
            }
        }
    );
}

function IsValidDomainName(inputString) {
    var regex = new RegExp(/^((?:(?:(?:\w[\.\-\+]?)*)\w)+)((?:(?:(?:\w[\.\-\+]?){0,62})\w)+)\.(\w{2,6})$/);
    return regex.test(inputString);
}

function buyCustomDomain() {
    if (!(isCardExist.toLowerCase() === "true")) {
        $("#card-pay-now-button").attr("disabled", true);

        if (!$("#card-form-id").valid()) {
            $("#card-pay-now-button").attr("disabled", false);
            if (!(card._complete && cvc._complete && exp._complete)) {
                document.querySelector(".error>.message").textContent = window.Server.App.LocalizationContent.InCompleteCardNumber;
            }
            return;
        }

        showWaitingPopup("server-app-container");
        var fullname = $('#pay-form-info-fullname').val();
        var nameOnCard = $("#name").val();
        var email = $('#pay-form-info-email').val();
        var address1 = $('#pay-form-info-address1').val();
        var address2 = $('#pay-form-info-address2').val();
        var country = $('#pay-form-info-country').val();
        var city = $('#pay-form-info-city').val();
        var state = $('#pay-form-info-state').val();
        var zip = $('#pay-form-info-zip').val();

        var cardData = {
            name: nameOnCard != "" ? nameOnCard : undefined,
            address_line1: address1 != "" ? address1 : undefined,
            address_line2: address2 != "" ? address2 : undefined,
            address_country: country != "" ? country : undefined,
            address_city: city != "" ? city : undefined,
            address_state: state != "" ? state : undefined,
            address_zip: zip != "" ? zip : undefined
        };

        stripe.createToken(card, cardData).then(function (result) {
            if (result.token) {
                var cardInfo = result.token.card;
                $.ajax({
                    url: createSubscriptionCardUrl,
                    type: "POST",
                    data: {
                        token: result.token.id,
                        fullName: fullname,
                        email: email,
                        addressLine1: cardInfo.address_line1,
                        addressLine2: cardInfo.address_line2,
                        city: cardInfo.address_city,
                        state: cardInfo.address_state,
                        country: cardInfo.address_country,
                        zip: cardInfo.address_zip
                    },
                    success: function (data) {
                        if (!data.Status) {
                            hideWaitingPopup("server-app-container");
                            $("#card-pay-now-button").attr("disabled", false);
                            var errorElement = $("#upgradecard-details .validation-error");
                            if (data.ErrorCode) {
                                errorElement.html(window.Server.App.LocalizationContent.RetryPaymentFailDescription1 + data.ErrorCode + " – <a href='" + helpSiteBaseUrl + "/site-settings/payments/error-codes' target='_blank'>" + window.Server.App.LocalizationContent.RetryPaymentFailDescription2);
                            }
                            else {
                                errorElement.html(data.StatusMessage);
                            }
                        }
                        else {
                            $("#card-payment-container").hide();
                            $(".validate-custom-domain-div").show();
                            $("#custom-domain-name").removeAttr("disabled").val("");
                            isCardExist = "true";
                            hideWaitingPopup("server-app-container");
                        }
                    }
                });
            } else if (result.error && result.error.message) {
                showCreditcardValidation(result);
                $("#card-pay-now-button").removeAttr("disabled");
                hideWaitingPopup("server-app-container");
            }
        });
    }
}

function clearCardAndBillingAddressValue() {
    $("#billing-address-container").children().find('div').removeClass("has-error");
    $(".validation-error").text("");
    $("#card-form-id").children().find('input').val("");
    $("#pay-form-info-country").val('default');
    $("#pay-form-info-country").selectpicker("refresh");
    $("#name").val("");
    card.clear();
    cvc.clear();
    exp.clear();
}

function refreshCustomDomainDialogBoxPosition() {
    var customDomainDialogObj = $("#custom-domain-popup");
    customDomainDialogObj.ejDialog({ width: 441 });    
    customDomainDialogObj.ejDialog({ width: 440 });
    customDomainDialogObj.ejDialog("refresh");
}