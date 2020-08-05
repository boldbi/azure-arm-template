var selectJoinOption = (window.Server.App.LocalizationContent.SelectJoin).replace("/ '/g", "\\'");
var targetColumn, actualColumn, valueAdded, conditionMeasure;
var validation = 0, conditionAdded = 0;
var display = 1;
var listItems;
var listDimensionItems;
var listDimensionValues;
var dropdown = 1;
var selectedRangeValues;
var dimensionColumns;
var measureColumns;
var addButtonClicked = 0;
var buttonValue;
var addConditionClicked = 0;
var summaryType = {
    0: "None",
    1: "Summation",
    2: "Average",
    3: "Maximum",
    4: "Minumum",
    5: "Standard Deviation",
    6: "Variance",
    7: "Count",
    8: "Distinct Count",
    9: "Weighted Average",
    10: "AGG"
}
var title = "";
$("#custom-expression-editor-container").ejDialog({
    allowDraggable: false,
    enableResize: false,
    enableModal: true,
    showHeader: false,
    showOnInit: false,
    close: "onExpressionEditorDialogClose",
    open: "onExpressionEditorDialogOpen",
    width: "876px"
});
var customExpressionWaitingPopupTemplateId = createLoader("custom-expression-editor-container_wrapper");
$("#custom-expression-editor-container_wrapper").ejWaitingPopup({ template:$("#" + customExpressionWaitingPopupTemplateId) });
$(document).on("click", "#add-alert-column", function () {
    cursorPos.codemirrorIgnore;
    var position = cursorPos.codemirror.getCursor();
    initialPosition = position;
    var line = position.line;
    var ch = position.ch;
    var getLine = cursorPos.codemirror.getLine(line);
    initialLine = getLine;
    var totalCh = getLine.length;
    cursorPos.codemirror.setSelection({ line: line, ch: 0 }, { line: line, ch: totalCh });
    cursorPos.codemirror.replaceSelection(initialLine);
    cursorPos.codemirror.setSelection({ line: line, ch: ch }, { line: line, ch: ch });
    var selected = $(':selected', this);
    var selectedLabel = $("#widget-items option:selected").closest('optgroup').attr('data-id');
    cursorPos.codemirror.replaceSelection("{:" + selectedLabel + ":" + $("#widget-items").val() + "}");
});

$(".condition-category").find("select").each(function () {
    if ($(this).find("option:selected").val == "") {
        $(this).siblings(".bootstrap-select").addClass("validation-error");
        $("#add-alert-rule").attr("disabled", true);
    }
    else {
        $(this).siblings(".bootstrap-select").removeClass("validation-error");
        $("#add-alert-rule").attr("disabled", false);
    }
});

$(document).on("focus", ".frequency-info", function () {
    if ($(this).val() == "") {
        $(this).parent("div").find("span").css("display", "inline");
        $(this).addClass("validation-error");
    }
    else {
        $(this).parent("div").find("span").css("display", "none");
        $(this).removeClass("validation-error");
    }
});
$(document).on("keyup", ".frequency-info", function () {
    if ($(this).val() == "") {
        $(this).parent("div").find("span").css("display", "inline");
        $(this).addClass("validation-error");
    }
    else {
        $(this).parent("div").find("span").css("display", "none");
        $(this).removeClass("validation-error");
    }
});
$(document).on("focusout", ".frequency-info", function () {
    if ($(this).val() != "") {
        $(this).parent("div").find("span").css("display", "none");
        $(this).removeClass("validation-error");
    }
    else {
        $(this).parent("div").find("span").css("display", "inline");
        $(this).addClass("validation-error");
    }
});
$(document).on("keyup", ".frequency-info", function () {
    if ($(this).val() != "") {
        $(this).parent("div").find("span").css("display", "none");
        $(this).removeClass("validation-error");
    }
    else {
        $(this).parent("div").find("span").css("display", "inline");
        $(this).addClass("validation-error");
    }
});
$(document).on("focus", ".add-value input", function () {
    if ($(this).val() == "") {
        $(this).parent(".add-value").find(".add-custom").css("display", "inline");
        $(this).parent(".add-value").find(".add-custom").css("visibility", "visible");
        $(this).addClass("validation-error");
    }
    else {
        $(this).parent(".add-value").find(".add-custom").css("display", "none");
        $(this).parent(".add-value").find(".add-custom").css("visibility", "hidden");
        $(this).removeClass("validation-error");
    }
});

$(document).on("focusout", ".add-value input", function () {
    if ($(this).val() != "") {
        $(this).parent(".add-value").find(".add-custom").css("display", "none");
        $(this).parent(".add-value").find(".add-custom").css("visibility", "hidden");
        $(this).removeClass("validation-error");
    }
    else {
        $(this).parent(".add-value").find(".add-custom").css("display", "inline");
        $(this).parent(".add-value").find(".add-custom").css("visibility", "visible");
        $(this).addClass("validation-error");
    }
});

$(document).on("focus", ".add-value-dimension input", function () {
    if ($(this).val() == "") {
        $(this).parent(".add-value-dimension").find(".add-dimension-custom").css("display", "inline");
        $(this).parent(".add-value-dimension").find(".add-dimension-custom").css("visibility", "visible");
        $(this).addClass("validation-error");
    }
    else {
        $(this).parent(".add-value-dimension").find(".add-dimension-custom").css("display", "none");
        $(this).parent(".add-value-dimension").find(".add-dimension-custom").css("visibility", "hidden");
        $(this).removeClass("validation-error");
    }
});

$(document).on("focusout", ".add-value-dimension input", function () {
    if ($(this).val() != "") {
        $(this).parent(".add-value-dimension").find(".add-dimension-custom").css("display", "none");
        $(this).parent(".add-value-dimension").find(".add-dimension-custom").css("visibility", "hidden");
        $(this).removeClass("validation-error");
    }
    else {
        $(this).parent(".add-value-dimension").find(".add-dimension-custom").css("display", "inline");
        $(this).parent(".add-value-dimension").find(".add-dimension-custom").css("visibility", "visible");
        $(this).addClass("validation-error");
    }
});

$(document).on("keyup", ".add-value input", function () {
    if ($(this).val() == "") {
        $(this).parent(".add-value").find(".add-custom").css("display", "inline");
        $(this).parent(".add-value").find(".add-custom").css("visibility", "visible");
        $(this).addClass("validation-error");
    }
    else {
        $(this).parent(".add-value").find(".add-custom").css("display", "none");
        $(this).parent(".add-value").find(".add-custom").css("visibility", "hidden");
        $(this).removeClass("validation-error");
    }
});

$(document).on("keyup", ".add-value input", function () {
    if ($(this).val() != "") {
        $(this).parent(".add-value").find(".add-custom").css("display", "none");
        $(this).parent(".add-value").find(".add-custom").css("visibility", "hidden");
        $(this).removeClass("validation-error");
    }
    else {
        $(this).parent(".add-value").find(".add-custom").css("display", "inline");
        $(this).parent(".add-value").find(".add-custom").css("visibility", "visible");
        $(this).addClass("validation-error");
    }
});

$(document).on("keyup", ".add-value-dimension input", function () {
    if ($(this).val() == "") {
        $(this).parent(".add-value-dimension").find(".add-dimension-custom").css("display", "inline");
        $(this).parent(".add-value-dimension").find(".add-dimension-custom").css("visibility", "visible");
        $(this).addClass("validation-error");
    }
    else {
        $(this).parent(".add-value-dimension").find(".add-dimension-custom").css("display", "none");
        $(this).parent(".add-value-dimension").find(".add-dimension-custom").css("visibility", "hidden");
        $(this).removeClass("validation-error");
    }
});

$(document).on("keyup", ".add-value-dimension input", function () {
    if ($(this).val() != "") {
        $(this).parent(".add-value-dimension").find(".add-dimension-custom").css("display", "none");
        $(this).parent(".add-value-dimension").find(".add-dimension-custom").css("visibility", "hidden");
        $(this).removeClass("validation-error");
    }
    else {
        $(this).parent(".add-value-dimension").find(".add-dimension-custom").css("display", "inline");
        $(this).parent(".add-value-dimension").find(".add-dimension-custom").css("visibility", "visible");
        $(this).addClass("validation-error");
    }
});

$(document).on("click", "#add-condition", function () {
    window.listItems = "";
    window.listDimensionItems = "";
    var itemId = $("#selected_dashboard").find("option:selected").val();
    var itemName = $("#selected-items").find("option:selected").val();
    if ($(this).siblings("#measure-div").find(".condition-div-statement").length == 0) {
        $("#measure-div").append('<span id="form-message" class="error-message-widget validate-error no-padding col-sm-8 col-xs-8"></span>' + '<label class="custom-expression-columns" style="top: 5px;">' + window.Server.App.LocalizationContent.CutomExpression + '</label>' + '<div class="col-sm-12 col-xs-12 condition-div-statement no-padding first-condition"><span class="filterarea"><span class="filterareatext"></span><input type="hidden" class="filterareainput"></span>' + '<a href="javascript:void(0);" title="" class="add-where-local remove-measure-dimension pull-right su su-close">'
                                       + '</a><div class="measure-statement col-sm-12 col-xs-12 no-padding">' +
                      '<div class="col-sm-3 col-xs-3 no-padding measure-column-col column" id="condition-first-col">' +
                           '<select id="selected-col-option" data-live-search="true" title="'+window.Server.App.LocalizationContent.SelectColumn+'" class="selectpicker select-condition col-sm-2 col-xs-2 no-padding no-margin" data-size="5">' +
                             '</select>' +
                       '</div>' +
                       '<input class="add-comparison btn"  type="button" value=' + window.Server.App.LocalizationContent.AddComparisionTarget + '>' +
                       '<div class="add-comparison-target col-sm-6 col-xs-6" ><span class="remove-comparison su su-close" data-toggle="tooltip" data-container="body" data-placement="right" title="' + window.Server.App.LocalizationContent.RemoveComparisionTarget + '"></span>' +
                         '<div class="col-sm-2 col-xs-1 no-padding column-condition no-margin" id="where-condition">' +
                       '<select id="selected-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="col-sm-1 col-xs-1 no-padding no-margin" data-size="5">' +
                           '<option value="0" selected="selected" class="su su-equals">Equals</option>' + '<option value="1" class="su su-not-equals">Not Equals</option>' + '<option value="2" class="su su-lesser-than">Less Than</option>' +
                               '<option value="3" class="su su-greater-than">Greater Than</option>' + '<option value="4" class="su su-lesser-than-or-equal-to">Less Than Or Equals</option>' + '<option value="5" class="su su-greater-than-or-equal-to">Greater Than Or Equals</option>' +
                               '</select>' +
                   '</div>' +
                    '<div class="col-sm-4 col-xs-3 no-padding condition-type no-margin" id="condition-type">' +
                       '<select id="switch-value" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectTarget+ '" class="selectpicker col-sm-2 col-xs-2 no-padding no-margin select-value" data-size="5">' +
                              '<option value="" disabled class="hide-option"selected="selected">' + window.Server.App.LocalizationContent.SelectTarget+ '</option>' + '<option value="0">Condition</option>' + '<option value="1">Custom</option>' +
                               '</select>' +
                   '</div>' +
                      '<div class="col-sm-5 col-xs-4 no-padding  measure-column-col  target-column no-margin" id="condition-second-col">' +
                           '<select id="selected-col2-option" data-live-search="true" title="'+window.Server.App.LocalizationContent.SelectColumn+'" class="selectpicker select-condition col-sm-2 col-xs-2 no-padding no-margin" data-size="5">' +
                            '</select>' +
                     '</div>' +
                             '<div class="col-sm-4 col-xs-4 no-padding no-margin add-value">' +
                   '<input type= "text"  id="value" class=" form-control validation-input">' + '<span class="add-custom" style="display:none;">' + window.Server.App.LocalizationContent.CustomValueNumericValidator+ '</span>' +
                   '</div>' + '</div>' + '<a href="javascript:void(0);" class="col-md-12  col-sm-12 col-lg-12 col-xs-12 add-where-local" id="add-dimensions">' +
                              '<span class="su su-add"></span>' +
                              '<span class="margin-alignment">Add Where condition</span>' +
                          '</a>' +

                   '</div>' + '<div class=" col-sm-12 col-xs-12 no-padding dimension-statement no-margin">' + '</div>' +

                       '</div>');
    }
    else {
        $("#measure-div").append('<div class="col-sm-12 col-xs-12 condition-div-statement no-padding margin-condition-div-statement"><span class="filterarea"><span class="filterareatext"></span><input type="hidden" class="filterareainput"></span><a href="javascript:void(0);" title="" class="remove-measure-dimension pull-right su su-close"></a>' +
            '<div class="col-sm-2 col-xs-2 no-padding selected-joins" id="selected-joins">' +
        '<select id="selected-join-option" data-live-search="true" title=' + selectJoinOption + ' class="selectpicker col-sm-2 col-xs-2 join-option no-padding" data-size="5">' +
            '<option value="0" class="and" selected="selected">AND</option>' +
                     '<option value="1" class="or">OR</option>' +
                     '<option value="2" class="nand">AND NOT</option>' +
                     '<option value="3" class="nor">OR NOT</option>' +
        '</select>' +
    '</div>' + '<div class="measure-statement col-sm-12 col-xs-12 no-padding">' +
                      '<div class="col-sm-3 col-xs-3 no-padding measure-column-col column" id="condition-first-col">' +
                           '<select id="selected-col-option" data-live-search="true" title="'+window.Server.App.LocalizationContent.SelectColumn+'" class="selectpicker select-condition col-sm-2 col-xs-2 no-padding no-margin" data-size="5">' +
                             '</select>' +
                       '</div>' +
                        '<input class="add-comparison btn"  type="button" value=' + window.Server.App.LocalizationContent.AddComparisionTarget + '>' +
                       '<div class="add-comparison-target col-sm-6 col-xs-6" ><span class="remove-comparison su su-close" data-toggle="tooltip" data-container="body" data-placement="right" title="' + window.Server.App.LocalizationContent.RemoveComparisionTarget + '"></span>' +
                         '<div class="col-sm-2 col-xs-1 no-padding  column-condition no-margin" id="where-condition">' +
                       '<select id="selected-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="col-sm-4 col-xs-4 no-padding no-margin" data-size="5">' +
                      '<option value="0" selected="selected" class="su su-equals">Equals</option>' + '<option value="1" class="su su-not-equals">Not Equals</option>' + '<option value="2" class="su su-lesser-than">Less Than</option>' +
                               '<option value="3" class="su su-greater-than">Greater Than</option>' + '<option value="4" class="su su-lesser-than-or-equal-to">Less Than Or Equals</option>' + '<option value="5" class="su su-greater-than-or-equal-to">Greater Than Or Equals</option>' +
                               '</select>' +
                   '</div>' +
                    '<div class="col-sm-4 col-xs-3 no-padding condition-type no-margin" id="condition-type">' +
                       '<select id="switch-value" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectTarget+ '" class="selectpicker col-sm-2 col-xs-2 no-padding no-margin select-value" data-size="5">' +
                              '<option value="" disabled class="hide-option"selected="selected" >' + window.Server.App.LocalizationContent.SelectTarget+ '</option>' + '<option value="0">Condition</option>' + '<option value="1">Custom</option>' +
                               '</select>' +
                   '</div>' +

                     '<div class="col-sm-5 col-xs-4 no-padding  measure-column-col  target-column no-margin" id="condition-second-col">' +
                           '<select id="selected-col2-option" data-live-search="true" title="'+window.Server.App.LocalizationContent.SelectColumn+'" class="selectpicker select-condition col-sm-2 col-xs-2 no-padding no-margin" data-size="5">' +
                            '</select>' + '</div>' +
                             '<div class="col-sm-4 col-xs-4 no-padding no-margin add-value">' +
                   '<input type= "text" id="value" class="form-control validation-input">' + '<span class="add-custom">' + window.Server.App.LocalizationContent.CustomValueNumericValidator+ '</span>' +
                   '</div>' + '</div>' + '<a href="javascript:void(0);" class="col-md-12  col-sm-12 col-lg-12 col-xs-12 add-where-local" id="add-dimensions">' +
                              '<span class="su su-add"></span>' +
                              '<span class="margin-alignment">Add Where condition</span>' +
                          '</a>' +

                   '</div>' + '<div class=" col-sm-12 col-xs-12 no-padding dimension-statement  no-margin">' + '</div>' +

                       '</div>');
    }

    var conditions = $(this).siblings("#measure-div").find(".condition-div-statement");

    for (var t = 0; t < conditions.length; t++) {
        $(this).siblings("#measure-div").find(".condition-div-statement .filterareatext").eq(t).html("Filter : " + (t + 1));
        $(this).siblings("#measure-div").find(".condition-div-statement .filterareainput").eq(t).val(t + 1);
    }

    var conditionCategory = $("#condition-category").find("option:selected").html();
    $(this).closest(".condition-div-statement .measure-statement").find(".measure-column-col select").html("");
    $(this).closest(".condition-div-statement .measure-statement").find(".measure-column-col select").append('<option value="" disabled class="hide-option" selected="selected">Select Column</option>' + window.listItems).selectpicker("refresh");
    $(this).parent(".joining-condition").remove();
    $(".where-global").css("display", "inline");
    $(this).closest(".condition-div-statement").find(".add-value,.target-column").css("visibility", "hidden");

    parent.$("#popup-container_wrapper").ejWaitingPopup("show");
    parent.$("#editpopup-container_wrapper").ejWaitingPopup("show");
    var selector = $("#measure-div").find(".condition-div-statement:last");
    if (!$(selector).find(".and").hasClass("and-img")) {
        $(selector).find(".and").prepend("<img class='and-img'/>");
        $(selector).find(".and-img").attr("src", dashboardServerResourceUrl + "/images/" + "and" + ".png");
        $(selector).find(".or").prepend("<img class='or-img'/>");
        $(selector).find(".or-img").attr("src", dashboardServerResourceUrl + "/images/" + "or" + ".png");
        $(selector).find(".nand").prepend("<img class='nand-img'/>");
        $(selector).find(".nand-img").attr("src", dashboardServerResourceUrl + "/images/" + "nand" + ".png");
        $(selector).find(".nor").prepend("<img class='nor-img'/>");
        $(selector).find(".nor-img").attr("src", dashboardServerResourceUrl + "/images/" + "nor" + ".png");
        $(selector).find("select").selectpicker("refresh");
    }
    $(selector).find(".column-condition .bootstrap-select .btn-default .filter-option").attr("id", "option-selected");
    $(selector).find(".column-condition .bootstrap-select .btn-default #option-selected").removeAttr("class");
    $(selector).find(".column-condition .bootstrap-select .btn-default #option-selected").html("");
    $(selector).find(".column-condition .bootstrap-select .btn-default #option-selected").addClass("su su-equals").addClass("filter-option pull-left");
    $(selector).find(".column-condition .bootstrap-select .btn-default .filter-option").removeAttr("id");

    $.ajax({
        type: "POST",
        data: { itemId: itemId, name: itemName },
        url: getItemNamesUrl,
        async:false,
        success: function (data) {
            parent.$("#popup-container_wrapper").ejWaitingPopup("hide");
            parent.$("#editpopup-container_wrapper").ejWaitingPopup("hide");
            var columnDetails = data;
            for (var i = 0; i < columnDetails.data.length; i++) {
                var summaryTypeDescription = getSummaryType(columnDetails.data[i].SummaryType);
                if (columnDetails.data[i].IsWidgetBounded == true) {
                    window.listItems += '<option value="' + columnDetails.data[i].ColumnName + '">' + summaryTypeDescription + ' ' + '(' + columnDetails.data[i].DisplayName + ')' + '</option>';
                }
                if (columnDetails.data[i].CustomColumnType == 2) {
                    window.listDimensionItems += '<option value="' + columnDetails.data[i].ColumnName + '">' + columnDetails.data[i].DisplayName + '</option>';
                }
            }
            $.ajax({
                type: "POST",
                data: { itemId: itemId, itemName: itemName, userId: $("#userid").val() },
                url: getCustomExpressionListUrl,
                success: function (data) {
                    parent.$("#popup-container_wrapper").ejWaitingPopup("hide");
                    parent.$("#editpopup-container_wrapper").ejWaitingPopup("hide");
                    if (data != null) {
                        for (var j = 0; j < data.Result.length; j++) {
                            window.listItems += '<option value="' +
                                data.Result[j].Name +
                                '">' +
                                data.Result[j].Name +
                                '</option>';
                            window.listDimensionItems += '<option value="' +
                                data.Result[j].Name +
                                '">' +
                                data.Result[j].Name +
                                '</option>';
                        }
                    }
                    $(".measure-column select,.measure-column-col select")
                        .each(function () {
                            if ($(this).html() == "") {
                                $(this).html("");
                                $(this)
                                    .append('<option value="" disabled class="hide-option"selected="selected">Select Column</option>' +
                                        window.listItems);
                                var selector = $(this)
                                    .closest(".condition-div-statement .measure-statement")
                                    .find("#selected-col-option,#selected-col2-option");
                                refreshColumns(selector);
                                addTitleForColumns();
                            }
                        });
                    $("#widget-items option").remove();
                    $("#widget-items").append(window.listItems).selectpicker("refresh");
                    if (window.listDimensionItems == "") {
                        $("#dimension-div .join-div").html("");
                        $("#dimension-div .dimension-statement").html("");
                        $(".schedule-dialog #data-changes-container #add-dimension-condition").css("display", "none");
                        $(".measure-statement .add-where-local").css("display", "none");
                    } else {
                        if ($(".dimension-column select,.dimension-column-col select").html() == "") {
                            $(".dimension-column select,.dimension-column-col select").html("");
                            $(".dimension-column select,.dimension-column-col select")
                                .append('<option value="" disabled class="hide-option"selected="selected">Select Column</option>' + window.listDimensionItems)
                                .selectpicker("refresh");
                            var selector = $(this)
                                .closest(".condition-div-statement .dimension-statement")
                                .find("#selected-col-option");
                            refreshColumns(selector);
                            addTitleForColumns();
                            $("#add-dimension-condition").css("display", "inline");
                        }
                    }
                }
            });
        }
    });

    

    if (conditionCategory == "Increases" || conditionCategory == "Decreases" || conditionCategory == "Continuously Increases" || conditionCategory == "Continuously Decreases") {
        $(".measure-statement .column-condition,.measure-statement .condition-type").css("visibility", "hidden");
        $(".measure-statement .add-comparison-target").css("display", "none");
    }
    $(".add-comparison-target").find(".remove-comparison").tooltip();
    $("#add-condition").css("margin-top", "24px");
    addConditionClicked++;
    $(".add-error-msg").css("visibility", "hidden");
    $("#add-condition").removeClass("add-first-condition-validation");
});


