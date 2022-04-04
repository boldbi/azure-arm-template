var tableRelationList = [];
var createRelationData = [];
var gridObj;
var selectedValues = [];
var selectedObject = [];
var objectSelected = [];
var searchedResult = [];
var selectedIndex = [];
var isSafari = navigator.userAgent.indexOf("Safari") != -1 && navigator.userAgent.indexOf("Chrome") == -1;

var treeobj, inputObj, count = 0;
var onFirstChk = true;
window._temp = [];


$(function () {
    $("#content-area").ejWaitingPopup();
    addPlacehoder(".connection-properties-form");
    $("#select-existing-join").ejDialog({
        width: "760px",
        height: "200px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        enableModal: true,
        showHeader: false
    });
    $("#get-join-details").ejDialog({
        width: "600px",
        height: "350px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        enableModal: true,
        showHeader: false
    });
    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, "Please enter the name");

    $.validator.addMethod("hasWhiteSpace", function (value, element) {
        return /\s/.test(value);
    }, "Username contains space");

    $.validator.addMethod("isValidUser", function (value, element) {
        return isValidUserName(value)
    }, "Username contains invalid characters");

    $.validator.addMethod("isValidadminPassword", function (value, element) {
        return validateUserpassword(value)
    }, "Password must be 6 characters including 1 uppercase letter, 1 lowercase letter, 1 numeric and 1 special character.");

    $("#mysql-odbc-dsn").change(function () {
        if ($("#mysql-odbc-dsn").val() != "") {
            $("#dsn-validate.validation-txt-errors").hide();
        }
    });
    $("#mysql-content-holder").validate({
        errorElement: "span",
        onkeyup: function (element, event) {
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false;
            } else
                true;
        },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            mySqlUserName: {
                isRequired: true
            },
            mysqlPassword: {
                required: true
            }
        },
        highlight: function (element) {
            $(element).closest(".txt-holder").addClass("has-error");
            $(element).parent().find(">.validation-txt-errors").show();
            $("#test-connection").prop("disabled", true);
            $("#connect-database").addClass("connect-database-button").prop("disabled", true);
        },
        unhighlight: function (element) {
            $(element).closest(".txt-holder").removeClass("has-error");
            $(element).parent().find(">.validation-txt-errors").hide();
        },
        errorPlacement: function (error, element) {
            $(element).parent().find(">.validation-txt-errors").text(error.html());
        },
        messages: {
            mySqlUserName: {
                isRequired: "Please enter Username"
            },
            mysqlPassword: {
                required: "Please enter Password"
            }
        }
    });


    $("#sql-content-holder").validate({
        errorElement: "span",
        onkeyup: function (element, event) {
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false;
            } else
                true;
        },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            servername: {
                isRequired: true
            },
            username: {
                isRequired: true
            },
            password: {
                required: true
            }
        },
        highlight: function (element) {
            $(element).closest(".txt-holder").addClass("has-error");
            $(element).parent().find(">.validation-txt-errors").show();
            $("#test-connection").prop("disabled", true);
            $("#connect-database").addClass("connect-database-button").prop("disabled", true);
        },
        unhighlight: function (element) {
            $(element).closest(".txt-holder").removeClass("has-error");
            $(element).parent().find(">.validation-txt-errors").hide();
        },
        errorPlacement: function (error, element) {
            $(element).parent().find(">.validation-txt-errors").text(error.html());
        },
        messages: {
            servername: {
                isRequired: "Please enter Server name"
            },
            username: {
                isRequired: "Please enter Username"
            },
            password: {
                required: "Please enter Password"
            }
        }
    });

    $("#oracle-content-holder").validate({
        errorElement: "span",
        onkeyup: function (element, event) {
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false;
            } else
                true;
        },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            servername: {
                isRequired: true
            },
            adminUserName: {
                isRequired: true
            },
            adminPassword: {
                isRequired: true
            }
        },
        highlight: function (element) {
            $(element).closest(".txt-holder").addClass("has-error");
            $(element).parent().find(">.validation-txt-errors").show();
            $("#test-connection").prop("disabled", true);
            $("#connect-database").addClass("connect-database-button").prop("disabled", true);
        },
        unhighlight: function (element) {
            $(element).closest(".txt-holder").removeClass("has-error");
            $(element).parent().find(">.validation-txt-errors").hide();
        },
        errorPlacement: function (error, element) {
            $(element).parent().find(">.validation-txt-errors").text(error.html());
        },
        messages: {
            servername: {
                isRequired: "Please enter Server name"
            },
            adminUserName: {
                isRequired: "Please enter Admin username"
            },
            adminPassword: {
                isRequired: "Please enter Admin password"
            }
        }
    });

    $("#postgresql-content-holder").validate({
        errorElement: "span",
        onkeyup: function (element, event) {
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false;
            } else
                true;
        },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            servername: {
                isRequired: true
            },
            port: {
                isRequired: true
            },
            username: {
                isRequired: true
            },
            password: {
                required: true
            }
        },
        highlight: function (element) {
            $(element).closest(".txt-holder").addClass("has-error");
            $(element).parent().find(">.validation-txt-errors").show();
            $("#test-connection").prop("disabled", true);
            $("#connect-database").addClass("connect-database-button").prop("disabled", true);
        },
        unhighlight: function (element) {
            $(element).closest(".txt-holder").removeClass("has-error");
            $(element).parent().find(">.validation-txt-errors").hide();
        },
        errorPlacement: function (error, element) {
            $(element).parent().find(">.validation-txt-errors").text(error.html());
        },
        messages: {
            servername: {
                isRequired: "Please enter Server name"
            },
            port: {
                isRequired: "Please enter Port number"
            },
            username: {
                isRequired: "Please enter Username"
            },
            password: {
                required: "Please enter Password"
            }
        }
    });
    var initialLoad = true;
    $(document).ready(function () {
        $("#database-type").trigger("change");
        initialLoad = false;
        $(".waiting-icon").hide();
    });

    $("#database-type").on("change", function () {
        $(".validation-txt-errors").hide();
        $(".validation-errors").html("");
        $("#test-connection-validation").removeClass("failure").html("");
        $(".has-error").removeClass("has-error");
        var checkedVal = $("#database-type").val().toLowerCase();

        switch (checkedVal) {
            case "mssql":
                if ((initialLoad == false)) {
                    $(".txt-holder input[type='text'], .txt-holder input[type='password']").val("");
                    $("#txt-dbname").val("");
                    $("#txt-dbname").selectpicker("refresh");
                    $(".content-display").hide();
                    $(".show-sql-content").show();
                    $("div.placeholder").remove();
                    $("#test-connection").prop("disabled", true);
                    $("#connect-database").addClass("connect-database-button").prop("disabled", true);
                } else {
                    $(".content-display").hide();
                    $(".show-sql-content").show();
                    $("div.placeholder").remove();
                }
                break;
            case "mysql":
                if ((initialLoad == false)) {
                    $(".txt-holder input[type='text'], .txt-holder input[type='password']").val("");
                    $("#mysql-txt-dbname, #mysql-odbc-dsn").val("");
                    $("#mysql-txt-dbname, #mysql-odbc-dsn").selectpicker("refresh");
                    $(".content-display").hide();
                    $(".show-mysql-content").show();
                    $("div.placeholder").remove();
                    $("#test-connection").prop("disabled", true);
                    $("#connect-database").addClass("connect-database-button").prop("disabled", true);
                } else {
                    $(".content-display").hide();
                    $(".show-mysql-content").show();
                    $("div.placeholder").remove();
                }
                break;
            case "oracle":
                if ((initialLoad == false)) {
                    $(".txt-holder input[type='text'], .txt-holder input[type='password']").val("");
                    $("#client-username, #oracle-dsn").val("");
                    $("#client-username, #oracle-dsn").selectpicker("refresh");
                    $(".content-display").hide();
                    $(".show-oracle-content").show();
                    $("div.placeholder").remove();
                    $("#test-connection").prop("disabled", true);
                    $("#connect-database").addClass("connect-database-button").prop("disabled", true);
                } else {
                    $(".content-display").hide();
                    $(".show-oracle-content").show();
                    $("div.placeholder").remove();
                }
                break;
            case "postgresql":
                if ((initialLoad == false)) {
                    $(".txt-holder input[type='text'], .txt-holder input[type='password']").val("");
                    $("#postgresql-dbname").val("");
                    $("#postgresql-dbname").selectpicker("refresh");
                    $(".content-display").hide();
                    $(".show-postgresql-content").show();
                    $("div.placeholder").remove();
                    $("#test-connection").prop("disabled", true);
                    $("#connect-database").addClass("connect-database-button").prop("disabled", true);
                } else {
                    $(".content-display").hide();
                    $(".show-postgresql-content").show();
                    $("div.placeholder").remove();
                }
                break;
        }
        addPlacehoder(".connection-properties-form");
    });

    $("#check-windows").on("click change", function () {
        var windowsCheck = $("#check-windows").val() == "windows";
        var databaseType = $("#database-type").val();
        if (windowsCheck && databaseType == "MSSQL") {
            $("#txt-login").val("").attr("disabled", true);
            $("#txt-password-db").val("").attr("disabled", true);
        } else if (databaseType == "MSSQL") {
            $("#txt-login").attr("disabled", false);
            $("#txt-password-db").attr("disabled", false);
        }
        $(".has-error").removeClass("has-error");
        $(".validation-txt-errors").hide();
    });

    $("#test-connection").on("click", function () {
        $("#content-area").ejWaitingPopup("show");
        $("#test-connection-validation").html("");
        $(".has-error").removeClass("has-error");
        $(".validation-txt-errors").html("");
        var formData = getFormData();
        var canProceed = false;
        switch (formData.ServerType.toLowerCase()) {
            case "mssql":
                canProceed = $("#sql-content-holder").valid();
                if ($("#txt-dbname").val() == "") {
                    $("#txt-dbname").siblings(".validation-txt-errors").html("Please select Database name");
                    $("#txt-dbname").siblings(".validation-txt-errors").show();
                    $("#content-area").ejWaitingPopup("hide");
                    return;
                }
                break;
            case "mysql":
                canProceed = $("#mysql-content-holder").valid();
                if ($("#mysql-odbc-dsn").val() == "") {
                    $("#dsn-validate").html("Please select MySQL ODBC DSN");
                    $("#dsn-validate").show();
                    $("#content-area").ejWaitingPopup("hide");
                    return;
                }
                if ($("#mysql-txt-dbname").val() == "") {
                    $("#mysql-txt-dbname").siblings(".validation-txt-errors").html("Please select Database name");
                    $("#mysql-txt-dbname").siblings(".validation-txt-errors").show();
                    $("#content-area").ejWaitingPopup("hide");
                    return;
                }
                break;
            case "oracle":
                canProceed = $("#oracle-content-holder").valid();
                if ($("#oracle-dsn").val() == "") {
                    $("#oracle-dsn-validate").html("Please select Oracle ODBC DSN");
                    $("#oracle-dsn-validate").show();
                    $("#content-area").ejWaitingPopup("hide");
                    return;
                }
                if ($("#client-username").val() == null) {
                    $("#client-username").siblings(".validation-txt-errors").html("Please select Database name");
                    $("#client-username").siblings(".validation-txt-errors").show();
                    $("#content-area").ejWaitingPopup("hide");
                    return;
                }
                if ($("#client-password").val() == "") {
                    $("#client-password").siblings(".validation-txt-errors").html("Please enter Database password");
                    $("#client-password").siblings(".validation-txt-errors").show();
                    $("#client-password").closest(".txt-holder").addClass("has-error");
                    $("#content-area").ejWaitingPopup("hide");
                    return;
                }
                break;
            case "postgresql":
                canProceed = $("#postgresql-content-holder").valid();
                if ($("#postgresql-dbname").val() == "") {
                    $("#postgresql-dbname").siblings(".validation-txt-errors").html("Please select Database name");
                    $("#postgresql-dbname").siblings(".validation-txt-errors").show();
                    $("#content-area").ejWaitingPopup("hide");
                    return;
                }
                break;
        }
        if (canProceed) {
            $(this).prop("disabled", true);
            doAjaxPost("POST", testConnectionUrl,
                {
                    data: JSON.stringify(formData)
                },
                function (result) {
                    if (result.Key) {
                        SuccessAlert("Test Connection", "Test connection succeeded.", 7000);
                    } else {
                        $("#test-connection-validation").addClass("failure").removeClass("success").html(result.Data);
                    }
                    $("#content-area").ejWaitingPopup("hide");
                    $("#test-connection").prop("disabled", false);
                }
            );
        } else {
            $("#content-area").ejWaitingPopup("hide");
        }
    });

    $(document).on("click", "button.dropdown-toggle.selectpicker", function () {
        var selectPickerElement = $("#" + $(this).attr("data-id"));
        if ($(selectPickerElement).hasClass("database-name-select") && $(this).siblings(".dropdown-menu").css("display") == "block") {
            $(".waiting-icon").show();
            $(selectPickerElement).html("");
            $(selectPickerElement).selectpicker("refresh");
            $("#test-connection-validation").html("");
            $(".has-error").removeClass("has-error");
            $(".validation-txt-errors").html("");
            var formData = getFormData();
            var canProceed = false;
            switch (formData.ServerType.toLowerCase()) {
                case "mssql":
                    canProceed = $("#sql-content-holder").valid();
                    break;
                case "mysql":
                    if ($("#mysql-odbc-dsn").val() == "") {
                        $("#dsn-validate").html("Please select MySQL ODBC DSN");
                        $("#dsn-validate").show();
                        $(this).siblings(".bootstrap-select").find("button.selectpicker").click();
                        $(".waiting-icon").hide();
                        return;
                    }
                    canProceed = $("#mysql-content-holder").valid();
                    break;
                case "oracle":
                    canProceed = $("#oracle-content-holder").valid();
                    if ($("#oracle-dsn").val() == "") {
                        $("#oracle-dsn-validate").html("Please select Oracle ODBC DSN");
                        $("#oracle-dsn-validate").show();
                        $(this).siblings(".bootstrap-select").find("button.selectpicker").click();
                        $(".waiting-icon").hide();
                        return;
                    }
                    break;
                case "postgresql":
                    canProceed = $("#postgresql-content-holder").valid();
                    break;
            }
            if (canProceed) {
                $(selectPickerElement).prop("disabled", true);
                $(selectPickerElement).selectpicker("refresh");
                doAjaxPost("POST", getDatabaseUrl,
                    {
                        data: JSON.stringify(formData)
                    },
                    function (result) {
                        if (result.Key) {
                            var optionList = "";
                            for (var option = 0; option < result.Data.length; option++) {
                                optionList += "<option value='" + result.Data[option] + "'>" + result.Data[option] + "</option>"
                            }
                            $(selectPickerElement).html(optionList);
                            $(selectPickerElement).selectpicker("refresh");
                            $("#test-connection-validation").addClass("success").removeClass("failure").html("");
                        } else {
                            $("#test-connection-validation").addClass("failure").removeClass("success").html(result.Data);
                        }
                        $(".waiting-icon").hide();
                        $(selectPickerElement).prop("disabled", false);
                        $(selectPickerElement).selectpicker("refresh");
                        for (var i = 0; i < $(".connect-database-padding .btn-group .dropdown-menu .selectpicker li").length; i++) {
                            var hoveredtext = $(".connect-database-padding .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
                            $(".connect-database-padding .btn-group .dropdown-menu .selectpicker li ").eq(i).find("a").attr("title", hoveredtext);
                        }
                    }
                );
            } else {
                $(selectPickerElement).siblings(".bootstrap-select").find("button.selectpicker").click();
                $(".waiting-icon").hide();
            }
        }
    });

    $(".connect-database-padding #txt-dbname,#mysql-txt-dbname,#client-username,#postgresql-dbname").change(function () {
        $("#test-connection").prop("disabled", false);
        $("#connect-database").addClass("connect-database-button").prop("disabled", false);
    });

    $(document).on("keypress", "#search-database-users", function (e) {
        var code = e.keyCode;
        if (code == 13) {
            var searchUser = $(this).val();
            showWaitingPopup("Grid");
            doAjaxPost("POST", getSearchedResultUrl,
                { searchValue: searchUser },
                function (result) {
                    $("#join-query").html(result.Query);
                    $("#import-selected").attr("disabled", "disabled");
                    var gridObj = $("#Grid").data("ejGrid");
                    searchedResult = $.grep(result.Data.Value, function (item) { return item.IsDuplicated != true; });
                    gridObj.clearSelection();
                    objectSelected = [];
                    gridObj.option("dataSource", result.Data.Value);
                    gridObj.refreshContent();
                    result.Data.Success ? $("#error-value").find("span").html("") : $("#error-value").find("span").html(result.Data.Message);
                    hideWaitingPopup("Grid");

                }
            );
        }
    });

    $("#connect-database").on("click", function () {
        $("#content-area").ejWaitingPopup("show");
        addPlacehoder(".tree-view-search-holder");
        $("#test-connection-validation").html("");
        $(".has-error").removeClass("has-error");
        $(".validation-txt-errors").html("");
        var formData = getFormData();
        var canProceed = false;
        switch (formData.ServerType.toLowerCase()) {
            case "mssql":
                canProceed = $("#sql-content-holder").valid();
                if ($("#txt-dbname").val() == "") {
                    $("#txt-dbname").siblings(".validation-txt-errors").html("Please select Database name");
                    $("#txt-dbname").siblings(".validation-txt-errors").show();
                    $("#content-area").ejWaitingPopup("hide");
                    return;
                }
                break;
            case "mysql":
                canProceed = $("#mysql-content-holder").valid();
                if ($("#mysql-odbc-dsn").val() == "") {
                    $("#dsn-validate").html("Please select MySQL ODBC DSN");
                    $("#dsn-validate").show();
                    $("#content-area").ejWaitingPopup("hide");
                    return;
                }
                if ($("#mysql-txt-dbname").val() == "") {
                    $("#mysql-txt-dbname").siblings(".validation-txt-errors").html("Please select Database name");
                    $("#mysql-txt-dbname").siblings(".validation-txt-errors").show();
                    $("#content-area").ejWaitingPopup("hide");
                    return;
                }
                break;
            case "oracle":
                canProceed = $("#oracle-content-holder").valid();
                if ($("#oracle-dsn").val() == "") {
                    $("#oracle-dsn-validate").html("Please select Oracle ODBC DSN");
                    $("#oracle-dsn-validate").show();
                    $("#content-area").ejWaitingPopup("hide");
                    return;
                }
                if ($("#client-username").val() == null) {
                    $("#client-username").siblings(".validation-txt-errors").html("Please select Database name/Username");
                    $("#client-username").siblings(".validation-txt-errors").show();
                    $("#content-area").ejWaitingPopup("hide");
                    return;
                }
                if ($("#client-password").val() == "") {
                    $("#client-password").siblings(".validation-txt-errors").html("Please enter Database password");
                    $("#client-password").siblings(".validation-txt-errors").show();
                    $("#client-password").closest(".txt-holder").addClass("has-error");
                    $("#content-area").ejWaitingPopup("hide");
                    return;
                }
                break;
            case "postgresql":
                canProceed = $("#postgresql-content-holder").valid();
                if ($("#postgresql-dbname").val() == "") {
                    $("#postgresql-dbname").siblings(".validation-txt-errors").html("Please select Database name");
                    $("#postgresql-dbname").siblings(".validation-txt-errors").show();
                    $("#content-area").ejWaitingPopup("hide");
                    return;
                }
                break;
        }

        if (canProceed) {
            doAjaxPost("POST", testConnectionUrl,
                {
                    data: JSON.stringify(formData)
                },
                function (result) {
                    if (result.Key) {
                        doAjaxPost("POST", connectDatabaseUrl,
                            {
                                data: JSON.stringify(formData)
                            },
                            function (result) {
                                $("#selected-schema-container").show();
                                $("#apply-connections").attr("disabled", true).show();
                                $("#connect-database").hide();
                                $("#change-connection").show();
                                $("#save-db-settings").show();
                                $("#save-db-settings").prop("disabled", true);
                                $(".connection-properties-form").hide();
                                if ($("#tree-view").data("ejTreeView") != undefined) {
                                    $("#tree-view").data("ejTreeView").destroy();
                                }
                                $("#selected-schema-container").html(result);
                                addPlacehoder(".tree-view-search-holder");
                                var contentHeight = (window.innerHeight - 330 - $("#selected-connect-properties").height()) > $("#selected-schema-holder").height() ? (window.innerHeight - 330 - $("#selected-connect-properties").height()) : $("#selected-schema-holder").height();
                                $("#schema-selection").css({ "height": contentHeight + "px" });
                                $("#tree-view").ejTreeView({
                                    nodeExpand: function () {
                                        $("#scroll-element").data("ejScroller").refresh();
                                        $("#tree-view li:visible").filter("[data-field-type='column']").removeClass("bottom-li");
                                        $("#tree-view li:visible").filter("[data-field-type='column']").slice(-3).addClass("bottom-li");
                                    },
                                    nodeCollapse: function () {
                                        $("#scroll-element").data("ejScroller").refresh();
                                        $("#tree-view li:visible").filter("[data-field-type='column']").removeClass("bottom-li");
                                        $("#tree-view li:visible").filter("[data-field-type='column']").slice(-3).addClass("bottom-li");
                                    },
                                    expandOn: "click"
                                });
                                $("#tree-view li:visible").filter("[data-field-type='column']").slice(-3).addClass("bottom-li");
                                $("#scroll-element").ejScroller({
                                    height: (contentHeight - 25),
                                    scrollerSize: 9,
                                    buttonSize: 0
                                });
                                $("#table-list-treeview").css({ "height": contentHeight + "px" });
                                $("#record-count").ejNumericTextbox({
                                    showSpinButton: false,
                                    value: 100,
                                    maxValue: 1000,
                                    minValue: 1,
                                    width: 60,
                                    showRoundedCorner: true,
                                    focusOut: function (args) {
                                        if (args.value == null) {
                                            $("#record-count").data("ejNumericTextbox").option("value", 100);
                                        }
                                    }
                                });

                                treeobj = $("#tree-view").data("ejTreeView");
                                $(".selectpicker").selectpicker("refresh");
                                $("#content-area").ejWaitingPopup("hide");
                                $('[data-toggle="tooltip"]').tooltip();
                            }
                        );
                    } else {
                        $("#content-area").ejWaitingPopup("hide");
                        $("#test-connection-validation").addClass("failure").removeClass("success").html(result.Data);
                    }
                }
            );
        } else {
            $("#content-area").ejWaitingPopup("hide");
        }
    });

    $(document).on("click", "#save-db-settings", function () {
        $("#content-area").ejWaitingPopup("show");
        doAjaxPost("POST",
            saveDbSettingsUrl,
            {
                connection: JSON.stringify(getFormData()),
                schemaInfo: JSON.stringify(importDatabaseQuerySchema),
                activeStatus: $("#txt-activestatus").val()
            },
            function (result) {
                if (result.status) {
                    SuccessAlert("Database Settings", "Settings has been updated successfully.", 7000);
                } else {
                    WarningAlert("Database Settings", "Error while updating settings.", 7000);
                }
                $("#save-db-settings").hide();
                $("#save-db-settings").prop("disabled", true);
                $("#change-connection").hide();
                $("#connect-database").show();
                $("#selected-schema-container").html("").hide();
                $(".connection-properties-form").show();
                objectSelected = [];
                importDatabaseQuerySchema = {};
                $("#content-area").ejWaitingPopup("hide");

            }
        );
    });

    $(document).on("click", "#apply-connections", function () {

        $("#content-area").ejWaitingPopup("show");
        doAjaxPost("POST", getResultDataUrl,
            { connection: JSON.stringify(getFormData()), schemaInfo: JSON.stringify(importDatabaseQuerySchema), sortValue: $("#sort-value").val(), recordCount: $("#record-count").val() },
            function (result) {
                $(".schema-selection").hide();
                $("#apply-connections").hide();
                $("#import-selected").show();
                $("#selected-data-list").html(result);
                addPlacehoder(".search-user-holder");
                gridData = ej.parseJSON(gridData);
                gridData.Success ? $("#error-value").find("span").html("") : $("#error-value").find("span").html(gridData.Message);
                $("#import-selected").attr("disabled", "disabled");
                ej.support.stableSort = false;
                GridLocalization();
                searchedResult = $.grep(gridData.Value, function (item) { return item.IsDuplicated != true; });
                $("#Grid").ejGrid({
                    dataSource: gridData.Value,
                    gridLines: ej.Grid.GridLines.None,
                    allowPaging: true,
                    allowSorting: true,
                    allowSelection: true,
                    allowScrolling: false,
                    allowFiltering: false,
                    allowSearching: true,
                    locale: "en-us",
                    filterSettings: { filterType: "menu" },
                    pageSettings: { pageSize: 20 },
                    selectionType: ej.Grid.SelectionType.Multiple,
                    selectionSettings: { selectionMode: ["row"] },
                    templateRefresh: "refreshTemplate",
                    actionComplete: "fnActionComplete",
                    create: "fnCreate",
                    recordClick: "recordClick",
                    actionBegin: "fnOnUserGridActionBegin",
                    enableAltRow: false,
                    rowDataBound: function () {
                        $("input.checkbox-row-disabled").parents("tr").addClass("row-disabled");
                    },
                    dataBound: function () {
                        $("#checkbox-header").change(headCheckboxOnChange);
                        this.model.indexes = {}; /* Additional property*/
                    },
                    columns: [
                        { headerTemplateID: "#checkbox-header-template", template: true, templateID: "#checkbox-row-template", textAlign: ej.TextAlign.Center, width: 10, allowFiltering: false },
                        { field: "UserName", cssClass: "user-name", headerText: "Username", headerTemplateID: "#user-name-header", width: 50, type: "string" },
                        { field: "FirstName", cssClass: "first-name", headerText: "First Name", headerTemplateID: "#first-name-header", width: 60, type: "string" },
                        { field: "LastName", cssClass: "last-name", headerText: "Last Name", headerTemplateID: "#last-name-header", width: 60, type: "string" },
                        { field: "EmailId", cssClass: "email-id", headerText: "Email Address", headerTemplateID: "#email-id-header", width: 80, type: "string" },
                        { field: "", width: 10, templateID: "#user-detail-validation", allowFiltering: false, textAlign: ej.TextAlign.Center }
                    ]
                });
                $("#Grid").data("ejGrid").refreshContent();
                $('[data-toggle="tooltip"]').tooltip();
                $("#content-area").ejWaitingPopup("hide");
            }
        );
    });

    $(document).on("click", "#change-connection", function () {
        $("#save-db-settings").hide();
        $("#save-db-settings").prop("disabled", true);
        $("#change-connection").hide();
        $("#connect-database").show();
        $("#apply-connections").attr("disabled", true).hide();
        $("#selected-schema-container").html("").hide();
        $(".connection-properties-form").show();
        $("#import-selected").hide();
        objectSelected = [];
        importDatabaseQuerySchema = {};
    });

    $(document).on("click", "#change-selected-column", function () {
        $("#selected-data-list").html("");
        $(".schema-selection").show();
        $("#apply-connections").show();
        $("#import-selected").hide();
        objectSelected = [];
    });

    $(document).on("change", ".schema-tables", function () {
        var fieldName = $(this).attr("data-field-name");
        var tableName = $(this).val();
        var tableColumns = tableSchema.filter(function (el) {
            return el.TableName === tableName;
        });
        var columnSelectPicker = $(".schema-columns").filter("[data-field-name='" + fieldName + "']");
        var optionList = "";
        for (var column = 0; column < tableColumns[0].Columns.length; column++) {
            optionList += "<option value='" + tableColumns[0].Columns[column].ColumnName + "'>" + tableColumns[0].Columns[column].ColumnName + "</option>";
        }
        $(columnSelectPicker).html(optionList);
        $(columnSelectPicker).selectpicker("refresh");
    });

    $(document).on("keyup", "#client-username", function () {
        if (regexIe8.test(userAgent)) {
            if ($(this).val() === "") {
                $("#rolename").prop("disabled", true);
                $("#rolename").val("");
                $("#rolename").next(".placeholder").removeClass("hide").addClass("show");
            } else {
                $("#rolename").prop({ 'disabled': false, 'readonly': true });
                $("#rolename").focus(this.blur);
                $("#rolename").val($(this).val().substring(0, 25) + "_role");
                $("#rolename").next(".placeholder").removeClass("show").addClass("hide");

            }
        } else if ((userAgent.indexOf("Safari") != -1) && (userAgent.indexOf("Chrome") == -1)) {
            $("#rolename").val(($(this).val() === "") ? "" : $(this).val().substring(0, 25) + "_role");
            $("#rolename").css("-webkit-text-fill-color", "black");
        } else {
            $("#rolename").val(($(this).val() === "") ? "" : $(this).val().substring(0, 25) + "_role");
        }
    });

    $(document).on("click", ".selected-schema-btn", function (e) {
        var fieldName = $(this).attr("data-field");
        var selectedValue = $(this).parents("li:first");
        if (selectedValue.length == 1 && $(selectedValue).attr("data-field-type") == "column") {
            $(".selected-schema-btn-dialog").hide();
            $("#tree-view .selection-add-btn").removeClass("show");
            $(".selected-schema-btn").filter("[data-field='" + fieldName + "']").attr("disabled", true);
            var schemaName = $(selectedValue).attr("data-schema-name");
            var tableName = $(selectedValue).attr("data-table-name");
            var columnName = $(selectedValue).attr("data-column-name");
            var columnDataType = $(selectedValue).attr("data-type");
            var selecteFieldHtml = "<div data-table-name='" + tableName + "'><span>" + columnName + " [" + tableName + "]</span><span class='su su-close cancel-schema'></span></div>";
            var fieldContainer = $(".selected-schema-fields").filter("[data-field='" + fieldName + "']");
            $(fieldContainer).html(selecteFieldHtml);
            switch (fieldName) {
                case "username":
                    importDatabaseQuerySchema.UserNameSchema = schemaName;
                    importDatabaseQuerySchema.UserNameTable = tableName;
                    importDatabaseQuerySchema.UserNameColumn = columnName;
                    break;
                case "firstname":
                    importDatabaseQuerySchema.FirstNameSchema = schemaName;
                    importDatabaseQuerySchema.FirstNameTable = tableName;
                    importDatabaseQuerySchema.FirstNameColumn = columnName;
                    break;
                case "email":
                    importDatabaseQuerySchema.EmailSchema = schemaName;
                    importDatabaseQuerySchema.EmailTable = tableName;
                    importDatabaseQuerySchema.EmailColumn = columnName;
                    break;
                case "lastname":
                    importDatabaseQuerySchema.LastNameSchema = schemaName;
                    importDatabaseQuerySchema.LastNameTable = tableName;
                    importDatabaseQuerySchema.LastNameColumn = columnName;
                    break;
                case "isactive":
                    importDatabaseQuerySchema.IsActiveSchema = schemaName;
                    importDatabaseQuerySchema.IsActiveTable = tableName;
                    importDatabaseQuerySchema.IsActiveColumn = columnName;
                    importDatabaseQuerySchema.IsActiveDatabaseType = columnDataType;
                    break;
            }
            if (fieldName == "username") {
                $(".selected-schema-btn").filter("[data-field!='username']").attr("disabled", false);
            } else if (tableName == importDatabaseQuerySchema.UserNameTable || (fieldName == "firstname" && (tableName == importDatabaseQuerySchema.EmailTable || tableName == importDatabaseQuerySchema.lastname || tableName == importDatabaseQuerySchema.IsActiveTable)) || (fieldName == "email" && (tableName == importDatabaseQuerySchema.FirstNameTable || tableName == importDatabaseQuerySchema.LastNameTable || tableName == importDatabaseQuerySchema.IsActiveTable)) || (fieldName == "lastname" && (tableName == importDatabaseQuerySchema.EmailTable || tableName == importDatabaseQuerySchema.FirstNameTable || tableName == importDatabaseQuerySchema.IsActiveTable)) || (fieldName == "isactive" && (tableName == importDatabaseQuerySchema.EmailTable || tableName == importDatabaseQuerySchema.FirstNameTable || tableName == importDatabaseQuerySchema.LastNameTable))) {
                var tableRelation = undefined;
            } else {
                var tableRelation = getTableRelation(fieldName);
            }
            switch (fieldName) {
                case "firstname":
                    importDatabaseQuerySchema.FirstNameTableRelation = tableRelation;
                    break;
                case "email":
                    importDatabaseQuerySchema.EmailTableRelation = tableRelation;
                    break;
                case "lastname":
                    importDatabaseQuerySchema.LastNameTableRelation = tableRelation;
                    break;
                case "isactive":
                    importDatabaseQuerySchema.IsActiveTableRelation = tableRelation;
                    break;
            }
        }
        validateApplyConnectionFields();
    });

    $(document).on("click", ".cancel-schema", function (e) {
        var fieldName = $(this).parents(".selected-schema-fields").attr("data-field");
        $(".selected-schema-btn").filter("[data-field='" + fieldName + "']").attr("disabled", false);
        if (fieldName == "username") {
            $(".selected-schema-btn").filter("[data-field!='username']").attr("disabled", true);
            $(".selected-schema-fields").html("");
        } else {
            $(this).parents(".selected-schema-fields").html("");
        }
        switch (fieldName) {
            case "username":
                importDatabaseQuerySchema = {};
                break;
            case "firstname":
                importDatabaseQuerySchema.FirstNameTable = undefined;
                importDatabaseQuerySchema.FirstNameColumn = undefined;
                importDatabaseQuerySchema.FirstNameTableRelation = undefined;
                break;
            case "email":
                importDatabaseQuerySchema.EmailTable = undefined;
                importDatabaseQuerySchema.EmailColumn = undefined;
                importDatabaseQuerySchema.EmailTableRelation = undefined;
                break;
            case "lastname":
                importDatabaseQuerySchema.LastNameTable = undefined;
                importDatabaseQuerySchema.LastNameColumn = undefined;
                importDatabaseQuerySchema.LastNameTableRelation = undefined;
                break;
            case "isactive":
                importDatabaseQuerySchema.IsActiveTable = undefined;
                importDatabaseQuerySchema.IsActiveColumn = undefined;
                importDatabaseQuerySchema.IsActiveTableRelation = undefined;
                break;
        }
        validateApplyConnectionFields();
    });
    $(document).on("click", "#tree-view .selection-add-btn", function (e) {
        $("#tree-view .selection-add-btn").removeClass("show");
        $(".selected-schema-btn-dialog").hide();
        $(this).siblings(".selected-schema-btn-dialog").show();
        $(this).addClass("show");
    });
    $(document).on("click", "#select-relation", function (e) {
        var fieldName = $(this).attr("data-field-name");
        var tableRelation = tableRelationList[parseInt($("#select-existing-join input[type='radio']:checked").val())];
        switch (fieldName) {
            case "firstname":
                importDatabaseQuerySchema.FirstNameTableRelation = tableRelation;
                break;
            case "email":
                importDatabaseQuerySchema.EmailTableRelation = tableRelation;
                break;
            case "lastname":
                importDatabaseQuerySchema.LastNameTableRelation = tableRelation;
                break;
            case "isactive":
                importDatabaseQuerySchema.IsActiveTableRelation = tableRelation;
                break;
        }
        tableRelationList = [];
        $("#select-existing-join").ejDialog("close");
    });
    $(document).on("click", function (e) {
        if (!$(e.target).hasClass("selection-add-btn")) {
            var targetArea = $(e.target).parents(".selected-schema-btn-dialog");
            if (targetArea.length == 0) {
                $(".selected-schema-btn-dialog").hide();
                $("#tree-view .selection-add-btn").removeClass("show");
            }
        }
    });
    $(document).on("click", ".column-list li", function (e) {
        $(this).siblings("li").removeClass("selected");
        $(this).addClass("selected");
        validateApplyRelationFields();
    });
    $(document).on("change", "#left-table-selection", function (e) {
        var selectedValue = $(this).val();
        var selectedTableColumns = [];
        $.each(createRelationData, function (index, value) {
            if (value.TableName == selectedValue) {
                selectedTableColumns = value.Columns;
            }
        });
        var leftTableColumnList = "";
        for (var leftColumn = 0; leftColumn < selectedTableColumns.length; leftColumn++) {
            leftTableColumnList += "<li>" + selectedTableColumns[leftColumn].ColumnName + "</li>";
        }
        $("#left-table-columnlist ul").html(leftTableColumnList);
        validateApplyRelationFields();
    });
    $(document).on("click", "#apply-relation", function (e) {
        var fieldName = $(this).attr("data-field-name");
        var joinType = $("#join-type").val();
        var tableRelation =
        {
            LeftTableSchema: joinType == "inner join" ? $("#right-table-selection").find("option").filter("[value='" + $("#right-table-selection").val() + "']").attr("data-schema") : $("#left-table-selection").find("option").filter("[value='" + $("#left-table-selection").val() + "']").attr("data-schema"),
            RightTableSchema: joinType == "inner join" ? $("#left-table-selection").find("option").filter("[value='" + $("#left-table-selection").val() + "']").attr("data-schema") : $("#right-table-selection").find("option").filter("[value='" + $("#right-table-selection").val() + "']").attr("data-schema"),
            LeftTableName: joinType == "inner join" ? $("#right-table-selection").val() : $("#left-table-selection").val(),
            RightTableName: joinType == "inner join" ? $("#left-table-selection").val() : $("#right-table-selection").val(),
            LeftTableColumnName: joinType == "inner join" ? $("#right-table-columnlist.column-list").find("li.selected").text() : $("#left-table-columnlist.column-list").find("li.selected").text(),
            RightTableColumnName: joinType == "inner join" ? $("#left-table-columnlist.column-list").find("li.selected").text() : $("#right-table-columnlist.column-list").find("li.selected").text(),
            LeftTable: "",
            LeftTableCondition: "",
            RightTable: "",
            RightTableCondition: "",
            Relationship: joinType
        }
        switch (fieldName) {
            case "firstname":
                importDatabaseQuerySchema.FirstNameTableRelation = tableRelation;
                break;
            case "email":
                importDatabaseQuerySchema.EmailTableRelation = tableRelation;
                break;
            case "lastname":
                importDatabaseQuerySchema.LastNameTableRelation = tableRelation;
                break;
            case "isactive":
                importDatabaseQuerySchema.IsActiveTableRelation = tableRelation;
                break;
        }
        createRelationData = [];
        $("#get-join-details").ejDialog("close");
    });

    $(document).on("click", "#search-tree-close", function (e) {
        $("#search-tree").val("");
        $("#search-tree").siblings("span.close-icon").css("display", "none");
        $("#search-tree").siblings("span.su-search").css("display", "block");
        searchTree();
    });

    $(document).on("keyup", "#search-tree", function (event) {
        if (event.keyCode == 13) {
            searchTree();
        }
    });
});

