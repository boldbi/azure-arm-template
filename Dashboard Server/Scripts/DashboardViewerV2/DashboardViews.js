var containSaveFilter = false;
var queryStringStatus = true;
var clearStatus = false;
var saveFilterName = "";
var list;
var currentQueryString = "";
var updateInitialQueryStringParameter = "";
var parentRefUrl = (window.location != window.parent.location) ? document.referrer : document.location.href.replace(document.location.pathname + document.location.search, "");
if (parentRefUrl == "") {
    var parentUrl = "";
}
else {
    var parentUrl = parentRefUrl.match(/:\/\/(.[^/]+)/)[1];
}
var iframeRefUrl = window.location.href;
var iframeUrl = iframeRefUrl.match(/:\/\/(.[^/]+)/)[1];

$(document).ready(function () {
    var popupHeight = $("#viewShare_popup").height();
    $("#sharepopup_wrapper_WaitingPopup .loader-icon").css("top", parseInt(parseInt(popupHeight) / 2) - 30);
    var dashboardWaitingPopupTemplateId = createLoader("dashboard");
    $("#dashboard").ejWaitingPopup({ template: $("#" + dashboardWaitingPopupTemplateId) });
    var dashboardViewToggleWaitingPopupTemplateId = createLoader("dashboard-view-toogle");
    $("#dashboard-view-toogle").ejWaitingPopup({ template: $("#" + dashboardViewToggleWaitingPopupTemplateId) });
    $("#delete-div").ejDialog({
        width: (window.innerWidth > 460) ? "450px" : (window.innerWidth - 10),
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        height: "auto",
        title: window.Server.App.LocalizationContent.DeleteView,
        showHeader: false,
        enableModal: true,
        closeOnEscape: true,
        close: "onDeleteItemDialogClose",
        open: "onDeleteItemDialogOpen"
    });

    $("#messageBox").ejDialog({
        width: ((sameOrigin ? parent.window.innerWidth : window.innerWidth) > 460) ? "450px" : ((sameOrigin ? parent.window.innerWidth : window.innerWidth) - 10),
        height: "200px",
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        showHeader: false,
        enableModal: true,
        close: "onMessageDialogClose"
    });    

    var deleteDivWrapperWaitingPopupTemplateId = createLoader("delete-div_wrapper");
    $("#delete-div_wrapper").ejWaitingPopup({ template: $("#" + deleteDivWrapperWaitingPopupTemplateId) });

    $("#save-view-popup").ejDialog({
        width: "600px",
        height: "209px",
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        title: window.Server.App.LocalizationContent.SaveView,
        enableModal: true,
        showHeader: false
    });
    var saveViewWaitingPopupTemplateId = createLoader("save-view-popup_wrapper");
    $("#save-view-popup_wrapper").ejWaitingPopup({ template: $("#" + saveViewWaitingPopupTemplateId) });
    $("#dashboard-view-toogle").mouseover(function () {
        var ele = document.getElementById("dashboard-views");
        var dashboardViewsEle = $("#dashboard-view-toogle");
        if (ele != null && !(ele.style.display == 'block' || ele.style.display == '')) {
            dashboardViewsEle.addClass("cursor-pointer");
            dashboardViewsEle.removeClass("cursor-default");
        } else {
            dashboardViewsEle.addClass("cursor-default");
            dashboardViewsEle.removeClass("cursor-pointer");
        }
    });
    $('#filter_name').keypress(function (e) {
        $('#filter-name-input').removeClass("has-error");
        if (e.which == 13) {//Enter key pressed
            $('#save-filter').click();
        }
    });
    $('[data-toggle="tooltip"]').tooltip();

    $.validator.addMethod("isValidName", function (value, element) {
        return IsValidName("name", value);
    }, window.Server.App.LocalizationContent.AvoidSpecialCharactors);

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, window.Server.App.LocalizationContent.ViewNameValidator);

    $("#save-view-form").validate({
        errorElement: "span",
        onkeyup: function (element, event) {
            if (event.keyCode != 9) {
                $(element).valid();
            }
        },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            "viewnewname": {
                isRequired: true,
                isValidName: true
            }
        },
        messages: {
            "viewnewname": {
                isRequired: window.Server.App.LocalizationContent.ViewNameValidator
            }
        },
        highlight: function (element) {
            $(element).addClass("has-error");
        },
        unhighlight: function (element) {
            $(element).removeClass("has-error");
            $(element).closest("div").find("span").html("");
        },
        errorPlacement: function (error, element) {
            $(element).closest("div").find("span").html(error.html());
        }
    });

    if (document.addEventListener) {
        document.addEventListener('webkitfullscreenchange', fullscreenExitHandler, false);
        document.addEventListener('mozfullscreenchange', fullscreenExitHandler, false);
        document.addEventListener('fullscreenchange', fullscreenExitHandler, false);
        document.addEventListener('MSFullscreenChange', fullscreenExitHandler, false);
    }

    intializeGetShareLink();

    if (typeof (isSlideshow) == "undefined" || !isSlideshow) {
        filterView();
    }

    resetViewPanel();
    isOptionsBundleLoaded = true;
});

//Dashboard View Toggle when click outside
$(document).on('click', "#close-container,#close-filter,#close-comment", function (e) {
    if ($("#is_mobile").val() == "true") {
        $("#server-mobile-navbar .su-nav-dashboard").addClass('active');
        return;
    }

    var ele = document.getElementById("dashboard-views");
    if (ele != null && (ele.style.display == 'block' || ele.style.display == '') && (e.target.className.toLowerCase() != "su-view" && e.target.className.toLowerCase() != "options" && e.target.id.toLowerCase() != "views")) {
        var clickedOn = $(e.target);
        if (((!(clickedOn.parents().andSelf().is('#dashboard-view-toogle'))) && (!(clickedOn.parents().andSelf().is("#PopupContainerDelete"))) && (!(clickedOn.parents().andSelf().is("#messageBox")))) || ((clickedOn.parents().andSelf().is('#close-container')))) {
            CloseDashboardView();
        }
        $("#dashboard-view").removeClass("highlight-icon");
    } else {
        if (e.target.id == "dashboard-view-toogle") {
            if (containSaveFilter) {
                $("#saved-filter").show();
            }
            $("#dashboard").toggleClass("dashboard");
            $(".view-heading").toggle();
            $("#dashboard-views").toggle();
            $("#dashboard-view-toogle").addClass("cursor-default").removeClass("cursor-pointer").toggleClass("dashboard-view-toogle");
            refreshScroller();
        }
    }
    if (!$("#commentModuleContainer").hasClass("displayNone") && e.target.id.toLowerCase() != "comments" && !e.target.classList.contains("su-with-comment") && !e.target.classList.contains("su-without-comment") && e.target.className.toLowerCase() != "options") {
        if (enableComment == "true") {
            closeDashboardComment();
        }
        else {
            $("#close-filter a").css("display", "none");
        }
        setDashboardWidth();
        var data = $("#dashboard").data("ejDashboardDesigner");
        data.resizeDashboard();
    }
    //else if ((($('#dashboard').data("ejDashboardDesigner").getFilterPanelState() == "opened" || $('#dashboard').data("ejDashboardDesigner").getFilterPanelState() != null || $("#validation-message").text() != "") && e.target.id.toLowerCase() != "filters" && !e.target.classList.contains("su-filter") && e.target.className.toLowerCase() != "options" && !e.target.offsetParent.id.startsWith("filter-view")) || e.target.className.toLowerCase() == "su su-close") {
    //    $('#dashboard').data("ejDashboardDesigner").closeFilterPanel();
    //    $("#filter-view p#validation-message").remove();
    //    $("#close-filter a").css("display", "none");
    //    $("#filter-view").hide();
    //    setDashboardWidth();
    //    var data = $("#dashboard").data("ejDashboardDesigner");
    //    data.resizeDashboard();
    //}
    $('[data-toggle="tooltip"]').tooltip();
});

//UnSaved filter on hover
$(document).on('mouseenter', '.border-division,.border-division-last', function () {
    $(this).children('.unsaved-opt').css("display", "block");
}).on('mouseleave', '.border-division,.border-division-last', function () {
    $(this).children('.unsaved-opt').css("display", "none");
});

var filtered_Values = "";
var dashboardviewerObj = null;

