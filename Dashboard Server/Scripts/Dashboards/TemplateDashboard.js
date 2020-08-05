var windowRef;
var timer;
var addButtonObj;
var progressNotifier;
var eTag;

$(document).ready(function () {
    if (typeof ($.connection) != "undefined") {
        progressNotifier = $.connection.progressHub;
        progressNotifier.client.sendMessage = function (message) {
            var data = jQuery.parseJSON(message);
            var id = "#progress-alert_" + data.ETag;
            $(id).remove();
            if (data.Status) {
                var itemLink = '<a target="_blank" href="' + rootUrlAction + '/dashboards/' + data.ItemId + '/' + data.CategoryName + '/' + data.ItemName + '?showmydashboards=1">' + data.ItemName + '</a>';
                ProgressAlert(data.ETag, window.Server.App.LocalizationContent.TemplateDashboardReady, itemLink, 0, true);

                if ($(id).length === 1) {
                    location.reload(true);
                }
            }
            else {
                parent.$('#progress-alert').fadeOut();
                $("#sample-data-button").removeAttr("disabled");
                WarningAlert(window.Server.App.LocalizationContent.TemplateDashboard, window.Server.App.LocalizationContent.TemplateDashboardUpdateFailWarningAlert, 7000);
            }
        };

        $.connection.hub.start();
    }

    $("#sample-data-button").tooltip();
});

$(document).on("click", "#sample-data-button", function (e) {
    if (windowRef != undefined) {
        $(".process-notify").addClass("display-none");
        clearInterval(timer);
        windowRef.close();
    }

    addButtonObj = $(this);
    $(window).off('message', $.proxy(handleAuthorizeMessage, window, addButtonObj));
    $(window).on('message', $.proxy(handleAuthorizeMessage, window, addButtonObj));
    windowRef = window.open($(this).attr("data-authorize-url") + "&origin=" + window.location.origin, "", "height=600,width=500");
    timer = setInterval($.proxy(checkWindowRef, 500, addButtonObj));
});

function handleAuthorizeMessage(addButtonObj, evt) {
    if (evt.originalEvent.origin == dataServiceHostUrl) {
        eTag = generateUUID();
        $("#sample-data-button").attr("disabled", "true");
        var dashboardId = addButtonObj.attr("data-dashboard-id");
        var version = addButtonObj.attr("data-dashboard-version");
        var accessToken = addButtonObj.attr("data-access-token");
        var dashboardName = addButtonObj.attr("data-dashboard-name");
        progressNotifier.server.updateTemplateDashboardWithCustomerData(dashboardId, dashboardName, version, jQuery.parseJSON(evt.originalEvent.data).Code, accessToken, eTag);
        ProgressAlert(eTag, window.Server.App.LocalizationContent.TemplateDashboard, window.Server.App.LocalizationContent.TemplateDashboardNotify, 0, false);
        $(".process-notify").addClass("display-none");
        $(window).off('message', $.proxy(handleAuthorizeMessage, window, addButtonObj));
    }
}

function checkWindowRef(addButtonObj) {
    if (windowRef.closed) {
        $(".process-notify").addClass("display-none");
        clearInterval(timer);
    }
}


// Server core functions
function ProgressAlert(eTag, header, content, duration, isSuccessNotify) {
    var elemId = 'progress-alert_' + eTag;
    if (!parent.$("#progress-alert-container").find("#" + elemId).length) {
        var dom = '<div id="' + elemId + '" class="progress-alert"><div id="image-container"><div class="image-holder"><span id="progress-notify-success" class="su su-tick display-none" alt="Success Icon"></span><div id="progress-notify-loader"><svg x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.8s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.8s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.8s" repeatCount="indefinite" /></rect><rect x="8" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.8s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.8s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.8s" repeatCount="indefinite" /></rect><rect x="16" y="10" width="4" height="10" fill="#333" opacity="0.2"><animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.8s" repeatCount="indefinite" /><animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.8s" repeatCount="indefinite" /><animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.8s" repeatCount="indefinite" /></rect></svg></div></div></div><div id="message" class="div-close"><h1 id="message-header"></h1><span id="message-content"></span></div><div class="close-div"><span id="close-content">' + window.Server.App.LocalizationContent.Close + '</span></div ></div > ';
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
            parent.$("#" + elemId).fadeOut()
        }, duration);
    }
    $(document).on("click", ".close-div", function () {
        var currentElement = $(this);
        parent.$(currentElement).parent().remove()
    });
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