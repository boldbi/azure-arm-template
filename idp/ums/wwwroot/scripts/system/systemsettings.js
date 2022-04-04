var userAgent = navigator.userAgent;
var regexIe8 = new RegExp("Trident(\/4.0)|(Trident\/5.0)");
var isKeyUp = false;
var ruleName;
var rules;
var errorContent = "";
var databaseValidationMessage = window.TM.App.LocalizationContent.OneOrMoreErrors + " " + window.TM.App.LocalizationContent.Click + " " + "<a id='know-more-error'>" + window.TM.App.LocalizationContent.Here + "</a> " + window.TM.App.LocalizationContent.KnowMore + ".";
var systemSettingsDetails, intermediateDbDetails;
var isNewServerDB = true, isNewIntermediateDB = true;
var storagetype = window.storageType;
var storageButtonValue;
var azureDataforBoldbi = null;

$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
    $("#blob-storage-form").hide();
    $("#report-storage").hide();
    $("#system-settings-user-account-container").hide();

    var messageBoxDialog = new ej.popups.Dialog({
        header: "title",
        width: "450px",
        height: "auto",
        visible: false,
        allowDragging: true,
        isModal: true,
        footerTemplate: "footer",
        close: "onMessageDialogClose"
    });
    messageBoxDialog.appendTo("#messageBox");


    var autoDeploymentResponseDialog = new ej.popups.Dialog({
        header: window.TM.App.LocalizationContent.AutoDeployment,
        content: document.getElementById("auto-deployment-response-dialog-content"),
        showCloseIcon: false,
        buttons: [
            { click: skipAutoDeploy, buttonModel: { content: window.TM.App.LocalizationContent.OKButton } }
        ],
        width: '400px',
        height: '200px',
        isModal: true,
        visible: false
    });
    autoDeploymentResponseDialog.appendTo("#auto-deployment-response");

    $("#default-tab").popover({
        html: true,
        trigger: 'hover',
        placement: "right",
        content: isSiteCreation ? window.TM.App.LocalizationContent.SimpleTabSiteCreationMsg : window.TM.App.LocalizationContent.SimpleTabStartupMsg
    });

    $("#advanced-tab").popover({
        html: true,
        trigger: 'hover',
        placement: "right",
        content: isSiteCreation ? window.TM.App.LocalizationContent.AdvanceTabSiteCreationMsg : window.TM.App.LocalizationContent.AdvanceTabStartupMsg
    });

    $("a[data-toggle='tab']").on('click', function (e) {
        removeError();
        if ($(this).attr("id") == "advanced-tab") {
            $("#default-tab").removeClass("active");
            $("#advanced-tab").addClass("active");
            if (!isSiteCreation) {
                $("#label_txt-dbname").html(window.TM.App.LocalizationContent.IDDatabaseName);
                $("#label_database-name").html(window.TM.App.LocalizationContent.IDDatabaseName);
            }
            $("#simple_tab_db_name").hide();
            $("#advanced_tab_db_name").show();
            if (getDropDownValue("database-type").toLowerCase() == "mysql" || !isBoldBI && isSiteCreation && isBoldReportsTenantType() || !isBoldBI && !isSiteCreation) {
                hideDataStore();
            }
            else {
                showDataStore();
            }

            if (!isSiteCreation) {
                $(".db-name-info").html(window.TM.App.LocalizationContent.DatabaseInfo);
                $("#simple_tab_db_name").show();
                prefillDbNames();
            }

            isSimpleModeValue = "false";
        }
        else {
            $("#default-tab").addClass("active");
            $("#advanced-tab").removeClass("active");
            $("#simple_tab_db_name").show();
            if (!isSiteCreation) {
                $("#label_txt-dbname").html(window.TM.App.LocalizationContent.DatabaseName);
                $("#label_database-name").html(window.TM.App.LocalizationContent.DatabaseName);
            }
            $(".db-name-info").html(isBoldBI ? window.TM.App.LocalizationContent.DatabaseInfoBI : window.TM.App.LocalizationContent.DatabaseInfoReports);
            if (!isSiteCreation) {
                $(".db-name-info").html(isBoldBI ? window.TM.App.LocalizationContent.DatabaseInfoBI3 : window.TM.App.LocalizationContentDatabaseInfoReports2);
                prefillDbNames();
            }
            $("#advanced_tab_db_name").hide();
            isSimpleModeValue = "true";
        }
        if (isSiteCreation) {
            ResizeHeightForDOM();
        }
    });

    if ($('meta[name=has-drm-configuration]').attr("content") == "true") {
        if (typeof isDockerOrk8s != "undefined" && isDockerOrk8s) {
            autoDeploy();
        }
        else {
            $("#image-parent-container .startup-image").hide().attr("src", adminSetupImageUrl).fadeIn();
            $(".startup-content").fadeIn();
            $("#system-settings-welcome-container").hide();
            $(".welcome-content").addClass("display-none");
            $("#system-settings-offline-license-container").hide();
            $('#auth-type-dropdown').removeClass("hide").addClass("show");
            $("#system-settings-user-account-container").slideDown("slow");
            autoFocus("txt-firstname");
        }
    }

    $("#db-content-holder,#db-config-submit").show();
    $("#advanced_tab_db_name").hide();
    $(".sql-server-existing-db").hide();

    $(window).resize(function () {
        changeFooterPostion();
    });

    changeFooterPostion();

    $("#db-content-holder").on("keyup", "input", function (event) {
        if (event.keyCode == 13 && $(this).hasClass("site-creation")) {
            $("input[name='databaseType']:checked").val() === "1" ? $("#sql-existing-db-submit, #sql-existing-ds-db-submit").click() : $("#db-config-submit, #ds-db-config-submit").click();
        }
    });
});

