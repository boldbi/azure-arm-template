$(document).ready(function () {
    var isFirstRequest = false;

    if (($(parent.window).width()) > 1400) {
        $("#add-group-permission").addClass("lg-flexible");
    }
    if (($(parent.window).width()) < 1400) {
        $("#add-group-permission").removeClass("lg-flexible");
    }

    $("#permission-delete-confirmation").ejDialog({
        width: "400px",
        showOnInit: false,
        showHeader: false,
        allowDraggable: false,
        enableResize: false,
        title: window.Server.App.LocalizationContent.DeleteItem,
        enableModal: true,
        close: "onPermissionDialogClose"
    });
    var permissionWaitingPopupTemplateId = createLoader("permission-delete-confirmation-wrapper");
    $("#permission-delete-confirmation-wrapper").ejWaitingPopup({ template: $("#" + permissionWaitingPopupTemplateId) });

    $("#add-permission-button,#add-permission-button-top").click(function () {
        eDialog = $("#add-permission").data("ejDialog");
        eDialog.open();
        var groupId = $("#group-id-hidden").val();
        $("#add-permission-iframe").attr("src", addGroupPermissionViewIframeUrl + "?groupId=" + groupId);
        $("#add-permission_wrapper").ejWaitingPopup("show");
    });

    $(document).on("click", ".popup-close", function (e) {
        eDialog = parent.$("#add-permission").data("ejDialog");
        eDialog.close();
        parent.$("#add-permission iframe").attr("src", "");
    });

    $("#entity-selection").change(function () {
        $(".success-message, .error-message").html("");
        var entityType = $('option:selected', this).attr("data-entity-type");
        var entityModId = $(this).val();
        $("#scope-selection").find('option').not(':first').remove();

        $.ajax({
            type: "POST",
            url: getItemScopeAccessUrl,
            data: { entityId: entityModId },
            success: function (result, data) {
                var items = JSON.parse(result);
                var scope = items[0];
                var access = items[1];
                if ($.isEmptyObject(scope) && $.isEmptyObject(access)) {
                    $("#save-permission").attr("disabled", "disabled")
                }
                else {
                    $("#save-permission").removeAttr("disabled")
                }
                var optionsWithOutHeader = "";
                var options = "<option value='' data-hidden='true'></option>";
                if (scope !== null && scope.length > 0) {
                    var previousCategoryId = scope[0].CategoryId;
                    for (var t = 0; t < scope.length; t++) {
                        if (scope[t].ItemType == 2) {
                            if (!scope[t].IsDraft) {
                                if (scope[t].CategoryId != previousCategoryId) {
                                    options = options + '<optgroup label="' + scope[t - 1].CategoryName + '">' + optionsWithOutHeader + '</optgroup>';
                                    previousCategoryId = scope[t].CategoryId;
                                    optionsWithOutHeader = "";
                                }

                                if (t == 0) {
                                    optionsWithOutHeader += '<option value=' + scope[t].Id + ' selected="selected">' + scope[t].Name + '</option>';
                                } else {
                                    optionsWithOutHeader += '<option value=' + scope[t].Id + '>' + scope[t].Name + '</option>';
                                }

                                if (t == (scope.length - 1)) {
                                    options = options + '<optgroup label="' + scope[t].CategoryName + '">' + optionsWithOutHeader + '</optgroup>';
                                }
                            }
                        } else {
                            if (t == 0) {
                                options += '<option value=' + scope[t].Id + ' selected="selected">' + scope[t].Name + '</option>';
                            } else {
                                options += '<option value=' + scope[t].Id + '>' + scope[t].Name + '</option>';
                            }
                        }
                    }
                    $("#scope-selection").append(options).attr("disabled", false).selectpicker("refresh");
                }
                else {
                    $("#scope-selection").append(options).attr("disabled", true).selectpicker("refresh");
                }

                var accessOptions = "";
                if (access !== null && access.length > 0) {
                    for (var t = 0; t < access.length; t++) {
                        accessOptions += '<option value=' + access[t].Id + '>' + access[t].Name + '</option>';
                    }
                    $("#save-permission").attr("disabled", false);
                    $("#access-selection").html(accessOptions).attr("disabled", false).selectpicker("refresh");
                }

                if (entityType != 1 && $.isEmptyObject(scope)) {
                    $("#save-permission").attr("disabled", "disabled");
                }
            }
        });
    });

    $("#scope-selection").change(function () {
        $("#save-permission").attr("disabled", false);
    });

    $("#add-permission-controller").on("click", "#save-permission", function () {
        window.top.$("#success-alert").css("display", "none");
        parent.$("#warning-alert").css("display", "none");
        var accessMode = $("#access-selection").val();
        var entityModel = $("#entity-selection").val();
        var scopeValue = $("#scope-selection").val();
        var group = $("#group-id-hidden").val();
        var entityType = $('option:selected', '#entity-selection').attr("data-entity-type");
        parent.$("#add-permission_wrapper").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: addnewgrouppermissionUrl,
            data: { mode: accessMode, entity: entityModel, scopeId: scopeValue, groupId: group },
            success: function (result, data) {
                if (result.toLowerCase() == "true") {
                    var gridObj = parent.$("#Grid").ejGrid("instance");
                    gridObj.refreshContent();
                    var selectedEntity = $("#entity-selection option:selected").text().replace("Specific ", "");
                    var message = $("#access-selection option:selected").text() + window.Server.App.LocalizationContent.PermissionFor + selectedEntity + " ";
                    if (entityType == 0 || entityType == 2) {
                        message += "— <span class='highlight-name'>" + $("#scope-selection option:selected").text() + "</span> ";
                    }
                    message += window.Server.App.LocalizationContent.PermissionSuccess;
                    if (!$('#addanother').is(":checked")) {
                        window.parent.$("#add-permission").ejDialog("close");
                    }
                    SuccessAlert(window.Server.App.LocalizationContent.AddPermission, message, 7000);
                } else {
                    WarningAlert(window.Server.App.LocalizationContent.AddPermission, window.Server.App.LocalizationContent.IsPermissionExist, 0);
                }
                parent.$("#add-permission_wrapper").ejWaitingPopup("hide");
            }
        });
    });

    $(document).on("click", ".close-div", function () {
        parent.$('#warning-alert').fadeOut()
    });

    $("#permission-app-container").on("click", ".delete-permission", function () {
        var permId = $(this).attr("data-permission-id");
        $("#delete-permission").attr("permissionId", permId);
        $("#permission-delete-confirmation").ejDialog("open");
    });
})

