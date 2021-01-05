var userAgent = navigator.userAgent;
var regexIe8 = new RegExp("Trident(\/4.0)|(Trident\/5.0)");
var isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
var selectedAdmins = [];
var gridAdminData = [];
var isFirstRequest = false;
var waitingPopUpElement = "";
var tenantNameinDB = "";
var gridHeight = 355;
var databaseFormData, intermediateFormData, clonedDBFormData, azuredetails;
var storageFlag = 0;
var previousIndex = [];

$(document).ready(function () {
    waitingPopUpElement = parent.$("#add-tenant-popup");
    if (actionType.toLowerCase() == "edit") {
        $("#total-step").html("").html(" 2");
        $(".add-tenant-popup-title label").html("Edit site");
        $(".administrator, .select-intermediate-database, #selection-intermediate-db, #selection-storage, .select-storage, #selectionadmin, #selectiondb .hr-tag, #selection-intermediate-db .hr-tag, #selection-data-security, .get-data-security").css("display", "none");
        $(".selector-icons").addClass("icon-alignment");
        $(".selector").removeClass("selector-alignment");
        $(".selector-content").addClass("content-alignment");
        getTenant(tenantId);
    } else {
        if (isBoldBI) {
            $(".selector").addClass("selector-alignment");
        }
        hideWaitingPopup(waitingPopUpElement);
    }
    $("#search-area").hide();
    addPlacehoder("body");
    $(".placeholder").css("display", "none");
    if (isSafari) {
        $("#search-tenant-users").css("width", "1px");
    }

    $("#duplicate-table-list").ejDialog({
        width: "450px",
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        height: "230px",
        showHeader: false,
        enableModal: true
    });

    $(document).on("keydown", "#search-tenant-users", function (e) {
        $("#validation-user-error").hide();
        $.xhrPool.abortAll();
        var currentKeyCode = parseInt(e.which);
        var element = "#" + this.id;
        if (timeOut != null) {
            clearTimeout(timeOut);
            timeOut = null;
        }
        if (currentKeyCode === keyCode.Enter) {
            PerformSearch(element);
        }
        else if (excludedSearchKeys.indexOf(currentKeyCode) === -1) {
            timeOut = setTimeout(function () {
                PerformSearch(element);
            }, 900);
        }
    });

    $("#file-storage, #blob-storage").click(function () {
        if ($("#file-storage").is(":checked")) {
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

    $(document).on("keyup", "input", function (event) {
        if (event.keyCode == 13 && $(this).attr("id") != "search-tenant-users") {
            $("#details-next").click();
        }
    });

    $('#tenant-type').change(function () {
        var dropdownValue = $("#tenant-type").val();

        if (dropdownValue === "BoldReportsOnPremise") {
            item = "reports";
            $("#selection-intermediate-db").css("display", "none");
            $(".select-intermediate-database").css("display", "none");
            $(".get-data-security").css("display", "none");
            $("#selection-data-security").css("display", "none");
            $(".selector").removeClass("selector-alignment");
            $(".select-storage").html(window.TM.App.LocalizationContent.SelectStorage);
            $("#header-description").html(window.TM.App.LocalizationContent.BoldReportsMultiTenancy);
            $(".site-default-text").html("").html(boldReportsUrl);
        }
        else if (dropdownValue === "BoldBIOnPremise") {
            item = "dashboards";
            $("#selection-intermediate-db").css("display", "inline");
            $(".select-intermediate-database").css("display", "inline");
            $(".get-data-security").css("display", "inline");
            $("#selection-data-security").css("display", "inline");
            $(".selector").addClass("selector-alignment");
            $(".select-intermediate-database").html(window.TM.App.LocalizationContent.SiteDataStore);
            $(".select-storage").html(window.TM.App.LocalizationContent.SelectStorage);
            $("#header-description").html(window.TM.App.LocalizationContent.BoldBiMultiTenancy);
            $(".site-default-text").html("").html(boldBIUrl);
        }
    });

    $(".site-url").attr("data-content", $(".site-default-text").text() + $(".site-id-name").text());

    $("[data-toggle='popover']").popover({
        container: 'body',
        trigger: 'hover',
    });

    $(".site-url").hover(function () {
        $(".add-tenant-dialog-wrapper").nextAll(".popover").find(".arrow").css("left", "50%");
        $(".add-tenant-dialog-wrapper").nextAll(".popover").css("left", "30%");
    });

    $(document).on("keyup", "#tenant-identifier", function (event) {
        var dropdownValue = $("#tenant-type").val();

        if (dropdownValue === "BoldReportsOnPremise") {
            $(".site-default-text").html("").html(boldReportsUrl);
        }
        else if (dropdownValue === "BoldBIOnPremise") {
            $(".site-default-text").html("").html(boldBIUrl);
        }

        $(".site-id-name").html($(this).val());
        $(".site-url").attr("data-content", $(".site-default-text").text() + $(".site-id-name").text());
    });

    $("#tenant-identifier").validate({
        errorElement: "span",
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            tenantidentifier: {
                isRequired: true,
                isValidIdentifier: true
            }
        },
        highlight: function (element) {
            $(element).closest(".txt-holder").addClass("has-error");
            $(element).parent().find(">.startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest(".txt-holder").removeClass("has-error");
            $(element).parent().find(">.startup-validation").hide();
        },
        errorPlacement: function (error, element) {
            $(element).parent().find(">.startup-validation").text(error.html());
        },
        messages: {
            tenantidentifier: {
                isRequired: window.TM.App.LocalizationContent.SiteIdentifierValidator,
                isValidIdentifier: window.TM.App.LocalizationContent.UseNumbersLetters
            }
        }
    });

    $("#tenant-name").validate({
        errorElement: "span",
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            tenantname: {
                required: true,
                isValidName: true
            }
        },
        highlight: function (element) {
            $(element).closest(".txt-holder").addClass("has-error");
            $(element).parent().find(">.startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest(".txt-holder").removeClass("has-error");
            $(element).parent().find(">.startup-validation").hide();
        },
        errorPlacement: function (error, element) {
            $(element).parent().find(">.startup-validation").text(error.html());
        },
        messages: {
            tenantname: {
                required: window.TM.App.LocalizationContent.SiteNameValidator,
                isValidName: window.TM.App.LocalizationContent.AvoidSpecailCharacters
            }
        }
    });

    $("#tenant-registration-form").validate({
        errorElement: "span",
        onkeyup: function (element, event) {
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false;
            }
            else
                true;
        },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            tenantname: {
                isRequired: true,
                isValidName: true,
                maxlength: 255
            },
            tenantidentifier: {
                required: true,
                isValidIdentifier: true,
                maxlength: 255
            }
        },
        highlight: function (element) {
            $(element).closest(".txt-holder").addClass("has-error");
            $(element).closest(".text-holder").addClass("has-error");
            $(element).parent().find(">.startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest(".txt-holder").removeClass("has-error");
            $(element).closest(".text-holder").removeClass("has-error");
            $(element).parent().find(">.startup-validation").hide();
        },
        errorPlacement: function (error, element) {
            $(element).parent().find(">.startup-validation").html(error.html());
        },
        messages: {
            tenantname: {
                isRequired: window.TM.App.LocalizationContent.SiteNameValidator,
                isValidName: window.TM.App.LocalizationContent.AvoidSpecailCharacters,
                maxlength: window.TM.App.LocalizationContent.SiteValidation
            },
            tenantidentifier: {
                required: window.TM.App.LocalizationContent.SiteIdentifierValidator,
                isValidIdentifier: window.TM.App.LocalizationContent.UseNumbersLetters,
                maxlength: window.TM.App.LocalizationContent.SiteValidation
            }
        }
    });

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, "Please enter the name.");

    $.validator.addMethod("isValidName", function (value, element) {
        return parent.IsValidName("name", value);
    }, "Please avoid special characters.");

    $.validator.addMethod("isValidIdentifier", function (value, element) {
        return IsValidIdentifier(value);
    }, "Please avoid special characters.");

    $("#mysql-odbc-dsn").change(function () {
        $(this).closest(".txt-holder").removeClass("has-error");
        $(this).parents("#mysql-odbc-dropdown").find(".startup-validation").hide();
    });

    $(document).on("click", "#details-next", function () {
        $(this).attr("disabled", true);
        var tenantType = $("#tenant-type").val();
        if ($(".tenant-database-form").hasClass("hide") && $(this).hasClass("database") && $("#tenant-registration-form").find(".has-error").length == 0) {
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
        else if ($(this).hasClass("intermediate-db") && $(".tenant-database-form").find(".has-error").length == 0) {
            if ($(".tenant-database-form #db-content-holder").valid()) {
                if ($("input[name='databaseType']:checked").val() === "1") {
                    existingDbConfiguration(waitingPopUpElement);
                } else {
                    newDbConfiguration(waitingPopUpElement);
                }
                if (!$(".database-error").is(":visible")) {
                    preserveFormData();

                    var dropdownValue = $("#tenant-type").val();
                    if (dropdownValue === "BoldBIOnPremise") {
                        saveDatabaseValuesTemporarly();
                        var isNextDataStore = true;
                        $("#header-title").html(window.TM.App.LocalizationContent.ConfigureDataStore);
                        $("#header-description").html(window.TM.App.LocalizationContent.PullYourData + " " + dataConnectorsCount + "+ " + window.TM.App.LocalizationContent.DataConnectorsSaveOffline);
                        moveStepper("front", 3);
                        $(this).attr("data-form", "intermediate-db");
                        if (actionType.toLowerCase() == "edit") {
                            $(this).attr("value", "Update");
                            $(this).removeClass("intermediate-db").addClass("update");
                        } else {
                            $(this).attr("value", "Next");
                            if (isBoldBI) {
                                $(this).removeClass("intermediate-db").addClass("intermediate-db2");
                                $(this).attr("data-form", "");
                            }
                            else {
                                $(this).removeClass("intermediate-db").addClass("user");
                            }
                        }

                        $(this).removeAttr("disabled").addClass("next-alignment");
                        $(".tenant-database-form").addClass("tenant-intermediate-database-form").removeClass("tenant-database-form");
                        $(".skip-intermediate-db-container").show();

                        if (intermediateFormData != undefined) {
                            fillPreservedFormData(intermediateFormData);
                            $("a.my-sql-dropdown").parent().hide();
                        }
                        else if (databaseFormData != undefined) {
                            $("#skip-intermediate-db").trigger("click");
                            fillPreservedFormData(clonedDBFormData);
                            $("#txt-login, #txt-password-db, #new-db, #existing-db, #secure-sql-connection").attr("disabled", true);
                            $("#database-name").val("");
                            $("#database-name").attr("disabled", true).selectpicker("refresh");
                        }
                        else {
                            $("#skip-intermediate-db").trigger("click");
                        }

                        if (item === "dashboards") {
                            $("#no-need-datastore").css("display", "none");
                            $(".skip-intermediate-db-container").css("display", "block");
                        }
                        else {
                            $("#no-need-datastore").css({ "display": "block", "margin-top": "24px" });
                            $(".skip-intermediate-db-container").css("display", "none");
                        }
                    }
                    else {
                        saveDatabaseValuesTemporarly();
                        nextToStoragePage();
                    }

                    if ($("#skip-intermediate-db").is(":visible")) {
                        enableOrDisableDatabaseFormElements($("#skip-intermediate-db").is(":checked"));
                    }
                    else if (!$("#skip-intermediate-db").is(":visible")) {
                        enableOrDisableDatabaseFormElements(false);
                    }
                }              

                $('#details-next').removeAttr("disabled");
            }
            else {
                $(this).removeAttr("disabled");
            }
        }
        else if ($(".tenant-user-form").hasClass("hide") && $(this).hasClass("user") && $(".tenant-database-form").find(".has-error").length == 0 && $(".tenant-intermediate-database-form").hasClass("show") && !isBoldBI) {
            if (!($("#skip-intermediate-db").is(":visible") && $("#skip-intermediate-db").is(":checked")) && item === "dashboards" && $(".tenant-intermediate-database-form #db-content-holder").valid()) {
                if ($("input[name='databaseType']:checked").val() === "1") {
                    existingDbConfiguration(waitingPopUpElement);
                } else {
                    newDbConfiguration(waitingPopUpElement);
                }
            }
            if (!$(".database-error").is(":visible")) {
                saveDatabaseValuesTemporarly(true);
                preserveFormData(true);
                if ($(".tenant-intermediate-database-form #db-content-holder").valid() || ($("#skip-intermediate-db").is(":visible") && $("#skip-intermediate-db").is(":checked"))) {
                    showWaitingPopup(waitingPopUpElement);
                    $("#details-back").show().removeClass("back-button");
                    $("#header-title").html(window.TM.App.LocalizationContent.SelectSiteAdmin);
                    $("#header-description").text(window.TM.App.LocalizationContent.AdminControlSite);
                    $(".tenant-intermediate-database-form #system-settings-db-selection-container").hide();
                    moveStepper("front", 4);
                    nextToUserPage();
                }
            }
            else {
                $(this).removeAttr("disabled");
            }
            $(this).removeAttr("disabled");
        }
        else if ($(".tenant-user-form").hasClass("hide") && $(this).hasClass("intermediate-db2") && $(".tenant-database-form").find(".has-error").length == 0 && $(".tenant-intermediate-database-form").hasClass("show")) {
            if (!($("#skip-intermediate-db").is(":visible") && $("#skip-intermediate-db").is(":checked")) && item === "dashboards" && $(".tenant-intermediate-database-form #db-content-holder").valid()) {
                if ($("input[name='databaseType']:checked").val() === "1") {
                    existingDbConfiguration(waitingPopUpElement);
                } else {
                    newDbConfiguration(waitingPopUpElement);
                }
            }
            if (!$(".database-error").is(":visible")) {
                saveDatabaseValuesTemporarly(true);
                preserveFormData(true);
                if ($(".tenant-intermediate-database-form #db-content-holder").valid() || ($("#skip-intermediate-db").is(":visible") && $("#skip-intermediate-db").is(":checked"))) {
                    $(".tenant-intermediate-database-form #system-settings-db-selection-container").hide();
                    $(this).attr("data-form", "");
                    nextToStoragePage();
                }
                else {
                    $(this).removeAttr("disabled");
                }
            }
            $(this).removeAttr("disabled");
        }
        else if ($(this).hasClass("data-security") && $(".storage-form").find(".has-error").length == 0) {
            systemSettingsDetails.StorageType = $("input[name='IsBlobStorage']:checked").val();
            preserveStorageFormData();
            if ($("#blob-storage-form").valid()) {
                showWaitingPopup(waitingPopUpElement);
                $(".storage-form #system-settings-filestorage-container").hide();
                moveStepper("front", 5);
                nextToDataSecurityPage();
            }
            else {
                $(this).removeAttr("disabled");
            }
        }
        else if (($(".tenant-user-form").hasClass("hide") && $(this).hasClass("user")) && $(".storage-form").find(".has-error").length == 0) {
            $("#header-title").html(window.TM.App.LocalizationContent.SelectSiteAdmin).show();
            $("#header-description").text(window.TM.App.LocalizationContent.AdminControlSite).show();
            if (isBoldBI) {
                moveStepper("front", 6);
                systemSettingsDetails.TenantIsolation.IsEnabled = $("#isolation-enable-switch").is(":checked");
                systemSettingsDetails.TenantIsolation.IsolationCode = $("#site-isolation-code").val();
                systemSettingsDetails.CustomAttribute = addSiteAttribute;
                if (systemSettingsDetails.TenantIsolation.IsEnabled && !parent.ValidateIsolationCode(systemSettingsDetails.TenantIsolation.IsolationCode)) {
                    $("#isolation-code-validation").html(window.TM.App.LocalizationContent.IsolationCodeValidator);
                    $("#site-isolation-code").addClass("has-error");
                } else {
                    $("#isolation-code-validation").html("");
                    $("#site-isolation-code").removeClass("has-error");
                    nextToUserPage();
                }
            }
            else {
                systemSettingsDetails.StorageType = $("input[name='IsBlobStorage']:checked").val();
                preserveStorageFormData();
                if ($("#blob-storage-form").valid()) {
                    showWaitingPopup(waitingPopUpElement);
                    $(".storage-form #system-settings-filestorage-container").hide();
                    moveStepper("front", 4);
                    nextToUserPage();
                }
            }
            $(this).removeAttr("disabled");
        }

        else if ($(".tenant-user-form").hasClass("hide") && $(this).hasClass("update") && $(".tenant-database-form").find(".has-error").length == 0) {
            var proceed = $("#db-content-holder").valid();
            if (proceed) {
                showWaitingPopup(waitingPopUpElement);
                $("#details-back").show().removeClass("back-button");
                if ($("#database-type").val().toLowerCase() == "mssql" || $("#database-type").val().toLowerCase() == "postgresql" || $("#database-type").val().toLowerCase() == "mysql") {
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

        if (isNextDataStore == undefined) {
            $("a.my-sql-dropdown").parent().show();
        }

        if (tenantType === "BoldBIOnPremise" && $("#database-type").val().toLowerCase() == "mysql" && isNextDataStore != undefined && isNextDataStore && actionType != "edit") {
            $("a.my-sql-dropdown").parent().hide();
            $("#database-type").val($("#database-type option:first").val()).change();
            var isWindowsAuth = $("#check-windows").val() === "windows";
            $("#txt-login, #txt-password-db").attr("disabled", isWindowsAuth || $("#skip-intermediate-db").is(":checked"));
        }
    });

    $(document).on("click", "#details-back", function () {
        if ($("#details-next").hasClass("intermediate-db") || $("#details-next").hasClass("update")) {
            $(".tenant-user-form, #step-3").removeClass("show").addClass("hide");
            $(".tenant-database-form, #step-2").removeClass("show").addClass("hide");
            $("#details-back").hide().addClass("back-button");
            $(".tenant-registration-form, #step-1").removeClass("hide").addClass("show");
            $("#dialog-header").css("display", "none");
            $("#header-title").show();
            $("#header-title").html(window.TM.App.LocalizationContent.SiteCreation);
            if (item === "dashboards") {
                $("#header-description").html(window.TM.App.LocalizationContent.BoldBiMultiTenancy);
            }
            else {
                $("#header-description").html(window.TM.App.LocalizationContent.BoldReportsMultiTenancy);
            }

            $("#details-next").removeClass("user update").addClass("database");
            moveStepper("back", 1);
            $("#header-logo").css("display", "inline-block");
            $("#details-next").attr("value", window.TM.App.LocalizationContent.NextButton).removeClass("next-alignment");
        }
        else if ($("#details-next").hasClass("data-security")) {
            $("#details-next").attr("value", window.TM.App.LocalizationContent.NextButton);
            $(".tenant-registration-form, #step-1").removeClass("show").addClass("hide");
            $(".tenant-user-form, #step-3").removeClass("show").addClass("hide");
            $(".storage-form, #step-2").removeClass("show").addClass("hide");
            $(".data-security-form").removeClass("show").addClass("hide");
            $("#dialog-body-container").removeClass("grid-height-control");
            if (isBoldBI) {
                $("#header-title").show();
                $("#header-description").show();
                $("#header-title").html(window.TM.App.LocalizationContent.ConfigureDataStore);
                $("#header-description").html(window.TM.App.LocalizationContent.PullYourData + " " + dataConnectorsCount + "+ " + window.TM.App.LocalizationContent.DataConnectorsSaveOffline);
                $(".tenant-intermediate-database-form #system-settings-db-selection-container").show();
                $(".tenant-intermediate-database-form").removeClass("hide").addClass("show");
                $(".tenant-user-form, #step-3").removeClass("show").addClass("hide");
                $("#details-next").attr("value", window.TM.App.LocalizationContent.NextButton);
                $("#details-next").removeClass("submit").addClass("user").removeAttr("disabled");
                $("#dialog-body-container").addClass("grid-alignment");
                moveStepper("back", 3);
                $("#details-next").removeClass("data-security").addClass("intermediate-db2");
                $("#no-need-datastore").css("display", "none");
            }

            $("#details-back").show().removeClass("back-button");
            $(".tenant-database-form, #step-2").removeClass("hide").addClass("show");

            if (!isBoldBI) {
                $("#dialog-body-container").removeClass("grid-alignment");
                $("#stepper #current-step").text("2");
            }

            if ($("#database-type").val().toLowerCase() === "postgresql" || $("#database-type").val().toLowerCase() === "mysql") {
                $('#auth-type-dropdown').removeClass("show").addClass("hide");
            }
            else {
                $('#auth-type-dropdown').removeClass("hide").addClass("show");
            }

            $("#system-settings-db-selection-container").show();
            $("#no-need-datastore").css("display", "none");
            $("#search-area").hide();

            var dropdownValue = $("#tenant-type").val();
            if (dropdownValue === "BoldBIOnPremise") {
                var isNextDataStore = true;
            }
        }
        else if ($("#details-next").hasClass("intermediate-db2")) {
            $("#details-next").attr("value", window.TM.App.LocalizationContent.NextButton);
            $(".tenant-registration-form, #step-1").removeClass("show").addClass("hide");
            $(".tenant-user-form, #step-3").removeClass("show").addClass("hide");
            $(".storage-form, #step-2").removeClass("show").addClass("hide");
            $("#details-back").show().removeClass("back-button");
            $(".tenant-database-form, #step-2").removeClass("hide").addClass("show");
            $("#dialog-body-container").removeClass("grid-alignment");
            $("#dialog-body-container").removeClass("grid-height-control");
            $("#dialog-body-container").removeClass("grid-height-control");
            $("#stepper #current-step").text("2");

            if ($("#database-type").val().toLowerCase() === "postgresql" || $("#database-type").val().toLowerCase() === "mysql") {
                $('#auth-type-dropdown').removeClass("show").addClass("hide");
            }
            else {
                $('#auth-type-dropdown').removeClass("hide").addClass("show");
            }

            $("#system-settings-db-selection-container").show();
            $("#details-next").removeClass("user").addClass("intermediate-db");
            $("#no-need-datastore").css("display", "none");
            moveStepper("back", 2);
            $("#header-title").show();
            $("#header-title").html(window.TM.App.LocalizationContent.SelectDatabaseTitle);
            $("#header-description").text(window.TM.App.LocalizationContent.PlaceToCreateShare + " " + window.TM.App.LocalizationContent.DashboardsDot).show();
            $("#search-area").hide();
            $(".skip-intermediate-db-container").hide();
            $(".storage-form #system-settings-filestorage-container").hide();
            $(".tenant-intermediate-database-form").addClass("tenant-database-form").removeClass("tenant-intermediate-database-form");
            preserveFormData(true);
            enableOrDisableDatabaseFormElements(false);
            fillPreservedFormData(databaseFormData);
        }
        else if ($("#details-next").hasClass("user")) {
            if (isBoldBI) {
                moveStepper("back", 4);
            }
            else {
                moveStepper("back", 3);
            }
            $("#details-back").show().addClass("back-button");
            $("#search-area").hide();

            var dropdownValue = $("#tenant-type").val();
            if (dropdownValue === "BoldBIOnPremise") {
                if ($("#database-type").val().toLowerCase() === "postgresql" || $("#database-type").val().toLowerCase() === "mysql") {
                    $('#auth-type-dropdown').removeClass("show").addClass("hide");
                }
                else {
                    $('#auth-type-dropdown').removeClass("hide").addClass("show");
                }

                if (item === "dashboards") {
                    if (isBoldBI) {
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
                    }
                    else {
                        $("#no-need-datastore").css("display", "none");
                        $(".skip-intermediate-db-container").css("display", "block");
                    }
                }
                else {
                    $("#no-need-datastore").css({ "display": "block", "margin-top": "24px" });
                    $(".skip-intermediate-db-container").css("display", "none");
                }

                if (isBoldBI) {
                    $(".tenant-user-form, #step-3").removeClass("show").addClass("hide");
                    $(".data-security-form").removeClass("show").addClass("hide");
                    $("#details-next").attr("value", window.TM.App.LocalizationContent.NextButton);
                    $("#details-next").removeClass("user").addClass("data-security");
                }
                else {
                    $("#header-title").html(window.TM.App.LocalizationContent.ConfigureDataStore);
                    $("#header-description").html(window.TM.App.LocalizationContent.PullYourData + " " + dataConnectorsCount + "+ " + window.TM.App.LocalizationContent.DataConnectorsSaveOffline);
                    $(".tenant-intermediate-database-form #system-settings-db-selection-container").show();
                    $(".tenant-intermediate-database-form").removeClass("hide").addClass("show");
                    $(".tenant-user-form, #step-3").removeClass("show").addClass("hide");
                    $("#details-next").attr("value", window.TM.App.LocalizationContent.NextButton);
                    $("#details-next").removeClass("submit").addClass("user").removeAttr("disabled");
                    $("#dialog-body-container").addClass("grid-alignment");
                }
            }
            else {
                moveStepper("back", 2);
                $("#system-settings-db-selection-container").show();
                $("#header-title").show();
                $("#header-title").html(window.TM.App.LocalizationContent.SelectDatabaseTitle);
                $("#header-description").text(window.TM.App.LocalizationContent.PlaceToCreateShare + " " + window.TM.App.LocalizationContent.ReportsDot).show();
                $(".skip-intermediate-db-container").hide();
                $(".storage-form #system-settings-filestorage-container").hide();
                $("#details-next").removeClass("user").addClass("intermediate-db");
                $(".tenant-intermediate-database-form").addClass("tenant-database-form").removeClass("tenant-intermediate-database-form");
                preserveFormData(true);
                enableOrDisableDatabaseFormElements(false);
                fillPreservedFormData(databaseFormData);

                $("#details-back").show().removeClass("back-button");
                $(".tenant-database-form, #step-2").removeClass("hide").addClass("show");

                if (!isBoldBI) {
                    $("#dialog-body-container").removeClass("grid-alignment");
                    $("#stepper #current-step").text("2");
                }

                if ($("#database-type").val().toLowerCase() === "postgresql") {
                    $('#auth-type-dropdown').removeClass("show").addClass("hide");
                }
                else {
                    $('#auth-type-dropdown').removeClass("hide").addClass("show");
                }

                $("#system-settings-db-selection-container").show();
                $("#no-need-datastore").css("display", "none");
                $("#search-area").hide();

            }
        }
        else {
            if (isBoldBI) {
                moveStepper("back", 5);
            }
            else {
                moveStepper("back", 3);
            }
            $("#details-back").show().addClass("back-button");
            $("#search-area").hide();
            var dropdownValue = $("#tenant-type").val();
            if (dropdownValue === "BoldBIOnPremise") {
                if ($("#database-type").val().toLowerCase() === "postgresql") {
                    $('#auth-type-dropdown').removeClass("show").addClass("hide");
                }
                else {
                    $('#auth-type-dropdown').removeClass("hide").addClass("show");
                }

                if (isBoldBI) {
                    $("#header-title").hide();
                    $("#header-description").hide();
                    $(".tenant-user-form, #step-3").removeClass("show").addClass("hide");
                    $(".data-security-form").removeClass("hide").addClass("show");
                    $("#details-next").attr("value", window.TM.App.LocalizationContent.NextButton);
                    $("#details-next").removeClass("submit").addClass("user").removeAttr("disabled");
                    $("#dialog-body-container").removeClass("grid-alignment");
                    $("#dialog-body-container").removeClass("grid-height-control");
                }
                else {
                    $("#header-title").html(window.TM.App.LocalizationContent.ConfigureDataStore);
                    $("#header-description").html(window.TM.App.LocalizationContent.PullYourData + " " + dataConnectorsCount + "+ " + window.TM.App.LocalizationContent.DataConnectorsSaveOffline);
                    $(".tenant-intermediate-database-form #system-settings-db-selection-container").show();
                    $(".tenant-intermediate-database-form").removeClass("hide").addClass("show");
                    $(".tenant-user-form, #step-3").removeClass("show").addClass("hide");
                    $("#details-next").attr("value", window.TM.App.LocalizationContent.NextButton);
                    $("#details-next").removeClass("submit").addClass("user").removeAttr("disabled");
                    $("#dialog-body-container").addClass("grid-alignment").removeClass("grid-height-control");
                }
            }
            else {
                $("#header-title").hide();
                $("#header-description").hide();
                $(".tenant-user-form, #step-3").removeClass("show").addClass("hide");
                $(".storage-form #system-settings-filestorage-container").show();
                $(".storage-form, #step-2").removeClass("hide").addClass("show");
                $(".report-content").show();
                $("#details-next").attr("value", window.TM.App.LocalizationContent.NextButton);
                $("#details-next").removeClass("submit").addClass("user").removeAttr("disabled");
                $("#dialog-body-container").removeClass("grid-alignment");
                $("#dialog-body-container").removeClass("grid-height-control");
            }
        }
        Resize();
        ResizeHeightForDOM();
        if (isNextDataStore != undefined && isNextDataStore) {
            $("a.my-sql-dropdown").parent().hide();
        }
    });

    $(document).on("click", "#add-tenant-close", function () {
        if (parent.window.location.href.indexOf('?') > -1) {
            parent.history.pushState('', document.title, parent.window.location.pathname);
        }

        parent.$("#add-tenant-popup").ejDialog("close");
    });
    ResizeHeightForDOM();
});
function listUsersForAdminSelection() {
    var requestUrl = getAllUsersUrl;
    $("#add_admins_grid").ejGrid({
        dataSource: ej.DataManager({ url: requestUrl, adaptor: "UrlAdaptor" }),
        gridLines: ej.Grid.GridLines.None,
        allowSorting: true,
        allowSelection: true,
        enableAltRow: false,
        allowScrolling: true,
        scrollSettings: { height: gridHeight - (140 + $("#header-description").outerHeight()), allowVirtualScrolling: true },
        selectionType: ej.Grid.SelectionType.Multiple,
        selectionSettings: { selectionMode: ["row"] },
        enableRowHover: true,
        create: "fnCreateForAdmin",
        templateRefresh: "refreshTemplateForAdmin",
        actionBegin: "fnOnAddAdminGridActionBegin",
        actionComplete: "fnOnAddAdminGridActionComplete",
        rowDataBound: function () {
            var height = $(".e-gridcontent").height();
            if (height != null) {
                rowBound();
            }
        },
        dataBound: function () {
            $('[data-toggle="tooltip"]').tooltip();
        },
        columns: [
            {
                headerTemplateID: "#admin-checkbox-header-template",
                template: true,
                templateID: "#admin-checkbox-row-template",
                textAlign: ej.TextAlign.Center,
                width: 15,
                allowFiltering: false
            },
            {
                template: true,
                templateID: "#admin-template",
                headerText: window.TM.App.LocalizationContent.Name,
                width: 115,
                headerTemplateID: "#admin-header",
                field: "DisplayName",
                type: "string"
            }
        ]
    });
}

function fnCreateForAdmin() {
    $("#admin-checkbox-header").change(headCheckboxOnChangeForAdmin);
}

function fnOnAddAdminGridActionBegin(args) {
    isFirstRequest = true;
    var searchValue = $("#search-tenant-users").val();
    this.model.query._params.push({ key: "searchKey", value: searchValue });
    var filerSettings = [], i;

    if (args.model.filterSettings.filteredColumns.length > 0) {
        for (i = 0; i < args.model.filterSettings.filteredColumns.length; i++) {
            var column = args.model.filterSettings.filteredColumns[i];
            filerSettings.push({ "PropertyName": column.field, "FilterType": column.operator, "FilterKey": column.value });
        }

        this.model.query._params.push({ key: "filterCollection", value: filerSettings });
    }
}

function fnOnAddAdminGridActionComplete(args) {
    var gridObj = $("#add_admins_grid").data("ejGrid");
    var checkboxHeader = $("#admin-checkbox-header");
    checkboxHeader.prop("disabled", true).change(headCheckboxOnChangeForAdmin);
    gridObj.multiSelectCtrlRequest = true;
    gridObj.clearSelection();
    if (args.requestType == "paging" || args.requestType == "sorting" || args.requestType == "refresh" || args.requestType == "filtering" || args.requestType == "searching") {
        if (gridObj.model.currentViewData.length == 0) {
            checkboxHeader.prop("checked", false);
            checkboxHeader.prop("disabled", true);
            $(".no-user-warning").css("display", "block");
            window.setTimeout('$("#admin-account-submit-container").css("margin-top", $("#add_admins_grid").height() + $(".no-user-warning").height() + 155);');
        } else {
            $(".no-user-warning").css("display", "none");
            window.setTimeout('$("#admin-account-submit-container").css("margin-top", $("#add_admins_grid").height() + 135);');
        }
        if (typeof gridObj.model.currentViewData != 'undefined') {
            for (var i = 0; i < gridObj.model.currentViewData.length; i++) {
                var record = gridObj.model.currentViewData[i];
                var rowUniId = record.UserId;
                var index = jQuery.inArray(JSON.stringify(record.Email), $.map(selectedAdmins, JSON.stringify));
                if (index != -1) {
                    var rowIndex = $($("#add_admins_grid .checkbox-row[data-checked-id='" + rowUniId + "']").closest("td").parent()).index();
                    $("#add_admins_grid .checkbox-row#admin-row-check" + rowUniId).prop("checked", true);
                    gridObj.selectRows(rowIndex);
                }
            }
        }
        checkboxHeader.attr("disabled", gridObj.model.currentViewData.length == 0);
    }

    if (args.requestType === "paging" || args.requestType === "sorting" || args.requestType === "refresh" || args.requestType === "filtering") {
        if ((gridObj.model.selectedRecords.length) == gridObj.model.currentViewData.length && gridObj.model.currentViewData.length > 0) {
            checkboxHeader.prop("checked", true);
        } else {
            checkboxHeader.prop("checked", false);
        }
    }

    enableAccessButtonForAdmin();
    $("[data-toggle='tooltip']").tooltip();
    window.setTimeout('hideWaitingPopup($(".model-body"));', 500);
}

function refreshTemplateForAdmin() {
    $("#admin-checkbox-header").change(headCheckboxOnChangeForAdmin);
}

function headCheckboxOnChangeForAdmin() {
    $("#validation-user-error").hide();
    var gridObj = $("#add_admins_grid").data("ejGrid");
    if ($("#admin-checkbox-header").prop("checked") == true) {
        $(".checkbox-row").prop("checked", true);
        gridObj.multiSelectCtrlRequest = true;
        gridObj.selectRows(0, $(".checkbox-row").length);
        gridAdminData = gridObj.model.currentViewData;
        for (var i = 0; i < gridAdminData.length; i++) {
            var index = jQuery.inArray(JSON.stringify(gridAdminData[i].Email), $.map(selectedAdmins, JSON.stringify));
            if (index == -1) {
                selectedAdmins.push(gridAdminData[i].Email);
            }
        }

        if (isSafari) {
            $(".admin-checkbox-header-label").addClass("check");
        }
    }
    else {
        $(".checkbox-row").prop("checked", false);
        gridObj.clearSelection();
        gridAdminData = gridObj.model.currentViewData;
        for (var i = 0; i < gridAdminData.length; i++) {
            var index = jQuery.inArray(JSON.stringify(gridAdminData[i].Email), $.map(selectedAdmins, JSON.stringify));
            if (index != -1) {
                selectedAdmins.splice(index, 1);
            }
        }
        if (isSafari) {
            $(".admin-checkbox-header-label").removeClass("check");
        }
    }
    enableAccessButtonForAdmin();
}

function enableAccessButtonForAdmin() {
    $("#provide-admin-access-button").attr("disabled", selectedAdmins.length === 0);
}

function rowBound() {
    if (isFirstRequest) {
        isFirstRequest = false;
    }
}

$(document).on("change", ".checkbox-row", function () {
    var checkBoxList = $(".checkbox-row");
    var index = checkBoxList.index(this);
    var isChecked = $(this).is(":checked")
    $("#validation-user-error").hide();
    var gridObj = $("#add_admins_grid").data("ejGrid");
    var checkboxHeader = $("#admin-checkbox-header");
    $(".modal-dialog").addClass("fixed-pos");
    window.setTimeout('$(".modal-dialog").removeClass("fixed-pos");', 1);
    var currentEmail = $(this).attr("data-email");

    if (isChecked) {
        selectedAdmins.push(currentEmail);
        previousIndex.push(index);
        gridObj.selectRows(previousIndex, index);
    }
    else {
        var arrayIndex = selectedAdmins.indexOf(currentEmail);
        var previousArrayIndex = previousIndex.indexOf(index)
        selectedAdmins.splice(arrayIndex, 1);
        previousIndex.splice(previousArrayIndex, 1);
        gridObj.selectRows(previousIndex);
    }
    gridAdminData = gridObj.model.currentViewData;
    var userRowCheckedCount = 0;
    for (i = 0; i <= gridAdminData.length - 1; i++) {
        if ($($("#add_admins_grid .checkbox-row")[i]).is(":checked") == true) {
            userRowCheckedCount = userRowCheckedCount + 1;
        }
    }
    if (gridObj.getRows() != null) {
        checkboxHeader.prop("checked", gridAdminData.length === userRowCheckedCount);
    }
    enableAccessButtonForAdmin();
});


function onAddAdminsDialogClose() {
    var gridObj = $("#add_admins_grid").data("ejGrid");
    gridObj.clearSelection();
    selectedAdmins = [];
    $(".admin-checkbox-header").prop("checked", false);
    $(".checkbox-row").prop("checked", false);
}

$(document).on("click", ".su-search", function () {
    $("#validation-user-error").hide();
    $("#search-tenant-users").addClass("search-width");
    $(".close-icon").css("display", "block");
    $(".su-search").css("display", "none");
    $(".placeholder").removeClass("hide").addClass("show");
});

$(document).on("click", "#clear-search", function () {
    $("#validation-user-error").hide();
    $("#search-tenant-users").removeClass("search-width");
    $(".close-icon").css("display", "none");
    $(".su-search").css("display", "block").addClass("su-search-alignment");
    $(".placeholder").removeClass("show").addClass("hide");
    var gridObj = $("#add_admins_grid").data("ejGrid");
    gridObj.clearSelection();
    selectedAdmins = [];
    listUsersForAdminSelection();
    gridObj.refreshContent();
});

$(document).on("click", ".e-filtericon", function () {
    $(".e-caption").addClass("pull-left");
});

function addTenant() {
    var tenantInfo = {
        TenantType: $("#tenant-type").val(),
        TenantName: $("#tenant-name").val(),
        TenantIdentifier: $("#tenant-identifier").val(),
        DNS: $("#tenant-url").val()
    };

    postSystemSettingsData(systemSettingsDetails, azuredetails, intermediateDbDetails, selectedAdmins, tenantInfo, true);
}

function nextToUserPage() {
    if ($(".tenant-intermediate-database-form").find(".has-error").length == 0 || $("#skip-intermediate-db").is(":checked") || $(".storage-form").find(".has-error").length == 0) {
        $(".tenant-intermediate-database-form, #step-2").removeClass("show").addClass("hide");
        $(".tenant-registration-form, #step-1").removeClass("show").addClass("hide");
        $("#stepper #current-step").text("3");
        $(".tenant-user-form, #step-3").removeClass("hide").addClass("show");
        $("#details-next").attr("value", window.TM.App.LocalizationContent.CreateLaunchSite);
        $("#details-next").removeClass("user").addClass("submit").removeAttr("disabled");
        $(".data-security-form").removeClass("show").addClass("hide");
        $("#dialog-body-container").addClass("grid-alignment");
        $("#dialog-body-container").addClass("grid-height-control");
        if (isBoldBI) {
            $(".storage-form #system-settings-filestorage-container").hide();
            $(".storage-checkbox").hide();
            $(".storage-form, #step-2").removeClass("show").addClass("hide");
            $(".report-content").hide();
            $(".storage-form #blob-storage-form").addClass("site-creation");
        }
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
                tenantNameinDB = tenantInformation.TenantName;
                $("#tenant-name").val(tenantNameinDB);
                $("#tenant-identifier").val(tenantInformation.TenantIdentifier);
                $("#tenant-identifier").prop('disabled', true);
                if (data.TenantType === "BoldBIOnPremise") {
                    $("#tenant-type").html('<option value="BoldBIOnPremise" class="">Bold BI</option>');
                } else {
                    $("#tenant-type").html('<option value="BoldReportsOnPremise" class="">Bold Reports</option>');
                }
                $("#tenant-type").val(data.TenantType);
                $("#tenant-type").attr("disabled", true);

                var dropdownValue = $("#tenant-type").val();

                if (dropdownValue === "BoldReportsOnPremise") {
                    item = "reports";
                    $("#header-description").html(window.TM.App.LocalizationContent.BoldReportsMultiTenancy);
                    $(".site-default-text").html("").html("i.e. " + boldReportsUrl + tenantInformation.TenantIdentifier);
                }
                else if (dropdownValue === "BoldBIOnPremise") {
                    item = "dashboards";
                    $("#header-description").html(window.TM.App.LocalizationContent.BoldBiMultiTenancy);
                    $(".site-default-text").html("").html("i.e. " + boldBIUrl + tenantInformation.TenantIdentifier);
                }

            }
            if (data.DatabaseDetails != "" || data.DatabaseDetails != null || data.DatabaseDetails != undefined) {
                var databaseInformation = JSON.parse(data.DatabaseDetails);
                var authentication = "";
                if (databaseInformation.ServerType == 0) {
                    $('#database-type').attr("disabled", true).addClass("disabled");
                    $("#txt-servername").val(databaseInformation.ServerName);
                    $("#txt-dbname").val(databaseInformation.DatabaseName).prop("disabled", true);
                    $(".new-db,.existing-db").css("display", "none");
                    $("#secure-sql-connection").prop("checked", databaseInformation.SslEnabled);
                    if (databaseInformation.AuthenticationType == 0) {
                        authentication = "windows";
                        $("#txt-login, #txt-password-db").prop("disabled", true);
                    } else {
                        authentication = "sql";
                        $("#txt-login").val(databaseInformation.UserName);
                    }
                    $("#check-windows").find("option").each(function () {
                        if ($(this).val() == authentication) {
                            $(this).attr("selected", "selected");
                        }
                    });
                    $('.selectpicker').selectpicker('refresh');
                    $(".database-name").css("padding-top", "0");
                } else if (databaseInformation.ServerType === 1) {
                    $("#database-type").find("option").each(function () {
                        if ($(this).val().toLowerCase() === "mysql") {
                            $(this).attr("selected", "selected");
                        }
                    });
                    $('#auth-type-dropdown').removeClass("show").addClass("hide");
                    $('#port-number-dropdown').removeClass("show").addClass("hide");
                    $("#mysql-odbc-dropdown").addClass("show").removeClass("hide");
                    $('#database-type').attr("disabled", true).addClass("disabled");
                    $("#txt-servername").val(databaseInformation.ServerName);
                    $("#txt-dbname").val(databaseInformation.DatabaseName).prop("disabled", true);
                    $(".new-db,.existing-db").css("display", "none");
                    $("#txt-login").val(databaseInformation.UserName);
                    $('.selectpicker').selectpicker('refresh');
                    $(".database-name").css("padding-top", "0");
                } else if (databaseInformation.ServerType === 4) {
                    $("#database-type").find("option").each(function () {
                        if ($(this).val().toLowerCase() === "postgresql") {
                            $(this).attr("selected", "selected");
                        }
                    });
                    $('#auth-type-dropdown').removeClass("show").addClass("hide");
                    $('#port-number-dropdown').removeClass("hide").addClass("show");
                    $('#database-type').attr("disabled", true).addClass("disabled");
                    $("#txt-servername").val(databaseInformation.ServerName);
                    $("#txt-portnumber").val(databaseInformation.Port);
                    $("#txt-dbname").val(databaseInformation.DatabaseName).prop("disabled", true);
                    $(".new-db,.existing-db").css("display", "none");
                    $("#txt-login").val(databaseInformation.UserName);
                    $('.selectpicker').selectpicker('refresh');
                    $(".database-name").css("padding-top", "0");
                } else {
                    $("#database-type").find("option").each(function () {
                        if ($(this).val().toLowerCase() === "mssqlce") {
                            $(this).attr("selected", "selected");
                        }
                    });
                    $('#database-type').attr("disabled", true).addClass("disabled");
                    $('.selectpicker').selectpicker('refresh');
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

$(document).on("click", "#mysql-odbc-dropdown button.dropdown-toggle", function () {
    var dsn = $("#dsn-count").val();
    if (dsn <= 0) {
        $("#mysql-odbc-dropdown ul").html("<li class='no-results active' title='" + window.TM.App.LocalizationContent.NoDsn + "' style='display: list-item;'>" + window.TM.App.LocalizationContent.NoDsn + "</li>");
        $("#database-name-mysql").selectpicker("refresh");
    }
});

function updateTenant(waitingPopUpElement, connectionString) {
    var name = $("#tenant-name").val();
    $.ajax({
        type: "POST",
        url: updateTenantDetailsUrl,
        data: { tenantId: tenantId, tenantName: name, databaseDetails: connectionString },
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
    if ($(".tenant-database-form, .tenant-intermediate-database-form, .storage-form, .data-security-form").hasClass("show")) {
        var height = $(window).height() - $(".modal-header").height() - 63;
        $(".modal-tenant-body").addClass("adjustment");
        $(".adjustment").css("height", height);
    } else {
        $(".modal-tenant-body").removeClass("adjustment");
    }
}

$(document).on("click", ".sort", function () {
    var gridObj = $("#add_admins_grid").data("ejGrid");
    showWaitingPopup($(".model-body"));
    var sorting = $("#order").attr("data-value");
    if (gridObj != undefined) {
        gridObj.model.sortSettings.sortedColumns = [{ field: "Name", direction: sorting }];
        gridObj.refreshContent();
        if (sorting == "ascending") {
            $("#order").attr("data-value", "descending");
        } else {
            $("#order").attr("data-value", "ascending");
        }
        window.setTimeout('hideWaitingPopup($(".model-body"));', 500);
    }
});

function ResizeHeightForDOM() {
    var height = $(window).height() - $(".modal-header").height() - 210;
    var modalheight = $("#dialog-body-container").height() + $("#dialog-body-header").height() + 50;
    if ($(".tenant-registration-form").hasClass("show")) {
        height = $(window).height() - $(".modal-header").height() - 210 + 100;
        modalheight = $("#dialog-body-container").height() + $("#dialog-body-header").height() + 102;
    }

    if ($(".storage-form").hasClass("show")) {
        if ($("#file-storage").is(":checked")) {
            height = $(window).height() - $(".modal-header").height() - 210;
            modalheight = $("#dialog-body-container").height() + $("#dialog-body-header").height() + 102;
        } else {
            height = $(window).height() - $(".modal-header").height() - 210 + 250;
            modalheight = $("#dialog-body-container").height() + $("#dialog-body-header").height() + 102;
        }
    }

    if ($(".tenant-user-form").hasClass("show")) {
        height = $(window).height() - $(".modal-header").height() - 210;
        modalheight = $("#dialog-body-container").height() + $("#dialog-body-header").height() + 102;
    }

    if ($(".data-security-form").hasClass("show")) {
        height = $(window).height() - $(".modal-header").height() - 210;
        modalheight = $("#dialog-body-container").height() + $("#dialog-body-header").height() + 102;
    }

    if (height > modalheight) {
        $(".dialog-body-div").css("height", height);
    } else {
        $(".dialog-body-div").css("height", modalheight);
    }
    gridHeight = height;
}

function saveDatabaseValuesTemporarly(isInterMediateDb) {
    if (isInterMediateDb) {
        intermediateDbDetails = getDatabaseFormValues(true);
    }
    else {
        systemSettingsDetails = getDatabaseFormValues();
    }
}

function preserveFormData(isIntermediateDb) {
    if (!isIntermediateDb) {
        databaseFormData = {
            databaseType: $("#database-type").val(),
            serverName: $("#txt-servername").val(),
            authenticationType: $("#check-windows").val(),
            portNumber: $("#txt-portnumber").val(),
            dsn: $("#mysql-odbc-dsn").val(),
            userName: $("#txt-login").val(),
            password: $("#txt-password-db").val(),
            isNewDbChecked: $("#new-db").is(":checked"),
            databaseName: $("#new-db").is(":checked") ? $("#txt-dbname").val() : $("#database-name").val(),
            sslEnabled: $("#secure-sql-connection").is(":checked")
        };
        if (intermediateFormData == undefined) {
            clonedDBFormData = {
                databaseType: $("#database-type").val(),
                serverName: $("#txt-servername").val(),
                authenticationType: $("#check-windows").val(),
                portNumber: $("#txt-portnumber").val(),
                dsn: $("#mysql-odbc-dsn").val(),
                userName: $("#txt-login").val(),
                password: $("#txt-password-db").val(),
                isNewDbChecked: true,
                databaseName: "",
                sslEnabled: $("#secure-sql-connection").is(":checked")
            };
        }
    }
    else {
        intermediateFormData = {
            isSkipIntermediateDb: $("#skip-intermediate-db").is(":checked"),
            databaseType: $("#database-type").val(),
            serverName: $("#txt-servername").val(),
            authenticationType: $("#check-windows").val(),
            portNumber: $("#txt-portnumber").val(),
            userName: $("#txt-login").val(),
            password: $("#txt-password-db").val(),
            isNewDbChecked: $("#new-db").is(":checked"),
            databaseName: $("#new-db").is(":checked") ? $("#txt-dbname").val() : $("#database-name").val(),
            sslEnabled: $("#secure-sql-connection").is(":checked")
        };
    }
}

function fillPreservedFormData(formData) {
    if (formData.isSkipIntermediateDb || formData.databaseType.toLowerCase() == "mysql" && !($("#details-next").hasClass("intermediate-db"))) {
        if (!$("#skip-intermediate-db").is(":checked")) {
            $("#skip-intermediate-db").trigger("click");
        }
        else {
            enableOrDisableDatabaseFormElements(true);
        }
    }
    else {
        $("#database-type").val(formData.databaseType).selectpicker("refresh");
        $("#txt-servername").val(formData.serverName);

        if (formData.databaseType.toLowerCase() === "mssql") {
            $("#check-windows").val(formData.authenticationType).trigger("change");
            $("#auth-type-dropdown").removeClass("hide").addClass("show");
        }
        else {
            $("#auth-type-dropdown").removeClass("show").addClass("hide");
        }

        if (formData.databaseType.toLowerCase() === "postgresql") {
            $("#txt-portnumber").val(formData.portNumber);
            $('#port-number-dropdown').removeClass("hide").addClass("show");
        }
        else {
            $('#port-number-dropdown').removeClass("show").addClass("hide");
        }

        if (formData.databaseType.toLowerCase() === "mysql") {
            $("#mysql-odbc-dsn").val(formData.dsn).selectpicker("refresh");
            $("#mysql-odbc-dropdown").removeClass("hide").addClass("show");
        }
        else {
            $("#mysql-odbc-dropdown").removeClass("show").addClass("hide");
        }

        if (formData.authenticationType.toLowerCase() === "sql") {
            $("#txt-login").val(formData.userName);
            $("#txt-password-db").val(formData.password);
        }

        if (formData.isNewDbChecked) {
            $("#new-db").trigger("click");
            $("#txt-dbname").val(formData.databaseName);
        }
        else {
            $("#existing-db").trigger("click");
            $("#database-name").val(formData.databaseName).selectpicker("refresh");
        }

        $('#secure-sql-connection').prop('checked', formData.sslEnabled);
    }
}

function moveStepper(direction, stepToMove) {
    if (direction != undefined) {
        if (direction.toLowerCase() === "front") {
            $(".selector-icons .selector-panel:nth-child(" + stepToMove + ")").prev().addClass("selectedOval");
            $(".selector-icons .selector-panel:nth-child(" + stepToMove + ")").find(".circle").addClass("selectedClass");
        }
        else if (direction.toLowerCase() === "back") {
            $(".selector-icons .selector-panel:nth-child(" + (stepToMove + 1) + ")").find(".circle").removeClass("selectedClass");
            $(".selector-icons .selector-panel:nth-child(" + stepToMove + ")").removeClass("selectedOval");
        }
    }
}

function tenantNameIdentiferCheck(tenantName, tenantIdentifier) {
    $("#tenant-name-validation-error, #tenant-identifier-validation-error").css("display", "none");
    $("#tenant-name,#tenant-identifier, #details-next").attr("disabled", true);
    if (IsValidIdentifier($.trim(tenantIdentifier))) {
        $.ajax({
            type: "POST",
            url: 'CheckTenantNameIdentifierExist',
            data: { tenantName: tenantName, tenantIdentifier: tenantIdentifier },
            async: false,
            success: function (data) {
                hideWaitingPopup(waitingPopUpElement);
                if (data.Result || data.ResultIdentifier) {
                    if (data.Value != null && data.ResultIdentifier && actionType.toLowerCase() != "edit") {
                        $("#tenant-identifier").closest("div").addClass("has-error");
                        $("#tenant-identifier-validation-error").css("display", "block");
                        $("#tenant-identifier-validation-error").html(data.Value);
                    }
                    if (data.Result && tenantName != tenantNameinDB) {
                        $("#tenant-name").closest("div").addClass("has-error");
                        $("#tenant-name-validation-error").css("display", "block");
                        $("#tenant-name-validation-error").html(window.TM.App.LocalizationContent.SiteNameExists);
                    } else {
                        if (actionType.toLowerCase() == "edit") {
                            $("#tenant-name").closest("div").removeClass("has-error");
                            $("#tenant-name-validation-error").css("display", "none");
                            nextToDatabasePage();
                        }
                    }
                } else {
                    $("#tenant-name, #tenant-identifier").closest("div").removeClass("has-error");
                    $("#tenant-name-validation-error,#tenant-identifier-validation-error").css("display", "none");
                    nextToDatabasePage();
                }
                if (actionType.toLowerCase() != "edit") {
                    $("#tenant-name, #details-next, #tenant-identifier").removeAttr("disabled");
                } else {
                    $("#tenant-name, #details-next").removeAttr("disabled");
                }
            }
        });
    } else {
        $("#tenant-identifier").closest("div").addClass("has-error");
        $("#tenant-identifier-validation-error").css("display", "block");
        $("#tenant-identifier-validation-error").html(window.TM.App.LocalizationContent.UseNumbersLetters);
        if (actionType.toLowerCase() != "edit") {
            $("#tenant-name, #details-next, #tenant-identifier").removeAttr("disabled");
        } else {
            $("#tenant-name, #details-next").removeAttr("disabled");
        }
        hideWaitingPopup(waitingPopUpElement);
    }
}


function IsValidIdentifier(inputString) {
    var regex = /^[a-zA-Z0-9-]+$/;
    return regex.test(inputString);
}

function nextToDatabasePage() {
    $("#dialog-header").css("display", "block");
    $("#header-logo").css("display", "none");
    $("#header-title").html(window.TM.App.LocalizationContent.SelectDatabaseTitle);
    $("#header-description").html(window.TM.App.LocalizationContent.PlaceToCreateShare + " " + item + ".");
    $("#used-tenant-name").html($("#tenant-name").val());
    if ($("#tenant-type").val() === "BoldReportsOnPremise") {
        $("#used-tenant-identifier").html(boldReportsUrl + $("#tenant-identifier").val());
    }
    else if ($("#tenant-type").val() === "BoldBIOnPremise") {
        $("#used-tenant-identifier").html(boldBIUrl + $("#tenant-identifier").val());
    }

    moveStepper("front", 2);
    $(".tenant-registration-form, #step-1").removeClass("show").addClass("hide");
    $(".tenant-user-form, #step-3").removeClass("show").addClass("hide");
    $("#details-back").show().removeClass("back-button");
    $("#stepper #current-step").text("2");
    $(".tenant-database-form, #step-2").removeClass("hide").addClass("show");
    $("#dialog-body-container").removeClass("grid-alignment");

    if ($("#database-type").val().toLowerCase() === "postgresql" || $("#database-type").val().toLowerCase() === "mysql") {
        $('#auth-type-dropdown').removeClass("show").addClass("hide");
    }
    else {
        $('#auth-type-dropdown').removeClass("hide").addClass("show");
    }

    $(".tenant-database-form #system-settings-db-selection-container").show();
    $(".tenant-database-form #db-content-holder").addClass("site-creation");
    if (actionType.toLowerCase() === "edit") {
        $("#details-next").attr("value", window.TM.App.LocalizationContent.UpdateButton);
        $("#details-next").removeClass("database").addClass("update");
    } else {
        $("#details-next").attr("value", window.TM.App.LocalizationContent.NextButton);
        $("#details-next").removeClass("database").addClass("intermediate-db");
    }

    $("#details-next").removeAttr("disabled").addClass("next-alignment");
}

function nextToStoragePage() {
    var dropdownValue = $("#tenant-type").val();
    $("#header-title").hide();
    $("#header-description").hide();
    if (dropdownValue === "BoldBIOnPremise") {
        moveStepper("front", 4);
    } else {
        moveStepper("front", 3);
    }
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
        $("#blob-storage").parent().css("margin-left", "130px");
        $("#blob-storage-form").slideDown("slow");
        $(".storage-form #blob-storage-form").addClass("site-creation");
        $("#dialog-body-container").removeClass("grid-alignment");
        $("#details-next").attr("value", "Next");
        if (dropdownValue === "BoldBIOnPremise") {
            $("#details-next").removeClass("intermediate-db2").addClass("data-security");
        }
        else {
            $("#details-next").removeClass("intermediate-db").addClass("data-security");
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
        $(".storage-form, #step-2").removeClass("hide").addClass("show");
        $(".storage-form #system-settings-filestorage-container").show();
        $(".storage-form #blob-storage-form").addClass("site-creation");
        $("#dialog-body-container").removeClass("grid-alignment");
        $("#details-next").attr("value", "Next");
        if (dropdownValue === "BoldBIOnPremise") {
            $("#details-next").removeClass("intermediate-db2").addClass("data-security");
            $(".report-content").html("Choose a storage system for storing the resources of Bold BI Server site. A complete list of resources generated by Bold BI Server can be viewed " + '<a target="_blank" href="https://redirect.boldbi.com/?id=58">' + "here." + '<a>');
        }
        else {
            $("#details-next").removeClass("intermediate-db").addClass("user");
            $(".report-content").html("Choose a storage system for storing the resources of Report Server site. A complete list of resources generated by Report Server can be viewed " + '<a target="_blank" href="https://redirect.boldbi.com/?id=8032">' + "here." + '<a>');
        }
        $("#details-next").removeAttr("disabled").addClass("next-alignment");
    }
}

function nextToDataSecurityPage() {
    $("#header-title").hide();
    $("#header-description").hide();
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
    window.endpoint = $("#txt-endpoint").val();
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
        $("#site-isolation-code").removeAttr("disabled");
        $("#isolation-code").focus();
    } else {
        $("#site-isolation-code").attr('disabled', 'disabled');
        $("#isolation-code-validation").html("");
        $("#site-isolation-code").removeClass("has-error");
    }
}

$(document).on("focusin keyup", "#site-isolation-code", function (e) {
    var isolationCode = $("#site-isolation-code").val().trim();
    if (!parent.ValidateIsolationCode(isolationCode)) {
        $("#isolation-code-validation").html(window.TM.App.LocalizationContent.IsolationCodeValidator);
        $("#site-isolation-code").addClass("has-error");
    } else {
        $("#isolation-code-validation").html("");
        $("#site-isolation-code").removeClass("has-error");
    }
});