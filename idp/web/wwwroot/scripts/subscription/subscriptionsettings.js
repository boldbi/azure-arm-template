var issubscriptioncancel = false;
var submitComment;
var reason = [];

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
                    WarningAlert(window.IdP.App.LocalizationContent.CancelSubscription, window.IdP.App.LocalizationContent.CancelSubscritpionFailure, 0);
                }
            },
            error: function () {
                WarningAlert(window.IdP.App.LocalizationContent.CancelSubscription, window.IdP.App.LocalizationContent.CancelSubscritpionFailure, 0);
                $("body").ejWaitingPopup("hide");
            }
        });
    });
});

function validateSubscriptionStatus() {
    issubscriptioncancel = JSON.parse($('#issubscriptioncancel').text().toLowerCase());
    if (issubscriptioncancel) {
        $("#change-subscription-settings").removeClass("disable-subscription cancel-subscription-button").addClass("reactivate-subscription-button");
        $("#change-subscription-settings").text(window.IdP.App.LocalizationContent.ReactivateSubscription);
        $("#change-plan-settings").prop("disabled", true);
    }
    else {
        $("#change-subscription-settings").addClass("disable-subscription");
        $("#change-subscription-settings").removeClass("reactivate-subscription-button").addClass("disable-subscription cancel-subscription-button");
        $("#change-subscription-settings").text(window.IdP.App.LocalizationContent.CancelSubscription);
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
                SuccessAlert(window.IdP.App.LocalizationContent.ReactivateSubscription, window.IdP.App.LocalizationContent.ReactivateSubscritpionSuccess, 7000);
                window.location.reload();
            }
            else {
                WarningAlert(window.IdP.App.LocalizationContent.ReactivateSubscription, window.IdP.App.LocalizationContent.ReactivateSubscritpionFailure, 0);
            }
        },
        error: function () {
            WarningAlert(window.IdP.App.LocalizationContent.ReactivateSubscription, window.IdP.App.LocalizationContent.ReactivateSubscritpionFailure, 0);
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
            var isValid = result.includes(window.IdP.App.LocalizationContent.GetUpdatePlanFailure);
            if (!isValid) {
                $("#choose-plan-dialog").html(result);
                redirectToChoosePlan();
            } else {
                WarningAlert(window.IdP.App.LocalizationContent.ChoosePlan, window.IdP.App.LocalizationContent.GetUpdatePlanFailure, 0);
            }
            $("body").ejWaitingPopup("hide");
        },
        error: function () {
            $("body").ejWaitingPopup("hide");
            WarningAlert(window.IdP.App.LocalizationContent.ChoosePlan, window.IdP.App.LocalizationContent.GetUpdatePlanFailure, 0);
        }
    });
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
                    SuccessAlert(window.IdP.App.LocalizationContent.ChoosePlan, window.IdP.App.LocalizationContent.UpdatedPlanSuccess, 7000);
                    window.location.reload();
                }
                else if (result.IsCorporateEmail != undefined && !result.IsCorporateEmail) {
                    WarningAlert(window.IdP.App.LocalizationContent.ChoosePlan, window.IdP.App.LocalizationContent.InvalidBusinessEmail, 0);
                }
                else {
                    $("body").ejWaitingPopup("hide");
                    WarningAlert(window.IdP.App.LocalizationContent.ChoosePlan, window.IdP.App.LocalizationContent.ChoosePlanFailure, 0);
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
            var isValid = result.includes(window.IdP.App.LocalizationContent.SubscriptionPlanFailure);
            if (!isValid) {
                $("#subscription-plan-dialog").html(result);
                redirectToSubscriptionPlan();
            } else {
                WarningAlert(window.IdP.App.LocalizationContent.SubscriptionPlan, window.IdP.App.LocalizationContent.SubscriptionPlanFailure, 0);
            }
            $("body").ejWaitingPopup("hide");
        },
        error: function () {
            $("body").ejWaitingPopup("hide");
            WarningAlert(window.IdP.App.LocalizationContent.SubscriptionPlan, window.IdP.App.LocalizationContent.SubscriptionPlanFailure, 0);
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
                SuccessAlert(window.IdP.App.LocalizationContent.CancelSubscription, window.IdP.App.LocalizationContent.CancelSubscriptionSuccess, 7000);
                window.location.reload();
            }
            else {
                WarningAlert(window.IdP.App.LocalizationContent.CancelSubscription, window.IdP.App.LocalizationContent.CancelSubscritpionFailure, 0);
            }
        },
        error: function () {
            WarningAlert(window.IdP.App.LocalizationContent.CancelSubscription, window.IdP.App.LocalizationContent.CancelSubscritpionFailure, 0);
            $("body").ejWaitingPopup("hide");
        }
    });
}