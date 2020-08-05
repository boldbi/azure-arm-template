var previousSlideshowName = "";
var dashboards = [];
var childDashboards = [];
var itemViews = [];
var categories = [];
var widgets = [];
var multiTabCategories = [];
var editSlideshowDetail = [];
var isSlideshowEdited = false;
var isMultiTab = false;
var isEditAction = false;
const slideshowMinDuration = 5;
const slideshowMaxDuration = 300;

$(document).ready(function () {
    $("#create-presentation-popup").ejDialog({
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        width: "750px",
        title: "",
        showHeader: false,
        enableModal: true,
        close: "OnSlideshowDialogBoxClose",
        closeOnEscape: true
    });

    var createPresentationWaitingPopupTemplateId = createLoader("create-presentation-popup_wrapper");
    $("#create-presentation-popup_wrapper").ejWaitingPopup({ template: $("#" + createPresentationWaitingPopupTemplateId) });

    $(".selectpicker").selectpicker('refresh');
    $("[data-toggle='tooltip']").tooltip();
    $("#sortable").sortable();
    $("#sortable").disableSelection();
    $("#sortable").on("sortupdate", function (event, ui) {
        if (isSlideshowEdited) {
            window.editData.IsSortChanged = true;
            validateSlideshow();
        }
    });

    //Add placeholder for search box in selectpicker for select dashboard, select categorie, select tab, select view, select widget in create slideshow dialog box.
    $("#item-dropdowns .slide-category-dropdown .bootstrap-select .bs-searchbox .input-block-level").attr("placeholder", window.Server.App.LocalizationContent.SearchCategories);
    $("#item-dropdowns .slide-dashboard-dropdown .bootstrap-select .bs-searchbox .input-block-level").attr("placeholder", window.Server.App.LocalizationContent.SearchDashboards);
    $("#item-dropdowns .slide-view-dropdown .bootstrap-select .bs-searchbox .input-block-level").attr("placeholder", window.Server.App.LocalizationContent.SearchViews);
    $("#item-dropdowns .slide-childdashboard-dropdown .bootstrap-select .bs-searchbox .input-block-level").attr("placeholder", window.Server.App.LocalizationContent.SearchTabs);
    $("#item-dropdowns .slide-widget-dropdown .bootstrap-select .bs-searchbox .input-block-level").attr("placeholder", window.Server.App.LocalizationContent.SearchWidgets);
});

$(document).on("click", "#create_presentation, .create-presentation", function () {
    isMultiTab = false;
    getCreateSlideshowDetail();
});

$(document).on("click", "#create-multitab-dashboard", function () {
    var showMultiTab = isAdmin ? userDashboardsCount > 0 : sharableDashboardsCount > 0;
    if (showMultiTab) {
        isMultiTab = true;
        getCreateSlideshowDetail();
    } else {
        if (isAdmin) {
            messageBox("su su-multi-tabbed", window.Server.App.LocalizationContent.CreateMultiTab, window.Server.App.LocalizationContent.DashboardCountValidator);
        } else {
            messageBox("su su-multi-tabbed", window.Server.App.LocalizationContent.CreateMultiTab, window.Server.App.LocalizationContent.UserDashboardCountValidator);
        }
    }
});


function OnSlideshowDialogBoxClose() {
    hideWaitingPopup("create-presentation-popup_wrapper");
}

function getCreateSlideshowDetail() {
    isSlideshowEdited = false;    
    isEditAction = false;
    $("#create-presentation-popup").ejDialog("open");
    showWaitingPopup("create-presentation-popup_wrapper");
    $("#slideshow-popup-container").hide();
    var getCreateDetailsUrl = "";
    if (isMultiTab) {
        getCreateDetailsUrl = getCreateMultiTabDashboardDetailUrl;
        $(".slideshow-popup-title").text(window.Server.App.LocalizationContent.CreateMultiTab);
        $("#multitab-icon").removeClass("su-tv").addClass("su-multi-tabbed");
        $(".duration-field").hide();
        $(".item-type-dropdown").hide();
        if (canCreateCategory) {
            $("[data-id=select-multitab-category].btn.dropdown-toggle.selectpicker.btn-default").css("border-radius", "4px 0 0 4px");
        }
        $(".category-field").show();
        $(".add-new-button").show();
    } else {
        getCreateDetailsUrl = getCreateSlideShowDetailUrl;
        $(".slideshow-popup-title").text(window.Server.App.LocalizationContent.CreateSlideshow);
        $("#multitab-icon").removeClass("su-multi-tabbed").addClass("su-tv");
        $(".duration-field").show();
        $(".item-type-dropdown").show();
        $(".category-field").hide();
        $(".add-new-button").hide();
    }

    $.ajax({
        type: "POST",
        url: getCreateDetailsUrl,
        data: "",
        success: function (data) {
            categories = data.Categories;
            if (isMultiTab) {
                multiTabCategories = data.MultiTabCategories;
                var listMultiTabCategories = "";
                for (var i = 0; i < multiTabCategories.length; i++) {
                    listMultiTabCategories += '<option value="' + multiTabCategories[i].Id + '">' + multiTabCategories[i].Name + '</option>';
                }
                $("#select-multitab-category").html("");
                $("#select-multitab-category").html('<option value="" selected="selected" class="hide-option" disabled>' + window.Server.App.LocalizationContent.SelectCategory + '</option>' + listMultiTabCategories).selectpicker("refresh");
            }

            widgets = data.WidgetList;
            var listCategories = "";
            for (var t = 0; t < categories.length; t++) {
                listCategories += '<option value="' + categories[t].Id + '">' + categories[t].Name + '</option>';
            }
            $("#select_category").html("");
            $("#select_category").html('<option value="" selected="selected" class="hide-option" disabled>' + window.Server.App.LocalizationContent.SelectCategory + '</option>' + listCategories).selectpicker("refresh");
            resetSlideshowDialog();
            $("#slideshow-popup-container").show();
            hideWaitingPopup("create-presentation-popup_wrapper");
            addTitleForCategorySlideshow();
            $(".slide-category-dropdown .btn-group .dropdown-toggle").attr("title", "").attr("data-original-title","");
        }
    });
}

