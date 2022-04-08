var isCustomAttributeBinded = false;
var isAttributeEdit = false;
var customAttributeInfo = "";
var addSiteAttribute = [];
var siteCreation = false;

$(document).ready(function () {
    var inputbox = new ejs.inputs.TextBox({
        cssClass: 'e-outline e-custom',
        floatLabelType: 'Auto'
    });

    inputbox.appendTo("#custom-attribute-name");

    multiLineInputBoxInitialization("#custom-attribute-value");
    multiLineInputBoxInitialization("#custom-attribute-descrition");

    $("#custom-attribute-form").validate({
        errorElement: "span",
        onkeyup: function (element, event) {
            if (event.keyCode !== 9)
                $(element).valid();
            else
                true;
        },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            "custom-attribute-name": {
                isRequired: true,
                isValidName: true,
                isAttributeExist: true
            },
            "custom-attribute-value": {
                isRequired: true
            }
        },
        highlight: function (element) {
            $(element).closest("div").addClass("e-error");
        },
        unhighlight: function (element) {
            $(element).closest("div").removeClass("e-error");
            $(element).closest(".e-outline").siblings(".custom-attr-validation-errors").html("");
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".custom-attr-validation-errors").html(error);
        },
        messages: {
            "custom-attribute-name": {
                isRequired: window.TM.App.LocalizationContent.AttributeNameValidator
            },
            "custom-attribute-value": {
                isRequired: window.TM.App.LocalizationContent.AttributeValueValidator
            }
        }
    });

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, window.TM.App.LocalizationContent.EnterName);

    $.validator.addMethod("isValidName", function (value, element) {
        return IsValidName("name", value);
    }, window.TM.App.LocalizationContent.AvoidSpecailCharacters);

    $.validator.addMethod("isAttributeExist", function (value, element) {
        return isAttributeExist(value);
    }, window.TM.App.LocalizationContent.IsAttributeNameExist);
});

function isAttributeExist() {
    return !$("#custom-attribute-name").hasClass("e-error");
}

function openCustomAttributeDialog(attributeId, name) {
    if (!isCustomAttributeBinded) {
        var createDialogId = document.createElement("div");
        createDialogId.setAttribute("id", "custom-attribute-dialog");
        if (name == 'addtenant') {
            var element = document.getElementById("popup-container");
            siteCreation = true;
        }
        else {
            var element = document.getElementById("content-area");
        }
        element.appendChild(createDialogId);
        $("#custom-attribute-dialog").css("height", $("#popup-container").height());
        var dialog = new ejs.popups.Dialog({
            header: '<div class="dlg-title">' + window.TM.App.LocalizationContent.AddCustomAttribute + '</div>',
            content: document.getElementById("custom-attribute-content"),
            buttons: [
                { click: saveAttribute, buttonModel: { isPrimary: true, content: window.TM.App.LocalizationContent.SaveButton } },
                { click: onCloseCustomAttribute, buttonModel: { content: window.TM.App.LocalizationContent.CancelButton } },
            ],
            animationSettings: { effect: 'Zoom' },
            beforeOpen: showCustomAttribute,
            beforeClose: beforeCloseAttributeDialog,
            width: '514px',
            height: '474px',
            showCloseIcon: true,
            isModal: true,
        });
        dialog.appendTo(createDialogId);
        isCustomAttributeBinded = true;
    }
    else {
        var dialog = document.getElementById("custom-attribute-dialog").ej2_instances;
        dialog[0].buttons = [
            { click: saveAttribute, buttonModel: { isPrimary: true, content: window.TM.App.LocalizationContent.SaveButton } },
            { click: onCloseCustomAttribute, buttonModel: { content: window.TM.App.LocalizationContent.CancelButton } },
        ],
        dialog[0].show();
    }
    
    if (isAttributeEdit) {
        setTimeout(function () {
            showSavedAttributes();
        }, 500);
    }
}

