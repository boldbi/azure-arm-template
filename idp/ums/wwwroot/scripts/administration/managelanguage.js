var source = "";
var isValidationSuccess = false;
var fileName = "";
var extension = "";
var localizationGrid = "";
var count = 0;
var fileName = [];
var dropDownList = "";
var isApplicationLanguage = false;
var rowchecked;
var isavailableLanguage = false;
var isNewLanguageAdded = false;
var isdeleteLanguages = false;
$(document).ready(function () {
    createWaitingPopup("localization-container");
    createWaitingPopup("upload-container");
    createWaitingPopup("language-delete-dialog");
    var localizationDialog = new ejs.popups.Dialog({
        width: "900px",
        height: "712px",
        header: window.Server.App.LocalizationContent.LanguageHeader,
        content: document.getElementById("localization-content"),
        showCloseIcon: true,
        buttons: [
            { click: closeLocalizationDialog, buttonModel: { content: window.Server.App.LocalizationContent.CancelButton } },
        ],
        enableModal: true,
        isModal: true,
        animationSettings: { effect: 'Zoom' },
        visible: false,
        close: closeLocalizationDialog
    });
    localizationDialog.appendTo("#localization-container");

    dropDownList = new ejs.dropdowns.DropDownList({
        dataSource: defaultLanguages,
        fields: { text: 'Text', value: 'Value' },
        placeholder: window.Server.App.LocalizationContent.SelectLanguage,
        floatLabelType: "Never",
        cssClass: 'e-outline e-custom e-non-float',
        change: onDropDownChange,
        allowFiltering: true,
        filterType: "Contains"
    });
    dropDownList.appendTo("#model-language");

    var uploadDialog = new ejs.popups.Dialog({
        header: window.Server.App.LocalizationContent.UploadLanguage,
        content: document.getElementById("upload-content"),
        showCloseIcon: true,
        width: '424px',
        height: 'auto',
        close: uploadDialogClose,
        buttons: [
            {
                'click': function () {
                    uploadDialogClose();
                },
                buttonModel: {
                    content: window.Server.App.LocalizationContent.CancelButton
                }
            },
            {
                'click': function () {
                    uploadLanguage();
                },
                buttonModel: {
                    content: window.Server.App.LocalizationContent.Upload,
                    isPrimary: true,
                    cssClass: 'uploaded-language'
                }
            }
        ],
        enableModal: true,
        isModal: true,
        animationSettings: { effect: 'Zoom' },
        visible: false
    });
    uploadDialog.appendTo("#upload-container");

    var languageDeleteDialog = new ej.popups.Dialog({
        header: window.Server.App.LocalizationContent.DeleteLanguage,
        content: document.getElementById("language-delete-dialog-content"),
        showCloseIcon: true,
        buttons: [
            { click: deleteLanguages, buttonModel: { content: window.Server.App.LocalizationContent.YesButton, isPrimary: true, cssClass: 'critical-action-button' } },
            { click: languageDeleteDialogClose, buttonModel: { content: window.Server.App.LocalizationContent.NoButton, cssClass: 'cancel-button' } }
        ],
        width: "424px",
        height: "176px",
        isModal: true,
        animationSettings: { effect: 'Zoom' },
        visible: false,
        close: languageDeleteDialogClose
    });
    languageDeleteDialog.appendTo("#language-delete-dialog");

    var uploadZipFile = new ej.inputs.Uploader({
        asyncSettings: {
            saveUrl: window.zipFileUploadUrl,
        },
        uploading: addHeaders,
        autoUpload: true,
        showFileList: false,
        maxFileSize: 25000000,
        multiple: false,
        allowedExtensions: ".zip",
        buttons: { browse: window.Server.App.LocalizationContent.SelectFile },
        selected: function (e) {
            type = e.filesData[0]?.type.toLowerCase();
            zipFileName = e.filesData[0]?.name;
            size = e.filesData[0]?.size;
            extension = "." + type;
            if (extension != ".zip") {
                $("#message-container").show();
                $("#file-name").val(zipFileName);
                $(".validation-error-message").html(window.Server.App.LocalizationContent.InValidFileFormat);
                $(".localization-message-content").removeClass('error-content');
                $(".validation-error-content").remove();
                $(".validation-error-message").show();
            }
            if (size > 25000000) {
                $("#message-container").show();
                $("#file-name").val(zipFileName);
                $(".validation-error-message").html(window.Server.App.LocalizationContent.FileSize);
                $(".localization-message-content").removeClass('error-content');
                $(".validation-error-content").remove();
                $(".validation-error-message").show();
            }
        },
        success: function fileselect(e) {
            var languageName = document.getElementById("model-language").ej2_instances[0].value;
            doAjaxPost("POST", validateLocalizationUrl, "zipFileName=" + zipFileName + "&languageName=" + languageName, function (data) {
                if (data.Status) {
                    isValidationSuccess = data.Status;
                    $("#upload-container .e-file-select-wrap .e-btn").attr("disabled", true);
                    $(".uploaded-language").attr("disabled", false);
                    $("#message-container").show();
                    $(".validation-error-content").remove();
                    $("#file-name").val(zipFileName);
                    $(".localization-message-content").addClass('error-content');
                    $(".validation-error-message").hide();
                }
                else if (data.Message) {
                    isavailableLanguage = data.Message;
                    isValidationSuccess = true;
                    $("#upload-container .e-file-select-wrap .e-btn").attr("disabled", true);
                    $(".uploaded-language").attr("disabled", false);
                    $("#message-container").show();
                    $(".validation-error-content").remove();
                    $("#file-name").val(zipFileName);
                    $(".localization-message-content").addClass('error-content');
                    $(".validation-error-message").hide();
                }
                else {
                    if (!data.Message) {
                        $("#message-container").show();
                        $(".localization-message-content").addClass('error-content');
                        $(".validation-error-content").remove();
                        $(".validation-error-message").hide();
                        $("#file-name").val(zipFileName);
                        $(".localization-message-content").append(data.result);
                    }

                }
            });
        }
    });
    uploadZipFile.appendTo("#upload-zipfile");
});

