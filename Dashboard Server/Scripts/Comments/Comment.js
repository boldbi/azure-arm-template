var cursorPos, Paste, createHiddenEditable, isFocusable, initialLine, initialPosition, targetElement, itemId, dataManger, elementNode, isMultiDashboard, getAllCommentAjax, deletedCommentId;

var date = new Date();
var commentAction = {
    Add: 0,
    Edit: 1,
    Delete: 2,
    GetComments: 3
}
var isEmbedCode = parent.embedConfig.IsEmbedCode;
var dashboardTypeId = "#dashboard";
var ejType = isSydjViewer ? "ejDashboardDesigner" : "ejDashboardViewer";

var parentRefUrl = (window.location != window.parent.location) ? document.referrer : document.location.href.replace(document.location.pathname + document.location.search, "");
if (parentRefUrl == "") {
    var parentUrl = "";
}
else {
    var parentUrl = parentRefUrl.match(/:\/\/(.[^/]+)/)[1];
}
var iframeRefUrl = window.location.href;
var iframeUrl = iframeRefUrl.match(/:\/\/(.[^/]+)/)[1];

$(document).ready(function () {
    dataManager = null;

    ajaxSetup();

    var query = ej.Query().from("userMentionList").select("Name", "Type");
    $("#autocomplete-input").ejAutocomplete({
        allowSorting: false,
        dataSource: dataManger,
        width: "200px",
        popupHeight: "135px",
        filterType: "contains",
        query: query,
        fields: { text: "Name", key: "Type" },
        select: "onSelect",
        create: "displaySuggestionList",
        actionSuccess: "displaySuggestionList",
        open: "displaySuggestionList"
    });

    var itemType = $("#itemType").attr("data-item-type").toLowerCase();
    var dashboardItemId = parent.$("#dashboard_Comment").attr("data-item-id");
    var categoryName = parent.$("#dashboard_Comment").attr("data-category-name");
    var itemName = parent.$("#dashboard_Comment").attr("data-item-name");
    isMultiDashboard = parent.$("#isMultiDashboard").attr("data-item-id");
    parentDashboardId = parent.$("#isMultiDashboard").attr("data-parent-id");
    var widgetItemId = parent.$("#widget_Comment").attr("data-item-id");
    var widgetItemName = parent.$("#widget_Comment").attr("data-item-name");
    if (typeof (itemId) !== 'undefined' && itemId !== 'undefined' && $('#isWidgetComment').val() == 'true') {
        GetAllComments(itemId, itemType, dashboardItemId, "desc", isMultiDashboard);
    }

    var postmd = renderMde("#rte-post");
    cursorPos = postmd;
    $("#comment_action_slider").click(function () {
        cursorPos = postmd.value("");
        if (postmd.isPreviewActive()) {
            postmd.togglePreview();
        }
        $(".reply-form-container").html("");
        $(".reply-form-container").addClass("displayNone");
        $(".reply-form-container").attr("id", "");
        $('.edit-post').addClass("displayNone");
        $(".post-message").removeClass("displayNone");
        $('.edit-post').html("");
        $("#comment_action_area").hide();
        $("#comment_submit_container").show();
        $("#comment_action_area").addClass('isHide');
        $(".error-message").html("");

        refreshCommentScroller();
        setTimeout(function () {
            cursorPos.codemirror.focus(); cursorPos.codemirror.setCursor({ line: 0, ch: 0 });
        }, 500);
    });

    $('#comment_submit_container > .CodeMirror').on("keypress", "textarea", function (e) {
        var commentText = postmd.value();
        if (commentText.length >= 4000) {
            e.preventDefault();
        }
        else {
            elementNode = $('#comment_submit_container > .CodeMirror');
            userMentionInitializing(e, elementNode);
        }
    });

    $(document).on('click', ".header-comment-close", function () {
        postmd.value("");
        $("#comment_action_area").removeClass('isHide');
        $("#comment_action_area").show();
        $("#comment_submit_container").hide();
        refreshCommentScroller();
    });

    $('.sort-new').click(function () {
        GetAllComments(itemId, itemType, dashboardItemId, "desc", isMultiDashboard);
        $(".sort-new").addClass("sort-active");
        $(".sort-new").removeClass("sort-inactive");
        $(".sort-old").addClass("sort-inactive");
        $(".sort-old").removeClass("sort-active");
    });

    $('.sort-old').click(function () {
        GetAllComments(itemId, itemType, dashboardItemId, "asc", isMultiDashboard);
        $(".sort-new").addClass("sort-inactive");
        $(".sort-new").removeClass("sort-active");
        $(".sort-old").addClass("sort-active");
        $(".sort-old").removeClass("sort-inactive");
    });

    $(document).on('focus', 'textarea', function () {
        $('textarea').pastableTextarea();
    });

    $(document).on('click', '#post-comment', function () {

        if (isMultiDashboard.toLowerCase() == 'true') {
            if (itemType.toLowerCase() == 'dashboard') {
                itemId = parent.$("#dashboard_Comment").attr("data-item-id");
                dashboardItemId = itemId;
            }
        }

        var textAreaElementNode = $('#comment_submit_container > .CodeMirror');
        var userMention = splitUserMention(textAreaElementNode);
        var currentPageUrl = truncateUrl();
        var splitQuerystring = currentPageUrl.split("?");
        var querystring = "";
        if (splitQuerystring.length > 1) {
            querystring = splitQuerystring[1];
        }

        querystring = querystring.includes("embed_signature") || querystring.includes("isembed") ? "" : querystring;

        var splitUrl = currentPageUrl.split("/");

        if (isMultiDashboard.toLowerCase() == 'true') {
            querystring != "" ? currentPageUrl = "/" + splitUrl[1] + "/" + parentDashboardId + "/" + categoryName + "/" + itemName + "?" + querystring : currentPageUrl = "/" + splitUrl[1] + "/" + parentDashboardId + "/" + categoryName + "/" + itemName + '?tab=' + parent.$(dashboardTypeId).find("li.e-active").find("span").html().trim();
        }
        else if (itemType.toLowerCase() == 'dashboard') {
            querystring != "" ? currentPageUrl = "/" + splitUrl[1] + "/" + dashboardItemId + "/" + categoryName + "/" + itemName + "?" + querystring : currentPageUrl = "/" + splitUrl[1] + "/" + dashboardItemId + "/" + categoryName + "/" + itemName;
        }
        else if (itemType.toLowerCase() == 'widget') {
            if ($('#isWidgetComment').val() == "true") {
                querystring != "" ? currentPageUrl = "/" + splitUrl[1] + "/" + dashboardItemId + "/" + categoryName + "/" + itemName + "?" + querystring : currentPageUrl = "/" + splitUrl[1] + "/" + dashboardItemId + "/" + categoryName + "/" + itemName;
            } else {
                currentPageUrl = "/" + splitUrl[1] + "/" + widgetItemId + "/" + widgetItemName;
            }
        }
        var commentText = postmd.value();
        var commentHTML = postmd.options.previewRender(commentText).replace("#", "");
        commentText = getRelativePath(commentText);
        var commentOriginalValue = commentText;
        var commentTextValue = commentOriginalValue.replace("http://", '')
            .replace("https://", '')
            .replace("(", '')
            .replace(")", '')
            .replace("![]", '');
        if (isEmptyOrWhitespace(commentHTML.replace(/<[^>]*>!/ig, "")) || isEmptyOrWhitespace(commentTextValue)) {
            $(".error-message").html("<span class='validate-fail'>" + window.Server.App.LocalizationContent.CommentValidator + "</span>");
            return;
        }
        if (commentText.length > 4000) {
            $(".error-message").html("<span class='validate-fail'>" + window.Server.App.LocalizationContent.CommnetLengthValidator + "</span>");
            return;
        } else {
            $(".comment-area").val("");
            $(".error-message").html("");
            showWaitingPopup("parent-scroll-element");
            var itemRequest = { itemId: itemId, comment: commentText, itemType: itemType, dashboardItemId: dashboardItemId, url: decodeURI(currentPageUrl), UniqueUsersValue: userMention.uniqueUsersValue, UniqueGroupValue: userMention.uniqueGroupValue, MentionedAll: userMention.mentionedAll, isMultiDashboard: isMultiDashboard, currentDate: date, CommentAction: commentAction.Add };
            parent.ajaxPostCall("POST", addCommentUrl, itemRequest, null, OnCommentPosted, null, null);
        }
    });

    function OnCommentPosted(data) {
        if (data) {
            var addComment = "<li id='comment-"
                + data.Comments[0].Id + "'data-comment-id='"
                + data.Comments[0].Id + "' class='post'><div class='post-content'><div class='avatar-container'> <div class='user' data-userid='"
                + data.Comments[0].UserId + "'><div class='profile-pic-tag avatar' data-id='" + data.Comments[0].IdPReferenceId + "' data-type='user' data-display-name='"
                + data.Comments[0].UserDisplayName + "' data-image-size='32'></div> </div></div><div class='post-body'> <header><span class='post-byline col-xs-5 no-padding'><span title='"
                + data.Comments[0].UserDisplayName + "'class='author publisher-anchor-color'>"
                + data.Comments[0].UserDisplayName + "</span><span class='su su-status-active'></span></span><menu><li class='reply' title='" + window.Server.App.LocalizationContent.ReplyButton + "' data-toggle='tooltip' data-placement='bottom'> <a class='reply-comment'><span class='su su-reply'></span> </a></li><span class='dropdown-toggle option-icon' title='" + window.Server.App.LocalizationContent.Action + "' data-toggle='dropdown'><span class='su su-options-horizontal'></span></span><ul class='dropdown-menu' role='menu'><li class='edit' title='" + window.Server.App.LocalizationContent.EditButton + "'  data-toggle='tooltip' data-placement='top'> <a class='edit-comment'><span>" + window.Server.App.LocalizationContent.EditButton + "</span> </a></li><li class='delete' title='" + window.Server.App.LocalizationContent.Delete + "'  data-toggle='tooltip' data-placement='top'> <a class='delete-comment'><span>" + window.Server.App.LocalizationContent.Delete + "</span> </a></li></menu><span class='post-meta col-xs-9 no-padding'><a " + commentPermalinkHelper(data.Comments[0].Id) + " class='permalink'><span class='time-ago' title='"
                + data.Comments[0].CreatedDateString + " - " + data.Comments[0].TimeZoneName + "' data-html='false' data-toggle='tooltip' data-placement='right'>"
                + data.Comments[0].TimeAgo + "</span></a></span> </header> <div class='post-body-inner'><div class='edit-post displayNone'></div><div class='post-message'>"
                + data.Comments[0].HtmlComment + "</div><div class='markDownComment hidden'>"
                + data.Comments[0].MarkdownComment + "</div></div> <div class='footer'></div></div><div class='reply-form-container displayNone'></div><div class='col-xs-12 reply-count'><div class='col-xs-6 child-count'><span class='count-text'>0</span><span class='count-label'> " + window.Server.App.LocalizationContent.Replies + "</span></div><div class='col-xs-6 no-padding collapse-icon-container'><span class='su collapse-icon' data-toggle='collapse' data-target=''></span></div></div></div><ul class='children'></ul> </li>";
            if ($('.sort-old').hasClass('sort-active')) {
                $('.comment-list').append(addComment);
            } else {
                $('.comment-list').prepend(addComment);
            }

            $('.additional-content').html("");
            var cmntCount = parseInt($('#comment_count').text());
            $('#comment_count').text(cmntCount + 1);
            $('[data-toggle="tooltip"]').tooltip();
            postmd.value("");
            $("#comment_action_area").show();
            if ($(".watch-action").hasClass("watch")) {
                $("#watchItem").val("Unwatch");
                $("#watchItem").removeClass("watch").addClass("unwatch");
                $("#watch-text").removeClass("watch").addClass("unwatch");
                $("#watchItem").attr("data-original-title", window.Server.App.LocalizationContent.Unwatch);
            }
            hideWaitingPopup("parent-scroll-element");
            $("#comment_action_area").removeClass('isHide');
            $("#comment_action_area").show();
            $("#comment_submit_container").hide();
            refreshCommentScroller();
            addTarget_blank();
            $("#comment-" + data.Comments[0].Id).find('span.time-ago:first').click();
            if (cmntCount == 0) {
                if (itemType == "dashboard") {
                    if (!isSydjViewer) {
                        parent.$(dashboardTypeId).data(ejType).toggleDashboardComment();
                        parent.$("ul.options li#comments span.su-without-comment").addClass("su-with-comment").removeClass("su-without-comment");
                    }
                    else {
                        parent.$("#dashboard-comment").removeClass('su-without-comment').addClass('su-with-comment');
                    }
                } else {
                    if (parent.$(dashboardTypeId).data(ejType) != null) {
                        if (isSydjViewer) {
                            parent.$("[data-widget-id='" + itemId + "']").find('.su-without-comment').removeClass('su-without-comment').addClass('su-with-comment');
                        } else {
                            parent.$(dashboardTypeId).data(ejType).dynamicwithCommentIconChange(itemId);
                        }
                    }
                    if (parent.$('#widget').data(ejType) != null) {
                        wid = parent.$(".e-dbrd-control-container").attr("id");
                        if (isSydjViewer) {
                            parent.$("[data-widget-id='" + wid + "']").find('.su-without-comment').removeClass('su-without-comment').addClass('su-with-comment');
                        } else {
                            parent.$('#widget').data(ejType).dynamicwithCommentIconChange(wid);
                        }
                        parent.$('.server-comment').removeClass('su-without-comment').addClass('su-with-comment');
                    }
                }
            }
            $(".post-message > p > img").load(function () {
                refreshCommentScroller();
            });
        } else {
            hideWaitingPopup("parent-scroll-element");
            parent.frames[1].messageBox("su-open", window.Server.App.LocalizationContent.AddComment, window.Server.App.LocalizationContent.AddCommentFail, "success", function () {
                parent.frames[1].onCloseMessageBox();
            });
        }

        generateProfileAvatar();
    }

    $(document).on('click', '.edit-comment', function () {
        postmd.value("");
        var permaLinkAnchor = $(this).parents("menu").siblings(".post-meta").find("a.permalink");
        var postId = $(permaLinkAnchor).attr("href").split('comment-')[1];
        if (typeof (postId) === "undefined") {
            postId = $(permaLinkAnchor).attr("href").split('comment=')[1];
        }
        $(permaLinkAnchor).attr("href", "#comment-" + postId);
        $(permaLinkAnchor).attr("target", "");
        var commentId = $(this).parents(".post").attr("data-comment-id");
        $("#comment_action_area").removeClass('isHide');
        $("#comment_action_area").show();
        $("#comment_submit_container").hide();
        $(".reply-form-container").html("");
        $(".reply-form-container").addClass("displayNone");
        $(".reply-form-container").attr("id", "");
        $('.edit-post').addClass("displayNone");
        $(".post-message").removeClass("displayNone");
        $('.edit-post').html("");
        $(this).closest('div').find('.edit-post').html("<div class='edit'><textarea id='edit_comment_" + commentId + "' class='form-control edit-text' placeholder='' style='overflow: hidden;'></textarea><span class='message'>*" + window.Server.App.LocalizationContent.CommentWords + "</span><span class='error-message-edit'></span><div class='temp-post'><button class='edit-cancel secondary-button pull-right'>" + window.Server.App.LocalizationContent.CancelButton + "</button><button id ='save-edit' class='primary-button pull-right' type='submit'>" + window.Server.App.LocalizationContent.SaveButton + "</button></div></div>");
        var editMd = renderMde("#edit_comment_" + commentId);
        cursorPos = editMd;
        $(this).closest('div').find(".post-message").addClass("displayNone");
        $(this).closest('div').find('.edit-post').removeClass("displayNone");
        refreshCommentScroller();
        $(permaLinkAnchor).find("span.time-ago").click();
        var commentEditText = $(this).closest('div').find(".markDownComment").text();
        var commentEditReplace = commentEditText.match(/(?:\!\[\]\((.*?)\))/g);
        var tag = [];
        if (commentEditReplace != null) {
            for (var j = 0; j < commentEditReplace.length; j++) {
                tag[j] = commentEditReplace[j].split(/[\(\\!\[\ \]\\)\s]+/);
                tag[j] = $.grep(tag[j], function (n) {
                    return (n);
                });
            }
            var url = "";
            for (var i = 0; i < tag.length; i++) {
                tag[i] = tag[i].toString();
                if (tag[i].indexOf("image-") !== -1) {
                    var imageName = tag[i].split("/");
                    for (var k = 0; k < imageName.length; k++) {
                        if (imageName[k].indexOf("image-") !== -1) {
                            commentEditText = commentEditText.replace(tag[i], imageName[k]);
                        }
                    }

                }
            }
        }
        editMd.value(commentEditText);
        setTimeout(function () { cursorPos.codemirror.focus() }, 200);
        cursorPos.codemirror.setCursor({ line: commentEditText.length, ch: commentEditText.length });
        if (parent.$("#is_mobile").val() == "false") {
            $("#save-edit").prop('disabled', 'true');
        }
        var originalText = $(this).closest('div').find(".markDownComment").text();
        $('.CodeMirror').on("keypress keyup", "textarea", function (e) {
            var commentText = editMd.value();
            if (commentText.length >= 4000) {
                e.preventDefault();
            }
            else {
                elementNode = $("#edit_comment_" + commentId).parent();
                userMentionInitializing(e, elementNode);
            }
            if (originalText != commentText.trim()) {
                $("#save-edit").removeAttr('disabled');
            } else {
                $("#save-edit").prop('disabled', 'true');
            }
        });

        $('.editor-toolbar').on("click", function (e) {
            $('textarea').keypress();
        });

        $("#save-edit").on('click', function () {
            if (isMultiDashboard.toLowerCase() == 'true') {
                if (itemType.toLowerCase() == 'dashboard') {
                    itemId = parent.$("#dashboard_Comment").attr("data-item-id");
                    dashboardItemId = itemId;
                }
            }
            var currentPageUrl = truncateUrl();
            var splitQuerystring = currentPageUrl.split("?");
            var querystring = "";
            if (splitQuerystring.length > 1) {
                querystring = splitQuerystring[1];
            }

            querystring = querystring.includes("embed_signature") || querystring.includes("isembed") ? "" : querystring;

            var splitUrl = currentPageUrl.split("/");

            if (isMultiDashboard.toLowerCase() == 'true') {
                querystring != "" ? currentPageUrl = "/" + splitUrl[1] + "/" + parentDashboardId + "/" + categoryName + "/" + itemName + "?" + querystring : currentPageUrl = "/" + splitUrl[1] + "/" + parentDashboardId + "/" + categoryName + "/" + itemName + '?tab=' + parent.$(dashboardTypeId).find("li.e-active").find("span").html().trim();
            }
            else if (itemType.toLowerCase() == 'dashboard') {
                querystring != "" ? currentPageUrl = "/" + splitUrl[1] + "/" + dashboardItemId + "/" + categoryName + "/" + itemName + "?" + querystring : currentPageUrl = "/" + splitUrl[1] + "/" + dashboardItemId + "/" + categoryName + "/" + itemName;
            }
            else if (itemType.toLowerCase() == 'widget') {
                if ($('#isWidgetComment').val() == "true") {
                    querystring != "" ? currentPageUrl = "/" + splitUrl[1] + "/" + dashboardItemId + "/" + categoryName + "/" + itemName + "?" + querystring : currentPageUrl = "/" + splitUrl[1] + "/" + dashboardItemId + "/" + categoryName + "/" + itemName;
                } else {
                    currentPageUrl = "/" + splitUrl[1] + "/" + widgetItemId + "/" + widgetItemName;
                }
            }

            var commentText = editMd.value();
            commentText = getRelativePath(commentText);
            var commentId = $(this).closest('.post').attr('data-comment-id');
            var textAreaElementNode = $("#edit_comment_" + commentId).parent();
            var userMention = splitUserMention(textAreaElementNode);
            var commentHTML = editMd.options.previewRender(commentText).replace("#", "");
            var commentOriginalValue = commentText;
            var commentTextValue = commentOriginalValue.replace("http://", '')
                .replace("https://", '')
                .replace("(", '')
                .replace(")", '')
                .replace("![]", '');
            if (isEmptyOrWhitespace(commentHTML.replace(/<[^>]*>!/ig, "")) || isEmptyOrWhitespace(commentTextValue)) {
                $('.edit-text').addClass("inactive-box");
                $(".error-message-edit").html("<span class='validate-fail'>" + window.Server.App.LocalizationContent.CommentValidator + "</span>");
                return;
            }
            if (commentText.length > 4000) {
                $('.reply-text').addClass("inactive-box");
                $(".error-message-edit").html("<span class='validate-fail'>" + window.Server.App.LocalizationContent.CommnetLengthValidator + "</span>");
                return;
            } else {
                showWaitingPopup($('#save-edit').parentsUntil('.post').find('.edit-post'));
                var itemRequest = { itemId: itemId, comment: commentText, commentId: commentId, itemType: itemType, dashboardItemId: dashboardItemId, url: decodeURI(currentPageUrl), uniqueUsersValue: userMention.uniqueUsersValue, uniqueGroupValue: userMention.uniqueGroupValue, mentionedAll: userMention.mentionedAll, isMultiDashboard: isMultiDashboard, commentAction: commentAction.Edit, currentDate: date };
                parent.ajaxPostCall("POST", editCommentUrl, itemRequest, null, OnCommentEdited, null, null);
            }
        });

        $(".edit-cancel").on('click', function () {
            $(".post-message").removeClass("displayNone");
            $('.edit-post').addClass("displayNone");
            $(".edit-post").html("");
            $(".error-message-edit").html("");
            refreshCommentScroller();
        });
    });

    function OnCommentEdited(data) {
        if (data) {
            $("#save-edit").parentsUntil('.post').find('.post-message').html(data.Comments[0].HtmlComment);
            $("#save-edit").parentsUntil('.post').find('.markDownComment').html(data.Comments[0].MarkdownComment);
            $("#save-edit").parentsUntil('.post').find('.post-message').removeClass("displayNone");
            if ($(".watch-action").hasClass("watch")) {
                $("#watchItem").val("Unwatch");
                $("#watchItem").removeClass("watch").addClass("unwatch");
                $("#watch-text").removeClass("watch").addClass("unwatch");
                $("#watchItem").attr("data-original-title", window.Server.App.LocalizationContent.Unwatch);
            }

            hideWaitingPopup($('#save-edit').parentsUntil('.post').find('.edit-post'));
            $('.edit-post').addClass("displayNone");
            $(".edit-post").html("");
            refreshCommentScroller();
            addTarget_blank();
        } else {
            parent.frames[1].messageBox("su-open", window.Server.App.LocalizationContent.EditComment, window.Server.App.LocalizationContent.EditCommentFail, "success", function () {
                parent.frames[1].onCloseMessageBox();
            });
            hideWaitingPopup($('#save-edit').parentsUntil('.post').find('.edit-post'));
        }
    }

    $(document).on('click', '.reply-comment', function () {
        postmd.value("");
        var permaLinkAnchor = $(this).parents("menu").siblings(".post-meta").find("a.permalink");
        var postId = $(permaLinkAnchor).attr("href").split('comment-')[1];
        if (typeof (postId) === "undefined") {
            postId = $(permaLinkAnchor).attr("href").split('comment=')[1];
        }
        $(permaLinkAnchor).attr("href", "#comment-" + postId);
        $(permaLinkAnchor).attr("target", "");
        var commentId = $(this).parents(".post").attr("data-comment-id");
        $("#comment_action_area").removeClass('isHide');
        $("#comment_action_area").show();
        $("#comment_submit_container").hide();
        $(".post-message").removeClass("displayNone");
        $('.edit-post').addClass("displayNone");
        $('.edit-post').html("");
        $(".reply-form-container").html("");
        $(".reply-form-container").addClass("displayNone");
        $(".reply-form-container").attr("id", "");
        $(this).closest('div').parent().parent().find(".reply-form-container").html("<textarea id='replyto_comment_" + commentId + "' class='form-control reply-text' maxlength='4000' style='overflow: hidden;'></textarea><span class='message'>*" + window.Server.App.LocalizationContent.CommentWords + "</span><div class='reply-comment-footer'><span class='error-message-reply'></span><button class='reply-cancel secondary-button pull-right'>" + window.Server.App.LocalizationContent.CancelButton + "</button><input id='post-reply' class='primary-button pull-right' value='" + window.Server.App.LocalizationContent.ReplyButton + "' type='submit'></div>");
        var replyMd = renderMde("#replyto_comment_" + commentId);
        cursorPos = replyMd;
        $(this).closest('div').parent().parent().find(".reply-form-container").attr("id", "replyComment");
        $("#replyComment").removeClass("displayNone");
        refreshCommentScroller();
        $(permaLinkAnchor).find("span.time-ago").click();
        setTimeout(function () { cursorPos.codemirror.focus(); }, 200);
        cursorPos.codemirror.setCursor({ line: 0, ch: 0 });
        $('#replyComment > .CodeMirror').on("keypress", "textarea", function (e) {
            var commentText = replyMd.value();
            if (commentText.length >= 4000) {
                e.preventDefault();
            } else {
                elementNode = $('#replyComment > .CodeMirror');
                userMentionInitializing(e, elementNode);
            }
        });
        $("#post-reply").on('click', function () {
            if (isMultiDashboard.toLowerCase() === 'true') {
                if (itemType.toLowerCase() === 'dashboard') {
                    itemId = parent.$("#dashboard_Comment").attr("data-item-id");
                    dashboardItemId = itemId;
                }
            }
            var currentPageUrl = truncateUrl();
            var splitQuerystring = currentPageUrl.split("?");
            var querystring = "";
            if (splitQuerystring.length > 1) {
                querystring = splitQuerystring[1];
            }

            querystring = querystring.includes("embed_signature") || querystring.includes("isembed") ? "" : querystring;

            var splitUrl = currentPageUrl.split("/");

            if (isMultiDashboard.toLowerCase() === 'true') {
                querystring !== "" ? currentPageUrl = "/" + splitUrl[1] + "/" + parentDashboardId + "/" + categoryName + "/" + itemName + "?" + querystring : currentPageUrl = "/" + splitUrl[1] + "/" + parentDashboardId + "/" + categoryName + "/" + itemName + '?tab=' + parent.$(dashboardTypeId).find("li.e-active").find("span").html().trim();
            }
            else if (itemType.toLowerCase() === 'dashboard') {
                querystring !== "" ? currentPageUrl = "/" + splitUrl[1] + "/" + dashboardItemId + "/" + categoryName + "/" + itemName + "?" + querystring : currentPageUrl = "/" + splitUrl[1] + "/" + dashboardItemId + "/" + categoryName + "/" + itemName;
            }
            else if (itemType.toLowerCase() === 'widget') {
                if ($('#isWidgetComment').val() === "true") {
                    querystring !== "" ? currentPageUrl = "/" + splitUrl[1] + "/" + dashboardItemId + "/" + categoryName + "/" + itemName + "?" + querystring : currentPageUrl = "/" + splitUrl[1] + "/" + dashboardItemId + "/" + categoryName + "/" + itemName;
                } else {
                    currentPageUrl = "/" + splitUrl[1] + "/" + widgetItemId + "/" + widgetItemName;
                }
            }
            var commentText = replyMd.value();
            var textAreaElementNode = $('#replyComment > .CodeMirror');
            var userMention = splitUserMention(textAreaElementNode);
            commentText = getRelativePath(commentText);
            var parentId = $(this).closest('.post').attr('data-comment-id');
            var addComment = "";
            var commentHTML = replyMd.options.previewRender(commentText).replace("#", "");
            var commentOriginalValue = commentText;
            var commentTextValue = commentOriginalValue.replace("http://", '')
                .replace("https://", '')
                .replace("(", '')
                .replace(")", '')
                .replace("![]", '');
            if (isEmptyOrWhitespace(commentHTML.replace(/<[^>]*>!/ig, "")) || isEmptyOrWhitespace(commentTextValue)) {
                $('.reply-text').addClass("inactive-box");
                $(".error-message-reply").html("<span class='validate-fail'>" + window.Server.App.LocalizationContent.ReplyValidator + "</span>");
                return;
            }
            if (commentText.length > 4000) {
                $('.reply-text').addClass("inactive-box");
                $(".error-message-reply").html("<span class='validate-fail'>" + window.Server.App.LocalizationContent.ReplayContenLength + "</span>");
                return;
            } else {
                showWaitingPopup("replyComment");
                var itemRequest = { itemId: itemId, comment: commentText, parentId: parentId, itemType: itemType, dashboardItemId: dashboardItemId, url: decodeURI(currentPageUrl), uniqueUsersValue: userMention.uniqueUsersValue, uniqueGroupValue: userMention.uniqueGroupValue, mentionedAll: userMention.mentionedAll, isMultiDashboard: isMultiDashboard, currentDate: date, CommentAction: commentAction.Add };
                parent.ajaxPostCall("POST", addCommentUrl, itemRequest, null, OnReplyPosted, null, null);
            }
        });
        $(".reply-cancel").on('click', function () {
            $("#replyComment").addClass("displayNone");
            $(".reply-form-container").html("");
            $(".reply-form-container").attr("id", "");
            $(".error-message-reply").html("");
            refreshCommentScroller();
        });
    });

    function OnReplyPosted(data) {
        if (data) {
            addComment = "<li id='comment-"
                + data.Comments[0].Id + "'data-comment-id='"
                + data.Comments[0].Id + "' class='post collapse in'><div class='post-content'><div class='avatar-container'> <div class='user' data-userid='"
                + data.Comments[0].UserId + "'><div class='profile-pic-tag avatar' data-id='" + data.Comments[0].IdPReferenceId + "' data-type='user' data-display-name='"
                + data.Comments[0].UserDisplayName + "' data-image-size='32'></div></div></div><div class='post-body'> <header><span class='post-byline col-xs-5 no-padding'><span title='"
                + data.Comments[0].UserDisplayName + "'class='author publisher-anchor-color'>"
                + data.Comments[0].UserDisplayName + "</span><span class='su su-status-active'></span></span><menu>";
            addComment += "<li class='reply' title='" + window.Server.App.LocalizationContent.ReplyButton + "'data-toggle='tooltip' data-placement='bottom'> <a class='reply-comment'><span class='su su-reply'></span> </a></li><span class='dropdown-toggle option-icon' title='" + window.Server.App.LocalizationContent.Action + "' data-toggle='dropdown'><span class='su su-options-horizontal'></span></span><ul class='dropdown-menu' role='menu'><li class='edit' title='" + window.Server.App.LocalizationContent.EditButton + "'  data-toggle='tooltip' data-placement='top'> <a class='edit-comment'><span>" + window.Server.App.LocalizationContent.EditButton + "</span> </a></li><li class='delete' title='" + window.Server.App.LocalizationContent.Delete + "'  data-toggle='tooltip' data-placement='top'> <a class='delete-comment'><span>" + window.Server.App.LocalizationContent.Delete + "</span> </a></li><li class='parent' data-parent-id='"
                + data.Comments[0].ParentId + "' title='" + window.Server.App.LocalizationContent.Replied + " "
                + $('#replyComment').parents('.post').find('.author').attr('title') + "'> <a class='parent-name'><span>" + window.Server.App.LocalizationContent.ShowParent + "</span> </a></li></ul></menu><span class='post-meta col-xs-9 no-padding'><a " + commentPermalinkHelper(data.Comments[0].Id) + " class='permalink'><span class='time-ago' title='"
                + data.Comments[0].CreatedDateString + " - " + data.Comments[0].TimeZoneName + "'data-html='false' data-toggle='tooltip' data-placement='right'>"
                + data.Comments[0].TimeAgo + "</span></a></span> </header> <div class='post-body-inner'><div class='edit-post displayNone'></div><div class='post-message'>"
                + data.Comments[0].HtmlComment + "</div><div class='markDownComment hidden'>"
                + data.Comments[0].MarkdownComment + "</div> </div> <div class='footer'></div></div><div class='reply-form-container displayNone'></div><div class='col-xs-12 reply-count'><div class='col-xs-6 child-count'><span class='count-text'>0</span><span class='count-label'> " + window.Server.App.LocalizationContent.Replies + "</span></div><div class='col-xs-6 no-padding collapse-icon-container'><span class='su collapse-icon' data-toggle='collapse' data-target=''></span></div></div></div><ul class='children'></ul> </li>";
            $("#post-reply").closest('.post-content').siblings().prepend(addComment);
            $(".reply-form-container").html("");
            $("#replyComment").addClass("displayNone");
            $('.comment-list').find('.post').find('.post').find('.children').addClass('no-left-padding');
            $('#comment_count').text(parseInt($('#comment_count').text()) + 1);
            $('[data-toggle="tooltip"]').tooltip();
            $("#replyComment").parent().find('.count-text').text(parseInt($("#replyComment").parent().find('.count-text').text()) + 1);
            if (parseInt($("#replyComment").parent().find('.count-text').text()) == 1) {
                $("#replyComment").parent().find('.count-label').text(" reply");
            } else {
                $("#replyComment").parent().find('.count-label').text(" replies")
            }
            $("#replyComment").parent().find('.collapse-icon').addClass('su-vertical-collapse');
            $("#replyComment").parent().find('.reply-count').addClass('hasChild');
            if ($(".watch-action").hasClass("watch")) {
                $("#watchItem").val("Unwatch");
                $("#watchItem").removeClass("watch").addClass("unwatch");
                $("#watch-text").removeClass("watch").addClass("unwatch");
                $("#watchItem").attr("data-original-title", window.Server.App.LocalizationContent.Unwatch);
            }
            hideWaitingPopup("replyComment");
            $('#replyComment').removeClass('e-waitingpopup e-js');
            $(".reply-form-container").attr("id", "");
            refreshCommentScroller();
            addTarget_blank();
            generateProfileAvatar();
        } else {
            $("#replyComment").addClass("displayNone");
            hideWaitingPopup("replyComment");
            $(".reply-form-container").attr("id", "");
            parent.frames[1].messageBox("su-open", window.Server.App.LocalizationContent.ReplyButton, window.Server.App.LocalizationContent.ReplyFail, "success", function () {
                parent.frames[1].onCloseMessageBox();
            });
            refreshCommentScroller();
        }
    }

    $(document).on('click', '.delete-comment', function () {
        if (isMultiDashboard.toLowerCase() == 'true') {
            if (itemType.toLowerCase() == 'dashboard') {
                itemId = parent.$("#dashboard_Comment").attr("data-item-id");
                dashboardItemId = itemId;
            }
        }
        var currentPageUrl = truncateUrl();
        var splitQuerystring = currentPageUrl.split("?");
        var querystring = "";
        if (splitQuerystring.length > 1) {
            querystring = splitQuerystring[1];
        }

        querystring = querystring.includes("embed_signature") || querystring.includes("isembed") ? "" : querystring;

        var splitUrl = currentPageUrl.split("/");

        if (isMultiDashboard.toLowerCase() === 'true') {
            querystring !== "" ? currentPageUrl = "/" + splitUrl[1] + "/" + parentDashboardId + "/" + categoryName + "/" + itemName + "?" + querystring : currentPageUrl = "/" + splitUrl[1] + "/" + parentDashboardId + "/" + categoryName + "/" + itemName + '?tab=' + parent.$(dashboardTypeId).find("li.e-active").find("span").html().trim();
        }
        else if (itemType.toLowerCase() === 'dashboard') {
            querystring !== "" ? currentPageUrl = "/" + splitUrl[1] + "/" + dashboardItemId + "/" + categoryName + "/" + itemName + "?" + querystring : currentPageUrl = "/" + splitUrl[1] + "/" + dashboardItemId + "/" + categoryName + "/" + itemName;
        }
        else if (itemType.toLowerCase() === 'widget') {
            if ($('#isWidgetComment').val() === "true") {
                querystring !== "" ? currentPageUrl = "/" + splitUrl[1] + "/" + dashboardItemId + "/" + categoryName + "/" + itemName + "?" + querystring : currentPageUrl = "/" + splitUrl[1] + "/" + dashboardItemId + "/" + categoryName + "/" + itemName;
            } else {
                currentPageUrl = "/" + splitUrl[1] + "/" + widgetItemId + "/" + widgetItemName;
            }
        }
        var commentId = $(this).closest('.post').attr('data-comment-id');
        var postId = $(this).closest('.post').attr('id');
        deletedCommentId = postId;
        parent.messageBox("su-delete", window.Server.App.LocalizationContent.DeleteComment, window.Server.App.LocalizationContent.DeleteComentConfirm, "error", function () {
            var messageboxWaitingPopupTemplateIdId = parent.createLoader("messageBox_wrapper");
            $("#messageBox_wrapper").ejWaitingPopup({ template: parent.$("#" + messageboxWaitingPopupTemplateIdId) });
            $("#messageBox_wrapper").ejWaitingPopup("show");
            var itemRequest = { itemId: itemId, commentId: commentId, itemType: itemType, dashboardItemId: dashboardItemId, url: decodeURI(currentPageUrl), isMultiDashboard: isMultiDashboard, commentAction: commentAction.Delete, currentDate: date };
            parent.ajaxPostCall("POST", deleteCommentUrl, itemRequest, null, OnCommentDeleted, null, null);
        });
    });

    function OnCommentDeleted(data) {
        if (data) {
            var postId = deletedCommentId;
            parent.messageBox("su-delete", window.Server.App.LocalizationContent.DeleteComment, window.Server.App.LocalizationContent.DeleteCommnetSuccess, "success", function () {
                if ($("#" + postId).find(".children").html() == "" || $("#" + postId).find('.user').length == 1) {
                    $("#" + postId).html("");
                } else {
                    $("#" + postId).find(".avatar-container:first").html("<img src='" + avatarUrl + "' class='avatar'>");
                    $("#" + postId).find(".post-body:first").html("<header><span class='post-byline col-xs-5 no-padding'></span><span class='post-meta col-xs-9 no-padding'></span><menu class='deleted-post'><li class='reply' > <span class='su su-reply'></span> </li><span class='dropdown-toggle option-icon' ><span class='su su-options-horizontal'></span></span></menu> </header> <div class='post-body-inner'><div class='post-message deleted-message'><span class='su su-warning'></span><span>" + window.Server.App.LocalizationContent.DeletedMessage + "</span></div> </div>");
                }
                if ($("#" + postId).parents(".post:first").find('.post-content').find('.user').length == 0) {
                    $("#" + postId).parents(".post:first").html("");
                }
                parent.onCloseMessageBox();
                var cmntCount = parseInt($('#comment_count').text());
                $('#comment_count').text(cmntCount - 1);
                var replyCount = parseInt($("#" + postId).parents('.post:first').find('.count-text:first').html());
                if (replyCount == 1) {
                    $("#" + postId).parents('.post:first').find('.collapse-icon:first').removeClass('su-vertical-collapse');
                    $("#" + postId).parents('.post:first').find('.reply-count:first').removeClass('hasChild');
                }
                if (replyCount == 2) {
                    $("#" + postId).parents('.post:first').find('.count-label:first').html(" reply");
                }
                $("#" + postId).parents('.post:first').find('.count-text:first').html(replyCount - 1);
                refreshCommentScroller();
                if (cmntCount == 1) {
                    if (itemType == "dashboard") {
                        if (!isSydjViewer) {
                            parent.$(dashboardTypeId).data(ejType).toggleDashboardComment();
                            parent.$("ul.options li#comments span.su-with-comment").removeClass('su-with-comment').addClass('su-without-comment');
                        }
                        else {
                            parent.$("#dashboard-comment").removeClass('su-with-comment').addClass('su-without-comment');
                        }
                        $('.additional-content').html("<h5>" + window.Server.App.LocalizationContent.NoComments + "</h5>");
                    } else {
                        if (parent.$(dashboardTypeId).data(ejType) != null) {
                            if (isSydjViewer) {
                                parent.$("[data-widget-id='" + itemId + "']").find('.su-with-comment').removeClass('su-with-comment').addClass('su-without-comment');
                            } else {
                                parent.$(dashboardTypeId).data(ejType).dynamicwithoutCommentIconChange(itemId);
                            }
                            $('.additional-content').html("<h5>" + window.Server.App.LocalizationContent.NoComments + "</h5>");
                        }
                        if (parent.$('#widget').data(ejType) != null) {
                            wid = parent.$(".e-dbrd-control-container").attr("id");
                            if (isSydjViewer) {
                                parent.$("[data-widget-id='" + wid + "']").find('.su-with-comment').removeClass('su-with-comment').addClass('su-without-comment');
                            } else {
                                parent.$('#widget').data(ejType).dynamicwithoutCommentIconChange(wid);
                            }
                            $('.additional-content').html("<h5>" + window.Server.App.LocalizationContent.NoComments + "</h5>");
                            parent.$('.server-comment').removeClass('su-with-comment').addClass('su-without-comment');
                        }
                    }
                }
            });
        } else {
            parent.messageBox("su-delete", window.Server.App.LocalizationContent.DeleteComment, window.Server.App.LocalizationContent.DeleteCommentFail, "success", function () {
                parent.onCloseMessageBox();
            });
        }
        $("#messageBox_wrapper").ejWaitingPopup("hide");
    }

    $(document).on('click', '.watch-action', function () {
        if (!$(this).hasClass("disable-post")) {
            $('.watch-action').addClass("disable-post");
            if ($(this).hasClass("watch")) {
                var itemRequest = { itemId: itemId, isWatch: true, currentDate: date }
                parent.ajaxPostCall("POST", watchUrl, itemRequest, null, OnCommentWatched, null, null);
            }
            else {
                var itemRequest = { itemId: itemId, isWatch: false, currentDate: date };
                parent.ajaxPostCall("POST", unWatchUrl, itemRequest, null, OnCommentUnWatched, null, null);
            }
        }
    });

    function OnCommentWatched(data) {
        if (data) {
            $("#watchItem").val("Unwatch");
            $("#watchItem").removeClass("watch").addClass("unwatch");
            $("#watch-text").removeClass("watch").addClass("unwatch");
            $("#watchItem").attr("data-original-title", window.Server.App.LocalizationContent.Unwatch);
        } else {
            parent.frames[1].messageBox("su-eye", window.Server.App.LocalizationContent.AddWatch, window.Server.App.LocalizationContent.WatchFail, "success", function () {
                parent.frames[1].onCloseMessageBox();
            });
        }
        $('.watch-action').removeClass("disable-post");
    }

    function OnCommentUnWatched(data) {
        if (data) {
            $("#watchItem").val("Watch");
            $("#watchItem").removeClass("unwatch").addClass("watch");
            $("#watch-text").removeClass("unwatch").addClass("watch");
            $("#watchItem").attr("data-original-title", window.Server.App.LocalizationContent.Watch);
        } else {
            parent.frames[1].messageBox("su-eye", window.Server.App.LocalizationContent.Unwatch, window.Server.App.LocalizationContent.UnWatchFail, "success", function () {
                parent.frames[1].onCloseMessageBox();
            });
        }
        $('.watch-action').removeClass("disable-post");
    }

    $(document).on('click', '.parent', function () {
        var postNum = "#comment-" + $(this).attr('data-parent-id');
        var postId = $(postNum).find('.permalink:first').attr("href").split('comment-')[1];
        if (typeof (postId) === "undefined") {
            postId = $(postNum).find('.permalink:first').attr("href").split('comment=')[1];
        }
        $(postNum).find('.permalink:first').attr("href", "#comment-" + postId);
        $(postNum).find('.permalink:first').attr("target", "");
        if (!$(postNum).isOnScreen()) {
            $(postNum).find('.time-ago:first').click();
        }
        $(postNum).find('.post-content:first').css({
            "background-color": "#F4E4AE"
        });

        if (i_am_ie9) {
            $(postNum).find('.post-content:first').css('backgroundColor', 'hsl(46,76%,82%');
            var d = 3000;
            for (var i = 82; i <= 100; i = i + 0.1) {
                d += 10;
                (function (ii, dd) {
                    setTimeout(function () {
                        $(postNum).find('.post-content:first').css('backgroundColor', 'hsl(46,76%,' + ii + '%)');
                    }, dd);
                })(i, d);
            }
        } else {
            setTimeout(function () {
                $(postNum).find('.post-content:first').css({
                    transition: 'background-color 5s ease-in-out',
                    "background-color": "inherit"
                });
            }, 20);
            setTimeout(function () {
                $(postNum).find('.post-content:first').attr('style', '');
            }, 4000);
        }
    });

    $(document).on('mousedown', '.permalink', function (e) {
        postId = $(this).attr("href").split('comment-')[1];
        if (typeof (postId) == "undefined") {
            postId = $(this).attr("href").split('comment=')[1];
        }
        if (e.which == 2 || e.which == 3) {
            var url = parent.document.URL;
            if (parent.window.location.href.indexOf("?comment") != -1 || parent.window.location.href.indexOf("?") == -1) {
                url = url.split('?comment=')[0];
                $(this).attr("href", url + "?comment=" + postId);
            } else {
                url = url.split('&comment=')[0];
                $(this).attr("href", url + "&comment=" + postId);
            }
            $(this).attr("target", "_blank");
        }

        if (e.which == 1) {
            $(this).attr("href", "#comment-" + postId);
            $(this).attr("target", "");
        }
    });

    $(document).on('click', ".hasChild", function () {
        if ($(this).find('.collapse-icon').hasClass("su-vertical-expand")) {
            $(this).find('.collapse-icon').parents(".post-content").siblings("ul.children").slideDown('slow', function () {
                refreshCommentScroller();
            });
            $(this).find('.collapse-icon').addClass("su-vertical-collapse");
            $(this).find('.collapse-icon').removeClass("su-vertical-expand");
            $(this).find('.collapse-icon').parents(".reply-count").removeClass("expanded");
            $(this).find('.collapse-icon').attr('title', window.Server.App.LocalizationContent.Collapse);
        } else {
            $(this).find('.collapse-icon').parents(".post-content").siblings("ul.children").slideUp('slow', function () {
                refreshCommentScroller();
            });
            $(this).find('.collapse-icon').addClass("su-vertical-expand");
            $(this).find('.collapse-icon').removeClass("su-vertical-collapse");
            $(this).find('.collapse-icon').parents(".reply-count").addClass("expanded");
            $(this).find('.collapse-icon').attr('title', window.Server.App.LocalizationContent.Expand);
        }
    });

    $(document).on('mouseover', '#comment-image-file,#comment-image-edit-file', function () {
        var commentImageExtension;
        var commentImageFileName;
        var currentDate = $.now();
        var itemType = $("#itemType").attr("data-item-type").toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
        });
        $('#comment-image-file,#comment-image-edit-file').ejUploadbox({
            saveUrl: fileUploadUrl + "?imageType=commentimage&&timeStamp=" + currentDate + "&&itemId=" + itemId + "&&itemType=" + itemType,
            autoUpload: true,
            showFileDetails: false,
            multipleFilesSelection: false,
            buttonText: {
                browse: ""
            },
            width: "29px",
            height: "29px",
            showBrowseButton: false,
            extensionsAllow: ".PNG,.png,.jpg,.JPG,.jpeg,.JPEG",
            begin: function () {
                showWaitingPopup("parent-scroll-element");
            },
            fileSelect: function (e) {
                $(".confirmatioMessage").hide();
                commentImageExtension = e.files[0].extension.toLowerCase();
                commentImageFileName = e.files[0].name;
            },
            error: function (e) {
                if (commentImageExtension != ".png" && commentImageExtension != ".jpg" && commentImageExtension != ".jpeg") {
                    $(".error-message").html("<span class='validate-fail'>" + window.Server.App.LocalizationContent.FileFormatNotsupport + "</span>");
                    return;
                }
            },
            complete: function selectedFile(e) {
                if (e.responseText != "" && e.responseText.indexOf("image-") !== -1) {
                    var imageFileName = e.responseText.split(";");
                    var content = " ![](" + imageFileName[1] + ")";
                    $('textarea').focus();
                    cursorPos.codemirror.replaceSelection(content);
                    hideWaitingPopup("parent-scroll-element");
                    $('textarea').keypress();
                }
            }
        });
        $("#comment-image-file_SelectButton,#comment-image-file,#comment-image-edit-file,.e-uploadinput").attr('title', window.Server.App.LocalizationContent.UploadImage);
    });

    parent.$("#commentImage_popup").ejDialog({
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        showHeader: false,
        enableModal: true,
        close: "commentImageDialogClose",
        closeOnEscape: true
    });

    $(document).on('click', ".post-message > p > img", function () {
        var windowHeight;
        if ($(".base-comment-container").hasClass("widget-comment")) {
            windowHeight = $(window).height() + 300;
        }
        else {
            windowHeight = $(window).height();
        }
        var windowWidth = parent.$(dashboardTypeId).width() == null ? parent.$("#widget").width() : parent.$(dashboardTypeId).width();
        var srcImage = $(this).attr("src");
        var width, height, popupImageHeight, popupImageWidth;
        var tmpImg = new Image();
        tmpImg.src = srcImage;
        $(tmpImg).on('load', function () {
            width = tmpImg.width;
            height = tmpImg.height;
            if (windowHeight > height) {
                if ((windowHeight - height) > 40) {
                    popupImageHeight = height;
                }
                else {
                    height = windowHeight - ((7 / 100) * windowHeight);
                    popupImageHeight = height;
                }
                parent.$("#commentImage_popup_wrapper").css({ 'height': popupImageHeight });
                parent.$("#commentImage_popup_image,#commentImage_popup,#PopupContainer,#commentImage_popup_wrapper .e-dialog-scroller").css({ 'height': height });
            }
            else {
                height = parent.$("#widget").height() != null ? height - ((height - windowHeight) + 40) : height - ((height - windowHeight) + 20);
                popupImageHeight = height;
                parent.$("#commentImage_popup_wrapper").css({ 'height': popupImageHeight });
                parent.$("#commentImage_popup_image,#commentImage_popup,#PopupContainer,#commentImage_popup_wrapper .e-dialog-scroller").css({ 'height': height });
            }
            if (windowWidth >= width && width <= 900) {
                if ((windowWidth - width) > 40) {
                    popupImageWidth = width;
                }
                else {
                    width = windowWidth - ((7 / 100) * windowWidth);
                    popupImageWidth = width;
                }
                parent.$("#commentImage_popup_wrapper").css({ 'width': popupImageWidth });
                parent.$("#commentImage_popup_image,#commentImage_popup,#PopupContainer,#commentImage_popup_wrapper .e-dialog-scroller").css({ 'width': width });

            }
            else {
                width = windowWidth * (68 / 100);
                popupImageWidth = width;
                parent.$("#commentImage_popup_wrapper").css({ 'width': popupImageWidth });
                parent.$("#commentImage_popup_image,#commentImage_popup,#PopupContainer,#commentImage_popup_wrapper .e-dialog-scroller").css({ 'width': width });
            }
            parent.$("#commentImage_popup_image").attr("src", srcImage);
            parent.$("#commentImage_popup").removeClass("hidden");
            parent.$("#commentImage_popup").ejDialog("open");
        });
    });

    $(window).resize(function () {
        refreshCommentScroller();
    });
});