function getFormData() {
    var serverType = getDropDownValue("database-type");
    var serverName = $("#txt-servername").val();
    var database = getDropDownValue("database-type").toLowerCase();
    var portNumber = $("#txt-portnumber").val();
    var maintenanceDb = $('#maintenance-db').val();
    var enableSSL = $("#secure-sql-connection").is(":checked");
    var additionalParameters = $("#additional-parameter").val();

    switch (database) {
        case "mssqlce":
            var prefix = $("#tenant-table-prefix").val();
            break;
        case "mssql":
            var prefix = ($("#table-prefix").val() === "" || $("#new-db").is(":checked")) ? $("#tenant-table-prefix").val() : $("#table-prefix").val();
            var databaseName = $("#new-db").is(":checked") ? $("#txt-dbname").val() : $("#databaseName").val();
            break;
        case "mysql":
            var prefix = ($("#table-prefix").val() === "" || $("#new-db").is(":checked")) ? $("#tenant-table-prefix").val() : $("#table-prefix").val();
            var databaseName = $("#new-db").is(":checked") ? $("#txt-dbname").val() : $("#database-name").val();
            break;
        case "oracle":
            var prefix = ($("#table-prefix-oracle").val() === "" || $("#new-db-oracle").is(":checked")) ? $("#tenant-table-prefix").val() : $("#table-prefix-oracle").val();
            var databaseName = $("#new-db-oracle").is(":checked") ? $("#client-username").val() : $("#database-name-oracle").val();
            break;
        case "postgresql":
            var prefix = ($("#table-prefix").val() === "" || $("#new-db").is(":checked")) ? $("#tenant-table-prefix").val() : $("#table-prefix").val();
            var databaseName = $("#new-db").is(":checked") ? $("#txt-dbname").val() : $("#database-name").val();
            break;
    }

    var isNewDatabase = $("#new-db").is(":checked");

    var authenticationType = 0;
    if (!(getRadioButtonValue("checkWindows") == "windows"))
        authenticationType = 1;

    var globalAdmin = {
        UserName: $("#txt-username").val(),
        FirstName: $("#txt-firstname").val(),
        LastName: $("#txt-lastname").val(),
        Email: $("#txt-emailid").val(),
        Password: $("#new-password").val()
    };
    var systemSettingsData = {
        SQLConfiguration:
        {
            ConnectionString: window.connectionString,
            IntermediateServerConnectionString: window.intermediateServerConnectionString,
            TenantServerConnectionString: window.tenantServerConnectionString,
            ServerType: serverType,
            ServerName: serverName,
            Port: portNumber,
            MaintenanceDatabase: maintenanceDb,
            AuthenticationType: authenticationType,
            DatabaseName: databaseName,
            Prefix: prefix,
            SslEnabled: enableSSL,
            IsNewDatabase: isNewDatabase,
            AdditionalParameters: additionalParameters
        },
        StorageType: window.storageType
    };

    var azureData = {
        AzureBlobStorageUri: window.endpoint,
        AzureBlobStorageContainerName: window.containername,
        ConnectionType: window.connectionType,
        ConnectionString: window.azureconnectionString,
        AccountName: window.accountname,
        AccessKey: window.accesskey
    };

    var tenantInfo = {
        TenantType: getTenantType(),
        TenantName: isBoldBI ? "Bold BI Enterprise Dashboards" : "Bold Reports Enterprise Reporting",
        TenantIdentifier: "site1",
    };

    $("#global-admin-details").val(JSON.stringify(globalAdmin));
    $("#system-settings-data").val(JSON.stringify(systemSettingsData));
    $("#azure-data").val(JSON.stringify(azureData));
    $("#tenant-info").val(JSON.stringify(tenantInfo));
}