function saveAttribute() {
    if ($("#custom-attribute-form").valid() && !$("#custom-attribute-name").hasClass("e-error")) {
        if (isAttributeEdit) {
            updateCustomAttribute(customAttributeInfo.Id);
        } else {
            saveCustomAttribute();
        }
    }
}

function onCloseCustomAttribute() {
    $("#custom-attribute-form").find("div.validation-errors").html("");
    $("#custom-attribute-form").find("div").removeClass("e-error");
    var dialog = document.getElementById("custom-attribute-dialog").ej2_instances;
    dialog[0].hide();
}

function showSavedAttributes() {
    var attributeGridObj = siteCreation ? $("#AddSiteAttributesGrid").data("ejGrid") : $("#SiteAttributesGrid").data("ejGrid");
    customAttributeInfo = attributeGridObj.getCurrentViewData()[attributeGridObj.getIndexByRow($("tr.e-row[aria-selected *='true']"))];
    document.getElementById("custom-attribute-name").ej2_instances[0].value = customAttributeInfo.Name;
    document.getElementById("custom-attribute-descrition").ej2_instances[0].value = customAttributeInfo.Description;
    customAttributeInfo.CanEncrypt ? "" : document.getElementById("custom-attribute-value").ej2_instances[0].value = customAttributeInfo.Value;
    $("#encrypt-custom-attribute").prop("checked", customAttributeInfo.CanEncrypt);
}

function showCustomAttribute() {
    var dialog = document.getElementById("custom-attribute-dialog").ej2_instances;
    dialog[0].header = isAttributeEdit ? window.TM.App.LocalizationContent.EditCustomAttribute : window.TM.App.LocalizationContent.AddCustomAttribute;
    updateValidationMessages();
    $("#custom-attribute-content").show();
    $("#custom-attribute-name").focus();
}

function saveCustomAttribute() {
    var customAttribute = {
        Name: $("#custom-attribute-name").val().trim(),
        Value: document.getElementById("custom-attribute-value").ej2_instances[0].value,
        Description: document.getElementById("custom-attribute-descrition").ej2_instances[0].value,
        CanEncrypt: $("#encrypt-custom-attribute").is(":checked"),
        CreatedDate: new Date(),
        ModifiedDate: new Date()
    }

    ShowWaitingProgress("#custom-attribute-dialog", "show");
    if (siteCreation) {
        addSiteLevelAttribute(customAttribute);
        return;
    }

    var requestData = { customAttribute: JSON.stringify(customAttribute), tenantInfoId: tenantInfoId }
    ShowWaitingProgress("#custom-attribute-dialog", "show")
    var dialog = document.getElementById("custom-attribute-dialog").ej2_instances;
    $.ajax({
        type: "POST",
        url: saveCustomAttributeUrl,
        data: requestData,
        success: function (result) {
            if (result.Status) {
                getSiteAttributes();
                SuccessAlert(window.TM.App.LocalizationContent.AddCustomAttribute, window.TM.App.LocalizationContent.CustomAttributeSuccess, 7000);
                ShowWaitingProgress("#custom-attribute-dialog", "hide");
                dialog[0].hide();
            } else {
                ShowWaitingProgress("#custom-attribute-dialog", "hide");
                if (!isEmptyOrWhitespace(result.Message)) {
                    $("#custom-attribute-name").addClass("e-error");
                    $("#custom-attribute-form").valid();
                } else {
                    WarningAlert(window.TM.App.LocalizationContent.AddCustomAttribute, window.TM.App.LocalizationContent.CustomAttributeFailure, 7000);
                    dialog[0].hide();
                }
            }
        }
    });
}

function beforeCloseAttributeDialog() {
    updateValidationMessages();
    isAttributeEdit = false;
    customAttributeInfo = "";
}

$(document).on("keyup focusout", "#custom-attribute-name", function (e) {
    var name = $("#custom-attribute-name").val().toLowerCase().trim();
    if (e.type === "focusout") {
        if (!isEmptyOrWhitespace(name) && (isEmptyOrWhitespace(customAttributeInfo) || (!isEmptyOrWhitespace(customAttributeInfo) && customAttributeInfo.Name.toLowerCase() != name))) {
            siteCreation ? nameCheckAtAddTenant() : attributeNameCheck();
        }
    } else {
        $("#custom-attribute-name").removeClass("e-error");
        $("[name='custom-attribute-name']").valid();
    }
});