//close dashboard-view-toogle
function CloseDashboardView() {
    if ($("#dashboard").length != 0) {
        if (containSaveFilter) {
            $("#saved-filter").show();
        }
        $("#dashboard").toggleClass("dashboard");
        $(".view-heading").toggle();
        $("#dashboard-views").toggle();
        $("#dashboard-view-toogle").toggleClass("dashboard-view-toogle");
        $("#dashboard-view-toogle #close-container a").css("display", "none");
        if ($("#is_mobile").val() == "false") {
            setDashboardWidth();
            var data = $("#dashboard").data("ejDashboardDesigner");
            data.resizeDashboard();
        }
    }
    else {
        var dashboard_render_iframe_element = $("#dashboard_render_iframe");
        if (containSaveFilter) {
            dashboard_render_iframe_element.contents().find("#saved-filter").show();
        }
        dashboard_render_iframe_element.contents().find("#dashboard").toggleClass("dashboard");
        dashboard_render_iframe_element.contents().find(".view-heading").toggle();
        dashboard_render_iframe_element.contents().find("#dashboard-views").toggle();
        dashboard_render_iframe_element.contents().find("#dashboard-view-toogle").toggleClass("dashboard-view-toogle");
        dashboard_render_iframe_element.contents().find("#dashboard-view-toogle #close-container a").css("display", "none");
    }
}

//Render on complete action
function filterView() {
    var parameters = getcurrentfilters();
    if (parameters != "" && parameters != null && parameters.masterData != null && parameters.masterData.length > 0) {
        SavedViewHeight();
        if ((viewId == null || viewId == "")) {
            if ($("#saved-filter-Saveas").css("display") == "none" &&
                $("#saved-filter-update").css("display") == "none") {
                $("#new-save").show();
                if (enableComment.toString().toLowerCase() == "true") {
                    $("#new-save").removeClass("pointer-events");
                    $("#new-save").css("opacity", 1);
                }
                $("#nofilters").css("display", "none");

            }
        }
    }
    else {
        $("#new-save").addClass("pointer-events");
        $("#new-save").css("opacity", 0.5);
        $("#nofilters").css("display", "block");
    }
    unsavedFilters();
    GetSavedFilter();
    refreshScroller();
}

//Clear Filter
$(document).on("click", "#clear", function () {
    dashboardviewerObj = $('#dashboard').data("ejDashboardDesigner");
    dashboardviewerObj.refresh();
});

//Get Saved Filters
function GetSavedFilter() {
    var dashboardviewerObj = $('#dashboard').data("ejDashboardDesigner");
    var dashboardEle = $("#dashboard");
    if (iframeUrl == parentUrl) {
        var parentDashboardEle = $("#dashboard");        
        item_Id = typeof item_ID != "undefined" ? item_Id : parentDashboardEle.prevAll("#favorite_Item").attr("data-item-id") != undefined ? parentDashboardEle.prevAll("#favorite_Item").attr("data-item-id") : dashboardEle.prevAll("#favorite_Item").attr("data-item-id");
        isMultiDashboard = typeof isMultiDashboard != "undefined" ? isMultiDashboard : parentDashboardEle.prevAll("#isMultiDashboard").attr("data-item-id") != undefined ? parentDashboardEle.prevAll("#isMultiDashboard").attr("data-item-id") : dashboardEle.prevAll("#isMultiDashboard").attr("data-item-id");
        parentDashboardId = typeof parentDashboardId != "undefined" ? parentDashboardId : parentDashboardEle.prevAll("#isMultiDashboard").attr("data-parent-id") != undefined ? parentDashboardEle.prevAll("#isMultiDashboard").attr("data-parent-id") : dashboardEle.prevAll("#isMultiDashboard").attr("data-parent-id");
    } else {
        item_Id = typeof item_ID != "undefined" ? item_Id : dashboardEle.prevAll("#favorite_Item").attr("data-item-id") != undefined ? dashboardEle.prevAll("#favorite_Item").attr("data-item-id") : dashboardEle.prevAll("#favorite_Item").attr("data-item-id");
        isMultiDashboard = typeof isMultiDashboard != "undefined" ? isMultiDashboard : dashboardEle.prevAll("#isMultiDashboard").attr("data-item-id") != undefined ? dashboardEle.prevAll("#isMultiDashboard").attr("data-item-id") : dashboardEle.prevAll("#isMultiDashboard").attr("data-item-id");
        parentDashboardId = typeof parentDashboardId != "undefined" ? parentDashboardId : dashboardEle.prevAll("#isMultiDashboard").attr("data-parent-id") != undefined ? dashboardEle.prevAll("#isMultiDashboard").attr("data-parent-id") : dashboardEle.prevAll("#isMultiDashboard").attr("data-parent-id");
    }
    userName = typeof userName != "undefined" ? userName : name;
    userId = typeof userId != "undefined" ? userId : id;
    pageurl = typeof pageurl != "undefined" ? urlHasMultiTab ? multiTabUrl : pageurl : viewUrl;
    var itemRequest = { itemId: item_Id, userId: userId, userName: userName, isMultiDashboard: urlHasMultiTab, parentDashboardId: multiTabId, itemType: dashboardItemDetail.ItemType };
    ajaxPostCall("POST", getSavedViewUrl, itemRequest, null, getViewsResult, errorViewResult, null);
}

function errorViewResult() {
    resetViewPanel();
    SavedViewHeight();
    refreshScroller();
}  