function GetAllComments(itemId, itemType, dashboardItemId, orderBy, isMultiDashboard) {
    if (isMultiDashboard != "undefined" && isMultiDashboard != null) {
        if (isMultiDashboard.toLowerCase() == 'true') {
            if (itemType.toLowerCase() == 'dashboard') {
                itemId = parent.$("#dashboard_Comment").attr("data-item-id");
                dashboardItemId = itemId;
            }
        }
    }
    var skip = 0;
    var take = 0;
    showWaitingPopup("parent-scroll-element");
    var itemRequest = { orderBy: orderBy, skip: skip, take: take, itemType: itemType, itemId: itemId, dashboardItemId: dashboardItemId, commentAction: commentAction.GetComments, isMultiDashboard: isMultiDashboard, parentDashboardId: parentDashboardId };
    getAllCommentAjax = parent.ajaxPostCall("POST", getAllCommentsUrl, itemRequest, null, getCommentsResult, null, completeCommentResult);
}

function completeCommentResult(data) {
    $(".post-message > p > img").load(function () {
        refreshCommentScroller();
    });
    generateProfileAvatar();
}

function getCommentsResult(data) {
    if (data) {
        if (data.Status == true) {
            $(".view-heading").css("display", "block");
            if (!parent.$("#commentModuleContainer").hasClass("displayNone")) {
                $($(".header-section a")[0]).css("display", "block");
                parent.$("#widget-loader-icon").hide();
            }
            else {
                if (!parent.$("#widgetCommentModuleContainer").hasClass("displayNone")) {
                    $($(".header-section a")[0]).css("display", "block");
                }
                else {
                    $($(".header-section a")[0]).css("display", "none");
                }
            }
            var item = data.Comments;
            var tree = ConstructTree(item, null);
            $(".comment-list").html(tree);
            $('.comment-list').find('.post').find('.post').find('.children').addClass('no-left-padding');
            $('#comment_count').text(data.ActiveCommentsCount);
            if (data.ActiveCommentsCount == 0) {
                $("#comment_action_slider").click();
                $('.additional-content').html("<h5>" + window.Server.App.LocalizationContent.NoComments + "</h5>");
            }
            $('[data-toggle="tooltip"]').tooltip();
            hideWaitingPopup("parent-scroll-element");
            $("body").removeClass('displayNone');
            refreshCommentScroller();
            var currentUrl = document.URL;
            if (parent.document.URL.indexOf("comment=") > -1) {
                var postNum = "#comment-" + getUrlVars(parent.document.URL.split('#')[0])['comment'];
                $(postNum).find('span.time-ago:first').click();
                $(postNum).find('.post-content:first').css({
                    "background-color": "#F4E4AE"
                });
                if (parent.document.URL.indexOf("isreply=true") > -1)
                    $(postNum).find('.reply-comment').first().click();
                if (i_am_ie9) {
                    $(postNum).find('.post-content:first').css('backgroundColor', 'hsl(46,76%,82%');
                    var d = 3000;
                    for (var i = 82; i <= 100; i = i + 0.1) {
                        d += 10;
                        (function (ii, dd) {
                            setTimeout(function () {
                                $(postNum).find('.post-content:first').css('backgroundColor', 'hsl(46,76%,' + ii + '%)');
                            }, dd);
                        })(i, d);
                    }
                } else {
                    setTimeout(function () {
                        $(postNum).find('.post-content:first').css({
                            transition: 'background-color 10s ease-in-out',
                            "background-color": "inherit"
                        });
                    }, 40);
                    setTimeout(function () {
                        $(postNum).find('.post-content:first').attr('style', '');
                    }, 7000);
                }
            }
            addTarget_blank();
        } else {
            hideWaitingPopup("parent-scroll-element");
        }
        if (parent.document.URL.indexOf("comment=") == -1) {
            refreshCommentScroller();
        }
    }
}

