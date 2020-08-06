$(document).ready(function () {
    $(document).on("keyup", ".quick-actions", function (e) {
        var key = $(".quick-actions").val();
        searchFunction(key.toLowerCase().trim());
    });

    $(".partial-views").each(function (index, item) {
        var viewUrl = $(item).attr("data-partial-url");
        if (viewUrl && viewUrl.length > 0) {
            $(item).load(viewUrl);
        }
    });

    $(document).on("click", ".donot-show-concierge", function () {
        SetConciergeCookie(true);
        $(".concierge-support-div").remove();
    });

    $(document).on("click", ".datasource img, .more-services", function (e) {
        var itemType;

        switch (e.target.id) {
            case "datasource-excel":
                itemType = "file_excel";
                break;
            case "datasource-mssql":
                itemType = "sql";
                break;
            case "datasource-postgre":
                itemType = "psql";
                break;
            case "datasource-redshift":
                itemType = "redshift";
                break;
            case "datasource-google-analytics":
                itemType = "google_analytics";
                break;
            case "datasource-jira":
                itemType = "web_jira";
                break;
            default:
                itemType = "";
        }

        window.datasourceQueryString = "itemType=" + itemType;
        $(".create-datasource-connection").click();
    });
    intializeGetLinkDialog();
});

$(document).on("click", ".share-dashboard", function () {
    if (recentDashboard.Id != "00000000-0000-0000-0000-000000000000") {
        currentItemDetail = recentDashboard;
        sharePermissionDlgHeaderItemName.text(currentItemDetail.Name);
        sharePermissionDlgObj.show();
        sharePermissionDlgObj.ejDialog("open");

        //Show Hide Public Private section
        if (recentDashboard.CreatedById == currentUserId) {

            if (isMarkItemsPublic) {
                if (recentDashboard.IsPublic) {
                    showPublicContent();
                } else {
                    showPrivateContent();
                }
            } else {
                showDashboardSettingContent();
            }


            addAttributeValueToBtnEle(recentDashboard);
        } else {
            hidePublicPrivateContent();
        }

        //Show Hide Share Permsission Section
        if (recentDashboard.CreatedById == currentUserId || isAdmin) {
            showShareUserGroupPermissionSection();
            sharePermissionDlgWrapperObj.ejWaitingPopup("show");
            getShareItemPermission(recentDashboard.Id);
            addAttributeValueToBtnEle(recentDashboard);
            addAttributeValueToAutoCompleteEle(recentDashboard);
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
        $("#item-url").val(getDashboardShareLink(recentDashboard.Id, recentDashboard.CategoryName, recentDashboard.Name));
    } else {
        messageBox("su-manage-permission", window.Server.App.LocalizationContent.ShareYourDashboard, window.Server.App.LocalizationContent.NoDashboardsAvailabletoShare, "success");
    }
});

$(document).on("click", ".share-slideshow", function () {
    if (!isEmptyOrWhitespace(recentSlideShowId)) {
        $("#permission-popup iframe").attr("src", permissionIframeUrl + "?itemId=" + recentSlideShowId);
        $("#permission-popup").ejDialog("open");
        ShowWaitingProgress("#permission-popup_wrapper", "show");
    } else {
        var createLink = "<a class='create-presentation' onclick='CreatePresentation()' style='cursor: pointer;'>" + window.Server.App.LocalizationContent.create + "</a>"
        messageBox("su-manage-permission", window.Server.App.LocalizationContent.ShareYourSlideshow, window.Server.App.LocalizationContent.NoSlideshowsAvailabletoShare + createLink + window.Server.App.LocalizationContent.SlideshowtoShare, "success");
    }
});

$(document).on("click", ".schedule-dashboard", function () {
    if (!isEmptyOrWhitespace(recentDashboard.Id)) {
        ItemId = "";
        ItemName = "";
        CategoryName = "";
        ScheduleId = "";
        CategoryId = "";
        MultiDashboardName = "";

        $.ajax({
            type: "POST",
            url: getItemDetailsUrl,
            data: { itemId: recentDashboard.Id },
            success: function (result) {
                ItemId = result.Data.Id;
                ItemName = result.Data.Name;
                CategoryName = result.Data.CategoryName;
                ScheduleId = "";
                CategoryId = result.Data.CategoryId;
                MultiDashboardName = "";
                $("#popup-container").ejDialog("open");
            }
        });
    } else {
        messageBox("su-nav-schedule", window.Server.App.LocalizationContent.ScheduleYourDashboard, window.Server.App.LocalizationContent.NoDashboardsAvailabletoSchedule, "success");
    }
});

$(document).on("click", ".create-data-source", function () {
    $(".create-datasource-connection").click();
});

function searchFunction(searchKey) {
    var searchResult = [];
    if (quickActions != null && quickActions != undefined && quickActions.length > 0 && searchKey != undefined) {
        for (var i = 0; i < quickActions.length; i++) {
            if (quickActions[i].Title.toLowerCase().indexOf(searchKey) > -1) {
                searchResult.push(quickActions[i]);
            }
            else if (quickActions[i].Description.toLowerCase().indexOf(searchKey) > -1) {
                searchResult.push(quickActions[i]);
            }
        }
        if (searchResult.length > 0) {
            var optionHtml = "";
            if (searchResult.length > 3) {
                $("#quick-action-ul").css("height", "267px");
            }
            else {
                $("#quick-action-ul").css("height", "auto");
            }

            for (var i = 0; i < searchResult.length; i++) {
                var element = '<li class="action-link">';

                if (searchResult[i].Url != null && searchResult[i].Url != "") {
                    var aElement = '<a href="' + searchResult[i].Url + '"';
                    if (!searchResult[i].Url.startsWith("/")) {
                        aElement += ' target="blank"';
                    }
                    aElement += ' class="col-sm-12 col-md-12 col-lg-12">';
                    element = element + aElement;
                }
                else {
                    element = element + '<a  class="' + searchResult[i].ElementClass + ' col-sm-12 col-md-12 col-lg-12">';
                }
                element = element + '<span class="action-title">' + searchResult[i].Title + '</span> <span class="col-sm-12 col-md-12 col-lg-12 action-description no-padding">' + searchResult[i].Description + '</span> </a>';

                if (i != searchResult.length - 1) {
                    element = element + '<a class="col-md-12 col-lg-12 separator"></a>';
                }

                element = element + '</li>';

                optionHtml = optionHtml + element;
            }

            $("#quick-action-ul").html("");
            $("#quick-action-ul").html(optionHtml);
        }
        else {
            $("#quick-action-ul").css("height", "auto");
            $("#quick-action-ul").html("");
            $("#quick-action-ul").html('<li class="action-link"> <a>No match found</a> </li>');
        }
    }
}

function SetConciergeCookie(donotShowConcierge) {
    var cookieValue = JSON.stringify('{ "donot_show_concierge": "' + donotShowConcierge + '"}');
    document.cookie = "syncfusion.dashboards.server.concierge" + "=" + cookieValue + ";expires='Fri, 31 Dec 9999 23:59:59 GMT';path=/";
}

function CreatePresentation() {
    $("#messageBox").ejDialog("close");
}