function getViewsResult(data) {
        var childDashboardName = isMultiDashboard.toLowerCase() == "true" ? dashboardEle.length != 0 ? dashboardEle.find("li.e-active").find("span").html().trim() : parent.$("#dashboard").find("li.e-active").find("span").html().trim() : "";
        $('#saved-filter').length > 0 ? $('#saved-filter').html("") : parent.$('#saved-filter').html("");
        var savedFilter =
            '<div id="saved-list" style="display: block"><div class="saved-list-content-div" style="float: left">';
        var Result = embedConfig.IsEmbedCode ? data.ResponseContent : jQuery.parseJSON(data.Result);        
        if (Result.length > 0) {
            containSaveFilter = true;
            $('#saved-filter').length > 0 ? $('#saved-filter').show() : parent.$('#saved-filter').show();
            for (var i = 0; i < Result.length; i++) {
                var ViewId = Result[i].ViewId;
                var ViewName = Result[i].ViewName;
                var savedFilterOptions = "";
                if (!embedConfig.IsEmbedDashboard || urlHasMultiTab) {
                    if (Result[i].IsDefault) {
                        savedFilterOptions =
                            '<div class="saved-opt"><span class="dropdown viewoptions"><span class="dropdown-toggle" title="Actions" data-placement="top" data-toggle="dropdown"><span class="opt" viewid="' +
                            ViewId +
                            '" itemId="' +
                            item_Id +
                            '" viewname="' +
                            Result[i].ViewName +
                            '"><span  viewid = "' +
                            ViewId +
                            '" itemId="' +
                            item_Id +
                            '" viewname="' +
                            Result[i].ViewName +
                        '" class ="set-default su su-remove-default cursor-pointer" data-original-title="' + window.Server.App.LocalizationContent.RemoveAsDefaultView + '" data-toggle="dropdown" data-placement="top" title=""></span></span></span><ul class="dropdown-menu"><li class="remove-default cursor-pointer option-click"><span>' + window.Server.App.LocalizationContent.RemoveAsDefaultTitle + ' </span></li></ul></span>';
                    }
                    else {
                        savedFilterOptions =
                            '<div class="saved-opt"><span class="dropdown viewoptions"><span class="dropdown-toggle" title="Actions" data-placement="top" data-toggle="dropdown"><span class="opt" viewid="' +
                            ViewId +
                            '" itemId="' +
                            item_Id +
                            '" viewname="' +
                            Result[i].ViewName +
                            '"><span  viewid = "' +
                            ViewId +
                            '" itemId="' +
                            item_Id +
                            '" viewname="' +
                            Result[i].ViewName +
                        '" class ="set-default su su-set-default cursor-pointer" data-original-title="' + window.Server.App.LocalizationContent.MarkAsDefault + '" data-toggle="dropdown" data-placement="top" title=""></span></span></span><ul class="dropdown-menu"><li class="mark-default cursor-pointer option-click"><span>' + window.Server.App.LocalizationContent.SetAsDefaultTitle + '</span></li></ul></span>';
                    }
                }                

                if (Result[i].CanDelete && Result[i].CanShare && !embedConfig.IsEmbedCode && !urlHasMultiTab) {
                    savedFilterOptions +=
                        '<span class="opt" viewid="' +
                        ViewId +
                        '" itemId="' +
                        item_Id +
                        '" viewname="' +
                        Result[i].ViewName +
                        '"><span viewid="' +
                        ViewId +
                        '" itemId="' +
                        item_Id +
                        '" viewname="' +
                        Result[i].ViewName +
                        '"  class = "delete su su-delete cursor-pointer" data-toggle="tooltip" data-original-title="' + window.Server.App.LocalizationContent.Delete + '" ></span></span><span class="opt" viewid="' +
                        ViewId +
                        '" itemId="' +
                        item_Id +
                        '" viewname="' +
                        Result[i].ViewName +
                        '"><span  viewid="' +
                        ViewId +
                        '" itemId="' +
                        item_Id +
                        '" viewname="' +
                        Result[i].ViewName +
                        '" class = "share su su-share  cursor-pointer" data-toggle="tooltip" data-original-title="' + window.Server.App.LocalizationContent.Share + '"></span></span><span class="opt" viewid="' +
                        ViewId +
                        '" itemId="' +
                        item_Id +
                        '" viewname="' +
                        Result[i].ViewName +
                        '"><span  viewid="' +
                        ViewId +
                        '" itemId="' +
                        item_Id +
                        '" viewname="' +
                        Result[i].ViewName +
                        '" class ="su su-link View-link-copy cursor-pointer" data-original-title="' + window.Server.App.LocalizationContent.LinkCopy + '" data-toggle="tooltip" data-placement="top" title=""></span></span></div>';
                }
                else if (Result[i].CanDelete) {
                    savedFilterOptions +=
                        '<span class="opt" viewid="' +
                        ViewId +
                        '" itemId="' +
                        item_Id +
                        '" viewname="' +
                        Result[i].ViewName +
                        '"><span viewid="' +
                        ViewId +
                        '" itemId="' +
                        item_Id +
                        '" viewname="' +
                        Result[i].ViewName +
                        '"  class = "delete su su-delete cursor-pointer" data-toggle="tooltip" data-original-title="' + window.Server.App.LocalizationContent.Delete + '" ></span></span><span class="opt" viewid="' +
                        ViewId +
                        '" itemId="' +
                        item_Id +
                        '" viewname="' +
                        Result[i].ViewName +
                        '"><span  viewid="' +
                        ViewId +
                        '" itemId="' +
                        item_Id +
                        '" viewname="' +
                        Result[i].ViewName + 
                        '" class = "su su-link View-link-copy cursor-pointer" data-original-title="' + window.Server.App.LocalizationContent.LinkCopy + '" data-toggle="tooltip" data-placement="top" title=""></span></span></div>';
                }
                else if (Result[i].CanShare && !embedConfig.IsEmbedCode) {
                    savedFilterOptions +=
                        '<span class="opt" viewid="' + ViewId + '" itemId="' + item_Id + '" viewname="' + Result[i].ViewName + '"><span  viewid="' +
                        ViewId +
                        '" itemId="' +
                        item_Id +
                        '" viewname="' +
                        Result[i].ViewName +
                        '" class = "share su su-share  cursor-pointer" data-toggle="tooltip" data-original-title="' + window.Server.App.LocalizationContent.Share + '"></span></span><span class="opt" viewid="' +
                        ViewId +
                        '" itemId="' +
                        item_Id +
                        '" viewname="' +
                        Result[i].ViewName +
                        '"><span  viewid="' +
                        ViewId +
                        '" itemId="' +
                        item_Id +
                        '" viewname="' +
                        Result[i].ViewName +
                        '" class = "su su-link View-link-copy cursor-pointer" data-original-title="' + window.Server.App.LocalizationContent.LinkCopy + '" data-toggle="tooltip" data-placement="top" title=""></span></span></div>';
                }
                else {
                    savedFilterOptions +=
                        '<span class="opt" viewid="' + ViewId + '" itemId="' + item_Id + '" viewname="' + Result[i].ViewName + '"><span  viewid="' +
                        ViewId +
                        '" itemId="' +
                        item_Id +
                        '" viewname="' +
                        Result[i].ViewName +
                        '" class = "su su-link View-link-copy cursor-pointer" data-original-title="' + window.Server.App.LocalizationContent.LinkCopy + '" data-toggle="tooltip" data-placement="top" title=""></span></span></div>';
                }
                if (pageurl.indexOf("/embed/") > -1) {
                    pageurl = pageurl.replace("/embed/", "/");
                }
                else {
                    pageurl = pageurl;
                }
                if (childDashboardName != "") {
                    savedFilter += '<li class="saved-view" viewid="' +
                        ViewId + 
                        '">' + savedFilterOptions +
                        '<label class="saved-filter txt-overflow" viewid="' +
                        ViewId +
                        '" itemId="' +
                        item_Id +
                        '"><a class="view-link txt-overflow saved-filter-anchor"  href="' +
                        pageurl + '?tab=' + childDashboardName +
                        '&viewid=' +
                        ViewId +
                        '" data-url="' +
                        pageurl + '?tab=' + childDashboardName +
                        '&viewid=' +
                        ViewId +
                        '" target="_blank" data-toggle="tooltip" data-original-title="' + Result[i].ViewName + '">' +
                        Result[i].ViewName +
                        '</a></label></li>';
                }
                else {
                    if (Result[i].IsDefault) {
                        savedFilter += '<li class="saved-view" viewid="' +
                            ViewId +
                            '">' + savedFilterOptions +
                            '<label class="saved-filter txt-overflow" viewid="' +
                            ViewId +
                            '" itemId="' +
                            item_Id +
                            '"><a class="view-link txt-overflow saved-filter-anchor"  href="' +
                            pageurl +
                            '?viewid=' +
                            ViewId +
                            '" data-url="' +
                            pageurl +
                            '?viewid=' +
                            ViewId +
                            '" target="_blank" data-toggle="tooltip" data-original-title="' + Result[i].ViewName + '">' +
                            Result[i].ViewName +
                            '</a><a class="view-default">(default)</a></label></li>';
                    }
                    else {
                        savedFilter += '<li class="saved-view" viewid="' +
                            ViewId +
                            '">' + savedFilterOptions +
                            '<label class="saved-filter txt-overflow" viewid="' +
                            ViewId +
                            '" itemId="' +
                            item_Id +
                            '"><a class="view-link txt-overflow saved-filter-anchor"  href="' +
                            pageurl +
                            '?viewid=' +
                            ViewId +
                            '" data-url="' +
                            pageurl +
                            '?viewid=' +
                            ViewId +
                            '" target="_blank" data-toggle="tooltip" data-original-title="' + Result[i].ViewName + '">' +
                            Result[i].ViewName +
                            '</a></label></li>';
                    }
                }
            }            
            $('#saved-filter').length > 0 ? $('#saved-filter').append(savedFilter + '</div></div>') : parent.$('#saved-filter').append(savedFilter + '</div></div>');
            if ($('#saved-filter').length == 0) {
                var links = parent.$('.view-link').attr('data-url');
                for (var i = 0; i < links.length; i++) {
                    parent.$('.view-link').eq(i).attr('href', parent.$('.view-link').eq(i).attr('data-url'));
                }
            }
            else {
                var links = $('.view-link').attr('data-url');
                for (var i = 0; i < links.length; i++) {
                    $('.view-link').eq(i).attr('href', $('.view-link').eq(i).attr('data-url'));
                }
            }
            $('.dropdown-toggle').dropdown();
            $("#dashboard-view-toogle").length > 0 ? $("#dashboard-view-toogle").find("#saved-list").length == 0 ? $("#dashboard-view-toogle").find("#no-filters").css("display", "block") : $("#dashboard-view-toogle").find("#no-filters").css("display", "none") : parent.$("#dashboard-view-toogle").find("#saved-list").length == 0 ? parent.$("#dashboard-view-toogle").find("#no-filters").css("display", "block") : parent.$("#dashboard-view-toogle").find("#no-filters").css("display", "none");
            if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
                $(".View-link-copy").removeClass("su su-link");
                $(".View-link-copy").attr("data-original-title", "");
            }
            $("#dashboard-view-toogle").length > 0 ? $("#dashboard-view-toogle").show() : parent.$("#dashboard-view-toogle").show();
            $('[data-toggle="tooltip"]').tooltip();
        } else {
            containSaveFilter = false;
            $('#saved-filter').length > 0 ? $('#saved-filter').hide() : parent.$('#saved-filter').hide();
            dashboardviewerObj = $('#dashboard').data("ejDashboardDesigner");
        }
        if (embedConfig.IsEmbedCode) {
            $(".su-link").hide();
        }
        refreshScroller();
    }

