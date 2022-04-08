var databaseValidationMessage = window.TM.App.LocalizationContent.OneOrMoreErrors + " " + window.TM.App.LocalizationContent.Click + " " + "<a id='know-more-error'>" + window.TM.App.LocalizationContent.Here + "</a> " + window.TM.App.LocalizationContent.KnowMore + ".";
$(document).ready(function () {
    removeError();
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
            tablePrefix: {
                isValidPrefix: true
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
                isRequired: window.TM.App.LocalizationContent.ServerNamevalidator
            },
            portnumber: {
                isRequired: window.TM.App.LocalizationContent.PortValidator
            },
            username: {
                required: window.TM.App.LocalizationContent.UserNameValidator
            },
            password: {
                required: window.TM.App.LocalizationContent.PasswordValidator
            },
            dbname: {
                required: window.TM.App.LocalizationContent.TheDatabaseValidator
            },
            databaseName: {
                required: window.TM.App.LocalizationContent.ExistingDatabaseValidator
            },
            serverdbname: {
                required: window.TM.App.LocalizationContent.TheTenantServerDatabaseValidator
            },
            serverexistingdbname: {
                required: window.TM.App.LocalizationContent.ExistingDatabaseValidator
            },
            designerdbname: {
                required: window.TM.App.LocalizationContent.TheDesignerDatabaseValidator
            },
            designerexistingdbname: {
                required: window.TM.App.LocalizationContent.ExistingDatabaseValidator
            }
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
                isRequired: window.TM.App.LocalizationContent.PasswordValidator
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
                isRequired: window.TM.App.LocalizationContent.ServerNamevalidator
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
                isRequired: window.TM.App.LocalizationContent.PortValidator
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
                isRequired: window.TM.App.LocalizationContent.UserNameValidator
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
    messageBox("su-login-error", window.TM.App.LocalizationContent.DatabaseError, errorContent, "success", function () {
        onCloseMessageBox();
    });
});


