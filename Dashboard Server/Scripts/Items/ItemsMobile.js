$(document).ready(function () {
    var isFirstRequest = false;
});

$(document).on("click", ".search-item", function () {
    $("#search-items").show().focus();
    $("#search-schedules").show().focus();
    $(".search-item").removeClass("remove-background");
});

$(document).on("click", "#clear-search", function () {
    $("#search-items").hide();
    $("#search-schedules").hide();
    $(".search-item").addClass("remove-background");
});

function refreshMobileGrid() {
    var gridObj = ($("#scheduleGrid").length == 0) ? $("#items").data("ejGrid") : $("#scheduleGrid").data("ejGrid");
    gridObj._scrollObject.refresh();
    $(".e-gridcontent").css("height", $(".e-gridcontent .e-table").height() > gridHeight ? gridHeight : $(".e-gridcontent .e-table").height());
}

$(document).on("click", ".e-gridcontent .su-vertical-expand", function () {
    $(this).addClass("su-angle-right").removeClass("su-vertical-expand");
    if ($('.e-gridcontent .su-vertical-expand').length < 1) {
        $('.expand-collapse').attr("data-value", "expand-all").text(window.Server.App.LocalizationContent.ExpandAll);
    }
    setTimeout(function () {
        refreshMobileGrid();
    }, 1000);
});

$(document).on("click", ".e-gridcontent .su-angle-right", function () {
    $(this).addClass("su-vertical-expand").removeClass("su-angle-right");
    if ($('.e-gridcontent .su-angle-right').length < 1)
    {
        $('.expand-collapse').attr("data-value", "collapse-all").text(window.Server.App.LocalizationContent.CollapseAll);
    }
    refreshMobileGrid();
});

function onToolBarClick(args) {
    var tbarObj = $(args.target);
    if (tbarObj.attr("data-value") == "expand-all") {
        tbarObj.attr("data-value", "collapse-all").text(window.Server.App.LocalizationContent.CollapseAll);
        $('.e-gridcontent .su-angle-right').click();
    }
    else if (tbarObj.attr("data-value") == "collapse-all") {
        tbarObj.attr("data-value", "expand-all").text(window.Server.App.LocalizationContent.ExpandAll);
        $('.e-gridcontent .su-vertical-expand').click();
    }
}

$(window).on("orientationchange", function () {
    setTimeout(function() {
        var gridObj = ($("#scheduleGrid").length == 0) ? $("#items").data("ejGrid") : $("#scheduleGrid").data("ejGrid");
        var gridHeight = $(window).height() - ($("#header-area").outerHeight() + 40);
        gridObj.option({ scrollSettings: { width: "100%", height: gridHeight } });
        gridObj._scrollObject.refresh();
        $(".e-gridcontent").css("height", $(".e-gridcontent .e-table").height() > gridHeight ? gridHeight : $(".e-gridcontent .e-table").height());
        $(".e-table").css("width", "100%");
    }, 1000);
});

$(document).on('hide.bs.dropdown, shown.bs.dropdown', '#items .e-row, #scheduleGrid .e-row', function () {
    refreshMobileGrid();
});