//Open the Saved view in new tab
$(document).on("click", ".view", function () {
    var viewId = $(this).attr("viewid");
    if (urlHasMultiTab) {
        window.open(multiTabUrl + '?viewid=' + viewId, '_blank');
    } else {
        window.open(window.location.pathname + '?viewid=' + viewId, '_blank');
    }
});

//Share View Dialog box
$(document).on("click", ".share", function () {
    var viewId = $(this).attr("viewid");
    $("#dashboard-view-toogle").css("z-index", "999");
    $.ajax({
        type: "POST",
        url: itemViewShareIframeUrl,
        data: { itemViewId: viewId, itemId: item_Id },
        success: function (data) {
            if (data.itemViewDetail != null && data.itemDetail != null) {
                shareDashboardPermission(data.itemViewDetail, data.itemDetail);
            }
        }
    });
});

//save-as-view action
$(document).on("click", "#save-as-view", function () {
    $("#view-name").hide();
    $("#filter_name").val("");
    $("#save-lable-section").hide();
    $("#save-section").show();
});

//Reset and clear Views
$(document).on("click", ".clear", function () {
    $("#dashboard-view-toogle").ejWaitingPopup("show");
    $("#filter_name").val("");
    clearAllFilters();
    $("#view-name").show();
    $("#save-section").hide();
    $("#unsaved-filter,#unsaved-filter-title").show();
    $("#save-lable-section").show();
});

$(document).on("click", "#clear-txt", function () {
    $("#filter_name").val("");
    $("#save-lable-section").show();
    $("#save-section").hide();
});

//Clear Individual filters
$(document).on("click", ".clear-filter", function (event) {
    var widgetId = event.target.attributes["widgetid"].value;
    var widgetType = event.target.attributes["widgettype"].value;
    clearWidgetFilter(widgetId, widgetType);
    var dashboardviewerObj = getcurrentfilters();
    if ((dashboardviewerObj == "" || dashboardviewerObj == "undefined" || dashboardviewerObj == null || dashboardviewerObj.masterData == null)) {
        $("#filter_name").val("");
        $("#save-lable-section").show();
        $("#save-section").hide();
    }
});

//Delete Dialog Close
function onDeleteItemDialogClose() {
    var dashboardViewsEle = $("#dashboard-view-toogle");
    $("#delete-div").ejDialog("close");
    dashboardViewsEle.ejWaitingPopup("show");
    dashboardViewsEle.find("#saved-list").length == 0 ? $("#no-filters").css("display", "block") : $("#no-filters").css("display", "none");
    dashboardViewsEle.ejWaitingPopup("hide");
}

//Delete dialog open
function onDeleteItemDialogOpen() {
    $("#dashboard").ejDashboardDesigner("instance").closeAllWindows();
    $("#delete-div").ejDialog("open");
    $("#delete-msg").show();
    $('#delete-div').focus();
}

function resetViewPanel() {
    if ((typeof (isSlideshow) != "undefined" && isSlideshow) || (typeof (embedConfig) != "undefined" && typeof (embedConfig.IsEmbedDashboard) != "undefined" && (!urlHasMultiTab && embedConfig.IsEmbedDashboard))) {
        return;
    }

    $("#save-lable-section label").html("");
    $("#entire-label-section label").html(window.Server.App.LocalizationContent.UnsavedView);
    $("#new-save").css("display", "block");
    $("#saved-filter-update").css("display", "none");
    $("#saved-filter-Saveas").css("display", "none");
    $("#saved-filter").html("");
    $("#no-filters").css("display", "block");
    unsavedFilters();
}

//Delete Saved View
$(document).on("click", ".delete", function (e) {
    onDeleteItemDialogOpen();
    var viewid = $(this).attr("viewid");
    var viewName = $(this).attr("viewname");
    $("#delete_item").attr("viewid", viewid);
    $("#delete_item_name").html(viewName);
    $("#delete-content").show();
    $(".validationArea").show();
    $("#delete-confirmation").hide();
    $("#delete-error").hide();
    $(".successArea").hide();

    var messageBoxHeight = $(".header-menu").outerHeight(true) + $(".delete-dialog-body").outerHeight(true) + $(".dialogFooter").outerHeight(true);
    $("#PopupContainerDelete").height(messageBoxHeight + "px");
    $("#delete-div_wrapper .e-dialog-scroller.e-scroller.e-js.e-widget").height($("#PopupContainerDelete").outerHeight(true) + "px");
});

//Delete Confirm Action
$(document).on("click", "#delete_item", function () {
    var dashboardViewDiv = document.getElementById("dashboard-views");
    if (dashboardViewDiv.style.display == 'block' || dashboardViewDiv.style.display == '') {
        $("#delete-div_wrapper").ejWaitingPopup("show");
    }   

    var itemRequest = { itemViewName: $("#filter_name").val(), itemId: item_Id, itemViewId: $(this).attr("viewid"), userId: userId, userName: userName, isMultiDashboard: urlHasMultiTab, parentDashboardId: multiTabId, itemType: dashboardItemDetail.ItemType, }; 
    ajaxPostCall("POST", deleteViewUrl, itemRequest, null, deleteViewResult, deleteViewErrorResult, null);
});

function deleteViewResult(data) {
    if (embedConfig.IsEmbedCode ? data.Status : data.Result.Status) {
        var currentId = $("#delete_item").attr("viewId");
        $("#delete-content").hide();
        $("#delete-confirmation").show();
        $("#delete-confirmation .deleteItem").show();
        $(".successArea").show();
        $(".validationArea").hide();

        var dashboardObj = $('#dashboard').data("ejDashboardDesigner");
        if (currentId == dashboardObj.model.filterOverviewSettings.viewId && !embedConfig.IsEmbedCode && !urlHasMultiTab) {
            window.location.href = window.location.href.replace(window.location.search, "");
        }
        GetSavedFilter();
       
        if (currentId == dashboardObj.model.filterOverviewSettings.viewId) {
            dashboardObj.clearAllFilters();
            dashboardObj._updateFilterOverview(window.Server.App.LocalizationContent.UnsavedView, "");
            dashboardObj.model.filterOverviewSettings.viewName = null;
            dashboardObj.model.filterOverviewSettings.viewId = null;            
            dashboardObj.filterOverviewObj.enableSaveIcon = true; 
            dashboardObj.filterOverviewObj.enableSaveAsIcon = false; 
        }        
    }
    else {
        ("#delete-content").hide();
        $("#delete-confirmation").hide();
        $("#delete-error").show();
        $(".successArea").show();
    }
    $("#delete-div_wrapper").ejWaitingPopup("hide");
}

function deleteViewErrorResult() {
    messageBox("su-delete", window.Server.App.LocalizationContent.DeleteView, window.Server.App.LocalizationContent.InternalServerError, "success", function () {
        onCloseMessageBox();
    });
    $("#delete-div_wrapper").ejWaitingPopup("hide");
}

//Show Save text box section
$(document).on("click", "#save-view", function () {
    $("#save-section").show();
    $("#save-lable-section").hide();
    $("#filter_name").val("");
    $("#filter_name").focus();
});

//Copy View-Link
$(document).on("click", ".View-link-copy", function (e) {
    var browser = ej.browserInfo();
    if ($(e.target).parents().closest('li').length) {
        var parentElement = $(e.target).parents().closest('li');
        if (parentElement.find('.view-link').length) {
            var tempText = document.createElement("textarea");
            tempText.id = "copyTextArea";
            tempText.innerText = getViewsLink(parentElement.find('.view-link').attr('href'));
            document.querySelector("body").appendChild(tempText);
            var existsTextarea = document.getElementById("copyTextArea");
            existsTextarea.select();
            if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
                $(this).removeClass("su su-link");
                $(this).attr("data-original-title", "");
            }
            else {
                // copy the text to the clipboard
                document.execCommand('copy');

                $(this).attr("data-original-title", window.Server.App.LocalizationContent.Copysuccess).tooltip("show");

                setTimeout(function () {
                    $(".View-link-copy").attr("data-original-title", window.Server.App.LocalizationContent.LinkCopy); $(".View-link-copy").tooltip();
                }, 3000);
            }
            document.querySelector("body").removeChild(tempText);
        }

    }

});