function validateEmail(email, eventType) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function changeFooterPostion() {
    if (window.innerHeight - $("#system-settings-general").height() > 70) {
        $("#base-footer-div").addClass("footer-fixed");
    } else {
        $("#base-footer-div").removeClass("footer-fixed");
    }
}

$(document).on("focus", "input[type=text],input[type=password]", function () {
    if (regexIe8.test(userAgent)) {
        $(this).next(".placeholder").removeClass("show").addClass("hide");
    }
});

$(document).on("focusout", "input[type=text],input[type=password]", function () {
    if (regexIe8.test(userAgent) && $(this).val() === "") {
        $(this).next(".placeholder").removeClass("hide").addClass("show");
    }
});

$(document).on("focus", ".placeholder", function () {
    $(this).prev("input").focus();
});

function addPlacehoder(object) {
    if (regexIe8.test(userAgent)) {
        $(object).find("input[type=text],input[type=password]").each(function () {
            if ($(this).val() === "") {
                $($("<div>", { "class": "placeholder", text: $(this).attr("placeholder") })).insertAfter(this).show();
            }
            else {
                $($("<div>", { "class": "placeholder", text: $(this).attr("placeholder") })).insertAfter(this).hide();
            }
        });
    }
}

$(document).on("click", "#info-icon-postgressql", function () {
    $("#prefix-message-postgresql").css("display", "block");
});

$(document).on("click", "#info-icon", function () {
    $("#prefix-message").css("display", "block");
});

function DomResize() {
    //$("#startup-page-conatiner").height($("#system-settings-general").height() + $("#base-footer-div").height());
}

//To  stop animation in radio-button on page rendering
$(document).on("click", ".css-radio", function () {
    $(this).siblings("label").removeClass("notransition");
});
$(document).on("click", "#database-type-dropdown, .proceed-button", function () {
    $(".css-radio").siblings("label").addClass("notransition");
});

function existingDbConfiguration(element) {
    removeError();
    DomResize();
    checkingExistingDB(element);
}