function attributeNameCheck() {
    var attributeName = $("#custom-attribute-name").val().trim();
    $.ajax({
        type: "POST",
        url: isAttributeNameExistsUrl,
        data: { attributeName: attributeName, tenantInfoId: tenantInfoId },
        success: function (result) {
            if (result.Status) {
                $("#custom-attribute-name").addClass("e-error");
            } else {
                $("#custom-attribute-name").removeClass("e-error");
            }
            $("[name='custom-attribute-name']").valid();
        }
    });
}

function updateCustomAttribute(attributeId) {
    var customAttribute = {
        Id: attributeId,
        Name: $("#custom-attribute-name").val().trim(),
        Value: document.getElementById("custom-attribute-value").ej2_instances[0].value,
        Description: document.getElementById("custom-attribute-descrition").ej2_instances[0].value,
        CanEncrypt: $("#encrypt-custom-attribute").is(":checked"),
        CreatedDate: new Date(),
        ModifiedDate: new Date()
    }

    ShowWaitingProgress("#custom-attribute-dialog", "show");
    if (siteCreation) {
        updateSiteLevelAttribute(customAttribute);
        return;
    }
    var requestData = { customAttribute: JSON.stringify(customAttribute), tenantInfoId: tenantInfoId }
    var dialog = document.getElementById("custom-attribute-dialog").ej2_instances;
    $.ajax({
        type: "POST",
        url: updateCustomAttributeUrl,
        data: requestData,
        success: function (result) {
            if (result.Status) {
                getSiteAttributes();
                SuccessAlert(window.TM.App.LocalizationContent.EditCustomAttribute, window.TM.App.LocalizationContent.UpdateCustomAttributeSuccess, 7000);
                ShowWaitingProgress("#custom-attribute-dialog", "hide");
                dialog[0].hide();
            } else {
                ShowWaitingProgress("#custom-attribute-dialog", "hide");
                if (!isEmptyOrWhitespace(result.Message)) {
                    $("#custom-attribute-name").addClass("e-error");
                    $("#custom-attribute-form").valid();
                } else {
                    WarningAlert(window.TM.App.LocalizationContent.EditCustomAttribute, window.TM.App.LocalizationContent.UpdateCustomAttributeFailure, 7000);
                    dialog[0].hide();
                }
            }
        }
    });
}

function removeCustomAttribute(item) {
    var customAttribute = {
        Id: $(item).attr("data-id"),
        CreatedDate: new Date(),
        ModifiedDate: new Date()
    }
    var requestData = { customAttribute: JSON.stringify(customAttribute), tenantInfoId: tenantInfoId }
    $.ajax({
        type: "POST",
        url: deleteCustomAttributeUrl,
        data: requestData,
        success: function (result) {
            if (result.Status) {
                getSiteAttributes();
                SuccessAlert(window.TM.App.LocalizationContent.DeleteCustomAttribute, window.TM.App.LocalizationContent.DeleteCustomAttributeSuccess, 7000);
            } else {
                WarningAlert(window.TM.App.LocalizationContent.DeleteCustomAttribute, window.TM.App.LocalizationContent.DeleteCustomAttributeFailure, 7000);
            }
            $("#messageBox_wrapper").ejWaitingPopup("hide");
            onCloseMessageBox();
        }
    });
}

function editCustomAttribute(item, name) {
    var id = $(item).attr("data-id");
    isAttributeEdit = true;
    openCustomAttributeDialog(id, name);
}

function getSiteAttributes() {
    showWaitingPopup("SiteAttributesGrid");
    $.ajax({
        type: "GET",
        url: siteAttributesUrl,
        data: { tenantInfoId: tenantInfoId },
        success: function (result) {
            if (result.Status) {
                var siteAttributesGrid = $("#SiteAttributesGrid").data("ejGrid");
                siteAttributesGrid.dataSource(result.Attributes);
            }
            hideWaitingPopup("SiteAttributesGrid");
        }
    });
}

