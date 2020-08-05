var selectedRowData;
var appName;
var isIconModified = false;
var urlCount;
var urlboxes = [1];
var urlDuplicates = [];
var isAppDialog = false;

$(document).ready(function () {
    var loginFileExtension;
    var loginFileName;
    var currentDate = $.now();

    $("#application-type").on("change", function () {
        $(".img-validation-msg").css("display", "none");
        if ($("#icon-img").attr("src").toLocaleLowerCase().indexOf("default") != -1) {
            setDefaultIcon();
        }
    });

    $("#icon-button-click").click(function () {
        $(".e-uploadinput").click();
        $(".img-validation-msg").css("display", "none");
    });

    $("#icon-delete-click").click(function () {
        setDefaultIcon();
        $("#icon-delete-click").css("display", "none");
        isIconModified = true;
    });

    $("#icon-upload-box").ejUploadbox({
        saveUrl: window.fileUploadUrl + "?imageType=apps&&timeStamp=" + currentDate,
        autoUpload: true,
        showFileDetails: false,
        extensionsAllow: ".PNG,.png,.jpg,.JPG,.jpeg,.JPEG",
        height: window.innerWidth <= 1366 ? 26 : 30,
        begin: function () {
            ShowWaitingProgress("#content-area", "show");
        },
        fileSelect: function (e) {
            loginFileExtension = e.files[0].extension.toLowerCase();
            loginFileName = e.files[0].name;
        },
        error: function () {
            if (loginFileExtension !== ".png" && loginFileExtension !== ".jpg" && loginFileExtension !== ".jpeg") {
                $(".img-validation-msg").css("display", "block");
            }
        },
        complete: function () {
            window.IconLogo = "apps_" + currentDate + ".png";
            isIconModified = true;
            var imageUrl = window.baseRootUrl + "/Content/images/clients/temp/" + "apps_" + currentDate + ".png?v=" + $.now();
            $("#icon-img").attr("src", imageUrl);
            $(".img-validation-msg").css("display", "none");
            ShowWaitingProgress("#content-area", "hide");
        }
    });

    $(".img-view-holder").on("mouseenter", function () {
        $("#icon-img").addClass("icon-img");
        $("#icon-button-click").css("display", "inline-block");
        if ($("#icon-img").attr("src").toLocaleLowerCase().indexOf("default") == -1) {
            $("#icon-delete-click").css("display", "inline");
        }
        else {
            $("#icon-delete-click").css("display", "none");
        }
    });

    $(".img-view-holder").on("mouseleave", function () {
        $("#icon-img").removeClass("icon-img");
        $("#icon-button-click,#icon-delete-click").css("display", "none");
    });

    $("#application-dialog").ejDialog({
        width: "700px",
        height: "auto",
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        showHeader: false,
        enableModal: true,
        closeOnEscape: true
    });

    $("#application-dialog").ejWaitingPopup();

    $("#application-disable-confirmation").ejDialog({
        width: "378px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        height: "auto",
        title: "Disable Application",
        showHeader: false,
        enableModal: true,
        close: "onDisableApplicationDialogClose",
        closeOnEscape: true,
        open: "onDisableApplicationDialogOpen"
    });

    $("#application-enable-confirmation").ejDialog({
        width: "378px",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        height: "auto",
        title: "Enable Application",
        showHeader: false,
        enableModal: true,
        close: "onEnableApplicationDialogClose",
        closeOnEscape: true,
        open: "onEnableApplicationDialogOpen"
    });

    $('[data-toggle="popover"]').popover();

    $.validator.addMethod("isRequired", function (value, element) {
        return !parent.isEmptyOrWhitespace(value);
    }, "Please enter the name.");

    $.validator.addMethod("isValidName", function (value, element) {
        return parent.IsValidName("name", value);
    }, "Please avoid special characters.");

    $.validator.addMethod("maxLength", function (value, element) {
        return parent.IsValidName("name", value);
    }, "Application name should be less than 255 characters.");

    $.validator.addMethod("isValidName", function (value, element) {
        return parent.IsValidName("name", value);
    }, "Please enter the valid application name.");

    validateDialogbox(1);

    $("#application-dialog").keyup(function (e) {
        if (e.keyCode == window.keyCode.Enter) {
            if ($("#add-application").is(":visible")) {
                $("input#add-application").trigger("click");
            }
            else {
                $("input#edit-application").trigger("click");
            }
        }
    });

    if (getParameterByName("action") === "create") {
        $("#add-applications").trigger("click");
    }
});