function checkingExistingDB(element) {
    $('#details-next').attr("disabled", true);

    window.serverName = $("#txt-servername").val();
    window.portNumber = $("#txt-portnumber").val();
    window.maintenanceDb = $('#maintenance-db').val();
    window.IsWindowsAuthentication = getRadioButtonValue("checkWindows") == "windows";
    window.login = $("#txt-login").val();
    window.password = $("#txt-password-db").val();
    var databaseType = getDropDownValue("database-type");

    window.databaseName = $("#database-name").val();
    window.serverDatabaseName = $("#server-existing-dbname").val();
    window.intermediateDatabaseName = $("#imdb-existing-dbname").val();
    window.sslEnabled = $("#secure-sql-connection").is(":checked");
    window.additionalParameters = $("#additional-parameter").val();
   
    $.ajax({
        type: "POST",
        url: connectDatabaseUrl,
        async: false,
        data: {
            data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, MaintenanceDatabase: window.maintenanceDb, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, ServerDatabaseName: window.serverDatabaseName, IntermediateDatabaseName: window.intermediateDatabaseName, sslEnabled: window.sslEnabled, IsNewDatabase: false, TenantType: getTenantType(), additionalParameters: window.additionalParameters }),
            isSimpleMode: isSimpleModeSelction(),
            isSiteCreation: true
        },
        success: function (result) {
            if (result.Data.key) {
                window.connectionString = result.Data.connectionResponse.ServerConnectionString;
                window.tenantServerConnectionString = result.Data.connectionResponse.TenantServerConnectionString;
                window.intermediateServerConnectionString = result.Data.connectionResponse.IntermediateServerConnectionString;
                var databaseType = getDropDownValue("database-type");
                $.ajax({
                    type: "POST",
                    url: checkTableExistsUrl,
                    async: false,
                    data: {
                        data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, MaintenanceDatabase: window.maintenanceDb, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, ServerDatabaseName: window.serverDatabaseName, IntermediateDatabaseName: window.intermediateDatabaseName, sslEnabled: window.sslEnabled, TenantType: getTenantType(), IsNewDatabase: false, additionalParameters: window.additionalParameters }),
                        isSimpleMode: isSimpleModeSelction(),
                        isSiteCreation: true
                    },
                    success: function (result) {
                        var items = result.Data.value;
                        if (result.Data.key && items.length > 0) {

                            hideWaitingPopup(element);
                            $('#details-next').removeAttr("disabled");

                            var html = window.TM.App.LocalizationContent.TablesAlreadyExists;
                            html += "<ol class='list-area'>";
                            for (var t = 0; t < items.length; t++) {
                                html += "<li>" + items[t] + "</li>";
                            }
                            html += "</ol>";
                            errorContent = html;
                            $(".database-error").html(databaseValidationMessage).show();

                        } else if (!result.Data.key && items.length <= 0) {
                            delete window.serverName;
                            delete window.portNumber;
                            delete window.login;
                            delete window.password;
                            delete window.databaseName;
                            delete window.sslEnabled;
                            hideWaitingPopup(element);
                            $('#details-next').removeAttr("disabled");
                            changeFooterPostion();
                            $(".db-connect-outer-container").find(".title").html(window.TM.App.LocalizationContent.DatabaseCreation + "!");
                            $("#database-name").focus();
                        } else {
                            $('#details-next').removeAttr("disabled");
                            hideWaitingPopup(element);
                            errorContent = result.Data.value;
                            $(".database-error").html(databaseValidationMessage).show();
                        }
                    }
                });
            } else {

                hideWaitingPopup(element);
                $('#details-next').removeAttr("disabled");
                errorContent = result.Data.value;
                $(".database-error").html(databaseValidationMessage).show();
            }
        }
    });
}

function newDbConfiguration(element) {
    removeError();
    $('#details-next').attr("disabled", true);
    checkingNewDBConnection(element);
}

function checkingNewDBConnection(element, actionType) {
    var result = connectDatabase(element, actionType);
    
    if (result.Data != undefined && result.Data.key && actionType == "edit") {
        var isValidDBDetail = false;
        $.ajax({
            type: "POST",
            url: checkValidDatabaseUrl,
            async: false,
            data: { tenantId: tenantId, connectionString: window.connectionString },
            success: function (response) {
                if (response.Status) {
                    isValidDBDetail = true;
                }
                else {
                    if (result.Data != undefined) {
                        result.Data.value = response.Data;
                    }
                    else {
                        errorContent = response.Data;
                    }
                }
            }
        });
    }

    if (result.Data != undefined && result.Data.key && (actionType == "edit" ? isValidDBDetail : true)) {
        delete window.serverName;
        delete window.portNumber;
        delete Window.dns;
        delete window.login;
        delete window.password;
        delete window.databaseName;
        delete window.sslEnabled;
            if (actionType == "edit") {
                updateTenant(waitingPopUpElement, window.tenantServerConnectionString);
            }
        if (actionType != "edit") {
            changeFooterPostion();
            $(".db-connect-outer-container").find(".title").html(window.TM.App.LocalizationContent.DatabaseCreation + "!");
        }
    }
    else {
            hideWaitingPopup(element);
            $('#details-next').removeAttr("disabled");
        if (result.Data != undefined) {
            errorContent = result.Data.value;
        }
        $(".database-error").html(databaseValidationMessage).show();
    }
}

