var gridObj;
var selectedgroupIdValues = [];
var selectedActivedirectorygroupIdValues = [];

function fnCreateGrid(args) {
    $("#Grid .checkboxRow").ejCheckBox({ "change": checkboxOnChange });
    $("#checkboxHeader").ejCheckBox({ "change": headCheckboxOnChange });
}
function dataBound(args) {
    $("#Grid .checkboxRow").ejCheckBox({ "change": checkboxOnChange });
    $("#checkboxHeader").ejCheckBox({ "change": headCheckboxOnChange });
    this.model.indexes = {}; /* Additional property*/
}
function refreshTemplate(args) {
    $("#Grid .checkboxRow").ejCheckBox({ "change": checkboxOnChange });
    $("#checkboxHeader").ejCheckBox({ "change": headCheckboxOnChange });
}
function actionbegin(args) {
    //Stores the selected index on paging starts.
    if (args.requestType == "paging" || args.requestType == "sorting") {
        //if (this.selectedRowsIndexes.length > 0)
        //    this.model.indexes[args.previousPage] = this.selectedRowsIndexes.slice(0, 20);
    }
}
$(document).on("click", "#add-group", function () {
    var groupName = $("#GroupName").val().trim();
    $("#group-name").removeClass("has-error");
    var isValid = $(".group-form").valid();

    if (isValid) {
        parent.$("#new-group-area_wrapper").ejWaitingPopup("show");
        doAjaxPost("POST", checkGroupnameUrl, { GroupName: groupName }, function (data) {
            if (data != "True") {
                var values = "groupName=" + groupName + "&groupDescription=" + $("#group-description").val() + "&groupColor=";
                doAjaxPost("POST", addGroupUrl, values, function (data, result) {
                    if (data != "null") {
                        var count = parent.$("#group-count-text").val();
                        var currentVal = parseInt(count) + 1;
                        parent.$("#group-count").html(currentVal);
                        parent.$("#group-count-text").val(currentVal);
                        parent.$("#new-group-area").ejDialog("close");
                        parent.$("#new-group-area_wrapper").ejWaitingPopup("hide");
                        parent.messageBox("su-group-1", "Add Group", "New group has been created successfully.", "success", function () {
                            var gridObj = parent.$("#Grid").data("ejGrid");
                            RefreshCurrentDataOfGroupList(gridObj);
                            parent.onCloseMessageBox();
                        });
                    } else {
                        parent.messageBox("su-group-1", "Add Group", "Failed to create group.", "error", function () {
                            var gridObj = parent.$("#Grid").data("ejGrid");
                            RefreshCurrentDataOfGroupList(gridObj);
                            parent.onCloseMessageBox();
                        });
                    }
                });
            } else {
                parent.$("#new-group-area_wrapper").ejWaitingPopup("hide");
                $("#group-name").addClass("has-error");
                $(".error-message").html("Group already exists with this name");
            }
        });
    }
});

//Events

$(document).on('click', ".delete", function (e) {
    var groupId = $(this).attr('data-groupid');
    var groupName = $(this).attr('data-groupname');
    eDialog = $("#delete-group-area").data("ejDialog");
    eDialog.open();
    $("#delete-group-iframe").attr("src", deleteGroupViewUrl + "?group=" + groupId + "&name=" + groupName);
    $("#delete-group-area_wrapper").ejWaitingPopup("show");
});

function RefreshCurrentDataOfGroupList(gridObj) {
    gridObj.refreshContent();
}