$(document).on("blur", "#add-dimension-condition", function () {
    $(".add-error-msg").css("visibility", "hidden");
    $("#add-condition").removeClass("add-first-condition-validation");
});

$(document).on("click", ".add-comparison", function () {
    $(this).next(".add-comparison-target").siblings(".add-comparison").hide();
    $(this).siblings(".add-comparison-target").find(".remove-comparison").tooltip();
    $(this).next(".add-comparison-target").css("display", "block");
});

$(document).on("click", ".remove-comparison", function () {
    $(this).closest(".add-comparison-target").css("display", "none");
    $(this).closest(".add-comparison-target").siblings(".add-comparison").show();
});

$(document).on("click", "#add-dimension-condition", function () {
    if ($(this).siblings("#dimension-div").find(".condition-div-statement").length == 0 && $("#condition-div #measure-div").find(".condition-div-statement").length > 1) {
        $("#dimension-div").append('<div class="col-sm-12 col-xs-12 condition-div-statement margin-dimension-statement no-padding">' + '<div class="col-sm-12 col-xs-12 dimension-statement no-padding">' + '<div class="col-sm-12 col-xs-12 no-padding dimension-each no-margin where">' +
             '<div class="col-sm-1 col-xs-1 no-padding delete-button-dimension no-margin">' +
                              '<span class="su su-close action"></span>' + '</div>' +
            '<div class="col-sm-1 col-xs-1 where-class no-padding no-margin text-center">' + '<span id="where">Where</span>' + '</div>' +
                        '<div class="col-sm-2 col-xs-2 no-padding dimension-column-col actual-column no-margin" id="condition-first-col">' +
                           '<select id="selected-col-option" data-live-search="true" title="'+window.Server.App.LocalizationContent.SelectColumn+'" class="selectpicker col-sm-2 col-xs-2 no-padding select-condition" data-size="5">' +
                           '</select>' + '<span class="error-column">' + '</span>' +
                       '</div>' +
                   '<div class="col-sm-2  col-xs-2 no-padding  column-dimension no-margin" id="where-condition">' +
                       '<select id="selected-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="selectpicker col-sm-2 col-xs-2 no-padding" data-size="5">' +
                            '<option value = "" disabled class="hide-option" selected="selected">' + window.Server.App.LocalizationContent.SelectCondition+ '</option>' +
                  '<option value="0">Contains</option>' + '<option value="1">Starts With</option>' + '<option value="2">Ends With</option>' + '<option value="3">Not Contains</option>' + '<option value="4">Include</option>' +
        '<option value="5">Exclude</option>' + '</select>' +
                   '</div>' +
                    '<div class="col-sm-2 col-xs-2 no-padding condition-type no-margin" id="condition-type-dimension">' +
                       '<select id="switch-value" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="selectpicker col-sm-2 col-xs-2 no-padding no-margin select-value-dimension" data-size="5">' +
                              '<option value="" disabled class="hide-option" selected="selected">' + window.Server.App.LocalizationContent.SelectTarget+ '</option>' + '<option value="0">Actual</option>' + '<option value="1">Custom</option>' +
                               '</select>' +
                   '</div>' +

                        '<div class="col-sm-3 col-xs-3 no-padding dimension-column-value-col value target-column-value no-margin target-row" id="selected-value-condition">' +
                       '<select id="selected-value-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectValue+ '" class="selectpicker col-sm-3 col-xs-3 no-padding" data-size="5" multiple="">' +
                       '</select>' +
                   '</div>' +
                     '<div class="col-sm-3 col-xs-3 no-padding add-value-dimension">' +
                   '<input type= "text" class="form-control target-value validation-input" id="value-dimension">' +
                    '<span class="add-dimension-custom"></span>' +
                   '</div>' +
                   '<div class="col-sm-1 col-xs-1 no-padding add-dimension-after">' +
                  '<span class="su su-add add-dimension-condition-again" id=add-dimension-condition-again></span>' + '</div>' +
                  '<div class="dropdown col-sm-1 col-xs-1 no-padding dropdown-class" >' +
                       '</div>' + '</div>' + '<a href="javascript:void(0);" title="" class="su su-close remove-dimension"></a>'
                       + '</div>' + '</div>');
        $(this).closest(".add-dimension-after").css("display", "inline");
        $("#condition-div .dimension-statement select").selectpicker("refresh");
        $(".dimension-each").each(function () {
            if ($(this).find(".dimension-column select,.dimension-column-col select").html() == "") {
                $(this).find(".dimension-column select,.dimension-column-col select").append('<option value="" disabled class="hide-option"selected="selected">Select Column</option>' + window.listDimensionItems).selectpicker("refresh");
                var selector = $(this).closest(".condition-div-statement .dimension-statement").find("#selected-col-option");
                refreshColumns(selector);
                addTitleForColumns();
            }
        });
        $(this).remove();
        $("#add-condition").removeClass("add-first-condition-validation");
        $(".add-error-msg").css("visibility", "hidden");
    }
    else if ($("#condition-div #measure-div").find(".condition-div-statement").length < 1) {
        $("#add-condition").addClass("add-first-condition-validation");
        $(".add-error-msg").html(window.Server.App.LocalizationContent.ConditionValidator).css("visibility", "visible");
    }
    else {
        $(".add-error-msg").html(window.Server.App.LocalizationContent.ConditionValidator).css("visibility", "visible");
        $("#add-condition").addClass("add-first-condition-validation");
    }
});

$(document).on("click", ".add-dimension-condition-again", function () {
        $("#dimension-div .condition-div-statement .dimension-statement").append('<div class="col-sm-12 col-xs-12 no-padding dimension-each no-margin">' +
              '<div class="col-sm-1 col-xs-1 no-padding delete-button-dimension no-margin">' +
                               '<span class="su su-close action"></span>' + '</div>' +
     '<div class="col-sm-2 col-xs-2 join-div no-padding no-margin">' +
                     '<select id="selected-join-option" data-live-search="true" title=' + selectJoinOption + ' class="selectpicker col-sm-2 col-xs-2 join-option no-padding" data-size="5">' +
                             '<option value="0" class="and" selected="selected">AND</option>' +
                                    '<option value="1" class="or">OR</option>' +
                        '</select>' +

                '</div>' +
                            '<div class="col-sm-2 col-xs-2 no-padding dimension-column-col actual-column no-margin" id="condition-first-col">' +
                               '<select id="selected-col-option" data-live-search="true" title="'+window.Server.App.LocalizationContent.SelectColumn+'" class="selectpicker col-sm-2 col-xs-2 no-padding select-condition" data-size="5">' +
                                   '</select>' + '<span class="error-column">' + '</span>' +
                           '</div>' +
                       '<div class="col-sm-2 col-xs-2 no-padding column-dimension no-margin" id="where-condition">' +
                           '<select id="selected-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="selectpicker col-sm-2 col-xs-2 no-padding" data-size="5">' +
                                        '<option value = "" disabled class="hide-option" selected="selected">' + window.Server.App.LocalizationContent.SelectCondition+ '</option>' +
                   '<option value="0">Contains</option>' + '<option value="1">Starts With</option>' + '<option value="2">Ends With</option>' + '<option value="3">Not Contains</option>' + '<option value="4">Include</option>' +
         '<option value="5">Exclude</option>' + '</select>' +
                       '</div>' +
                        '<div class="col-sm-2 col-xs-2 no-padding condition-type no-margin" id="condition-type-dimension">' +
                        '<select id="switch-value" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="selectpicker col-sm-2 col-xs-2 no-padding no-margin select-value-dimension" data-size="5">' +
                               '<option value="" name="" class="hide-option" disabled="disabled" selected="selected">' + window.Server.App.LocalizationContent.SelectTarget+ '</option>' + '<option value="0">Actual</option>' + '<option value="1">Custom</option>' +
                                '</select>' +
                    '</div>' +
                            '<div class="col-sm-3 col-xs-3  no-padding value dimension-column-value-col target-column-value no-margin target-row" id="selected-value-condition">' +
                           '<select id="select-value-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectValue+ '" class="selectpicker col-sm-3 col-xs-3 no-padding" data-size="5" multiple="">' +
                               '</select>' +
                       '</div>' +
                        '<div class="col-sm-3 col-xs-3 no-padding add-value-dimension">' +
                    '<input type= "text" class="form-control target-value validation-input" id="value-dimension">' +
                    '<span class="add-dimension-custom"></span>' +
                    '</div>' +

                       '<div class="col-sm-1 col-xs-1 no-padding  add-dimension-after">' +
                   '<span class="su su-add add-dimension-condition-again" id="add-dimension-condition-again"></span>' + '</div>' +

                  '</div>');
    var selector = $("#dimension-div").find(".condition-div-statement .dimension-each:last");
    if (!$(selector).find(".and").hasClass("and-img")) {
        $(selector).find(".and").prepend("<img class='and-img'/>");
        $(selector).find(".and-img").attr("src", dashboardServerResourceUrl + "/images/" + "and" + ".png");
        $(selector).find(".or").prepend("<img class='or-img'/>");
        $(selector).find(".or-img").attr("src", dashboardServerResourceUrl + "/images/" + "or" + ".png");
        $(selector).find(".nand").prepend("<img class='nand-img'/>");
        $(selector).find(".nand-img").attr("src", dashboardServerResourceUrl + "/images/" + "nand" + ".png");
        $(selector).find(".nor").prepend("<img class='nor-img'/>");
        $(selector).find(".nor-img").attr("src", dashboardServerResourceUrl + "/images/" + "nor" + ".png");
        $(selector).find("select").selectpicker("refresh");
    }

    $(this).closest(".add-dimension-after").css("display", "inline");
    $("#condition-div .dimension-statement select").selectpicker("refresh");
    $(".dimension-each").each(function () {
        if ($(this).find(".dimension-column select,.dimension-column-col select").html() == "") {
            $(this).find(".dimension-column select,.dimension-column-col select").append('<option value="" disabled class="hide-option"selected="selected">Select Column</option>' + window.listDimensionItems).selectpicker("refresh");
            var selector = $(this).closest(".condition-div-statement .dimension-statement").find("#selected-col-option");
            refreshColumns(selector);
            addTitleForColumns();
        }
    });
    $(this).remove();
});

$(document).on("click", "#add-dimensions", function () {
    $(this).parents(".measure-statement").siblings(".dimension-statement").append('<div class="col-sm-12 col-xs-12 no-padding dimension-each no-margin where">' +
            '<div class="col-sm-1 col-xs-1 no-padding delete-button no-margin">' +
                             '<span class="su su-close action"></span>' + '</div>' +
           '<div class="col-sm-1 col-xs-1 where-class no-padding no-margin text-center">' + '<span id="where">Where</span>' + '</div>' +
                       '<div class="col-sm-2 col-xs-2 no-padding dimension-column-col actual-column no-margin" id="condition-first-col">' +
                          '<select id="selected-col-option" data-live-search="true" title="'+window.Server.App.LocalizationContent.SelectColumn+'" class="selectpicker col-sm-2 col-xs-2 no-padding select-condition" data-size="5">' +
                           '</select>' + '<span class="error-column">' + '</span>' +
                      '</div>' +
                  '<div class="col-sm-2 col-xs-2 no-padding  column-dimension no-margin" id="where-condition">' +
                      '<select id="selected-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="selectpicker col-sm-2 col-xs-2 no-padding" data-size="5">' +
                           '<option value = "" disabled class="hide-option" selected="selected">' + window.Server.App.LocalizationContent.SelectCondition+ '</option>' +
                 '<option value="0">Contains</option>' + '<option value="1">Starts With</option>' + '<option value="2">Ends With</option>' + '<option value="3">Not Contains</option>' + '<option value="4">Include</option>' +
       '<option value="5">Exclude</option>' + '</select>' +
                  '</div>' +
                   '<div class="col-sm-2 col-xs-2 no-padding condition-type no-margin" id="condition-type-dimension">' +
                      '<select id="switch-value" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="selectpicker col-sm-2 col-xs-2 no-padding no-margin select-value-dimension" data-size="5">' +
                            '<option value="" disabled class="hide-option" selected="selected">' + window.Server.App.LocalizationContent.SelectTarget+ '</option>' + '<option value="0">Actual</option>' + '<option value="1">Custom</option>' +
                              '</select>' +
                  '</div>' +
                       '<div class="col-sm-3 col-xs-3 no-padding dimension-column-value-col value target-column-value no-margin target-row" id="selected-value-condition">' +
                      '<select id="selected-value-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectValue+ '" class="selectpicker col-sm-3 col-xs-3 no-padding" data-size="5" multiple="">' +
                      '</select>' +
                  '</div>' +
                  '<div class="col-sm-3 col-xs-3 no-padding add-value-dimension">' +
                  '<input type= "text" class="form-control target-value validation-input" id="value-dimension">' +
                   '<span class="add-dimension-custom"></span>' +
                  '</div>' + '<div class="col-sm-1 col-xs-1 no-padding add-dimension-after">' +
                 '<span class="su su-add add-dimension-again" id=add-dimension-again></span>' + '</div>' +
                 '</div>');

    $(this).closest(".add-dimension-after").css("display", "inline");
    $("#condition-div .dimension-statement select").selectpicker("refresh");
    $(".dimension-each").each(function () {
        if ($(this).find(".dimension-column select,.dimension-column-col select").html() == "") {
            $(this).find(".dimension-column select,.dimension-column-col select").append('<option value="" disabled class="hide-option"selected="selected">Select Column</option>' + window.listDimensionItems).selectpicker("refresh");
            var selector = $(this).closest(".condition-div-statement .dimension-statement").find("#selected-col-option");
            refreshColumns(selector);
            addTitleForColumns();
        }
    });
    $(".dimension-statement .condition-div-statement").css("border", "none");
    $(this).attr("disabled", "disabled");
    $(this).css("display", "none");
});

