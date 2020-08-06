var conciergeSupportMd;
var experience;
var subject;
var currentTime, updateCurrentTime;
var isConciergeRequestPopup;
var isUserAccess;
var isAdmin;
var updateMd;
var currentEjUploadId;
var currentMdeId;
var orgFileName;

$(document).ready(function (e) {
    $("#concierge-support-popup").ejDialog({
        width: "520px",
        height: "auto",
        showOnInit: false,
        allowDraggable: false,
        enableResize: false,
        showHeader: false,
        enableModal: true,
        open: "OnConciergeSupportOpen",
        close: "OnConciergeSupportClose"
    });

    var supportWaitingPopupTemplateId = createLoader("concierge-support-popup_wrapper");
    $("#concierge-support-popup_wrapper").ejWaitingPopup({ template: $("#" + supportWaitingPopupTemplateId) });

    var replyWaitingPopupTemplateId = createLoader("reply");
    $("#reply").ejWaitingPopup({ template: $("#" + replyWaitingPopupTemplateId) });

    conciergeSupportMd = renderMdeForSupport("#concierge-support-message");
    currentMdeId = "concierge-support-message";

    conciergeSupportMd.codemirror.on("keyHandled", function (e) {
        ValidateConciergeSupportRequest(e);
    });

    conciergeSupportMd.codemirror.on("change", function (e) {
        ValidateConciergeSupportRequest(e);
    });

    $('.form-group > .CodeMirror').on("keypress", "textarea", function (e) {
        ValidateConciergeSupportRequest(e);
    });

    $("#concierge-submit-button").on("click", function () {
        var isConciergeRequest = isConciergeRequestPopup ? isConciergeRequestPopup : $("#is-concierge-request").is(":checked");
        var conciergeSupportMessage = conciergeSupportMd.value().trim();
        var g = $("#items").data("ejGrid");
        var conciergeSupport = {
            Title: $("#concierge-support-subject").val().trim(),
            Message: AppendFileDownloadPath(conciergeSupportMessage),
            IsConciergeSupport: isConciergeRequest,
            AllowAccess: isAdmin ? isUserAccess ? isUserAccess : $("#concierge-access-checkbox").is(":checked") : isUserAccess,
            Attachments: [
                {
                    "FileName": $("#support-file-name").val(),
                    "Link": $("#support-file-path").val()
                }
            ]
        };

        $("#concierge-support-popup_wrapper").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: conciergeSupportUrl,
            data: { support: JSON.stringify(conciergeSupport) },
            success: function (result) {
                $("#concierge-support-popup_wrapper").ejWaitingPopup("hide");
                if (result.Status) {
                    SuccessAlert(isConciergeRequest ? window.Server.App.LocalizationContent.RequestConciergeSupport : window.Server.App.LocalizationContent.SupportTitle, isConciergeRequest ? window.Server.App.LocalizationContent.AddConciergeSupportSuccess : window.Server.App.LocalizationContent.AddSupportSuccess, 7000);
                    $("#concierge-support-subject").val("");
                    conciergeSupportMd.value("");
                    $("#is-concierge-request, #concierge-access-checkbox").removeAttr("checked");
                    $("#concierge-support-checkbox, #admin-access-message").hide();
                    $("#concierge-submit-button").attr("disabled", true);
                    $("#attach-file-textbox").val(window.Server.App.LocalizationContent.BrowsePath);
                    $("#support-file-path").val("");
                    $("#support-file-name").val("");
                    $("#concierge-support-popup").ejDialog("close");
                    if ($("#tickets-container").length > 0) {
                        g.refreshContent();
                    }
                }
                else {
                    WarningAlert(isConciergeRequest ? window.Server.App.LocalizationContent.RequestConciergeSupport : window.Server.App.LocalizationContent.SupportTitle, isConciergeRequest ? window.Server.App.LocalizationContent.AddConciergeSupportFailure : window.Server.App.LocalizationContent.AddSupportFailure, 0);
                }
            },
            error: function () {
                WarningAlert(window.Server.App.LocalizationContent.RequestConciergeSupport, window.Server.App.LocalizationContent.AddConciergeSupportFailure, 0);
                $("#concierge-support-popup_wrapper").ejWaitingPopup("hide");
            }
        });
    });

    $("#attach-file").ejUploadbox({
        saveUrl: fileUploadUrl + "?imageType=supportfile&&timeStamp=" + GetCurrentTime(),
        autoUpload: true,
        showFileDetails: false,
        buttonText: { browse: ".  .  ." },
        extensionsAllow: ".Zip,.Rar,.Zipx,.7z",
        height: 26,
        fileSize: 30000000,
        multipleFilesSelection: false,
        begin: function () {
            $("#concierge-support-popup_wrapper").ejWaitingPopup("show");
        },
        fileSelect: function (e) {
            currentTime = GetCurrentTime();
            e.model.saveUrl = fileUploadUrl + "?imageType=supportfile&&timeStamp=" + currentTime;
            fileExtension = e.files[0].extension.toLowerCase();
            orgFileName = e.files[0].name.split('.').slice(0, -1).join('.');
            fileName = orgFileName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '');
        },
        error: function (e) {
            if (fileExtension !== ".zip" && fileExtension !== ".rar" && fileExtension !== ".zipx" && fileExtension !== ".7z") {
                $("#attach-file-textbox").addClass("validation-failed-text").val(window.Server.App.LocalizationContent.InValidFileFormat);
            }
            else {
                $("#attach-file-textbox").addClass("validation-failed-text").val(window.Server.App.LocalizationContent.FileSizeInvalid);
            }

            $("#attach-file-textbox").closest("div").addClass("has-error");
            $("#attach-file-textbox").parent().find(".e-box").addClass("upload-error-border");
        },
        complete: function (e) {
            var filenameWithTime = fileName + "_" + currentTime + fileExtension;
            $("#support-file-path").val(supportFilePath + filenameWithTime);
            $("#support-file-name").val(orgFileName);
            $("#attach-file-textbox").removeClass("validation-failed-text").val(orgFileName + fileExtension);
            $("#attach-file-textbox").closest("div").removeClass("has-error");
            $("#attach-file-textbox").parent().find(".e-box").removeClass("upload-error-border");
            $("#concierge-support-popup_wrapper").ejWaitingPopup("hide");
            currentTime = null;
        }
    });

    $("#reply-attach-file").ejUploadbox({
        saveUrl: fileUploadUrl + "?imageType=supportfile&&timeStamp=" + GetUpdateIncidentCurrentTime(),
        autoUpload: true,
        showFileDetails: false,
        buttonText: { browse: ".  .  ." },
        extensionsAllow: ".Zip,.Rar,.Zipx,.7z",
        height: 26,
        fileSize: 30000000,
        multipleFilesSelection: false,
        begin: function () {
            $(".sm-loader").css("display", "block");
            $("#update-close").removeClass("btn-danger");
            $("#update-close").attr("disabled", "disabled");
            $("#update-confirm").attr("disabled", "disabled");
        },
        fileSelect: function (e) {
            updateCurrentTime = GetUpdateIncidentCurrentTime();
            e.model.saveUrl = fileUploadUrl + "?imageType=supportfile&&timeStamp=" + updateCurrentTime;
            fileExtension = e.files[0].extension.toLowerCase();
            orgFileName = e.files[0].name.split('.').slice(0, -1).join('.');
            fileName = orgFileName.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '');
        },
        error: function (e) {
            if (fileExtension !== ".zip" && fileExtension !== ".rar" && fileExtension !== ".zipx" && fileExtension !== ".7z") {
                $("#reply-attach-file-textbox").addClass("validation-failed-text").val(window.Server.App.LocalizationContent.InValidFileFormat);
            }
            else {
                $("#reply-attach-file-textbox").addClass("validation-failed-text").val(window.Server.App.LocalizationContent.FileSizeInvalid);
            }

            $("#reply-attach-file-textbox").closest("div").addClass("has-error");
            $("#reply-attach-file-textbox").parent().find(".e-box").addClass("upload-error-border");
        },
        complete: function (e) {
            var filenameWithTime = fileName + "_" + updateCurrentTime + fileExtension;
            $(".sm-loader").css("display", "none");
            $("#support-file-path-update").val(supportFilePath + filenameWithTime);
            $("#support-file-name-update").val(orgFileName);
            $("#reply-attach-file-textbox").removeClass("validation-failed-text").val(orgFileName + fileExtension);
            $("#reply-attach-file-textbox").closest("div").removeClass("has-error");
            $("#reply-attach-file-textbox").parent().find(".e-box").removeClass("upload-error-border");
            if (updateMd.codemirror.getValue() !== "") {
                $("#update-close").addClass("btn-danger");
                $("#update-close").removeAttr("disabled");
                $("#update-confirm").removeAttr("disabled");
            }
            updateCurrentTime = null;
        }
    });

    $(".support-message").on('focus', 'textarea', function () {
        $('textarea').pastableTextarea();
    });

    $(".reply-message").on('focus', 'textarea', function (e) {
        currentMdeId = "updateMde";
        $('textarea').pastableTextarea();
    });

    $("#attach-file-textbox").show();

    $("#is-concierge-request").on("change", function (e) {
        $("#concierge-submit-button").attr("disabled", true);
        $(".conceirge-loader").css("display", "inline-block");
        var isEnabled = $("#is-concierge-request").is(":checked");
        if (isEnabled) {
            getConciergeUserAccess(e);
        }
        else {
            $("#concierge-support-checkbox").hide();
            $(".conceirge-loader").css("display", "none");
            ValidateConciergeSupportRequest(e);
        }
    });

    $("#reply-button").on("click", function () {
        $("#reply-button").css("display", "none");
        $("#reply").css("display", "block");
        if (updateMd == undefined) {
            updateMd = renderMdeWithToolbar("#updateMde");
            currentMdeId = "updateMde";
            updateMd.codemirror.on('change', function (e) {
                var valueMde = updateMd.codemirror.getValue();
                $("#updateMde").val(valueMde);
                if (valueMde.trim() == "") {
                    $("#update-close").removeClass("btn-danger");
                    $("#update-close").attr("disabled", "disabled");
                    $("#update-confirm").attr("disabled", "disabled");
                }
                else {
                    $("#update-close").addClass("btn-danger");
                    $("#update-close").removeAttr("disabled");
                    $("#update-confirm").removeAttr("disabled");
                }
            });
        }
        if (updateMd.isPreviewActive()) {
            updateMd.togglePreview();
        }

        resetValidationBoxUpdate();
    });

    $("#update-cancel").on("click", function () {
        updateMd.codemirror.setValue("");
        $("#reply-button").css("display", "block");
        $("#reply").css("display", "none");
        $("#reply-attach-file-textbox").val(window.Server.App.LocalizationContent.BrowsePath);
        $("#support-file-path").val("");
        $("#support-file-name").val("");
        resetValidationBoxUpdate();
    });

    $("#update-close").on("click", function () {
        $('<input />').attr('type', 'hidden')
            .attr('name', "is-close-request")
            .attr('value', "true")
            .appendTo('#incidentUpdateForm');
        $("#reply").ejWaitingPopup("show");
        $("#update-close").removeClass("btn-danger");
        addFileLink();
    });

    $("#update-confirm").on("click", function () {
        $("#reply").ejWaitingPopup("show");
        $("#update-close").removeClass("btn-danger");
        addFileLink();
    });
});