$(document).on('click', '.bootstrap-select ul li.add-new-category, #add-new-category', function (e) {

    if (e.target.className !== null && e.target.className.toLowerCase() === 'btn btn-default') {
        parent.window.CategoryName = "";
    }

    $(this).parent().prev().addClass("input-value");
    parent.$("#report_popup").contents().find('.bootstrap-select ul').find(".divider").show();
    parent.window.IsAddDashboard = true;
    parent.$("#AddCategoryPopup").ejDialog("open");
    $("#invalid-category").hide();
});

$(document).on("click", ".add-button-content", function (e) {
    $(".add-dashboard-widgets-button").hide();
    $(".item-dropdown-container").show();
});

$(document).on("click", ".create-presentation-popup-close, #cancel-slideshow", function (e) {
    eDialog = $("#create-presentation-popup").data("ejDialog");
    eDialog.close();
});

function resetSlideshowDialog() {
    $("#create-presentation-container #slideshow-name").val("");
    $("#create-presentation-container #sortable").html("");
    $("#select_category").val('default').selectpicker("refresh");
    $("#select_type").val(2).selectpicker("refresh");
    $("#select_dashboard").html('<option value="" selected="selected" class="hide-option" disabled="disabled">' + window.Server.App.LocalizationContent.SelectDashboard + '</option>').selectpicker("refresh");
    $(".slide-dashboard-dropdown, .slide-widget-dropdown, .slide-childdashboard-dropdown, .slide-view-dropdown").hide();
    $("#slideshow-name, #loop_interval").closest("div").removeClass("has-error");
    $("#name-validation-message, #duration-validation-message").hide();
    $("#create-slideshow, #edit-slideshow, #add-slide-button").attr('disabled', 'true');
    $("#create-slideshow, .slide-category-dropdown").show();
    $("#loop_interval").val("");
    $("#edit-slideshow, .item-dropdown-container").hide();
    $(".add-dashboard-widgets-button").show();
}

$(document).on("change", "#select_category", function () {
    var selectedCategory = $(this).find("option:selected").val();
    $("#add-slide-button").attr('disabled', 'true');
    dashboards = [];
    childDashboards = [];
    itemViews = [];
    dashboards = categories.filter(function (x) { return x.Id == selectedCategory; })[0].Dashboards;
    var listDashboards = "";
    for (var t = 0; t < dashboards.length; t++) {
        listDashboards += '<option value="' + dashboards[t].Id + '">' + dashboards[t].Name + '</option>';
    }
    $("#select_dashboard").html("");
    $("#select_dashboard").html('<option value="" selected="selected" class="hide-option" disabled>' + window.Server.App.LocalizationContent.SelectDashboard + '</option>' + (!isMultiTab ? '<option value="all">' + window.Server.App.LocalizationContent.ChildDashboards + '</option>' : '') + listDashboards).selectpicker("refresh");
    $(".slide-dashboard-dropdown").show();
    $("#select_childdashboard").html("");
    $("#select_childdashboard").html('<option value="" selected="selected" class="hide-option" disabled="disabled">' + window.Server.App.LocalizationContent.SelectDashboard + '</option>').selectpicker("refresh");
    $("#select_view").html("");
    $("#select_view").html('<option value="" selected="selected" class="hide-option" disabled="disabled">' + window.Server.App.LocalizationContent.SelectView + '</option>').selectpicker("refresh");
    addTitleForViews();
    addTitleForDashboard();
    $(".slide-category-dropdown .btn-group .dropdown-toggle").attr("title", "").attr("data-original-title", $(this).find("option:selected").text());
    $(".slide-view-dropdown, .slide-childdashboard-dropdown").slideUp(400, function () {
        $("#sortable").css("height", $(".display-dashboard").height() - $("#item-dropdowns").height());
        $(".slide-dashboard-dropdown .btn-group .dropdown-toggle").attr("data-original-title", "").attr("title", "");
    });
});

