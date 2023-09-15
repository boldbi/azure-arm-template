
$(document).ready(function () {
    enableMasterCheckOption();
    createWaitingPopup("master-site-change");

    String.prototype.format = function () {
        a = this;
        for (k in arguments) {
            a = a.replace("{" + k + "}", arguments[k])
        }
        return a
    }

    var masterDialog = new ej.popups.Dialog({
        header: window.Server.App.LocalizationContent.Master,
        buttons =[
            { click: updateMasterTenant, buttonModel: { content: window.Server.App.LocalizationContent.YesButton, isPrimary: true, cssClass: 'provide-access-button update-master' } },
            { click: onCloseMasterDialog, buttonModel: { content: window.Server.App.LocalizationContent.NoButton, cssClass: 'secondary-button update-master' } },
            { click: onMasterDialog, buttonModel: { content: window.Server.App.LocalizationContent.YesButton, isPrimary: true, cssClass: 'provide-access-button site-master' } },
            { click: onMasterDialogClose, buttonModel: { content: window.Server.App.LocalizationContent.NoButton, cssClass: 'secondary-button site-master' } }
        ],
        width: "472px",
        height: "auto",
        visible: false,
        isModal: true
    });
    masterDialog.appendTo("#master-site-change");

    $("#change-master").change(function () {
        var checkBox = $("#change-master").is(':checked');
        if (checkBox) {
            tenantType = document.getElementById("tenant-type").value;
            tenantType = tenantType == "BoldBIOnPremise" ? 3 : 4;
            getMasterSite(tenantType);
        }
        else {
            onMasterDialog();
        }
    });

});

function onMasterDialogOpen(tenanatName, tenantType) {
    $.ajax({
        async: false,
        type: "GET",
        url: masterSite,
        data: { tenantType: tenantType },
        success: function (result) {
            if (result.Success) {
                $(".site-master").hide();
                var masterDialog = document.getElementById("master-site-change").ej2_instances;
                masterDialog[0].showCloseIcon = true,
                    masterDialog[0].close = onCloseMasterDialog,
                    masterDialog[0].content = window.Server.App.LocalizationContent.OnStartupMessage.format("<span class='tenant-name'>", result.data, "</span> <span class='conform-message'>", ", <span class='tenant-name'>", tenanatName, "</span> ,", "</span>"),
                    document.getElementById("master-site-change").ej2_instances[0].show();
            }
        }
    });
}

function updateMasterTenant() {
    onCloseMasterDialog();
    $.ajax({
        type: "POST",
        url: updateMasterTenantUrl,
        data: { TenantInfoId: UpdateTenantId },
        success: function (result) {
            if (result.Success) {
                SuccessAlert(window.Server.App.LocalizationContent.Master, result.Message, 7000);
                siteGridRefresh();
            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.Master, window.Server.App.LocalizationContent.ErrorMessageDescription, result.Message, 7000);
                siteGridRefresh();
            }
        }
    });
}

function getMasterSite(tenantType) {
    $.ajax({
        type: "GET",
        data: { tenantType: tenantType },
        url: getMasterSiteUrl,
        success: function (result) {
            if (result.Success) {
                $(".update-master").hide();
                var masterDialog = document.getElementById("master-site-change").ej2_instances;
                masterDialog[0].content = window.Server.App.LocalizationContent.OnStartupMessage.format("<span class='tenant-name'>", result.data, "</span> <span class='conform-message'>", "", "", "", "</span>"),
                    document.getElementById("master-site-change").ej2_instances[0].show();
            }
            else {
                onMasterDialogClose();
            }
        }
    });
}

function siteGridRefresh() {
    var gridObject = document.getElementById("tenants_grid").ej2_instances[0];
    gridObject.refresh();
}

function onCloseMasterDialog() {
    document.getElementById("master-site-change").ej2_instances[0].hide();
}

function onMasterDialog() {
    $(".make-master-checkbox").attr("checked", true);
    onCloseMasterDialog();
}

function onMasterDialogClose() {
    $(".make-master-checkbox").attr("checked", false);
    onCloseMasterDialog();
}

$(document).on("change", "#tenant-type_hidden", function () {
    enableMasterCheckOption();
});

function enableMasterCheckOption() {
    if ($("#tenant-type_hidden").val() == "BoldReportsOnPremise") {
        $(".make-master-checkbox").css("display", "none");
    }
}