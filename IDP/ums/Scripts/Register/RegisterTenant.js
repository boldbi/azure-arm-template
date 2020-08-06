var isBoldBiBranding = "";
var analyticsTrackingEnabled = "";
var googleAnalyticsSendTo = "";

$(document).ready(function () {
    isBoldBiBranding = $("meta[name='is_boldbi_branding']").attr("content").toLowerCase() == "true";
    analyticsTrackingEnabled = $("meta[name='analytics_tracking:enabled']").attr("content").toLowerCase() == "true";
    googleAnalyticsSendTo = $("meta[name='google_analytics:send_to']").attr("content");

    var registerTenantBodyWaitingPopupTemplateId = createLoader("boldbi-register-body");
    $("#boldbi-register-body").ejWaitingPopup({ template: $("#" + registerTenantBodyWaitingPopupTemplateId) });
    $('[data-toggle="popover"]').popover();
    $('.selectpicker').selectpicker();
    $(".show-hide-password").on("mousedown", function () {
        if ($(this).siblings("input").is(":password")) {
            $(this).siblings("input").attr('type', 'text');
        }
        else {
            $(this).siblings("input").attr('type', 'password');
        }
    });

    $(".show-hide-password").on("mouseup", function () {
        if ($(this).siblings("input").is(":password")) {
            $(this).siblings("input").attr('type', 'text');
        }
        else {
            $(this).siblings("input").attr('type', 'password');
        }
    });

    //For the purpose of Responsive layout
    $(".show-hide-password").bind("touchstart", function () {
        if ($(this).siblings("input").is(":password")) {
            $(this).siblings("input").attr("type", "text");
        }
        else {
            $(this).siblings("input").attr("type", "password");
        }
    });
    $(".show-hide-password").on("touchend", function () {
        if ($(this).siblings("input").is(":password")) {
            $(this).siblings("input").attr('type', 'text');
        }
        else {
            $(this).siblings("input").attr('type', 'password');
        }
    });

    $(".show-hide-password").mouseleave(function () {
        $(this).siblings("input").attr('type', 'password');
    });

    if (window.innerWidth < 1041) {
        $(".show-hide-password").on("click", function () {
            if ($(this).siblings("input").is(":password")) {
                $(this).siblings("input").attr('type', 'text');
            }
            else {
                $(this).siblings("input").attr('type', 'password');
            }
        });
    }

    $("#txt-emailid").focus(function () {
        $("#invalid-domain, #invalid-email").hide();
    });

    $("#txt-dns").on("keydown",
        function () {
            $(".reserved-site").addClass("ng-hide");
            if ($(this).val().length <= 6) {
                $(".dns-field .su-password-tick").hide();
            }
        });

    $("#txt-password").on("keyup focusin", function (e) {
        $("#txt-password").popover("show");
        var value = $("#txt-password").val().trim();
        var validateMethods = new Array();
        validateMethods.push(validateUserpassword.p_policy_uppercase);
        validateMethods.push(validateUserpassword.p_policy_lowercase);
        validateMethods.push(validateUserpassword.p_policy_number);
        validateMethods.push(validateUserpassword.p_policy_specialcharacter);
        validateMethods.push(validateUserpassword.p_policy_length);

        $.each(validateMethods, function (i) {
            var currentMethodName = validateMethods[i];
            ruleName = currentMethodName(value);
            if (ruleName != undefined && ruleName != "") {
                if (!$("#txt-password").next().find("#password_policy_rules").find("li#" + ruleName + " span:first").hasClass("su-password-tick")) {
                    $("#txt-password").next().find("#password_policy_rules").find("li#" + ruleName + " span:first").addClass("su-password-tick").removeClass("icon");
                }
            }
            else {
                ruleName = name;
                if ($("#txt-password").next().find("#password_policy_rules").find("li#" + ruleName + " span:first").hasClass("su-password-tick")) {
                    $("#txt-password").next().find("#password_policy_rules").find("li#" + ruleName + " span:first").removeClass("su-password-tick").addClass("icon");
                }
            }

            ruleName = "";
        });
    });

    if ($(".dns-field").hasClass('hidden') || $(".site-field").hasClass('hidden')) {
        $("#register-tenant").removeAttr("disabled");
    }
    
    ////Trigger google tracking for page visit
    triggerGoogleAnalyticsOnRegistrationVisit();
});