$(document).on("click", ".add-dimension-again", function () {
        $(this).parents(".dimension-statement").append('<div class="col-sm-12 col-xs-12 no-padding dimension-each no-margin">' +
             '<div class="col-sm-1 col-xs-1 no-padding delete-button no-margin">' +
                              '<span class="su su-close action"></span>' + '</div>' +
    '<div class="col-sm-2 col-xs-2 join-div no-padding no-margin">' +
                    '<select id="selected-join-option" data-live-search="true" title=' + selectJoinOption + ' class="selectpicker col-sm-2 col-xs-2 join-option no-padding" data-size="5">' +
                             '<option value="0" class="and" selected="selected">AND</option>' +
                                   '<option value="1" class="or">OR</option>' +
                       '</select>' +

               '</div>' +
                           '<div class="col-sm-2 col-xs-2 no-padding dimension-column-col actual-column no-margin" id="condition-first-col">' +
                              '<select id="selected-col-option" data-live-search="true" title="'+window.Server.App.LocalizationContent.SelectColumn+'" class="selectpicker col-sm-2 col-xs-2 no-padding select-condition" data-size="5">' +
                                  '</select>' + '<span class="error-column">' + '</span>' +
                          '</div>' +
                      '<div class="col-sm-2 col-xs-2 no-padding column-dimension no-margin" id="where-condition">' +
                          '<select id="selected-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="selectpicker col-sm-2 col-xs-2 no-padding" data-size="5">' +
                                       '<option value = "" disabled class="hide-option" selected="selected">' + window.Server.App.LocalizationContent.SelectCondition+ '</option>' +
                  '<option value="0">Contains</option>' + '<option value="1">Starts With</option>' + '<option value="2">Ends With</option>' + '<option value="3">Not Contains</option>' + '<option value="4">Include</option>' +
        '<option value="5">Exclude</option>' + '</select>' +
                      '</div>' +
                       '<div class="col-sm-2 col-xs-2 no-padding condition-type no-margin" id="condition-type-dimension">' +
                       '<select id="switch-value" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="selectpicker col-sm-2 col-xs-2 no-padding no-margin select-value-dimension" data-size="5">' +
                            '<option value="" disabled class="hide-option" selected="selected">' + window.Server.App.LocalizationContent.SelectTarget+ '</option>' + '<option value="0">Actual</option>' + '<option value="1">Custom</option>' +
                               '</select>' +
                   '</div>' +
                           '<div class="col-sm-3 col-xs-3  no-padding value dimension-column-value-col target-column-value no-margin target-row" id="selected-value-condition">' +
                          '<select id="select-value-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectValue+ '" class="selectpicker col-sm-3 col-xs-3 no-padding" data-size="5" multiple="">' +
                              '</select>' +
                      '</div>' +
                       '<div class="col-sm-3 col-xs-3 no-padding add-value-dimension">' +
                   '<input type= "text" class="form-control target-value validation-input" id="value-dimension">' +
                    '<span class="add-dimension-custom"></span>' +
                   '</div>' + '<div class="col-sm-1 col-xs-1 no-padding  add-dimension-after">' +
                  '<span class="su su-add add-dimension-again" id="add-dimension-again"></span>' + '</div>' +

                 '</div>');
    $(this).parents(".dimension-each").next(".dimension-each").find("div.join-div select#selected-join-option .and").prepend("<img class='and-img'/>");
    $(this).parents(".dimension-each").next(".dimension-each").find("div.join-div select#selected-join-option .and-img").attr("src", dashboardServerResourceUrl + "/images/" + "and" + ".png");
    $(this).parents(".dimension-each").next(".dimension-each").find("div.join-div select#selected-join-option .or").prepend("<img class='or-img'/>");
    $(this).parents(".dimension-each").next(".dimension-each").find("div.join-div select#selected-join-option .or-img").attr("src", dashboardServerResourceUrl + "/images/" + "or" + ".png");
    $(this).parents(".dimension-each").next(".dimension-each").find("div.join-div select#selected-join-option .nand").prepend("<img class='nand-img'/>");
    $(this).parents(".dimension-each").next(".dimension-each").find("div.join-div select#selected-join-option .nand-img").attr("src", dashboardServerResourceUrl + "/images/" + "nand" + ".png");
    $(this).parents(".dimension-each").next(".dimension-each").find("div.join-div select#selected-join-option .nor").prepend("<img class='nor-img'/>");
    $(this).parents(".dimension-each").next(".dimension-each").find("div.join-div select#selected-join-option .nor-img").attr("src", dashboardServerResourceUrl + "/images/" + "nor" + ".png");

    $(this).closest(".add-dimension-after").css("display", "inline");
    $("#condition-div .dimension-statement select").selectpicker("refresh");
    $(".dimension-each").each(function () {
        if ($(this).find(".dimension-column select,.dimension-column-col select").html() == "") {
            $(this).find(".dimension-column select,.dimension-column-col select").append('<option value="" disabled class="hide-option"selected="selected">Select Column</option>' + window.listDimensionItems).selectpicker("refresh");
            var selector = $(this).closest(".condition-div-statement .dimension-statement").find("#selected-col-option");
            refreshColumns(selector);
            addTitleForColumns();
        }
    });
    $(this).remove();
});

$(document).on("click", ".remove-dimension", function () {
    $(this).parents("#dimension-div").html("");
    $("#condition-div").append('<button class="col-md-12  col-sm-12 col-lg-12 col-xs-12 where-global no-padding" id="add-dimension-condition">' +
                              '<span class="su su-add"></span>' +
                              '<span class="margin-alignment">Add global Where condition</span>' +
                          '</button>');
    $(".schedule-dialog #data-changes-container #add-dimension-condition").css("display", "inline");
});

$(document).on("click", ".remove-measure-dimension", function () {
    if ($(this).parents(".condition-div-statement").hasClass("first-condition")) {
        $(this).parents(".condition-div-statement").prev(".custom-expression-columns").remove();
        $(this).parents(".condition-div-statement").prev(".error-message-widget").remove();
        $(this).parents(".condition-div-statement").next(".condition-div-statement").find("#selected-joins").remove();
        $(this).parents(".condition-div-statement").next(".condition-div-statement").addClass("first-condition");
        $(this).parents(".condition-div-statement").next(".condition-div-statement").css("margin-top", "0px");
    }
    $(this).parents(".condition-div-statement").remove();
    var conditions = $("#measure-div").find(".condition-div-statement");

    for (var t = 0; t < conditions.length; t++) {
        $("#measure-div").find(".condition-div-statement").eq(t).find(".filterareatext").html("Filter : " + (t + 1));
        $("#measure-div").find(".condition-div-statement").eq(t).find(".filterareainput").val(t + 1);
    }
});

$(document).on("click", ".delete-button", function () {
    if ($(this).closest(".dimension-statement").find(".dimension-each").length == 1) {
        $(this).parents(".condition-div-statement").find(".measure-statement a#add-dimensions").css("display", "inline");
    }
    if ($(this).closest(".dimension-each").hasClass("where")) {
        $(this).closest(".dimension-each").next(".dimension-each").find(".join-div").html("");
        $(this).closest(".dimension-each").next(".dimension-each").find(".join-div").append(
                    '<span id="where">Where</span>'

               );
        $(this).closest(".dimension-each").next(".dimension-each").find(".join-div").addClass("col-sm-1 col-xs-1 where-class text-center");
        $(this).closest(".dimension-each").next(".dimension-each").find(".where-class").removeClass("join-div col-sm-2 col-xs-2");
        $(this).closest(".dimension-each").next(".dimension-each").addClass("where");
    }
    $(this).closest(".dimension-each").remove();
    $("#measure-div .condition-div-statement").each(function () {
        if ($(this).find(".dimension-statement .dimension-each:last").find(".add-dimension-after").html() == "") {
            $(this).find(".dimension-statement .dimension-each:last").find(".add-dimension-after").append('<span class="su su-add add-dimension-again" id="add-dimension-again"></span>');
        }
    });
});

$(document).on("click", ".delete-button-dimension", function () {
    if ($("#dimension-div .condition-div-statement .dimension-statement").find(".dimension-each").length == 1) {
        $(this).parents("#dimension-div").html("");
        $("#condition-div").append('<button class="col-md-12  col-sm-12 col-lg-12 col-xs-12 where-global no-padding" id="add-dimension-condition">' +
                                  '<span class="su su-add"></span>' +
                                  '<span class="margin-alignment">Add global Where condition</span>' +
                              '</button>');
        $(this).closest(".dimension-each").parent().remove();
        $("#condition-div #add-dimension-condition").css("display", "inline");
    }
    else {
        if ($(this).closest(".dimension-each").hasClass("where")) {
            $(this).closest(".dimension-each").next(".dimension-each").find(".join-div").html("");
            $(this).closest(".dimension-each").next(".dimension-each").find(".join-div").append(
                        '<span id="where">Where</span>'

                   );
            $(this).closest(".dimension-each").next(".dimension-each").find(".join-div").addClass("col-sm-1 col-xs-1 where-class text-center");
            $(this).closest(".dimension-each").next(".dimension-each").find(".where-class").removeClass("join-div col-sm-2 col-xs-2");
            $(this).closest(".dimension-each").next(".dimension-each").addClass("where");
        }
        $(this).closest(".dimension-each").remove();
        if ($("#dimension-div .condition-div-statement .dimension-statement").find(".dimension-each:last").find(".add-dimension-after").html() == "") {
            $("#dimension-div .condition-div-statement .dimension-statement").find(".dimension-each:last").find(".add-dimension-after").append('<span class="su su-add add-dimension-again" id="add-dimension-again"></span>');
        }
    }
});

$(document).on("click", ".condition-type .bootstrap-select li", function () {
    if ($(this).hasClass("selected active")) {
        var val = $(this).attr("data-original-index");

        $(this).parents(".condition-type").find(".select-value option").each(function () {
           
              if ($(this).val() == (val - 1).toString()) {
                  $(this).attr("selected", "selected");
                  if($(this).parents(".condition-type").hasClass("validation"))
                  {
                      $(this).parents(".condition-type").removeClass("validation");
                      $(this).parents(".condition-type").find(".bootstrap-select").removeClass("validation-error");
                  }
                if ($(this).val() == "1") {
              $(this).parents(".condition-type").find(".selectpicker").selectpicker("refresh");
              $(this).closest(".add-comparison-target").find(".target-column").css("visibility", "hidden");
              $(this).closest(".add-comparison-target").find(".target-column").css("display", "none");
              $(this).closest(".add-comparison-target").find(".add-value").css("visibility", "visible");
              $(this).closest(".add-comparison-target").find(".add-value").css("display", "inline");
          }
           else if ($(this).val() == "0") {
            $(this).parents(".condition-type").find(".selectpicker").selectpicker("refresh");
            $(this).closest(".add-comparison-target").find(".target-column").css("display", "inline");
            $(this).closest(".add-comparison-target").find(".target-column").css("visibility", "visible");
            $(this).closest(".add-comparison-target").find(".add-value").css("display", "none");
            $(this).closest(".add-comparison-target").find(".add-value").css("visibility", "hidden");
          }
              }
            else  if ($(this).attr("selected") == "selected") {
                  $(this).removeAttr("selected");
              }
        });
      
    }
});

$(document).on("change", ".column-dimension", function () {
    if ($(this).hasClass("validation")) {
        $(this).removeClass("validation");
        $(this).children(".bootstrap-select").removeClass("validation-error");
    }
    if ($(this).find("option:selected").text() == "Between") {
        $(this).parent().children(".condition-type,.add-value-dimension,.target-column-value").css("display", "none");
        $(this).parent().find(".condition-type").before('<div class="col-sm-3 col-xs-3 no-padding pull-left from-date-div">' +
        '<input type="text" class="form-control from-date validation-input"/>' + '<span class="date-error">' + window.Server.App.LocalizationContent.DateRangeValidator+ '</span>' + '</div>');
        if ($(this).parents("#measure-div").length > 0) {
            var dateId = "datepicker" + $(this).parents(".condition-div-statement").index() + "id" + $(this).parent(".dimension-each").index();
        }
        else {
            var dateId = "date" + $(this).parents(".condition-div-statement").index() + "id" + $(this).parent(".dimension-each").index();
        }
        $(this).parent().find(".from-date").attr("id", dateId);
        $("#" + dateId).ejDateRangePicker({
            dateFormat: dateFormat
        });
        $(this).parent().children(".add-dimension-after").removeClass("padding-left").css("margin-left", "10px");
    }
    else {
        $(this).parent().children(".from-date-div").remove();
        $(this).parent().children(".condition-type").css("display", "inline");
        $(this).parent().children(".add-dimension-after").css("margin-left", "0px");
    }
});

$(document).on("change", ".select-value-dimension", function () {
    if ($(this).parent().siblings(".actual-column").find("option:selected").val() == "") {
        $(this).parent().siblings(".actual-column").addClass("validation");
        $(this).parent().siblings(".actual-column").find(".bootstrap-select").addClass("validation-error");
        $(this).parent().siblings(".actual-column").find(".error-column").html(window.Server.App.LocalizationContent.ColumnValidator).css("display", "inline");
        $(this).parent().siblings(".actual-column").find(".error-column").css("visibility", "visible");
    }
    else {
        if ($(this).parent("div").hasClass("validation")) {
            $(this).parent("div").removeClass("validation");
            $(this).siblings(".bootstrap-select").removeClass("validation-error");
        }
        if ($(this).find("option:selected").val() == "1") {
            $(this).parent().siblings(".dimension-column-value-col,.dimension-column-value").css("display", "none");
            $(this).parent().siblings(".add-value-dimension").find("input").val("");
            $(this).parent().siblings(".add-value-dimension").css("display", "inline");
            $(this).parent().siblings(".add-dimension-after").addClass("padding-left");
        }
        else {
            $(this).parent().siblings(".dimension-column-value-col,.dimension-column-value").css("display", "inline");
            $(this).parent().siblings(".add-value-dimension").css("display", "none");
            $(this).parent().siblings(".add-dimension-after").addClass("padding-left");
        }
    }
});

function incrementVal(selector) {
    var $item = selector;
    var $curVal = $item.attr("value");
    $item.attr("value", parseInt($curVal) + 1);
}

$(document).on("change", "#selected-option", function () {
    $(".error-message-widget").css("display", "none");
    $(".items-dropdown").removeClass("validation");
    $(".items-dropdown .bootstrap-select").removeClass("validation-error");
    $(".schedule-dialog #data-changes-container #add-condition").css("display", "inline");
    $(".schedule-dialog #data-changes-container  #add-dimension-condition").css("display", "inline");
    var conditionCategory = $("#condition-category").find("option:selected").html();
    var conditionLength = $(".condition-div-statement").length;
    if (conditionLength == 0)
        $("#add-condition").trigger("click");
    if (conditionCategory == "Increases" || conditionCategory == "Decreases" || conditionCategory == "Continuously Increases" || conditionCategory == "Continuously Decreases") {
        $(".measure-statement .column-condition,.measure-statement .condition-type,.measure-statement .target-column").css("visibility", "hidden");
        $(".measure-statement .add-value").css("visibility", "hidden");
        $(".measure-statement .add-custom").css("display", "none");
        $(".measure-statement .add-comparison").hide();
        $(".measure-statement .add-comparison-target").css("display", "none");
   
    }
    else {
        $(".measure-statement .add-comparison-target").css("display", "block");
        $(".add-comparison-target").find(".remove-comparison").tooltip();
        $(".measure-statement .column-condition,.measure-statement .condition-type").css("visibility", "visible");
        $(".measure-statement .condition-type").find(".bootstrap-select li").removeClass("selected");
        $(".measure-statement .condition-type").find(".bootstrap-select li:first").addClass("selected active");
        $(".measure-statement .condition-type").find(".bootstrap-select .btn-default").attr("title", "Select Target");
        $(".measure-statement .condition-type").find(".bootstrap-select .btn-default .filter-option").html("Select Target");
        $(".column-condition").change();
        
    }
    $("#condition-category .bootstrap-select button.selectpicker").removeAttr("title");
    $("#condition-category .bootstrap-select button.selectpicker span.filter-option").attr({ "title": $(this).find("option:selected").attr("data-title"), "data-toggle": "tooltip", "data-container": "body", "data-placement": "right" });
    $("#condition-category .bootstrap-select button.selectpicker span.filter-option").tooltip();
    $("#condition-category .bootstrap-select button.selectpicker span.filter-option").removeAttr("title");
});

$(document).on("change", "#selected-items", function () {
    if ($(this).parent("div").hasClass("validation")) {
        $(this).parent("div").removeClass("validation");
        $(this).siblings(".bootstrap-select").removeClass("validation-error");
    }
    window.listItems = "";
    window.listDimensionItems = "";
    if (display == 1) {
        display = 2;
    }
    else {
        $(".schedule-dialog #data-changes-container  #add-condition").css("display", "none");
        $(".schedule-dialog #data-changes-container  #add-dimension-condition").css("display", "none");
    }
    if ($("#measure-div .condition-div-statement").length > 0 || $("#dimension-div .condition-div-statement").length > 0) {
        $("#condition-div #measure-div,#condition-div #dimension-div").html("");
    }

    $(".error-message-widget").css("display", "none");
    $("#selected-option").trigger("change");
    $(".select-picker").selectpicker("refresh");
});