$(document).on("change", "#select_type", function () {
    var itemTypeId = $(this).find("option:selected").val();
    if (itemTypeId == "2") {
        var listCategories = "";
        for (var c = 0; c < categories.length; c++) {
            listCategories += '<option value="' + categories[c].Id + '">' + categories[c].Name + '</option>';
        }
        $("#select_category").html("");
        $("#select_category").html('<option value="" selected="selected" class="hide-option" disabled>' + window.Server.App.LocalizationContent.SelectCategory + '</option>' + listCategories).selectpicker("refresh");
        $("#select_dashboard").html('<option value="" selected="selected" class="hide-option" disabled="disabled">' + window.Server.App.LocalizationContent.SelectDashboard + '</option>').selectpicker("refresh");
        $(".slide-category-dropdown").show();
        $(".slide-widget-dropdown").hide();
        addTitleForCategorySlideshow();
    } else {
        $(".slide-category-dropdown, .slide-dashboard-dropdown, .slide-childdashboard-dropdown, .slide-view-dropdown").hide();
        $("#select_widget").html("");
        var widgetsList = "";
        if (widgets != null && widgets.length > 0) {
            for (var t = 0; t < widgets.length; t++) {
                widgetsList += '<option value="' +
                    widgets[t].Id +
                    '">' +
                    widgets[t].Name +
                    '</option>';
            }

            $("#select_widget").append('<option value="" selected="selected" class="hide-option" disabled="disabled">' + window.Server.App.LocalizationContent.SelectWidget + '</option>' + widgetsList)
                .selectpicker("refresh");
            addTitleForWidget();
            $("#add-slide-button").removeAttr('disabled');
        } else {
            $("#select_widget").append('<option value="" selected="selected" class="hide-option" disabled="disabled">' + window.Server.App.LocalizationContent.NoWidget + '</option>')
                .selectpicker("refresh");
        }

        $(".slide-widget-dropdown").show();
    }

    $(".item-type-dropdown .btn-group .dropdown-toggle").attr("data-original-title", "");
    $("#sortable").css("height", $(".display-dashboard").height() - $("#item-dropdowns").height());
    $("#add-slide-button").attr('disabled', 'true');
    $(".slide-category-dropdown .btn-group .dropdown-toggle, .slide-widget-dropdown .btn-group .dropdown-toggle").attr("data-original-title", "").attr("title", "");
});

$(document).on("change", "#select_dashboard", function () {
    var dashboardId = $(this).find("option:selected").val();
    $("#add-slide-button").attr('disabled', 'true');
    var childItems = "";
    $("#select_childdashboard").html("");
    itemViews = [];
    if (dashboardId != "all" && dashboardId != "") {
        childDashboards = dashboards.filter(function (x) { return x.Id == dashboardId; })[0].Dashboards;
        if (childDashboards !== null) {
            for (var t = 0; t < childDashboards.length; t++) {
                childItems += '<option value="' +
                    childDashboards[t].Id +
                    '">' +
                    childDashboards[t].Name +
                    '</option>';
            }

            $("#select_childdashboard").append('<option value="" selected="selected" class="hide-option" disabled>' +
                    window.Server.App.LocalizationContent.SelectTab +
                    '</option ><option value="all">' +
                    window.Server.App.LocalizationContent.ChildDashboards +
                    '</option>' +
                    childItems)
                .selectpicker("refresh");
            $(".slide-childdashboard-dropdown").slideDown(400, function () {
                $("#sortable").css("height", $(".display-dashboard").height() - $("#item-dropdowns").height());
                $(".slide-childdashboard-dropdown .btn-group .dropdown-toggle").attr("data-original-title", "").attr("title", "");
            });
            $("#select_view").html("");
            $("#select_view").html('<option value="" selected="selected" class="hide-option" disabled="disabled">' + window.Server.App.LocalizationContent.SelectView + '</option>').selectpicker("refresh");
        } else {
            $(".slide-childdashboard-dropdown").slideUp(400, function () {
                $("#sortable").css("height", $(".display-dashboard").height() - $("#item-dropdowns").height());
            });
            $("#select_childdashboard").append('<option value="" selected="selected" class="hide-option" disabled>' +
                window.Server.App.LocalizationContent.SelectTab +
                '</option>').selectpicker("refresh");
            $("#select_view").html("");
            $("#select_view").html('<option value="" selected="selected" class="hide-option" disabled="disabled">' + window.Server.App.LocalizationContent.SelectView + '</option>').selectpicker("refresh");
            $(".slide-view-dropdown").slideUp(400, function () {
                $("#sortable").css("height", $(".display-dashboard").height() - $("#item-dropdowns").height());
            });
            $("#select_childdashboard").trigger('change');
            $("#add-slide-button").removeAttr('disabled');
        }
    } else {
        $(".slide-childdashboard-dropdown").slideUp(400, function () {
            $("#sortable").css("height", $(".display-dashboard").height() - $("#item-dropdowns").height());
        });
        $("#select_childdashboard").append('<option value="" selected="selected" class="hide-option" disabled>' +
            window.Server.App.LocalizationContent.SelectTab +
            '</option>').selectpicker("refresh");
        $("#select_view").html("");
        $("#select_view").html('<option value="" selected="selected" class="hide-option" disabled="disabled">' + window.Server.App.LocalizationContent.SelectView + '</option>').selectpicker("refresh");
        $(".slide-view-dropdown").slideUp(400, function () {
            $("#sortable").css("height", $(".display-dashboard").height() - $("#item-dropdowns").height());
        });
        $("#add-slide-button").removeAttr("disabled");
    }

    $(".slide-dashboard-dropdown .btn-group .dropdown-toggle").attr("title","").attr("data-original-title", $(this).find("option:selected").text());
    $("#sortable").css("height", $(".display-dashboard").height() - $("#item-dropdowns").height());
    addTitleForChildDashboards();
    addTitleForViews();
});

