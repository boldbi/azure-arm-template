var isCustomAttributeBinded = false;
var isAttributeEdit = false;
var customAttributeType = "";
var customAttributeInfo = "";
var attributeId = "";

$(document).ready(function () {
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
            $(element).closest("div").addClass("has-error");
        },
        unhighlight: function (element) {
            $(element).closest("div").removeClass("has-error");
            $(element).parent().find("div.validation-errors").html("");
        },
        errorPlacement: function (error, element) {
            $(element).parent().find("div.validation-errors").html(error);
        },
        messages: {
            "custom-attribute-name": {
                isRequired: window.Server.App.LocalizationContent.AttributeNameValidator
            },
            "custom-attribute-value": {
                isRequired: window.Server.App.LocalizationContent.AttributeValueValidator
            }
        }
    });

    $.validator.addMethod("isAttributeExist", function (value, element) {
        return isAttributeExist(value);
    }, window.Server.App.LocalizationContent.IsAttributeNameExist);
});


function isAttributeExist() {
    return !$("#custom-attribute-name").hasClass("has-error");
}

function openCustomAttributeDialog(name) {
    customAttributeType = name;
    var dialogHeader = '<span class ="custom-dialog-header">' + window.Server.App.LocalizationContent.AddCustomAttribute + '</span>';
    if (!isCustomAttributeBinded) {
        var createDialogId = document.createElement("div");
        createDialogId.setAttribute("id", "custom-attribute-dialog");
        var element = document.getElementById("content-area");
        element.appendChild(createDialogId);
        var dialog = new ejs.popups.Dialog({
            header: dialogHeader,
            content: document.getElementById("custom-attribute-content"),
            buttons: [
                {
                    'click': function (e) {
                        if ($("#custom-attribute-form").valid() && !$("#custom-attribute-name").hasClass("has-error")) {
                            if (isAttributeEdit) {
                                updateCustomAttribute();
                            } else {
                                saveCustomAttribute();
                            }
                        }
                    },
                    buttonModel: {
                        isPrimary: true,
                        content: window.Server.App.LocalizationContent.SaveButton
                    }
                },
                {
                    'click': function () {
                        $("#custom-attribute-form").find("div.validation-errors").html("");
                        $("#custom-attribute-form").find("div").removeClass("has-error");
                        dialog.hide();
                    },
                    buttonModel: {
                        content: window.Server.App.LocalizationContent.CancelButton
                    }
                },
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
        dialog[0].show();
    }

    ejs.popups.createSpinner({
        target: document.getElementById('custom-attribute-dialog')
    });
    ejs.popups.setSpinner({ type: 'Material' });

    if (isAttributeEdit) {
        setTimeout(function () {
            showSavedAttributes(name);
        }, 500);
    }
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
        Value: $("#custom-attribute-value").val().trim(),
        Description: $("#custom-attribute-descrition").val().trim(),
        CanEncrypt: $("#encrypt-custom-attribute").is(":checked"),
    };
    customAttributeType == 'user' ? customAttribute.UserId = $("#add-custom-attribute").attr("data-id") : customAttribute.GroupId = $("#add-custom-attribute").attr("data-id");
    ejs.popups.showSpinner(document.getElementById('custom-attribute-dialog'));
    var dialog = document.getElementById("custom-attribute-dialog").ej2_instances;
    $.ajax({
        type: "POST",
        url: saveCustomAttributeUrl[customAttributeType],
        data: { customAttribute: customAttribute },
        success: function (result) {
            if (result.Status) {
                if (customAttributeType === 'user') {
                    getCustomAttributes(customAttribute.UserId, customAttributeType);
                    if (!$("#attribute-tab").hasClass("active")) {
                        $("#user-attribute").attr("href", "#user-attribute-tab");
                        $('a[href="#user-attribute-tab"]').tab("show");
                    }
                } else if (customAttributeType === 'group'){
                    getCustomAttributes(customAttribute.GroupId, customAttributeType);
                    if (!$("#attribute-tab").hasClass("active")) {
                        $("#group-attribute").attr("href", "#group-attribute-tab");
                        $('a[href="#group-attribute-tab"]').tab("show");
                    }
                } else {
                    getCustomAttributes(0, customAttributeType);
                }

                SuccessAlert(window.Server.App.LocalizationContent.AddCustomAttribute, window.Server.App.LocalizationContent.CustomAttributeSuccess, 7000);
                ejs.popups.hideSpinner(document.getElementById('custom-attribute-dialog'));
                dialog[0].hide();
            } else {
                ejs.popups.hideSpinner(document.getElementById('custom-attribute-dialog'));
                if (!isNullOrWhitespace(result.Message)) {
                    $("#custom-attribute-name").addClass("has-error");
                    $("#custom-attribute-form").valid();
                } else {
                    WarningAlert(window.Server.App.LocalizationContent.AddCustomAttribute, window.Server.App.LocalizationContent.CustomAttributeFailure, 7000);
                    dialog[0].hide();
                }
            }
        }
    });
}

$(document).on("keyup focusout", "#custom-attribute-name", function (e) {
    var name = $("#custom-attribute-name").val().toLowerCase().trim();
    if (e.type === "focusout") {
        if (!isNullOrWhitespace(name) && (isNullOrWhitespace(customAttributeInfo) || (!isNullOrWhitespace(customAttributeInfo) && customAttributeInfo.Name.toLowerCase() != name))) {
            attributeNameCheck();
        }
    } else {
        $("#custom-attribute-name").removeClass("has-error");
        $("[name='custom-attribute-name']").valid();
    }
});

function beforeCloseAttributeDialog() {
    updateValidationMessages();
    isAttributeEdit = false;
    customAttributeInfo = "";
}

function attributeNameCheck() {
    var requestData = { attributeName: $("#custom-attribute-name").val().trim() }
    customAttributeType == 'user' ? requestData.userId = $("#add-custom-attribute").attr("data-id") : requestData.groupId = $("#add-custom-attribute").attr("data-id");
    $.ajax({
        type: "POST",
        url: isAttributeNameExistsUrl[customAttributeType],
        data: requestData,
        success: function (result) {
            if (result.Status) {
                $("#custom-attribute-name").addClass("has-error");
            } else {
                $("#custom-attribute-name").removeClass("has-error");
            }
            $("[name='custom-attribute-name']").valid();
        }
    });
}

function getCustomAttributes(id, name) {
    name == 'user' ? $("#UserAttributesGrid").ejWaitingPopup("show") : name == 'group' ? $("#GroupAttributesGrid").ejWaitingPopup("show") : $("#SiteAttributesGrid").ejWaitingPopup("show");
    $.ajax({
        type: "GET",
        url: getCustomAttributeDetailsUrl[name],
        data: { id: id },
        success: function (result) {
            if (result.Status) {
                var attributesGrid = "";
                if (name === "user") {
                    attributesGrid = $("#UserAttributesGrid").data("ejGrid");
                } else if (name === "group") {
                    attributesGrid = $("#GroupAttributesGrid").data("ejGrid");
                } else {
                    attributesGrid = $("#SiteAttributesGrid").data("ejGrid");
                }

                attributesGrid.dataSource(result.Attributes);
            } 
            name == 'user' ? $("#UserAttributesGrid").ejWaitingPopup("hide") : name == 'group' ? $("#GroupAttributesGrid").ejWaitingPopup("hide") : $("#SiteAttributesGrid").ejWaitingPopup("hide");
        }
    });
}

function updateCustomAttribute() {
    var customAttribute = {
        Id: attributeId,
        Name: $("#custom-attribute-name").val().trim(),
        Value: $("#custom-attribute-value").val().trim(),
        Description: $("#custom-attribute-descrition").val().trim(),
        CanEncrypt: $("#encrypt-custom-attribute").is(":checked")
    };
    customAttributeType === 'user' ? customAttribute.UserId = $("#add-custom-attribute").attr("data-id") : customAttribute.GroupId = $("#add-custom-attribute").attr("data-id");
    ejs.popups.showSpinner(document.getElementById('custom-attribute-dialog'));
    var dialog = document.getElementById("custom-attribute-dialog").ej2_instances;
    $.ajax({
        type: "POST",
        url: updateCustomAttributeUrl[customAttributeType],
        data: { customAttribute: customAttribute },
        success: function (result) {
            if (result.Status) {
                if (customAttributeType === 'user') {
                    getCustomAttributes(customAttribute.UserId, customAttributeType);
                } else if (customAttributeType === 'group') {
                    getCustomAttributes(customAttribute.GroupId, customAttributeType);
                } else {
                    getCustomAttributes(0, customAttributeType);
                }
                SuccessAlert(window.Server.App.LocalizationContent.EditCustomAttribute, window.Server.App.LocalizationContent.UpdateCustomAttributeSuccess, 7000);
                ejs.popups.hideSpinner(document.getElementById('custom-attribute-dialog'));
                dialog[0].hide();
            } else {
                ejs.popups.hideSpinner(document.getElementById('custom-attribute-dialog'));
                if (!isNullOrWhitespace(result.Message)) {
                    $("#custom-attribute-name").addClass("has-error");
                    $("#custom-attribute-form").valid();
                } else {
                    WarningAlert(window.Server.App.LocalizationContent.EditCustomAttribute, window.Server.App.LocalizationContent.UpdateCustomAttributeFailure, 7000);
                    dialog[0].hide();
                }
            }
        }
    });
}

function addCustomAttribute(name) {
    isAttributeEdit = false;
    openCustomAttributeDialog(name);
}

function editCustomAttribute(item) {
    attributeId = $(item).attr("data-id");
    var name = $(item).attr("data-name");
    isAttributeEdit = true;
    openCustomAttributeDialog(name);
}

function showSavedAttributes(name) {
    var attributeGridObj = "";
    if (name === "user") {
        attributeGridObj = $("#UserAttributesGrid").data("ejGrid");
    } else if (name === "group") {
        attributeGridObj = $("#GroupAttributesGrid").data("ejGrid");
    } else {
        attributeGridObj = $("#SiteAttributesGrid").data("ejGrid");
    }

    var attribute = attributeGridObj.getCurrentViewData()[attributeGridObj.getIndexByRow($("tr.e-row[aria-selected *='true']"))];
    customAttributeInfo = attribute;
    $("#custom-attribute-name").val(attribute.Name);
    if (!attribute.CanEncrypt) {
        $("#custom-attribute-value").val(attribute.Value);
    }

    attribute.Description = htmlDecode(attribute.Description);
    $("#custom-attribute-descrition").val(attribute.Description);
    $("#encrypt-custom-attribute").prop("checked", attribute.CanEncrypt);
}

function htmlDecode(input) {
    var e = document.createElement('textarea');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function removeCustomAttribute(item) {
    var id = $(item).attr("data-id");
    var name = $(item).attr("data-name");
    var customAttribute = {
        Id: id
    };
    name === 'user' ? customAttribute.UserId = $("#add-custom-attribute").attr("data-id") : customAttribute.GroupId = $("#add-custom-attribute").attr("data-id");
    $.ajax({
        type: "POST",
        url: removeCustomAttributeUrl[name],
        data: { attribute: customAttribute },
        success: function (result) {
            if (result.Status) {
                if (name === 'user') {
                    getCustomAttributes(customAttribute.UserId, name);
                } else if (name === 'group') {
                    getCustomAttributes(customAttribute.GroupId, name);
                } else {
                    getCustomAttributes(0, name);
                }

                SuccessAlert(window.Server.App.LocalizationContent.DeleteCustomAttribute, window.Server.App.LocalizationContent.RemoveCustomAttributeSuccess, 7000);
            } else {
                WarningAlert(window.Server.App.LocalizationContent.DeleteCustomAttribute, window.Server.App.LocalizationContent.RemoveCustomAttributeFailure, 7000);
            }
            $("#messageBox_wrapper").ejWaitingPopup("hide");
            onCloseMessageBox();
        }
    });
}

function updateValidationMessages() {
    $("#custom-attribute-name, #custom-attribute-value, #custom-attribute-descrition").val("");
    $("#encrypt-custom-attribute").prop("checked", false);
    $("#custom-attribute-name, #custom-attribute-value").removeClass("has-error");
    $("#custom-attribute-name, #custom-attribute-value").next(".validation-errors").html("");
    $("#custom-attribute-name, #custom-attribute-value").parent('div').removeClass("has-error");
}

function deleteConfirmation(item) {
    setTimeout(function () {
        var attributeGridObj = "";
        var name = $(item).attr("data-name");
        if (name === "user") {
            attributeGridObj = $("#UserAttributesGrid").data("ejGrid");
        } else if (name === "group") {
            attributeGridObj = $("#GroupAttributesGrid").data("ejGrid");
        } else {
            attributeGridObj = $("#SiteAttributesGrid").data("ejGrid");
        }

        var attribute = attributeGridObj.getCurrentViewData()[attributeGridObj.getIndexByRow($("tr.e-row[aria-selected *='true']"))];
        messageBox("su-delete", window.Server.App.LocalizationContent.DeleteCustomAttribute, window.Server.App.LocalizationContent.DeleteAttributeConfirm + '<span class ="highlight-name">' + attribute.Name + "</span> ?", "error", function () {
            var messageboxWaitingPopupTemplateIdId = createLoader("messageBox_wrapper");
            $("#messageBox_wrapper").ejWaitingPopup({ template: $("#" + messageboxWaitingPopupTemplateIdId) });
            $("#messageBox_wrapper").css("height", $("#messageBox").outerHeight());
            $("#messageBox_wrapper").ejWaitingPopup("show");
            removeCustomAttribute(item);
        });
    }, 100);
}

function initialSiteGridCreate() {
    if (window.location.search.contains("tab=attributes")) {
        $("#SiteAttributesGrid").ejWaitingPopup("show");
    }
}

function initialGroupGridCreate() {
    if (window.location.search.contains("tab=attributes")) {
        $("#GroupAttributesGrid").ejWaitingPopup("show");
    }
}

function initialUserGridCreate() {
    if (window.location.search.contains("tab=attributes")) {
        $("#UserAttributesGrid").ejWaitingPopup("show");
    }
}