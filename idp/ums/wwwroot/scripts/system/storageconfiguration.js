
$(document).ready(function () {
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
                isRequired: true,
                hasWhiteSpace: false
            },
            bloburl: {
                IsCustomEndpoint: true,
                IsValidEndPoint: true,
                IsValidCustomEndPoint: true
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass("e-error");
            $(element).closest(".e-outline").siblings(".startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('e-error');
            $(element).closest(".e-outline").siblings(".startup-validation").hide();
            $(".blob-error-message").css("display", "none");
            changeFooterPostion();
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".startup-validation").text(error.html());
            changeFooterPostion();
        },
        messages: {
            accountname: {
                isRequired: window.Server.App.LocalizationContent.StorageAccount
            },
            endpoint: {
                isRequired: window.Server.App.LocalizationContent.EndPoint,
                IsValidEndPoint: window.Server.App.LocalizationContent.IsValidEndpoint,
            },
            accesskey: {
                isRequired: window.Server.App.LocalizationContent.AccessKey
            },
            containername: {
                required: window.Server.App.LocalizationContent.ContainerName
            },
            bloburl: {
                IsCustomEndpoint: window.Server.App.LocalizationContent.BlobUrl,
                IsValidEndPoint: window.Server.App.LocalizationContent.IsValidBlobUrl,
                IsValidCustomEndPoint: window.Server.App.LocalizationContent.IsValidCustomBlobUrl
            }
        }

    });
});

function validate_storage_type() {
    $(".blob-error-message").hide();
    var storageType = getRadioButtonValue('IsBlobStorage');
    window.storageType = storageType;
    if (storageType == "1") {
        if ($("#blob-storage-form").valid()) {
            window.accountname = $("#txt-accountname").val();
            window.endpoint = $("#txt-bloburl").val() == "" ? "https://" + $("#txt-accountname").val() + ".blob.core.windows.net" : $("#txt-bloburl").val();
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
                            $("#image-parent-container, #system-settings-filestorage-container").hide();
                            registerApplication(isSimpleModeSelction());
                            return false;
                        } else {
                            hideWaitingPopup('startup-waiting-element');
                            $(".azure-validation,.blob-error-message").css("display", "block");
                            changeFooterPostion();
                        }
                    } else {
                        hideWaitingPopup('startup-waiting-element');
                        $(".azure-validation,.blob-error-message").css("display", "block");
                        changeFooterPostion();
                    }
                }
            });

            return false;
        } else {
            hideWaitingPopup('startup-waiting-element');
            changeFooterPostion();
            return false;
        }
    } else {
        $("#image-parent-container, #system-settings-filestorage-container").hide();
        registerApplication(isSimpleModeSelction());
        return false;
    }
}


function onConnectionRadioChange(args) {
    var checkedVal = args.value;
    var accountName = $("#txt-accountname").val();
    var accessKey = $("#txt-accesskey").val();

    if (checkedVal == "http" || checkedVal == "https") {
        $(".custom-endpoint-form-element").hide();
        var finalValue = "DefaultEndpointsProtocol=" + checkedVal + ";AccountName=" + accountName + ";AccountKey=" + accessKey;
        $("#connection-string").val(finalValue);
        if ($("#txt-bloburl").parent().hasClass('e-error') && (checkedVal != 'customendpoint')) {
            $("#txt-bloburl").parent().removeClass('e-error');
        }

    } else {
        var blobUrl = $("#txt-bloburl").val();

        var finalValue = "BlobEndpoint=" + blobUrl + ";AccountName=" + accountName + ";AccountKey=" + accessKey;
        $("#connection-string").val(finalValue);
        $(".custom-endpoint-form-element").show();
    }
    $("div.placeholder").remove();
    addPlacehoder("#system-settings-filestorage-container");
    changeFooterPostion();
}

function onBlobStorageChange(args) {
    var checkedVal = args.value;
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
        $(".e-error").removeClass("e-error");
        $("div.placeholder").remove();
        ResizeHeightForDOM();
    }
    addPlacehoder("#system-settings-filestorage-container");
    changeFooterPostion();
}

