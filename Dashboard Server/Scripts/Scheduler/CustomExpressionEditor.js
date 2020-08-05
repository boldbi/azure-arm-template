var listItems = "";
var datasourceId = $("#datasourceid").val();
var userId = $("#userid").val();
var oldExpNames = [];

$(document)
    .ready(function () {
        parent.$("#custom-expression-editor-container_wrapper").ejWaitingPopup("hide");
        var customExpressionEditorWaitingPopupTemplateId = createLoader(".custom-expression-editor-container");
		$(".custom-expression-editor-container").ejWaitingPopup({ template:$("#" + customExpressionEditorWaitingPopupTemplateId) });
        if (columns != undefined) {
            for (var t = 0; t < columns.length; t++) {
                listItems += '<option value="' + columns[t].ColumnVariant + '">' + columns[t].ColumnName + '</option>';
            }
            $("#selected-column-value").html("");
            $("#selected-column-value").html(listItems).selectpicker("refresh");
            listItems = "";
            addTitleForColumnName();
        }
        if (functionTypes != undefined) {
            for (var i = 0; i < functionTypes.length; i++) {
                listItems += '<option value="' + functionTypes[i].Type + '">' + functionTypes[i].Function + '</option>';
            }
            $("#selected-function-value").html("");
            $("#selected-function-value").html(listItems).selectpicker("refresh");
            listItems = "";
            addValueForFunctions();
            addTitleForFunctions();
        }
        addPlusIcon();
        if (expressionList != undefined) {
            for (var i = 0; i < expressionList.Data.Result.length; i++) {
                listItems += "<li class='items' data-value='" + expressionList.Data.Result[i].Name + "' value='" + expressionList.Data.Result[i].ExpressionId + "' data-expression='" + expressionList.Data.Result[i].Expression + "'>" +
                                    expressionList.Data.Result[i].Name +
                                    "<span class='su-close hidden'></span></li>";
                            }
                            $("#list-items").html("");
                            $("#list-items").html(listItems);
            $("ul#list-items li").first().click();
        }
        $("#messageBox").ejDialog({
            width: "395px",
            showOnInit: false,
            allowDraggable: true,
            enableResize: false,
            height: "auto",
            showHeader: false,
            enableModal: true,
            close: "onMessageDialogClose"
        });
});

$(document).on("click", "#back-button", function () {
    var measureList = "";
    var dimenList = "";
    parent.$(".measure-column select,.measure-column-col select")
                       .each(function () {
                           for (var j = 0; j < $("ul li.items").length; j++) {
                               for (var m = 0; m < oldExpNames.length; m++) {
                                   var removeOption = parent.$(this)
                                       .find("option[value='" + oldExpNames[m] + "']")
                                       .length;
                                   if (removeOption == 1) {
                                       parent.$(this)
                                           .find("option[value='" + oldExpNames[m] + "']").remove();
                                   }
                               }
                               var isExistLength = parent.$(this)
                                       .find("option[value='" + $($("ul li.items")[j]).attr("data-value") + "']")
                                       .length;
                                   if (isExistLength == 0) {
                                       measureList += '<option value="' +
                                           $($("ul li.items")[j]).attr("data-value") +
                                           '">' +
                                           $($("ul li.items")[j]).attr("data-value") +
                                           '</option>';
                                   }
                               }
                           parent.$(this).append(measureList).selectpicker("refresh");
                           addTitleForColumnsInDataChanges();
                           measureList = "";
                       });
    parent.$(".dimension-column select,.dimension-column-col select").each(function () {
        for (var j = 0; j < $("ul li.items").length; j++) {
            for (var m = 0; m < oldExpNames.length; m++) {
                var removeOption = parent.$(this)
                    .find("option[value='" + oldExpNames[m] + "']")
                    .length;
                if (removeOption == 1) {
                    parent.$(this)
                        .find("option[value='" + oldExpNames[m] + "']").remove();
                }
            }
            var isExistLength = parent.$(this)
                    .find("option[value='" + $($("ul li.items")[j]).attr("data-value") + "']")
                    .length;
                if (isExistLength == 0) {
                    dimenList += '<option value="' +
                        $($("ul li.items")[j]).attr("data-value") +
                        '">' +
                        $($("ul li.items")[j]).attr("data-value") +
                        '</option>';
                }
        }
        parent.$(this).append(dimenList).selectpicker("refresh");
        addTitleForColumnsInDataChanges();
        parent.$("#add-dimension-condition").css("display", "inline");
        dimenList = "";
    });
    onExpressionEditorDialogClose();
});
   
