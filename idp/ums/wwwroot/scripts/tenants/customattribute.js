var isCustomAttributeBinded = false;
var isAttributeEdit = false;
var customAttributeInfo = "";
var addSiteAttribute = [];
var siteCreation = false;
var customAttributeId = 0;
var editCustomAttributeId;
var currentIndex;

$(document).ready(function () {
    var inputbox = new ejs.inputs.TextBox({
        cssClass: 'e-outline e-custom e-non-float',
        floatLabelType: 'Never',
    });

    String.prototype.format = function () {
        a = this;
        for (k in arguments) {
            a = a.replace("{" + k + "}", arguments[k])
        }
        return a
    }

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
                isAttributeExist: true,
                maxlength: 255
            },
            "custom-attribute-value": {
                isRequired: true,
                maxlength: 4000
            },
            "custom-attribute-description": {
                maxlength: 1024
            }
        },
        highlight: function (element) {
            $(element).closest("div").addClass("e-error");
            $(element).closest(".e-outline").addClass("e-error");
        },
        unhighlight: function (element) {
            $(element).closest("div").removeClass("e-error");
            $(element).closest(".e-outline").removeClass("e-error");
            $(element).closest(".e-outline").siblings(".custom-attr-validation-errors").html("");
        },
        errorPlacement: function (error, element) {
            $(element).closest(".e-outline").siblings(".custom-attr-validation-errors").html(error);
        },
        messages: {
            "custom-attribute-name": {
                isRequired: window.Server.App.LocalizationContent.AttributeNameValidator,
                maxlength: window.Server.App.LocalizationContent.AttributeLengthValidator.format("name","255")
            },
            "custom-attribute-value": {
                isRequired: window.Server.App.LocalizationContent.AttributeValueValidator,
                maxlength: window.Server.App.LocalizationContent.AttributeLengthValidator.format("value", "4000")
            },
            "custom-attribute-description": {
                maxlength: window.Server.App.LocalizationContent.AttributeLengthValidator.format("description", "1024")
            }
        }
    });

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, window.Server.App.LocalizationContent.EnterName);

    $.validator.addMethod("isValidName", function (value, element) {
        return IsValidName("name", value);
    }, window.Server.App.LocalizationContent.AvoidSpecailCharacters);

    $.validator.addMethod("isAttributeExist", function (value, element) {
        return isAttributeExist(value);
    }, window.Server.App.LocalizationContent.IsAttributeNameExist);

    $.validator.addMethod("ismaxlength", function (value, element, params) {
        return value.length <= params;
    }, window.Server.App.LocalizationContent.AttributeLengthValidator);
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
            header: '<div class="dlg-title">' + window.Server.App.LocalizationContent.AddCustomAttribute + '</div>',
            content: document.getElementById("custom-attribute-content"),
            buttons: [
                { click: onCloseCustomAttribute, buttonModel: { content: window.Server.App.LocalizationContent.CancelButton } },
                { click: saveAttribute, buttonModel: { isPrimary: true, content: window.Server.App.LocalizationContent.SaveButton } },
            ],
            animationSettings: { effect: 'Zoom' },
            beforeOpen: showCustomAttribute,
            beforeClose: beforeCloseAttributeDialog,
            close: onCloseCustomAttribute,
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
            { click: onCloseCustomAttribute, buttonModel: { content: window.Server.App.LocalizationContent.CancelButton } },
            { click: saveAttribute, buttonModel: { isPrimary: true, content: window.Server.App.LocalizationContent.SaveButton } },
        ],
            dialog[0].show();
    }

    if (isAttributeEdit) {
        setTimeout(function () {
            showSavedAttributes();
        }, 200);
    }
    createWaitingPopup('custom-attribute-dialog');
}