function connectDatabase(element, actionType) {
    showWaitingPopup(element);
    var result = "";
    var isNewDatabase = true;
    window.serverName = $("#txt-servername").val();
    window.portNumber = $("#txt-portnumber").val();
    window.maintenanceDb = $('#maintenance-db').val();
    window.IsWindowsAuthentication = getRadioButtonValue("checkWindows") == "windows";
    window.login = $("#txt-login").val();
    window.password = $("#txt-password-db").val();
    var databaseType = getDropDownValue("database-type");
    window.databaseName = $("#txt-dbname").val();
    window.serverDatabaseName = $("#server-dbname").val();
    window.intermediateDatabaseName = $("#imdbname").val();
    window.sslEnabled = $("#secure-sql-connection").is(":checked");
    window.additionalParameters = $("#additional-parameter").val();
    if (actionType == "edit") {
        isNewDatabase = false;
    }

    $.ajax({
        type: "POST",
        url: connectDatabaseUrl,
        async: false,
        data: {
            data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, MaintenanceDatabase: window.maintenanceDb, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, ServerDatabaseName: window.serverDatabaseName, IntermediateDatabaseName: window.intermediateDatabaseName, sslEnabled: window.sslEnabled, IsNewDatabase: isNewDatabase, TenantType: getTenantType(), additionalParameters: window.additionalParameters }),
            isSimpleMode: isSimpleModeSelction(),
            isSiteCreation: true
        },
        success: function (serverResult) {
            hideWaitingPopup(element);
            if (serverResult.Data.key) {
                window.connectionString = serverResult.Data.connectionResponse.ServerConnectionString;
                window.tenantServerConnectionString = serverResult.Data.connectionResponse.TenantServerConnectionString;
                window.intermediateServerConnectionString = serverResult.Data.connectionResponse.IntermediateServerConnectionString;
                if (actionType != undefined && actionType == "edit") {
                    result = { "Data": { "key": true, "value": "connected successfully" } };
                }
                else {
                    result = serverResult;
                }
            } else {
                $('#details-next').removeAttr("disabled");
                if (serverResult.Data != undefined) {
                    errorContent = serverResult.Data.value;
                }
                $(".database-error").html(databaseValidationMessage).show();
            }
        }
    });

    return result;
}

function getDatabaseFormValues() {
    var formData;
    var isNewDatabase = $("#new-db").is(":checked");
    var databaseName = $("#new-db").is(":checked") ? $("#txt-dbname").val() : $("#database-name").val();
    var serverType = getDropDownValue("database-type");
    var maintenanceDb = $('#maintenance-db').val();
    var authenticationType = 0;
    var enableSSL = $("#secure-sql-connection").is(":checked");
    var additionalParameters = $("#additional-parameter").val();
    if (!(getRadioButtonValue("checkWindows") == "windows"))
        authenticationType = 1;
        formData = {
            SQLConfiguration:
            {
                ConnectionString: window.connectionString,
                IntermediateServerConnectionString: window.intermediateServerConnectionString,
                TenantServerConnectionString: window.tenantServerConnectionString,
                ServerType: serverType,
                AuthenticationType: authenticationType,
                DatabaseName: databaseName,
                MaintenanceDatabase: maintenanceDb,
                SslEnabled: enableSSL,
                IsNewDatabase: isNewDatabase,
                AdditionalParameters: additionalParameters
            },
            StorageType: $("input[name='IsBlobStorage']:checked").val(),
            TenantIsolation:
            {
                IsEnabled: $("#isolation-enable-switch").is(":checked"),
                IsolationCode: $("#site-isolation-code").val()
            },
            CustomAttribute: [],
        };

    return formData;
}


