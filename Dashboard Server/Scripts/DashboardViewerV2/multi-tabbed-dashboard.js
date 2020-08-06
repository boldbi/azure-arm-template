var createMultiTabHeader = "";
var selectedTabId = "";
var isClickedTab = true;

$(function () {
    var tabObj = new ejs.navigations.Tab({ enableAnimation: false });
    tabObj.appendTo('#multi-tab-dashboard');

    createMultiTabHeader = $("[data-action=multi-tab-header]");

    selectedTabView();
});

$(document).on("click", ".e-item.e-toolbar-item", function () {
    $(".e-toolbar-item .e-tab-text").removeClass("active-font-color");
    $(".e-toolbar-item.e-active .e-tab-text").addClass("active-font-color");

    for (var i = 0; i < $(".e-item.e-toolbar-item").length; i++) {
        if ($(".e-item.e-toolbar-item.e-active").attr("aria-controls") == "e-content_" + i) {
            $("div#e-content_" + i + " iframe").css({ "display": "block", "position": "absolute", "left": 0 });
        }
        else {
            $("div#e-content_" + i + " iframe").css({ "display": "block", "position": "absolute", "left": $(".e-content.e-lib.e-touch").width() * (i + 1) });
        }
    }

    if (isClickedTab) {
        var queryString = window.location.search;
        if (queryString.includes("&")) {
            var queryStringArray = queryString.replace("?", "").split("&");
            queryString = "";
            for (var j = 0; j < queryStringArray.length; j++) {
                if (!queryStringArray[j].includes("tab=")) {
                    queryString += queryStringArray[j] + "&";
                }
            }
        } else {
            queryString = "";
        }

        var currentUrl = window.location.pathname + window.location.search;
        var clickedUrl = window.location.pathname + "?" + queryString + "tab=" + $(".e-item.e-toolbar-item.e-active .e-tab-text").html();

        if (currentUrl != clickedUrl && window.innerWidth >= 1041) {
            if (history.pushState != undefined && clickedUrl != "") {
                history.pushState({}, "", clickedUrl);
            }
        }
    }

    isClickedTab = true;
});

function setDefaultTheme(bgColor, textColor, iconColor) {
        if (isMobileView) {
            $("#multi-tab-header-container").css("background", bgColor);
            $(".multi-tab-header-names").css("color", textColor);
            $(".su-mobile-menu-icon").css("color", iconColor);
        } else {
            $(".e-tab-header.e-control.e-toolbar.e-lib.e-keyboard").css("color", iconColor);
            $(".e-toolbar-item .e-tab-text").css("color", textColor);
            $(".e-toolbar-item.e-active .e-tab-text").addClass("active-font-color");
            $("#multi-tab-dashboard").css("background", bgColor);
            $(".sf-nav-separator").css("color", iconColor);
            $(".e-items.e-toolbar-items.e-lib.e-hscroll.e-control.e-touch .e-nav-arrow").css("color", iconColor);
            $(".multi-tab-back").css("color", iconColor);
        }

    for (var i = 0; i < $(".e-item.e-toolbar-item").length; i++) {
        if ($(".e-content.e-lib.e-touch .e-active").attr("id") != "e-content_" + i && $("#e-content_" + i + " iframe").attr("src") != "") {
            document.getElementById($("div#e-content_" + i + " iframe").attr("id")).contentWindow.applyDashboardTheme();
            if (isMobileView) {
                document.getElementById($("div#e-content_" + i + " iframe").attr("id")).contentWindow.applyMultiTabTheme();
            }
        }
    }
}

$(document).on("click", ".blur-container", function () {
    $(".blur-container").hide();
    $("#multi-tab-header-container").hide();
});

$(document).on("click", ".multi-tab-header-list-container .multi-tab-header-list", function () {
    selectActiveTab($(this).attr("id"));
    $(".blur-container").hide();
    $("#multi-tab-header-container").hide();
});

