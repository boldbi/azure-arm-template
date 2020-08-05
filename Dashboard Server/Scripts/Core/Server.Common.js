const isFirefox = navigator.userAgent.indexOf("Firefox") != -1;

var keyCode = {
    BackSpace: 8,
    Tab: 9,
    Enter: 13,
    Shift: 16,
    Ctrl: 17,
    Alt: 18,
    Pause: 19,
    CapsLock: 20,
    Esc: 27,
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
    RightWindow: 92,
    SemiColon: isFirefox ? 59 : 186,
    Comma: 188
};

var ItemType = {
    None: 0,
    Category: 1,
    Dashboard: 2,
    Report: 3,
    Datasource: 4,
    Dataset: 5,
    File: 6,
    Schedule: 7,
    Widget: 8,
    ItemView: 9,
    Slideshow: 10
};

var PermissionAccess = {
    None: 0,
    Create: 1,
    Read: 2,
    ReadWrite: 6,
    ReadWriteDelete: 14
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

function SuccessAlert(header, content, duration) {
    var windowObj = window.parent;
    var sameOrigin = false;
    try {
        sameOrigin = windowObj.location.host == window.location.host && windowObj.$("#success-alert").length > 0;
    }
    catch (e) {
        sameOrigin = false;
    }

    windowObj = !sameOrigin ? window : windowObj;
    windowObj.$("#success-alert").css("display", "table");
    windowObj.$("#message-header").html(header);
    windowObj.$("#message-content").html(content);
    setTimeout(function () {
        windowObj.$('#success-alert').fadeOut();
    }, duration);
}

function WarningAlert(header, content, duration) {
    parent.$("#warning-alert").css("display", "table");
    parent.$("#warning-alert #message-header").html(header);
    parent.$(" #warning-alert #message-content").html(content);
    if (duration != null && duration != "") {
        setTimeout(function () {
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
            parent.$('#mobile-alert').fadeOut(1000);
        }, duration);
    }
}

function ProgressAlert(eTag, header, content, duration, isSuccessNotify) {
    var elemId = 'progress-alert_' + eTag;
    if (!parent.$("#progress-alert-container").find("#" + elemId).length) {
        var dom = '<div id="' + elemId + '" class="progress-alert"><div id="image-container"><div class="image-holder"><span id="progress-notify-success" class="su su-tick display-none" alt="Success Icon"></span><div id="progress-notify-loader"><svg x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#0565FF" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.8s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.8s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.8s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#0565FF" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.8s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.8s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.8s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#0565FF" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.8s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.8s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.8s" repeatCount="indefinite" /></rect></svg></div></div></div><div id="message" class="div-close"><h1 id="message-header"></h1><span id="message-content"></span></div><div class="close-div"><span id="close-content">' + window.Server.App.LocalizationContent.Close + '</span></div ></div > ';
        $("#progress-alert-container").append(dom);
    }

    parent.$("#" + elemId).css("display", "table");
    parent.$("#" + elemId + " #message-header").html(header);
    parent.$("#" + elemId + " #message-content").html(content);
    if (isSuccessNotify) {
        parent.$("#" + elemId + " #progress-notify-loader").addClass("display-none");
        parent.$("#" + elemId + " #progress-notify-success").removeClass("display-none");
    }
    else {
        parent.$("#" + elemId + " #progress-notify-loader").removeClass("display-none");
        parent.$("#" + elemId + " #progress-notify-success").addClass("display-none");
    }
    if (duration != null && duration != "") {
        setTimeout(function () {
            parent.$("#" + elemId).fadeOut();
        }, duration);
    }
    $(document).on("click", ".close-div", function () {
        var currentElement = $(this);
        parent.$(currentElement).parent().remove();
    });
}

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
        if ($("#" + returnId).length == 0 && $(selector + element).length != 0) {
            var template = $("<div class='loader-blue loader-icon' id='" + returnId + "'><svg class='circular'><circle class='path' cx='27' cy='27' r='20' fill='none' stroke-width='4' stroke-miterlimit='10'></circle></svg></div>");
            $("body").append(template);
        }
    }

    return returnId;
}

function ajaxPostCall(type, apiUrl, requestData, beforeSendCallback, successCallback, errorCallback, completeCallback) {
    if (embedConfig.IsEmbedCode) {
        if (type == "GET") {
            var itemRequestQuerString = jQuery.param(requestData);
            apiUrl["api"] = apiUrl["api"] + "?" + itemRequestQuerString;
            requestData = null;
        }
        return $.ajax({
            type: type,
            url: dashboardServerApiUrl + apiUrl["api"],
            headers: {
                "Content-type": "application/json",
                "Authorization": "bearer " + designerToken,
            },
            data: JSON.stringify(requestData),
            beforeSend: function (req) {
                if (!isNullOrWhitespace(beforeSendCallback)) {
                    beforeSendCallback(req);
                }
            },
            success: function (data, result) {
                if (!isNullOrWhitespace(successCallback)) {
                    successCallback(data);
                }
            },
            error: function (data) {
                if (!isNullOrWhitespace(errorCallback)) {
                    errorCallback();
                }
            },
            complete: function (data) {
                if (!isNullOrWhitespace(completeCallback)) {
                    completeCallback(data);
                }
            }
        });
    } else {
        return $.ajax({
            type: type,
            url: apiUrl["web"],
            data: requestData,
            beforeSend: function (req) {
                if (!isNullOrWhitespace(beforeSendCallback)) {
                    beforeSendCallback(req);
                }
            },
            success: function (data, result) {
                if (!isNullOrWhitespace(successCallback)) {
                    successCallback(data);
                }
            },
            error: function (data) {
                if (!isNullOrWhitespace(errorCallback)) {
                    errorCallback();
                }
            },
            complete: function (data) {
                if (!isNullOrWhitespace(completeCallback)) {
                    completeCallback(data);
                }
            }
        });
    }
}

function isNullOrWhitespace(value) {
    return (value == null || value == undefined || $.trim(value) == "");
}

function generateProfileAvatar() {
    $(".profile-pic-tag").each(function () {
        var id = $(this).attr("data-id");
        var imageSize = $(this).attr("data-image-size");
        var fontSize = imageSize / 2.5;
        var letterSpace = fontSize < 10 ? "0" : fontSize < 20 ? "1px" :  "2px";
        var letterLeftMargin = fontSize < 10 ? "1px" : "2px";
        var displayName = $(this).attr("data-display-name");
        var type = $(this).attr("data-type");
        $(this).html("");
        if (id != 0) {
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
                image.css("position", "absolute");
                image.css("top", "0px");
                image.css("left", "0px");
                image.css("border-radius", "50%");
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
            if (isNullOrWhitespace(nameLetters[1])) {
                firstCharacter.text(nameLetters[0][0]);
            } else {
                firstCharacter.text(nameLetters[0][0] + nameLetters[1][0]);
            }
            firstCharacter.css("font-size", fontSize + "px");
            firstCharacter.css("margin-left", letterLeftMargin);
            firstCharacter.css("letter-spacing", letterSpace);
            firstCharacter.appendTo($(this));
        }
    });
}