function updateValidationMessages() {
    document.getElementById("custom-attribute-name").ej2_instances[0].value = null;
    document.getElementById("custom-attribute-value").ej2_instances[0].value = null;
    document.getElementById("custom-attribute-descrition").ej2_instances[0].value = null;
    $("#encrypt-custom-attribute").prop("checked", false);
    $("#custom-attribute-name, #custom-attribute-value").removeClass("e-error");
    $("#custom-attribute-name, #custom-attribute-value").closest(".e-outline").siblings(".custom-attr-validation-errors").html("");
    $("#custom-attribute-name, #custom-attribute-value").parent('div').removeClass("e-error");
}

function deleteConfirmation(item) {
    setTimeout(function () {
        var attributeGridObj = $("#SiteAttributesGrid").data("ejGrid");
        var attribute = attributeGridObj.getCurrentViewData()[attributeGridObj.getIndexByRow($("tr.e-row[aria-selected *='true']"))];
        messageBox("su-delete", window.TM.App.LocalizationContent.DeleteCustomAttribute, window.TM.App.LocalizationContent.DeleteAttributeConfirm + '<span class ="highlight-name">' + attribute.Name + " ?" + '</span>', "error", function () {
            var messageboxWaitingPopupTemplateIdId = createLoader("messageBox_wrapper");
            $("#messageBox_wrapper").ejWaitingPopup({ template: $("#" + messageboxWaitingPopupTemplateIdId) });
            $("#messageBox_wrapper").css("height", $("#messageBox").outerHeight());
            $("#messageBox_wrapper").ejWaitingPopup("show");
            removeCustomAttribute(item)
        });
    }, 100);
}

function initialSiteGridCreate() {
    if (window.location.search.includes("tab=attributes")) {
        showWaitingPopup("SiteAttributesGrid");
    }
}

function addSiteLevelAttribute(customAttribute) {
    var dialog = document.getElementById("custom-attribute-dialog").ej2_instances;
    addSiteAttribute.push(customAttribute);
    var siteAttributesGrid = $("#AddSiteAttributesGrid").data("ejGrid");
    siteAttributesGrid.dataSource(addSiteAttribute);
    siteAttributesGrid.refreshContent();
    ShowWaitingProgress("#custom-attribute-dialog", "hide");
    dialog[0].hide();
}

function nameCheckAtAddTenant() {
    var attributeName = $("#custom-attribute-name").val().trim();
    $.each(addSiteAttribute, function (index, value) {
        if (value.Name == attributeName) {
            $("#custom-attribute-name").addClass("e-error");
        } else {
            $("#custom-attribute-name").removeClass("e-error");
        }
        $("[name='custom-attribute-name']").valid();
    });
}

function updateSiteLevelAttribute(customAttribute) {
    var dialog = document.getElementById("custom-attribute-dialog").ej2_instances;
    var siteAttributesGrid = $("#AddSiteAttributesGrid").data("ejGrid");
    addSiteAttribute.splice(siteAttributesGrid.getIndexByRow($("tr.e-row[aria-selected *='true']")), 1);
    addSiteAttribute.push(customAttribute);
    siteAttributesGrid.refreshContent();
    ShowWaitingProgress("#custom-attribute-dialog", "hide");
    dialog[0].hide();
}

function removeSiteAttribute() {
    var siteAttributesGrid = $("#AddSiteAttributesGrid").data("ejGrid");
    addSiteAttribute.splice(siteAttributesGrid.getIndexByRow($("tr.e-row[aria-selected *='true']")));
    siteAttributesGrid.refreshContent();
}

function multiLineInputBoxInitialization(id) {
    var inputbox = new ejs.inputs.TextBox({
        cssClass: 'e-outline e-custom',
        floatLabelType: 'Auto',
        multiline: true
    });
    inputbox.appendTo(id);
}