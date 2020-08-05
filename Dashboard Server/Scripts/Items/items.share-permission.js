var isWidget = false;

//Dialog Obj
var sharePermissionDlgObj = "";
var sharePermissionDlgWrapperObj = "";
var sharePermisisonDlgHeader = "";
var sharePermissionDlgHeaderItemName = "";

//Container Obj

var sharePermissionConatiner = "";
var accessModeContainer = "";
var dummyContainer = "";
var embedCodeContainer = "";

//Section Obj
var sharePermissionDashboardSettingSectionObj = "";
var sharePermissionPublicSectionObj = "";
var sharePermissionPrivateSectionObj = "";
var sharePermissionUserGroupSectionObj = "";
var manageUserGroupContainer = "";
var manageUserGroupBodySection = "";
var getEmbedLinkSection = "";
var embedConfiguration = "";

//Change indicator banner obj
var changeIndicatorBannerObj = "";

//Label Obj

var shareWithLabelObj = "";

//Get Link

var getLinkInputObj = "";
var getLinkCopyLinkobj = "";
var getEmbedCodeInputObj = "";
var getEmbedCodeCopyBtnobj = "";

//Link Obj
var accessModeChangeLink = "";

//Button Obj
var manageAccessButton = "";
var manageAccessBackButton = "";
var manageAccessSaveBtnObj = "";
var manageAccessCancelBtnObj = "";
var shareDoneBtnObj = "";
var shareBtnObj = "";
var accessModeChngBtnObj = "";
var accessModeCancelBtnObj = "";
var embedCodeDoneBtnObj = "";

//RadioButtonObj
var publicRadioBtnObj = "";
var privateRadioBtnObj = "";

//Boolean Values
var isItemPublic = false;
var isEntireDOMRendered = false;

//Access Mode
var accessModeSelectionInput = "";

//Angular Definition
var sharedUserGroupsPreservedList = [];
var sharedAccessModePreservedList = [];

//Marked for delete
var markForDeleteBtnObj = "";
var removeMarkForDeleteBtnObj = "";

//toggle container obj

var toggleMarkForDeletionObj = "";

//Update Permission Variables
var modifiedItemIndex = [];
var addNewItemPermission = [];
var userMarkedForDeletionList = [];
var groupMarkedForDeletionList = [];

//SharedUserGroupInfoVariables
var showSharedUserGroupContainer = "";
var showSharedUserGroupNameSection = "";
var showSharedUserGroupName = "";
var showSharedUserGroupCountSection = "";
var showSharedUserGroupCount = "";

//Current Item Detail
var currentItemDetail = [];
var currentDashboardDetail = [];

////////////

var shareItem = angular.module('serverApp');

