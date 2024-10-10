﻿$(document).ready(function () {
    dropDownListInitialization('#edit-files', window.Server.App.LocalizationContent.SearchFiles);
    if (methodType === "GET") {
        onDropDownListChange();
    }

    $("#look-and-feel-form").submit(function () {
        showWaitingPopup('server-app-container');
        $(".update-system-setting").prop("disabled", true);
    });

    $("#look-and-feel-form").on("keypress", function (event) {
        if (event.keyCode === 13 && event.target.id != "text-area-content") {
            event.preventDefault();
            $(".update-system-setting").click();
        }
    }); 

    multiLineInputBoxInitialization("#text-area-content");
    function onDropDownListChange() {
        var fileName = document.getElementById("edit-files").ej2_instances[0].text;
        $.ajax({
            type: "POST",
            url: window.loadFileUrl,
            data: { fileName: fileName },
            beforeSend: showWaitingPopup('server-app-container'),
            success: function (result) {
                if (result.Result) {
                    document.getElementById("text-area-content").ej2_instances[0].value = result.Data;
                    $(".file-name").val(fileName);
                }
                else {
                    document.getElementById("edit-files").ej2_instances[0].text = $(".file-name").val();
                    WarningAlert(window.Server.App.LocalizationContent.Configuration, result.Status, result.Message, 7000);
                }
                hideWaitingPopup('server-app-container');
            }
        });
    }

    function dropDownListInitialization(id, placeHolder) {
        var dropDownList = new ejs.dropdowns.DropDownList({
            index: 0,
            floatLabelType: 'Never',
            placeholder: placeHolder,
            enablePersistence: true,
            change: onDropDownListChange,
            cssClass: 'e-outline e-custom e-non-float'
        });

        dropDownList.appendTo(id);
    }
    function multiLineInputBoxInitialization(id) {
        var inputbox = new ejs.inputs.TextBox({
            cssClass: 'e-outline e-custom e-non-float',
            floatLabelType: 'Never',
            multiline: true
        });
        inputbox.appendTo(id);
        inputbox.addAttributes({ maxlength: 65536});
    }
});

