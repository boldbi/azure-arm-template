var browser = ej.browserInfo();
var itemUrl;

function intializeGetShareLink() {
    if ($("#get_item_link").length == 0) {
        $.ajax({
            type: "Get",
            url: getLinkDialogViewUrl,
            success: function (data) {
                $("body").append(data);
                intializeGetLinkDialog();
            }
        });
    } else {
        intializeGetLinkDialog();
    }
}

function intializeGetLinkDialog() {
    $("#get_item_link").ejDialog({
        width: (window.innerWidth > 460) ? "450px" : (window.innerWidth - 10),
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        height: "auto",
        title: window.Server.App.LocalizationContent.GetLink,
        showHeader: false,
        enableModal: true,
        closeOnEscape: true,
        close: "onGetLinkDialogClose",
        open: "onDashboardGetLinkDialogOpen"
    });
}

function onGetLinkDialogClose() {
    $("#get_item_link").ejDialog("close");
}
function onDashboardGetLinkDialogOpen() {
    var shareLinkDlg = $("#get_item_link");

    shareLinkDlg.ejDialog("open");
    shareLinkDlg.show();
    shareLinkDlg.focus();

    $(".get_link").show();

    var itemLink = $("#item-link");
    var getlink = window.location.href.replace(window.location.search, "");
    var newQuery = "?";
    if (isMultiDashboard.toLocaleLowerCase() === 'true') {
        newQuery += "tab=" + $("#dashboard").data("ejDashboardViewer").getCurrentTab().tabName.trim() + "&";
    }

    var query = location.search.substring(1);
    if (query != "") {
        var queryList = getQueryVariable(query);
        $.each(queryList, function (index, element) {
            if (index !== "filterQuery" && index !== "tab" && index !== "viewid" && index !== "isembed" && index !== "dashboard_comments" && index !== "widget_comments" && index !== "views" && index !== "export") {
                newQuery += index + '=' + element + '&';
            }
        });
    }

    getlink += newQuery;
    var dashboardViewerObj = getcurrentfilters();
    if (dashboardViewerObj != null && dashboardViewerObj.isInitialFilter != null && !dashboardViewerObj.isInitialFilter) {
        getlink += dashboardViewerObj.encryptedData;
    }
    else {
        getlink = getlink.slice(0, -1);
    }

    //Embed login query parameter removing
    getlink = removeURLParameter(getlink, "externallogin");

    itemLink.val(getlink);

    if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
        $("#item-link-copy").removeClass("su su-copy").attr("data-original-title", "").hide();
        itemLink.css({ width: "100%", borderRadius: "4px" });
    }
    else {
        $("#item-link-copy").tooltip({
            animation: false
        });
    }

    document.getElementById("item-link").setSelectionRange(0, itemUrl.length);
}

function getQueryVariable(queryString) {
    var params = {}, queries, temp, i, l;
    queries = queryString.split("&");
    for (i = 0, l = queries.length; i < l; i++) {
        temp = queries[i].split('=');
        params[temp[0]] = temp[1];
    }
    return params;
}

$(document).on("click", "#item-link-copy", function () {
    $("#item-link").select();

    var copyBtn = $("#item-link-copy");

    if (/Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)) {
        copyBtn.removeClass("su su-copy").attr("data-original-title", "");
    }
    else {
        document.execCommand("copy");
        copyBtn.tooltip("hide").attr("data-original-title", window.Server.App.LocalizationContent.Copysuccess).tooltip("fixTitle").tooltip("show");
        setTimeout(function () {
            copyBtn.attr("data-original-title", window.Server.App.LocalizationContent.LinkCopy);
            copyBtn.tooltip();
        }, 3000);
    }
});

function fnOnDashboardBegin(args) {
    if (args.eventType === "getLinkDialogOpen") {
        var shareLinkDlg = $("#get_item_link");
        $(".dashboard-link, .private-note").show();
        args.source.data.handled = true;
        itemUrl = args.source.data.url;
        shareLinkDlg.find(".report-name").html(args.model.reportName).attr("title", args.model.reportName);
        shareLinkDlg.ejDialog("open");
    }
}

function removeURLParameter(url, parameter) {
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);

        for (var i = pars.length; i-- > 0;) {
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }

        return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
    }
    return url;
}