function getFormData() {
    var serverType = $("#database-type").val();
    var userName = "", password = "", databaseName = "", dsn = "", port = "";
    switch (serverType.toLowerCase()) {
        case "mssql":
            userName = $("#txt-login").val();
            password = $("#txt-password-db").val();
            databaseName = $("#txt-dbname").val();
            break;
        case "mysql":
            userName = $("#mysql-username").val();
            password = $("#mysql-password").val();
            databaseName = $("#mysql-txt-dbname").val();
            dsn = $("#mysql-odbc-dsn").val();
            break;
        case "oracle":
            userName = $("#admin-username").val();
            password = $("#admin-password").val();
            databaseName = $("#client-username").val();
            dsn = $("#oracle-dsn").val();
            break;
        case "postgresql":
            userName = $("#postgresql-login").val();
            password = $("#postgresql-password-db").val();
            databaseName = $("#postgresql-dbname").val();
            port = $("#postgresql-port").val();
            break;
    }
    var authenticationType = 1;
    if (($("#check-windows").val() == "windows"))
        authenticationType = 0;
    var data = {
        ServerType: $("#database-type").val(),
        UserName: userName,
        Password: password,
        DataBaseName: databaseName,
        ServerName: ((serverType.toLowerCase() === "mssql") ? $("#txt-servername").val() : ((serverType.toLowerCase() === "postgresql") ? $("#postgresql-servername").val() : "")),
        AuthenticationType: authenticationType,
        DSN: dsn,
        DatabasePassword: $("#client-password").val(),
        Port: port
    }
    return data;
}

