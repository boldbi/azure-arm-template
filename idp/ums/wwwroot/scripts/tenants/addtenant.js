var userAgent = navigator.userAgent;
var regexIe8 = new RegExp("Trident(\/4.0)|(Trident\/5.0)");
var isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
var selectedAdmins = [];
var gridAdminData = [];
var isFirstRequest = false;
var waitingPopUpElement = "";
var tenantNameinDB = "";
var tenantIdentifierinDB = "";
var gridHeight = 355;
var databaseFormData, intermediateFormData, clonedDBFormData, azuredetails;
var storageFlag = 0;
var previousIndex = [];
var prevDomain = "";
var haveTenantIdentifier = true;
var validateTimer;
var validateInterval = 1000;

$(document).ready(function () {
    if (isCommonLogin) {
        $(".selector").addClass("selector-alignment");
    }

    $('[data-toggle="popover"]').popover();

    if (isBoldReportsTenantType() && isCommonLogin) {
        document.getElementById("branding-type").ej2_instances[0].list.querySelectorAll('li')[1].style.display = "block";
        document.getElementById("branding-type").ej2_instances[0].list.querySelectorAll('li')[0].style.display = "none";
    }
    else if (!isBoldReportsTenantType() && isCommonLogin) {
        document.getElementById("branding-type").ej2_instances[0].list.querySelectorAll('li')[1].style.display = "none";
        document.getElementById("branding-type").ej2_instances[0].list.querySelectorAll('li')[0].style.display = "block";
    }

    if (!isCommonLogin && isBoldBIMultiTenant.toLowerCase() == "true") {
        document.getElementById("tenant-type").ej2_instances[0].enabled = false;
    }
    if (!isCommonLogin && isBoldReportsMultiTenant.toLowerCase() == "true") {
        document.getElementById("tenant-type").ej2_instances[0].enabled = false;
    }

    if (isBoldReportsTenantType()) {
        document.getElementById("branding-type").ej2_instances[0].value = "Enterprise Reporting";
        $(".selector").removeClass("selector-alignment");
    }
    else {
        document.getElementById("branding-type").ej2_instances[0].value = "Embedded BI";
        $(".selector").addClass("selector-alignment");
    }

    if (isCommonLogin && !isBoldReportsTenantType()) {
        $("#enable-ssl").val(biScheme);
        $("#input-domain").val(biDomain);
    }
    else if (isCommonLogin && isBoldReportsTenantType()) {
        $("#enable-ssl").val(reportScheme);
        $("#input-domain").val(reportDomain);
    }

    if (isBoldReportsTenantType()) {
        $("#selection-data-security").css("display", "none");
        $("#selection-data-security").children(".circle").css("display", "none");
        $("#selection-data-security").children(".hr-tag").css("display", "none");
        $(".get-data-security").addClass("hide");
    }

    if (actionType.toLowerCase() != "edit") {
        if (useSiteIdentifierEnable) {
            $(".site-url-identifier").removeClass("hide");
        }
        else {
            $(".site-url-identifier").addClass("hide");
        }

        if (isBoldReportsTenantType()) {
            $(".site-default-text").html("").html(boldReportsPath);
        }
        else {
            $(".site-default-text").html("").html(boldBiPath);
        }
        $(".site-domain").html($("#enable-ssl").val() + "://" + $("#input-domain").val());
        $(".site-url").attr("data-content", $(".site-domain").html() + $(".site-default-text").text());
    }

    waitingPopUpElement = parent.$("#add-tenant-popup");
    if (actionType.toLowerCase() == "edit") {
        $("#total-step").html("").html(" 2");
        $(".add-tenant-popup-title label").html("Edit site");
        $(".branding-type").addClass("hide");
        $(".administrator,  #selection-storage, .select-storage, #selectionadmin, #selectiondb .hr-tag, #selection-intermediate-db .hr-tag, #selection-data-security, .get-data-security").css("display", "none");
        $(".selector-icons").addClass("icon-alignment");
        $(".selector").removeClass("selector-alignment");
        $(".selector-content").addClass("content-alignment");
        getTenant(tenantId);
    } else {
        if (isBoldBI) {
            $(".selector").addClass("selector-alignment");
        }
        autoFocus("tenant-name");
        hideWaitingPopup(waitingPopUpElement);
    }
    $("#search-area").hide();
    addPlacehoder("body");
    $(".placeholder").css("display", "none");

    $("#duplicate-table-list").ejDialog({
        width: "450px",
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        height: "230px",
        showHeader: false,
        enableModal: true
    });

    $("#file-storage, #blob-storage").click(function () {
        if ($("#file-storage").is(":checked")) {
            $("#blob-storage-form").validate().resetForm();
            height = $(window).height() - $(".modal-header").height() - 210;
            modalheight = $("#dialog-body-container").height() + $("#dialog-body-header").height() - 210;
        } else {
            height = $(window).height() - $(".modal-header").height() - 210 + 250;
            modalheight = $("#dialog-body-container").height() + $("#dialog-body-header").height() + 102;
        }

        if (height > modalheight) {
            $(".dialog-body-div").css("height", height);
        } else {
            $(".dialog-body-div").css("height", modalheight);
        }
        gridHeight = height;
    });

    $("#check-windows").on("click change", function () {
        var windowsCheck = getRadioButtonValue("checkWindows") == "windows";
        var databaseType = getDropDownValue("database-type");

        if (windowsCheck && databaseType == "MSSQL") {
            $(".dialog-body-div").css("height", "auto");
        }
    });

    $(document).on("keyup", "input", function (event) {
        if (event.keyCode == 13 && $(this).attr("id") != "search-tenant-users") {
            $("#details-next").click();
        }
    });

    $("[data-toggle='popover']").popover({
        container: 'body',
        trigger: 'hover',
    });

    function siteIdentifierValidation() {
        var domain = $("#input-domain").val();
        var tenantIdentifier = $("#tenant-identifier").val();
        $.ajax({
            type: "POST",
            url: tenantIdentifierValidationUrl,
            async: false,
            data: { domain: domain, tenantIdentifier: tenantIdentifier },
            success: function (data) {
                if (data.Data) {
                    if (data.SiteIdentityError) {
                        $("#input-domain").closest("div").addClass("e-error");
                        $("#tenant-identifier-empty-validation-error").css("display", "block");
                        $("#tenant-identifier-empty-validation-error").html(data.Value);
                    }
                    else {
                        $("#input-domain").closest("div").removeClass("e-error");
                        $("#tenant-identifier-empty-validation-error").css("display", "none");
                        $("#tenant-identifier-empty-validation-error").html("");
                    }
                }
            }
        });
    }

    function checkServerHealthStatus() {
        var domain = "";
        if (isBoldReportsTenantType()) {
            domain = $("#enable-ssl").val() + "://" + $("#input-domain").val() + boldReportsPath;
        }
        else {
            domain = $("#enable-ssl").val() + "://" + $("#input-domain").val() + boldBiPath;
        }
        $.ajax({
            type: "POST",
            url: checkHealthStatusUrl,
            async: false,
            data: { domain: domain },
            success: function (data) {
                if (!data.Data) {
                    $("#input-domain").closest("div").addClass("e-error");
                    $("#domain-validation-error").css("display", "block");
                    $("#enable-ssl").css("margin-bottom", "15px");
                    $("#domain-validation-error").html(window.TM.App.LocalizationContent.InvalidDomain);
                }
                else {
                    $("#input-domain").closest("div").removeClass("e-error");
                    $("#domain-validation-error").css("display", "none");
                    $("#enable-ssl").css("margin-bottom", "5px");
                    $("#domain-validation-error").html("");
                }
            }
        });
    }

    $(document).on("click", "#details-next", function () {
        $(this).attr("disabled", true);
        checkServerHealthStatus();
        if (!useSiteIdentifierEnable && $("#tenant-identifier").val() != "" && actionType.toLowerCase() == "edit" && $("#tenant-registration-form").find(".e-error").length == 0) {
            $("#tenant-identifier").closest("div").addClass("e-error");
            $("#tenant-identifier-validation-error").css("display", "block");
            $("#tenant-identifier-validation-error").html(window.TM.App.LocalizationContent.DisAllowTenantIdentifier);
        }
        if (($("#input-domain").val() != prevDomain || $('input[name="identifier"]').prop("checked")) && !useSiteIdentifierEnable) {
            siteIdentifierValidation();
        }
        if ($("#tenant-registration-form").find(".e-error").length == 0) {
            if ($(".tenant-database-form").hasClass("hide") && $(this).hasClass("database") && $("#tenant-registration-form").find(".e-error").length == 0) {
                var tenantIdentifier = $("#tenant-identifier").val().trim();
                var tenantName = $("#tenant-name").val().trim();
                var canProceed = $("#tenant-registration-form").valid();
                if (canProceed) {
                    showWaitingPopup(waitingPopUpElement);
                    tenantNameIdentiferCheck(tenantName, tenantIdentifier);
                } else {
                    $(this).removeAttr("disabled");
                }
            }
            else if ($(this).hasClass("storage-config") && $(".tenant-database-form").find(".e-error").length == 0) {
                if ($(".tenant-database-form #db-content-holder").valid()) {

                    if ($("input[name='databaseType']:checked").val() === "1") {
                        existingDbConfiguration(waitingPopUpElement);
                    } else {
                        newDbConfiguration(waitingPopUpElement);
                    }

                    if (!$(".database-error").is(":visible")) {
                        if (!isBoldReportsTenantType()) {
                            if ($("#txt-password-db").is(":text")) {
                                $("#txt-password-db").parent().find(".show-hide-password").click();
                                $("#txt-password-db").parent().find(".tooltip").css("display", "none");
                            }

                            saveDatabaseValuesTemporarly();
                            moveStepper("front", 3);

                            if (actionType.toLowerCase() == "edit") {
                                $(this).attr("value", "Update");
                                $(this).removeClass("storage-config").addClass("update");
                            } else {
                                $(this).attr("value", "Next");
                                nextToStoragePage();
                            }

                            $(this).removeAttr("disabled").addClass("next-alignment");

                        }
                        else {
                            saveDatabaseValuesTemporarly();
                            nextToStoragePage();
                        }
                    }
                    $('#details-next').removeAttr("disabled");
                }
                else {
                    $(this).removeAttr("disabled");
                }
            }
            else if ($(this).hasClass("data-security") && $(".storage-form").find(".e-error").length == 0) {
                systemSettingsDetails.StorageType = $("input[name='IsBlobStorage']:checked").val();
                preserveStorageFormData();
                if ($("#blob-storage-form").valid()) {
                    showWaitingPopup(waitingPopUpElement);
                    if (!($("#file-storage").is(":checked"))) {
                        $.ajax({
                            type: "POST",
                            url: blobExist,
                            data: { connectionString: azuredetails.ConnectionString, containerName: window.containername },
                            success: function (result) {
                                hideWaitingPopup(waitingPopUpElement);
                                if (typeof result.Data != "undefined") {
                                    if (result.Data.Key.toString().toLowerCase() == "true") {
                                        $(".azure-validation,.blob-error-message").css("display", "none");
                                        $(".storage-form #system-settings-filestorage-container").hide();
                                        if (!isBoldReportsTenantType()) {
                                            moveStepper("front", 4);
                                            nextToDataSecurityPage();
                                        }
                                        else {
                                            moveStepper("front", 4);
                                            nextToUserPage();
                                        }
                                    }
                                    else {
                                        $(".azure-validation,.blob-error-message").css("display", "block");
                                    }
                                }
                                else {
                                    $(".azure-validation,.blob-error-message").css("display", "block");
                                }
                            }
                        });
                    }
                    else {
                        $(".storage-form #system-settings-filestorage-container").hide();
                        if (!isBoldReportsTenantType()) {
                            nextToDataSecurityPage();
                            moveStepper("front", 4);
                        }
                        else {
                            moveStepper("front", 4);
                            nextToUserPage();
                        }
                    }
                    $(this).removeAttr("disabled");
                }
                else {
                    $(this).removeAttr("disabled");
                }
            }
            else if (($(".tenant-user-form").hasClass("hide") && $(this).hasClass("user")) && $(".storage-form").find(".e-error").length == 0) {
                systemSettingsDetails.TenantIsolation.IsEnabled = $("#isolation-enable-switch").is(":checked");
                systemSettingsDetails.TenantIsolation.IsolationCode = document.getElementById("site-isolation-code").ej2_instances[0].value;
                systemSettingsDetails.CustomAttribute = addSiteAttribute;

                if (systemSettingsDetails.TenantIsolation.IsEnabled) {
                    parent.ValidateIsolationCode(systemSettingsDetails.TenantIsolation.IsolationCode, "#site-isolation-code")
                }

                if ($(".data-security-form").find(".e-error").length == 0) {
                    if (!isBoldReportsTenantType()) {
                        nextToUserPage();
                        moveStepper("front", 5);
                    }
                    else {
                        systemSettingsDetails.StorageType = $("input[name='IsBlobStorage']:checked").val();
                        preserveStorageFormData();
                        if ($("#blob-storage-form").valid()) {
                            showWaitingPopup(waitingPopUpElement);
                            if (!($("#file-storage").is(":checked"))) {
                                $.ajax({
                                    type: "POST",
                                    url: blobExist,
                                    data: { connectionString: azuredetails.ConnectionString, containerName: window.containername },
                                    success: function (result) {
                                        hideWaitingPopup(waitingPopUpElement);
                                        if (typeof result.Data != "undefined") {
                                            if (result.Data.Key.toString().toLowerCase() == "true") {
                                                $(".azure-validation,.blob-error-message").css("display", "none");
                                                $(".storage-form #system-settings-filestorage-container").hide();
                                                moveStepper("front", 4);
                                                nextToUserPage();
                                            }
                                            else {
                                                $(".azure-validation,.blob-error-message").css("display", "block");
                                            }
                                        }
                                        else {
                                            $(".azure-validation,.blob-error-message").css("display", "block");
                                        }
                                    }
                                });
                            }
                            else {
                                $(".storage-form #system-settings-filestorage-container").hide();
                                moveStepper("front", 4);
                                nextToUserPage();
                            }
                            $(this).removeAttr("disabled");
                        }
                        else {
                            $(this).removeAttr("disabled");
                        }
                    }
                }
                $(this).removeAttr("disabled");
            }
            else if ($(".tenant-user-form").hasClass("hide") && $(this).hasClass("update") && $(".tenant-database-form").find(".e-error").length == 0) {
                var proceed = $("#db-content-holder").valid();
                if (proceed) {
                    showWaitingPopup(waitingPopUpElement);
                    $("#details-back").show().removeClass("back-button");
                    if (getDropDownValue("database-type").toLowerCase() == "mssql" || getDropDownValue("database-type").toLowerCase() == "postgresql" || getDropDownValue("database-type").toLowerCase() == "mysql") {
                        checkingNewDBConnection(waitingPopUpElement, actionType);
                    } else {
                        updateTenant(waitingPopUpElement);
                    }
                } else {
                    $(this).removeAttr("disabled");
                }
            }
            else {
                if ($(".tenant-user-form").hasClass("show") && $(".tenant-user-form").find(".has-error").length == 0 && selectedAdmins.length != 0) {
                    showWaitingPopup("add-tenant-popup");
                    $("#details-back").show().removeClass("back-button");
                    addTenant();
                } else {
                    $("#validation-user-error").show();
                    $(this).removeAttr("disabled");
                }
            }
            Resize();
            ResizeHeightForDOM();
        }
        else {
            $(this).removeAttr("disabled");
        }
    });

    $(document).on("click", "#details-back", function () {
        if ($("#details-next").hasClass("storage-config") || $("#details-next").hasClass("update")) {
            $(".tenant-user-form").removeClass("show").addClass("hide");
            $(".tenant-database-form").removeClass("show").addClass("hide");
            $("#details-back").hide().addClass("back-button");
            $(".tenant-registration-form").removeClass("hide").addClass("show");
            $("#dialog-header").css("display", "none");
            $("#header-title").show();
            $("#header-title").html(window.TM.App.LocalizationContent.SiteCreation);
            if (item === "dashboards") {
                $("#header-description").html(window.TM.App.LocalizationContent.BoldBiMultiTenancy);
            }
            else {
                $("#header-description").html(window.TM.App.LocalizationContent.BoldReportsMultiTenancy);
            }
            if ($('input[name="identifier"]').prop("checked")) {
                $("#tenant-identifier").attr("disabled", true);
            }
            else {
                $("#tenant-identifier").attr("disabled", false);
            }
            $("#details-next").removeClass("user update").addClass("database");
            moveStepper("back", 1);
            $("#header-logo").css("display", "inline-block");
            $("#details-next").attr("value", window.TM.App.LocalizationContent.NextButton).removeClass("next-alignment");
            if ($("#txt-password-db").is(":text")) {
                $("#txt-password-db").parent().find(".show-hide-password").click();
                $("#txt-password-db").parent().find(".tooltip").css("display", "none");
            }
        }
        else if ($("#details-next").hasClass("data-security")) {
            $("#details-next").attr("value", window.TM.App.LocalizationContent.NextButton);
            $(".tenant-registration-form").removeClass("show").addClass("hide");
            $(".tenant-user-form").removeClass("show").addClass("hide");
            $(".storage-form").removeClass("show").addClass("hide");
            $(".data-security-form").removeClass("show").addClass("hide");
            $("#dialog-body-container").removeClass("grid-height-control");
            $("#header-title").show();
            $("#header-description").show();
            $("#details-next").removeClass("data-security").addClass("storage-config");
            moveStepper("back", 2);

            if (isBoldBI) {
                $("#system-settings-db-selection-container").removeClass("hide").addClass("show");

                $("#no-need-datastore").css("display", "none");

                $("#header-title").html(window.TM.App.LocalizationContent.SelectDatabaseTitle);
                $("#header-description").text(window.TM.App.LocalizationContent.PlaceToCreateShare + " " + window.TM.App.LocalizationContent.DashboardsDot).show();
                $("#search-area").hide();
                $(".storage-form #system-settings-filestorage-container").hide();
            }
            else {
                $("#header-title").html(window.TM.App.LocalizationContent.SelectDatabaseTitle);
                $("#header-description").text(window.TM.App.LocalizationContent.PlaceToCreateShare + " " + window.TM.App.LocalizationContent.ReportsDot).show();
            }

            $("#details-back").show().removeClass("back-button");
            $(".tenant-database-form").removeClass("hide").addClass("show");

            if (!isBoldBI) {
                $("#dialog-body-container").removeClass("grid-alignment");
                $("#stepper #current-step").text("2");
            }

            if (getDropDownValue("database-type").toLowerCase() === "postgresql" || getDropDownValue("database-type").toLowerCase() === "mysql") {
                $('.auth-type').removeClass("show").addClass("hide");
            }
            else {
                $('.auth-type').removeClass("hide").addClass("show");
            }

            $("#search-area").hide();
        }
        else if ($("#details-next").hasClass("user")) {
            moveStepper("back", 3);
            $("#details-back").show().addClass("back-button");
            $("#search-area").hide();
            $("#header-title").html(window.TM.App.LocalizationContent.SelectStorage);
            $("#header-title").show();
            if (getDropDownValue("database-type").toLowerCase() === "postgresql" || getDropDownValue("database-type").toLowerCase() === "mysql") {
                $('.auth-type').removeClass("show").addClass("hide");
            }
            else {
                $('.auth-type').removeClass("hide").addClass("show");
            }

            $(".storage-form #system-settings-filestorage-container").show();
            $(".storage-checkbox").hide();
            $(".storage-form, #step-2").removeClass("hide").addClass("show");
            var storageType = $("input[name='IsBlobStorage']:checked").val();
            if (storageType == "1") {
                $(".report-content").hide();
                $(".storage-checkbox").show();
            }
            else {
                $(".report-content").slideDown("slow");
            }
            $(".storage-form #blob-storage-form").addClass("site-creation");


            $(".tenant-user-form, #step-3").removeClass("show").addClass("hide");
            $(".data-security-form").removeClass("show").addClass("hide");
            $("#details-next").attr("value", window.TM.App.LocalizationContent.NextButton);
            $("#details-next").removeClass("user").addClass("data-security");

            if (!isBoldReportsTenantType()) {
                $("#header-description").html(window.TM.App.LocalizationContent.StorageBIMsg).show();
            }
            else {
                $("#header-description").text(window.TM.App.LocalizationContent.StorageReportsMsg).show();
                $("#details-back").show().removeClass("back-button");

                if (!isBoldBI) {
                    $("#dialog-body-container").removeClass("grid-alignment");
                    $("#stepper #current-step").text("2");
                }
            }
            $("#search-area").hide();
        }
        else {
            $("#details-back").show().addClass("back-button");
            $("#search-area").hide();
            if (!isBoldReportsTenantType()) {
                if (getDropDownValue("database-type").toLowerCase() === "postgresql") {
                    $('.auth-type').removeClass("show").addClass("hide");
                }
                else {
                    $('.auth-type').removeClass("hide").addClass("show");
                }
                $("#header-title").html(window.TM.App.LocalizationContent.ConfigureDataSecurity);
                $("#header-description").hide();
                $(".tenant-user-form, #step-3").removeClass("show").addClass("hide");
                $(".data-security-form").removeClass("hide").addClass("show");

                $("#details-next").attr("value", window.TM.App.LocalizationContent.NextButton);
                $("#details-next").removeClass("submit").addClass("user").removeAttr("disabled");
                moveStepper("back", 4);
            }
            else {
                $(".storage-form #system-settings-filestorage-container").show();
                $(".storage-checkbox").hide();
                $(".storage-form, #step-2").removeClass("hide").addClass("show");
                var storageType = $("input[name='IsBlobStorage']:checked").val();
                if (storageType == "1") {
                    $(".report-content").hide();
                    $(".storage-checkbox").show();
                }
                else {
                    $(".report-content").slideDown("slow");
                }
                $(".storage-form #blob-storage-form").addClass("site-creation");


                $(".tenant-user-form, #step-3").removeClass("show").addClass("hide");
                $(".data-security-form").removeClass("show").addClass("hide");
                $("#details-next").attr("value", window.TM.App.LocalizationContent.NextButton);
                $("#details-next").removeClass("user").addClass("data-security");

                if (!isBoldReportsTenantType()) {
                    $("#header-description").html(window.TM.App.LocalizationContent.StorageBIMsg).show();
                }
                else {
                    $("#header-description").text(window.TM.App.LocalizationContent.StorageReportsMsg).show();
                    $("#details-back").show().removeClass("back-button");

                    if (!isBoldBI) {
                        $("#dialog-body-container").removeClass("grid-alignment");
                        $("#stepper #current-step").text("2");
                    }
                }
                $("#search-area").hide();
                moveStepper("back", 3);

            }
            $("#dialog-body-container").removeClass("grid-alignment");
            $("#dialog-body-container").removeClass("grid-height-control");
        }
        Resize();
        ResizeHeightForDOM();
    });

    $(document).on("click", "#add-tenant-close", function () {
        if (parent.window.location.href.indexOf('?') > -1) {
            parent.history.pushState('', document.title, parent.window.location.pathname);
        }

        parent.$("#add-tenant-popup").ejDialog("close");
    });
    Resize();
    ResizeHeightForDOM();
});

