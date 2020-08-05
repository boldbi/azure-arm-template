var issubscriptioncancel = false;
var submitComment;
var reason = [];

var buyAdditionalStorage = angular.module('serverApp');

buyAdditionalStorage.controller('additionalStorageController', ["$scope", function ($scope) {
    if (quantity != "") {
        $scope.storageSelectionSize = quantity;
    } else {
        $scope.storageSelectionSize = 1;
    }
}]);

$(document).ready(function () {
    var licenseBodyWaitingPopupTemplateId = createLoader("body");
    $("#body").ejWaitingPopup({ template: $("#" + licenseBodyWaitingPopupTemplateId) });
    submitComment = renderMde("#comment");
    $("#general-feedback-popup").addClass("display-none");

    $("#send-button").on("click", function () {
        reason = [];
        $("body").ejWaitingPopup("show");
        var commentText = submitComment.value();

        for (var i = 1; i <= $(".reason-checkbox").length; i++) {
            if ($(".checkbox" + i).is(":checked")) {
                reason.push($(".checkbox" + i).val());

            }
        }

        var feedback = {
            FeedbackFormId: $("#cancel-subscription-feedback-form-id").val(),
            CancelReason: reason,
            CanContact: $("#cancel-subscription-feedback").is(":checked"),
            Comments: commentText
        };
        $("body").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: cancelSubscriptionFeedbackUrl,
            data: { feedback: JSON.stringify(feedback) },
            success: function (result) {
                $("body").ejWaitingPopup("hide");
                if (result.Status) {
                    cancelSubscription();
                }
                else {
                    WarningAlert(window.Server.App.LocalizationContent.CancelSubscription, window.Server.App.LocalizationContent.CancelSubscritpionFailure, 0);
                }
            },
            error: function () {
                WarningAlert(window.Server.App.LocalizationContent.CancelSubscription, window.Server.App.LocalizationContent.CancelSubscritpionFailure, 0);
                $("body").ejWaitingPopup("hide");
            }
        });
    });

    $("#kc-coupon-code").on("keyup", function () {
        if ($("#kc-coupon-code").val() !== "") {
            $("#kclink-submit-button").removeAttr("disabled");
        }
        else {
            $("#kclink-submit-button").attr("disabled", "disabled");
        }
        $(".error-message").css("visibility", "hidden");
    });

    $(document).keyup(function (e) {
        if ($("#kc-link-popup_overLay").length > 0) {
            if (e.keyCode === keyCode.Enter) {
                if ($("#kclink-submit-button").attr("disabled") !== "disabled") {
                    $("#kclink-submit-button").click();
                }
            }

            if (e.keyCode === keyCode.Esc) {
                $("#kc-link-popup").ejDialog("close");
                unblurServerAppContainer();
            }
        }

        if ($("#buy-additional-storage-popup_overLay").length > 0) {
            if (e.keyCode === keyCode.Enter) {
                e.preventDefault();
                if ($("#storage-selection-container").is(":visible")) {
                    if ($("#storage-pay-now-button").is(":visible")) {
                        $("#storage-pay-now-button").click();
                    }
                    else if ($("#billing-address-proceed-button").is(":visible")) {
                        $("#billing-address-proceed-button").click();
                    }
                }
                else if ($("#billing-address-container").is(":visible")) {
                    $("#card-detail-proceed-button").click();
                }
                else if ($("#card-payment-container").is(":visible"))
                {
                    $("#card-pay-now-button").click();
                }
            }

            if (e.keyCode === keyCode.Esc) {
                $("#buy-additional-storage-popup").ejDialog("close");
                unblurServerAppContainer();
            }
        }
    });

    $("#kclink-cancel-button, #close-kclink-popup").on("click", function () {
        $("#kc-link-popup").ejDialog("close");
        $(".coupon-error-section").hide();
        $(".apply-coupon-section").show();
        $("#kclink-submit-button").attr("disabled", true);
        unblurServerAppContainer();
    });

    $("#storage-close-popup, #storage-close-popup-button").on("click", function () {
        $("#buy-additional-storage-popup").ejDialog("close");
        unblurServerAppContainer();
    });

    $(document).on('click', '#kclink-retry-button', function () {
        $(".coupon-error-section").hide();
        $(".apply-coupon-section").show();
        $("#kc-coupon-code").val("").focus();
        $("#kclink-submit-button").attr("disabled", true);
    });

    $("#kclink-submit-button").on("click", function () {
        $("#kc-link-popup_wrapper").ejWaitingPopup("show");
        var token = $("#kc-coupon-code").val();
        $.ajax({
            type: "POST",
            data: { token: token },
            url: applyKcCouponUrl,
            success: function (result) {
                if (result.Status) {
                    $("#kc-link-popup").ejDialog("close");
                    unblurServerAppContainer();
                    SuccessAlert(window.Server.App.LocalizationContent.SubscriptionUpdated, window.Server.App.LocalizationContent.ApplyKCCouponSuccess, 3000);
                    location.reload();
                }
                else {
                    $(".coupon-error-section").show();
                    $(".apply-coupon-section").hide();
                }

                $("#kc-link-popup_wrapper").ejWaitingPopup("hide");
            },
            error: function () {
                WarningAlert(window.Server.App.LocalizationContent.ConnectYourSyncfusionAccount, window.Server.App.LocalizationContent.ApplyCouponFailed, 0)
                $("#kc-link-popup").ejDialog("close");
            }
        });
    });

    $("#buy-additional-storage-popup").ejDialog({
        height: 'auto',
        width: '380px',
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        showHeader: false,
        enableModal: true,
        closeOnEscape: false,
        close: "onBuyAdditionalStorageDialogClose",
        open: function (args) {
            onBuyAdditionalStorageDialogOpen(args)
        }
    });

    $("#buy-additional-storage-popup_wrapper").ejWaitingPopup();
    var buyAdditionalStorageLinkWaitingPopupTemplateId = createLoader("#buy-additional-storage-popup_wrapper");
    $("#buy-additional-storage-popup_wrapper").ejWaitingPopup({ template: $("#" + buyAdditionalStorageLinkWaitingPopupTemplateId) });

    $("#billing-address-proceed-button").on("click", function () {
        if ($("#billing-address-proceed-button").is(":visible")) {
            $("#billing-address-container").show();
            $("#card-detail-proceed-button").show();
            $("#storage-selection-container").hide();
            $("#billing-address-proceed-button").hide();
            $("#storage-back-popup-button").show();
            $("#buy-additional-storage-popup").ejDialog({ width: 560 });
            $("#buy-additional-storage-popup").ejDialog("refresh");
            $("#pay-form-info-fullname").focus();
        }
    });

    $("#card-detail-proceed-button").on("click", function (e) {
        if ($("#card-detail-proceed-button").is(":visible")) {
            if ($("#card-form-id").valid()) {
                e.preventDefault();
                $("#card-payment-container").show();
                $("#card-pay-now-button").show();
                $("#billing-address-container").hide();
                $("#card-detail-proceed-button").hide();
                $("#storage-back-popup-button").show();
                $("#buy-additional-storage-popup").ejDialog({ width: 440 });
                $("#buy-additional-storage-popup").ejDialog("refresh");
                card.focus();
            }
        }

    });

    $("#storage-back-popup-button").on("click", function () {
        if ($("#card-payment-container").is(":visible")) {
            $("#billing-address-container").show();
            $("#card-detail-proceed-button").show();
            $("#card-payment-container").hide();
            $("#card-pay-now-button").hide();
            $("#buy-additional-storage-popup").ejDialog({ width: 560 });
            $("#buy-additional-storage-popup").ejDialog("refresh");
            $("#pay-form-info-fullname").focus();
        } else if ($("#billing-address-container").is(":visible")) {
            $("#storage-selection-container").show();
            $("#billing-address-proceed-button").show();
            $("#billing-address-container").hide();
            $("#card-detail-proceed-button").hide();
            $("#storage-back-popup-button").hide();
            $("#buy-additional-storage-popup").ejDialog({ width: 380 });
            $("#buy-additional-storage-popup").ejDialog("refresh");
            FocusNumericTextBox();
        }
    });

    $(document).on("click", "#card-pay-now-button, #storage-pay-now-button", function (e) {
        e.preventDefault();
        if ($("#card-pay-now-button").is(":visible") || $("#storage-pay-now-button").is(":visible")) {
            buyStorage();
        }
    });

    $("#numeric").ejNumericTextbox({
        name: "numeric",
        minValue: 0,
        maxValue: 1000,
        width: "100%",
        height: "24px",
        change: "OnStorageSizeChange"
    });
});

