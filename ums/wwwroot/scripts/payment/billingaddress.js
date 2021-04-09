var planId = "";
var isBillingAddresFilled = false;
var tenantId = "";

$(document).ready(function () {
    $("#pay-form-info-country").selectpicker("refresh");
    tenantId = $("#tenantid").val();
    $(document).on("click", ".selectpicker", function () {
        $(this).parent(".bootstrap-select").addClass('open');
        $(this).closest('div').parent().find("span.validation-error").html("");
    });

    $(document).on("click", ".billing-continue-button", function () {
        $("body").ejWaitingPopup("show");
        if ($("#card-form-id").valid()) {
            moveToNextStep();
            $("#card-form-id").fadeOut(300, function () {
                $(".credit-card-container").fadeIn(300);
            });
        };
        $("body").ejWaitingPopup("hide");
    });

    $(document).on("click", ".billing-back-button", function () {
        $("body").ejWaitingPopup("show");
        moveToPreviousStep();
        $("#card-form-id").fadeOut(300, function () {
            $(".plan-chooser-container").fadeIn(300);
        });
        $("body").ejWaitingPopup("hide");
    });

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, "Please enter the name");
    $.validator.addMethod("isValidEmail", function (value, element) {
        if (value.trim() === "") {
            return true;
        } else {
            return IsEmail(value);
        }
    }, "Please enter a valid email");

    $("#card-form-id").validate({
        ignore: [],
        errorElement: "span",
        onkeyup: function (element, event) {
            if (event.keyCode != 9 && event.keyCode != 13) {
                $(element).valid();
            }
            else if (event.keyCode != 9 && event.keyCode == 13 && event.target.parentElement.className != "bs-searchbox") {
                $(".billing-continue-button").trigger("click");
            }
            else true;
        },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            "pay-form-info-fullname": {
                isRequired: true,
                maxlength: fullNameLength
            },
            "pay-form-info-email": {
                isRequired: true,
                maxlength: emailAddressLength,
                isValidEmail: true
            },
            "pay-form-info-address1": {
                isRequired: true
            },
            "pay-form-info-address2": {
                isRequired: false
            },
            "pay-form-info-country": {
                isRequired: true
            },
            "pay-form-info-city": {
                isRequired: true
            },
            "pay-form-info-state": {
                isRequired: true
            },
            "pay-form-info-zip": {
                isRequired: true
            },
            "card-brand-name": {
                isRequired: true
            },
            "pay-form-info-card-name": {
                isRequired: true
            }
        },
        highlight: function (element) {
            var read = $("#" + element.id).not(":disabled");
            if (read) {
                if (element.id == "pay-form-info-country") {
                    $(element).closest('div').parent().addClass("has-error");
                } else {
                    $(element).closest('div').addClass("has-error");
                }
            }

        },
        unhighlight: function (element) {
            if (element.id == "pay-form-info-country") {
                $(element).closest("div").parent().removeClass("has-error");
                $(element).closest("div").parent().find("span.validation-error").html("");
            } else {
                $(element).closest("div").removeClass("has-error");
                $(element).closest("div").find("span.validation-error").html("");
            }
        },
        errorPlacement: function (error, element) {
            var read = $("#" + element.context.id).not(":disabled");
            if (read) {
                if (element.context.id == "pay-form-info-country") {
                    $(element).closest('div').parent().find("span.validation-error").html(error.html());
                } else {
                    $(element).closest('div').find("span.validation-error").html(error.html());
                }
            }
        },
        messages: {
            "pay-form-info-fullname": {
                isRequired: "Please enter your full name",
                maxlength: "Full name is too long. Must be no more than 512 characters."
            },
            "pay-form-info-email": {
                isRequired: "Please enter your email address",
                maxlength: "Email address is too long. Must be no more than 320 characters.",
                isValidEmail: "Invalid email address"
            },
            "pay-form-info-address1": {
                isRequired: "Please enter your address"
            },
            "pay-form-info-country": {
                isRequired: "Please select your country"
            },
            "pay-form-info-city": {
                isRequired: "Please enter your city"
            },
            "pay-form-info-state": {
                isRequired: "Please enter your state"
            },
            "pay-form-info-zip": {
                isRequired: "Please enter your ZIP/postal code"
            },
            "pay-form-info-card-name": {
                isRequired: "Please enter your name on card"
            }
        }
    });

    $('#pay-form-info-country').on('change', function (element, event) {
        $(this).next(".btn-group.form-control").find(".btn.dropdown-toggle").attr('style', 'border:2px solid #cccccc !important');
        $(this).closest("div").parent().removeClass("has-error");
        $(this).closest("div").parent().find("span.validation-error").html("");
    });
});

function isEmptyOrWhitespace(value) {
    if ($.trim(value) == "")
        return true;
    else
        return false;
}

function IsEmail(email) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(email)) {
        return true;
    }
    else {
        return false;
    }
}

function moveToNextStep() {
    $(".stepper .inprogress").removeClass("inprogress").addClass("completed").next().addClass("inprogress");
}

function moveToPreviousStep() {
    $(".stepper .inprogress").removeClass("inprogress").prev().removeClass("completed").addClass("inprogress");
}