function isBoldReportsTenantType() {
    var dropdownValue = $("#tenant-type").val();
    if (document.getElementById("tenant-type").ej2_instances != undefined) {
        dropdownValue = document.getElementById("tenant-type").ej2_instances[0].value;
    }

    if (dropdownValue === "BoldReportsOnPremise") {
        return true;
    }

    return false;
}

function addTenant() {
    var tenantInfo = {
        TenantType: getDropDownValue("tenant-type"),
        TenantName: $("#tenant-name").val(),
        TenantIdentifier: $("#tenant-identifier").val(),
        DNS: $(".site-domain").html(),
        UseSiteIdentifier: useSiteIdentifierEnable
    };

    var brandingType = getDropDownValue("branding-type");
    if (brandingType == "Embedded BI") {
        brandingType = "boldbi";
    }
    else if (brandingType == "Enterprise Reporting") {
        brandingType = "boldreports"
    }
    postSystemSettingsData(systemSettingsDetails, azuredetails, selectedAdmins, tenantInfo, brandingType, true);

}

function nextToUserPage() {
    if ($(".tenant-intermediate-database-form").find(".has-error").length == 0 || $(".storage-form").find(".has-error").length == 0) {
        $(".tenant-intermediate-database-form, #step-2").removeClass("show").addClass("hide");
        $(".tenant-registration-form, #step-1").removeClass("show").addClass("hide");
        $("#stepper #current-step").text("3");
        $(".tenant-user-form, #step-3").removeClass("hide").addClass("show");
        $("#details-next").attr("value", window.TM.App.LocalizationContent.CreateLaunchSite);
        $("#details-next").removeClass("data-security").addClass("submit").removeAttr("disabled");
        $("#details-next").removeClass("user").addClass("submit").removeAttr("disabled");
        $(".data-security-form").removeClass("show").addClass("hide");
        $("#dialog-body-container").addClass("grid-alignment");
        $("#dialog-body-container").addClass("grid-height-control");
        $("#header-title").show();
        $("#header-description").show();
        $("#details-back").show().removeClass("back-button");
        $("#header-title").html(window.TM.App.LocalizationContent.SelectSiteAdmin);
        $("#header-description").text(window.TM.App.LocalizationContent.AdminControlSite);
        $(".storage-form #system-settings-filestorage-container").hide();
        $(".storage-checkbox").hide();
        $(".storage-form, #step-2").removeClass("show").addClass("hide");
        $(".report-content").hide();
        $(".storage-form #blob-storage-form").addClass("site-creation");
        gridHeight = 500;
        $("#search-area").show();
        listUsersForAdminSelection();
        ResizeHeightForDOM();
        hideWaitingPopup(waitingPopUpElement);
    }
}
function getTenant(id) {
    $.ajax({
        type: "POST",
        url: getTenantDetailsUrl,
        data: { tenantId: id },
        success: function (data) {
            hideWaitingPopup(waitingPopUpElement);
            if (data.TenantDetails != "" || data.TenantDetails != null || data.TenantDetails != undefined) {
                var tenantInformation = data.TenantDetails;
                tenantNameinDB = tenantInformation.Tenant.TenantName;
                tenantIdentifierinDB = tenantInformation.Tenant.TenantIdentifier;
                document.getElementById("tenant-name").ej2_instances[0].value = tenantNameinDB;
                document.getElementById("tenant-identifier").ej2_instances[0].value = tenantInformation.Tenant.TenantIdentifier;
                $("#tenant-identifier").prop('disabled', false);
                document.getElementById("tenant-type").ej2_instances[0].value = data.TenantType;
                document.getElementById("tenant-type").ej2_instances[0].enabled = false;
                $("#input-domain").val(data.DNS);
                $("#enable-ssl").val(data.Protocol);
                prevDomain = $("#input-domain").val();
                $(".site-domain").html("");
                if (data.TenantDetails.Tenant.UseSiteIdentifier) {
                    $(".site-domain").html("").html(data.TenantDetails.Tenant.DNS + "/site/" + tenantInformation.Tenant.TenantIdentifier);
                }
                else {
                    $(".site-domain").html("").html(data.TenantDetails.Tenant.DNS);
                }
                $(".site-url").attr("data-content", $(".site-domain").html());
                haveTenantIdentifier = data.TenantDetails.Tenant.UseSiteIdentifier;
                if (isBoldReportsTenantType()) {
                    item = "reports";
                    $("#header-description").html(window.TM.App.LocalizationContent.BoldReportsMultiTenancy);
                }
                else {
                    item = "dashboards";
                    $("#header-description").html(window.TM.App.LocalizationContent.BoldBiMultiTenancy);
                }
                if (useSiteIdentifierEnable && data.TenantDetails.Tenant.UseSiteIdentifier) {
                    $(".site-url-identifier").removeClass("hide");
                    $(".site-identifier-check").addClass("hide");

                }
                else if (useSiteIdentifierEnable && !data.TenantDetails.Tenant.UseSiteIdentifier) {
                    $(".site-url-identifier").removeClass("hide");
                    $("#tenant-identifier").removeAttr("disabled");
                    $(".site-identifier-check").addClass("hide");
                }
                else if (!useSiteIdentifierEnable && data.TenantDetails.Tenant.UseSiteIdentifier) {
                    $(".site-url-identifier").removeClass("hide");
                    $(".site-identifier-check").removeClass("hide");
                }
                else {
                    $(".site-url-identifier").addClass("hide");
                    $(".site-identifier-check").addClass("hide");
                }
            }
            if (data.DatabaseDetails != "" || data.DatabaseDetails != null || data.DatabaseDetails != undefined) {
                var databaseInformation = JSON.parse(data.DatabaseDetails);
                var authentication = "";
                $("#admin-nav").hide();
                if (databaseInformation.ServerType == 0) {
                    fillCommonDatbaseValues(databaseInformation);
                    $("#secure-sql-connection").prop("checked", databaseInformation.SslEnabled);
                    if (databaseInformation.AuthenticationType == 0) {
                        authentication = "windows";
                        $("#txt-login, #txt-password-db").prop("disabled", true);
                    } else {
                        authentication = "sql";
                        document.getElementById("txt-login").ej2_instances[0].value = databaseInformation.UserName;
                    }
                    if (authentication === "windows") {
                        $("#check-windows").prop("checked", true);
                        document.getElementById("txt-login").ej2_instances[0].enabled = false;
                        document.getElementById("txt-password-db").ej2_instances[0].enabled = false;
                    }
                } else if (databaseInformation.ServerType === 1) {
                    document.getElementById("database-type").ej2_instances[0].value = "MySQL";
                    fillCommonDatbaseValues(databaseInformation);
                    $('.auth-type').removeClass("show").addClass("hide");
                    $('.port-num').removeClass("show").addClass("hide");
                    document.getElementById("txt-portnumber").ej2_instances[0].value = databaseInformation.Port;
                    $("#secure-sql-connection").prop("checked", databaseInformation.SslEnabled);
                    document.getElementById("txt-login").ej2_instances[0].value = databaseInformation.UserName;
                    $(".database-name").css("padding-top", "0");
                } else if (databaseInformation.ServerType === 4) {
                    document.getElementById("database-type").ej2_instances[0].value = "PostgreSQL";
                    fillCommonDatbaseValues(databaseInformation);
                    $('.auth-type').removeClass("show").addClass("hide");
                    $('.port-num, .maintenancedb').removeClass("hide hidden").addClass("show");
                    document.getElementById("maintenance-db").ej2_instances[0].value = data.TenantDetails.MaintenanceDatabase;
                    document.getElementById("txt-portnumber").ej2_instances[0].value = databaseInformation.Port;
                    $("#secure-sql-connection").prop("checked", databaseInformation.SslEnabled);
                    document.getElementById("txt-login").ej2_instances[0].value = databaseInformation.UserName;
                    $(".database-name").css("padding-top", "0");
                } else {
                    $("#database-type").find("option").each(function () {
                        if ($(this).val().toLowerCase() === "mssqlce") {
                            $(this).attr("selected", "selected");
                        }
                    });
                    $('#database-type').attr("disabled", true).addClass("disabled");
                    $('#db-content-holder').css("display", "none");
                    $('#db-config-submit,#sql-existing-db-submit').addClass("hide");
                    $(".sqlce-content").removeClass("hide").addClass("show");
                }

            }
            if (data.AzureDetails != "" || data.AzureDetails != null || data.AzureDetails != undefined) {
                var systemSetting = JSON.parse(data.AzureDetails);
                $("#txt-accountname").val(systemSetting.BlobStorageAccountName);
                $("#txt-endpoint").val(systemSetting.AzureBlobStorageUri);
                $("#txt-accesskey").val(systemSetting.BlobStorageAccessKey);
                $("#txt-containername").val(systemSetting.AzureBlobStorageContainerName);
            }

        }
    });
}