$(document).on("change", "#select_childdashboard", function () {
    $("#add-slide-button").attr("disabled", "true");
    var itemId = $(this).find("option:selected").val();
    if (itemId != "" && itemId != "all") {
        itemId = $("#select_childdashboard").find("option:selected").val();
        itemViews = childDashboards.filter(function (x) { return x.Id == itemId; })[0].ItemViews;
    }
    else if (itemId != "all") {
        itemId = $("#select_dashboard").find("option:selected").val();
        itemViews = dashboards.filter(function (x) { return x.Id == itemId; })[0].ItemViews;
    }

    var dashboardViews = "";
    if (itemViews != null && itemViews.length > 0) {
        for (var t = 0; t < itemViews.length; t++) {
            dashboardViews += '<option value="' +
                itemViews[t].Id +
                '">' +
                itemViews[t].Name +
                '</option>';
            $("#select_view").html("");
            $("#select_view").append('<option value="" selected=selected>' + window.Server.App.LocalizationContent.SelectView + '</option>' + dashboardViews)
                .selectpicker("refresh");
            $(".slide-view-dropdown").slideDown(400, function () {
                $("#sortable").css("height", $(".display-dashboard").height() - $("#item-dropdowns").height());
                $(".slide-view-dropdown .btn-group .dropdown-toggle").attr("data-original-title", "").attr("title", "");
            });
            addTitleForViews();
        }
    }

    $("#add-slide-button").removeAttr('disabled');
    $(".slide-childdashboard-dropdown .btn-group .dropdown-toggle").attr("title", "").attr("data-original-title", $(this).find("option:selected").text());
    $(".slide-childdashboard-dropdown .btn-group .dropdown-menu.open").removeAttr("style").css("overflow", "hidden");
});

$(document).on("change", "#select_view", function() {
    $(".slide-view-dropdown .btn-group .dropdown-toggle").attr("title", "").attr("data-original-title", $(this).find("option:selected").text());
});

function addTitleForCategorySlideshow() {
    $("#select_category").selectpicker("refresh");
    addTitleForDropdown(".slide-category-dropdown");
    $(".item-type-dropdown .btn-group .dropdown-toggle").attr("data-original-title", "");
}

function addTitleForDashboard() {
    $("#select_dashboard").selectpicker("refresh");
    addTitleForDropdown(".slide-dashboard-dropdown");
}

function addTitleForChildDashboards() {
    $("#select_childdashboard").selectpicker("refresh");
    addTitleForDropdown(".slide-childdashboard-dropdown");
}

function addTitleForViews() {
    $("#select_view").selectpicker("refresh");
    addTitleForDropdown(".slide-view-dropdown");
}

function addTitleForWidget() {
    $("#select_widget").selectpicker("refresh");
    addTitleForDropdown(".slide-widget-dropdown");
}

function addTitleForDropdown(className) {
    var selecterPickerList = $(className + " .btn-group .dropdown-menu .selectpicker li");
    for (var i = 0; i < selecterPickerList.length; i++) {
        var hoveredtext = selecterPickerList.eq(i).find("a .text").text();
        selecterPickerList.eq(i).find("a").attr("title", hoveredtext).attr("data-toggle", "tooltip").attr("data-placement", "right").attr("data-container", "body");
    }
    $("[data-toggle='tooltip'], .selectpicker").tooltip();
}

