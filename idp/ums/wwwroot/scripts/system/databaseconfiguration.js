$(document).ready(function () {
    removeError();
    document.getElementById("schema-name").ej2_instances[0].value = defaultValues.DefaultSchemaForMSSQL;

    if (!isSiteCreation) {
        $("#table-prefix-name").show();
        $("#table-prefix-ums").show();
        document.getElementById("ums-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForUMS;
        document.getElementById("txt-ums-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForUMS;
    }
    else {
        $("#table-prefix-name").hide();
        $("#table-prefix-ums").hide();
    }


    if (!isSiteCreation) {
        if (isBoldBI) {
            document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
            document.getElementById("txt-server-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
            document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
            document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
        }
        else {
            document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
            document.getElementById("txt-server-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
            document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
            document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
        }
    }
    else {
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

    $.validator.addMethod("isWhiteSpace", function (value, element) {
        return !/^\s/.test(value);
    }, window.Server.App.LocalizationContent.AvoidTrialingWhiteSpace);

    $("#db-content-holder").validate({
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
            servername: {
                isRequired: true
            },
            portnumber: {
                isRequired: true
            },
            maintenancedatabase: {
                isRequired: true
            },
            username: {
                required: true,
                sqlUsernamevalidation: true
            },
            password: {
                required: true,
                isValidCredentials: true
            },
            dbname: {
                required: true,
                isValidDatabaseName: true
            },
            databaseName: {
                required: true,
                isValidDatabaseName: true
            },
            serverdbname: {
                required: true,
                isValidDatabaseName: true
            },
            serverexistingdbname: {
                required: true,
                isValidDatabaseName: true
            },
            designerdbname: {
                required: true,
                isValidDatabaseName: true
            },
            designerexistingdbname: {
                required: true,
                isValidDatabaseName: true
            },
            umsPrefix: {
                isWhitespaceOrNumeric: true
            },
            serverPrefix: {
                isWhitespaceOrNumeric: true
            },
            tablePrefix: {
                isWhitespaceOrNumeric: true
            },
            servicename: {
                required: true
            },
            tenantTablePrefix: {
                isWhitespaceOrNumeric: true
            },
            serverPrefixName: {
                isWhitespaceOrNumeric: true
            },
            serverTablePrefix: {
                isWhitespaceOrNumeric: true
            },
            schemaName: {
                isWhitespaceOrNumeric: true
            },
            additionalparameter: {
                isWhiteSpace: true
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass("e-error");
            $(element).closest(".e-outline").siblings(".startup-validation").show();
            if (element.id === "txt-dbname") {
                $(".database-error").html("").hide();
            }

            if (element.id === "database-name") {
                $(".database-error").html("").hide();
            }
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('e-error');
            $(element).closest(".e-outline").siblings(".startup-validation").hide();
            changeFooterPostion();
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".startup-validation").css("display", "block").html(error.html());
            changeFooterPostion();
        },
        messages: {
            servername: {
                isRequired: window.Server.App.LocalizationContent.ServerNamevalidator
            },
            portnumber: {
                isRequired: window.Server.App.LocalizationContent.PortValidator
            },
            maintenancedatabase: {
                isRequired: window.Server.App.LocalizationContent.MaintenanceDbValidator
            },
            username: {
                required: window.Server.App.LocalizationContent.UserNameValidator
            },
            password: {
                required: window.Server.App.LocalizationContent.PasswordValidator
            },
            dbname: {
                required: window.Server.App.LocalizationContent.TheDatabaseValidator
            },
            databaseName: {
                required: window.Server.App.LocalizationContent.TheDatabaseValidator
            },
            serverdbname: {
                required: window.Server.App.LocalizationContent.TheTenantServerDatabaseValidator
            },
            serverexistingdbname: {
                required: window.Server.App.LocalizationContent.TheTenantServerDatabaseValidator
            },
            designerdbname: {
                required: window.Server.App.LocalizationContent.TheDesignerDatabaseValidator
            },
            designerexistingdbname: {
                required: window.Server.App.LocalizationContent.ExistingDatabaseValidator
            },

            servicename: {
                required: window.Server.App.LocalizationContent.TheServiceInstanceValidator
            },
        }
    });

    $("#txt-password-db").validate({
        errorElement: "span",
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            password: {
                isRequired: true
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass("e-error");
            $(element).closest(".e-outline").siblings(".startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('e-error');
            $(element).closest(".e-outline").siblings(".startup-validation").hide();
            changeFooterPostion();
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".startup-validation").text(error.html());
            changeFooterPostion();
        },
        messages: {
            password: {
                isRequired: window.Server.App.LocalizationContent.PasswordValidator
            }
        }
    });

    $("#txt-servername").validate({
        errorElement: "span",
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            servername: {
                isRequired: true
            }
        },

        highlight: function (element) {
            $(element).closest('div').addClass("e-error");
            $(element).closest(".e-outline").siblings(".startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('e-error');
            $(element).closest(".e-outline").siblings(".startup-validation").hide();
            changeFooterPostion();
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".startup-validation").text(error.html());
            changeFooterPostion();
        },
        messages: {
            servername: {
                isRequired: window.Server.App.LocalizationContent.ServerNamevalidator
            }
        }
    });

    $("#txt-portnumber").validate({
        errorElement: "span",
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            portnumber: {
                isRequired: true
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass("e-error");
            $(element).closest(".e-outline").siblings(".startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('e-error');
            $(element).closest(".e-outline").siblings(".startup-validation").hide();
            changeFooterPostion();
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".startup-validation").css("display", "block").text(error.html());
            changeFooterPostion();
        },
        messages: {
            servername: {
                isRequired: window.Server.App.LocalizationContent.PortValidator
            }
        }
    });

    $("#txt-login").validate({
        errorElement: "span",
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            username: {
                isRequired: true
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass("e-error");
            $(element).closest(".e-outline").siblings(".startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('e-error');
            $(element).closest(".e-outline").siblings(".startup-validation").hide();
            changeFooterPostion();
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".startup-validation").text(error.html());
            changeFooterPostion();
        },
        messages: {
            username: {
                isRequired: window.Server.App.LocalizationContent.UserNameValidator
            }
        }
    });

    if (isSiteCreation === "false") {
        var interval = setInterval(function () {
            $.ajax({
                type: "GET",
                url: progressStatusUrl,
                success: function (result) {
                    $(".deployment-status").text(result.Message);
                    $(".progressBar-container .progress-bar").width(result.Percentage);
                    if (result.Percentage == "100%") {
                        clearInterval(interval);
                        $.ajax({
                            type: "POST",
                            url: deleteStatusUrl,
                            success: function (data) {
                                if (data) {
                                    $(".progressBar-container .progress-bar").width("10%")
                                }
                            }
                        });
                    }
                }
            });
        }, 3000);
    }
});




$(document).on("click", "#know-more-error", function () {
    messageBox("su-login-error", window.Server.App.LocalizationContent.DatabaseError, errorContent, "success", function () {
        onCloseMessageBox();
    });
});


$(document).on("click", "#db-config-submit, #sql-existing-db-submit", function () {
    removeError();
    var clickedButton = $(this);
    if (!isSiteCreation) {
        validateStartup(function (result) {
            if (result) {
                messageBox("su-login-error", window.Server.App.LocalizationContent.ConfigurationError, window.Server.App.LocalizationContent.ConfigurationErrorMessage, "success", function () {
                    onCloseMessageBox();
                });
            }
            else {

                databaseConfiguration(clickedButton);
            }
        });
    }
    else {

        databaseConfiguration(clickedButton);
    }
});

function databaseConfiguration(clickedButton) {
    var databaseValidationMessage = window.Server.App.LocalizationContent.OneOrMoreErrors.format("<a id='know-more-error'>", "</a>");
    var isNewDatabaseTab = clickedButton.attr("id") == "db-config-submit";
    var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
    var canProceed = $("#db-content-holder").valid();
    if (canProceed) {
        showWaitingPopup('startup-waiting-element');
        $("#startup-waiting-element").find(".e-spinner-pane").css("height", $("#startup-waiting-element").height())
        clickedButton.prop("disabled", true);
        window.serverName = $("#txt-servername").val();
        window.portNumber = $("#txt-portnumber").val();
        window.maintenanceDb = $('#maintenance-db').val();
        window.IsWindowsAuthentication = getRadioButtonValue("checkWindows") == "windows";
        window.login = $("#txt-login").val();
        window.password = $("#txt-password-db").val();
        var databaseType = getDropDownValue("database-type");
        if (databaseType === "Oracle") {
            window.databaseName = $("#txt-dbname-for-oracle").val();
            window.ServiceInstance = $("#txt-servicename").val();
        } else {
            window.databaseName = isNewDatabaseTab ? $("#txt-dbname").val() : $("#database-name").val();
        }

        window.serverDatabaseName = isNewDatabaseTab ? $("#server-dbname").val() : $("#server-existing-dbname").val();
        window.intermediateDatabaseName = isNewDatabaseTab ? $("#imdbname").val() : $("#imdb-existing-dbname").val();
        window.sslEnabled = $("#secure-sql-connection").is(":checked");
        window.additionalParameters = $("#additional-parameter").val();
        window.schemaName = $("#schema-name").val();
        window.tenantPrefix = isAdvancedTab ? (isNewDatabaseTab ? $("#server-prefix-name").val() : $("#server-table-prefix").val()) : (isNewDatabaseTab ? $("#txt-server-prefix").val() : $("#tenant-table-prefix").val());

        if (!isSiteCreation) {
            window.prefix = isNewDatabaseTab ? $("#txt-ums-prefix").val() : $("#ums-table-prefix").val();
            if (window.tenantPrefix === "") {
                if (isBoldBI) {
                    window.tenantPrefix = defaultValues.DefaultPrefixForBI;
                }
                else {
                    window.tenantPrefix = defaultValues.DefaultPrefixForReports;

                }
            }
            if (window.prefix === "") {
                window.prefix = defaultValues.DefaultPrefixForUMS;
            }
        }
        else {
            if (window.tenantPrefix === "") {
                if (!isBoldReportsTenantType()) {
                    window.tenantPrefix = defaultValues.DefaultPrefixForBI;
                }
                else {
                    window.tenantPrefix = defaultValues.DefaultPrefixForReports;

                }
            }
        }
        if (window.schemaName === "") {
            if (databaseType === "MSSQL") {
                window.schemaName = defaultValues.DefaultSchemaForMSSQL;
            }
            else if (databaseType === "PostgreSQL") {
                window.schemaName = defaultValues.DefaultSchemaForPostgres;
            }
        }

        var tenantTypeDetails = isBoldBI ? "BoldBIOnPremise" : "BoldReportsOnPremise";
        if (IsBiPrefixSchema && isBoldBI){
            saveDefaultAttributes(databaseType, tenantTypeDetails);
        }

        if (!isNewDatabaseTab) {
            var tenantype = $("#tenant-type").val() === "" ? getTenantType() : $("#tenant-type").val();
        }
        doAjaxPost("POST", connectDatabaseUrl,
            {
                data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, MaintenanceDatabase: window.maintenanceDb, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, ServerDatabaseName: window.serverDatabaseName, IntermediateDatabaseName: window.intermediateDatabaseName, sslEnabled: window.sslEnabled, IsNewDatabase: isNewDatabaseTab, TenantType: getTenantType(), additionalParameters: window.additionalParameters,ServiceInstance: window.ServiceInstance, SchemaName: window.schemaName, Prefix: window.prefix, TenantPrefix: window.tenantPrefix }),
                isSimpleMode: isSimpleModeSelction()
            },
            function (result) {
                if (result.Data.key) {
                    window.connectionString = result.Data.connectionResponse.ServerConnectionString;
                    window.tenantServerConnectionString = result.Data.connectionResponse.TenantServerConnectionString;
                    window.intermediateServerConnectionString = result.Data.connectionResponse.IntermediateServerConnectionString;
                    var databaseType = getDropDownValue("database-type");
                    if (isNewDatabaseTab) {
                        doAjaxPost("POST", generateDatabaseUrl,
                            {
                                data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, MaintenanceDatabase: window.maintenanceDb, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, sslEnabled: window.sslEnabled, IsNewDatabase: true, additionalParameters: window.additionalParameters, ServiceInstance: window.ServiceInstance, SchemaName: window.schemaName, Prefix: window.prefix, TenantPrefix: window.tenantPrefix }),
                                isSimpleMode: isSimpleModeSelction()
                            },
                            function (result) {
                                hideWaitingPopup('startup-waiting-element');
                                if (result.Data.key) {
                                    registration(isSimpleModeSelction());
                                }
                                else {
                                    $("#db-config-submit").prop("disabled", false);
                                    errorContent = result.Data.value;
                                    $(".database-error").html(databaseValidationMessage).show();
                                }
                                changeFooterPostion();
                            }
                        );
                    }
                    else {
                        doAjaxPost("POST", checkTableExistsUrl,
                            {
                                data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, MaintenanceDatabase: window.maintenanceDb, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, ServerDatabaseName: window.serverDatabaseName, IntermediateDatabaseName: window.intermediateDatabaseName, sslEnabled: window.sslEnabled, TenantType: tenantype, IsNewDatabase: false, additionalParameters: window.additionalParameters, ServiceInstance: window.ServiceInstance, SchemaName: window.schemaName, Prefix: window.prefix, TenantPrefix: window.tenantPrefix }),
                                isSimpleMode: isSimpleModeSelction()
                            },
                            function (result) {
                                var items = result.Data.value;
                                if (result.Data.key && items.length > 0) {
                                    hideWaitingPopup('startup-waiting-element');
                                    var html = window.Server.App.LocalizationContent.TablesAlreadyExists;
                                    html += "<ol class='list-area'>";
                                    for (var t = 0; t < items.length; t++) {
                                        html += "<li>" + items[t] + "</li>";
                                    }
                                    html += "</ol>";
                                    errorContent = html;
                                    var id = result.Data.isServerError ? "#server-existing-dbname" : "#database-name";
                                    $(id).closest(".txt-holder").addClass("has-error");
                                    $(id).parent().find(">.startup-validation").html(databaseValidationMessage).show();
                                    $(".database-error").html(databaseValidationMessage).show();
                                    $("#sql-existing-db-submit").prop("disabled", false);
                                } else if (!result.Data.key && items.length <= 0) {
                                    doAjaxPost("POST", generateSQLTablesUrl,
                                        {
                                            data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, IsNewDatabase: false, ServiceInstance: window.ServiceInstance, SchemaName: window.schemaName, Prefix: window.prefix, TenantPrefix: window.tenantPrefix, additionalParameters: window.additionalParameters })
                                        },
                                        function (result) {
                                            hideWaitingPopup('startup-waiting-element');
                                            if (result.Data.key) {
                                                registration(isSimpleModeSelction());
                                            }
                                            else {
                                                $("#sql-existing-db-submit").prop("disabled", false);
                                                $("#db_loader").hide();
                                                errorContent = result.Data.value;
                                                $(".database-error").html(databaseValidationMessage).show();
                                            }
                                        }
                                    );
                                    $(".db-connect-outer-container").find(".title").html(window.Server.App.LocalizationContent.DatabaseCreation + "!");
                                    $("#database-name").focus();
                                    $("#txt-dbname-for-oracle").focus();
                                } else {
                                    hideWaitingPopup('startup-waiting-element');
                                    $("#db_config_generate, #db-config-submit").hide();
                                    $("#sql-existing-db-submit").show().prop("disabled", false);
                                    errorContent = result.Data.value;
                                    $(".database-error").html(databaseValidationMessage).show();
                                }
                            });
                    }

                    $(".db-connect-outer-container").find(".title").html(window.Server.App.LocalizationContent.DatabaseCreation + "!");
                    $("#txt-dbname").focus();
                    $("#txt-dbname-for-oracle").focus();
                }
                else {
                    hideWaitingPopup('startup-waiting-element');
                    if (isNewDatabaseTab) {
                        $("#db-config-submit").show().prop("disabled", false);
                    }
                    else {
                        $("#sql-existing-db-submit").show().prop("disabled", false);
                    }

                    errorContent = result.Data.value;
                    $("#additional-parameter").closest('div').addClass("e-error");
                    $("#additional-parameter").closest(".e-outline").siblings(".startup-validation").html(databaseValidationMessage).show();
                }
            }
        );
    }
}