function postSystemSettingsData(systemSettingsDetails, azuredetails, userEmail, tenantDetails, brandingType, isAddFromServer) {

    var userEmailData = (userEmail != undefined && userEmail != null) ? JSON.stringify(userEmail) : $("#tenant-email").val();
    var tenantDetailsData = (tenantDetails != undefined && tenantDetails != null) ? JSON.stringify(tenantDetails) : null;
    setSystemSettingsData = { systemSettingsData: JSON.stringify(systemSettingsDetails), azureData: JSON.stringify(azuredetails), userEmail: userEmailData, tenantDetails: tenantDetailsData, brandingType: brandingType };
    $.ajax({
        type: "POST", url: setSystemSettingsUrl, data: setSystemSettingsData,
        success: function (setSystemSettingsResponse) {
            if (isAddFromServer != undefined && isAddFromServer) {
                hideWaitingPopup(waitingPopUpElement);
                $("#provide-admin-access-button").attr("disabled", "disabled");
                var tenantGridObj = parent.$("#tenants_grid").data("ejGrid");
                tenantGridObj.refreshContent();
                onAddAdminsDialogClose();
                parent.$("#add-tenant-popup").ejDialog("close");

                if (parent.window.location.href.indexOf("action=create-new-site") > -1) {
                    parent.history.pushState(null, '', umsSitesUrl);
                }

                parent.window.location.href = setSystemSettingsResponse.redirectUrl;
            }
            else {
                showWaitingPopup($(".startup-page-container-body"));
                window.location = setSystemSettingsResponse.redirectUrl;
            }
        }
    });
}

function validate_report_storage() {
    $(".blob-error-message").hide();
    showWaitingPopup($(".startup-page-conatiner"));
    var storageType = $("input[name='IsBlobStorage']:checked").val();
    window.storageType = storageType;
    var azuredetails = "";
    var tenantDetails = {
        TenantName: $("#txt-site-name").val(),
        TenantIdentifier: $("#txt-site-identifier").val(),
        TenantType: isBoldBI ? "BoldBIOnPremise" : "BoldReportsOnPremise",
        UseSiteIdentifier: useSiteIdentifier
    };
    var tenantType = isBoldBI ? "Bold BI" : "Bold Reports"
    if (storageType == "1") {
        if ($("#blob-storage-form").valid()) {
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
            window.connectionType = connectionType;
            azuredetails = {
                AzureBlobStorageUri: window.endpoint,
                AzureBlobStorageContainerName: window.containername,
                ConnectionType: window.connectionType,
                ConnectionString: connectionString,
                AccountName: window.accountname,
                AccessKey: window.accesskey
            };

            var isIntermediateDatabaseFormSubmit = $("#ds-db-config-submit").data("form") === "intermediate-db";

            if (window.storageenable == false) {
                $.ajax({
                    type: "POST",
                    url: blobExist,
                    data: { connectionString: connectionString, containerName: window.containername },
                    success: function (result) {
                        if (typeof result.Data != "undefined") {
                            if (result.Data.Key.toString().toLowerCase() == "true") {
                                hideWaitingPopup(".startup-page-conatiner");
                                if (isBoldBI && !isIntermediateDatabaseFormSubmit) {
                                    azureDataforBoldbi = azuredetails;
                                    dssystemsettings();
                                }

                                if (isIntermediateDatabaseFormSubmit) {
                                    intermediateDbDetails = getDatabaseFormValues(true);
                                }
                                else {
                                    systemSettingsDetails = getDatabaseFormValues();
                                }
                                if (isBoldReports) {
                                    postSystemSettingsData(systemSettingsDetails, azuredetails, intermediateDbDetails, null, tenantDetails, tenantType);
                                }
                            } else {
                                hideWaitingPopup(".startup-page-conatiner");
                                $(".azure-validation,.blob-error-message").css("display", "block");
                                changeFooterPostion();
                            }
                        } else {
                            hideWaitingPopup(".startup-page-conatiner");
                            $(".azure-validation,.blob-error-message").css("display", "block");
                            changeFooterPostion();
                        }
                    }
                });

                return false;
            }
            else {
                hideWaitingPopup(".startup-page-conatiner");
                if (isBoldReports) {
                    postSystemSettingsData(systemSettingsDetails, azuredetails, intermediateDbDetails, null, tenantDetails, tenantType);
                }
            }
        } else {
            hideWaitingPopup(".startup-page-conatiner");
            changeFooterPostion();
            return false;
        }
    } else {
        var isIntermediateDatabaseFormSubmit = $("#ds-db-config-submit").data("form") === "intermediate-db";

        if (isBoldBI && !isIntermediateDatabaseFormSubmit) {
            dssystemsettings();
        }

        if (isIntermediateDatabaseFormSubmit) {
            intermediateDbDetails = getDatabaseFormValues(true);
        }
        else {
            systemSettingsDetails = getDatabaseFormValues();
        }
        hideWaitingPopup(".startup-page-conatiner");
        if (isBoldReports) {
            postSystemSettingsData(systemSettingsDetails, azuredetails, intermediateDbDetails, null, tenantDetails, tenantType);
        }
    }
}