$(document).on("change", ".measure-column-col select,.dimension-column-col select", function () {
    if ($(this).parent("div").hasClass("validation")) {
        $(this).parent("div").removeClass("validation");
        $(this).siblings(".bootstrap-select").removeClass("validation-error");
        $(this).parent("div").find(".error-column").css("display", "none");
        $(this).parent("div").find(".error-column").css("visibility", "hidden");
    }
    listDimensionValues = "";
    var itemId = $("#selected_dashboard").find("option:selected").val();
    if ($("#selected_childdashboard").val() != "") {
        itemId = $("#selected_childdashboard").find("option:selected").val();
    }
    var itemName = $("#selected-items").find("option:selected").val();
    var columnName = $(this).find("option:selected").val();
    var thisParent = $(this).parents(".dimension-each");
    var showWaitingPopup = $(thisParent).find(".column-dimension");
    var conditionType = $(thisParent).find(".condition-type");
    var fromDate = $(thisParent).find(".from-date-div");
    var showCustom = $(thisParent).find(".add-value-dimension");
    var addSymbol = $(thisParent).find(".add-dimension-after");

    var showWaitingForValues = $(thisParent).find(".dimension-column-value-col,.target-column-value");

    $(showWaitingPopup).find("select").attr("disabled", true);
    $(showWaitingForValues).find("select").attr("disabled", true);
    parent.$("#popup-container_wrapper").ejWaitingPopup("show");
    refreshTarget(conditionType);
    $.ajax({
        type: "POST",
        data: { itemId: itemId, columnName: columnName, widgetName: itemName },
        url: getColumnValuesUrl,
        success: function (data) {
            var columnDetails = data;
            var columnAggregation = data.summaryType;
            var columnType = data.type;
            var actualColumnType = data.dataType;
            var isBoolean = data.isBoolean;
            if (columnType == 2 && actualColumnType.toLowerCase() == "date") {
                $(thisParent).find(".column-dimension select").html("");
                $(thisParent).find(".column-dimension select").append('<option value="" disabled class="hide-option" selected="selected">Select Condition</option>' + '<option value="0">Include</option>' +
        '<option value="1">Exclude</option>' + '<option value="3">Between</option>').selectpicker("refresh");
                $(thisParent).find(".add-value-dimension .add-dimension-custom").html(window.Server.App.LocalizationContent.DateFormatvalidator + dateFormat + window.Server.App.LocalizationContent.Format);
            }
            else if (isBoolean) {
                $(thisParent).find(".column-dimension select").html("");
                $(thisParent).find(".column-dimension select").append('<option value="" disabled class="hide-option" selected="selected">Select Condition</option>' + '<option value="4">Include</option>' +
        '<option value="5">Exclude</option>').selectpicker("refresh");
                $(thisParent).find(".add-value-dimension .add-dimension-custom").html(window.Server.App.LocalizationContent.CustomValueValidator);
            }
            else {
                $(thisParent).find(".column-dimension select").html("");
                $(thisParent).find(".column-dimension select").append('<option value="" disabled class="hide-option" selected="selected">' + window.Server.App.LocalizationContent.SelectCondition+ '</option>' + '<option value="0">Contains</option>' + '<option value="1">Starts With</option>' + '<option value="2">Ends With</option>' + '<option value="3">Not Contains</option>' + '<option value="4">Include</option>' +
                '<option value="5">Exclude</option>').selectpicker("refresh");
                $(thisParent).find(".from-date-div").remove();
                $(thisParent).find(".condition-type").css("display", "inline");
                $(thisParent).find(".add-value-dimension .add-dimension-custom").html(window.Server.App.LocalizationContent.CustomValueStringValidator);
            }
            for (var i = 0; i < columnDetails.data.length; i++) {
                listDimensionValues += '<option value="' + columnDetails.data[i] + '">' + columnDetails.data[i] + '</option>';
            }
            $(thisParent).find(".dimension-column-value-col select,.target-column-value select").html("");
            $(thisParent).find(".dimension-column-value-col select,.target-column-value select").append(listDimensionValues).selectpicker("refresh");
            var values = $(thisParent).find(".target-column-value select");
            var filterColumn = $(thisParent).find(".column-dimension select");
            refreshColumns(values);
            addTitleForColumnValues();
            $(showWaitingPopup).find("select").removeAttr("disabled");
            $(showWaitingForValues).find("select").removeAttr("disabled");
            $(showWaitingPopup).find(".bootstrap-select li,.bootstrap-select .btn-default").removeClass("disabled");
            $(showWaitingForValues).find(".bootstrap-select li,.bootstrap-select .btn-default").removeClass("disabled");
            $(showWaitingPopup).find(".dropdown-menu").addClass("alignment-dropdown");
            $(showWaitingForValues).find(".dropdown-menu").addClass("alignment-dropdown");
            $(showWaitingPopup).find(".dropdown-menu .inner").addClass("alignment-dropdown-inner");
            $(showWaitingForValues).find(".dropdown-menu .inner").addClass("alignment-dropdown-inner");
            $(showWaitingPopup).find(".dropdown-menu li:first").css("height", "0px");
            $(showWaitingForValues).find(".dropdown-menu li:first").removeClass("selected");
            $(showWaitingForValues).css("display", "none");
            $(showCustom).css("display", "none");
            $(conditionType).css("display", "inline");
            $(fromDate).remove();
            refreshColumns(filterColumn);
            addTitleForColumns();
            if ($(addSymbol).hasClass("padding-left")) {
                $(addSymbol).removeClass("padding-left");
            }
            parent.$("#popup-container_wrapper").ejWaitingPopup("hide");
        }
    });
});

$(document).on("change", ".column-condition", function () {
    if ($(this).parent("div").hasClass("validation")) {
        $(this).parent("div").removeClass("validation");
        $(this).siblings(".bootstrap-select").removeClass("validation-error");
    }
    var className = $(this).find("option:selected").attr("class");
    $(this).find(".bootstrap-select .btn-default .filter-option").attr("id", "option-selected");
    $(this).find(".bootstrap-select .btn-default #option-selected").removeAttr("class");
    $(this).find(".bootstrap-select .btn-default #option-selected").html("");
    $(this).find(".bootstrap-select .btn-default #option-selected").addClass(className).addClass("filter-option pull-left");
    $(this).find(".bootstrap-select .btn-default .filter-option").removeAttr("id");
});

$(document).on("click", ".delete-action", function () {
    $(this).closest("#dimension-div .condition-div-statement").prev('div').remove();
    $(this).closest("#dimension-div .condition-div-statement").remove();
});

$(document).on("click", ".delete-measure-dimension", function () {
    $(this).closest("#measure-div .condition-div-statement .dimension-statement .dimension-each").remove();
});

$(document).on("click", ".delete-measure", function () {
    $(this).closest("#measure-div .condition-div-statement").prev('div').remove();
    $(this).closest("#measure-div .condition-div-statement").remove();
});

$(document).on("click", ".delete-dimension", function () {
    $(this).parent().closest(".dimension-each").remove();
});

$(document).on("click", ".delete-dimension-all", function () {
    $(this).parents().find(".dimension-statement").html();
});

$(document).on("click", ".add-first-condition", function () {
    $("#measure-div").css("display", "inline");
});

$(document).on("change", ".change-event, input[type=radio][name=daily-recurrence-type], input[type=radio][name=end-type], input[type=radio][name=monthly], input[type=radio][name=yearly]", function () {
    var scheduleMessage = createScheduleMessage(false);
    $("#schedule-message").text(scheduleMessage);
});

$(document).on("change", ".join-option", function () {
    if ($(this).parent("div").hasClass("validation")) {
        $(this).parent("div").removeClass("validation");
        $(this).siblings(".bootstrap-select").removeClass("validation-error");
    }
});

function refreshConditionCategory() {
    $(".condition-category-changes").find("select").html("");
    $(".condition-category-changes").find("select").append('<option value="5" data-title="' + window.Server.App.LocalizationContent.ValueChange + '" name="ValueChanges" selected="selected">' + window.Server.App.LocalizationContent.ValueChangeOption + '</option>' +
                                        '<option value="1" data-title="' + window.Server.App.LocalizationContent.Increases + '" name="Increases">' + window.Server.App.LocalizationContent.IncreasesOption + '</option>' +
                                        '<option value="2" data-title="' + window.Server.App.LocalizationContent.ContinousIncreases + '" name="ContinousIncreases">' + window.Server.App.LocalizationContent.ContinousIncreasesOption + '</option>' +
                                        '<option value="3" data-title="' + window.Server.App.LocalizationContent.Decreases + '" name="Decreases">' + window.Server.App.LocalizationContent.DecreasesOption + '</option>' +
                                        '<option value="4" data-title="' + window.Server.App.LocalizationContent.ContinousDecreases + '" name="ContinousDecreases">' + window.Server.App.LocalizationContent.ContinousDecreasesOption + '</option>').selectpicker("refresh");
    $("#selected-option").selectpicker("refresh");
    for (var i = 0; i < $(".condition-category-changes select option").length; i++) {
        var hoveredtext = $(".condition-category-changes select option").eq(i).attr("data-title");
        $(".condition-category-changes .btn-group .dropdown-menu .selectpicker li ").eq(i).find("a").attr({ "title": hoveredtext, "data-toggle": "tooltip", "data-container": "body", "data-placement": "right" });
    }
    $(".condition-category-changes .btn-group .dropdown-menu .selectpicker li a").tooltip();
}

function refreshTarget(selector) {
    $(selector).find("select").html("");

    $(selector).find("select").append('<option value="" name="" class="hide-option" disabled="disabled" selected="selected">' + window.Server.App.LocalizationContent.SelectTarget+ '</option>' + '<option value="0">Actual</option>' + '<option value="1">Custom</option>').selectpicker("refresh");
    $(selector).find("select").selectpicker("refresh");
}

$(document).on("click", ".target-row .bootstrap-select li a", function (e) {
    e.stopPropagation();
});