$(document).on("click", "#add-slide-button", function (e) {
    var viewId = $("#select_view").find("option:selected").val();
    var tabId = $("#select_childdashboard").find("option:selected").val();
    var dashboardId = $("#select_dashboard").find("option:selected").val();
    var categoryId = $("#select_category").find("option:selected").val();
    var multiTabCategoryId = $("#select-multitab-category").find("option:selected").val();
    var widgetId = $("#select_widget").find("option:selected").val();
    var slideCategoryName = $('#select_category').find('option:selected').text();
    var slideDashboardname = $("#select_dashboard").find("option:selected").text();
    var slideViewName = $("#select_view").find("option:selected").text();
    var slideTabName = tabId == "all" ? window.Server.App.LocalizationContent.AllTabsInDashboard : $('#select_childdashboard').find('option:selected').text();
    var tile = "";
    var tileContent = "";
    var title = "";


    if (categoryId === "" && $("#select_type").find("option:selected").val() == "2") {
        $(".category-validation-message").show();
        return;
    }

    if (multiTabCategoryId === "" && $("#multi-tab-category-validation-message").css("display") !== "block" && $(".display-dashboard-container").find(".slide-card").length > 0) {
        $("#multi-tab-category-validation-message").html(window.Server.App.LocalizationContent.MultiTabCategoryValidator).css("display", "block");
        $("[data-id=select-multitab-category].btn.dropdown-toggle.selectpicker.btn-default").addClass("multi-tab-category-dropdown");
    }

    if ($("#loop_interval").val() === "") {
        $("#duration-validation-message").html(window.Server.App.LocalizationContent.DurationEmptyValidation).show();
    }

    if (widgetId === "" && $("#select_type").find("option:selected").val() == "8") {
        $(".widget-message").show();
        return;
    }
    if ($("#select_type").find("option:selected").val() == "2") {
        tileContent = "";
        title = "";
        if (dashboardId == "all") {
            title += "<b>" + window.Server.App.LocalizationContent.Dashboard + "</b>: " + window.Server.App.LocalizationContent.AllDashboardInCategory + "\n";
            tileContent = "<span class='tile-name'><span class='su su-nav-dashboard'></span>" +
                window.Server.App.LocalizationContent.AllDashboardInCategory +
                "</span>";
        } else {
            title += "<b>" + window.Server.App.LocalizationContent.Dashboard + "</b>: " + slideDashboardname + "\n";
            tileContent = "<span class='tile-name' data-toggle='tooltip'><span class='su su-nav-dashboard'></span>" +
                slideDashboardname +
                "</span>";
        }

        title += "<b>" + window.Server.App.LocalizationContent.Categoy + "</b>: " + slideCategoryName + "\n";
        tileContent += "<span class='tile-category' data-toggle='tooltip'>" +
            slideCategoryName +
            "</span>";

        if (tabId != "") {
            title += "<b>" + window.Server.App.LocalizationContent.Tab + "</b>: " + slideTabName + "\n";
            tileContent += "<span class='tile-tab' data-toggle='tooltip'><span class='tab-label'>" + window.Server.App.LocalizationContent.Tab + ": </span>" +
                slideTabName +
                "</span>";
        }

        if (viewId != "") {
            title += "<b>" + window.Server.App.LocalizationContent.View + "</b>: " + slideViewName + "\n";
            tileContent += "<span class='tile-view' data-toggle='tooltip'><span class='view-label'>" + window.Server.App.LocalizationContent.View + ": </span>" +
                slideViewName +
                "</span>";
        }

        tile = "<li class='slide-card col-xs-12 no-padding' style='display: none;' data-toggle='tooltip' data-html='true' title='" + title + "' data-category-id='" +
            categoryId +
            "'data-category-name='" +
            slideCategoryName +
            "' data-dashboard-id='" +
            dashboardId +
            "'data-dashboard-name='" +
            slideDashboardname +
            "' data-ismultidashboard='" +
            ($("#select_childdashboard").find("option").length > 1) +
            "'data-tab-id='" +
            tabId +
            "'data-tab-name='" +
            (tabId == "" ? "" : slideTabName) +
            "'data-view-id='" +
            viewId +
            "'data-view-name='" +
            (viewId == "" ? "" : slideViewName) +
            "'data-item-type='" +
            $('#select_type').find('option:selected').val() +
            "'><span class='card-sort su su-dragger' data-toggle='tooltip' title='" + window.Server.App.LocalizationContent.RearrangeSlide + "'><span class='su-dragger path1'></span></span><span class='card-content' data-toggle='tooltip' data-container='#sortable' data-placement='auto top'>" +
            tileContent +
            "</span><span class='card-remove su su-minus-circle pull-right' data-toggle='tooltip' title='" + window.Server.App.LocalizationContent.RemoveSlide + "'></span></li>";
    } else {
        var slideWidgetName = $("#select_widget").find("option:selected").text();
        tileContent = "<span class='tile-name' ><span class='su su-nav-widgets'></span>" +
            slideWidgetName +
            "</span>";
        tile = "<li class='slide-card slide-wiget-card col-xs-12 no-padding' data-toggle='tooltip' data-html='true' title='<b>" + window.Server.App.LocalizationContent.Widget + "</b>: " +
            slideWidgetName +
            "' style='display: none;'" +
            "' data-widget-id='" +
            widgetId +
            "'data-widget-name='" +
            slideWidgetName +
            "'data-item-type='" +
            $('#select_type').find('option:selected').val() +
            "' data-ismultidashboard='false'><span class='card-sort su su-dragger' data-toggle='tooltip' title='" + window.Server.App.LocalizationContent.RearrangeSlide + "'><span class='su-dragger path1'></span></span><span class='card-content' data-toggle='tooltip' data-placement='top' data-container='#sortable'>" +
            tileContent +
            "</span><span class='card-remove su su-minus-circle pull-right' data-toggle='tooltip' title='" + window.Server.App.LocalizationContent.RemoveSlide + "'></span></li>";
    }
    $(".display-dashboard-container").append(tile);
    $(".display-dashboard-container li:last-child").show();
    $('#sortable').scrollTop($('#sortable')[0].scrollHeight);
    if (isSlideshowEdited) {
        window.editData.IsSlideChanged = true;
    }
    $("[data-toggle='tooltip']").tooltip();
    validateSlideshow();
});