shareItem.controller('shareItemController', ["$scope", function ($scope) {
    $scope.currentUserId = window.currentUserId;
    $scope.sharedUserGroups = window.sharedUserGroupList;
    $scope.accessModes = window.accessModeList;
    $scope.showPopover = false;
    $scope.currentItemType = ItemType.Dashboard;
    $scope.isAdmin = false;
    $scope.isDashboardPublic = false;
    $scope.formatAccessModeString = function (key) {
        return key.toString();
    };
    $scope.ImageLink = function (idpRefrenceId) {

        return idpUrl + "/User/Avatar?id=" + idpRefrenceId + "&ImageSize=64";
    };
    var colorCodes = ['#4FDFDB', '#BDDF4F', '#F3DF4C', '#FC9C61', '#CBA6FF', '#77BDFF'];

    $scope.GetGroupColor = function (targetGroupColor, index) {
        var color = colorCodes[((index + 1) % colorCodes.length) - 1];
        if (targetGroupColor != "") {
            return { 'background-color': '#dfdfdf' };
        } else {
            return { 'background-color': '#dfdfdf' };
        }
    };

    $scope.typeOptions = [{ Key: 2, Value: 'Read' }];

    $scope.parseInt = function (number) {
        return parseInt(number, 10);
    };

    $scope.updateValue = function (newValue, index) {
        $scope.CheckForModification(newValue, index);
    };

    $scope.MarkForDeletion = function (event, newValue, index) {
        $scope.AddItemInUserGroupDeletionList(index);
        //Remove Index Change
        $scope.RemoveFromModified(index);
        var childElems = angular.element(event.currentTarget).parents(".shared-user-group-list-section").children()
        childElems.find('.action-for-delete-container').hide();
        childElems.find('.marked-for-delete-container').show();
        childElems.find(".change-indicator").show();
        $scope.ShowChangeIndicatorBanner();
    };

    $scope.RemoveMarkForDeletion = function (event, newValue, index) {
        $scope.RemoveItemInUserGroupDeletionList(index);
        var childElems = angular.element(event.currentTarget).parents(".shared-user-group-list-section").children()
        childElems.find('.marked-for-delete-container').hide();
        childElems.find('.action-for-delete-container').show();
        childElems.find(".change-indicator").hide();
        $scope.CheckForModification(newValue, index);
    };

    $scope.CheckForModification = function (newValue, index) {
        if (currentItemDetail.ItemType != ItemType.ItemView) {
            if (sharedUserGroupsPreservedList[index].PermissionAccess != newValue) {
                $scope.AddToModified(index);
                $("#select_" + index).parents(".shared-user-group-list-section").children().find(".change-indicator").show();
            } else if ((sharedUserGroupsPreservedList[index].PermissionAccess == newValue)) {
                $scope.RemoveFromModified(index);
                $("#select_" + index).parents(".shared-user-group-list-section").children().find(".change-indicator").hide();
            }
            $scope.ShowChangeIndicatorBanner();
        }
    };

    $scope.ShowChangeIndicatorBanner = function () {
        if ($(".change-indicator").is(":visible")) {
            changeIndicatorBannerObj.css("visibility", "visible");
            manageAccessSaveBtnObj.show();
            manageAccessCancelBtnObj.show();
            shareDoneBtnObj.hide();
            disableAutomCompleteControl();
            disableAutocompleteAccessModeSelection()
        } else {
            changeIndicatorBannerObj.css("visibility", "hidden");
            resetPreRequestValues();
            manageAccessSaveBtnObj.hide();
            manageAccessCancelBtnObj.hide();
            shareDoneBtnObj.show();
            enableAutomCompleteControl();
            enableAutocompleteAccessModeSelection();
        }
    };

    $scope.AddItemInUserGroupDeletionList = function (index) {

        //check for user deletion
        if ($scope.IsUserItem(index)) {
            if (jQuery.inArray(sharedUserGroupsPreservedList[index].PermissionId, userMarkedForDeletionList) == -1) {
                userMarkedForDeletionList.push(sharedUserGroupsPreservedList[index].PermissionId);
            }
        }
        else if ($scope.IsGroupItem(index)) {
            //check for group deletion
            if (jQuery.inArray(sharedUserGroupsPreservedList[index].PermissionId, groupMarkedForDeletionList) == -1) {
                groupMarkedForDeletionList.push(sharedUserGroupsPreservedList[index].PermissionId);
            }
        }
    };

    $scope.RemoveItemInUserGroupDeletionList = function (index) {

        //check for user deletion
        if ($scope.IsUserItem(index)) {
            if (jQuery.inArray(sharedUserGroupsPreservedList[index].PermissionId, userMarkedForDeletionList) != -1) {
                userMarkedForDeletionList = jQuery.grep(userMarkedForDeletionList, function (value) {
                    return value != sharedUserGroupsPreservedList[index].PermissionId;
                });
            }
        }
        else if ($scope.IsGroupItem(index)) {
            //check for group deletion
            if (jQuery.inArray(sharedUserGroupsPreservedList[index].PermissionId, groupMarkedForDeletionList) != -1) {
                groupMarkedForDeletionList = jQuery.grep(groupMarkedForDeletionList, function (value) {
                    return value != sharedUserGroupsPreservedList[index].PermissionId;
                });
            }
        }
    };

    $scope.AddToModified = function (index) {
        //Change Happended
        if (jQuery.inArray(index, modifiedItemIndex) == -1) {
            modifiedItemIndex.push(index);
        }
    };

    $scope.RemoveFromModified = function (index) {
        //Remove from Modified
        modifiedItemIndex = jQuery.grep(modifiedItemIndex, function (value) {
            return value != index;
        });
    }

    $scope.IsUserItem = function (index) {
        return sharedUserGroupsPreservedList[index].Email != null && sharedUserGroupsPreservedList[index].IsUserPermission && sharedUserGroupsPreservedList[index].TargetUserId > 0;
    };

    $scope.IsGroupItem = function (index) {
        return sharedUserGroupsPreservedList[index].Email == null && !sharedUserGroupsPreservedList[index].IsUserPermission && sharedUserGroupsPreservedList[index].TargetGroupId > 0;
    };

    $scope.GetManagePermisisionContent = function (index) {
        var content = window.Server.App.LocalizationContent.AccessPermission;
        if ($scope.IsUserItem(index)) {
            content = content + window.Server.App.LocalizationContent.UserPermission + "<strong>" + sharedUserGroupsPreservedList[index].PermissionEntityDescription + "</strong>.</br></br>";


            if (isAdmin) {
                var userEditLink = editUserPermissionUrl + "?userId=" + sharedUserGroupsPreservedList[index].TargetUserId;
                return content + window.Server.App.LocalizationContent.ManageUserPermission + "<a target='_blank' href='" + userEditLink + "'>" + window.Server.App.LocalizationContent.Here + "</a >."
            } else {
                return content + window.Server.App.LocalizationContent.AccessUserpermission;
            }

        } else {
            content = content + window.Server.App.LocalizationContent.GroupPermission + "<strong>" + sharedUserGroupsPreservedList[index].PermissionEntityDescription + "</strong>.</br></br>";

            if (isAdmin) {
                var groupEditLink = editGroupPermissionUrl + "?groupId=" + sharedUserGroupsPreservedList[index].TargetGroupId;
                return content + window.Server.App.LocalizationContent.ManageGroupPermission + "<a target='_blank' href='" + groupEditLink + "'>" + window.Server.App.LocalizationContent.Here + "</a>."
            } else {
                return content + window.Server.App.LocalizationContent.AccessGroupPermission;
            }
        }
    }
}]);