//Generate uri for views with base url
function getViewsLink(viewsURL) {
    var baseUrlArray = baseUrl.split('/');
    return encodeURI(baseUrlArray[0] + "//" + baseUrlArray[2] + viewsURL);
}

//Saved Views List Height
function SavedViewHeight() {
    if ($('#saved-list').css('display') != "none") {
        var expandCollpase = iframeUrl == parentUrl ? (sameOrigin ? parent.$("#header-pane") : $("#header-pane")) : $("#header-pane");
        var savelabel = $("#entire-label-section");
        var unsaveFilter = $("#unsaved-filter");
        var unsaveFilterTitle = $("#unsaved-filter-title");
        var noFilter = $("#nofilters");
        var windowHeight = iframeUrl == parentUrl ? $((sameOrigin ? parent.window : window)).height() : $(window).height();
        var height = (windowHeight - expandCollpase.outerHeight() - savelabel.outerHeight() - (noFilter.css("display") != "none" ? noFilter.outerHeight() : 0) - (unsaveFilter.css("display") != "none" ? unsaveFilter.outerHeight() : 0) - (unsaveFilterTitle.css("display") != "none" ? unsaveFilterTitle.outerHeight() : 0));
        $("#saved-list").css("height", height);
        return height;
    }
}

function getFnObj(obj) {
    if (typeof obj === "function") return obj;
    if (typeof obj === "string" && window[obj])
        return obj;
}

function refreshScroller() {
    if ((typeof (isSlideshow) != "undefined" && isSlideshow) || (typeof (embedConfig) != "undefined" && typeof (embedConfig.IsEmbedDashboard) != "undefined" && embedConfig.IsEmbedDashboard)) {
        return;
    }

    var scrollerHeight = "";
    var scrollerWidth = 500;
    var scrollerHeightSavedFilter = "";
    if ($("#unsaved-filter-parameter").children().length) {
        scrollerHeight = $("#unsaved-filter-parameter").height() >= 230 ? 230 : $("#unsaved-filter-parameter").height() + 20;

        $("#unsaved-filter").ejScroller({
            height: scrollerHeight,
            width: scrollerWidth,
            scrollerSize: 7,
            buttonSize: 0,
            enableTouchScroll: false
        });
        var scrollercontrol = $("#unsaved-filter").ejScroller("instance");
        scrollercontrol.model.height = scrollerHeight;
        scrollercontrol.refresh();
        if ($("#unsaved-filter .e-vhandle").length) {
            var element = $("#unsaved-filter .e-vhandle");
            if (!(element.css('display') == "none")) {
                var height = element.height() + 29;
                element.css("height", height);
            }
        }
    }
    scrollerHeightSavedFilter = SavedViewHeight() - 10;
    if ($("#saved-list").length) {
        $("#saved-list")
            .ejScroller({
                height: scrollerHeightSavedFilter,
                width: scrollerWidth,
                scrollerSize: 9,
                buttonSize: 0,
                enableTouchScroll: iframeUrl == parentUrl ? (sameOrigin ? $("#is_mobile").val() : $("#is_mobile").val()) != "false" : $("#is_mobile").val() != "false"
            });
        var scrollercontrolSaved = $("#saved-list").ejScroller("instance");
        scrollercontrolSaved.model.height = scrollerHeightSavedFilter;
        scrollercontrolSaved.refresh();
        if ($("#saved-filter .e-vhandle").length) {
            var element = $("#saved-filter .e-vhandle");
            if (!(element.css('display') == "none")) {
                var height = element.height() + 29;
                element.css("height", height);
            }
        }
    } else if (iframeUrl == parentUrl) {
        (sameOrigin ? $("#saved-list") : $("#saved-list"))
            .ejScroller({
                height: scrollerHeightSavedFilter,
                width: scrollerWidth,
                scrollerSize: 9,
                buttonSize: 0,
                enableTouchScroll: iframeUrl == parentUrl ? $("#is_mobile").val() != "false" : $("#is_mobile").val() != "false"
            });
        if ((sameOrigin ? $("#saved-filter .e-vhandle") : $("#saved-filter .e-vhandle")).length) {
            var element = sameOrigin ? $("#saved-filter .e-vhandle") : $("#saved-filter .e-vhandle");
            if (!(element.css('display') == "none")) {
                var height = element.height() + 29;
                element.css("height", height);
            }
        }
    }

}

//filter details
function getcurrentfilters() {
    var dashboardElement = $('#dashboard');
    var dashboardObj = $('#dashboard').data("ejDashboardDesigner");
    if (iframeUrl == parentUrl) {
        var dashboardviewerObj = (sameOrigin ? parent.$('#dashboard').length : dashboardElement.length) > 0 ? (sameOrigin ? parent.$('#dashboard').data("ejDashboardDesigner").getCurrentFilters() : dashboardObj.getCurrentFilters()) : dashboardObj.getCurrentFilters();
    } else {
        var dashboardviewerObj = dashboardElement.length > 0 ? dashboardObj.getCurrentFilters() : dashboardObj.getCurrentFilters();
    }
    return dashboardviewerObj;
}

function clearAllFilters() {
    var dashboardviewerObj = $('#dashboard').data("ejDashboardDesigner");
    if ((viewId != null && viewId != "") || clearStatus) {
        dashboardviewerObj.model.filterParameters = initialQueryString;
        dashboardviewerObj.redrawDashboard();
    } else {
        $("#dashboard-view-toogle").ejWaitingPopup("hide");
    }
}

function getWidgetTitle(widgetId) {
    var widgetTitle = $('#dashboard').data("ejDashboardDesigner").getWidgetTitle(widgetId);
    return widgetTitle;
}

function clearWidgetFilter(widgetId, widgetType) {
    $('#dashboard').data("ejDashboardDesigner").clearWidgetFilter(widgetId, widgetType);
}

function onFilterOverviewUpdated(currentMasterData) {
    unsavedFilters(currentMasterData);
    $('[data-toggle="tooltip"]').tooltip();
    refreshScroller();
}

function unsavedFilters(currentMasterData) {
    var dashboardviewerObj = getcurrentfilters();
    if (dashboardviewerObj != "" && dashboardviewerObj != "undefined" && dashboardviewerObj != null) {
        if (currentMasterData != "" && currentMasterData != "undefined" && currentMasterData != null) {
            var querystring = currentMasterData.currentFilterData;
            updateInitialQueryStringParameter = querystring;
            if (queryStringStatus) {
                queryStringStatus = false;
                initialQueryString = dashboardviewerObj.encryptedData;
                initialQueryStringParameter = JSON.stringify(querystring);
            }
        }
    }
    $('#unsaved-filter-parameter').html('');
    var unsavedFilterOptions = "";
    var widgetDetails = "";
    var widgetTitle = "";
    var widgetType = "";
    var widgetId = "";
    var item = "";
    var result = "";
    if (dashboardviewerObj != "" && dashboardviewerObj != "undefined" && dashboardviewerObj != null && dashboardviewerObj.masterData != null && dashboardviewerObj.masterData.length > 0) {
        result = dashboardviewerObj.masterData;
        if (result.length > 0) {
            $("#unsaved-filter-parameter").show();
            for (var i = 0; i < result.length; i++) {
                var entireItem = "";
                var listItem = "";
                widgetId = result[i].Control;
                widgetDetails = getWidgetTitle(widgetId);
                widgetTitle = widgetDetails.title;
                widgetType = widgetDetails.type;
                item = result[i].Data;
                if (i != result.length - 1) {
                    unsavedFilterOptions +=
                    '<div class="cursor-default border-division"><div class="unsaved-opt"style="float: right;"><span class="opt"><span class="su su-close clear-filter cursor-pointer" data-toggle="tooltip" data-placement="left" data-original-title="' + window.Server.App.LocalizationContent.ClearFilter + '" widgetId ="' + widgetId + '"widgetType ="' + widgetType + '" style="float:right"></span></span></div><label class="cursor-default txt-overflow unsaved-filter-head">' + widgetTitle + '</label>';
                } else {
                    unsavedFilterOptions +=
                        '<div class="cursor-default border-division-last"><div class="unsaved-opt"style="float: right;"><span class="opt"><span class="su su-close clear-filter cursor-pointer" data-toggle="tooltip" data-placement="left" data-original-title="' + window.Server.App.LocalizationContent.ClearFilter + '" widgetId ="' + widgetId + '"widgetType ="' + widgetType + '" style="float:right"></span></span></div><label class="cursor-default txt-overflow unsaved-filter-head">' + widgetTitle + '</label>';
                }
                if (item.length) {
                    for (var j = 0; j < item.length; j++) {
                        entireItem = entireItem + item[j] + ",";
                        listItem = listItem + item[j] + "<br>";

                    }
                }
                entireItem = entireItem.slice(0, -1);
                unsavedFilterOptions +=
                           '<div id="sub-item"><label class="cursor-default txt-overflow unsavedfilter-font-content" rel="tooltip" data-placement="left" data-original-title="' + listItem + '">' + entireItem + '</label></div>';
                unsavedFilterOptions += '<br style="clear: both"></div>';
            }
            $("#unsaved-filter,#unsaved-filter-title").css("display", "block");
            $("#unsaved-filter-parameter").append(unsavedFilterOptions);
            refreshScroller();
            if (enableComment.toString().toLowerCase() == "true") {
                $("#new-save,#saved-filter-update,#saved-filter-Saveas,#save-filter,#filter_name").removeClass("pointer-events").css("opacity", 1);
            } else {
                $("#new-save,#saved-filter-update,#saved-filter-Saveas,#save-filter,#filter_name").addClass("pointer-events").css("opacity", 0.5);
            }
            $("#nofilters").css("display", "none");
            $("[rel=tooltip]").tooltip({ html: true });
        }
    } else {
        $("#new-save,#saved-filter-update,#saved-filter-Saveas,#save-filter,#filter_name").addClass("pointer-events").css("opacity", 0.5);
        $("#nofilters").css("display", "block");
        $("#unsaved-filter,#unsaved-filter-title").css("display", "none");
    }
}