function getSlideshowValues(actionType) {
    isEditAction = actionType == "edit";
    var slideItems = $(".display-dashboard-container").children("li.slide-card");
    var slideList = Array();
    for (var i = 0; i < slideItems.length; i++) {
        slideList.push({
            'OrderNumber': i + 1,
            'ItemInfo': {
                'Id': slideItems[i].getAttribute("data-dashboard-id") == "all" ? slideItems[i].getAttribute("data-category-id") : (slideItems[i].getAttribute("data-item-type") == 2 ? slideItems[i].getAttribute("data-dashboard-id") : slideItems[i].getAttribute("data-widget-id")),
                'CategoryId': (slideItems[i].getAttribute("data-item-type") == 2 && slideItems[i].getAttribute("data-dashboard-id") != "all") ? slideItems[i].getAttribute("data-category-id") : "",
                'TabId': (slideItems[i].getAttribute("data-tab-id") == "all" || slideItems[i].getAttribute("data-tab-id") == "null") ? "" : slideItems[i].getAttribute("data-tab-id"),
                'ViewId': slideItems[i].getAttribute("data-view-id") == "null" ? "" : slideItems[i].getAttribute("data-view-id"),
                'IsMultiDashboard': slideItems[i].getAttribute("data-ismultidashboard")
            },
            'ItemType': slideItems[i].getAttribute("data-dashboard-id") == "all" ? "1" : slideItems[i].getAttribute("data-item-type")
        });
    }

    var postData = "";
    if (isMultiTab) {
        postData = {
            multiTabDashboardName: $("#slideshow-name").val().trim(),
            categoryId: $("#select-multitab-category").val(),
            dashboardLists: JSON.stringify(slideList)
        };
    } else {
        postData = {
            slideshowName: $("#slideshow-name").val().trim(),
            loopInterval: parseInt($("#loop_interval").val()),
            slides: JSON.stringify(slideList)
        };
    }

    if (actionType == "edit") {
        postData.IsSlideshowNameChanged = window.editData.slideshowNameChanged;
        postData.IsCategoryChanged = window.editData.IsCategoryChanged;
        postData.IsDurationChanged = window.editData.IsDurationChanged;
        postData.IsSlideChanged = window.editData.IsSlideChanged;
        postData.IsSortChanged = window.editData.IsSortChanged;
        postData.ItemId = window.editData.ItemId;
    }
    return postData;
}

function createSlideshowMethod() {
    if (isMultiTab) {
        createMultiTabDashboard();
    } else {
        createSlideshow();
    }
}