function refreshCommentScroller() {
    var textAreaHeight;
    if ($('#comment_action_area').hasClass('isHide')) {
        textAreaHeight = $("#comment_submit_container").outerHeight();
    } else {
        textAreaHeight = $("#comment_action_area").outerHeight();
    }
    //For widget iframe
    if ($('#isWidgetComment').val() == 'true' && itemId !== "undefined") {
        parent.$("#widget-comment-module-container-loader-icon").hide();
        var contentHeight = $("#list_container").outerHeight() + textAreaHeight + $('.count-sort').outerHeight() + $('.additional-content').outerHeight();
        var positionY = isSydjViewer ? parent.$("[data-widget-id='" + itemId + "']").offset().top : parent.$('#' + itemId).offset().top;
        var offsetBottom = $(window.parent).height() - positionY;
        var maxIframeHeight = 550;
        if (offsetBottom > contentHeight || offsetBottom > maxIframeHeight) {
            parent.$('#widgetCommentModuleContainer').css({ 'top': positionY < 0 ? 0 : positionY });
        } else {
            parent.$('#widgetCommentModuleContainer').css({ 'top': (positionY - (556 - offsetBottom)) < 0 ? 0 : (positionY - (556 - offsetBottom)) });
        }
        if ((maxIframeHeight - contentHeight) > 0) {
            parent.$("#widgetCommentModuleContainer").css({ 'height': contentHeight });
        } else {
            parent.$("#widgetCommentModuleContainer").css({ 'height': (maxIframeHeight) });
            $("#scroll-element").children().addClass('e-content');
        }
        var scrollerHeight = parent.$("#widgetCommentModuleContainer").height() - (textAreaHeight + $('.count-sort').outerHeight());
        var scrollerWidth = parent.$("#widgetCommentModuleContainer").width() - 2;
        $("#scroll-element")
            .ejScroller({
                height: scrollerHeight,
                width: scrollerWidth,
                scrollerSize: 7,
                buttonSize: 0,
                enableTouchScroll: parent.$("#is_mobile").val() != "false"
            });
        var scrollercontrol = $("#scroll-element").ejScroller("instance");
        scrollercontrol.model.height = scrollerHeight;
        scrollercontrol.refresh();
    }

    //For dashboard iframe
    if (!($('#isWidgetComment').val() == 'true')) {
        parent.$("#comment-module-container-loader-icon").hide();
        $("#scroll-element").children().addClass('e-content');
        var scrollerHeight = parent.$("#commentModuleContainer").height() - (textAreaHeight + $('.count-sort').outerHeight() + $(".header-section").outerHeight());
        var scrollerWidth = parent.$("#commentModuleContainer").width() - 2;
        $("#scroll-element").ejScroller({
            height: scrollerHeight,
            width: scrollerWidth,
            scrollerSize: 7,
            buttonSize: 0,
            enableTouchScroll: parent.$("#is_mobile").val() != "false"
        });
        var scrollercontrol = $("#scroll-element").ejScroller("instance");
        scrollercontrol.model.height = scrollerHeight;
        scrollercontrol.refresh();
    }
}