function addPlusIcon() {
    if ($(".column-dropdown-values").find("span.su-add").length == 0) {
        for (var i = 0; i < $(".column-dropdown-values  .btn-group .dropdown-menu .selectpicker li a").length; i++) {
            $($(".column-dropdown-values .btn-group .dropdown-menu .selectpicker li a")[i])
                .append('<span class="su-add hidden"></span>');
        }
    }
    if ($(".function-dropdown-values").find("span.su-add").length == 0) {
        for (var j = 0; j < $(".function-dropdown-values  .btn-group .dropdown-menu .selectpicker li a").length; j++) {
            $($(".function-dropdown-values .btn-group .dropdown-menu .selectpicker li a")[j]).append('<span class="su-add hidden"></span>');
        }
    }
}
  
$(document).on("click", ".column-dropdown-values .bootstrap-select li", function (e) {
    $(this).removeClass("active").parent('ul').parent("div.dropdown-menu").css("overflow", "visible");
    $(this).siblings().find("span.su-add").addClass("hidden");
    $(this).find("span.su-add").removeClass("hidden");
    var selected = $(this).find("a span.text").text();
    var content = "[" + selected + "]";
    var cursorPosition = $('#rte-post').prop("selectionStart");
    var text = $('#rte-post').val();
    var newText = text.substring(0, cursorPosition) + content + text.substring(cursorPosition, text.length);
    $('#rte-post').val(newText);
    var updatedcontentposition = cursorPosition + (content.length);
    setSelectionRange(document.getElementById("rte-post"), updatedcontentposition, updatedcontentposition);
    $("#rte-post").removeClass("has-error");
    $("#expression-text-validation").html("");
    $("#expression-text-validation").removeClass("validate-error");
    e.stopPropagation();
});

$(document).on("click", ".function-dropdown-values .bootstrap-select li", function (e) {
    $(this).removeClass("active").parent('ul').parent("div.dropdown-menu").css("overflow", "visible");
    $(this).siblings().find("span.su-add").addClass("hidden");
    $(this).find("span.su-add").removeClass("hidden");
    var selected = $(this).find("a span.text").text();
    if ($(this).attr("value").toLowerCase() == "logical") {
        var content = selected;
    } else {
        var content = selected + "()";
    }
    var cursorPosition = $('#rte-post').prop("selectionStart");
    var text = $('#rte-post').val();
    var newText = text.substring(0, cursorPosition) + content + text.substring(cursorPosition, text.length);
    $('#rte-post').val(newText);
    if ($(this).attr("value").toLowerCase() == "logical") {
        var updatedcontentposition = cursorPosition + (content.length);
    } else {
        var updatedcontentposition = cursorPosition + (content.length - 1);
    }
    setSelectionRange(document.getElementById("rte-post"), updatedcontentposition, updatedcontentposition);
    $("#rte-post").removeClass("has-error");
    $("#expression-text-validation").html("");
    $("#expression-text-validation").removeClass("validate-error");
    e.stopPropagation();
});

$(document).on("mouseover", ".column-dropdown-values .bootstrap-select .dropdown-menu .selectpicker li", function () {
    $(this).find("span.su-add").removeClass("hidden");
});

$(document).on("mouseleave", ".column-dropdown-values .bootstrap-select .dropdown-menu .selectpicker li", function () {
    $(this).find("span.su-add").addClass("hidden");
});

