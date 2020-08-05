$(function () {
    $("#comment").attr("readonly", true);

    $(document).on("keyup", ".text-field", function (e) {
        if ($(this).attr("id") === "file_name") {
            if (window.editData.Name !== $(this).val()) {
                $("#name_change_validation").val(true);
            }
            else {
                $("#name_change_validation").val(false);
            }
        }
        if ($(this).attr("id") === "file-description") {
            if (window.editData.Description !== $(this).val()) {
                $("#description_change_validation").val(true);
            }
            else {
                $("#description_change_validation").val(false);
            }
        }
        onChangeValidation();
    });

    $(document).on('change', '#browse_file', function (e) {
        var value = $(this).val();
        $('#name').val(value.substring(value.lastIndexOf('\\') + 1));
        $("#source_change_validation").val(true);
        $("#comment").attr("readonly", false);
        $("#comment").trigger("focus");
        $('#browse_file').attr('title', $(this).val().trim());
        onChangeValidation();
    });
    window.parent.$('#edit-files-popup_wrapper').ejWaitingPopup("hide");

    $.validator.addMethod("isValidName", function (value, element) {
        return parent.IsValidName("name", value);
    },  window.Server.App.LocalizationContent.AvoidSpecialCharactors);

    $.validator.addMethod("isRequired", function (value, element) {
        return !parent.isEmptyOrWhitespace(value);
    },  window.Server.App.LocalizationContent.ItemNameValidator);

    $("#editItemForm").validate({
        errorElement: 'div',
        onkeyup: function (element, event) {
            if (event.keyCode != 9) {
                $(element).valid();
            }
            if (event.keyCode == 8 || event.keyCode == 46 || !$(element).valid()) {
                $("#validate-name").parent('span').removeClass('has-error');
                $("#validate-name").text("");
            } else true;
        },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            "Name": {
                isRequired: true,
                isValidName: true
            }
        },
        messages: {
            "Name": {
                isRequired:  window.Server.App.LocalizationContent.FileValidator
            }
        },
        highlight: function (element) {
            $(element).closest('td').addClass("has-error");
        },
        unhighlight: function (element) {
            $(element).closest('td').removeClass('has-error');
            $(element).closest('td').find("div.validation-message").html("");
        },
        errorPlacement: function (error, element) {
            $(element).closest('td').find("div.validation-message").html(error.html());
        }
    });

    $('#file_name').bind("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            if ($("#cancelEditFile").is(":focus")) {
                closeEditFilePopup();
            } else {
                validateNewFileForm();
            }
            return false;
        }
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            if (e.target.id != "browse_file") {
                $('.PopupClose').click();
                window.parent.focus();
            } else {
                $('#name').focus();
            }
        }
    });

    $(document).on("click", "#name", function () {
        $("#browse_file").trigger('click');
        $("#browse_file").focus();
    });
});

function validateNewFileForm() {
    if ($('#publish_file').attr("disabled") !== undefined) {
        return;
    }
    var isValid = $("#editItemForm").valid();
    if (isValid) {
        window.parent.$('#edit-files-popup_wrapper').ejWaitingPopup("show");
        $("form").submit();
    }
}

function closeEditFilePopup() {
    parent.$("#edit-files-popup").ejDialog("close");
}

function onChangeValidation() {
    if ($("#name_change_validation").val() == "true" || $("#description_change_validation").val() == "true" || $("#source_change_validation").val() == "true") {
        $("#publish_file").attr("disabled", false);
    }
    else {
        $("#publish_file").attr("disabled", true);
    }
}

