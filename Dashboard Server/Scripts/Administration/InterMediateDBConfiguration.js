$(document).ready(function () {
    var isNewDatabase = $('input[name=databaseType]:checked').val() === "0" ? true : false;
    
        $("#database-type").on("change", function () {
            var checkedVal = $("#database-type").val().toLowerCase();
            var windowsCheck = $("#check-windows").val() === "windows";
            if (checkedVal === "mssql") {
                $("#db-content-holder").show();
                $("#db-content-holder").removeClass("display-none");
                $('#port-number-dropdown').removeClass("show").addClass("hide");
                $('#authentication-dropdown').removeClass("hide").addClass("show");
                if (windowsCheck) {
                    $("#txt-login").val("").attr("disabled", true);
                    $("#txt-password-db").val("").attr("disabled", true);
                }
                else {
                    $("#txt-login").attr("disabled", false);
                    $("#txt-password-db").attr("disabled", false);
                }
            }
            else if (checkedVal === "postgresql") {
                $("#db-content-holder").show();
                $("#db-content-holder").removeClass("display-none");
                $('#authentication-dropdown').removeClass("show").addClass("hide");
                $('#port-number-dropdown').removeClass("hide").addClass("show");
                $("#txt-login").attr("disabled", false);
                $("#txt-password-db").attr("disabled", false);
            }
            else {
                $("#db-content-holder").addClass("display-none");
                $('#port-number-dropdown').removeClass("show").addClass("hide");
                $('#authentication-dropdown').removeClass("hide").addClass("show");
                $("#database-name").html("<option value='' class='display-none'>" + window.Server.App.LocalizationContent.SelectDatabase + "</option>").selectpicker("refresh");
                $("#txt-servername").val("");
                $("#txt-dbname").val("");
                $("#txt-login").val("");
                $("#txt-password-db").val("");
            }
        });

        $("#check-windows").on("click change", function () {
            var windowsCheck = $("#check-windows").val() == "windows";
            var databaseType = $("#database-type").val();
            if (windowsCheck) {
                $("#txt-login").val("").attr("disabled", true);
                $("#txt-password-db").val("").attr("disabled", true);
            }
            else {
                $("#txt-login").attr("disabled", false);
                $("#txt-password-db").attr("disabled", false);
            }
            $(".has-error").removeClass("has-error");
            $(".validation-txt-errors").hide();
        });

        $('input[type=radio][name=databaseType]').change(function () {
            if ($(this).val() === "0") {
                $("#existing-db-form").addClass("display-none");
                $("#new-db-form").removeClass("display-none");
                $("#database-name").html("<option value='' class='display-none'>" + window.Server.App.LocalizationContent.SelectDatabase + "</option>").selectpicker("refresh");
                isNewDatabase = true;
            } else {
                $("#txt-dbname").val("");
                $("#existing-db-form").removeClass("display-none");
                $("#new-db-form").addClass("display-none");
                isNewDatabase = false;
            }
        });

        $.validator.addMethod("isValidDatabaseName", function (value, element) {
            if (/^[a-zA-Z_0-9@~!#\$\^&()+=\-,\.\/\{\} ]+$/.test(value) && !/^[\s]+|[\s]+$/g.test(value)) {
                return true;
            }
        }, window.Server.App.LocalizationContent.AvoidLeadingTrailingSpace);

        $.validator.addMethod("sqlUsernamevalidation", function (value, element) {
            if (/^[a-zA-Z_0-9@`~!#\$\^%&*()+=\-\[\]\\\',\.\/\{\}\|:<>\? ]+$/.test(value) && !/^[\s]/g.test(value)) {
                return true;
            }
        }, window.Server.App.LocalizationContent.AvoidLeadingSpace);

        $.validator.addMethod("isValidCredentials", function (value, element) {
            return /^[a-zA-Z_0-9@`~!#\$\^%&*()+=\-\[\]\\\',\.\/\{\}\|:<>\? ]+$/.test(value);
        }, window.Server.App.LocalizationContent.AvoidSpecialCharactors);

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
                    required: {
                        depends: function () {
                            return ($("input[name='databaseType']:checked").val() === "0");
                        }
                    },
                    isValidDatabaseName: {
                        depends: function () {
                            return ($("input[name='databaseType']:checked").val() === "0");
                        }
                    }
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
                servername: {
                    isRequired: window.Server.App.LocalizationContent.ServerNamevalidator
                },
                portnumber: {
                    isRequired: window.Server.App.LocalizationContent.PortValidator
                },
                username: {
                    required: window.Server.App.LocalizationContent.UserNameValidator
                },
                password: {
                    required: window.Server.App.LocalizationContent.PasswordValidator
                },
                dbname: {
                    required: window.Server.App.LocalizationContent.DatabaseValidator
                }
            }
        });

        $(document).on("click", ".databse-dropdown .dropdown-toggle", function () {
            $(".databse-dropdown ul").html("");
            $("#database-name").html("<option value='' class='display-none'>" + window.Server.App.LocalizationContent.SelectDatabase + "</option>").selectpicker("refresh");
            var iswindows = $("#check-windows").val() === "windows";
            if (!iswindows) {
                $("#txt-login").valid();
                $("#txt-servername").valid();
                $("#txt-portnumber").valid();
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
                            $("#database-error").hide();
                            $("#connection-validation").addClass("display-none");
                            var items = result.Data.value;
                            var option = "";
                            if (items.length > 0) {
                                for (var t = 0; t < items.length; t++) {
                                    option += '<option value=\"' + items[t] + '\">' + items[t] + "</option>";
                                }
                                $("#connection-validation").find(".validation-errors").html("");
                                $("#database-name").append(option).selectpicker("refresh");
                                for (var i = 0; i < $("#db-content-holder .databse-dropdown .bootstrap-select li a .text").length; i++) {
                                    var dbTitle = $("#db-content-holder .databse-dropdown .bootstrap-select li a .text").eq(i).text();
                                    $("#db-content-holder .databse-dropdown .bootstrap-select li a").eq(i).attr("title", dbTitle);
                                }
                            } else {
                                $("#database-name").selectpicker("refresh").html("<option value='' class='display-none'>" + window.Server.App.LocalizationContent.SelectDatabase + "</option>").selectpicker("refresh");
                                $(".databse-dropdown ul").html("<li class='no-results active' title='" + window.Server.App.LocalizationContent.NodatabaseTitle + "' style='display: list-item;'>" + window.Server.App.LocalizationContent.Nodatabase + "</li>");
                            }
                            $("#waiting-icon").hide();
                        } else {
                            $("#database-name").html("<option value='' class='display-none'>" + window.Server.App.LocalizationContent.SelectDatabase + "</option>").selectpicker("refresh");
                            $("#connection-validation").find(".validation-errors").html(result.Data.value).css("display", "block");
                            $("#waiting-icon").hide();
                        }
                    }
                );
            }
        });

        function createNewDatabase() {
            $(".has-error").removeClass("has-error");
            $(".validation-txt-errors").hide();
            $(".validation-errors").html("");
            $("#connection-validation").addClass("display-none");
            $("#update-datastore-settings").prop("disabled", true);
            var canProceed = $("#db-content-holder").valid();
            if (canProceed) {
                $("#content-area").ejWaitingPopup("show");
                window.serverName = $("#txt-servername").val();
                window.portNumber = $("#txt-portnumber").val();
                window.IsWindowsAuthentication = $("#check-windows").val() == "windows";
                window.login = $("#txt-login").val();
                window.password = $("#txt-password-db").val();
                var databaseType = $("#database-type").val();
                window.databaseName = $("#txt-dbname").val();
                window.sslEnabled = $("#secure-sql-connection").is(":checked");
                doAjaxPost("POST", connectDatabaseUrl,
                    {
                        data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, sslEnabled: window.sslEnabled, isNewDatabase: true })
                    },
                    function (result) {
                        if (result.Data.key) {
                            doAjaxPost("POST", generateIntermediateDatabaseUrl,
                                {
                                    data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, sslEnabled: window.sslEnabled, Prefix: "" })
                                },
                                function (result) {
                                    if (result.Data.key) {
                                        $(".selected").removeClass("selected");
                                        window.connectionString = result.Data.value;
                                        doAjaxPost("POST", updateIntermediateDBUrl,
                                            {
                                                data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, sslEnabled: window.sslEnabled, Prefix: "" })
                                            },
                                            function (result) {
                                                if (result.Data.key) {
                                                    SuccessAlert(window.Server.App.LocalizationContent.DatabaseSettings, window.Server.App.LocalizationContent.SettingsSuccessAlert, 7000);
                                                }
                                                else {
                                                    WarningAlert(window.Server.App.LocalizationContent.DatabaseSettings, window.Server.App.LocalizationContent.SettingsWarningAlert, 7000);
                                                }
                                                $("#content-area").ejWaitingPopup("hide");
                                            });
                                        $("#txt-username").focus();
                                        delete window.serverName;
                                        delete window.portNumber;
                                        delete window.login;
                                        delete window.password;
                                        delete window.databaseName;
                                        delete window.sslEnabled;
                                    }
                                    else {
                                        $("#content-area").ejWaitingPopup("hide");
                                        $("#connection-validation").removeClass("display-none");
                                        $("#connection-validation").find(".validation-errors").html(result.Data.value).css("display", "block");
                                    }
                                }
                            );
                            $("#txt-dbname").focus();
                        }
                        else {
                            $("#content-area").ejWaitingPopup("hide");
                            $("#connection-validation").removeClass("display-none");
                            $("#connection-validation").find(".validation-errors").html(result.Data.value).css("display", "block");
                        }
                    }


                );
            }
        }

        $("#update-datastore-settings").on("click", function () {
            if (isNewDatabase) {
                createNewDatabase();
                $("#update-datastore-settings").prop("disabled", false);
            }
            else {
                $(".has-error").removeClass("has-error");
                $(".validation-txt-errors").hide();
                $(".validation-errors").html("");
                $("#connection-validation").addClass("display-none");
                var canProceed = $("#db-content-holder").valid();
                if ($("#database-name").val() == "") {
                    $("#database-error").html(window.Server.App.LocalizationContent.DatabaseType).show();
                    return;
                }
                if (canProceed) {
                    $("#content-area").ejWaitingPopup("show");
                    $("#update-datastore-settings").prop("disabled", true);
                    window.serverName = $("#txt-servername").val();
                    window.portNumber = $("#txt-portnumber").val();
                    window.IsWindowsAuthentication = $("#check-windows").val() == "windows";
                    window.login = $("#txt-login").val();
                    window.password = $("#txt-password-db").val();
                    var databaseType = $("#database-type").val();
                    databaseType = databaseType == "SQLite" ? "MSSQLCE" : databaseType;
                    window.databaseName = $("#database-name").val() == "" ? $("#txt-dbname").val() : $("#database-name").val();
                    window.sslEnabled = $("#secure-sql-connection").is(":checked");
                    //if (databaseType == "MSSQL") {
                    doAjaxPost("POST", connectDatabaseUrl,
                        {
                            data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, sslEnabled: window.sslEnabled, isNewDatabase: false })
                        },
                        function (result) {
                            if (result.Data.key) {
                                doAjaxPost("POST", updateIntermediateDBUrl,
                                    {
                                        data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, Port: window.portNumber, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, sslEnabled: window.sslEnabled, Prefix: "" })
                                    },
                                    function (result) {
                                        if (result.Data.key) {
                                            SuccessAlert(window.Server.App.LocalizationContent.DatabaseSettings, window.Server.App.LocalizationContent.SettingsSuccessAlert, 7000);
                                        }
                                        else {
                                            WarningAlert(window.Server.App.LocalizationContent.DatabaseSettings, window.Server.App.LocalizationContent.SettingsWarningAlert, 7000);
                                        }
                                        $("#update-datastore-settings").prop("disabled", false);
                                        $("#content-area").ejWaitingPopup("hide");
                                    });
                                delete window.serverName;
                                delete window.portNumber;
                                delete window.login;
                                delete window.password;
                                delete window.databaseName;
                                delete window.sslEnabled;
                            }
                            else {
                                $("#update-datastore-settings").prop("disabled", false);
                                $("#connection-validation").removeClass("display-none");
                                $("#connection-validation").find(".validation-errors").html(result.Data.value).css("display", "block");
                                $("#content-area").ejWaitingPopup("hide");
                            }
                        });
                    //}
                    //else {
                    //    doAjaxPost("POST", updateIntermediateDBUrl,
                    //           {
                    //               data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, userName: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName, sslEnabled: window.sslEnabled, Prefix: "" })
                    //           },
                    //           function (result) {
                    //               if (result.Data.key) {
                    //                   SuccessAlert(window.Server.App.LocalizationContent.DatabaseSettings, window.Server.App.LocalizationContent.SettingsSuccessAlert, 7000);
                    //               }
                    //               else {
                    //                   WarningAlert(window.Server.App.LocalizationContent.DatabaseSettings, window.Server.App.LocalizationContent.SettingsWarningAlert, 7000);
                    //               }
                    //               $("#update-datastore-settings").prop("disabled", false);
                    //               $("#content-area").ejWaitingPopup("hide");
                    //           });
                    //}

                }
            }
        });
    setTimeout(function () {
        addTitleForDropdownList(".database-dropdown-margin");
    }, 1000);
    
});