function validateSubscriptionStatus() {
    issubscriptioncancel = JSON.parse($('#issubscriptioncancel').text().toLowerCase());
    if (issubscriptioncancel) {
        $("#change-subscription-settings").removeClass("disable-subscription cancel-subscription-button").addClass("reactivate-subscription-button");
        $("#change-subscription-settings").text(window.Server.App.LocalizationContent.ReactivateSubscription);
        $("#change-plan-settings").prop("disabled", true);
    }
    else {
        $("#change-subscription-settings").addClass("disable-subscription");
        $("#change-subscription-settings").removeClass("reactivate-subscription-button").addClass("disable-subscription cancel-subscription-button");
        $("#change-subscription-settings").text(window.Server.App.LocalizationContent.CancelSubscription);
        $('#deactivesubscription').prop('checked', false);
        $("#change-plan-settings").prop("disabled", false);
        $("#enable-cancelsubscription").addClass("disable-subscription").prop("disabled", true);
    }
}

$(document).on('mouseover', '#change-subscription-settings', function () {
    if ($("#change-subscription-settings").hasClass("cancel-subscription-button")) {
        $(this).removeClass("disable-subscription");
    }
});
$(document).on('mouseout', '#change-subscription-settings', function () {
    if ($("#change-subscription-settings").hasClass("cancel-subscription-button")) {
        $(this).addClass("disable-subscription");
    }
});