$(document).ready(function () {
    $.validator.addMethod("isValidName", function (value, element) {
        return IsValidName("name", value)
    }, "Please avoid special characters");

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, "Please enter the name");

    $(".group-form").validate({
        errorElement: 'span',
        onkeyup: function (element, event) { if (event.keyCode != 9) $(element).valid(); else true; },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            "groupname": {
                isRequired: true,
                isValidName: true
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
            $(element).closest('div').find("span").html(error.html());
        },
        messages: {
            "groupname": {
                isRequired: "Please enter group name"
            }
        }
    });

    $("#GroupName").bind("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            if ($("#cancel-group").is(":focus")) {
                parent.$("#new-group-area").ejDialog("close");
            } else {
                $("#add-group").trigger("click");
            }
            return false;
        }
    });

    var isFirstRequest = false;
    addPlacehoder("#group-name");
    $(document).on("click", "#new-group-button", function () {
        eDialog = $("#new-group-area").data("ejDialog");
        eDialog.open();
        $("#new-group-iframe").attr("src", addGroupViewUrl);
        $("#new-group-area_wrapper").ejWaitingPopup("show");
    });

    $(document).on("click", "#delete-group", function () {
        var hiddengroupId = $("#hidden-id").val();
        doAjaxPost("POST", deleteGroupUrl, { "GroupId": hiddengroupId },
            function (data) {
                if (data.status) {
                    var gridObj = parent.$("#Grid").ejGrid("instance");
                    var gridName = parent.$("#Grid").attr("data-gridName").toLowerCase();
                    var count = parent.$("#group-count-text").val();
                    var currentVal = parseInt(count) - 1;
                    parent.$("#group-count").html(currentVal);
                    parent.$("#group-count-text").val(currentVal);
                    if (data.AdGroupCount == 0) {
                        parent.$("#ad-indication").html("");
                    }
                    if (data.AzureADGroupCount == 0) {
                        parent.$("#azure-ad-indication").html("");
                    }
                    eDialog = parent.$("#delete-group-area").data("ejDialog");
                    eDialog.close();
                    if (gridName == "editgroup")
                        parent.location.href = groupPageUrl;
                    else {
                        onSuccessDeleteUser(gridObj);
                        if (data.status) {
                            parent.messageBox("su-delete", "Delete Group", "Group has been deleted successfully.", "success", function () {
                                parent.onCloseMessageBox();
                            });
                        } else {
                            parent.messageBox("su-delete", "Delete Group", "Failed to delete group, please try again later.", "error", function () {
                                parent.onCloseMessageBox();
                            });
                        }
                    }
                }
            }
        );
    });

    $(".group-delete-button").on("click", function () {
        $("#groups-delete-confirmation").ejDialog("open");
    });

    $("#groups-delete-confirmation-wrapper,#groups-delete-confirmation-overLay").keyup(function (e) {
        if (e.keyCode == 13) {
            MakeFlyDeleteGroups();
        }
    });
});

function onSuccessDeleteUser(gridObj) {
    var currentPage = gridObj.model.pageSettings.currentPage;
    var pageSize = gridObj.model.pageSettings.pageSize;
    var totalRecordsCount = gridObj.model.pageSettings.totalRecordsCount;
    var lastPageRecordCount = gridObj.model.pageSettings.totalRecordsCount % gridObj.model.pageSettings.pageSize;

    if (lastPageRecordCount != 0 && lastPageRecordCount <= 1) {
        gridObj.model.pageSettings.currentPage = currentPage - 1;
    }
    gridObj.refreshContent()
}
function fnOnUserGridLoad(args) {
    args.model.dataSource.adaptor = new ej.UrlAdaptor();
    args.model.enableTouch = false;
}

function fnGroupRowSelected(args) {
    var groupgrid = $('#Grid').data("ejGrid");
    var selectedGroups = groupgrid.getSelectedRecords();

    if (groupgrid.getSelectedRecords().length == 1) {
        jQuery.each(selectedGroups, function (index, record) {
            if (record.GroupId == $(".group-delete-button").attr("data-groupid")) {
                $("#add-user-in-groups").removeClass("hide").addClass("show");
                $(".group-delete-button").css("display", "none");
            }
            else {
                $("#add-user-in-groups").removeClass("hide").addClass("show");
                $(".group-delete-button").css("display", "block");
            }
        });
    }
    else if (groupgrid.getSelectedRecords().length > 1) {
        $('#add-user-in-groups').removeClass("hide").addClass("show");
        $(".group-delete-button").css("display", "none");
        jQuery.each(selectedGroups, function (index, record) {
            if (record.GroupId != $(".group-delete-button").attr("data-groupid")) {
                $(".group-delete-button").css("display", "block");
                return false;
            }
        });
    }
    else {
        $('#add-user-in-groups').removeClass("show").addClass("hide");
    }
}

