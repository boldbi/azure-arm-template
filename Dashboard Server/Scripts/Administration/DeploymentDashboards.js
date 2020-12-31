var isKeyUp = false;
var isDialogBinded = false;
var categoriesData = [];

$(document).ready(function () {
    getDeploymentDashboardGrid();

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, window.Server.App.LocalizationContent.ItemNameValidator);

    $.validator.addMethod("isValidName", function (value, element) {
        return IsValidName("name", value)
    }, window.Server.App.LocalizationContent.AvoidSpecialCharactors);

    $.validator.addMethod("additionalSpecialCharValidation", function (value, element) {
        if (/^[a-zA-Z_0-9`~!\$\^()=\-\.\{\} ]+$/.test(value) || value === "") {
            return true;
        }
    }, window.Server.App.LocalizationContent.AvoidSpecialCharactors); 

    $.validator.addMethod("isDashboardExist", function (value, element) {
        return isDashboardExist(value);
    }, window.Server.App.LocalizationContent.IsDashboardNameExist);
    
    $("#dialog-container").validate({
        errorElement: 'span',
        onkeyup: function (element, event) {
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false;
            }
            else
                true;
        },        
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            "dashboard-name": {
                isRequired: true,
                isValidName: true,
                isDashboardExist: true,
                additionalSpecialCharValidation: true
            },
            "category-name": {
                isRequired: true,
                isValidName: true,
                additionalSpecialCharValidation: true
            }
        },
        highlight: function (element) {
            $(element).closest('div').addClass("has-error");
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('has-error');
            $(element).closest('div').find("span").html("");
        },
        errorPlacement: function (error, element) {
            $(element).closest('div').find("span").html(error.html()).show();
        },
        messages: {
            "dashboard-name": {
                isRequired: window.Server.App.LocalizationContent.DashboardNameValidator,
            },
            "category-name": {
                isRequired: window.Server.App.LocalizationContent.CategoryNameValidator,
            }
        }
    });    

    $(document).on("click", "#add-dashboard", function () {
        getdeployementDashboardSelectPickerValues();
        var isValid = $("#dialog-container").valid();
        if (isValid) {
            $(".useradd-validation-messages").hide();
            openDeploymentDialog();
        }
        else {
            $(".useradd-validation-messages").show();
        }
    });

    $(document).on("click", ".remove-dashboard", function () {
        itemId = $(this).attr("data-itemId");
        messageBox("su-delete", window.Server.App.LocalizationContent.RemoveDashboard, window.Server.App.LocalizationContent.ConfirmationRemoveDashboard, "error", function () { removeDashboard(); }, function () { onCloseMessageBox(); }, "448px", "180px", "150px", "");
    });

    $(document).on("change", "#select-dashboard", function () {
        var selectedDashboard = $(this).val();
        if (selectedDashboard == "") {
            $("#invalid-dashboard-selector").show();
            $('#select-dashboard').closest('div').find("button").addClass("box-error-color");
        }
        else {
            $("#invalid-dashboard-selector").hide();
            $('#select-dashboard').closest('div').find("button").removeClass("box-error-color");
        }
    });

    $(document).on("change", "#select-category", function () {
        var selectedCategory = $(this).val();
        var selectedCategory = $(this).find("option:selected").val(); 
        if (selectedCategory === null) {
            $("#invalid-category-selector").show();
            $('#select-category').closest('div').find("button").addClass("box-error-color");
        }
        else {
            $("#invalid-category-selector").hide();
            $('#select-category').closest('div').find("button").removeClass("box-error-color");
        }

        var dashboards = [];
        dashboards = categoriesData.filter(function (x) { return x.Id == selectedCategory; })[0].Dashboards;
        var listDashboards = "";
        for (var t = 0; t < dashboards.length; t++) {
            listDashboards += '<option value="' + dashboards[t].Id + '">' + dashboards[t].Name + '</option>';
        }
        $("#select-dashboard").html("");      
        $("#select-dashboard").html('<option value="" selected="selected" class="hide-option" disabled>' + window.Server.App.LocalizationContent.SelectDashboard + '</option>' + '' + listDashboards).selectpicker("refresh");
    });

    $(document).on("keyup focusout", "#destination-name,#destination-category-name", function (e) {
        var name = $("#destination-name").val().toLowerCase().trim();
        var categoryName = $("#destination-category-name").val().toLowerCase().trim();
        if (e.type === "focusout") {
            if (!isNullOrWhitespace(name) && !isNullOrWhitespace(categoryName)) {
                dashboardNameCheck();
            }
        } else {
            if (!isNullOrWhitespace(name)) {
                $("#dialog-container").valid();
                $("#destination-name").removeClass("has-error");
            }
        }
    });
});

function isDashboardExist(value) {
    return !$("#destination-name").hasClass("has-error");
}

function checkSelectorCategory() {    
    var selectedDashboard = $("#select-category").val();
    if (selectedDashboard === null) {
        $("#invalid-category-selector").show();
        $('#select-category').closest('div').find("button").addClass("box-error-color");
        
        return false;
    }
    else {
        $("#invalid-category-selector").hide();
        $('#select-category').closest('div').find("button").removeClass("box-error-color"); 

        return true;
    }  
}

function checkSelectorDashboard() {
    var selectedDashboard = $("#select-dashboard").val();
    if (selectedDashboard === null) {
        $("#invalid-dashboard-selector").show();
        $('#select-dashboard').closest('div').find("button").addClass("box-error-color");

        return false;
    }
    else {
        $("#invalid-dashboard-selector").hide();
        $('#select-dashboard').closest('div').find("button").removeClass("box-error-color");

        return true;
    }
}

function openDeploymentDialog() {
    var dialogHeader = '<span class ="dialog-header-title">' + window.Server.App.LocalizationContent.HeaderDialog + '</span>';
    if (!isDialogBinded) {
        var createDialogId = document.createElement("div");
        createDialogId.setAttribute("id", "deployment-dashboard-dialog");
        var element = document.getElementById("deployment-ad-tab");
        element.appendChild(createDialogId);
        var dialog = new ejs.popups.Dialog({
            header: dialogHeader,
            content: document.getElementById("add-deployment-dashboard"),
            buttons: [
                {
                    'click': function (e) {
                        var isValid = $("#dialog-container").valid();
                        var isCheckCategory = checkSelectorCategory();
                        var isCheckDashboard = checkSelectorDashboard();
                        var dashboardId = $('#select-dashboard').find("option:selected").val();
                        if (isValid && isCheckCategory && isCheckDashboard) {
                            addDeploymentDashboard(dashboardId);
                        } else {
                            e.preventDefault();
                        }
                    },
                    buttonModel: {
                        isPrimary: true,
                        disabled: false,
                        content: window.Server.App.LocalizationContent.AddButton
                    }
                },
                {
                    'click': function () {
                        dialog.hide();
                        getdeployementDashboardSelectPickerValues();
                        clearAddDashboardDialog();
                    },
                    buttonModel: {
                        content: window.Server.App.LocalizationContent.CancelButton
                    }
                }
            ],
            animationSettings: { effect: 'Zoom' },
            beforeOpen: beforeOpenDeploymentDashboardDialog,
            beforeClose: beforeCloseDeploymentDashboardDialog,
            width: '600px',
            showCloseIcon: true,
            isModal: true,
        });
        dialog.appendTo(createDialogId);
        isDialogBinded = true;
    }
    else {
        var dialog = document.getElementById("deployment-dashboard-dialog").ej2_instances;
        dialog[0].header = dialogHeader;
        dialog[0].show();
    }
    ejs.popups.createSpinner({
        target: document.getElementById('deployment-dashboard-dialog')
    });
    ejs.popups.setSpinner({ type: 'Material' });
};

function beforeOpenDeploymentDashboardDialog() {
    $("#add-deployment-dashboard").show();
}

function beforeCloseDeploymentDashboardDialog() {
    getdeployementDashboardSelectPickerValues();
    clearAddDashboardDialog();
};

function removeDashboard() {
    $.ajax({
        type: "POST",
        url: removeDashboardUrl,
        data: { itemId: itemId },
        success: function (data) {
            $("#body").ejWaitingPopup("show");
            if (data.Status) {               
                var gridObj = $("#dashboardGrid").data("ejGrid");
                gridObj.dataSource(data.Result);
                SuccessAlert(window.Server.App.LocalizationContent.RemoveDashboard, window.Server.App.LocalizationContent.SuccessRemoveDeploymentDashboard, 7000);
                onCloseMessageBox();
            } else {
                WarningAlert(window.Server.App.LocalizationContent.RemoveDashboard, window.Server.App.LocalizationContent.FailedRemoveDeploymentDashboard, 7000);
                onCloseMessageBox();
            }
            $("#body").ejWaitingPopup("hide");
        }
    });
}

function getdeployementDashboardSelectPickerValues() {   
    $.ajax({
        type: "POST",
        url: getSelectPickerValuesUrl,
        data: "",
        success: function (data) {
            categoriesData = data.Categories;
            var listCategories = "";
            for (var t = 0; t < categoriesData.length; t++) {
                listCategories += '<option value="' + categoriesData[t].Id + '">' + categoriesData[t].Name + '</option>';
            }
            $("#select-category").html("");
            $("#select-category").html('<option value="" selected="selected" class="hide-option" disabled>' + window.Server.App.LocalizationContent.SelectCategory + '</option>' + listCategories).selectpicker("refresh");  
        }
    });
}

function dashboardNameCheck() {
    var destinationName = $("#destination-name").val().trim();
    var destintionCategoryName = $("#destination-category-name").val().trim();
    var requestData = { dashboardName: destinationName, categoryName: destintionCategoryName };    
    $.ajax({
        type: "POST",
        url: isDashboardNameExistUrl,
        data: requestData,
        success: function (result) {
            if (result.Status) {
                $("#destination-name").addClass("has-error");
            } else {
                $("#destination-name").removeClass("has-error");
            }
            $("#dialog-container").valid();
        }
    });
}

function addDeploymentDashboard(dashboardId) {
    var itemId = dashboardId;
    var description = $("#description").val();
    var destinationName = $("#destination-name").val();
    var destintionCategoryName = $("#destination-category-name").val();
    var IsDashboardLocked = $("#enable-dashboard").prop("checked");
    var IsDatasourceLocked = $("#enable-datasource").prop("checked");
    ejs.popups.showSpinner(document.getElementById('deployment-dashboard-dialog'));
    var dialog = document.getElementById("deployment-dashboard-dialog").ej2_instances;
    $.ajax({
        type: "POST",
        url: deploymentDashboardsUrl,
        data: { itemId: itemId, itemName: destinationName, description: description, categoryName: destintionCategoryName, IsDashboardLocked: IsDashboardLocked, IsDatasourceLocked: IsDatasourceLocked},
        success: function (data) {
            if (data.Status) {
                getdeployementDashboardSelectPickerValues();
                var gridObj = $("#dashboardGrid").data("ejGrid");
                gridObj.dataSource(data.Result);
                clearAddDashboardDialog();
                SuccessAlert(window.Server.App.LocalizationContent.AddDeploymentDashboard, window.Server.App.LocalizationContent.DashboardSuccessfullyDeployed, 7000);
                ejs.popups.hideSpinner(document.getElementById('deployment-dashboard-dialog'));
                dialog[0].hide();
            } else {
                if (data.Result === "alreadyAdded") {
                    WarningAlert(window.Server.App.LocalizationContent.AddDeploymentDashboard, window.Server.App.LocalizationContent.DashboardAlreadyDeployed, 7000);
                    ejs.popups.hideSpinner(document.getElementById('deployment-dashboard-dialog'));
                    dialog[0].hide();
                }
                else if (data.Result === "alreadyExist") {  
                    ejs.popups.hideSpinner(document.getElementById('deployment-dashboard-dialog'));
                    $("#destination-name").addClass("has-error");
                    $("#dialog-container").valid();
                }
                else {
                    WarningAlert(window.Server.App.LocalizationContent.AddDeploymentDashboard, window.Server.App.LocalizationContent.DashboardNotDeployed, 7000);
                    ejs.popups.hideSpinner(document.getElementById('deployment-dashboard-dialog'));
                    dialog[0].hide();
                }                
            }
        }
    });
}

function clearAddDashboardDialog() {
    $("#description").val('');
    $("#destination-category-name").val('');
    $("#destination-name").val('');
    $("#enable-dashboard").prop("checked", "");
    $("#enable-datasource").prop("checked", "");
    $("#destination-name").removeClass("has-error");
    $("#destination-name").parent('div').removeClass("has-error");
    $("#destination-category-name").parent('div').removeClass("has-error");
    $("#select-category").html('<option value="" selected="selected" class="hide-option" disabled="disabled">' + window.Server.App.LocalizationContent.SelectCategory + '</option>').selectpicker("refresh");
    $("#select-dashboard").html('<option value="" selected="selected" class="hide-option" disabled="disabled">' + window.Server.App.LocalizationContent.SelectDashboard + '</option>').selectpicker("refresh");
    $("#invalid-dashboard-selector").hide();
    $("#invalid-category-selector").hide();
    $('#select-dashboard').closest('div').find("button").removeClass("box-error-color");
    $('#select-category').closest('div').find("button").removeClass("box-error-color");
}

function getDeploymentGridValues() {         
    $.ajax({
        type: "get",
        url: getDeploymentDashboardsUrl,       
        success: function (result) {
            if (result.Status) {
                var gridObj = $("#dashboardGrid").data("ejGrid");
                gridObj.dataSource(data.Result); 
            }             
        }
    });     
}

function getDeploymentDashboardGrid() {  
    var deploymentDetails = ej.parseJSON(window.deploymentItemDetails);    
    $("#dashboardGrid").ejGrid({
        dataSource: deploymentDetails,
        gridLines: ej.Grid.GridLines.None,
        allowSorting: true,
        allowPaging: true,       
        allowSearching: true,
        allowSelection: true,
        allowFiltering: true,        
        filterSettings: { filterType: "menu" },
        pageSettings: { pageSize: 20 },
        enableRowHover: true,
        enableAltRow: false,
        toolbarSettings: { showToolbar: false, toolbarItems: [ej.Grid.ToolBarItems.Search] },
        searchSettings: { fields: ["DeploymentDashboardName", "CategoryName", "Name", "Status"], key: "", ignoreCase: false },
        columns: [
            { field: 'DeploymentDashboardName', headerText: '[[[Name]]]', width: 120, allowFiltering: true, allowSorting: false, allowGrouping: true },
            { field: 'CategoryName', headerText: '[[[Category]]]', width: 120, allowFiltering: true, allowSorting: true, allowGrouping: true },
            { field: 'Name', headerText: '[[[Dashboard]]]', templateID: "#dashboard-template", type: "string", width: 100, allowFiltering: false, allowSorting: true, allowGrouping: true },
            { field: 'IsDashboardLocked', templateID: "#locked-template-dashboard", headerText: '[[[Edit Dashboard]]]', width: 80, allowFiltering: false, allowSorting: true, allowGrouping: true },
            { field: 'IsDatasourceLocked', templateID: "#locked-template-datasource", headerText: '[[[Edit Datasource]]]', width: 80, allowFiltering: false, allowSorting: true, allowGrouping: true },
            {
                template: true,
                allowSorting: false,
                headerText: '[[[Action]]]',
                templateID: "#actionstemplate",
                width: 60,
                allowFiltering: false
            }
        ]
    });  
}