function saveAttribute() {
    var isUserAttributeRequest = typeof (userAttributesPageUrl) != "undefined" && window.location.pathname + window.location.search == userAttributesPageUrl;
    if ($("#custom-attribute-form").valid() && !$("#custom-attribute-name").hasClass("e-error")) {
        if (isAttributeEdit) {
            if (addSiteAttribute.length != 0) {
                var siteAttributesGrid = document.getElementById('AddSiteAttributesGrid').ej2_instances[0];
                var editAttributeName = $("#custom-attribute-name").val().trim();
                for (var listItem = 0; listItem < siteAttributesGrid.dataSource.length; listItem++) {
                    if (siteAttributesGrid.dataSource[listItem].Name.toLowerCase() == editAttributeName.toLowerCase() && siteAttributesGrid.dataSource[listItem].CustomAttributeId != editCustomAttributeId) {
                        $("#custom-attribute-name").closest("div").addClass("e-error");
                        $("#custom-attribute-name").closest(".e-outline").addClass("e-error");
                        $("#custom-attribute-name").closest(".e-outline").siblings(".custom-attr-validation-errors").html(window.Server.App.LocalizationContent.IsAttributeNameExist);
                    }
                    if (siteAttributesGrid.dataSource[listItem].CustomAttributeId == editCustomAttributeId) {
                        currentIndex = listItem;
                    }
                }
            }
            if (!$("#custom-attribute-name").closest("div").hasClass("e-error")) {
                updateCustomAttribute(customAttributeInfo.Id);
            }
        } else {
            saveCustomAttribute();
        }
    }

    var attributeObj;
    if (isUserAttributeRequest) {
        attributeObj = document.getElementById('UsersAttributesGrid').ej2_instances[0];
    }
    else {
        if (siteCreation) {
            attributeObj = document.getElementById('AddSiteAttributesGrid').ej2_instances[0];
        }
        else {
            attributeObj = document.getElementById('SiteAttributesGrid').ej2_instances[0];
        }
    }
    attributeObj.clearSelection();
}

function onCloseCustomAttribute() {
    $("#custom-attribute-form").find("div.validation-errors").html("");
    $("#custom-attribute-form").find("div").removeClass("e-error");
    var dialog = document.getElementById("custom-attribute-dialog").ej2_instances;
    dialog[0].hide();
    var isUserAttributeRequest = typeof (userAttributesPageUrl) != "undefined" && window.location.pathname + window.location.search == userAttributesPageUrl;
    var attributeObj;
    if (isUserAttributeRequest) {
        attributeObj = document.getElementById('UsersAttributesGrid').ej2_instances[0];
    }
    else {
        if (siteCreation) {
            attributeObj = document.getElementById('AddSiteAttributesGrid').ej2_instances[0];
        }
        else {
            attributeObj = document.getElementById('SiteAttributesGrid').ej2_instances[0];
        }
    }
    attributeObj.clearSelection();
}

function showSavedAttributes() {
    var isUserAttributeRequest = typeof (userAttributesPageUrl) != "undefined" && window.location.pathname + window.location.search == userAttributesPageUrl;
    var attributeGridObj;
    if (isUserAttributeRequest) {
        attributeGridObj = document.getElementById('UsersAttributesGrid').ej2_instances[0];
    }
    else {
        attributeGridObj = siteCreation ? document.getElementById('AddSiteAttributesGrid').ej2_instances[0] : document.getElementById('SiteAttributesGrid').ej2_instances[0];
    }
    customAttributeInfo = attributeGridObj.getCurrentViewRecords()[attributeGridObj.getSelectedRowIndexes()];
    document.getElementById("custom-attribute-name").ej2_instances[0].value = customAttributeInfo.Name;
    document.getElementById("custom-attribute-descrition").ej2_instances[0].value = customAttributeInfo.Description;
    customAttributeInfo.CanEncrypt ? "" : document.getElementById("custom-attribute-value").ej2_instances[0].value = customAttributeInfo.Value;
    $("#encrypt-custom-attribute").prop("checked", customAttributeInfo.CanEncrypt);
    editCustomAttributeId = customAttributeInfo.CustomAttributeId;
}

