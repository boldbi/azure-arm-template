var card = null;
var cvc = null;
var exp = null;
var stripe;
$(document).ready(function () {
    var payFormWaitingPopupTemplateId = createLoader("update-billing-body");
    $("#update-billing-body").ejWaitingPopup({ template: $("#" + payFormWaitingPopupTemplateId) });
    var serverAppWaitingPopupTemplateId = createLoader("server-app-container");
    $("#server-app-container").ejWaitingPopup({ template: $("#" + serverAppWaitingPopupTemplateId) });
    if ($("#tenant-status").length > 0 && $("#tenant-status").val().toLowerCase() == "suspended") {
        $("#notification-section").css("display", "none");
    }
    $("#card-details-popup").ejDialog({
        width: "470px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        enableModal: true,
        showHeader: false,
        closeOnEscape: true
    });

    $("#messageBox").ejDialog({
        width: (parent.window.innerWidth > 460) ? "450px" : (parent.window.innerWidth - 10),
        height: "150px",
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        showHeader: false,
        enableModal: true,
        close: "onMessageDialogClose",
    });

    var cardDetailsWaitingPopupTemplateId = createLoader("card-details-popup_wrapper");
    $("#card-details-popup_wrapper").ejWaitingPopup({ template: $("#" + cardDetailsWaitingPopupTemplateId) });
    stripe = Stripe($("#stripePublicKey").text().trim());
    var elements = stripe.elements();
    var stripeElementStyle = {
        base: {
            'fontSize': '12px'
        },
        invalid: {
            iconColor: "#a94442",
            color: "#a94442"
        }
    };

    card = elements.create('cardNumber', {
        hidePostalCode: true,
        'placeholder': 'XXXX XXXX XXXX XXXX',
        'style': stripeElementStyle
    });
    card.mount('#card-number');

    cvc = elements.create('cardCvc', {
        'placeholder': 'CVC',
        'style': stripeElementStyle
    });
    cvc.mount('#card-cvc');

    exp = elements.create('cardExpiry', {
        'placeholder': 'MM / YY',
        'style': stripeElementStyle
    });
    exp.mount('#card-exp');

    var cardBrandToPfClass = {
        'visa': 'su-visa',
        'mastercard': 'su-mastercard',
        'amex': 'su-american-express',
        'discover': 'su-discover',
        'diners': 'su-diners',
        'jcb': 'su-jcb',
        'unionpay': 'su-unionpay',
        'unknown': 'su-credit-card',
    }

    card.on('change', function (event) {
        if (event.brand) {
            setBrandIcon(event.brand);
        }

        showCreditcardValidation(event);
    });

    exp.on('change', function (event) {
        showCreditcardValidation(event);
    });

    cvc.on('change', function (event) {
        showCreditcardValidation(event);
    });

    function setBrandIcon(brand) {
        var brandIconElement = document.getElementById('brand-icon');
        var cardClass = 'su-credit-card';
        if (brand in cardBrandToPfClass) {
            cardClass = cardBrandToPfClass[brand];
        }
        for (var i = brandIconElement.classList.length - 1; i >= 0; i--) {
            brandIconElement.classList.remove(brandIconElement.classList[i]);
        }

        brandIconElement.classList.add(cardClass);
    }

    function updateCard() {
        if (!isCardExist) {
            return;
        }

        var nameOnCard = $("#name").val();
        var cardData = {
            name: nameOnCard != "" ? nameOnCard : undefined
        };

        $("#card-details-popup_wrapper").ejWaitingPopup("show");
        stripe.createToken(card, cardData).then(function (result) {
            if (result.token) {
                if ($(".update-card-and-pay").length == 1) {
                    updateAndPay(result.token.id);
                }
                else if ($(".update-card").length == 1) {
                    updateCardDetails(result.token.id);
                }
            }
            else {
                if (result.error && result.error.message) {
                    showCreditcardValidation(result);
                }
                $("#card-details-popup_wrapper").ejWaitingPopup("hide");
            }
        });
    }

    function closeUpdateCardDialog() {
        $("#card-details-popup").ejDialog("close");
        $("#name").val("");
        card.clear();
        cvc.clear();
        exp.clear();
    }

    $(document).on("click", ".update-card, .update-card-and-pay", function (e) {
        e.preventDefault();
        updateCard();
    });

    $(document).on("click", ".cancel-update", function (e) {
        closeUpdateCardDialog();
    });

    $(document).on("click", ".edit-card, .update-and-pay ", function () {
        $("#card-details-popup").ejDialog("open");
    });

    $(document).keyup(function (e) {
        if (e.which == 13) {
            if ($("#update-card-container").is(":visible")) {
                if (isCardExist) {
                    updateCard();
                } else {
                    $("#payment-submit").click();
                }
            }

        }
    });

    $(document).on("click", ".PopupClose", function (e) {
        closeUpdateCardDialog();
    });

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, window.IdP.App.LocalizationContent.ItemNameValidator);

    $.validator.addMethod("isValidEmail", function (value, element) {
        if (value.trim() === "") {
            return true;
        } else {
            return IsEmail(value);
        }
    }, window.IdP.App.LocalizationContent.IsValidEmail);

    $("#card-form-id").validate({
        errorElement: "span.validation-error",
        ignore: "",
        onkeyup: function (element, event) { if (event.keyCode != 9) $(element).valid(); else true; },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            "pay-form-info-fullname": {
                isRequired: true
            },
            "pay-form-info-email": {
                isRequired: true,
                isValidEmail: true
            },
            "pay-form-info-address1": {
                isRequired: true
            },
            "pay-form-info-address2": {
                isRequired: false
            },
            "pay-form-info-city": {
                isRequired: true
            },
            "pay-form-info-country": {
                isRequired: true
            },
            "pay-form-info-state": {
                isRequired: true
            },
            "pay-form-info-zip": {
                isRequired: true
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
            $(element).closest("div").find("span.validation-error").html("");
        },
        errorPlacement: function (error, element) {
            var read = $("#" + element.context.id).not(":disabled");
            if (read) {
                $(element).closest('div').find("span.validation-error").html(error.html());
            }
        },
        messages: {
            "pay-form-info-fullname": {
                isRequired: window.IdP.App.LocalizationContent.FullnameValidator
            },
            "pay-form-info-email": {
                isRequired: window.IdP.App.LocalizationContent.EmailValidator,
                isValidEmail: window.IdP.App.LocalizationContent.IsValidEmail
            },
            "pay-form-info-address1": {
                isRequired: window.IdP.App.LocalizationContent.AddressValidator
            },
            "pay-form-info-city": {
                isRequired: window.IdP.App.LocalizationContent.CityValidator
            },
            "pay-form-info-country": {
                isRequired: window.IdP.App.LocalizationContent.CountryValidator
            },
            "pay-form-info-state": {
                isRequired: window.IdP.App.LocalizationContent.StateValidator
            },
            "pay-form-info-zip": {
                isRequired: window.IdP.App.LocalizationContent.ZipValidator
            },
            "pay-form-info-card-name": {
                isRequired: window.IdP.App.LocalizationContent.NameonCardValidator
            }
        }
    });
});