function fillCommonDatbaseValues(databaseInformation) {
    document.getElementById("database-type").ej2_instances[0].enabled = false;
    $(".db-selection-radio").css("display", "none");
    $(".new-db,.existing-db").css("display", "none");
    document.getElementById("txt-servername").ej2_instances[0].value = databaseInformation.ServerName;
    document.getElementById("txt-dbname").ej2_instances[0].value = databaseInformation.DatabaseName;
    document.getElementById("additional-parameter").ej2_instances[0].value = databaseInformation.AdditionalParameters;
    $("#secure-sql-connection").prop("checked", databaseInformation.SslEnabled);
}

function updateTenant(waitingPopUpElement, connectionString) {
    var name = $("#tenant-name").val();
    var tenantUrl = (getTenantType() === "BoldBIOnPremise") ? $("#enable-ssl").val() + "://" + $("#input-domain").val() + boldBiPath : $("#enable-ssl").val() + "://" + $("#input-domain").val() + boldReportsPath;
    var siteIdentifier = true;
    if ((!useSiteIdentifierEnable && !haveTenantIdentifier) || $('input[name="identifier"]').prop("checked")) {
        siteIdentifier = false;
    }
    else {
        siteIdentifier = true;
    }
    var tenantIdentifier = $("#tenant-identifier").val();
    var additionalParameters = $("#additional-parameter").val();
    $.ajax({
        type: "POST",
        url: updateTenantDetailsUrl,
        data: { tenantId: tenantId, tenantName: name, tenantIdentifier: tenantIdentifier, tenantUrl: tenantUrl, databaseDetails: connectionString, additionalParameters: additionalParameters, useSiteIdentifier: siteIdentifier },
        success: function (data) {
            if (data.result == true) {
                hideWaitingPopup(waitingPopUpElement);
                parent.$("#add-tenant-popup").ejDialog("close");
                parent.messageBox("su-edit", window.TM.App.LocalizationContent.UpdateSite, window.TM.App.LocalizationContent.SiteUpdated, "success", function () {
                    parent.onCloseMessageBox();
                });
                var tenantGridObj = parent.$("#tenants_grid").data("ejGrid");
                tenantGridObj.refreshContent();
            }
            else {
                hideWaitingPopup(waitingPopUpElement);
                parent.$("#add-tenant-popup").ejDialog("close");
                parent.messageBox("su-edit", window.TM.App.LocalizationContent.UpdateSite, window.TM.App.LocalizationContent.SiteUpdateFailed, "success", function () {
                    parent.onCloseMessageBox();
                });
            }
        }
    });
}

