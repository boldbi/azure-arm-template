$(function () {
    $(document).on("keyup", ".text-field", function (e) {
        if ($(this).attr("id") === "category_name") {
            if (window.editData.Name !== $(this).val().trim()) {
                window.editData.IsNameChanged = true;
            } else {
                window.editData.IsNameChanged = false;
            }
        }
        if ($(this).attr("id") === "category_description") {
            if (window.editData.Description !== $(this).val().trim()) {
                window.editData.IsDescriptionChanged = true;
            } else {
                window.editData.IsDescriptionChanged = false;
            }
        }

        if ((window.editData.IsNameChanged || window.editData.IsDescriptionChanged)) {
            window.isEdited = true;
            $("#saveEditCategory").removeAttr("disabled");
        } else {
            window.isEdited = false;
            $("#saveEditCategory").attr("disabled", "disabled");
        }
    });

    $.validator.addMethod("isValidName", function (value, element) {
        return parent.IsValidName("name", value);
    }, window.Server.App.LocalizationContent.AvoidSpecialCharactors);

    $.validator.addMethod("isRequired", function (value, element) {
        return !parent.isEmptyOrWhitespace(value);
    }, window.Server.App.LocalizationContent.ItemNameValidator);

    $("#update_category_content").validate({
        errorElement: 'div',
        onkeyup: function(element, event) {
            if (event.keyCode != 9) {
                $(element).valid();
            }
            if (event.keyCode == 8 || event.keyCode == 46 || !$(element).valid()) {
                $("#category_name").next("#validate-name").parent('span').removeClass('has-error');
                $("#category_name").next("#validate-name").html("");
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
            $(element).closest('td').removeClass('has-error');
            $(element).closest('td').find("div").html("");
        },
        errorPlacement: function (error, element) {
            $(element).closest('td').find("div").html(error.html());
        }
    });

    $('#category_name').bind("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            updateCategory();
            return false;
        }
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            $('.PopupClose').click();
        }
    });
});

function updateCategory() {
    $("#EditCategoryPopup #validate-name").html("");
    if ($('#saveEditCategory').is('[disabled=disabled]')) {
        return false;
    }
    window.parent.$("#EditCategoryPopup_wrapper").ejWaitingPopup("show");
    if (!$("#EditCategoryPopup #update_category_content").valid()) {
        window.parent.$("#EditCategoryPopup_wrapper").ejWaitingPopup("hide");
        return;
    }
    else {
        var postData = getUpdatedCategoryFields();
        $.ajax({
            type: "POST",
            url: editcategoryUrl,
            data: postData,
            success: function (data) {
                if (data.NameExists) {
                    $("#EditCategoryPopup #validate-name").parent('span').addClass('has-error');
                    $("#EditCategoryPopup #validate-name").html(window.Server.App.LocalizationContent.IsCategoryExist);
                }
                else {
                    if (data.Status) {
                        var itemListPanelWaitingpopupWrapperTemplateId = parent.createLoader("item-list-panel");
					    parent.$("#item-list-panel").ejWaitingPopup({ template: parent.$("#" + itemListPanelWaitingpopupWrapperTemplateId) });
                        $("#EditCategoryPopup").ejDialog("close");
                        $("#EditCategoryPopup #validate-name").parent('span').removeClass('has-error');
                        $("#EditCategoryPopup #validate-name").html("");
                        $("#saveEditCategory").attr("disabled", "disabled");
                        SuccessAlert(window.Server.App.LocalizationContent.UpdateCategory, window.Server.App.LocalizationContent.UpdateCategorySuccess, 5000);
                        parent.$("#item-list-panel").ejWaitingPopup("show");
                        parent.ResetItemList(1);
                    }
                    else {
                        $("#EditCategoryPopup #validate-name").parent('span').addClass('has-error');
                        $("#EditCategoryPopup #validate-name").html(window.Server.App.LocalizationContent.UpdateCategoryError);
                    }
                }
                $("#EditCategoryPopup_wrapper").ejWaitingPopup("hide");
            }
        });
    }
}

function getUpdatedCategoryFields() {
    var categoryname = $("#EditCategoryPopup #category_name").val();
    var categoryDescription = $("#EditCategoryPopup #category_description").val();
    var itemId = window.editData.ItemId;
    var postData = {
        IsNameChanged: window.editData.IsNameChanged,
        IsDescriptionChanged: window.editData.IsDescriptionChanged,
        IsDataSourceDefinitionChanged: window.editData.IsDataSourceDefinitionChanged,
        Name: categoryname,
        Description: categoryDescription,
        ItemId: itemId
    }
    return postData;
}

function closeEditCategoryPopup() {
    $("#saveEditCategory").attr("disabled", "disabled");
    $("#EditCategoryPopup #validate-name").parent('span').parent('td').removeClass("has-error");
    $("#EditCategoryPopup #validate-name").parent('span').removeClass("has-error");
    $("#EditCategoryPopup #validate-name").text("");
    $("#EditCategoryPopup #plugin_validation").html("");
    $("#EditCategoryPopup").ejDialog("close");
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