function getTableRelation(targetField) {
    $("#content-area").ejWaitingPopup("show");
    var result;
    $.ajax({
        type: "POST",
        url: getTableRelationUrl,
        data: { connection: JSON.stringify(getFormData()), schemaInfo: JSON.stringify(importDatabaseQuerySchema), targetField: targetField },
        async: false,
        success: function (data) {
            $("#content-area").ejWaitingPopup("hide");
            if (data.length > 0) {
                if (data.length == 1) {
                    result = data[0];
                } else {
                    openSelectTableRelationPopup(data, targetField);
                }
            } else {
                openGetRelationPopup(targetField);
            }
        }
    });
    return result;
}

function openSelectTableRelationPopup(data, targetField) {
    tableRelationList = data;
    var html = "<tr><th></th><th>Left table condition</th><th>Join type</th><th>Right table condition</th></tr>";
    var dataBaseConnection = getFormData();
    if (dataBaseConnection.ServerType.toLowerCase() == "mssql") {
        for (var relation = 0; relation < data.length; relation++) {
            if (relation == 0) {
                html += "<tr><td><input type='radio' value='" + relation + "' name='relation' class='select-relation-chk' checked></td><td>" + data[relation].LeftTableSchema + "." + data[relation].LeftTableName + "." + data[relation].LeftTableColumnName + "</td><td>" + data[relation].Relationship + "</td><td>" + data[relation].RightTableSchema + "." + data[relation].RightTableName + "." + data[relation].RightTableColumnName + "</td></tr>";
            } else {
                html += "<tr><td><input type='radio' value='" + relation + "' name='relation' class='select-relation-chk'></td><td>" + data[relation].LeftTableSchema + "." + data[relation].LeftTableName + "." + data[relation].LeftTableColumnName + "</td><td>" + data[relation].Relationship + "</td><td>" + data[relation].RightTableSchema + "." + data[relation].RightTableName + "." + data[relation].RightTableColumnName + "</td></tr>";
            }
        }
    } else {
        for (var relation = 0; relation < data.length; relation++) {
            if (relation == 0) {
                html += "<tr><td><input type='radio' value='" + relation + "' name='relation' class='select-relation-chk' checked></td><td>" + data[relation].LeftTableName + "." + data[relation].LeftTableColumnName + "</td><td>" + data[relation].Relationship + "</td><td>" + data[relation].RightTableName + "." + data[relation].RightTableColumnName + "</td></tr>";
            } else {
                html += "<tr><td><input type='radio' value='" + relation + "' name='relation' class='select-relation-chk'></td><td>" + data[relation].LeftTableName + "." + data[relation].LeftTableColumnName + "</td><td>" + data[relation].Relationship + "</td><td>" + data[relation].RightTableName + "." + data[relation].RightTableColumnName + "</td></tr>";
            }
        }
    }
    $("table.relation-list").html(html);
    $(".select-relation-chk").ejRadioButton({
        size: "small"
    });
    $("#select-relation").attr("data-field-name", targetField);
    $("#content-area").ejWaitingPopup("hide");
    $("#select-existing-join").ejDialog("open");
}

