var userAgent = navigator.userAgent;
var regexIe8 = new RegExp("Trident(\/4.0)|(Trident\/5.0)");
var isKeyUp = false;
var ruleName;
var rules;
var errorContent = "";
var databaseValidationMessage = window.TM.App.LocalizationContent.OneOrMoreErrors + " " + window.TM.App.LocalizationContent.Click + " " + "<a id='know-more-error'>" + window.TM.App.LocalizationContent.Here + "</a> " + window.TM.App.LocalizationContent.KnowMore + ".";
var isToGetIntermediateDbDetails = false;
var systemSettingsDetails, intermediateDbDetails;
var isNewServerDB = true, isNewIntermediateDB = true;
var storagetype = window.storageType;
var storageButtonValue;
var azureDataforBoldbi = null;
$(document).ready(function () {
    $("#blob-storage-form").hide();
    $("#report-storage").hide();
    $("#system-settings-filestorage-container").hide();
    isToGetIntermediateDbDetails = ($("#get-intermediate-db-configuration").val() === "true");

    $('[data-id="database-type"]').click(function () {
        $("#database-type-dropdown .dropdown-menu").css("min-height", "auto");
    });

    $("#messageBox").ejDialog({
        width: "450px",
        height: "180px",
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        showHeader: false,
        enableModal: true,
        close: "onMessageDialogClose"
    });

    $("#move-to-next").hide();
    $("#db-content-holder,#db-config-submit, #ds-db-config-submit").show();
    $(".sqlcenot").show();
    $("#new-db").prop("checked", true);
    $(".sql-server-existing-db, #sql-existing-db-submit, #sql-existing-ds-db-submit").hide();

    $(window).resize(function () {
        changeFooterPostion();
    });

    changeFooterPostion();

    $("#tenant-content-holder").validate({
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
            sitename: {
                isRequired: true,
                isValidName: true,
                maxlength: 255
            },
            siteidentifier: {
                required: true,
                isValidIdentifier: true,
                maxlength: 255
            }
        },
        highlight: function (element) {
            $(element).closest(".txt-holder").addClass("has-error");
            $(element).closest(".text-holder").addClass("has-error");
            $(element).parent().find(".startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest(".txt-holder").removeClass("has-error");
            $(element).closest(".text-holder").removeClass("has-error");
            $(element).parent().find(".startup-validation").hide();
        },
        errorPlacement: function (error, element) {
            $(element).parent().find(".startup-validation").html(error.html());
        },
        messages: {
            sitename: {
                isRequired: window.TM.App.LocalizationContent.SiteNameValidator,
                isValidName: window.TM.App.LocalizationContent.AvoidSpecailCharacters,
                maxlength: window.TM.App.LocalizationContent.SiteValidation
            },
            siteidentifier: {
                required: window.TM.App.LocalizationContent.SiteIdentifierValidator,
                isValidIdentifier: window.TM.App.LocalizationContent.UseNumbersLetters,
                maxlength: window.TM.App.LocalizationContent.SiteValidation
            }
        }
    });

    $.validator.addMethod("isValidIdentifier", function (value, element) {
        return IsValidIdentifier(value);
    }, window.TM.App.LocalizationContent.UseNumbersLetters);

    $(document).on("click", "#tenant-config-submit", function () {
        if ($("#tenant-content-holder").valid()) {
            showWaitingPopup($(".startup-page-container-body"));
            isValidTenantNameIdentifer($("#txt-site-name").val(), $("#txt-site-identifier").val());
        }
    });

    $(document).on("click", "#welcome-page-proceed", function () {
        $("#image-parent-container .startup-image").hide().attr("src", serverSetupImageUrl).fadeIn();
        $(".startup-content").fadeIn();
        $("#system-settings-welcome-container").hide();
        $('#auth-type-dropdown').removeClass("hide").addClass("show");
        $("#system-settings-db-selection-container").slideDown("slow");
        addTitleForDropdown(".database-dropdown-margin");
    });

    $("#database-type").on("change", function () {
        $(".validation-txt-errors").hide();
        $(".validation-errors").css("display", "none");

        $(".database-name .database-error, .databse-dropdown .database-error").hide();

        $(".has-error").removeClass("has-error");
        var checkedVal = $("#database-type").val().toLowerCase();
        switch (checkedVal) {
            case "mssql":
                $('#port-number-dropdown').removeClass("show").addClass("hide");
                $('#auth-type-dropdown').removeClass("hide").addClass("show");
                $('#server-name-container').removeClass("hide").addClass("show");
                $('#mysql-odbc-dropdown').removeClass("show").addClass("hide");

                var isWindowsAuth = $("#check-windows").val() === "windows";
                $("#txt-login").attr("disabled", isWindowsAuth);
                $("#txt-password-db").attr("disabled", isWindowsAuth);

                $('#db-content-holder').css("display", "block");
                $('#db-config-submit,#sql-existing-db-submit').removeClass("hide");
                $("#move-to-next,.sqlce-content").removeClass("show").addClass("hide");
                $("#new-db").prop("checked", true).trigger("change");
                $(".databse-dropdown ul").html("");
                $("#database-name").html("<option value='' class='display-none'>" + window.TM.App.LocalizationContent.SelectDatabase + "</option>");
                $("#database-name").selectpicker("refresh");
                $(".content-display").hide();
                $(".show-sql-content").slideDown("slow");
                $("div.placeholder").remove();
                DomResize();
                break;
            case "mssqlce":
                $('#db-content-holder').css("display", "none");
                $('#db-config-submit,#sql-existing-db-submit').addClass("hide");
                $("#move-to-next,.sqlce-content").removeClass("hide").addClass("show");
                break;
            case "mysql":
                $('#auth-type-dropdown').removeClass("show").addClass("hide");
                $('#port-number-dropdown').removeClass("show").addClass("hide");
                $('#server-name-container').removeClass("hide").addClass("show");
                $('#mysql-odbc-dropdown').removeClass("hide").addClass("show");
                $('#db-content-holder').css("display", "block");
                $("#txt-login").attr("disabled", false);
                $("#txt-password-db").attr("disabled", false);
                $('#db-config-submit,#sql-existing-db-submit').removeClass("hide");
                $("#move-to-next,.sqlce-content").removeClass("show").addClass("hide");
                $("#new-db").prop("checked", true).trigger("change");
                $(".database-dropdown ul").html("");
                $("#database-name").html("<option value='' class='display-none'>Select a database</option>");
                $("#database-name").selectpicker("refresh");
                $(".content-display").hide();
                $(".show-sql-content").slideDown("slow");
                $("div.placeholder").remove();
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
                $('#auth-type-dropdown').removeClass("show").addClass("hide");
                $('#port-number-dropdown').removeClass("hide").addClass("show");
                $('#server-name-container').removeClass("hide").addClass("show");
                $('#mysql-odbc-dropdown').removeClass("show").addClass("hide");
                $('#db-content-holder').css("display", "block");
                $("#txt-login").attr("disabled", false);
                $("#txt-password-db").attr("disabled", false);
                $('#db-config-submit,#sql-existing-db-submit').removeClass("hide");
                $("#move-to-next,.sqlce-content").removeClass("show").addClass("hide");
                $("#new-db").prop("checked", true).trigger("change");
                $(".database-dropdown ul").html("");
                $("#database-name").html("<option value='' class='display-none'>" + window.TM.App.LocalizationContent.SelectDatabase + "</option>");
                $("#database-name").selectpicker("refresh");
                $(".content-display").hide();
                $(".show-sql-content").slideDown("slow");
                $("div.placeholder").remove();
                DomResize();
                break;
        }

        $(".system-settings-db-selection-field .txt-holder input[type='text'],.system-settings-db-selection-field .txt-holder input[type='password']").val("");
        addPlacehoder("#system-settings-db-selection-container");
        changeFooterPostion();
    });

    $(document).on("click", ".file-storage-submit", function () {
        if (!$("#skip-intermediate-db").is(":visible")) {
            enableOrDisableDatabaseFormElements($(this).is(":checked"));
        }
    });

    $("#check-windows").on("click change", function () {
        var windowsCheck = $("#check-windows").val() == "windows";
        var databaseType = $("#database-type").val();
        if (windowsCheck && databaseType == "MSSQL") {
            $("#txt-login").val("").attr("disabled", true);
            $("#txt-password-db").val("").attr("disabled", true);
        }
        else if (databaseType == "MSSQL") {
            $("#txt-login").attr("disabled", false);
            $("#txt-password-db").attr("disabled", false);
        }
        $(".has-error").removeClass("has-error");
        $(".validation-txt-errors").hide();
    });

    $("input[name='Connection']").on("click change", function () {
        var checkedVal = $("input[name='Connection']:checked").val();
        var accountName = $("#txt-accountname").val();
        var accessKey = $("#txt-accesskey").val();

        if (checkedVal == "http" || checkedVal == "https") {
            $(".custom-endpoint-form-element").hide();
            var finalValue = "DefaultEndpointsProtocol=" + checkedVal + ";AccountName=" + accountName + ";AccountKey=" + accessKey;
            $("#connection-string").val(finalValue);

        } else {
            var blobUrl = $("#txt-bloburl").val();

            var finalValue = "BlobEndpoint=" + blobUrl + ";AccountName=" + accountName + ";AccountKey=" + accessKey;
            $("#connection-string").val(finalValue);
            $(".custom-endpoint-form-element").show();
        }
        $("div.placeholder").remove();
        addPlacehoder("#system-settings-filestorage-container");
        changeFooterPostion();
    });

    $("#txt-bloburl,#txt_tableurl,#txt_queueurl,#txt-accountname,#txt-accesskey").on("keyup", function () {
        var checkedVal = $("input[name='Connection']:checked").val();
        var accountName = $("#txt-accountname").val();
        var accessKey = $("#txt-accesskey").val();
        if (checkedVal == "http" || checkedVal == "https") {
            var finalValue = "DefaultEndpointsProtocol=" + checkedVal + ";AccountName=" + accountName + ";AccountKey=" + accessKey;
            $("#connection-string").val(finalValue);

        } else {
            var blobUrl = $("#txt-bloburl").val();

            var finalValue = "BlobEndpoint=" + blobUrl + ";AccountName=" + accountName + ";AccountKey=" + accessKey;
            $("#connection-string").val(finalValue);
        }
    });

    $("input[name='IsBlobStorage']").on("click change", function () {
        var checkedVal = $("input[name='IsBlobStorage']:checked").val();
        if (checkedVal == "0") {
            $("#blob-storage-form").hide("slow");
            if (storageButtonValue === "tenant") {
                $(".content-value").slideDown("slow");
            } else {
                $(".report-content").slideDown("slow");
            }
            $(".storage-checkbox").hide("slow");
            $(".azure-validation").css("display", "none");
        } else {
            $(".content-value").hide();
            $(".report-content").hide();
            if (storageButtonValue === "tenant") {
                $(".storage-checkbox").hide("slow");
            }
            else {
                $(".storage-checkbox").show("slow");
            }
            $("#blob-storage-form").slideDown("slow");
            $(".validation-txt-errors").hide();
            $(".azure-validation").css("display", "none");
            $(".has-error").removeClass("has-error");
            $("div.placeholder").remove();
        }
        addPlacehoder("#system-settings-filestorage-container");
        changeFooterPostion();
    });

    $("#mysql-odbc-dsn").change(function () {
        $(this).closest(".txt-holder").removeClass("has-error");
        $(this).parents("#mysql-odbc-dropdown").find(".startup-validation").hide();
    });

    $("#db-config-submit").on("click", function () {
        $(".has-error").removeClass("has-error");
        $(".validation-txt-errors").hide();
        $(".validation-errors").html("");
        $(".database-name .database-error, .databse-dropdown .database-error").hide();
        var canProceed = $("#db-content-holder").valid();
        if (canProceed) {
            showWaitingPopup($(".startup-page-container-body"));
            $(this).prop("disabled", true);
            $("#db_loader").show();
            window.serverName = $("#txt-servername").val();
            window.portNumber = $("#txt-portnumber").val();
            window.IsWindowsAuthentication = $("#check-windows").val() == "windows";
            window.dsn = $("#mysql-odbc-dsn").val();
            window.login = $("#txt-login").val();
            window.password = $("#txt-password-db").val();
            var databaseType = $("#database-type").val();
            window.databaseName = $("#txt-dbname").val();
            window.sslEnabled = $("#secure-sql-connection").is(":checked");
            doAjaxPost("POST", connectDatabaseUrl,
                {
                    data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, Dsn: window.dsn, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, sslEnabled: window.sslEnabled, IsNewDatabase: true })
                },
                function (result) {
                    if (result.Data.key) {
                        var databaseType = $("#database-type").val();
                        doAjaxPost("POST", generateDatabaseUrl,
                            {
                                data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, Dsn: window.dsn, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, IsNewDatabase: true })
                            },
                            function (result) {
                                hideWaitingPopup($(".startup-page-container-body"));
                                if (result.Data.key) {
                                    $(".selected").removeClass("selected");
                                    $("ul li[data-move-to='startup-page-two']").addClass("selected");
                                    $("#db_loader").hide();
                                    $("#system-settings-db-selection-container").hide();
                                    window.connectionString = result.Data.value;
                                    $("#txt-username").focus();
                                    delete window.serverName;
                                    delete window.portNumber;
                                    delete window.dsn;
                                    delete window.login;
                                    delete window.password;
                                    delete window.databaseName;
                                    delete window.sslEnabled;
                                    if (isAzureApplication && selfHosted) {
                                        $("#file-storage").prop("disabled", true);
                                        $("#blob-storage").prop("checked", true);
                                        $(".custom-endpoint-form-element, .report-content").hide();
                                        $(".content-value").hide();
                                        $("#report-storage").hide();
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
                                    else if (isBoldReports && selfHosted || isBoldBI) {
                                        $("#image-parent-container .startup-image").hide().attr("src", storageUrl).fadeIn();
                                        $(".startup-content span.first-content").hide().text(window.TM.App.LocalizationContent.YourStorage).slideDown();
                                        $(".startup-content span.second-content").hide().text(window.TM.App.LocalizationContent.StorageMsg).slideDown();
                                        $(".startup-content a#help-link").attr("href", helpUrl + (isBoldBI ? "59" : "4022"));
                                        $("#system-settings-filestorage-container").slideDown("slow");
                                        $(".custom-endpoint-form-element, .report-content").hide();
                                        $("#blob-storage-form").hide();
                                        $("#report-storage").hide();
                                        storageButtonValue = "tenant";
                                        $(".storage-checkbox").hide("slow");
                                        $("body").removeClass("startup-page-container-body");
                                    }
                                }
                                else {
                                    $("#db-config-submit, #ds-db-config-submit").prop("disabled", false);
                                    $("#db_loader").hide();
                                    errorContent = result.Data.value;
                                    $(".database-name .database-error").html(databaseValidationMessage).show();
                                }
                                changeFooterPostion();
                            }
                        );
                        $(".db-connect-outer-container").find(".title").html(window.TM.App.LocalizationContent.DatabaseCreation + "!");
                        $("#txt-dbname").focus();
                    }
                    else {
                        hideWaitingPopup($(".startup-page-container-body"));
                        $("#db_config_generate").hide();
                        $("#db-config-submit, #ds-db-config-submit").show();
                        $("#db-config-submit, #ds-db-config-submit").prop("disabled", false);
                        $("#db_loader").hide();
                        errorContent = result.Data.value;
                        $(".database-name .database-error").html(databaseValidationMessage).show();
                    }
                }
            );
        }
    });
    $("#ds-db-config-submit").on("click", function () {
        $("#ds-db-config-submit").attr("disabled", true);
        showWaitingPopup($(".startup-page-container-body"));
        if ($("#database-type").val().toLowerCase() === "mssqlce") {
            dssystemsettings();
        }
        else {
            newDbConfiguration();
        }
        hideWaitingPopup($(".startup-page-container-body"));
    });

    $("#db-content-holder").on("keyup", "input", function (event) {
        if (event.keyCode == 13 && $(this).hasClass("site-creation")) {
            $("input[name='databaseType']:checked").val() === "1" ? $("#sql-existing-db-submit, #sql-existing-ds-db-submit").click() : $("#db-config-submit, #ds-db-config-submit").click();
        }
    });

    $(document).on("click", "#move-to-next", function () {
        showWaitingPopup($(".startup-page-container-body"));
        var databaseType = $("#database-type").val();
        $("#db_loader").show();
        doAjaxPost("POST", generateDatabaseUrl,
            {
                data: JSON.stringify({ ServerType: databaseType })
            },
            function (result) {
                $("#startup-page-conatiner").css("height", "");
                hideWaitingPopup(".startup-page-container-body");
                if (result.Data.key) {
                    $(".selected").removeClass("selected");
                    $("ul li[data-move-to='startup-page-two']").addClass("selected");
                    $("#db_loader").hide();
                    $("#system-settings-db-selection-container").hide();
                    window.connectionString = result.Data.value;
                    changeFooterPostion();
                    delete window.serverName;
                    delete window.portNumber;
                    delete window.dsn;
                    delete window.login;
                    delete window.password;
                    delete window.databaseName;
                    delete window.sslEnabled;
                    addPlacehoder("body");
                    $("#system-settings-user-account-container").slideDown("slow");
                    $("body").removeClass("startup-page-container-body");
                }
                else {
                    $("#db_config_generate").prop("disabled", false);
                    $("#db_loader").hide();
                    $("#connection-validation").find(".validation-errors").html(result.Data.value);
                    $("#connection-validation").show();
                }
            }
        );
    });

    $("#btn_proceed_page1").on("click", function () {
        $("#steps-container").find(".selected").removeClass("selected");
        $("li[data-move-to='startup-page-two']").addClass("selected");

        $("#system-settings-db-selection-container").hide();
        $("#system-settings-filestorage-container").slideDown("slow");
        $("#txt-username").focus();
        changeFooterPostion();
    });

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, window.TM.App.LocalizationContent.EnterName);

    $.validator.addMethod("hasWhiteSpace", function (value, element) {
        return /\s/.test(value);
    }, window.TM.App.LocalizationContent.HasSpace);

    $.validator.addMethod("isValidUser", function (value, element) {
        return isValidUserName(value)
    }, window.TM.App.LocalizationContent.UsernameInvalidChar);

    $.validator.addMethod("isValidEmail", function (value, element) {
        return IsEmail(value);
    }, window.TM.App.LocalizationContent.EnterValidEmail);

    $.validator.addMethod("isValidName", function (value, element) {
        return IsValidName("name", value);
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters);

    $.validator.addMethod("isValidPrefix", function (value, element) {
        if (/^[a-zA-Z\_]+$/g.test(value) || value === "") {
            return true;
        } else {
            return false;
        }
    }, window.TM.App.LocalizationContent.AvoidNumberSpace);


    $.validator.addMethod("isValidDatabaseName", function (value, element) {
        if (/^[a-zA-Z_0-9@~!#\$\^&()+=\-,\.\/\{\} ]+$/.test(value) && !/^[\s]+|[\s]+$/g.test(value)) {
            return true;
        }
    }, window.TM.App.LocalizationContent.AvoidLeadingTrailingSpace);

    $.validator.addMethod("sqlUsernamevalidation", function (value, element) {
        if (/^[a-zA-Z_0-9@`~!#\$\^%&*()+=\-\[\]\\\',\.\/\{\}\|:<>\? ]+$/.test(value) && !/^[\s]/g.test(value)) {
            return true;
        }
    }, window.TM.App.LocalizationContent.AvoidLeadingSpace);

    $.validator.addMethod("isValidCredentials", function (value, element) {
        return /^[a-zA-Z_0-9@`~!#\$\^%&*()+=\-\[\]\\\',\.\/\{\}\|:<>\? ]+$/.test(value);
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters + " (\";)");

    $.validator.addMethod("mySqlCredentials", function (value, element) {
        if ((/^[a-zA-Z_0-9@`~!#\$\^%&*()+=\-\[\]\\\',\.\/\{\}\|\":<>\? ]+$/.test(value) && !/^[\s]+|[\s]+$/g.test(value)) || value === "") {
            return true;
        }
    }, window.TM.App.LocalizationContent.MySqlAvoidLeadingTrailingSpace);

    $.validator.addMethod("oraclePasswordValidation", function (value, element) {
        if (/^[a-zA-Z_0-9@`~!#\$\^%&*()+=\-\[\]\\,\.\/\{\}\|:<>\? ]+$/.test(value) && !/^[\s]+|[\s]+$/g.test(value)) {
            return true;
        }
    }, window.TM.App.LocalizationContent.OracleAvoidLeadingTrailingSpace);

    $.validator.addMethod("oracleUsernameValidation", function (value, element) {
        if (/^[a-zA-Z_0-9@`~!#\$\^%&*()+=\-\[\]\\,\.\/\{\}\|:<>\? ]+$/.test(value)) {
            return true;
        }
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters + " (';\")");

    $.validator.addMethod("additionalSpecialCharValidation", function (value, element) {
        if (/^[a-zA-Z_0-9`~!\$\^()=\-\.\{\} ]+$/.test(value) || value === "") {
            return true;
        }
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters);

    $.validator.addMethod("postgresqlUsernamevalidation", function (value, element) {
        if (/^[a-zA-Z_0-9@`~!#\$\^%&*()+=\-\[\]\',\.\/\{\}\|:<>\? ]+$/.test(value) && !/^[\s]+|[\s]+$/g.test(value)) {
            return true;
        }
    }, window.TM.App.LocalizationContent.PostgresqlAvoidLeadingTrailingSpace);

    $.validator.addMethod("isValidPostgresqlCredentials", function (value, element) {
        return /^[a-zA-Z_0-9@`~!#\$\^%&*()+=\-\[\]\',\.\/\{\}\|:<>\? ]+$/.test(value);
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters + " (\"\\;)");

    $.validator.addMethod("isValidPortNumber", function (value, element) {
        return /^\d{1,5}$/.test(value) && value < 65536 && !/^[\s]/g.test(value);
    }, window.TM.App.LocalizationContent.IsValidPort);

    $(".admin-account-fields-container").validate({
        focusInvalid: false,
        errorElement: "span",
        onkeyup: function (element, event) {
            if ($(element).attr('id') == "txt-username") {
                $("#user-details").attr("data-username", $("#txt-username").val());
            }
            if ($(element).attr('id') == "txt-emailid") {
                $("#user-details").attr("data-email", $("#txt-emailid").val());
            }
            if ($(element).attr('id') == "txt-firstname" || $(element).attr('id') == "txt-lastname") {
                $("#user-details").attr("data-displayname", $("#txt-firstname").val() + " " + $("#txt-lastname").val());
            }
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false;
            }
            else
                true;
        },
        onfocusout: function (element) {
            $(element).valid();
        },
        onfocusin: function (element) {
            if (element.id === "new-password" && $("#new-password").data("toggle") === "popover" && $("#new-password").val() != undefined && $("#new-password").val() != "") {
                createPasswordPolicyRules();
            }
        },
        rules: {
            username: {
                isRequired: true,
                hasWhiteSpace: false,
                isValidName: true,
                isValidUser: true,
                additionalSpecialCharValidation: true
            },
            firstname: {
                isRequired: true,
                isValidName: true,
                additionalSpecialCharValidation: true
            },
            lastname: {
                additionalSpecialCharValidation: true
            },
            email: {
                isRequired: true,
                isValidName: true,
                isValidEmail: true
            },
            password: {
                required: true,
                isValidPassword: true
            },
            confirm: {
                required: true,
                equalTo: "#new-password"
            }
        },
        highlight: function (element) {
            $(element).parent().find(">.startup-validation").show();
            passwordBoxHightlight(element);
        },
        unhighlight: function (element) {
            passwordBoxUnhightlight(element);
            $(element).parent().find(">.startup-validation").hide();
        },
        errorPlacement: function (error, element) {
            $(element).parent().find(">.startup-validation").text(error.html());
        },
        messages: {
            username: {
                isRequired: window.TM.App.LocalizationContent.UserNameValidator
            },
            firstname: {
                isRequired: window.TM.App.LocalizationContent.FirstNameValidator
            },
            lastname: {
                isValidName: window.TM.App.LocalizationContent.AvoidSpecailCharacters
            },
            email: {
                isRequired: window.TM.App.LocalizationContent.EmailValidator
            },
            password: {
                required: window.TM.App.LocalizationContent.PasswordValidator,
                isValidPassword: window.TM.App.LocalizationContent.InvalidPassword
            },
            confirm: {
                required: window.TM.App.LocalizationContent.ConfirmPasswordValidator,
                equalTo: window.TM.App.LocalizationContent.PasswordsMismatch
            }
        }
    });

    $("#new-password").bind("keyup", function (e) {
        if ($("#new-password").val() == $("#txt-confirm-password").val()) {
            $("#txt-confirm-password").closest(".form-group").removeClass("has-error");
            $("#txt-confirm-password").parent().find(">.startup-validation").hide();
        }
        createPasswordPolicyRules();
    });

    $("#new-password").on("change", function () {
        createPasswordPolicyRules();
        $("#new-password").valid();
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
            $(element).closest(".txt-holder").addClass("has-error");
            $(element).parent().find(">.startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest(".txt-holder").removeClass("has-error");
            $(element).parent().find(">.startup-validation").hide();
            changeFooterPostion();
        },
        errorPlacement: function (error, element) {
            $(element).parent().find(">.startup-validation").text(error.html());
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
            $(element).closest(".txt-holder").addClass("has-error");
            $(element).parent().find(">.startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest(".txt-holder").removeClass("has-error");
            $(element).parent().find(">.startup-validation").hide();
            changeFooterPostion();
        },
        errorPlacement: function (error, element) {
            $(element).parent().find(">.startup-validation").text(error.html());
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
            $(element).closest(".txt-holder").addClass("has-error");
            $(element).parent().find(">.startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest(".txt-holder").removeClass("has-error");
            $(element).parent().find(">.startup-validation").hide();
            changeFooterPostion();
        },
        errorPlacement: function (error, element) {
            $(element).parent().find(">.startup-validation").text(error.html());
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
            $(element).closest(".txt-holder").addClass("has-error");
            $(element).parent().find(">.startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest(".txt-holder").removeClass("has-error");
            $(element).parent().find(">.startup-validation").hide();
            changeFooterPostion();
        },
        errorPlacement: function (error, element) {
            $(element).parent().find(">.startup-validation").text(error.html());
            changeFooterPostion();
        },
        messages: {
            username: {
                isRequired: window.TM.App.LocalizationContent.UserNameValidator
            }
        }
    });

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
            mySqlDsn: {
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
            tablePrefix: {
                isValidPrefix: true
            }
        },
        highlight: function (element) {
            $(element).closest(".txt-holder").addClass("has-error");
            $(element).closest(".text-holder").addClass("has-error");
            $(element).parent().find(">.startup-validation").show();
            if ($("#database-type").val().toLowerCase() === "mysql") {
                $(element).parents("#mysql-odbc-dropdown").find(".startup-validation").show();
            }
            if (element.id === "txt-dbname") {
                $(".database-name .database-error").html("").hide();
            }

            if (element.id === "database-name") {
                $(".sql-server-existing-db .database-error").html("").hide();
            }
        },
        unhighlight: function (element) {
            $(element).closest(".txt-holder").removeClass("has-error");
            $(element).closest(".text-holder").removeClass("has-error");
            $(element).parent().find(">.startup-validation").hide();
            if ($("#database-type").val().toLowerCase() === "mysql") {
                $(element).parents("#mysql-odbc-dropdown").find(".startup-validation").hide();
            }
            changeFooterPostion();
        },
        errorPlacement: function (error, element) {
            $(element).parent().find(">.startup-validation").html(error.html());
            if ($("#database-type").val().toLowerCase() === "mysql") {
                $(element).parents("#mysql-odbc-dropdown").find(".startup-validation").html(error.html());
            }

            changeFooterPostion();
        },
        messages: {
            servername: {
                isRequired: window.TM.App.LocalizationContent.ServerNamevalidator
            },
            portnumber: {
                isRequired: window.TM.App.LocalizationContent.PortValidator
            },
            mySqlDsn: {
                isRequired: window.TM.App.LocalizationContent.DsnValidator
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
            }
        }
    });

    $(document).on("change", "#skip-intermediate-db", function () {
        enableOrDisableDatabaseFormElements($(this).is(":checked"));
        addTitleForDropdown(".database-dropdown-margin");
    });

    $.validator.addMethod("IsValidEndPoint", function (value, element) {
        return IsValidEndPoint(value);
    }, window.TM.App.LocalizationContent.EndPoint);

    $.validator.addMethod("IsCustomEndpoint", function (value, element) {
        return IsCustomEndPoint(value, element);
    }, window.TM.App.LocalizationContent.IsValidCustomEndPoint);
    $.validator.addMethod("IsValidCustomEndPoint", function (value, element) {
        return IsValidCustomEndPoint(value, element);
    }, window.TM.App.LocalizationContent.IsValidCustomEndPoint);

    $("#blob-storage-form").validate({
        focusInvalid: false,
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
        onfocusout: function (element) {
            $(element).valid();
        },
        rules: {
            accountname: {
                isRequired: true,
                hasWhiteSpace: false
            },
            endpoint: {
                isRequired: true,
                IsValidEndPoint: true
            },
            accesskey: {
                isRequired: true
            },
            containername: {
                required: true
            },
            bloburl: {
                IsCustomEndpoint: true,
                IsValidEndPoint: true,
                IsValidCustomEndPoint: true
            }
        },
        highlight: function (element) {
            $(element).closest(".form-group").addClass("has-error");
            $(element).parent().find(">.startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest(".form-group").removeClass("has-error");
            $(element).parent().find(">.startup-validation").hide();
            changeFooterPostion();
        },
        errorPlacement: function (error, element) {
            $(element).parent().find(">.startup-validation").text(error.html());
            changeFooterPostion();
        },
        messages: {
            accountname: {
                isRequired: window.TM.App.LocalizationContent.StorageAccount
            },
            endpoint: {
                isRequired: window.TM.App.LocalizationContent.EndPoint
            },
            accesskey: {
                isRequired: window.TM.App.LocalizationContent.AccessKey
            },
            containername: {
                required: window.TM.App.LocalizationContent.ContainerName
            },
            bloburl: {
                IsCustomEndpoint: window.TM.App.LocalizationContent.BlobUrl,
                IsValidEndPoint: window.TM.App.LocalizationContent.IsValidBlobUrl,
                IsValidCustomEndPoint: window.TM.App.LocalizationContent.IsValidCustomBlobUrl
            }
        }

    });
});

function redirectToDataMigration() {
    var elem = $(".startup-page-container-body");
    elem.ejWaitingPopup({ text: " " });
    $(".e-text").find(".configuration-status").remove();
    $(".e-text").append('<span class="configuration-status"></span>');
    elem.ejWaitingPopup("show");
    getFormData();
    var systemSettingsData = $("#system-settings-data").val();
    var azureData = $("#azure-data").val();
    var appDetails = $("#app-details").val();
    setSystemSettingsData = { systemSettingsData: systemSettingsData, azureData: azureData, appDetails: appDetails };
    $.ajax({
        type: "POST", url: setSystemSettingsUrl, data: setSystemSettingsData,
        success: function (setSystemSettingsResponse) {
            window.location = setSystemSettingsResponse.redirectUrl;
        }
    });
}

function IsValidEndPoint(domainName) {
    var filter = /(?:http)s?:\/\/(?:(?!.*\d[\/?:])[a-z0-9\-._~%]+|(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\[[a-z0-9\-._~%!$&'()*+,;=:]+\])(?::\d+)?(?:[\/?][\-A-Z0-9+&@#\/%?=~_|$!:,.;]*)?/i;
    if (filter.test(domainName)) {
        return true;
    } else {
        return false;
    }
}

function IsCustomEndPoint(fieldValue, element) {
    var connectionType = $("input[name='Connection']:checked").val();
    if (connectionType == "custom-endpoint") {
        if (fieldValue == "")
            return false;
        else
            return true;
    }
    else
        return false;
}

function IsValidCustomEndPoint(fieldValue, element) {
    var connectionType = $("input[name='Connection']:checked").val();
    var accountname = $("#txt-accountname").val();
    if (connectionType == "custom-endpoint") {
        var accountName = $("#txt-accountname").val();
        var elementDomainName = $(element).val().split(".");
        var subdomain = elementDomainName.shift();
        var sndleveldomain = subdomain.split("//");
        if (sndleveldomain[1] != accountname)
            return false;
        else
            return true;
    }
    else
        return false;
}

function addTitleForDropdown(className) {
    var selecterPickerList = $(className + " .btn-group .selectpicker option");
    for (var i = 0; i < selecterPickerList.length; i++) {
        var hoveredtext = selecterPickerList.eq(i).attr("title");
        if (typeof (hoveredtext) !== "undefined") {
            $(className + " .btn-group .dropdown-menu li").eq(i).find("a").attr("title", hoveredtext).attr("data-toggle", "tooltip").attr("data-placement", "left").attr("data-container", "body");
        }
    }
    $("[data-toggle='tooltip'], .selectpicker").tooltip();
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

function isValidUserName(userName) {
    if (isKeyUp) {
        return true;
    }
    else {
        var filter = /^[A-Za-z0-9][A-Za-z0-9]*([._-][A-Za-z0-9]+){0,3}$/;
        return filter.test(userName);
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

function getFormData() {
    if ($(".admin-account-fields-container").valid()) {
        showWaitingPopup($(".startup-page-container-body"));
        var serverType = $("#database-type").val();
        var serverName = $("#txt-servername").val();
        var database = $("#database-type").val().toLowerCase();
        var portNumber = $("#txt-portnumber").val();
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


        var authenticationType = 0;
        if (!($("#check-windows").val() == "windows"))
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
                ServerType: serverType,
                ServerName: serverName,
                Port: portNumber,
                AuthenticationType: authenticationType,
                DatabaseName: databaseName,
                Prefix: prefix
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

        var appDetails = {
            AppName: $("#app-name").val(),
            AppUrl: $("#app-url").val(),
            AppConfigure: $("#app-configure").val(),
            RedirectUrl: $("#redirect-url").val(),
            ApplicationType: $("#application-type").val()
        };

        $("#global-admin-details").val(JSON.stringify(globalAdmin));
        $("#system-settings-data").val(JSON.stringify(systemSettingsData));
        $("#azure-data").val(JSON.stringify(azureData));
        $("#app-details").val(JSON.stringify(appDetails));
    }
}

$(document).on("keyup", "#client-username", function () {
    if (regexIe8.test(userAgent)) {
        if ($(this).val() === "") {
            $("#role-name").prop("disabled", true);
            $("#role-name").val("");
            $("#role-name").next(".placeholder").removeClass("hide").addClass("show");
        }
        else {
            $("#role-name").prop({ 'disabled': false, 'readonly': true });
            $("#role-name").focus(this.blur);
            $("#role-name").val($(this).val().substring(0, 25) + "_role");
            $("#role-name").next(".placeholder").removeClass("show").addClass("hide");

        }
    }
    else if ((userAgent.indexOf("Safari") != -1) && (userAgent.indexOf("Chrome") == -1)) {
        $("#role-name").val(($(this).val() === "") ? "" : $(this).val().substring(0, 25) + "_role");
        $("#role-name").css("-webkit-text-fill-color", "black");
    }
    else {
        $("#role-name").val(($(this).val() === "") ? "" : $(this).val().substring(0, 25) + "_role");
    }
});


$(document).on("change", ".css-radio", function () {
    $(".database-name .database-error, .sql-server-existing-db .database-error, .databse-dropdown .database-error,.database-name .validation-txt-errors, .sql-server-existing-db .validation-txt-errors").hide();
    $(".database-name, .databse-dropdown").removeClass("has-error");
    var database = $("#database-type").val().toLowerCase();
    switch (database) {
        case "mssql":
        case "postgresql":
            if ($("input[name='databaseType']:checked").val() === "1") {
                $(".sql-server-existing-db, #sql-existing-db-submit, #sql-existing-ds-db-submit").show();
                $(".database-name, #db-config-submit,  #ds-db-config-submit").hide();
                changeFooterPostion();
                DomResize();
            } else {
                $(".sql-server-existing-db, #sql-existing-db-submit,  #sql-existing-ds-db-submit").hide();
                $(".database-name, #db-config-submit, #ds-db-config-submit").show();
                $(".databse-dropdown ul").html("");
                $("#database-name").html("<option value='' class='display-none'>" + window.TM.App.LocalizationContent.SelectDatabase + "</option>").selectpicker("refresh");
                changeFooterPostion();
                DomResize();
            }
            break;
        case "mysql":
            if ($("input[name='databaseType']:checked").val() === "1") {
                $(".sql-server-existing-db, #sql-existing-db-submit, #sql-existing-ds-db-submit").show();
                $(".database-name, #db-config-submit,  #ds-db-config-submit").hide();
                changeFooterPostion();
                DomResize();
            } else {
                $(".sql-server-existing-db, #sql-existing-db-submit,  #sql-existing-ds-db-submit").hide();
                $(".database-name, #db-config-submit, #ds-db-config-submit").show();
                $(".databse-dropdown ul").html("");
                $("#database-name").html("<option value='' class='display-none'>Select a database</option>").selectpicker("refresh");
                changeFooterPostion();
                DomResize();
            }
            break;
    }
});

$(document).on("click", ".databse-dropdown .dropdown-toggle", function () {
    $(".databse-dropdown ul").html("");
    $("#database-name").html("<option value='' class='display-none'>" + window.TM.App.LocalizationContent.SelectDatabase + "</option>").selectpicker("refresh");
    var iswindows = $("#check-windows").val() === "windows";
    if (!iswindows) {
        $("#txt-login").valid();
        $("#txt-servername").valid();
        $("#txt-password-db").valid();
        if ($("#txt-login").val() !== "" && $("#txt-servername").val() !== "" && $("#txt-password-db").val() !== "") {
            var canProceed = true;
        } else
            var canProceed = false;
    }
    else if ($("#txt-servername").valid()) {
        var canProceed = true;
    } else
        var canProceed = false;

    if (canProceed) {
        $("#waiting-icon").show();
        $("#details-next").attr("disabled", true);
        window.serverName = $("#txt-servername").val();
        window.portNumber = $("#txt-portnumber").val();
        window.IsWindowsAuthentication = $("#check-windows").val() == "windows";
        window.login = $("#txt-login").val();
        window.password = $("#txt-password-db").val();
        var databaseType = $("#database-type").val();
        window.databaseName = $("#txt-dbname").val();
        window.sslEnabled = $("#secure-sql-connection").is(":checked");
        doAjaxPost("POST", getAllDatabaseUrl,
            {
                data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, sslEnabled: window.sslEnabled })
            },
            function (result) {
                if (result.Data.key) {
                    $(".databse-dropdown .database-error").hide();
                    var items = result.Data.value;
                    var option = "";
                    if (items.length > 0) {
                        for (var t = 0; t < items.length; t++) {
                            option += '<option value=\"' + items[t] + '\">' + items[t] + "</option>";
                        }

                        $(".databse-dropdown .database-error").html("").hide();
                        $("#database-name").append(option).selectpicker("refresh");
                        $(".databse-dropdown .btn-group").addClass("dropup");
                        for (var i = 0; i < $("#db-content-holder .databse-dropdown .bootstrap-select li a .text").length; i++) {
                            var dbTitle = $("#db-content-holder .databse-dropdown .bootstrap-select li a .text").eq(i).text();
                            $("#db-content-holder .databse-dropdown .bootstrap-select li a").eq(i).attr("title", dbTitle);
                        }
                    } else {
                        $("#database-name").selectpicker("refresh").html("<option value='' class='display-none'>" + window.TM.App.LocalizationContent.SelectDatabase + "</option>").selectpicker("refresh");
                        $(".databse-dropdown ul").html("<li class='no-results active' title='" + window.TM.App.LocalizationContent.NoDatabase + "' style='display: list-item;'>" + window.TM.App.LocalizationContent.NoDatabase + "</li>");
                    }
                    $("#details-next").removeAttr("disabled");
                    $("#waiting-icon").hide();
                } else {
                    $("#database-name").html("<option value='' class='display-none'>" + window.TM.App.LocalizationContent.SelectDatabase + "</option>").selectpicker("refresh");
                    errorContent = result.Data.value;
                    $(".databse-dropdown .bootstrap-select.system-settings-startup-page-fields").removeClass("open");
                    $(".databse-dropdown .database-error").html(databaseValidationMessage).show();
                    $("#waiting-icon").hide();
                    $("#details-next").removeAttr("disabled");
                }
            }
        );
    }
});

$(document).on("click", "#know-more-error", function () {
    messageBox("su-login-error", window.TM.App.LocalizationContent.DatabaseError, errorContent, "success", function () {
        onCloseMessageBox();
    });
});

$(document).on("click", "#sql-existing-db-submit", function () {
    $(".has-error").removeClass("has-error");
    $(".validation-txt-errors").hide();
    $(".validation-errors").html("");
    $("#connection-validation").hide();
    DomResize();
    var canProceed = $("#db-content-holder").valid();
    if ($("#database-name").val() == "") {
        return;
    }
    if (/^[a-zA-Z_0-9@~!#\$\^&()+=\-,\.\/\{\} ]+$/.test($("#database-name").val()) && !/^[\s]+|[\s]+$/g.test($("#database-name").val())) {
        canProceed = true;
    } else {
        $(".databse-dropdown .database-error").html(window.TM.App.LocalizationContent.AvoidLeadingTrailingSpace).show();
        return;
    }
    if (canProceed) {
        showWaitingPopup($(".startup-page-container-body"));
        $(this).prop("disabled", true);
        $("#db_loader").show();
        window.serverName = $("#txt-servername").val();
        window.portNumber = $("#txt-portnumber").val();
        window.IsWindowsAuthentication = $("#check-windows").val() == "windows";
        window.dsn = $("#mysql-odbc-dsn").val();
        window.login = $("#txt-login").val();
        window.password = $("#txt-password-db").val();
        var databaseType = $("#database-type").val();
        var prefix = $("#table-prefix").val() === "" ? $("#tenant-table-prefix").val() : $("#table-prefix").val();
        var tenantype = $("#tenant-type").val();
        window.databaseName = $("#database-name").val();
        window.sslEnabled = $("#secure-sql-connection").is(":checked");
        doAjaxPost("POST", connectDatabaseUrl,
            {
                data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, Dsn: window.dsn, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, sslEnabled: window.sslEnabled, IsNewDatabase: false })
            },
            function (result) {
                if (result.Data.key) {
                    var databaseType = $("#database-type").val();
                    doAjaxPost("POST", checkTableExistsUrl,
                        {
                            data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, Dsn: window.dsn, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, Prefix: prefix, sslEnabled: window.sslEnabled, TenantType: tenantype, IsNewDatabase: false })
                        },
                        function (result) {
                            var items = result.Data.value;
                            if (result.Data.key && items.length > 0) {
                                hideWaitingPopup($(".startup-page-container-body"));
                                var html = window.TM.App.LocalizationContent.TablesAlreadyExists;
                                html += "<ol class='list-area'>";
                                for (var t = 0; t < items.length; t++) {
                                    html += "<li>" + items[t] + "</li>";
                                }
                                html += "</ol>";
                                errorContent = html;
                                $(".databse-dropdown .database-error").html(databaseValidationMessage).show();
                                $("#sql-existing-db-submit, #sql-existing-ds-db-submit").prop("disabled", false);
                            } else if (!result.Data.key && items.length <= 0) {
                                doAjaxPost("POST", generateSQLTablesUrl,
                                    {
                                        data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, Dsn: window.dsn, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, Prefix: prefix, IsNewDatabase: false })
                                    },
                                    function (result) {
                                        hideWaitingPopup($(".startup-page-container-body"));
                                        if (result.Data.key) {
                                            $(".selected").removeClass("selected");
                                            $("ul li[data-move-to='startup-page-two']").addClass("selected");
                                            $("#db_loader").hide();
                                            $("#system-settings-db-selection-container").hide();
                                            window.connectionString = result.Data.value;
                                            $("#txt-username").focus();
                                            delete window.serverName;
                                            delete window.portNumber;
                                            delete window.dsn;
                                            delete window.login;
                                            delete window.password;
                                            delete window.databaseName;
                                            delete window.sslEnabled;
                                            if (isAzureApplication && selfHosted) {
                                                $("#file-storage").prop("disabled", true);
                                                $("#blob-storage").prop("checked", true);
                                                $(".custom-endpoint-form-element, .report-content").hide();
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
                                            else if (isBoldReports && selfHosted || isBoldBI) {
                                                $("#image-parent-container .startup-image").hide().attr("src", storageUrl).fadeIn();
                                                $(".startup-content span.first-content").hide().text(window.TM.App.LocalizationContent.YourStorage).slideDown();
                                                $(".startup-content span.second-content").hide().text(window.TM.App.LocalizationContent.StorageMsg).slideDown();
                                                $(".startup-content a#help-link").attr("href", helpUrl + (isBoldBI ? "59" : "4022"));
                                                $("#system-settings-filestorage-container").slideDown("slow");
                                                $(".custom-endpoint-form-element, .report-content").hide();
                                                $("#blob-storage-form").hide();
                                                $("#report-storage").hide();
                                                storageButtonValue = "tenant";
                                                $(".storage-checkbox").hide("slow");
                                                $("body").removeClass("startup-page-container-body");
                                            }
                                        } else {
                                            $("#sql-existing-db-submit, #sql-existing-ds-db-submit").prop("disabled", false);
                                            $("#db_loader").hide();
                                            errorContent = result.Data.value;

                                            $(".databse-dropdown .database-error").html(databaseValidationMessage).show();
                                        }
                                    }
                                );
                                $(".db-connect-outer-container").find(".title").html(window.TM.App.LocalizationContent.DatabaseCreation + "!");
                                $("#database-name").focus();
                            } else {
                                hideWaitingPopup($(".startup-page-container-body"));
                                $("#db_config_generate, #db-config-submit, #ds-db-config-submit").hide();
                                $("#sql-existing-db-submit,#sql-existing-ds-db-submit").show().prop("disabled", false);
                                $("#db_loader").hide();
                                errorContent = result.Data.value;
                                $(".databse-dropdown .database-error").html(databaseValidationMessage).show();
                            }
                        });
                } else {
                    hideWaitingPopup($(".startup-page-container-body"));
                    $("#db_config_generate, #db-config-submit, #ds-db-config-submit").hide();
                    $("#sql-existing-db-submit").show().prop("disabled", false);
                    $("#db_loader").hide();
                    errorContent = result.Data.value;
                    $(".databse-dropdown .database-error").html(databaseValidationMessage).show();
                }
            }
        );
    }
});

function CloseDuplicateListBox() {
    $("#duplicate-table-list").ejDialog("close");
}

$(document).on("change", "#mysql-odbc-dsn", function () {
    if ($("#mysql-odbc-dsn").val() != "") {
        $("#dsn-validate").html("").show();
    }
});

$(document).on("click", "#info-icon-postgressql", function () {
    $("#prefix-message-postgresql").css("display", "block");
});


$(document).on("click", "#info-icon", function () {
    $("#prefix-message").css("display", "block");
});

$(document).on("click", function (e) {
    if ($(e.target).attr("id") == "info-icon-mysql") {
        $("#prefix-message-mysql").css("display", "block");
    }
    else {
        $("#prefix-message-mysql").css("display", "none");
    }
    if ($(e.target).attr("id") == "info-icon-dsn") {
        $("#dsn-messgage").css("display", "block");
    }
    else {
        $("#dsn-messgage").css("display", "none");
    }
});

$(document).on("click", function (e) {
    if ($(e.target).attr("id") === "info-icon-oracle") {
        $("#prefix-message-oracle").css("display", "block");
    } else {
        $("#prefix-message-oracle").css("display", "none");
    }
    if ($(e.target).attr("id") === "info-icon-dsn-oracle") {
        $("#dsn-message-oracle").css("display", "block");
    } else {
        $("#dsn-message-oracle").css("display", "none");
    }
});

$(document).on("click", "#oracle-odbc-dropdown button.dropdown-toggle", function () {
    var dsn = $("#dsn-count").val();
    if (dsn <= 0) {
        $("#oracle-odbc-dropdown ul").html("<li class='no-results active' title='" + window.TM.App.LocalizationContent.NoDsn + "' style='display: list-item;'>" + window.TM.App.LocalizationContent.NoDsn + "</li>");
        $("#database-name-oracle").selectpicker("refresh");
    }
});

$(document).on("click", "#mysql-odbc-dropdown button.dropdown-toggle", function () {
    var dsn = $("#dsn-count").val();
    if (dsn <= 0) {
        $("#mysql-odbc-dropdown ul").html("<li class='no-results active' title='" + window.TM.App.LocalizationContent.NoDsn + "' style='display: list-item;'>" + window.TM.App.LocalizationContent.NoDsn + "</li>");
        $("#database-name-mysql").selectpicker("refresh");
    }
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

$(document).on("click", "#sql-existing-ds-db-submit", function () {
    $("#sql-existing-db-submit, #sql-existing-ds-db-submit").prop("disabled", true);
    showWaitingPopup($(".startup-page-container-body"));
    existingDbConfiguration();
    hideWaitingPopup($(".startup-page-container-body"));
    $("#database-name").val("");
});

function existingDbConfiguration(element) {
    $(".has-error").removeClass("has-error");
    $(".validation-txt-errors").hide();
    $(".validation-errors").html("");
    $(".database-name .database-error, .databse-dropdown .database-error").hide();
    DomResize();
    if (element == null || element == "" || element == undefined) {
        var canProceed = $("#db-content-holder").valid();
    }
    if ($("#database-name").val() == "") {
        $("#sql-existing-db-submit, #sql-existing-ds-db-submit").prop("disabled", false);
        return;
    }
    if (/^[a-zA-Z_0-9@~!#\$\^&()+=\-,\.\/\{\} ]+$/.test($("#database-name").val()) && !/^[\s]+|[\s]+$/g.test($("#database-name").val())) {
        canProceed = true;
    } else {
        $(".database-error").html(window.TM.App.LocalizationContent.AvoidLeadingTrailingSpace).show();
        $("#sql-existing-db-submit, #sql-existing-ds-db-submit").prop("disabled", false);
        return;
    }
    if (element == null || element == "" || element == undefined) {
        if (canProceed) {
            checkingExistingDB();
        }
        else {
            $("#sql-existing-db-submit, #sql-existing-ds-db-submit").prop("disabled", false);
        }
    } else {
        checkingExistingDB(element);
    }
}

function checkingExistingDB(element) {
    if (element == null || element == "" || element == undefined) {
        showWaitingPopup($(".startup-page-container-body"));
        $(this).prop("disabled", true);
    } else {
        $('#details-next').attr("disabled", true);
    }
    $("#db_loader").show();
    var checkStartupIntermediateDB = $("#ds-db-config-submit").attr("data-form");
    window.serverName = $("#txt-servername").val();
    window.portNumber = $("#txt-portnumber").val();
    window.IsWindowsAuthentication = $("#check-windows").val() == "windows";
    window.dsn = $("#mysql-odbc-dsn").val();
    window.login = $("#txt-login").val();
    window.password = $("#txt-password-db").val();
    var databaseType = $("#database-type").val();
    var prefix = $("#table-prefix").val() === "" ? $("#tenant-table-prefix").val() : $("#table-prefix").val();
    var tenantype = $("#tenant-type").val();
    window.databaseName = $("#database-name").val();
    window.sslEnabled = $("#secure-sql-connection").is(":checked");
    var isIntermediateDatabaseFormSubmit = $("#ds-db-config-submit").data("form") === "intermediate-db" || ($("#details-next").hasClass("intermediate-db2") && !$("#details-next").hasClass("intermediate-db"));
    if (isIntermediateDatabaseFormSubmit) {
        isNewIntermediateDB = false;
    }
    else {
        isNewServerDB = false;
    }
    $.ajax({
        type: "POST",
        url: connectDatabaseUrl,
        async: false,
        data: {
            data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, Dsn: window.dsn, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, sslEnabled: window.sslEnabled, IsNewDatabase: false })
        },
        success: function (result) {
            if (result.Data.key) {
                var connectionstring = result.Data.data;
                var databaseType = $("#database-type").val();
                $.ajax({
                    type: "POST",
                    url: checkTableExistsUrl,
                    async: false,
                    data: {
                        data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, Dsn: window.dsn, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, Prefix: prefix, sslEnabled: window.sslEnabled, TenantType: tenantype, IsNewDatabase: false })
                    },
                    success: function (result) {
                        var items = result.Data.value;
                        if (result.Data.key && items.length > 0) {
                            if (element == null || element == "" || element == undefined) {
                                hideWaitingPopup($(".startup-page-container-body"));
                                $("#sql-existing-db-submit, #sql-existing-ds-db-submit").prop("disabled", false);
                            } else {
                                hideWaitingPopup(element);
                                $('#details-next').removeAttr("disabled");
                            }

                            $(".database-error").html(databaseValidationMessage).show();

                            var html = window.TM.App.LocalizationContent.TablesAlreadyExists;
                            html += "<ol class='list-area'>";
                            for (var t = 0; t < items.length; t++) {
                                html += "<li>" + items[t] + "</li>";
                            }
                            html += "</ol>";
                            errorContent = html;
                            $(".databse-dropdown .database-error").html(databaseValidationMessage).show();

                            if (isIntermediateDatabaseFormSubmit) {
                                isNewIntermediateDB = true;
                            }
                            else {
                                isNewServerDB = true;
                            }
                        } else if (!result.Data.key && items.length <= 0) {
                            $(".selected").removeClass("selected");
                            $("ul li[data-move-to='startup-page-two']").addClass("selected");
                            $("#db_loader").hide();
                            window.connectionString = connectionstring;
                            $("#txt-username").focus();
                            delete window.serverName;
                            delete window.portNumber;
                            delete window.login;
                            delete window.password;
                            delete window.databaseName;
                            delete window.sslEnabled;
                            if (element == null || element == "" || element == undefined) {
                                if ((isAzureApplication && selfHosted) && $("#dialog-body-container").find(".storage-form").length <= 0 && checkStartupIntermediateDB != "intermediate-db") {
                                    $("#system-settings-db-selection-container").hide();
                                    $("#file-storage").prop("disabled", true);
                                    $("#blob-storage").prop("checked", true);
                                    $("#image-parent-container .startup-image").hide().attr("src", storageUrl).fadeIn();
                                    $(".startup-content span.first-content").hide().text(window.TM.App.LocalizationContent.YourStorage3).slideDown();
                                    if (isBoldBI) {
                                        $(".startup-content span.second-content").hide().text(window.TM.App.LocalizationContent.StorageBIMsg).slideDown();
                                    } else {
                                        $(".startup-content span.second-content").hide().text(window.TM.App.LocalizationContent.StorageReportsMsg).slideDown();
                                    }
                                    $(".startup-content a#help-link").attr("href", helpUrl + (isBoldBI ? "59" : "4022"));
                                    $("#system-settings-filestorage-container").slideDown("slow");
                                    $(".custom-endpoint-form-element, .content-value").hide();
                                    $("#file-storage").parent().hide();
                                    $("#blob-storage").parent().css("margin-left", "130px");
                                    $(".report-content").hide();
                                    $("#blob-storage-form").slideDown("slow");
                                    $(".storage-checkbox").show("slow");
                                    $("#tenant-storage").hide();
                                    $("#report-storage").show();
                                }
                                else if ((isBoldReports && selfHosted) && $("#dialog-body-container").find(".storage-form").length <= 0 || (isBoldBI && $("#dialog-body-container").find(".storage-form").length <= 0 && checkStartupIntermediateDB != "intermediate-db")) {
                                    $("#system-settings-db-selection-container").hide();
                                    $("#image-parent-container .startup-image").hide().attr("src", storageUrl).fadeIn();
                                    $(".startup-content span.first-content").hide().text(window.TM.App.LocalizationContent.YourStorage2).slideDown();
                                    if (isBoldBI) {
                                        $(".startup-content span.second-content").hide().text(window.TM.App.LocalizationContent.StorageBIMsg).slideDown();
                                    } else {
                                        $(".startup-content span.second-content").hide().text(window.TM.App.LocalizationContent.StorageReportsMsg).slideDown();
                                    }
                                    $(".startup-content a#help-link").attr("href", helpUrl + (isBoldBI ? "59" : "4022"));
                                    $("#system-settings-filestorage-container").slideDown("slow");
                                    $(".custom-endpoint-form-element, .content-value").hide();
                                    $(".report-content").slideDown("slow");
                                    $("#blob-storage-form").hide();
                                    $(".storage-checkbox").hide("slow");
                                    $("#tenant-storage").hide();
                                    $("#report-storage").show();
                                } else {
                                    dssystemsettings();
                                }
                                hideWaitingPopup($(".startup-page-container-body"));
                            } else {
                                hideWaitingPopup(element);
                                $('#details-next').removeAttr("disabled");
                            }
                            changeFooterPostion();
                            $(".db-connect-outer-container").find(".title").html(window.TM.App.LocalizationContent.DatabaseCreation + "!");
                            $("#database-name").focus();
                        } else {
                            if (element == null || element == "" || element == undefined) {
                                hideWaitingPopup($(".startup-page-container-body"));
                                $("#sql-existing-db-submit, #sql-existing-ds-db-submit").show().prop("disabled", false);
                            } else {
                                $('#details-next').removeAttr("disabled");
                                hideWaitingPopup(element);
                            }
                            $("#db_config_generate, #db-config-submit").hide();
                            $("#db_loader").hide();
                            errorContent = result.Data.value;
                            $(".databse-dropdown .database-error").html(databaseValidationMessage).show();

                            if (isIntermediateDatabaseFormSubmit) {
                                isNewIntermediateDB = true;
                            }
                            else {
                                isNewServerDB = true;
                            }
                        }
                    }
                });
            } else {
                if (element == null || element == "" || element == undefined) {
                    hideWaitingPopup($(".startup-page-container-body"));
                    $("#sql-existing-db-submit, #sql-existing-ds-db-submit").show().prop("disabled", false);
                } else {
                    hideWaitingPopup(element);
                    $('#details-next').removeAttr("disabled");
                }
                $("#db_config_generate, #db-config-submit").hide();
                $("#db_loader").hide();
                errorContent = result.Data.value;
                $(".databse-dropdown .database-error").html(databaseValidationMessage).show();

                if (isIntermediateDatabaseFormSubmit) {
                    isNewIntermediateDB = true;
                }
                else {
                    isNewServerDB = true;
                }
            }
        }
    });
}

function newDbConfiguration(element) {
    $(".has-error").removeClass("has-error");
    $(".validation-txt-errors").hide();
    $(".validation-errors").html("");
    $(".database-name .database-error, .databse-dropdown .database-error").hide();
    if (element == null || element == "" || element == undefined) {
        var canProceed = $("#db-content-holder").valid();
        if (canProceed) {
            showWaitingPopup($(".startup-page-container-body"));
            $(this).prop("disabled", true);
            checkingNewDBConnection();
        }
        else {
            $("#ds-db-config-submit").attr("disabled", false);
        }
    } else {
        $('#details-next').attr("disabled", true);
        checkingNewDBConnection(element);
    }
    var isIntermediateDatabaseFormSubmit = $("#ds-db-config-submit").data("form") === "intermediate-db" || ($("#details-next").hasClass("intermediate-db2") && !$("#details-next").hasClass("intermediate-db"));
    if (isIntermediateDatabaseFormSubmit) {
        isNewIntermediateDB = true;
    }
    else {
        isNewServerDB = true;
    }
}

function checkingNewDBConnection(element, actionType) {
    if ($("#skip-intermediate-db").is(":visible") && $("#skip-intermediate-db").is(":checked")) {
        dssystemsettings();
        return;
    }
    $("#db_loader").show();
    var result = connectDatabase(element, actionType);
    if (result.Data != undefined && result.Data.key) {
        delete window.serverName;
        delete window.portNumber;
        delete Window.dns;
        delete window.login;
        delete window.password;
        delete window.databaseName;
        delete window.sslEnabled;
        if (actionType != "edit") {
            var databaseType = $("#database-type").val();
            $(".selected").removeClass("selected");
            $("ul li[data-move-to='startup-page-two']").addClass("selected");
            $("#db_loader").hide();
            $("#txt-username").focus();
        }
        if (element == null || element == "" || element == undefined) {
            hideWaitingPopup($(".startup-page-container-body"));
            dssystemsettings();
        } else {
            if (actionType == "edit") {
                updateTenant(waitingPopUpElement, window.connectionString);
            }
        }
        if (actionType != "edit") {
            changeFooterPostion();
            $(".db-connect-outer-container").find(".title").html(window.TM.App.LocalizationContent.DatabaseCreation + "!");
        }
    }
    else {
        if (element == null || element == "" || element == undefined) {
            hideWaitingPopup($(".startup-page-container-body"));
            $("#db-config-submit, #ds-db-config-submit").show();
            $("#db-config-submit, #ds-db-config-submit").prop("disabled", false);
        } else {
            hideWaitingPopup(element);
            $('#details-next').removeAttr("disabled");
        }
        $("#db_config_generate").hide();
        $("#db_loader").hide();
        if (result.Data != undefined) {
            errorContent = result.Data.value;
        }
        $(".database-name .database-error").html(databaseValidationMessage).show();
    }
}

function connectDatabase(element, actionType) {
    var result = "";
    var isNewDatabase = true;
    var checkStartupIntermediateDB = $("#ds-db-config-submit").attr("data-form");
    window.serverName = $("#txt-servername").val();
    window.portNumber = $("#txt-portnumber").val();
    window.IsWindowsAuthentication = $("#check-windows").val() == "windows";
    window.dsn = $("#mysql-odbc-dsn option:selected").text();
    window.login = $("#txt-login").val();
    window.password = $("#txt-password-db").val();
    var databaseType = $("#database-type").val();
    window.databaseName = $("#txt-dbname").val();
    window.sslEnabled = $("#secure-sql-connection").is(":checked");
    if (actionType == "edit") {
        isNewDatabase = false;
    }
    $.ajax({
        type: "POST",
        url: connectDatabaseUrl,
        async: false,
        data: {
            data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Dsn: window.dsn, Port: window.portNumber, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, sslEnabled: window.sslEnabled, IsNewDatabase: true })
        },
        success: function (serverResult) {
            if (serverResult.Data.key) {
                window.connectionString = serverResult.Data.data;
                if (actionType != undefined && actionType == "edit") {
                    result = { "Data": { "key": true, "value": "connected successfully" } };
                } else {
                    $.ajax({
                        type: "POST",
                        url: checkDatabaseExistForServerUrl,
                        async: false,
                        data: {
                            data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Dsn: window.dsn, Port: window.portNumber, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, IsNewDatabase: true })
                        },
                        success: function (dataResult) {
                            if (dataResult.Data.key) {
                                if ((isAzureApplication && selfHosted) && $("#dialog-body-container").find(".storage-form").length <= 0 && checkStartupIntermediateDB != "intermediate-db") {
                                    $("#system-settings-db-selection-container").hide();
                                    $("#file-storage").prop("disabled", true);
                                    $("#blob-storage").prop("checked", true);
                                    $("#image-parent-container .startup-image").hide().attr("src", storageUrl).fadeIn();
                                    $(".startup-content span.first-content").hide().text(window.TM.App.LocalizationContent.YourStorage3).slideDown();
                                    if (isBoldBI) {
                                        $(".startup-content span.second-content").hide().text(window.TM.App.LocalizationContent.StorageBIMsg).slideDown();
                                    } else {
                                        $(".startup-content span.second-content").hide().text(window.TM.App.LocalizationContent.StorageReportsMsg).slideDown();
                                    }

                                    $(".startup-content a#help-link").attr("href", helpUrl + (isBoldBI ? "59" : "4022"));
                                    $("#system-settings-filestorage-container").slideDown("slow");
                                    $(".custom-endpoint-form-element, .content-value").hide();
                                    $("#file-storage").parent().hide();
                                    $("#blob-storage").parent().css("margin-left", "130px");
                                    $(".report-content").hide();
                                    $(".content-value").hide();
                                    $("#blob-storage-form").slideDown("slow");
                                    $(".storage-checkbox").show("slow");
                                    $("#tenant-storage").hide();
                                    $("#report-storage").show();
                                }
                                else if (((isBoldReports && selfHosted) && $("#dialog-body-container").find(".storage-form").length <= 0) || (isBoldBI && $("#dialog-body-container").find(".storage-form").length <= 0 && checkStartupIntermediateDB != "intermediate-db")) {
                                    $("#system-settings-db-selection-container").hide();
                                    $("#image-parent-container .startup-image").hide().attr("src", storageUrl).fadeIn();
                                    $(".startup-content span.first-content").hide().text(window.TM.App.LocalizationContent.YourStorage2).slideDown();
                                    if (isBoldBI) {
                                        $(".startup-content span.second-content").hide().text(window.TM.App.LocalizationContent.StorageBIMsg).slideDown();
                                    } else {
                                        $(".startup-content span.second-content").hide().text(window.TM.App.LocalizationContent.StorageReportsMsg).slideDown();
                                    }
                                    $(".startup-content a#help-link").attr("href", helpUrl + (isBoldBI ? "59" : "4022"));
                                    $("#system-settings-filestorage-container").slideDown("slow");
                                    $(".custom-endpoint-form-element, .content-value").hide();
                                    $(".report-content").slideDown("slow");
                                    $("#blob-storage-form").hide();
                                    $(".storage-checkbox").hide("slow");
                                    $("#tenant-storage").hide();
                                    $("#report-storage").show();
                                }
                                else {
                                    result = dataResult;
                                }
                            }
                            else {
                                if (element == null || element == "" || element == undefined) {
                                    hideWaitingPopup($(".startup-page-container-body"));
                                    $("#db-config-submit, #ds-db-config-submit").show();
                                    $("#db-config-submit, #ds-db-config-submit").prop("disabled", false);
                                } else {
                                    hideWaitingPopup(element);
                                    $('#details-next').removeAttr("disabled");
                                }
                                $("#db_config_generate").hide();
                                $("#db_loader").hide();
                                if (dataResult.Data != undefined) {
                                    errorContent = dataResult.Data.value;
                                }
                                $(".database-name .database-error").html(databaseValidationMessage).show();
                            }
                        }
                    });
                }
            } else {
                if (element == null || element == "" || element == undefined) {
                    hideWaitingPopup($(".startup-page-container-body"));
                    $("#db-config-submit, #ds-db-config-submit").show();
                    $("#db-config-submit, #ds-db-config-submit").prop("disabled", false);
                } else {
                    hideWaitingPopup(element);
                    $('#details-next').removeAttr("disabled");
                }
                $("#db_config_generate").hide();
                $("#db_loader").hide();
                if (serverResult.Data != undefined) {
                    errorContent = serverResult.Data.value;
                }
                $(".database-name .database-error").html(databaseValidationMessage).show();
            }
        }
    });

    return result;
}

function dssystemsettings() {
    var isIntermediateDatabaseFormSubmit = $("#ds-db-config-submit").data("form") === "intermediate-db";
    if (isIntermediateDatabaseFormSubmit) {
        var tenantDetails = {
            TenantName: $("#txt-site-name").val(),
            TenantIdentifier: $("#txt-site-identifier").val(),
            TenantType: isBoldBI ? "BoldBIOnPremise" : "BoldReportsOnPremise",
        };
        intermediateDbDetails = getDatabaseFormValues(true);
    }
    else {
        systemSettingsDetails = getDatabaseFormValues();
    }

    if (isToGetIntermediateDbDetails && !isIntermediateDatabaseFormSubmit) {
        $("#system-settings-filestorage-container").hide();
        $("#image-parent-container .startup-image").hide().attr("src", serverSetupImageUrl).fadeIn();
        $("#blob-storage-form").hide();
        $("#report-storage").hide();
        if (isAzureApplication) {
            $(".startup-content span.first-content").hide().text(window.TM.App.LocalizationContent.DataStoreConfig).slideDown();
        }
        else {
            $(".startup-content span.first-content").hide().text(window.TM.App.LocalizationContent.DataStoreConfigforBoldbi).slideDown();
        }
        $(".startup-content span.second-content").hide().text(window.TM.App.LocalizationContent.PullYourData + " " + dataConnectorsCount + "+ " + window.TM.App.LocalizationContent.DataConnectorsSaveOffline).slideDown();
        $(".startup-content a").attr("href", helpUrl + (isBoldBI ? "8" : "4024"));
        $("#system-settings-db-selection-container").hide().slideDown("slow");
        $(".database-name #txt-dbname").val("");
        $("#new-db").trigger("click");
        $("#ds-db-config-submit").attr("data-form", "intermediate-db");
        $(".skip-intermediate-db-container").show();
        $("#skip-intermediate-db").trigger("click");
        $(".validation-txt-errors").hide();
        $(".database-error").html("").hide();
        $("#sql-existing-db-submit, #sql-existing-ds-db-submit").prop("disabled", false);
        $("#db-config-submit, #ds-db-config-submit").prop("disabled", false);
    }
    else {
        postSystemSettingsData(systemSettingsDetails, azureDataforBoldbi, intermediateDbDetails, null, isIntermediateDatabaseFormSubmit ? tenantDetails : null);
    }
}

function getDatabaseFormValues(intermediateDb) {
    var formData;
    var prefix = ($("#table-prefix").val() === "" || $("#new-db").is(":checked")) ? $("#tenant-table-prefix").val() : $("#table-prefix").val();
    var databaseName = $("#new-db").is(":checked") ? $("#txt-dbname").val() : $("#database-name").val();
    var serverType = $("#database-type").val();
    var database = $("#database-type").val().toLowerCase();
    var authenticationType = 0;
    if (!($("#check-windows").val() == "windows"))
        authenticationType = 1;

    if (intermediateDb) {
        if ($("#skip-intermediate-db").is(":visible") && $("#skip-intermediate-db").is(":checked")) {
            return formData;
        }

        formData = {
            SQLConfiguration:
            {
                ConnectionString: window.connectionString,
                ServerType: serverType,
                AuthenticationType: authenticationType
            },
            StorageType: $("input[name='IsBlobStorage']:checked").val(),
        };
    }
    else {
        formData = {
            SQLConfiguration:
            {
                ConnectionString: window.connectionString,
                ServerType: serverType,
                AuthenticationType: authenticationType,
                DatabaseName: databaseName,
                Prefix: prefix
            },
            StorageType: $("input[name='IsBlobStorage']:checked").val(),
            TenantIsolation:
            {
                IsEnabled: $("#isolation-enable-switch").is(":checked"),
                IsolationCode: $("#site-isolation-code").val()
            },
            CustomAttribute: [],
        };
    }

    return formData;
}


function postSystemSettingsData(systemSettingsDetails, azuredetails, intermediateDbDetails, userEmail, tenantDetails, isAddFromServer) {
    var elem = $(".startup-page-container-body");
    elem.ejWaitingPopup({ text: " " });
    $(".e-text").find(".configuration-status").remove();
    $(".e-text").append('<span class="configuration-status"></span>');
    elem.ejWaitingPopup("show");
    showWaitingPopup($(".startup-page-container-body"));
    var isNewDatabase = isNewServerDB;
    var isNewImDatabase = isNewIntermediateDB;
    var userEmailData = (userEmail != undefined && userEmail != null) ? JSON.stringify(userEmail) : $("#tenant-email").val();
    var tenantDetailsData = (tenantDetails != undefined && tenantDetails != null) ? JSON.stringify(tenantDetails) : null;
    var intermediateDbData = (intermediateDbDetails != undefined && intermediateDbDetails != null) ? JSON.stringify(intermediateDbDetails) : null;
    setSystemSettingsData = { systemSettingsData: JSON.stringify(systemSettingsDetails), azureData: JSON.stringify(azuredetails), userEmail: userEmailData, tenantDetails: tenantDetailsData, intermediateDatabaseDetails: intermediateDbData, isNewDatabase: isNewDatabase, isNewImDatabase: isNewImDatabase };
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

function enableOrDisableDatabaseFormElements(isToDisable) {
    if ($("#details-next").hasClass("intermediate-db") || (!$(this).hasClass("intermediate-db") && $(this).hasClass("database")) || ($(this).hasClass("intermediate-db") && !$(this).hasClass("database"))) {
        if ($("#database-type").val().toLowerCase() === "postgresql") {
            $("#database-type").val("PostgreSQL");
        }
        else {
            $("#database-type").val($("#database-type option:first").val());
        }

        $("#check-windows").val($("#check-windows option:first").val());
        $("#database-name").val($("#database-name option:first").val());
        $("#txt-servername, #txt-portnumber, #txt-login, #txt-password-db, #txt-dbname").val("");
        $("#secure-sql-connection").attr("checked", false);
    }

    $(".tenant-intermediate-database-form .validation-txt-errors").hide();
    $(".tenant-intermediate-database-form .has-error").removeClass("has-error");
    $("#database-type, #check-windows, #database-name, #mysql-odbc-dsn").attr("disabled", isToDisable).selectpicker("refresh");
    $("#txt-servername, #txt-portnumber, #txt-dbname, #new-db, #existing-db, #secure-sql-connection").attr("disabled", isToDisable);
    $("a.my-sql-dropdown").parent().hide();
    var isWindowsAuth = $("#check-windows").val() === "windows";
    $("#txt-login").attr("disabled", isWindowsAuth || isToDisable);
    $("#txt-password-db").attr("disabled", isWindowsAuth || isToDisable);
}

function validate_storage_type() {
    $(".blob-error-message").hide();
    showWaitingPopup($(".startup-page-conatiner"));
    var storageType = $("input[name='IsBlobStorage']:checked").val();
    window.storageType = storageType;
    if (storageType == "1") {
        if ($("#blob-storage-form").valid()) {
            window.accountname = $("#txt-accountname").val();
            window.endpoint = $("#txt-endpoint").val();
            window.accesskey = $("#txt-accesskey").val();
            window.containername = $("#txt-containername").val();
            window.storageType = storageType;
            var blobUrl = $("#txt-bloburl").val();
            var connectionType = $("input[name='Connection']:checked").val();
            var connectionString = "";
            var storageEndPoint = $("#txt-endpoint").val();

            if (connectionType == "http" || connectionType == "https") {
                connectionString = "DefaultEndpointsProtocol=" + connectionType + ";AccountName=" + window.accountname + ";AccountKey=" + window.accesskey;

            } else {
                connectionString = "BlobEndpoint=" + blobUrl + ";AccountName=" + window.accountname + ";AccountKey=" + window.accesskey;
            }
            window.connectionType = connectionType;
            $.ajax({
                type: "POST",
                url: blobExist,
                data: { connectionString: connectionString, containerName: window.containername },
                success: function (result) {
                    if (typeof result.Data != "undefined") {
                        if (result.Data.Key.toString().toLowerCase() == "true") {
                            window.azureconnectionString = result.Data.ConnectionString;
                            $("#system-settings-filestorage-container").hide();
                            $("#image-parent-container .startup-image").hide().attr("src", adminSetupImageUrl).fadeIn();
                            if (isAzureApplication && selfHosted) {
                                $(".startup-content span.first-content").hide().text(window.TM.App.LocalizationContent.YoureAnAdmin).slideDown();
                            }
                            else {
                                $(".startup-content span.first-content").hide().text(window.TM.App.LocalizationContent.YoureAnAdmin2).slideDown();
                            }

                            $(".startup-content span.second-content").hide().text(window.TM.App.LocalizationContent.AdminHaveControl).slideDown();
                            $(".startup-content a#help-link").attr("href", helpUrl + (isBoldBI ? "6" : "4022"));
                            $("#system-settings-user-account-container").slideDown("slow");
                            hideWaitingPopup(".startup-page-conatiner");
                            changeFooterPostion();
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
        } else {
            hideWaitingPopup(".startup-page-conatiner");
            changeFooterPostion();
            return false;
        }
    } else {
        delete window.accountname;
        $("div.placeholder").remove();
        hideWaitingPopup(".startup-page-conatiner");
        $("#system-settings-filestorage-container").hide();
        $("#image-parent-container .startup-image").hide().attr("src", adminSetupImageUrl).fadeIn();
        $(".startup-content span.first-content").hide().text(window.TM.App.LocalizationContent.YoureAnAdmin2).slideDown();
        $(".startup-content span.second-content").hide().text(window.TM.App.LocalizationContent.AdminHaveControl).slideDown();
        $(".startup-content a#help-link").attr("href", helpUrl + (isBoldBI ? "6" : "4022"));
        $("#system-settings-user-account-container").slideDown("slow");
        $("body").removeClass("startup-page-container-body");
        changeFooterPostion();
        return false;
    }
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
    };
    if (storageType == "1") {
        if ($("#blob-storage-form").valid()) {
            window.accountname = $("#txt-accountname").val();
            window.endpoint = $("#txt-endpoint").val();
            window.accesskey = $("#txt-accesskey").val();
            window.containername = $("#txt-containername").val();
            window.storageenable = $(".storage-checkbox").is(":checked");

            var blobUrl = $("#txt-bloburl").val();
            var connectionType = $("input[name='Connection']:checked").val();
            var connectionString = "";
            var storageEndPoint = $("#txt-endpoint").val();


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
            if (window.storageenable == false) {
                $.ajax({
                    type: "POST",
                    url: blobExist,
                    data: { connectionString: connectionString, containerName: window.containername },
                    success: function (result) {
                        if (typeof result.Data != "undefined") {
                            if (result.Data.Key.toString().toLowerCase() == "true") {
                                hideWaitingPopup(".startup-page-conatiner");
                                if (isBoldReports) {
                                    postSystemSettingsData(systemSettingsDetails, azuredetails, intermediateDbDetails, null, tenantDetails);
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
                    postSystemSettingsData(systemSettingsDetails, azuredetails, intermediateDbDetails, null, tenantDetails);
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
            postSystemSettingsData(systemSettingsDetails, azuredetails, intermediateDbDetails, null, tenantDetails);
        }
    }

    if (isBoldBI && $("#database-type").val().toLowerCase() === "mysql") {
        $("#database-type").val($("#database-type option:first").val()).selectpicker("refresh").trigger("change");
        $("#txt-login").attr("disabled", $("#skip-intermediate-db").is(":checked"));
        $("#txt-password-db").attr("disabled", $("#skip-intermediate-db").is(":checked"));
        $("#txt-site-name").val(tenantDetails.TenantName);
        $("#txt-site-identifier").val(tenantDetails.TenantIdentifier);
    }
}

function goToDatabasePart() {
    $("#system-settings-tenant-container").hide();
    $("#system-settings-db-selection-container").slideDown("slow");
    $(".startup-image").removeClass("image-con-part");
    $(".second-content").removeClass("site-description");
    $("#image-parent-container .startup-image").hide().attr("src", serverDbImageUrl).fadeIn();
    $(".startup-content a#help-link").attr("href", helpUrl + (isBoldBI ? "7" : "4023"));
    if (isAzureApplication) {
        if (isBoldBI) {
            $(".startup-content span.first-content").hide().text(window.TM.App.LocalizationContent.YourBIDatabase).slideDown();
        }
        else {
            $(".startup-content span.first-content").hide().text(window.TM.App.LocalizationContent.YourDatabase).slideDown();
        }
    }
    else {
        if (isBoldBI) {
            $(".startup-content span.first-content").hide().text(window.TM.App.LocalizationContent.YourBIDatabase2).slideDown();
        }
        else {
            $(".startup-content span.first-content").hide().text(window.TM.App.LocalizationContent.YourDatabase2).slideDown();
        }
    }

    if (isBoldBI) {
        $(".startup-content span.second-content").hide().text(window.TM.App.LocalizationContent.DatabaseMsg).slideDown();
    }
    else {
        $(".startup-content span.second-content").hide().text(window.TM.App.LocalizationContent.DatabaseReportsMsg).slideDown();
    }
}

function isValidTenantNameIdentifer(tenantName, tenantIdentifier) {
    if (IsValidIdentifier($.trim(tenantIdentifier))) {
        $.ajax({
            type: "POST",
            url: checkTenantIdentifierExistUrl,
            data: { tenantName: tenantName, tenantIdentifier: tenantIdentifier },
            async: false,
            success: function (data) {
                hideWaitingPopup($(".startup-page-container-body"));
                if (data.Result || data.ResultIdentifier) {
                    if (data.Value != null && data.ResultIdentifier) {
                        $("#txt-site-identifier").closest(".txt-holder").addClass("has-error");
                        $("#txt-site-identifier").parent().find(".startup-validation").html(data.Value).show();
                    }
                    else {
                        $("#txt-site-identifier").closest(".txt-holder").removeClass("has-error");
                        $("#txt-site-identifier").parent().find(".startup-validation").html("").hide();
                        goToDatabasePart();
                    }
                } else {
                    $("#txt-site-identifier").closest(".txt-holder").removeClass("has-error");
                    $("#txt-site-identifier").parent().find(".startup-validation").html("").hide();
                    goToDatabasePart();
                }
            }
        });
    } else {
        hideWaitingPopup($(".startup-page-container-body"));
    }
}

function IsValidIdentifier(inputString) {
    var regex = /^[a-zA-Z0-9-]+$/;
    return regex.test(inputString);
}

$(document).on("change", ".storage-checkbox", function () {
    var value = $("#storage-checkbox").is(":checked");
    if (value == true) {
        $.ajax({
            type: "POST",
            url: "../TenantsManagement/GetAzureDetails",
            dataType: 'json',
            success: function (data) {
                var systemSetting = JSON.parse(data.AzureDetails);
                $("#txt-accountname").val(systemSetting.BlobStorageAccountName);
                $("#txt-endpoint").val(systemSetting.AzureBlobStorageUri);
                $("#txt-accesskey").val(systemSetting.BlobStorageAccessKey);
                $("#txt-containername").val(systemSetting.AzureBlobStorageContainerName);
            }
        });
    }
    else {
        $("#txt-accountname").val("");
        $("#txt-endpoint").val("");
        $("#txt-accesskey").val("");
        $("#txt-containername").val("");
    }
});