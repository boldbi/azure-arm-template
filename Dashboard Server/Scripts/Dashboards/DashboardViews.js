var containSaveFilter = false;
var queryStringStatus = true;
var clearStatus = false;
var initialQueryString = ""
var initialQueryStringParameter = "";
var updateInitialQueryStringParameter = "";
var saveFilterName = "";
var list;
var currentQueryString = "";
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

    var deleteDivWrapperWaitingPopupTemplateId = createLoader("delete-div_wrapper");
    $("#delete-div_wrapper").ejWaitingPopup({ template: $("#" + deleteDivWrapperWaitingPopupTemplateId) });

    $("#save-view-popup").ejDialog({
        width: "450px",
        height: "150px",
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        title: window.Server.App.LocalizationContent.SaveView,
        enableModal: true,
        showHeader: false,
    });
    var saveViewWaitingPopupTemplateId = createLoader("save-view-popup_wrapper");
    $("#save-view-popup_wrapper").ejWaitingPopup({ template: $("#" + saveViewWaitingPopupTemplateId) });
    $("#dashboard-view-toogle").mouseover(function () {
        var ele = document.getElementById("dashboard-views");
        if (ele != null && !(ele.style.display == 'block' || ele.style.display == '')) {
            $("#dashboard-view-toogle").addClass("cursor-pointer");
            $("#dashboard-view-toogle").removeClass("cursor-default");
        } else {
            $("#dashboard-view-toogle").addClass("cursor-default");
            $("#dashboard-view-toogle").removeClass("cursor-pointer");
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

    if (typeof (isSlideshow) != "undefined" && isSlideshow) {
        $("#dashboard").swipeDetector().on("swipeLeft.sd swipeRight.sd swipeUp.sd swipeDown.sd", function (obj) {
            var evt = new CustomEvent('onSwipeDetected', { detail: obj })
            window.parent.document.dispatchEvent(evt)
        });
    }

    if (document.addEventListener) {
        document.addEventListener('webkitfullscreenchange', fullscreenExitHandler, false);
        document.addEventListener('mozfullscreenchange', fullscreenExitHandler, false);
        document.addEventListener('fullscreenchange', fullscreenExitHandler, false);
        document.addEventListener('MSFullscreenChange', fullscreenExitHandler, false);
    }
});

//Dashboard View Toggle when click outside
$(document).on('click', "#close-container,#close-filter,#close-comment", function (e) {
    if ($("#is_mobile").val() == "true") {
        return;
    }

    var ele = document.getElementById("dashboard-views");
    if (ele != null && (ele.style.display == 'block' || ele.style.display == '') && (e.target.className.toLowerCase() != "su-view" && e.target.className.toLowerCase() != "options" && e.target.id.toLowerCase() != "views")) {
        var clickedOn = $(e.target);
        if (((!(clickedOn.parents().andSelf().is('#dashboard-view-toogle'))) && (!(clickedOn.parents().andSelf().is("#PopupContainerDelete"))) && (!(clickedOn.parents().andSelf().is("#messageBox")))) || ((clickedOn.parents().andSelf().is('#close-container')))) {
            CloseDashboardView();
        }
    } else {
        if (e.target.id == "dashboard-view-toogle") {
            if (containSaveFilter) {
                $("#saved-filter").show();
            }
            $("#dashboard").toggleClass("dashboard");
            $(".view-heading").toggle();
            $("#dashboard-views").toggle();
            $("#dashboard-view-toogle").addClass("cursor-default");
            $("#dashboard-view-toogle").removeClass("cursor-pointer");
            $("#dashboard-view-toogle").toggleClass("dashboard-view-toogle");
            refreshScroller();
        }
    }
    if (!$("#commentModuleContainer").hasClass("displayNone") && e.target.id.toLowerCase() != "comments" && !e.target.classList.contains("su-with-comment") && !e.target.classList.contains("su-without-comment") && e.target.className.toLowerCase() != "options") {
        $(".options li").removeClass("active");
        $(".options").css("right", "0px");
        if (enableComment == "true") {
            closeDashboardComment();
        }
        else {
            $('#dashboard').data("ejDashboardViewer").closeFilterPanel();
            $(".options li").removeClass("active");
            $(".options").css("right", "0px");
            $("#filter-view p#validation-message").remove();
            $("#close-filter a").css("display", "none");
            $("#filter-view").hide();
        }
        setDashboardWidth();
        var data = $("#dashboard").data("ejDashboardViewer");
        data.resizeDashboard();
    }
    else if ((($('#dashboard').data("ejDashboardViewer").getFilterPanelState() == "opened" || $('#dashboard').data("ejDashboardViewer").getFilterPanelState() != null || $("#validation-message").text() != "") && e.target.id.toLowerCase() != "filters" && !e.target.classList.contains("su-filter") && e.target.className.toLowerCase() != "options" && !e.target.offsetParent.id.startsWith("filter-view")) || e.target.className.toLowerCase() == "su su-close") {
        $('#dashboard').data("ejDashboardViewer").closeFilterPanel();
        $(".options li").removeClass("active");
        $(".options").css("right", "0px");
        $("#filter-view p#validation-message").remove();
        $("#close-filter a").css("display", "none");
        $("#filter-view").hide();
        setDashboardWidth();
        var data = $("#dashboard").data("ejDashboardViewer");
        data.resizeDashboard();
    }
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
        $(".options").css("right", "0px");
        $(".options li").removeClass("active");
        if ($("#is_mobile").val() == "false") {
            setDashboardWidth();
            var data = $("#dashboard").data("ejDashboardViewer");
            data.resizeDashboard();
        }
    }
    else {
        if (containSaveFilter) {
            $("#dashboard_render_iframe").contents().find("#saved-filter").show();
        }
        $("#dashboard_render_iframe").contents().find("#dashboard").toggleClass("dashboard");
        $("#dashboard_render_iframe").contents().find(".view-heading").toggle();
        $("#dashboard_render_iframe").contents().find("#dashboard-views").toggle();
        $("#dashboard_render_iframe").contents().find("#dashboard-view-toogle").toggleClass("dashboard-view-toogle");
        $("#dashboard_render_iframe").contents().find("#dashboard-view-toogle #close-container a").css("display", "none");
    }
}

//Render on complete action
function filterView() {
    $("#dashboard-view-toogle").ejWaitingPopup("show");
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
    $("#dashboard-view-toogle").ejWaitingPopup("hide");
}

//Clear Filter
$(document).on("click", "#clear", function () {
    dashboardviewerObj = $('#dashboard').data("ejDashboardViewer");
    dashboardviewerObj.refresh();
});

//Save filter post action
$(document).on("click", "#save-button", function () {
    name = $("#user-name").attr("value");
    id = $("#user-id").attr("value");
    saveFilterName = $("#view-name").val();
    AddView();
});

//Add View Name Function
function AddView() {
    var _data = "Datas";
    var link = "";
    var proxy = parent.$('#dashboard').data("ejDashboardViewer");
    var queryString = getcurrentfilters().encryptedData;
    var userName = name;
    var userId = id;
    var dashboardViewDiv = document.getElementById("dashboard-views");
    pageurl = typeof pageurl != "undefined" ? pageurl : viewUrl;

    if ($("#save-view-form").valid()) {
        parent.$("#save-view-popup_wrapper").ejWaitingPopup("show");
        $.ajax({
            url: addViewUrl,
            data: { name: _data, ItemViewName: saveFilterName, QueryString: queryString, itemId: parent.$("#dashboard").prevAll("#favorite_Item").attr("data-item-id"), UserId: userId, UserName: userName, IsMultiDashboard: parent.$("#dashboard").prevAll("#isMultiDashboard").attr("data-item-id"), parentDashboardId: parent.$("#dashboard").prevAll("#isMultiDashboard").attr("data-parent-id") },
            type: "POST",
            beforeSend: function (req) {
                req.setRequestHeader('ejAuthenticationToken', proxy._authenticationToken);
            },
            success: function (data) {
                if (data.StatusMessage.trim().toLowerCase() == "name already exists") {
                    $(".validation-errors").html("View Name already exists.");
                    $("#view-name").addClass("has-error");
                }
                else {
                    closeSaveViewPopup();
                    clearStatus = true;
                    initialQueryString = queryString;
                    initialQueryStringParameter = JSON.stringify(updateInitialQueryStringParameter);
                    messageBox("su-filter", window.Server.App.LocalizationContent.AddView, window.Server.App.LocalizationContent.AddViewSuccess, "success", function () {
                        onCloseMessageBox();
                        parent.$("#dashboard-view-toogle").ejWaitingPopup("show");
                        parent.$("#dashboard-view-toogle").find("#no-filters").css("display", "none");
                        parent.$("#dashboard-view-toogle").ejWaitingPopup("hide");
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
                    GetSavedFilter();
                    refreshScroller();
                }
                parent.$('#dashboard').data("ejDashboardViewer").updateFilterOverview(saveFilterName, savedViewId);
                $("#dashboard-view-toogle").ejWaitingPopup("hide");
                parent.$("#save-view-popup_wrapper").ejWaitingPopup("hide");
            },
            error: function (data) {
                messageBox("su-filter", window.Server.App.LocalizationContent.AddView, window.Server.App.LocalizationContent.InternalServerError, "success", function () {
                    onCloseMessageBox();
                });
                $("#dashboard-view-toogle").ejWaitingPopup("hide");
                parent.$("#save-view-popup_wrapper").ejWaitingPopup("hide");
            }
        });
    }
}

//Get Saved Filters
function GetSavedFilter() {
    var dashboardviewerObj = $('#dashboard').data("ejDashboardViewer");
    if (iframeUrl == parentUrl) {
        item_Id = typeof item_ID != "undefined" ? item_Id : parent.$("#dashboard").prevAll("#favorite_Item").attr("data-item-id") != undefined ? parent.$("#dashboard").prevAll("#favorite_Item").attr("data-item-id") : $("#dashboard").prevAll("#favorite_Item").attr("data-item-id");
        isMultiDashboard = typeof isMultiDashboard != "undefined" ? isMultiDashboard : parent.$("#dashboard").prevAll("#isMultiDashboard").attr("data-item-id") != undefined ? parent.$("#dashboard").prevAll("#isMultiDashboard").attr("data-item-id") : $("#dashboard").prevAll("#isMultiDashboard").attr("data-item-id");
        parentDashboardId = typeof parentDashboardId != "undefined" ? parentDashboardId : parent.$("#dashboard").prevAll("#isMultiDashboard").attr("data-parent-id") != undefined ? parent.$("#dashboard").prevAll("#isMultiDashboard").attr("data-parent-id") : $("#dashboard").prevAll("#isMultiDashboard").attr("data-parent-id");
    } else {
        item_Id = typeof item_ID != "undefined" ? item_Id : $("#dashboard").prevAll("#favorite_Item").attr("data-item-id") != undefined ? $("#dashboard").prevAll("#favorite_Item").attr("data-item-id") : $("#dashboard").prevAll("#favorite_Item").attr("data-item-id");
        isMultiDashboard = typeof isMultiDashboard != "undefined" ? isMultiDashboard : $("#dashboard").prevAll("#isMultiDashboard").attr("data-item-id") != undefined ? $("#dashboard").prevAll("#isMultiDashboard").attr("data-item-id") : $("#dashboard").prevAll("#isMultiDashboard").attr("data-item-id");
        parentDashboardId = typeof parentDashboardId != "undefined" ? parentDashboardId : $("#dashboard").prevAll("#isMultiDashboard").attr("data-parent-id") != undefined ? $("#dashboard").prevAll("#isMultiDashboard").attr("data-parent-id") : $("#dashboard").prevAll("#isMultiDashboard").attr("data-parent-id");
    }
    userName = typeof userName != "undefined" ? userName : name;
    userId = typeof userId != "undefined" ? userId : id;
    pageurl = typeof pageurl != "undefined" ? pageurl : viewUrl;
    var childDashboardName = isMultiDashboard.toLowerCase() == "true" ? $("#dashboard").length != 0 ? $("#dashboard").find("li.e-active").find("span").html().trim() : parent.$("#dashboard").find("li.e-active").find("span").html().trim() : "";
    $.ajax({
        url: getSavedViewUrl,
        data: { itemId: item_Id, UserId: userId, UserName: userName, IsMultiDashboard: isMultiDashboard, parentDashboardId: parentDashboardId },
        success: function (data) {
            $('#saved-filter').length > 0 ? $('#saved-filter').html("") : parent.$('#saved-filter').html("");
            var savedFilter =
                '<div id="saved-list" style="display: block"><div class="saved-list-content-div" style="float: left">'
            var Result = jQuery.parseJSON(data.Result);
            if (Result.length > 0) {
                containSaveFilter = true;
                $('#saved-filter').length > 0 ? $('#saved-filter').show() : parent.$('#saved-filter').show();
                for (var i = 0; i < Result.length; i++) {
                    var ViewId = Result[i].ViewId;
                    var savedFilterOptions = "";
                    if (Result[i].CanDelete && Result[i].CanShare) {
                        savedFilterOptions =
                            '<div class="saved-opt"><span class="opt" viewid="' +
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
                    } else if (Result[i].CanDelete) {
                        savedFilterOptions =
                            '<div class="saved-opt"><span class="opt" viewid="' +
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
                    } else if (Result[i].CanShare) {
                        savedFilterOptions =
                            '<div class="saved-opt"><span class="opt" viewid="' + ViewId + '" itemId="' + item_Id + '" viewname="' + Result[i].ViewName + '"><span  viewid="' +
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
                    } else {
                        savedFilterOptions =
                           '<div class="saved-opt"><span class="opt" viewid="' + ViewId + '" itemId="' + item_Id + '" viewname="' + Result[i].ViewName + '"><span  viewid="' +
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

                $("#dashboard-view-toogle").length > 0 ? $("#dashboard-view-toogle").find("#saved-list").length == 0 ? $("#dashboard-view-toogle").find("#no-filters").css("display", "block") : $("#dashboard-view-toogle").find("#no-filters").css("display", "none") : parent.$("#dashboard-view-toogle").find("#saved-list").length == 0 ? parent.$("#dashboard-view-toogle").find("#no-filters").css("display", "block") : parent.$("#dashboard-view-toogle").find("#no-filters").css("display", "none");
                if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
                    $(".View-link-copy").removeClass("su su-link");
                    $(".View-link-copy").attr("data-original-title", "");
                }
                $("#dashboard-view-toogle").length > 0 ? $("#dashboard-view-toogle").show() : parent.$("#dashboard-view-toogle").show();
                parent.$('[data-toggle="tooltip"]').tooltip();
            } else {
                containSaveFilter = false;
                $('#saved-filter').length > 0 ? $('#saved-filter').hide() : parent.$('#saved-filter').hide();
                dashboardviewerObj = $('#dashboard').data("ejDashboardViewer");
            }
            refreshScroller();
        },
        error: function (data) {
            resetViewPanel();
            SavedViewHeight();
            refreshScroller();
        }
    });
}

//Open the Saved view in new tab
$(document).on("click", ".view", function () {
    var viewId = $(this).attr("viewid");
    window.open(window.location.pathname + '?viewid=' + viewId, '_blank');
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

//update view action
$(document).on("click", "#update-view", function () {
    $("#update-view").show();
    var dashboardViewDiv = document.getElementById("dashboard-views");
    if (dashboardViewDiv.style.display == 'block' || dashboardViewDiv.style.display == '') {
        $("#dashboard-view-toogle").ejWaitingPopup("show");
    }

    var proxy = $('#dashboard').data("ejDashboardViewer");
    var queryString = getcurrentfilters().encryptedData;
    var dashboardviewerObj = $('#dashboard').data("ejDashboardViewer");
    $.ajax({
        type: "POST",
        url: updateViewUrl,
        data: { itemId: item_Id, QueryString: queryString, itemViewId: $(this).attr("viewid"), UserId: userId, UserName: userName, IsMultiDashboard: isMultiDashboard, parentDashboardId: parentDashboardId },
        beforeSend: function (req) {
            req.setRequestHeader('ejAuthenticationToken', proxy._authenticationToken);
        },
        success: function (data) {
            if (data.Result.Status == true) {
                queryStringStatus = true;
                if (queryStringStatus) {
                    queryStringStatus = false;
                    initialQueryStringParameter = JSON.stringify(updateInitialQueryStringParameter);
                    dashboardviewerObj.model.filterParameters = queryString;
                    dashboardviewerObj.redrawDashboard();
                }
                $("#update-view").addClass("pointer-events");
                $("#update-view").css("opacity", 0.5);
                messageBox("su-filter", window.Server.App.LocalizationContent.UpdateView, window.Server.App.LocalizationContent.UpdateViewSuccess, "success", function () {
                    onCloseMessageBox();
                });
            }
            else {
                $("#save-section").hide();
                messageBox("su-filter", window.Server.App.LocalizationContent.UpdateView, window.Server.App.LocalizationContent.InternalServerError, "success", function () {
                    onCloseMessageBox();
                });
            }
        },
        error: function () {
            messageBox("su-filter", window.Server.App.LocalizationContent.UpdateView, window.Server.App.LocalizationContent.InternalServerError, "success", function () {
                onCloseMessageBox();
            });
            $("#dashboard-view-toogle").ejWaitingPopup("show");
        }
    });
    GetSavedFilter();
    refreshScroller();
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
    $("#delete-div").ejDialog("close");
    $("#dashboard-view-toogle").ejWaitingPopup("show");
    $("#dashboard-view-toogle").find("#saved-list").length == 0 ? $("#no-filters").css("display", "block") : $("#no-filters").css("display", "none");
    $("#dashboard-view-toogle").ejWaitingPopup("hide");
}

//Delete dialog open
function onDeleteItemDialogOpen() {
    $("#dashboard").ejDashboardViewer("instance").closeAllWindows();
    $("#delete-div").ejDialog("open");
    $("#delete-msg").show();
    $('#delete-div').focus();
}

function resetViewPanel() {
    $("#save-lable-section label").html("");
    $("#entire-label-section label").html(window.Server.App.LocalizationContent.UnsavedView);
    if ($("#is_mobile").val() == "true" || isUserAuthenticated == "false") {
        $("#dashboard").ejDashboardViewer("instance").model.filterOverviewSettings.showSaveIcon = false;
    }
    else {
        $("#dashboard").ejDashboardViewer("instance").model.filterOverviewSettings.showSaveIcon = true;
    }
    $("#new-save").css("display", "block");
    $("#saved-filter-update").css("display", "none");
    $("#saved-filter-Saveas").css("display", "none");
    $("#saved-filter").html("");
    $("#no-filters").css("display", "block");
    unsavedFilters();
}

var deletedViewId = "";
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
});

//Delete Confirm Action
$(document).on("click", "#delete_item", function () {
    var dashboardViewDiv = document.getElementById("dashboard-views");
    if (dashboardViewDiv.style.display == 'block' || dashboardViewDiv.style.display == '') {
        $("#delete-div_wrapper").ejWaitingPopup("show");
    }
    deletedViewId = $("#update-view").attr("viewid");
    var currentId = $(this).attr("viewid");
    $.ajax({
        type: "POST",
        url: deleteViewUrl,
        data: { ItemViewName: $("#filter_name").val(), itemId: item_Id, itemViewId: $(this).attr("viewid"), UserId: userId, UserName: userName, IsMultiDashboard: isMultiDashboard, parentDashboardId: parentDashboardId },
        success: function (data) {
            if (data.Result.Status == true) {
                $("#delete-content").hide();
                $("#delete-confirmation").show();
                $("#delete-confirmation .deleteItem").show();
                $(".successArea").show();
                $(".validationArea").hide();
                if (currentId == deletedViewId) {
                    window.location.href = window.location.href.replace(window.location.search, "");
                }
                GetSavedFilter();

                if (currentId == $('#dashboard').data("ejDashboardViewer").model.filterOverviewSettings.viewId) {
                    $('#dashboard').data("ejDashboardViewer").updateFilterOverview(window.Server.App.LocalizationContent.UnsavedView, "");
                    $('#dashboard').data("ejDashboardViewer").model.filterOverviewSettings.viewName = null;
                    $('#dashboard').data("ejDashboardViewer").model.filterOverviewSettings.viewId = null;
                }
            }
            else {
                ("#delete-content").hide();
                $("#delete-confirmation").hide();
                $("#delete-error").show();
                $(".successArea").show();
            }
            $("#delete-div_wrapper").ejWaitingPopup("hide");
        },
        error: function (data) {
            messageBox("su-delete", window.Server.App.LocalizationContent.DeleteView, window.Server.App.LocalizationContent.InternalServerError, "success", function () {
                onCloseMessageBox();
            });
            $("#delete-div_wrapper").ejWaitingPopup("hide");
        }
    });
});

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
            tempText.innerText = window.location.href.replace(window.location.search, "") + "?viewid=" + parentElement.attr("viewid");
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
};

function refreshScroller() {
    if (typeof (isSlideshow) != "undefined" && isSlideshow) {
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
                enableTouchScroll: iframeUrl == parentUrl ? (sameOrigin ? parent.$("#is_mobile").val() : $("#is_mobile").val()) != "false" : $("#is_mobile").val() != "false"
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
        (sameOrigin ? parent.$("#saved-list") : $("#saved-list"))
            .ejScroller({
                height: scrollerHeightSavedFilter,
                width: scrollerWidth,
                scrollerSize: 9,
                buttonSize: 0,
                enableTouchScroll: iframeUrl == parentUrl ? parent.$("#is_mobile").val() != "false" : $("#is_mobile").val() != "false"
            });
        if ((sameOrigin ? parent.$("#saved-filter .e-vhandle") : $("#saved-filter .e-vhandle")).length) {
            var element = sameOrigin ? parent.$("#saved-filter .e-vhandle") : $("#saved-filter .e-vhandle");
            if (!(element.css('display') == "none")) {
                var height = element.height() + 29;
                element.css("height", height);
            }
        }
    }
}


//filter details

function getcurrentfilters() {
    if (iframeUrl == parentUrl) {
        var dashboardviewerObj = (sameOrigin ? parent.$('#dashboard').length : $('#dashboard').length) > 0 ? (sameOrigin ? parent.$('#dashboard').data("ejDashboardViewer").getCurrentFilters() : $('#dashboard').data("ejDashboardViewer").getCurrentFilters()) : $('#dashboard').data("ejDashboardViewer").getCurrentFilters();
    } else {
        var dashboardviewerObj = $('#dashboard').length > 0 ? $('#dashboard').data("ejDashboardViewer").getCurrentFilters() : $('#dashboard').data("ejDashboardViewer").getCurrentFilters();
    }
    return dashboardviewerObj;
}

function clearAllFilters() {
    var dashboardviewerObj = $('#dashboard').data("ejDashboardViewer");
    if ((viewId != null && viewId != "") || clearStatus) {
        dashboardviewerObj.model.filterParameters = initialQueryString;
        dashboardviewerObj.redrawDashboard();
    } else {
        $("#dashboard-view-toogle").ejWaitingPopup("hide");
    }
}

function getWidgetTitle(widgetId) {
    var widgetTitle = $('#dashboard').data("ejDashboardViewer").getWidgetTitle(widgetId);
    return widgetTitle;
}

function clearWidgetFilter(widgetId, widgetType) {
    $('#dashboard').data("ejDashboardViewer").clearWidgetFilter(widgetId, widgetType);
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
            if (initialQueryStringParameter === JSON.stringify(querystring)) {
                $("#update-view").addClass("pointer-events");
                $("#update-view").css("opacity", 0.5);
            } else {
                if (enableComment.toString().toLowerCase() == "true") {
                    $("#update-view").removeClass("pointer-events");
                    $("#update-view").css("opacity", 1);
                }
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
                var entireItem = ""
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
                entireItem = entireItem.slice(0, -1)
                unsavedFilterOptions +=
                           '<div id="sub-item"><label class="cursor-default txt-overflow unsavedfilter-font-content" rel="tooltip" data-placement="left" data-original-title="' + listItem + '">' + entireItem + '</label></div>';
                unsavedFilterOptions += '<br style="clear: both"></div>';
            }
            $("#unsaved-filter,#unsaved-filter-title").css("display", "block");
            $("#unsaved-filter-parameter").append(unsavedFilterOptions);
            refreshScroller();
            if (enableComment.toString().toLowerCase() == "true") {
                $("#new-save,#saved-filter-update,#saved-filter-Saveas,#save-filter,#filter_name").removeClass("pointer-events");
                $("#new-save,#saved-filter-update,#saved-filter-Saveas,#save-filter,#filter_name").css("opacity", 1);
            } else {
                $("#new-save,#saved-filter-update,#saved-filter-Saveas,#save-filter,#filter_name").addClass("pointer-events");
                $("#new-save,#saved-filter-update,#saved-filter-Saveas,#save-filter,#filter_name").css("opacity", 0.5);
            }
            $("#nofilters").css("display", "none");
            $("[rel=tooltip]").tooltip({ html: true });
        }
    } else {
        $("#new-save,#saved-filter-update,#saved-filter-Saveas,#save-filter,#filter_name").addClass("pointer-events");
        $("#new-save,#saved-filter-update,#saved-filter-Saveas,#save-filter,#filter_name").css("opacity", 0.5);
        $("#nofilters").css("display", "block");
        $("#unsaved-filter,#unsaved-filter-title").css("display", "none");
    }
}

//MessageBox

function onCloseMessageBox() {
    parent.$("#messageBox").ejDialog("close");
}

function onMessageDialogClose() {
    parent.$("#messageBox").find(".message-content").text("");
    $(".message-box-btn-holder").html("");
    $(".message-box-close").html("");
}

function messageBox(messageIcon, messageHeader, messageText, type, successCallback, errorCallback, width, height, maxHeight, cssClass) {
    parent.$("#messageBox").find(".message-content").text("");

    if (messageHeader === window.Server.App.LocalizationContent.DeleteComment) {
        parent.$("#messageBox_wrapper").addClass("delete-comment");
    }

    parent.$(".message-box-btn-holder").html("");
    parent.$(".message-box-close").html("");
    parent.$("#messageBox").find(".message-header").html("<span class='su " + messageIcon + "'></span> <span class='modal-title' data-toggle='tooltip' data-placement='bottom' data-container='body' title='" + messageHeader + "'  >" + messageHeader + "</h2>");
    parent.$("#messageBox").find(".message-content").html(messageText);
    if (type == "error") {
        var successButton;
        var closeIcon;
        var errorButton;
        if (successCallback != undefined) {
            successButton = $("<input type='button' class='critical-action-button pull-right' value='" + window.Server.App.LocalizationContent.YesButton + "'></input>");
            successButton.bind("click", $.proxy(getFnObj(successCallback), window));
        }
        if (errorCallback != undefined) {
            errorButton = $("<input type='button' class='secondary-button pull-right' value='" + window.Server.App.LocalizationContent.NoButton + "'></input>");
            errorButton.bind("click", $.proxy(getFnObj(errorCallback), window));
            closeIcon = $('<span class="su su-close"></span>');
            closeIcon.bind("click", $.proxy(getFnObj(errorCallback), window));
        }
        else {
            errorButton = $("<input type='button' class='secondary-button pull-right' value='" + window.Server.App.LocalizationContent.NoButton + "'></input>");
            closeIcon = $('<span class="su su-close"></span>');
            errorButton.click(function () {
                onCloseMessageBox();
            });
            closeIcon.click(function () {
                onCloseMessageBox();
            });
        }
        parent.$(".message-box-close").html(closeIcon);
        parent.$(".message-box-btn-holder").append(errorButton, successButton);
        parent.$("#messageBox").unbind("keydown");
    }
    else {
        var successButton;
        var closeIcon;
        if (successCallback != undefined) {
            successButton = $("<input type='button' class='secondary-button' value='" + window.Server.App.LocalizationContent.OKButton + "'></input>");
            successButton.bind("click", $.proxy(getFnObj(successCallback), window));
            closeIcon = $('<span class="su su-close"></span>');
            closeIcon.bind("click", $.proxy(getFnObj(successCallback), window));
        }
        else {
            successButton = $("<input type='button' class='secondary-button' value='" + window.Server.App.LocalizationContent.OKButton + "'></input>");
            closeIcon = $('<span class="su su-close"></span>');
            successButton.click(function () {
                onCloseMessageBox();
            });
            closeIcon.click(function () {
                onCloseMessageBox();
            });
        }
        parent.$(".message-box-close").html(closeIcon);
        parent.$(".message-box-btn-holder").append(successButton);
        parent.$("#messageBox").on("keydown", function (event) {
            switch (event.keyCode) {
                case 13:
                case 27:
                    successButton.click();
            }
        });
    }

    $('[data-toggle="tooltip"]').tooltip();
    parent.$("#messageBox").ejDialog("open");
    parent.$("#messageBox").focus();
    var sizeobj = parent.$("#messageBox").data("ejDialog");
    setTimeout(function () {
        if (width != undefined)
            sizeobj.option("width", width);
        if (window.innerWidth > 1040) {
            if (height == undefined)
                height = parent.$("#messageBox").find(".modal-content").height() + 135 + "px";
        }
        sizeobj.option("height", height);
        if (maxHeight != undefined)
            sizeobj.option("maxHeight", maxHeight);
    }, 50);
    if (cssClass != null && cssClass != undefined) {
        sizeobj.option("cssClass", cssClass);
    }
}

$(document).on('click', '.options li', function () {
    if ($(this).attr("id") == undefined) {
        return false;
    }

    var selected = $(this).attr("id").trim();
    $(".options li").removeClass("active");
    $(".options").css("right", "0px");
    if ($("#dashboard-view-toogle").hasClass("dashboard-view-toogle") && selected.toLowerCase() != "views") {
        CloseDashboardView();
    }
    else if (($('#dashboard').data("ejDashboardViewer").getFilterPanelState() == "opened" || $("#validation-message").text() != "") && selected.toLowerCase() != "filters") {
        $('#dashboard').data("ejDashboardViewer").closeFilterPanel();
        $("#close-filter a").css("display", "none");
        $("#filter-view p#validation-message").remove();
        $("#filter-view").hide();
    }
    else if ($("#commentModuleContainer").length != 0 && !$("#commentModuleContainer").hasClass("displayNone") && selected.toLowerCase() != "comments") {
        closeDashboardComment();
    }
    switch (selected.toLowerCase()) {
        case "filters":
            if ($("#close-filter .PopupClose").css("display").toLowerCase() === "none") {
                $(".options li#" + selected).addClass("active");
                $("#filter-view span.view-heading").length == 0 ? $("#filter-view").append("<span class='view-heading'>" + window.Server.App.LocalizationContent.Filters + "</span>") : "";
                $("#filter-view").show();
                if ($('#dashboard').data("ejDashboardViewer").hasFilterPanel == true) {
                    $("#filter-view").css("width", "410px");
                    OpenFilterPanel();
                    if ($('#dashboard').data("ejDashboardViewer").getFilterPanelState() == "opened") {
                        $("#close-filter a").css("display", "block");
                    }
                    else {
                        $("#close-filter a").css("display", "none");
                    }
                }
                else {
                    $("#filter-view p#validation-message").length == 0 ? $("#filter-view").append("<p id='validation-message'>" + window.Server.App.LocalizationContent.NoFilters + "</p>") : "";
                    $("#close-filter a").css("display", "block");
                    $("#filter-view").css("width", "410px");
                }
                refreshScroller();
            }
            else {
                $("#close-filter .PopupClose").trigger("click");
            }
            
            break;
        case "comments":
            $(".options li#" + selected).addClass("active");
            var src = $("#commentModuleContainer iframe").attr("src");
            if (src === undefined || src === "") {
                $("#commentModuleContainer iframe").attr("src", commentPageUrl + "?itemId=" + $("#commentModuleContainer_iframe").attr("data-item-id") + "&userId=" + userId);
            }
            if ($("#commentModuleContainer").hasClass("displayNone")) {
                openDashboardComment(null);
            }
            else {
                closeDashboardComment();
            }
            break;
        case "views":
            $(".options li#" + selected).addClass("active");
            if (!$("#dashboard-view-toogle").hasClass("dashboard-view-toogle")) {
                $('body [data-toggle="tooltip"]').tooltip('hide');
                $("#dashboard-view-toogle").toggleClass("dashboard-view-toogle");
                $("#dashboard-view-toogle").ejWaitingPopup("show");
                GetSavedFilter();
                $("#dashboard").toggleClass("dashboard");
                $(".view-heading").toggle();
                $("#dashboard-views").toggle();
                if ($("#dashboard-view-toogle").hasClass("dashboard-view-toogle")) {
                    $("#dashboard-view-toogle #close-container a").css("display", "block");
                }
                else {
                    $("#dashboard-view-toogle #close-container a").css("display", "none");
                }
                refreshScroller();
                $("#dashboard-view-toogle").find("#saved-list").length == 0 ? $("#dashboard-view-toogle").find("#no-filters").css("display", "block") : $("#dashboard-view-toogle").find("#no-filters").css("display", "none");
                $("#dashboard-view-toogle").ejWaitingPopup("hide");
            }
            else {
                $("#close-container").trigger("click");
            }
            break;
    }
    var isOpen = $('#dashboard').data("ejDashboardViewer").getFilterPanelState();
    if ($("#dashboard-view-toogle").hasClass("dashboard-view-toogle") || isOpen == "opened" || $("#validation-message").text() != "" || !$("#commentModuleContainer").hasClass("displayNone")) {
        $(".options").css("right", "410px");
        $("#dashboard").css("width", $(window).width() - 450);
        var data = $("#dashboard").data("ejDashboardViewer");
        data.resizeDashboard();
    }
    else {
        $(".options").css("right", "0px");
        $("#dashboard").css("width", $(window).width() - 40);
        $(".options li").removeClass("active");
        var data = $("#dashboard").data("ejDashboardViewer");
        data.resizeDashboard();
    }

    if (window.top != window.self && iframeUrl === parentUrl) {
        if (!parent.$(".su-sidebar-collapse").is(":visible") || parent.$(".su-sidebar-collapse").is(":visible")) {
            parent.$("#item-viewer").css({ "width": "100%" });
            parent.$(".item-list-panel, .su-sidebar-collapse").css({ "display": "none" });
            parent.$(".su-sidebar-expand").css({ "display": "block" });
            parent.$("#item-viewer").css({ "height": $(window).height() - $("#header-area").outerHeight() - $("#base-footer-div").outerHeight(), "width": $(window).width() - parent.$("#main-nav").width() - parent.$(".su-sidebar-expand.category-collapse").width(), "top": $("#header-area").height() });
            var windowwidth = parent.$("#dashboard_render_iframe").width();
            parent.$("#dashboard_render_iframe").contents().find("#dashboard").css("width", windowwidth - 410 - 40);
        }
    }
});

function OpenFilterPanel() {
    $('#dashboard').data("ejDashboardViewer").openFilterPanel();
    $('#dashboard').data("ejDashboardViewer").applyComments(commentSettings);
}

function setDashboardWidth() {
    if (typeof (isSlideshow) != "undefined" && isSlideshow) {
        $("#dashboard").css("width", $(window).width() + "px");
        return;
    }

    if (window.top == window.self) {
        $("#dashboard").css("width", $(window).width() - 40 + "px");
    }
    else {
        var parentRefUrl = (window.location != window.parent.location) ? document.referrer : document.location.href.replace(document.location.pathname + document.location.search, "");
        if (parentRefUrl == "") {
            var parentUrl = "";
        }
        else {
            var parentUrl = parentRefUrl.match(/:\/\/(.[^/]+)/)[1];
        }
        var iframeRefUrl = window.location.href;
        var iframeUrl = iframeRefUrl.match(/:\/\/(.[^/]+)/)[1];
        if (iframeUrl == parentUrl) {
            if (!parent.$(".su-sidebar-collapse").is(":visible")) {
                $("#dashboard").css("width", $(window).width() - 40);
            }
        }
        else {
            $("#dashboard").css("width", $(window).width() - 40);
        }
    }
}

function SaveFilter(args) {
    currentQueryString = args.data.encryptedData;
    var proxy = $('#dashboard').data("ejDashboardViewer");
    var dashboardviewerObj = $('#dashboard').data("ejDashboardViewer");
    var itemId = $("#dashboard").prevAll("#favorite_Item").attr("data-item-id");
    var IsMultiDashboard = $("#dashboard").prevAll("#isMultiDashboard").attr("data-item-id");
    var parentDashboardId = $("#dashboard").prevAll("#isMultiDashboard").attr("data-parent-id");
    if (args.viewID == "" || args.viewID == null) {
        $("#save-view-popup").ejDialog("open");
        $("#save-view-popup_wrapper").ejWaitingPopup("show");
        $("#save-view-popup-iframe").attr("src", saveViewPopup + "?itemId=" + itemId + "&isMultidashboardId=" + IsMultiDashboard + "&parentId=" + parentDashboardId + "&userId=" + userId + "&userName=" + userName);    
    }
    else {
        $("#dashboard").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: updateViewUrl,
            data: { itemId: item_Id, QueryString: currentQueryString, itemViewId: args.viewID, UserId: userId, UserName: userName, IsMultiDashboard: isMultiDashboard, parentDashboardId: parentDashboardId },
            beforeSend: function (req) {
                req.setRequestHeader('ejAuthenticationToken', proxy._authenticationToken);
            },
            success: function (data) {
                if (data.Result.Status == true) {
                    initialQueryStringParameter = JSON.stringify(updateInitialQueryStringParameter);
                    dashboardviewerObj.model.filterParameters = currentQueryString;
                    $("#dashboard").ejWaitingPopup("hide");
                    messageBox("su-filter", window.Server.App.LocalizationContent.UpdateView, window.Server.App.LocalizationContent.UpdateViewSuccess, "success", function () {
                        onCloseMessageBox();
                    });
                }
                else {
                    $("#save-section").hide();
                    $("#dashboard").ejWaitingPopup("hide");
                    messageBox("su-filter", window.Server.App.LocalizationContent.UpdateView, window.Server.App.LocalizationContent.InternalServerError, "success", function () {
                        onCloseMessageBox();
                    });
                }
            },
            error: function () {
                $("#dashboard").ejWaitingPopup("hide");
                messageBox("su-filter", window.Server.App.LocalizationContent.UpdateView, window.Server.App.LocalizationContent.InternalServerError, "success", function () {
                    onCloseMessageBox();
                });
            }
        });
        GetSavedFilter();
        refreshScroller();
    }
}