$("#incidentUpdateForm").submit(function (e) {
    $("#update-close").attr("disabled", "disabled");
    $("#update-confirm").attr("disabled", "disabled");
});

$(document).on("click touchend", ".request-concierge-support", function (e) {
    if ($(this).attr('id') === "embed-bi") {
        $("#concierge-support-subject").val("Request to unlock Embedded BI feature");
    } else {
        $("#concierge-support-subject").val("");
    }

    $("#concierge-support-popup").show();
    openSupportDialog(true, e);
    currentMdeId = "concierge-support-message";
});

$("#close-concierge-support, #concierge-cancel-button").on("click", function () {
    $("#concierge-support-subject").val("");
    conciergeSupportMd.value("");
    $("#is-concierge-request, #concierge-access-checkbox").removeAttr("checked");
    $("#concierge-support-checkbox, #admin-access-message").hide();
    $("#attach-file-textbox").val(window.Server.App.LocalizationContent.BrowsePath);
    $("#support-file-path").val("");
    $("#support-file-name").val("");
    $("#concierge-submit-button").attr("disabled", true);
    $("#concierge-support-popup").ejDialog("close");
    resetValidationBoxSupport();
});

$("#concierge-support-subject").on("keyup", function (e) {
    ValidateConciergeSupportRequest(e);
});

