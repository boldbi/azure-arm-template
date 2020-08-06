var selectedCategoryId = "";

function geteditSlideshowDetail(slideshowId, isMultiTabDashboard) {
    isSlideshowEdited = true;
    var getEditDetailsUrl = "";
    isMultiTabDashboard = isMultiTabDashboard == "undefined" || isMultiTabDashboard == "" ? false : isMultiTabDashboard;
    isMultiTab = isMultiTabDashboard;
    isEditAction = true;
    $("#create-presentation-popup").ejDialog("open");
    showWaitingPopup("create-presentation-popup_wrapper");
    $("#slideshow-popup-container").hide();
    if (isMultiTab) {
        getEditDetailsUrl = geteditMultiTabDashboardDetailUrl;
        $(".slideshow-popup-title").text(window.Server.App.LocalizationContent.EditMultiTab);
        $("#multitab-icon").removeClass("su-tv").addClass("su-multi-tabbed");
        $(".duration-field").hide();
        $(".item-type-dropdown").hide();
        if (canCreateCategory) {
            $("[data-id=select-multitab-category].btn.dropdown-toggle.selectpicker.btn-default").css("border-radius", "4px 0 0 4px");
        }
        $(".category-field").show();
        $(".add-new-button").show();
    } else {
        getEditDetailsUrl = geteditSlideshowDetailUrl;
        $(".slideshow-popup-title").text(window.Server.App.LocalizationContent.EditSlideshow);
        $("#multitab-icon").removeClass("su-multi-tabbed").addClass("su-tv");
        $(".duration-field").show();
        $(".item-type-dropdown").show();
        $(".category-field").hide();
        $(".add-new-button").hide();
    }
    $.ajax({
        type: "POST",
        url: getEditDetailsUrl,
        data: { itemId: slideshowId },
        success: function (data) {
            categories = data.Categories;
            widgets = data.WidgetList;
            if (isMultiTab) {
                multiTabCategories = data.MultiTabCategories;
                selectedCategoryId = data.CategoryId;
                var listMultiTabCategories = "";
                for (var i = 0; i < multiTabCategories.length; i++) {
                    listMultiTabCategories += '<option value="' + multiTabCategories[i].Id + '">' + multiTabCategories[i].Name + '</option>';
                }
                $("#select-multitab-category").html("");
                $("#select-multitab-category").html(listMultiTabCategories).selectpicker("refresh");
                $('#select-multitab-category').val(selectedCategoryId);
                $('#select-multitab-category').selectpicker('refresh');
                $("#multi-tab-category-validation-message").html("").css("display", "none");
                $("[data-id=select-multitab-category].btn.dropdown-toggle.selectpicker.btn-default").removeClass("multi-tab-category-dropdown");
            }
            editSlideshowDetail = data.SlideshowDetail;
            var listCategories = "";
            for (var t = 0; t < categories.length; t++) {
                listCategories += '<option value="' + categories[t].Id + '">' + categories[t].Name + '</option>';
            }
            $("#select_category").html("");
            $("#select_category").html('<option value="" selected="selected" class="hide-option" disabled>' + window.Server.App.LocalizationContent.SelectCategory + '</option>' + listCategories).selectpicker("refresh");
            resetSlideshowDialog();
            prepareEditSlideshow();
            $("#slideshow-popup-container").show();
            $("#sortable").css("height", $(".display-dashboard").height() - $("#add-dashboard-widgets").height());
            hideWaitingPopup("create-presentation-popup_wrapper");
            addTitleForCategorySlideshow();
            $(".slide-category-dropdown .btn-group .dropdown-toggle").attr("title", "").attr("data-original-title", "");
        }
    });
}

function updateMultiTabCategory(categoryName, itemId) {
    $("#select-multitab-category").prepend('<option value="' + itemId + '" selected = "selected" >' + categoryName + '</option >');
    $('#select-multitab-category').selectpicker('refresh');
    validateSlideshow();
}

