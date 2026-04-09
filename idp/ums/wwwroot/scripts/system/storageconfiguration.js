
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

    $("#oci-object-storage-form").validate({
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
            bucketname: {
                isRequired: true,
                hasWhiteSpace: false
            },
            accesskey: {
                isRequired: true,
                hasWhiteSpace: false
            },
            secretkey: {
                isRequired: true,
                hasWhiteSpace: false
            },
            rootfoldername: {
                isRequired: true,
                hasWhiteSpace: false
            },
            namespace: {
                isRequired: true,
                hasWhiteSpace: false
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass("e-error");
            $(element).closest(".e-outline").siblings(".startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('e-error');
            $(element).closest(".e-outline").siblings(".startup-validation").hide();
            $(".oci-object-storage-error-message").css("display", "none");
            changeFooterPostion();
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".startup-validation").text(error.html());
            changeFooterPostion();
        },
        messages: {
            bucketname: {
                isRequired: window.Server.App.LocalizationContent.OCIBucketNameEmpty
            },
            accesskey: {
                isRequired: window.Server.App.LocalizationContent.OCIAccessKeyEmpty
            },
            secretkey: {
                isRequired: window.Server.App.LocalizationContent.OCISecretKeyEmpty
            },
            rootfoldername: {
                isRequired: window.Server.App.LocalizationContent.OCIRootFolderNameEmpty
            },
            namespace: {
                isRequired: window.Server.App.LocalizationContent.OCINameSpaceEmpty
            }
        }

    });

    $("#amazon-s3-storage-form").validate({
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
            bucketname: {
                isRequired: true,
                hasWhiteSpace: false
            },
            accesskeyid: {
                isRequired: true,
                hasWhiteSpace: false
            },
            accesskeysecret: {
                isRequired: true,
                hasWhiteSpace: false
            },
            rootfoldername: {
                isRequired: true,
                hasWhiteSpace: false
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass("e-error");
            $(element).closest(".e-outline").siblings(".startup-validation").show();
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('e-error');
            $(element).closest(".e-outline").siblings(".startup-validation").hide();
            $(".amazon-s3-storage-error-message").css("display", "none");
            changeFooterPostion();
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".startup-validation").text(error.html());
            changeFooterPostion();
        },
        messages: {
            bucketname: {
                isRequired: window.Server.App.LocalizationContent.AmazonBucketName
            },
            accesskeyid: {
                isRequired: window.Server.App.LocalizationContent.AmazonAccessKeyId
            },
            accesskeysecret: {
                isRequired: window.Server.App.LocalizationContent.AmazonAccessKeySecret
            },
            rootfoldername: {
                isRequired: window.Server.App.LocalizationContent.AmazonRootFolderName
            }
        }

    });
});

function validate_storage_type() {
    debugger;
    $(".blob-error-message").hide();
    var storageType = getDropDownValue("storage-type") == "2" ? "4" : getDropDownValue("storage-type");
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
    } else if (storageType == "4") {
        if ($("#oci-object-storage-form").valid()) {
            var ociStorageConfiguration = {
                Region: getDropDownValue("oci-object-region"),
                BucketName: $("#txt-oci-bucketname").val(),
                AccessKey: $("#txt-oci-accesskey").val(),
                SecretKey: $("#txt-secretkey").val(),
                RootFolderName: $("#txt-oci-rootfoldername").val(),
                OCINameSpace: $("#txt-namespace").val()
            }

            showWaitingPopup('startup-waiting-element');
            $.ajax({
                type: "POST",
                url: isOCIStorageExist,
                data: { ociStorageConfiguration: JSON.stringify(ociStorageConfiguration) },
                success: function (data) {
                    if (data.result == true) {
                        $("#image-parent-container, #system-settings-filestorage-container").hide();
                        registerApplication(isSimpleModeSelction());
                        return false;
                    }
                    else {
                        hideWaitingPopup('startup-waiting-element');
                        $(".oci-object-storage-validation,.oci-object-storage-error-message").css("display", "block");
                        changeFooterPostion();
                    }
                }
            });
        }
        return false;
    }
    else if (storageType == "3") {
        if ($("#amazon-s3-storage-form").valid) {
            var amazons3configuration = {
                Region: getDropDownValue("aws-region"),
                BucketName: $("#txt-bucketname").val(),
                AccessKeyId: $("#txt-accesskeyid").val(),
                AccessKeySecret: $("#txt-accesskeysecret").val(),
                RootFolderName: $("#txt-rootfoldername").val()
            }

            showWaitingPopup('startup-waiting-element');
            $.ajax({
                type: "POST",
                url: amazons3Exist,
                data: { amazons3configuration: JSON.stringify(amazons3configuration) },
                success: function (data) {
                    if (data.result == true) {
                        $("#image-parent-container, #system-settings-filestorage-container").hide();
                        registerApplication(isSimpleModeSelction());
                        return false;
                    }
                    else {
                        hideWaitingPopup('startup-waiting-element');
                        $(".amazon-s3-storage-validation,.amazon-s3-storage-error-message").css("display", "block");
                        changeFooterPostion();
                    }
                }
            });
        }
        return false;
    }
    else {
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

function onStorageTypeChange(checkedVal) {
    if (checkedVal == "0") {
        $("#blob-storage-form").hide("slow");
        $("#amazon-s3-storage-form").hide("slow");
        $("#oci-object-storage-form").hide("slow");
        if (storageButtonValue === "tenant") {
            $(".content-value").slideDown("slow");
        } else {
            $(".report-content").slideDown("slow");
        }
        $(".storage-checkbox").hide("slow");
        $(".azure-validation").css("display", "none");
        $(".oci-object-storage-validation").css("display", "none");
        $(".amazon-s3-storage-validation").css("display", "none");
    } else if (checkedVal == "1") {
        $(".content-value").hide();
        $(".report-content").hide();
        if (storageButtonValue === "tenant") {
            $(".storage-checkbox").hide("slow");
        }
        else {
            $(".storage-checkbox").show("slow");
        }
        $("#blob-storage-form").slideDown("slow");
        $("#oci-object-storage-form").hide("slow");
        $("#amazon-s3-storage-form").hide("slow");
        $(".validation-txt-errors").hide();
        $(".azure-validation").css("display", "none");
        $(".oci-object-storage-validation").css("display", "none");
        $(".amazon-s3-storage-validation").css("display", "none");
        $(".e-error").removeClass("e-error");
        $("div.placeholder").remove();
        ResizeHeightForDOM();
    } else if (checkedVal == "2") {
        $("#blob-storage-form").hide("slow");
        $(".content-value").hide();
        $(".report-content").hide();
        $(".azure-validation").css("display", "none");
        $(".e-error").removeClass("e-error");
        $("#oci-object-storage-form").slideDown("slow");
        $(".amazon-s3-storage-validation").css("display", "none");
        $("#amazon-s3-storage-form").hide("slow");
        $("div.placeholder").remove();
        ResizeHeightForDOM();
    }
    else {
        $("#blob-storage-form").hide("slow");
        $(".content-value").hide();
        $(".report-content").hide();
        $(".azure-validation").css("display", "none");
        $(".e-error").removeClass("e-error");
        $("#oci-object-storage-form").hide("slow");
        $("#amazon-s3-storage-form").slideDown("slow");
        $(".azure-validation").css("display", "none");
        $(".oci-object-storage-validation").css("display", "none");
        $("div.placeholder").remove();
        ResizeHeightForDOM();
    }
    addPlacehoder("#system-settings-filestorage-container");
    changeFooterPostion();
}