$(document).on("mouseover", ".function-dropdown-values .bootstrap-select .dropdown-menu .selectpicker li", function () {
    $(this).find("span.su-add").removeClass("hidden");
    for (var i = 0; i < functionTypes.length; i++) {
        if (functionTypes[i].Function == $(this).find("a span.text").html()) {
            $("#function-syntax").html(functionTypes[i].Syntax);
            $("#function-description").html(functionTypes[i].Description);
        }
    }
});

$(document).on("mouseleave", ".function-dropdown-values .bootstrap-select .dropdown-menu .selectpicker li", function () {
    $(this).find("span.su-add").addClass("hidden");
    $("#function-syntax").html("");
    $("#function-description").html("");
});

$(document).on("mouseover", ".custom-expressions-list #list-items li", function () {
    $(this).find("span.su-close").removeClass("hidden");
});

$(document).on("mouseleave", ".custom-expressions-list #list-items li", function () {
    $(this).find("span.su-close").addClass("hidden");
});

$(document).on("keydown",".column-dropdown-values .bootstrap-select .dropdown-menu .bs-searchbox .input-block-level", function (e) {
    $(this).parent('div.bs-searchbox').parent("div.dropdown-menu").css("overflow", "visible");
    e.stopPropagation();
});

$(document).on("keydown", ".function-dropdown-values .bootstrap-select .dropdown-menu .bs-searchbox .input-block-level", function (e) {
    $(this).parent('div.bs-searchbox').parent("div.dropdown-menu").css("overflow", "visible");
    e.stopPropagation();
});

$(document).on("change", "#selected_function", function () {
    var selected = $(this).find("option:selected").text();
    for (var i = 0; i < $("#selected-function-value").find("option").length; i++) {
        if ($($("#selected-function-value").find("option")[i]).val() == selected) {
            $($(".function-dropdown-values .bootstrap-select .dropdown-menu .selectpicker li")[i]).removeClass("hidden");
        } else {
            $($(".function-dropdown-values .bootstrap-select .dropdown-menu .selectpicker li")[i]).addClass("hidden");
        }
        if (selected.toLowerCase() == "all") {
            $($(".function-dropdown-values .bootstrap-select .dropdown-menu .selectpicker li")[i]).removeClass("hidden");
        }
    }
});

$(document).on("change", "#selected_column", function () {
    var selected = $(this).find("option:selected").text();
    for (var i = 0; i < $("#selected-column-value").find("option").length; i++) {
        if ($($("#selected-column-value").find("option")[i]).val() == selected) {
            $($(".column-dropdown-values .bootstrap-select .dropdown-menu .selectpicker li")[i]).removeClass("hidden");
        } else {
            $($(".column-dropdown-values .bootstrap-select .dropdown-menu .selectpicker li")[i]).addClass("hidden");
        }
        if (selected.toLowerCase() == "all") {
            $($(".column-dropdown-values .bootstrap-select .dropdown-menu .selectpicker li")[i]).removeClass("hidden");
        }
    }
});

$(document)
    .on("click",
        "#add-new-expression",
        function () {
            var expName = "Expression";
            var text = "";
            var i = 1;
            do {
                text = expName + i;
                i++;
            }
            while ($("ul li.items[data-value='" + text + "']").length>0);
            $("#expressionid").val('');
            $("#expression-name").val('');
            $("#expression-name-value").val(text);
            $("#rte-post").val('');
            $("#expression-text-validation").html("");
            $("#expression-name-validation").html("");
            $("#expression-name-value").removeClass("has-error");
            $("#expression-name-validation").removeClass("validate-error");
            $("#rte-post").removeClass("has-error");
            $("#expression-text-validation").removeClass("validate-error");
        });