function prepareEditSlideshow() {
    window.isEdited = false;
    $("#slideshow-name").val(editSlideshowDetail.Name);
    $("#create-slideshow").hide();
    $("#edit-slideshow").show();

    if (isMultiTab) {
        window.editData = {
            ItemId: editSlideshowDetail.SlideshowId,
            SlideshowName: editSlideshowDetail.Name,
            CategoryId: selectedCategoryId,
            slideshowNameChanged: false,
            IsSlideChanged: false,
            IsSortChanged: false
        };
        $(".slideshow-popup-title").text(window.Server.App.LocalizationContent.EditMultiTab + " - " + editSlideshowDetail.Name);
    } else {
        window.editData = {
            ItemId: editSlideshowDetail.SlideshowId,
            SlideshowName: editSlideshowDetail.Name,
            LoopInterval: editSlideshowDetail.LoopInterval,
            slideshowNameChanged: false,
            IsDurationChanged: false,
            IsSlideChanged: false,
            IsSortChanged: false
        };
        $(".slideshow-popup-title").text(window.Server.App.LocalizationContent.EditSlideshow + " - " + editSlideshowDetail.Name);
        $('#loop_interval').val(editSlideshowDetail.LoopInterval);
        $('#loop_interval').selectpicker('render');
    }

    for (var i = 0; i < editSlideshowDetail.SlideList.length; i++) {
        var tileContent = "";
        var tile = "";
        var title = "";
        if (editSlideshowDetail.SlideList[i].ItemType == 1) {
            title += "<b>" + window.Server.App.LocalizationContent.Dashboard + "</b>: " + window.Server.App.LocalizationContent.AllDashboardInCategory + "\n";
            tileContent = "<span class='tile-name'><span class='su su-nav-dashboard'></span>" +
                window.Server.App.LocalizationContent.AllDashboardInCategory +
                "</span>";
        } else if (editSlideshowDetail.SlideList[i].ItemType == 2) {
            title += "<b>" + window.Server.App.LocalizationContent.Dashboard + "</b>: " + editSlideshowDetail.SlideList[i].ItemInfo.Name + "\n";
            tileContent = "<span class='tile-name'><span class='su su-nav-dashboard'></span>" +
                editSlideshowDetail.SlideList[i].ItemInfo.Name +
                "</span>";
        }

        if (editSlideshowDetail.SlideList[i].ItemType != 8 && editSlideshowDetail.SlideList[i].ItemType != 1) {
            title += "<b>" + window.Server.App.LocalizationContent.Categoy + "</b>: " + editSlideshowDetail.SlideList[i].ItemInfo.CategoryName + "\n";
            tileContent += "<span class='tile-category'>" +
                editSlideshowDetail.SlideList[i].ItemInfo.CategoryName +
                "</span>";
        } else if (editSlideshowDetail.SlideList[i].ItemType == 1) {
            title += "<b>" + window.Server.App.LocalizationContent.Categoy + "</b>: " + editSlideshowDetail.SlideList[i].ItemInfo.Name + "\n";
            tileContent += "<span class='tile-category'>" +
                editSlideshowDetail.SlideList[i].ItemInfo.Name +
                "</span>";
        }

        if (editSlideshowDetail.SlideList[i].ItemType == 2) {
            if (!isNullOrWhitespace(editSlideshowDetail.SlideList[i].ItemInfo.TabId)) {
                title += "<b>" + window.Server.App.LocalizationContent.Tab + "</b>: " + editSlideshowDetail.SlideList[i].ItemInfo.TabName + "\n";
                tileContent += "<span class='tile-tab'><span class='tab-label'>" + window.Server.App.LocalizationContent.Tab + ": </span>" +
                    editSlideshowDetail.SlideList[i].ItemInfo.TabName +
                    "</span>";
            } else if (editSlideshowDetail.SlideList[i].ItemInfo.IsMultiDashboard) {
                title += "<b>" + window.Server.App.LocalizationContent.Tab + "</b>: " + window.Server.App.LocalizationContent.AllTabsInDashboard + "\n";
                tileContent += "<span class='tile-tab'><span class='tab-label'>" + window.Server.App.LocalizationContent.Tab + ": </span>" +
                    window.Server.App.LocalizationContent.AllTabsInDashboard +
                    "</span>";
            }
            
        }

        if (editSlideshowDetail.SlideList[i].ItemType == 2 && !isNullOrWhitespace(editSlideshowDetail.SlideList[i].ItemInfo.ViewId)) {
            title += "<b>" + window.Server.App.LocalizationContent.View + "</b>: " + editSlideshowDetail.SlideList[i].ItemInfo.ViewName + "\n";
            tileContent += "<span class='tile-view'><span class='view-label'>" + window.Server.App.LocalizationContent.View + ": </span>" +
                editSlideshowDetail.SlideList[i].ItemInfo.ViewName  +
                "</span>";
        }

        if (editSlideshowDetail.SlideList[i].ItemType == 8) {
            title = "<b>" + window.Server.App.LocalizationContent.Widget + "</b>: " + editSlideshowDetail.SlideList[i].ItemInfo.Name;
            tileContent = "<span class='tile-name'><span class='su su-nav-widgets' data-toggle='tooltip'></span>" +
                editSlideshowDetail.SlideList[i].ItemInfo.Name +
                "</span>";
        }

        if (editSlideshowDetail.SlideList[i].ItemType == 1) {
            tile = "<li class='slide-card col-xs-12 no-padding' data-toggle='tooltip' data-html='true' title='" + title + "' data-category-id='" +
                editSlideshowDetail.SlideList[i].ItemInfo.Id +
                "'data-category-name='" +
                editSlideshowDetail.SlideList[i].ItemInfo.Name +
                "' data-dashboard-id='all' data-dashboard-name='' data-ismultidashboard='false' data-tab-id=''data-tab-name='' data-view-id='' data-view-name='' data-item-type='" +
                editSlideshowDetail.SlideList[i].ItemType +
                "'><span class='card-sort su su-dragger' data-toggle='tooltip' title='" + window.Server.App.LocalizationContent.RearrangeSlide + "'><span class='su-dragger path1'></span></span><span class='card-content' data-toggle='tooltip' data-html='true' title='" +
                title +
                "'>" +
                tileContent +
                "</span><span class='card-remove su su-minus-circle pull-right' data-toggle='tooltip' title='" + window.Server.App.LocalizationContent.RemoveSlide + "'></span></li>";
        } else if (editSlideshowDetail.SlideList[i].ItemType == 2) {
            tile = "<li class='slide-card col-xs-12 no-padding' data-toggle='tooltip' data-html='true' title='" + title + "' data-category-id='" +
                editSlideshowDetail.SlideList[i].ItemInfo.CategoryId +
                "' data-category-name='" +
                editSlideshowDetail.SlideList[i].ItemInfo.CategoryName +
                "' data-dashboard-id='" +
                editSlideshowDetail.SlideList[i].ItemInfo.Id +
                "'data-dashboard-name='" +
                editSlideshowDetail.SlideList[i].ItemInfo.Name +
                "' data-ismultidashboard='" +
                editSlideshowDetail.SlideList[i].ItemInfo.IsMultiDashboard +
                "'data-tab-id='" +
                editSlideshowDetail.SlideList[i].ItemInfo.TabId +
                "'data-tab-name='" +
                editSlideshowDetail.SlideList[i].ItemInfo.TabName +
                "'data-view-id='" +
                editSlideshowDetail.SlideList[i].ItemInfo.ViewId +
                "'data-view-name='" +
                editSlideshowDetail.SlideList[i].ItemInfo.ViewName +
                "'data-item-type='" +
                editSlideshowDetail.SlideList[i].ItemType +
                "'><span class='card-sort su su-dragger' data-toggle='tooltip' title='" + window.Server.App.LocalizationContent.RearrangeSlide + "'><span class='su-dragger path1'></span></span><span class='card-content'>" +
                tileContent +
                "</span><span class='card-remove su su-minus-circle pull-right' data-toggle='tooltip' title='" + window.Server.App.LocalizationContent.RemoveSlide + "'></span></li>";
        } else if (editSlideshowDetail.SlideList[i].ItemType == 8){
            tile = "<li class='slide-card slide-wiget-card col-xs-12 no-padding' data-toggle='tooltip' data-html='true' title='" + title + "'" +
                "' data-widget-id='" +
                editSlideshowDetail.SlideList[i].ItemInfo.Id +
                "'data-widget-name='" +
                editSlideshowDetail.SlideList[i].ItemInfo.Name +
                "'data-item-type='" +
                editSlideshowDetail.SlideList[i].ItemType +
                "' data-ismultidashboard='false'><span class='card-sort su su-dragger' data-toggle='tooltip' title='" + window.Server.App.LocalizationContent.RearrangeSlide + "'><span class='su-dragger path1'></span></span><span class='card-content'>" +
                tileContent +
                "</span><span class='card-remove su su-minus-circle pull-right' data-toggle='tooltip' title='" + window.Server.App.LocalizationContent.RemoveSlide + "'></span></li>";
        }

        $(".display-dashboard-container").append(tile);
        $("[data-toggle='tooltip']").tooltip();
    }
};

