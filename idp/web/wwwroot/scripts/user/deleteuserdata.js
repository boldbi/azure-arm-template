$(document).ready(function () {
    $("#user-data-delete-confirmation").ejDialog({
        width: "500px",
        height: "auto",
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        title: "Delete Account",
        enableModal: true,
        showHeader: false
    });

    $("#user-data-delete-confirmation_wrapper").ejWaitingPopup();

    $(document).on("click", "input[type=radio][value=retain-tenant]", function () {
        $(this).parent().next().children("span.will-delete").hide();
        $(this).parent().next().children("span.will-retain").show();
    });

    $(document).on("click", "input[type=radio][value=delete-tenant]", function () {
        $(this).parent().next().children("span.will-retain").hide();
        $(this).parent().next().children("span.will-delete").show();
    });
});

function onProceedCloseAccount() {
    $("#user-data-delete-confirmation").ejDialog("open");
}

function onCancelCloseAccount() {
    $("#user-data-delete-confirmation_wrapper").ejWaitingPopup("hide");
    $("#user-data-delete-confirmation").ejDialog("close");
}

function onConfirmCloseAccount() {
    $("#user-data-delete-confirmation_wrapper").ejWaitingPopup("show");
    var userTenantState = [];
    $("#user-tenants-table tr:not(:first)").each(function (i) {
        var tenantId = $(this).data("tenant-id");
        var tenantStatus = $("input[type=radio][name=" + tenantId + "]:checked").val() === "delete-tenant" ? "1" : "2";
        var currentTenantValue = { TenantId: tenantId, TenantStatus: tenantStatus };
        userTenantState.push(currentTenantValue);
    });

    $.ajax({
        type: "POST",
        url: userAccountDeleteRequestUrl,
        data: { userTenantRetainDetails: userTenantState.length > 0 ? { UserTenantInfo: userTenantState } : null },
        success: function (result) {
            if (result.Success) {
                $(".modal-footer").hide();
                $(".delete-info").addClass("left-align").text(window.Server.App.LocalizationContent.UserAccountClosedSuccess);
                $(".modal-header .close-icon").hide();
                $('#user-data-delete-confirmation').ejDialog("option", { width: 600 });
                $("#user-data-delete-confirmation_wrapper").ejWaitingPopup("hide");
                setTimeout(function () { window.location.href = result.Url; }, 20000);
            }
            else {
                onCancelCloseAccount();
                WarningAlert(window.Server.App.LocalizationContent.UserAccountClosed, window.Server.App.LocalizationContent.UserAccountClosedFailure, 7000);
            }
        }
    });
}