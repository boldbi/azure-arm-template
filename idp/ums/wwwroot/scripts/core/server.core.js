var userAgent = navigator.userAgent;
var regexIe8 = new RegExp("Trident(\/4.0)|(Trident\/5.0)");
var timeOut;
var searchId;
var isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
var clearSearch = false;
var toastTimeout;
var downloadLogsDialog;

var keyCode = {
    Tab: 9,
    Enter: 13,
    Shift: 16,
    Ctrl: 17,
    Alt: 18,
    Pause: 19,
    CapsLock: 20,
    PageUp: 33,
    PageDown: 34,
    End: 35,
    Home: 36,
    LeftArrow: 37,
    UpArrow: 38,
    RightArrow: 39,
    DownArrow: 40,
    Insert: 45,
    LeftWindow: 91,
    RightWindow: 92
};

var excludedSearchKeys = [
    keyCode.Tab,
    keyCode.Shift,
    keyCode.Ctrl,
    keyCode.Alt,
    keyCode.Pause,
    keyCode.CapsLock,
    keyCode.PageUp,
    keyCode.PageDown,
    keyCode.End,
    keyCode.Home,
    keyCode.LeftArrow,
    keyCode.UpArrow,
    keyCode.RightArrow,
    keyCode.DownArrow,
    keyCode.Insert,
    keyCode.LeftWindow,
    keyCode.RightWindow
];

$(document).ready(function () {

    var copyClientSecret = $("#copy-client-secret");
    if (copyClientSecret.length) {
        copyClientSecret.on("click", function () {
            copyToClipboard('#mySecret', '#copy-client-secret');
        });
    }

    var copyClientId = $("#copy-client-id");
    if (copyClientId.length) {
        copyClientId.on("click", function () {
            copyToClipboard('#myId', '#copy-client-id');
        });
    }
    var userIdCopy = $("#user-id-copy");
    if (userIdCopy.length) {
        userIdCopy.on("click", function () {
            copyToClipboard('#user-id','#user-id-copy');
        });
    }
    createWaitingPopup('body');
    createWaitingPopup('server-app-container');
    createWaitingPopup('content-area');
    createWaitingPopup('startup-waiting-element');
    createWaitingPopup('startup-page-container-waiting-element');
    createWaitingPopup('messageBox');

    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
    });
    $("body, .login-main, #server-app-container").removeAttr("style");
    $("#layout-body-loader-icon").css("display", "none");

    $("form").attr("autocomplete", "off");
    $("input[type=text], input[type=password]").attr("autocomplete", "off");
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    $(document).on("click", ".dropdown-menu #notify_header", function (e) {
        e.stopPropagation();
    });

    var notBackdrop =
        $('<div id="nav-backdrop" class="modal-backdrop" style="z-index: 50; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; color: #fff; opacity: 0; position: absolute"></div>');

    $("#upload-item-section, #notification-link, #account-profile").on('hidden.bs.dropdown', function () {
        parent.$("#nav-backdrop").hide();
    });

    notBackdrop.click(function () {
        notBackdrop.hide();
    });

    String.prototype.format = function () {
        a = this;
        for (k in arguments) {
            a = a.replace("{" + k + "}", arguments[k])
        }
        return a
    }

    searchId = $("#search-area").children("input").attr("id");
    if (searchId == "ad-user-import" || searchId == "AD-group-import" || searchId == "search-ad-users" || searchId == "search-ad-groups" || $("#ad-tab-nav li#activity").length !== 0) {
        $.xhrPool = [];

        $.xhrPool.abortAll = function () {
            $(this).each(function (i, jqXHR) {
                jqXHR.abort();
            });
            $.xhrPool.length = 0;
        }

        $.ajaxSetup({
            beforeSend: function (jqXHR) {
                jqXHR.setRequestHeader("CSRF-TOKEN", extractXSRFTokenFromCookie())
                $.xhrPool.push(jqXHR);
            },
            complete: function (jqXHR) {
                var i = $.xhrPool.indexOf(jqXHR);
                if (i > -1) $.xhrPool.splice(i, 1);
            }
        });
    } else {
        $.xhrPool = [];

        $.xhrPool.abortAll = function () {
            $(this).each(function (i, jqXHR) {
                jqXHR.abort();
            });
            $.xhrPool.length = 0;
        };
        if (typeof ej != "undefined" && typeof ej.UrlAdaptor != "undefined") {
            ej.UrlAdaptor.prototype.beforeSend = function (dm, request) {
                request.setRequestHeader("CSRF-TOKEN", extractXSRFTokenFromCookie());
                $.xhrPool.push(request);
            };
            $.ajaxSetup({
                complete: function (jqXHR) {
                    var i = $.xhrPool.indexOf(jqXHR);
                    if (i > -1) $.xhrPool.splice(i, 1);
                }
            });
        }
        else if (typeof ejs != "undefined" && typeof ejs.data.UrlAdaptor != "undefined") {
            // Overriding the beforeSend method for UrlAdaptor globally
            ejs.data.UrlAdaptor.prototype.beforeSend = function (dm, request) {
                // Set the CSRF token in the request headers
                request.setRequestHeader("CSRF-TOKEN", extractXSRFTokenFromCookie());

                // Optional: Add request to the pool if you want to manage active AJAX requests
                if (typeof $.xhrPool !== "undefined") {
                    $.xhrPool.push(request);
                }
            };

            $.ajaxSetup({
                beforeSend: function (jqXHR) {
                    jqXHR.setRequestHeader("CSRF-TOKEN", extractXSRFTokenFromCookie())
                    $.xhrPool.push(jqXHR);
                }
            });
        }
        else {
            $.ajaxSetup({
                beforeSend: function (jqXHR) {
                    jqXHR.setRequestHeader("CSRF-TOKEN", extractXSRFTokenFromCookie())
                    $.xhrPool.push(jqXHR);
                }
            });
        }
    }

    $('.lazyload').each(function () {
        if ($(this).parent().find("img").length === 0) {
            var img = document.createElement('img');
            img.onload = imageOnLoad;
            img.src = $(this).attr("data-src");
            img.alt = $(this).attr("data-alt");
            img.id = $(this).attr("data-id");
            var defaultSrc = $(this).attr("data-default");
            if (defaultSrc) {
                img.onerror = function () {
                    this.src = defaultSrc;
                };
            }
            img.style.display = "none";
            if ($(this).attr("data-id") === "footerlogo") {
                $(this).parent().find("p#poweredbysyncfusion").append(img);
            } else if ($(this).attr("data-id") === "profilelogo" || $(this).attr("data-id") === "profile-logo-sub" || $(this).attr("data-id") === "user-profile-picture") {
                $(this).parent().append(img);
            } else {
                $(this).parent().append(img);
                if ($(this).attr("data-id") === "application-logo") {
                    var appLogoSrc = $(this).attr("data-src");
                    if (appLogoSrc !== undefined && appLogoSrc !== '' && appLogoSrc.length > 3) {
                        var logoFormat = appLogoSrc.substr(appLogoSrc.length - 3, appLogoSrc.length);
                        if (logoFormat.toLowerCase() === "svg") {
                            $("#application-logo").addClass("application-logo-svg");
                        }
                    }
                }
            }
        }
    });

    //currently not used
    //if (typeof (isLicenseExpiredUrl) !== "undefined") {
    //    $.ajax({
    //        type: "POST",
    //        url: isLicenseExpiredUrl,
    //    });
    //}

    downloadLogsDialog = new ej.popups.Dialog({
        header: window.Server.App.LocalizationContent.GetDiagnosticLogs,
        content: document.getElementById("download-logs-dialog"),
        showCloseIcon: true,
        width: '500px',
        height: '300px',
        isModal: true,
        visible: false,
        beforeOpen: fnBeforeDownloadDialogsOpen,
        animationSettings: { effect: 'Zoom' }
    });

    downloadLogsDialog.appendTo('#download-logs-dialog-content');

    var dropDownList = new ejs.dropdowns.DropDownList({
        index: 0,
        floatLabelType: "Never",
        placeholder: "Select a time period",
        cssClass: 'e-outline e-custom e-non-float',
        enablePersistence: true,
        query: new ej.data.Query(),
        allowFiltering: false,
        filterType: "Contains"
    });

    dropDownList.appendTo("#download-logs-dialog-dropdown");
    var UserNameElement = $(".top-menu-user-name .top-menu-user-name-style:first").text();
    var UserEmailElement = $(".top-menu-user-name .top-menu-user-email-style:first").text();
    if (UserNameElement.length > 21 || UserEmailElement.length > 25) {
        $(".top-menu-profile-hover").attr("title", "<span class='tooltip-row'>" + UserNameElement + "</span><br><span class='tooltip-row'>" + UserEmailElement + "</span>");
        $(".top-menu-profile-hover").tooltip({
            html: true,
        });
    }
});