$(function () {
    //Dialog Obj
    sharePermissionDlgObj = $("#share-permission-popup");
    sharePermisisonDlgHeader = $("#share-permission-dialog-header");
    sharePermissionDlgHeaderItemName = $(".item-name-container #item-name-header");

    //Container Obj

    sharePermissionConatiner = $("#share-permission-container");
    accessModeContainer = $("#access-mode-container");
    dummyContainer = $("#dummy-container");
    embedCodeContainer = $("#get-embed-code-container");

    //Section Obj
    sharePermissionDashboardSettingSectionObj = $(".share-permission-dashboard-setting-section");
    sharePermissionPublicSectionObj = $(".share-permission-public-section");
    sharePermissionPrivateSectionObj = $(".share-permission-private-section");
    sharePermissionUserGroupSectionObj = $("#assign-user-group-container");
    manageUserGroupContainer = $("#manage-user-group-container");
    manageUserGroupBodySection = $(".manage-user-group-body-section");
    getEmbedLinkSection = $(".get-item-embed-link-section");
    embedConfiguration = $(".embed-configuration");

    //Change indicator banner obj

    changeIndicatorBannerObj = $(".changes-indicator-banner");

    //Label Obj
    shareWithLabelObj = $(".share-with-label");

    //Get Link
    getLinkInputObj = $("#item-url");
    getLinkCopyLinkobj = $("#item-url-copy");
    getEmbedCodeInputObj = $("#embed-code");
    getEmbedCodeCopyBtnobj = $("#copy-embed-code");

    //Link Obj
    accessModeChangeLink = $("#access-mode-change-link");

    //Button Obj
    manageAccessButton = $("#manage-access-button");
    manageAccessBackButton = $("#manage-access-back-button")
    manageAccessSaveBtnObj = $("#manage-access-save-button");
    manageAccessCancelBtnObj = $("#manage-access-cancel-button");
    shareDoneBtnObj = $("#share-done-popup-button");
    shareBtnObj = $("#share-permission-button");
    accessModeChngBtnObj = $("#access-mode-change-button");
    accessModeCancelBtnObj = $("#access-mode-cancel-button");
    embedCodeDoneBtnObj = $("#copy-embed-code-done-button");

    //RadioButtonObj
    publicRadioBtnObj = $("#public-access-mode");
    privateRadioBtnObj = $("#private-access-mode");

    //Access Mode
    accessModeSelectionInput = $("#access-mode-selection");

    //Marked for delete
    markForDeleteBtnObj = $(".mark-for-deletion-icon");
    removeMarkForDeleteBtnObj = $(".remove-mark-for-deletion-icon");

    //SharedUserGroupInfoVariables
    showSharedUserGroupContainer = $("#show-shared-user-group-container");
    showSharedUserGroupNameSection = $(".shared-user-group-name-section");
    showSharedUserGroupName = $(".shared-user-group-name");
    showSharedUserGroupCountSection = $(".shared-user-group-count-section");
    showSharedUserGroupCount = $(".shared-user-group-count");

    //toggle container obj

    toggleMarkForDeletionObj = $('.action-for-delete-container, .marked-for-delete-container');

    $("#permission-popup").ejDialog({
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        width: "900px",
        title: "",
        showHeader: false,
        enableModal: true,
        close: "DialogBoxClose",
        closeOnEscape: true
    });

    var permissionWaitingPopupTemplateId = createLoader("permission-popup_wrapper");
    $("#permission-popup_wrapper").ejWaitingPopup({ template: $("#" + permissionWaitingPopupTemplateId) });

    ////Share Permission Dialog
    sharePermissionDlgObj.ejDialog({
        width: '529px',
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        showHeader: false,
        enableModal: true,
        closeOnEscape: false,
        close: "onSharePermissionPopupClose",
        open: "onSharePermissionPopupOpen",
        closeOnEscape: true
    });
    sharePermissionDlgWrapperObj = $("#share-permission-popup_wrapper");
    var sharePermissionLinkWaitingPopupTemplateId = createLoader("share-permission-popup_wrapper");
    sharePermissionDlgWrapperObj.ejWaitingPopup({ template: $("#" + sharePermissionLinkWaitingPopupTemplateId) });

    $("#share-close-popup, #share-done-popup-button").on("click", function () {
        sharePermissionDlgObj.ejDialog("close");
        if (isWidget) {
            sharePermissionConatiner.show();
            embedCodeContainer.hide();
            embedConfiguration.show();
            manageAccessButton.hide();
            isWidget = false;
        }
    });

    accessModeCancelBtnObj.on("click", function () {
        showSharePermissionContainer();
    });

    manageAccessButton.on("click", function () {
        showManageAccessContainer();
    });

    manageAccessBackButton.on("click", function () {
        showSharePermissionContainerWithRefresh();
    });

    manageAccessSaveBtnObj.on("click", function () {
        $('[data-toggle="popover"]').popover('hide');
        sharePermissionDlgWrapperObj.ejWaitingPopup("show");
        prepareRequestForAddItemPermission();
        updateBulkItemPermission();
    });

    manageAccessCancelBtnObj.on("click", function () {
        manageAccessCancelBtn();
    });

    //Get Link

    getLinkCopyLinkobj.on("click", function (e) {
        getLinkInputObj.select();
        if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
            getLinkCopyLinkobj.attr("data-original-title", "");
        }
        else {
            document.execCommand('copy');
            getLinkCopyLinkobj.attr("data-original-title", window.Server.App.LocalizationContent.Copysuccess);
            getLinkCopyLinkobj.tooltip("hide").attr("data-original-title", window.Server.App.LocalizationContent.Copysuccess).tooltip("fixTitle").tooltip("show");
            setTimeout(function () { getLinkCopyLinkobj.attr("data-original-title", window.Server.App.LocalizationContent.LinkCopy); getLinkCopyLinkobj.tooltip(); }, 3000);
        }
    });

    getLinkCopyLinkobj.removeClass("focusdiv");
    getLinkInputObj.on("focusin", function () {
        getLinkCopyLinkobj.addClass("focusdiv");
    });
    getLinkInputObj.on("focusout", function () {
        getLinkCopyLinkobj.removeClass("focusdiv");
    });

    //Access Mode

    $("input[type=radio][name=access-mode]").on("change", function () {
        if ((isItemPublic && privateRadioBtnObj.prop('checked')) || (!isItemPublic && publicRadioBtnObj.prop('checked'))) {
            accessModeChngBtnObj.removeAttr('disabled');
        } else {
            accessModeChngBtnObj.attr('disabled', true);
        }
    });

    $(document).on("click", "#access-mode-change-button", function (e) {
        var itemId = $(this).attr("data-item-id");
        var itemName = $(this).attr("data-name");
        var itemTypeId = $(this).attr("data-itemtype");
        var requestUrl = "";
        if (isItemPublic && privateRadioBtnObj.prop('checked')) {
            requestUrl = removeItemPublicUrl;
        }
        else if (!isItemPublic && publicRadioBtnObj.prop('checked')) {
            requestUrl = makeItemPublicUrl;
        }

        $.ajax({
            type: "POST",
            url: requestUrl,
            data: { itemId: itemId, itemTypeId: itemTypeId, itemName: itemName },
            success: function (data) {
                if (data.validation && data.result) {
                    if (typeof (ResetItemList) == 'function') {
                        ResetItemList(ItemType.Dashboard);
                    }

                    if (typeof (currentItemDetail) != "undefined" && typeof (currentItemDetail.IsPublic) != "undefined") {
                        currentItemDetail.IsPublic = !currentItemDetail.IsPublic;
                    }
                } else {
                    WarningAlert("", window.Server.App.LocalizationContent.InternalServerError, 7000);
                }
            },
            error: function () {
                WarningAlert("", window.Server.App.LocalizationContent.InternalServerError, 7000);
            }
        });

        if (isItemPublic && privateRadioBtnObj.prop('checked')) {
            showSharePermissionContainer();
            showPrivateContent();
            isItemPublic = false;
        }
        else if (!isItemPublic && publicRadioBtnObj.prop('checked')) {
            showSharePermissionContainer();
            showPublicContent();
            isItemPublic = true;
        }
    });

    $(document).on('shown.bs.dropdown', '.user-group-scroll-content .change-access-mode-select', function () {
        $(".tooltip").hide();
        if ($(this).find(".change-access-mode-selection").length > 0) {
            var parentElement = manageUserGroupBodySection;
            var availableTopHeight = $(this).offset().top + $(this).outerHeight(true) / 2 - parentElement.offset().top;
            var availableBottomHeight = parentElement.height() - ($(this).offset().top - parentElement.offset().top + $(this).outerHeight(true) / 2);
            var dropDownHeight = $(this).find(".change-access-mode-selection .dropdown-menu").outerHeight(true);
            if (availableBottomHeight <= dropDownHeight && availableTopHeight >= dropDownHeight) {
                $(this).find(".change-access-mode-selection").removeClass("dropdown").addClass("dropup");
            } else {
                refreshUserGroupScroll();
            }
        }
    });

    $.views.helpers({
        getUserGroupLogo: function (Type) {

            if (Type == 'user') {
                return "<img src='' alt='Profile Picture' id='' onerror='' >";
            } else {
                return "<div class='group-logo' style=''> <i class='su su-group-1'></i></div >";
            }
        }

    });

    $('body').on('click', function (e) {
        if ($(e.target).data('toggle') !== 'popover'
            && $(e.target).parents('[data-toggle="popover"]').length === 0
            && $(e.target).parents('.popover.in').length === 0) {
            $('[data-toggle="popover"]').popover('hide');
        } else if ($(e.target).data('toggle') == 'popover') {
            $(".access-info-icon").not(e.target).popover('hide');
        }
    });

    getEmbedCodeInputObj.on("click", function (e) {
        getEmbedCodeInputObj.select();
    });

    getEmbedCodeCopyBtnobj.on("click", function (e) {
        getEmbedCodeInputObj.select();
        document.execCommand('copy');
        var embedSuccess = $(".embed-copy-success");
        embedSuccess.show();
        setTimeout(function () {
            embedSuccess.fadeOut(3000);
        }, 3000);
    });

    embedCodeDoneBtnObj.on("click", function () {
        sharePermissionDlgObj.ejDialog("close");
    });

    $(".embed-configuration [type='checkbox']").on("change", function (e) {
        $("#embed-code").val(generateEmbedCode(currentItemDetail));
    });
});