function Resize() {
    if ($(".tenant-registration-form, .tenant-database-form, .tenant-intermediate-database-form, .storage-form, .data-security-form, .tenant-user-form").hasClass("show")) {
        var height = $(window).height() - $(".modal-header").height() - 63;
        $(".modal-tenant-body").addClass("adjustment");
        $(".adjustment").css("height", height);
    } else {
        $(".modal-tenant-body").removeClass("adjustment");
    }
}


function ResizeHeightForDOM() {
    var height = /*$(window).height() - $(".modal-header").height() - 210*/"";
    var modalheight = /*$("#dialog-body-container").height() + $("#dialog-body-header").height() + 50*/"";
    //if ($(".tenant-registration-form").hasClass("show")) {
    //    height = $(window).height() - $(".modal-header").height() - 210 + 100;
    //    modalheight = $("#dialog-body-container").height() + $("#dialog-body-header").height() + 102;
    //}

    if ($(".storage-form").hasClass("show")) {
        if ($("#file-storage").is(":checked")) {
            height = $(window).height() - $(".modal-header").height() - 210;
            modalheight = $("#dialog-body-container").height() + $("#dialog-body-header").height() + 102;
        } else {
            height = $(window).height() - $(".modal-header").height() - 210 + 280;
            modalheight = $("#dialog-body-container").height() + $("#dialog-body-header").height() + 102;
        }
    }

    //if ($(".tenant-user-form").hasClass("show")) {
    //    height = $(window).height() - $(".modal-header").height() - 210;
    //    modalheight = $("#dialog-body-container").height() + $("#dialog-body-header").height() + 102;
    //}

    //if ($(".data-security-form").hasClass("show")) {
    //    height = $(window).height() - $(".modal-header").height() - 210;
    //    modalheight = $("#dialog-body-container").height() + $("#dialog-body-header").height() + 102;
    //}

    //if ($(".tenant-database-form").hasClass("show")) {
    //    var databaseType = getDropDownValue("database-type").toLowerCase();

    //    if (databaseType == "postgresql") {
    //        height = 1225;
    //        modalheight = $("#dialog-body-container").height() + $("#dialog-body-header").height() + 102;
    //    }

    //}

    if (height > modalheight) {
        $(".dialog-body-div").css("height", height);
    } else {
        $(".dialog-body-div").css("height", modalheight);
    }
    gridHeight = height;
}

