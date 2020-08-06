var parentRefUrl = (window.location != window.parent.location) ? document.referrer : document.location.href.replace(document.location.pathname + document.location.search, "");
if (parentRefUrl == "") {
    var parentUrl = "";
}
else {
    var parentUrl = parentRefUrl.match(/:\/\/(.[^/]+)/)[1];
}
var iframeRefUrl = window.location.href;
var iframeUrl = iframeRefUrl.match(/:\/\/(.[^/]+)/)[1];
if ($("#embed-iframe").val() !== undefined) {
    var isEmbed = $("#embed-iframe").val().toLowerCase();
}
var sameOrigin = true;

$(document).ready(function () {
    generateProfileAvatar();
    try {
        sameOrigin = window.parent.location.host == window.location.host;
    }
    catch (e) {
        sameOrigin = false;
    }

    $("#messageBox").ejDialog({
        width: (iframeUrl == parentUrl) ? (sameOrigin ? ((parent.window.innerWidth > 460) ? "460px" : (parent.window.innerWidth - 10)) : "460px") : "460px",
        height: "200px",
        showOnInit: false,
        allowDraggable: true,
        enableResize: false,
        showHeader: false,
        enableModal: true,
        close: "onMessageDialogClose"
    });

    $("#scroll-element").ejScroller({
        height: 358,
        width: 373,
        scrollerSize: 9,
        buttonSize: 0
    });

    $(document).on('click', '#notification-content-area.dropdown-menu', function (e) {
        e.stopPropagation();
    });

    $("#notification-icon").click(function (e) {
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
                        $('#more-sites-id').append("<div class='pull-left more-sites'><a href='" + window.idpUrl + "' target='_blank'>" + window.Server.App.LocalizationContent.MoreSites + "</a ></div > ");
                    }
                    else {
                        $('#more-sites-id').remove();
                    }
                    window.isSiteLoaded = true;
                }
            });
        }
    });
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

function getFnObj(obj) {
    if (typeof obj === "function") return obj;
    if (typeof obj === "string" && window[obj])
        return obj;
};

function createLoader(element) {
    var returnId = "";
    if (typeof element === "string") {
        var selector = (element.indexOf(".") === 0) ? "." : "#";
        element = (element.indexOf(".") === 0) ? element.slice(1, element.length) : (element.indexOf("#") === 0) ? element.slice(1, element.length) : element;
        returnId = element + "-loader-icon";

        if ($("#" + returnId).length == 0 && $(selector + element).length != 0) {
            var template = $("<div class='loader-blue loader-icon' id='" + returnId + "'><svg class='circular'><circle class='path' cx='27' cy='27' r='20' fill='none' stroke-width='4' stroke-miterlimit='10'></circle></svg></div>");
            $("body").append(template);
        }
        return returnId;
    }
    else {
        element = element.selector;
        var selector = (element.indexOf(".") === 0) ? "." : "#";
        element = element.slice(1, element.length);
        returnId = element + "-loader-icon";
        if ($("#" + returnId).length == 0 && $("#" + element).length != 0) {
            var template = $("<div class='loader-blue loader-icon' id='" + returnId + "'><svg class='circular'><circle class='path' cx='27' cy='27' r='20' fill='none' stroke-width='4' stroke-miterlimit='10'></circle></svg></div>");
            $("body").append(template);
        }
    }

    return returnId;
}

//Message box
function onCloseMessageBox() {
    $("#messageBox").ejDialog("close");
}

function messageBox(messageIcon, messageHeader, messageText, type, successCallback, errorCallback, width, height, maxHeight, cssClass) {
    parent.$("#messageBox").find(".message-content").text("");
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
        $(".message-box-close").html(closeIcon);
        $(".message-box-btn-holder").append(errorButton, successButton);
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

function SuccessAlert(header, content, duration) {
    window.top.$("#success-alert").css("display", "table");
    window.top.$("#message-header").html(header);
    window.top.$("#message-content").html(content);
    setTimeout(function () {
        window.top.$('#success-alert').fadeOut()
    }, duration);
}

function WarningAlert(header, content, duration) {
    parent.$("#warning-alert").css("display", "table");
    parent.$("#warning-alert #message-header").html(header);
    parent.$(" #warning-alert #message-content").html(content);
    if (duration != null && duration != "") {
        setTimeout(function () {
            parent.$('#warning-alert').fadeOut()
        }, duration);
    }
    $(document).on("click", ".close-div", function () {
        parent.$('#warning-alert').fadeOut()
    });
}

$(document).ready(function () {
    $('#notification-link').on('hide.bs.dropdown', function () {
        $("#notification-content-area").ejWaitingPopup();
        $("#notification-content-area").ejWaitingPopup("hide");
    })
});

$(window).load(function () {
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
        else if ($(this).attr("data-id") === "profilelogo" || $(this).attr("data-id") === "profile-logo-sub" || $(this).attr("data-id") === "user-profile-picture") {
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

    $(".hide-display").each(function () {
        $(this).removeClass("hide-display");
    });

    if (showFeedbackDialog.toLowerCase() == "true") {
        $("#do-not-show-button").removeClass("display-none");
        $("#show-later-button").removeClass("display-none");
        $("#cancel-button").addClass("display-none");
        $("#close-general-feedback").attr("data-feedback-close", false)
        openFeedbackWindow();
    }
});

function imageOnLoad() {
    $(this).show();
    if ($(this).attr("id") === "footerlogo") {
        $(this).parent().parent().find("div.lazyload").remove();
    }
    $(this).parent().find("div.lazyload").remove();
}