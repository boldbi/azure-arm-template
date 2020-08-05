$(function () {
    parent.$("#widget_edit_popup_wrapper").ejWaitingPopup("hide");

    $("#PopupContainer textarea").keypress(function (e) {
        if (e.ctrlKey && e.keyCode == 13) {
            addfileValidate();
        }
    });

    $.validator.addMethod("isRequired", function (value, element) {
        return !parent.isEmptyOrWhitespace(value);
    }, window.Server.App.LocalizationContent.ItemNameValidator);

    $.validator.addMethod("isValidName", function (value, element) {
        return parent.IsValidName("name", value);
    }, window.Server.App.LocalizationContent.AvoidSpecialCharactors);

    $(".editWidgetForm").validate({
        errorElement: "div",
        onkeyup: function (element, event) {
            if (event.keyCode != 9) {
                $(element).valid();
            }
            if (event.keyCode == 8 || event.keyCode == 46 || !$(element).valid()) {
                $("#validate-name").parent("span").removeClass("has-error");
                $("#validate-name").text("");
            } else true;
        },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            "name": {
                isRequired: true,
                isValidName: true
            }
        },
        messages: {
            "name": {
                isRequired: window.Server.App.LocalizationContent.WidgetValidator
            }
        },
        highlight: function (element) {
            $(element).closest("td").addClass("has-error");
        },
        unhighlight: function (element) {
            $(element).closest("td").removeClass("has-error");
            $(element).closest("td").find("div.validation-message").html("");
        },
        errorPlacement: function (error, element) {
            $(element).closest("td").find("div.validation-message").html(error.html());
        }
    });

    $(document).on("keyup", ".text-field", function (e) {
        if ($(this).attr("id") === "file_name") {
            if (window.editData.Name.toLowerCase() !== $(this).val().toLowerCase()) {
                window.editData.IsNameChanged = true;
            }
            else {
                window.editData.IsNameChanged = false;
            }
        }
        if ($(this).attr("id") === "file_description") {
            if (window.editData.Description !== $(this).val()) {
                window.editData.IsDescriptionChanged = true;
            }
            else {
                window.editData.IsDescriptionChanged = false;
            }
        }
        onChangeValidation();
    });

    $(document).on("change", "#browse_file", function () {
        window.editData.IsSourceChanged = true;
        var value = $(this).val() == "" ? window.Server.App.LocalizationContent.BrowsePath : $(this).val();
        var fileNameWithExtension = value.substring(value.lastIndexOf("\\") + 1);
        $("#filename").val(fileNameWithExtension);
        $("#filename").trigger("focus");
        $("#comment").attr("readonly", false);
        valideFileType();
        onChangeValidation();
    });

    $(document).on("click", "#filename", function () {
        $("#browse_file").trigger("click");
        $("#browse_file").focus();
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            if (e.target.id != "browse_file")
                closeAddItemPopup();
            else {
                window.$("#comment").focus();
            }
        }
    });

    $("#file_name").bind("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            if ($("#cancelAddFile").is(":focus")) {
                closeAddItemPopup();
            } else {
                addfileValidate();
            }
            return false;
        }
    });
});

function createEditFilePopup(itemDetail) {
    window.editData = {
        ItemId: itemDetail.Id,
        Name: itemDetail.Name,
        Description: itemDetail.Description,
        FileName: itemDetail.Name + itemDetail.Extension,
        CategoryId: itemDetail.CategoryId
    }
    window.editData.IsNameChanged = false;
    window.editData.IsDescriptionChanged = false;
    window.editData.IsSourceChanged = false;
    window.isEdited = false;
    $("#file_name").val(window.editData.Name);
    $("#file_description").val(window.editData.Description);
    $("#filename").val(window.editData.FileName);
    $("#comment").attr("readonly", true);
}

function addfileValidate(e) {
    var canProceed = false;
    if (window.editData.IsDescriptionChanged || window.editData.IsNameChanged || window.editData.IsSourceChanged) {
        canProceed = true;
    }
    parent.$("#widget_edit_popup_wrapper").ejWaitingPopup("show");
    valideFileType();
    if (!$(".editWidgetForm").valid() || !valideFileType()) {
        parent.$("#widget_edit_popup_wrapper").ejWaitingPopup("hide");
        return false;
    }
    $("#IsNameChanged").val(window.editData.IsNameChanged);
    $("#IsDescriptionChanged").val(window.editData.IsDescriptionChanged);
    $("#IsSourceChanged").val(window.editData.IsSourceChanged);
    $("#ItemId").val(location.search.split("=").pop());
    if (window.editData.IsNameChanged) {
        $.ajax({
            type: "POST",
            url: iswidgetexistUrl,
            data: { filename: $("#file_name").val() },
            async: false,
            success: function (data) {
                if (data.Data) {
                    $("#validate-name").parent("span").addClass("has-error");
                    $("#validate-name").text(window.Server.App.LocalizationContent.IsWidgetExist);
                    $("#validate-file").closest("td").removeClass("has-error");
                    parent.$("#widget_edit_popup_wrapper").ejWaitingPopup("hide");
                    canProceed = false;
                } else {
                    $("#validate-name").parent("span").removeClass("has-error");
                    $("#validate-name").text("");
                    $("#validate-file").closest("td").removeClass("has-error");
                    $("#validate-file").text("");
                    canProceed = true;
                }
            }
        });
    }
    if (canProceed && valideFileType()) {
        $("form").submit();
    }
    else {
        parent.$("#widget_edit_popup_wrapper").ejWaitingPopup("hide");
        return false;
    }
}

function onChangeValidation() {
    if (window.editData.IsNameChanged || window.editData.IsDescriptionChanged || window.editData.IsSourceChanged) {
        $("#publish_file").attr("disabled", false);
    }
    else {
        $("#publish_file").attr("disabled", true);
    }
}

function valideFileType() {
    if ($("#filename").val().split(".").pop().toLowerCase() !== "sydw" && $("#filename").val().indexOf(".") > -1 && $("#filename").val() != "") {
        $(".fileUpload").addClass("error-file-upload");
        $(".fileUpload").addClass("no-left-border");
        $("#filename").addClass("error-file-upload");
        $("#validate-file").html(window.Server.App.LocalizationContent.IsValidSYDW);
        return false;
    }
    else {
        $(".fileUpload").removeClass("error-file-upload");
        $(".fileUpload").removeClass("no-left-border");
        $("#filename").removeClass("error-file-upload");
        $("#validate-file").html("");
        return true;
    }
}

function OpenfileDialog() {
    $("#browse_file").trigger("click");
}

function closeAddItemPopup() {
    parent.$("#widget_edit_popup").ejDialog("close");
    parent.$("#widget_popup").find("iframe").contents().find("html").html("");
}