function openSubscriptionSettings() {
    $("body").ejWaitingPopup("show");
    validateSubscriptionStatus();
    if (issubscriptioncancel) {
        $("#subscription-plan-container").removeClass("show-block").addClass("hide-block");
        $("#cancel-subscription-container").removeClass("show-block").addClass("hide-block");
        $("#reactivate-subscription-container").removeClass("hide-block").addClass("show-block");
    } else {
        $("#subscription-plan-container").removeClass("show-block").addClass("hide-block");
        $("#cancel-subscription-container").removeClass("hide-block").addClass("show-block");
        $("#reactivate-subscription-container").removeClass("show-block").addClass("hide-block");
    }
    $("body").ejWaitingPopup("hide");
    $("#server-app-container").scrollTop(0);
}

function activateSubscription() {
    $("body").ejWaitingPopup("show");
    $.ajax({
        type: "POST",
        url: activateSubscriptionUrl,
        success: function (result) {
            $("body").ejWaitingPopup("hide");
            if (result.Status) {
                SuccessAlert(window.Server.App.LocalizationContent.ReactivateSubscription, window.Server.App.LocalizationContent.ReactivateSubscritpionSuccess, 7000);
                window.location.reload();
            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.ReactivateSubscription, window.Server.App.LocalizationContent.ReactivateSubscritpionFailure, 0);
            }
        },
        error: function () {
            WarningAlert(window.Server.App.LocalizationContent.ReactivateSubscription, window.Server.App.LocalizationContent.ReactivateSubscritpionFailure, 0);
            $("body").ejWaitingPopup("hide");
        }
    });
}

function onChangeReason() {
    if ($("#Other").is(":checked") || $("#IDidNotGetAroundToTrying").is(":checked") || $("#NotEnoughConnectors").is(":checked") || $("#DifficultToUse").is(":checked") || $("#FoundAnotherProduct").is(":checked")) {
        $("#send-button").prop("disabled", false);
    }
    else {
        $("#send-button").prop("disabled", true);
    }
}

function cancelSubscriptionFeedback() {
    $("#cancel-subscription-feedback-popup").ejDialog("open");
    $("#cancel-subscription-feedback-popup").removeClass("display-none");
}



$(document).on('change', '#deactivesubscription', function () {
    if ($('#deactivesubscription').is(":checked")) {
        $("#enable-cancelsubscription").removeClass("disable-subscription").prop("disabled", false);
    }
    else {
        $("#enable-cancelsubscription").addClass("disable-subscription").prop("disabled", true);
    }
});

function redirectToSubscriptionPlan() {
    $("#subscription-plan-container").removeClass("hide-block").addClass("show-block");
    $("#cancel-subscription-container").removeClass("show-block").addClass("hide-block");
    $("#reactivate-subscription-container").removeClass("show-block").addClass("hide-block");
    $("#choose-plan-container").removeClass("show-block").addClass("hide-block");
    $("#server-app-container").scrollTop(0);
}

function openPlanPickupPartial() {
    $("body").ejWaitingPopup("show");
    var planId = $("#currentPlanId").text();
    $.ajax({
        type: "GET",
        url: getPlansUrl,
        data: { planId: planId },
        success: function (result) {
            var isValid = result.includes(window.Server.App.LocalizationContent.GetUpdatePlanFailure);
            if (!isValid) {
                $("#choose-plan-dialog").html(result);
                redirectToChoosePlan();
            } else {
                WarningAlert(window.Server.App.LocalizationContent.ChoosePlan, window.Server.App.LocalizationContent.GetUpdatePlanFailure, 0);
            }
            $("body").ejWaitingPopup("hide");
        },
        error: function () {
            $("body").ejWaitingPopup("hide");
            WarningAlert(window.Server.App.LocalizationContent.ChoosePlan, window.Server.App.LocalizationContent.GetUpdatePlanFailure, 0);
        }
    });
}