$(document).on("click", "#attach-file-textbox, #reply-attach-file-textbox", function (e) {
    if (e.target.id == "attach-file-textbox") {
        $("#attach-file").children().find(".e-uploadinput").trigger("click");
        $("#attach-file").focus();
        currentEjUploadId = "attach-file";
    }
    else {
        $("#reply-attach-file").children().find(".e-uploadinput").trigger("click");
        $("#reply-attach-file").focus();
        currentEjUploadId = "reply-attach-file";
    }
});

$(document).on("click", ".e-uploadinput", function (e) {
    currentEjUploadId = $(this).parent().parent().attr("id");
});

function resetValidationBoxSupport() {
    $("#attach-file").ejUploadbox("refresh");
    $("#attach-file-textbox").closest("div").removeClass("has-error");
    $("#attach-file-textbox").removeClass("validation-failed-text");
    $("#attach-file-textbox").val(window.Server.App.LocalizationContent.BrowsePath);
}

function resetValidationBoxUpdate() {
    $("#reply-attach-file").ejUploadbox("refresh");
    $("#reply-attach-file-textbox").closest("div").removeClass("has-error");
    $("#reply-attach-file-textbox").removeClass("validation-failed-text");
    $("#reply-attach-file-textbox").val(window.Server.App.LocalizationContent.BrowsePath);
}

