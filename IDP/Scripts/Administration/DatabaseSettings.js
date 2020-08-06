$(document).ready(function () {
    $("#Checkwindows").on("change", function () {
        var windowsCheck = $("this").val().toLowerCase() === "windows";
        var databaseType = $("input[name='DatabaseType']:checked").val();

        if (windowsCheck) {
            $(".confirmationMessage_Success").hide();
            $("#error_msg").hide();
            $("#txt_Login-error").hide();
            $("#txt_Password_db-error").hide();
            $("#txt_Login").val("").attr("disabled", true);
            $("#txt_Password_db").val("").attr("disabled", true);
            $(".form-input-field").removeClass("has-error");
        }
        else {
            $("#txt_Login").attr("disabled", false);
            $("#txt_Password_db").attr("disabled", false);
        }
        $(".has-error").removeClass("has-error");
        $(".validation-txt-errors").hide();
    });

    $("#db_config_submit_New").on("click", function () {
        $(".confirmationMessage_Success").hide();
        $("#error_msg").hide();
        if (($("#txt_Login").val !== "") && ($("#txt_Password_db").val() !== "") || ($("#Checkwindows").val().toLowerCase() === "windows")) {
            $("#error_msg").show();
            $(".validation-errors").html("");
            window.serverName = $("#txt_Servername").val();
            window.IsWindowsAuthentication = $("#Checkwindows").val().toLowerCase() === "windows";
            window.login = $("#txt_Login").val();
            window.password = $("#txt_Password_db").val();
            window.databaseName = $("#txt_Dbname").val();
            showWaitingPopup($("#body"));
            doAjaxPost("POST", "../ServerConfiguration/ConnectDatabase",
                {
                    data: JSON.stringify({ serverName: window.serverName, username: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName })
                },
                function (result) {
                    if (result.Data.key) {
                        if (result.Data.key) {
                            var databaseType = $("input[name='DatabaseType']:checked").val();
                            doAjaxPost("POST", "../Administration/DatabaseSettings",
                                {
                                    data: JSON.stringify({ ServerType: databaseType, serverName: window.serverName, username: window.login, password: window.password, IsWindowsAuthentication: window.IsWindowsAuthentication, databaseName: window.databaseName })
                                },
                                function (result) {
                                    hideWaitingPopup($("#base_container"));
                                    $(".confirmationMessage_Success").show();
                                    $(".confirmationMessage_Error").hide();
                                    $("#txt_Password_db").parent(".form-input-field").removeClass("has-error");
                                    $("#txt_Login").parent(".form-input-field").removeClass("has-error");
                                    if (result.Data.key) {
                                        $("#txt_Login").focus();
                                        window.connectionString = result.Data.value;
                                        delete window.serverName;
                                        delete window.login;
                                        delete window.password;
                                        delete window.databaseName;
                                    }
                                    else {
                                        $("#connection_validation").find(".validation-errors").html(result.Data.value);
                                        $("#txt_Password_db").parent(".form-input-field").addClass("has-error");
                                        $("#txt_Login").parent(".form-input-field").addClass("has-error");
                                        $(".confirmationMessage_Success").hide();
                                    }
                                    hideWaitingPopup($("#base_container"));
                                }
                            );
                        }
                        else {
                            hideWaitingPopup($("#base_container"));
                            $("#connection_validation").find(".validation-errors").html(result.Data.value);
                            $("#txt_Password_db").parent(".form-input-field").addClass("has-error");
                            $("#txt_Login").parent(".form-input-field").addClass("has-error");
                            $(".confirmationMessage_Success").hide();
                        }
                    }
                    else {
                        hideWaitingPopup($("#base_container"));
                        $("#connection_validation").find(".validation-errors").html(result.Data.value);
                        $("#txt_Password_db").parent(".form-input-field").addClass("has-error");
                        $("#txt_Login").parent(".form-input-field").addClass("has-error");
                        $(".confirmationMessage_Success").hide();
                    }
                }

                  );
        }
        else {
            $("#txt_Password_db").parent(".form-input-field").addClass("has-error");
            $("#txt_Login").parent(".form-input-field").addClass("has-error");
            $("#txt_Login").focus();
            $("#txt_Password_db").focus();
            $("#txt_Login").focus();
        }
    });

    $("#database-setting-body").validate({
        errorElement: "span",
        onkeyup: function (element, event) { if (event.keyCode != 9) $(element).valid(); else true; },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            ServerName: {
                isRequired: true
            },
            username: {
                required: true
            },
            Password: {
                required: true
            },
            DatabaseName: {
                isRequired: true
            }
        },

        highlight: function (element) {
            $("#error_msg").hide();
            $("#txt_Login-error").show();
            $("#txt_Password_db-error").show();
            $(element).closest(".form-input-field").addClass("has-error");
        },
        unhighlight: function (element) {
            $(element).closest(".form-input-field").removeClass("has-error");
            $(".confirmationMessage_Success").hide();
            $("#error_msg").hide();
            $(element).parent().find("span.validation-errors").html("");
        },
        errorPlacement: function (error, element) {
            $("#error_msg").show();
            $(element).parent().find("span.validation-errors").html(error);
        },
        messages: {
            ServerName: {
                isRequired: "Please enter server name."
            },
            username: {
                required: "Please enter your username."
            },
            Password: {
                required: "Please enter the password."
            },
            DatabaseName: {
                isRequired: "Please enter database name."
            }
        }
    });

    $(".show-hide-password").on("mousedown", function () {
        if ($(this).siblings("input").is(":password")) {
            $(this).siblings("input").attr("type", "text");
        }
        else {
            $(this).siblings("input").attr("type", "password");
        }
    });
    $(".show-hide-password").on("mouseup", function () {
        if ($(this).siblings("input").is(":password")) {
            $(this).siblings("input").attr("type", "text");
        }
        else {
            $(this).siblings("input").attr("type", "password");
        }
    });

    $(".show-hide-password").mouseleave(function () {
        $(this).siblings("input").attr("type", "password");
    });
});