function setDashboardWidth() {
    $("#dashboard").css("width", $(window).width() + "px");
}

function saveFilter(args) {
    currentQueryString = args.data.encryptedData;
    var dashboardElement = $('#dashboard');   
    var itemId = dashboardElement.prevAll("#favorite_Item").attr("data-item-id");
    var isMultiDashboard = urlHasMultiTab;
    var parentDashboardId = multiTabId;    
    if (args.viewId == null || args.viewId == "") {
        $("#save-view-popup").ejDialog("open");
        $("#save-view-popup_wrapper").ejWaitingPopup("show");
        $("#save-view-popup-iframe").attr("src", saveViewPopup + "?itemId=" + itemId + "&isMultidashboardId=" + isMultiDashboard + "&parentId=" + parentDashboardId + "&userId=" + userId + "&userName=" + userName + "&viewer=v2");
    }
    else {
        dashboardElement.ejWaitingPopup("show");
        var itemRequest = { itemId: item_Id, queryString: currentQueryString, itemViewId: args.viewId, userId: userId, userName: userName, isMultiDashboard: isMultiDashboard, parentDashboardId: parentDashboardId, itemType: dashboardItemDetail.ItemType };
        ajaxPostCall("POST", updateViewUrl, itemRequest, null, saveUpdateView, errorSaveUpdateView, null);        
        GetSavedFilter();
        refreshScroller();
    }
}

function saveUpdateView(data) {
    if (embedConfig.IsEmbedCode ? data.Status : data.Result.Status) {
        var dashboardElement = $('#dashboard'); 
        var dashboardviewerObj = dashboardElement.data("ejDashboardDesigner");
        initialQueryStringParameter = JSON.stringify(updateInitialQueryStringParameter);
        dashboardviewerObj.model.filterParameters = currentQueryString;
        dashboardElement.ejWaitingPopup("hide");
        messageBox("su-filter", window.Server.App.LocalizationContent.UpdateView, window.Server.App.LocalizationContent.UpdateViewSuccess, "success", function () {
            onCloseMessageBox();
        });
    }
    else {
        $("#save-section").hide();
        dashboardElement.ejWaitingPopup("hide");
        messageBox("su-filter", window.Server.App.LocalizationContent.UpdateView, window.Server.App.LocalizationContent.InternalServerError, "success", function () {
            onCloseMessageBox();
        });
    }
}

function errorSaveUpdateView() {
    $('#dashboard').ejWaitingPopup("hide");
    messageBox("su-filter", window.Server.App.LocalizationContent.UpdateView, window.Server.App.LocalizationContent.InternalServerError, "success", function () {
        onCloseMessageBox();
    });
}

function saveAsFilter(args) {
    currentQueryString = args.data.encryptedData;
    var itemId = $("#dashboard").prevAll("#favorite_Item").attr("data-item-id");
    var IsMultiDashboard = $("#dashboard").prevAll("#isMultiDashboard").attr("data-item-id");
    var parentDashboardId = $("#dashboard").prevAll("#isMultiDashboard").attr("data-parent-id");
    $("#save-view-popup").ejDialog("open");
    $("#save-view-popup_wrapper").ejWaitingPopup("show");
    $("#save-view-popup-iframe").attr("src", saveViewPopup + "?itemId=" + itemId + "&isMultidashboardId=" + IsMultiDashboard + "&parentId=" + parentDashboardId + "&userId=" + userId + "&userName=" + name + "&viewer=v2");    
}

function openViewSection() {
    $("#dashboard-view").trigger("click");
}

$(document).on("click", ".saved-view", function (e) {
    if (e.target.className == "saved-view" || e.target.className == "saved-opt" || e.target.className == "saved-filter txt-overflow") {
        var currentTarget = $(this);
        if ($(currentTarget).find(".applied-filters").length == 0) {
            var viewId = $(this).attr("viewid").trim();            
            if ($(".saved-list-content-div").find(".applied-filters").length > 0) {
                $(".applied-filters").remove();             
            }
            $(".saved-list-content-div").find(".saved-view").css("background-color", "initial").css("border-top", "0");
            $(currentTarget).append($("<span class='col-sm-4 no-padding loader-gif' style='display:inline; background-image:url(" + dashboardServerResourceUrl + "/images/waitingpopup.gif); background-size:cover; position:absolute; height:25px; width:25px;'></span>"));
            $.ajax({
                url: getViewParameterUrl,
                data: { itemId: item_Id, UserId: userId, UserName: userName, IsMultiDashboard: urlHasMultiTab, ViewId: viewId, parentDashboardId: multiTabId },
                type: "POST",
                success: function (data) {
                    var Result = "";
                    if (isUserAuthenticated === "false" && !embedConfig.IsEmbedCode && !embedConfig.IsEmbedDashboard) {
                        Result = data.viewDetails;
                    } else {
                        Result = JSON.parse(data.viewDetails);
                    }
                    var viewerObj = $("#dashboard").data("ejDashboardDesigner");                                       
                    if (viewerObj) {
                        var result = viewerObj._parseParameterQuery(Result.QueryString);
                        if (result != null && result.length > 0) {
                            if ((embedConfig.IsEmbedDashboard && !urlHasMultiTab) || embedConfig.IsEmbedCode) {                               
                                viewerObj.clearAllFilters();                               
                                viewerObj.model.filterOverviewSettings.viewName = Result.ViewName;
                                viewerObj.model.filterOverviewSettings.viewId = Result.ViewId;                               
                                viewerObj.option("filterParameters", Result.QueryString);
                                if (Result.CanEdit && embedConfig.IsEmbedCode && embedConfig.CanSaveView) {
                                    viewerObj.model.filterOverviewSettings.showSaveIcon = true;
                                } else {
                                    viewerObj.model.filterOverviewSettings.showSaveIcon = false;
                                }
                            }

                            for (var i = 0; i < result.length; i++) {
                                list = "<div class='applied-filters'><label class='list-items'>" + result[i].ColumnName + "</label><br />";
                                for (var j = 0; j < result[i].Data.length; j++) {
                                    list += "<label class='list-items'>" + result[i].Data[j] + "</label><br />";
                                }
                                list += "</div>";
                                currentTarget.find(".applied-filters").length == 0 ? currentTarget.append(list) : $(".applied-filters").last().after(list);
                            }

                        }
                    }
                    $(currentTarget).css("background-color", "#f2f2f2");
                    $(currentTarget).css("border-top", "0.5px solid #C4CED7");
                    $("span.loader-gif").remove();
                }
            });
        }
    }
});

$(document).on("click", ".view-link", function (e) {
    if (!urlHasMultiTab && (embedConfig.IsEmbedDashboard || embedConfig.IsEmbedCode)) {
        e.preventDefault();
        $(this).parent().parent().click();
    }
});