function manageAccessCancelBtn() {
    $('[data-toggle="popover"]').popover('hide');
    resetToActualScope();
    enableAutomCompleteControl();
    enableAutocompleteAccessModeSelection();
}

function shareDashboardPermission(itemDetail, dashboardDetail) {
    currentItemDetail = itemDetail;
    currentDashboardDetail = dashboardDetail;
    var scope = angular.element('#share-permission-content-section').scope();
    scope.currentItemType = itemDetail.ItemType;
    scope.isAdmin = isAdmin;
    if (dashboardDetail != null) {
        scope.isDashboardPublic = dashboardDetail.IsPublic;
    }

    if (itemDetail.ItemType == ItemType.Category || itemDetail.ItemType == ItemType.Datasource) {
        sharePermissionDlgObj.ejDialog({ height: 241 });
    } else if (itemDetail.ItemType == ItemType.Slideshow) {
        sharePermissionDlgObj.ejDialog({ height: 356 });
    } else if (itemDetail.ItemType == ItemType.ItemView) {
        sharePermissionDlgObj.ejDialog({ height: 418 });
    } else {
        if (isMarkItemsPublic) {
            if (itemDetail.IsMultiDashboard) {
                if (itemDetail.IsPublic) {
                    sharePermissionDlgObj.ejDialog({ height: 407 });
                } else {
                    sharePermissionDlgObj.ejDialog({ height: 391 });
                }
            } else {
                if (itemDetail.IsPublic) {
                    sharePermissionDlgObj.ejDialog({ height: 434 });
                } else {
                    sharePermissionDlgObj.ejDialog({ height: 418 });
                }
            }
        } else {
            if (itemDetail.IsMultiDashboard) {
                sharePermissionDlgObj.ejDialog({ height: 335 });
            } else {
                sharePermissionDlgObj.ejDialog({ height: 362 });
            }
        }
    }

    sharePermissionDlgHeaderItemName.text(itemDetail.Name);
    sharePermissionDlgObj.show();
    $("#share-permission-popup_wrapper, #user-group-search-input_suggestion").addClass("custom-bootstrap-styles");
    sharePermissionDlgObj.ejDialog("open");

    //Show Hide Public Private section
    if (itemDetail.ItemType == ItemType.Dashboard || itemDetail.ItemType == ItemType.ItemView) {
        if (itemDetail.CreatedById == currentUserId || isAdmin) {

            if (isMarkItemsPublic || itemDetail.ItemType == ItemType.ItemView) {
                if (itemDetail.IsPublic) {
                    showPublicContent();
                } else {
                    showPrivateContent();
                }
            } else {
                showDashboardSettingContent();
            }

            addAttributeValueToBtnEle(itemDetail);
        } else {
            hidePublicPrivateContent();
            if (itemDetail.IsMultiDashboard) {
                sharePermissionDlgObj.ejDialog({ height: 312 });
            } else {
                sharePermissionDlgObj.ejDialog({ height: 339 });
            }
        }
    } else {
        hidePublicPrivateContent();
    }

    //Show Hide Share Permsission Section
    if (itemDetail.CreatedById == currentUserId || isAdmin) {
        showShareUserGroupPermissionSection();
        getShareItemPermission(itemDetail.Id);

        addAttributeValueToBtnEle(itemDetail);
        addAttributeValueToAutoCompleteEle(itemDetail);
    } else {
        hideShareUserGroupPermissionSection();
    }

    if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
        $("#item-url-copy").hide();
        $("#item-url").css({ width: "100%", borderRadius: "4px" });
        $("#item-url-copy").attr("data-original-title", "");
    }
    else {
        $("#item-url-copy").tooltip({
            animation: false
        });
    }

    switch (itemDetail.ItemType) {
        case ItemType.Dashboard:
            $("#item-url").val(getDashboardShareLink(itemDetail.Id, itemDetail.CategoryName, itemDetail.Name));
            break;
        case ItemType.ItemView:
            var embedViewLink = getDashboardShareLink(dashboardDetail.Id, dashboardDetail.CategoryName, dashboardDetail.Name);
            $("#item-url").val(embedViewLink + "?viewid=" + itemDetail.Id);
            break;
        case ItemType.Slideshow:
            var baseUrlArray = baseUrl.split('/');
            $("#item-url").val(baseUrlArray[0] + "//" + baseUrlArray[2] + slideShowUrl + "/" + itemDetail.Id + "/" + itemDetail.Name);
            break;
        default:
            $("#item-url").val("");
            break;
    }
}