function saveDatabaseValuesTemporarly() {
    systemSettingsDetails = getDatabaseFormValues();
}

function moveStepper(direction, stepToMove) {
    if (direction != undefined) {
        if (direction.toLowerCase() === "front") {
            $(".selector-icons .selector-panel:nth-child(" + stepToMove + ")").prev().addClass("selectedOval");
            $(".selector-icons .selector-panel:nth-child(" + stepToMove + ")").find(".circle").addClass("selectedClass");
            if (isCommonLogin && isBoldReportsTenantType() && stepToMove === 4) {
                stepToMove = 5
            }
            $(".selector-content span:nth-child(" + stepToMove + ")").addClass("selectedContent");
        }
        else if (direction.toLowerCase() === "back") {
            $(".selector-icons .selector-panel:nth-child(" + (stepToMove + 1) + ")").find(".circle").removeClass("selectedClass");
            $(".selector-icons .selector-panel:nth-child(" + stepToMove + ")").removeClass("selectedOval");
            if (isCommonLogin && isBoldReportsTenantType() && stepToMove === 3) {
                stepToMove = 4
            }
            $(".selector-content span:nth-child(" + (stepToMove + 1) + ")").removeClass("selectedContent");
        }
    }
}

function tenantNameIdentiferCheck(tenantName, tenantIdentifier) {
    $("#tenant-name-validation-error, #tenant-identifier-validation-error").css("display", "none");
    $(".identifier-info").css("padding-top", "20px");
    $("#tenant-name,#tenant-identifier, #details-next").attr("disabled", true);
    if (IsValidIdentifier($.trim(tenantIdentifier))) {
        $.ajax({
            type: "POST",
            url: checkTenantNameExistsUrl,
            data: { tenantName: tenantName, tenantIdentifier: tenantIdentifier },
            async: false,
            success: function (data) {
                hideWaitingPopup(waitingPopUpElement);
                if (data.Result || data.ResultIdentifier) {
                    if (data.Value != null && data.ResultIdentifier && tenantIdentifier != tenantIdentifierinDB) {
                        $("#tenant-identifier").closest("div").addClass("e-error");
                        $("#tenant-identifier-validation-error").css("display", "block");
                        $("#tenant-identifier-validation-error").html(data.Value);
                    }
                    else if (data.Result && tenantName != tenantNameinDB) {
                        $("#tenant-name").closest("div").addClass("e-error");
                        $("#tenant-name-validation-error").css("display", "block");
                        $("#tenant-name-validation-error").html(window.TM.App.LocalizationContent.SiteNameExists);
                    } else {
                        $("#tenant-name").closest("div").removeClass("e-error");
                        $("#tenant-name-validation-error").css("display", "none");
                        nextToDatabasePage();
                    }
                } else {
                    $("#tenant-name, #tenant-identifier").closest("div").removeClass("e-error");
                    $("#tenant-name-validation-error,#tenant-identifier-validation-error").css("display", "none");
                    $(".identifier-info").css("padding-top", "20px");
                    nextToDatabasePage();
                }
                if (actionType.toLowerCase() != "edit") {
                    $("#tenant-name, #details-next, #tenant-identifier").removeAttr("disabled");
                } else {
                    $("#tenant-name, #details-next, #tenant-identifier").removeAttr("disabled");
                }
            }
        });
    } else {
        $("#tenant-identifier").closest("div").addClass("has-error");
        $("#tenant-identifier-validation-error").css("display", "block");
        $("#tenant-identifier-validation-error").html(window.TM.App.LocalizationContent.AvoidSpecailCharacters);
        if (actionType.toLowerCase() != "edit") {
            $("#tenant-name, #details-next, #tenant-identifier").removeAttr("disabled");
        } else {
            $("#tenant-name, #details-next").removeAttr("disabled");
        }
        hideWaitingPopup(waitingPopUpElement);
    }
}

