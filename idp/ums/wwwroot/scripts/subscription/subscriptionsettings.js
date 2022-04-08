var issubscriptioncancel = false;
var submitComment;
var reason = [];
var tenantDetails, id, name, url, productName;
var additionalQuantity = angular.module('serverApp');

additionalQuantity.controller('additionalQuantityController', ["$scope", function ($scope) {
        $scope.developerQuantity = tenantQuantity;
}]);

$(document).ready(function () {
    var licenseBodyWaitingPopupTemplateId = createLoader("body");
    $("#body").ejWaitingPopup({ template: $("#" + licenseBodyWaitingPopupTemplateId) });
    submitComment = renderMde("#comment");
    $("#general-feedback-popup").addClass("display-none");

    $.validator.addMethod("isValidName", function (value, element) {
        return IsValidName("name", value)
    }, window.Server.App.LocalizationContent.AvoidSpecialCharactors);

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, window.Server.App.LocalizationContent.ItemNameValidator);

    $("#tenant-information-form").validate({
        errorElement: "span",
        onkeyup: function (element, event) {
            $("#success-message").html("");
            if (event.keyCode !== 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false
            } else true
        },
        onfocusout: function (element) { $(element).valid(); $("#success-message").html(""); },
        rules: {
            "portal-name": {
                isRequired: false,
                isValidName: true
            },
            "portal-url": {
                isRequired: false,
                isValidName: true
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
            $(element).closest("div").find("span").html("");
        },
        errorPlacement: function (error, element) {
            var read = $("#" + element.context.id).not(":disabled");
            if (read) {
                $(element).closest('div').find("span").html(error.html());
            }
        },
        messages: {
            "portal-name": {
                isRequired: window.Server.App.LocalizationContent.PortalNameValidator
            },
            "portal-url": {
                isRequired: window.Server.App.LocalizationContent.PortalUrlValidator
            }
        }
    });

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

    $("#additional-devloper-quantity-popup").ejDialog({
        height: 'auto',
        width: '380px',
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        showHeader: false,
        enableModal: true,
        closeOnEscape: false,
        close: "onBuyAdditionalDeveloperQuantityDialogClose",
        open: function (args) {
            onBuyAdditionalDeveloperQuantityDialogOpen(args)
        }
    });
    $("#quantity-close-popup, #quantity-close-popup-button").on("click", function () {
        $("#additional-devloper-quantity-popup").ejDialog("close");
        unblurServerAppContainer();
    });

});

function initializeNumericBox() {
    $("#numeric").ejNumericTextbox({
        name: "numeric",
        minValue: 1,
        value: tenantQuantity,
        maxValue: 999,
        width: "100%",
        height: "24px",
        change: "onQuantityChange"
    });
}

function openBuyAdditionalDeveloperQuantityPartial() {
    initializeNumericBox();
    $("#additional-devloper-quantity-popup").ejDialog("open");
    blurServerAppContainer();
}

function onBuyAdditionalDeveloperQuantityDialogOpen() {
    $("#additional-devloper-quantity-popup").ejDialog({ width: 380 });
}

function onQuantityChange(args) {
    $('[ng-controller="additionalQuantityController"]').scope().$apply(function () {
        $('[ng-controller="additionalQuantityController"]').scope().developerQuantity = args.value;
    });
}

function onBuyAdditionalDeveloperQuantityDialogClose() {
    $('[ng-controller="additionalQuantityController"]').scope().$apply(function () {
        $('[ng-controller="additionalQuantityController"]').scope().developerQuantity = tenantQuantity;
    });
    $("#numeric").data("ejNumericTextbox").destroy();
    initializeNumericBox();
    $("#quantity-selection-container").show();
    $("#additional-devloper-quantity-popup").ejDialog({ width: 380 });
    $("#additional-devloper-quantity-popup").ejDialog("refresh");
}


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

function redirectToChoosePlan() {
    $("#subscription-plan-container").removeClass("show-block").addClass("hide-block");
    $("#cancel-subscription-container").removeClass("show-block").addClass("hide-block");
    $("#reactivate-subscription-container").removeClass("show-block").addClass("hide-block");
    $("#choose-plan-container").removeClass("hide-block").addClass("show-block");
    $("#server-app-container").scrollTop(0);
}

