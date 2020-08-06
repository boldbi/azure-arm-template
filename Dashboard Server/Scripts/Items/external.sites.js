var isExternalSitesDialogBinded = false;

function getExternalSitesDetailDialog() {
    var dialogHeader = '<span class ="external-sites-dialog-header">' + window.Server.App.LocalizationContent.ExternalSiteDialogHeader + '</span>';
    if (!isExternalSitesDialogBinded) {
        var createDialogId = document.createElement("div");
        createDialogId.setAttribute("id", "external-site-dialog");
        var element = document.getElementById("dashboard-page-container");
        element.appendChild(createDialogId);
        var dialog = new ejs.popups.Dialog({
            header: dialogHeader,
            content: document.getElementById("get-external-site-content"),
            buttons: [
                {
                    'click': function () {
                        if (!parent.$("#external-client-id, #external-client-secret, #external-site-url, #external-site-name").hasClass("has-error")) {
                            saveExternalSites();
                        }
                    },
                    buttonModel: {
                        isPrimary: true,
                        content: window.Server.App.LocalizationContent.SaveButton
                    }
                },
                {
                    'click': function () {
                        dialog.hide();
                    },
                    buttonModel: {
                        content: window.Server.App.LocalizationContent.CancelButton
                    }
                },
            ],
            animationSettings: { effect: 'Zoom' },
            beforeOpen: beforeOpenExternalSitesDialog,
            beforeClose: beforeCloseExternalSitesDialog,
            width: '600px',
            showCloseIcon: true,
            isModal: true,
        });
        dialog.appendTo(createDialogId);
        isExternalSitesDialogBinded = true;
    }
    else {
        var dialog = document.getElementById("external-site-dialog").ej2_instances;
        dialog[0].show();
    }

    ejs.popups.createSpinner({
        target: document.getElementById('external-site-dialog')
    });
    ejs.popups.setSpinner({ type: 'Material' });
}

function beforeOpenExternalSitesDialog() {
    $("#get-external-site-content").show();
    $(".client-secret-validation-message, .clientid-validation-message, .site-url-validation-message, .name-validation-message").html("");
    parent.$("#external-client-id, #external-client-secret, #external-site-url, #external-site-name").removeClass("has-error");
}

$(document).on("keyup focusout", "#external-site-dialog, #external-client-id", function (e) {
    var clientId = $("#external-client-id").val().trim();
    if (isEmptyOrWhitespace(clientId)) {
        $(".clientid-validation-message").html(window.Server.App.LocalizationContent.ClientId);
        parent.$("#external-client-id").addClass("has-error");
    }
    else {
        $(".clientid-validation-message").html("");
        parent.$("#external-client-id").removeClass("has-error");
    }
});

$(document).on("keyup focusout", "#external-site-dialog, #external-client-secret", function (e) {
    var clientSecret = $("#external-client-secret").val().trim();
    if (isEmptyOrWhitespace(clientSecret)) {
        $(".client-secret-validation-message").html(window.Server.App.LocalizationContent.ClientSecret);
        parent.$("#external-client-secret").addClass("has-error");
    }
    else {
        $(".client-secret-validation-message").html("");
        parent.$("#external-client-secret").removeClass("has-error");
    }
});

$(document).on("keyup focusout", "#external-site-dialog, #external-site-url", function (e) {
    var siteURL = $("#external-site-url").val().trim();
    if (isEmptyOrWhitespace(siteURL)) {
        $(".site-url-validation-message").html(window.Server.App.LocalizationContent.SiteURL);
        parent.$("#external-site-url").addClass("has-error");
    }
    else if (isValidUrl(siteURL)) {
        $(".site-url-validation-message").html(window.Server.App.LocalizationContent.IsValidUrl);
        parent.$("#external-site-url").addClass("has-error");
    }
    else {
        $(".site-url-validation-message").html("");
        parent.$("#external-site-url").removeClass("has-error");
    }
});

$(document).on("keyup focusout", "#external-site-dialog, #external-site-name", function (e) {
    var siteName = $("#external-site-name").val().trim();
    if (isEmptyOrWhitespace(siteName)) {
        $(".name-validation-message").html(window.Server.App.LocalizationContent.ItemNameValidator);
        parent.$("#external-site-name").addClass("has-error");
    }
    else if (!IsValidName("name", siteName)) {
        $(".name-validation-message").html(window.Server.App.LocalizationContent.AvoidSpecialCharactors);
        parent.$("#external-site-name").addClass("has-error");
    }
    else {
        siteNameCheck(siteName);
    }
});

function beforeCloseExternalSitesDialog() {
    $("#external-client-id, #external-client-secret, #external-site-url, #external-site-name").val("");
    $(".client-secret-validation-message, .clientid-validation-message, .site-url-validation-message, .name-validation-message").html("");
    parent.$("#external-client-id, #external-client-secret, #external-site-url, #external-site-name").removeClass("has-error");
}