function nextToDatabasePage() {
    $("#dialog-header").css("display", "block");
    $("#header-logo").css("display", "none");
    $("#header-title").html(window.TM.App.LocalizationContent.SelectDatabaseTitle);
    $("#header-description").html(window.TM.App.LocalizationContent.PlaceToCreateShare + " " + item + ".");
    $("#used-tenant-name").html($("#tenant-name").val());

    if (isBoldReportsTenantType()) {
        var helpData = "Enterprise Reporting";
        $("#used-tenant-identifier").html($(".url-part").text().replace(/\s/g, '').replace("i.e", ''));
        $(".db-name-info").html(window.TM.App.LocalizationContent.DatabaseInfoReports);
        $(".tenant-sql-db-content").html(helpData);
    }
    else {
        var helpData = "Embedded BI";
        $("#used-tenant-identifier").html($(".url-part").text().replace(/\s/g, '').replace("i.e", ''));
        $(".db-name-info").html(window.TM.App.LocalizationContent.DatabaseInfoBI);
        $(".tenant-sql-db-content").html(helpData);
    }

    moveStepper("front", 2);
    $(".tenant-registration-form, #step-1").removeClass("show").addClass("hide");
    $(".tenant-user-form, #step-3").removeClass("show").addClass("hide");
    $("#details-back").show().removeClass("back-button");
    $("#stepper #current-step").text("2");
    $(".tenant-database-form, #step-2").removeClass("hide").addClass("show");
    $("#dialog-body-container").removeClass("grid-alignment");

    if (getDropDownValue("database-type").toLowerCase() === "postgresql" || getDropDownValue("database-type").toLowerCase() === "mysql") {
        $('.auth-type').removeClass("show").addClass("hide");
    }
    else {
        $('.auth-type').removeClass("hide").addClass("show");
    }

    $(".tenant-database-form #system-settings-db-selection-container").show();
    $(".tenant-database-form #db-content-holder").addClass("site-creation");

    if (isBoldReportsTenantType() || actionType.toLowerCase() === "edit") {
        $("#admin-nav").hide();
    }
    else {
        $("#admin-nav").show();
    }
    autoFocus("txt-servername");
    if (actionType.toLowerCase() === "edit") {
        $("#details-next").attr("value", window.TM.App.LocalizationContent.UpdateButton);
        $("#details-next").removeClass("database").addClass("update");
    } else {
        $("#details-next").attr("value", window.TM.App.LocalizationContent.NextButton);
        $("#details-next").removeClass("database").addClass("storage-config");
    }

    $("#details-next").removeAttr("disabled").addClass("next-alignment");
}