$(document).on("click", "#download-log", function () {
    downloadLogsDialog.show();
    document.getElementById("is-include-configuration").checked = false
});

$(document).on("click", "#download-logs-dialog-cancel", function () {
    downloadLogsDialog.hide();
});

$(document).on("click", ".dropdown-backdrop", function () {
    parent.$("#nav-backdrop").hide();
});

$(document).on("click", "#download-logs-dialog-proceed", function () {
    downloadLogsDialog.hide();
    var val = document.getElementById("download-logs-dialog-dropdown").ej2_instances[0].value;
    var isIncludeConfiguration = $("#is-include-configuration").is(":checked");
    window.location = getDiagnosticLogsUrl + "?span=" + val + "&isIncludeConfiguration=" + isIncludeConfiguration;
});

$(document).on("click", "#notification-link, #account-profile, #upload-item-section", function (e) {
    if ($(".dropdown-backdrop").length === 0) {
        $("body").append(notBackdrop);
    }
    if (!$("#notification-link").hasClass("open")) {
        notBackdrop.show();
    }
    else if (!$("#account-profile").hasClass("open")) {
        notBackdrop.show();
    } else {
        notBackdrop.show();
    }
});

$(document).on("click", "#account-profile .dropdown-menu", function (e) {
    e.stopPropagation();
});

$(document).on("click", ".mobile-menu-icon", function () {
    $(".mobile-menu-icon").removeClass("collapsed");
    $("#menu-area").removeClass("collapse");
    $("#menu-area").toggleClass("d-block");
});

$(document).on("keyup", "textarea", function (event) {
    if (event.keyCode != 8 && event.keyCode != 46) {
        var max = $(this).attr("maxlength");
        if (max != undefined && $(this).val().length >= max) {
            $(this).val($(this).val().substring(0, max));
        }
    }
});

$(document).on("keyup", "textarea", function (event) {
    
    if ($(this).attr("id") === "email-body-container_editable-content") {
        return; 
    }
    if (event.keyCode != 8 && event.keyCode != 46) {
        var max = 255;
        if ($(this).attr("maxlength") != undefined) {
            max = $(this).attr("maxlength");
        }
        if ($(this).val().length >= max) {
            $(this).val($(this).val().substring(0, max));
        }
    }
});

$(document).on("focus", "input[type=text],input[type=password],textarea", function () {
    if (regexIe8.test(userAgent)) {
        $(this).next(".placeholder").removeClass("d-block").addClass("d-none");
    }
});

$(document).on("focusout", "input[type=text],input[type=password],textarea", function () {
    if (regexIe8.test(userAgent) && $(this).val() === "") {
        $(this).next(".placeholder").removeClass("d-none").addClass("d-block");
    }
});
$(document).on("focus", ".placeholder", function () {
    $(this).prev("input").focus();
});

