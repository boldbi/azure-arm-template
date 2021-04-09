$(document).ready(function () {
    var typingTimer;
    var doneTypingInterval = 300;
    $('[data-toggle="popover"]').popover();

    var layoutBodyWaitingPopupTemplateId = createLoader("body");
    $("#body").ejWaitingPopup({ template: $("#" + layoutBodyWaitingPopupTemplateId) });

    $(".boldsign-show-hide-password").on("mousedown", function () {
        if ($(this).siblings("div").find("input").is(":password")) {
            $(this).siblings("div").find("input").attr('type', 'text');
        }
        else {
            $(this).siblings("div").find("input").attr('type', 'password');
        }
    });

    $(".boldsign-show-hide-password").on("mouseup", function () {
        if ($(this).siblings("div").find("input").is(":password")) {
            $(this).siblings("div").find("input").attr('type', 'text');
        }
        else {
            $(this).siblings("div").find("input").attr('type', 'password');
        }
    });

    //For the purpose of Responsive layout
    $(".boldsign-show-hide-password").bind("touchstart", function () {
        if ($(this).siblings("div").find("input").is(":password")) {
            $(this).siblings("div").find("input").attr("type", "text");
        }
        else {
            $(this).siblings("div").find("input").attr("type", "password");
        }
    });
    $(".boldsign-show-hide-password").on("touchend", function () {
        if ($(this).siblings("div").find("input").is(":password")) {
            $(this).siblings("div").find("input").attr('type', 'text');
        }
        else {
            $(this).siblings("div").find("input").attr('type', 'password');
        }
    });

    $(".boldsign-show-hide-password").mouseleave(function () {
        $(this).siblings("div").find("input").attr('type', 'password');
    });

    if (window.innerWidth < 1041) {
        $(".boldsign-show-hide-password").on("click", function () {
            if ($(this).siblings("div").find("input").is(":password")) {
                $(this).siblings("div").find("input").attr('type', 'text');
            }
            else {
                $(this).siblings("div").find("input").attr('type', 'password');
            }
        });
    }

    var cancelNewAccountDialogobj = new ejs.popups.Dialog({
        showCloseIcon: false,
        isModal: true,
        closeOnEscape: false,
        visible: false,
        width: '370px',
        height: '170px',
        animationSettings: { effect: 'Zoom' },
        zIndex: 4
    });

    cancelNewAccountDialogobj.appendTo('#cance-and-new-setup-container');

    $("#create-account").on("click", function () {
        $("#body").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: createAccountUrl,
            data: {
                __RequestVerificationToken: $('#user-info input[name="__RequestVerificationToken"]').val(),
                email: $("#boldsign-email").val()
            },
            success: function (data) {
                $("meta[name='user:email']").attr('content', data.UserEmail);
                $(".user-email").html(data.UserEmail);
                if (data.IsError !== undefined && data.IsError) {
                    $("#boldsign-email").parent().addClass("e-error");
                    if (!data.IsCorporateEmail) {
                        $("#corporate-email").removeClass("display-none");
                        $("#invalid-domain").addClass("display-none");
                        $("#existing-user").addClass("display-none");
                        $("#invalid-email").addClass("display-none");
                    }
                    else if (data.IsValidEmail !== undefined && !data.IsValidEmail) {
                        $("#corporate-email").addClass("display-none");
                        $("#invalid-domain").addClass("display-none");
                        $("#existing-user").addClass("display-none");
                        $("#invalid-email").removeClass("display-none");
                    }
                    else {
                        if (data.IsUserExists !== undefined && data.IsUserExists) {
                            if (data.IsUserActivated !== undefined && !data.IsUserActivated) {
                                $("#create-account-container").addClass("display-none");
                                $("#verify-account-container").removeClass("display-none");
                            }
                            else {
                                $("#corporate-email").addClass("display-none");
                                $("#invalid-domain").addClass("display-none");
                                $("#existing-user").removeClass("display-none");
                                $("#invalid-email").addClass("display-none");
                            }
                        }
                        else if (!data.IsDomainValid && !data.IsUserExists) {
                            $("#corporate-email").addClass("display-none");
                            $("#invalid-domain").removeClass("display-none");
                            $("#existing-user").addClass("display-none");
                            $("#invalid-email").addClass("display-none");
                        }
                    }
                }
                else {
                    $("#create-account-container").addClass("display-none");
                    $("#verify-account-container").removeClass("display-none");
                }

                $("#body").ejWaitingPopup("hide");
            }
        });
    });

    $("#boldsign-email").on('keydown', function (e) {
        if ($("#boldsign-email").parent().hasClass("e-error")) {
            $("#boldsign-email").parent().removeClass("e-error");
        }

        $(".validation-message").addClass("display-none");
    });

    $("#verification-code").on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    $("#verification-code").on('keydown', function (e) {
        $("#verification-code").removeClass("danger-border");
        $("#verifiation-error").html("").hide().fadeOut("slow");
        clearTimeout(typingTimer);

        var val = $("#verification-code").val().split("-").join("").replace(/_/g, '');
        if (val.length >= 1 && !$(this).hasClass("code-spacing")) {
            $(this).addClass("code-spacing");
        }
        else if (!val.length >= 1 && $(this).hasClass("code-spacing")) {
            $(this).removeClass("code-spacing");
        }

        if (event.keyCode === 8 || event.keyCode === 46
            || event.keyCode === 37 || event.keyCode === 39) {
            return true;
        }
        else if (event.keyCode < 48 || event.keyCode > 57) {
            return false;
        }
    });

    function doneTyping() {
        var val = $("#verification-code").val().split("-").join("").replace(/_/g, '');
        if (val.length === 6) {
            $("#body").ejWaitingPopup("show");
            $("#verifiation-error").html("").hide().fadeOut("slow");
            $.ajax({
                type: "POST",
                url: checkVerificationCodeUrl,
                data: {
                    "verificationCode": val,
                    "userEmail": $("meta[name='user:email']").attr('content')
                },
                success: function (result) {
                    if (result.Status) {
                        $("#verification-code").attr("disabled", true);
                        $("#resend-field").addClass("display-none");
                        $("#new-user-login-field").addClass("display-none");
                        $("#code-expiry-info").addClass("display-none");
                        $("#create-and-continue-field").removeClass("display-none");
                        $(".verification-complete").removeClass("display-none");
                    } else {
                        $("#verification-code").addClass("danger-border");
                        $("#verifiation-error").html(result.Value).show().fadeIn("slow");
                    }

                    $("#body").ejWaitingPopup("hide");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    $("#verifiation-error").html("Remote connection failed.").show().fadeIn("slow");
                    $("#body").ejWaitingPopup("hide");
                }
            });
        }
    }

    $("#create-password").on("keyup focusin", function (e) {
        $("#create-password").popover("show");
        var value = $("#create-password").val().trim();
        var validateMethods = new Array();
        var ruleNames = new Array();
        validateMethods.push(validateUserpassword.p_policy_uppercase);
        validateMethods.push(validateUserpassword.p_policy_lowercase);
        validateMethods.push(validateUserpassword.p_policy_number);
        validateMethods.push(validateUserpassword.p_policy_specialcharacter);
        validateMethods.push(validateUserpassword.p_policy_length);

        $.each(validateMethods, function (i) {
            var currentMethodName = validateMethods[i];
            ruleName = currentMethodName(value);
            if (ruleName !== undefined && ruleName !== "") {
                if (!$("#create-password").next().find("#password_policy_rules").find("li#" + ruleName + " span:first").hasClass("su-boldsign-valid-tick")) {
                    $("#create-password").next().find("#password_policy_rules").find("li#" + ruleName + " span:first").addClass("su-boldsign-valid-tick").removeClass("icon");
                }

                ruleNames.push(ruleName);

                if (ruleNames.length === 5) {
                    $(".password-complete").addClass("su-boldsign-valid-tick").removeClass("su-boldsign-password-info");
                    $("#continue-account-verification").attr("disabled", false);
                }
                else if (!$(".password-complete").hasClass("su-boldsign-password-info")) {
                    $(".password-complete").addClass("su-boldsign-password-info").removeClass("su-boldsign-valid-tick");
                    $("#continue-account-verification").attr("disabled", true);
                }
            }
            else {
                ruleName = name;
                if ($("#create-password").next().find("#password_policy_rules").find("li#" + ruleName + " span:first").hasClass("su-boldsign-valid-tick")) {
                    $("#create-password").next().find("#password_policy_rules").find("li#" + ruleName + " span:first").removeClass("su-boldsign-valid-tick").addClass("icon");
                }
            }

            ruleName = "";
        });
    });

    $(document).on("click", "#resend-code", function () {
        $("#body").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: resendActivationUrl,
            data: {
                "userEmail": $("meta[name='user:email']").attr('content')
            },
            success: function (result) {
                $("#body").ejWaitingPopup("hide");
            }
        });
    });

    $("#continue-account-verification").on("click", function () {
        $("#body").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: createPasswordUrl,
            data: {
                newPassword: $("#create-password").val(),
                userEmail: $("meta[name='user:email']").attr('content')
            },
            success: function (data) {
                if (data.IsError !== undefined && !data.IsError && data.IsPasswordUpdated) {
                    updatUserInfo(data.UserDetail.FirstName, data.UserDetail.LastName, data.UserDetail.Company, data.UserDetail.Contact);

                    $("#create-account-container").addClass("display-none");
                    $("#verify-account-container").addClass("display-none");
                    $("#user-info-container").removeClass("display-none");
                }
                $("#body").ejWaitingPopup("hide");
            }
        });
    });

    $("#boldsign-email").keyup(function (event) {
        if (event.keyCode === 13) {
            $("#create-account").click();
        }
    });

    $("#create-password").keyup(function (event) {
        if (event.keyCode === 13 && !$("#continue-account-verification").is(":disabled")) {
            $("#continue-account-verification").click();
        }
    });

    $("#cancel-and-create").on("click", function () {
        cancelNewAccountDialogobj.show();
    });

    $("#continue-onboard").on("click", function () {
        cancelNewAccountDialogobj.hide();
    });

    $("#cancel-and-redirect").on("click", function () {
        $("#body").ejWaitingPopup("show");
        window.location.href = $("#cancel-and-redirect").attr("data-href");
    });

    var inputElement = document.querySelectorAll('.e-float-input input, .e-control-wrapper input');

    // Add 'error' class to the input box.

    for (var i = 0; i < inputElement.length; i++) {
        inputElement[i].addEventListener("focus", function () {
            addEjInputBoxError(this);

            if ($(this)[0] !== null && $(this)[0] !== undefined && $(this)[0].name === "verification-code" && $("#verification-code").val().split("-").join("").replace(/_/g, '').length === 0) {
                $(this).val("");
            }

        });
        inputElement[i].addEventListener("blur", function () {
            addEjInputBoxError(this);
        });
        inputElement[i].addEventListener('keydown', function () {
            addEjInputBoxError(this);
        });
        inputElement[i].addEventListener('keyup', function () {
            addEjInputBoxError(this);
        });
    }

    function addEjInputBoxError(element) {
        if (element.classList.contains("ng-invalid")) {
            for (var i = 0; i < element.parentNode.parentNode.children.length; i++) {
                if ($(element.parentNode.parentNode.children[i]).is(":visible") &&
                    element.parentNode.parentNode.children[i].classList.contains("validation-message")) {
                    element.parentElement.classList.add('e-error');
                }
            }
        } else {
            element.parentElement.classList.remove('e-error');
        }
    }

    $("#authenticated-create-boldsign-account").on("click", function () {
        $("#body").ejWaitingPopup("show");
        var tenantData = {
            Email: $("#boldsign-email").val(),
            TenantTypeId: $("meta[name='tenant:type']").attr('content')
        };

        $.ajax({
            type: "POST",
            url: validateCorporateMailUrl,
            data: {
                tenantPersonalInformation: tenantData
            },
            success: function (data) {
                if (data.IsError !== undefined && data.IsError && !data.IsCorporateEmail) {
                    $("#corporate-email").removeClass("display-none");
                }
                else {
                    updatUserInfo(userDetails.FirstName, userDetails.LastName, userDetails.Company, userDetails.Contact);
                    $("#create-account-container").addClass("display-none");
                    $("#verify-account-container").addClass("display-none");
                    $("#user-info-container").removeClass("display-none");
                }

                $("#body").ejWaitingPopup("hide");
            }
        });
    });

    function updatUserInfo(firstname, lastname, company, contact) {
        var element = document.getElementById("user-info-container");
        var ngScope = angular.element(element).scope();
        ngScope.tenantInformation.FirstName = firstname;
        ngScope.tenantInformation.LastName = lastname;
        ngScope.tenantInformation.Company = company;
        ngScope.tenantInformation.Phone = contact;
        ngScope.$apply();
    }
});


serverApp.controller("tenantController",
    [
        "$scope", "ajaxService", function ($scope, ajaxService) {

            $scope.onRegisterFormSubmit = function (event, tenantInformation) {
                $("#body").ejWaitingPopup("show");
                $.ajax({
                    url: registerTenantUrl,
                    type: "POST",
                    data: {
                        tenantPersonalInformation: tenantInformation
                    },
                    success: function (data) {
                        window.location.href = data.Url;
                    }
                });
            };
        }
    ]
);