$(document).on("click", "#save-expression",
    function () {
        $(".custom-expression-editor-container").ejWaitingPopup("show");
        if ($("#expression-name-value").val() == "") {
            $("#expression-name-value").addClass("has-error");
            $("#expression-name-validation").html(window.Server.App.LocalizationContent.ExpressionValidator);
            $("#expression-name-validation").addClass("validate-error");
            $(".custom-expression-editor-container").ejWaitingPopup("hide");
            return false;
        }
        if ($("#rte-post").val() == "") {
            $("#rte-post").addClass("has-error");
            $("#expression-text-validation").html(window.Server.App.LocalizationContent.ExpressionTextvalidator);
            $("#expression-text-validation").addClass("validate-error");
            $(".custom-expression-editor-container").ejWaitingPopup("hide");
            return false;
        }
        var datasourceId = $("#datasourceid").val();
        var expressionName = $("#expression-name-value").val();
        var expressionText = $("#rte-post").val();
        var itemId = $("#itemid").val();
        var userId = $("#userid").val();
        var widgetName = $("#widgetname").val();
        var expressionId = $("#expressionid").val();
        var oldExpName = $("#expression-name").val();
        var widgetId = $("#widgetid").val();
        var columnInfo = $("#columninfo").val();
        if (expressionId != 0) {
            $.ajax({
                type: "POST",
                url: checkExpressionNameExistsWithExpressionId,
                data: {
                    datasourceId: datasourceId,
                    expressionName: expressionName,
                    userId: userId,
                    expressionId: expressionId
                },
                success: function(data) {
                    if (data.toLowerCase() == "false") {
                        $.ajax({
                            type: "POST",
                            url: UpdateCustomExpression,
                            data: {
                                widgetName: widgetName,
                                id: expressionId,
                                dashboardId: itemId,
                                datasourceId: datasourceId,
                                userId: userId,
                                expressionName: expressionName,
                                expressionText: expressionText,
                            },
                            success: function(data) {
                                if (data.Result == true) {
                                    for (var i = 0; i < $("#list-items").find(".items").length; i++) {
                                        if ($($("#list-items").find(".items")[i]).val() == expressionId) {
                                            $($("#list-items").find(".items")[i]).text(expressionName);
                                            $($("#list-items").find(".items")[i])
                                                .append("<span class='su-close hidden'></span>");
                                            $($("#list-items").find(".items")[i]).attr("data-value", expressionName)
                                        }
                                    }
                                    $("#expression-text-validation").html(window.Server.App.LocalizationContent.ExpressionUpdateSuccess);
                                    if (parent.listItems.indexOf(oldExpName) != -1) {
                                            var newOption = '<option value="' +
                                        expressionName +
                                        '">' +
                                        expressionName +
                                        '</option>';
                                            var oldOption = '<option value="' +
                                        oldExpName +
                                        '">' +
                                        oldExpName +
                                        '</option>';
                                            parent.listItems = parent.listItems.replace(oldOption, newOption);
                                        }
                                        if (parent.listDimensionItems.indexOf(oldExpName) != -1) {
                                            var newOption = '<option value="' +
                                        expressionName +
                                        '">' +
                                        expressionName +
                                        '</option>';
                                            var oldOption = '<option value="' +
                                        oldExpName +
                                        '">' +
                                        oldExpName +
                                        '</option>';
                                            parent.listDimensionItems = parent.listDimensionItems.replace(oldOption, newOption);
                                        }
                                        oldExpNames.push(oldExpName);
                                        SuccessAlert(window.Server.App.LocalizationContent.ExpressionUpdated, window.Server.App.LocalizationContent.ExpressionUpdateSuccess, 5000);
                                    $("#expression-text-validation").html("");
                                } else {
                                    $("#rte-post").addClass("has-error");
                                    $("#expression-text-validation").addClass("validate-error");
                                    if (data.ErrorDetails != null) {
                                        $("#expression-text-validation").html(data.ErrorDetails);
                                    } else {
                                        $("#expression-text-validation").html(window.Server.App.LocalizationContent.IsValidExpression);
                                    }
                                }
                                $(".custom-expression-editor-container").ejWaitingPopup("hide");
                            }
                        });
                    }
                    else {
                        $("#expression-name-value").addClass("has-error");
                        $("#expression-name-validation").html(window.Server.App.LocalizationContent.IsExpressionNameExist);
                        $("#expression-name-validation").addClass("validate-error");
                        $(".custom-expression-editor-container").ejWaitingPopup("hide");
                        return false;
                    }
                }
            });
        } else {
            $.ajax({
                type: "POST",
                url: checkExpressionNameExists,
                data: {
                    datasourceId: datasourceId,
                    expressionName: expressionName,
                    userId: userId
                },
                success: function(data) {
                    if (data.toLowerCase() == "false") {
                        $.ajax({
                            type: "POST",
                            url: saveCustomExpressionUrl,
                            data: {
                                userId: userId,
                                expressionName: expressionName,
                                expressionText: expressionText,
                                dashboardId: itemId,
                                widgetName: widgetName,
                                datasourceId: datasourceId
                            },
                            success: function(data) {
                                if (data.Result == true) {
                                    $.ajax({
                                        type: "POST",
                                        url: getExpressionDetailsByName,
                                        data: {
                                            name: expressionName,
                                            datasourceId: datasourceId
                                        },
                                        success: function(data) {
                                            if (data.Result != null) {
                                                listItems = "<li class='items' data-value='" + expressionName + "' value='" + data.Result.ExpressionId + "' data-expression='" + data.Result.Expression + "'>" +
                                                    expressionName +
                                                    "<span class='su-close hidden'></span></li>";
                                                $("#expressionid").val(data.Result.ExpressionId);
                                                $("#expression-name").val(expressionName);
                                                        $("#columninfo").val(data.Result.ColumnInfo);
                                                        $("#widgetid").val(data.Result.WidgetId);
                                                if ($("#list-items").find(".items").length == 0) {
                                                    $("#list-items").html("");
                                                    $("#list-items").html(listItems);
                                                } else {
                                                    $("#list-items").find(".items:last").after(listItems);
                                                }
                                                parent.listItems += '<option value="' + expressionName + '">' + expressionName + '</option>';
                                                parent.listDimensionItems += '<option value="' + expressionName + '">' + expressionName + '</option>';
                                            }
                                            $(".custom-expression-editor-container").ejWaitingPopup("hide");
                                        }
                                    });
                                    SuccessAlert(window.Server.App.LocalizationContent.SaveExpression, window.Server.App.LocalizationContent.SaveExpressionSuccess, 5000);
                                    $("#expression-text-validation").html("");
                             } else {
                                    $("#rte-post").addClass("has-error");
                                    $("#expression-text-validation").addClass("validate-error");
                                    if (data.ErrorDetails != null) {
                                        $("#expression-text-validation").html(data.ErrorDetails);
                                    } else {
                                        $("#expression-text-validation").html(window.Server.App.LocalizationContent.IsValidExpression);
                                    }
                                }
                                listItems = "";
                                $(".custom-expression-editor-container").ejWaitingPopup("hide");
                            }
                        });
                    } else {
                        $("#expression-name-value").addClass("has-error");
                        $("#expression-name-validation").html(window.Server.App.LocalizationContent.IsExpressionNameExist);
                        $("#expression-name-validation").addClass("validate-error");
                        $(".custom-expression-editor-container").ejWaitingPopup("hide");
                        return false;
                    }
                }
            });
        }
    });