function editSlideshowMethod() {
    if (isMultiTab) {
        editMultiTabDashboard();
    } else {
        editSlideshow();
    }
}

function editMultiTabDashboard() {
    if (validateSlideshow()) {
        showWaitingPopup("create-presentation-popup_wrapper");
        var editMultiTabDashboardData = getSlideshowValues("edit");
        $.ajax({
            type: "POST",
            url: editMultiTabDashboardUrl,
            data: editMultiTabDashboardData,
            success: function (data) {
                if (data.StatusCode !== undefined && data.StatusCode === "ItemNameAlreadyExist") {
                    $("#name-validation-message").text(data.Message);
                } else {
                    if (data.Status) {
                        eDialog = $("#create-presentation-popup").data("ejDialog");
                        eDialog.close();
                        SuccessAlert(window.Server.App.LocalizationContent.EditMultiTab, window.Server.App.LocalizationContent.MultiTabDashboard + ", <a target='_blank' href='" + rootUrlAction + "/dashboards/" + editMultiTabDashboardData.ItemId + "/" + editMultiTabDashboardData.multiTabDashboardName + "?showmydashboards=1" + "'>" + editMultiTabDashboardData.multiTabDashboardName + "</a>, " + window.Server.App.LocalizationContent.EditSlideshowSuccess, 7000);
                        onCloseMessageBox();
                    } else {
                        WarningAlert(window.Server.App.LocalizationContent.EditMultiTab, data.Message, 0);
                    }
                }

                hideWaitingPopup("create-presentation-popup_wrapper");
            }
        });
    }
}