function ConstructTree(item, parentItem) {
    var commentHtml = "";
    if (item != null) {
        for (var i = 0; i < item.length; i++) {
            var childCount = 0;
            if (item[i].Replies.length > 0) {
                for (var c = 0; c < item[i].Replies.length; c++) {
                    if (item[i].Replies[c].IsActive) {
                        childCount += 1;
                    }
                }
            }
            if (!item[i].IsActive) {
                commentHtml += "<li id='comment-"
                    + item[i].Id + "'data-comment-id='"
                    + item[i].Id + "' class='post'><div class='post-content'><div class='avatar-container'><div class='profile-pic-tag avatar' data-id='"
                    + item[i].IdPReferenceId + "' data-type='user' data-display-name='"
                    + item[i].UserDisplayName + "' data-image-size='32'></div></div><div class='post-body'> <header><span class='post-byline col-xs-5 no-padding'></span><span class='post-meta col-xs-9 hidden no-padding'><a " + commentPermalinkHelper(item[i].Id) + " class='permalink'><span class='time-ago' title='"
                    + item[i].CreatedDateString + " - " + item[i].TimeZoneName + "'data-html='false' data-toggle='tooltip' data-placement='right'>"
                    + item[i].TimeAgo + "</span></a></span><menu class='deleted-post'><li class='reply' > <span class='su su-reply'></span> </li><span class='dropdown-toggle option-icon' ><span class='su su-options-horizontal'></span></span></menu></header> <div class='post-body-inner'><div class='post-message deleted-message'><span class='su su-warning'></span><span>" + window.Server.App.LocalizationContent.DeletedMessage + "</span></div> </div></div><div class='col-xs-12 reply-count " + (childCount > 0 ? "hasChild" : "") + "'><div class='col-xs-6 child-count'><span class='count-text'>"
                    + childCount + "</span><span class='count-label'>" + (childCount != 1 ? " replies" : " reply") + "</span></div><div class='col-xs-6 no-padding'>";
                if (childCount > 0) {
                    commentHtml += "<span class='su su-vertical-collapse collapse-icon' data-toggle='collapse'</span>";
                }
                commentHtml += "</div></div></div><ul class='children'>";
            } else {
                commentHtml += "<li id='comment-"
                    + item[i].Id + "'data-comment-id='"
                    + item[i].Id + "' class='post collapse in'><div class='post-content'><div class='avatar-container'> <div class='user' data-userid='"
                    + item[i].UserId + "'><div class='profile-pic-tag avatar' data-id='" + item[i].IdPReferenceId + "' data-type='user' data-display-name='"
                    + item[i].UserDisplayName + "' data-image-size='32'></div></div></div><div class='post-body'> <header><span class='post-byline col-xs-5 no-padding'><span title='"
                    + item[i].UserDisplayName + "'class='author publisher-anchor-color'>"
                    + item[i].UserDisplayName + "</span></span><menu>";
                commentHtml += "<li class='reply' title='" + window.Server.App.LocalizationContent.ReplyButton + "' data-toggle='tooltip' data-placement='bottom'> <a class='reply-comment'><span class='su su-reply'></span> </a></li>";

                if ($("#isadmin").text().toLowerCase() == "true" || item[i].UserId == $("#userName").val() || parentItem != null) {
                    commentHtml += "<span class='dropdown-toggle option-icon' title='" + window.Server.App.LocalizationContent.Action + "' data-toggle='dropdown'><span class='su su-options-horizontal'></span></span><ul class='dropdown-menu' role='menu'>";
                    if (item[i].UserId == $("#userName").val()) {
                        commentHtml += "<li class='edit' title='" + window.Server.App.LocalizationContent.EditButton + "' data-toggle='tooltip' data-placement='top'> <a class='edit-comment'><span>" + window.Server.App.LocalizationContent.EditButton + "</span> </a></li>";
                    }
                    if ($("#isadmin").text().toLowerCase() == "true" || item[i].UserId == $("#userName").val()) {
                        commentHtml += "<li class='delete' title='" + window.Server.App.LocalizationContent.Delete + "' data-toggle='tooltip' data-placement='top'> <a class='delete-comment'><span>" + window.Server.App.LocalizationContent.Delete + "</span> </a></li>";
                    }
                    if (parentItem != null) {
                        commentHtml += "<li class='parent' data-parent-id='"
                            + parentItem.Id + "' title='" + window.Server.App.LocalizationContent.Replied + " "
                            + parentItem.UserDisplayName + "' data-toggle='tooltip' data-placement='top'> <a class='parent-name'><span>" + window.Server.App.LocalizationContent.ShowParent + "</span> </a></li></ul>";
                    }
                }
                commentHtml += "</menu><span class='post-meta col-xs-9 no-padding'><a " + commentPermalinkHelper(item[i].Id) + " class='permalink'><span class='time-ago' title='"
                    + item[i].CreatedDateString + " - " + item[i].TimeZoneName + "'data-html='false' data-toggle='tooltip' data-placement='right'>"
                    + item[i].TimeAgo + "</span></a></span> </header> <div class='post-body-inner'><div class='edit-post displayNone'></div><div class='post-message'>"
                    + item[i].HtmlComment + "</div><div class='markDownComment hidden'>"
                    + item[i].MarkdownComment + "</div> </div></div><div class='reply-form-container displayNone'></div><div class='col-xs-12 reply-count " + (childCount > 0 ? "hasChild" : "") + "'><div class='col-xs-6 child-count'><span class='count-text'>"
                    + childCount + "</span><span class='count-label'>" + (childCount != 1 ? " replies" : " reply") + "</span></div><div class='col-xs-6 no-padding collapse-icon-container'><span class='su ";
                if (childCount > 0) {
                    commentHtml += "su-vertical-collapse collapse-icon' title='" + window.Server.App.LocalizationContent.Collapse + "'></span>";
                } else {
                    commentHtml += "collapse-icon' data-toggle='collapse'></span>";
                }
                commentHtml += "</div></div></div><ul class='children'>";
            }
            if (item[i].Replies.length > 0) {
                commentHtml += ConstructTree(item[i].Replies, item[i]) + "</ul> </li>";
            } else {
                commentHtml += "</ul> </li>";
            }
        }
    }
    return commentHtml;
}