function openGetRelationPopup(targetField) {
    var leftTableList = [];
    leftTableList.push(importDatabaseQuerySchema.UserNameTable);
    var rightTableName = "";
    switch (targetField) {
        case "firstname":
            rightTableName = importDatabaseQuerySchema.FirstNameTable;
            if (importDatabaseQuerySchema.EmailTable != undefined) {
                leftTableList.push(importDatabaseQuerySchema.EmailTable);
            }
            if (importDatabaseQuerySchema.LastNameTable != undefined) {
                leftTableList.push(importDatabaseQuerySchema.LastNameTable);
            }
            if (importDatabaseQuerySchema.IsActiveTable != undefined) {
                leftTableList.push(importDatabaseQuerySchema.IsActiveTable);
            }
            break;
        case "email":
            rightTableName = importDatabaseQuerySchema.EmailTable;
            if (importDatabaseQuerySchema.FirstNameTable != undefined) {
                leftTableList.push(importDatabaseQuerySchema.FirstNameTable);
            }
            if (importDatabaseQuerySchema.LastNameTable != undefined) {
                leftTableList.push(importDatabaseQuerySchema.LastNameTable);
            }
            if (importDatabaseQuerySchema.IsActiveTable != undefined) {
                leftTableList.push(importDatabaseQuerySchema.IsActiveTable);
            }
            break;
        case "lastname":
            rightTableName = importDatabaseQuerySchema.LastNameTable;
            if (importDatabaseQuerySchema.EmailTable != undefined) {
                leftTableList.push(importDatabaseQuerySchema.EmailTable);
            }
            if (importDatabaseQuerySchema.FirstNameTable != undefined) {
                leftTableList.push(importDatabaseQuerySchema.FirstNameTable);
            }
            if (importDatabaseQuerySchema.IsActiveTable != undefined) {
                leftTableList.push(importDatabaseQuerySchema.IsActiveTable);
            }
            break;
        case "isactive":
            rightTableName = importDatabaseQuerySchema.IsActiveTable;
            if (importDatabaseQuerySchema.EmailTable != undefined) {
                leftTableList.push(importDatabaseQuerySchema.EmailTable);
            }
            if (importDatabaseQuerySchema.FirstNameTable != undefined) {
                leftTableList.push(importDatabaseQuerySchema.FirstNameTable);
            }
            if (importDatabaseQuerySchema.LastNameTable != undefined) {
                leftTableList.push(importDatabaseQuerySchema.LastNameTable);
            }
            break;

    }
    var leftTableCollection = [];
    var rightTableCollection = {};
    $.each(tableSchema, function (index, schemaValue) {
        $.each(schemaValue.Tables, function (index, value) {
            var tempValue = value;
            tempValue.Schema = schemaValue.Schema;
            if (jQuery.inArray(value.TableName, leftTableList) !== -1) {
                leftTableCollection.push(tempValue);
            }
            if (value.TableName == rightTableName) {
                rightTableCollection = value;
            }
        });
    });
    createRelationData = leftTableCollection;
    var leftTableDropDown = "", rightTableDropDown = "", leftTableColumnList = "", rightTableColumnList = "";
    for (var table = 0; table < leftTableCollection.length; table++) {
        leftTableDropDown += "<option value='" + leftTableCollection[table].TableName + "' data-schema='" + leftTableCollection[table].Schema + "'>" + leftTableCollection[table].TableName + "</option>";
    }
    var columns = leftTableCollection[0].Columns;
    for (var leftColumn = 0; leftColumn < columns.length; leftColumn++) {
        leftTableColumnList += "<li>" + columns[leftColumn].ColumnName + "</li>";
    }
    rightTableDropDown = "<option value='" + rightTableCollection.TableName + "' data-schema='" + rightTableCollection.Schema + "'>" + rightTableCollection.TableName + "</option>";
    for (var column = 0; column < rightTableCollection.Columns.length; column++) {
        rightTableColumnList += "<li>" + rightTableCollection.Columns[column].ColumnName + "</li>";
    }
    $("#left-table-selection").html(leftTableDropDown);
    $("#right-table-selection").html(rightTableDropDown);
    $("#left-table-columnlist ul").html(leftTableColumnList);
    $("#right-table-columnlist ul").html(rightTableColumnList);
    $("#get-join-details").find(".selectpicker").selectpicker("refresh");
    $("#apply-relation").attr("data-field-name", targetField);
    validateApplyRelationFields();
    $("#get-join-details").ejDialog("open");
}