function onSharePermissionPopupOpen(args) {
    $('[data-toggle="popover"]').popover('hide');
    sharePermissionDlgWrapperObj.ejWaitingPopup("refresh");
    showSharePermissionContainer();
}

function onSharePermissionPopupClose(args) {
    currentItemDetail = [];
    $(".embed-configuration [type='checkbox']").removeAttr("checked");
    $('[data-toggle="popover"]').popover('hide');
    showSharePermissionContainer();
    sharePermissionDlgWrapperObj.ejWaitingPopup("refresh");
    sharePermissionDlgWrapperObj.ejWaitingPopup("hide");
    refreshDialogBoxPosition();
}

function showAccessModeContainer() {
    sharePermisisonDlgHeader.text(window.Server.App.LocalizationContent.SharePermissionAccessMode);
    accessModeContainer.show();
    accessModeChngBtnObj.show();
    accessModeCancelBtnObj.show();
    sharePermissionConatiner.hide();
    manageAccessButton.hide();
    shareBtnObj.hide();
    shareDoneBtnObj.hide();
    refreshDialogBoxPosition();
}
function showManageAccessContainer() {
    hidePublicPrivateContent();
    showSharedUserGroupContainer.hide();
    //shareWithLabelObj.text(window.Server.App.LocalizationContent.AddPeople);
    shareBtnObj.text(window.Server.App.LocalizationContent.AddPeopleBtn);
    sharePermisisonDlgHeader.text(window.Server.App.LocalizationContent.ManageAccess);
    dummyContainer.hide();
    if (autoCompleteInstance.getValue() == "") {
        shareBtnObj.hide();
    }
    manageAccessBackButton.show();
    manageUserGroupContainer.show();
    manageAccessButton.hide();
    refreshUserGroupScroll();
    refreshDialogBoxPosition();
    generateProfileAvatar();
}

function hideManageAccessContainer() {
    manageUserGroupContainer.hide();
    manageAccessSaveBtnObj.hide();
    manageAccessCancelBtnObj.hide();
    embedCodeDoneBtnObj.hide();
    embedCodeContainer.hide();
    changeIndicatorBannerObj.css("visibility", "hidden");
    resetPreRequestValues();
}

function showSharePermissionContainer() {
    sharePermisisonDlgHeader.text(window.Server.App.LocalizationContent.SharePermissionDefault);
    dummyContainer.show();
    //shareWithLabelObj.text(window.Server.App.LocalizationContent.ShareInviteLabel);
    shareBtnObj.text(window.Server.App.LocalizationContent.SharePeopleBtn);
    enableAutocompleteAccessModeSelectionWithoutReset();
    refreshAutoComplete();
    sharePermissionConatiner.show();
    manageAccessButton.show();
    shareDoneBtnObj.show();
    manageAccessBackButton.hide();
    hideManageAccessContainer();
    accessModeContainer.hide();
    accessModeChngBtnObj.hide();
    accessModeCancelBtnObj.hide();
    displaySharedUserGroupInfo();
    if (currentItemDetail.ItemType == ItemType.Dashboard) {
        if (typeof (currentItemDetail.Extension) != "undefined" && (!currentItemDetail.IsMultiDashboard && currentItemDetail.Extension.toLowerCase() == ".sydj")) {
            getEmbedLinkSection.show();
        } else {
            getEmbedLinkSection.hide();
        }
    } else if (currentItemDetail.ItemType == ItemType.ItemView) {
        getEmbedLinkSection.show();
    }

    embedCodeDoneBtnObj.hide();
    sharePermissionDlgHeaderItemName.show();
    sharePermisisonDlgHeader.css("line-height", "");
    refreshDialogBoxPosition();
}

function showSharePermissionContainerWithRefresh() {
    $('[data-toggle="popover"]').popover('hide');
    resetToActualScope();
    hideManageAccessContainer();
    enableAutocompleteAccessModeSelectionWithoutReset();
    sharePermisisonDlgHeader.text(window.Server.App.LocalizationContent.SharePermissionDefault);
    displaySharedUserGroupInfo();
    dummyContainer.show();
    shareBtnObj.text(window.Server.App.LocalizationContent.SharePeopleBtn);
    showPublicPrivateContent();
    sharePermissionConatiner.show();
    manageAccessButton.show();
    if (autoCompleteInstance.getValue() != "") {
        shareBtnObj.show();
        manageAccessCancelBtnObj.show();
        shareDoneBtnObj.hide();
    } else {
        shareDoneBtnObj.show();
    }

    manageAccessBackButton.hide();
    accessModeContainer.hide();
    accessModeChngBtnObj.hide();
    accessModeCancelBtnObj.hide();
    refreshDialogBoxPosition();
}
function showDashboardSettingContent() {
    sharePermissionPublicSectionObj.hide();
    sharePermissionPrivateSectionObj.hide();
    sharePermissionDashboardSettingSectionObj.show();
}