function customMarkdownParser(plainText) {
    var userStringMatches = [];
    var groupStringMatches = [];
    var allStringMatches = [];
    var userRegex = /(?:\@\ (.*?)\ )/g;
    var groupRegex = /(?:\@\ (.*?)\ )/g;
    var allregex = /(@all)/g;
    var itemType = $("#itemType").attr("data-item-type").toLowerCase().replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
    });
    var simplemde = new EasyMDE({
        element: $("#temp")[0],
        spellChecker: false,
        autoDownloadFontAwesome: false,
    });
    var htmlText = plainText;
    userStringMatches = htmlText.match(userRegex);
    if (userStringMatches != null) {
        userStringMatches = jQuery.unique(userStringMatches);
        for (var j = 0; j < userStringMatches.length; j++) {
            var regex = new RegExp(userStringMatches[j], 'g');
            htmlText = htmlText.replace(regex, "<span class='cm-usercontainer'>" + userStringMatches[j] + "</span>");
        }
    }
    groupStringMatches = htmlText.match(groupRegex);
    if (groupStringMatches != null) {
        groupStringMatches = jQuery.unique(htmlText.match(groupRegex));
        for (var j = 0; j < groupStringMatches.length; j++) {
            var regex = new RegExp(groupStringMatches[j], 'g');
            htmlText = htmlText.replace(regex, "<span class='cm-groupcontainer'>" + groupStringMatches[j] + "</span>");
        }
    }
    allStringMatches = htmlText.match(allregex);
    if (allStringMatches != null) {
        allStringMatches = jQuery.unique(allStringMatches);
        for (var j = 0; j < allStringMatches.length; j++) {
            var regex = new RegExp(allStringMatches[j], 'g');
            htmlText = htmlText.replace(allStringMatches[j], "<span class='cm-allcontainer'>" + allStringMatches[j] + "</span>");
        }
    }
    htmlText = simplemde.options.previewRender(htmlText);
    $("#toRemoveCulture").html(htmlText);
    splitter = window.location.href.split("/")[4] + "/";
    var anchors = $('#toRemoveCulture a');
    for (var i = 0; i < anchors.length; i++) {
        anchors[i].setAttribute('target', '_blank');
        anchors[i].href = anchors[i].href.split(splitter)[1];
    }
    var image = $('#toRemoveCulture img');
    for (var i = 0; i < image.length; i++) {
        image[i].setAttribute('target', '_blank');
        if (image[i].src.indexOf(splitter) !== -1) {
            image[i].src = image[i].src.split(splitter)[1];
        }

        if (image[i].src.indexOf("image-") !== -1) {
            var imageName = image[i].src.split("/");
            for (var j = 0; j < imageName.length; j++) {
                if (imageName[j].indexOf("image-") !== -1) {
                    image[i].src = rootUrl + "/Content/images/commentimages/" + itemType + "/" + itemId + "/" + imageName[j];
                }
            }
        }
    }
    htmlText = $("#toRemoveCulture").html();
    return htmlText;
}