function OnConciergeSupportOpen() {
    $("#concierge-support-subject").focus();
}

function OnConciergeSupportClose() {
    $("#concierge-support-popup_wrapper").ejWaitingPopup("hide");
}

function ValidateConciergeSupportRequest(e) {
    var conciergeSupportMessage = conciergeSupportMd.value().trim();

    if ($("#concierge-support-subject").val().trim().length > 0 && conciergeSupportMessage.length > 0) {
        $("#concierge-submit-button").removeAttr("disabled");
    } else {
        $("#concierge-submit-button").attr("disabled", true);
    }
}

function getConciergeUserAccess(e) {
    $.ajax({
        type: "POST",
        url: checkConciergeUserAccess,
        success: function (result) {
            if (result.Status) {
                $('#terms-info').appendTo("#concierge-support-checkbox");
                isUserAccess = result.UserAccess;
                isAdmin = result.IsAdmin;
                if (result.UserAccess) {
                    if (result.IsAdmin) {
                        if (appBranding === "syncfusion") {
                            $(".concierge-support-access").html(window.Server.App.LocalizationContent.AlreadyHaveUserAccessAdmin_syncfusion + " <a class='app-hyperlink' href='" + conciergeSupportSettingsUrl + "' target='_blank'>" + window.Server.App.LocalizationContent.Here + ".<a>");
                        }
                        else {
                            $(".concierge-support-access").html(window.Server.App.LocalizationContent.AlreadyHaveUserAccessAdmin_boldbi + " <a class='app-hyperlink' href='" + conciergeSupportSettingsUrl + "' target='_blank'>" + window.Server.App.LocalizationContent.Here + ".<a>");
                        }
                        
                        $("#admin-access-message").hide();
                    } else {
                        if (appBranding === "syncfusion") {
                            $(".concierge-support-access").html(window.Server.App.LocalizationContent.AlreadyHaveUserAccess_syncfusion);
                        }
                        else {
                            $(".concierge-support-access").html(window.Server.App.LocalizationContent.AlreadyHaveUserAccess_boldbi);
                        }
                        
                        $("#admin-access-message").text(window.Server.App.LocalizationContent.AlreadyHaveUserAccessManageAdmin).show();
                    }

                    $('#terms-info').appendTo("#concierge-support-checkbox label[for='concierge-access-checkbox']");
                    $(".concierge-support-access").addClass("hide-checkbox");
                } else {
                    $(".concierge-support-access").html(window.Server.App.LocalizationContent.AllowUserAccess);

                    if (result.IsAdmin) {
                        $("#concierge-access-checkbox").attr("disabled", false);
                        $("#admin-access-message").hide();
                    } else {
                        $("#concierge-access-checkbox").attr("disabled", true);
                        $("#admin-access-message").text(window.Server.App.LocalizationContent.AllowUserAccessCheckAdmin).show();
                    }

                    $('#terms-info').insertAfter("#concierge-support-checkbox label[for='concierge-access-checkbox']");
                    $(".concierge-support-access").removeClass("hide-checkbox");
                    $("#concierge-access-checkbox").removeAttr("checked");
                }

                $("#concierge-support-checkbox").show();
                $(".conceirge-loader").css("display", "none");
                ValidateConciergeSupportRequest(e);
            }
        }
    });
}