function showPublicContent() {
    sharePermissionPublicSectionObj.show();
    sharePermissionPrivateSectionObj.hide();
    isItemPublic = true;
}

function showPrivateContent() {
    sharePermissionPublicSectionObj.hide();
    sharePermissionPrivateSectionObj.show();
    isItemPublic = false;
}

function showPublicOrPrivateContent() {
    if (isItemPublic) {
        showPublicContent();
    } else {
        showPrivateContent();
    }
}

function showShareUserGroupPermissionSection() {
    sharePermissionUserGroupSectionObj.show();
}

function hideShareUserGroupPermissionSection() {
    sharePermissionUserGroupSectionObj.hide();
}

function hidePublicPrivateContent() {
    sharePermissionPublicSectionObj.hide();
    sharePermissionPrivateSectionObj.hide();
    sharePermissionDashboardSettingSectionObj.hide();
}

function showPublicPrivateContent() {
    if (currentItemDetail.ItemType == ItemType.Dashboard || currentItemDetail.ItemType == ItemType.ItemView) {
        if (currentItemDetail.CreatedById == currentUserId) {
            if (isMarkItemsPublic || currentItemDetail.ItemType == ItemType.ItemView) {
                if (isItemPublic) {
                    sharePermissionPublicSectionObj.show();
                } else {
                    sharePermissionPrivateSectionObj.show();
                }
            } else {
                sharePermissionDashboardSettingSectionObj.show();
            }
        } else {
            hidePublicPrivateContent();
        }
    } else {
        hidePublicPrivateContent();
    }
}

function changeAccessMode() {
    manageAccessCancelBtn();
    sharePermissionDlgWrapperObj.ejWaitingPopup("show");
    showAccessModeContainer();
    if (isItemPublic) {
        publicRadioBtnObj.prop("checked", true);
    } else {
        privateRadioBtnObj.prop("checked", true);
    }

    accessModeChngBtnObj.attr('disabled', true);
    sharePermissionDlgWrapperObj.ejWaitingPopup("hide");
}

function getEmbedCode() {
    $("#embed-code").val(generateEmbedCode(currentItemDetail));
    embedCodeContainer.show();
    sharePermisisonDlgHeader.text(window.Server.App.LocalizationContent.EmbedCode);
    if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
        getEmbedCodeCopyBtnobj.hide();
    }

    if (currentItemDetail.IsPublic) {
        $(".private-embed-code-note").hide();
        $(".public-embed-code-note").show();
    } else {
        $(".private-embed-code-note").show();
        $(".public-embed-code-note").hide();
    }


    embedCodeDoneBtnObj.show();
    manageAccessBackButton.hide();
    manageAccessSaveBtnObj.hide();
    manageAccessCancelBtnObj.hide();
    sharePermissionDlgHeaderItemName.hide();
    sharePermisisonDlgHeader.css("line-height", "32px");
    sharePermissionConatiner.hide();
    manageAccessButton.hide();
    shareBtnObj.hide();
    shareDoneBtnObj.hide();
    refreshDialogBoxPosition();
}

function addAttributeValueToBtnEle(itemDetail) {
    accessModeChngBtnObj.attr('data-item-id', itemDetail.Id);
    accessModeChngBtnObj.attr('data-name', itemDetail.Name);
    accessModeChngBtnObj.attr('data-itemtype', itemDetail.ItemType);
    shareBtnObj.attr('data-item-id', itemDetail.Id);
    shareBtnObj.attr('data-name', itemDetail.Name);
    shareBtnObj.attr('data-itemtype', itemDetail.ItemType);
}

function addAttributeValueToAutoCompleteEle(itemDetail) {
    autoCompleteHiddenEle.attr('data-item-id', itemDetail.Id);
    autoCompleteHiddenEle.attr('data-itemtype', itemDetail.ItemType);
}

function getShareItemPermission(itemId) {
    sharePermissionDlgWrapperObj.ejWaitingPopup("show");
    $.ajax({
        type: "get",
        url: getShareItemPermissionUrl,
        data: {
            itemId: itemId
        },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.status) {
                var scope = angular.element(manageUserGroupBodySection).scope();
                scope.$apply(function () {
                    angular.copy(result.SharedUserGroupList, sharedUserGroupsPreservedList);
                    scope.sharedUserGroups = result.SharedUserGroupList;
                });

                scope.$apply(function () {
                    angular.copy(result.AccessModeOptionList, sharedAccessModePreservedList);
                    scope.accessModes = result.AccessModeOptionList;
                });

                if (currentItemDetail.ItemType == ItemType.ItemView) {
                    $("#user-group-search-input_suggestion").removeClass('item-user-input_suggestion');
                } else {
                    $("#user-group-search-input_suggestion").addClass('item-user-input_suggestion');
                }
                $(".change-access-mode-selection").selectpicker("refresh");
                $(".change-access-mode-selection .selectpicker").removeAttr("title");
                //AutoComplete AccessMode
                accessModeSelectionInput.html("");
                accessModeSelectionInput.append(result.AccessModeList);
                accessModeSelectionInput.selectpicker("refresh");
                refreshUserGroupScroll();
                sharePermissionDlgWrapperObj.ejWaitingPopup("hide");
                displaySharedUserGroupInfo();
                isEntireDOMRendered = true;
                $('[data-toggle="tooltip"]').tooltip();
                $('[data-toggle="popover"]').popover();
            }
        },
        error: function () {
            WarningAlert("", window.Server.App.LocalizationContent.InternalServerError, 7000);
            sharePermissionDlgWrapperObj.ejWaitingPopup("hide");
        }
    });
}