$(document).on("keyup", "#search-users, #search-tenants, #search-tenants-allsites, #search-tenants-favorite,#search-app-users, #add-user-search,#search-tenant-users,#add-tenant-search,#search-event,#search-template,#search-languages", function (e) {
    var element = "#" + this.id;
    if ($(element).val() != "") {
        if (element == "#search-home-page" || element == "#search-tenant-users") {
            $(element).parent().siblings("span.close-icon").css("display", "block");
            $(element).parent().siblings("span.search-icon").css("display", "none");
        }
        else {
            $(element).siblings("span.close-icon").css("display", "block");
            $(element).siblings("span.search-user").css("display", "none");
            $(element).siblings("span.search-group").css("display", "none");
            $(element).siblings("span.search-group-users").css("display", "none");
            $(element).siblings("span.search-icon").css("display", "none");
            $(element).siblings("span.search-item").css("display", "none");
            $(element).siblings("span.search-schedule").css("display", "none");
            $(element).siblings("span.search").css("display", "none");
            $(element).siblings("span.search-application").css("display", "none");
            $(element).siblings("span.search-allsites").css("display", "none");
            $(element).siblings("span.search-favorite").css("display", "none");
            $(element).siblings("span.search-template").css("display", "none");
        }
    } else {
        if (element == "#search-home-page" || element == "#search-tenant-users") {
            $(element).parent().siblings("span.close-icon").css("display", "none");
            $(element).parent().siblings("span.su-search").css("display", "block");
        }
        else {
            $(element).siblings("span.close-icon").css("display", "none");
            $(element).siblings("span.su-search").css("display", "block");
        }
    }
});

$(document).on("click", "#close-button,#close-info-dialog", function () {
    closeWarningToastDialog();
});

$(document).ready(function () {
    $("#application-logo").on("error", function () {
        $(this).attr("href", 'Url.Content("~/images/${GlobalAppSettings.Branding}/application/${IconFileNames.DefaultErrorSquareImage}")');
});
});



$(document).on("click", "#clear-search,.clear-search,#add-user-clear-search,#add-tenant-clear-search", function () {
    var currentElement = $(this).prevAll("input");
    if (currentElement == "" || currentElement == null || currentElement == undefined || currentElement.length <= 0) {
        currentElement = $(this).prev("div").find("input");
    }
    var currentId = "#" + currentElement.attr("id");
    currentElement.val("");

    if (!clearSearch) {
        $("#clear-search").css("display", "none");
        $("#add-user-clear-search").css("display", "none");
        $("#add-tenant-clear-search").css("display", "none");
    }

    if (currentElement.val() == "") {
        if (currentId == "#search-home-page" && !clearSearch) {
            $("#clear-search").parent().siblings("span.su-search").css("display", "block");
            $(".search-area").removeClass("add-background");
            $(".placeholder, #clear-search").hide();
            if ($(".all-items").hasClass("active") && !$("#category-list").is(":visible")) {
                setTimeout(function () { $(".search-area").prevAll().show().parent().removeClass("float-end"); $("#category-section-name").show(); }, 300);
            }
            else {
                setTimeout(function () { $(".search-area").prevAll(":not(#back-icon)").show().parent().removeClass("float-end"); $("#category-section-name").show(); }, 300);
            }
            setTimeout(function () { $(".search-home-section:visible").removeClass("d-block"); }, 300);
        }
        else {
            $("#clear-search").siblings("span.su-search").css("display", "block");
            $("#add-user-clear-search").siblings("span.su-search").css("display", "block");
            $("#add-tenant-clear-search").siblings("span.su-search").css("display", "block");
        }

        if (currentId == "#ad-user-import" || currentId == "#ad-group-import" || currentId == "#search-database-users") {
            var gridObj = $("#Grid").data("ejGrid");
            gridObj.option("dataSource", "");
            if (currentId == "#search-database-users") {
                var e = jQuery.Event("keypress", { keyCode: 13 });
                $("#search-database-users").trigger(e);
            }
        } else {
            PerformSearch(currentId);
        }

        if (currentId == "#search-ad-users" || currentId == "#search-ad-groups") {
            if (currentId == "#search-ad-groups") {
                var gridObj = $("#Grid").data("ejGrid");
                $("#checkbox-header").prop("checked", false);
                $(".checkbox-row").prop("checked", false);
                gridObj.clearSelection();
            } else {
                var gridObj = document.getElementById('user_grid').ej2_instances[0];
                $("#checkbox-header").prop("checked", false);
                $(".checkbox-row").prop("checked", false);
                gridObj.clearSelection();
            }
        }
    }
    else {
        currentElement.val("");
    }
});

$(document).on("keydown", "#search-users, #search-tenants, #search-tenants-allsites, #search-tenants-favorite, #search-app-users, #add-user-search,#search-tenant-users,#add-tenant-search,#search-event,#search-template, #search-languages", function (e) {
    $.xhrPool.abortAll();
    var currentKeyCode = parseInt(e.which);
    var element = "#" + this.id;
    if (timeOut != null) {
        clearTimeout(timeOut);
        timeOut = null;
    }
    if (currentKeyCode === keyCode.Enter) {
        PerformSearch(element);
    }
    else if (excludedSearchKeys.indexOf(currentKeyCode) === -1) {
        timeOut = setTimeout(function () {
            PerformSearch(element);
        }, 900);
    }
});

$(document).on('click', ".close-user-warning-icons", function (e) {
    $("#content-area").removeClass("user-warning-space");
    $(".user-warning").css("display", "none");
});

function PerformSearch(currentId) {
    var gridObj;
    if (currentId == "#search-users") {
        gridObj = document.getElementById('user_grid').ej2_instances[0];
        gridObj.pageSettings.currentPage = 1;
        gridObj.refresh();
    }
    else if (currentId == "#search-tenants") {
        gridObj = document.getElementById('tenants_grid').ej2_instances[0];
        gridObj.pageSettings.currentPage = 1;
        gridObj.refresh();
    }
    else if (currentId == "#search-tenants-allsites") {
        gridObj = document.getElementById('AllSitesGrid').ej2_instances[0];
        gridObj.pageSettings.currentPage = 1;
        gridObj.refresh();
    }
    else if (currentId == "#search-tenants-favorite") {
        gridObj = document.getElementById('FavoriteGrid').ej2_instances[0];
        gridObj.pageSettings.currentPage = 1;
        gridObj.refresh();
    }
    else if (currentId === "#search-app-users") {
        gridObj = document.getElementById('users_grid').ej2_instances[0];
        gridObj.pageSettings.currentPage = 1;
        gridObj.refresh();
    }
    else if (currentId === "#add-user-search") {
        gridObj = document.getElementById('add_users_grid').ej2_instances[0];
        gridObj.pageSettings.currentPage = 1;
        gridObj.refresh();
    }
    else if (currentId === "#add-tenant-search") {
        gridObj = document.getElementById('add_tenants_grid').ej2_instances[0];
        gridObj.pageSettings.currentPage = 1;
        gridObj.refresh();
    }
    else if (currentId == "#search-tenant-users") {
        gridObj = document.getElementById('add_admins_grid').ej2_instances[0];
        gridObj.refresh();
    }
    else if (currentId == "#search-event") {
        gridObj = document.getElementById('emailActivityLogGrid').ej2_instances[0];
        gridObj.refresh();
    }
    else if (currentId == "#search-template") {
        gridObj = document.getElementById('specificEmailTemplateListGrid').ej2_instances[0];
        gridObj.refresh();
    }
    else if (currentId == "#search-languages") {
        gridObj = document.getElementById('Localization_grid').ej2_instances[0];
        gridObj.refresh();
    }
}