function nextToStoragePage() {
    $("#header-title").show();
    $("#header-title").html(window.TM.App.LocalizationContent.SelectStorage);
    $("#header-description").show();
    if (!isBoldReportsTenantType()) {
        $("#header-description").html(window.TM.App.LocalizationContent.StorageBIMsg);
    } else {
        $("#header-description").html(window.TM.App.LocalizationContent.StorageReportsMsg);
    }

    moveStepper("front", 3);
    if (isAzureApplication) {
        $(".storage-checkbox").show("slow");
        $("#file-storage").prop("disabled", true);
        $("#blob-storage").prop("checked", true);
        $(".tenant-registration-form, #step-1").removeClass("show").addClass("hide");
        $(".tenant-user-form, #step-3").removeClass("show").addClass("hide");
        $(".tenant-database-form, #step-2").removeClass("show").addClass("hide");
        $(".custom-endpoint-form-element, .content-value, .file-storage-button").hide();
        $(".storage-form, #step-2").removeClass("hide").addClass("show");
        $(".storage-form #system-settings-filestorage-container").show();
        $("#file-storage").parent().hide();
        $(".report-content").hide();
        $("#blob-storage").parent().hide();
        $(".storage-checkbox").css("margin-top", "5px");
        $("#blob-storage-form").slideDown("slow");
        $(".storage-form #blob-storage-form").addClass("site-creation");
        $("#dialog-body-container").removeClass("grid-alignment");
        $("#details-next").attr("value", "Next");
        if (isBoldReportsTenantType()) {
            $("#details-next").removeClass("storage-config").addClass("user");
        }
        else {
            $("#details-next").removeClass("storage-config").addClass("data-security");
        } $("#details-next").removeAttr("disabled").addClass("next-alignment");
    }
    else {
        var storageType = $("input[name='IsBlobStorage']:checked").val();
        if (storageType == "1") {
            $(".report-content").hide();
            $(".storage-checkbox").show("slow");
        }
        else {
            $(".report-content").slideDown("slow");
            $(".storage-checkbox").hide("slow");
        }
        $(".tenant-registration-form, #step-1").removeClass("show").addClass("hide");
        $(".tenant-user-form, #step-3").removeClass("show").addClass("hide");
        $(".tenant-database-form, #step-2").removeClass("show").addClass("hide");
        $(".custom-endpoint-form-element, .file-storage-button, .content-value").hide();
        $(".storage-form, #step-2").removeClass("hide").addClass("show");
        $(".storage-form #system-settings-filestorage-container").show();
        $(".storage-form #blob-storage-form").addClass("site-creation");
        $("#dialog-body-container").removeClass("grid-alignment");
        $("#details-next").attr("value", "Next");
        if (isBoldReportsTenantType()) {
            $("#details-next").removeClass("storage-config").addClass("user");
        }
        else {
            $("#details-next").removeClass("storage-config").addClass("data-security");
        }
        $("#details-next").removeAttr("disabled").addClass("next-alignment");
    }
}