function isSimpleModeSelction() {
    return isSimpleModeValue === "true";
}

$(document).on("change", ".storage-checkbox", function () {
    $(".storage-form").find(".e-error").removeClass("e-error");
    $(".startup-validation").hide();
    var value = $("#storage-checkbox").is(":checked");
    if (value == true) {
        $.ajax({
            type: "POST",
            url: blobDetails,
            async: false,
            dataType: 'json',
            success: function (data) {
                var systemSetting = JSON.parse(data.AzureDetails);
                document.getElementById("txt-accountname").ej2_instances[0].value = systemSetting.BlobStorageAccountName;
                document.getElementById("txt-accesskey").ej2_instances[0].value = systemSetting.BlobStorageAccessKey;
                document.getElementById("txt-containername").ej2_instances[0].value = systemSetting.AzureBlobStorageContainerName;
                var checkedVal = getRadioButtonValue("Connection");
                var finalValue = "DefaultEndpointsProtocol=" + checkedVal + ";AccountName=" + systemSetting.BlobStorageAccountName + ";AccountKey=" + systemSetting.BlobStorageAccessKey;
                $("#connection-string").val(finalValue);
            }
        });
    }
    else {
        document.getElementById("txt-accountname").ej2_instances[0].value = null;
        document.getElementById("txt-accesskey").ej2_instances[0].value = null;
        document.getElementById("txt-containername").ej2_instances[0].value = null;
        var checkedVal = getRadioButtonValue("Connection");
        var finalValue = "DefaultEndpointsProtocol=" + checkedVal + ";AccountName=;AccountKey=";
        $("#connection-string").val(finalValue);
    }
});

function getTenantType() {
    var tenantType = "100";
    if ($("#tenant-type").length > 0 && isSiteCreation) {
            dropdownValue = document.getElementById("tenant-type").ej2_instances[0].value;
        if (dropdownValue === "BoldReportsOnPremise") {
            tenantType = "BoldReportsOnPremise";
        }
        else {
            tenantType = "BoldBIOnPremise";
        }
    }
    else {
        tenantType = isBoldBI ? "BoldBIOnPremise" : "BoldReportsOnPremise"
    }

    return tenantType;
}

function forceToLower(input) {
    input.value = input.value.toLowerCase();
}

function getDropDownValue(id) {
    return document.getElementById(id).ej2_instances[0].value;
}

function getRadioButtonValue(name) {
    return $("input[name='" + name + "']:checked").val();
}

function autoFocus(id) {
    document.getElementById(id).ej2_instances[0].focusIn();
}

function autoDeploy() {
    showWaitingPopup($(".startup-page-container-body"));
    $.ajax({
        type: "GET",
        url: autoDeploymentUrl,
        async: false,
        success: function (result) {
            if (typeof result.status != "undefined" && result.status) {
                $.ajax({
                    url: setSystemSettingsUrl,
                    type: "POST",
                    async: false,
                    data: {
                        systemSettingsData: result.systemSettingsData,
                        azureData: result.azureData,
                        tenantInfo: result.tenantInfo,
                        globalAdminDetails: result.globalAdminDetails
                    },
                    success: function (setSystemSettingsResponse) {
                        window.location = setSystemSettingsResponse.redirectUrl;
                    },
                    error: function (setSystemSettingsResponse) {
                        hideWaitingPopup($(".startup-page-container-body"));
                    }
                });
            }
            else {
                if (typeof result.message != "undefined" && result.message == "skipautodeploy") {
                    window.location = startUpUrl + "?skipAutoDeploy=true";
                }
                else {
                    hideWaitingPopup($(".startup-page-container-body"));
                    document.getElementById("auto-deployment-response").ej2_instances[0].show();
                    $("#auto-deployment-response-dialog-content").css("display", "block");
                }
            }
        }
    });
}

function skipAutoDeploy() {
    window.location = startUpUrl + "?skipAutoDeploy=true";
}
