﻿var userAgent = navigator.userAgent;
var regexIe8 = new RegExp("Trident(\/4.0)|(Trident\/5.0)");
var isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
var selectedAdmins = [];
var gridAdminData = [];
var userId = [];
var isFirstRequest = false;
var waitingPopUpElement;
var tenantNameinDB = "";
var tenantIdentifierinDB = "";
var gridHeight = 355;
var databaseFormData, intermediateFormData, clonedDBFormData, azuredetails, ociObjectStoragedetails, amazons3details;
var storageFlag = 0;
var previousIndex = [];
var previousIndexUserId = [];
var prevDomain = "";
var haveTenantIdentifier = true;
var validateTimer;
var validateInterval = 1000;
var tooltip;
var emailTooltip = null;

$(document).ready(function () {
    if (isCommonLogin) {
        $(".selector").addClass("selector-alignment");
    }

    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    });

    var IsDefaultPrefixAndSchema = IsDefaultPrefixUms && IsDefaultSchemaUms;
    var tooltipContent = "";
    var dropTenantTypeDownList = new ejs.dropdowns.DropDownList({
        index: (isCommonLogin && (IsBiPrefixSchema && !IsReportsPrefixSchema)) ? 0 : (isCommonLogin && (!IsBiPrefixSchema && IsReportsPrefixSchema && !BIUmsPrefixSchema) && (!IsDefaultPrefixUms || !IsDefaultSchemaUms)) ? 1 : 0,
        floatLabelType: "Always",
        placeholder: 'Tenant Type',
        change: changeTenantType,
        cssClass: 'e-outline e-custom',
        open: function () {
            var popupElement = dropTenantTypeDownList.popupObj.element;
            var listItems = popupElement.querySelectorAll('.e-list-item');
            for (var i = 0; i < listItems.length; i++) {
                var listItem = listItems[i];

                if (listItems[i].dataset.value === 'BoldReportsOnPremise') {
                    if (isUmsStartupWithOracle) {
                        listItem.classList.add('e-disabled');
                        tooltipContent = window.Server.App.LocalizationContent.ReportsSiteCannotCreateOracle;
                    }
                    else if (!IsDefaultPrefixAndSchema && !IsReportsPrefixSchema)
                    {
                        listItem.classList.add('e-disabled');
                        tooltipContent = window.Server.App.LocalizationContent.ReportsSiteCannotCreateCustomSchemaAndPrefix;
                    }
                }
                else
                {
                    if (!IsDefaultPrefixAndSchema && !BIUmsPrefixSchema)
                    {
                        listItem.classList.add('e-disabled');
                        tooltipContent = window.Server.App.LocalizationContent.BISiteCannotCreateCustomSchemaAndPrefix;
                    }
                }
            }

            if (!tooltip) {
                tooltip = new ej.popups.Tooltip({
                    content: tooltipContent,
                    target: '.e-list-item.e-disabled',
                    position: 'TopCenter',
                });
                tooltip.appendTo(document.body);
            } else {
                tooltip.setProperties({ target: '.e-list-item.e-disabled-1' });
                tooltip.refresh();
            }
        },
        select: (args) => {
            if (args.item.classList.contains('e-disabled')) {
                args.cancel = true;
            }
        },
        close: function () {
            if (tooltip) {
                tooltip.destroy();
                tooltip = null;
            }
        },
    });

    dropTenantTypeDownList.appendTo('#tenant-type');

    if (!isCommonLogin && isBoldBIMultiTenant.toLowerCase() == "true") {
        document.getElementById("tenant-type").ej2_instances[0].enabled = false;
    }
    if (!isCommonLogin && isBoldReportsMultiTenant.toLowerCase() == "true") {
        document.getElementById("tenant-type").ej2_instances[0].enabled = false;
    }

    var tenantTypeDropDown = getDropDownValue("tenant-type");
    if (tenantTypeDropDown.toLowerCase() != "boldbionpremise") {
        $(".reports-branding").css("display", "inline");
        $(".bi-branding").css("display", "none");
        $(".selector").addClass("selector-alignment");
    }
    else {
        $(".bi-branding").css("display", "inline");
        $(".reports-branding").css("display", "none");
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

    if (actionType.toLowerCase() != "edit") {
        var inputDomain = ""
        if (isValidUrl($("#input-domain").val())) {
            inputDomain = $("#input-domain").val();
        }

        if (useSiteIdentifierEnable) {
            $(".site-url-identifier").removeClass("d-none");
        }
        else {
            $(".site-url-identifier").addClass("d-none");
        }

        if (isBoldReportsTenantType()) {
            $(".site-default-text").html("").html(boldReportsPath);
        }
        else {
            $(".site-default-text").html("").html(boldBiPath);
        }
        $(".site-domain").html($("#enable-ssl").val() + "://" + inputDomain);
        $(".site-url").attr("data-content", $(".site-domain").html() + $(".site-default-text").text());
    }

    var globalSettingsListObj = new ejs.dropdowns.MultiSelect({
        placeholder: window.Server.App.LocalizationContent.SelectSettings,
        mode: 'CheckBox',
        showSelectAll: true,
        allowfiltering: false,
        showDropDownIcon: true,
        cssClass: 'e-outline e-custom e-non-float'
    });
    globalSettingsListObj.appendTo('#global-settings-options');

    waitingPopUpElement = 'add-tenant-popup';
    if (actionType.toLowerCase() == "edit") {
        $("#total-step").html("").html(" 2");
        $(".add-tenant-popup-title label").html("Edit site");
        $(".branding-type").addClass("d-none");
        $(".administrator,  #selection-storage, .select-storage, #selectionadmin, #selectiondb .hr-tag, #selection-intermediate-db .hr-tag, #selection-data-security, .get-data-security").css("display", "none");
        $(".selector-icons").addClass("icon-alignment");
        $(".selector").removeClass("selector-alignment");
        $(".selector-content").addClass("content-alignment");
        $(".make-master-checkbox").hide();
        getTenant(tenantId);
    } else {
        if (isBoldBI) {
            $(".selector").addClass("selector-alignment");
        }
        parent.hideWaitingPopup(waitingPopUpElement);
        autoFocus("tenant-name");
    }
    $("#search-area").hide();
    addPlacehoder("body");
    $(".placeholder").css("display", "none");

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

    $("[data-bs-toggle='popover']").popover({
        container: 'body',
        trigger: 'hover',
    });

    function siteIdentifierValidation() {
        var domain = $("#input-domain").val();
        var tenantIdentifier = $("#tenant-identifier").val();
        var tenantName = $("#tenant-name").val();
        $.ajax({
            type: "POST",
            url: tenantIdentifierValidationUrl,
            async: false,
            data: { domain: domain, tenantIdentifier: tenantIdentifier, tenantName: tenantName, tenantType: getDropDownValue("tenant-type") },
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
            data: { domain: domain, tenantType: getDropDownValue("tenant-type") },
            success: function (data) {
                if (!data.Data) {
                    $("#input-domain").closest("div").addClass("e-error");
                    $("#domain-validation-error").css("display", "block");
                    $("#enable-ssl").css("margin-bottom", "15px");
                    $("#domain-validation-error").html(window.Server.App.LocalizationContent.InvalidDomain);
                }
                else {
                    $.ajax({
                        type: "POST",
                        url: validateIPWhitelistedUrl,
                        async: false,
                        data: { domain: domain },
                        success: function (ipData) {
                            if (!ipData.Data) {
                                $("#input-domain").closest("div").addClass("e-error");
                                $("#domain-validation-error").css("display", "block");
                                $("#enable-ssl").css("margin-bottom", "15px");
                                $("#domain-validation-error").html(window.Server.App.LocalizationContent.InvalidIpDomain)
                            } else {
                                $("#input-domain").closest("div").removeClass("e-error");
                                $("#domain-validation-error").css("display", "none");
                                $("#enable-ssl").css("margin-bottom", "5px");
                                $("#domain-validation-error").html("");
                            }
                        }
                    });

                }
            }
        });
    }

    if (actionType.toLowerCase() === "edit") {
        if (useSingleTenantDb) {
            $("#details-next").attr("value", window.Server.App.LocalizationContent.UpdateButton);
            $("#details-next").removeClass("database").addClass("update");
            $(".selector").hide();
        }
    }

    if (useSingleTenantDb && actionType.toLowerCase() !== "edit") {
        $(".selector-icons").addClass("icon-alignment-for-single-database");
        $(".selector-content").addClass("content-alignment-for-single-database");
    }
    else if (!useSingleTenantDb && actionType.toLowerCase() !== "edit")
    {
        $(".selector-icons").addClass("icon-alignment-for-database-per-tenant");
        $(".selector-content").addClass("content-alignment-for-database-per-tenant");
    }

    $(document).on("click", "#details-next", function () {
        $(this).attr("disabled", true);
        checkServerHealthStatus();
        if (!useSiteIdentifierEnable && $("#tenant-identifier").val() != "" && actionType.toLowerCase() == "edit" && $("#tenant-registration-form").find(".e-error").length == 0) {
            $("#tenant-identifier").closest("div").addClass("e-error");
            $("#tenant-identifier-validation-error").css("display", "block");
            $("#tenant-identifier-validation-error").html(window.Server.App.LocalizationContent.DisAllowTenantIdentifier);
        }
        if (($("#input-domain").val() != prevDomain || $('input[name="identifier"]').prop("checked")) && !useSiteIdentifierEnable) {
            siteIdentifierValidation();
        }
        if ($("#tenant-registration-form").find(".e-error").length == 0) {
            if ($(".tenant-database-form").hasClass("d-none") && $(this).hasClass("database") && $("#tenant-registration-form").find(".e-error").length == 0) {
                var tenantIdentifier = $("#tenant-identifier").val().trim();
                var tenantName = $("#tenant-name").val().trim();
                var canProceed = $("#tenant-registration-form").valid();
                if (canProceed) {
                    parent.showWaitingPopup(waitingPopUpElement);
                    tenantNameIdentiferCheck(tenantName, tenantIdentifier);
                } else {
                    $(this).removeAttr("disabled");
                }

                if( actionType.toLowerCase() != "edit") {
                    if (isBoldReportsTenantType()) {
                        document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("txt-server-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                    }
                    else {
                        document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("txt-server-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                    }
                }

                if (!isBoldReportsTenantType() && (!IsBiPrefixSchema)) {
                    $(".schema-prefix-hide").removeClass("d-block").addClass("d-none");
                }
                else if (!isBoldReportsTenantType() && (IsBiPrefixSchema)) {
                    $(".schema-prefix-hide").removeClass("d-none").addClass("d-block");
                }

                if (isBoldReportsTenantType() && (!IsReportsPrefixSchema)) {
                    $(".schema-prefix-hide").removeClass("d-block").addClass("d-none");
                }
                else if (isBoldReportsTenantType() && (IsReportsPrefixSchema)) {
                    $(".schema-prefix-hide").removeClass("d-none").addClass("d-block");
                }
            }
            else if ($(this).hasClass("storage-config") && $(".tenant-database-form").find(".e-error").length == 0) {
                if (useSingleTenantDb) {
                    if ($(".tenant-database-form #db-content-holder").valid()) {
                        var databaseType = getDropDownValue("database-type");

                        if ($("input[name='databaseType']:checked").val() === "1" || databaseType.toLowerCase() === "oracle") {
                            existingDbConfiguration(waitingPopUpElement);
                        } else {
                            newDbConfiguration(waitingPopUpElement);
                        }

                        if (IsBiPrefixSchema && getDropDownValue("tenant-type").toLowerCase() !== "boldreportsonpremise") {
                            saveDefaultAttributes(databaseType, getDropDownValue("tenant-type"));
                        }

                        if (!$(".database-error").is(":visible")) {
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

                        $('#details-next').removeAttr("disabled");
                    } else {
                        $(this).removeAttr("disabled");
                    }
                }
                else
                {
                    $("#details-next").removeClass("storage-config").addClass("data-security");
                    $("#details-next").click();
                }
            }
            else if ($(this).hasClass("data-security") && ($(".storage-form").find(".e-error").length == 0 || useSingleTenantDb)) {
                if (systemSettingsDetails) {
                    systemSettingsDetails.StorageType = getDropDownValue("storage-type") == "2" ? "4" : getDropDownValue("storage-type");
                }

                if ($("#blob-storage-form").valid() && systemSettingsDetails && systemSettingsDetails.StorageType == "1") {
                    parent.showWaitingPopup(waitingPopUpElement);

                    $.ajax({
                        type: "POST",
                        url: blobExist,
                        data: { connectionString: azuredetails.ConnectionString, containerName: window.containername },
                        success: function (result) {
                            parent.hideWaitingPopup(waitingPopUpElement);
                            if (typeof result.Data != "undefined") {
                                if (result.Data.Key.toString().toLowerCase() == "true") {
                                    $(".azure-validation,.blob-error-message").css("display", "none");
                                    $(".storage-form #system-settings-filestorage-container").hide();
                                    moveStepper("front", 4);
                                    nextToDataSecurityPage();
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

                    $(this).removeAttr("disabled");
                }
                else if ($("#amazon-s3-storage-form").valid && systemSettingsDetails && systemSettingsDetails.StorageType == "3") {
                    var amazons3configuration = {
                        Region: getDropDownValue("aws-region"),
                        BucketName: $("#txt-bucketname").val(),
                        AccessKeyId: $("#txt-accesskeyid").val(),
                        AccessKeySecret: $("#txt-accesskeysecret").val(),
                        RootFolderName: $("#txt-rootfoldername").val()
                    }

                    parent.showWaitingPopup(waitingPopUpElement);
                    $.ajax({
                        type: "POST",
                        url: amazons3Exist,
                        data: { amazons3configuration: JSON.stringify(amazons3configuration) },
                        success: function (data) {
                            parent.hideWaitingPopup(waitingPopUpElement);
                            if (data.result == true) {
                                $(".amazon-s3-storage-validation,.amazon-s3-storage-error-message").css("display", "none");
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
                                $(".amazon-s3-storage-validation,.amazon-s3-storage-error-message").css("display", "block");
                            }
                        }
                    });

                    $(this).removeAttr("disabled");
                }
                else if (systemSettingsDetails && systemSettingsDetails.StorageType == "0") {
                    $(".storage-form #system-settings-filestorage-container").hide();
                    moveStepper("front", 4);
                    nextToDataSecurityPage();
                    $(this).removeAttr("disabled");
                }
                else {
                    $(this).removeAttr("disabled");
                }

                if (useSingleTenantDb)
                {
                    moveStepper("front", 4);
                    systemSettingsDetails = {
                        TenantIsolation:
                            {
                                IsEnabled: $("#isolation-enable-switch").is(":checked"),
                                IsolationCode: $("#site-isolation-code").val()
                            },
                        CustomAttribute: [],
                    };
                    nextToDataSecurityPage();
                }
                else {
                    saveDatabaseValuesTemporarly();

                    if ($(".tenant-database-form #db-content-holder").valid()) {
                        var databaseType = getDropDownValue("database-type");

                        if ($("input[name='databaseType']:checked").val() === "1" || databaseType.toLowerCase() === "oracle") {
                            existingDbConfiguration(waitingPopUpElement);
                        } else {
                            newDbConfiguration(waitingPopUpElement);
                        }

                        if (!$(".database-error").is(":visible")) {
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
                                if (IsBiPrefixSchema && getDropDownValue("tenant-type").toLowerCase() !== "boldreportsonpremise") {
                                    saveDefaultAttributes(databaseType, getDropDownValue("tenant-type"));
                                }
                                nextToDataSecurityPage();
                            }
                            $(this).removeAttr("disabled").addClass("next-alignment");
                        }

                        $('#details-next').removeAttr("disabled");
                    } else {
                        $(this).removeAttr("disabled");
                    }
                }
                if (isBoldReportsTenantType()) {
                    $(".isolation-part").removeClass("d-block").addClass("d-none");
                } else {
                    $(".isolation-part").removeClass("d-none").addClass("d-block");
                }
            }
            else if (($(".tenant-user-form").hasClass("d-none") && $(this).hasClass("user")) && ($(".storage-form").find(".e-error").length == 0 || useSingleTenantDb)) {
                if (useSingleTenantDb)
                {
                    systemSettingsDetails.TenantIsolation.IsEnabled = $("#isolation-enable-switch").is(":checked");
                    systemSettingsDetails.TenantIsolation.IsolationCode = document.getElementById("site-isolation-code").ej2_instances[0].value;
                    systemSettingsDetails.TenantIsolation.IsRowLevelSecurityEnabled = $("#site-row-security-enable-switch").prop("checked");
                    systemSettingsDetails.CustomAttribute = addSiteAttribute;

                    if (systemSettingsDetails.TenantIsolation.IsEnabled) {
                        parent.ValidateIsolationCode(systemSettingsDetails.TenantIsolation.IsolationCode, "#site-isolation-code")
                    }

                    if ($(".data-security-form").find(".e-error").length == 0) {
                        nextToUserPage();
                        moveStepper("front", 3);
                    }
                    $(this).removeAttr("disabled");
                }
                else
                {
                    systemSettingsDetails.TenantIsolation.IsEnabled = $("#isolation-enable-switch").is(":checked");
                    systemSettingsDetails.TenantIsolation.IsolationCode = document.getElementById("site-isolation-code").ej2_instances[0].value;
                    systemSettingsDetails.TenantIsolation.IsRowLevelSecurityEnabled = $("#site-row-security-enable-switch").prop("checked");
                    systemSettingsDetails.CustomAttribute = addSiteAttribute;

                    if (systemSettingsDetails.TenantIsolation.IsEnabled) {
                        parent.ValidateIsolationCode(systemSettingsDetails.TenantIsolation.IsolationCode, "#site-isolation-code")
                    }

                    if ($(".data-security-form").find(".e-error").length == 0) {
                        nextToUserPage();
                        moveStepper("front", 4);
                    }
                    $(this).removeAttr("disabled");
                }

            }
            else if ($(".tenant-user-form").hasClass("d-none") && $(this).hasClass("update") && $(".tenant-database-form").find(".e-error").length == 0) {
                if (useSingleTenantDb)
                {
                    var tenantIdentifier = $("#tenant-identifier").val().trim();
                    var tenantName = $("#tenant-name").val().trim();
                    var canProceed = $("#tenant-registration-form").valid();
                    if (canProceed) {
                        parent.showWaitingPopup(waitingPopUpElement);
                        tenantNameIdentiferCheck(tenantName, tenantIdentifier);
                    } else {
                        $(this).removeAttr("disabled");
                    }
                }
                else {
                    var proceed = $("#db-content-holder").valid();
                    if (proceed) {
                        parent.showWaitingPopup(waitingPopUpElement);
                        $("#details-back").show().removeClass("back-button");
                        if (getDropDownValue("database-type").toLowerCase() == "mssql" || getDropDownValue("database-type").toLowerCase() == "postgresql" || getDropDownValue("database-type").toLowerCase() == "mysql" || getDropDownValue("database-type").toLowerCase() == "oracle") {
                            checkingNewDBConnection(waitingPopUpElement, actionType);
                        } else {
                            updateTenant(waitingPopUpElement);
                        }
                    } else {
                        $(this).removeAttr("disabled");
                    }
                }
            }
            else {
                if ($(".tenant-user-form").hasClass("d-block") && $(".tenant-user-form").find(".has-error").length == 0 && selectedAdmins.length != 0) {
                    parent.showWaitingPopup(waitingPopUpElement);
                    $("#details-back").show().removeClass("back-button");
                    addTenant();
                } else {
                    $("#validation-user-error").show();
                    $(this).removeAttr("disabled");
                }
            }
            enableIsolationCode();
            Resize();
            ResizeHeightForDOM();
        }
        else {
            $(this).removeAttr("disabled");
        }

        if (isSiteCreation) {
            $(".id-schema-prefix-hide").removeClass("d-block").addClass("visually-hidden");
        }

        var obj = document.getElementById("database-type");
        var itemsList = obj.ej2_instances[0].list.querySelectorAll('.e-list-item');
        if (isBoldReportsTenantType() && !IsOracleSupportReports) {
            itemsList[3].style.display = "none";
        }
        else if (isBoldReportsTenantType() && IsOracleSupportReports) {
            itemsList[3].style.display = "";
        }

        if (!isBoldReportsTenantType() && !IsOracleSupportBi) {
            itemsList[3].style.display = "none";
        }
        else if (!isBoldReportsTenantType() && IsOracleSupportBi) {
            itemsList[3].style.display = "";
        }
    });

    $(document).on("click", "#details-back", function () {
        $("#details-next").removeAttr("disabled");
        if ($("#details-next").hasClass("storage-config") || $("#details-next").hasClass("update")) {
            $(".tenant-user-form").removeClass("d-block").addClass("d-none");
            $(".tenant-database-form").removeClass("d-block").addClass("d-none");
            $("#details-back").hide().addClass("back-button");
            $(".tenant-registration-form").removeClass("d-none").addClass("d-block");
            $("#dialog-header").css("display", "none");
            $("#header-title").show();
            $("#header-title").html(window.Server.App.LocalizationContent.SiteCreation);
            if (item === "dashboards") {
                $("#header-description").html(window.Server.App.LocalizationContent.BoldBiMultiTenancy.format(biProductname));
                $("#master-site-description").html(window.Server.App.LocalizationContent.MasterSiteDescription.format("dashboard", "dashboards"));
            }
            else {
                $("#header-description").html(window.Server.App.LocalizationContent.BoldReportsMultiTenancy.format(reportsProductname));
                $("#master-site-description").html(window.Server.App.LocalizationContent.MasterSiteDescription.format("reports", "reports"));
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
            $("#details-next").attr("value", window.Server.App.LocalizationContent.NextButton).removeClass("next-alignment");
            if ($("#txt-password-db").is(":text")) {
                $("#txt-password-db").parent().find(".show-hide-password").click();
                $("#txt-password-db").parent().find(".tooltip").css("display", "none");
            }

            if (useSingleTenantDb)
            {
                $("#details-next").removeClass("storage-config");
            }
            else
            {
                $("#details-next").removeClass("storage-config").addClass("database");
            }

        }
        else if ($("#details-next").hasClass("data-security")) {


            $("#details-next").attr("value", window.Server.App.LocalizationContent.NextButton);
            $(".tenant-registration-form").removeClass("d-block").addClass("d-none");
            $(".tenant-user-form").removeClass("d-block").addClass("d-none");
            $(".storage-form").removeClass("d-block").addClass("d-none");
            $(".data-security-form").removeClass("d-block").addClass("d-none");
            $("#dialog-body-container").removeClass("grid-height-control");
            $("#header-title").show();
            $("#header-description").show();

            $("#details-next").removeClass("data-security").addClass("storage-config");


            moveStepper("back", 2);

            if (isBoldBI) {
                $("#system-settings-db-selection-container").removeClass("d-none").addClass("d-block");

                $("#no-need-datastore").css("display", "none");

                $("#header-title").html(window.Server.App.LocalizationContent.SelectDatabaseTitle);
                $("#header-description").text(window.Server.App.LocalizationContent.PlaceToCreateShare.format("dashboards")).show();
                $("#search-area").hide();
                $(".storage-form #system-settings-filestorage-container").hide();
            } else {
                $("#header-title").html(window.Server.App.LocalizationContent.SelectDatabaseTitle);
                $("#header-description").text(window.Server.App.LocalizationContent.PlaceToCreateShare.format("reports")).show();
            }

            $("#details-back").show().removeClass("back-button");
            $(".tenant-database-form").removeClass("d-none").addClass("d-block");

            if (!isBoldBI) {
                $("#dialog-body-container").removeClass("grid-alignment");
                $("#stepper #current-step").text("2");
            }

            if (getDropDownValue("database-type").toLowerCase() === "postgresql" || getDropDownValue("database-type").toLowerCase() === "mysql") {
                $('.auth-type').removeClass("d-block").addClass("d-none");
            } else {
                $('.auth-type').removeClass("d-none").addClass("d-block");
            }

            if (!isBoldReportsTenantType() || getDropDownValue("database-type").toLowerCase() === "mysql" || getDropDownValue("database-type").toLowerCase() === "oracle") {
                $('.database-schema-prefix-hide').removeClass("d-block").addClass("visually-hidden");
            }

            $("#search-area").hide();


        }
        else if ($("#details-next").hasClass("user")) {
            if (useSingleTenantDb)
            {
                moveStepper("back", 1);
                $("#details-back").show().addClass("back-button");
                if (getDropDownValue("database-type").toLowerCase() === "postgresql" || getDropDownValue("database-type").toLowerCase() === "mysql") {
                    $('.auth-type').removeClass("d-block").addClass("d-none");
                } else {
                    $('.auth-type').removeClass("d-none").addClass("d-block");
                }
                $(".data-security-form").removeClass("d-block").addClass("d-none");
                $("#search-area").hide();
                $("#details-next").removeClass("user").addClass("storage-config");
                $("#details-back").click();
            }
            else {
                moveStepper("back", 3);
                $("#details-back").show().addClass("back-button");
                $("#search-area").hide();
                $("#header-title").html(window.Server.App.LocalizationContent.SelectStorage);
                $("#header-title").show();
                if (getDropDownValue("database-type").toLowerCase() === "postgresql" || getDropDownValue("database-type").toLowerCase() === "mysql") {
                    $('.auth-type').removeClass("d-block").addClass("d-none");
                } else {
                    $('.auth-type').removeClass("d-none").addClass("d-block");
                }

                $(".storage-form #system-settings-filestorage-container").show();
                $(".storage-checkbox").hide();
                $(".storage-form, #step-2").removeClass("hide").addClass("show");
                var storageType = getDropDownValue("storage-type") == "2" ? "4" : getDropDownValue("storage-type");
                if (storageType == "1") {
                    $(".report-content").hide();
                    $(".storage-checkbox").show();
                }
                else {
                    $(".report-content").slideDown("slow");
                }
                $(".storage-form #blob-storage-form").addClass("site-creation");

                $(".tenant-user-form, #step-3").removeClass("d-block").addClass("d-none");
                $(".data-security-form").removeClass("d-block").addClass("d-none");
                $("#details-next").attr("value", window.Server.App.LocalizationContent.NextButton);
                $("#details-next").removeClass("user").addClass("data-security");

                if (!isBoldReportsTenantType()) {
                    $("#header-description").html(window.Server.App.LocalizationContent.StorageBIMsg.format(biProductname)).show();
                } else {
                    $("#header-description").text(window.Server.App.LocalizationContent.StorageReportsMsg.format(reportsProductname)).show();
                }
                $("#search-area").hide();
                $("#details-back").click();
            }
        }
        else {
            $("#details-back").show().addClass("back-button");
            $("#search-area").hide();
            if (getDropDownValue("database-type").toLowerCase() === "postgresql") {
                $('.auth-type').removeClass("d-block").addClass("d-none");
            }
            else {
                $('.auth-type').removeClass("d-none").addClass("d-block");
            }
            $("#header-title").html(window.Server.App.LocalizationContent.ConfigureDataSecurity);
            $("#header-description").hide();
            $(".tenant-user-form, #step-3").removeClass("d-block").addClass("d-none");
            $(".data-security-form").removeClass("d-none").addClass("d-block");
            $("#details-next").attr("value", window.Server.App.LocalizationContent.NextButton);
            $("#details-next").removeClass("submit").addClass("user").removeAttr("disabled");
            if (useSingleTenantDb) {
                moveStepper("back", 2);
            }
            else
            {
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

        parent.document.getElementById("add-tenant-popup").ej2_instances[0].hide();
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
        UseSiteIdentifier: useSiteIdentifierEnable,
        IsMaster: $(".make-master-checkbox").is(":checked")
    };

    var brandingType = getDropDownValue("branding-type");
    if (brandingType == biProductname) {
        brandingType = "";
    }
    else if (brandingType == reportsProductname) {
        brandingType = "boldreports"
    }

    var storageType = getDropDownValue("storage-type") == "2" ? "4" : getDropDownValue("storage-type");
    if (storageType == "3") {
        amazons3details = {
            Region: getDropDownValue("aws-region"),
            BucketName: $("#txt-bucketname").val(),
            AccessKeyId: $("#txt-accesskeyid").val(),
            AccessKeySecret: $("#txt-accesskeysecret").val(),
            RootFolderName: $("#txt-rootfoldername").val()
        }
    } else {
        amazons3details = {}
    }

    if (storageType == "4") {
        ociObjectStoragedetails = {
            BucketName: $("#txt-oci-bucketname").val(),
            AccessKey: $("#txt-oci-accesskey").val(),
            SecretKey: $("#txt-secretkey").val(),
            RootFolderName: $("#txt-oci-rootfoldername").val(),
            OCINameSpace: $("#txt-namespace").val()
        }
    } else {
        ociObjectStoragedetails = {}
    }

    var globalSettingsValues = [];
    $(document.getElementById('global-settings-options').ej2_instances[0].value).each(function () {
        globalSettingsValues.push(this);
    });

    postSystemSettingsData(systemSettingsDetails, azuredetails, selectedAdmins, tenantInfo, brandingType, true, userId, amazons3details, globalSettingsValues);
}

function nextToUserPage() {
    if ($(".tenant-intermediate-database-form").find(".has-error").length == 0 || $(".storage-form").find(".has-error").length == 0) {
        $(".tenant-intermediate-database-form, #step-2").removeClass("d-block").addClass("d-none");
        $(".tenant-registration-form, #step-1").removeClass("d-block").addClass("d-none");
        $("#stepper #current-step").text("3");
        $(".tenant-user-form, #step-3").removeClass("d-none").addClass("d-block");
        $("#details-next").attr("value", window.Server.App.LocalizationContent.CreateLaunchSite);
        $("#details-next").removeClass("data-security").addClass("submit").removeAttr("disabled");
        $("#details-next").removeClass("user").addClass("submit").removeAttr("disabled");
        $(".data-security-form").removeClass("d-block").addClass("d-none");
        $("#dialog-body-container").addClass("grid-alignment");
        $("#dialog-body-container").addClass("grid-height-control");
        $("#header-title").show();
        $("#header-description").show();
        $("#details-back").show().removeClass("back-button");
        $("#header-title").html(window.Server.App.LocalizationContent.SelectSiteAdmin);
        $("#header-description").text(window.Server.App.LocalizationContent.AdminControlSite);
        $(".storage-form #system-settings-filestorage-container").hide();
        $(".storage-checkbox").hide();
        $(".storage-form, #step-2").removeClass("d-block").addClass("d-none");
        $(".report-content").hide();
        $(".storage-form #blob-storage-form").addClass("site-creation");
        gridHeight = 500;
        $("#search-area").show();
        listUsersForAdminSelection();
        ResizeHeightForDOM();
        parent.hideWaitingPopup(waitingPopUpElement);
    }
}

function getTenant(id) {
    $.ajax({
        type: "POST",
        url: getTenantDetailsUrl,
        data: { tenantId: id },
        success: function (data) {

            parent.hideWaitingPopup(waitingPopUpElement);
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
                    $("#header-description").html(window.Server.App.LocalizationContent.BoldReportsMultiTenancy.format(reportsProductname));
                    $("#master-site-description").html(window.Server.App.LocalizationContent.MasterSiteDescription.format("reports", "reports"));
                }
                else {
                    item = "dashboards";
                    $("#header-description").html(window.Server.App.LocalizationContent.BoldBiMultiTenancy.format(biProductname));
                    $("#master-site-description").html(window.Server.App.LocalizationContent.MasterSiteDescription.format("dashboard", "dashboards"));
                }
                if (useSiteIdentifierEnable && data.TenantDetails.Tenant.UseSiteIdentifier) {
                    $(".site-url-identifier").removeClass("d-none");
                    $(".site-identifier-check").addClass("d-none");

                }
                else if (useSiteIdentifierEnable && !data.TenantDetails.Tenant.UseSiteIdentifier) {
                    $(".site-url-identifier").removeClass("d-none");
                    $("#tenant-identifier").removeAttr("disabled");
                    $(".site-identifier-check").addClass("d-none");
                }
                else if (!useSiteIdentifierEnable && data.TenantDetails.Tenant.UseSiteIdentifier) {
                    $(".site-url-identifier").removeClass("d-none");
                    $(".site-identifier-check").removeClass("d-none");
                }
                else {
                    $(".site-url-identifier").addClass("d-none");
                    $(".site-identifier-check").addClass("d-none");
                }
            }
            if (data.DatabaseDetails != "" || data.DatabaseDetails != null || data.DatabaseDetails != undefined) {
                var databaseInformation = JSON.parse(data.DatabaseDetails);
                var authentication = "";
                $("#admin-nav").hide();
                $("#table-prefix-ums").hide();
                $("#table-prefix-name").hide();
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
                    $("#table-prefix-name").hide();
                    $("#table-prefix-ums").hide();
                } else if (databaseInformation.ServerType === 1) {
                    document.getElementById("database-type").ej2_instances[0].value = "MySQL";
                    fillCommonDatbaseValues(databaseInformation);
                    $('.auth-type').removeClass("d-block").addClass("d-none");
                    $('.port-num').removeClass("d-block").addClass("d-none");
                    $("#table-prefix-ums").hide();
                    $("#table-prefix-name").hide();
                    document.getElementById("txt-portnumber").ej2_instances[0].value = databaseInformation.Port;
                    $("#secure-sql-connection").prop("checked", databaseInformation.SslEnabled);
                    document.getElementById("txt-login").ej2_instances[0].value = databaseInformation.UserName;
                    $(".database-name").css("padding-top", "0");
                } else if (databaseInformation.ServerType === 4) {
                    document.getElementById("database-type").ej2_instances[0].value = "PostgreSQL";
                    fillCommonDatbaseValues(databaseInformation);
                    $('.auth-type').removeClass("d-block").addClass("d-none");
                    $('.port-num, .maintenancedb').removeClass("d-none").addClass("d-block");
                    $("#table-prefix-ums").hide();
                    $("#table-prefix-name").hide();
                    document.getElementById("maintenance-db").ej2_instances[0].value = data.TenantDetails.MaintenanceDatabase;
                    document.getElementById("txt-portnumber").ej2_instances[0].value = databaseInformation.Port;
                    $("#secure-sql-connection").prop("checked", databaseInformation.SslEnabled);
                    document.getElementById("txt-login").ej2_instances[0].value = databaseInformation.UserName;
                    $(".database-name").css("padding-top", "0");
                } else if (databaseInformation.ServerType === 3) {
                    document.getElementById("database-type").ej2_instances[0].value = "Oracle";
                    fillCommonDatbaseValues(databaseInformation);
                    $('.auth-type').removeClass("d-block").addClass("d-none");
                    $('.port-num').removeClass("d-none").addClass("d-block");
                    document.getElementById("txt-portnumber").ej2_instances[0].value = databaseInformation.Port;
                    document.getElementById("txt-servicename").ej2_instances[0].value = databaseInformation.ServiceInstance;
                    $("#secure-sql-connection").prop("checked", databaseInformation.SslEnabled);
                    document.getElementById("txt-login").ej2_instances[0].value = databaseInformation.UserName;
                    $(".database-name").css("padding-top", "0");
                }

                else {
                    $("#database-type").find("option").each(function () {
                        if ($(this).val().toLowerCase() === "mssqlce") {
                            $(this).attr("selected", "selected");
                        }
                    });
                    $('#database-type').attr("disabled", true).addClass("disabled");
                    $('#db-content-holder').css("display", "none");
                    $('#db-config-submit,#sql-existing-db-submit').addClass("d-none");
                    $(".sqlce-content").removeClass("d-none").addClass("d-block");
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
    $("#database-new-or-existing").css("display", "none");
    $("#database-new-or-existing").removeClass("custom-height");
    $(".db-selection-radio").css("display", "none");
    $(".new-db,.existing-db").css("display", "none");
    document.getElementById("txt-servername").ej2_instances[0].value = databaseInformation.ServerName;
    document.getElementById("txt-dbname").ej2_instances[0].value = databaseInformation.DatabaseName;
    document.getElementById("schema-name").ej2_instances[0].value = databaseInformation.SchemaName;
    document.getElementById("tenant-table-prefix").ej2_instances[0].value = databaseInformation.Prefix;
    document.getElementById("txt-server-prefix").ej2_instances[0].value = databaseInformation.Prefix;
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
    var schemaName = $("#schema-name").val();
    var tenantPrefix = $("#txt-server-prefix").val();
    $.ajax({
        type: "POST",
        url: updateTenantDetailsUrl,
        data: { tenantId: tenantId, tenantName: name, tenantIdentifier: tenantIdentifier.toLowerCase(), tenantUrl: tenantUrl, databaseDetails: connectionString, additionalParameters: additionalParameters, useSiteIdentifier: siteIdentifier, SchemaName: schemaName, Prefix: tenantPrefix },
        success: function (data) {
            if (data.result == true) {
                parent.hideWaitingPopup(waitingPopUpElement);
                parent.document.getElementById("add-tenant-popup").ej2_instances[0].hide();
                parent.messageBox("su-edit", window.Server.App.LocalizationContent.UpdateSite, window.Server.App.LocalizationContent.SiteUpdated, "success", function () {
                    parent.onCloseMessageBox();
                });
                var tenantGridObj = parent.document.getElementById('tenants_grid').ej2_instances[0];
                tenantGridObj.refresh();
            }
            else {
                parent.hideWaitingPopup(waitingPopUpElement);
                parent.document.getElementById("add-tenant-popup").ej2_instances[0].hide();
                parent.messageBox("su-edit", window.Server.App.LocalizationContent.UpdateSite, window.Server.App.LocalizationContent.SiteUpdateFailed, "success", function () {
                    parent.onCloseMessageBox();
                });
            }
        }
    });
}

function Resize() {
    if ($(".tenant-registration-form, .tenant-database-form, .tenant-intermediate-database-form, .storage-form, .data-security-form, .tenant-user-form").hasClass("d-block")) {
        var height = $(window).height() - $(".modal-header").height() - $(".modal-footer").height();
        $(".modal-tenant-body").addClass("adjustment");
        $(".adjustment").css("height", height);
    } else {
        $(".modal-tenant-body").removeClass("adjustment");
    }
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
                parent.hideWaitingPopup(waitingPopUpElement);
                if (data.Result || data.ResultIdentifier || data.ResultName == false) {
                    if (data.Value != null && data.ResultIdentifier && tenantIdentifier.toLowerCase() != tenantIdentifierinDB.toLowerCase()) {
                        $("#tenant-identifier").closest("div").addClass("e-error");
                        $("#tenant-identifier-validation-error").css("display", "block");
                        $("#tenant-identifier-validation-error").html(data.Value);
                    }
                    else if (data.Value != null && data.ResultName == false) {
                        $("#tenant-name").closest("div").addClass("e-error");
                        $("#tenant-name-validation-error").css("display", "block");
                        $("#tenant-name-validation-error").html(data.Value);
                    }
                    else if (data.Result && tenantName.toLowerCase() != tenantNameinDB.toLowerCase().trim()) {
                        $("#tenant-name").closest("div").addClass("e-error");
                        $("#tenant-name-validation-error").css("display", "block");
                        $("#tenant-name-validation-error").html(window.Server.App.LocalizationContent.SiteNameExists);
                    } else {
                        $("#tenant-name").closest("div").removeClass("e-error");
                        $("#tenant-name-validation-error").css("display", "none");
                        if (!(useSingleTenantDb && actionType.toLowerCase() == "edit"))
                        {
                            nextToDatabasePage();
                        }
                        else {
                            updateTenant(waitingPopUpElement);
                        }
                    }
                } else {
                    $("#tenant-name, #tenant-identifier").closest("div").removeClass("e-error");
                    $("#tenant-name-validation-error,#tenant-identifier-validation-error").css("display", "none");
                    $(".identifier-info").css("padding-top", "20px");
                    if (!(useSingleTenantDb && actionType.toLowerCase() == "edit"))
                    {
                        nextToDatabasePage();
                    }
                    else
                    {
                        updateTenant(waitingPopUpElement);
                    }
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
        $("#tenant-identifier-validation-error").html(window.Server.App.LocalizationContent.AvoidSpecailCharacters);
        if (actionType.toLowerCase() != "edit") {
            $("#tenant-name, #details-next, #tenant-identifier").removeAttr("disabled");
        } else {
            $("#tenant-name, #details-next").removeAttr("disabled");
        }
        parent.hideWaitingPopup(waitingPopUpElement);
    }
}

function nextToDatabasePage() {
    if (!useSingleTenantDb)
    {
        $("#dialog-header").css("display", "block");
        $("#header-logo").css("display", "none");
        $("#header-title").html(window.Server.App.LocalizationContent.SelectDatabaseTitle);
        $("#header-description").html(window.Server.App.LocalizationContent.PlaceToCreateShare.format(item));
        $("#used-tenant-name").html($("#tenant-name").val());

        if (isSiteCreation) {
            $(".db-schema-info").html(window.Server.App.LocalizationContent.SchemaInfo);
            $(".db-prefix-info").html(window.Server.App.LocalizationContent.PrefixInfo);
        }
        if (isBoldReportsTenantType()) {
            var helpData = reportsProductname;
            $("#used-tenant-identifier").html($(".url-part").text().replace(/\s/g, '').replace("i.e", ''));
            $(".db-name-info").html(window.Server.App.LocalizationContent.DatabaseInfoReports.format(helpData));
            $(".tenant-product-name").html(helpData);
        }
        else {
            var helpData = biProductname;
            $("#used-tenant-identifier").html($(".url-part").text().replace(/\s/g, '').replace("i.e", ''));
            $(".db-name-info").html(window.Server.App.LocalizationContent.DatabaseInfoBI.format(helpData));
            $(".tenant-product-name").html(helpData);
        }
    }

    moveStepper("front", 2);
    $(".tenant-registration-form, #step-1").removeClass("d-block").addClass("d-none");
    $(".tenant-user-form, #step-3").removeClass("d-block").addClass("d-none");
    $("#details-back").show().removeClass("back-button");
    $("#stepper #current-step").text("2");
    $(".tenant-database-form, #step-2").removeClass("d-none").addClass("d-block");
    $("#dialog-body-container").removeClass("grid-alignment");

    if (getDropDownValue("database-type").toLowerCase() === "postgresql" || getDropDownValue("database-type").toLowerCase() === "mysql") {
        $('.auth-type').removeClass("d-block").addClass("d-none");
    }
    else {
        $('.auth-type').removeClass("d-none").addClass("d-block");
    }

    if (useSingleTenantDb)
    {
        $("#details-next").removeAttr("disabled").addClass("next-alignment");
        $("#details-next").removeClass('database').addClass("data-security");
        $("#details-next").click();
    }
    else
    {
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
            $("#details-next").attr("value", window.Server.App.LocalizationContent.UpdateButton);
            $("#details-next").removeClass("database").addClass("update");
        } else {
            $("#details-next").attr("value", window.Server.App.LocalizationContent.NextButton);
            $("#details-next").removeClass("database").addClass("data-security");
        }
        $("#details-next").removeAttr("disabled").addClass("next-alignment");
    }
}

function nextToStoragePage() {
    $("#header-title").show();
    $("#header-title").html(window.Server.App.LocalizationContent.SelectStorage);
    $("#header-description").show();
    if (!isBoldReportsTenantType()) {
        $("#header-description").html(window.Server.App.LocalizationContent.StorageBIMsg.format(biProductname));
    } else {
        $("#header-description").html(window.Server.App.LocalizationContent.StorageReportsMsg.format(reportsProductname));
    }

    moveStepper("front", 3);
    if (isAzureApplication) {
        //$(".storage-checkbox").show("slow");
        //$("#file-storage").prop("disabled", true);
        //$("#blob-storage").prop("checked", true);
        $(".tenant-registration-form, #step-1").removeClass("d-block").addClass("d-none");
        $(".tenant-user-form, #step-3").removeClass("d-block").addClass("d-none");
        $(".tenant-database-form, #step-2").removeClass("d-block").addClass("d-none");
        $(".custom-endpoint-form-element, .content-value, .file-storage-button").hide();
        $(".storage-form, #step-2").removeClass("d-none").addClass("d-block");
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
            var storagedropdown = document.getElementById("storage-type").ej2_instances[0].list;
            if (storagedropdown.querySelectorAll('li')[2] != undefined) {
                (storagedropdown.querySelectorAll('li')[2]).remove();
            }
        }
        else {
            gridChange();
            var storagedropdown = ConfiguredStorageType;
            document.getElementById("storage-type").ej2_instances[0].value = storagedropdown;
            document.getElementById("storage-type").ej2_instances[0].enabled = false;
            onStorageTypeChange(storagedropdown);
        }

        $("#details-next").removeClass("storage-config").addClass("data-security");
        $("#details-next").removeAttr("disabled").addClass("next-alignment");
    }
    else {
        var storageType = getDropDownValue("storage-type") == "2" ? "4" : getDropDownValue("storage-type");
        if (storageType == "1") {
            $(".report-content").hide();
            $(".storage-checkbox").show("slow");
        }
        else {
            $(".report-content").slideDown("slow");
            $(".storage-checkbox").hide("slow");
        }
        $(".tenant-registration-form, #step-1").removeClass("d-block").addClass("d-none");
        $(".tenant-user-form, #step-3").removeClass("d-block").addClass("d-none");
        $(".tenant-database-form, #step-2").removeClass("d-block").addClass("d-none");
        $(".custom-endpoint-form-element, .file-storage-button, .content-value").hide();
        $(".storage-form, #step-2").removeClass("d-none").addClass("d-block");
        $(".storage-form #system-settings-filestorage-container").show();
        $(".storage-form #blob-storage-form").addClass("site-creation");
        $("#dialog-body-container").removeClass("grid-alignment");
        $("#details-next").attr("value", "Next");
        gridChange();
        var storagedropdown = ConfiguredStorageType;
        document.getElementById("storage-type").ej2_instances[0].value = storagedropdown;
        // document.getElementById("storage-type").ej2_instances[0].enabled = false;    
        onStorageTypeChange(storagedropdown);
        $("#details-next").removeClass("storage-config").addClass("data-security");
        $("#details-next").removeAttr("disabled").addClass("next-alignment");
    }
}

function gridChange() {
    var storageType = getDropDownValue("storage-type") == "2" ? "4" : getDropDownValue("storage-type");
    if (storageType == "0") {
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
}

function nextToDataSecurityPage() {
    $("#header-title").show();
    $("#header-title").html(window.Server.App.LocalizationContent.ConfigureDataSecurity);
    $("#header-description").html("");

    if (isAzureApplication) {
        $(".storage-checkbox").show("slow");
        $("#file-storage").prop("disabled", true);
        $("#blob-storage").prop("checked", true);
        $(".tenant-registration-form, #step-1").removeClass("d-block").addClass("d-none");
        $(".tenant-user-form, #step-3").removeClass("d-block").addClass("d-none");
        $(".tenant-database-form, #step-2").removeClass("d-block").addClass("d-none");
        $(".custom-endpoint-form-element, .content-value, .file-storage-button").hide();
        $(".data-security-form").removeClass("d-none").addClass("d-block");
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
        var storageType = getDropDownValue("storage-type") == "2" ? "4" : getDropDownValue("storage-type");
        if (storageType == "1") {
            $(".report-content").hide();
            $(".storage-checkbox").show("slow");
        }
        else {
            $(".report-content").slideDown("slow");
            $(".storage-checkbox").hide("slow");
        }
        $(".tenant-registration-form, #step-1").removeClass("d-block").addClass("d-none");
        
        $(".tenant-user-form, #step-3").removeClass("d-block").addClass("d-none");
        $(".tenant-database-form, #step-2").removeClass("d-block").addClass("d-none");
        $(".custom-endpoint-form-element, .file-storage-button, .content-value").hide();
        $(".data-security-form").removeClass("d-none").addClass("d-block");
        $("#dialog-body-container").removeClass("grid-alignment");
        $("#details-next").attr("value", "Next");
        $("#details-next").removeClass("data-security").addClass("user");
        $("#details-next").removeAttr("disabled").addClass("next-alignment");
    }
    parent.hideWaitingPopup(waitingPopUpElement);
}

function preserveStorageFormData() {
    var storageType = getDropDownValue("storage-type") == "2" ? "4" : getDropDownValue("storage-type");
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
        $("#site-row-security-enable-switch").prop("disabled", false);
        if ($(".data-security-form").hasClass("d-block")) {
            $("#details-next").attr("disabled", true);
        }
        if ($("#site-isolation-code").closest('div').hasClass("e-valid-input")) {
            $("#details-next").removeAttr("disabled");
        }
    } else {
        document.getElementById("site-isolation-code").ej2_instances[0].enabled = false;
        $("#isolation-code-validation").html("");
        document.getElementById("site-isolation-code").ej2_instances[0].value = null;
        $("#site-isolation-code").closest('div').removeClass("e-error");
        $("#site-row-security-enable-switch").prop("disabled", true);
        $("#details-next").removeAttr("disabled");
    }
}

$(document).on("keyup", "#site-isolation-code", function (e) {
    clearTimeout(validateTimer);
    validateTimer = setTimeout(validateCode, validateInterval);
});

$(document).on("keydown", "#site-isolation-code", function (e) {
    clearTimeout(validateTimer);
});

$(document).on("focusout", "#site-isolation-code", function (e) {
    validateCode();
});

function validateCode() {
    ValidateIsolationCode($("#site-isolation-code").val(), "#site-isolation-code");
}
$(window).on('load', function () {
    Resize();
    ResizeHeightForDOM();
});

function gridChange() {
    var storageType = getDropDownValue("storage-type");
    if (storageType == "0") {
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
}

$(document).on("click", "#enable-isolation-code-material", function () {
    enableIsolationCode();
});

$(document).on("mouseleave", 'input[type="text"], input[type="password"]', function() {
    if ($(this).val() === "") {
        $(this).closest('div').removeClass("e-valid-input");
    }
});