$(document).on("keydown", "#view-name", function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        $("#save-button").trigger("click");
    }
});

function switchFullscreenMode() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else {
            if ("ActiveXObject" in window) {
                var wscript = new ActiveXObject("Wscript.shell");
                wscript.SendKeys("{F11}");
                setTimeout(function () {
                    if ((screen.availHeight || screen.height - 30) <= window.innerHeight) {
                        $("body").addClass("hide-dashboard-icons");
                        $("#dashboard-fullscreen").removeClass("su-maximize-1").addClass("su-minimize").attr("data-tooltip", window.Server.App.LocalizationContent.ExitFullscreen);
                    } else {
                        $("body").removeClass("hide-dashboard-icons");
                        $("#dashboard-fullscreen").addClass("su-maximize-1").removeClass("su-minimize").attr("data-tooltip", window.Server.App.LocalizationContent.Fullscreen);
                    }
                }, 400);
            }
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

function fullscreenExitHandler() {
    if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        $("body").removeClass("hide-dashboard-icons");
        $("#dashboard-fullscreen").addClass("su-maximize-1").removeClass("su-minimize").attr("data-tooltip", window.Server.App.LocalizationContent.Fullscreen);
    } else {
        $("body").addClass("hide-dashboard-icons");
        $("#dashboard-fullscreen").removeClass("su-maximize-1").addClass("su-minimize").attr("data-tooltip", window.Server.App.LocalizationContent.ExitFullscreen);
    }

    var data = $("#dashboard").ejDashboardDesigner();
    data.resize();
}

(function ($) {
    $.fn.swipeDetector = function (options) {
        var swipeState = 0;
        var startX = 0;
        var startY = 0;
        var pixelOffsetX = 0;
        var pixelOffsetY = 0;
        var swipeTarget = this;
        var defaultSettings = {
            swipeThreshold: 70,
            useOnlyTouch: false
        };

        (function init() {
            options = $.extend(defaultSettings, options);
            swipeTarget.on('mousedown touchstart', swipeStart);
            $('html').on('mouseup touchend', swipeEnd);
            $('html').on('mousemove touchmove', swiping);
        })();

        function swipeStart(event) {
            if (options.useOnlyTouch && !event.originalEvent.touches)
                return;

            if (event.originalEvent.touches)
                event = event.originalEvent.touches[0];

            if (swipeState === 0) {
                swipeState = 1;
                startX = event.clientX;
                startY = event.clientY;
            }
        }

        function swipeEnd(event) {
            if (swipeState === 2) {
                swipeState = 0;

                if (Math.abs(pixelOffsetX) > Math.abs(pixelOffsetY) &&
                    Math.abs(pixelOffsetX) > options.swipeThreshold) {
                    if (pixelOffsetX < 0) {
                        swipeTarget.trigger($.Event('swipeLeft.sd'));
                    } else {
                        swipeTarget.trigger($.Event('swipeRight.sd'));
                    }
                } else if (Math.abs(pixelOffsetY) > options.swipeThreshold) {
                    if (pixelOffsetY < 0) {
                        swipeTarget.trigger($.Event('swipeUp.sd'));
                    } else {
                        swipeTarget.trigger($.Event('swipeDown.sd'));
                    }
                }
            }
        }

        function swiping(event) {
            if (swipeState !== 1)
                return;


            if (event.originalEvent.touches) {
                event = event.originalEvent.touches[0];
            }

            var swipeOffsetX = event.clientX - startX;
            var swipeOffsetY = event.clientY - startY;

            if ((Math.abs(swipeOffsetX) > options.swipeThreshold) ||
                (Math.abs(swipeOffsetY) > options.swipeThreshold)) {
                swipeState = 2;
                pixelOffsetX = swipeOffsetX;
                pixelOffsetY = swipeOffsetY;
            }
        }

        return swipeTarget;
    };
}(jQuery));

function PreloadResources(resourceLinkArray, resourceType) {
    setTimeout(function () {
        var isSafariOrEdge = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) || (navigator.userAgent.indexOf("Edge") != -1);
        for (var resource = 0; resource < resourceLinkArray.length; resource++) {
            var preloadLink = document.createElement("link");
            preloadLink.href = resourceLinkArray[resource];
            preloadLink.rel = isSafariOrEdge ? "preload" : "prefetch";
            preloadLink.as = resourceType;
            document.head.appendChild(preloadLink);
        }
    });
}

function ShareView(obj) {
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();
    var popupWidth = $("#viewShare_popup").width();
    var popupHeight = $("#viewShare_popup").height();
    var leftPostition = (parseInt(windowWidth) - parseInt(popupWidth)) / 2;
    var topPostition = (parseInt(windowHeight) - parseInt(popupHeight)) / 2;
    if (topPostition < 0) {
        topPostition = 0;
    }
    $("#viewShare_popup").css({ "left": leftPostition, "top": topPostition });
    $("#viewShare_popup,.ViewShare_popup_shadow").css("display", "block");
    $("#sharepopup_wrapper_WaitingPopup").css("display", "block");
    $("#viewShare_popup_iframe").attr("src", itemViewShareIframeUrl + "?itemId=" + obj.viewId);
}

//MessageBox
function onCloseMessageBox() {
    $("#messageBox").ejDialog("close");
}

function onMessageDialogClose() {
    $("#messageBox").find(".message-content").text("");
    $(".message-box-btn-holder").html("");
    $(".message-box-close").html("");
}

function messageBox(messageIcon, messageHeader, messageText, type, successCallback, errorCallback, width, height, maxHeight, cssClass) {
    $("#messageBox").find(".message-content").text("");

    if (messageHeader === window.Server.App.LocalizationContent.DeleteComment) {
        $("#messageBox_wrapper").addClass("delete-comment");
    }

    $(".message-box-btn-holder").html("");
    $(".message-box-close").html("");
    $("#messageBox").find(".message-header").html("<span class='su " + messageIcon + "'></span> <span class='modal-title' data-toggle='tooltip' data-placement='bottom' data-container='body' title='" + messageHeader + "'  >" + messageHeader + "</h2>");
    $("#messageBox").find(".message-content").html(messageText);
    if (type == "error") {
        var successButton;
        var closeIcon;
        var errorButton;
        if (successCallback != undefined) {
            successButton = $("<input type='button' class='delete-save-confirmation app-button app-critical-action-button pull-right' value='" + window.Server.App.LocalizationContent.YesButton + "'></input>");
            successButton.bind("click", $.proxy(getFnObj(successCallback), window));
        }
        if (errorCallback != undefined) {
            errorButton = $("<input type='button' class='delete-cancel-confirmation app-button app-secondary-button pull-right' value='" + window.Server.App.LocalizationContent.NoButton + "'></input>");
            errorButton.bind("click", $.proxy(getFnObj(errorCallback), window));
            closeIcon = $('<span class="su su-close"></span>');
            closeIcon.bind("click", $.proxy(getFnObj(errorCallback), window));
        }
        else {
            errorButton = $("<input type='button' class='delete-cancel-confirmation app-button app-secondary-button pull-right' value='" + window.Server.App.LocalizationContent.NoButton + "'></input>");
            closeIcon = $('<span class="su su-close"></span>');
            errorButton.click(function () {
                onCloseMessageBox();
            });
            closeIcon.click(function () {
                onCloseMessageBox();
            });
        }
        $(".message-box-close").html(closeIcon);
        $(".message-box-btn-holder").append(errorButton, successButton);
        $("#messageBox").unbind("keydown");
    }
    else {
        var successButton;
        var closeIcon;
        if (successCallback != undefined) {
            successButton = $("<input type='button' class='app-button app-secondary-button' value='" + window.Server.App.LocalizationContent.OKButton + "'></input>");
            successButton.bind("click", $.proxy(getFnObj(successCallback), window));
            closeIcon = $('<span class="su su-close"></span>');
            closeIcon.bind("click", $.proxy(getFnObj(successCallback), window));
        }
        else {
            successButton = $("<input type='button' class='app-button app-secondary-button' value='" + window.Server.App.LocalizationContent.OKButton + "'></input>");
            closeIcon = $('<span class="su su-close"></span>');
            successButton.click(function () {
                onCloseMessageBox();
            });
            closeIcon.click(function () {
                onCloseMessageBox();
            });
        }
        $(".message-box-close").html(closeIcon);
        $(".message-box-btn-holder").append(successButton);
        $("#messageBox").on("keydown", function (event) {
            switch (event.keyCode) {
                case 13:
                case 27:
                    successButton.click();
            }
        });
    }

    $('[data-toggle="tooltip"]').tooltip();
    $("#messageBox").ejDialog("open");
    $("#messageBox").focus();
    var sizeobj = $("#messageBox").data("ejDialog");
    setTimeout(function () {
        if (width != undefined)
            sizeobj.option("width", width);
        if (window.innerWidth > 1040) {
            if (height == undefined)
                height = $("#messageBox").find(".modal-content").height() + 135 + "px";
        }
        sizeobj.option("height", height);
        if (maxHeight != undefined)
            sizeobj.option("maxHeight", maxHeight);
    }, 50);
    if (cssClass != null && cssClass != undefined) {
        sizeobj.option("cssClass", cssClass);
    }

    var messageBoxHeight = $(".message-header").outerHeight(true) + $(".message-content.text-center").outerHeight(true) + $(".message-box-btn-holder").outerHeight(true) + 5;
    $("#messageBox").height(messageBoxHeight + "px");
    $("#messageBox_wrapper .e-dialog-scroller.e-scroller.e-js.e-widget").height($("#messageBox").outerHeight(true) + "px");
}