function registerApplication(isSimpleMode) {
    getFormData();
    hideWaitingPopup('startup-waiting-element');
    $(".startup-waiting-popup").addClass("storage-page-content");
    var elem = $(".system-startUp-settings-bg");
    $(".e-text").find(".configuration-status").remove();
    $(".e-text").append('<span class="configuration-status"></span>');
    $("#progress-parent-container").show();
    var globalAdminDetails = $("#global-admin-details").val();
    var systemSettingsData = JSON.parse($("#system-settings-data").val());
    var azureData = $("#azure-data").val();
    var tenantInfo = $("#tenant-info").val();
    var storage = $("#storage-info").val();
    systemSettingsData.CustomAttribute = addSiteAttribute;
    var systemSettingsDataString = JSON.stringify(systemSettingsData);
    var configurationMode = getRadioButtonValue('ConfigurationMode');
    $.ajax({
        url: setSystemSettingsUrl,
        type: "POST",
        data: {
            systemSettingsData: systemSettingsDataString,
            storage: storage,
            tenantInfo: tenantInfo,
            globalAdminDetails: globalAdminDetails,
            isSimpleMode: isSimpleMode,
            configurationMode : configurationMode
        },
        success: function (setSystemSettingsResponse) {
            if (setSystemSettingsResponse.redirectUrl != null) {
                window.location = setSystemSettingsResponse.redirectUrl;
            }
            else {
                $(".progressBar-container").hide();
                $(".deployment-status").hide();
                $(".deployment-error").show();
                document.getElementById("error-display").innerHTML = setSystemSettingsResponse.error;
            }
        },
        error: function (setSystemSettingsResponse) {

        }
    });
}

