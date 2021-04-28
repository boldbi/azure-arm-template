var isBoldBiBranding = "";
var analyticsTrackingEnabled = "";
var googleAnalyticsSendTo = "";

$(document).ready(function () {
    $("#register-tenant").click(function () {
        if (hasVsDevOffer.toLowerCase() == "true") {
            $("#boldbi-register-body_WaitingPopup").addClass("center-loader");
        }
    });

    if (isCouponInValid != undefined && isCouponInValid.toLowerCase() == "true") {
        $(".register-tenant-background, .register-tenant-block, .faq-part, .faq-terms-condition").addClass("blur");
        $("#account-activation-popup").addClass("showpopup");
    }

    isBoldBiBranding = $("meta[name='is_boldbi_branding']").attr("content").toLowerCase() == "true";
    analyticsTrackingEnabled = $("meta[name='analytics_tracking:enabled']").attr("content").toLowerCase() == "true";
    googleAnalyticsSendTo = $("meta[name='google_analytics:send_to']").attr("content");

    var registerTenantBodyWaitingPopupTemplateId = createLoader("boldbi-register-body");
    $("#boldbi-register-body").ejWaitingPopup({ template: $("#" + registerTenantBodyWaitingPopupTemplateId) });

    if (localStorage.getItem("IsExistingAccountRedirection") != null && localStorage.getItem("IsExistingAccountRedirection") != undefined && isAuthenticatedUser.toLowerCase() == "true") {
        var isExistingAccountRedirection = Boolean(localStorage.getItem("IsExistingAccountRedirection"));
        var tenantDNS = (localStorage.getItem("tenantDNS") != null && localStorage.getItem("tenantDNS") != undefined && localStorage.getItem("tenantDNS") != "undefined") ? localStorage.getItem("tenantDNS") : "";
        var tenantInfo = {
            DNS: tenantDNS,
            IsExistingAccountRedirection: true,
            TenantTypeId: tenantTypeId
        };

        if (isExistingAccountRedirection) {
            $("#boldbi-register-body-loader-icon").append("<span style='margin-left: -100px;font-size: 15px' class='label label-important'>Please wait..registering your tenant</span>");
            $("#boldbi-register-body").ejWaitingPopup("show");
            $.ajax({
                url: registerTenantUrl,
                type: "POST",
                data: {
                    __RequestVerificationToken: $('#register-tenant-form input[name="__RequestVerificationToken"]').val(),
                    tenantPersonalInformation: tenantInfo
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
                                $("#existing-account-login-popup").ejDialog("open");
                            }
                            else if (!data.IsDomainValid && !data.IsUserExists) {
                                $("#invalid-email").removeClass("display-none");
                                $("#invalid-email").show();
                            }
                        }
                    }
                    else if (data.IsRedirection) {
                        triggerGoogleAnalyticsOnRegistrationComplete();
                        window.location.href = data.Url;
                    }
                    else {
                        triggerGoogleAnalyticsOnRegistrationComplete();
                        $(".register-tenant-background, .register-tenant-block").addClass("blur");
                        $("#account-activation-popup-content").html(data);
                        $("#account-activation-popup").addClass("showpopup");
                    }

                    $("#boldbi-register-body").ejWaitingPopup("hide");
                    $("#boldbi-register-body-loader-icon").find("span").remove();
                    localStorage.removeItem("tenantDNS");
                    localStorage.removeItem("IsExistingAccountRedirection");
                }
            });
        }
    }

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

    if ($(".dns-field").hasClass('hidden') || $(".site-field").hasClass('hidden') || ($("#txt-company").val() !== "" && isAuthenticated.toLowerCase() == "true" && $("#body").hasClass("bold-sign"))) {
        $("#register-tenant").removeAttr("disabled");
    }

    $("#numeric").ejNumericTextbox({
        name: "numeric",
        value: 1,
        minValue: 1,
        maxValue: 999,
        width: "55%",
        height: "30px",
        enableStrictMode: true,
        change: "onQuantityChange"
    });

    $(document).on("click", "#redirection-submit", function () {
        localStorage.setItem("tenantDNS", $("#txt-dns").val());
        localStorage.setItem("IsExistingAccountRedirection", "true");

        window.location.href = $(this).attr("href") + "&email=" + $("#txt-emailid").val();
    });


    $(document).on("change", "#selected-plan", function () {
        var selected = $(this).find("option:selected").val();
        var newUrl = "";
        if (history.pushState) {
            var currentUrl = window.location.href;
            var url = new URL(currentUrl);
            url.searchParams.set("plan", selected);
            newUrl = url.href;

            window.history.replaceState({ path: newUrl }, '', newUrl);
        }

        $(".logout-url").attr('href', logOutUrl + '?returnUrl=' + newUrl);
        $(".login-url").attr('href', logInUrl + '?returnUrl=' + newUrl);
    });

    $("#existing-account-login-popup").ejDialog({
        width: "320px",
        showOnInit: false,
        target: "#tenant-registeristration",
        allowDraggable: false,
        enableResize: false,
        showHeader: false,
        height: "155px",
        enableModal: true,
        closeOnEscape: true,
        close: 'existingAccountLoginPopupClose'
    });

    ////Trigger google tracking for page visit
    triggerGoogleAnalyticsOnRegistrationVisit();
});

function IsValidEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
}

serverApp.directive('corporatemail',
    [
        "ajaxService", function (ajaxService) {
            return {
                require: 'ngModel',
                link: function (scope, elem, attr, ngModel) {
                    ngModel.$parsers.unshift(function (value) {
                        if (IsValidEmail(value)) {
                            $("#boldbi-register-body").ejWaitingPopup("show");
                            ngModel.$setValidity('corporatemail', true);
                            ajaxService.cancelRequest();
                            var tenantInfo = {
                                AggrementAcceptance: scope.tenantInformation.AggrementAcceptance,
                                Company: scope.tenantInformation.Company,
                                DNS: scope.tenantInformation.DNS,
                                Email: value,
                                FirstName: scope.tenantInformation.FirstName,
                                LastName: scope.tenantInformation.LastName,
                                Password: scope.tenantInformation.Password,
                                Phone: scope.tenantInformation.Phone,
                                ReferrerUrl: scope.tenantInformation.ReferrerUrl,
                                TenantTypeId: scope.tenantInformation.TenantTypeId,
                            };
                            ajaxService.postJsonData(validateCorporateMailUrl, { "tenantPersonalInformation": tenantInfo }).then(
                                function (data) {
                                    if (!ngModel.$invalid) {
                                        if (data.IsError != undefined && data.IsError && data.IsCorporateEmail != undefined && !data.IsCorporateEmail) {
                                            ngModel.$setValidity('corporatemail', false);
                                        }
                                    }
                                    $("#boldbi-register-body").ejWaitingPopup("hide");
                                });
                        } else if (value === "") {
                            ngModel.$setValidity('corporatemail', true);
                        }

                        return value;
                    });
                }
            };
        }
    ]);

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
                            $.ajax({
                                type: "POST",
                                data: { "dns": value, "tenantType": attr.tenantType },
                                url: checkDnsAvailable,
                                success: function (data) {
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
                                }
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

serverApp.directive('quantityvalidation', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attr, ngModel) {
            ngModel.$parsers.unshift(function (value) {
                ngModel.$setValidity('invalidquantity', true);
                ngModel.$setValidity('emptyquantity', true);
                $(".e-in-wrap").removeClass("has-error");
                $(".e-numeric").removeClass("e-error");
                if (value == "") {
                    ngModel.$setValidity('emptyquantity', false);
                    $("#numeric").addClass("ng-exclude");
                    $(".e-numeric").addClass("e-error");
                }
                else if (parseInt(value) <= 0 || parseInt(value) > 999) {
                    ngModel.$setValidity('invalidquantity', false);
                    $("#numeric").addClass("ng-exclude");
                    $(".e-numeric").addClass("e-error");
                }
                return value;
            });
        }
    };
});