function editSlideshow() {
    if (validateSlideshow()) {
        showWaitingPopup("create-presentation-popup_wrapper");
        var editSlideshowData = getSlideshowValues("edit");
        $.ajax({
            type: "POST",
            url: editSlideShowUrl,
            data: editSlideshowData,
            success: function (data) {
                if (data.StatusCode !== undefined && data.StatusCode === "ItemNameAlreadyExist") {
                    $("#name-validation-message").text(data.StatusMessage);
                } else {
                    if (data.Status) {
                        eDialog = $("#create-presentation-popup").data("ejDialog");
                        eDialog.close();
                        SuccessAlert(window.Server.App.LocalizationContent.EditSlideshow, window.Server.App.LocalizationContent.Slideshow + " — <a target='_blank' href='" + rootUrlAction + "/slideshow/" + editSlideshowData.ItemId + "/" + editSlideshowData.slideshowName + "'>" + editSlideshowData.slideshowName + "</a> " + window.Server.App.LocalizationContent.EditSlideshowSuccess, 7000);
                        onSuccessRefreshGrid(0);
                        onCloseMessageBox();
                    } else {
                        WarningAlert(window.Server.App.LocalizationContent.EditSlideshow, data.Message, 0);
                    }
                }

                hideWaitingPopup("create-presentation-popup_wrapper");
            }
        });
    }
}

function isNullOrWhitespace(value) {
    return (value == null || value == undefined || $.trim(value) == "");
}