function createMultiTabDashboard() {
    if (validateSlideshow()) {
        showWaitingPopup("create-presentation-popup_wrapper");
        var multiTabDashboardData = getSlideshowValues("create");
        $.ajax({
            type: "POST",
            url: createMultiTabDashboardUrl,
            data: multiTabDashboardData,
            success: function (data) {
                if (data.StatusCode !== undefined && data.StatusCode === "ItemNameAlreadyExist") {
                    $("#name-validation-message").show();
                    $("#name-validation-message").text(data.Message);
                } else {
                    if (data.Status) {
                        eDialog = $("#create-presentation-popup").data("ejDialog");
                        eDialog.close();
                        SuccessAlert(window.Server.App.LocalizationContent.CreateMultiTab, window.Server.App.LocalizationContent.MultiTabDashboard + ", <a target='_blank' href='" + rootUrlAction + "/dashboards/" + data.SlideshowId + "/" + multiTabDashboardData.multiTabDashboardName + "?showmydashboards=1" + "'>" + multiTabDashboardData.multiTabDashboardName + "</a>, " + window.Server.App.LocalizationContent.CreateSlideshowSuccess, 7000);
                        if (typeof (parent.RefreshCategorySection) === "function") {
                            parent.RefreshCategorySection(multiTabDashboardData.categoryId);
                        }
                    } else {
                        WarningAlert(window.Server.App.LocalizationContent.CreateMultiTab, data.Message, 0);
                    }
                }

                hideWaitingPopup("create-presentation-popup_wrapper");
            }
        });
    }
}

function createSlideshow() {
    if (validateSlideshow()) {
        showWaitingPopup("create-presentation-popup_wrapper");
        var createSlideshowData = getSlideshowValues("create");
        $.ajax({
            type: "POST",
            url: createSlideShowUrl,
            data: createSlideshowData,
            success: function (data) {
                if (data.StatusCode !== undefined && data.StatusCode === "ItemNameAlreadyExist") {
                    $("#name-validation-message").text(data.StatusMessage);
                } else {
                    if (data.Status) {
                        eDialog = $("#create-presentation-popup").data("ejDialog");
                        eDialog.close();
                        SuccessAlert(window.Server.App.LocalizationContent.CreateSlideshow, window.Server.App.LocalizationContent.Slideshow + " — <a target='_blank' href='" + rootUrlAction + "/slideshow/" + data.SlideshowId + "/" + createSlideshowData.slideshowName + "'>" + createSlideshowData.slideshowName + "</a> " + window.Server.App.LocalizationContent.CreateSlideshowSuccess, 7000);                        
                        if (typeof (onSuccessRefreshGrid) != "undefined") {
                            onSuccessRefreshGrid(0);
                        }
                    } else {
                        WarningAlert(window.Server.App.LocalizationContent.CreateSlideshow, data.Message, 0);
                    }
                }

                hideWaitingPopup("create-presentation-popup_wrapper");
            }
        });
    }
}

$(document).on("click", ".card-remove", function () {
    $(".display-dashboard-container .tooltip.fade").hide();
    $(this).parent().remove();
    if (isSlideshowEdited) {
        window.editData.IsSlideChanged = true;
    }
    validateSlideshow();
});

$(document).on("change", "#select_widget", function() {
    $("#add-slide-button").removeAttr('disabled');
    $(".slide-widget-dropdown .btn-group .dropdown-toggle").attr("title", "").attr("data-original-title", $(this).find("option:selected").text());
});

$(document).on("keyup", "#slideshow-name", function (event) {
    var slideshowName = $("#slideshow-name").val().trim();
    if (isSlideshowEdited && slideshowName == window.editData.SlideshowName) {
        window.editData.slideshowNameChanged = false;
        validateSlideshow();
        return;
    } else if (isSlideshowEdited) {
        window.editData.slideshowNameChanged = true;
    }
    validateSlideshow();
});

$(document).on("focusout", "#slideshow-name", function (event) {
    var slideshowName = $("#slideshow-name").val().trim();
    if (slideshowName == previousSlideshowName || (isSlideshowEdited && slideshowName == window.editData.SlideshowName)) {
        return;
    }

    if (slideshowName != "") {
        $("#slideshow-name").closest("div").removeClass("has-error");
        $("#name-validation-message").hide();
        if (slideshowName) {
            if (!parent.IsValidName("name", slideshowName)) {
                $("#name-validation-message").html(window.Server.App.LocalizationContent.AvoidSpecialCharactors).show();
                return;
            }

            previousSlideshowName = slideshowName;
            slideshowNameCheck(slideshowName);
        } else {
            $("#name-validation-message").css("display", "none");
        }
    }
    else {
        $("#slideshow-name").closest("div").addClass("has-error");
        $("#name-validation-message").html(isMultiTab ? window.Server.App.LocalizationContent.MultiTabDashboardNameValidator : window.Server.App.LocalizationContent.slideshowNameValidator).css("display", "block");
    }
});

$(document).on("change", "#select-multitab-category", function (event) {
    if (isEditAction) {
        if ($('#select-multitab-category').val() != "undefined" && $("#select-multitab-category").val() != null && $('#select-multitab-category').val() == window.editData.CategoryId) {
            window.editData.IsCategoryChanged = false;
        } else {
            window.editData.IsCategoryChanged = true;
        }
    }
    validateSlideshow();
});