$(document).on("keyup keydown focusout", "#expression-name-value", function (event) {
    if ($.trim($("#expression-name-value").val()) != "") {
        $("#expression-name-value").removeClass("has-error");
        $("#expression-name-validation").html("");
        $("#expression-name-validation").removeClass("validate-error");
    }
    else {
        $("#expression-name-value").addClass("has-error");
        $("#expression-name-validation").html(window.Server.App.LocalizationContent.ExpressionValidator);
        $("#expression-name-validation").addClass("validate-error");
    }
});

$(document).on("keyup keydown focusout", "#rte-post", function (event) {
    if ($.trim($("#rte-post").val()) != "") {
        $("#rte-post").removeClass("has-error");
        $("#expression-text-validation").html("");
        $("#expression-text-validation").removeClass("validate-error");
    }
    else {
        $("#rte-post").addClass("has-error");
        $("#expression-text-validation").html(window.Server.App.LocalizationContent.ExpressionTextvalidator);
        $("#expression-text-validation").addClass("validate-error");
    }
});

$(document)
    .on("click",
        ".items",
        function () {
            $("#expression-text-validation").html("");
            var selected = $(this).text();
            $("#expression-name-value").val(selected);
            var expText = $(this).attr("data-expression");
            $("#rte-post").val(expText);
            var expId = $(this).attr("value");
            $("#expressionid").val(expId);
            $("#expression-name").val(selected);
            if ($.trim($("#expression-name-value").val()) != "") {
                $("#expression-name-value").removeClass("has-error");
                $("#expression-name-validation").html("");
                $("#expression-name-validation").removeClass("validate-error");
            }
            if ($.trim($("#rte-post").val()) != "") {
                $("#rte-post").removeClass("has-error");
                $("#expression-text-validation").html("");
                $("#expression-text-validation").removeClass("validate-error");
            }
        });