function onDropDownChange() {
    var languageName = document.getElementById("model-language").ej2_instances[0].value;
    if (languageName != "") {
        $("#upload-container .e-file-select-wrap .e-btn").attr("disabled", false);
    }
    else {
        $("#upload-container .e-file-select-wrap .e-btn").attr("disabled", true);

    }
}

function onLocalizationDialogOpen() {
    document.getElementById("localization-container").ej2_instances[0].show();
    $("#delete-language").hide();
    if (document.getElementById('Localization_grid').ej2_instances == null) {
        $("#search-languages").val("");
        var data = new ejs.data.DataManager({
            url: getLocalizationUrl,
            adaptor: new ejs.data.UrlAdaptor(),
            crossDomain: true
        });
        localizationGrid = new ejs.grids.Grid({
            dataSource: data,
            gridLines: 'None',
            allowPaging: true,
            allowSorting: true,
            allowSelection: true,
            selectionSettings: { type: 'Multiple', mode: 'Row' },
            pageSettings: { pageSize: 9 },
            load: fnActionBeginLocalization,
            actionBegin: fnActionBeginLocalization,
            rowSelecting: function (e) {
                this.multiSelectCtrlRequest = true;
            },
            dataBound: function () {
                var tooltipTriggerEl = document.querySelector('[data-bs-toggle="tooltip"]');
                var tooltip = new bootstrap.Tooltip(tooltipTriggerEl, {
                    container: 'body'
                });
            },
            enableHover: true,
            enableAltRow: false,
            rowDataBound: function (args) {
                args.row.querySelector('.remove-access').firstChild.style.visibility = "hidden";

                args.row.addEventListener('mouseenter', function (args) {

                    args.target.querySelector('.remove-access').firstChild.style.visibility = "visible";
                })
                args.row.addEventListener('mouseleave', function (args) {

                    args.target.querySelector('.remove-access').firstChild.style.visibility = "hidden";
                })
            },
            columns: [
                {
                    template: "#localization-checkbox-row-template",
                    width: 10,
                    allowFiltering: false
                },
                {
                    field: "LanguageName",
                    headerText: "Language",
                    width: 150,
                    type: "string",
                    allowFiltering: false,
                    allowSorting: true

                },
                {
                    template: true,
                    allowSorting: false,
                    template: "#remove-options",
                    width: 40,
                    allowFiltering: false,
                    customAttributes: { class: 'remove-access' }

                },
            ],
        });
        localizationGrid.appendTo('#Localization_grid');
    }
}