function registration(isSimpleMode) {
    $("#image-parent-container, #system-settings-db-selection-container").hide();
    delete window.serverName;
    delete window.portNumber;
    delete window.login;
    delete window.password;
    delete window.databaseName;
    delete window.sslEnabled;
    if (isSimpleMode && !isAzureApplication) {
        if (IsOciObjectStorage) {
            document.getElementById("storage-type").ej2_instances[0].value = "4";
        }
        else if (isAmazonS3) {
            document.getElementById("storage-type").ej2_instances[0].value = "2";
        }

        registerApplication(isSimpleMode);
    }
    else if (isAzureApplication) {
        azureStep();
    }
    else {
        if (IsOciObjectStorage) {
            document.getElementById("storage-type").ej2_instances[0].value = "4";
            registerApplication(isSimpleMode);
        }
        else if (isAmazonS3) {
            document.getElementById("storage-type").ej2_instances[0].value = "2";
            registerApplication(isSimpleMode);
        }
        else {
            advancedThirdStep();
        }
    }
}

function azureStep() {
    document.getElementById("storage-type").ej2_instances[0].value = "1";
    $(".custom-endpoint-form-element, .report-content").hide();
    $("#blob-storage-form").slideDown("slow");
    $("#report-storage").hide();
    $(".content-value").hide();
    storageButtonValue = "tenant";
    $(".storage-checkbox").hide();
    $("body").removeClass("startup-page-container-body");

    if (connectionType === "https") {
        $("#https").prop("checked", true);
    } else if (connectionType === "http") {
        $("#http").prop("checked", true);
    }

    $("#txt-accountname").val(storageAccountName);
    $("#txt-endpoint").val(blobServiceEndpoint);
    $("#txt-accesskey").val(accessKey);
    $("#txt-containername").val(containerName);
    validate_storage_type();
}