function showCustomAttribute() {
    var dialog = document.getElementById("custom-attribute-dialog").ej2_instances;
    dialog[0].header = isAttributeEdit ? window.Server.App.LocalizationContent.EditCustomAttribute : window.Server.App.LocalizationContent.AddCustomAttribute;
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
        ModifiedDate: new Date(),
        CustomAttributeId: customAttributeId
    }

    var isUserAttributeRequest = typeof (userAttributesPageUrl) != "undefined" && window.location.pathname + window.location.search == userAttributesPageUrl;
    if (isUserAttributeRequest) {
        customAttribute = {
            Name: $("#custom-attribute-name").val().trim(),
            Value: document.getElementById("custom-attribute-value").ej2_instances[0].value,
            Description: document.getElementById("custom-attribute-descrition").ej2_instances[0].value,
            CanEncrypt: $("#encrypt-custom-attribute").is(":checked"),
            CreatedDate: new Date(),
            ModifiedDate: new Date(),
            CustomAttributeId: customAttributeId,
            UserId = userId
        }
    }

    customAttributeId++;

    showWaitingPopup('custom-attribute-dialog');
    if (!isUserAttributeRequest && siteCreation) {
        addSiteLevelAttribute(customAttribute);
        return;
    }

    var requestData = { customAttribute: JSON.stringify(customAttribute)};

    if (isUserAttributeRequest) {
        requestData = { customAttribute: JSON.stringify(customAttribute) };
        saveCustomAttributeUrl = addUserCustomAttributeUrl;
    }
    else {
        requestData = { customAttribute: JSON.stringify(customAttribute), tenantInfoId: tenantInfoId };
    }

    showWaitingPopup('custom-attribute-dialog');
    var dialog = document.getElementById("custom-attribute-dialog").ej2_instances;
    $.ajax({
        type: "POST",
        url: saveCustomAttributeUrl,
        data: requestData,
        success: function (result) {
            if (result.Status) {
                getSiteOrUseAttributes();
                SuccessAlert(window.Server.App.LocalizationContent.AddCustomAttribute, window.Server.App.LocalizationContent.CustomAttributeSuccess, 7000);
                hideWaitingPopup('custom-attribute-dialog');
                dialog[0].hide();
            } else {
                hideWaitingPopup('custom-attribute-dialog');
                if (!isEmptyOrWhitespace(result.Message)) {
                    $("#custom-attribute-name").addClass("e-error");
                    $("#custom-attribute-form").valid();
                } else {
                    WarningAlert(window.Server.App.LocalizationContent.AddCustomAttribute, window.Server.App.LocalizationContent.CustomAttributeFailure, result.ErrorMessage, 7000);
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
    $("#custom-attribute-form").find(".e-input-group").removeClass("e-error");
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
    var requestData = { attributeName: attributeName };

    var isUserAttributeRequest = typeof (userAttributesPageUrl) != "undefined" && window.location.pathname + window.location.search == userAttributesPageUrl;
    if (isUserAttributeRequest) {
        requestData = { attributeName: attributeName, userId: userId };
        isAttributeNameExistsUrl = isUserCustomAttributeNameExistUrl;
    }
    else {
        requestData = { attributeName: attributeName, tenantInfoId: tenantInfoId };
    }

    $.ajax({
        type: "POST",
        url: isAttributeNameExistsUrl,
        data: requestData ,
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
    var isUserAttributeRequest = typeof (userAttributesPageUrl) != "undefined" && window.location.pathname + window.location.search == userAttributesPageUrl;
    var customAttribute = {
        Id: attributeId,
        Name: $("#custom-attribute-name").val().trim(),
        Value: document.getElementById("custom-attribute-value").ej2_instances[0].value,
        Description: document.getElementById("custom-attribute-descrition").ej2_instances[0].value,
        CanEncrypt: $("#encrypt-custom-attribute").is(":checked"),
        CreatedDate: new Date(),
        ModifiedDate: new Date(),
        CustomAttributeId: editCustomAttributeId
    }
    if (isUserAttributeRequest) {
        customAttribute = {
            Id: attributeId,
            Name: $("#custom-attribute-name").val().trim(),
            Value: document.getElementById("custom-attribute-value").ej2_instances[0].value,
            Description: document.getElementById("custom-attribute-descrition").ej2_instances[0].value,
            CanEncrypt: $("#encrypt-custom-attribute").is(":checked"),
            CreatedDate: new Date(),
            ModifiedDate: new Date(),
            UserId = userId
        }
        updateCustomAttributeUrl = editUserCustomAttributeUrl;
    }

    showWaitingPopup('custom-attribute-dialog');
    if (siteCreation) {
        updateSiteLevelAttribute(customAttribute);
        return;
    }
    var requestData = { customAttribute: JSON.stringify(customAttribute)}
    if (isUserAttributeRequest) {
        requestData = { customAttribute: JSON.stringify(customAttribute) }
    }
    else {
        requestData = { customAttribute: JSON.stringify(customAttribute), tenantInfoId: tenantInfoId }
    }

    var dialog = document.getElementById("custom-attribute-dialog").ej2_instances;
    $.ajax({
        type: "POST",
        url: updateCustomAttributeUrl,
        data: requestData,
        success: function (result) {
            if (result.Status) {
                getSiteOrUseAttributes();
                SuccessAlert(window.Server.App.LocalizationContent.EditCustomAttribute, window.Server.App.LocalizationContent.UpdateCustomAttributeSuccess, 7000);
                hideWaitingPopup('custom-attribute-dialog');
                dialog[0].hide();
            } else {
                hideWaitingPopup('custom-attribute-dialog');
                if (!isEmptyOrWhitespace(result.Message)) {
                    $("#custom-attribute-name").addClass("e-error");
                    $("#custom-attribute-form").valid();
                } else {
                    WarningAlert(window.Server.App.LocalizationContent.EditCustomAttribute, window.Server.App.LocalizationContent.UpdateCustomAttributeFailure, result.ErrorMessage, 7000);
                    dialog[0].hide();
                }
            }
        }
    });
}

function removeCustomAttribute(item) {
    var isUserAttributeRequest = typeof (userAttributesPageUrl) != "undefined" && window.location.pathname + window.location.search == userAttributesPageUrl;
    var customAttribute = {
        Id: $(item).attr("data-id"),
        CreatedDate: new Date(),
        ModifiedDate: new Date()
    }
    var requestData = { customAttribute: JSON.stringify(customAttribute) }
    if (isUserAttributeRequest) {
        deleteCustomAttributeUrl = deleteUserCustomAttributeUrl;
        requestData = { customAttribute: JSON.stringify(customAttribute) }
    }
    else {
        requestData = { customAttribute: JSON.stringify(customAttribute), tenantInfoId: tenantInfoId }
    }

    showWaitingPopup('messageBox');
    $.ajax({
        type: "POST",
        url: deleteCustomAttributeUrl,
        data: requestData,
        success: function (result) {
            if (result.Status) {
                getSiteOrUseAttributes();
                hideWaitingPopup('messageBox');
                SuccessAlert(window.Server.App.LocalizationContent.DeleteCustomAttribute, window.Server.App.LocalizationContent.DeleteCustomAttributeSuccess, 7000);
            } else {
                hideWaitingPopup('messageBox');
                WarningAlert(window.Server.App.LocalizationContent.DeleteCustomAttribute, window.Server.App.LocalizationContent.DeleteCustomAttributeFailure, result.Message, 7000);
            }
            hideWaitingPopup('messageBox');
            onCloseMessageBox();
        }
    });
}

function editCustomAttribute(item) {
    var id = $(item).attr("data-id");
    var name = $(item).attr("name");
    isAttributeEdit = true;
    openCustomAttributeDialog(id, name);
}

function getSiteOrUseAttributes() {
    var isUserAttributeRequest = typeof (userAttributesPageUrl) != "undefined" && window.location.pathname + window.location.search == userAttributesPageUrl;
    if (isUserAttributeRequest) {
        showWaitingPopup('UsersAttributesGrid');
        $.ajax({
            type: "GET",
            url: userAttributesUrl,
            data: { userId: userId },
            success: function (result) {
                if (result.Status) {
                    var userAttributesGrid = document.getElementById('UsersAttributesGrid').ej2_instances[0];
                    userAttributesGrid.dataSource = result.Attributes;
                }
                hideWaitingPopup('UsersAttributesGrid');
            }
        });
    } else {
        showWaitingPopup('SiteAttributesGrid');
        $.ajax({
            type: "GET",
            url: siteAttributesUrl,
            data: { tenantInfoId: tenantInfoId },
            success: function (result) {
                if (result.Status) {
                    var siteAttributesGrid = document.getElementById('SiteAttributesGrid').ej2_instances[0];
                    siteAttributesGrid.dataSource = result.Attributes;
                }
                hideWaitingPopup('SiteAttributesGrid');
            }
        });
    }
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
        var isUserAttributeRequest = typeof (userAttributesPageUrl) != "undefined" && window.location.pathname + window.location.search == userAttributesPageUrl;
        var attributeGridObj;
        if (isUserAttributeRequest) {
            attributeGridObj = document.getElementById('UsersAttributesGrid').ej2_instances[0];
        }
        else {
            attributeGridObj = document.getElementById('SiteAttributesGrid').ej2_instances[0];
        }
        var attribute = attributeGridObj.getCurrentViewRecords()[attributeGridObj.getSelectedRowIndexes()];
        messageBox("su-delete", window.Server.App.LocalizationContent.DeleteCustomAttribute, window.Server.App.LocalizationContent.DeleteAttributeConfirm.format(" - <span class ='highlight-name'>", attribute.Name, "</span>"), "error", function () {
            removeCustomAttribute(item)
        }, function () {
            clearAttributeSelection()
        });
    }, 100);
}

function clearAttributeSelection() {
    var isUserAttributeRequest = typeof (userAttributesPageUrl) != "undefined" && window.location.pathname + window.location.search == userAttributesPageUrl;
    var attributeGridObj;
    if (isUserAttributeRequest) {
        attributeGridObj = document.getElementById('UsersAttributesGrid').ej2_instances[0];
    }
    else {
        attributeGridObj = document.getElementById('SiteAttributesGrid').ej2_instances[0];
    }
    attributeGridObj.clearSelection();
    onCloseMessageBox();
}

function initialSiteGridCreate() {
    if (window.location.search.includes("tab=attributes")) {
        showWaitingPopup('SiteAttributesGrid');
    }
}

function addSiteLevelAttribute(customAttribute) {
    var dialog = document.getElementById("custom-attribute-dialog").ej2_instances;
    addSiteAttribute.push(customAttribute);
    var siteAttributesGrid = document.getElementById('AddSiteAttributesGrid').ej2_instances[0];
    siteAttributesGrid.dataSource = addSiteAttribute;
    siteAttributesGrid.refresh();
    hideWaitingPopup('custom-attribute-dialog');
    dialog[0].hide();
}

function nameCheckAtAddTenant() {
    var attributeName = $("#custom-attribute-name").val().trim();
    $.each(addSiteAttribute, function (index, value) {
        if (value.Name.toLowerCase() == attributeName.toLowerCase()) {
            $("#custom-attribute-name").addClass("e-error");
        }
        $("[name='custom-attribute-name']").valid();
    });
}

function updateSiteLevelAttribute(customAttribute) {
    var dialog = document.getElementById("custom-attribute-dialog").ej2_instances;
    var siteAttributesGrid = document.getElementById('AddSiteAttributesGrid').ej2_instances[0];
    addSiteAttribute.splice(currentIndex, 1);
    addSiteAttribute.push(customAttribute);
    siteAttributesGrid.refresh();
    hideWaitingPopup('custom-attribute-dialog');
    dialog[0].hide();
}

function removeSiteAttribute() {
    var siteAttributesGrid = document.getElementById('AddSiteAttributesGrid').ej2_instances[0];
    addSiteAttribute.splice(siteAttributesGrid.getSelectedRowIndexes(), 1);
    siteAttributesGrid.refresh();
}

function multiLineInputBoxInitialization(id) {
    var inputbox = new ejs.inputs.TextBox({
        cssClass: 'e-outline e-custom e-non-float',
        floatLabelType: 'Never',
        multiline: true
    });
    inputbox.appendTo(id);
}