function closeLocalizationDialog() {
    localizationGrid.clearSelection();
    localizationGrid.refresh();
    document.getElementById("localization-container").ej2_instances[0].hide();
    count = 0;
    if (isNewLanguageAdded || isdeleteLanguages) {
        window.location.reload();
    }
}

function uploadDialogOpen() {
    zipFileName = $.trim(null)
    $("#file-name").val("");
    $("#message-container").hide();
    $(".uploaded-language").attr("disabled", true);
    $("#upload-container .e-file-select-wrap .e-btn").attr("disabled", true);
    document.getElementById("upload-container").ej2_instances[0].show();
    document.getElementById("model-language").ej2_instances[0].refresh();
    count = 0;
    $("#delete-language").hide();
    $(".selected-language").hide();
}

$(document).on("click", ".remove-language", function (args) {
    fileName = [];
    var rowdata = document.getElementById("Localization_grid").ej2_instances[0];
    var record = rowdata.getRowInfo(args.target);
    fileName.push(record.rowData.LangaugeCode);
    var getRowdata = rowdata.getRows();
    var i = 1;
    for (i; i < getRowdata.length; i++) {
        if (getRowdata[i].querySelector('input[type=checkbox]')) {
            var uncheck = (getRowdata[i].querySelector('input[type=checkbox]'));
            uncheck.checked = false;
        }
    }
    count = 0;
    languageDeleteDialogOpen();
    rowchecked = (record.row.querySelector('input[type=checkbox]'));
    rowchecked.checked = true;
    $("#delete-language").hide();
    $(".selected-language").hide();
});

$(document).on("click", "#clear-search", function (args) {
    $(".close-icon").css('display', 'none');
    $(".su-search").css('display', 'block');
});

function uploadLanguage() {
    showWaitingPopup("upload-container");
    if (isValidationSuccess) {
        if (isavailableLanguage) {
            fileName.push(document.getElementById("model-language").ej2_instances[0].value);
            doAjaxPost("POST", removeLocalizationUrl, "languageName=" + fileName, function (data) {
            });
        }
        var languageName = document.getElementById("model-language").ej2_instances[0].value;
        doAjaxPost("POST", addLocalizationUrl, "languageName=" + languageName, function (data) {
            if (data.Status) {
                isNewLanguageAdded = true;
                document.getElementById("upload-container").ej2_instances[0].hide();
                messageBox("", window.Server.App.LocalizationContent.AddLanguageHeader, window.Server.App.LocalizationContent.LanguageAddSuccessMessage, "success", function () {
                    parent.onCloseMessageBox();
                });
            }
            else {
                document.getElementById("upload-container").ej2_instances[0].hide();
                messageBox("", window.Server.App.LocalizationContent.AddLanguageHeader, data.Message, "error", function () {
                    parent.onCloseMessageBox();
                });
            }
            hideWaitingPopup("upload-container");
        });
        localizationGrid.clearSelection();
        localizationGrid.refresh();
    }
}