function selectedTabView() {

    if (!isMobileView) {
        var currentUrl = "";

        $("div.e-item iframe").width($(".e-content.e-lib.e-touch").width());
        $("div.e-item iframe").height(window.innerHeight - $(".e-tab-header.e-control.e-toolbar.e-lib.e-keyboard").height());

        if (showBackButton) {
            $(".e-tab-header.e-control.e-toolbar.e-lib.e-keyboard").css({ "position": "relative", "width": $(".e-content.e-lib.e-touch").width() - 66, "top": 0, "left": 66 });
        }

        $(".e-content.e-lib.e-touch").find(".e-item").removeClass("e-item");
        for (var i = 0; i < $(".e-item.e-toolbar-item").length; i++) {
            $("#e-item_" + i + " .e-tab-text").attr("title", $("#e-item_" + i + " .e-tab-text").html());
            $("div#e-content_" + i + " iframe").css({ "display": "block", "position": "absolute", "left": $(".e-content.e-lib.e-touch").width() * i });
        }

        if (selectedId != "") {
            for (var j = 0; j < $(".e-item.e-toolbar-item").length; j++) {
                if ($(".e-content.e-lib.e-touch #e-content_" + j + " iframe").attr("id").includes(selectedId)) {
                    var selectedTab = $(".e-content.e-lib.e-touch #e-content_" + j).attr("aria-labelledby");
                    isClickedTab = false;
                    $(".e-tab-header .e-toolbar-item#" + selectedTab).click();

                    for (var k = 0; k < $(".e-item.e-toolbar-item").length; k++) {
                        if ($(".e-item.e-toolbar-item.e-active").attr("aria-controls") == "e-content_" + k) {
                            $("div#e-content_" + k + " iframe").css({ "display": "block", "position": "absolute", "left": 0 });
                        }
                        else {
                            $("div#e-content_" + k + " iframe").css({ "display": "block", "position": "absolute", "left": $(".e-content.e-lib.e-touch").width() * k });
                        }
                    }
                }
            }

            if (!window.location.search.includes("tab=")) {
                currentUrl = window.location.pathname + window.location.search + "&tab=" + $(".e-item.e-toolbar-item.e-active .e-tab-text").html();
            } else if (window.location.search.includes("tab=") && window.location.search.includes("viewid=")) {
                currentUrl = window.location.pathname + window.location.search.split("&tab=")[0] + "&tab=" + $(".e-item.e-toolbar-item.e-active .e-tab-text").html();
            }
        } else {
            isClickedTab = true;
            if (window.location.search === "") {
                currentUrl = window.location.pathname + "?tab=" + $(".e-item.e-toolbar-item.e-active .e-tab-text").html();
            } else {
                currentUrl = window.location.pathname + window.location.search + "&tab=" + $(".e-item.e-toolbar-item.e-active .e-tab-text").html();
            }
        }

        if (history.pushState != undefined && currentUrl !== "") {
            history.pushState({}, "", currentUrl);
        }

        $(".e-toolbar-item .e-tab-text").removeClass("active-font-color");
        $(".e-toolbar-item.e-active .e-tab-text").addClass("active-font-color");
      
    } else {
        $(".e-tab-header.e-control.e-toolbar.e-lib.e-keyboard").hide();
        $("div.e-item iframe").width($(".e-content.e-lib.e-touch").width());
        $("div.e-item iframe").height(window.innerHeight);
        $("#multi-tab-mobile-menu").hide();
        $("#multi-tab-header-container").height(window.outerHeight - 59);
        $(".blur-container").height(window.outerHeight - 59);


        createMultiTabHeader.on("click", function (e) {
            $(".blur-container").show();
            $("#multi-tab-header-container").show();
            selectActiveTabHeader();
        });

        if (selectedId == "") {
            $(".e-content.e-lib.e-touch #e-content_0 iframe").attr("src", iframeUrls[0]);
        } else {
            for (var i = 0; i < iframeIds.length; i++) {
                if (iframeIds[i].includes(selectedId)) {
                    $(".e-content.e-lib.e-touch").find(".e-active").removeClass("e-active");
                    $(".e-content.e-lib.e-touch #e-content_" + i + " iframe").attr("src", iframeUrls[i]);
                    $(".e-content.e-lib.e-touch #e-content_" + i).addClass("e-active");
                }
            }
        }
    }
}

window.onpopstate = function () {
    isClickedTab = false;
    for (var i = 0; i < $(".e-item.e-toolbar-item").length; i++) {
        if (decodeURIComponent(window.location.search).split("tab=")[1] == $("#e-item_" + i + " .e-tab-text").html()) {
            var selectedTab = $(".e-content.e-lib.e-touch #e-content_" + i).attr("aria-labelledby");
            $(".e-tab-header .e-toolbar-item#" + selectedTab).click();

            for (var k = 0; k < $(".e-item.e-toolbar-item").length; k++) {
                if ($(".e-item.e-toolbar-item.e-active").attr("aria-controls") == "e-content_" + k) {
                    $("div#e-content_" + k + " iframe").css({ "display": "block", "position": "absolute", "left": 0 });
                }
                else {
                    $("div#e-content_" + k + " iframe").css({ "display": "block", "position": "absolute", "left": $(".e-content.e-lib.e-touch").width() * k });
                }
            }
        }
    }

    $(".e-toolbar-item .e-tab-text").removeclass("active-font-color");
    $(".e-toolbar-item.e-active .e-tab-text").addclass("active-font-color");
};

function selectActiveTabHeader() {
    $(".multi-tab-header-list-container").find(".selected-dark").removeClass("selected-dark");
    $(".multi-tab-header-list-container").find(".selected-light").removeClass("selected-light");
}

function selectActiveTab(tabId) {
    $(".e-content.e-lib.e-touch").find(".e-active").removeClass("e-active");
    for (var i = 0; i < $(".e-content.e-lib.e-touch .e-item").length; i++) {
        if ($("#e-content_" + i).attr("aria-labelledby") == tabId) {
            $("#e-content_" + i).addClass("e-active");
            if ($("#e-content_" + i + " iframe").attr("src") == "") {
                $("#multi-tab-mobile-menu").hide();
                $("#e-content_" + i + " iframe").attr("src", iframeUrls[i]);
            }
        }
    }
}