function showCreditcardValidation(result) {
    var errorMessage = document.querySelector(".error>.message");
    if (result.error) {
        errorMessage.textContent = result.error.message;
    } else {
        errorMessage.textContent = "";
    }
}

function validateForm(e) {
    e.preventDefault();
    $(".update-card, .update-card-and-pay").trigger("click");
}

function enableInputs(form) {
    Array.prototype.forEach.call(
        form.querySelectorAll(
            "input[type='text'], input[type='email'], input[type='tel']"
        ),
        function (input) {
            input.removeAttribute('disabled');
        }
    );
}

function disableInputs(form) {
    Array.prototype.forEach.call(
        form.querySelectorAll(
            "input[type='text'], input[type='email'], input[type='tel']"
        ),
        function (input) {
            input.setAttribute('disabled', 'true');
        }
    );
}

var isBillingAddressChanged = false;

$(document).on("change", "#pay-form-info-fullname, #pay-form-info-email, #pay-form-info-address1, #pay-form-info-address2, #pay-form-info-state, #pay-form-info-city, #pay-form-info-zip, #pay-form-info-country", function () {
    isBillingAddressChanged = true;
    $("#validation-detail>.validation-error").text("");
});

$(document).on("click", ".update-billing-address", function () {
    if (isBillingAddressChanged) {
        var example = document.querySelector('.pay-form-info');
        var form = example.querySelector('form');
        var fullname = form.querySelector('#pay-form-info-fullname');
        var address1 = form.querySelector('#pay-form-info-address1');
        var address2 = form.querySelector('#pay-form-info-address2');
        var city = form.querySelector('#pay-form-info-city');
        var state = form.querySelector('#pay-form-info-state');
        var zip = form.querySelector('#pay-form-info-zip');
        var country = form.querySelector('#pay-form-info-country');
        var email = form.querySelector('#pay-form-info-email');
        if ($("#card-form-id").valid()) {
            disableInputs(form);
            updateBillingAddress(fullname.value, email.value, address1.value, address2.value,
                country.value, city.value, state.value, zip.value);
            enableInputs(form);
        }
    }
    else {
        $("#validation-detail>.validation-error").text(window.IdP.App.LocalizationContent.BillingAddressNotChanged);
    }
});