function renderDataCondition(conditionCategory, conditionArray, itemName) {
    var hasDimensionColumn = false;
    var arrayLength = conditionArray.length;
    var itemId = $("#selected_dashboard").find("option:selected").val();
    if ($("#selected_childdashboard").val() != "") {
        itemId = $("#selected_childdashboard").find("option:selected").val();
    }
    var itemName = $(".items-dropdown").find("option:selected").val();
    $("#add-condition").css("display", "inline");
    $("#add-dimension-condition").css("display", "inline");
    var count = 0;
    var dimensionCount = 0;
    var increment = 0;
    while (count < arrayLength - 1) {
        if (count == 0) {
            addMeasure(conditionArray[0]);
        }
        else {
            addMeasureAgain(conditionArray[count]);
        }
        count++;
    }

    var conditions = $(".condition-div-statement");

    for (var t = 0; t < conditions.length; t++) {
        conditions.eq(t).find(".filterareatext").html("Filter : " + (t + 1));
        conditions.eq(t).find(".filterareainput").val(t + 1);
    }

    if (conditionArray[arrayLength - 1][1] != "") {
        while (dimensionCount < conditionArray[arrayLength - 1][1].length) {
            if (dimensionCount == 0) {
                addDimension();
            }
            else {
                addDimensionAgain();
            }
            dimensionCount++;
        }
        $("#add-dimension-condition").remove();
    }

    if (conditionCategory == 1 || conditionCategory == 2 || conditionCategory == 3 || conditionCategory == 4) {
        $("#measure-div").find(".condition-type,.target-column,.column-condition").css("visibility", "hidden");
        $("#measure-div").find(".add-comparison").hide();
        $("#measure-div").find(".add-comparison-target").css("display", "none");
    }
    else {
        $("#measure-div").find(".condition-type,.target-column,.column-condition,#value").css("display", "inline");
    }
    $("#measure-div").find(".dimension-statement .dimension-each").find(".condition-type").css("visibility", "visible");
    $("#measure-div .condition-div-statement .measure-statement .column-condition select").selectpicker("refresh");
    $("#measure-div .condition-div-statement .measure-statement .condition-type select").selectpicker("refresh");
    $.ajax({
        type: "POST",
        data: { itemId: itemId, name: itemName },
        url: getItemNamesUrl,
        async: false,
        success: function (data) {
            var columnDetails = data;
            for (var i = 0; i < columnDetails.data.length; i++) {
                var summaryTypeDescription = getSummaryType(columnDetails.data[i].SummaryType);
                if (columnDetails.data[i].IsWidgetBounded == true) {
                    window.listItems += '<option value="' + columnDetails.data[i].ColumnName + '">' + summaryTypeDescription + ' ' + '(' + columnDetails.data[i].DisplayName + ')' + '</option>';
                }
                if (columnDetails.data[i].CustomColumnType == 2) {
                    window.listDimensionItems += '<option value="' + columnDetails.data[i].ColumnName + '">' + columnDetails.data[i].DisplayName + '</option>';
                    addTitleForColumns();
                    hasDimensionColumn = true;
                }
                else {
                    $(".schedule-dialog #data-changes-container #add-dimension-condition").css("display", "none");
                    $(".schedule-dialog #data-changes-container #add-dimensions").css("display", "none");
                }
            }
            $.ajax({
                type: "POST",
                data: { itemId: itemId, itemName: itemName, userId: $("#userid").val() },
                url: getCustomExpressionListUrl,
                success: function (data) {
                    parent.$("#popup-container_wrapper").ejWaitingPopup("hide");
                    parent.$("#editpopup-container_wrapper").ejWaitingPopup("hide");
                    if (data != null) {
                        for (var j = 0; j < data.Result.length; j++) {
                            window.listItems += '<option value="' + data.Result[j].Name + '">' +
                             data.Result[j].Name
                            +
                            '</option>';
                            window.listDimensionItems += '<option value="' + data.Result[j].Name + '">' +
                                     data.Result[j].Name
                                    +
                                    '</option>';
                        }
                    }
                    $("#widget-items option").remove();
                    $("#widget-items").append(window.listItems).selectpicker("refresh");
                    $(".measure-column select,.measure-column-col select").each(function () {
                        if ($(this).html() == "") {
                            $(this).html("");
                            $(this).append('<option value="" disabled class="hide-option"selected="selected">Select Column</option>' + window.listItems).selectpicker("refresh");
                            var selector = $(this).closest(".condition-div-statement .measure-statement").find("#selected-col-option");
                            refreshColumns(selector);
                            addTitleForColumns();
                        }
                    });
                    if (window.listDimensionItems == "") {
                        $("#dimension-div .join-div").html("");
                        $("#dimension-div .dimension-statement").html("");
                        $(".schedule-dialog #data-changes-container #add-dimension-condition").css("display", "none");
                        $(".schedule-dialog #data-changes-container #add-dimensions").css("display", "none");
                    } else {
                        if ($(".dimension-column select,.dimension-column-col select").html() == "") {
                            $(".dimension-column select,.dimension-column-col select").html("");
                            $(".dimension-column select,.dimension-column-col select")
                                .append('<option value="" disabled class="hide-option"selected="selected">Select Column</option>' + window.listDimensionItems)
                                .selectpicker("refresh");
                            $("#add-dimension-condition").css("display", "inline");
                            var selector = $(this)
                                .closest(".condition-div-statement .dimension-statement")
                                .find("#selected-col-option");
                            refreshColumns(selector);
                            addTitleForColumns();
                        }
                    }
                    
                for (var i = 0; i < conditionArray.length - 1; i++) {
                $("#measure-div .condition-div-statement:eq(" + i + ") .measure-statement").find(".column select").find("option").each(function () {
                    var columnName = conditionArray[i][0][0][0][1];
                    var isCustomExpression = conditionArray[i][0][0][0][3];
                    if (isCustomExpression)
                        columnName = conditionArray[i][0][0][0][4];
                    if ($(this).val() == "") {
                        $(this).removeAttr("selected");
                    }
                    else if ($(this).val() == columnName) {
                        $(this).attr("selected", "selected");
                        $(this).parents(".column").find(".bootstrap-select li").each(function () {
                            if ($(this).hasClass("disabled selected active")) {
                                $(this).removeClass("selected active");
                            }
                            if ($(this).find(".text").text().trim() == columnName.trim()) {
                                $(this).addClass("selected active");
                                var value = $(this).find(".text").text();
                                $(this).parents(".bootstrap-select").find(".filter-option").html(value);
                            }
                        });
                    }
                    $("#measure-div .condition-div-statement .column select").selectpicker("refresh");
                });
                $("#measure-div .condition-div-statement:eq(" + i + ") #selected-joins").find("select").find("option").each(function () {
                    var columnLogicalOperator;
                    if (conditionCategory == "5") {
                        if (conditionArray[i][0].length == 2) {
                            columnLogicalOperator = conditionArray[i][0][1];
                        }
                        else {
                            columnLogicalOperator = conditionArray[i][0][3];
                        }
                    } else {
                        columnLogicalOperator = conditionArray[i][0][1];
                    }
                    if ($(this).val() == "") {
                        $(this).removeAttr("selected");
                    }
                    else if ($(this).val() == columnLogicalOperator.toString()) {
                        $(this).attr("selected", "selected");
                        $(this).parents("#selected-joins").find(".bootstrap-select li").each(function () {
                            if ($(this).hasClass("disabled selected active")) {
                                $(this).removeClass("selected active");
                            }
                            if ($(this).attr("data-original-index") == columnLogicalOperator.toString()) {
                                $(this).addClass("selected active");
                                var value = $(this).find(".text").text();
                                $(this).parents(".bootstrap-select").find(".filter-option").html(value);
                            }
                        });
                    }
                    $("#measure-div .condition-div-statement #selected-joins select").selectpicker("refresh");
                });
                
                if (conditionCategory == "5") 
                {
                    if (conditionArray[i][0].length == 2) {
                        $("#measure-div .condition-div-statement:eq(" + i + ") .measure-statement").find(".add-comparison").show();
                        $("#measure-div .condition-div-statement:eq(" + i + ") .measure-statement").find(".add-comparison-target").css("display","none");
                    }
                    else {
                        if (conditionArray[i][0][2][0].length == 10) {

                            $("#measure-div .condition-div-statement:eq(" + i + ") .measure-statement").find(".condition-type select").find("option").each(function () {
                                if ($(this).val() == "") {
                                    $(this).removeAttr("selected");
                                }
                                if ($(this).val() == "0") {
                                    $(this).attr("selected", "selected");
                                    $(this).parents(".add-comparison-target").prev(".add-comparison").hide();
                                    $(this).parents(".add-comparison-target").css("display", "block");
                                    $(this).parents(".target-column").find(".bootstrap-select li").each(function () {
                                        if ($(this).hasClass("disabled selected active")) {
                                            $(this).removeClass("selected active");
                                        }
                                        if ($(this).find(".text").text().trim() == columnName.trim()) {
                                            $(this).addClass("selected active");
                                            var value = $(this).find(".text").text();
                                            $(this).parents(".bootstrap-select").find(".filter-option").html(value);
                                            $(this).parents(".condition-type").siblings(".target-column").css("visibility", "visible");
                                        }
                                    });
                                }

                                $("#measure-div .condition-div-statement .condition-type select").selectpicker("refresh");
                            });
                            $("#measure-div .condition-div-statement:eq(" + i + ") .measure-statement").find(".target-column select").find("option").each(function () {
                                var columnName = conditionArray[i][0][2][0][6];
                                var isCusExp = conditionArray[i][0][2][0][8];
                                if (isCusExp)
                                    columnName = conditionArray[i][0][2][0][9];
                                if ($(this).val() == "") {
                                    $(this).removeAttr("selected");
                                }
                                else if ($(this).val() == columnName.trim()) {
                                    $(this).attr("selected", "selected");
                                    $(this).parents(".add-comparison-target").css("display", "block");
                                    $(this).parents(".target-column").find(".bootstrap-select li").each(function () {
                                        if ($(this).hasClass("disabled selected active")) {
                                            $(this).removeClass("selected active");
                                        }
                                        if ($(this).find(".text").text() == columnName.trim()) {
                                            $(this).addClass("selected active");
                                            var value = $(this).find(".text").text();
                                            $(this).parents(".bootstrap-select").find(".filter-option").html(value);
                                        }
                                    });
                                }
                                $("#measure-div .condition-div-statement .target-column select").selectpicker("refresh");
                            });
                            $("#measure-div .condition-div-statement:eq(" + i + ") .measure-statement").find(".target-column").css("visibility", "visible");

                            $("#measure-div .condition-div-statement:eq(" + i + ")  .measure-statement").find(".add-value").css("display", "none");

                        }
                        else {
                            $("#measure-div .condition-div-statement:eq(" + i + ") .measure-statement").find(".condition-type select").find("option").each(function () {
                                if ($(this).val() == "") {
                                    $(this).removeAttr("selected");

                                }
                                else if ($(this).val() == "1") {
                                    $(this).attr("selected", "selected");
                                    $(this).parents(".add-comparison-target").prev(".add-comparison").hide();
                                    $(this).parents(".add-comparison-target").css("display", "block");
                                    $(this).parents(".target-column").find(".bootstrap-select li").each(function () {
                                        if ($(this).hasClass("disabled selected active")) {
                                            $(this).removeClass("selected active");
                                        }
                                        if ($(this).find(".text").text().trim() == columnName.trim()) {
                                            $(this).addClass("selected active");
                                            var value = $(this).find(".text").text();
                                            $(this).parents(".bootstrap-select").find(".filter-option").html(value);
                                        }
                                    });
                                }
                            });
                            $("#measure-div").find(".condition-div-statement:eq(" + i + ") .measure-statement").find(".add-value input").val(conditionArray[i][0][2][0][5]);
                            $("#measure-div .condition-div-statement:eq(" + i + ") .measure-statement").find(".add-value").css("display", "inline");
                            $("#measure-div .condition-div-statement:eq(" + i + ") .measure-statement").find(".target-column").css("display", "none");
                            $("#measure-div .condition-div-statement .condition-type select").selectpicker("refresh");
                        }
                    }
                    var className;
                    $("#measure-div .condition-div-statement:eq(" + i + ") .measure-statement .column-condition").find("select").find("option").each(function () {
                        var columnLogicalOperator = conditionArray[i][0][1];
                        if ($(this).val() == "" || $(this).val() != columnLogicalOperator.toString()) {
                            $(this).removeAttr("selected");
                        }
                        else if ($(this).val() == columnLogicalOperator.toString()) {
                            $(this).attr("selected", "selected");
                            className = $(this).attr("class");
                            $(this).parents(".column-condition").find(".bootstrap-select .btn-default .filter-option").attr("id", "option-selected");
                            $(this).parents(".column-condition").find(".bootstrap-select .btn-default #option-selected").removeAttr("class");
                            $(this).parents(".column-condition").find(".bootstrap-select .btn-default #option-selected").html("");
                            $(this).parents(".column-condition").find(".bootstrap-select .btn-default #option-selected").addClass(className).addClass("filter-option pull-left");
                            $(this).parents(".column-condition").find(".bootstrap-select .btn-default .filter-option").removeAttr("id");
                            $(this).parents(".column-condition").find(".bootstrap-select li").each(function () {
                                if ($(this).hasClass("disabled selected active")) {
                                    $(this).removeClass("selected active");
                                }
                                if ($(this).attr("data-original-index") == columnLogicalOperator.toString()) {
                                    $(this).addClass("selected active");
                                }
                            });
                        }
                        $("#measure-div .condition-div-statement .measure-statement .column-condition select").selectpicker("refresh");
                    });
                
            }
                if (hasDimensionColumn == true && (conditionArray[i][1] == null || conditionArray[i][1] == "")) {
                    $("#measure-div .condition-div-statement:eq(" + i + ") .measure-statement").find("#add-dimensions").css("display", "inline");
                   

                }
                else {
                    var j = 0;

                    $("#measure-div .condition-div-statement:eq(" + i + ") .dimension-statement").find(".dimension-each").each(function () {
                        var dimensionArray = conditionArray[i][1];
                        var dimensionColumnName = dimensionArray[j][2];
                        var isCustomExp = dimensionArray[j][8];
                        if (isCustomExp.toLowerCase() == "true")
                            dimensionColumnName = dimensionArray[j][9];
                        var dimensionValue = dimensionArray[j][5];
                        var dimensionValueArray = [];
                        dimensionValueArray = dimensionValue.split(",");
                        var conditionType;
                        var listDimensionValues = "";
                        $(this).find(".actual-column select").find("option").each(function () {
                            if ($(this).val() == "") {
                                $(this).removeAttr("selected");
                            }
                            else if ($(this).val() == dimensionColumnName.trim()) {
                                $(this).attr("selected", "selected");
                                $(this).parents(".actual-column").find(".bootstrap-select li").each(function () {
                                    if ($(this).hasClass("disabled selected active")) {
                                        $(this).removeClass("selected active");
                                    }
                                    if ($(this).find(".text").text().trim() == dimensionColumnName.trim()) {
                                        $(this).addClass("selected active");
                                        var value = $(this).find(".text").text();
                                        $(this).parents(".bootstrap-select").find(".filter-option").html(value);
                                    }
                                });
                            }
                        });
                        j++;
                        $("#measure-div .condition-div-statement .dimension-statement .dimension-each select").selectpicker("refresh");
                    });

                    var k = 0;

                    $("#measure-div .condition-div-statement:eq(" + i + ") .dimension-statement").find(".dimension-each").each(function () {
                        var dimensionArray = conditionArray[i][1];
                        var columnType = dimensionArray[k][1];
                        var dimensionCondition = dimensionArray[k][4];
                        var dimensionValue = dimensionArray[k][5];
                        var dimensionValueArray = dimensionValue.split(",");
                        var isBoolean = dimensionArray[k][7];
                        if (columnType.toLowerCase() == "date") {
                            $(this).find(".column-dimension select").html("");
                            $(this).find(".column-dimension select").append('<option value="" disabled class="hide-option" selected="selected">Select Condition</option>' + '<option value="0">Include</option>' +
           '<option value="1">Exclude</option>' + '<option value="3">Between</option>').selectpicker("refresh");
                            $(this).find(".add-value-dimension .add-dimension-custom").html(window.Server.App.LocalizationContent.DateFormatvalidator + dateFormat + window.Server.App.LocalizationContent.Format);
                            if (dimensionCondition == "3") {
                                $(this).find(".add-value-dimension").css("display", "none");
                                $(this).find(".condition-type,.add-value-dimension").css("display", "none");
                                $(this).find(".target-column-value").css("display", "none");
                                $(this).find(".condition-type").before('<div class="col-sm-3 col-xs-3 no-padding pull-left from-date-div">' +
                '<input type="text" class="form-control from-date validation-input"/>' + '<span class="date-error">' + window.Server.App.LocalizationContent.DateRangeValidator+ '</span>' + '</div>');
                                var dateId = "datepicker" + $(this).parents(".condition-div-statement").index() + "id" + $(this).index();
                                $(this).find(".from-date").attr("id", dateId);
                                $("#" + dateId).ejDateRangePicker({
                                    dateFormat: dateFormat,
                                    startDate: new Date(dimensionValueArray[0]),
                                    endDate: new Date(dimensionValueArray[1])
                                });
                            }
                        }
                        else if (isBoolean == "True") {
                            $(this).find(".column-dimension select").html("");
                            $(this).find(".column-dimension select").append('<option value="" disabled class="hide-option" selected="selected">Select Condition</option>' + '<option value="4">Include</option>' +
           '<option value="5">Exclude</option>').selectpicker("refresh");
                            $(this).find(".add-value-dimension .add-dimension-custom").html(window.Server.App.LocalizationContent.CustomValueValidator);
                        }
                        else {
                            $(this).find(".add-value-dimension .add-dimension-custom").html(window.Server.App.LocalizationContent.CustomValueStringValidator);
                        }
                        $(this).find(".column-dimension select").find("option").each(function () {
                            if ($(this).val() == "") {
                                $(this).removeAttr("selected");
                            }
                            else if ($(this).val() == dimensionCondition) {
                                $(this).attr("selected", "selected");
                                $(this).parents(".actual-column").find(".bootstrap-select li").each(function () {
                                    if ($(this).hasClass("disabled selected active")) {
                                        $(this).removeClass("selected active");
                                    }
                                    if ($(this).attr("data-original-index") == dimensionCondition) {
                                        $(this).addClass("selected active");
                                        var value = $(this).find(".text").text();
                                        $(this).parents(".bootstrap-select").find(".filter-option").html(value);
                                    }
                                });
                            }
                        });
                        k++;
                        $("#measure-div .condition-div-statement .dimension-statement .dimension-each select").selectpicker("refresh");
                    });
                    var l = 0;
                    $("#measure-div .condition-div-statement:eq(" + i + ") .dimension-statement").find(".dimension-each").each(function () {
                        var dimensionArray = conditionArray[i][1];
                        var columnType = dimensionArray[l][1];
                        var dimensionJoinCondition = dimensionArray[l][6];

                        $(this).find(".join-div select").find("option").each(function () {
                            if ($(this).val() == "") {
                                $(this).removeAttr("selected");
                            }
                            else if ($(this).val() == dimensionJoinCondition.toString()) {
                                $(this).attr("selected", "selected");
                                $(this).parents(".join-div").find(".bootstrap-select li").each(function () {
                                    if ($(this).hasClass("disabled selected active")) {
                                        $(this).removeClass("selected active");
                                    }
                                    if ($(this).attr("data-original-index") == dimensionJoinCondition.toString()) {
                                        $(this).addClass("selected active");
                                        var value = $(this).find(".text").text();
                                        $(this).parents(".bootstrap-select").find(".filter-option").html(value);
                                    }
                                });
                            }
                        });
                        l++;
                        $("#measure-div .condition-div-statement .dimension-statement .dimension-each select").selectpicker("refresh");
                    });
                    var m = 0;
                    $("#measure-div .condition-div-statement:eq(" + i + ") .dimension-statement").find(".dimension-each").each(function () {
                        var dimensionArray = conditionArray[i][1];
                        var dimensionColumnName = dimensionArray[m][2].trim();
                        var dimensionColumnType = dimensionArray[m][1];
                        var dimensionCondition = dimensionArray[m][4];
                        var dimensionValue = dimensionArray[m][5];
                        var dimensionValueArray = [];
                        dimensionValueArray = dimensionValue.split(",");
                        var conditionType = 0;
                        var listDimensionValues = "";
                        var targetSelector = $(this).find(".condition-type select");
                        var targetValue = $(this).find(".dimension-column-value-col select,.target-column-value select");
                        var customValue = $(this).find(".add-value-dimension");
                        $.ajax({
                            type: "POST",
                            async: false,
                            data: { itemId: itemId, columnName: dimensionColumnName, widgetName: itemName },
                            url: getColumnValuesUrl,
                            success: function (result) {
                                var columnDetails = result;
                                for (var i = 0; i < columnDetails.data.length; i++) {
                                    for (var values = 0; values < dimensionValueArray.length; values++) {
                                        if (columnDetails.data[i].trim().toLowerCase() == dimensionValueArray[values].trim().toLowerCase()) {
                                            conditionType++;
                                        }
                                    }
                                    listDimensionValues += '<option value="' + columnDetails.data[i] + '">' + columnDetails.data[i] + '</option>';
                                }
                                $(targetValue).append(listDimensionValues);
                                if (dimensionColumnType.toLowerCase() == "date" && dimensionCondition == "3") {
                                    $(targetSelector).parent("div").css("display", "none");
                                    $(customValue).css("display", "none");
                                    $(targetValue).parent("div").css("display", "none");
                                }
                                else {
                                    if (conditionType > 0) {
                                        $(targetSelector).find("option").each(function () {
                                            if ($(this).val() == "") {
                                                $(this).removeAttr("selected");
                                            }
                                            else if ($(this).val() == "0") {
                                                $(this).attr("selected", "selected");
                                                $(this).parents(".condition-type").find(".bootstrap-select li").each(function () {
                                                    if ($(this).hasClass("disabled selected active")) {
                                                        $(this).removeClass("selected active");
                                                    }
                                                    if ($(this).attr("data-original-index") == "0") {
                                                        $(this).addClass("selected active");
                                                        var value = $(this).find(".text").text();
                                                        $(this).parents(".bootstrap-select").find(".filter-option").html(value);
                                                    }
                                                    $(targetValue).selectpicker("refresh");
                                                });
                                            }
                                        });
                                        $(targetSelector).parent("div").addClass("display");
                                        $(targetValue).parent("div").css("display", "inline");
                                        $(targetValue).parent("div").addClass("margin-right");
                                        $(targetValue).html("");
                                        $(targetValue).append(listDimensionValues).selectpicker("refresh");
                                        var selector = $("#dimension-div .dimension-statement");
                                        refreshColumns(selector);
                                        addTitleForColumnValues();
                                    }
                                    else {
                                        $(targetSelector).find("option").each(function () {
                                            if ($(this).val() == "") {
                                                $(this).removeAttr("selected");
                                            }
                                            else if ($(this).val() == "1") {
                                                $(this).attr("selected", "selected");
                                                $(this).parents(".condition-type").find(".bootstrap-select li").each(function () {
                                                    if ($(this).hasClass("disabled selected active")) {
                                                        $(this).removeClass("selected active");
                                                    }
                                                    if ($(this).attr("data-original-index") == "1") {
                                                        $(this).addClass("selected active");
                                                        var value = $(this).find(".text").text();
                                                        $(this).parents(".bootstrap-select").find(".filter-option").html(value);
                                                    }
                                                });
                                            }
                                        });
                                        $(targetSelector).parent("div").addClass("display");
                                        $(customValue).css("display", "inline");
                                        $(customValue).css("margin-right", "10px");
                                        $(customValue).find("input").val(dimensionValueArray);
                                    }
                                }
                            }
                        });
                        m++;
                        $("#popup-container_wrapper").ejWaitingPopup("hide");
                        $("#editpopup-container_wrapper").ejWaitingPopup("hide");
                        $("#measure-div .condition-div-statement .dimension-statement .dimension-each select").selectpicker("refresh");
                    });

                    $("#measure-div .condition-div-statement:eq(" + i + ")").find(".dimension-statement .dimension-each").each(function () {
                        if ($(this).next("div").length > 0) {
                            $(this).children(".add-dimension-after").html("");
                        }
                    });
                    var p = 0;
                    $("#measure-div .condition-div-statement:eq(" + i + ") .dimension-statement").find(".dimension-each").each(function () {
                        var dimensionArray = conditionArray[i][1];
                        var dimensionValue = dimensionArray[p][5];
                        var dimensionValueArray = [];
                        dimensionValueArray = dimensionValue.split(",");
                        for (var k = 0; k < dimensionValueArray.length; k++) {
                            $(this).find(".target-column-value select").find("option").each(function () {
                                if ($(this).val() == "") {
                                    $(this).removeAttr("selected");
                                }
                                else if ($(this).text().trim().toLowerCase() == dimensionValueArray[k].trim().toLowerCase()) {
                                    $(this).attr("selected", "selected");
                                }
                            });
                        }
                        p++;
                        $("#measure-div .condition-div-statement .dimension-statement .dimension-each select").selectpicker("refresh");
                    });
                }
            }

            var dimensionArray = conditionArray[conditionArray.length - 1];
            var wholeDimensionArray = dimensionArray[1];
            if (hasDimensionColumn == true && (wholeDimensionArray == "" || wholeDimensionArray == null)) {
                $("#add-dimension-condition").css("display", "inline");
            }
            else {
                for (var i = 0; i < wholeDimensionArray.length ; i++) {
                    var columnName = wholeDimensionArray[i][2];
                    var columnType = wholeDimensionArray[i][1];
                    var columnValue = wholeDimensionArray[i][5];
                    var dimensionCondition = wholeDimensionArray[i][4];
                    var dimensionJoinCondition = wholeDimensionArray[i][6];
                    var isBoolean = wholeDimensionArray[i][7];
                    $("#dimension-div .dimension-statement .dimension-each:eq(" + i + ")").find(".actual-column select").find("option").each(function () {
                        if ($(this).val() == "") {
                            $(this).removeAttr("selected");
                        }
                        else if ($(this).val() == columnName.trim()) {
                            $(this).attr("selected", "selected");
                            $(this).parents(".actual-column").find(".bootstrap-select li").each(function () {
                                if ($(this).hasClass("disabled selected active")) {
                                    $(this).removeClass("selected active");
                                }
                                if ($(this).find(".text").text().trim() == columnName.trim()) {
                                    $(this).addClass("selected active");
                                    var value = $(this).find(".text").text();
                                    $(this).parents(".bootstrap-select").find(".filter-option").html(value);
                                }
                            });
                        }
                        $("#measure-div .condition-div-statement .dimension-statement .dimension-each .actual-column select").selectpicker("refresh");
                    });
                    $("#dimension-div .dimension-statement").find(".dimension-each:eq(" + i + ")").each(function () {
                        var dimensionValueArray = [];
                        dimensionValueArray = columnValue.split(",");
                        if (columnType.toLowerCase() == "date") {
                            $(this).find(".column-dimension select").html("");
                            $(this).find(".column-dimension select").append('<option value="" disabled class="hide-option" selected="selected">Select Condition</option>' + '<option value="0">Include</option>' +
           '<option value="1">Exclude</option>' + '<option value="3">Between</option>').selectpicker("refresh");
                            $(this).find(".add-value-dimension .add-dimension-custom").html(window.Server.App.LocalizationContent.DateFormatvalidator + dateFormat + window.Server.App.LocalizationContent.Format);
                            if (dimensionCondition == "3") {
                                $(this).find(".add-value-dimension").css("display", "none");
                                $(this).find(".condition-type,.add-value-dimension").css("display", "none");
                                $(this).find(".target-column-value").css("display", "none");
                                $(this).find(".condition-type").before('<div class="col-sm-3 col-xs-3 no-padding pull-left from-date-div">' +
                '<input type="text" class="form-control from-date validation-input"/>' + '<span class="date-error">' + window.Server.App.LocalizationContent.DateRangeValidator+ '</span>' + '</div>');
                                var dateId = "date" + $(this).parents(".condition-div-statement").index() + "id" + $(this).index();
                                $(this).find(".from-date").attr("id", dateId);
                                $("#" + dateId).ejDateRangePicker({
                                    dateFormat: dateFormat,
                                    startDate: new Date(dimensionValueArray[0]),
                                    endDate: new Date(dimensionValueArray[1])
                                });
                            }
                        }
                        else if (isBoolean == "True") {
                            $(this).find(".column-dimension select").html("");
                            $(this).find(".column-dimension select").append('<option value="" disabled class="hide-option" selected="selected">Select Condition</option>' + '<option value="4">Include</option>' +
           '<option value="5">Exclude</option>').selectpicker("refresh");
                            $(this).find(".add-value-dimension .add-dimension-custom").html(window.Server.App.LocalizationContent.CustomValueValidator);
                        }
                        else {
                            $(this).find(".add-value-dimension .add-dimension-custom").html(window.Server.App.LocalizationContent.CustomValueStringValidator);
                        }
                        $(this).find(".column-dimension select").find("option").each(function () {
                            if ($(this).val() == "") {
                                $(this).removeAttr("selected");
                            }
                            else if ($(this).val() == dimensionCondition) {
                                $(this).attr("selected", "selected");
                            }
                        });
                        $(".selectpicker").selectpicker("refresh");
                    });

                    $("#dimension-div .condition-div-statement").find(".dimension-statement .dimension-each").each(function () {
                        if ($(this).next("div").length > 0) {
                            $(this).children(".add-dimension-after").html("");
                        }
                    });
                    $("#dimension-div .dimension-statement").find(".dimension-each:eq(" + i + ")").each(function () {
                        $(this).find(".join-div select").find("option").each(function () {
                            if ($(this).val() == "") {
                                $(this).removeAttr("selected");
                            }
                            else if ($(this).val() == dimensionJoinCondition.toString()) {
                                $(this).attr("selected", "selected");
                                $(this).parents(".join-div").find(".bootstrap-select li").each(function () {
                                    if ($(this).hasClass("disabled selected active")) {
                                        $(this).removeClass("selected active");
                                    }
                                    if ($(this).attr("data-original-index") == dimensionJoinCondition.toString()) {
                                        $(this).addClass("selected active");
                                        var value = $(this).find(".text").text();
                                        $(this).parents(".bootstrap-select").find(".filter-option").html(value);
                                    }
                                });
                            }
                        });
                        l++;
                    });

                    $("#dimension-div .condition-div-statement .dimension-statement").find(".dimension-each:eq(" + i + ")").each(function () {
                        var dimensionValueArray = [];
                        dimensionValueArray = columnValue.split(",");
                        var conditionType = 0;
                        var listDimensionValues = "";
                        var targetSelector = $(this).find(".condition-type select");
                        var targetValue = $(this).find(".dimension-column-value-col select,.target-column-value select");
                        var customValue = $(this).find(".add-value-dimension");
                        $.ajax({
                            type: "POST",
                            async: false,
                            data: { itemId: itemId, columnName: columnName, widgetName: itemName },
                            url: getColumnValuesUrl,
                            success: function (result) {
                                var columnDetails = result;
                                for (var i = 0; i < columnDetails.data.length; i++) {
                                    for (var values = 0; values < dimensionValueArray.length; values++) {
                                        if (columnDetails.data[i].trim().toLowerCase() == dimensionValueArray[values].trim().toLowerCase()) {
                                            conditionType++;
                                        }
                                    }
                                    listDimensionValues += '<option value="' + columnDetails.data[i] + '">' + columnDetails.data[i] + '</option>';
                                }
                                $(targetValue).append(listDimensionValues);

                                if (columnType.toLowerCase() == "date" && dimensionCondition == "3") {
                                    $(targetSelector).parent("div").css("display", "none");
                                    $(customValue).css("display", "none");
                                    $(targetValue).parent("div").css("display", "none");
                                }
                                else {
                                    if (conditionType > 0) {
                                        $(targetSelector).find("option").each(function () {
                                            if ($(this).val() == "") {
                                                $(this).removeAttr("selected");
                                            }
                                            else if ($(this).val() == "0") {
                                                $(this).attr("selected", "selected");
                                            }
                                            $(".selectpicker").selectpicker("refresh");
                                        });
                                        $(targetSelector).parent("div").addClass("display");
                                        $(targetValue).parent("div").css("display", "inline");
                                        $(targetValue).parent("div").addClass("margin-right");
                                        $(targetValue).html("");
                                        $(targetValue).append(listDimensionValues).selectpicker("refresh");
                                        var selector = $("#dimension-div .dimension-statement");
                                        refreshColumns(selector);
                                        addTitleForColumnValues();
                                    }
                                    else {
                                        $(targetSelector).find("option").each(function () {
                                            if ($(this).val() == "") {
                                                $(this).removeAttr("selected");
                                            }
                                            else if ($(this).val() == "1") {
                                                $(this).attr("selected", "selected");
                                            }
                                            $(".selectpicker").selectpicker("refresh");
                                        });

                                        $(targetSelector).parent("div").addClass("display");
                                        $(customValue).css("display", "inline");
                                        $(customValue).css("margin-right", "10px");
                                        $(customValue).find("input").val(dimensionValueArray);
                                    }
                                }
                            }
                        });
                        $("#popup-container_wrapper").ejWaitingPopup("hide");
                        $("#editpopup-container_wrapper").ejWaitingPopup("hide");
                        $("#dimension-div .condition-div-statement .dimension-statement .dimension-each select").selectpicker("refresh");
                    });

                    $("#dimension-div .dimension-statement").find(".dimension-each:eq(" + i + ")").each(function () {
                        var dimensionValueArray = [];
                        dimensionValueArray = columnValue.split(",");
                        for (var k = 0; k < dimensionValueArray.length; k++) {
                            $(this).find(".target-column-value select").find("option").each(function () {
                                if ($(this).val() == "") {
                                    $(this).removeAttr("selected");
                                }
                                else if ($(this).text().trim() == dimensionValueArray[k].trim()) {
                                    $(this).attr("selected", "selected");
                                    $(this).parents(".target-column-value").find(".bootstrap-select li").each(function () {
                                        if ($(this).hasClass("disabled selected active")) {
                                            $(this).removeClass("selected active");
                                        }
                                        if ($(this).find(".text").text().trim() == dimensionValueArray[k]) {
                                            $(this).addClass("selected active");
                                            var value = $(this).find(".text").text();
                                            $(this).parents(".bootstrap-select").find(".filter-option").html(value);
                                        }
                                    });
                                }
                            });
                        }
                    });
                    var selector = $("#dimension-div .dimension-statement select");
                    refreshColumns(selector);
                }
                $("#dimension-div .condition-div-statement").find(".dimension-statement .dimension-each:eq(0)").each(function () {
                    if ($(this).siblings(".dimension-each").length > 0) {
                        $(this).children(".add-dimension-after").html("");
                    }
                });
            }
            parent.$("#popup-container_wrapper").ejWaitingPopup("hide");
            parent.$("#editpopup-container_wrapper").ejWaitingPopup("hide");
        }
    });
}
});
}

