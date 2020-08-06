//Control Obj
var autoCompleteControlEle = "";
var autoCompleteControlWrapperEle = "";
var autoCompleteHiddenEle = "";
var query = "";

//Control Instance
var autoCompleteInstance = "";

//AutoComplete Input Wrapper
var autocompleteInputSearchWrapperObj = "";

//Suggestion Listing Obj
var suggestionListWrapperObj = "";

//Data Manager
var dataManagerObj = null;

var userEmailList = [];
var groupIdList = [];

$(function () {
    //Control Obj
    autoCompleteControlEle = $("#user-group-search-input");
    autoCompleteHiddenEle = $("#user-group-search-hidden-input");

    //Control Intialization
    dataManagerObj = ej.DataManager({
        url: shareItemSuggestionListUrl
    });

    query = ej.Query().from("userMentionList").select("Name", "Value");
    autoCompleteControlEle.ejAutocomplete({
        dataSource: dataManagerObj,
        query: query,
        fields: { text: "Name", key: "Value" },
        filterType: ej.filterType.StartsWith,
        watermarkText: window.Server.App.LocalizationContent.UsergroupPlaceholder,
        width: "100%",
        multiSelectMode: ej.MultiSelectMode.VisualMode,
        showPopupButton: false,
        showEmptyResultText: true,
        emptyResultText: window.Server.App.LocalizationContent.NoUserGroup,
        showRoundedCorner: true,
        popupHeight: "120px",
        change: "onChange",
        open: "onSuggestionListOpen",
        close: "onSuggestionListClose",
        showLoadingIcon: false,
        actionBegin: function (args) {
            insertLoaderIcon();
            splitUserGroupList();
            args.model.query._params = [];
            args.model.query._params.push({ key: "searchWord", value: autoCompleteInstance._preVal });
            args.model.query._params.push({ key: "UserEmailList", value: userEmailList });
            args.model.query._params.push({ key: "GroupIdList", value: groupIdList });
        },
        actionComplete: function (args) {
            removeLoaderIcon();
        },
        template: getUserGroupProfilePicture("${Name}", "${Value}", "${Type}", "${IdPReferenceId}"),
    });

    //Control Instance
    autoCompleteInstance = autoCompleteControlEle.data("ejAutocomplete");

    autoCompleteControlWrapperEle = $("#user-group-search-input_wrapper");

    //AutoComplete Input Wrapper
    autocompleteInputSearchWrapperObj = $(".e-in-wrap.e-box.e-corner");

    //Suggestion Listing Obj

    suggestionListWrapperObj = $("#user-group-search-input_suggestion");

    //Suggestion List Scroller
    var suggestionListScrollerHeight = 120;
    suggestionListWrapperObj.ejScroller({
        height: suggestionListScrollerHeight,
        width: "100%",
        scrollerSize: 7,
        buttonSize: 0,
        enableTouchScroll: true
    });

    var scrollercontrol = suggestionListWrapperObj.ejScroller("instance");
    scrollercontrol.model.height = suggestionListScrollerHeight;
    scrollercontrol.refresh();
    $("#user-group-search-input_suggestion .e-scrollbar").show();
    isSharePermissionLoaded = true;
});


//GetSuggestionList
function getSuggestionForItem(keyword) {
    $.xhrPool.abortAll();
    var itemId = autoCompleteHiddenEle.attr("data-item-id");
    if (keyword.trim() != "") {
        $.ajax({
            type: "get",
            url: shareItemSuggestionListUrl,
            data: {
                searchWord: keyword,
                itemId: itemId
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                autoCompleteInstance.model.dataSource = result;
                autoCompleteInstance._OnTextEnter();
            }
        });
    }
}

function onChange(args) {
    //getSuggestionForItem(autoCompleteInstance._preVal);
    if (args.value != "" && autoCompleteInstance.getValue() != "") {
        shareBtnObj.show();
        manageAccessCancelBtnObj.show();
        manageAccessSaveBtnObj.hide();
        shareDoneBtnObj.hide();
        manageUserGroupContainer.addClass("disable-element-opacity");
    } else {
        shareBtnObj.hide();
        manageAccessSaveBtnObj.hide();
        manageAccessCancelBtnObj.hide();
        shareDoneBtnObj.show();
        manageUserGroupContainer.removeClass("disable-element-opacity");
    }
}

function splitUserGroupList() {
    userEmailList = [];
    groupIdList = [];
    var selectedItemArr = getSelectedItems();

    $.each(selectedItemArr, function (index, item) {
        if (isNaN(item.Value) && item.Type == "user") {
            userEmailList.push(item.Value);
        } else {
            groupIdList.push(item.Value);
        }
    });
}

function refreshAutoComplete() {
    autoCompleteControlEle.ejAutocomplete("clearText");
}

function getSelectedItems() {
    return autoCompleteControlEle.ejAutocomplete("getSelectedItems");
}

function enableAutomCompleteControl() {
    refreshAutoComplete();
    autoCompleteControlEle.ejAutocomplete("enable");
    autoCompleteControlWrapperEle.find(".e-in-wrap.e-box.e-corner").removeClass("disable-autocomplete");
}

function disableAutomCompleteControl() {
    refreshAutoComplete();
    autoCompleteControlEle.ejAutocomplete("disable");
    autoCompleteControlWrapperEle.find(".e-in-wrap.e-box.e-corner").addClass("disable-autocomplete");
}

function getUserGroupProfilePicture(Name, Value, Type, IdPReferenceId) {

    return "<div class='col-xs-2 no-padding search-user-group-img-container'><div class='group-logo'><i class='su su-" + Type + "'></i></div></div><div class='col-xs-9 no-padding search-user-group-display-name-container'><div class='search-user-group-display-name'><span>" + Name + "</span></div></div>";
}

function insertLoaderIcon() {
    var domEle = "<div class='auto-complete-search-loader'></div>";
    autoCompleteControlWrapperEle.prepend(domEle);
}

function removeLoaderIcon() {
    autoCompleteControlWrapperEle.find(".auto-complete-search-loader").remove();
}