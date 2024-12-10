var alertChange = 1;
var actionType = "Edit";
var subject = "Hello";
var emailContent;
var emailBody = emailBodyContent;
var isCreateNewTemplateDialogAdded = false;
var isDeleteDialogAdded = false;
var deleteId = 0;
var deleteTemplateId = 0;
var TemplateInputName;

$(document).ready(function () {
    addPlacehoder("#search-area");
    if (!isEditTemplate){
        GetCustomEmailTemplateList();
    }
    var body = emailBody;
    var ejEditor = ejs.richtexteditor;
    var textArea = '';
    var mdsource;
    var mdResetSource;
    var customEmailEditRTE = new ejEditor.RichTextEditor({
        height: '410px',
        formatter: new ejEditor.MarkdownFormatter({ listTags: { 'OL': '1., 2., 3.' } }),
        toolbarSettings: {
            items: ['Bold', 'Italic', '|',
                'Formats', 'OrderedList', 'UnorderedList', '|',
                'CreateLink', 'Image', '|',
                {
                    tooltipText: 'Preview', template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn">' +
                        '<span class="e-btn-icon su e-preview e-icons"></span></button>'
                },
                {
                    tooltipText: 'Reset', template: '<button id="reset-code" class="e-tbar-btn e-control e-btn e-icon-btn">' +
                        '<span class="e-btn-icon su e-reset e-icons"></span></button>'
                }
            ]
        },
        editorMode: 'Markdown',
        created: function () {
            textArea = customEmailEditRTE.contentModule.getEditPanel();
            mdsource = document.getElementById('preview-code');
            mdResetSource = document.getElementById('reset-code');
            mdsource.addEventListener('click', function (e) {
                fullPreview();
                if (e.currentTarget.classList.contains('e-active')) {
                    customEmailEditRTE.disableToolbarItem(['Bold', 'Italic', 'OrderedList',
                        'UnorderedList', 'CreateLink', 'Image', 'Formats', 'Undo', 'Redo'
                    ]);
                } else {
                    customEmailEditRTE.enableToolbarItem(['Bold', 'Italic', 'OrderedList',
                        'UnorderedList', 'CreateLink', 'Image', 'Formats', 'Undo', 'Redo'
                    ]);
                }
            });
            mdResetSource.addEventListener('click', function () {
                customEmailEditRTE.value = null;
                customEmailEditRTE.value = emailBody;
            });
        },
    })
    function fullPreview() {
        var ejInstance = ej;
        var id = customEmailEditRTE.getID() + 'html-preview';
        var htmlPreview = customEmailEditRTE.element.querySelector('#' + id);
        if (mdsource.classList.contains('e-active')) {
            mdsource.classList.remove('e-active');
            mdsource.parentElement.title = 'Preview';
            customEmailEditRTE.enableToolbarItem(customEmailEditRTE.toolbarSettings.items);
            textArea.style.display = 'block';
            htmlPreview.style.display = 'none';
        }
        else {
            mdsource.classList.add('e-active');
            customEmailEditRTE.disableToolbarItem(customEmailEditRTE.toolbarSettings.items);
            if (!htmlPreview) {
                htmlPreview = ejInstance.base.createElement('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                textArea.parentNode.appendChild(htmlPreview);
            }
            textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            htmlPreview.innerHTML = marked(customEmailEditRTE.contentModule.getEditPanel().value);
            mdsource.parentElement.title = 'Code View';
        }
    }
    customEmailEditRTE.value = emailBody;
    customEmailEditRTE.appendTo('#email-editor-panel #email-body-container');

    $("#email-body-container_view").css("height", "220px");
    TemplateInputName = $("#template-name-input").val();

    $(document).on("keyup", "#email-body-container_editable-content", function () {
        var excludeHtmlRegex = /(<([^>]+)>)/ig;
        var excludedHtmlText = $("#email-body-container_editable-content").val().trim();
        excludedHtmlText = excludedHtmlText == null ? null : excludedHtmlText.replace(excludeHtmlRegex, "");
        if (excludedHtmlText == "" || excludedHtmlText == null) {
            customEmailEditRTE.disableToolbarItem(customEmailEditRTE.toolbarSettings.items);
            $("#email-content-validation").html(window.Server.App.LocalizationContent.EmailBodyEmptyValidation);
            $(".e-preview").addClass("disable-reset");
            $("#email-content-validation").addClass("email-error");
        } else {
            customEmailEditRTE.enableToolbarItem(customEmailEditRTE.toolbarSettings.items);
            $("#email-content-validation").html("");
            $("#disclaimer-content-validation").css("display", "none");
            $(".e-preview").removeClass("disable-reset");
            $("#email-content-validation").removeClass("email-error");
        }
    });

    $(document).on("click", "#reset-code", function () {
        customEmailEditRTE.enableToolbarItem(customEmailEditRTE.toolbarSettings.items);
        $("#email-content-validation").html("");
        $("#disclaimer-content-validation").css("display", "none");
        $(".e-preview").removeClass("disable-reset");
        $("#email-content-validation").removeClass("email-error");
    });
});

$(document).ready(function () {
    $(document).on("click", "#cancel-settings", function () {
        window.location.href = window.location.href;
    });
});

function selectSubjectVariables(subjectString) {
    var value = [];
    var matchedVariables = subjectString.match(/{:(.*?)}/g);
    if (matchedVariables !== undefined && matchedVariables !== null) {
        for (i = 0; i < matchedVariables.length; i++) {
            if (matchedVariables[i].toLowerCase() === "{:organizationname}") {
                value.push("Organization Name");
            }
            else if (matchedVariables[i].toLowerCase() === "{:schedulename}") {
                value.push("Schedule Name");
            }
            else if (matchedVariables[i].toLowerCase() === "{:dashboardname}") {
                value.push("Dashboard Name");
            }
            else if (matchedVariables[i].toLowerCase() === "{:date}") {
                value.push("Date");
            }
            else if (matchedVariables[i].toLowerCase() === "{:time}") {
                value.push("Time");
            }

            $("#email-subject-variables").selectpicker('val', value);
        }
    }
}
function toggleCheckboxes(checkbox) {
    var subjectInput = $('#subject-input');
    var disclaimerContentInput = $('#disclaimer-content-input');
    var headerContentInput = $('#header-content-input');
    var emailBodyContainer = $('#email-body-container');
    var toolbarButtons = $('#email-body-container_toolbar button');
    var editableContent = $('#email-body-container_editable-content');
    var emailContainer = $('#email-body-container_view');
    var sendEmailAsHTML = $('#sendemailashtml');

    if (!checkbox.checked) {
        subjectInput.prop('disabled', true).addClass('disabled-textarea');
        disclaimerContentInput.prop('disabled', true).addClass('disabled-textarea');
        headerContentInput.prop('disabled', true).addClass('disabled-textarea');
        emailBodyContainer.addClass('disabled-container').addClass('disabled-textarea');
        toolbarButtons.prop('disabled', true);
        editableContent.prop('readonly', true).addClass('disabled-textarea');
        emailContainer.addClass('disabled-textarea');
        sendEmailAsHTML.prop('disabled', true);
    } else {
        subjectInput.prop('disabled', false).removeClass('disabled-textarea');
        disclaimerContentInput.prop('disabled', false).removeClass('disabled-textarea');
        headerContentInput.prop('disabled', false).removeClass('disabled-textarea');
        emailBodyContainer.removeClass('disabled-container').removeClass('disabled-textarea');
        toolbarButtons.prop('disabled', false);
        editableContent.prop('readonly', false).removeClass('disabled-textarea');
        emailContainer.removeClass('disabled-textarea');
        sendEmailAsHTML.prop('disabled', false);
    }
}


$(document).on("keyup focusout", "#disclaimer-content-input", function (event) {
    if ($(this).val().trim() != "") {
        $(".disclaimer-content-text").removeClass("has-error");
        $("#disclaimer-content-validation").css("display", "none");
    }
    else if ($("#disclaimer-content-input").val() != "" && $("#disclaimer-content-input").val().length < $("#disclaimer-content-input").attr("data-maxlength")) {
        $(".disclaimer-content-text").removeClass("has-error");
        $("#disclaimer-content-validation").css("display", "none");
    }
});
$(document).on("focusout", "#subject-input", function (event) {
    if ($(this).val().trim() != "") {
        $(".subject-text").removeClass("has-error");
        $("#subject-content-validation").css("display", "none");
    }
    else if ($("#subject-input").val() != "" && $("#subject-input").val().length < $("#subject-input").attr("data-maxlength")) {
        $(".subject-text").removeClass("has-error");
        $("#subject-content-validation").css("display", "none");
    }
});
$(document).on("focusout", "#header-content-input", function (event) {
    if ($(this).val().trim() != "") {
        $(".header-content-text").removeClass("has-error");
        $("#header-content-validation").css("display", "none");
    }
    else if ($("#header-content-input").val() != "" && $("#header-content-input").val().length < $("#header-content-input").attr("data-maxlength")) {
        $(".header-content-text").removeClass("has-error");
        $("#header-content-validation").css("display", "none");
    }
});

var copyDropDownBinded = false
$(document).on("click", "#copy-template, #copy-email-template", async function () {
    var id = $(this).attr("data-unique-id");
    var templateId = $(this).attr("data-template-id");
    var isAddclicked = $(this).attr("id") == "copy-email-template";
    if (isAddclicked) {
        templateId = $("#email-template-name").attr("data-templateid");
    }

    createNewTemplate(isAddclicked);
    $("#template-add-dialog").attr("data-unique-id", id);
    $("#template-add-dialog").attr("data-template-id", templateId);
    $("#template-add-dialog").attr("data-add-clicked", isAddclicked);
    //$('#copy-template-list').empty();
    var specificEventTemplates = [];
    var templateList =await getSpecificEventItems(templateId);
    for (var i = 0; i < templateList.length; i++) {
        var obj = {'text': templateList[i].text, 'value': templateList[i].value}
        if (templateList[i].value == id) {
            specificEventTemplates.push(obj);
        }
    }
    var index = 0;

    if (document.getElementById('copy-template-list').ej2_instances != undefined && document.getElementById('copy-template-list').ej2_instances[0] != undefined) {
        document.getElementById('copy-template-list').ej2_instances[0].destroy();
    }

    if (!isAddclicked) {
        dropDownListInitializationForCopy("#copy-template-list", '', 0, id, templateId, specificEventTemplates);
    } else {
        dropDownListInitializationForAdd("#copy-template-list", 'Select a template', index, id, templateId, templateList);
    }
});

$(document).on("click", "#add-template", function () {
    var addTemplateButton = $(this);
    addTemplateButton.prop('disabled', true);
    var id = document.getElementById('copy-template-list').ej2_instances[0].value;
    var templateId = $("#template-add-dialog").attr("data-template-id");
    var isAddClicked = $("#template-add-dialog").attr("data-add-clicked");
    var name = $("#templateName").val().trim();
    $.ajax({
        type: "POST",
        url: createNewTemplateURL,
        data: { id: id, templateId : templateId, name: name},
        success: function (result) {
            if (result.result) {
                SuccessAlert(window.Server.App.LocalizationContent.EmailTemplateSettings, (isAddClicked == 'true' ? window.Server.App.LocalizationContent.AddTemplateSuccess : window.Server.App.LocalizationContent.CopyTemplateSuccess), 7000);
                var gridObj= document.getElementById("specificEmailTemplateListGrid").ej2_instances[0];
                gridObj.refresh();
            } else {
                WarningAlert(window.Server.App.LocalizationContent.EmailTemplateSettings , (isAddClicked == 'true' ? window.Server.App.LocalizationContent.FailedToAddTemplate : window.Server.App.LocalizationContent.FailedToCopyTemplate), null, 7000);
            }
            addTemplateButton.prop('disabled', false);
            document.getElementById("template-add-dialog").ej2_instances[0].hide();
        }
    });
});

async function getSpecificEventItems(templateId) {
    const response = await fetch(specificEventListURL + '?templateId=' + templateId);
    if (response.ok) {
        const result = await response.json();
        if (result.result) {
            return result.result.map(item => ({ text: item.EmailTemplateName, value: item.Id }));
        }
    }
    return [];
}

function dropDownListInitializationForAdd(id, placeHolder, index, uniqueId, templateId, dataSource) {
    var dropDownList = new ejs.dropdowns.DropDownList({
        dataSource: dataSource,
        fields:{ text: 'text', value: 'value' },
        floatLabelType: "Never",
        cssClass: 'e-outline e-custom e-non-float',
        placeholder: window.Server.App.LocalizationContent.SelectTemplate,
        allowFiltering:true,
        popupHeight: '220px',
        change: onDropDownListChange,
    });
    $(".input-container").removeClass("has-error");
    $(".templateAdd-validation-messages").css("display", "none");
    dropDownList.appendTo(id);
}

async function onDropDownListChange(){
    if ($("#templateName").val().trim() === ""){
        $(".input-container").addClass("has-error");
        $(".templateAdd-validation-messages").css("display", "block");
        $(".templateAdd-validation-messages").html(window.Server.App.LocalizationContent.TemplateNameEmpty);
        $("#add-template").attr("disabled", true);
    }
    else if (await isTemplateNameAlreadyExist($("#templateName").val().trim())){
        $(".input-container").addClass("has-error");
        $(".templateAdd-validation-messages").css("display", "block");
        $(".templateAdd-validation-messages").html(window.Server.App.LocalizationContent.TemplateNameAlreadyExist);
        $("#add-template").attr("disabled", true);
    }
    else{
        $(".input-container").removeClass("has-error");
        $(".templateAdd-validation-messages").css("display", "none");
        $("#add-template").attr("disabled", false);
    }
}

function dropDownListInitializationForCopy(id, placeHolder, index, uniqueId, templateId, dataSource) {
    var dropDownList = new ejs.dropdowns.DropDownList({
        dataSource: dataSource,
        index:0,
        fields:{ text: 'text', value: 'value' },
        floatLabelType: "Never",
        cssClass: 'e-outline e-custom e-non-float',
        enabled:false,
        allowFiltering:true
    });

    dropDownList.appendTo(id);
}

function deleteTemplateConfirmation(){
    var buttons = [
        { click: deleteTemplate, buttonModel: { content: window.Server.App.LocalizationContent.YesButton, isPrimary: true } },
        { click: onDeleteDialogCloseclicked, buttonModel: { content: window.Server.App.LocalizationContent.NoButton } }
    ]
    if (!isDeleteDialogAdded){
        var templateDeleteDialog = new ejs.popups.Dialog({
            header: window.Server.App.LocalizationContent.DeleteTemplate,
            content: document.getElementById("template-delete-confirmation-dialog-content"),
            showCloseIcon: true,
            buttons: buttons,
            width: "472px",
            height: "auto",
            isModal: true,
            animationSettings: { effect: 'Zoom' },
            visible: false
        });
        
        templateDeleteDialog.appendTo("#template-delete-confirmation");
        $("#template-delete-confirmation").find("button.e-primary").addClass("critical-action-button");
        templateDeleteDialog.show();
        isDeleteDialogAdded = true;
    }
    else{
        document.getElementById("template-delete-confirmation").ej2_instances[0].buttons = buttons;
        $("#template-delete-confirmation").find("button.e-primary").addClass("critical-action-button");
        document.getElementById("template-delete-confirmation").ej2_instances[0].show();
    }
}

function onDeleteDialogCloseclicked(){
    document.getElementById("template-delete-confirmation").ej2_instances[0].hide();
}
$(document).on("click", ".delete-template", function () {
    deleteId = $(this).attr("data-unique-id");
    deleteTemplateId = $(this).attr("data-template-id");
    deleteTemplateConfirmation();
});

function deleteTemplate(){
    $.ajax({
        type: "POST",
        url: deleteTemplateUrl,
        data: { id: deleteId, templateId: deleteTemplateId },
        success: function (result) {
            if (result.result) {
                SuccessAlert(window.Server.App.LocalizationContent.EmailTemplateSettings, window.Server.App.LocalizationContent.DeleteEmailTemplate, 7000);
                var gridObj= document.getElementById("specificEmailTemplateListGrid").ej2_instances[0];
                gridObj.refresh();
            } else {
                WarningAlert(window.Server.App.LocalizationContent.EmailTemplateSettings ,window.Server.App.LocalizationContent.DeleteEmailTemplatefailed, null, 7000);
            }
            deleteId = 0;
            deleteTemplateId = 0;
            onDeleteDialogCloseclicked();
        }
    });
}

$(document).on("click", ".markasdefault", function () {
    var id = $(this).attr("data-unique-id");
    var templateId = $(this).attr("data-template-id");

    $.ajax({
        type: "POST",
        url: markAsDefaultUrl,
        data: { id: id, templateId : templateId },
        success: function (result) {
            if (result.result) {
                SuccessAlert(window.Server.App.LocalizationContent.EmailTemplateSettings, window.Server.App.LocalizationContent.MarkTemplateAsDefault, 7000);
                var gridObj= document.getElementById("specificEmailTemplateListGrid").ej2_instances[0];
                gridObj.refresh();
               
            } else {
                WarningAlert(window.Server.App.LocalizationContent.EmailTemplateSettings ,window.Server.App.LocalizationContent.MarkTemplateAsDefaultFailed, null, 7000);
            }
        }
    });
});

function isValidTemplateName(templateName) {
    var filter = pattern = /^[a-zA-Z0-9\s'-]+$/;
    return filter.test(templateName);
}

function onAddTemplateDialogClose() {
    var dropDownList = document.getElementById("copy-template-list").ej2_instances[0]
    if (dropDownList != undefined) {
        dropDownList.value = null;
        dropDownList.text = "";
        dropDownList.dataSource = [];
        dropDownList.dataBind();
    }
    $("#templateName").val("");
    $(".input-container").removeClass("has-error");
    $(".templateAdd-validation-messages").css("display", "none");
}

function onAddTemplateDailogOpen()
{
    $("#add-template").attr("disabled", true);
}
$(document).on("click", "#preview-code", function () {    
    if ($(".e-reset").hasClass('disable-reset'))    
    {    
        $("#reset-code").attr("disabled", false);        
        $(".e-reset").removeClass('disable-reset');   
    }
    else {       
        $(".e-reset").addClass('disable-reset'); 
        $("#reset-code").attr("disabled", true);  
    }
});
async function isTemplateNameAlreadyExist(templateName) {
    var templateId = $("#email-template-name").attr("data-templateid");
    var templateList =await getSpecificEventItems(templateId);
    var templateInputEdit = TemplateInputName !== undefined ? TemplateInputName.toLowerCase(): TemplateInputName;
    for (var i = 0; i < templateList.length; i++) {
        if (templateList[i].text.toLowerCase() === templateName.toLowerCase() && templateList[i].text.toLowerCase() !== templateInputEdit) {
            return true;
        }
    }

    return false;
}

$(document).on("click","#cancel-template", function (){
    onAddTemplateDialogClose();
    document.getElementById("template-add-dialog").ej2_instances[0].hide();
});

function createNewTemplate (isAddClicked){
    if (!isCreateNewTemplateDialogAdded){
        isCreateNewTemplateDialogAdded = true;
        var newTemplateDialog = new ejs.popups.Dialog({
            header: isAddClicked ? window.Server.App.LocalizationContent.Addtemplate : window.Server.App.LocalizationContent.CopyTemplate,
            content: document.getElementById("dialog-container"),
            showCloseIcon: true,
            width: "351px",
            height: "auto",
            isModal: true,
            visible: false,
            closeOnEscape: true,
            animationSettings: { effect: 'Zoom' },
            close: onAddTemplateDialogClose,
            beforeOpen: onAddTemplateDailogOpen
            
        });
        newTemplateDialog.appendTo("#template-add-dialog");
        newTemplateDialog.show();
    }
    else{
        document.getElementById("template-add-dialog").ej2_instances[0].header = isAddClicked ? "Add Template" : window.Server.App.LocalizationContent.CopyTemplate;
        document.getElementById("template-add-dialog").ej2_instances[0].show();
    }

}

$(document).on ("keyup focusout","#templateName", async function (){
    var id = document.getElementById('copy-template-list').ej2_instances[0].value;
    $("#add-template").attr("disabled", true);
    if ($("#templateName").val().trim() === ""){
        $(".input-container").addClass("has-error");
        $(".templateAdd-validation-messages").css("display", "block");
        $(".templateAdd-validation-messages").html(window.Server.App.LocalizationContent.TemplateNameEmpty);
    }
    else if (!isValidTemplateName($("#templateName").val().trim())){
        $(".input-container").addClass("has-error");
        $(".templateAdd-validation-messages").css("display", "block");
        $(".templateAdd-validation-messages").html(window.Server.App.LocalizationContent.TemplateNameInvalid);
    }
    else if (await isTemplateNameAlreadyExist($("#templateName").val().trim())){
        $(".input-container").addClass("has-error");
        $(".templateAdd-validation-messages").css("display", "block");
        $(".templateAdd-validation-messages").html(window.Server.App.LocalizationContent.TemplateNameAlreadyExist);
    } 
    else{
        $(".input-container").removeClass("has-error");
        $(".templateAdd-validation-messages").css("display", "none");
        if (id != undefined)
        {
            $("#add-template").attr("disabled", false);
        }
    }
});

$(document).on("keyup focusout", "#template-name-input", async function (event) {
    if ($(this).val().trim() === "") {
        $(".name-text").addClass("has-error");
        $("#template-content-validation").css("display", "block");
        $("#template-content-validation").html(window.Server.App.LocalizationContent.TemplateNameEmpty);
    }
    else if (!isValidTemplateName($("#template-name-input").val().trim())) {
        $(".name-text").addClass("has-error");
        $("#template-content-validation").css("display", "block");
        $("#template-content-validation").html(window.Server.App.LocalizationContent.TemplateNameInvalid);
    }
    else if (await isTemplateNameAlreadyExist($("#template-name-input").val().trim())){
        $(".name-text").addClass("has-error");
        $("#template-content-validation").css("display", "block");
        $("#template-content-validation").html(window.Server.App.LocalizationContent.TemplateNameAlreadyExist);
    }
    else{
        $(".name-text").removeClass("has-error");
        $("#template-content-validation").css("display", "none");
    }
});

$(document).on("click", "#UpdateEmail-Configuration", function () {
    var excludeHtmlRegex = /(<([^>]+)>)/ig;
    var excludedHtmlText = $("#email-body-container_editable-content").val().trim();
    excludedHtmlText = excludedHtmlText == null ? null : excludedHtmlText.replace(excludeHtmlRegex, "");
    if (excludedHtmlText == "" || excludedHtmlText == null) {
        $("#email-content-validation").html(window.Server.App.LocalizationContent.EmailBodyEmptyValidation);
        $("#email-content-validation").addClass("email-error");
    }
    else if ($("#subject-input").val().trim() === "") {
        $(".subject-text").addClass("has-error");
        $("#subject-content-validation").css("display", "block");
    }
    else if ($("#disclaimer-content-input").val() == "" || $("#disclaimer-content-input").val() == null) {
        $(".disclaimer-content-text").addClass("has-error");
        $("#disclaimer-content-validation").css("display", "block");
        $("#disclaimer-content-validation").html(window.Server.App.LocalizationContent.DisclaimerEmpty);
    }
    else if ($("#subject-input").val() != undefined && $("#subject-input").val().length > $("#subject-input").attr("data-maxlength")) {
        $(".subject-text").addClass("has-error");
        $("#subject-content-validation").css("display", "block");
        $("#subject-content-validation").html(window.Server.App.LocalizationContent.CharacterExceedMessage.format($("#subject-input").attr("data-maxlength")));
    }
    else if ($("#header-content-input").val() != undefined && $("#header-content-input").val().length > $("#header-content-input").attr("data-maxlength")) {
        $(".header-content-text").addClass("has-error");
        $("#header-content-validation").css("display", "block");
        $("#header-content-validation").html(window.Server.App.LocalizationContent.CharacterExceedMessage.format($("#header-content-input").attr("data-maxlength")));
    }
    else if ($("#disclaimer-content-input").val() != undefined && $("#disclaimer-content-input").val().length > $("#disclaimer-content-input").attr("data-maxlength")) {
        $(".disclaimer-content-text").addClass("has-error");
        $("#disclaimer-content-validation").css("display", "block");
        $("#disclaimer-content-validation").html(window.Server.App.LocalizationContent.CharacterExceedMessage.format($("#disclaimer-content-input").attr("data-maxlength")));
    }
    else if ($("#template-name-input").val().trim() === ""){
        $(".name-text").addClass("has-error");
        $("#template-content-validation").css("display", "block");
        $("#template-content-validation").html(window.Server.App.LocalizationContent.TemplateNameEmpty);
    }
    else if (!isValidTemplateName($("#template-name-input").val().trim())){
        $(".name-text").addClass("has-error");
        $("#template-content-validation").css("display", "block");
        $("#template-content-validation").html(window.Server.App.LocalizationContent.TemplateNameInvalid);
    }
    else if (!$(".name-text").hasClass("has-error"))
    {
        var emailconfigure = {
            EmailTemplateName: $("#template-name-input").val().trim(),
            MailBody: $("#email-body-container_editable-content").val(),
            IsEnabled: $("#enable-custom-template").is(":checked"),
            DisclaimerContent: $("#disclaimer-content-input").val(),
            HeaderContent: $("#header-content-input").val(),
            Subject: $("#subject-input").val(),
            SendEmailAsHTML: $("#sendemailashtml").is(":checked"),
            TemplateId: $("#email-template-name").attr("data-templateId"),
            Id: $("#email-template-name").attr("data-unique-id")
        };
        $.ajax({
            type: "POST",
            url: updateEmailConfigureDataUrl,
            data: { emailConfigureData: emailconfigure },
            success: function (result) {
                if (result) {
                    SuccessAlert(window.Server.App.LocalizationContent.EmailTemplateSettings, window.Server.App.LocalizationContent.EmailSettingConfigured, 7000);
                    TemplateInputName = $("#template-name-input").val().trim();
                } else {
                    WarningAlert(window.Server.App.LocalizationContent.EmailTemplateSettings ,window.Server.App.LocalizationContent.EmailSettingConfigureFailed, null, 7000);
                }
            }
        });
    }
});

var grid = "";
function GetCustomEmailTemplateList() {

    if (document.getElementById('specificEmailTemplateListGrid').ej2_instances == null) {
        $("#search-template").val("");
        var data = new ejs.data.DataManager({
            url: templateListUrl + '?templateId=' + templateIDValue,
            adaptor: new ejs.data.UrlAdaptor(),
            crossDomain: true
        });
        
        grid = new ejs.grids.Grid({
            dataSource: data,
            gridLines: 'None',
            allowPaging: true,
            pageSettings: { pageSize: 20 },
            allowSorting: true,
            allowSearching: true,
            enableAltRow: false,
            enableHover: true,
            allowSelection: true,
            load: fnActionBegin,
            actionBegin: fnActionBegin,
            selectionSettings: { type: 'Multiple' },
            rowSelecting: function (e) {
                this.multiSelectCtrlRequest = true;
            },
            dataBound: function () {
                $('[data-toggle="tooltip"]').tooltip(
                    {
                        container: 'body'
                    });
            },
            columns: [
                
                { template: "#systemtemplatename", headerText: window.Server.App.LocalizationContent.Template, type: "string", width: 30, allowFiltering: false, allowSorting: true },
                {
                    field: 'LastModifiedDate',
                    headerText: window.Server.App.LocalizationContent.ModifiedDate,
                    type: 'string',
                    width: 20,
                    allowFiltering: false,
                    allowSorting: false
                },
                {
                    field: 'LastModifiedByName',
                    headerText: window.Server.App.LocalizationContent.ModifiedBy,
                    type: 'string',
                    width: 20,
                    allowFiltering: false,
                    allowSorting: false
                },
                {
                    allowSorting: false,
                    template: "#options",
                    width: 10,
                    allowFiltering: false
                }
            ]
        });
        grid.appendTo('#specificEmailTemplateListGrid');
    }
}
function fnActionBegin(args) {
    var searchValue = $("#search-template").val().trim();
    if (this.properties.query.params.length > 0) {
        this.properties.query.params = [];
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
    else {
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
}