$(document).on("click", "#delete-permission", function () {
    $("#permission-delete-confirmation-wrapper").ejWaitingPopup("show");
    var permId = $(this).attr("permissionid");
    $.ajax({
        type: "POST",
        url: deleteGroupPermissionUrl,
        data: { permissionId: permId },
        success: function (result, data) {
            if (result.toLowerCase() == "true") {
                var gridObj = parent.$("#Grid").ejGrid("instance");

                var currentPage = gridObj.model.pageSettings.currentPage;
                var pageSize = gridObj.model.pageSettings.pageSize;
                var totalRecordsCount = gridObj.model.pageSettings.totalRecordsCount;
                var lastPageRecordCount = gridObj.model.pageSettings.totalRecordsCount % gridObj.model.pageSettings.pageSize;

                if (lastPageRecordCount != 0 && lastPageRecordCount <= 1) {
                    gridObj.model.pageSettings.currentPage = currentPage - 1;
                }
                gridObj.refreshContent()
            }
            $("#permission-delete-confirmation-wrapper").ejWaitingPopup("hide");
            $("#permission-delete-confirmation").ejDialog("close");
        }
    });
});

function fnOnGroupPermissionActionBegin() {
    isFirstRequest = true;
    var itemGridWaitingPopupTemplateId = createLoader("Grid");
    this.element.ejWaitingPopup({ template: $("#" + itemGridWaitingPopupTemplateId) });
}

function rowBound() {
    if (isFirstRequest) {
        isFirstRequest = false;
    }
}
function onPermissionDialogClose() {
    $("#permission-delete-confirmation").ejDialog("close");
}

$(document).keyup(function (e) {
    if (e.keyCode == 27) {
        window.parent.$("#add-permission").ejDialog("close");
    }
});