function validateApplyRelationFields() {
    var leftSelectedColumn = $("#left-table-columnlist.column-list").find("li.selected");
    var rightSelectedColumn = $("#right-table-columnlist.column-list").find("li.selected");
    if (leftSelectedColumn.length > 0 && rightSelectedColumn.length > 0) {
        $("#apply-relation").attr("disabled", false);
    } else {
        $("#apply-relation").attr("disabled", true);
    }
}

function validateApplyConnectionFields() {
    var selectedFields = $("#selected-schema-holder").find(".selected-schema-fields");
    var isAllSelected = true;
    for (var element = 0; element < selectedFields.length; element++) {
        if ($(selectedFields[element]).html().trim() == "") {
            isAllSelected = false;
        }
    }
    isAllSelected ? $(".selection-add-btn").addClass("hide") : $(".selection-add-btn").removeClass("hide");
    var mandatoryFields = $("#selected-schema-holder").find(".selected-schema-fields.mandatory");
    if (mandatoryFields.length == 0) {
        $("#apply-connections").attr("disabled", true);
        $("#save-db-settings").prop("disabled", true);
        return;
    }
    for (var element = 0; element < mandatoryFields.length; element++) {
        if ($(mandatoryFields[element]).html().trim() == "") {
            $("#apply-connections").attr("disabled", true);
            $("#save-db-settings").prop("disabled", true);
            return;
        }
    }
    $("#apply-connections").attr("disabled", false);
    $("#save-db-settings").show();
    $("#save-db-settings").prop("disabled", false);
}

