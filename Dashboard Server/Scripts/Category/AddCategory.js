$(function () {

    if ((parent.window.IsAddDashboard !== undefined && parent.window.IsAddDashboard === true) || (parent.window.IsCopyOrMoveDashboard !== undefined && parent.window.IsCopyOrMoveDashboard === true)) {
        $("#add_category_name").val(parent.window.CategoryName);
    }

    parent.$("#AddCategoryPopup_wrapper").ejWaitingPopup("hide");

    $.validator.addMethod("isValidName", function (value, element) {
        return parent.IsValidName("name", value);
    }, window.Server.App.LocalizationContent.AvoidSpecialCharactors);

    $.validator.addMethod("isRequired", function (value, element) {
        return !parent.isEmptyOrWhitespace(value);
    }, window.Server.App.LocalizationContent.ItemNameValidator);

    $("#addCategoryForm").validate({
        errorElement: 'div',
        onkeyup: function (element, event) {
            if (event.keyCode != 9) {
                $(element).valid();
            }
            if (event.keyCode == 8 || event.keyCode == 46 || !$(element).valid()) {
                $("#add_category_name").next("#validate-name").parent('span').removeClass('has-error');
                $("#add_category_name").next("#validate-name").html("");
            } else true;
        },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            "categoryName": {
                isRequired: true,
                isValidName: true
            }
        },
        messages: {
            "categoryName": {
                isRequired: window.Server.App.LocalizationContent.Categoryvalidator
            }
        },
        highlight: function (element) {
            $(element).closest('td').addClass("has-error");
        },
        unhighlight: function (element) {
            if ($(element).attr('id') == 'add_category_name') {
                $(element).closest('td').removeClass('has-error');
                $(element).closest('td').find("div").html("");
            }
        },
        errorPlacement: function (error, element) {
            $(element).closest('td').find("div").html(error.html());
        }
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            $('.PopupClose').click();
            window.parent.$("#createButton").focus();
        }
    });

    $('#add_category_name').bind("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            addItemValidate();
            return false;
        }
    });
});

function addItemValidate() {
    if ($("#addCategoryForm").valid()) {
        $("#AddCategoryPopup_wrapper").ejWaitingPopup("show");

        var categoryName = $("#add_category_name").val().trim();
        var categoryDescription = $("#add-category_description").val().trim();

        parent.window.CategoryName = categoryName;
        $.ajax({
            type: "POST",
            url: addCategoryUrl,
            data: { CategoryName: categoryName, Description: categoryDescription },
            async: false,
            success: function (data) {
                if (data.IsSuccess) {
                    var partialItemWaitingPopupTemplateId = parent.createLoader("item-list-panel");
                    parent.$("#item-list-panel").ejWaitingPopup({ template: parent.$("#" + partialItemWaitingPopupTemplateId) });
                    if ((parent.window.IsAddDashboard !== undefined && parent.window.IsAddDashboard === true) || (parent.window.IsCopyOrMoveDashboard !== undefined && parent.window.IsCopyOrMoveDashboard === true)) {
                        parent.window.IsCategoryAdded = true;
                        if (isMultiTab) {
                            updateMultiTabCategory(parent.window.CategoryName, data.ItemId);
                        } else {
                            updateContents(parent.window.CategoryName, data.ItemId, parent.window.IsCopyOrMoveDashboard);
                        }
                    }
                    else {
                        SuccessAlert("Category " + window.Server.App.LocalizationContent.Added, categoryName + " " + window.Server.App.LocalizationContent.AddSuccessMessage, 5000);
                        if (typeof (parent.ResetItemList) === "function") {
                            parent.ResetItemList(1);
                        }
                    }
                    closeAddItemPopup();
                }
                else {
                    if (data.IsCategoryExist) {
                        $("#validate-name").parent('span').addClass("has-error");
                        $("#validate-name").html(window.Server.App.LocalizationContent.IsCategoryExist);
                    }
                }
            },
            complete: function () {
                $("#AddCategoryPopup_wrapper").ejWaitingPopup("hide");
            }
        });
    }
    else {
        return false;
    }
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
        if ($("#" + returnId).length == 0 && $("#" + element).length != 0) {
            var template = $("<div class='loader-blue loader-icon' id='" + returnId + "'><svg class='circular'><circle class='path' cx='27' cy='27' r='20' fill='none' stroke-width='4' stroke-miterlimit='10'></circle></svg></div>");
            $("body").append(template);
        }
    }

    return returnId;
}

function closeAddItemPopup() {
    $("#add_category_name").val('');
    $("#add-category_description").val('');
    $("#validate-name").parent('span').parent('td').removeClass("has-error");
    $("#validate-name").parent('span').removeClass("has-error");
    $("#validate-name").text("");
    $("#plugin_validation").html("");
    parent.$("#AddCategoryPopup").ejDialog("close");
    parent.window.CategoryName = "";
}

function updateContents(name, id, isCopyOrMoveDashboard) {
    if (isCopyOrMoveDashboard !== undefined && isCopyOrMoveDashboard === true) {
        window.parent.ShowWaitingProgress("#ItemAction_wrapper", "show");
        var selectContents = parent.$(".copy-move-category").find("#CategoryList");
        selectContents.prepend("<option selected value = '" + id + "'>" + name + "</option>")
        parent.refreshSelectPicker();
    }
    else {
        window.parent.ShowWaitingProgress("#report_popup_wrapper", "show");
        var selectContents = parent.$("#report_iframe").contents().find("#selected_category");
        selectContents.prepend("<option selected value = '" + id + "'>" + name + "</option>")
        parent.document.getElementById('report_iframe').contentWindow.refreshSelectPicker();
        parent.$("#report_iframe").contents().find("#CategoryMessage").removeClass("show").addClass("hide");
    }
}