$(document).on("click", "#db-config-submit, #sql-existing-db-submit", function () {
    var isNewDatabaseTab = $(this).attr("id") == "db-config-submit";
    removeError();
    var canProceed = $("#db-content-holder").valid();
    if (canProceed) {
        if (typeof isDockerOrk8s != "undefined" && !isDockerOrk8s) {
            showWaitingPopup($(".startup-waiting-popup"));
        }
        $(this).prop("disabled", true);
        window.serverName = $("#txt-servername").val();
        window.portNumber = $("#txt-portnumber").val();
        window.maintenanceDb = $('#maintenance-db').val();
        window.IsWindowsAuthentication = getRadioButtonValue("checkWindows") == "windows";
        window.login = $("#txt-login").val();
        window.password = $("#txt-password-db").val();
        var databaseType = getDropDownValue("database-type");
        window.databaseName = isNewDatabaseTab ? $("#txt-dbname").val() : $("#database-name").val();
        window.serverDatabaseName = isNewDatabaseTab ? $("#server-dbname").val() : $("#server-existing-dbname").val();
        window.intermediateDatabaseName = isNewDatabaseTab ? $("#imdbname").val() : $("#imdb-existing-dbname").val();
        window.sslEnabled = $("#secure-sql-connection").is(":checked");
        window.additionalParameters = $("#additional-parameter").val();
        if (!isNewDatabaseTab) {
            var tenantype = $("#tenant-type").val() === "" ? getTenantType() : $("#tenant-type").val();
        }
        doAjaxPost("POST", connectDatabaseUrl,
            {
                data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, MaintenanceDatabase: window.maintenanceDb, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, ServerDatabaseName: window.serverDatabaseName, IntermediateDatabaseName: window.intermediateDatabaseName, sslEnabled: window.sslEnabled, IsNewDatabase: isNewDatabaseTab, TenantType: getTenantType(), additionalParameters: window.additionalParameters }),
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
                                data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, MaintenanceDatabase: window.maintenanceDb, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, sslEnabled: window.sslEnabled, IsNewDatabase: true, additionalParameters: window.additionalParameters }),
                                isSimpleMode: isSimpleModeSelction()
                            },
                            function (result) {
                                hideWaitingPopup($(".startup-waiting-popup"));
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
                                data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, MaintenanceDatabase: window.maintenanceDb, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, ServerDatabaseName: window.serverDatabaseName, IntermediateDatabaseName: window.intermediateDatabaseName, sslEnabled: window.sslEnabled, TenantType: tenantype, IsNewDatabase: false, additionalParameters: window.additionalParameters }),
                                isSimpleMode: isSimpleModeSelction()
                            },
                            function (result) {
                                var items = result.Data.value;
                                if (result.Data.key && items.length > 0) {
                                    hideWaitingPopup($(".startup-waiting-popup"));
                                    var html = window.TM.App.LocalizationContent.TablesAlreadyExists;
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
                                            data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, IsNewDatabase: false })
                                        },
                                        function (result) {
                                            hideWaitingPopup($(".startup-waiting-popup"));
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
                                    $(".db-connect-outer-container").find(".title").html(window.TM.App.LocalizationContent.DatabaseCreation + "!");
                                    $("#database-name").focus();
                                } else {
                                    hideWaitingPopup($(".startup-waiting-popup"));
                                    $("#db_config_generate, #db-config-submit").hide();
                                    $("#sql-existing-db-submit").show().prop("disabled", false);
                                    errorContent = result.Data.value;
                                    $(".database-error").html(databaseValidationMessage).show();
                                }
                            });
                    }
                   
                    $(".db-connect-outer-container").find(".title").html(window.TM.App.LocalizationContent.DatabaseCreation + "!");
                    $("#txt-dbname").focus();
                }
                else {
                    hideWaitingPopup($(".startup-waiting-popup"));
                    var id = "#txt-dbname";
                    if (isNewDatabaseTab) {
                       id = result.Data.connectionResponse.IsServerDatabaseError ? "#txt-dbname" : result.Data.connectionResponse.IsTenantServerDatabaseError ? "#server-dbname" : result.Data.connectionResponse.IsIntermediateServerDatabaseError ? "#imdbname" : id;
                    }
                    else {
                        id = result.Data.connectionResponse.IsServerDatabaseError ? "#database-name" : result.Data.connectionResponse.IsTenantServerDatabaseError ? "#server-existing-dbname" : result.Data.connectionResponse.IsIntermediateServerDatabaseError ? "#imdb-existing-dbname" : id;
                    }
                    if (isNewDatabaseTab) {
                        $("#db-config-submit").show().prop("disabled", false);
                    }
                    else {
                        $("#sql-existing-db-submit").show().prop("disabled", false);
                    }
                   
                    errorContent = result.Data.value;
                    $(id).closest('div').addClass("e-error");
                    $(id).closest(".e-outline").siblings(".startup-validation").html(databaseValidationMessage).show();
                }
            }
        );
    }
});