function addMeasure(array) {
    $("#measure-div").append('<span id="form-message" class="error-message-widget validate-error no-padding col-sm-8 col-xs-8"></span>'+'<label class="custom-expression-columns" style="top: 5px;">' + window.Server.App.LocalizationContent.CutomExpression + '</label><div class="col-sm-12 col-xs-12 condition-div-statement no-padding first-condition"><span class="filterarea"><span class="filterareatext"></span><input type="hidden" class="filterareainput"></span>' + '<a href="javascript:void(0);" title="" class="remove-measure-dimension pull-right su su-close">'
                                           + '</a>' + '<div class="measure-statement col-sm-12 col-xs-12 no-padding">' +
                       '<div class="col-sm-3 col-xs-3 no-padding measure-column-col column" id="condition-first-col">' +
                            '<select id="selected-col-option" data-live-search="true" title="'+window.Server.App.LocalizationContent.SelectColumn+'" class="selectpicker select-condition col-sm-2 col-xs-2 no-padding no-margin" data-size="5">' +
                              '</select>' +
                        '</div>' +
                           '<input class="add-comparison btn"  type="button" value=' + window.Server.App.LocalizationContent.AddComparisionTarget + '>' +
                       '<div class="add-comparison-target col-sm-6 col-xs-6" ><span class="remove-comparison su su-close" data-toggle="tooltip" data-container="body" data-placement="right" title="' + window.Server.App.LocalizationContent.RemoveComparisionTarget + '"></span>' +
                           '<div class="col-sm-2 col-xs-1 no-padding column-condition no-margin" id="where-condition">' +
                        '<select id="selected-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="col-sm-1 col-xs-1 no-padding no-margin" data-size="5">' +
                            '<option value="0" selected="selected" class="su su-equals">Equals</option>' + '<option value="1" class="su su-not-equals">Not Equals</option>' + '<option value="2" class="su su-lesser-than">Less Than</option>' +
                                '<option value="3" class="su su-greater-than">Greater Than</option>' + '<option value="4" class="su su-lesser-than-or-equal-to">Less Than Or Equals</option>' + '<option value="5" class="su su-greater-than-or-equal-to">Greater Than Or Equals</option>' +
                                '</select>' +
                    '</div>' +
                     '<div class="col-sm-4 col-xs-3 no-padding condition-type no-margin" id="condition-type">' +
                        '<select id="switch-value" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectTarget+ '" class="selectpicker col-sm-2 col-xs-2 no-padding no-margin select-value" data-size="5">' +
                               '<option value="" disabled class="hide-option"selected="selected">' + window.Server.App.LocalizationContent.SelectTarget+ '</option>' + '<option value="0">Condition</option>' + '<option value="1">Custom</option>' +
                                '</select>' +
                    '</div>' +
                      '<div class="col-sm-5 col-xs-4 no-padding  measure-column-col  target-column no-margin" id="condition-second-col">' +
                            '<select id="selected-col2-option" data-live-search="true" title="'+window.Server.App.LocalizationContent.SelectColumn+'" class="selectpicker select-condition col-sm-2 col-xs-2 no-padding no-margin" data-size="5">' +
                             '</select>' +
                      '</div>' +
                              '<div class="col-sm-4 col-xs-4 no-padding no-margin add-value">' +
                    '<input type= "text"  id="value" class=" form-control validation-input">' + '<span class="add-custom">' + window.Server.App.LocalizationContent.CustomValueNumericValidator+ '</span>' +
                    '</div>' + '</div>'+'<a href="javascript:void(0);" class="col-md-12  col-sm-12 col-lg-12 col-xs-12 add-where-local" id="add-dimensions">' +
                                  '<span class="su su-add"></span>' +
                                  '<span class="margin-alignment">Add Where condition</span>' +
                              '</a>' +
                    '</div>' + '<div class=" col-sm-12 col-xs-12 no-padding dimension-statement no-margin">' + '</div>' +

                        '</div>');

    var selection = $("#measure-div").find(".condition-div-statement:last ");
    var dimensionForMeasure = array[1].length;
    var dimensionCount = 0;
    if (dimensionForMeasure != null) {
        while (dimensionCount < dimensionForMeasure) {
            if (dimensionCount == 0) {
                addDimensionWithMeasure(selection);
            }
            else {
                addDimensionWithMeasureAgain(selection);
            }
            dimensionCount++;
        }

        if (dimensionCount > 0) {
            $("#measure-div .condition-div-statement").last().find("#add-dimensions").css("display", "none");
        }
    }
}

function addMeasureAgain(array) {
    $("#measure-div").append('<div class="col-sm-12 col-xs-12 condition-div-statement no-padding margin-condition-div-statement"><span class="filterarea"><span class="filterareatext"></span><input type="hidden" class="filterareainput"></span>' + '<a href="javascript:void(0);" title="" class="remove-measure-dimension pull-right su su-close">'
                                           + '</a>' + '<div class="col-sm-2 col-xs-2 no-padding selected-joins" id="selected-joins">' +
    '<select id="selected-join-option" data-live-search="true" title=' + selectJoinOption + ' class="selectpicker col-sm-2 col-xs-2 join-option no-padding" data-size="5">' +
        '<option value="0" class="and" selected="selected">AND</option>' +
                 '<option value="1" class="or">OR</option>' +
                 '<option value="2" class="nand">AND NOT</option>' +
                 '<option value="3" class="nor">OR NOT</option>' +
    '</select>' +
'</div>' + '<div class="measure-statement col-sm-12 col-xs-12 no-padding">' +
                  '<div class="col-sm-3 col-xs-3 no-padding measure-column-col column" id="condition-first-col">' +
                       '<select id="selected-col-option" data-live-search="true" title="'+window.Server.App.LocalizationContent.SelectColumn+'" class="selectpicker select-condition col-sm-2 col-xs-2 no-padding no-margin" data-size="5">' +
                         '</select>' +
                   '</div>' +
                   '<input class="add-comparison btn"  type="button" value="' + window.Server.App.LocalizationContent.AddComparisionTarget + '" tabindex="4" class="secondary-button">' +
                       '<div class="add-comparison-target col-sm-6 col-xs-6" ><span class="remove-comparison su su-close" data-toggle="tooltip" data-container="body" data-placement="right" title="' + window.Server.App.LocalizationContent.RemoveComparisionTarget + '"></span>' +
                      '<div class="col-sm-2 col-xs-1 no-padding  column-condition no-margin" id="where-condition">' +
                   '<select id="selected-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="col-sm-4 col-xs-4 no-padding no-margin" data-size="5">' +
                  '<option value="0" selected="selected" class="su su-equals">Equals</option>' + '<option value="1" class="su su-not-equals">Not Equals</option>' + '<option value="2" class="su su-lesser-than">Less Than</option>' +
                           '<option value="3" class="su su-greater-than">Greater Than</option>' + '<option value="4" class="su su-lesser-than-or-equal-to">Less Than Or Equals</option>' + '<option value="5" class="su su-greater-than-or-equal-to">Greater Than Or Equals</option>' +
                           '</select>' +
               '</div>' +
                '<div class="col-sm-4 col-xs-3 no-padding condition-type no-margin" id="condition-type">' +
                   '<select id="switch-value" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectTarget+ '" class="selectpicker col-sm-2 col-xs-2 no-padding no-margin select-value" data-size="5">' +
                          '<option value="" disabled class="hide-option"selected="selected" >' + window.Server.App.LocalizationContent.SelectTarget+ '</option>' + '<option value="0">Condition</option>' + '<option value="1">Custom</option>' +
                           '</select>' +
               '</div>' +

                 '<div class="col-sm-5 col-xs-4 no-padding  measure-column-col  target-column no-margin" id="condition-second-col">' +
                       '<select id="selected-col2-option" data-live-search="true" title="'+window.Server.App.LocalizationContent.SelectColumn+'" class="selectpicker select-condition col-sm-2 col-xs-2 no-padding no-margin" data-size="5">' +
                        '</select>' + '</div>' +
                         '<div class="col-sm-4 col-xs-4 no-padding no-margin add-value">' +
               '<input type= "text" id="value" class="form-control validation-input">' + '<span class="add-custom">' + window.Server.App.LocalizationContent.CustomValueNumericValidator+ '</span>' +
               '</div>' +'</div>'+ '<a href="javascript:void(0);" class="col-md-12  col-sm-12 col-lg-12 col-xs-12 add-where-local" id="add-dimensions">' +
                                  '<span class="su su-add"></span>' +
                                  '<span class="margin-alignment">Add Where condition</span>' +
                              '</a>' +
               '</div>' + '<div class=" col-sm-12 col-xs-12 no-padding dimension-statement  no-margin">' + '</div>' +

                   '</div>');

    var selector = $("#measure-div").find(".condition-div-statement:last");
    if (!$(selector).find(".and").hasClass("and-img")) {
        $(selector).find(".and").prepend("<img class='and-img'/>");
        $(selector).find(".and-img").attr("src", dashboardServerResourceUrl + "/images/" + "and" + ".png");
        $(selector).find(".or").prepend("<img class='or-img'/>");
        $(selector).find(".or-img").attr("src", dashboardServerResourceUrl + "/images/" + "or" + ".png");
        $(selector).find(".nand").prepend("<img class='nand-img'/>");
        $(selector).find(".nand-img").attr("src", dashboardServerResourceUrl + "/images/" + "nand" + ".png");
        $(selector).find(".nor").prepend("<img class='nor-img'/>");
        $(selector).find(".nor-img").attr("src", dashboardServerResourceUrl + "/images/" + "nor" + ".png");
        $(selector).find("select").selectpicker("refresh");
    }
    var dimensionForMeasure = array[1].length;
    var dimensionCount = 0;
    if (dimensionForMeasure != null) {
        while (dimensionCount < dimensionForMeasure) {
            if (dimensionCount == 0) {
                addDimensionWithMeasure(selector);
            }
            else {
                addDimensionWithMeasureAgain(selector);
            }
            dimensionCount++;
        }

        if (dimensionCount > 0) {
            $("#measure-div .condition-div-statement").last().find("#add-dimensions").css("display", "none");
        }
    }
}

