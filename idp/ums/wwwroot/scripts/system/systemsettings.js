var userAgent = navigator.userAgent;
var regexIe8 = new RegExp("Trident(\/4.0)|(Trident\/5.0)");
var isKeyUp = false;
var ruleName;
var rules;
var errorContent = "";
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
        close: "onMessageDialogClose",
        animationSettings: { effect: 'Zoom' },
    });
    messageBoxDialog.appendTo("#messageBox");

    String.prototype.format = function () {
        a = this;
        for (k in arguments) {
            a = a.replace("{" + k + "}", arguments[k])
        }
        return a
    }

    $("#default-tab").popover({
        html: true,
        trigger: 'hover',
        placement: "right",
        content: isSiteCreation ? window.Server.App.LocalizationContent.SimpleTabSiteCreationMsg : window.Server.App.LocalizationContent.SimpleTabStartupMsg
    });

    $("#advanced-tab").popover({
        html: true,
        trigger: 'hover',
        placement: "right",
        content: isSiteCreation ? window.Server.App.LocalizationContent.AdvanceTabSiteCreationMsg : window.Server.App.LocalizationContent.AdvanceTabStartupMsg
    });

    $("a[data-toggle='tab']").on('click', function (e) {
        removeError();
        var obj = document.getElementById("database-type");
        var itemsList = obj.ej2_instances[0].list.querySelectorAll('.e-list-item');
        if (isSiteCreation) {
            if (!isBoldReportsTenantType() && (IsBiPrefixSchema)) {
                $(".schema-prefix-hide").removeClass("hide").addClass("show");
            }

            if (isBoldReportsTenantType() && (IsReportsPrefixSchema)) {
                $(".schema-prefix-hide").removeClass("hide").addClass("show");
            }
        }

        if ($(this).attr("id") == "advanced-tab") {
            var databaseType = getDropDownValue("database-type");
            if (databaseType === "Oracle") {
                e.preventDefault();
            }
            else {
                $("#default-tab").removeClass("active");
                $("#advanced-tab").addClass("active");
                $("#simple-tenant-prefix").hide();
                $("#simple-server-prefix").hide();
                /*$('.server-schema-prefix-hide').removeClass("show").addClass("hidden");*/
                if (!isSiteCreation) {
                    $("#label_txt-dbname").html(window.Server.App.LocalizationContent.IDDatabaseName);
                    $("#label_database-name").html(window.Server.App.LocalizationContent.IDDatabaseName);
                }

                $("#simple_tab_db_name").hide();
                /*$("#simple_tab_db_name").removeClass("show").addClass("hidden");*/
                $("#advanced_tab_db_name").show();
                if (!isBoldBI && isSiteCreation && isBoldReportsTenantType() || !isBoldBI && !isSiteCreation) {
                    hideDataStore();
                }
                else {
                    showDataStore();
                }

                $(".simple-tab").removeClass("show").addClass("hidden");
                if (!isSiteCreation) {
                    $("#simple_tab_db_name").show();
                    $(".db-name-info").html(window.Server.App.LocalizationContent.DatabaseInfo);
                    $(".db-schema-info").html(window.Server.App.LocalizationContent.SchemaInfo);
                    prefillDbNames();
                    /*$('.simple-id-schema-prefix-hide').removeClass("hidden").addClass("show");*/
                }
                else {
                    $(".db-schema-info").html(window.Server.App.LocalizationContent.SchemaInfo);
                    $(".db-prefix-info").html(window.Server.App.LocalizationContent.PrefixInfo);
                }

                if (!isSiteCreation) {
                    $('.id-schema-prefix-hide').removeClass("hidden").addClass("show");
                }
                else {
                    $('.id-schema-prefix-hide').removeClass("show").addClass("hidden");
                }

                if ($("input[name='databaseType']:checked").val() === "1") {
                    $(".old-db").removeClass("hidden").addClass("show");
                    $(".new-smp-db").removeClass("show").addClass("hidden");
                    $(".simple-exist-schema-prefix-hide").removeClass("show").addClass("hidden");
                }
                else {
                    $(".old-db").removeClass("show").addClass("hidden");
                    $(".new-smp-db").removeClass("hidden").addClass("show");
                    $('.server-schema-prefix-hide').removeClass("show").addClass("hidden");
                }
                var databaseType = getDropDownValue("database-type").toLowerCase();;
                if (databaseType == "oracle") {
                    $(".advance-schema-prefix-hide").removeClass("show").addClass("hidden");
                    $(".ser-schema-prefix-hide").removeClass("hidden").addClass("show");
                }

                itemsList[3].style.display = "none";
                isSimpleModeValue = "false";
            }   

            itemsList[3].style.display = "none";
        }
        else {
            $("#default-tab").addClass("active");
            $("#advanced-tab").removeClass("active");
            $("#simple_tab_db_name").show();
            $("#simple-tenant-prefix").show();
            $("#simple-server-prefix").show();
            if (document.getElementById("existing-db").checked) {
                $("#simple-server-prefix").hide();
            }
            if (!isSiteCreation) {
                $("#label_txt-dbname").html(window.Server.App.LocalizationContent.DatabaseName);
                $("#label_database-name").html(window.Server.App.LocalizationContent.DatabaseName); 
            }
            else {
                $("#table-prefix-ums").hide();
                $("#table-prefix-name").hide();
            }

            $('.advance-tab').removeClass("show").addClass("hidden");
            $(".db-name-info").html(isBoldBI ? window.Server.App.LocalizationContent.DatabaseInfoBI.format(biProductname) : window.Server.App.LocalizationContent.DatabaseInfoReports.format(reportsProductname));
            if (!isSiteCreation) {
                $(".db-name-info").html(isBoldBI ? window.Server.App.LocalizationContent.DatabaseInfoBI3 : window.Server.App.LocalizationContent.DatabaseInfoReports2.format(reportsProductname, "report"));
                prefillDbNames();
                //$('.simple-tab').removeClass("show").addClass("hidden");
            }
            else {
                $(".db-schema-info").html(window.Server.App.LocalizationContent.SchemaInfo);
                $(".db-prefix-info").html(window.Server.App.LocalizationContent.PrefixInfo);
            }
            $("#advanced_tab_db_name").hide();
            if (!isSiteCreation) {
                $('.id-schema-prefix-hide').removeClass("hidden").addClass("show");
            }
            else {
                $('.id-schema-prefix-hide').removeClass("show").addClass("hidden");
            }

            if ($("input[name='databaseType']:checked").val() === "1") {
                $(".old-db").removeClass("hidden").addClass("show");
                $(".new-smp-db").removeClass("show").addClass("hidden");
            }
            else {
                $(".old-db").removeClass("show").addClass("hidden");
                $(".new-smp-db").removeClass("hidden").addClass("show");
            }

            isSimpleModeValue = "true";
            if (itemsList && itemsList.length > 3) {
                if (isSiteCreation) {
                    $(".id-schema-prefix-hide").removeClass("show").addClass("hidden");
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
                }
                else {
                    if (isBoldReports && !IsOracleSupportReports) {
                        itemsList[3].style.display = "none";
                    }
                    else if (isBoldReports && IsOracleSupportReports) {
                        itemsList[3].style.display = "";
                    }

                    if (isBoldBI && !IsOracleSupportBi) {
                        itemsList[3].style.display = "none";
                    }
                    else if (isBoldBI && IsOracleSupportBi) {
                        itemsList[3].style.display = "";
                    }
                }
            }
        }
        if (isSiteCreation) {
            ResizeHeightForDOM();
        }

        if (isSiteCreation) {
            if (!isBoldReportsTenantType() && (!IsBiPrefixSchema)) {
                $(".schema-prefix-hide").removeClass("show").addClass("hide");
            }

            if (isBoldReportsTenantType() && (!IsReportsPrefixSchema)) {
                $(".schema-prefix-hide").removeClass("show").addClass("hide");
            }
        }
        else {
            if (!IsBiPrefixSchema) {
                $(".schema-prefix-hide").removeClass("show").addClass("hide");
            }
        }
    });

    if ($('meta[name=has-drm-configuration]').attr("content") == "true") {
        $("#image-parent-container .startup-image").hide().attr("src", adminSetupImageUrl).fadeIn();
        $(".startup-content").fadeIn();
        $("#system-settings-welcome-container").hide();
        $(".welcome-content").addClass("display-none");
        $("#system-settings-offline-license-container").hide();
        $('#auth-type-dropdown').removeClass("hide").addClass("show");
        $("#system-settings-user-account-container").slideDown("slow");
        autoFocus("txt-firstname");
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
    var isNewDatabase = $("#new-db").is(":checked");
    var schemaName = getSchema($("#schema-name").val());
    var prefix = getPrefix(serverType === "Oracle" ? $("#ums-table-prefix").val() : $("#new-db").is(":checked") ? $("#txt-ums-prefix").val() : $("#ums-table-prefix").val());
    var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
    var tenantPrefix = getTenantPrefix(serverType === "Oracle" ? $("#tenant-table-prefix").val() : isAdvancedTab ? ($("#new-db").is(":checked") ? $("#server-prefix-name").val() : $("#server-table-prefix").val()) : ($("#new-db").is(":checked") ? $("#txt-server-prefix").val() : $("#tenant-table-prefix").val()));
    switch (database) {
        case "mssql":
            var databaseName = $("#new-db").is(":checked") ? $("#txt-dbname").val() : $("#databaseName").val();
            break;
        case "mysql":
            var databaseName = $("#new-db").is(":checked") ? $("#txt-dbname").val() : $("#database-name").val();
            break;
        case "oracle":
            var databaseName = $("#txt-dbname-for-oracle").val();
            isNewDatabase = $("#existing-db").is(":checked");
            //var databaseName = $("#new-db-oracle").is(":checked") ? $("#client-username").val() : $("#database-name-oracle").val();
            break;
        case "postgresql":
            var databaseName = $("#new-db").is(":checked") ? $("#txt-dbname").val() : $("#database-name").val();
            break;
    }

    if (serverType == "Oracle") {
        isNewDatabase = false;
    }

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
            AdditionalParameters: additionalParameters,
            SchemaName: schemaName,
            Prefix: prefix,
            TenantPrefix: tenantPrefix
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
        TenantName: isBoldBI && !isWhiteLabelling ? "Bold BI Enterprise Dashboards" : isBoldBI && isWhiteLabelling ? biProductname : !isBoldBI && !isWhiteLabelling ? "Bold Reports Enterprise Reporting" : reportsProductname,
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

function getTenantPrefix(prefix) {
    if (!isSiteCreation) {
        if (prefix === "") {
            if (isBoldBI) {
                prefix = defaultValues.DefaultPrefixForBI;
            }
            else {
                prefix = defaultValues.DefaultPrefixForReports;

            }
        }
    }
    else {
        if (prefix === "") {
            if (!isBoldReportsTenantType()) {
                prefix = defaultValues.DefaultPrefixForBI;
            }
            else {
                prefix = defaultValues.DefaultPrefixForReports;

            }
        }
    }

    return prefix;
}

function getPrefix(prefix) {
    if (!isSiteCreation) {
        if (prefix === "") {
            prefix = defaultValues.DefaultPrefixForUMS;
        }
    }

    return prefix;
}

function getSchema(schemaName) {
    var databaseType = getDropDownValue("database-type").toLowerCase();
    if (schemaName === "") {
        if (databaseType === "mssql") {
            schemaName = defaultValues.DefaultSchemaForMSSQL;
        }
        else if (databaseType === "postgresql") {
            schemaName = defaultValues.DefaultSchemaForPostgres;
        }
    }

    return schemaName;
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
    var databaseValidationMessage = window.Server.App.LocalizationContent.OneOrMoreErrors.format("<a id='know-more-error'>", "</a>");
    var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
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
        window.databaseName = $("#database-name").val();
    }   

    window.serverDatabaseName = $("#server-existing-dbname").val();
    window.intermediateDatabaseName = $("#imdb-existing-dbname").val();
    window.sslEnabled = $("#secure-sql-connection").is(":checked");
    window.additionalParameters = $("#additional-parameter").val();
    window.prefix = getPrefix($("#new-db").is(":checked") ? $("#txt-ums-prefix").val() : $("#ums-table-prefix").val());
    window.tenantPrefix = getTenantPrefix(databaseType === "Oracle" ? $("#tenant-table-prefix").val() : isAdvancedTab ? ($("#new-db").is(":checked") ? $("#server-prefix-name").val() : $("#server-table-prefix").val()) : ($("#new-db").is(":checked") ? $("#txt-server-prefix").val() : $("#tenant-table-prefix").val()));
    window.schemaName = getSchema($("#schema-name").val());
   
    $.ajax({
        type: "POST",
        url: connectDatabaseUrl,
        async: false,
        data: {
            data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, MaintenanceDatabase: window.maintenanceDb, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, ServerDatabaseName: window.serverDatabaseName, IntermediateDatabaseName: window.intermediateDatabaseName, sslEnabled: window.sslEnabled, IsNewDatabase: false, TenantType: getTenantType(), additionalParameters: window.additionalParameters, ServiceInstance: window.ServiceInstance, SchemaName: window.schemaName, Prefix: window.prefix, TenantPrefix: window.tenantPrefix }),
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
                        data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, MaintenanceDatabase: window.maintenanceDb, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, ServerDatabaseName: window.serverDatabaseName, IntermediateDatabaseName: window.intermediateDatabaseName, sslEnabled: window.sslEnabled, TenantType: getTenantType(), IsNewDatabase: false, additionalParameters: window.additionalParameters, ServiceInstance: window.ServiceInstance, SchemaName: window.schemaName, Prefix: window.prefix, TenantPrefix: window.tenantPrefix }),
                        isSimpleMode: isSimpleModeSelction(),
                        isSiteCreation: true
                    },
                    success: function (result) {
                        var items = result.Data.value;
                        if (result.Data.key && items.length > 0) {

                            parent.hideWaitingPopup(element);
                            $('#details-next').removeAttr("disabled");

                            var html = window.Server.App.LocalizationContent.TablesAlreadyExists;
                            html += "<ol class='list-area'>";
                            for (var t = 0; t < items.length; t++) {
                                html += "<li>" + items[t] + "</li>";
                            }
                            html += "</ol>";
                            errorContent = html;
                            $(".database-error").html(databaseValidationMessage).show();
                            $(".server-schema-prefix-hide").removeClass("show").addClass("hidden");

                        } else if (!result.Data.key && items.length <= 0) {
                            delete window.serverName;
                            delete window.portNumber;
                            delete window.login;
                            delete window.password;
                            delete window.databaseName;
                            delete window.sslEnabled;
                            parent.hideWaitingPopup(element);
                            $('#details-next').removeAttr("disabled");
                            changeFooterPostion();
                            $(".db-connect-outer-container").find(".title").html(window.Server.App.LocalizationContent.DatabaseCreation + "!");
                            $("#database-name").focus();
                        } else {
                            $('#details-next').removeAttr("disabled");
                            parent.hideWaitingPopup(element);
                            errorContent = result.Data.value;
                            $(".database-error").html(databaseValidationMessage).show();
                        }
                    }
                });
            } else {

                parent.hideWaitingPopup(element);
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
    var databaseMessage = window.Server.App.LocalizationContent.OneOrMoreErrors.format("<a id='know-more-error'>", "</a>");
    
    if (result.Data != undefined && result.Data.key && actionType == "edit") {
        var isValidDBDetail = false;
        $.ajax({
            type: "POST",
            url: checkValidDatabaseUrl,
            async: false,
            data: { tenantId: tenantId, connectionString: window.connectionString, updateSchema: window.schemaName, updatePrefix: window.tenantPrefix, TenantPrefix: window.tenantPrefix },
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
            updateTenant(element, window.tenantServerConnectionString);
            }
        if (actionType != "edit") {
            changeFooterPostion();
            $(".db-connect-outer-container").find(".title").html(window.Server.App.LocalizationContent.DatabaseCreation + "!");
        }
    }
    else {
        parent.hideWaitingPopup(element);
            $('#details-next').removeAttr("disabled");
        if (result.Data != undefined) {
            errorContent = result.Data.value;
        }
        $(".database-error").html(databaseMessage).show();
    }
}

function connectDatabase(element, actionType) {
    parent.showWaitingPopup(element);
    var ValidationMessage = window.Server.App.LocalizationContent.OneOrMoreErrors.format("<a id='know-more-error'>", "</a>");
    var result = "";
    var isNewDatabase = true;
    var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
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
        isNewDatabase = false
    } else {
        window.databaseName = $("#txt-dbname").val();
    }
    window.serverDatabaseName = $("#server-dbname").val();
    window.intermediateDatabaseName = $("#imdbname").val();
    window.sslEnabled = $("#secure-sql-connection").is(":checked");
    window.additionalParameters = $("#additional-parameter").val();
    window.prefix = getPrefix($("#new-db").is(":checked") ? $("#txt-ums-prefix").val() : $("#ums-table-prefix").val());
    window.tenantPrefix = getTenantPrefix(databaseType === "Oracle" ? $("#tenant-table-prefix").val() : isAdvancedTab ? ($("#new-db").is(":checked") ? $("#server-prefix-name").val() : $("#server-table-prefix").val()) : ($("#new-db").is(":checked") ? $("#txt-server-prefix").val() : $("#tenant-table-prefix").val()));
    window.schemaName = getSchema($("#schema-name").val());
    if (actionType == "edit") {
        isNewDatabase = false;
    }

    $.ajax({
        type: "POST",
        url: connectDatabaseUrl,
        async: false,
        data: {
            data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, MaintenanceDatabase: window.maintenanceDb, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, ServerDatabaseName: window.serverDatabaseName, IntermediateDatabaseName: window.intermediateDatabaseName, sslEnabled: window.sslEnabled, IsNewDatabase: isNewDatabase, TenantType: getTenantType(), additionalParameters: window.additionalParameters, ServiceInstance: window.ServiceInstance, SchemaName: window.schemaName, Prefix: window.prefix, TenantPrefix: window.tenantPrefix, ActionType: actionType }),
            isSimpleMode: isSimpleModeSelction(),
            isSiteCreation: true
        },
        success: function (serverResult) {
            parent.hideWaitingPopup(element);
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
                $(".database-error").html(ValidationMessage).show();
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
    if (serverType == "Oracle") {
        isNewDatabase = false;
    }
    var maintenanceDb = $('#maintenance-db').val();
    var authenticationType = 0;
    var enableSSL = $("#secure-sql-connection").is(":checked");
    var additionalParameters = $("#additional-parameter").val();
    var schemaName = getSchema($("#schema-name").val());
    var prefix = getPrefix(serverType === "Oracle" ? $("#ums-table-prefix").val() : $("#new-db").is(":checked") ? $("#txt-ums-prefix").val() : $("#ums-table-prefix").val());
    var isAdvancedTab = window.getComputedStyle(document.getElementById("advanced_tab_db_name")).display !== "none";
    var tenantPrefix = getTenantPrefix(serverType === "Oracle" ? $("#tenant-table-prefix").val() : isAdvancedTab ? ($("#new-db").is(":checked") ? $("#server-prefix-name").val() : $("#server-table-prefix").val()) : ($("#new-db").is(":checked") ? $("#txt-server-prefix").val() : $("#tenant-table-prefix").val()));
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
                AdditionalParameters: additionalParameters,
                SchemaName: schemaName,
                Prefix: prefix,
                TenantPrefix: tenantPrefix
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


function postSystemSettingsData(systemSettingsDetails, azuredetails, userName, tenantDetails, brandingType, isAddFromServer, userId, globalSettingsValues) {
    var userNameData = (userName != undefined && userName != null) ? JSON.stringify(userName) : $("#tenant-email").val();
    var tenantDetailsData = (tenantDetails != undefined && tenantDetails != null) ? JSON.stringify(tenantDetails) : null;
    var userIdValue = (userId != undefined && userId !=null) ? JSON.stringify(userId) : null;
    setSystemSettingsData = { systemSettingsData: JSON.stringify(systemSettingsDetails), azureData: JSON.stringify(azuredetails), userName: userNameData, tenantDetails: tenantDetailsData, brandingType: brandingType, userIds: userIdValue, globalSettingsOptions: globalSettingsValues };
    $.ajax({
        type: "POST", url: setSystemSettingsUrl, data: setSystemSettingsData,
        success: function (setSystemSettingsResponse) {
            if (isAddFromServer != undefined && isAddFromServer) {
                parent.hideWaitingPopup('add-tenant-popup');
                $("#provide-admin-access-button").attr("disabled", "disabled");
                var tenantGridObj = parent.document.getElementById('tenants_grid').ej2_instances[0];
                tenantGridObj.refresh();
                onAddAdminsDialogClose();
                parent.document.getElementById("add-tenant-popup").ej2_instances[0].hide();

                if (parent.window.location.href.indexOf("action=create-new-site") > -1) {
                    parent.history.pushState(null, '', umsSitesUrl);
                }

                parent.window.location.href = setSystemSettingsResponse.redirectUrl;
            }
            else {
                showWaitingPopup('startup-page-container-waiting-element');
                window.location = setSystemSettingsResponse.redirectUrl;
            }
        }
    });
}

function validate_report_storage() {
    $(".blob-error-message").hide();
    showWaitingPopup('startup-page-conatiner', true);
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
                                hideWaitingPopup('startup-page-conatiner', true);
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
                                hideWaitingPopup('startup-page-conatiner', true);
                                $(".azure-validation,.blob-error-message").css("display", "block");
                                changeFooterPostion();
                            }
                        } else {
                            hideWaitingPopup('startup-page-conatiner', true);
                            $(".azure-validation,.blob-error-message").css("display", "block");
                            changeFooterPostion();
                        }
                    }
                });

                return false;
            }
            else {
                hideWaitingPopup('startup-page-conatiner', true);
                if (isBoldReports) {
                    postSystemSettingsData(systemSettingsDetails, azuredetails, intermediateDbDetails, null, tenantDetails, tenantType);
                }
            }
        } else {
            hideWaitingPopup('startup-page-conatiner', true);
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
        hideWaitingPopup('startup-page-conatiner', true);
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

function validateNoWhiteSpace(input) {
    input.value = input.value.replace(/\s/g, '');
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

    $(".dialog-body-div").css("height", "auto");
    gridHeight = height;
}

// Returns true if startup is already completed.
function validateStartup(result) {
    $.ajax({
        type: "GET",
        url: validateStartupUrl,
        success: function (data) {
            if (data.Data) {
                result(true);
            } else {
                result(false);
            }
        }
    });
}
