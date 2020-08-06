var initialQueryString = ""
var initialQueryStringParameter = "";
var updateInitialQueryStringParameter = "";

//Save filter post action
$(document).on("click", "#save-button", function () {
    name = $("#user-name").attr("value");
    id = $("#user-id").attr("value");
    saveFilterName = $("#view-name").val();
    isDefaultView = $("#default-view").is(":checked");
    AddView();
});

//Add View Name Function
function AddView() {
    var _data = "Datas";     
    var queryString = parent.getcurrentfilters().encryptedData;    
    var dashboardViewDiv = document.getElementById("dashboard-views");
    pageurl = typeof pageurl != "undefined" ? pageurl : viewUrl;

    if ($("#save-view-form").valid()) {
        parent.$("#save-view-popup_wrapper").ejWaitingPopup("show");            
        var itemRequest = { name: _data, itemViewName: saveFilterName, queryString: queryString, itemId: parent.$("#dashboard").prevAll("#favorite_Item").attr("data-item-id"), userId: parent.userId, userName: parent.userName, isMultiDashboard: parent.urlHasMultiTab, parentDashboardId: parent.multiTabId, itemType: parent.dashboardItemDetail.ItemType, isDefault: isDefaultView };          
        parent.ajaxPostCall("POST", addViewUrl, itemRequest, null, saveViewResult, errorSaveView, null);      
    }
}

function saveViewResult(data) {
    if (data.StatusMessage.trim().toLowerCase() == "name already exists") {
        $(".validation-errors").html("View Name already exists.");
        $("#view-name").addClass("has-error");
    }
    else {
        var link = "";
        var queryString = parent.getcurrentfilters().encryptedData;
        closeSaveViewPopup();
        clearStatus = true;
        initialQueryString = queryString;
        initialQueryStringParameter = JSON.stringify(updateInitialQueryStringParameter);
        messageBox("su-filter", window.Server.App.LocalizationContent.AddView, window.Server.App.LocalizationContent.AddViewSuccess, "success", function () {
            onCloseMessageBox();
            var parentDashboardViewsEle = parent.$("#dashboard-view-toogle");
            parentDashboardViewsEle.ejWaitingPopup("show");
            parentDashboardViewsEle.find("#no-filters").css("display", "none");
            parentDashboardViewsEle.ejWaitingPopup("hide");
        });

        var savedViewId = data.ItemsView[0].ViewId;
        $("#update-view").attr("viewid", savedViewId);
        $("#save-section").hide();
        $("#save-lable-section label").html("");
        link = '<a class="saved-view-link txt-overflow" href="' + pageurl + '?viewid=' +
            savedViewId + '" target="_blank" data-toggle="tooltip" data-original-title="' + saveFilterName + '">' +
            saveFilterName +
            '</a>';
        $("#save-lable-section label").append(link);
        $("#save-lable-section").show();
        $("#new-save").hide();
        $("#saved-filter-update").show();
        $("#update-view").addClass("pointer-events");
        $("#update-view").css("opacity", 0.5);
        $("#saved-filter-Saveas").hide();
        parent.GetSavedFilter();
        parent.refreshScroller();
    }
    parent.$('#dashboard').data("ejDashboardDesigner")._updateFilterOverview(saveFilterName, savedViewId);
    $("#dashboard-view-toogle").ejWaitingPopup("hide");
    parent.$("#save-view-popup_wrapper").ejWaitingPopup("hide");
}

function errorSaveView(data) {
    messageBox("su-filter", window.Server.App.LocalizationContent.AddView, window.Server.App.LocalizationContent.InternalServerError, "success", function () {
        onCloseMessageBox();
    });
    $("#dashboard-view-toogle").ejWaitingPopup("hide");
    parent.$("#save-view-popup_wrapper").ejWaitingPopup("hide");
}

function closeSaveViewPopup() {
    parent.$("#save-view-popup-iframe").contents().find("#save-view-form").html("");
    parent.$("#save-view-popup_wrapper").ejWaitingPopup("hide");
    parent.$("#save-view-popup").ejDialog("close");
}

function notifyAlert() {
    var isDefaultValueEnabled = $('.material-switch input[type="checkbox"]').is(":checked");
    if (!isDefaultValueEnabled) {
        $(".tool-tip").css("display", "inline");
        $(".default-msg").text(window.Server.App.LocalizationContent.DefaultViewEnabled);
    }
    else {
        $(".default-msg").text(window.Server.App.LocalizationContent.DefaultViewDisabled);
    }
}