function addDimension() {
    $("#dimension-div").append('<div class="col-sm-12 col-xs-12 condition-div-statement margin-dimension-statement no-padding">' + '<div class="col-sm-12 col-xs-12 dimension-statement no-padding">' + '<div class="col-sm-12 col-xs-12 no-padding dimension-each no-margin where">' +
          '<div class="col-sm-1 col-xs-1 no-padding delete-button-dimension no-margin">' +
                           '<span class="su su-close action"></span>' + '</div>' +
         '<div class="col-sm-1 col-xs-1 where-class no-padding no-margin text-center">' + '<span id="where">Where</span>' + '</div>' +
                     '<div class="col-sm-2 col-xs-2 no-padding dimension-column-col actual-column no-margin" id="condition-first-col">' +
                        '<select id="selected-col-option" data-live-search="true" title="'+window.Server.App.LocalizationContent.SelectColumn+'" class="selectpicker col-sm-2 col-xs-2 no-padding select-condition" data-size="5">' +
                        '</select>' + '<span class="error-column">' + '</span>' +
                    '</div>' +
                '<div class="col-sm-2  col-xs-2 no-padding  column-dimension no-margin" id="where-condition">' +
                    '<select id="selected-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="selectpicker col-sm-2 col-xs-2 no-padding" data-size="5">' +
                         '<option value = "" disabled class="hide-option" selected="selected">' + window.Server.App.LocalizationContent.SelectCondition+ '</option>' +
               '<option value="0">Contains</option>' + '<option value="1">Starts With</option>' + '<option value="2">Ends With</option>' + '<option value="3">Not Contains</option>' + '<option value="4">Include</option>' +
     '<option value="5">Exclude</option>' + '</select>' +
                '</div>' +
                 '<div class="col-sm-2 col-xs-2 no-padding condition-type no-margin" id="condition-type-dimension">' +
                    '<select id="switch-value" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="selectpicker col-sm-2 col-xs-2 no-padding no-margin select-value-dimension" data-size="5">' +
                           '<option value="" disabled class="hide-option" selected="selected">' + window.Server.App.LocalizationContent.SelectTarget+ '</option>' + '<option value="0">Actual</option>' + '<option value="1">Custom</option>' +
                            '</select>' +
                '</div>' +

                     '<div class="col-sm-3 col-xs-3 no-padding dimension-column-value-col value target-column-value no-margin target-row" id="selected-value-condition">' +
                    '<select id="selected-value-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectValue+ '" class="selectpicker col-sm-3 col-xs-3 no-padding" data-size="5" multiple="">' +
                    '</select>' +
                '</div>' +
                  '<div class="col-sm-3 col-xs-3 no-padding add-value-dimension">' +
                '<input type= "text" class="form-control target-value validation-input" id="value-dimension">' +
                 '<span class="add-dimension-custom"></span>' +
                '</div>' +
                '<div class="col-sm-1 col-xs-1 no-padding add-dimension-after">' +
               '<span class="su su-add add-dimension-condition-again" id=add-dimension-condition-again></span>' + '</div>' +
               '</div>' + '<a href="javascript:void(0);" title="" class="su su-close remove-dimension"></a>' + '</div>' + '</div>');

    $("#dimension-div .condition-div-statement .dimension-statement .dimension-each select").selectpicker("refresh");
    $("#dimension-div").find(".dimension-statement .dimension-each:last").find(".actual-column select").html("");
    $("#dimension-div").find(".dimension-statement .dimension-each:last").find(".actual-column select").html(dimensionColumns);
}

function addDimensionAgain() {
    $("#dimension-div .condition-div-statement .dimension-statement").append('<div class="col-sm-12 col-xs-12 no-padding dimension-each no-margin">' +
             '<div class="col-sm-1 col-xs-1 no-padding delete-button-dimension no-margin">' +
                              '<span class="su su-close action"></span>' + '</div>' +
    '<div class="col-sm-2 col-xs-2 join-div no-padding no-margin">' +
                    '<select id="selected-join-option" data-live-search="true" title=' + selectJoinOption + ' class="selectpicker col-sm-2 col-xs-2 join-option no-padding" data-size="5">' +
                            '<option value="0" class="and" selected="selected">AND</option>' +
                                   '<option value="1" class="or">OR</option>' +
                       '</select>' +

               '</div>' +
                           '<div class="col-sm-2 col-xs-2 no-padding dimension-column-col actual-column no-margin" id="condition-first-col">' +
                              '<select id="selected-col-option" data-live-search="true" title="'+window.Server.App.LocalizationContent.SelectColumn+'" class="selectpicker col-sm-2 col-xs-2 no-padding select-condition" data-size="5">' +
                                  '</select>' + '<span class="error-column">' + '</span>' +
                          '</div>' +
                      '<div class="col-sm-2 col-xs-2 no-padding column-dimension no-margin" id="where-condition">' +
                          '<select id="selected-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="selectpicker col-sm-2 col-xs-2 no-padding" data-size="5">' +
                                       '<option value = "" disabled class="hide-option" selected="selected">' + window.Server.App.LocalizationContent.SelectCondition+ '</option>' +
                  '<option value="0">Contains</option>' + '<option value="1">Starts With</option>' + '<option value="2">Ends With</option>' + '<option value="3">Not Contains</option>' + '<option value="4">Include</option>' +
        '<option value="5">Exclude</option>' + '</select>' +
                      '</div>' +
                       '<div class="col-sm-2 col-xs-2 no-padding condition-type no-margin" id="condition-type-dimension">' +
                       '<select id="switch-value" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="selectpicker col-sm-2 col-xs-2 no-padding no-margin select-value-dimension" data-size="5">' +
                              '<option value="" name="" class="hide-option" disabled="disabled" selected="selected">' + window.Server.App.LocalizationContent.SelectTarget+ '</option>' + '<option value="0">Actual</option>' + '<option value="1">Custom</option>' +
                               '</select>' +
                   '</div>' +
                           '<div class="col-sm-3 col-xs-3  no-padding value dimension-column-value-col target-column-value no-margin target-row" id="selected-value-condition">' +
                          '<select id="select-value-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectValue+ '" class="selectpicker col-sm-3 col-xs-3 no-padding" data-size="5" multiple="">' +
                              '</select>' +
                      '</div>' +
                       '<div class="col-sm-3 col-xs-3 no-padding add-value-dimension">' +
                   '<input type= "text" class="form-control target-value validation-input" id="value-dimension">' +
                   '<span class="add-dimension-custom"></span>' +
                   '</div>' +

                      '<div class="col-sm-1 col-xs-1 no-padding  add-dimension-after">' +
                  '<span class="su su-add add-dimension-condition-again" id="add-dimension-condition-again"></span>' + '</div>' +

                 '</div>');
    $("#dimension-div .condition-div-statement .dimension-statement .dimension-each select").selectpicker("refresh");
    var selector = $("#dimension-div").find(".dimension-statement .dimension-each:last");
    if (!$(selector).find(".and").hasClass("and-img")) {
        $(selector).find(".and").prepend("<img class='and-img'/>");
        $(selector).find(".and-img").attr("src", dashboardServerResourceUrl + "iImages/" + "and" + ".png");
        $(selector).find(".or").prepend("<img class='or-img'/>");
        $(selector).find(".or-img").attr("src", dashboardServerResourceUrl + "/images/" + "or" + ".png");
        $(selector).find(".nand").prepend("<img class='nand-img'/>");
        $(selector).find(".nand-img").attr("src", dashboardServerResourceUrl + "/images/" + "nand" + ".png");
        $(selector).find(".nor").prepend("<img class='nor-img'/>");
        $(selector).find(".nor-img").attr("src", dashboardServerResourceUrl + "/images/" + "nor" + ".png");
        $(selector).find("select").selectpicker("refresh");
    }
}

function addDimensionWithMeasure(selector) {
    $(selector).find(".dimension-statement").append('<div class="col-sm-12 col-xs-12 no-padding dimension-each no-margin where">' +
                     '<div class="col-sm-1 col-xs-1 no-padding delete-button no-margin">' +
                                      '<span class="su su-close action"></span>' + '</div>' +
                    '<div class="col-sm-1 col-xs-1 where-class no-padding no-margin text-center">' + '<span id="where">Where</span>' + '</div>' +
                                '<div class="col-sm-2 col-xs-2 no-padding dimension-column-col actual-column no-margin" id="condition-first-col">' +
                                   '<select id="selected-col-option" data-live-search="true" title="'+window.Server.App.LocalizationContent.SelectColumn+'" class="selectpicker col-sm-2 col-xs-2 no-padding select-condition" data-size="5">' +
                                    '</select>' + '<span class="error-column">' + '</span>' +
                               '</div>' +
                           '<div class="col-sm-2 col-xs-2 no-padding  column-dimension no-margin" id="where-condition">' +
                               '<select id="selected-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="selectpicker col-sm-2 col-xs-2 no-padding" data-size="5">' +
                                    '<option value = "" disabled class="hide-option" selected="selected">' + window.Server.App.LocalizationContent.SelectCondition+ '</option>' +
                          '<option value="0">Contains</option>' + '<option value="1">Starts With</option>' + '<option value="2">Ends With</option>' + '<option value="3">Not Contains</option>' + '<option value="4">Include</option>' +
                '<option value="5">Exclude</option>' + '</select>' +
                           '</div>' +
                            '<div class="col-sm-2 col-xs-2 no-padding condition-type no-margin" id="condition-type-dimension">' +
                               '<select id="switch-value" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="selectpicker col-sm-2 col-xs-2 no-padding no-margin select-value-dimension" data-size="5">' +
                                     '<option value="" disabled class="hide-option" selected="selected">' + window.Server.App.LocalizationContent.SelectTarget+ '</option>' + '<option value="0">Actual</option>' + '<option value="1">Custom</option>' +
                                       '</select>' +
                           '</div>' +
                                '<div class="col-sm-3 col-xs-3 no-padding dimension-column-value-col value target-column-value no-margin target-row" id="selected-value-condition">' +
                               '<select id="selected-value-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectValue+ '" class="selectpicker col-sm-3 col-xs-3 no-padding" data-size="5" multiple="">' +
                               '</select>' +
                           '</div>' +
                           '<div class="col-sm-3 col-xs-3 no-padding add-value-dimension">' +
                           '<input type= "text" class="form-control target-value validation-input" id="value-dimension">' +
                            '<span class="add-dimension-custom"></span>' +
                           '</div>' + '<div class="col-sm-1 col-xs-1 no-padding add-dimension-after">' +
                          '<span class="su su-add add-dimension-again" id=add-dimension-again></span>' + '</div>' +
                          '</div>');

    $("#dimension-div .condition-div-statement .dimension-statement .dimension-each select").selectpicker("refresh");
    $("#dimension-div").find(".dimension-statement .dimension-each:last").find(".actual-column select").html("");
    $("#dimension-div").find(".dimension-statement .dimension-each:last").find(".actual-column select").html(dimensionColumns);
    $(selector).find(".dropdown-class .where-local-add").css("display", "none");
}

function addDimensionWithMeasureAgain(selector) {
    $(selector).find(".dimension-statement").append('<div class="col-sm-12 col-xs-12 no-padding dimension-each no-margin">' +
             '<div class="col-sm-1 col-xs-1 no-padding delete-button no-margin">' +
                              '<span class="su su-close action"></span>' + '</div>' +
    '<div class="col-sm-2 col-xs-2 join-div no-padding no-margin">' +
                    '<select id="selected-join-option" data-live-search="true" title=' + selectJoinOption + ' class="selectpicker col-sm-2 col-xs-2 join-option no-padding" data-size="5">' +
                             '<option value="0" class="and" selected="selected">AND</option>' +
                                   '<option value="1" class="or">OR</option>' +
                       '</select>' +

               '</div>' +
                           '<div class="col-sm-2 col-xs-2 no-padding dimension-column-col actual-column no-margin" id="condition-first-col">' +
                              '<select id="selected-col-option" data-live-search="true" title="'+window.Server.App.LocalizationContent.SelectColumn+'" class="selectpicker col-sm-2 col-xs-2 no-padding select-condition" data-size="5">' +
                                  '</select>' + '<span class="error-column">' + '</span>' +
                          '</div>' +
                      '<div class="col-sm-2 col-xs-2 no-padding column-dimension no-margin" id="where-condition">' +
                          '<select id="selected-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="selectpicker col-sm-2 col-xs-2 no-padding" data-size="5">' +
                                       '<option value = "" disabled class="hide-option" selected="selected">' + window.Server.App.LocalizationContent.SelectCondition+ '</option>' +
                  '<option value="0">Contains</option>' + '<option value="1">Starts With</option>' + '<option value="2">Ends With</option>' + '<option value="3">Not Contains</option>' + '<option value="4">Include</option>' +
        '<option value="5">Exclude</option>' + '</select>' +
                      '</div>' +
                       '<div class="col-sm-2 col-xs-2 no-padding condition-type no-margin" id="condition-type-dimension">' +
                       '<select id="switch-value" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectCondition+ '" class="selectpicker col-sm-2 col-xs-2 no-padding no-margin select-value-dimension" data-size="5">' +
                            '<option value="" disabled class="hide-option" selected="selected">' + window.Server.App.LocalizationContent.SelectTarget+ '</option>' + '<option value="0">Actual</option>' + '<option value="1">Custom</option>' +
                               '</select>' +
                   '</div>' +
                           '<div class="col-sm-3 col-xs-3  no-padding value dimension-column-value-col target-column-value no-margin target-row" id="selected-value-condition">' +
                          '<select id="select-value-condition" data-live-search="true" title="' + window.Server.App.LocalizationContent.SelectValue+ '" class="selectpicker col-sm-3 col-xs-3 no-padding" data-size="5" multiple="">' +
                              '</select>' +
                      '</div>' +
                       '<div class="col-sm-3 col-xs-3 no-padding add-value-dimension">' +
                   '<input type= "text" class="form-control target-value validation-input" id="value-dimension">' +
                    '<span class="add-dimension-custom"></span>' +
                   '</div>' + '<div class="col-sm-1 col-xs-1 no-padding  add-dimension-after">' +
                  '<span class="su su-add add-dimension-again" id="add-dimension-again"></span>' + '</div>' +

                 '</div>');
    var join = $("#measure-div").find(".dimension-statement .dimension-each:last .join-div");
    if (!$(join).find(".and").hasClass("and-img")) {
        $(join).find(".and").prepend("<img class='and-img'/>");
        $(join).find(".and-img").attr("src", dashboardServerResourceUrl + "/images/" + "and" + ".png");
        $(join).find(".or").prepend("<img class='or-img'/>");
        $(join).find(".or-img").attr("src", dashboardServerResourceUrl + "/images/" + "or" + ".png");
        $(join).find(".nand").prepend("<img class='nand-img'/>");
        $(join).find(".nand-img").attr("src", dashboardServerResourceUrl + "/images/" + "nand" + ".png");
        $(join).find(".nor").prepend("<img class='nor-img'/>");
        $(join).find(".nor-img").attr("src", dashboardServerResourceUrl + "/images/" + "nor" + ".png");
        $(join).find("select").selectpicker("refresh");
    }
    $("#dimension-div .condition-div-statement .dimension-statement .dimension-each select").selectpicker("refresh");
    $(selector).find(".dropdown-class .where-local-add").css("display", "none");
}