function refreshTemplate(args) {
    $("#checkbox-header").change(headCheckboxOnChange);
}

function fnActionComplete(args) {
    var gridObj = $("#Grid").data("ejGrid");
    $("#checkbox-header").prop("enabled", false);
    $("#checkbox-header").change(headCheckboxOnChange);
    gridObj.multiSelectCtrlRequest = true;
    gridObj.clearSelection();
    if (args.requestType == "paging" || args.requestType == "sorting" || args.requestType == "refresh" || args.requestType == "filtering" || args.requestType == "searching") {
        if (args.requestType == "filtering" || args.requestType == "searching")
            objectSelected = [];
        if (typeof gridObj.model.currentViewData != "undefined") {
            for (var i = 0; i < gridObj.model.currentViewData.length; i++) {
                var record = gridObj.model.currentViewData[i];
                var rowUniId = record.Index;
                var index = jQuery.inArray(JSON.stringify(record), $.map(objectSelected, JSON.stringify));
                if (index != -1) {
                    var rowIndex = $($("#Grid .checkbox-row[data-checked-id='" + rowUniId + "']").closest("td").parent()).index();
                    $("#Grid .checkbox-row#row-check" + rowUniId).prop("checked", true);
                    gridObj.selectRows(rowIndex);
                }
            }
        }
        var duplicateUsers = $.grep(searchedResult, function (elt) {
            return elt.IsDuplicated === true;
        });

        if (searchedResult.length === 0)
            $("#checkbox-header").prop("enabled", false);
        else
            $("#checkbox-header").prop("enabled", true);

        if (gridObj.getRows() != null) {
            if ((searchedResult.length - duplicateUsers.length) === objectSelected.length && objectSelected.length > 0)
                $("#checkbox-header").prop("enabled", true);
            else
                $("#checkbox-header").prop("enabled", false);
        }
    }

    enableimportbutton();
    $('[data-toggle="tooltip"]').tooltip();
}