serverApp.directive('uniquedns',
    [
        "ajaxService", function (ajaxService) {
            return {
                require: 'ngModel',
                link: function (scope, elem, attr, ngModel) {
                    ngModel.$parsers.unshift(function (value) {
                        $(".dns-field .su-password-tick").hide();
                        if (isValidDns(value)) {
                            $("#spinner").removeClass("ng-hide");
                            $("#txt-dns").addClass("remove-border");
                            ngModel.$setValidity('validdns', false);
                            ngModel.$setValidity('uniquednsnotactivated', true);
                            ngModel.$setValidity('uniquedns', true);
                            ajaxService.cancelRequest();
                            ajaxService.postJsonData(checkDnsAvailable, { "dns": value }).then(
                                function (data) {
                                    ngModel.$setValidity('validdns', true);
                                    if (!ngModel.$invalid) {
                                        if (data.IsBlockedSubdomain) {
                                            ngModel.$setValidity('uniquednsnotactivated', true);
                                            ngModel.$setValidity('uniquedns', false);
                                        } else if (data.IsDnsExists) {
                                            ngModel.$setValidity('uniquedns', true);
                                            ngModel.$setValidity('uniquednsnotactivated', false);
                                        } else {
                                            $(".dns-field .su-password-tick").show();
                                            ngModel.$setValidity('uniquedns', true);
                                            ngModel.$setValidity('uniquednsnotactivated', true);
                                        }
                                    }
                                    $("#spinner").addClass("ng-hide");
                                    $("#txt-dns").removeClass("remove-border");
                                });
                        } else if (value == "") {
                            ngModel.$setValidity('uniquedns', true);
                            ngModel.$setValidity('uniquednsnotactivated', true);
                        }

                        return value;
                    });
                }
            };
        }
    ]);

serverApp.controller("tenantController",
    [
        "$scope", "ajaxService", function ($scope, ajaxService) {
            $scope.init = function () {

                $scope.hideBusinessEmailValidation = false;

                var el = angular.element('#txt-password');

                if (window.innerWidth <= 1366) {
                    $("#password-field").addClass("mobile-password");
                    el.attr('data-placement', 'top');
                }
                else {
                    el.attr('data-placement', 'right');
                }

                $('[data-toggle="popover"]').popover();
            }

            $scope.onStartNewSite = function () {
                $(".dns-list").hide();
                $(".dns-field").removeClass('hidden');
                $(".site-field").removeClass('hidden');
                $(".agreement-wrapper").removeClass('hidden').find(".hidden").removeClass('hidden');
                $("#register-tenant").val($("#body").hasClass("bold-reports") ? window.TM.App.LocalizationContent.StartCreatingeports : window.TM.App.LocalizationContent.StartCreatingDashboards);
                $("#txt-dns").attr('required', true);
                $("#register-tenant").prop("disabled", true);
                $scope.tenantInformation.TenantInfoId = "";
            }

            $scope.onRegisterFormSubmit = function (event, tenantInformation) {
                $("#boldbi-register-body").ejWaitingPopup("show");
                $.ajax({
                    url: registerTenantUrl,
                    type: "POST",
                    data: {
                        __RequestVerificationToken: $('#register-tenant-form input[name="__RequestVerificationToken"]').val(),
                        tenantPersonalInformation: tenantInformation
                    },
                    success: function (data) {
                        if (data.IsError != undefined && data.IsError) {
                            if (!data.IsCorporateEmail) {
                                $("#different-account").addClass("display-none");
                                $("#corporate-email").removeClass("display-none");
                                var ngScope = angular.element("body").scope();
                                ngScope.hideBusinessEmailValidation = false;
                                ngScope.$apply();
                            }
                            else {
                                if (data.IsUserExists) {
                                    $("#invalid-domain").removeClass("display-none");
                                    $("#invalid-domain").show();
                                }
                                else if (!data.IsDomainValid && !data.IsUserExists) {
                                    $("#invalid-email").removeClass("display-none");
                                    $("#invalid-email").show();
                                }
                            }
                        }
                        else if (data.IsRedirection) {
                            var siteDNSName = $("#txt-dns").val();
                            if (siteDNSName != null && siteDNSName != "") {
                                triggerGoogleAnalyticsOnRegistrationComplete();
                            }
                            window.location.href = data.Url;
                        }
                        else {
                            triggerGoogleAnalyticsOnRegistrationComplete();
                            $(".register-tenant-background, .register-tenant-block").addClass("blur");
                            $("#account-activation-popup-content").html(data);
                            $("#account-activation-popup").addClass("showpopup");
                        }

                        $("#boldbi-register-body").ejWaitingPopup("hide");
                    }
                });
            }

            $scope.checkboxValidation = function () {
                if ($(".dns-list").is(":visible") && ($(".dns-field").hasClass('hidden') || $(".site-field").hasClass('hidden')) && isEmailExist) {
                    $("#register-tenant").prop('disabled', function (i, value) { return !value; })
                }
            }

            $scope.onEmailChange = function () {
                $scope.hideBusinessEmailValidation = true;
            }
        }
    ]
);