function validateDialogbox(id) {
    $.validator.addMethod("isApplicationUrlValid", function (value, element) {
        if (element.id != "application-name") {
            var currentId = parseInt(element.id.replace("applicationurl-", ""));
            var givenUrl = $("#app-url-" + currentId).val() + "://" + $("#applicationurl-" + currentId).val();
            var url = parseURL(givenUrl);
            if (isValidUrl(givenUrl) == false || parseInt(url.port) > 65535)
                return false;
            else
                return true;
        } else {
            return true;
        }
    }, "Please enter the valid application URL.");

    $.validator.addMethod("maxLength", function (value, element) {
        var currentId = parseInt(element.id.replace("applicationurl-", ""));
        var appUrl = $("#applicationurl-" + currentId).val();
        return parent.IsValidName(appUrl, value);
    }, "Application URL should be less than 255 characters.");

    $("#application-dialog").validate({
        errorElement: "div",
        onkeyup: function (element, event) {
            if (event.KeyCode != window.keyCode.Tab) {
                $(element).valid();
            }

            if (event.KeyCode == 8 || event.KeyCode == 46 || !$(element).valid()) {
                $("#validate-name, #validate-url-" + parseInt(element.id.replace("applicationurl-", ""))).parent().removeClass("has-error");
                $("#validate-name, #validate-url-" + parseInt(element.id.replace("applicationurl-", ""))).text("");
            } else true;
        },

        onfocusout: function (element) { $(element).valid(); },

        rules: {
            "applicationname": {
                isRequired: true,
                isValidName: true,
                maxlength: 255
            }
        },
        messages: {
            "applicationname": {
                isRequired: "Please enter the application name.",
                maxlength: "Application name should be less than 255 characters."
            }
        },

        highlight: function (element) {
            $(element).closest("div").addClass("has-error");
        },

        unhighlight: function (element) {
            $(element).closest("div").removeClass("has-error");
            $(element).closest("div").find("div").html("");
            $(element).closest("div").find("span").html("");
            $("#validate-name").css("display", "none");
        },

        errorPlacement: function (error, element) {
            $(element).closest("div").find("div").html(error.html());
        }
    });

    $("#applicationurl-" + id).rules("add",{ 
        isRequired: true,
        isApplicationUrlValid: true,
        maxlength: 255,
        messages: { 
            isRequired: "Please enter the application URL.",
            maxlength: "Application URL should be less than 255 characters."
            }
    });
    
    $("#applicationname, #applicationurl-" + id).bind("Keypress", function (e) {
        if (e.KeyCode == window.keyCode.Enter) {
            e.preventDefault();
            return false;
        }
    });

    $("#app-url-" + id).on("change", function () {
        var id = parseInt($(this).attr('id').replace("app-url-", ""));
        if ($("#validate-url-" + id).text() === "URLs should be unique") {
            $("#validate-url-" + id).parent().removeClass("has-error");
            $("#validate-url-" + id).text("");
        }
    });
}

function parseURL(str) {
    var o = parseURL.options,
        m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
        uri = {},
        i = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
};