function registerApplication(isSimpleMode) {
    getFormData();
    hideWaitingPopup($(".startup-waiting-popup"));
    $(".startup-waiting-popup").addClass("storage-page-content");
    var elem = $(".system-startUp-settings-bg");
    elem.ejWaitingPopup({ text: " " });
    $(".e-text").find(".configuration-status").remove();
    $(".e-text").append('<span class="configuration-status"></span>');
    $("#progress-parent-container").show();
    var globalAdminDetails = $("#global-admin-details").val();
    var systemSettingsData = $("#system-settings-data").val();
    var azureData = $("#azure-data").val();
    var tenantInfo = $("#tenant-info").val();
    $.ajax({
        url: setSystemSettingsUrl,
        type: "POST",
        data: {
            systemSettingsData: systemSettingsData,
            azureData: azureData,
            tenantInfo: tenantInfo,
            globalAdminDetails: globalAdminDetails,
            isSimpleMode: isSimpleMode,
        },
        success: function (setSystemSettingsResponse) {
            window.location = setSystemSettingsResponse.redirectUrl;
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
    if (isSimpleMode && !isAzureApplication ) {
        registerApplication(isSimpleMode);
    }
    else if (isAzureApplication && selfHosted) {
        azureStep();
    }
    else {
        advancedThirdStep();
    }
}

function azureStep() {
    $("#image-parent-container").show();
    $("#image-parent-container .startup-image").hide().attr("src", storageUrl).fadeIn();
    $(".startup-content span.first-content").hide().text(window.TM.App.LocalizationContent.YourStorage).slideDown();
    $(".startup-content span.second-content").hide().text(isBoldBI ? window.TM.App.LocalizationContent.StorageBIMsg : window.TM.App.LocalizationContent.StorageReportsMsg).slideDown();
    $(".startup-content a#help-link").attr("href", idStorageConfiguration);
    $(".startup-waiting-popup").addClass("storage-page-content");
    $("#system-settings-filestorage-container").slideDown("slow");
    $("#file-storage").prop("disabled", true);
    $("#blob-storage").prop("checked", true);
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
    $(".startup-content span.first-content").hide().text(window.TM.App.LocalizationContent.YourStorage).slideDown();
    $(".startup-content span.second-content").hide().text(isBoldBI ? window.TM.App.LocalizationContent.StorageBIMsg : window.TM.App.LocalizationContent.StorageReportsMsg).slideDown();
    $(".startup-content a#help-link").attr("href", idStorageConfiguration);
    $(".startup-waiting-popup").addClass("storage-page-content");
    $("#system-settings-filestorage-container").slideDown("slow");
    $(".custom-endpoint-form-element, .report-content").hide();
    $("#blob-storage-form").hide();
    $("#report-storage").hide();
    storageButtonValue = "tenant";
    $(".storage-checkbox").hide("slow");
}

function forceToLower(input) {
    input.value = input.value.toLowerCase();
}

function DomResize() {
    //$("#startup-page-conatiner").height($("#system-settings-general").height() + $("#base-footer-div").height());
}

function onDatbaseChange(args) {
    removeError();
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

    showDataStore();
    switch (checkedVal) {
        case "mssql":
            $('.port-num').removeClass("show").addClass("hidden");
            $('.maintenancedb').removeClass("show").addClass("hidden");
            $('.auth-type').removeClass("hidden").addClass("show");
            var isWindowsAuth = getRadioButtonValue("checkWindows") === "windows";
            document.getElementById("txt-login").ej2_instances[0].enabled = !isWindowsAuth;
            document.getElementById("txt-password-db").ej2_instances[0].enabled = !isWindowsAuth;
            $('#db-content-holder').css("display", "block");
            $('#db-config-submit,#sql-existing-db-submit').removeClass("hide");
            $("#move-to-next,.sqlce-content").removeClass("show").addClass("hide");
            $(".content-display").hide();
            $(".show-sql-content").slideDown("slow");
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
            $(".note-additional-parameter a").attr("href", sqlParameter);
            DomResize();
            break;
        case "mssqlce":
            $('#db-content-holder').css("display", "none");
            $('#db-config-submit,#sql-existing-db-submit').addClass("hide");
            $("#move-to-next,.sqlce-content").removeClass("hide").addClass("show");
            break;
        case "mysql":
            $('.port-num').removeClass("hidden").addClass("show");
            $('.maintenancedb').removeClass("show").addClass("hidden");
            $('.auth-type').removeClass("show").addClass("hidden");
            $('#db-content-holder').css("display", "block");
            document.getElementById("txt-login").ej2_instances[0].enabled = true;
            document.getElementById("txt-password-db").ej2_instances[0].enabled = true;
            $('#db-config-submit,#sql-existing-db-submit').removeClass("hide");
            $("#move-to-next,.sqlce-content").removeClass("show").addClass("hide");
            $(".content-display").hide();
            $(".show-sql-content").slideDown("slow");
            hideDataStore();
            if (isSiteCreation) {
                $("#admin-nav").hide();
            }

            if (!isSiteCreation) {
                prefillDbNames();
            }
           
            $("div.placeholder").remove();
            $(".note-additional-parameter a").attr("href", mySQLParameter);
            DomResize();
            break;
        case "oracle":
            $("#oracle-dsn>option:eq(0)").prop("selected", true);
            $("#oracle-dsn").selectpicker("refresh");
            $(".database-dropdown-oracle ul").html("");
            $("#database-name-oracle").html("<option value='' class='display-none'>" + window.TM.App.LocalizationContent.SelectDatabase + "</option>");
            $("#database-name-oracle").selectpicker("refresh");
            $("#new-db-oracle").prop("checked", true).trigger("change");
            $(".content-display").hide();
            $(".show-oracle-content").slideDown("slow");
            $("div.placeholder").remove();
            DomResize();
            break;
        case "postgresql":
            $('.auth-type').removeClass("show").addClass("hidden");
            $('.port-num').removeClass("hidden").addClass("show");
            $('.maintenancedb').removeClass("hidden").addClass("show");
            $('#db-content-holder').css("display", "block");
            document.getElementById("txt-login").ej2_instances[0].enabled = true;
            document.getElementById("txt-password-db").ej2_instances[0].enabled = true;
            $('#db-config-submit,#sql-existing-db-submit').removeClass("hide");
            $("#move-to-next,.sqlce-content").removeClass("show").addClass("hide");
            $(".content-display").hide();
            $(".show-sql-content").slideDown("slow");
           
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
            $(".note-additional-parameter a").attr("href", postgresSQLParameter);
            DomResize();
            if (isSiteCreation) {
                ResizeHeightForDOM();
            }

            break;
    }
        $("#new-db").prop("checked", true).trigger("change");

    if (getRadioButtonValue("databaseType") == "1") {
        $("#sql-existing-db-submit, .sql-server-existing-db").show();
        $(".database-name, #db-config-submit").hide();
    }
    else {
        $("#sql-existing-db-submit, .sql-server-existing-db").hide();
        $(".database-name, #db-config-submit").show();
    }

    if (actionType.toLowerCase() != "edit") {
        document.getElementById("txt-login").ej2_instances[0].value = null;
        document.getElementById("txt-password-db").ej2_instances[0].value = null;
        document.getElementById("txt-servername").ej2_instances[0].value = null;
        document.getElementById("additional-parameter").ej2_instances[0].value = null;
    }

    if (typeof actionType != 'undefined' && actionType.toLowerCase() != "edit") {
        switch (checkedVal) {
            case "mysql":
                $('#txt-portnumber-info').html(window.TM.App.LocalizationContent.MySqlPortInfo);
                document.getElementById("txt-portnumber").ej2_instances[0].value = "3306";
                break;
            case "postgresql":
                $('#txt-portnumber-info').html(window.TM.App.LocalizationContent.postgresPortInfo);
                document.getElementById("txt-portnumber").ej2_instances[0].value = "5432";
                document.getElementById("maintenance-db").ej2_instances[0].value = "postgres";
                break;
        }
    }
 
    addPlacehoder("#system-settings-db-selection-container");
    changeFooterPostion();
};

function onWindowsChange(args) {
    var windowsCheck = args.value == "windows";
    var databaseType = getDropDownValue("database-type");
    $("#auth-type-info").removeClass("show").addClass("hide");
    if (windowsCheck && databaseType == "MSSQL") {
        document.getElementById("txt-login").ej2_instances[0].enabled = false;
        document.getElementById("txt-password-db").ej2_instances[0].enabled = false;
        document.getElementById("txt-login").ej2_instances[0].value = null;
        document.getElementById("txt-password-db").ej2_instances[0].value = null;
        $("#auth-type-info").removeClass("hide").addClass("show");
    }
    else if (databaseType == "MSSQL") {
        document.getElementById("txt-login").ej2_instances[0].enabled = true;
        document.getElementById("txt-password-db").ej2_instances[0].enabled = true;
    }
    removeError();
}


function onDbSelectChange() {
    removeError();
    if ($("input[name='databaseType']:checked").val() === "1") {
        $(".sql-server-existing-db, #sql-existing-db-submit").show();
        $(".database-name, #db-config-submit").hide();
    } else {
        $(".sql-server-existing-db, #sql-existing-db-submit").hide();
        $(".database-name, #db-config-submit").show();
    }

    var databaseType = getDropDownValue("database-type");
    if (databaseType == "MySQL") {
        hideDataStore();
    }
    changeFooterPostion();
    DomResize();
    if (!isBoldBI) {
        hideDataStore();
    }
}

function prefillDbNames() {
    document.getElementById("txt-dbname").ej2_instances[0].value = "bold_services";
    document.getElementById("server-dbname").ej2_instances[0].value = "bold_services_server";
    document.getElementById("imdbname").ej2_instances[0].value = "bold_services_datastore";
}

function hideDataStore() {
    $(".data-store-hide").removeClass("show").addClass("hidden");
    $(".data-store-existing-db-hide").removeClass("show").addClass("hidden");
}

function showDataStore() {
    if (getRadioButtonValue("databaseType") == "1") {
        $(".data-store-existing-db-hide").removeClass("hidden").addClass("show");
    }
    else {
        $(".data-store-hide").removeClass("hidden").addClass("show");
    }
}

function removeError() {
    $(".e-error").removeClass("e-error");
    $(".validation-txt-errors").hide();
    $(".database-error").hide();
}