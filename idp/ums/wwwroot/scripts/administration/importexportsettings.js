$(document).ready(function () {
    $("#importsettingfile").on("click", function () {
        $(this).val("");
    });

    if ($("#import-export-settings-container").is(":visible")) {
        if (location.href.match(/import-settings/)) {
            $("#import-setting-tab").tab("show");

            $("#export-section-container").hide();
            $("#export-settings-button").hide();

            $("#import-settings-button").show();
            $("#imports-settings-container").show();
            var query = (window.location.search).toString();
            if (query != "?view=import-settings") {
                history.pushState(null, '', '?view=import-settings');
            }

        }
        else {
            $("#export-setting-tab").tab("show");

            $("#import-settings-button").hide();
            $("#imports-settings-container").hide();

            $("#export-section-container").show();
            $("#export-settings-button").show();

            var query = (window.location.search).toString();

            if (query == "?view=export-settings") {
                history.pushState(null, '', '?view=export-settings');
            }
        }

    }

    $(document).on("click", "#export-settings-button", function () {

        var isIncludeSiteSettings = $("#export-site-settings").is(":checked");
        var isIncludeLookAndFeelSettings = $("#export-look-and-feel").is(":checked");
        var isIncludeEmbedSettings = $("#export-embed-settings").is(":checked");
        var isIncludeEmailSettings = $("#export-email").is(":checked");
        var isIncludeAccountSettings = $("#export-accounts").is(":checked");
        var isIncludeAuthenticationSettings = $("#export-authentication").is(":checked");
        var isIncludeSecuritySettings = $("#export-security").is(":checked");
        var isIncludeApiKeysSettings = $("#export-api-keys").is(":checked");
        var isIncludeLicenseSettings = $("#export-license").is(":checked");

        window.location = exportSettingsUrl + "?isIncludeSiteSettings=" + isIncludeSiteSettings + "&isIncludeLookAndFeelSettings=" + isIncludeLookAndFeelSettings + "&isIncludeEmbedSettings=" + isIncludeEmbedSettings + "&isIncludeEmailSettings=" + isIncludeEmailSettings + "&isIncludeAccountSettings=" + isIncludeAccountSettings + "&isIncludeAuthenticationSettings=" + isIncludeAuthenticationSettings + "&isIncludeSecuritySettings=" + isIncludeSecuritySettings + "&isIncludeApiKeysSettings=" + isIncludeApiKeysSettings + "&isIncludeLicenseSettings=" + isIncludeLicenseSettings;
    });


    $("a[data-bs-toggle='tab']").on('click', function (e) {
        $("ul.nav.nav-tabs li").removeClass("active");
        if ($(this).attr("id") == "import-setting-tab") {
            $(this).closest("li").addClass("active");
            $("#export-section-container").hide();
            $("#export-settings-button").hide();

            $("#import-settings-button").show();
            $("#imports-settings-container").show();

            var query = (window.location.search).toString();
            if (query != "?view=import-settings") {
                history.pushState(null, '', '?view=import-settings');
            }
        }
        else if ($(this).attr("id") == "export-setting-tab") {
            $(this).closest("li").addClass("active");
            $("#import-settings-button").hide();
            $("#imports-settings-container").hide();

            $("#export-section-container").show();
            $("#export-settings-button").show();
            var query = (window.location.search).toString();
            if (query != "?view=export-settings") {
                history.pushState(null, '', '?view=export-settings');
            }
        }
    });

});

$(document).on("click", "#import-trigger-file,#filename", function () {
    $("#filename").trigger("focus");
    $("#importsettingfile").trigger("click");
});

$(document).on("change", "#importsettingfile", function (e) {
    var value = $(this).val();
    if ($(this).val().substring($(this).val().lastIndexOf('.') + 1) != "zip") {
        $("#importsettings-upload").attr("disabled", true);
        $("#filename").val(window.Server.App.LocalizationContent.ZipFileValidator);
        $("#filename,#import-trigger-file").addClass("validation-message");
        $(".upload-box").addClass("e-error");
    } else {
        $("#importsettings-upload").attr("disabled", false);
        $("#user-import-validation-msg").css("display", "none");
        $("#filename,#import-trigger-file").removeClass("validation-message");
        $("#filename").val(value);
        $(".upload-box").removeClass("e-error");
        $('#importsettingfile').attr('title', value);
    }
});

$(document).on("click", "#import-settings-button", function () {
    var fileName = "";
    if (document.getElementById("imports-settings-file-path") != null) {
        fileName = $("#imports-settings-file-path").attr("data-value")
    }
    showWaitingPopup('content-area');

    $.ajax({
        type: "POST",
        url: importSettingsUrl,
        data: { fileName: fileName },
        success: function (result) {
            if (result.Status) {

                hideWaitingPopup('content-area');
                $("#import-settings-button").attr("disabled", "disabled");

                SuccessAlert(window.Server.App.LocalizationContent.ImportSettings, window.Server.App.LocalizationContent.ImportSettingsSuccessStatus, 7000);
                window.location.reload();
            }
            else {
                try
                {
                    $("#import-settings-button").attr("disabled", "disabled");
                    var errorData = JSON.parse(result.Message);
                    if (Array.isArray(errorData) && errorData.length > 0) {
                        updateGrid(errorData);
                    }
                } catch (e)
                {
                    showErrorPopup(window.Server.App.LocalizationContent.ImportSettingsFailureMessage);
                }
                hideWaitingPopup('content-area')
            }
        }
    });
});

$(document).on("click", "#importsettings-upload", function () {
    var formData = new FormData();
    var fileInput = $("#importsettingfile")[0].files[0];

    if (!fileInput) {
        return;
    }

    formData.append("importsettingfile", fileInput);

    $.ajax({
        url: uploadSettingsUrl,
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response.success) {

                $("#imports-settings-file-path").attr("data-value", response.path);
                $("#imports-settings-has-error").attr("data-value", "false");
                $("#import-settings-button").removeAttr("disabled");
                $("#importsettings-upload").attr("disabled", true);


                messageBox("", window.Server.App.LocalizationContent.FileUpload,
                    window.Server.App.LocalizationContent.FileUploadSuccessStatus, "success", function () {
                        parent.onCloseMessageBox();
                    });
            } else {
                $("#import-settings-button").attr("disabled", "disabled");
                $("#importsettings-upload").attr("disabled", true);

                messageBox("", window.Server.App.LocalizationContent.FileUpload,
                    window.Server.App.LocalizationContent.FileUplaodFailureStauts, "success", function () {
                        parent.onCloseMessageBox();
                    });
            }
        },
        error: function (xhr, status, error) {
            alert("An error occurred: " + xhr.responseText);
        }
    });
});

function updateGrid(data) {
    data = data.filter(item => item.ErrorMessage && item.ErrorMessage.trim() !== "");
    data.forEach(item => {
        item.ErrorMessage = `<ul class='no-padding'>${item.ErrorMessage}</ul>`;
    });

    var userImportGrid = document.getElementById("import_setting_grid").ej2_instances[0];
    if (userImportGrid) {
        userImportGrid.dataSource = data;
        userImportGrid.refresh();
    }
}

function showErrorPopup(message) {
    messageBox("", window.Server.App.LocalizationContent.ImportSettings, message, "error", function () {
        parent.onCloseMessageBox();
    });
}