if (typeof (isSlideshow) != "undefined" && isSlideshow) {
    $("#dashboard").swipeDetector().on("swipeLeft.sd swipeRight.sd swipeUp.sd swipeDown.sd", function (obj) {
        var evt = new CustomEvent('onSwipeDetected', { detail: obj });
        window.parent.document.dispatchEvent(evt);
    });
}

function beforeSendSaveView(req) {
    var proxy = parent.$('#dashboard').data("ejDashboardDesigner");
    req.setRequestHeader('ejAuthenticationToken', proxy._authenticationToken);
}

$(document).on("click", ".mark-default", function (e) {
    var viewDetails = $(this).parent().parent().parent().find("span .opt");
    var viewId = viewDetails.attr("viewid");
    var itemId = viewDetails.attr("itemid");
    var viewName = viewDetails.attr("viewname");
    var markDefaultMessage = "<span style='color: #0565ff;font-style: italic'>" + viewName + "</span>" + window.Server.App.LocalizationContent.SetAsDefault + "<br><strong style='float:left;padding-top:15px;width:100%' class='note'>" + window.Server.App.LocalizationContent.Note + "</strong><div>" + window.Server.App.LocalizationContent.DefaultView + "</div>";

    $(".server-dashboard-view").ejWaitingPopup("show");

    if (isDefaultView) {
        if (hasDefaultView) {
            $(".server-dashboard-view").ejWaitingPopup("hide");
            messageBox("su-set-default", window.Server.App.LocalizationContent.SetAsDefaultView, window.Server.App.LocalizationContent.SetAsDefaultConfirmation + markDefaultMessage, "error", function () {

                $(".server-dashboard-view").ejWaitingPopup("show");
                $.ajax({
                    url: updateDefaultValueUrl,
                    data: { viewId: viewId, defaultValue: true, itemId: itemId, userId: userId },
                    type: "POST",
                    success: function (result) {
                        if (result.toLowerCase() == "true") {
                            onCloseMessageBox();
                            $(".server-dashboard-view").ejWaitingPopup("hide");
                            $(".mark-default").text(window.Server.App.LocalizationContent.RemoveAsDefaultTitle);
                            SuccessAlert(window.Server.App.LocalizationContent.SetAsDefaultView, window.Server.App.LocalizationContent.SetAsDefaultViewSuccess, 5000);
                            GetSavedFilter();
                            refreshScroller();
                        }
                        else {
                            WarningAlert(window.Server.App.LocalizationContent.SetAsDefaultView, window.Server.App.LocalizationContent.SetAsDefaultViewError, 5000);
                        }
                    }
                });

                $(".server-dashboard-view").ejWaitingPopup("hide");
            });
            GetSavedFilter();
            refreshScroller();
        }
        else if (!hasDefaultView) {
            $.ajax({
                url: updateDefaultValueUrl,
                data: { viewId: viewId, defaultValue: true, itemId: itemId, userId: userId },
                type: "POST",
                success: function (result) {
                    onCloseMessageBox();
                    $(".server-dashboard-view").ejWaitingPopup("hide");
                    if (result.toLowerCase() == "true") {
                        hasDefaultView = true;
                        $(".mark-default").text(window.Server.App.LocalizationContent.RemoveAsDefaultTitle);
                        SuccessAlert(window.Server.App.LocalizationContent.SetAsDefaultView, window.Server.App.LocalizationContent.SetAsDefaultViewSuccess, 5000);
                        GetSavedFilter();
                        refreshScroller();
                    }
                    else {
                        WarningAlert(window.Server.App.LocalizationContent.SetAsDefaultView, window.Server.App.LocalizationContent.SetAsDefaultViewError, 5000);
                    }
                }
            });
        }
    }
    else {
        if (isAdmin) {
            $(".server-dashboard-view").ejWaitingPopup("hide");
            var dashboardSettings = window.Server.App.LocalizationContent.DefaultViewSettingDisabled + "<a href='" + dashboardSettingsUrl + "' target='_blank' >" + window.Server.App.LocalizationContent.DashboardSettingsContent;            
            messageBox("su-set-default", window.Server.App.LocalizationContent.SetAsDefaultView, dashboardSettings, "success", function () { onCloseMessageBox(); });
        }
        else {
            $(".server-dashboard-view").ejWaitingPopup("hide");
            messageBox("su-set-default", window.Server.App.LocalizationContent.SetAsDefaultView, window.Server.App.LocalizationContent.EnableDefaultView, "success", function () { onCloseMessageBox(); });
        }
    }
});

$(document).on("click", "#mark-as-default-confirmed", function () {
    $(".server-dashboard-view").ejWaitingPopup("show");
    $.ajax({
        url: updateDefaultValueUrl,
        data: { viewId: viewId, defaultValue: true, itemId: itemId },
        type: "POST",
        success: function (result) {
            if (result.toLowerCase() == "true") {
                onCloseMessageBox();
                isDefaultView = true;
                $(".server-dashboard-view").ejWaitingPopup("hide");
                $(".mark-default").text(window.Server.App.LocalizationContent.RemoveAsDefaultTitle);
                SuccessAlert(window.Server.App.LocalizationContent.SetAsDefaultView, window.Server.App.LocalizationContent.SetAsDefaultViewSuccess, 5000);
                GetSavedFilter();
                refreshScroller();
            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.SetAsDefaultView, window.Server.App.LocalizationContent.SetAsDefaultViewError, 5000);
            }
        }
    });
});

$(document).on("click", ".remove-default", function (e) {
    var viewDetails = $(this).parent().parent().parent().find("span .opt");
    var viewId = viewDetails.attr("viewid");
    var itemId = viewDetails.attr("itemid");
    var viewName = viewDetails.attr("viewname");

    var htmlString = "<span style='color: #0565ff;font-style: italic'>" + viewName + "</span> ? <br><strong style='float:left; padding-top:15px; width: 100%' class='note'>" + window.Server.App.LocalizationContent.Note + "</strong><span> " + window.Server.App.LocalizationContent.RemoveAsDefaultMessage +"</span>";
    messageBox("su-remove-default", window.Server.App.LocalizationContent.RemoveAsDefaultView, window.Server.App.LocalizationContent.RemoveAsDefaultConfirmation + htmlString, "error", function () {
        $(".server-dashboard-view").ejWaitingPopup("show");
        $.ajax({
            url: updateDefaultValueUrl,
            data: { viewId: viewId, defaultValue: false, itemId: itemId, userId: userId },
            type: "POST",
            success: function (result) {
                onCloseMessageBox();
                $(".server-dashboard-view").ejWaitingPopup("hide");
                if (result.toLowerCase() == "true") {
                    hasDefaultView = false;
                    SuccessAlert(window.Server.App.LocalizationContent.RemoveAsDefaultView, window.Server.App.LocalizationContent.RemoveAsDefaultViewSuccess, 5000);
                    GetSavedFilter();
                    refreshScroller();
                }
                else {
                    WarningAlert(window.Server.App.LocalizationContent.SetAsDefaultView, window.Server.App.LocalizationContent.SetAsDefaultViewError, 5000);
                }
            }
        });
    });
});