$(document).on("keyup", "#loop_interval", function (event) {
    var duration = parseInt($("#loop_interval").val());

    if (!isNaN(duration)) {
        if (isSlideshowEdited && window.editData.LoopInterval != duration) {
            window.editData.IsDurationChanged = true;
        } else if (isSlideshowEdited) {
            window.editData.IsDurationChanged = false;
        }
    }

    if (isNaN(duration)) {
        $("#loop_interval").closest("div").addClass("has-error");
        $("#duration-validation-message").html($("#loop_interval").val() == "" ? window.Server.App.LocalizationContent.DurationEmptyValidation : window.Server.App.LocalizationContent.NumberValidation).show();
        return;
    } else if (duration < slideshowMinDuration || duration > slideshowMaxDuration) {
        $("#loop_interval").closest("div").addClass("has-error");
        $("#duration-validation-message").html(window.Server.App.LocalizationContent.SlideshowDurationValidation).show();
    } else {
        $("#loop_interval").closest("div").removeClass("has-error");
        $("#duration-validation-message").hide();
    }

    validateSlideshow();
});

function slideshowNameCheck(slideshowName) {
    $("#name-validation-message").css("display", "none");
    $(".slideshow-name span.loader-gif").remove();

    var checkItemNameExistsUrl = isMultiTab ? checkMultiTabDashboardNameExistUrl : checkSlideshowNameExistUrl;
    $(".slideshow-name").append($("<span class='loader-gif'><div class='loader-blue loader-icon' id='selected-category-loader-icon'><svg class='circular'><circle class='path' cx='27' cy='27' r='10' fill='none' stroke-width='2' stroke-miterlimit='10'></circle></svg></div></span>"));
    $.ajax({
        type: "POST",
        url: checkItemNameExistsUrl,
        data: { itemName: slideshowName },
        success: function (data) {
            if (data.Data) {
                $(".slideshow-name span.loader-gif").remove();
                $("#slideshow-name").closest("div").addClass("has-error");
                $("#name-validation-message").html(isMultiTab ? window.Server.App.LocalizationContent.IsMultiTabDashboardNameExist : window.Server.App.LocalizationContent.IsSlideshownameExist).css("display", "block");
            } else {
                $("#scheslideshowdule-name").closest("div").removeClass("has-error");
                $(".slideshow-name span.loader-gif").remove();
                $("#name-validation-message").css("display", "none");
                validateSlideshow();
            }
        }
    });
}

function validateSlideshow() {
    $("#create-slideshow, #edit-slideshow").attr('disabled', 'true');
    var slideShowName = $("#slideshow-name").val().trim();
    if (!($("#name-validation-message").css("display") == "block") && !($("body .loader-gif").length) && slideShowName) {
        if (!parent.IsValidName("name", slideShowName)) {
            $("#slideshow-name").closest("div").addClass("has-error");
            $("#name-validation-message").html(window.Server.App.LocalizationContent.AvoidSpecialCharactors).css("display", "block");
            return false;
        }
    } else {
        if (!slideShowName) {
            $("#slideshow-name").closest("div").addClass("has-error");
            $("#name-validation-message").html(isMultiTab ? window.Server.App.LocalizationContent.MultiTabDashboardNameValidator : window.Server.App.LocalizationContent.slideshowNameValidator).css("display", "block");
        }

        if ($("#select-multitab-category").val() != null) {
            $("#multi-tab-category-validation-message").html("").css("display", "none");
            $("[data-id=select-multitab-category].btn.dropdown-toggle.selectpicker.btn-default").removeClass("multi-tab-category-dropdown");
        }

        return false;
    }

    var slideItems = $(".display-dashboard-container").children();

    if (!isMultiTab) {
        var duration = parseInt($("#loop_interval").val());
        if (isNaN(duration) || duration < slideshowMinDuration || duration > slideshowMaxDuration) {
            return false;
        }

        if (isSlideshowEdited && !window.editData.slideshowNameChanged && !window.editData.IsDurationChanged && !window.editData.IsSlideChanged && !window.editData.IsSortChanged) {
            $("#edit-slideshow").attr('disabled', 'true');
            return false;
        }

        if (slideItems.length < 1 || $(".display-dashboard-container").find(".slide-card").length < 1) {
            return false;
        }
    } else {
        if ($("#select-multitab-category").val() == null) {
            return false;
        } else {
            $("#multi-tab-category-validation-message").html("").css("display", "none");
            $("[data-id=select-multitab-category].btn.dropdown-toggle.selectpicker.btn-default").removeClass("multi-tab-category-dropdown");
        }

        if (isSlideshowEdited && !window.editData.slideshowNameChanged && !window.editData.IsCategoryChanged && !window.editData.IsSlideChanged && !window.editData.IsSortChanged) {
            $("#edit-slideshow").attr('disabled', 'true');
            return false;
        }

        if (slideItems.length < 2 || $(".display-dashboard-container").find(".slide-card").length < 2) {
            return false;
        }
    }

    $("#edit-slideshow, #create-slideshow").removeAttr('disabled');
    return true;
}