function updateExternalSites() {
    $.ajax({
        type: "GET",
        data: { itemId: publishedDashboardInfo.Id },
        url: getExternalSitesUrl,
        success: function (result) {
            if (result.Status) {
                var scope = angular.element('[ng-controller=PublishCtrl]').scope();
                $.each(result.Result, function (index, value) {
                    scope.activeSites.push({ TenantId: value.ClientId.toLowerCase(), SiteIdentifier: "", TenantName: value.Name });
                    if (value.IsPublished) {
                        $("#multiselect-dropdown").append('<option id=' + value.ClientId.toLowerCase() + ' value="" disabled>' + value.Name + '</option>');
                    } else {
                        $("#multiselect-dropdown").append('<option id=' + value.ClientId.toLowerCase() + ' value="" >' + value.Name + '</option>');
                    }
                });

                if (result.Result.length == 0) {
                    $("#multiselect-dropdown").append('<option class = "no-sites" disabled>' + window.Server.App.LocalizationContent.NoActiveSites + '</option>');
                }
                $("#multiselect-dropdown").selectpicker('refresh');
                ejs.popups.hideSpinner(document.getElementById('publish-site-dialog'));
                updateTitleForDisabledItem();
                var dialog = document.getElementById("external-site-dialog").ej2_instances;
                dialog[0].hide();
            }
        }
    });
}

function saveExternalSites() {
    var requestData = {
        Name: $("#external-site-name").val().trim(),
        ClientId: $("#external-client-id").val().trim(),
        ClientSecret: $("#external-client-secret").val().trim(),
        SiteURL: $("#external-site-url").val().trim()
    }
    ejs.popups.showSpinner(document.getElementById('external-site-dialog'));
    $.ajax({
        type: "POST",
        url: addExternalSitesUrl,
        data: { externalSite: requestData },
        success: function (result) {
            if (result.Status) {
                if (!result.Result) {
                    $(".site-url-validation-message").html(window.Server.App.LocalizationContent.ExternalSiteUnavailable);
                    parent.$("#external-site-url").addClass("has-error");
                    ejs.popups.hideSpinner(document.getElementById('external-site-dialog'));
                    return;
                }
                $("#multiselect-dropdown").empty();
                $('#multiselect-dropdown').selectpicker('refresh');
                var scope = angular.element('[ng-controller=PublishCtrl]').scope();
                scope.activeSites = [];
                updateExternalSites();
                SuccessAlert(window.Server.App.LocalizationContent.ExternalSiteDialogHeader, window.Server.App.LocalizationContent.ExternalSiteSuccess, 7000);
            } else {
                ejs.popups.hideSpinner(document.getElementById('external-site-dialog'));
                WarningAlert(window.Server.App.LocalizationContent.ExternalSiteDialogHeader, window.Server.App.LocalizationContent.ExternalSiteFailure, 7000);
                var dialog = document.getElementById("external-site-dialog").ej2_instances;
                dialog[0].hide();
            }
        }
    });
}

function siteNameCheck(siteName) {
    $.ajax({
        type: "POST",
        url: isSiteNameExistsUrl,
        data: { siteName: siteName },
        success: function (result) {
            if (result.Status) {
                $(".name-validation-message").html(window.Server.App.LocalizationContent.SiteNameExist);
                parent.$("#external-site-name").addClass("has-error");
            }
            else {
                $(".name-validation-message").html("");
                parent.$("#external-site-name").removeClass("has-error");
            }
        }
    });
}

function deleteConfirmation(item) {
    setTimeout(function () {
        var connectedSiteGridObj = $("#ConnectedSitesGrid").data("ejGrid");
        var connectedSites = connectedSiteGridObj.getCurrentViewData()[connectedSiteGridObj.getIndexByRow($("tr.e-row[aria-selected *='true']"))];
        messageBox("su-delete", window.Server.App.LocalizationContent.DeleteConnectedSite, window.Server.App.LocalizationContent.DeleteSiteConfirm + '<span class ="highlight-name">' + connectedSites.Name + " ?" + '</span>', "error", function () {
            var messageboxWaitingPopupTemplateIdId = createLoader("messageBox_wrapper");
            $("#messageBox_wrapper").ejWaitingPopup({ template: $("#" + messageboxWaitingPopupTemplateIdId) });
            $("#messageBox_wrapper").css("height", $("#messageBox").outerHeight());
            $("#messageBox_wrapper").ejWaitingPopup("show");
            removeExternalSite(item);
        });
    }, 100);
}

function removeExternalSite(item) {
    var id = $(item).attr("data-id");
    $.ajax({
        type: "POST",
        url: removeExternalSiteUrl,
        data: { id: id },
        success: function (result) {
            if (result.Status) {
                getExternalSites();
                SuccessAlert(window.Server.App.LocalizationContent.DeleteConnectedSite, window.Server.App.LocalizationContent.DeleteSiteSuccess, 7000);
            } else {
                WarningAlert(window.Server.App.LocalizationContent.DeleteConnectedSite, window.Server.App.LocalizationContent.DeleteSiteFailure, 7000);
            }
            $("#messageBox_wrapper").ejWaitingPopup("hide");
            onCloseMessageBox();
        }
    });
}

function getExternalSites() {
    $("#ConnectedSitesGrid").ejWaitingPopup("show");
    $.ajax({
        type: "GET",
        url: getExternalSitesUrl,
        success: function (result) {
            if (result.Status) {
                var siteGrid = $("#ConnectedSitesGrid").data("ejGrid");
                siteGrid.dataSource(result.Result);
            }
            $("#ConnectedSitesGrid").ejWaitingPopup("hide");
        }
    });
}