function fnBeforeDownloadDialogsOpen() {
    document.getElementById('download-logs-dialog').style.visibility = 'visible';
}

function imageOnLoad() {
    $(this).show();
    if ($(this).attr("id") === "footerlogo") {
        $(this).parent().parent().find("div.lazyload").remove();
    }
    $(this).parent().find("div.lazyload").remove();
}

function isEmptyOrWhitespace(value) {
    if ($.trim(value) == "")
        return true;
    else
        return false;
}

function convertToBoolean(value) {
    if (typeof (value) === "string") {
        value = value.toLowerCase();
    }
    switch (value) {
        case true:
        case "true":
        case 1:
        case "1":
        case "on":
        case "yes":
            return true;
        default:
            return false;
    }
}

function parseURL(str) {
    var o = parseURL.options,
        m = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
        uri = {},
        i = 14;

    while (i--) uri[o.key[i]] = m[i] || "";

    uri[o.q.name] = {};
    uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
        if ($1) uri[o.q.name][$1] = $2;
    });

    return uri;
};

parseURL.options = {
    strictMode: true,
    key: ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"],
    q: {
        name: "queryKey",
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
    },
    parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
    }
};
//Handles Ajax error
function handleAjaxError() {
}

function refreshScroller() {
    var expandCollapseIconHeight = $(".collapseIcon").css("display") == "block" ? $(".collapseIcon").height() : 0;
    if ($(window).height() - ($("#CatergoryHeading").outerHeight() + $("#base_menu_container_Div").outerHeight() + $("#listing").outerHeight() + expandCollapseIconHeight) < 0) {
        var scrollerHeight = $(window).height() - ($("#CatergoryHeading").outerHeight() + $("#base_menu_container_Div").outerHeight() + expandCollapseIconHeight);
        var scrollerWidth = $("#CatergoryHeading").outerWidth();
        $("#ScrollElement").ejScroller({
            height: window.innerWidth < 1041 ? (scrollerHeight < 200 ? 200 : scrollerHeight) : scrollerHeight,
            width: scrollerWidth,
            buttonSize: 0,
            scrollerSize: 9
        });
    }
    else {
        if ($("#ScrollElement").data("ejScroller") != undefined) {
            $("#ScrollElement").data("ejScroller").destroy();
        }
    }
}

function refreshScrollerForCategory() {
    var scrollContentHeight = 0;
    for (var i = 0; i < $("#scroll-content #listing>li").length; i++) {
        scrollContentHeight += $($("#scroll-content #listing>li")[i]).outerHeight();
    }
    if ($(window).height() - ($(".item-navigation").outerHeight() + $("#header-area").outerHeight() + $("#category-listing").outerHeight() + scrollContentHeight + $("#create-new-category").outerHeight()) < 0) {
        var scrollerHeight = $(window).height() - ($(".item-navigation").outerHeight() + $("#header-area").outerHeight() + $("#category-listing").outerHeight() + $("#create-new-category").outerHeight());
        var scrollerWidth = $(".item-navigation").outerWidth();

        if ($(".all-items").hasClass("active") && $("#category-list").is(":visible")) {
            $("#scroll-content").ejScroller({
                height: scrollerHeight,
                buttonSize: 0,
                scrollerSize: 9,
                autoHide: true
            });
        }
    }
    else {
        if ($("#scroll-content").data("ejScroller") != undefined) {
            $("#scroll-content").data("ejScroller").destroy();
        }
    }
}

function addPlacehoder(object) {
    if (regexIe8.test(userAgent)) {
        $(object).find("input[type=text],input[type=password],textarea").each(function () {
            if ($(this).val() === "") {
                $($("<div>", { "class": "placeholder", text: $(this).attr("placeholder") })).insertAfter(this).show();
            }
            else {
                $($("<div>", { "class": "placeholder", text: $(this).attr("placeholder") })).insertAfter(this).hide();
            }
        });
    }
}

function doAjaxPost(type, url, data, onSuccess, onError, onComplete, element, processData, contentType, passDataToCallbackFn) {
    if (element) {
        if (element.is(":input:button") || element.is("button"))
            element.prop({ "disabled": true });
        else {
            showWaitingPopup(element);
        }
    }
    if (processData === undefined || processData === null) processData = true;
    if (contentType === undefined || contentType === null) contentType = "application/x-www-form-urlencoded; charset=UTF-8";
    $.ajax({
        type: type,
        url: url,
        context: this,
        processData: processData,
        contentType: contentType,
        data: data,
        success: (passDataToCallbackFn === true) ? $.proxy(getFnObj(onSuccess), window, data) : $.proxy(getFnObj(onSuccess), window),
        error: $.proxy(function (error, status, errorThrown) {
            if (error.statusText != "abort") {
            }
            if (onError)
                getFnObj(onError).call(window, error, status, errorThrown);
        }, this),
        complete: $.proxy(function (e) {
            try {
                var response = JSON.parse(e.responseText);
                if (response.data != undefined && response.data != null
                    && response.data.Message != undefined && response.data.Message != null
                    && response.data.Message.toLowerCase() == "unauthorized") {
                    window.location.replace(window.location.href);
                }
            } catch (exception) {
            }

            if (element) {
                if (element.is(":input:button") || element.is("button"))
                    element.prop({ "disabled": false });
                else
                    hideWaitingPopup(element);
            }
            if (onComplete)
                getFnObj(onComplete).call(window, e);
        }, this)
    });
};

