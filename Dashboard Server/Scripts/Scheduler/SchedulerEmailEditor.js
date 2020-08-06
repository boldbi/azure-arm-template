var scheduleEmailEditRTE = "";
var activeFilterCondition = "";

$(document).ready(function () {
    $(".schedule-dialog #email-editor-panel").css("display", "inline");
    var selectOptions = "";
    for (var t = 0; t < filterContent.Filters.length; t++) {
        selectOptions += "<option data-id='" + filterContent.Filters[t].FilterName + "'>" + filterContent.Filters[t].DisplayText + "</option>"
    }
    $("#widget-items").html(selectOptions).selectpicker("refresh");
    scheduleEmailEditRTE = new ejs.richtexteditor.RichTextEditor({
        height: '410px',
        formatter: new ejs.richtexteditor.MarkdownFormatter({ listTags: { 'OL': '1., 2., 3.' } }),
        toolbarSettings: {
            items: ['Bold', 'Italic', '|',
                'Formats', 'OrderedList', 'UnorderedList', '|',
                'CreateLink', 'Image', 'CreateTable', '|',
                {
                    tooltipText: 'Preview', template: '<button id="preview-code" class="e-tbar-btn e-control e-btn e-icon-btn">' +
                        '<span class="e-btn-icon su su-preview e-icons"></span></button>'
                },
            ]

        },
        editorMode: 'Markdown',
        created: function () {
            textArea = scheduleEmailEditRTE.contentModule.getEditPanel();
            mdsource = document.getElementById('preview-code');
            mdsource.addEventListener('click', function (e) {
                fullPreview();
                if (e.currentTarget.classList.contains('e-active')) {
                    scheduleEmailEditRTE.disableToolbarItem(['Bold', 'Italic', 'OrderedList',
                        'UnorderedList', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Undo', 'Redo'
                    ]);
                } else {
                    scheduleEmailEditRTE.enableToolbarItem(['Bold', 'Italic', 'OrderedList',
                        'UnorderedList', 'CreateLink', 'Image', 'CreateTable', 'Formats', 'Undo', 'Redo'
                    ]);
                }
            });
        },
    });

    function fullPreview() {
        var id = scheduleEmailEditRTE.getID() + 'html-preview';
        var htmlPreview = scheduleEmailEditRTE.element.querySelector('#' + id);
        if (mdsource.classList.contains('e-active')) {
            mdsource.classList.remove('e-active');
            mdsource.parentElement.title = 'Preview';
            scheduleEmailEditRTE.enableToolbarItem(scheduleEmailEditRTE.toolbarSettings.items);
            textArea.style.display = 'block';
            htmlPreview.style.display = 'none';
        }
        else {
            mdsource.classList.add('e-active');
            scheduleEmailEditRTE.disableToolbarItem(scheduleEmailEditRTE.toolbarSettings.items);
            if (!htmlPreview) {
                htmlPreview = ejs.base.createElement('div', { className: 'e-content e-pre-source' });
                htmlPreview.id = id;
                textArea.parentNode.appendChild(htmlPreview);
            }
            textArea.style.display = 'none';
            htmlPreview.style.display = 'block';
            htmlPreview.innerHTML = marked(scheduleEmailEditRTE.contentModule.getEditPanel().value);
            mdsource.parentElement.title = 'Code View';
        }
    }

    if (actionType == "Create") {
        //do not add localization here, since it has been added for mail content
        scheduleEmailEditRTE.value = "Hi {:Username},\n\nThe configured data notification condition has been met. \n \nPlease find a snapshot of the current state of the dashboard attached.\n\nRegards,\n\n{:OrganizationName}";
    }
    else {
        if (emailContent == null) {
            //do not add localization here, since it has been added for mail content
            scheduleEmailEditRTE.value = "Hi {:Username},\n\nThe configured data notification condition has been met. \n \nPlease find a snapshot of the current state of the dashboard attached.\n\nRegards,\n\n{:OrganizationName}";
        }
        else {
            scheduleEmailEditRTE.value = emailContent;
        }
    }
  
    scheduleEmailEditRTE.appendTo('#email-editor-panel #selected-users-container');
    parent.$("#popup-container_wrapper").ejWaitingPopup("hide");
    parent.$("#editpopup-container_wrapper").ejWaitingPopup("hide");
    activeFilterCondition = $("#widget-items option").val().trim();
});

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
    }
    return commentText;
}

document.getElementById("add-alert-column").addEventListener("click", function () {
    scheduleEmailEditRTE.focusIn();
    setValue("{:" + activeFilterCondition + "}");
})

function setValue(value) {
    var start = scheduleEmailEditRTE.inputElement.selectionStart;
    var end = scheduleEmailEditRTE.inputElement.selectionEnd;
    var selection = scheduleEmailEditRTE.formatter.editorManager.markdownSelection.getSelectedInlinePoints(scheduleEmailEditRTE.inputElement);
    scheduleEmailEditRTE.inputElement.value = scheduleEmailEditRTE.inputElement.value.substr(0, start)
        + value + scheduleEmailEditRTE.inputElement.value.substr(selection.end, scheduleEmailEditRTE.inputElement.value.length);
}

$(document).on("click", "#email-alert-widget-container .bootstrap-select .dropdown-menu .selectpicker li a", function (e) {
    activeFilterCondition = ($("#widget-items option")[$(e.target.parentElement).index()]).value.trim();
});