$(document)
    .on("click",
        ".items .su-close",
        function(e) {
            e.stopPropagation();
            var datasourceId = $("#datasourceid").val();
            var userId = $("#userid").val();
            var expressionName = $(this).parent("li").text();
            var targetElement = $(this).parent("li");
            DeleteExpression(userId, datasourceId, expressionName, targetElement);
        });

function DeleteExpression(userId, datasourceId, expressionName, targetElement) {
    messageBox("su-delete",
        window.Server.App.LocalizationContent.DeleteExpression,
        window.Server.App.LocalizationContent.DeleteExpressionConfirm,
        "error",
        function() {
            $.ajax({
                type: "POST",
                url: DeleteExpressionUrl,
                data: {
                    userId: userId,
                    datasourceId: datasourceId,
                    expressionName: expressionName
                },
                success: function(data) {
                    if (data.toLowerCase() == "true") {
                        targetElement.remove();
                        $("#expressionid").val('');
                        $("#expression-name").val('');
                        parent.$(".measure-column select option,.measure-column-col select option")
                       .each(function () {
                           for (var j = 0; j < parent.$(".measure-column select option,.measure-column-col select option").length; j++) {
                               if ($(parent.$(".measure-column select option,.measure-column-col select option")[j]).attr("value") == expressionName) {
                                   $(parent.$(".measure-column select option,.measure-column-col select option")[j])
                                       .remove();
                               }
                           }
                       });
                        parent.$(".dimension-column select option,.dimension-column-col select option")
                            .each(function () {
                                for (var i = 0; i < parent.$(".dimension-column select option,.dimension-column-col select option").length; i++) {
                                    if ($(parent.$(".dimension-column select option,.dimension-column-col select option")[i]).attr("value") == expressionName) {
                                        $(parent.$(".dimension-column select option,.dimension-column-col select option")[i])
                                            .remove();
                                    }
                                }
                            });
                        if (parent.listDimensionItems.indexOf(expressionName) != -1) {
                            var splitOption = '<option value="' +
                                expressionName +
                                '">' +
                                expressionName +
                                '</option>';
                            parent.listDimensionItems.split(splitOption);
                        }
                    }
                    if ($("#expression-name-value").val() == expressionName) {
                        $("#expression-name-value").val('');
                        $("#rte-post").val('');
                    }
                    SuccessAlert(window.Server.App.LocalizationContent.DeletedExpression, window.Server.App.LocalizationContent.DeletedExpressionSuccess, 5000);
                    $("#expression-text-validation").html("");
                    onCloseMessageBox();
                }
            });
        },
        function () {
            onCloseMessageBox();
        },
        "400px",
        "200px",
        "150px",
        "");
}
            
function addValueForFunctions() {
    if (functionTypes != undefined) {
        for (var i = 0; i < $("#selected-function-value option").length ; i++) {
            var functionType = $("#selected-function-value option").eq(i).attr("value");
            $($(".function-dropdown-values .bootstrap-select .dropdown-menu .selectpicker li")[i]).attr("value", functionType);
        }
    }
}