function openKcUserOfferPartial() {
    $("#kc-link-popup").ejDialog("open");
    $("#kc-coupon-code").val("")
    blurServerAppContainer();
    $(".error-message").css("visibility", "hidden");
}


function redirectToChoosePlan() {
    $("#subscription-plan-container").removeClass("show-block").addClass("hide-block");
    $("#cancel-subscription-container").removeClass("show-block").addClass("hide-block");
    $("#reactivate-subscription-container").removeClass("show-block").addClass("hide-block");
    $("#choose-plan-container").removeClass("hide-block").addClass("show-block");
    $("#server-app-container").scrollTop(0);
}


$(document).on("click", '.choose-plan-button', function () {
    $("#updatechooseplan").prop("disabled", false);
    if (!$(this).hasClass("selected-plan-button")) {
        $('.choose-plan-button').removeClass("selected-plan-button");
        $('.choose-plan-button').parent().parent().removeClass("selected-plan-table");
        $(this).addClass("selected-plan-button");
        $(this).parent().parent().addClass("selected-plan-table");
    }

    if ($(".selected-plan-table").length === 0) {
        $("#updatechooseplan").prop("disabled", true);
    }

});

function updateNewPlan() {
    if ($(".selected-plan-button").length === 0) {
        return;
    }
    var selectedPlan = $(".selected-plan-button");
    var planId = selectedPlan.attr("data-plan-id");
    if (planId != "") {
        $("body").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: updatePlanUrl,
            data: { planId: planId },
            success: function (result) {
                $("body").ejWaitingPopup("hide");
                if (result.Status) {
                    SuccessAlert(window.Server.App.LocalizationContent.ChoosePlan, window.Server.App.LocalizationContent.UpdatedPlanSuccess, 7000);
                    window.location.reload();
                } else if (result.IsCorporateEmail !== undefined && !result.IsCorporateEmail) {
                    WarningAlert(window.Server.App.LocalizationContent.ChoosePlan, window.Server.App.LocalizationContent.InvalidBusinessEmail, 0);
                } else {
                    $("body").ejWaitingPopup("hide");
                    WarningAlert(window.Server.App.LocalizationContent.ChoosePlan, window.Server.App.LocalizationContent.ChoosePlanFailure, 0);
                }
            }
        });
    }
}

function reloadSubscriptionPlan() {
    $("body").ejWaitingPopup("show");
    $.ajax({
        type: "GET",
        url: getSubscriptionPlanUrl,
        success: function (result) {
            var isValid = result.includes(window.Server.App.LocalizationContent.SubscriptionPlanFailure);
            if (!isValid) {
                $("#subscription-plan-dialog").html(result);
                redirectToSubscriptionPlan();
            } else {
                WarningAlert(window.Server.App.LocalizationContent.SubscriptionPlan, window.Server.App.LocalizationContent.SubscriptionPlanFailure, 0);
            }
            $("body").ejWaitingPopup("hide");
        },
        error: function () {
            $("body").ejWaitingPopup("hide");
            WarningAlert(window.Server.App.LocalizationContent.SubscriptionPlan, window.Server.App.LocalizationContent.SubscriptionPlanFailure, 0);
        }
    });
}

function renderMde(id) {
    var simplemde = new EasyMDE({
        element: $(id)[0],
        status: false,
        spellChecker: false,
        autoDownloadFontAwesome: false,
        toolbar: false,
        previewRender: function (plainText) {
            return customMarkdownParser(plainText); // Returns HTML from a custom parser
        },
    });
    return simplemde;
}

function cancelSubscription() {
    $("#cancel-subscription-feedback-popup").ejDialog("close");
    $("body").ejWaitingPopup("show");
    var commentText = submitComment.value("");
    $(".reason-checkbox").prop("checked", false);
    $("#cancel-subscription-feedback").prop("checked", false);
    $("#cancel-subscription-feedback-popup").addClass("display-none");
    $("#send-button").prop("disabled", true);

    $.ajax({
        type: "POST",
        url: cancelSubscriptionUrl,
        success: function (result) {
            $("body").ejWaitingPopup("hide");
            if (result.Status) {
                SuccessAlert(window.Server.App.LocalizationContent.CancelSubscription, window.Server.App.LocalizationContent.CancelSubscriptionSuccess, 7000);
                window.location.reload();
            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.CancelSubscription, window.Server.App.LocalizationContent.CancelSubscritpionFailure, 0);
            }
        },
        error: function () {
            WarningAlert(window.Server.App.LocalizationContent.CancelSubscription, window.Server.App.LocalizationContent.CancelSubscritpionFailure, 0);
            $("body").ejWaitingPopup("hide");
        }
    });
}