function renderMdeForSupport(id) {
    var simplemde = new EasyMDE({
        element: $(id)[0],
        status: false,
        spellChecker: false,
        autoDownloadFontAwesome: false,
        placeholder: window.Server.App.LocalizationContent.EasyMdePlaceholder,
        toolbar: false,
        previewRender: function (plainText) {
            return customMarkdownParser(plainText); // Returns HTML from a custom parser
        },
        minHeight:"130px"
    });

    return simplemde;
}

function GetCurrentTime() {
    currentTime = $.now();
    return currentTime;
}

function GetUpdateIncidentCurrentTime() {
    updateCurrentTime = $.now();
    return updateCurrentTime;
}

function AppendFileDownloadPath(commentText) {
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
                url = supportFilePath + tag[i];
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

function addFileLink() {
    $('<input />').attr('type', 'hidden')
        .attr('name', "FileName")
        .attr('value', $("#support-file-name-update").val())
        .appendTo('#incidentUpdateForm');

    $('<input />').attr('type', 'hidden')
        .attr('name', "Link")
        .attr('value', $("#support-file-path-update").val())
        .appendTo('#incidentUpdateForm');
}

////Copy & Paste

function pasteImageReader(dataURL) {
    var dataUrl = dataURL;
    var values = { DataUrl: dataUrl };
    $.ajax({
        type: "POST",
        url: supportImageUrl,
        data: values,
        success: function (data) {
            if (data !== "" && data.indexOf("image-") !== -1) {
                var content = " ![](" + data + ")";
                if (currentMdeId === "updateMde") {
                    updateMd.codemirror.replaceSelection(AppendFileDownloadPath(content));
                }
                else {
                    conciergeSupportMd.codemirror.replaceSelection(content);
                }
            }
            if (currentMdeId === "updateMde") {
                $("#reply").ejWaitingPopup("hide");
            }
            else {
                $("#concierge-support-popup_wrapper").ejWaitingPopup("hide");
            }
        }
    });
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
                if (currentMdeId === "updateMde") {
                    $("#reply").ejWaitingPopup("hide");
                }
                else {
                    $("#concierge-support-popup_wrapper").ejWaitingPopup("hide");
                }
                return $(textarea).trigger('change');
            };
        })(this));
    };

    Paste.mountContenteditable = function (contenteditable) {
        var paste;
        paste = new Paste(contenteditable, contenteditable);
        $(contenteditable).on('focus', (function (_this) {
            if (currentMdeId === "updateMde") {
                $("#reply").ejWaitingPopup("hide");
            }
            else {
                $("#concierge-support-popup_wrapper").ejWaitingPopup("hide");
            }
            return function () {
                return $(contenteditable).addClass('pastable-focus');
            };
        })(this));
        return $(contenteditable).on('blur', (function (_this) {
            return function () {
                if (currentMdeId === "updateMde") {
                    $("#reply").ejWaitingPopup("hide");
                }
                else {
                    $("#concierge-support-popup_wrapper").ejWaitingPopup("hide");
                }
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
                if (currentMdeId === "updateMde") {
                    $("#reply").ejWaitingPopup("show");
                }
                else {
                    $("#concierge-support-popup_wrapper").ejWaitingPopup("show");
                }
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
                                        if (currentMdeId === "updateMde") {
                                            $("#reply").ejWaitingPopup("hide");
                                        }
                                        else {
                                            $("#concierge-support-popup_wrapper").ejWaitingPopup("hide");
                                        }
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
                                if (currentMdeId === "updateMde") {
                                    $("#reply").ejWaitingPopup("hide");
                                }
                                else {
                                    $("#concierge-support-popup_wrapper").ejWaitingPopup("hide");
                                }
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
                            if (currentMdeId === "updateMde") {
                                $("#reply").ejWaitingPopup("hide");
                            }
                            else {
                                $("#concierge-support-popup_wrapper").ejWaitingPopup("hide");
                            }
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
                    if (currentMdeId === "updateMde") {
                        $("#reply").ejWaitingPopup("hide");
                    }
                    else {
                        $("#concierge-support-popup_wrapper").ejWaitingPopup("hide");
                    }
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
                    if (currentMdeId === "updateMde") {
                        $("#reply").ejWaitingPopup("hide");
                    }
                    else {
                        $("#concierge-support-popup_wrapper").ejWaitingPopup("hide");
                    }
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
                    if (currentMdeId === "updateMde") {
                        $("#reply").ejWaitingPopup("hide");
                    }
                    else {
                        $("#concierge-support-popup_wrapper").ejWaitingPopup("hide");
                    }
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

function openSupportDialog(isOpenAsConciergeRequest, e) {
    resetValidationBoxSupport();
    isConciergeRequestPopup = isOpenAsConciergeRequest;

    if (conciergeSupportMd == undefined) {
        conciergeSupportMd = renderMde("#concierge-support-message");
    }

    if (isOpenAsConciergeRequest) {
        getConciergeUserAccess(e);
        $("#concierge-support-popup #support-dialog-header").text(window.Server.App.LocalizationContent.RequestConciergeSupport);
        $("#concierge-support-popup #concierge-support-description-label").text(window.Server.App.LocalizationContent.ConciergeSupportDescription).show();
        $("#concierge-support-checkbox").show();
        $("#create-new-concierge").hide();
    }
    else {
        $("#concierge-support-popup #support-dialog-header").text(window.Server.App.LocalizationContent.SupportTitle);
        $("#concierge-support-popup #concierge-support-description-label").hide();
        $("#create-new-concierge").show();
        $("#concierge-support-checkbox").hide();
    }

    $("#concierge-support-popup").ejDialog("open");
    $("#concierge-info").popover();
}

function renderMdeWithToolbar(id) {
    var simplemde = new EasyMDE({
        element: $(id)[0],
        status: false,
        spellChecker: false,
        placeholder: window.Server.App.LocalizationContent.EasyMdePlaceholder,
        autoDownloadFontAwesome: false,
        toolbar: [
            {
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
                name: "preview",
                action: EasyMDE.togglePreview,
                className: "su su-preview no-disable",
                title: window.Server.App.LocalizationContent.Preview,
            }
        ],
        previewRender: function (plainText) {
            return customMarkdownParser(plainText); // Returns HTML from a custom parser
        }
    });
    $('.su-upload-image').attr('id') == 'comment-image-file' ? $(".su-upload-image").attr('id', 'comment-image-edit-file') : $(".su-upload-image").attr('id', 'comment-image-file');
    return simplemde;
}

function customMarkdownParser(plainText) {
    var userStringMatches = [];
    var groupStringMatches = [];
    var allStringMatches = [];
    var userRegex = /(?:\@\ (.*?)\ )/g;
    var groupRegex = /(?:\@\ (.*?)\ )/g;
    var allregex = /(@all)/g;
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
    }
    htmlText = $("#toRemoveCulture").html();
    return htmlText;
}