$(document).on("click", "#mail-resend", function () {
    $("#boldbi-register-body").ejWaitingPopup("show");
    $.ajax({
        type: "POST",
        url: resendActivationUrl,
        data: {
            "activationCode": activationCode,
            "tenantId": tenantId,
            "plan": plan
        },
        success: function (view) {
            $("#account-activation-popup-content").html("").html(view);
            $("#boldbi-register-body").ejWaitingPopup("hide");
        }
    });
});

function isValidDns(value) {
    var isValidDnsRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{4,61}[a-zA-Z0-9]$/;
    return isValidDnsRegex.test(value);
}

$(document).on("click", "#verify-code-button", function () {
    $("#boldbi-register-body").ejWaitingPopup("show");
    $("#verifiation-error").html("").hide().fadeOut("slow");
    $.ajax({
        type: "POST",
        url: checkVerificationCodeUrl,
        data: {
            "verificationCode": $("#account-verification-code").val(),
            "activationCode": activationCode,
            "tenantId": tenantId,
            "plan": plan
        },
        success: function (result) {
            if (result.Status) {
                window.location.href = result.Value;
            } else {
                $("#verifiation-error").html(result.Value).show().fadeIn("slow");
                $("#account-verification-code").css("border")
                $("#boldbi-register-body").ejWaitingPopup("hide");
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#verifiation-error").html("Remote connection failed.").show().fadeIn("slow");
            $("#boldbi-register-body").ejWaitingPopup("hide");
        }
    });
});

$(document).on("keypress", "#account-verification-code", function (e) {
    $("#verifiation-error").html("").hide().fadeOut("slow");
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
    }
});

////Trigger google Analytics
function triggerGoogleAnalyticsOnRegistrationVisit() {
    if (isBoldBiBranding && analyticsTrackingEnabled) {
        if (isCloudRegistration) {
            if (isEmbedPlan) {
                gtag('event', 'Embedded BI Cloud Registration', {
                    'event_category': 'Bold BI',
                    'event_label': 'Bold BI Embedded BI Cloud Registration'
                });
            } else {
                gtag('event', 'Tenant Registration', {
                    'event_category': 'Bold BI',
                    'event_label': 'Bold BI Tenant Registration'
                });

            }
        } else {
            if (isEmbedPlan) {
                gtag('event', 'Embedded BI On-Premise Registration', {
                    'event_category': 'Bold BI',
                    'event_label': 'Bold BI Embedded BI On-Premise Registration'
                });
            } else {
                gtag('event', 'On-Premise Registration', {
                    'event_category': 'Bold BI',
                    'event_label': 'Bold BI Enterprise Registration'
                });
            }
        }

        gtag_report_conversion();
    }
}

function triggerGoogleAnalyticsOnRegistrationComplete() {
    if (isBoldBiBranding && analyticsTrackingEnabled) {
        if (isCloudRegistration) {
            if (isEmbedPlan) {
                gtag('event', 'Embedded BI Cloud Registration Complete', {
                    'event_category': 'Bold BI',
                    'event_label': 'Bold BI Embedded BI Cloud Registration Complete'
                });
            } else {
                gtag('event', 'Tenant Registration Complete', {
                    'event_category': 'Bold BI',
                    'event_label': 'Bold BI Tenant Registration Complete'
                });

            }
        } else {
            if (isEmbedPlan) {
                gtag('event', 'Embedded BI On-Premise Registration Complete', {
                    'event_category': 'Bold BI',
                    'event_label': 'Bold BI Embedded BI On-Premise Registration Complete'
                });
            } else {
                gtag('event', 'On-Premise Registration Complete', {
                    'event_category': 'Bold BI',
                    'event_label': 'Bold BI Enterprise Registration Complete'
                });
            }
        }

        gtag_report_conversion();
    }
}

function gtag_report_conversion(url) {
    var callback = function () {
        if (typeof (url) !== 'undefined') {
            window.location = url;
        }
    };
    gtag('event', 'conversion', {
        'send_to': googleAnalyticsSendTo,
        'event_callback': callback
    });
    return false;
}