function nextToDataSecurityPage() {
    $("#header-title").show();
    $("#header-title").html(window.TM.App.LocalizationContent.ConfigureDataSecurity);
    $("#header-description").html("");

    if (isAzureApplication) {
        $(".storage-checkbox").show("slow");
        $("#file-storage").prop("disabled", true);
        $("#blob-storage").prop("checked", true);
        $(".tenant-registration-form, #step-1").removeClass("show").addClass("hide");
        $(".tenant-user-form, #step-3").removeClass("show").addClass("hide");
        $(".tenant-database-form, #step-2").removeClass("show").addClass("hide");
        $(".custom-endpoint-form-element, .content-value, .file-storage-button").hide();
        $(".data-security-form").removeClass("hide").addClass("show");
        $("#file-storage").parent().hide();
        $(".report-content").hide();
        $("#blob-storage").parent().css("margin-left", "130px");
        $("#blob-storage-form").slideDown("slow");
        $("#dialog-body-container").removeClass("grid-alignment");
        $("#details-next").attr("value", "Next");
        if (isBoldBI) {
            $("#details-next").removeClass("data-security").addClass("user");
        }
        else {
            $("#details-next").removeClass("data-security").addClass("user");
        }
        $("#details-next").removeAttr("disabled").addClass("next-alignment");
    }
    else {
        var storageType = $("input[name='IsBlobStorage']:checked").val();
        if (storageType == "1") {
            $(".report-content").hide();
            $(".storage-checkbox").show("slow");
        }
        else {
            $(".report-content").slideDown("slow");
            $(".storage-checkbox").hide("slow");
        }
        $(".tenant-registration-form, #step-1").removeClass("show").addClass("hide");
        $(".tenant-user-form, #step-3").removeClass("show").addClass("hide");
        $(".tenant-database-form, #step-2").removeClass("show").addClass("hide");
        $(".custom-endpoint-form-element, .file-storage-button, .content-value").hide();
        $(".data-security-form").removeClass("hide").addClass("show");
        $("#dialog-body-container").removeClass("grid-alignment");
        $("#details-next").attr("value", "Next");
        $("#details-next").removeClass("data-security").addClass("user");
        $("#details-next").removeAttr("disabled").addClass("next-alignment");
    }
    hideWaitingPopup(waitingPopUpElement);
}

function preserveStorageFormData() {
    var storageType = $("input[name='IsBlobStorage']:checked").val();
    window.accountname = $("#txt-accountname").val();
    window.endpoint = $("#txt-bloburl").val() == "" ? "https://" + $("#txt-accountname").val() + ".blob.core.windows.net" : $("#txt-bloburl").val();
    window.accesskey = $("#txt-accesskey").val();
    window.containername = $("#txt-containername").val();
    window.storageenable = $(".storage-checkbox").is(":checked");
    var blobUrl = $("#txt-bloburl").val();
    var connectionType = $("input[name='Connection']:checked").val();
    var connectionString = "";

    if (connectionType == "http" || connectionType == "https") {
        connectionString = "DefaultEndpointsProtocol=" + connectionType + ";AccountName=" + window.accountname + ";AccountKey=" + window.accesskey;

    } else {
        connectionString = "BlobEndpoint=" + blobUrl + ";AccountName=" + window.accountname + ";AccountKey=" + window.accesskey;
    }
    if (storageType == "1") {
        azuredetails = {
            AzureBlobStorageUri: window.endpoint,
            AzureBlobStorageContainerName: window.containername,
            ConnectionType: connectionType,
            ConnectionString: connectionString,
            AccountName: window.accountname,
            AccessKey: window.accesskey
        };
    }
    else {
        azuredetails = {};
    }
}

function enableIsolationCode() {
    var isEnabled = $("#isolation-enable-switch").is(":checked");
    if (isEnabled) {
        document.getElementById("site-isolation-code").ej2_instances[0].enabled = true;
        $("#isolation-code").focus();
    } else {
        document.getElementById("site-isolation-code").ej2_instances[0].enabled = false;
        $("#isolation-code-validation").html("");
        document.getElementById("site-isolation-code").ej2_instances[0].value = null;
        $("#site-isolation-code").closest('div').removeClass("e-error");
    }
}

$(document).on("keyup", "#site-isolation-code", function (e) {
    clearTimeout(validateTimer);
    validateTimer = setTimeout(validateCode, validateInterval);
});

$(document).on("keydown", "#site-isolation-code", function (e) {
    clearTimeout(validateTimer);
});

function validateCode() {
    ValidateIsolationCode($("#site-isolation-code").val(), "#site-isolation-code");
}

$(window).load(function () {
    Resize();
    ResizeHeightForDOM();
});