function extractXSRFTokenFromCookie() {
    var xsrfToken = document.cookie.split("; ").find(row => row.startsWith("BOLD-UMS-XSRF-TOKEN="));
    if (xsrfToken) {
        return xsrfToken.split("=")[1];
    }
    return null;
}
function addHeaders(args) {
    args.currentRequest.setRequestHeader('CSRF-TOKEN', extractXSRFTokenFromCookie());
}
function getFnObj(obj) {
    if (typeof obj === "function") return obj;
    if (typeof obj === "string" && window[obj])
        return obj;
};

function createWaitingPopup(element) {
    ejs.popups.createSpinner({
        target: document.getElementById(element)
    });
}

function showWaitingPopup(element) {
    ejs.popups.showSpinner(document.getElementById(element));
    $("#" + element).find(".e-spinner-pane").addClass("e-spinner-bg");
};

function hideWaitingPopup(element) {
    ejs.popups.hideSpinner(document.getElementById(element));
    $("#" + element).find(".e-spinner-pane").removeClass("e-spinner-bg");
};

function redirect(url, interval) {
    if (interval)
        setTimeout(function () { window.location.assign(url) }, interval);
    else
        window.location.assign(url);
};

function CheckMonthFormat(value, format) {
    return value.includes(format);
}

function DateCustomFormat(formatString, dateValue, isTimeFormat) {
    var yyyy, yy, MMMM, MMM, MM, M, dddd, ddd, dd, d, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th, HH;
    var dateObject = new Date(dateValue);
    var datetime = formatString;
    //var dateObject = MilltoDate.toString();
    yy = ((yyyy = dateObject.getFullYear()) + "").slice(-2);
    MM = (M = dateObject.getMonth() + 1) < 10 ? ("0" + M) : M;
    MMM = (MMMM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][M - 1]).substring(0, 3);
    dd = (d = dateObject.getDate()) < 10 ? ("0" + d) : d;
    ddd = (dddd = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dateObject.getDay()]).substring(0, 3);
    th = (d >= 10 && d <= 20) ? "th" : ((dMod = d % 10) == 1) ? "st" : (dMod == 2) ? "nd" : (dMod == 3) ? "rd" : "th";
    formatString = formatString.replace("yyyy", yyyy).replace("yy", yy).replace("dddd", dddd).replace("ddd", ddd).replace("dd", dd).replace("d", d).replace("th", th);
    switch (true) {
        case CheckMonthFormat(formatString, "MMMM"):
            formatString = formatString.replace("MMMM", MMMM);
            break;
        case CheckMonthFormat(formatString, "MMM"):
            formatString = formatString.replace("MMM", MMM);
            break;
        case CheckMonthFormat(formatString, "MM"):
            formatString = formatString.replace("MM", MM);
            break;
        case CheckMonthFormat(formatString, "M "):
            formatString = formatString.replace("M ", M + " ");
            break;
        case CheckMonthFormat(formatString, "M,"):
            formatString = formatString.replace("M,", M + ",");
            break;
        case CheckMonthFormat(formatString, "M"):
            formatString = formatString.replace("M", M);
            break;
    }
    if (isTimeFormat == "True") {
        h = (hhh = dateObject.getHours());
        HH = h < 10 ? ("0" + h) : h;
        var lastPage = difference % pageSize === 0 ? difference / pageSize : Math.floor((difference / pageSize) + 1);
        if (currentPage > lastPage) {
            return lastPage;
        } else {
            return currentPage;
        }
    }

    else {
        h = (hhh = dateObject.getHours());
        if (h == 0) h = 24;
        if (h > 12) h -= 12;
        hh = h < 10 ? ("0" + h) : h;
        AMPM = (ampm = hhh < 12 ? "am" : "pm").toUpperCase();
        mm = (m = dateObject.getMinutes()) < 10 ? ("0" + m) : m;
        ss = (s = dateObject.getSeconds()) < 10 ? ("0" + s) : s;
        datetime = formatString.replace("hhh", hhh).replace("hh", hh).replace("h", h).replace("mm", mm).replace("m", m).replace("ss", ss).replace("s", s).replace("ampm", ampm).replace("AMPM", AMPM);
    }
    return datetime;
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

function validateUserName(userName) {
    if (/\s/g.test(userName)) {
        return { isValid: false, message: window.Server.App.LocalizationContent.UserNameHasWhiteSpace };
    }
    if (/[^a-zA-Z0-9]/.test(userName)) {
        return { isValid: false, message: window.Server.App.LocalizationContent.UserNameSpecialCharacterValicator };
    }
    return { isValid: true, message: "valid" };
}

function isValidUrl(url) {
    var regexExpression = /^(?!(ftp|https?):\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-]+(\.[a-z]{2,6})?(:\d{1,5})?(!\/[a-zA-Z0-9-]+[a-zA-Z0-9-]*(\.[a-z]{2,8})?)*?$/gm;
    var ipAddressRegexExpression = /^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)(?:\:(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/;

    if (!regexExpression.test(url) && !url.match(ipAddressRegexExpression)) {
        return false;
    } else {
        return true;
    }
}

function getMaxZIndex() {
    var maxZIndex = 0;
    $("div").each(function () {
        var currentZIndex = parseInt($(this).css("zIndex"), 10);
        if (currentZIndex > maxZIndex) {
            maxZIndex = currentZIndex;
        }
    });
    return maxZIndex;
}

function IsEmail(email) {
    var filter = /^([\wÀ-ÖØ-öø-ÿŒœŸÿ€ß.-]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\wÀ-ÖØ-öø-ÿŒœŸÿ€ß-]+\.)+))([a-zA-Z]{2,63}|[0-9]{1,3})(\]?)$/u;
    if (filter.test(email)) {
        return true;
    }
    else {
        return false;
    }
}

