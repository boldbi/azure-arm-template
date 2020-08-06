$(function () {

    if (($(parent.window).width()) > 1400) {
        $("#item-update").addClass("updation");
    }

    if (($(parent.window).width()) < 1400) {
        $("#item-update").removeClass("updation");
    }

    var inputvalue = parent.$("#update-data-source-popup-iframe").contents().find(".input-value").children().val();
    if (inputvalue != undefined) {
        parent.$("#datasource-popup-iframe").contents().find("#file-name-content").val(inputvalue);
    }
    parent.$("#datasource-popup_wrapper").ejWaitingPopup("hide");
    $.validator.addMethod("isValidName", function (value, element) {
        return parent.IsValidName("name", value);
    }, window.Server.App.LocalizationContent.AvoidSpecialCharactors);

    $.validator.addMethod("isRequired", function (value, element) {
        return !parent.isEmptyOrWhitespace(value);
    }, window.Server.App.LocalizationContent.ItemNameValidator);

    $("#add-item-form").validate({
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
            "datasourcename": {
                isRequired: true,
                isValidName: true
            }
        },
        messages: {
            "datasourcename": {
                isRequired: window.Server.App.LocalizationContent.DatasourceValidator
            }
        },
        highlight: function (element) {
                $(element).closest('td').addClass("has-error");
        },
        unhighlight: function (element) {
            if ($(element).attr('id') == 'file-name-content') {
                $(element).closest('td').removeClass('has-error');
                $(element).closest('td').find("span:last").html("");
            }
        },
        errorPlacement: function (error, element) {
            $(element).closest('td').find("span:last").html(error.html());
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

    $(document).on("change", "#browse-file", function () {
        var value = $(this).val() == "" ? window.Server.App.LocalizationContent.BrowsePath : $(this).val();
        var fileNameWithExtension = value.substring(value.lastIndexOf('\\') + 1);
        $("#file-name").val(fileNameWithExtension);
        validFileType();
        $("#file-name").trigger("focus");
    });

    $(document).on("click", "#file-name", function () {
        $("#browse-file").trigger('click');
        $("#browse-file").focus();
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            if (e.target.id != "browse-file") {
                closeAddItemPopup();
                window.parent.$("#createButton").focus();
            } else {
                window.$("#publish-file").focus();
            }
        }
    });
});

function closeAddItemPopup() {
    parent.$("#datasource-popup").ejDialog("close");
    parent.$("#datasource-popup").find("iframe").contents().find("html").html("");
    parent.$("#update-datasource-popup-iframe").contents().find(".input-value").removeClass("input-value");
}

function addfileValidate(e) {
    var canProceed = false;
    parent.$("#datasource-popup_wrapper").ejWaitingPopup("show");
    validFileType();
    if (!$("#add-item-form").valid() || !validFileType()) {
        parent.$("#datasource-popup_wrapper").ejWaitingPopup("hide");
        return false;
    }
    else {
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
                    canProceed = false;
                    parent.$("#datasource-popup_wrapper").ejWaitingPopup("hide");
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
    if (canProceed) {
        $('form').submit();
    }
    else {
        parent.$("#datasource-popup_wrapper").ejWaitingPopup("hide");
        return false;
    }
}

function validFileType() {
    if ($("#browse-file").val() != '') {
        if ($("#file-name").val().split(".").pop().toLowerCase() !== "syds" && $("#file-name").val().indexOf(".") > -1 && $("#file-name").val() != '') {
            $(".file-upload").addClass("error-file-upload no-left-border");
            $("#file-name").addClass('error-file-upload').val(window.Server.App.LocalizationContent.BrowsePath);
            $("#validate-file").html(window.Server.App.LocalizationContent.ISValidSYDS);
            $("#browse-file").val("");
            return false;
        }
        else {
            $(".file-upload").removeClass("error-file-upload no-left-border");
            $("#file-name").removeClass('error-file-upload');
            $("#validate-file").html("");
            return true;
        }
    }
    else {
        $(".file-upload").addClass("error-file-upload no-left-border");
        $("#file-name").addClass('error-file-upload');
        $("#file-name").closest('td').find("span.validation-message").html(window.Server.App.LocalizationContent.DataSourceFileValidator);
        return false;
    }
}

function updateContents(itemId, name) {
    window.parent.ShowWaitingProgress("#update-data-source-popup_wrapper", "show");
    var selectContents = parent.$("#update-data-source-popup-iframe").contents().find("select");
    $(selectContents).each(function () {
        $(this).find("option:eq(1)").after("<option value = '" + itemId + "'>" + name + "</option>");
        $(this).find(".select-data-source").show();
    });
    parent.$("#update-data-source-popup-iframe").contents().find("select.update-datasource.current-select").val(itemId);
    parent.document.getElementById('update-data-source-popup-iframe').contentWindow.refreshSelectPicker();
}