function displaySharedUserGroupInfo() {
    var scope = angular.element(manageUserGroupBodySection).scope();
    var sharedUserGroupInfo = scope.sharedUserGroups;

    if (sharedUserGroupInfo != null) {
        if (sharedUserGroupInfo.length > 0) {
            var elem = "";
            $.each(sharedUserGroupInfo, function (i, value) {
                var divElem = "<div class='shared-user-group-name'><span class='shared-user-group-name-label'>";
                if (i < 3) {

                    if (value.TargetUserId > 0) {
                        divElem += value.DisplayName + "</span>"
                    } else {
                        divElem += value.TargetGroupName + "</span>"
                    }


                    if (i != sharedUserGroupInfo.length - 1) {
                        divElem += "<span class='shared-user-group-name-comma'>,</span> </div>";
                    } else {
                        divElem += "</div>";
                    }

                    elem += divElem;
                }
            });

            showSharedUserGroupNameSection.html(elem);
            if (!manageUserGroupContainer.is(":visible")) {
                showSharedUserGroupContainer.show();
            }
        } else {
            showSharedUserGroupContainer.hide();
        }

        if (sharedUserGroupInfo.length > 3) {
            var count = sharedUserGroupInfo.length - 3;
            showSharedUserGroupCount.text(count);
            showSharedUserGroupCountSection.show();
        } else {
            showSharedUserGroupCountSection.hide();
        }

        generateProfileAvatar();
    }
}

function saveItemPermission() {
    sharePermissionDlgWrapperObj.ejWaitingPopup("show");
    splitUserGroupList();
    var userlist = userEmailList;
    var grouplist = groupIdList;
    var accessMode = accessModeSelectionInput.val();
    var itemId = shareBtnObj.attr("data-item-id");
    var itemType = shareBtnObj.attr("data-itemtype");
    $.ajax({
        type: "POST",
        url: sharepermissionUrl,
        data: { permissionList: JSON.stringify({ mode: accessMode, itemType: itemType, UserList: userlist, GroupList: grouplist }), itemId: itemId },
        success: function (result, data) {
            if (result.toLowerCase() == "true") {
                getShareItemPermission(itemId);
                refreshAutoComplete();
                refreshAutocompleteAccessModeSelection();
            } else {
                WarningAlert("", window.Server.App.LocalizationContent.InternalServerError, 7000);
            }
        },
        error: function () {
            WarningAlert("", window.Server.App.LocalizationContent.InternalServerError, 7000);
        }
    });
}

function updateBulkItemPermission() {
    var itemId = shareBtnObj.attr("data-item-id");
    $.ajax({
        type: "POST",
        url: updateBulkItemPermissionUrl,
        data: { permissionList: addNewItemPermission, userMarkedForDeletionList: userMarkedForDeletionList, groupMarkedForDeletionList: groupMarkedForDeletionList, itemId: itemId },
        success: function (result, data) {
            if (result.toLowerCase() == "true") {
                getShareItemPermission(itemId);
                changeIndicatorBannerObj.css("visibility", "hidden");
                resetPreRequestValues();
                manageAccessSaveBtnObj.hide();
                manageAccessCancelBtnObj.hide();
                shareDoneBtnObj.show();
                enableAutomCompleteControl();
                enableAutocompleteAccessModeSelection();
            } else {
                WarningAlert("", window.Server.App.LocalizationContent.InternalServerError, 7000);
            }
        },
        error: function () {
            WarningAlert("", window.Server.App.LocalizationContent.InternalServerError, 7000);
        }
    });
}

function refreshDialogBoxPosition() {
    sharePermissionDlgObj.ejDialog({ height: "auto" });
    if (isEntireDOMRendered) {
        sharePermissionDlgObj.ejDialog({ width: 529 });
        sharePermissionDlgObj.ejDialog({ width: 530 });
    }

    sharePermissionDlgWrapperObj.ejWaitingPopup("refresh");
    sharePermissionDlgObj.ejDialog("refresh");
    if (isWidget) {
        sharePermissionDlgWrapperObj.ejWaitingPopup("hide");
        sharePermisisonDlgHeader.text(window.Server.App.LocalizationContent.EmbedCode);
        sharePermisisonDlgHeader.css("line-height", "32px");
        sharePermissionDlgHeaderItemName.hide();
        sharePermissionConatiner.hide();
        embedCodeContainer.show();
        embedConfiguration.hide();
        manageAccessButton.hide();
    }
}

function prepareRequestForAddItemPermission() {
    if (modifiedItemIndex.length > 0) {
        var scope = angular.element(manageUserGroupBodySection).scope();
        var possibleAccessModes = scope.accessModes;
        var lastModifiedValue = scope.sharedUserGroups;
        var itemType = shareBtnObj.attr("data-itemtype");

        $.each(possibleAccessModes, function (x, value) {
            var accessMode = value.Key;
            var userList = [];
            var groupList = [];

            $.each(modifiedItemIndex, function (i, item) {
                if (lastModifiedValue[item].PermissionAccess != sharedUserGroupsPreservedList[item].PermissionAccess && lastModifiedValue[item].PermissionAccess == value.Key) {
                    if (scope.IsUserItem(item)) {
                        if (jQuery.inArray(lastModifiedValue[item].Email, userList) == -1) {
                            userList.push(lastModifiedValue[item].Email);
                        }
                    }
                    else if (scope.IsGroupItem(item)) {
                        if (jQuery.inArray(lastModifiedValue[item].TargetGroupId, groupList) == -1) {
                            groupList.push(lastModifiedValue[item].TargetGroupId);
                        }
                    }
                }
            });

            if (userList.length > 0 || groupList.length > 0) {
                addNewItemPermission.push(JSON.stringify({ mode: accessMode, itemType: itemType, UserList: userList, GroupList: groupList }));
            }
        });

        //Mark for deletion
        $.each(modifiedItemIndex, function (i, value) {
            if (lastModifiedValue[value].PermissionAccess != sharedUserGroupsPreservedList[value].PermissionAccess) {
                if (scope.IsUserItem(value)) {
                    if (jQuery.inArray(sharedUserGroupsPreservedList[value].PermissionId, userMarkedForDeletionList) == -1) {
                        userMarkedForDeletionList.push(sharedUserGroupsPreservedList[value].PermissionId);
                    }
                }
                else if (scope.IsGroupItem(value)) {
                    if (jQuery.inArray(sharedUserGroupsPreservedList[value].PermissionId, groupMarkedForDeletionList) == -1) {
                        groupMarkedForDeletionList.push(sharedUserGroupsPreservedList[value].PermissionId);
                    }
                }
            }
        });
    }
}