function renderMde(id) {
    var simplemde = new EasyMDE({
        element: $(id)[0],
        status: false,
        spellChecker: false,
        autoDownloadFontAwesome: false,
        toolbar: [{
            name: "bold",
            action: EasyMDE.toggleBold,
            className: "su su-bold",
            title: window.Server.App.LocalizationContent.Bold,
        },
        {
            name: "italic",
            action: EasyMDE.toggleItalic,
            className: "su su-italic",
            title: window.Server.App.LocalizationContent.Italic,
        },
        {
            name: "heading",
            action: EasyMDE.toggleHeadingSmaller,
            className: "su su-header",
            title: window.Server.App.LocalizationContent.Heading,
        },
            "|",
        {
            name: "quote",
            action: EasyMDE.toggleBlockquote,
            className: "su su-quote",
            title: window.Server.App.LocalizationContent.Quote,
        },
        {
            name: "unordered-list",
            action: EasyMDE.toggleUnorderedList,
            className: "su su-list-ul",
            title: window.Server.App.LocalizationContent.Generic,
        },
        {
            name: "ordered-list",
            action: EasyMDE.toggleOrderedList,
            className: "su su-list-ol",
            title: window.Server.App.LocalizationContent.Number,
        },
            "|",
        {
            name: "link",
            action: EasyMDE.drawLink,
            className: "su su-link",
            title: window.Server.App.LocalizationContent.Link,
        },
        {
            name: "image",
            action: EasyMDE.drawImage,
            className: "su su-image",
            title: window.Server.App.LocalizationContent.Image,
        },
        {
            name: "uploadImage",
            className: "su su-upload-image",
            title: window.Server.App.LocalizationContent.UploadImage,
        },
        {
            name: "preview",
            action: EasyMDE.togglePreview,
            className: "su su-preview no-disable",
            title: window.Server.App.LocalizationContent.Preview,
        }
        ],
        previewRender: function (plainText) {
            return customMarkdownParser(plainText); // Returns HTML from a custom parser
        },
    });
    $('.su-upload-image').attr('id') == 'comment-image-file' ? $(".su-upload-image").attr('id', 'comment-image-edit-file') : $(".su-upload-image").attr('id', 'comment-image-file');
    return simplemde;
}

function getUrlVars(url) {
    var vars = {};
    var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

$.fn.isOnScreen = function () {
    windowHeight = $("#list_container").outerHeight();
    if ($('#comment_action_area').hasClass('isHide')) {
        textAreaHeight = $("#comment_submit_container").outerHeight();
    } else {
        textAreaHeight = $("#comment_action_area").outerHeight();
    }
    var headerHeight = textAreaHeight + $('.count-sort').outerHeight();
    offsetTop = this.offset().top;
    return ((offsetTop >= headerHeight) && (offsetTop <= windowHeight));
};

function addTarget_blank() {
    $("ul#commentList li .post-message").find("a").attr("target", "_blank");
}

function truncateUrl() {
    var currentPageUrl = parent.window.location.href.split('#')[0];
    var isCommentExist = currentPageUrl.indexOf("?comment=");
    var isFilterCommentExist = currentPageUrl.indexOf("&comment=");
    var isDashboardExist = currentPageUrl.substr(0, currentPageUrl.indexOf('/dashboards') + 1);
    var isWidgetExist = currentPageUrl.substr(0, currentPageUrl.indexOf('/widgets') + 1);
    if (isDashboardExist.length > 0) {
        currentPageUrl = currentPageUrl.replace(isDashboardExist, "/");
    }
    else if (isWidgetExist.length > 0) {
        currentPageUrl = currentPageUrl.replace(isWidgetExist, "/");
    }
    if (isCommentExist > 0) {
        currentPageUrl = currentPageUrl.slice(0, currentPageUrl.lastIndexOf("?comment="));
    }
    else if (isFilterCommentExist > 0) {
        currentPageUrl = currentPageUrl.slice(0, currentPageUrl.lastIndexOf("&comment="));
    }
    return currentPageUrl;
}

function getRelativePath(commentText) {
    var itemType = $("#itemType").attr("data-item-type").toLowerCase().replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
    });
    var stringMatches = commentText.match(/(?:\!\[\]\((.*?)\))/g);
    var tag = [];
    if (stringMatches != null) {
        for (var j = 0; j < stringMatches.length; j++) {
            tag[j] = stringMatches[j].split(/[\(\\!\[\ \]\\)\s]+/);
            tag[j] = $.grep(tag[j], function (n) {
                return (n);
            });
        }
        var url = "";
        for (var i = 0; i < tag.length; i++) {
            tag[i] = tag[i].toString();
            if (tag[i].indexOf("image-") !== -1) {
                url = rootUrl + '/Content/images/commentimages/' + itemType + "/" + itemId + "/" + tag[i];
                if (url != "") {
                    tag[i] = "![](" + tag[i] + ")";
                    url = "![](" + url + ")";
                    commentText = commentText.replace(tag[i], url);
                }
            }
        }
    }
    return commentText;
}

function pasteImageReader(dataURL) {
    var dataUrl = dataURL;
    var itemType = $("#itemType").attr("data-item-type").toLowerCase().replace(/\b[a-z]/g, function (letter) {
        return letter.toUpperCase();
    });
    var itemRequest = { DataUrl: dataUrl, itemId: itemId, itemType: itemType, isMultiDashboard: isMultiDashboard, parentDashboardId: parentDashboardId };
    parent.ajaxPostCall("POST", commentImageUrl, itemRequest, null, pasteCommentImages, null, null);
}