function openBuyAdditionalStoragePartial() {
    $("#buy-additional-storage-popup").ejDialog("open");
    blurServerAppContainer();
}

function onBuyAdditionalStorageDialogOpen() {
    $("#buy-additional-storage-popup").ejDialog({ width: 380 });
    if ($("#storage-pay-now-button").is(":visible")) {
        FocusNumericTextBox();
    }
    else if ($("#billing-address-proceed-button").is(":visible")) {
        FocusNumericTextBox();
    }
}

function onBuyAdditionalStorageDialogClose() {
    $('[ng-controller="additionalStorageController"]').scope().$apply(function () {
        if (quantity != "") {
            $('[ng-controller="additionalStorageController"]').scope().storageSelectionSize = quantity;
        } else {
            $('[ng-controller="additionalStorageController"]').scope().storageSelectionSize = 1;
        }
    });
    $("#storage-selection-container").show();
    $("#billing-address-proceed-button").show();
    $("#buy-additional-storage-popup").ejDialog({ width: 380 });
    $("#card-payment-container").hide();
    $("#card-detail-proceed-button").hide();
    $("#storage-back-popup-button").hide();
    if (!(isCardExist.toLowerCase() === "true")) {
        $("#card-pay-now-button").hide();
    }

    $("#billing-address-container").hide();
    clearCardAndBillingAddressValue();
    $("#buy-additional-storage-popup").ejDialog("refresh");
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

function buyStorage() {
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
        var additionalStorageQuantity = $("#additional-storage-quantity").val();

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
                        zip: cardInfo.address_zip,
                        additionalStorageQuantity: additionalStorageQuantity
                    },
                    success: function (data) {
                        if (!data.Status) {
                            unblurServerAppContainer();
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
                            card.clear();
                            cvc.clear();
                            exp.clear();
                            $("#buy-additional-storage-popup").ejDialog("close");
                            unblurServerAppContainer();
                            hideWaitingPopup("server-app-container");
                            SuccessAlert(window.Server.App.LocalizationContent.Subscription, window.Server.App.LocalizationContent.UpdateSubscriptionSuccess, 7000);
                            window.location.reload();
                        }
                    }
                });
            } else if (result.error && result.error.message) {
                showCreditcardValidation(result);
                $("#card-pay-now-button").removeAttr("disabled");
                unblurServerAppContainer();
                hideWaitingPopup("server-app-container");
            }
        });
    }
    else {
        $("#storage-pay-now-button").attr("disabled", false);
        var additionalStorageQuantity = $("#additional-storage-quantity").val();
        showWaitingPopup("server-app-container");
        $.ajax({
            url: updateSubscriptionUrl,
            type: "POST",
            data: {
                additionalStorageQuantity: additionalStorageQuantity
            },
            success: function (data) {
                if (!data.Status) {
                    unblurServerAppContainer();
                    $("#storage-pay-now-button").attr("disabled", false);
                    $("#buy-additional-storage-popup").ejDialog("close");
                    hideWaitingPopup("server-app-container");
                    WarningAlert(window.Server.App.LocalizationContent.Subscription, window.Server.App.LocalizationContent.UpdateSubscriptionFailure, 0);
                }
                else {
                    unblurServerAppContainer();
                    $("#buy-additional-storage-popup").ejDialog("close");
                    hideWaitingPopup("server-app-container");
                    SuccessAlert(window.Server.App.LocalizationContent.Subscription, window.Server.App.LocalizationContent.UpdateSubscriptionSuccess, 7000);
                    window.location.reload();
                }
            }
        });
    }
}

function FocusNumericTextBox() {
    $(".e-input").hide();
    $("#numeric").show();
    $(".e-numeric").addClass("e-focus");
    $("#numeric").focus();
}

function OnStorageSizeChange(args) {
    $('[ng-controller="additionalStorageController"]').scope().$apply(function () {
        $('[ng-controller="additionalStorageController"]').scope().storageSelectionSize = args.value;
    });
}