function fnCreate(args) {
    $("#checkbox-header").change(headCheckboxOnChange);
}

function setHeaderCheckedStatus(gridObj) {
    var duplicateUsers = $.grep(searchedResult, function (elt) {
        return elt.IsDuplicated === true;
    });
    if (gridObj.getRows() != null) {
        if ((searchedResult.length - duplicateUsers.length) === objectSelected.length && objectSelected.length > 0)
            $("#checkbox-header").prop("checked", true);
        else
            $("#checkbox-header").prop("checked", false);
    }
    enableimportbutton();
}

function recordClick(args) {
    gridObj = $("#Grid").data("ejGrid");

    var isChecked = args.row.find(".checkbox-row").is(":checked");
    if (isChecked) {
        gridObj.multiSelectCtrlRequest = true;

        if (jQuery.inArray(JSON.stringify(args.data), $.map(objectSelected, JSON.stringify)) == -1) {
            objectSelected.push(args.data);
        } else {
            gridObj.selectRows(args.row.index());
            selectedIndex.splice(index, 1);
        }
    } else {
        gridObj.multiSelectCtrlRequest = true;
        gridObj.selectRows(args.row.index());
        var index = jQuery.inArray(JSON.stringify(args.data), $.map(objectSelected, JSON.stringify));
        if (index != -1) {
            objectSelected.splice(index, 1);
            gridObj.selectRows(args.row.index());
            selectedIndex.splice(index, 1);
        }
    }
    setHeaderCheckedStatus(gridObj);
}