function pasteCommentImages(data) {
    if (data !== "" && data.indexOf("image-") !== -1) {
        var content = " ![](" + data + ")";
        cursorPos.codemirror.replaceSelection(content);
        hideWaitingPopup("parent-scroll-element");
    }
    else {
        hideWaitingPopup("parent-scroll-element");
    }
}

$.fn.pastableTextarea = function () {
    var el, j, len;
    for (j = 0, len = this.length; j < len; j++) {
        el = this[j];
        if (el._pastable || $(el).is(':not(textarea, input:text)')) {
            continue;
        }
        Paste.mountTextarea(el);
        el._pastable = true;
    }
    return this;
};

createHiddenEditable = function () {
    return $(document.createElement('div')).attr('contenteditable', true).attr('aria-hidden', true).attr('tabindex', -1).css({
        width: 1,
        height: 1,
        position: 'fixed',
        left: -100,
        overflow: 'hidden'
    });
};

isFocusable = function (element, hasTabindex) {
    var fieldset, focusableIfVisible, img, map, mapName, nodeName;
    map = void 0;
    mapName = void 0;
    img = void 0;
    focusableIfVisible = void 0;
    fieldset = void 0;
    nodeName = element.nodeName.toLowerCase();
    if ('area' === nodeName) {
        map = element.parentNode;
        mapName = map.name;
        if (!element.href || !mapName || map.nodeName.toLowerCase() !== 'map') {
            return false;
        }
        img = $('img[usemap=\'#' + mapName + '\']');
        return img.length > 0 && img.is(':visible');
    }
    if (/^(input|select|textarea|button|object)$/.test(nodeName)) {
        focusableIfVisible = !element.disabled;
        if (focusableIfVisible) {
            fieldset = $(element).closest('fieldset')[0];
            if (fieldset) {
                focusableIfVisible = !fieldset.disabled;
            }
        }
    } else if ('a' === nodeName) {
        focusableIfVisible = element.href || hasTabindex;
    } else {
        focusableIfVisible = hasTabindex;
    }
    focusableIfVisible = focusableIfVisible || $(element).is('[contenteditable]');
    return focusableIfVisible && $(element).is(':visible');
};