parseURL.options = {
    strictMode: true,
    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
    q: {
        name: "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};

function onAddApplicationDialogOpen() {
    $("#application-name").focus();
    $("#application-dialog").ejDialog("open");
    $("#dialog-title").text("Add Application");
    $(".e-dialog-icon").attr("title", "Close");
    $("#app-name-validate").removeClass("has-error");
    $("#app-name-validate").find("div").html("");
    $("#app-url-validate-1").removeClass("has-error");
    $("#app-url-validate-1").find("div").html("");
    $("#application-dialog").trigger("reset");
    $("#app-url-1, #application-type").selectpicker("refresh");
    $(".popover").hide();
    $("#edit-application").hide();
    $("#add-application").show();
    $("#accesstousers").val($("#accesstousers").removeAttr("checked", "checked"));
    $("#icon-img").attr("src", "/en-us/apps/icon/default?applicationtype=1");
    urlCount = 1;
    urlboxes = [1];
    isAppDialog = true;
}

function onEditApplicationDialogOpen() {
    urlCount = 1;
    urlboxes = [1];
    $("#application-dialog").ejDialog("open");
    $("#dialog-title").text("Edit Application");
    $(".e-dialog-icon").attr("title", "Close");
    $("#app-name-validate, #app-url-validate").removeClass("has-error");
    $("#app-name-validate, #app-url-validate").find("div").html("");
    $(".popover").hide();
    $("#application-name").val(selectedRowData.data.Name);
    for (var i = 0; i < selectedRowData.data.UrlList.length; i++) {
        if (i == 0) {
            var urlProtocolType = (selectedRowData.data.UrlList[i]).split(":");
            $("#app-url-1").val(urlProtocolType[0]).change();
            $("#applicationurl-1").val(extractHostname(selectedRowData.data.UrlList[i]));
        } else {
            var lastPicker = "#selectpicker-" + urlboxes[urlboxes.length - 1];
            urlCount++;
            $(lastPicker).after("<div id='selectpicker-" + urlCount + "' class='selectpicker-class input-group no-left-padding'> <div class='input-group-addon'><select id='app-url-" + urlCount + "' class='app-url selectpicker'><option value='http'>http</option><option value='https'>https</option></select> </div> <div class='col-xs-12 no-padding' id='app-url-validate-" + urlCount + "'><input type='text' id='applicationurl-" + urlCount + "' name='applicationurl-" + urlCount + "' class='form-control applicationurl site-url-fields' placeholder='Application URL' tabindex='1004' /><span id ='validate-url-" + urlCount + "' class='validate-url validation-message'></span><div class='validation-message app-url-validation-message'></div><span class='su su-close close-url'></span>  </div></div>");
            $("#app-url-" + urlCount).selectpicker("refresh");
            urlboxes.push(urlCount);
            if ($(".selectpicker-class").length <= 2) {
                $(".modal-body").css("height", $(".modal-body").height()).css("overflow-y", "scroll");
            }
            validateDialogbox(urlCount);

            var urlProtocolType = (selectedRowData.data.UrlList[i]).split(":");
            $("#app-url-" + urlCount).val(urlProtocolType[0]).change();
            $("#applicationurl-" + urlCount).val(extractHostname(selectedRowData.data.UrlList[i]));
        }
    }

    $("#application-type").val(selectedRowData.data.ApplicationTypeId);
    if (selectedRowData.data.HasAccessToAllUsers) {
        $("#accesstousers").val($("#accesstousers").prop("checked", true));
    }
    else {
        $("#accesstousers").val($("#accesstousers").prop("checked", false));
    }
    $("#app-url-1, #application-type").selectpicker("refresh");
    $("#add-application").hide();
    $("#edit-application").show();
    if (selectedRowData.data.Icon.toLocaleLowerCase() == "na") {
        $("#icon-img").attr("src", "/en-us/apps/icon/default?applicationtype=" + selectedRowData.data.ApplicationTypeId);
    } else {
        $("#icon-img").attr("src", "/en-us/apps/icon?id=" + selectedRowData.data.ClientId);
    }
    isIconModified = false;
    isAppDialog = true;
}

function fnApplicationRecordClick(data) {
    selectedRowData = data;
}

function onAddApplicationDialogClose() {
    $("#application-dialog").ejDialog("close");
    $("#application-dialog").trigger("reset");
    $("#app-url-1, #application-type").selectpicker("refresh");
    $(".popover").hide();
    $("#validate-name, .validate-url").css("display", "none");
    $("#validate-name, .validate-url, .app-url-validation-message").text("");
    $("#validate-name, .validate-url").parent().removeClass("has-error");
    $(".modal-body").css("height", '').css("overflow-y", '');
    for (var i = 0; i < urlboxes.length; i++) {
        if (urlboxes[i] != 1) {
            $("#selectpicker-" + urlboxes[i]).remove();
        }
    }
    urlCount = 1;
    urlboxes = [1];
    isAppDialog = false;
}

$(document).on("click", "#add-application", function () {
    var applicationId = null;
    var applicationName = $("#application-name").val().trim();
    var applicationUrl = GetUrls();
    var applicationType = $("#application-type").find("option:selected").val();
    var accessToUsers = $("#accesstousers").is(":checked");
    var isValid = $("#application-dialog").valid();
    var applicationGrid = $("#application_grid").data("ejGrid");
    var icon = window.IconLogo;
    var isDefaultIcon = $("#icon-img").attr("src").toLocaleLowerCase().indexOf("default") != -1;
    if (isValid) {
        $("#application-dialog").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: isapplicationnameexistUrl,
            data: { applicationId: applicationId, applicationName: applicationName },
            success: function (data) {
                if (data) {
                    $("#validate-name").parent("div").addClass("has-error");
                    $("#validate-name").text("Application with the same name already exists.");
                    $("#validate-name").css("display", "block");
                    $("#application-dialog").ejWaitingPopup("hide");
                }
                else {
                    $.ajax({
                        type: "POST",
                        url: validateUrlDuplicates,
                        data: { urlList: GetUrls() },
                        success: function (data) {
                            $("#application-dialog").ejWaitingPopup("hide");
                            if (data.duplicateExists) {
                                var dupIdList = JSON.parse(data.result);
                                for (var i = 0; i < dupIdList.length; i++) {
                                    $("#validate-url-" + urlboxes[dupIdList[i]]).parent().addClass("has-error");
                                    $("#validate-url-" + urlboxes[dupIdList[i]]).text("URLs should be unique");
                                    $("#validate-url-" + urlboxes[dupIdList[i]]).css("display", "block");
                                }
                            } else {
                                $.ajax({
                                    type: "POST",
                                    url: getapplicationdetailsUrl,
                                    data: { name: applicationName, urlList: applicationUrl, hasAccess: accessToUsers, applicationType: applicationType, icon: icon, isDefaultIcon: isDefaultIcon },
                                    success: function (data) {
                                        $("#application-dialog").ejWaitingPopup("hide");
                                        if (data.IsSuccess) {
                                            $("#application-dialog").ejDialog("close");
                                            SuccessAlert("Add Application", "Application added successfully.", 7000);
                                            applicationGrid.refreshContent();
                                            for (var i = 0; i < urlboxes.length; i++) {
                                                if (urlboxes[i] != 1) {
                                                    $("#selectpicker-" + urlboxes[i]).remove();
                                                    $(".modal-body").css("height", '').css("overflow-y", '');
                                                    $("#selectpicker-1").css("margin-bottom", "");
                                                }
                                            }
                                        }
                                        else if (data.IsFailure) {
                                            var errorIdList = JSON.parse(data.Message);
                                            for (var i = 0; i < errorIdList.length; i++) {
                                                $("#validate-url-" + urlboxes[errorIdList[i]]).parent().addClass("has-error");
                                                $("#validate-url-" + urlboxes[errorIdList[i]]).text("Please enter the valid application URL.");
                                                $("#validate-url-" + urlboxes[errorIdList[i]]).css("display", "block");
                                            }
                                        }
                                        else if (data.Exception) {
                                            $("#application-dialog").ejDialog("close");
                                            WarningAlert("Add Application", "Error while adding application.", 7000);
                                        }
                                    },
                                    failure: function () {
                                        $("#application-dialog").ejWaitingPopup("hide");
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }
});

$(document).on("click", "#edit-application", function () {
    var applicationId = selectedRowData.data.Id;
    var applicationName = $("#application-name").val().trim();
    var applicationUrl = GetUrls();
    var applicationType = $("#application-type").find("option:selected").val();
    var accessToUsers = $("#accesstousers").is(":checked");
    var isValid = $("#application-dialog").valid();
    var applicationGrid = $("#application_grid").data("ejGrid");
    var icon = window.IconLogo;
    var isDefaultIcon = $("#icon-img").attr("src").toLocaleLowerCase().indexOf("default") != -1;
    if (isValid) {
        $("#application-dialog").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: isapplicationnameexistUrl,
            data: { applicationId: applicationId, applicationName: applicationName },
            success: function (data) {
                if (data) {
                    $("#validate-name").parent("div").addClass("has-error");
                    $("#validate-name").text("Application with the same name already exists.");
                    $("#validate-name").css("display", "block");
                    $("#application-dialog").ejWaitingPopup("hide");
                }
                else {
                    $.ajax({
                        type: "POST",
                        url: validateUrlDuplicates,
                        data: { urlList: GetUrls() },
                        success: function (data) {
                            $("#application-dialog").ejWaitingPopup("hide");
                            if (data.duplicateExists) {
                                var dupIdList = JSON.parse(data.result);
                                for (var i = 0; i < dupIdList.length; i++) {
                                    $("#validate-url-" + urlboxes[dupIdList[i]]).parent().addClass("has-error");
                                    $("#validate-url-" + urlboxes[dupIdList[i]]).text("URLs should be unique");
                                    $("#validate-url-" + urlboxes[dupIdList[i]]).css("display", "block");
                                }
                            } else {
                                $.ajax({
                                    type: "POST",
                                    url: getupdateapplicationdetailsUrl,
                                    data: { id: applicationId, name: applicationName, urlList: applicationUrl, hasAccess: accessToUsers, applicationType: applicationType, isIconModified: isIconModified, icon: icon, isDefaultIcon: isDefaultIcon },
                                    success: function (data) {
                                        $("#application-dialog").ejWaitingPopup("hide");
                                        if (data.IsSuccess) {
                                            $("#application-dialog").ejDialog("close");
                                            SuccessAlert("Edit Application", "Application details updated successfully.", 7000);
                                            applicationGrid.refreshContent();
                                            for (var i = 0; i < urlboxes.length; i++) {
                                                if (urlboxes[i] != 1) {
                                                    $("#selectpicker-" + urlboxes[i]).remove();
                                                    $(".modal-body").css("height", '').css("overflow-y", '');
                                                    $("#selectpicker-1").css("margin-bottom", "");
                                                }
                                            }
                                        }
                                        else if (data.IsFailure) {
                                            var errorIdList = JSON.parse(data.Message);
                                            for (var i = 0; i < errorIdList.length; i++) {
                                                $("#validate-url-" + urlboxes[errorIdList[i]]).parent().addClass("has-error");
                                                $("#validate-url-" + urlboxes[errorIdList[i]]).text("Please enter the valid application URL.");
                                                $("#validate-url-" + urlboxes[errorIdList[i]]).css("display", "block");
                                            }
                                        }
                                        else if (data.Exception) {
                                            $("#application-dialog").ejDialog("close");
                                            WarningAlert("Edit Application", "Error while updating application details.", 7000);
                                        }
                                    },
                                    failure: function () {
                                        $("#application-dialog").ejWaitingPopup("hide");
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    }
});

function onDisableApplicationDialogOpen() {
    $("#application-disable-confirmation").ejDialog("open");
    appName = selectedRowData.data.Name;
    $("#disableAppName").text(appName);
    $(".e-dialog-icon").attr("title", "Close");
}

$(document).on("click", "#disable-Application", function () {
    var applicationId = selectedRowData.data.Id;
    var applicationGrid = $("#application_grid").data("ejGrid");

    $.ajax({
        type: "POST",
        url: disableapplicationUrl,
        data: { applicationId: applicationId },
        success: function (data) {
            if (data) {
                $("#application-disable-confirmation").ejDialog("close");
                SuccessAlert("Delete Application",
                    "Application deleted successfully.",
                    7000);
                applicationGrid.refreshContent();
            } else {
                $("#application-disable-confirmation").ejDialog("close");
                WarningAlert("Delete Application",
                    "Error while deleting the application.",
                    7000);
            }
        }
    });
});

function onDisableApplicationDialogClose() {
    $("#application-disable-confirmation").ejDialog("close");
    $(".e-dialog-icon").attr("title", "Close");
}

function onEnableApplicationDialogOpen() {
    $("#application-enable-confirmation").ejDialog("open");
    appName = selectedRowData.data.Name;
    $("#enableAppName").text(appName);
    $(".e-dialog-icon").attr("title", "Close");
}

$(document).on("click", "#enable-Application", function () {
    var applicationId = selectedRowData.data.Id;
    var applicationGrid = $("#application_grid").data("ejGrid");

    $.ajax({
        type: "POST",
        url: enableapplicationUrl,
        data: { applicationId: applicationId },
        success: function (data) {
            if (data) {
                $("#application-enable-confirmation").ejDialog("close");
                SuccessAlert("Enable Application", "Application enabled successfully.", 7000);
                applicationGrid.refreshContent();
            } else {
                $("#application-enable-confirmation").ejDialog("close");
                WarningAlert("Enable Application", "Error while enabling the application.", 7000);
            }
        }
    });
});

function onEnableApplicationDialogClose() {
    $("#application-enable-confirmation").ejDialog("close");
    $(".e-dialog-icon").attr("title", "Close");
}

function extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    }
    else {
        hostname = url.split('/')[0];
    }

    //find & remove port number
    //hostname = hostname.split(':')[0];
    //find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
}

$(document).on('click', function (e) {
    if (isAppDialog) {
        if ($(".popover").children().hasClass("popover-content")) {
            $(".popover-content").attr("id", "popover-content");
            $(".arrow").attr("id", "arrow");
        }

        if (e.target.id !== "popover-content" && e.target.id !== "arrow" && e.target.id !== "user-access-popover") {
            $(".popover").css("display", "none");
        }
        $('.popover').each(function () {
            if (!($(this).is(e.target) || $(this).has(e.target).length > 0)
                && $(this).siblings('.popover').length !== 0
                && $(this).siblings('.popover').has(e.target).length === 0) {
                $(this).popover().remove();
            }
        });
    }
});

function setDefaultIcon() {
    var checkedVal = $("#application-type").val();
    $("#icon-img").attr("src", "/en-us/apps/icon/default?applicationtype=" + checkedVal);
}

$(document).on("click", ".url-add", function () {
    var lastPicker = "#selectpicker-" + urlboxes[urlboxes.length-1];
    urlCount++;
    $(lastPicker).after("<div id='selectpicker-" + urlCount + "' class='selectpicker-class input-group no-left-padding'> <div class='input-group-addon'><select id='app-url-" + urlCount + "' class='app-url selectpicker'><option value='http'>http</option><option value='https'>https</option></select> </div> <div class='col-xs-12 no-padding' id='app-url-validate-" + urlCount + "'><input type='text' id='applicationurl-" + urlCount + "' name='applicationurl-" + urlCount + "' class='form-control applicationurl site-url-fields' placeholder='Application URL' tabindex='1004' /><span id ='validate-url-" + urlCount + "' class='validate-url validation-message'></span><div class='validation-message app-url-validation-message'></div><span class='su su-close close-url'></span>  </div></div>");
    $("#app-url-" + urlCount).selectpicker("refresh");
    urlboxes.push(urlCount);
    if ($(".selectpicker-class").length <= 2) {
        $(".modal-body").css("height", $(".modal-body").height()).css("overflow-y", "scroll");
    }
    validateDialogbox(urlCount);
});

$(document).on("click", ".close-url", function () {
    if ($(this).parent().parent().attr('id') != "#selectpicker-1") {
        $(this).parent().parent().remove();
        var deletedId = parseInt($(this).parent().parent().attr('id').replace('selectpicker-', ''));
        urlboxes.splice($.inArray(deletedId, urlboxes), 1);
    }
    if ($(".selectpicker-class").length == 1) {
        $(".modal-body").css("height", '').css("overflow-y", '');
    }
});

function GetUrls() {
    var urlList = [($("#app-url-1").val() + "://" + $("#applicationurl-1").val().trim()).toLowerCase()];
    for (var i = 0; i < urlboxes.length; i++) {
        if (urlboxes[i] != 1) {
            urlList.push(($("#app-url-" + urlboxes[i]).val() + "://" + $("#applicationurl-" + urlboxes[i]).val().trim()).toLowerCase());
        }
    }
    return urlList;
}