function advancedThirdStep() {
    $("#image-parent-container").show();
    $("#image-parent-container .startup-image").hide().attr("src", storageUrl).fadeIn();
    $(".startup-content span.first-content").hide().text(window.Server.App.LocalizationContent.YourStorage).slideDown();
    $(".startup-content span.second-content").hide().text(isBoldBI ? window.Server.App.LocalizationContent.StorageBIMsg.format(biProductname) : window.Server.App.LocalizationContent.StorageReportsMsg.format(reportsProductname)).slideDown();
    $(".startup-content span.third-content").hide().text("").slideDown();
    $(".startup-content a#help-link").attr("href", idStorageConfiguration);
    $(".startup-waiting-popup").addClass("storage-page-content");
    $("#system-settings-filestorage-container").slideDown("slow");
    $(".custom-endpoint-form-element, .report-content").hide();
    $("#blob-storage-form").hide();
    $("#oci-object-storage-form").hide();
    $("#report-storage").hide();
    storageButtonValue = "tenant";
    $(".storage-checkbox").hide("slow");
}

function forceToLower(input) {
    input.value = input.value.toLowerCase();
}

function validateNoWhiteSpace(input) {
    input.value = input.value.replace(/\s/g, '');
}


function DomResize() {
    //$("#startup-page-conatiner").height($("#system-settings-general").height() + $("#base-footer-div").height());
}