function saveCondition() {
    var actualColumnDimension = [];
    var conditionDimension = [];
    var targetColumnDimension = [];
    var conditionDimensionInnerValue = [];
    var valueDimension = [];
    var joins = [];
    var valueAdded = [];
    var columnType = [];
    var listJoin = [];
    var columnInfo = [];
    var widgetDesignerId = $("#selected-items").find("option:selected").attr("data-itemid");
    measure = [], dimensionArray = [], dimensionArrayValue = [], joinCondition = [];
    var conditionCategory = $("#condition-category").find("option:selected").html();
    $("#data-changes-div-container").find("select").each(function () {
        if (($(this).find("option:selected").val() == "" || $(this).find("option:selected").val() == null) && $(this).parent("div").css("display") != "none") {
            $(this).siblings(".bootstrap-select").addClass("validation-error");
            $(this).parent("div").addClass("validation");
        }
        else {
            $(this).siblings(".bootstrap-select").removeClass("validation-error");
            $(this).parent("div").removeClass("validation");
        }
    });
    $(".condition-div-statement .measure-statement").find(".add-comparison").each(function () {
        if (!$(this).is(":visible")) {
            if ($(this).next(".add-comparison-target").find("option:selected").val() == "" || $(this).next(".add-comparison-target").find("option:selected").val() == null) {
                $(this).next(".add-comparison-target").addClass("validation");
            }
        }
        else {
            $(this).next(".add-comparison-target").removeClass("validation");
            $(this).next(".add-comparison-target").find("#condition-type").removeClass("validation");
            $(this).next(".add-comparison-target").find("#condition-second-col").removeClass("validation");
        }
    });
    if ($("#data-changes-div-container").find("div").hasClass("validation")) {
        if (conditionCategory == "Increases" || conditionCategory == "Decreases" || conditionCategory == "Continuously Increases" || conditionCategory == "Continuously Decreases") {
            if ($("#condition-div .measure-statement").find(".condition-type,.target-column").hasClass("validation")) {
                $("#condition-div .measure-statement").find(".condition-type,.target-column").removeClass("validation");
                $("#condition-div .measure-statement").find(".condition-type .bootstrap-select,.target-column .bootstrap-select").removeClass("validation-error");
            }
        }
    }
    $("#data-changes-div-container").find(".validation-input").each(function () {
        if ($(this).hasClass("from-date")) {
            if ($(this).val() == "") {
                $(this).parent().addClass("validation-error");
                $(".date-error").css("display", "inline");
                $(".date-error").css("visibility", "visible");
                $(this).parents("div").addClass("validation");
            }
            else {
                $(this).parent().removeClass("validation-error");
                $(".date-error").css("display", "none");
                $(this).parents("div").removeClass("validation");
                $(".date-error").css("visibility", "hidden");
            }
        }
        else if ($(this).val() == "" && $(this).parent("div").css("display") != "none") {
            $(this).addClass("validation-error");
            $(this).parent("div").children("span").css("display", "inline");
            $(this).parent("div").addClass("validation");
        }
        else {
            $(this).removeClass("validation-error");
            $(this).parent("div").children("span").css("display", "none");
            $(this).parent("div").removeClass("validation");
        }
    });
    if ($("#data-changes-div-container").find("div").hasClass("validation") || ($("#data-changes-div-container #condition-div #measure-div").html().trim() == "")) {
        validation = 1;
        if ($(".items-dropdown").hasClass("validation") && $(".condition-category-changes").hasClass("validation")) {
            $("#widget-message").css("display", "inline");
            $(".error-message-condition-category").css("display", "inline");
        }
        else if ($(".items-dropdown").hasClass("validation")) {
            $("#widget-message").css("display", "inline");
        }
        else if ($(".condition-category-changes").hasClass("validation")) {
            $(".error-message-condition-category").css("display", "inline");
        }
        else if ($("#data-changes-div-container #condition-div #measure-div").html().trim() == "") {
            $("#add-condition").addClass("add-first-condition-validation");
            $(".add-error-msg").html(window.Server.App.LocalizationContent.AddContitionValidator).css("visibility", "visible");
        }
        else {
            $("#add-condition").removeClass("add-first-condition-validation");
            $(".add-error-msg").html(window.Server.App.LocalizationContent.AddContitionValidator).css("visibility", "hidden");
            $(".error-message-widget").css("display", "none");
            $(".error-message-condition-category").css("display", "none");
        }
    }
    else {
        if ($("#data-changes-div-container #condition-div #measure-div .condition-div-statement").length <= 1 && $("#data-changes-div-container #condition-div #dimension-div .dimension-each").length != 0) {
            validation = 1;
            $("#add-condition").addClass("add-first-condition-validation");
            $(".add-error-msg").html(window.Server.App.LocalizationContent.ConditionValidator).css("visibility", "visible");
        }
        else {
            validation = 0;
        }
    }
    if (validation != 1) {
        var itemId = $("#selected_dashboard").find("option:selected").val();
        createdItemId = itemId;
        if ($("#selected_childdashboard").val() != "") {
            itemId = $("#selected_childdashboard").find("option:selected").val();
            createdItemId = itemId;
        }

        if ($("#selected_childdashboard").val() == "" && $("#selected_childdashboard").attr("disabled") != "disabled") {
            $("#schedule-submit").attr("data-report-id", $("#selected_childdashboard [data-designerid='" + $("#selected-items").find("option:selected").attr("data-itemid") + "']").val());
            createdItemId = $("#selected_childdashboard [data-designerid='" + $("#selected-items").find("option:selected").attr("data-itemid") + "']").val();
        }

        var category = $("#condition-category").find("option:selected").attr("name");
        var filter = $(".condition-div-statement");
        var i = 0, j = 0, k = 0, l = 0; var obj;
        var count = parseInt($("#count").val());
        var countCondition = $(".condition-div-statement").length;
        var itemName = $("#selected-items").find("option:selected").val();
        if (conditionCategory == "Increases" || conditionCategory == "Decreases" || conditionCategory == "Continuously Increases" || conditionCategory == "Continuously Decreases" || (conditionCategory == "Value Changes"))
        {
            while (i < countCondition) {
                $(".condition-div-statement").each(function () {
                    var j = 0, list = [];
                    if ($(this).find("#selected-joins").length > 0) {
                        joinCondition[i] = $(this).find(".join-option option:selected").val();
                    }
                    else {
                        joinCondition[i] = "0";
                    }
                    if ($(this).find(".measure-statement").find(".add-comparison-target").css("display") == "none") {
                        if ($(this).find(".measure-statement").length > 0) {
                            actualColumn = $(this).find(".column option:selected").val();
                            measure[i] = [actualColumn, $(this).find(".filterareainput").val()];
                        }
                        else {
                            measure[i] = null;
                        }
                        if ($(this).find(".dimension-statement").length > 0) {
                            var countDimension = $(this).find(".dimension-each").length;
                            var join = $(this).find(".join-div").length;
                            var listValues = []; var dataValue = "";
                            while (j < countDimension) {
                                $(this).find(".dimension-each").each(function () {
                                    if ($(this).find(".join-div .join-option option:selected").val() == "") {
                                        joins[j] = null;
                                    }
                                    else {
                                        joins[j] = $(this).find(".join-div .join-option option:selected").val();
                                    }
                                    actualColumnDimension[j] = $(this).find(".actual-column option:selected").val();
                                    var conditionMethodDimension = $(this).find(".select-value-dimension option:selected").val();
                                    conditionDimensionInnerValue[j] = $(this).find(".column-dimension option:selected").text();
                                    conditionDimension[j] = $(this).find(".column-dimension option:selected").val();
                                    if (conditionDimension[j] == "3" && conditionDimensionInnerValue[j] == "Between") {
                                        var dateIdValue = $(this).find(".from-date").attr("id");
                                        var dateValue = $("#" + dateIdValue).val().split('-').map(function (item) {
                                            return item.trim();
                                        });
                                        targetColumnDimension[j] = [dateValue[0], dateValue[1]];
                                        valueDimension[j] = null;
                                    }
                                    else if (conditionMethodDimension == "0") {
                                        targetColumnDimension[j] = $(this).find(".target-column-value .bootstrap-select .btn-default .filter-option").html().split(',').map(function (item) {
                                            return item.trim();
                                        });
                                        valueDimension[j] = null;
                                    }
                                    else {
                                        valueDimension[j] = $(this).find(".target-value").val();
                                        targetColumnDimension[j] = null;
                                    }
                                    dimensionArray[j] = [actualColumnDimension[j], valueDimension[j], conditionDimension[j], targetColumnDimension[j], joins[j]];
                                    list.push(dimensionArray[j]);
                                    j++;
                                    dimensionArrayValue[i] = list;
                                });
                            }
                        }
                        else {
                            dimensionArrayValue[i] = null;
                        }
                        columnInfo[i] = [
                        measure[i], dimensionArrayValue[i], joinCondition[i]
                        ];
                        i++;
                    }
                    else {
                        if ($(this).find(".measure-statement").length > 0) {
                            actualColumn = $(this).find(".column option:selected").val();
                            var conditionMethod = $(this).find(".select-value option:selected").val();
                            if (conditionMethod == "1") {
                                valueAdded = $(this).find("#value").val();
                                targetColumn = null;
                            }
                            else {
                                valueAdded = null;
                                targetColumn = $(this).find(".target-column option:selected").val();
                            }
                            conditionMeasure = $(this).find(".column-condition option:selected").val();
                            measure[i] = [actualColumn, $(this).find(".filterareainput").val(), valueAdded, conditionMeasure, targetColumn];
                        }
                        else {
                            measure[i] = null;
                        }
                        if ($(this).find(".dimension-statement").length > 0) {
                            var countDimension = $(this).find(".dimension-each").length;
                            var dataValue = ""; var listValues = [];
                            var join = $(this).find(".join-div").length;
                            while (j < countDimension) {
                                $(this).find(".dimension-each").each(function () {
                                    if ($(this).find(".join-div .join-option option:selected").val() == "") {
                                        joins[j] = null;
                                    }
                                    else {
                                        joins[j] = $(this).find(".join-div .join-option option:selected").val();
                                    }
                                    actualColumnDimension[j] = $(this).find(".actual-column option:selected").val();
                                    var conditionMethodDimension = $(this).find(".select-value-dimension option:selected").val();
                                    conditionDimensionInnerValue[j] = $(this).find(".column-dimension option:selected").text();
                                    conditionDimension[j] = $(this).find(".column-dimension option:selected").val();
                                    if (conditionDimension[j] == "3" && conditionDimensionInnerValue[j] == "Between") {
                                        var dateIdValue = $(this).find(".from-date").attr("id");
                                        var dateValue = $("#" + dateIdValue).val().split('-').map(function (item) {
                                            return item.trim();
                                        });
                                        targetColumnDimension[j] = [dateValue[0], dateValue[1]];
                                        valueDimension[j] = null;
                                    }
                                    else if (conditionMethodDimension == "0") {
                                        targetColumnDimension[j] = $(this).find(".target-column-value .bootstrap-select .btn-default .filter-option").html().split(',').map(function (item) {
                                            return item.trim();
                                        });
                                        valueDimension[j] = null;
                                    }
                                    else {
                                        valueDimension[j] = $(this).find(".target-value").val();
                                        targetColumnDimension[j] = null;
                                    }
                                    conditionDimension[j] = $(this).find(".column-dimension option:selected").val();
                                    dimensionArray[j] = [actualColumnDimension[j], valueDimension[j], conditionDimension[j], targetColumnDimension[j], joins[j]];
                                    list.push(dimensionArray[j]);
                                    j++;
                                    dimensionArrayValue[i] = list;
                                });
                            }
                        }
                        else {
                            dimensionArrayValue[i] = null;
                        }
                        columnInfo[i] = [measure[i], dimensionArrayValue[i], joinCondition[i]];
                        i++;

                    
                    }
                 
                });
            }
        }
        parent.$("#popup-container_wrapper").ejWaitingPopup("show");
        parent.$("#editpopup-container_wrapper").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            data: { widgetdesignerId: widgetDesignerId, itemId: itemId, columnInfo: JSON.stringify(columnInfo), itemName: itemName, conditionInfo: JSON.stringify(joinCondition), category: category },
            url: addConditionUrl,
            dataType: "json",
            success: function (data) {
                parent.$("#popup-container_wrapper").ejWaitingPopup("hide");
                parent.$("#editpopup-container_wrapper").ejWaitingPopup("hide");
                if (data.hasError == false) {
                    $("#serialize-columninfo").html("").append(data.columnInfo);
                    $("#serialize-conditioninfo").html("").append(data.conditionInfo);
                    $("#previous-data").html("").append(data.validationDetail);
                    if (data.validationResult == true) {
                        $("#alert-value").html("").append(data.validationResult);
                    }
                    $(".after-selection").css("display", "inline");
                    $(".before-selection").css("display", "none");
                    addButtonClicked++;
                    $("#form-message").hide().html("");
                    url = emailEditor;
                    enableEmailEditor();
                } else {
                    $("#form-message").show().html(window.Server.App.LocalizationContent.EvaluatingCondition + (data.status == false ? data.validationDescription : ""));
                    //(data.errorMessage != undefined ? data.errorMessage : "") +
                }
            }
        });
    }
}

function addTitleForWidgets() {
    $("#selected-items").selectpicker("refresh");
    for (var i = 0; i < $(".items-dropdown  .btn-group .dropdown-menu .selectpicker li").length; i++) {
        var hoveredtext = $(".items-dropdown .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
        $(".items-dropdown .btn-group .dropdown-menu .selectpicker li ").eq(i).find("a").attr("title", hoveredtext);
    }
}

function refreshColumns(selector) {
    $(selector).selectpicker("refresh");
}

function addTitleForColumns() {
    for (var i = 0; i < $(".measure-column-col  .btn-group .dropdown-menu .selectpicker li,.dimension-column-col  .btn-group .dropdown-menu .selectpicker li").length; i++) {
        var hoveredtext = $(".measure-column-col .btn-group .dropdown-menu .selectpicker li,.dimension-column-col  .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
        $(".measure-column-col .btn-group .dropdown-menu .selectpicker li,.dimension-column-col  .btn-group .dropdown-menu .selectpicker li ").eq(i).find("a").attr("title", hoveredtext);
    }
}

function addTitleForColumnValues() {
    for (var i = 0; i < $(".target-column-value  .btn-group .dropdown-menu .selectpicker li").length; i++) {
        var hoveredtext = $(".target-column-value .btn-group .dropdown-menu .selectpicker li").eq(i).find("a .text").text();
        $(".target-column-value .btn-group .dropdown-menu .selectpicker li").eq(i).find("a").attr("title", hoveredtext);
    }
}

function getSummaryType(summaryValue) {
    return summaryType[summaryValue];
}

function getWidgets() {
    $.ajax({
        type: "POST",
        url: window.getwidgetUrl,
        data: { itemId: createdItemId },
        async:false,
        success: function (data) {
            var widget = data;
            var listWidgets = "";
            for (var t = 0; t < widget.data.length; t++) {
                var parentName = "";
                var parentId = "";
                if (widget.isMultiDashboard == true) {
                    parentName = " (" + widget.data[t].ParentName + ")";
                    parentId = "data-itemid=" + widget.data[t].ParentId;
                }

                listWidgets += '<option ' + parentId + '  value="' + widget.data[t].Name + '">' + widget.data[t].Name + ' ' + parentName + '</option>';
            }
            $(".items-dropdown select").append('<option disabled class="hide-option" selected="selected" value="">Select Widget</option>' + listWidgets).selectpicker("refresh");
            addTitleForWidgets();
            $("#selected-items").change();
            $("#data-changes-container #condition-div #measure-div,#data-changes-container #condition-div #dimension-div").html("");
            $("#data-changes-container #condition-div #add-condition,#data-changes-container #add-dimension-condition").css("display", "none");
            refreshConditionCategory();
            $("span.loader-gif").remove();
            $(".items-dropdown").find("select").removeAttr("disabled");
            $(".items-dropdown").find(".bootstrap-select li,.bootstrap-select .btn-default").removeClass("disabled");
            $(".items-dropdown").find(".dropdown-menu").addClass("alignment-dropdown");
            $(".items-dropdown").find(".dropdown-menu .inner").addClass("alignment-dropdown-inner");
            $(".items-dropdown").find(".dropdown-menu li:first").css("height", "0px");
            parent.$("#popup-container_wrapper").ejWaitingPopup("hide");
            parent.$("#editpopup-container_wrapper").ejWaitingPopup("hide");
        }
    });
}

function widgetNames() {
    $.ajax({
        type: "POST",
        url: window.getwidgetUrl,
        data: { itemId: createdItemId },
        async:false,
        success: function (data) {
            var widget = data;
            var listWidgets = "";
            for (var t = 0; t < widget.data.length; t++) {
                var parentName = "";
                var parentId = "";
                if (widget.isMultiDashboard == true) {
                    parentName = " (" + widget.data[t].ParentName + ")";
                    parentId = "data-itemid=" + widget.data[t].ParentId;
                }

                listWidgets += '<option ' + parentId + '  value="' + widget.data[t].Name + '">' + widget.data[t].Name + ' ' + parentName + '</option>';
            }
            $(".items-dropdown select").append('<option disabled class="hide-option" selected="selected" value="">Select Widget</option>' + listWidgets).selectpicker("refresh");
             }
        });
}

$(document).on("click", ".custom-expression-columns", function () {
    title = $(".popup-title").html();
    if ($("#selected-items").find("option:selected").val() == "") {
        $("#selected-items").siblings(".bootstrap-select").addClass("validation-error");
        $("#widget-message").css("display", "inline");
    }
    else {
        $("#custom-expression-editor-container").ejDialog("open");
    }
});

function onExpressionEditorDialogOpen() {
    var itemId = $("#selected_dashboard").find("option:selected").val();
    if ($("#selected_childdashboard").val() != "") {
        itemId = $("#selected_childdashboard").find("option:selected").val();
    }
    var itemName = $(".items-dropdown").find("option:selected").val();
    $("#custom-expression-editor-container iframe").attr("src", customExpressionEditor + "?title=" + title + "&&itemname=" + itemName + "&&itemid=" + itemId);
    $("#custom-expression-editor-container_wrapper").ejWaitingPopup("show");
}

function onExpressionEditorDialogClose() {
    parent.$("#custom-expression-editor-container").find("iframe").contents().find("html").html("");
    parent.$("#custom-expression-editor-container").ejDialog("close");
}

$(document).ready(function () {
    $("#data-changes-div-container").css("display", "inline");
    if (typeof (actionType) !== "undefined" && actionType === "Edit") {
        if (item.ItemName != null) {
            widgetNames();
            $("#data-changes-container .items-dropdown").find(".bootstrap-select li").each(function () {
                if ($(this).hasClass("disabled selected active")) {
                    $(this).removeClass("selected active");
                }
                if ($(this).find("span .text").text().trim() == item.ItemName.trim()) {
                    $(this).addClass("selected active");
                    var widgetValue = $(this).find(".text").text();
                    $(this).parents(".bootstrap-select").find(".filter-option").html(widgetValue);
                }
            });
            $("#data-changes-container .items-dropdown").find("select option").each(function () {
                if ($(this).val() == "") {
                    $(this).removeAttr("selected");
                }
                if ($(this).text().trim() == item.ItemName.trim()) {
                    $(this).attr("selected", "selected");
                }
                $("#selected-items").selectpicker("refresh");
            });
            $("#data-changes-container .condition-category-changes").find(".bootstrap-select li").each(function () {
                if ($(this).hasClass("disabled selected active")) {
                    $(this).removeClass("selected active");
                }
                if ($(this).attr("data-original-index") == item.ConditionCategory) {
                    $(this).addClass("selected active");
                    var value = $(this).find(".text").text();
                    $(this).parents(".bootstrap-select").find(".filter-option").html(value);
                }
            });
            $("#data-changes-container .condition-category-changes").find("select option").attr("selected", false);
            $("#data-changes-container .condition-category-changes").find("select option").each(function () {
                if ($(this).val() == "") {
                    $(this).removeAttr("selected");
                }
                if ($(this).val() == item.ConditionCategory) {
                    $(this).attr("selected", "selected");
                }
            });
            $("#data-changes-container .condition-category-changes select").selectpicker("refresh");
            renderDataCondition(itemConditionCategory, itemConditionArray, itemWidgetName.trim());
            addTitleForWidgets();
        }
        else {
            getWidgets();
        }
    }
    else {
        getWidgets();
    }
});