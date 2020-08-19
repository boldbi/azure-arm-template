var userAgent = navigator.userAgent;
var regexIe8 = new RegExp("Trident(\/4.0)|(Trident\/5.0)");
var timeOut;
var searchId;
var isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
var clearSearch = false;

$(document).ready(function (e) {
    $("body, .login-main, #server-app-container").removeAttr("style");
    $("#layout-body-loader-icon").css("display", "none");
    $(document).on('click', ".close-warning-icons", function (e) {
        $("#content-area").removeClass("suspension-warning-space");
        $(".suspension-warning").css("display", "none");
        $("#homepage-header").removeClass("header-warning");
    });
    $(document).on('click', ".close-user-warning-icons", function (e) {
        $("#content-area").removeClass("user-warning-space");
        $(".user-warning").css("display", "none");
        $("#homepage-header").removeClass("header-warning");
    });
    $("form").attr("autocomplete", "off");
    $("input[type=text], input[type=password]").attr("autocomplete", "off");    
    $('[data-toggle="tooltip"]').tooltip();
    $('.help-option [second-toggle="tooltip"]').tooltip("destroy");
    $('.help-option [second-toggle="tooltip"]').tooltip({
        animation: true,
        delay: { show: 500, hide: 100 }
    });
    $('#app-navigation [data-toggle="tooltip"]').tooltip("destroy");
    $('#app-navigation [data-toggle="tooltip"]').tooltip({
        animation: true,
        delay: { show: 500, hide: 100 }
    });

    $(".dropdown-menu #notify_header").click(function (e) {
        e.stopPropagation();
    });
    $(document).on('click', '#notification-content-area.dropdown-menu', function (e) {
        e.stopPropagation();
    });
    $("#notification-icon").click(function () {
        if (!$("#notification-link").hasClass("open")) {

            var scope = angular.element($("#notification-content")).scope();
            scope.$apply(function () {
                scope.notifications = [];
                scope.isFinal = true;
                scope.skip = 0;
            });   

            var notificationWaitingPopupTemplateId = createLoader("notification-content-area");
            $("#notification-content-area").ejWaitingPopup({ template: $("#" + notificationWaitingPopupTemplateId) });
            $("#notification-content-area").addClass("show");
            $("#notification-content-area").ejWaitingPopup("show");
            $("#notification-content-area").removeClass("show");
            getNotificationList();
            $("#notification-indicator").remove();
        }
    });

    $(function () {
        $(document).click(function (e) {
            if ($("#menu-area").hasClass("in")) {
                $('#menu-area').collapse('hide');	 
            }
        });
    });

    $(document).on('touchend', function (e) {
        if ($("#menu-area").hasClass("in")) {
            $('#menu-area').collapse('hide');
        }
    });

    function getNotificationList() {
        $.ajax({
            type: "GET",
            url: getUserNotificationsPartialViewResultUrl,
            success: function (result) {
                if (result !== null) {
                    var scope = angular.element($("#notification-content")).scope();
                    bindNotificationContent(result.Data);
                }
            }
        });
    }

    function bindNotificationContent(data) {
        var scope = angular.element($("#notification-content")).scope();
        parent.$("#notification-content-area").ejWaitingPopup("show");
        scope.$apply(function () {
            var skip = scope.skip;
            for (var i = 0; i < data.LogList.length; i++) {
                scope.notifications.push(data.LogList[i]);
            }
            if (data.LogList.length > 0) {
                parent.$("#view-all-notification").removeClass("not-active");
            }
            else {
                parent.$("#view-all-notification").addClass("not-active");
            }
            scope.totalNotifications = data.LogCount;
            scope.skip = scope.skip + data.LogList.length;
            scope.isFinal = scope.skip == scope.totalNotifications;
            parent.$("#notification-content-area").ejWaitingPopup("hide");
            setTimeout(function () {
                var imagesgToBeLoadedLater = document.getElementsByTagName('img');
                for (var i = skip; i < imagesgToBeLoadedLater.length; i++) {
                    if (imagesgToBeLoadedLater[i].getAttribute('data-actual-image')) {
                        imagesgToBeLoadedLater[i].setAttribute('src', imagesgToBeLoadedLater[i].getAttribute('data-actual-image'));
                    }
                }
            }, 700);
        });
    }

    var notBackdrop =
      $('<div id="nav-backdrop" class="modal-backdrop" style="z-index: 50; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; color: #fff; opacity: 0; position: absolute"></div>');

    $("#upload-item-section, #notification-link, #account-profile").on('hidden.bs.dropdown', function () {
        parent.$("#nav-backdrop").hide();
    });

    $("#notification-link, #account-profile, #upload-item-section").click(function (e) {
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

    $(document).on("click", "#account-profile .profile-info", function (e) {
        e.stopPropagation();
    });

    notBackdrop.click(function () {
        notBackdrop.hide();
    });

    $(document).on("click", ".dropdown-backdrop", function () {
        parent.$("#nav-backdrop").hide();
    });

    searchId = $("#search-area").children("input").attr("id");
    if (searchId == "ad-user-import" || searchId == "AD-group-import" || searchId == "search-ad-users" || searchId == "search-ad-groups") {
        $.xhrPool = [];

        $.xhrPool.abortAll = function () {
            $(this).each(function (i, jqXHR) {
                jqXHR.abort();
            });
            $.xhrPool.length = 0;
        };

        $.ajaxSetup({
            beforeSend: function (jqXHR) {
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
                $.xhrPool.push(request);
            };
            $.ajaxSetup({
                complete: function (jqXHR) {
                    var i = $.xhrPool.indexOf(jqXHR);
                    if (i > -1) $.xhrPool.splice(i, 1);
                }
            });
        }
    }

    $('.lazyload').each(function () {
        if ($(this).attr("data-id") === "footerlogo") {
            img = document.createElement('img');
            img.onload = imageOnLoad;
            img.src = $(this).attr("data-src");
            img.alt = $(this).attr("data-alt");
            img.id = $(this).attr("data-id");
            $(img).attr("onerror", $(this).attr("data-default"));
            img.style = "display: none";
            $(this).parent().find("p#poweredbysyncfusion").append(img);
        }
        else if ($(this).attr("data-id") === "profilelogo" || $(this).attr("data-id") === "user-profile-picture") {
            img = document.createElement('img');
            img.onload = imageOnLoad;
            img.src = $(this).attr("data-src-value");
            img.alt = $(this).attr("data-alt");
            img.id = $(this).attr("data-id");
            $(img).attr("onerror", $(this).attr("data-default"));
            img.style = "display: none";
            $(this).parent().append(img);
        }
        else {
            img = document.createElement('img');
            img.onload = imageOnLoad;
            img.src = $(this).attr("data-src");
            img.alt = $(this).attr("data-alt");
            img.id = $(this).attr("data-id");
            $(img).attr("onerror", $(this).attr("data-default"));
            img.style = "display: none";
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
    });

    function imageOnLoad() {
        $(this).show();
        if ($(this).attr("id") === "footerlogo") {
            $(this).parent().parent().find("div.lazyload").remove();
        }
        $(this).parent().find("div.lazyload").remove();
    }

    window.isSiteLoaded = false;

    $('#dropdown-profile').on('show.bs.dropdown', function () {
        if (!window.isSiteLoaded) {
            $.ajax({
                type: "POST",
                url: window.userTenantsUrl,
                success: function (result) {
                    $('#user-sites .loader-sites-gif').remove();
                    var item = result.Sites;
                    var length = item.length > 2 ? 2 : item.length;
                    for (var i = 0; i < length; i++) {
                        $('#user-sites').append($("<a href='" + item[i].DNS + "/" + window.tenantIdentifierPrefix + "/" + item[i].TenantIdentifier + "' target='_blank'> <div class='site-logo-container'> <img src='" + item[i].DNS + "/" + window.tenantIdentifierPrefix + "/" + item[i].TenantIdentifier + "/get-client-logo?logotype=headerlogo' alt='boldbi-header' class='site-logo'/><span class='site-name'>" + item[i].TenantName + "</span></div></a>"));
                    }
                    if (item.length >= 3) {
                        $('#more-sites-id').append("<div class='pull-left more-sites'><a href='" + window.idpUrl + "' target='_blank'>more sites...</a></div>");
                    }
                    else {
                        $('#more-sites-id').remove();
                    }
                    window.isSiteLoaded = true;
                }
            });
        }
    });

    $(".hide-display").each(function () {
        $(this).removeClass("hide-display");
    });

    if (typeof showFeedbackDialog != "undefined" && showFeedbackDialog.toLowerCase() == "true") {
        $("#do-not-show-button").removeClass("display-none");
        $("#show-later-button").removeClass("display-none");
        $("#cancel-button").addClass("display-none");
        $("#close-general-feedback").attr("data-feedback-close", false)
        openFeedbackWindow();
    }

    function ejIsExist() {
        return typeof (ej) != "undefined" && typeof (ej.WaitingPopup) != "undefined";
    }

    if (ejIsExist()) {
        var bodyWaitingPopupTemplateId = createLoader("#body");
        $("#body").ejWaitingPopup({ template: $("#" + bodyWaitingPopupTemplateId) });
    }
});

$(document).on("keyup", "textarea", function (event) {
    if (event.keyCode != 8 && event.keyCode != 46) {
        var max = $(this).attr("maxlength");
        if (max != undefined && $(this).val().length >= max) {
            $(this).val($(this).val().substring(0, max));
        }
    }
});

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
            var scrollerObject = $("#scroll-content").data("ejScroller");
            if (scrollerObject != undefined && scrollerObject != null) {
                scrollerObject.refresh();
            }
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

$("textarea").keyup(function (event) {
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
        $(this).next(".placeholder").removeClass("show").addClass("hide");
    }
});

$(document).on("focusout", "input[type=text],input[type=password],textarea", function () {
    if (regexIe8.test(userAgent) && $(this).val() === "") {
        $(this).next(".placeholder").removeClass("hide").addClass("show");
    }
});
$(document).on("focus", ".placeholder", function () {
    $(this).prev("input").focus();
});

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
}

function ShowWaitingProgress(selector, show) {
    if (show == "show") {
        var selectorId = createLoader(selector);
        $(selector).ejWaitingPopup({ template: $("#" + selectorId) });
        $(selector).ejWaitingPopup("show");
    } else
        $(selector).ejWaitingPopup("hide");
}

function getFnObj(obj) {
    if (typeof obj === "function") return obj;
    if (typeof obj === "string" && window[obj])
        return obj;
}

function showWaitingPopup(element) {
    if (typeof element === "string")
        element = $((element.indexOf(".") === 0) ? element : "#" + element);
    var elementId = createLoader(element);
    element.ejWaitingPopup({ template: $("#" + elementId) });
    element.ejWaitingPopup("show");
}

function hideWaitingPopup(element) {
    if (typeof element === "string")
        element = $((element.indexOf(".") === 0) ? element : "#" + element);
    element.ejWaitingPopup("hide");
}

function redirect(url, interval) {
    if (interval)
        setTimeout(function () { window.location.assign(url); }, interval);
    else
        window.location.assign(url);
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
    formatString = formatString.replace("yyyy", yyyy).replace("yy", yy).replace("MMMM", MMMM).replace("MMM", MMM).replace("MM", MM).replace("M", M).replace("dddd", dddd).replace("ddd", ddd).replace("dd", dd).replace("d", d).replace("th", th);
    if (isTimeFormat == "True") {
        h = (hhh = dateObject.getHours());
        HH = h < 10 ? ("0" + h) : h;
        mm = (m = dateObject.getMinutes()) < 10 ? ("0" + m) : m;
        ss = (s = dateObject.getSeconds()) < 10 ? ("0" + s) : s;
        datetime = formatString.replace("HH", HH).replace("mm", mm).replace("ss", ss);
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
        return { isValid: false, message: window.Server.App.LocalizationContent.HasWhiteSpace };
    }
    if (/[^a-zA-Z0-9]/.test(userName)) {
        return { isValid: false, message: window.Server.App.LocalizationContent.UserNameSpecialCharacterValicator };
    }
    return { isValid: true, message: "valid" };
}

function isValidUrl(url) {
    var regexExpression = /^(?!(ftp|https?):\/\/)([a-zA-Z0-9-_]+\.)*[a-zA-Z0-9][a-zA-Z0-9-]+(\.[a-z]{2,6})?(:\d{1,5})?(\/[a-zA-Z0-9-]+[a-zA-Z0-9-]*(\.[a-z]{2,8})?)*?$/gm;
    if (!regexExpression.test(url)) {
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
    var filter = /^([\w-\.+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,63}|[0-9]{1,3})(\]?)$/;
    if (filter.test(email)) {
        return true;
    }
    else {
        return false;
    }
}

function IsValidContactNumber(contactNumber) {
    var regex = /^(?:|[0-9\-\+]{9,15})$/;
    if (regex.test(contactNumber)) {
        return true;
    }
    else {
        return false;
    }
}


function ValidateIsolationCode(filterQuery) {
    if (!ej.isNullOrUndefined(filterQuery) && filterQuery !== '') {
        var decryptfilterParam = decodeURI(filterQuery).
            replace(/~&~/g, String.fromCharCode(251) + String.fromCharCode(251)).
            replace(/~=~/g, String.fromCharCode(250) + String.fromCharCode(250)).
            replace(/~[?]~/g, String.fromCharCode(253) + String.fromCharCode(253)).
            replace(/~[/]~/g, String.fromCharCode(254) + String.fromCharCode(254)).
            replace(/&&/g, '&').
            replace(/&/g, '|,|').
            replace(/=/g, '|:|').
            replace(/~,~/g, String.fromCharCode(252) + String.fromCharCode(252));

        var splitFilterParamObj = decryptfilterParam.split('|,|');
        for (var index = 0; index < splitFilterParamObj.length; index++) {
            var splitFilterQuery = splitFilterParamObj[index].split('|:|');
            if (splitFilterQuery.length === 2) {
                return true;
            } else {
                return false;
            }
        }
    }
    return false;
}

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
    $(".message-box-btn-holder").html("");
    $(".message-box-close").html("");
    $("#messageBox").find(".message-header").html("<span class='su " + messageIcon + "'></span> <span class='modal-title' data-toggle='tooltip' data-placement='bottom' data-container='body' title='" + messageHeader + "'  >" + messageHeader + "</h2>");
    $("#messageBox").find(".message-content").html(messageText);
    $("#messageBox").find(".message-content").removeClass("text-left");
    if (type == "error") {
        var successButton;
        var closeIcon;
        var errorButton;
        if (successCallback != undefined) {
            successButton = $("<input type='button' class='app-button app-critical-action-button pull-right' value='" + window.Server.App.LocalizationContent.YesButton + "'></input>");
            successButton.bind("click", $.proxy(getFnObj(successCallback), window));
        }
        if (errorCallback != undefined) {
            errorButton = $("<input type='button' class='app-button app-secondary-button pull-right' tabindex='-1' value='" + window.Server.App.LocalizationContent.NoButton + "'></input>");
            errorButton.bind("click", $.proxy(getFnObj(errorCallback), window));
            closeIcon = $('<span class="su su-close"></span>');
            closeIcon.bind("click", $.proxy(getFnObj(errorCallback), window));
        }
        else {
            errorButton = $("<input type='button' class='app-button app-secondary-button pull-right' tabindex='-1' value='" + window.Server.App.LocalizationContent.NoButton + "'></input>");
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
            successButton = $("<input type='button' class='app-button app-secondary-button' tabindex='-1' value='" + window.Server.App.LocalizationContent.OKButton + "'></input>");
            successButton.bind("click", $.proxy(getFnObj(successCallback), window));
            closeIcon = $('<span class="su su-close"></span>');
            closeIcon.bind("click", $.proxy(getFnObj(successCallback), window));
        }
        else {
            successButton = $("<input type='button' class='app-button app-secondary-button' tabindex='-1' value='" + window.Server.App.LocalizationContent.OKButton + "'></input>");
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
    var sizeobj = window.parent.document ? parent.$("#messageBox").data("ejDialog") : $("#messageBox").data("ejDialog");
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
    setTimeout(function () {
        var messageBoxHeight = $(".message-header").innerHeight() + $(".message-content.text-center").innerHeight() + $(".message-box-btn-holder").innerHeight() + 5;
        $("#messageBox").height(messageBoxHeight + "px");
        $("#messageBox_wrapper .e-dialog-scroller.e-scroller.e-js.e-widget").height($("#messageBox").outerHeight(true) + "px");
    }, 100);
}

function deleteUserAvatar() {
    ShowWaitingProgress("#user-profile-master", "show");
    doAjaxPost('POST', deleteavatarUrl, { email: $("#user-email").val() },
                     function (result) {
                         ShowWaitingProgress("#user-profile-master", "hide");
                         if (result.status) {
                             messageBox("su-delete", window.Server.App.LocalizationContent.DeleteAvatar, window.Server.App.LocalizationContent.DeleteAvatarSuccess, "success", function () {
                                 var isLoggedUser = $("#logged-user").html().toLowerCase();
                                 $("#user-profile-picture").attr("src", getdefaultavatarUrl);
                                 $("#user-profile-picture").siblings("#avatar-delete-click").remove();
                                 if ($("#user-name").val() == isLoggedUser) {
                                     $(".profile-picture,#profile-picture-menu").find("img").attr("src", getdefaultavatarUrl);
                                 }
                                 onCloseMessageBox();
                             });
                         }
                         else {
                             messageBox("su-delete", window.Server.App.LocalizationContent.DeleteAvatarTitle, window.Server.App.LocalizationContent.DeleteAvatarError, "success", function () {
                                 onCloseMessageBox();
                             });
                         }
                     }
            );
}

function IsValidName(validationType, inputString) {
    var regex;
    if (validationType.toLowerCase() === "username") {
        regex = new RegExp(/[*\[\\\]\|\/\:\<\>\%\+\#\&\?\'\"\@\;\,]/);
    }
    else {
        regex = new RegExp(/[*\[\\\]\|\/\:\<\>\%\+\#\?\'\"\;\,]/);
    }
    return !regex.test(inputString);
}

function GridLocalization() {
    ej.Grid.Locale["en-US"] = {
        EmptyRecord: window.Server.App.LocalizationContent.NoRecords,
        StringMenuOptions: [{ text: window.Server.App.LocalizationContent.SearchKeyStart, value: "StartsWith" }, { text: window.Server.App.LocalizationContent.SearchKeyEnd, value: "EndsWith" }, { text: window.Server.App.LocalizationContent.SearchKeyContanins, value: "Contains" }, { text: window.Server.App.LocalizationContent.SearchKeyEqual, value: "Equal" }, { text: window.Server.App.LocalizationContent.SearchKeyNotEqual, value: "NotEqual" }],
        FilterMenuCaption: window.Server.App.LocalizationContent.SearchValue,
        Filter: window.Server.App.LocalizationContent.Search,
        Clear: window.Server.App.LocalizationContent.ClearSearch
    };
    ej.Pager.Locale["en-US"] = {
        pagerInfo: window.Server.App.LocalizationContent.pageCount,
        firstPageTooltip: window.Server.App.LocalizationContent.FirstPage,
        lastPageTooltip: window.Server.App.LocalizationContent.LastPage,
        nextPageTooltip: window.Server.App.LocalizationContent.NextPage,
        previousPageTooltip: window.Server.App.LocalizationContent.PreviousPage
    };
}

$(document).on("keyup", "#SearchCategory, #search-groups, #search-group-users, #ad-user-import, #userSearchKey,#groupSearchKey, #ad-group-import, #searchItems, #search-slideshows, #search-schedules, #search-users, #search-published-items, #search-ad-users, #search-ad-groups, #search-user-permission, #search-group-permission, #search-database-users,#search-tree, #search-home-page, #search-items, .search-user-holder, .tree-view-search-holder, #search-linked-accounts, #template-datasource-search-items", function (e) {
    var element = "#" + this.id;
    if ($(element).val() != "") {
        if (element == "#search-home-page") {
            $(element).parent().siblings("span.close-icon").css("display", "block");
        }
        else {
            $(element).siblings("span.close-icon").css("display", "block");
            $(element).siblings("span.search-user").css("display", "none");
            $(element).siblings("span.search-accounts").css("display", "none");
            $(element).siblings("span.search-group").css("display", "none");
            $(element).siblings("span.search-group-users").css("display", "none");
            $(element).siblings("span.search-icon").css("display", "none");
            $(element).siblings("span.search-item").css("display", "none");
            $(element).siblings("span.search-schedule").css("display", "none");
            $(element).siblings("span.search-slideshows").css("display", "none");
            $(element).siblings("span.search").css("display", "none");
        }
    } else {
        if (element == "#search-home-page") {
            $(element).parent().siblings("span.su-search").css("display", "block");
        }
        else {
            $(element).siblings("span.close-icon").css("display", "none");
            $(element).siblings("span.su-search").css("display", "block");
        }
    }
});

$(document).on("click", "#clear-search,.clear-search", function () {
    var currentElement = $(this).prevAll("input");
    if (currentElement == "" || currentElement == null || currentElement == undefined || currentElement.length <= 0) {
        currentElement = $(this).prev("div").find("input");
    }
    var currentId = "#" + currentElement.attr("id");
    currentElement.val("");

    if (!clearSearch) {
        $("#clear-search").css("display", "none");
    }

    if (currentElement.val() == "") {
        if (currentId == "#search-home-page" && !clearSearch) {
            $("#clear-search").parent().siblings("span.su-search").css("display", "block");
            $(".search-area").removeClass("add-background");
            $(".placeholder, #clear-search").hide();
            if ($(".all-items").hasClass("active") && !$("#category-list").is(":visible")) {
                setTimeout(function () { $(".search-area").prevAll().show().parent().removeClass("pull-right"); $("#category-section-name").show(); }, 300);
            }
            else {
                setTimeout(function () { $(".search-area").prevAll(":not(#back-icon)").show().parent().removeClass("pull-right"); $("#category-section-name").show(); }, 300);
            }
            setTimeout(function () { $(".search-home-section:visible").removeClass("show"); }, 300);
        }
        else {
            $("#clear-search").siblings("span.su-search").css("display", "block");
        }

        if (currentId == "#ad-user-import" || currentId == "#ad-group-import" || currentId == "#search-database-users") {
            if (currentId == "#search-database-users") {
                var e = jQuery.Event("keypress", { keyCode: 13 });
                $("#search-database-users").trigger(e);
            }
            else {
                var gridObj = $("#Grid").data("ejGrid");
                gridObj.option("dataSource", "");
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
                var gridObj = $("#user_grid").data("ejGrid");
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

$(document).on("keydown", "#search-groups, #search-group-users, #searchItems, #search-schedules,#search-slideshows,#userSearchKey,#groupSearchKey, #search-users, #search-published-items, #search-user-permission, #search-group-permission, #search-home-page, #search-items, #search-linked-accounts", function (e) {
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

function PerformSearch(currentId) {
    var gridObj;

    if (currentId == "#search-schedules") {
        gridObj = $("#scheduleGrid").data("ejGrid");
        var searchValue = $("#search-schedules").val();

        if (searchValue.indexOf(':') > -1) {
            var searchField = searchValue.split(':')[0].toLowerCase();
            var searchKey = searchValue.split(':')[1].trim();
            var symbolCount = searchValue.match(/:/g).length;
            if (symbolCount > 1) {
                firstKey = searchValue.split(':')[1];
                secondKey = searchValue.split(':')[2];
                searchKey = (firstKey + ":" + secondKey).trim();
            }

            switch (searchField.replace(/ /g, '').toLowerCase()) {
                case ("name"):
                    searchField = "Name";
                    break;
                case ("dashboard"):
                    searchField = "ItemName";
                    break;
                case ("owner"):
                    searchField = "CreatedByDisplayName";
                    break;
                case ("lastrun"):
                    searchField = "LastRunString";
                    break;
                case ("nextscheduledrun"):
                    searchField = "NextScheduleString";
                    break;
                case ("status"):
                    searchField = "Status";
                    break;
            }
            gridObj.model.searchSettings.fields = searchField;
            gridObj.model.searchSettings.key = searchKey;
            gridObj.refreshContent();
        }
        else {
            gridObj.search($("#search-schedules").val());
        }
    }
    else if (currentId == "#search-slideshows") {
        gridObj = $("#slideshowGrid").data("ejGrid");
        gridObj.model.pageSettings.currentPage = 1;
        gridObj.refreshContent();
    }
    else if (currentId == "#search-users") {
        gridObj = $("#user_grid").data("ejGrid");
        gridObj.model.pageSettings.currentPage = 1;
        gridObj.refreshContent();
    }
    else if (currentId == "#search-published-items") {
        gridObj = $("#PublishItemGrid").data("ejGrid");
        gridObj.model.pageSettings.currentPage = 1;
        gridObj.search($("#search-published-items").val());
        gridObj.refreshContent();
    }
    else if (currentId == "#search-ad-users") {
        $("#checkbox-header").prop("checked", false);
        $(".checkbox-row").prop("checked", false);
        gridObj = $("#user_grid").data("ejGrid");
        gridObj.search($("#search-ad-users").val());
    }
    else if (currentId == "#search-items") {
        gridObj = $("#items").data("ejGrid");
        gridObj.model.pageSettings.currentPage = 1;
        gridObj.refreshContent();
    }
    else if (currentId == "#search-home-page") {
        gridObj = $("#items").data("ejGrid");
        gridObj.model.filterSettings.filteredColumns = [];
        if (!$("#category-list").is(":visible") || $("#category-list").length <= 0) {
            if ($(".all-items").hasClass("active")) {
                gridObj.model.filterSettings.filteredColumns = [{ field: "CategoryName", operator: "equal", value: $("#category-section-name").html() }];
            }
            gridObj.model.pageSettings.currentPage = 1;
            gridObj.refreshContent();
        }
    }
    else if (currentId == "#search-group-users" || currentId == "#search-groups") {
        gridObj = $("#Grid").data("ejGrid");
        gridObj.model.pageSettings.currentPage = 1;
        gridObj.refreshContent();
    }
    else if (currentId == "#search-ad-groups") {
        gridObj = $("#Grid").data("ejGrid");
        gridObj.search($("#search-ad-groups").val());
    }
    else if (currentId == "#ad-user-import") {
        $(".grid-error-validation").css("display", "none");
        $(".empty-validation").css("display", "none");
        $(".grid-validation").css("display", "none");
        searchADUsers($("#ad-user-import").val());
    }
    else if (currentId == "#ad-group-import") {
        $(".grid_error_validation").css("display", "none");
        $(".empty_validation").css("display", "none");
        $(".grid_validation").css("display", "none");
        searchADGroups($("#ad-group-import").val());
    }
    else if (currentId == "#search-user-permission") {
        gridObj = $("#itempermissiongrid").data("ejGrid");
        gridObj.search($("#search-user-permission").val());
    }
    else if (currentId == "#search-group-permission") {
        gridObj = $("#itemgrouppermissiongrid").data("ejGrid");
        gridObj.search($("#search-group-permission").val());
    }
    else if (currentId == "#userSearchKey") {
        gridObj = $("#UserGrid").data("ejGrid");
        gridObj.refreshContent();
    }
    else if (currentId == "#groupSearchKey") {
        gridObj = $("#GroupGrid").data("ejGrid");
        gridObj.refreshContent();
    }
    else if (currentId == "#search-linked-accounts") {
        gridObj = $("#ConnectedAccountGrid").data("ejGrid");
        gridObj.search($("#search-linked-accounts").val());
    }
}

window.onpopstate = function (e) {
    var queryString = window.location.search;
    var url = window.location.pathname;
    var pathArray = url.split('/');
    e.preventDefault();

    var dataCulture = typeof (pathArray[2]) != "undefined" ? pathArray[2] : null;
    var itemType = typeof (pathArray[3]) != "undefined" ? (pathArray[3] == "dashboards" ? pathArray[3] : null) : null;
    var itemId = itemType != null ? (typeof (pathArray[4]) != "undefined" ? (isValidGuid(pathArray[4]) ? pathArray[4] : null) : null) : null;
    var categoryName = itemId != null ? (typeof (pathArray[5]) != "undefined" ? pathArray[5] : null) : null;
    var dashboardName = itemId != null ? (typeof (pathArray[6]) != "undefined" ? pathArray[6] : null) : null;
    var section = getQueryVariable("view");
    var tabName = getQueryVariable("tab");

    if (dataCulture != null && section != null && categoryName != null && dashboardName != null && itemId != null) {
        var previousUrl = $("#current-url").attr("data-url");
        var previousPathArray = previousUrl.split('/');
        var previousItemType = typeof (previousPathArray[3]) != "undefined" ? (previousPathArray[3] == "dashboards" ? previousPathArray[3] : null) : null;
        var previousItemId = previousItemType != null ? (typeof (previousPathArray[4]) != "undefined" ? (isValidGuid(previousPathArray[4]) ? previousPathArray[4] : null) : null) : null;
        if (itemId !== previousItemId) {
            var absolutePath = rootUrlAction + "/dashboards";
            DashboardRender(absolutePath, itemId, categoryName, dashboardName, section, tabName);
        } else {
            $("#current-url").attr("data-url", rootUrlAction + "/dashboards/" + itemId + "/" + decodeURI(categoryName) + "/" + decodeURI(dashboardName) + "?view=" + decodeURI(section));
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
        $("#item-viewer #initial-item-message").css("display", "block");
        $("#dashboard_render_iframe").css("display", "none");
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

$(window).load(function () {
    if (typeof (getTenantStatusUrl) !== "undefined") {
        $.ajax({
            type: "Post",
            url: getTenantStatusUrl,
            success: function (data) {
                if (data !== undefined && data.IsAdmin) {
                    if (!data.IsTenantStatusActive) {
                        $(".warning-content").text("");
                        var pathName = window.location.pathname.indexOf("administration/payments");
                        var isPaymentPage = pathName > -1 ? true : false;
                        var warningContent = "";
                        if (data.TenantStatus === "MarkedForSuspension" && !isPaymentPage) {
                            warningContent = window.Server.App.LocalizationContent.SuspensionWarning + data.TenantStatusUpdateDate + ". " + window.Server.App.LocalizationContent.Click + " <a href='" + paymentPageUrl + "'>" + window.Server.App.LocalizationContent.Here + "</a>" + window.Server.App.LocalizationContent.NavigatePaymentPage + "<span class='close-warning-icons su-close'></span>";
                            $(".warning-content").append(warningContent);
                            $(".suspension-warning").css("display", "block");
                            $("#content-area").addClass("suspension-warning-space");
                        }
                        else if (data.TenantStatus === "Suspended") {
                            warningContent = window.Server.App.LocalizationContent.SuspendedWarning + " <span class='close-warning-icons su-close'></span>";
                            $(".warning-content").append(warningContent);
                            $(".suspension-warning").css("display", "block");
                            $("#content-area").addClass("suspension-warning-space");
                        }
                    }

                    // We are hiding this because it will be included in future release
                    //if (data.IsBoldBiTenant && (data.IsAuthorsExceed || data.IsLicenseExpired)) {
                    if (false) {
                        if (data.IsAuthorsExceed && data.IsLicenseExpired) {
                            warningContent = "Your site license has expired, and you have exceeded the dashboard creators limit.";
                        }
                        else if (data.IsAuthorsExceed) {
                            warningContent = "You have exceeded the dashboard creators limit.";
                        }
                        else if (data.IsLicenseExpired) {
                            warningContent = "Your site license has expired.";
                        }

                        var path = window.location.pathname.indexOf("administration/subscription");
                        if (path > -1) {
                            warningContent = warningContent + " Please upgrade your plan or <a href='" + contactUsUrl + "'>" + "contact us</a>." + " <span class='close-user-warning-icons su-close'></span>";
                        }
                        else {
                            warningContent = warningContent + " Please " + " <a href='" + manageLicenseUrl + "'>" + " upgrade your plan</a> or <a href='" + contactUsUrl + "'>" + "contact us</a>." + " <span class='close-user-warning-icons su-close'></span>";
                        }

                        $(".user-warning-content").text("");                        
                        $(".user-warning-content").append(warningContent);
                        $(".user-warning").css("display", "block");
                        $("#content-area").addClass("user-warning-space");
                    }
                }
            }
        });
    }

    if (typeof (getNotificationCountUrl) != "undefined") {
        $.ajax({
            type: "Post",
            url: getNotificationCountUrl,
            success: function (data) {
                if (data != null && data != undefined) {
                    if (data.notificationCount > 0) {
                        $("#user-system-notification").append($("<span>").attr({
                            "id": "notification-indicator"
                        }));
                    }
                    else {
                        $("#user-system-notification").find("#notification-indicator").remove();
                    }
                }
            }
        });
    }
});

function getCurrentPageNumber(pageSize, selectedRecordsCount, totalRecordsCount, currentPage) {
    var difference = totalRecordsCount - selectedRecordsCount;
    if (difference > pageSize) {
        var lastPage = difference % pageSize === 0 ? difference / pageSize : Math.floor((difference / pageSize) + 1);
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

function isValidGuid(value) {
    var regexGuid = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/gi;
    return regexGuid.test(value);
}


$(document).ready(function (e) {
    $('#cookiesubs,#cookiesubs-dashboards').on('click', function () {
        $(".cookie-notification").remove();
        $(".cookie-notification-dashboards").remove();
        SetCookie();
    });

    function SetCookie() {
        $.ajax({
            type: "POST",
            url: window.setPermissionUrl
        });
    }

});

function showOrHideGridPager(gridId) {
    var pageDetails = $(gridId).ejGrid("option", "pageSettings");
    if (pageDetails.totalRecordsCount <= pageDetails.pageSize) {
        $(gridId + " .e-pager").css("display", "none");
    }
    else {
        $(gridId + " .e-pager").css("display", "block");
    }
}

function blurServerAppContainer(size) {
    if (size == undefined || size == "") {
        size = "5px";
    }

    $("#header-area, #menu-area, #content-area, footer, .cookie-notification").css("filter", "blur(" + size + ")");
    $("#server-app-container").css("overflow", "hidden");

    if ($("#unlock-enterprise-features-container").length > 0) {
        $("#unlock-enterprise-features-container").addClass("blur-content");
    }
}

function unblurServerAppContainer() {
    $("#header-area, #menu-area, #content-area, footer, .cookie-notification").css("filter", "");
    $("#server-app-container").css("overflow", "");

    if ($("#unlock-enterprise-features-container").length > 0) {
        $("#unlock-enterprise-features-container").removeClass("blur-content");
    }
}

////Generate GUID

function generateUUID() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

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

function refreshToolTip(attr) {
    if (attr == undefined) {
        attr = "tooltip";
    }
    $('[data-toggle="' + attr + '"]').tooltip({
        animation: true,
        delay: { show: 500 }
    });
}

$(document).on('show.bs.collapse', '#menu-area', function () {
    $("#collapse-menu-backdrop").show();
    $(".mobile-menu-icon span i").removeClass("su-mobile-menu-icon");
    $(".mobile-menu-icon span i").addClass("su-close");
});

$(document).on('hide.bs.collapse', '#menu-area', function () {
    $("#collapse-menu-backdrop").hide();
    $(".mobile-menu-icon span i").removeClass("su-close");
    $(".mobile-menu-icon span i").addClass("su-mobile-menu-icon");
});

$(document).on('hidden.bs.collapse', '#menu-area', function () {  
    $("#menu-area").css("width", "175px");
});