function fnOnUserGridActionBegin(args) {
    if (args.requestType != "refresh") {
        $(".grid-error-validation").css("display", "none");
        $(".empty-validation").css("display", "none");
        $(".grid-validation").css("display", "none");
    }
}

function headCheckboxOnChange(e) {
    gridObj = $("#Grid").data("ejGrid");
    if ($("#checkbox-header").prop("checked") == true) {
        $(".checkbox-row").prop("checked", true);
        gridObj.multiSelectCtrlRequest = true;
        gridObj.selectRows(0, $(".checkbox-row").length + $(".checkbox-row-disabled").length);
        for (var t = 0; t < $(".checkbox-row-disabled").length; t++) {
            var checkbox = $(".checkbox-row-disabled");
            var rowIndex = $($(checkbox[t]).closest("td").parent()).index();
            gridObj.selectRows(rowIndex);
        }
        objectSelected = [];
        objectSelected = $.extend(true, objectSelected, searchedResult);
        if (isSafari) {
            $(".checkbox-header-label").addClass("check");
        }
    }
    else {
        $(".checkbox-row").prop("checked", false);
        objectSelected = [];
        gridObj.clearSelection();
        selectedIndex = [];
        if (isSafari) {
            $(".checkbox-header-label").removeClass("check");
        }
    }
    enableimportbutton();
}


function enableimportbutton() {
    gridObj = $("#Grid").data("ejGrid");
    if (objectSelected.length > 0) {
        $("#import-selected").attr("disabled", false);
    }
    else {
        $("#import-selected").attr("disabled", true);
    }
}

function SaveSelectedUsers() {
    if (objectSelected.length > 0) {
        showWaitingPopup("content-area");
        $.ajax({
            type: "POST",
            data: { selectedUsers: objectSelected },
            url: saveSelectedUsersUrl,
            success: function (result) {
                hideWaitingPopup("content-area");
                if (result.Status) {
                    if (result.IsUserLimitExceed) {
                        $("#limit-user").ejDialog("open");
                        if (result.UserLicense.UserCountsLeft > 0) {
                            $(".importad-allowed-count").html(result.UserLicense.UserCountsLeft);
                            $("#limit-import-ad").show();
                        } else {
                            $("#zero-user-acc").show();
                        }
                    } else {
                        var message = "";
                        message += "<li class='list-unstyled'>" + (result.Data.SuccessUserCount) + " User(s) has been imported successfully.</li>";
                        if (parseInt(result.Data.FailureUserCount) > 0) {
                            message += "<li class='list-unstyled'>" + result.Data.FailureUserCount + " duplicate user(s) exists. <br />(Username or Email address already exists or repeated).</li>";
                        }
                        messageBox("su-single-user", "Import users from database", message, "success", function () {
                            $("#change-selected-column").click();
                            var gridObj = $("#Grid").data("ejGrid");
                            gridObj.clearSelection();
                            objectSelected = [];
                            gridObj.refreshContent();
                            var e = jQuery.Event("keypress", { keyCode: 13 });
                            $("#search-database-users").trigger(e);
                            parent.onCloseMessageBox();
                        });
                    }
                } else {
                    messageBox("su-single-user", "Import users from database", "Internal server error. Please try again.", "success", function () {
                        parent.onCloseMessageBox();
                    });
                }
            }
        });
    }
}

function searchTree() {
    var treeElement = treeobj.element;
    var searchVal = $("#search-tree").val();
    if (searchVal.length > 0) {
        var matchedNode = [], otherNodes = [];
        var linkNodes = treeElement.find("ul>li>div>a");
        for (var p = 0; p < linkNodes.length; p++) {
            if ($(linkNodes[p]).clone().children().remove().end().text().trim().toLowerCase().indexOf(searchVal) != -1)
                matchedNode.push(linkNodes[p]);
            else
                otherNodes.push(linkNodes[p]);
        }
        var resultNodes = treeElement.find(matchedNode).closest("li").css("display", "block");
        treeElement.find(otherNodes).closest("li").css("display", "none");
        for (var i = 0; i < resultNodes.length; i++) {
            var currentNode = $(resultNodes[i]);
            var parentNode = currentNode.parents("ul").closest("li").css("display", "block");
            if (parentNode.length > 0) {
                treeobj.expandNode(parentNode);
                if (treeobj.model.expandedNodes.indexOf($(treeobj._liList).index(parentNode)) == -1)
                    window._temp.push(parentNode);
            }
            var childrenUl = currentNode.children("ul");
            if (childrenUl.length > 0 && childrenUl.children("li:visible").length == 0) {
                currentNode.children("ul").children("li").css("display", "block");
                treeobj.expandNode(resultNodes[i]);
                if (treeobj.model.expandedNodes.indexOf($(treeobj._liList).index(resultNodes[i])) == -1)
                    window._temp.push(resultNodes[i]);
            }
        }
    }
    else {
        treeElement.find("ul>li").css("display", "block");
        for (var i = 0; i < window._temp.length; i++) {
            treeobj._collpaseNode(window._temp[i]);
        }
        window._temp = [];
    }
    $("#tree-view li:visible").filter("[data-field-type='column']").removeClass("bottom-li");
    $("#tree-view li:visible").filter("[data-field-type='column']").slice(-3).addClass("bottom-li");
    $("#scroll-element").data("ejScroller").refresh();
}

function validateEmail(email, eventType) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