serverApp.directive('uniqueportal',
    [
        "ajaxService", function (ajaxService) {
            return {
                require: 'ngModel',
                link: function (scope, elem, attr, ngModel) {
                    ngModel.$parsers.unshift(function (value) {
                        $(".site-field .su-password-tick").hide();
                        $("#spinner").removeClass("ng-hide");
                        $("#txt-dns").addClass("remove-border");
                        ngModel.$setValidity('validdns', false);
                        ngModel.$setValidity('uniqueportalnotactivated', true);
                        ngModel.$setValidity('uniqueportal', true);
                        ajaxService.cancelRequest();
                        var el = angular.element('#txt-dns');
                        ajaxService.postJsonData(checkPortalAvailable, { "portal": value, "tenantType": attr.tenantType, "email": attr.userEmail }).then(
                            function (data) {
                                ngModel.$setValidity('validdns', true);
                                if (!ngModel.$invalid) {
                                    if (data.IsBlockedSubdomain) {
                                        ngModel.$setValidity('uniqueportalnotactivated', true);
                                        ngModel.$setValidity('uniqueportal', false);
                                    } else if (data.IsDnsExists) {
                                        ngModel.$setValidity('uniqueportal', true);
                                        ngModel.$setValidity('uniqueportalnotactivated', false);
                                    } else {
                                        $(".site-field .su-password-tick").show();
                                        ngModel.$setValidity('uniqueportal', true);
                                        ngModel.$setValidity('uniqueportalnotactivated', true);
                                    }
                                }
                                $("#spinner").addClass("ng-hide");
                                $("#txt-dns").removeClass("remove-border");
                            });

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
            };

            $scope.onStartNewSite = function () {
                $(".dns-list").hide();
                $(".dns-field").removeClass('hidden');
                $(".site-field").removeClass('hidden');
                $(".agreement-wrapper").removeClass('hidden').find(".hidden").removeClass('hidden');
                $("#register-tenant").val($("#body").hasClass("bold-reports") ? "Start Creating Reports" : "Start Creating Dashboards");
                $("#txt-dns").attr('required', true);
                $("#register-tenant").prop("disabled", true);
                $scope.tenantInformation.TenantInfoId = "";
            };

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
                                    $("#existing-account-login-popup").ejDialog("open");
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
                            $(".register-tenant-background, .register-tenant-block, .faq-part, .faq-terms-condition").addClass("blur");
                            $("#account-activation-popup-content").html(data);
                            $("#account-activation-popup").addClass("showpopup");
                        }
                    },
                    complete: function () {
                        $("#boldbi-register-body").ejWaitingPopup("hide");
                    }
                });
            };

            $scope.checkboxValidation = function () {
                if ($(".dns-list").is(":visible") && ($(".dns-field").hasClass('hidden') || $(".site-field").hasClass('hidden')) && isEmailExist) {
                    $("#register-tenant").prop('disabled', function (i, value) { return !value; });
                }
            };

            $scope.onEmailChange = function () {
                $scope.hideBusinessEmailValidation = true;
            };
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
                $("#account-verification-code").css("border");
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
            gtag('event', 'Tenant Registration', {
                'event_category': 'Bold BI',
                'event_label': 'Bold BI Tenant Registration'
            });
        }
        else if (isReportsCloudRegistration) {
            gtag('event', 'Tenant Registration', {
                'event_category': 'Bold Reports',
                'event_label': 'Bold Reports Tenant Registration'
            });
        }
        else {
            if (isEmbedPlan) {
                gtag('event', 'Embedded BI On-Premise Registration', {
                    'event_category': 'Bold BI',
                    'event_label': 'Bold BI Embedded BI On-Premise Registration'
                });
            } else {
                gtag('event', 'On-Premise Registration', {
                    'event_category': 'Bold BI',
                    'event_label': 'Bold BI On-Premise Registration'
                });
            }
        }

        gtag_report_conversion();
    }
}

function triggerGoogleAnalyticsOnRegistrationComplete() {
    if (isBoldBiBranding && analyticsTrackingEnabled) {
        if (isCloudRegistration) {
            gtag('event', 'Tenant Registration Complete', {
                'event_category': 'Bold BI',
                'event_label': 'Bold BI Tenant Registration Complete'
            });
            boldBIOpportunity();
        }
        else if (isReportsCloudRegistration) {
            gtag('event', 'Tenant Registration Complete', {
                'event_category': 'Bold Reports',
                'event_label': 'Bold Reports Tenant Registration Complete'
            });
        }
        else {
            if (isEmbedPlan) {
                gtag('event', 'Embedded BI On-Premise Registration Complete', {
                    'event_category': 'Bold BI',
                    'event_label': 'Bold BI Embedded BI On-Premise Registration Complete'
                });
            } else {
                gtag('event', 'On-Premise Registration Complete', {
                    'event_category': 'Bold BI',
                    'event_label': 'Bold BI On-Premise Registration Complete'
                });
            }
            boldBIOpportunity();
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

function onQuantityChange(args) {
    $(".e-in-wrap").removeClass("has-error");
    if (args.value == null) {
        $(".e-in-wrap").addClass("has-error");
    }
}

function existingAccountLoginPopupClose() {
    $("#txt-emailid").val("");
    localStorage.removeItem("tenantDNS");
    localStorage.removeItem("IsExistingAccountRedirection");
    localStorage.removeItem("RequestVerificationToken");
    $("#existing-account-login-popup").ejDialog("close");
}

function boldBIOpportunity() {
    gtag('event', 'Opportunity', {
        'event_category': 'Bold BI',
        'event_label': 'Bold BI Opportunity'
    });
}