function UsernameValidation(username) {
    var filter = /^(?:(?!\.{2}|_{2}|-{2})[\p{L}\p{N}0-9_À-ÖØ-öø-ÿŒœŸÿ€ß'.`-]+@[\p{L}\p{N}\-]+(\.[\p{L}\-]+)*|[\p{L}\p{N}0-9_À-ÖØ-öø-ÿŒœŸÿ€ß'.`-]+)$/u;
    if (filter.test(username)) {
        return true;
    }
    else {
        return false;
    }
}

function IsValidUsername(username) {
    return UsernameValidation(username) || IsEmail(username);
}

function IsValidUsernameLength(username) {
    var filter = /^.{2,254}$/;
    if (filter.test(username)) {
        return true;
    }
    else {
        return false;
    }
}

$(document).on("click", "#license-warning-icon", function () {
    var messageContent = window.Server.App.LocalizationContent.LicenseWarningContent1
        + "<div class='license-warning-content'>"
        + window.Server.App.LocalizationContent.LicenseWarningContent2 + window.Server.App.LocalizationContent.LicenseWarningContent3.toLowerCase() + "<a class='text-decoration-none' href='" + idpUrl + "/ums/administration/license-settings'>" + window.Server.App.LocalizationContent.LicenseWarningContent4 + "</a>" + window.Server.App.LocalizationContent.LicenseWarningContent5
        + "</div>";
    messageBox("", window.Server.App.LocalizationContent.LicenseWarningHeader, messageContent, "success", function () {
        onCloseMessageBox();
    });
});

function IsValidContactNumber(contactNumber) {
    var regex = /^(?:|[0-9\-\+]{9,15})$/;
    if (regex.test(contactNumber)) {
        return true;
    }
    else {
        return false;
    }
}

function onCloseMessageBox() {
    $("#messageBox").find(".e-footer-content").html("");
    document.getElementById("messageBox").ej2_instances[0].hide();
}

function onMessageDialogClose() {
    $("#messageBox").find(".message-content").text("");
    $(".message-box-btn-holder").html("");
    $(".message-box-close").html("");
}

function messageBox(messageIcon, messageHeader, messageText, type, successCallback, errorCallback, width, height, maxHeight, cssClass) {
    $("#messageBox").find(".message-content").text("");
    $("#messageBox").find(".e-footer-content").html("");
    $(".message-box-close").html("");
    $("#messageBox").find(".e-dlg-header").html("<span class='su " + messageIcon + "'></span> <span class='modal-title' data-bs-toggle='tooltip' data-bs-placement='bottom' data-bs-container='body' title='" + messageHeader + "'  >" + messageHeader + "</h2>");
    $("#messageBox").find(".message-content").html(messageText);
    $("#messageBox").find(".message-content").removeClass("text-start");
    if (type == "error") {
        var successButton;
        var closeIcon;
        var errorButton;
        if (successCallback != undefined) {
            successButton = $("<input type='button' class='critical-action-button float-end' value='" + window.Server.App.LocalizationContent.YesButton + "'></input>");
            successButton.bind("click", $.proxy(getFnObj(successCallback), window));
        }
        if (errorCallback != undefined) {
            errorButton = $("<input type='button' class='secondary-button float-end' value='" + window.Server.App.LocalizationContent.NoButton + "'></input>");
            errorButton.bind("click", $.proxy(getFnObj(errorCallback), window));
            closeIcon = $('<span class="su su-close"></span>');
            closeIcon.bind("click", $.proxy(getFnObj(errorCallback), window));
        }
        else {
            errorButton = $("<input type='button' class='secondary-button float-end' value='" + window.Server.App.LocalizationContent.NoButton + "'></input>");
            closeIcon = $('<span class="su su-close"></span>');
            errorButton.click(function () {
                onCloseMessageBox();
            });
            closeIcon.click(function () {
                onCloseMessageBox();
            });
        }
        $(".message-box-close").html(closeIcon);
        $("#messageBox").find(".e-footer-content").append(errorButton, successButton);
        $("#messageBox").unbind("keydown");
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
        $(".message-box-close").html(closeIcon);
        $("#messageBox .e-footer-content").append(successButton);
        $("#messageBox").on("keydown", function (event) {
            switch (event.keyCode) {
                case 13:
                case 27:
                    successButton.click();
            }
        });
    }

    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    document.getElementById("messageBox").ej2_instances[0].show();
    $("#messageBox").focus();
    var sizeobj = document.getElementById("messageBox").ej2_instances[0];
    setTimeout(function () {
        if (width != undefined)
            sizeobj.width = width;
        sizeobj.height = height;
        if (maxHeight != undefined)
            sizeobj.setMaxHeight(maxHeight);
    }, 50);
    if (cssClass != null && cssClass != undefined) {
        sizeobj.cssClass = cssClass;
    }
}

//function deleteUserAvatar() {
//    ShowWaitingProgress("#user-profile-master", "show");
//    doAjaxPost('POST', deleteavatarUrl, { userName: $("#user-name").val() },
//        function (result) {
//            ShowWaitingProgress("#user-profile-master", "hide");
//            if (result.status) {
//                messageBox("su-delete", window.Server.App.LocalizationContent.DeleteAvatar, window.Server.App.LocalizationContent.DeleteAvatarSuccess, "success", function () {
//                    var isLoggedUser = $("#logged-user").html().toLowerCase();
//                    $("#user-profile-picture").attr("src", getdefaultavatarUrl);
//                    $("#user-profile-picture").siblings("#avatar-delete-click").remove();
//                    if ($("#user-name").val() == isLoggedUser) {
//                        $(".profile-picture,#profile-picture-menu").find("img").attr("src", getdefaultavatarUrl);
//                    }
//                    onCloseMessageBox();
//                });
//            }
//            else {
//                messageBox("su-delete", window.Server.App.LocalizationContent.DeleteAvatarTitle, window.Server.App.LocalizationContent.DeleteAvatarError, "success", function () {
//                    onCloseMessageBox();
//                });
//            }
//        }
//    );
//}

function IsValidName(validationType, inputString) {
    var regex;
    if (validationType.toLowerCase() === "username") {
        regex = new RegExp(/[*\[\\\]\|\/\:\<\>\%\+\#\&\?\"\@\;\,]/);
    }
    else {
        regex = new RegExp(/[*\[\\\]\|\/\:\<\>\%\+\#\?\"\;\,]/);
    }
    return !regex.test(inputString);
}

//function GridLocalization() {
//    ej.Grid.Locale["en-US"] = {
//        EmptyRecord: window.Server.App.LocalizationContent.NoRecords,
//        StringMenuOptions: [{ text: window.Server.App.LocalizationContent.SearchKeyStart, value: "StartsWith" }, { text: window.Server.App.LocalizationContent.SearchKeyEnd, value: "EndsWith" }, { text: window.Server.App.LocalizationContent.SearchKeyContanins, value: "Contains" }, { text: window.Server.App.LocalizationContent.SearchKeyEqual, value: "Equal" }, { text: window.Server.App.LocalizationContent.SearchKeyNotEqual, value: "NotEqual" }],
//        FilterMenuCaption: window.Server.App.LocalizationContent.SearchValue,
//        Filter: window.Server.App.LocalizationContent.Search,
//        Clear: window.Server.App.LocalizationContent.ClearSearch
//    };
//    ej.Pager.Locale["en-US"] = {
//        pagerInfo: window.Server.App.LocalizationContent.PageCount,
//        firstPageTooltip: window.Server.App.LocalizationContent.FirstPage,
//        lastPageTooltip: window.Server.App.LocalizationContent.LastPage,
//        nextPageTooltip: window.Server.App.LocalizationContent.NextPage,
//        previousPageTooltip: window.Server.App.LocalizationContent.PreviousPage
//    };
//}

function SuccessAlert(header, content, duration) {
    clearTimeout(toastTimeout);
    window.top.$('#warning-alert').css("display", "none");
    window.top.$('#success-alert').css("display", "none");
    window.top.$("#message-header").html(header);
    window.top.$("#message-content").html(content);
    window.top.$("#success-alert").css("display", "table");

    toastTimeout = setTimeout(function () {
        window.top.$('#success-alert').fadeOut();
    }, duration);

    $(document).on("click", ".close-div", function () {
        window.top.$('#success-alert').fadeOut();
    });
}

function WarningAlert(header, content, error, duration) {
    clearTimeout(toastTimeout);
    parent.$('#success-alert').css("display", "none");
    parent.$('#warning-alert').css("display", "none");
    parent.$("#warning-alert #message-header").html(header);
    parent.$(" #warning-alert #message-content").html(content);
    $("#container #text-error-area").val(error);
    parent.$("#warning-alert").css("display", "table");

    if (error != null && error != "") {
        $("#view").show();
    }

    if (duration != null && duration != "") {
        toastTimeout = setTimeout(function () {
            parent.$('#warning-alert').fadeOut();
        }, duration);
    }

    $(document).on("click", ".close-div", function () {
        parent.$('#warning-alert').fadeOut();
    });
}

function MobileAlert(message, duration) {
    parent.$("#mobile-alert").fadeIn();
    parent.$("#mobile-alert #message").html(message);
    if (duration != null && duration != "") {
        setTimeout(function () {
            parent.$('#mobile-alert').fadeOut(1000)
        }, duration);
    }
}

window.onpopstate = function (e) {
    var queryString = window.location.search;
    var url = window.location.pathname;
    var pathArray = url.split('/');
    e.preventDefault();

    var section = getQueryVariable("view");
    var categoryName = getQueryVariable("category");
    var dashboardName = getQueryVariable("dashboard");
    var tabName = getQueryVariable("tab");

    if (section != null && categoryName != null && dashboardName != null) {
        var previousUrl = $("#current-url").attr("data-url");
        var previousCategoryName = getUrlQueryVariable(previousUrl, "category");
        var previousDashboardName = getUrlQueryVariable(previousUrl, "dashboard");
        if (decodeURI(dashboardName) !== decodeURI(previousDashboardName) || decodeURI(categoryName) !== decodeURI(previousCategoryName)) {
            DashboardRender(url, categoryName, dashboardName, section, tabName);
        } else {
            $("#current-url").attr("data-url", decodeURI(url) + "?category=" + decodeURI(categoryName) + "&dashboard=" + decodeURI(dashboardName) + "&view=" + decodeURI(section));
        }
    }
    else if (section != null && categoryName == null && dashboardName == null) {
        if ($(".item-navigation li[data-value='" + section + "']").hasClass("active") == false) {
            $(".item-navigation li").removeClass("active");
            $(".item-navigation li[data-value='" + section + "']").addClass("active");
        }
        $(".item-navigation li[data-value='" + section + "']").trigger("click");
        var iFrame = document.getElementById("dashboard_render_iframe");
        iFrame.contentWindow.location.href = "about:blank";
        $("#item-viewer #iframe-content").css("display", "block");
    }
    else if (queryString == "" && categoryName == null && section == null && pathArray.length < 5) {
        if ($(".item-navigation li[data-value='categories']").hasClass("active") == false) {
            $(".item-navigation li").removeClass("active");
            $(".item-navigation li[data-value='categories']").addClass("active");
        }
        $(".item-navigation li[data-value='categories']").trigger("click");
        var category = decodeURI(pathArray[pathArray.length - 1]);
        $(".category-link[data-category='" + category + "']").trigger("click");
    }
    if (e.state !== null && (JSON.stringify(e.state) !== JSON.stringify({}) || tabName !== null)) {
        document.getElementById('dashboard_render_iframe').contentWindow.postMessage('filter', "*");
    }
};

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return null;
}
function getUrlQueryVariable(url, variable) {
    var query = url.substring(url.indexOf('?') + 1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return null;
}

function SetHttpOnlyCookie(cookieName, cookieValue, expires, isCookiePathRequired) {
    $.ajax({
        type: "POST",
        url: setCookieHttpOnlyUrl,
        data: { cookieName: cookieName, cookieValue: cookieValue, expires: expires, isCookiePathRequired: isCookiePathRequired }
    });
}

function profileDisplayNameSelection() {
    $(".profile-pic-tag").each(function () {
        var id = $(this).attr("data-id");
        var imageSize = $(this).attr("data-image-size");
        var displayName = $(this).attr("data-display-name");
        var type = $(this).attr("data-type");
        $(this).html("");
        var colors = ["#b7fbff", "#a9eec2", "#ffe0a3", "#ffa1ac", "#8ed6ff", "#bf9fee", "#ffa0d2", "#32dbc6", "#d2c8c8", "#e3e7f1"];
        if (type == "user") {
            var stringArray = id.match(/(\d+)/g);
            var i = 0;
            for (i = 0; i < stringArray.length; i++) {
                var number = stringArray[0][0];
            }
            $(this).css("background-color", colors[number]);
            var imageUrl = idpUrl + "/User/Avatar?id=" + id;
            var image = $('<img id="default-profile-image">');
            image.attr("src", imageUrl);
            image.attr("width", imageSize);
            image.attr("height", imageSize);
            image.appendTo($(this));
        }
        else {
            var userIdLastNumber = id % 10;
            $(this).css("background-color", colors[userIdLastNumber]);
        }
        $(this).css("width", imageSize);
        $(this).css("height", imageSize);
        $(this).css("line-height", imageSize + "px");
        var nameLetters = displayName.trim().toUpperCase().split(/ /);
        var firstCharacter = $('<span id="first-letter">');
        if (nameLetters[1] == null) {
            firstCharacter.text(nameLetters[0][0]);
        } else {
            firstCharacter.text(nameLetters[0][0] + nameLetters[1][0]);
        }
        firstCharacter.appendTo($(this));
    });
}

function getCurrentPageNumber(pageSize, selectedRecordsCount, totalRecordsCount, currentPage) {
    var difference = totalRecordsCount - selectedRecordsCount;
    if (difference > pageSize) {
        var lastPage = difference % pageSize == 0 ? difference / pageSize : Math.floor((difference / pageSize) + 1);
        if (currentPage > lastPage) {
            return lastPage;
        } else {
            return currentPage;
        }
    }
    else {
        return 1;
    }
}

function copyToClipboard(inputId, buttonId) {
    if (typeof (navigator.clipboard) != 'undefined') {
        var value = "";
        if (inputId === "#subscription-id-bi" || inputId == "#subscription-id-reports") {
            value = $(inputId).text();
        }
        else {
            value = $(inputId).val();
        }
        var copyText = $(inputId);
        copyText.attr("type", "text").select();
        navigator.clipboard.writeText(value)
        if (buttonId == "#api-copy-client-secret" || buttonId == "#copy-client-secret") {
            copyText.attr("type", "password");
        }

        if (inputId === "#copy-recovery") {
            $("#copy-recovery").css("display", "none");
        }
    }
    else {
        var copyText = $(inputId);
        copyText.attr("type", "text").select();
        document.execCommand("copy");
        if (buttonId == "#api-copy-client-secret" || buttonId == "#copy-client-secret") {
            copyText.attr("type", "password");
        }

        if (inputId === "#copy-recovery") {
            $("#copy-recovery").css("display", "none");
        }
    }
    setTimeout(function () {
        $(buttonId).attr("data-bs-original-title", window.Server.App.LocalizationContent.Copied);
        $(buttonId).tooltip('show');
    }, 200);
    setTimeout(function () {
        $(buttonId).attr("data-bs-original-title", window.Server.App.LocalizationContent.ClickToCopy);
        $(buttonId).tooltip();
    }, 3000);
}


function bindEj2Data(id, value) {
    document.getElementById(id).ej2_instances[0].value = value;
    document.getElementById(id).ej2_instances[0].dataBind();
}

function isValidOrigin(origin) {
    var regexExpression = new RegExp(/^https?:\/\/(?:w{1,3}\.)?[^\s.]+(?:\.[a-z]+)*(?::\d+)?(?![^<]*(?:<\/\w+>|\/?>))/);
    return regexExpression.test(origin);
}

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function ValidateIsolationCode(code, id) {
    var isValid = false;

    $.ajax({
        type: "POST",
        url: validateIsolationCodeUrl,
        data: { code: code },
        success: function (result) {
            isValid = result.Status;
            if (result.Status) {
                $("#isolation-code-validation").html("");
                $(id).closest('div').removeClass("e-error");
                $("#update-isolation-code").attr("disabled", false);
                $("#details-next").removeAttr("disabled");
            } else {
                $("#isolation-code-validation").html(window.Server.App.LocalizationContent.IsolationCodeValidator);
                $(id).closest('div').addClass("e-error");
                $("#update-isolation-code").attr("disabled", true);
                $("#details-next").attr("disabled", true);
            }
        }
    });

    return isValid;
}

$("#container, #view").hide();
$(document).on("click", ".view-more", function () {
    $("#container").show();
    $("#warning-alert").css('height', '200px')
    $("#view").addClass("view-less");
    $("#view").removeClass("view-more");
    $("#view").html(window.Server.App.LocalizationContent.ViewLess);
    clearTimeout(toastTimeout);
});
$(document).on("click", ".view-less", function () {
    $("#container").hide();
    $("#warning-alert").css('height', '84px')
    $("#view").addClass("view-more");
    $("#view").removeClass("view-less");
    $("#view").html(window.Server.App.LocalizationContent.ViewMore);
});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});
$(document).on("click", "#copy-error-area", function (e) {
    $("#text-error-area").select();
    document.execCommand('copy');
    $("#copy-error-area").attr("data-bs-original-title", window.Server.App.LocalizationContent.Copied);
    var oldTooltip = bootstrap.Tooltip.getInstance($("#copy-error-area"));
    oldTooltip.dispose();
    var tooltip = new bootstrap.Tooltip($("#copy-error-area"));
    setTimeout(function () {
        $("#copy-error-area").attr("data-bs-original-title", window.Server.App.LocalizationContent.LinkCopy);
        tooltip.dispose();
        var newTooltip = new bootstrap.Tooltip($("#copy-error-area"));
    }, 3000);
});

$('body').on('click', 'a', function () {
    if (enableSameTabLinkTarget && $(this).attr('href') !== undefined && !($(this).attr("href").includes("redirect.boldbi.com"))) {
        $(this).attr("target", "_self");
    }
});

