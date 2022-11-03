var userAgent = navigator.userAgent;
var regexIe8 = new RegExp("Trident(\/4.0)|(Trident\/5.0)");
var isKeyUp = false;
$(document).ready(function () {
    $(".dbselect").ejRadioButton({ size: "medium", checked: false });
    $("#https").ejRadioButton({ size: "medium", checked: ($("#https").val().toLowerCase() != connectionType.toLowerCase()) ? false : true });
    $("#http").ejRadioButton({ size: "medium", checked: ($("#http").val().toLowerCase() != connectionType.toLowerCase()) ? false : true });
    $("#customendpoint").ejRadioButton({ size: "medium", checked: ($("#customendpoint").val().toLowerCase() != connectionType.toLowerCase()) ? false : true });

    $(window).resize(function () {
        changeFooterPostion();
    });

    changeFooterPostion();
    var height = $(document).height();
    $("#startupPageConatiner").css("height", height);

    $("input[name='Connection']").on("click change", function () {
        var checkedVal = $("input[name='Connection']:checked").val();
        var accountName = $("#txt_accountname").val();
        var accessKey = $("#txt_accesskey").val();

        if (checkedVal == "http" || checkedVal == "https") {
            $(".customendpointformelement").hide();
            var finalValue = "DefaultEndpointsProtocol=" + checkedVal + ";AccountName=" + accountName + ";AccountKey=" + accessKey;
            $("#connectionString").val(finalValue);
        } else {
            var blobUrl = $("#txt_bloburl").val();

            var finalValue = "BlobEndpoint=" + blobUrl + ";AccountName=" + accountName + ";AccountKey=" + accessKey;
            $("#connectionString").val(finalValue);
            $(".customendpointformelement").show();
        }
        addPlacehoder("#system-settings-container-page2");
        changeFooterPostion();
    });

    $("#txt_bloburl,#txt_tableurl,#txt_queueurl,#txt_accountname,#txt_accesskey").on("keyup", function () {
        var checkedVal = $("input[name='Connection']:checked").val();
        var accountName = $("#txt_accountname").val();
        var accessKey = $("#txt_accesskey").val();
        if (checkedVal == "http" || checkedVal == "https") {
            var finalValue = "DefaultEndpointsProtocol=" + checkedVal + ";AccountName=" + accountName + ";AccountKey=" + accessKey;
            $("#connectionString").val(finalValue);
        } else {
            var blobUrl = $("#txt_bloburl").val();

            var finalValue = "BlobEndpoint=" + blobUrl + ";AccountName=" + accountName + ";AccountKey=" + accessKey;
            $("#connectionString").val(finalValue);
        }
    });

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, "Please enter the name");

    $.validator.addMethod("IsValidEndPoint", function (value, element) {
        return IsValidEndPoint(value);
    }, "Invalid Blob Service endpoint");

    $.validator.addMethod("IsCustomEndpoint", function (value, element) {
        return IsCustomEndPoint(value, element);
    }, "Invalid End point");
    $.validator.addMethod("IsValidCustomEndPoint", function (value, element) {
        return IsValidCustomEndPoint(value, element);
    }, "Invalid custom End point");

    $("#blob_storage_form").validate({
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
            txt_accountname: {
                isRequired: true,
                hasWhiteSpace: false
            },
            txt_endpoint: {
                isRequired: true,
                IsValidEndPoint: true
            },
            txt_accesskey: {
                isRequired: true
            },
            txt_containername: {
                required: true
            },
            txt_bloburl: {
                IsCustomEndpoint: true,
                IsValidEndPoint: true,
                IsValidCustomEndPoint: true
            }
        },
        highlight: function (element) {
            $(element).closest(".form-group").addClass("has-error");
            $(element).parent().find(">.su-login-error").show();
        },
        unhighlight: function (element) {
            $(element).closest(".form-group").removeClass("has-error");
            $(element).parent().find(">.su-login-error").hide();
        },
        errorPlacement: function (error, element) {
            $(element).parent().find(">.su-login-error").attr("title", error.html());
        },
        messages: {
            txt_accountname: {
                isRequired: "Please enter Storage Account name"
            },
            txt_endpoint: {
                isRequired: "Please enter Blob Service endpoint"
            },
            txt_accesskey: {
                isRequired: "Please enter Access key"
            },
            txt_containername: {
                required: "Please enter Container name"
            },
            txt_bloburl: {
                IsCustomEndpoint: "Please enter Blob URL",
                IsValidEndPoint: "Please enter valid Blob URL",
                IsValidCustomEndPoint: "Subdomain name should match with the Account name"
            }
        }
    });
});

function validate_storage_type() {
    $("#DisplayValidationMessage").hide();
    showWaitingPopup("page_content_Div");
    var storageType = $("#StorageType").val();
    if (storageType == "1") {
        if ($("#blob_storage_form").valid()) {
            window.accountname = $("#txt_accountname").val();
            window.endpoint = $("#txt_endpoint").val();
            window.accesskey = $("#txt_accesskey").val();
            window.containername = $("#txt_containername").val();
            var blobUrl = $("#txt_bloburl").val();
            var connectionType = $("input[name='Connection']:checked").val();
            var connectionString = "";
            var storageEndPoint = $("#txt_endpoint").val();

            if (connectionType == "http" || connectionType == "https") {
                connectionString = "DefaultEndpointsProtocol=" + connectionType + ";AccountName=" + window.accountname + ";AccountKey=" + window.accesskey;
            } else {
                connectionString = "BlobEndpoint=" + blobUrl + ";AccountName=" + window.accountname + ";AccountKey=" + window.accesskey;
            }
            window.connectionType = connectionType;
            doAjaxPost("POST", "../Administration/MigrateBlobs",
                {
                    storageEndPoint: storageEndPoint, connectionString: connectionString, connectionType: connectionType, Endpoint: window.endpoint, containerName: window.containername
                },
                function (result) {
                    if (typeof result.Data != "undefined") {
                        if (result.Data.Key.toString().toLowerCase() == "true") {
                            window.azureconnectionString = result.Data.ConnectionString;
                            $("#system-settings-container-page2").hide();
                            $("#system-settings-container-page3").show();
                            hideWaitingPopup("page_content_Div");
                            changeFooterPostion();
                            $("#confirmationMessageBottom").show();
                        } else {
                            hideWaitingPopup("page_content_Div");
                            $("#DisplayValidationMessage").html(result.Data.Message).show();
                        }
                    } else {
                        hideWaitingPopup("page_content_Div");
                        $("#DisplayValidationMessage").html("Invalid Azure Blob Storage!").show();
                    }
                }
            );
            return false;
        } else {
            hideWaitingPopup("page_content_Div");
            changeFooterPostion();
            return false;
        }
    } else {
        hideWaitingPopup(".startupPageConatiner");
        $("#system-settings-container-page2").hide();
        $("#system-settings-container-page3").show();
        $("#txt_username").focus();
        changeFooterPostion();
        return false;
    }
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
    if (connectionType == "customendpoint") {
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
    var accountname = $("#txt_accountname").val();
    if (connectionType == "customendpoint") {
        var accountName = $("#txt_accountname").val();
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

function changeFooterPostion() {
    if (window.innerHeight - $("#system_settings_general").height() > 70) {
        $("#system_settings_footer").addClass("footer-fixed");
    } else {
        $("#system_settings_footer").removeClass("footer-fixed");
    }
}

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