Paste = (function () {
    Paste.prototype._target = null;

    Paste.prototype._container = null;

    Paste.mountNonInputable = function (nonInputable) {
        var paste;
        paste = new Paste(createHiddenEditable().appendTo(nonInputable), nonInputable);
        $(nonInputable).on('click', (function (_this) {
            return function (ev) {
                if (!isFocusable(ev.target, false)) {
                    return paste._container.focus();
                }
            };
        })(this));
        paste._container.on('focus', (function (_this) {
            return function () {
                return $(nonInputable).addClass('pastable-focus');
            };
        })(this));
        return paste._container.on('blur', (function (_this) {
            return function () {
                return $(nonInputable).removeClass('pastable-focus');
            };
        })(this));
    };

    Paste.mountTextarea = function (textarea) {
        var ctlDown, paste;
        if (DataTransfer.prototype.__lookupGetter__('items')) {
            return this.mountContenteditable(textarea);
        }
        paste = new Paste(createHiddenEditable().insertBefore(textarea), textarea);
        ctlDown = false;
        $(textarea).on('keyup', function (ev) {
            var ref;
            if ((ref = ev.keyCode) === 17 || ref === 224) {
                ctlDown = false;
            }
            return null;
        });
        $(textarea).on('keydown', function (ev) {
            var ref;
            if ((ref = ev.keyCode) === 17 || ref === 224) {
                ctlDown = true;
            }
            if ((ev.ctrlKey != null) && (ev.metaKey != null)) {
                ctlDown = ev.ctrlKey || ev.metaKey;
            }
            if (ctlDown && ev.keyCode === 86) {
                paste._textarea_focus_stolen = true;
                paste._container.focus();
                paste._paste_event_fired = false;
                setTimeout((function (_this) {
                    return function () {
                        if (!paste._paste_event_fired) {
                            $(textarea).focus();
                            return paste._textarea_focus_stolen = false;
                        }
                    };
                })(this), 1);
            }
            return null;
        });
        $(textarea).on('paste', (function (_this) {
            return function () { };
        })(this));
        $(textarea).on('focus', (function (_this) {
            return function () {
                if (!paste._textarea_focus_stolen) {
                    return $(textarea).addClass('pastable-focus');
                }
            };
        })(this));
        $(textarea).on('blur', (function (_this) {
            return function () {
                if (!paste._textarea_focus_stolen) {
                    return $(textarea).removeClass('pastable-focus');
                }
            };
        })(this));
        $(paste._target).on('_pasteCheckContainerDone', (function (_this) {
            return function () {
                $(textarea).focus();
                return paste._textarea_focus_stolen = false;
            };
        })(this));
        return $(paste._target).on('pasteText', (function (_this) {
            return function (ev, data) {
                var content = data.text;
                cursorPos.codemirror.replaceSelection(content);
                hideWaitingPopup("parent-scroll-element");
                return $(textarea).trigger('change');
            };
        })(this));
    };

    Paste.mountContenteditable = function (contenteditable) {
        var paste;
        paste = new Paste(contenteditable, contenteditable);
        $(contenteditable).on('focus', (function (_this) {
            hideWaitingPopup("parent-scroll-element");
            return function () {
                return $(contenteditable).addClass('pastable-focus');
            };
        })(this));
        return $(contenteditable).on('blur', (function (_this) {
            return function () {
                hideWaitingPopup("parent-scroll-element");
                return $(contenteditable).removeClass('pastable-focus');
            };
        })(this));
    };

    function Paste(_container, _target) {
        this._container = _container;
        this._target = _target;
        this._container = $(this._container);
        this._target = $(this._target).addClass('pastable');
        this._container.on('paste', (function (_this) {
            return function (ev) {
                showWaitingPopup("parent-scroll-element");
                var clipboardData, file, item, j, k, len, leng, reader, ref, ref1, ref2, ref3, text;
                _this._paste_event_fired = true;
                if (((ref = ev.originalEvent) != null ? ref.clipboardData : void 0) != null) {
                    clipboardData = ev.originalEvent.clipboardData;
                    if (clipboardData.items) {
                        ref1 = clipboardData.items;
                        for (j = 0, len = ref1.length; j < len; j++) {
                            item = ref1[j];
                            if (item.type.match(/^image\//)) {
                                reader = new FileReader();
                                reader.onload = function (event) {
                                    return _this._handleImage(event.target.result);
                                };
                                reader.readAsDataURL(item.getAsFile());
                                ev.preventDefault();
                                break;
                            }
                            if (item.type === 'text/plain') {
                                item.getAsString(function (string) {
                                    setTimeout(function () {
                                        hideWaitingPopup("parent-scroll-element");
                                        return _this._target.trigger('pasteText', {
                                            text: string
                                        });
                                    }, 1);
                                });
                            }
                        }
                    } else {
                        if (-1 !== Array.prototype.indexOf.call(clipboardData.types, 'text/plain')) {
                            text = clipboardData.getData('Text');
                            setTimeout(function () {
                                hideWaitingPopup("parent-scroll-element");
                                return _this._target.trigger('pasteText', {
                                    text: text
                                });
                            }, 1);
                        }
                        _this._checkImagesInContainer(function (src) {
                            return _this._handleImage(src);
                        });

                    }
                }
                if (clipboardData = window.clipboardData) {
                    if ((ref2 = (text = clipboardData.getData('Text'))) != null ? ref2.length : void 0) {
                        setTimeout(function () {
                            hideWaitingPopup("parent-scroll-element");
                            _this._target.trigger('pasteText', {
                                text: text
                            });
                            return _this._target.trigger('_pasteCheckContainerDone');
                        }, 1);
                    } else {
                        ref3 = clipboardData.files;
                        for (k = 0, leng = ref3.length; k < leng; k++) {
                            file = ref3[k];
                            _this._handleImage(URL.createObjectURL(file));
                        }
                        _this._checkImagesInContainer(function (src) { });
                    }
                }
                setTimeout(function () {
                    hideWaitingPopup("parent-scroll-element");
                }, 1000);
                return null;
            };
        })(this));
    }

    Paste.prototype._handleImage = function (src) {
        var loader;
        loader = new Image();
        loader.crossOrigin = "anonymous";
        loader.onload = (function (_this) {
            return function () {
                var canvas, ctx, dataURL;
                canvas = document.createElement('canvas');
                canvas.width = loader.width;
                canvas.height = loader.height;
                ctx = canvas.getContext('2d');
                ctx.drawImage(loader, 0, 0, canvas.width, canvas.height);
                dataURL = null;
                try {
                    dataURL = canvas.toDataURL('image/png');
                    pasteImageReader(dataURL);
                }
                catch (error) {
                    hideWaitingPopup("parent-scroll-element");
                }
            };
        })(this);
        loader.onerror = (function (_this) {
        })(this);
        return loader.src = src;
    };

    Paste.prototype._checkImagesInContainer = function (cb) {
        var img, j, len, ref, timespan;
        timespan = Math.floor(1000 * Math.random());
        ref = this._container.find('img');
        for (j = 0, len = ref.length; j < len; j++) {
            img = ref[j];
            img["_paste_marked_" + timespan] = true;
        }
        return setTimeout((function (_this) {
            return function () {
                var k, len, ref;
                ref = _this._container.find('img');
                if (ref.length == 0) {
                    hideWaitingPopup("parent-scroll-element");
                }
                for (k = 0, len = ref.length; k < len; k++) {
                    img = ref[k];
                    if (!img["_paste_marked_" + timespan]) {
                        cb(img.src);
                        $(img).remove();
                    }
                }
                return _this._target.trigger('_pasteCheckContainerDone');
            };
        })(this), 1);
    };

    return Paste;

})();

//User Mention
function autoCompletes(e, content) {

    var UP = 38;
    var DOWN = 40;
    var ENTER = 13;
    var getKey = function (e) {
        if (window.event) { return e.keyCode; }  // IE
        else if (e.which) { return e.which; }    // Netscape/Firefox/Opera
    };
    var keynum = getKey(e);

    if (keynum === UP) {
        var ev = jQuery.Event("keydown");
        ev.keyCode = 38;
        ev.which = 38;
        $("#autocomplete-input").trigger(ev);
    } else if (keynum === DOWN) {
        var ev = jQuery.Event("keydown");
        ev.keyCode = 40;
        ev.which = 40;
        $("#autocomplete-input").trigger(ev);
    } else if (keynum === ENTER) {
        e.preventDefault();
        var value = $("ul.e-ul li.e-hover").attr("id");
    }
    else {
        autoCompleteRefresh(content);
        $("#autocomplete-input").val(content);
        $("#autocomplete-input").ejAutocomplete("enable");
        $("#autocomplete-input").ejAutocomplete("search");
        $("#autocomplete-input").ejAutocomplete("hide");
    }
}

function getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
        sel = win.getSelection();
        if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
        }
    } else if ((sel = doc.selection) && sel.type != "Control") {
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

function onSelect(args) {
    var splitValue, type, userName = "", userMentionDetails = "";
    $("#scroll-element").ejScroller("enable");
    var value = $("ul.e-ul li.e-hover").attr("id");
    if (value != "" && value != undefined && value != null) {
        var splitValue = value.split('-');
        if (splitValue != "" && splitValue != undefined && splitValue != null) {
            type = splitValue[0];
            userName = value.split(/-(.+)?/)[1];
        }
    }
    var line = initialPosition.line;
    var ch = initialPosition.ch;
    var totalCh = initialLine.length;
    targetElement.focus();
    cursorPos.codemirror.setSelection({ line: line, ch: 0 }, { line: line, ch: totalCh });
    cursorPos.codemirror.replaceSelection(initialLine);
    cursorPos.codemirror.setSelection({ line: line, ch: ch }, { line: line, ch: ch });
    type == "User" ? cursorPos.codemirror.replaceSelection("@\u00a0" + userName + "\u00a0") : cursorPos.codemirror.replaceSelection("@ " + args.value + "\u00a0");
    $("#autocomplete-input").ejAutocomplete("disable");
    $("#autocomplete-input_suggestion").attr("style", "display:none !important;");
}

function onOpen() {
    var autocompleteScrollerObj = $("#autocomplete-input").data("ejAutocomplete").scrollerObj;
    autocompleteScrollerObj.model.height = 135;
    autocompleteScrollerObj.model.buttonSize = 0;
    autocompleteScrollerObj.model.scrollerSize = 9;
    autocompleteScrollerObj.refresh();
    $("#autocomplete-input_suggestion").attr("style", "display:block !important; z-index: 9;");
    var element = document.getElementById("autocomplete");
    var xPos = 0;
    var yPos = 0;
    if ($(element).length) {
        var parameters = $(element)[0].getBoundingClientRect();
        xPos = parameters.left;
        yPos = parameters.top;
        var suggestionListLeftPosition = xPos;
        var suggestionListtopPosition = yPos + 30;
        var suggestionListWidth = $("#autocomplete-input_suggestion").width();
        var suggestionListHeight = $("#autocomplete-input_suggestion").height();
        var iframeHeight = $(parent.$("#commentModuleContainer")[0]).height();
        var iframeWidth = $(parent.$("#commentModuleContainer")[0]).width();
        var positionedLeft = iframeWidth > (suggestionListLeftPosition + suggestionListWidth) ? $("#autocomplete-input_suggestion").css('left', suggestionListLeftPosition) : $("#autocomplete-input_suggestion").css('left', suggestionListLeftPosition - suggestionListWidth + 16);
        $("#autocomplete-input_suggestion").css('top', suggestionListtopPosition);
        $("#autocomplete-input_suggestion").addClass("usermention-suggestionlist");
    }
}

function autoCompleteRefresh(arg) {
    var keyword = arg;

    clearTimeout(window.timer);
    window.timer = setTimeout(function () {
        autosuggestion(keyword);
    }, 400);
}

function autosuggestion(keyword) {
    $.xhrPool.abortAll();
    var itemId = parent.$('#widget_Comment').length > 0 ? parent.$("#widget_Comment").attr("data-item-id") : parent.$("#dashboard_Comment").attr("data-item-id");
    $("#autocomplete-input_suggestion").css("display", "none");
    if (keyword.trim() != "") {
        var itemRequest = { searchWord: keyword, itemId: itemId, isMultiDashboard: parent.$("#isMultiDashboard").attr("data-item-id"), parentId: parent.$("#isMultiDashboard").attr("data-parent-id") };
        parent.ajaxPostCall("GET", userMentionDataSourceUrl, itemRequest, null, userMentionDataList, null, null);
    }
}

function userMentionDataList(result) {
    $("#autocomplete-input_suggestion").css("display", "none");
    var autocompleteObj = $("#autocomplete-input").data("ejAutocomplete");
    autocompleteObj.model.dataSource = JSON.parse(result);
    autocompleteObj._OnTextEnter();
    onOpen();
}
function splitUserMention(textAreaElementNode) {
    var element = $(textAreaElementNode).children().find(".CodeMirror-code");
    var mentionedAll = false;
    var userNameMatches = [];
    var groupNameMatches = [];
    var match = [];
    var uniqueUsersValue = [];
    var uniqueGroupValue = [];
    var userNameRegex = /(?:\@\ (.*?)\ )/;
    var groupNameRegex = /(?:\@\ (.*?)\ )/;
    var allNameRegex = /(@all)/;
    var userContainer = $(element)[0].getElementsByClassName("cm-usercontainer");
    var groupContainer = $(element)[0].getElementsByClassName("cm-groupcontainer");
    var allContainer = $(element)[0].getElementsByClassName("cm-allcontainer");
    if (userContainer.length) {
        for (i = 0; i < userContainer.length; i++) {
            match[i] = userNameRegex.exec(userContainer[i].textContent)
            if (match[i]) {
                userNameMatches.push(match[i][1]);
            }
        }
    }
    if (groupContainer.length) {
        for (i = 0; i < groupContainer.length; i++) {
            match[i] = groupNameRegex.exec(groupContainer[i].textContent)
            if (match[i]) {
                groupNameMatches.push(match[i][1]);
            }
        }
    }
    if (allContainer.length) {
        mentionedAll = true;
    } else {
        $.each(userNameMatches, function (i, el) {
            if ($.inArray(el, uniqueUsersValue) === -1) uniqueUsersValue.push(el);
        });
        $.each(groupNameMatches, function (i, el) {
            if ($.inArray(el, uniqueGroupValue) === -1) uniqueGroupValue.push(el);
        });
    }
    var values = { uniqueUsersValue: uniqueUsersValue, uniqueGroupValue: uniqueGroupValue, mentionedAll: mentionedAll };
    return values;
}

function userMentionInitializing(e, elementNode) {

    var target = e.target;
    var key = (e.keyCode ? e.keyCode : e.which);
    var initialValue = cursorPos.value();
    if (key === 64) {
        targetElement = target;
        if ($("#autocomplete-trigger").length == 0) {
            var autoComplete = '<span id="autocomplete"><span id="autocomplete-trigger">@</span><span id="autocomplete-search-text" contenteditable></span></span>';
            cursorPos.codemirrorIgnore;
            var position = cursorPos.codemirror.getCursor();
            initialPosition = position;
            var line = position.line;
            var ch = position.ch;
            var getLine = cursorPos.codemirror.getLine(line);
            initialLine = getLine;
            var totalCh = getLine.length;
            var element = "";
            var anchor = cursorPos.codemirror.findWordAt({ line: line, ch: ch }).anchor.ch;
            var head = cursorPos.codemirror.findWordAt({ line: line, ch: ch }).head.ch;
            if (((anchor == (head - 1)) && (totalCh == ch)) || ((anchor == 0) && (head == 0)) || (getLine[ch - 1] == " " && getLine[ch] == undefined)) {
                var codeMirrorElement = $(elementNode).children().find(".CodeMirror-code").children();
                if (codeMirrorElement) {
                    $(codeMirrorElement[line].firstChild).append(autoComplete);
                    element = $("#autocomplete-search-text");
                    $(element[0]).focus();
                }
                e.preventDefault();
                $("#scroll-element").ejScroller("disable");
            }
            else if ((ch == anchor) || (getLine[ch - 1] == " " && (getLine[ch + 1] == " " || getLine[ch] == " "))) {
                cursorPos.codemirror.setSelection({ line: line, ch: ch }, { line: line, ch: totalCh });
                var replaceText = cursorPos.codemirror.getSelection();
                cursorPos.codemirror.replaceSelection("");
                var codeMirrorElement = $(elementNode).children().find(".CodeMirror-code").children();
                if (codeMirrorElement) {
                    var textelement = codeMirrorElement[line].firstChild;
                    $(textelement).append(autoComplete);
                    textelement.append(replaceText);
                    element = $("#autocomplete-search-text");
                    $(element[0]).focus();
                }
                e.preventDefault();
                $("#scroll-element").ejScroller("disable");
            }
            $("#autocomplete-search-text").on('keydown', function (eve) {
                var key = (eve.keyCode ? eve.keyCode : eve.which);
                var searchText = $("#autocomplete-search-text").text();
                var elementSpan = document.getElementById("autocomplete-search-text");
                var positionSpan = getCaretCharacterOffsetWithin(elementSpan);
                if ((key === 8) && (positionSpan == 0)) {
                    $("#autocomplete-input_suggestion").css("display", "none");
                    removingUserMentionContainer(target, searchText, line, ch, totalCh, getLine);
                }
            });
            $("#autocomplete-search-text").on('blur', function (eve) {
                $("#scroll-element").ejScroller("enable");
            });
            $("#autocomplete-search-text").on('keyup', function (eve) {
                var key = (eve.keyCode ? eve.keyCode : eve.which);
                $("#scroll-element").ejScroller("enable");
                var searchText = $("#autocomplete-search-text").text();
                var elementSpan = document.getElementById("autocomplete-search-text");
                var positionSpan = getCaretCharacterOffsetWithin(elementSpan);
                if ((key === 27) || (key === 33) || (key === 9) || (key === 36)) {
                    removingUserMentionContainer(target, searchText, line, ch, totalCh, getLine);
                }
                else if (key === 13) {
                    eve.preventDefault();
                    var id = $("ul.e-ul li.e-hover").attr("id");
                    var value = $("ul.e-ul li.e-hover").text();
                    if (value != "" && value != "No suggestions") {
                        var arg = {
                            id: id,
                            value: value
                        }
                        onSelect(arg);
                    } else {
                        removingUserMentionContainer(target, searchText, line, ch, totalCh, getLine);
                    }
                }
                else if (key != 38 && key != 40) {
                    var autocompleteSearch = autoCompletes(eve, searchText);
                }
                else {
                    var autocompleteSearch = autoCompletes(eve, searchText);
                }
            });
            $(".CodeMirror").on('click', function () {
                var escText = "";
                if ($("#autocomplete-search-text").length && $("#autocomplete").length) {
                    var searchText = $("#autocomplete-search-text").text();
                    escText = "@" + searchText;
                    escText = escText.trim();
                    target.focus();
                    cursorPos.codemirror.setSelection({ line: initialPosition.line, ch: 0 }, { line: initialPosition.line, ch: initialLine.length });
                    cursorPos.codemirror.replaceSelection(initialLine);
                    cursorPos.codemirror.setSelection({ line: initialPosition.line, ch: initialPosition.ch }, { line: initialPosition.line, ch: initialPosition.ch });
                    cursorPos.codemirror.replaceSelection(escText);
                    $("#autocomplete-input").ejAutocomplete("disable");
                    $("#autocomplete-input_suggestion").attr("style", "display:none !important;");
                }
            });
        }
    }
}

function displaySuggestionList() {
    $("#autocomplete-input_suggestion").css("display", "none");
}

function removingUserMentionContainer(target, searchText, line, ch, totalCh, getLine) {
    $("#scroll-element").ejScroller("enable");
    var escText = "";
    if ($("#autocomplete-search-text").length && $("#autocomplete").length) {
        escText = "@" + searchText;
        escText = escText.trim();
        $("#autocomplete-input").ejAutocomplete("disable");
        $("#autocomplete-input_suggestion").attr("style", "display:none !important;");
        target.focus();
        cursorPos.codemirror.setSelection({ line: line, ch: 0 }, { line: line, ch: totalCh });
        cursorPos.codemirror.replaceSelection(getLine);
        cursorPos.codemirror.setSelection({ line: line, ch: ch }, { line: line, ch: ch });
        cursorPos.codemirror.replaceSelection(escText);
        $("#autocomplete-input").ejAutocomplete("disable");
        $("#autocomplete-input_suggestion").attr("style", "display:none !important;");
    }
}

$(document).on("click", "#close-comment", function () {
    $(".view-heading").css("display", "none");
    $(".header-section a").css("display", "none");
    parent.$("#commentImage_popup").ejDialog("close");
    parent.$("#commentModuleContainer").addClass("displayNone");
    parent.$("#delete_popup_iframe").addClass("displayNone");
    parent.$("#dashboard-comment").removeClass(" highlight-icon");
    parent.$("#widgetCommentModuleContainer").addClass("displayNone");

    if (parent.$("#is_mobile").val() == "true") {
        parent.$(dashboardTypeId).show();
        if (parent.$("#server-mobile-navbar .server-comment").hasClass('active')) {
            parent.$("#server-mobile-navbar a.active").removeClass("active");
            parent.$("#server-mobile-navbar .su-nav-dashboard").addClass('active');
        }
    }

    parent.$(".options").css("right", "0px");
    parent.$(".options li").removeClass("active");
    if (iframeUrl == parentUrl) {
        parent.$(dashboardTypeId).css("width", $(parent.window).width() - parent.$(".options").outerWidth() + "px");
        var data = parent.$(dashboardTypeId).data(ejType);
        data.resizeDashboard();
    }
    else {
        if (!parent.$(".su-sidebar-collapse").is(":visible")) {
            parent.$(dashboardTypeId).css("width", parent.document.body.clientWidth - 40);
            $(parent.parent.document.body).find("#item-viewer").css("width", parent.document.body.clientWidth - 5);
        }
    }
});

function ajaxSetup() {
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
}

function commentPermalinkHelper(commentId) {
    //Don't remove this. This will affect comments loading once posted
    return "href" + "='#comment-" + commentId + "'";
}