function fnActionBeginLocalization(args) {
    var searchValue = $("#search-languages").val();
    if (fileName.length > 0) {
        fileName = [];
    }
    $("#delete-language").hide();
    count = 0;
    if (this.properties.query.params.length > 0) {
        this.properties.query.params = [];
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
    else {
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
}

function uploadDialogClose() {
    fileName = [];
    if (zipFileName != $.trim(null) && extension == ".zip") {
        doAjaxPost("POST", removeTempLocalizationUrl, function (data) {
        });
    }
    $("#file-name").val("");
    $("#upload-zipfile").val("");
    isValidationSuccess = false;
    $("#message-container").hide();
    $(".validation-error-content").remove();
    $(".validation-error-message").hide();
    $(".validation-error-message").removeClass("success");
    document.getElementById("upload-container").ej2_instances[0].hide();
    localizationGrid.clearSelection();
    localizationGrid.refresh();
    dropDownList.refresh();
    dropDownList.value = null;
    dropDownList.list.innerHTML = "";
}

$(document).on("change", ".localization-checkbox-row", function () {
    var isChecked = $(this).is(":checked");
    var currentId = $(this).attr("data-id");
    if (isChecked) {
        count++;
        fileName.push(currentId);
        if (count >= 2) {
            $("#delete-language").show();
            $("#delete-language").html(window.Server.App.LocalizationContent.Remove + " " + "(" + count + ")");
            $(".selected-language").show();
            $(".selected-language").html(window.Server.App.LocalizationContent.SelectedLanguage + " " + "(" + count + ")");
        }
    }
    else if (count >= 2) {
        count--;
        fileName.pop(currentId);
        if (count >= 2) {
            $("#delete-language").show();
            $("#delete-language").html(window.Server.App.LocalizationContent.Remove + " " + "(" + count + ")");
            $(".selected-language").show();
            $(".selected-language").html(window.Server.App.LocalizationContent.SelectedLanguage + " " + "(" + count + ")");
        }
        else {
            if (count <= 1) {
                $("#delete-language").hide();
                $(".selected-language").hide();
            }
        }
    }
    else {
        count--;
        fileName.pop(currentId);
    }

    if (count >= 1)
    {
        $("#add-language").attr("disabled", true);
        $(".su-add").addClass('su-disable');
    }
    else
    {
        $("#add-language").attr("disabled", false);
        $(".su-add").removeClass('su-disable');
    }
});

function languageDeleteDialogOpen() {
    var selectLanguageCode = ""
    for (var lancode of fileName) {
        var languageCase = lancode.toLowerCase();
        if (applicationLanguage == languageCase) {
            selectLanguageCode = languageCase;
            isApplicationLanguage = true;
            $("#language-delete-dialog-content").removeClass("warning-message");
            document.getElementById("language-delete-dialog").ej2_instances[0].show();
        }
    }
    if (applicationLanguage != selectLanguageCode) {
        if (count <= 1) {
            isApplicationLanguage = false;
            $("#language-delete-dialog-content").addClass("warning-message");
            $(".info-message").html(window.Server.App.LocalizationContent.RemoveLanguage);
            document.getElementById("language-delete-dialog").ej2_instances[0].show();
        }
        else {
            isApplicationLanguage = false;
            $("#language-delete-dialog-content").addClass("warning-message");
            $(".info-message").html(window.Server.App.LocalizationContent.RemoveLanguage);
            document.getElementById("language-delete-dialog").ej2_instances[0].show();
        }
    }
}

function languageDeleteDialogClose() {
    document.getElementById("language-delete-dialog").ej2_instances[0].hide();
    if (count <= 1) {
        fileName = [];
    }
    count = 0;
    $("#delete-language").hide();
    $(".selected-language").hide();
    $("#add-language").attr("disabled", false);
    $(".su-add").removeClass('su-disable');
    localizationGrid.clearSelection();
    localizationGrid.refresh();
}

function deleteLanguages() {
    showWaitingPopup("language-delete-dialog");
    showWaitingPopup("localization-container");
    doAjaxPost("POST", removeLocalizationUrl, "languageName=" + fileName, function (data) {
        if (data.Status) {
            document.getElementById("language-delete-dialog").ej2_instances[0].hide();
            isdeleteLanguages = true;
            messageBox("", window.Server.App.LocalizationContent.RemoveLanguageHeader, window.Server.App.LocalizationContent.LanguageRemoveSuccessMessage, "success", function () {
                parent.onCloseMessageBox();
                if (isApplicationLanguage) {
                    location.reload();
                }
            });
        }
        else {
            document.getElementById("language-delete-dialog").ej2_instances[0].hide();
            var errorMessage = data.Message != null ? data.Message : window.Server.App.LocalizationContent.LanguageRemoveFailedMessage;
                messageBox("", window.Server.App.LocalizationContent.RemoveLanguageHeader, errorMessage, "error", function () {
                parent.onCloseMessageBox();
            });

        }
        hideWaitingPopup("language-delete-dialog");
    });
    localizationGrid.clearSelection();
    localizationGrid.refresh();
    fileName = [];
    count = 0;
    $(".selected-language").hide();
    $("#delete-language").hide();
    $("#add-language").attr("disabled", false);
    $(".su-add").removeClass('su-disable');
    hideWaitingPopup("localization-container");
}

$("#search-languages").on("keyup keydown", function () {
    fileName.length = 0;
    $("#delete-language").hide();
    count = 0;
});


$(document).on("click", "#add-language", function () {
    if (count < 1)
    {
        uploadDialogOpen();
    }
});

$(document).on("click", "#delete-language", function () {
    languageDeleteDialogOpen();
});

$(document).on("click", "#manage", function () {
    onLocalizationDialogOpen();
});