function resetPreRequestValues() {
    modifiedItemIndex = [];
    addNewItemPermission = [];
    userMarkedForDeletionList = [];
    groupMarkedForDeletionList = [];
}

function resetToActualScope() {
    var scope = angular.element(manageUserGroupBodySection).scope();
    scope.$apply(function () {
        angular.copy(sharedUserGroupsPreservedList, scope.sharedUserGroups);
    });

    scope.$apply(function () {
        angular.copy(sharedAccessModePreservedList, scope.accessModes);
    });

    $(".change-access-mode-selection").selectpicker("refresh");
    $(".change-access-mode-selection .selectpicker").removeAttr("title");
    changeIndicatorBannerObj.css("visibility", "hidden");
    resetPreRequestValues();
    $('[data-toggle="tooltip"]').tooltip();
    manageAccessSaveBtnObj.hide();
    manageAccessCancelBtnObj.hide();
    shareBtnObj.hide();
    shareDoneBtnObj.show();
}

//AutoComplete

function enableAutocompleteAccessModeSelectionWithoutReset() {
    autoCompleteControlEle.ejAutocomplete("enable");
    autoCompleteControlWrapperEle.find(".e-in-wrap.e-box.e-corner").removeClass("disable-autocomplete");
    accessModeSelectionInput.prop("disabled", false);
    $(".selectpicker[data-id='access-mode-selection']").removeClass("disabled");
    $(".selectpicker[data-id='access-mode-selection']").removeClass("disable-autocomplete-access-mode-selection");
    accessModeSelectionInput.selectpicker("refresh");
}

function refreshAutocompleteAccessModeSelection() {
    accessModeSelectionInput.prop('selectedIndex', 0);
    accessModeSelectionInput.selectpicker("refresh");
}


function enableAutocompleteAccessModeSelection() {
    accessModeSelectionInput.prop("disabled", false);
    $(".selectpicker[data-id='access-mode-selection']").removeClass("disabled");
    $(".selectpicker[data-id='access-mode-selection']").removeClass("disable-autocomplete-access-mode-selection");
    refreshAutocompleteAccessModeSelection();
}

function disableAutocompleteAccessModeSelection() {
    accessModeSelectionInput.prop("disabled", true);
    $(".selectpicker[data-id='access-mode-selection']").addClass("disabled");
    $(".selectpicker[data-id='access-mode-selection']").addClass("disable-autocomplete-access-mode-selection");
    refreshAutocompleteAccessModeSelection();
}

function onSuggestionListOpen() {
    manageUserGroupContainer.addClass("disable-element-opacity");
}

function onSuggestionListClose() {
    if (autoCompleteInstance.getValue() == "") {
        manageUserGroupContainer.removeClass("disable-element-opacity");
    }
}

function refreshUserGroupScroll() {
    if (manageUserGroupBodySection.is(":visible")) {
        $('.tooltip').tooltip('hide');
        var scrollerHeight = 225;
        manageUserGroupBodySection.ejScroller({
            height: scrollerHeight,
            width: "100%",
            scrollerSize: 7,
            buttonSize: 0,
            enableTouchScroll: true,
            scrollOneStepBy: 20,
            scroll: function () {
                $('.tooltip').tooltip('hide');
                $('[data-toggle="popover"]').popover('hide');
            }
        });

        var scrollercontrol = manageUserGroupBodySection.ejScroller("instance");
        scrollercontrol.model.height = scrollerHeight;
        scrollercontrol.refresh();
        $(".manage-user-group-body-section .e-scrollbar").show();
    }
}

function generateEmbedCode(itemDetail) {
    var embedDashboardUrl = "";
    if (currentItemDetail.ItemType == ItemType.ItemView) {
        embedDashboardUrl = getDashboardShareLink(currentDashboardDetail.Id, currentDashboardDetail.CategoryName, currentDashboardDetail.Name) + "?viewid=" + currentItemDetail.Id + "&isembed=true";
    } else if (itemDetail.ItemType == ItemType.Widget) {
        isWidget = true;
        var scope = angular.element('#share-permission-content-section').scope();
        scope.$apply(function () {
            scope.isDashboardPublic = itemDetail.IsPublic;
            scope.currentItemType = itemDetail.ItemType;
        });
        sharePermissionDlgObj.show();
        sharePermissionDlgObj.ejDialog("open");
        sharePermissionDlgWrapperObj.ejWaitingPopup("show");

        embedDashboardUrl = getDashboardShareLink(itemDetail.Id, itemDetail.CategoryName, itemDetail.Name) + "?isembed=true&isWidgetMode=true&WidgetId=" + itemDetail.widgetId;
    } else {
        embedDashboardUrl = getDashboardShareLink(itemDetail.Id, itemDetail.CategoryName, itemDetail.Name) + "?isembed=true";
    } 

    embedDashboardUrl += $("#embed-dashboard-comments").is(":checked") ? "&dashboard_comments=true" : "";
    embedDashboardUrl += $("#embed-widget-comments").is(":checked") ? "&widget_comments=true" : "";
    embedDashboardUrl += $("#embed-views").is(":checked") ? "&views=true" : "";
    embedDashboardUrl += $("#embed-export").is(":checked") ? "&export=true" : "";
    var embedFrameCode = "<iframe src='" + embedDashboardUrl + "' id='dashboard-frame' width='800px' height='600px' allowfullscreen frameborder='0'></iframe>";
    return embedFrameCode;
}