function updateBillingAddress(fullName, eMail, address1, address2, country, city, state, zip) {
    $("#update-billing-body").ejWaitingPopup("show");
    $.ajax({
        type: "POST",
        data: {
            fullName: fullName,
            eMail: eMail,
            address1: address1,
            address2: address2,
            country: country,
            city: city,
            state: state,
            zip: zip
        },
        url: updateBillingAddressUrl,
        success: function (result) {
            $("#update-billing-body").ejWaitingPopup("hide");
            if (result.Status) {
                $("#pay-form-info-fullname").val(result.CardDetail.FullName);
                $("#pay-form-info-address1").val(result.CardDetail.Address1);
                $("#pay-form-info-address2").val(result.CardDetail.Address2);
                $("#pay-form-info-city").val(result.CardDetail.City);
                $("#pay-form-info-state").val(result.CardDetail.State);
                $("#pay-form-info-zip").val(result.CardDetail.ZipCode);
                $("#pay-form-info-email").val(result.CardDetail.Email);
                isBillingAddressChanged = false;
                SuccessAlert(window.IdP.App.LocalizationContent.UpdateBillingAddressTitle, window.IdP.App.LocalizationContent.UpdateBillingAddressSuccess, 2000);
            } else {
                WarningAlert(window.IdP.App.LocalizationContent.UpdateBillingAddressTitle, window.IdP.App.LocalizationContent.UpdateBillingAddressFailed, 2000);
            }
        }
    });
}

function updateCardDetails(cardToken) {
    $.ajax({
        type: "POST",
        data: {
            cardToken: cardToken
        },
        url: updateCardUrl,
        success: function (result) {
            $("#card-details-popup_wrapper").ejWaitingPopup("hide");
            if (result.Status) {
                $("#card-details-popup").ejDialog("close");
                card.clear();
                cvc.clear();
                exp.clear();
                window.location.reload();
            } else {
                $(".error").css("display", "block");
                $(".message").text(result.Data);
            }
        }
    });
}

function updateAndPay(cardToken) {
    $.ajax({
        type: "POST",
        data: {
            cardToken: cardToken
        },
        url: updateCardUrl,
        success: function (result) {
            if (result.Status) {
                $("#card-details-popup_wrapper").ejWaitingPopup("hide");
                $("#card-details-popup").ejDialog("close");
                card.clear();
                retryPayment();
            } else {
                $("#card-details-popup_wrapper").ejWaitingPopup("hide");
                $(".error").css("display", "block");
                $(".message").text(result.Data);
            }
        }
    });
}

$(document).on("click", ".retry-payment ", function () {
    retryPayment();
});