function closeSaveViewPopup() {
    parent.$("#save-view-popup-iframe").contents().find("#save-view-form").html("");
    parent.$("#save-view-popup_wrapper").ejWaitingPopup("hide");
    parent.$("#save-view-popup").ejDialog("close");
}

function openViewSection() {
    $(".options li#views").trigger("click");
}

$(document).on("click", ".saved-view", function (e) {
    if (e.target.className == "saved-view" || e.target.className == "saved-opt" || e.target.className == "saved-filter txt-overflow") {
        var currentTarget = $(this);
        if ($(currentTarget).find(".applied-filters").length == 0) {
            var viewId = $(this).attr("viewid").trim();
            if ($(".saved-list-content-div").find(".applied-filters").length > 0) {
                $(".applied-filters").remove()
            }
            $(".saved-list-content-div").find(".saved-view").css("background-color", "initial");
            $(".saved-list-content-div").find(".saved-view").css("border-top", "0");
            $(currentTarget).append($("<span class='col-sm-4 no-padding loader-gif' style='display:inline; background-image:url(" + dashboardServerResourceUrl + "/images/waitingpopup.gif); background-size:cover; position:absolute; height:25px; width:25px;'></span>"));
            $.ajax({
                url: getViewParameterUrl,
                data: { itemId: item_Id, UserId: userId, UserName: userName, IsMultiDashboard: isMultiDashboard, ViewId: viewId, parentDashboardId: parentDashboardId },
                type: "POST",
                success: function (data) {
                    var Result = data.viewDetails;
                    var viewerObj = $("#dashboard").data("ejDashboardViewer");
                    if (viewerObj) {
                        var result = viewerObj._parseParameterQuery(Result.QueryString);
                        if (result != null && result.length > 0) {
                            for (var i = 0; i < result.length; i++) {
                                list = "<div class='applied-filters'><label class='list-items'>" + result[i].ControlTitle.title + "</label><br />";
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

$(document).on("keydown", "#view-name", function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        $("#save-button").trigger("click");
    }
});

$(document).on("click", ".tv-mode-icon", function (e) {
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
                        $(".tv-mode-icon").removeClass("su-maximize-1").addClass("su-minimize").attr("data-tooltip", window.Server.App.LocalizationContent.ExitFullscreen);
                    } else {
                        $("body").removeClass("hide-dashboard-icons");
                        $(".tv-mode-icon").addClass("su-maximize-1").removeClass("su-minimize").attr("data-tooltip", window.Server.App.LocalizationContent.Fullscreen);
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
});

function fullscreenExitHandler() {
    if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
        $("body").removeClass("hide-dashboard-icons");
        $(".tv-mode-icon").addClass("su-maximize-1").removeClass("su-minimize").attr("data-tooltip", window.Server.App.LocalizationContent.Fullscreen);
    } else {
        $("body").addClass("hide-dashboard-icons");
        $(".tv-mode-icon").removeClass("su-maximize-1").addClass("su-minimize").attr("data-tooltip", window.Server.App.LocalizationContent.ExitFullscreen);
    }

    var data = $("#dashboard").ejDashboardViewer();
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
    }
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