function fnGroupRecordClick(args) {
    var checkbox = args.row.find('.groupList-grid-chkbx');
    checkbox.prop("checked", !checkbox.prop("checked"));
}

function fnOnGroupGridActionBegin(args) {
    isFirstRequest = true;
    var searchValue = $("#search-groups").val();
    refreshGroupFooterPosition();
    this.model.query._params.push({ key: "searchKey", value: searchValue });
    var filerSettings = [], i;

    if (args.model.filterSettings.filteredColumns.length > 0) {
        for (i = 0; i < args.model.filterSettings.filteredColumns.length; i++) {
            var column = args.model.filterSettings.filteredColumns[i];
            filerSettings.push({ "PropertyName": column.field, "FilterType": column.operator, "FilterKey": column.value });
        }

        this.model.query._params.push({ key: "filterCollection", value: filerSettings });
    }
}

function fnOnGroupGridActionComplete(args) {
    if (args.model.currentViewData.length == 0) {
        rowBound(38);
    }
    var groupgrid = $('#Grid').data("ejGrid");
    if (groupgrid.getSelectedRecords().length != 0) {
        $("#add-user-in-groups").removeClass("hide").addClass("show");
    }
    else {
        $("#add-user-in-groups").removeClass("show").addClass("hide");
    }
    $('[data-toggle="tooltip"]').tooltip();
}
function rowBound() {
    if (isFirstRequest) {
        isFirstRequest = false;
        if (location.pathname.toLowerCase() === "/" || location.pathname.split("/")[location.pathname.split("/").length - 1].toLowerCase() == "dashboards") {
            refreshScroller();
        }
    }
}

$(document).on("click", ".search-group", function () {
    var gridObj = $("#Grid").data("ejGrid");
    gridObj.model.pageSettings.currentPage = 1;
    gridObj.refreshContent();
});