function retryPayment() {
    var failurePopupHeight;
    if (window.innerWidth < 1280) {
        failurePopupHeight = "200px";
        failurePopupWidth = "450px";
    }
    else {
        failurePopupHeight = "190px";
        failurePopupWidth = "440px";
    }
    messageBox("", window.IdP.App.LocalizationContent.RetryPaymentTitle, window.IdP.App.LocalizationContent.RetryPaymentWait, "success", function () {
        onCloseMessageBox();
    }, undefined, undefined, "155px", undefined, "retry-payment-loader");
    $('.message-box-btn-holder').append("<span class='loader'></span>");

    $.ajax({
        type: "POST",
        data: {
        },
        url: retryPaymentUrl,
        success: function (result) {
            $("#server-app-container").ejWaitingPopup("hide");
            if (result.Status) {
                messageBox("", window.IdP.App.LocalizationContent.RetryPaymentTitle, window.IdP.App.LocalizationContent.RetryPaymentSuccess, "success", function () {
                    onCloseMessageBox();
                    location.reload();
                }, undefined, "430px", "140px", undefined, "retry-payment-messageBox");
            } else {
                if (result.Data == "Something went wrong, try again.") {
                    messageBox("", window.IdP.App.LocalizationContent.RetryPaymentTitle, window.IdP.App.LocalizationContent.RetryPaymentFailDescription3, "success", function () {
                        onCloseMessageBox();
                    }, undefined, "420px", undefined, undefined, "retry-payment-messageBox");
                }
                else {
                    messageBox("", window.IdP.App.LocalizationContent.RetryPaymentTitle, window.IdP.App.LocalizationContent.RetryPaymentFailDescription1 + "<br/>" + result.Data + " – <a href='" + helpSiteBaseUrl + "/site-settings/payments/error-codes' target='_blank'>" + window.IdP.App.LocalizationContent.MoreDetails + " </a>. " + window.IdP.App.LocalizationContent.RetryPaymentFailDescription2, "success", function () {
                        onCloseMessageBox();
                    }, undefined, failurePopupWidth, failurePopupHeight, undefined, "retry-payment-messageBox");
                }
            }
        }
    });
}

$(document).on('click', '#payment-submit', function (e) {
    $("#payment-submit").attr("disabled", true);

    if (!$("#card-form-id").valid()) {
        $("#payment-submit").attr("disabled", false);
        if (!(card._complete && cvc._complete && exp._complete)) {
            document.querySelector(".error>.message").textContent = "Your card number is incomplete.";
        }
        return;
    }

    showWaitingPopup("server-app-container");
    e.preventDefault();
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
                    id: tenantInfoId,
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
                        $("#payment-submit").attr("disabled", false);
                        var errorElement = $("#add-card-details .validation-error");
                        if (data.ErrorCode) {
                            errorElement.html(window.IdP.App.LocalizationContent.RetryPaymentFailDescription1 + data.ErrorCode + " – <a href='" + helpSiteBaseUrl + "/site-settings/payments/error-codes' target='_blank'>" + window.IdP.App.LocalizationContent.MoreDetails + " </a>. " + window.IdP.App.LocalizationContent.RetryPaymentFailDescription2);
                        }
                        else {
                            errorElement.html(data.StatusMessage);
                        }
                    }
                    else {
                        hideWaitingPopup("server-app-container");
                        SuccessAlert(window.IdP.App.LocalizationContent.Payments, window.IdP.App.LocalizationContent.AddPaymentDetailSuccess, 7000);
                        card.clear();
                        cvc.clear();
                        exp.clear();
                        window.location.reload();
                    }
                }
            });
        } else if (result.error && result.error.message) {
            showCreditcardValidation(result);
            $("#payment-submit").removeAttr("disabled");
            hideWaitingPopup("server-app-container");
        }
    });
});


$(document).on('click', '.selectpicker', function (e) {
    $(this).parent().parent().removeClass("has-error");
    $(this).parent().parent().closest("div").find("span.validation-error").html("");
});