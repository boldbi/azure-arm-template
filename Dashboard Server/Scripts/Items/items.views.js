var isAjaxRequested = true;

function getDashboardViews(itemDetail, parentElement) {
    var element = $(parentElement).find("ul");
    var options = "";
    if (isAjaxRequested == true) {
        $(".dashboard-views").addClass("views-loader");
        isAjaxRequested = false;
        $.ajax({
            type: "POST",
            url: getViewsByItemIdUrl,
            data: { itemId: itemDetail.Id },
            success: function (data) {
                if (data != null && data.result != null && data.result.length > 0) {
                    if (itemDetail.IsChildDashboard) {
                        for (i = 0; i < data.result.length; i++) {
                            options += "<li><a class='view-name' href='" + dashboardsUrl + "/" + itemDetail.CategoryId + "/" + itemDetail.ParentCategoryName + "/" + itemDetail.CategoryName + "?tab=" + itemDetail.Name + "&viewid=" + data.result[i].ViewId + "' target='_blank' data-toggle='tooltip' data-placement='top' data-original-title='" + data.result[i].ViewName + "' data-itemid='" + data.result[i].ItemId + "'>" + data.result[i].ViewName + "</a></li>";
                        }
                    }
                    else {
                        for (i = 0; i < data.result.length; i++) {
                            options += "<li><a class='view-name' href='" + dashboardsUrl + "/" + itemDetail.Id + "/" + data.result[i].CategoryName + "/" + data.result[i].ItemName + "?viewid=" + data.result[i].ViewId + "' target='_blank' data-toggle='tooltip' data-placement='top' data-original-title='" + data.result[i].ViewName + "' data-itemid='" + data.result[i].ItemId + "'>" + data.result[i].ViewName + "</a></li>";
                        }
                    }
                } else {
                    options = "<li><span class='view-name' href='javascript:void(0);'><span>" + window.Server.App.LocalizationContent.NoViews + "</span></span></li>";
                }
                element.html(options);
                $(".dashboard-views").removeClass("views-loader");
                $(".dashboard-views").addClass("no-loader");
                $('[data-toggle="tooltip"]').tooltip();
            }
        }).always(function () {
            isAjaxRequested = true;
        });
    }
}