$(document).keyup(function (e) {
    if (e.keyCode == 27) {
        parent.$("#new-group-area").ejDialog("close");
        parent.$("#delete-group-area").ejDialog("close");
    }
});
function MakeFlyDeleteGroups() {
    var groupList = "";
    var groupgrid = $('#Grid').data("ejGrid");
    var selectedRecords = groupgrid.getSelectedRecords();
    var SingleOrMultiple = "";
    if (selectedRecords.length > 1)
        SingleOrMultiple = "s";
    var deleteGroupCount = 0;
    jQuery.each(selectedRecords, function (index, record) {
        if (record.GroupId != $(".group-delete-button").attr("data-groupid")) {
            deleteGroupCount = deleteGroupCount + 1;
            if (groupList == "")
                groupList = record.GroupId;
            else
                groupList = groupList + "," + record.GroupId;
        }
    });
    var values = "Groups=" + groupList;
    $("#body").ejWaitingPopup("show");
    doAjaxPost(
        "POST", deleteFromGroupListUrl, values, function (data) {
            if (data.status) {
                var ad = data.AdGroupCount;
                var azurecount = data.AzureADGroupCount;
                var groupcurrentValue = 0;
                var count = parent.$("#group-count-text").val();
                var adcount = parent.$("#adgroup-count-text").val();
                var azureadcount = parent.$("#azureadgroup-count-text").val();
                var currentVal = parseInt(count) - deleteGroupCount;
                if (deleteGroupCount > ad) {
                    groupcurrentValue = deleteGroupCount - parseInt(ad);
                }
                if (groupcurrentValue > azurecount) {
                    groupcurrentValue = groupcurrentValue - parseInt(azurecount);
                }
                else {
                    groupcurrentValue = parseInt(azurecount) - groupcurrentValue;
                }
                adcount = parseInt(adcount) - parseInt(ad);
                azureadcount = parseInt(azureadcount) - parseInt(azurecount);
                if (groupcurrentValue > 0 || ad > 0 || azurecount > 0) {
                    var servergroupcount = groupcurrentValue > 0 ? groupcurrentValue + " " + "Server Group(s)" : "";
                    var activedirectorygroupcount = ad > 0 ? ad + " " + "Active Directory Group(s)" : "";
                    var azureadgroupcount = azurecount > 0 ? azurecount + " " + "Azure ADGroup(s)" : ""
                }

                if (groupcurrentValue > 0 && ad > 0) {
                    var servergroupcount = groupcurrentValue > 0 ? groupcurrentValue + " " + "Server Group(s) and" : "";
                    var activedirectorygroupcount = ad > 0 ? ad + " " + "Active Directory Group(s)" : "";
                }
                if (ad > 0 && azurecount > 0) {
                    var activedirectorygroupcount = ad > 0 ? ad + " " + "Active Directory Group(s) and " : "";
                    var azureadgroupcount = azurecount > 0 ? azurecount + " " + "Azure ADGroup(s)" : ""
                }
                if (groupcurrentValue > 0 && azurecount > 0) {
                    var servergroupcount = groupcurrentValue > 0 ? groupcurrentValue + " " + "Server Group(s) and" : "";
                    var azureadgroupcount = azurecount > 0 ? azurecount + " " + "Azure ADGroup(s)" : ""
                }
                if (groupcurrentValue > 0 && ad > 0 && azurecount > 0) {
                    var servergroupcount = groupcurrentValue > 0 ? groupcurrentValue + " " + "Server Group(s) ," : "";
                    var activedirectorygroupcount = ad > 0 ? ad + " " + "Active Directory Group(s) and " : "";
                    var azureadgroupcount = azurecount > 0 ? azurecount + " " + "Azure ADGroup(s)" : ""
                }

                $("#groups-delete-confirmation").ejDialog("close");
                onConfirmDeleteGroup(selectedRecords.length);
                SuccessAlert(" Delete Groups", servergroupcount + " " + activedirectorygroupcount + " " + azureadgroupcount + " has been deleted successfully.", 7000);
                parent.$("#group-count").html(currentVal);
                parent.$("#group-count-text").val(currentVal);
                parent.$("#adgroup-count-text").val(adcount);
                parent.$("#azureadgroup-count-text").val(azureadcount);
                if (adcount > 0 && ad < 1 || adcount == 0) {
                    data.AdGroupCount = adcount;
                }
                if (azureadcount > 0 && azurecount < 1 || azureadcount == 0) {
                    data.AzureADGroupCount = azureadcount;
                }
                if (data.AdGroupCount == 0) {
                    $("#ad-indication").html("");
                }
                if (data.AzureADGroupCount == 0) {
                    $("#azure-ad-indication").html("");
                }

            }

            else {
                $("#groups-delete-confirmation").ejDialog("close");
                WarningAlert("Delete Groups", "Failed to delete Group(s), please try again later.", 7000);
            }
            hideWaitingPopup($("#body"));
            $("#body").ejWaitingPopup("hide");
        });
}

function onDeleteDialogClose() {
    $("#groups-delete-confirmation").ejDialog("close");
}

function onDeleteDialogOpen() {
    $("#groups-delete-confirmation").ejDialog("open");
    $("#groups-delete-confirmation").focus();
}
function refreshGroupFooterPosition(height) {
    var docHeight = $(window).height();
    var footerHeight = $("#base_footer_Div").height();
    $("#base_footer_Div").css("margin-top", "0");
    var footerTop = 322 + footerHeight;
    if (footerTop < docHeight) {
        $("#base_footer_Div").css("margin-top", (docHeight - footerTop - 40) + "px");
    }
}
function onConfirmDeleteGroup(count) {
    var groupgrid = $('#Grid').data("ejGrid");
    var currentPage = groupgrid.model.pageSettings.currentPage;
    var pageSize = groupgrid.model.pageSettings.pageSize;
    var totalRecordsCount = groupgrid.model.pageSettings.totalRecordsCount;
    var lastPageRecordCount = groupgrid.model.pageSettings.totalRecordsCount % groupgrid.model.pageSettings.pageSize;
    if (lastPageRecordCount != 0 && lastPageRecordCount <= count) {
        groupgrid.model.pageSettings.currentPage = currentPage - 1;
    }
    groupgrid.refreshContent();
}