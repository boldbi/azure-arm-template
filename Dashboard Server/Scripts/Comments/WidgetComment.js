$(document).ready(function () {
    if ($("#is_mobile").val() == "true") {
        var mobHeight = $(window).height() - 50;
        $("#widget").css("height", mobHeight);
    }
});

$(window).on("orientationchange", function () {
    if ($("#is_mobile").val() == "true") {
        var mobHeight = $(window).height() - 50;
        $("#widget").css("height", mobHeight);
    }
});

function openWidgetComment(obj) {
    var itemId = $("#widget_Comment").attr("data-item-id");
    var isMultiDashboard = $("#isMultiDashboard").attr("data-item-id");
    var dashboardItemId = $("#dashboard_Comment").attr("data-item-id");
    $("#commentModuleContainer").toggleClass("displayNone");
    if ($("#commentModuleContainer").hasClass("displayNone")) {
        closeWidgetComment();
    } else {
        $("#commentModuleContainer").css({ 'height': $(window).height() - 4 });
        if (typeof (window.frames[0].GetAllComments) === 'function') {
            window.frames[0].GetAllComments(itemId, "widget", dashboardItemId, "desc", isMultiDashboard);
        } else {
            $('#commentModuleContainer_iframe').on('load', function () {
                window.frames[0].GetAllComments(itemId, "widget", dashboardItemId, "desc", isMultiDashboard);
            });
        }
    }
};

function closeWidgetComment() {
    $("#commentImage_popup").ejDialog("close");
    $("#commentModuleContainer").addClass("displayNone");
    $("#delete_popup_iframe").addClass("displayNone");
    $("#widget-loader-icon").css("display", "block");

    if ($("#is_mobile").val() == "true") {
        $('#widget').show();
        $("#server-mobile-navbar a.active").removeClass("active");
        $("#server-mobile-navbar .su-nav-widgets").addClass('active');
    }
}
function closeCommentOnResize() {
    closeWidgetComment();
    $('#widget').data("ejDashboardViewer").removeCommentToggleState();
}

function openComments() {
    var commentId = getUrlVars(window.location.href.split('#')[0])["comment"];
    if (typeof (commentId) !== "undefined") {
        if ($("#is_mobile").val() == "true") {
            if (window.innerWidth < 410) {
                $("#widget").hide();
            }
            $("#server-mobile-navbar").find(".server-comment").trigger("click");
        } else {
            $(".e-dbrd-banner-widget-withcomments").trigger("click");
        }
    }
}

function getUrlVars(url) {
    var vars = {};
    var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

//MessageBox

function onCloseMessageBox() {
    parent.$("#messageBox").ejDialog("close");
}

function onMessageDialogClose() {
    parent.$("#messageBox").find(".message-content").text("");
    $(".message-box-btn-holder").html("");
    $(".message-box-close").html("");
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
        parent.$(".message-box-close").html(closeIcon);
        parent.$(".message-box-btn-holder").append(errorButton, successButton);
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

    $('[data-toggle="tooltip"]').tooltip();
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

function getFnObj(obj) {
    if (typeof obj === "function") return obj;
    if (typeof obj === "string" && window[obj])
        return obj;
}