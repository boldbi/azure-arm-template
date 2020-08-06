var experience;
var subject;
var postmd;

$(document).ready(function (e) {
    var feedbackWaitingPopupTemplateId = createLoader("#body");
    $("#body").ejWaitingPopup({ template: $("#" + feedbackWaitingPopupTemplateId) });

    postmd = renderMde("#general-feedbak-comment");   
});

$(document).on("click", "#feedback-section, .feedback-button", function () {
    $("#do-not-show-button").addClass("display-none");
    $("#show-later-button").addClass("display-none");
    $("#cancel-button").removeClass("display-none");
    $("#close-general-feedback").attr("data-feedback-close", true);
    $("#submit-button").prop("disabled", true);
    openFeedbackWindow();
});

$(document).on("click", ".sub-button", function () {
    $(".sub-button").removeClass("button-bg-change");
    $(this).addClass("button-bg-change");
    subject = $(this).val();
    if ($(this).attr("id") == "sub1") {
        $(".sub-title-change").html("<span class='popup-label-sub'>" + window.Server.App.LocalizationContent.FeedbackSubjectProblem + "</span>");
    }
    else if ($(this).attr("id") == "sub2") {
        $(".sub-title-change").html("<span class='popup-label-sub'>" + window.Server.App.LocalizationContent.FeedbackSubjectSuggestion + "</span>");
    }
    else if ($(this).attr("id") == "sub3") {
        $(".sub-title-change").html("<span class='popup-label-sub'>" + window.Server.App.LocalizationContent.FeedbackSubjectCompliment + "</span>");
    }
    else if ($(this).attr("id") == "sub4") {
        $(".sub-title-change").html("<span class='popup-label-sub'>" + window.Server.App.LocalizationContent.FeedbackSubjectOther + "</span>");
    }
});

$(document).on("click", ".smiley-change", function () {
    $(".smiley-change").addClass("smiley-select");
    $(this).removeClass("smiley-select");
    experience = $(this).attr("data-smiley-val");
    $("#submit-button").prop("disabled", false);
    $("#submit-button").removeClass("disable-cursor");
});

$(document).on("click", ".cookie-button", function () {
    var cookietype = $(this).attr("data-cookie");
    $("#general-feedback-popup").ejDialog("close");
    var commentText = postmd.value("");
    experience = '';
    subject = '';
    $(".sub-button").removeClass("button-bg-change");
    $(".smiley-change").removeClass("smiley-select");
    $("#general-feedback-popup").addClass("display-none");
    if ($(this).attr("data-feedback-close") == "false") {
        $.ajax({
            type: "POST",
            url: feedbackCookieUrl,
            data: { cookieType: cookietype }
        });
    }
});

$(document).on("click", "#submit-button", function () {
    var commentText = postmd.value();
    var feedback = {
        FeedbackFormId: $("#feedback-form-id").val(),
        CanContact: $("#general-feedback").is(":checked"),
        Comments: commentText,
        Experience: experience,
        FeedbackSubject: subject
    };
    var cookietype = $(this).attr("data-cookie");
    $("body").ejWaitingPopup("show");
    $.ajax({
        type: "POST",
        url: feedbackSendUrl,
        data: { feedback: JSON.stringify(feedback) },
        success: function (result) {
            $("#body").ejWaitingPopup("hide");
            if (result.Status) {
                SuccessAlert(window.Server.App.LocalizationContent.AddUserFeedback, window.Server.App.LocalizationContent.AddUserFeedbackSuccess, 7000);
                $("#general-feedback-popup").ejDialog("close");
                setSendFeedbackCookie(cookietype);
            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.FeedbackFailure, window.Server.App.LocalizationContent.AddUserFeedbackFailure, 7000);
                $("#general-feedback-popup").ejDialog("close");
            }
        },
        error: function () {
            WarningAlert(window.Server.App.LocalizationContent.FeedbackFailure, window.Server.App.LocalizationContent.AddUserFeedbackFailure, 7000);
            $("#body").ejWaitingPopup("hide");
        }
    });
});

function renderMde(id) {
    var simplemde = new EasyMDE({
        element: $(id)[0],
        status: false,
        spellChecker: false,
        autoDownloadFontAwesome: false,
        toolbar: false,
        previewRender: function (plainText) {
            return customMarkdownParser(plainText); // Returns HTML from a custom parser
        },
        minHeight: "130px"
    });
    return simplemde;
}

function setSendFeedbackCookie(cookietype) {
    var commentText = postmd.value("");
    experience = '';
    subject = '';
    $(".sub-button").removeClass("button-bg-change");
    $(".smiley-change").removeClass("smiley-select");
    $("#general-feedback-popup").addClass("display-none");
    $.ajax({
        type: "POST",
        url: feedbackCookieUrl,
        data: { cookieType: cookietype }
    });
}

function openFeedbackWindow() {
    var hasFeedbackDialog = $("#general-feedback-popup").data("ejDialog");

    if (hasFeedbackDialog != null) {
        $("#general-feedback-popup").ejDialog("open");
    }
    else {
        $("#general-feedback-popup").ejDialog({
            width: "520px",
            height: "490px",
            showOnInit: true,
            allowDraggable: false,
            enableResize: false,
            showHeader: false,
            enableModal: true,
            beforeOpen: function () {
                $("#general-feedback-popup").removeClass("display-none");
            },
            beforeClose: function () {
                $("#general-feedback-popup").addClass("display-none");
            }
        });
    }
}


