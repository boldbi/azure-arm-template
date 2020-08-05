$(function () {
    if (($(parent.window).width()) > 1400) {
        $("#item-update").addClass("updation");
    }

    if (($(parent.window).width()) < 1400) {
        $("#item-update").removeClass("updation");
    }

    parent.$("#datasource-edit-popup_wrapper").ejWaitingPopup("hide");

	$("#popup-container textarea").keypress(function (e) {
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

    $(".edit-data-source-form").validate({
	    errorElement: 'div',
	    onkeyup: function(element, event) {
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
            "name": {
                isRequired: true,
                isValidName: true
	        }
	    },
	    messages: {
            "name": {
	            isRequired: window.Server.App.LocalizationContent.DatasourceValidator
	        }
	    },
	    highlight: function (element) {
	        $(element).closest('td').addClass("has-error");
	    },
	    unhighlight: function (element) {
	        $(element).closest('td').removeClass('has-error');
	        $(element).closest('td').find("span.validation-message").html("");
	    },
	    errorPlacement: function (error, element) {
	        $(element).closest('td').find("span:last").html(error.html());
	    }
    });

    $(document).on("keyup", ".text-field", function (e) {
        if ($(this).attr("id") === "file-name-content") {
            if (window.editData.Name.toLowerCase() !== $(this).val().toLowerCase()) {
                window.editData.IsNameChanged = true;
            }
            else {
                window.editData.IsNameChanged = false;
            }
        }
        if ($(this).attr("id") === "file-description") {
            if (window.editData.Description !== $(this).val()) {
                window.editData.IsDescriptionChanged = true;
            }
            else {
                window.editData.IsDescriptionChanged = false;
            }
        }
        onChangeValidation();
    });

    $(document).on("change", "#browse-file", function () {
        window.editData.IsSourceChanged = true;
        var value = $(this).val() == "" ? window.Server.App.LocalizationContent.BrowsePath : $(this).val();
        var fileNameWithExtension = value.substring(value.lastIndexOf('\\') + 1);
        $("#file-name").val(fileNameWithExtension);
        $("#file-name").trigger("focus");
        $("#comment").attr("readonly", false);
        valideFileType();
        onChangeValidation();
    });

    $(document).on("click", "#file-name", function () {
        $("#browse-file").trigger('click');
        $("#browse-file").focus();
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            if (e.target.id != "browse-file")
                closeAddItemPopup();
            else {
                window.$("#comment").focus();
            }
        }
    });

    $('#file-name-content').bind("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            if ($("#cancel-add-file").is(":focus")) {
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
        FileName:itemDetail.FileName,
        CategoryId: itemDetail.CategoryId
    }
    window.editData.IsNameChanged = false;
    window.editData.IsDescriptionChanged = false;
    window.editData.IsSourceChanged = false;
    window.isEdited = false;
    $("#file-name-content").val(window.editData.Name);
    $("#file-description").val(window.editData.Description);
    $("#file-name").val(window.editData.FileName);
    $("#comment").attr("readonly", true);
}

function addfileValidate(e) {
    var canProceed = false;
    if (window.editData.IsDescriptionChanged || window.editData.IsNameChanged || window.editData.IsSourceChanged) {
        canProceed = true;
    }
    parent.$("#datasource-edit-popup_wrapper").ejWaitingPopup("show");
    valideFileType();
    if (!$(".edit-data-source-form").valid() || !valideFileType()) {
        parent.$("#datasource-edit-popup_wrapper").ejWaitingPopup("hide");
        return false;
    }
    $("#IsNameChanged").val(window.editData.IsNameChanged);
    $("#IsDescriptionChanged").val(window.editData.IsDescriptionChanged);
    $("#IsSourceChanged").val(window.editData.IsSourceChanged);
    $("#ItemId").val(location.search.split("=").pop());
    if (window.editData.IsNameChanged) {
        $.ajax({
            type: "POST",
            url: isdatasourceexistUrl,
            data: { filename: $("#file-name-content").val() },
            async: false,
            success: function (data) {
                if (data.Data) {
                    $("#validate-name").parent('span').addClass("has-error");
                    $("#validate-name").text(window.Server.App.LocalizationContent.IsDataSourceExist);
                    $("#validate-file").closest('td').removeClass("has-error");
                    parent.$("#datasource-edit-popup_wrapper").ejWaitingPopup("hide");
                    canProceed = false;
                } else {
                    $("#validate-name").parent('span').removeClass("has-error");
                    $("#validate-name").text("");
                    $("#validate-file").closest('td').removeClass("has-error");
                    $("#validate-file").text("");
                    canProceed = true;
                }
            }
        });
    }
    if (canProceed && valideFileType()) {
        $('form').submit();
    }
    else {
        parent.$("#datasource-edit-popup_wrapper").ejWaitingPopup("hide");
        return false;
    }
}

function onChangeValidation() {
    if (window.editData.IsNameChanged || window.editData.IsDescriptionChanged || window.editData.IsSourceChanged) {
        $("#publish-file").attr("disabled", false);
    }
    else {
        $("#publish-file").attr("disabled", true);
    }
}

function valideFileType() {
    if ($("#file-name").val().split(".").pop().toLowerCase() !== "syds" && $("#file-name").val().indexOf(".") > -1 && $("#file-name").val() != '') {
        $(".file-upload").addClass("error-file-upload no-left-border");
        $("#file-name").addClass('error-file-upload');
        $("#validate-file").html(window.Server.App.LocalizationContent.ISValidSYDS);
        return false;
    }
    else {
        $(".file-upload").removeClass("error-file-upload no-left-border");
        $("#file-name").removeClass('error-file-upload');
        $("#validate-file").html("");
        return true;
    }
}

function OpenfileDialog() {
    $("#browse-file").trigger('click');
}

function closeAddItemPopup() {
    parent.$("#datasource-edit-popup").ejDialog("close");
	parent.$("#datasource-popup").find("iframe").contents().find("html").html("");
}