function saveDeveloperQuantity() {
    $("body").ejWaitingPopup("show");
    tenantQuantity = $("#additional-developer-quantity").val();
    var planId = $("#currentPlanId").text();
    $.ajax({
        url: updateTenantQuantityUrl,
        type: "POST",
        data: {
            quantity: tenantQuantity,
            planId: planId
        },
        success: function (data) {
            if (!data.Status) {
                unblurServerAppContainer();
                $("#additional-devloper-quantity-popup").ejDialog("close");
                $("body").ejWaitingPopup("hide");
                WarningAlert(window.Server.App.LocalizationContent.Subscription, data.StatusMessage, 0);
            }
            else {
                unblurServerAppContainer();
                $("#additional-devloper-quantity-popup").ejDialog("close");
                $("body").ejWaitingPopup("hide");
                SuccessAlert(window.Server.App.LocalizationContent.Subscription, window.Server.App.LocalizationContent.UpdateSubscriptionSuccess, 0);
                window.location.reload();
            }
        }
    });
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
    if (planId !== "") {
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
                }
                else if (result.IsCorporateEmail !== undefined && !result.IsCorporateEmail) {
                    WarningAlert(window.Server.App.LocalizationContent.ChoosePlan, window.Server.App.LocalizationContent.InvalidBusinessEmail, 0);
                }
                else {
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

function updateTenant() {
    $("#success-message").html("");
    var isValid = $('#tenant-information-form').valid();

    if (isValid) {
        ShowWaitingProgress("#content-area", "show");

        id = $("#tenantId").text();
        name = $("#portal-name").val().trim();
        url = $("#portal-url").val().trim();

        if (name.length > 0 && (tenantDetails.Tenant.DNS !== name || tenantDetails.Tenant.CustomDomain !== url)) {
            $.ajax({
                type: "POST",
                url: updateTenantUrl,
                data: { tenantId: id, portalName: name, portalUrl: url },
                success: function (result) {
                    if (result.status) {
                        ShowWaitingProgress("#content-area", "hide");
                        tenantDetails.Tenant.DNS = $("#portal-name").val(name).val();
                        tenantDetails.Tenant.CustomDomain = $("#portal-url").val(url).val();
                        $(".header-org-name").html(productName + " - " + tenantDetails.Tenant.DNS);

                        SuccessAlert(window.Server.App.LocalizationContent.UpdateTenantInformation, window.Server.App.LocalizationContent.UpdateTenantInformationSuccess, 7000);
                    }
                    else
                    {
                        $("#portal-name").val(tenantDetails.Tenant.DNS);
                        $("#portal-url").val(tenantDetails.Tenant.CustomDomain);
                        ShowWaitingProgress("#content-area", "hide");
                        WarningAlert(window.Server.App.LocalizationContent.UpdateTenantInformation, window.Server.App.LocalizationContent.UpdateTenantInformationFailed, 7000);
                    }
                },
                error: function (error) {
                    $("#portal-name").val(tenantDetails.Tenant.DNS);
                    $("#portal-url").val(tenantDetails.Tenant.CustomDomain);
                    ShowWaitingProgress("#content-area", "hide");
                    WarningAlert(window.Server.App.LocalizationContent.UpdateTenantInformation, window.Server.App.LocalizationContent.UpdateTenantInformationFailed, 7000);
                }
            });

            $(".edit-profile-field").attr("disabled", true).removeClass("enable");
            $("#save-button").hide();
            $("#cancel-button").css("display", "none");
            $("#cancel-link-button").css("display", "none");
            $("#edit,#group-div").show();
        }
        else {
            ShowWaitingProgress("#content-area", "hide");
            
            if (name.length <= 0) {
                $("#portal-name-validation").html(window.Server.App.LocalizationContent.InvalidPortalName);
                $("#save-button").attr("disabled", true);
            }
            else if (tenantDetails.Tenant.DNS === name || tenantDetails.Tenant.CustomDomain === url) {
                WarningAlert(window.Server.App.LocalizationContent.UpdateTenantInformation, window.Server.App.LocalizationContent.TenantDetailsNotChanged, 7000);
            }
        }
    }
}

$(document).on("click", "#edit", function (e) {
    $("#edit,#group-div").hide();
    $("#save-button").show();
    $("#save-button").attr("disabled", true);
    $("#cancel-button").css("display", "inline");
    $("#cancel-link-button").css("display", "inline");
    $(".edit-profile-field").attr("disabled", false).addClass("enable");
});

$(document).on("click", "#cancel-button", function (e) {
    $("#success-message").html("");
    $("#portal-name").val(tenantDetails.Tenant.DNS);
    $("#portal-url").val(tenantDetails.Tenant.CustomDomain);
    $(".edit-profile-field").attr("disabled", true).removeClass("enable");
    $(".alert-messages").closest("div").removeClass("has-error form-control");
    $(".alert-messages").html("");
    $("#save-button,#cancel-button,#cancel-link-button").hide();
    $("#edit, #group-div").show();
});

function editTenant(fulldata) {
    tenantDetails = fulldata;
    $("#portal-name").val(tenantDetails.Tenant.DNS);
    $("#portal-url").val(tenantDetails.Tenant.CustomDomain);
}

function onChangeName() {
    var changedName = $("#portal-name").val().trim();
    var changedPortalUrl = $("#portal-url").val().trim();
    if (changedName.length <= 0)
    {
        $("#portal-name-validation").html(window.Server.App.LocalizationContent.InvalidPortalName);
        $("#save-button").attr("disabled", true);
    }
    else if (changedName.length > 0 && (tenantDetails.Tenant.DNS !== changedName || tenantDetails.Tenant.CustomDomain !== changedPortalUrl)) {
        $("#portal-name-validation").html("");
        $("#save-button").attr("disabled", false);
    }
    else
    {
        $("#portal-name-validation").html("");
        $("#save-button").attr("disabled", true);
    }
}

function onChangeUrl() {
    var changedPortalName = $("#portal-name").val().trim();
    var changedUrl = $("#portal-url").val().trim();
    if (changedUrl.length <= 0 && tenantDetails.Tenant.DNS === changedPortalName) {
        $("#save-button").attr("disabled", true);
    }
    else if (changedUrl.length > 0 && tenantDetails.Tenant.CustomDomain !== changedUrl) {
        $("#portal-name-validation").html("");
        $("#save-button").attr("disabled", false);
    }
    else {
        $("#portal-name-validation").html("");
        $("#save-button").attr("disabled", true);
    }
}