function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
        input.focus();
        input.setSelectionRange(selectionStart, selectionEnd);
    }
    else if (input.createTextRange) {
        var range = input.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
    }
}

$(document).on("click", "#close-icon span", function () {
    $("#back-button").trigger("click");
    onExpressionEditorDialogClose();
})

$(document)
    .on('keydown',
        function (ev) {
            if (ev.keyCode == 27) {
                $("#back-button").trigger("click");
                onExpressionEditorDialogClose();
            }
        });

$(document)
    .on('keydown',
        function (ev) {
            if (ev.keyCode == 46 && $("#expressionid").val() != "" && !$("#rte-post").is(":focus") && !$("#expression-name-value").is(":focus")) {
                    var expressionName = $("#expression-name-value").val();
                    var datasourceId = $("#datasourceid").val();
                    var userId = $("#userid").val();
                    for (var i = 0; i < $("ul li.items").length; i++) {
                        if ($($("ul li.items")[i]).text() == expressionName) {
                            var targetElement = $($("ul li.items")[i]);
                        }
                    }
                    DeleteExpression(userId, datasourceId, expressionName, targetElement);
                    $("#expressionid").val('');
                    $("#expression-name").val('');
               }
        });

function addTitleForFunctions() {
    for (var i = 0; i < $(".function-dropdown-values  .btn-group .dropdown-menu .selectpicker li").length; i++) {
        var hoveredtext = $(".function-dropdown-values  .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
        $(".function-dropdown-values  .btn-group .dropdown-menu .selectpicker li").eq(i).find("a").attr("title", hoveredtext);
    }
}

function addTitleForColumnName() {
    $("#selected-column-value").selectpicker("refresh");
    for (var i = 0; i < $(".column-dropdown-values  .btn-group .dropdown-menu .selectpicker li").length; i++) {
        var hoveredtext = $(".column-dropdown-values  .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
        $(".column-dropdown-values  .btn-group .dropdown-menu .selectpicker li").eq(i).find("a").attr("title", hoveredtext);
    }
}

$(document)
    .on("keyup",
        ".column-dropdown-values .btn-group .dropdown-menu .bs-searchbox input",
        function() {
            if ($(".column-dropdown-values .btn-group .dropdown-menu .bs-searchbox input").val() == "") {
                $(".column-dropdown-values .btn-group .dropdown-menu ul li").removeClass("active");
            }
        });

$(document)
    .on("keyup",
        ".function-dropdown-values .btn-group .dropdown-menu .bs-searchbox input",
        function () {
            if ($(".function-dropdown-values .btn-group .dropdown-menu .bs-searchbox input").val() == "") {
                $(".function-dropdown-values .btn-group .dropdown-menu ul li").removeClass("active");
            }
        });

$(document)
    .on("focus",
        ".column-dropdown-values .btn-group .dropdown-menu .bs-searchbox input",
        function () {
            $(".column-dropdown-values .btn-group .dropdown-menu ul li").removeClass("active");
        });

$(document)
    .on("focus",
        ".function-dropdown-values .btn-group .dropdown-menu .bs-searchbox input",
        function () {
            $(".function-dropdown-values .btn-group .dropdown-menu ul li").removeClass("active");
        });

function addTitleForColumnsInDataChanges() {
    for (var i = 0; i < parent.$(".measure-column-col  .btn-group .dropdown-menu .selectpicker li,.dimension-column-col  .btn-group .dropdown-menu .selectpicker li").length; i++) {
        var hoveredtext = parent.$(".measure-column-col .btn-group .dropdown-menu .selectpicker li,.dimension-column-col  .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
        parent.$(".measure-column-col .btn-group .dropdown-menu .selectpicker li,.dimension-column-col  .btn-group .dropdown-menu .selectpicker li ").eq(i).find("a").attr("title", hoveredtext);
    }
}