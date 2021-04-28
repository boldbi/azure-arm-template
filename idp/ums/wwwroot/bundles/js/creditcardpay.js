$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
    var stripe = Stripe(stripePublicKey);
    var elements = stripe.elements();
    var errorElement = document.querySelector('.error>.message');
    var stripeElementStyle = {
        base: {
            'fontSize': '12px'
        },
        invalid: {
            iconColor: "#a94442",
            color: "#a94442"
        }
    };

    var card = elements.create('cardNumber', {
        hidePostalCode: true,
        'placeholder': 'XXXX - XXXX - XXXX - XXXX',
        'style': stripeElementStyle
    });
    card.mount('#card-number');

    var cvc = elements.create('cardCvc', {
        'placeholder': 'CVC',
        'style': stripeElementStyle
    });
    cvc.mount('#card-cvc');

    var exp = elements.create('cardExpiry', {
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

    $(document).on('click', '#payment-submit', function (e) {
        $("#payment-submit").attr("disabled", true);

        if (!$("#card-form").valid()) {
            $("#payment-submit").attr("disabled", false);
            return;
        }

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
                moveToNextStep();
                $("body").ejWaitingPopup("show");
                var cardInfo = result.token.card;
                $.ajax({
                    url: createSubscriptionUrl,
                    type: "POST",
                    data: {
                        tenantInfoId: $("#tenantid").val(),
                        token: result.token.id,
                        planId: $("#hidden-plan-id").val(),
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
                        $("body").ejWaitingPopup("hide");
                        if(!data.Status)
                        {
                            $("#payment-submit").attr("disabled", false);
                            if (data.ErrorCode)
                            {
                                errorElement.innerHTML = "Card validation failed due to - " + data.ErrorCode + ". Please check more <a href='https://help.syncfusion.com/bold-bi/payments/error-code#" + data.ErrorCode + "' target='_blank'>details</a> on the reported error and try again.";
                            }
                            else
                            {
                                errorElement.textContent = data.StatusMessage;
                            }
                        }
                        else
                        {
                            var registerUrl = window.location.href;
                            var deployUrl = registerUrl.split("/");
                            deployUrl.pop();
                            window.location.href = deployUrl.join("/") + "/deploy?id=" + $("#tenantid").val();
                            //retrieves the deploy page url and assign it to href
                        }
                    }
                });
            } else if (result.error && result.error.message) {
                showCreditcardValidation(result);
                $("#payment-submit").attr("disabled", false);
            }
        });
    });

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

    $(document).on("click", "#card-page-back", function () {
        $("body").ejWaitingPopup("show");
        $(".user-address").children().remove();
        $(".credit-card-container").fadeOut(300, function () {
            $("#card-form-id").fadeIn(300);
        });
        moveToPreviousStep();
        $("body").ejWaitingPopup("hide");
    });

    function showCreditcardValidation(result) {
        if (result.error) {
            errorElement.textContent = result.error.message;
        } else {
            errorElement.textContent = "";
        }
    }

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
});

function validateForm(e) {
    e.preventDefault();
    $("#payment-submit").trigger("click");
}