function onDatbaseChange(args) {
    removeError();
    var configurationModeType = getRadioButtonValue('ConfigurationMode');
    var checkedVal = args.value.toLowerCase();
    if (!isSiteCreation) {
        $("#admin-nav").show();

    }
    else if (!isBoldReportsTenantType() && isSiteCreation) {
        $("#admin-nav").show();
    }
    else if (isBoldReportsTenantType && isSiteCreation) {
        $("#admin-nav").hide();
    }
    if (isSiteCreation) {
        if (!isBoldReportsTenantType() && (IsBiPrefixSchema)) {
            $(".schema-prefix-hide").removeClass("d-none").addClass("d-block");
        }

        if (isBoldReportsTenantType() && (IsReportsPrefixSchema)) {
            $(".schema-prefix-hide").removeClass("d-none").addClass("d-block");
        }

        $("#table-prefix-name").hide();
        $("#table-prefix-ums").hide();
    }
    var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
    if (isAdvancedTab) {
        $("#simple-server-prefix").hide();
        $("#simple-tenant-prefix").hide();
    }
    else {
        $("#simple-server-prefix").show();
        $("#simple-tenant-prefix").show();
    }

    showDataStore();
    switch (checkedVal) {
        case "mssql":
            $('.port-num').removeClass("d-block").addClass("d-none");
            $('.maintenancedb').removeClass("d-block").addClass("d-none");
            $('.auth-type').removeClass("d-none").addClass("d-block");
            var isWindowsAuth = getRadioButtonValue("checkWindows") === "windows";
            var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
            document.getElementById("txt-login").ej2_instances[0].enabled = !isWindowsAuth;
            document.getElementById("txt-password-db").ej2_instances[0].enabled = !isWindowsAuth;
            $('#db-content-holder').css("display", "block");
            resetTheDbSubmitButton();
            $("#move-to-next,.sqlce-content").removeClass("d-block").addClass("d-none");
            $(".content-display").hide();
            $(".show-sql-content").slideDown("slow");
            var databaseSelectionDiv = document.getElementById('database-new-or-existing');
            databaseSelectionDiv.classList.remove('visually-hidden');
            databaseSelectionDiv.classList.add('d-block');
            if (!isSiteCreation) {
                $('.database-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
            }
            
            if (actionType.toLowerCase() != "edit") {
                document.getElementById("schema-name").ej2_instances[0].value = defaultValues.DefaultSchemaForMSSQL;

                if (isSiteCreation) {
                    $("#table-prefix-name").hide();
                    $("#table-prefix-ums").hide();
                    if (!isBoldReportsTenantType()) {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        $('.database-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                    }
                    else {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        $('.database-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block"); 
                    }

                    if (isAdvancedTab) {
                        $('.advance-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                    }
                    else {
                        $('.server-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                    }
                }

                if (!isSiteCreation) {
                    $("#table-prefix-name").show();
                    $("#table-prefix-ums").show();
                    document.getElementById("ums-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForUMS;
                    document.getElementById("txt-ums-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForUMS;
                    if (isAdvancedTab) {
                        $("#simple-server-prefix").hide();
                        $("#simple-tenant-prefix").hide();
                        $('.new-id-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                        $('.advance-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                    }
                    else {
                        $(".new-id-schema-prefix-hide").removeClass("visually-hidden").addClass("d-block");
                        $(".server-schema-prefix-hide").removeClass("visually-hidden").addClass("d-block");
                    }

                    if (isBoldBI) {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                    }
                    else {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                    }
                    prefillDbNames();
                }
            }
            else {
                $(".db-schema-info").html(window.Server.App.LocalizationContent.SchemaInfo);
                $(".db-prefix-info").html(window.Server.App.LocalizationContent.PrefixInfo);
            }

            if (!isSiteCreation && isBoldReports) {
                hideDataStore();
            }
            else if (isSiteCreation && isBoldReportsTenantType()) {
                hideDataStore();
            }
            $("div.placeholder").remove();
            $(".note-additional-parameter a").attr("href", sqlParameter);
            var link = document.getElementById("advanced-tab");
            
            link.classList.remove("disable-adv");
            $('#advanced-tab').off('click.prevent');
            DomResize();
            break;
        case "mssqlce":
            $('#db-content-holder').css("display", "none");
            $('#db-config-submit,#sql-existing-db-submit').addClass("d-none");
            $("#move-to-next,.sqlce-content").removeClass("d-none").addClass("d-block");
            var databaseSelectionDiv = document.getElementById('database-new-or-existing');
            databaseSelectionDiv.classList.remove('visually-hidden');
            databaseSelectionDiv.classList.add('d-block');
            resetTheDbSubmitButton();
            break;
        case "mysql":
            $('.port-num').removeClass("d-none").addClass("d-block");
            $('.maintenancedb').removeClass("d-block").addClass("d-none");
            $('.auth-type').removeClass("d-block").addClass("d-none");
            $('#db-content-holder').css("display", "block");
            document.getElementById("txt-login").ej2_instances[0].enabled = true;
            document.getElementById("txt-password-db").ej2_instances[0].enabled = true;
            resetTheDbSubmitButton();
            $("#move-to-next,.sqlce-content").removeClass("d-block").addClass("d-none");
            $(".content-display").hide();
            $(".show-sql-content").slideDown("slow");
            $("#input-schema").hide();
            var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
            document.getElementById("schema-name").ej2_instances[0].value = "";

            var databaseSelectionDiv = document.getElementById('database-new-or-existing');
            databaseSelectionDiv.classList.remove('visually-hidden');
            databaseSelectionDiv.classList.add('d-block');

            if (actionType.toLowerCase() != "edit") {

                if (isSiteCreation) {
                    $("#table-prefix-name").hide();
                    $("#table-prefix-ums").hide();
                    if (!isBoldReportsTenantType()) {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                    }
                    else {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                    }

                    if (isAdvancedTab) {
                        $('.advance-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                    }
                    else {
                        $('.server-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                    }
                }

                if (!isSiteCreation) {
                    $("#table-prefix-name").show();
                    $("#table-prefix-ums").show();
                    if (isAdvancedTab) {
                        $("#simple-server-prefix").hide();
                        $("#simple-tenant-prefix").hide();
                        $('.new-id-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                        $('.advance-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                    }
                    else {
                        $(".new-id-schema-prefix-hide").removeClass("visually-hidden").addClass("d-block");
                        $(".server-schema-prefix-hide").removeClass("visually-hidden").addClass("d-block");
                    }
                    document.getElementById("ums-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForUMS;
                    document.getElementById("txt-ums-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForUMS;

                    if (isBoldBI) {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                    }
                    else {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                    }
                    prefillDbNames();
                }
            }
            else {
                $(".db-prefix-info").html(window.Server.App.LocalizationContent.PrefixInfo);
            }

            if (!isSiteCreation && isBoldReports) {
                hideDataStore();
            }
            else if (isSiteCreation && isBoldReportsTenantType()) {
                hideDataStore();
            }
            $("div.placeholder").remove();
            $(".note-additional-parameter a").attr("href", mySQLParameter);
            $(".database-schema-prefix-hide").removeClass("d-block").addClass("visually-hidden");
            var link = document.getElementById("advanced-tab");
            
            link.classList.remove("disable-adv");
            $('#advanced-tab').off('click.prevent');
            DomResize();
            break;
        case "oracle":
            $('.port-num').removeClass("d-none").addClass("d-block");
            $('.maintenancedb').removeClass("d-block").addClass("d-none");
            $('.auth-type').removeClass("d-block").addClass("d-none");
            $('#db-content-holder').css("display", "block");
            document.getElementById("txt-login").ej2_instances[0].enabled = true;
            document.getElementById("txt-password-db").ej2_instances[0].enabled = true;
            $('#db-config-submit').removeClass("d-block").addClass("visually-hidden");
            $('#sql-existing-db-submit').removeClass("d-none").addClass("d-block");
            var sqlExistingDbSubmit = document.getElementById("sql-existing-db-submit");
            sqlExistingDbSubmit.classList.remove('visually-hidden');
            sqlExistingDbSubmit.classList.add('d-block');
            $("#move-to-next,.sqlce-content").removeClass("d-block").addClass("d-none");
            $(".content-display").hide();
            $(".show-sql-content").slideDown("slow");
            $("#input-schema").hide();
            var sslDiv = document.getElementById("ssl-block");
            var databaseSelectionDiv = document.getElementById('database-new-or-existing');
            $("#existing-db").prop("checked", true).trigger("change");
            var databaseNameDiv = document.getElementById('simple_tab_db_name');
            var serviceNameDiv = document.getElementById('service-name');
            sslDiv.classList.add("visually-hidden");
            document.getElementById("schema-name").ej2_instances[0].value = "";
            //databaseNameDiv.classList.add('visually-hidden');
            serviceNameDiv.classList.remove('d-none');
            serviceNameDiv.classList.add('d-block');
            databaseSelectionDiv.classList.remove('d-block');
            databaseSelectionDiv.classList.add('visually-hidden');

            $("#sql-server-database-name").removeClass('show').addClass('hide');
            if (!isSiteCreation) {
                prefillDbNames();
            }
            if (!isSiteCreation && isBoldReports) {
                hideDataStore();
            }
            else if (isSiteCreation && isBoldReportsTenantType()) {
                hideDataStore();
            }
            $("div.placeholder").remove();
            $(".note-additional-parameter a").attr("href", oracleParameter);
            $('.new-id-schema-prefix-hide').removeClass("d-block").addClass("visually-hidden");
            $('.server-schema-prefix-hide').removeClass("d-block").addClass("visually-hidden");
            $('.exist-database-name').removeClass("d-block").addClass("visually-hidden");

            if (actionType.toLowerCase() != "edit") {

                if (isSiteCreation) {
                    $("#table-prefix-name").hide();
                    $("#table-prefix-ums").hide();
                    if (!isBoldReportsTenantType()) {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                    }
                    else {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                    }
                }

                if (!isSiteCreation) {
                    $("#table-prefix-name").show();
                    $("#table-prefix-ums").show();
                    document.getElementById("ums-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForUMS;
                    document.getElementById("txt-ums-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForUMS;

                    if (isBoldBI) {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                    }
                    else {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                    }
                    prefillDbNames();
                }
            }
            else {
                $(".db-prefix-info").html(window.Server.App.LocalizationContent.PrefixInfo);
            }

            var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
                if (isAdvancedTab) {
                    if (!isSiteCreation) {
                        $('.old-id-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                    }
                    else {
                        $('.old-id-schema-prefix-hide').removeClass("d-block").addClass("visually-hidden");
                    }

                    $(".advance-schema-prefix-hide").removeClass("d-block").addClass("visually-hidden");
                    $(".ser-schema-prefix-hide").removeClass("visually-hidden").addClass("d-block");
                    $('.simple-exist-schema-prefix-hide').removeClass("d-block").addClass("visually-hidden");
                }
                else {
                    if (!isSiteCreation) {
                        $('.old-id-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                    }
                    else {
                        $('.old-id-schema-prefix-hide').removeClass("d-block").addClass("visually-hidden");
                    }

                    $(".ser-schema-prefix-hide").removeClass("d-block").addClass("visually-hidden");
                    $('.advance-schema-prefix-hide').removeClass("d-block").addClass("visually-hidden");
                    $('.simple-exist-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
            }
            $(".database-schema-prefix-hide").removeClass("d-block").addClass("visually-hidden");
            var link = document.getElementById("advanced-tab");

            DomResize();
            break;
        case "postgresql":
            $('.auth-type').removeClass("d-block").addClass("d-none");
            $('.port-num').removeClass("d-none").addClass("d-block");
            $('.maintenancedb').removeClass("d-none").addClass("d-block");
            $('#db-content-holder').css("display", "block");
            document.getElementById("txt-login").ej2_instances[0].enabled = true;
            document.getElementById("txt-password-db").ej2_instances[0].enabled = true;
            resetTheDbSubmitButton();
            $("#move-to-next,.sqlce-content").removeClass("d-block").addClass("d-none");
            $(".content-display").hide();
            $(".show-sql-content").slideDown("slow");
            var databaseSelectionDiv = document.getElementById('database-new-or-existing');
            databaseSelectionDiv.classList.remove('visually-hidden');
            databaseSelectionDiv.classList.add('d-block');
            $("#input-schema").show();
            if (!isSiteCreation) {
                $('.database-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                $('.server-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block"); 
            }
            else {
                $('.database-schema-prefix-hide').removeClass("d-block").addClass("visually-hidden");
                $('.server-schema-prefix-hide').removeClass("d-block").addClass("visually-hidden");
            }

            var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";

            if (actionType.toLowerCase() != "edit") {
                document.getElementById("schema-name").ej2_instances[0].value = defaultValues.DefaultSchemaForPostgres;

                if (isSiteCreation) {
                    $("#table-prefix-name").hide();
                    $("#table-prefix-ums").hide();
                    if (!isBoldReportsTenantType()) {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        $('.database-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                        $('.server-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                    }
                    else {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        $('.database-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                        $('.server-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                    }

                    if (isAdvancedTab) {
                        $('.advance-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                    }
                }

                if (!isSiteCreation) {
                    $("#table-prefix-name").show();
                    $("#table-prefix-ums").show();
                    if (isAdvancedTab) {
                        $("#simple-server-prefix").hide();
                        $("#simple-tenant-prefix").hide();
                        $('.server-schema-prefix-hide').removeClass("d-block").addClass("visually-hidden");
                        $('.new-id-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                        $('.advance-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                    }
                    else {
                        $('.new-id-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
                    }

                    document.getElementById("ums-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForUMS;
                    document.getElementById("txt-ums-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForUMS;

                    if (isBoldBI) {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForBI;
                    }
                    else {
                        document.getElementById("server-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("tenant-table-prefix").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                        document.getElementById("server-prefix-name").ej2_instances[0].value = defaultValues.DefaultPrefixForReports;
                    }
                    prefillDbNames();
                }

            }
            else {
                $(".db-schema-info").html(window.Server.App.LocalizationContent.SchemaInfo);
                $(".db-prefix-info").html(window.Server.App.LocalizationContent.PrefixInfo);
            }

            if (!isSiteCreation && isBoldReports) {
                hideDataStore();
            }
            else if (isSiteCreation && isBoldReportsTenantType()) {
                hideDataStore();
            }
            $("div.placeholder").remove();
            $(".note-additional-parameter a").attr("href", postgresSQLParameter);
            DomResize();
            if (isSiteCreation) {
                ResizeHeightForDOM();
            }

            var link = document.getElementById("advanced-tab");
            
            link.classList.remove("disable-adv");
            $('#advanced-tab').off('click.prevent');
            break;

    }

    $("#new-db").prop("checked", true).trigger("change");
    if (getRadioButtonValue("databaseType") == "1" || checkedVal === "oracle") {
        $("#sql-existing-db-submit, .sql-server-existing-db").show();
        $(".database-name, #db-config-submit").hide();
        var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
        if (isAdvancedTab) {
            $("#simple-server-prefix").hide();
            $("#simple-tenant-prefix").hide();
        }
        else {
            $("#simple-server-prefix").show();
            $("#simple-tenant-prefix").show();
        }
    }
    else {
        $("#sql-existing-db-submit, .sql-server-existing-db").hide();
        $(".database-name, #db-config-submit").show();
        if (isSiteCreation) {
            $("#table-prefix-name").hide();
            $("#table-prefix-ums").hide();
        }
        else {
            var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
            if (isAdvancedTab) {
                $("#simple-server-prefix").hide();
                $("#simple-tenant-prefix").hide();
            }
            else {
                $("#simple-server-prefix").show();
                $("#simple-tenant-prefix").show();
            }
        }
    }

    if (actionType.toLowerCase() != "edit") {
        document.getElementById("txt-login").ej2_instances[0].value = null;
        document.getElementById("txt-password-db").ej2_instances[0].value = null;
        document.getElementById("txt-servername").ej2_instances[0].value = null;
        document.getElementById("additional-parameter").ej2_instances[0].value = null;
    }
    else {
        $("#table-prefix-name").hide();
        $("#table-prefix-ums").hide();
    }

    if (typeof actionType != 'undefined' && actionType.toLowerCase() != "edit") {
        switch (checkedVal) {
            case "mysql":
                $('#txt-portnumber-info').html(window.Server.App.LocalizationContent.MySqlPortInfo);
                document.getElementById("txt-portnumber").ej2_instances[0].value = defaultValues.MySQLPort;
                break;
            case "postgresql":
                $('#txt-portnumber-info').html(window.Server.App.LocalizationContent.PostgresPortInfo);
                document.getElementById("txt-portnumber").ej2_instances[0].value = defaultValues.PostgreSQLPort;
                document.getElementById("maintenance-db").ej2_instances[0].value = defaultValues.PostgreSQLMaintenanceDatabase;
                break;
            case "oracle":
                $('#txt-portnumber-info').html(window.Server.App.LocalizationContent.OraclePortInfo);
                document.getElementById("txt-portnumber").ej2_instances[0].value = "1521";
                document.getElementById("txt-servicename").ej2_instances[0].value = "Orcl";
                $('.database-schema-prefix-hide').removeClass("d-block").addClass("visually-hidden");
                break;
        }
    }

    if (isSiteCreation) {
        $(".id-schema-prefix-hide").removeClass("d-block").addClass("visually-hidden");
    }

    if (isSiteCreation) {
        if (!isBoldReportsTenantType() && (!IsBiPrefixSchema)) {
            $(".schema-prefix-hide").removeClass("d-block").addClass("d-none");
        }

        if (isBoldReportsTenantType() && (!IsReportsPrefixSchema)) {
            $(".schema-prefix-hide").removeClass("d-block").addClass("d-none");
        }

        if (!(configurationModeType !== undefined && configurationModeType === "0")) {
            var obj = document.getElementById("database-type");
            var itemsList = obj.ej2_instances[0].list.querySelectorAll('.e-list-item');
            if (!isAdvancedTab) {
                if (isBoldReportsTenantType() && !IsOracleSupportReports) {
                    itemsList[3].style.display = "none";
                } else if (isBoldReportsTenantType() && IsOracleSupportReports) {
                    itemsList[3].style.display = "";
                }

                if (!isBoldReportsTenantType() && !IsOracleSupportBi) {
                    itemsList[3].style.display = "none";
                } else if (!isBoldReportsTenantType() && IsOracleSupportBi) {
                    itemsList[3].style.display = "";
                }
            } else {
                itemsList[3].style.display = "none";
            }
        }

        var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
        if (configurationModeType !== undefined && configurationModeType === "0")
        {
            $(".schema-prefix-hide").removeClass("d-block").addClass("d-none");
        }
        
        if (isAdvancedTab && configurationModeType !== undefined && configurationModeType === "0")
        {
            $(".schema-prefix-hide").removeClass("d-none").addClass("d-block");
        }
    }
    else {
        if (!IsBiPrefixSchema) {
            $(".schema-prefix-hide").removeClass("d-block").addClass("d-none");
        }

        if (IsReportsPrefixSchema && !isBoldBI) {
            $(".schema-prefix-hide").removeClass("d-none").addClass("d-block");
        }
        
        var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
        if (configurationModeType !== undefined && configurationModeType === "0")
        {
            $(".schema-prefix-hide").removeClass("d-block").addClass("d-none");
        }
        
        if (!IsBiPrefixSchema && isAdvancedTab && configurationModeType !== undefined && configurationModeType === "0")
        {
            $(".schema-prefix-hide").removeClass("d-block").addClass("d-none");
            $("#server-database-name").removeClass('d-block').addClass('d-none');
        }

        if (IsReportsPrefixSchema && !isBoldBI && isAdvancedTab && configurationModeType !== undefined && configurationModeType === "0")
        {
            $(".schema-prefix-hide").removeClass("d-none").addClass("d-block");
        }
    }

    if (!isSiteCreation && isBoldReports) {
        hideDataStore();
    }
    else if (isSiteCreation && isBoldReportsTenantType()) {
        hideDataStore();
    }

    addPlacehoder("#system-settings-db-selection-container");
    changeFooterPostion();
};

function onWindowsChange(args) {
    var windowsCheck = args.value == "windows";
    var databaseType = getDropDownValue("database-type");
    $("#auth-type-info").removeClass("d-block").addClass("d-none");
    if (windowsCheck && databaseType == "MSSQL") {
        document.getElementById("txt-login").ej2_instances[0].enabled = false;
        document.getElementById("txt-password-db").ej2_instances[0].enabled = false;
        document.getElementById("txt-login").ej2_instances[0].value = null;
        document.getElementById("txt-password-db").ej2_instances[0].value = null;
        $("#auth-type-info").removeClass("d-none").addClass("d-block");
    }
    else if (databaseType == "MSSQL") {
        document.getElementById("txt-login").ej2_instances[0].enabled = true;
        document.getElementById("txt-password-db").ej2_instances[0].enabled = true;
    }
    removeError();
}


function onDbSelectChange() {
    removeError();
    var configurationModeType = getRadioButtonValue('ConfigurationMode');
    if (isSiteCreation) {
        if (!isBoldReportsTenantType() && (IsBiPrefixSchema)) {
            $(".schema-prefix-hide").removeClass("d-none").addClass("d-block");
        }

        if (isBoldReportsTenantType() && (IsReportsPrefixSchema)) {
            $(".schema-prefix-hide").removeClass("d-none").addClass("d-block");
        }
        
        if (configurationModeType !== undefined && configurationModeType === "0")
        {
            $(".schema-prefix-hide").removeClass("d-block").addClass("d-none");
        }
    }

    if ($("input[name='databaseType']:checked").val() === "1") {
        $(".sql-server-existing-db, #sql-existing-db-submit").show();
        $(".database-name, #db-config-submit").hide();
        if (isSiteCreation) {
            var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
            if (!isAdvancedTab) {
                $("#simple-tenant-prefix").show();
            }
        }

        if (!isSiteCreation) {
            $('.id-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
        }
        else {
            $('.id-schema-prefix-hide').removeClass("d-block").addClass("visually-hidden");
        }

        var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
        if (isAdvancedTab) {
            $(".new-smp-db").removeClass("d-block").addClass("visually-hidden");
            $(".old-db").removeClass("visually-hidden").addClass("d-block");
            $(".simple-tab").removeClass("d-block").addClass("visually-hidden");
        }
        else
        {
            $(".new-smp-db").removeClass("d-block").addClass("visually-hidden");
            $(".old-db").removeClass("visually-hidden").addClass("d-block");
            $(".advance-tab").removeClass("d-block").addClass("visually-hidden");

        }

        if (!isSiteCreation) {
            $(".new-id-schema-prefix-hide").removeClass("d-block").addClass("visually-hidden");
            $(".old-id-schema-prefix-hide").removeClass("visually-hidden").addClass("d-block");
        }

        if (!isAdvancedTab && configurationModeType !== undefined && configurationModeType === "0")
        {
            $(".schema-prefix-hide").removeClass("d-block").addClass("d-none");
        }
        
        if (isAdvancedTab && configurationModeType !== undefined && configurationModeType === "0")
        {
            $("#sql-server-database-name").removeClass('d-block').addClass('d-none');
            $("#sql-datastore-database-name").removeClass('d-block').addClass('d-none');
            $(".schema-prefix-hide").addClass("d-block").removeClass("d-none");
        }
    } else {
        $(".sql-server-existing-db, #sql-existing-db-submit").hide();
        $(".database-name, #db-config-submit").show();
        if (isSiteCreation) {
            $("#table-prefix-name").hide();
            $("#table-prefix-ums").hide();
        }
        else {
            var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
            if (isAdvancedTab) {
                $("#simple-server-prefix").hide();
                $("#simple-tenant-prefix").hide();
            }
            else {
                $("#simple-server-prefix").show();
                $("#simple-tenant-prefix").show();
            }
        }

        var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
        if (!isSiteCreation) {
            $('.id-schema-prefix-hide').removeClass("visually-hidden").addClass("d-block");
        }
        else {
            $('.id-schema-prefix-hide').removeClass("d-block").addClass("visually-hidden");
        }

        if (isAdvancedTab) {
            $(".old-db").removeClass("d-block").addClass("visually-hidden");
            $(".new-smp-db").removeClass("visually-hidden").addClass("d-block");
            $(".simple-tab").removeClass("d-block").addClass("visually-hidden");
        }
        else
        {
            $(".old-db").removeClass("d-block").addClass("visually-hidden");
            $(".new-smp-db").removeClass("visually-hidden").addClass("d-block");
            $(".advance-tab").removeClass("d-block").addClass("visually-hidden");
        }

        if (!isSiteCreation) {
            $(".new-id-schema-prefix-hide").removeClass("visually-hidden").addClass("d-block");
            $(".old-id-schema-prefix-hide").removeClass("d-block").addClass("visually-hidden");
        }
        
        if (configurationModeType !== undefined && configurationModeType === "0")
        {
            $(".schema-prefix-hide").removeClass("d-block").addClass("d-none");
        }

        if (isAdvancedTab && configurationModeType !== undefined && configurationModeType === "0")
        {
            $("#sql-server-database-name").removeClass('d-block').addClass('d-none');
            $("#sql-datastore-database-name").removeClass('d-block').addClass('d-none');
            $(".schema-prefix-hide").addClass("d-block").removeClass("d-none");
            $("#server-database-name").removeClass('d-block').addClass('d-none');
        }
    }

    if (isSiteCreation) {
        $(".id-schema-prefix-hide").removeClass("d-block").addClass("visually-hidden");
    }
    changeFooterPostion();
    DomResize();
    if (!isBoldBI) {
        hideDataStore();
    }

    if (isSiteCreation) {
        if (!isBoldReportsTenantType() && (!IsBiPrefixSchema)) {
            $(".schema-prefix-hide").removeClass("d-block").addClass("d-none");
        }

        if (isBoldReportsTenantType() && (!IsReportsPrefixSchema)) {
            $(".schema-prefix-hide").removeClass("d-block").addClass("d-none");
        }

        if (!(configurationModeType !== undefined && configurationModeType === "0")) {
            var obj = document.getElementById("database-type");
            var itemsList = obj.ej2_instances[0].list.querySelectorAll('.e-list-item');
            if (isBoldReportsTenantType() && !IsOracleSupportReports) {
                itemsList[3].style.display = "none";
            } else if (isBoldReportsTenantType() && IsOracleSupportReports) {
                itemsList[3].style.display = "";
            }

            if (!isBoldReportsTenantType() && !IsOracleSupportBi) {
                itemsList[3].style.display = "none";
            } else if (!isBoldReportsTenantType() && IsOracleSupportBi) {
                itemsList[3].style.display = "";
            }
        }
    }
    else {
        if (!IsBiPrefixSchema) {
            $(".schema-prefix-hide").removeClass("d-block").addClass("d-none");
        }

        if (IsReportsPrefixSchema && !isBoldBI) {
            $(".schema-prefix-hide").removeClass("d-none").addClass("d-block");
        }
    }
    
    if (!isAdvancedTab && configurationModeType !== undefined && configurationModeType === "0")
    {
        $(".schema-prefix-hide").removeClass("d-block").addClass("d-none");
    }

    if (configurationModeType !== undefined && configurationModeType === "0")
    {
        $(".data-store-existing-db-hide").removeClass("d-block").addClass("d-none");
    }
}

function prefillDbNames() {
    document.getElementById("txt-dbname").ej2_instances[0].value = defaultValues.DefaultDatabaseName;
    document.getElementById("server-dbname").ej2_instances[0].value = defaultValues.DefaultServerDatabaseName;
    document.getElementById("imdbname").ej2_instances[0].value = defaultValues.DefaultDatastoreDatabaseName;
}

function hideDataStore() {
    $(".data-store-hide").removeClass("d-block").addClass("visually-hidden");
    $(".data-store-existing-db-hide").removeClass("d-block").addClass("visually-hidden");
}

function showDataStore() {
    if (getRadioButtonValue("databaseType") == "1") {
        $(".data-store-existing-db-hide").removeClass("visually-hidden").addClass("d-block");
    }
    else {
        $(".data-store-hide").removeClass("visually-hidden").addClass("d-block");
    }
    var configurationModeType = getRadioButtonValue('ConfigurationMode');
    if (configurationModeType !== undefined && configurationModeType === "0")
    {
        $(".data-store-existing-db-hide").removeClass("d-block").addClass("d-none");
    }
}

function removeError() {
    $(".e-error").removeClass("e-error");
    $(".validation-txt-errors").hide();
    $(".database-error").hide();
}

$(document).on("change", "#existing-db", function () {
    $(".data-store-hide").removeClass("d-block").addClass("visually-hidden");
    $(".data-store-existing-db-hide").removeClass("visually-hidden").addClass("d-block");
    var configurationModeType = getRadioButtonValue('ConfigurationMode');

    if (configurationModeType !== undefined && configurationModeType === "0")
    {
        $(".data-store-existing-db-hide").removeClass("d-block").addClass("visually-hidden");
    }
});

$(document).on("change", "#new-db", function () {
    $(".data-store-hide").removeClass("visually-hidden").addClass("d-block");
    $(".data-store-existing-db-hide").removeClass("d-block").addClass("visually-hidden");
    var configurationModeType = getRadioButtonValue('ConfigurationMode');
    if (configurationModeType !== undefined && configurationModeType === "0")
    {
        $(".data-store-existing-db-hide").removeClass("d-block").addClass("visually-hidden");
        $(".data-store-hide").removeClass("d-block").addClass("visually-hidden");
    }
});

function resetTheDbSubmitButton() {
    var newDbButton = document.getElementById("db-config-submit");
    var existingDBbutton = document.getElementById("sql-existing-db-submit");
    var oracleDbNameDiv = document.getElementById("service-name");
    /*var dbNameDiv = document.getElementById("simple_tab_db_name");*/
    var sslDiv = document.getElementById("ssl-block");

    sslDiv.classList.add("d-block");
    sslDiv.classList.remove("visually-hidden");

    oracleDbNameDiv.classList.remove("d-block");
    oracleDbNameDiv.classList.add("d-none");

    //dbNameDiv.classList.remove("visually-hidden");
    //dbNameDiv.classList.add("d-block");
    /*$("#simple_tab_db_name").show();*/

    newDbButton.classList.remove("visually-hidden");
    newDbButton.classList.remove("d-block");
    existingDBbutton.classList.remove("d-block");
    existingDBbutton.classList.remove("visually-hidden");
}

