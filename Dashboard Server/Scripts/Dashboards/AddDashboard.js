var isValid = true;
$(function () {
    $("#add-new-category [data-toggle='tooltip']").tooltip();
    parent.$("#report_popup_wrapper").ejWaitingPopup("hide");

    $.validator.addMethod("isRequired", function (value, element) {
        return !parent.isEmptyOrWhitespace(value);
    }, window.Server.App.LocalizationContent.ItemNameValidator);
    $.validator.addMethod("isValidName", function (value, element) {
        return parent.IsValidName("name", value);
    }, window.Server.App.LocalizationContent.AvoidSpecialCharactors);

    $("#add-dashboard-form").validate({
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
            "fileName": {
                isRequired: true,
                isValidName:true
            }
        },
        messages: {
            "fileName": {
                isRequired: window.Server.App.LocalizationContent.DashboardValidator
            }
        },
        highlight: function (element) {
            $(element).closest('td').addClass("has-error");
        },
        unhighlight: function (element) {
            if ($(element).attr('id') == 'file_name') {
                $(element).closest('td').removeClass('has-error');
                $(element).closest('td').find("div").html("");
            }
        },
        errorPlacement: function (error, element) {
            $(element).closest('td').find("div").html(error.html());
        }
    });

    $('#file_name').bind("keypress", function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
            addDashboardValidate();
            return false;
        }
    });

    $(document).on("click", "#filename", function () {
        $("#browse_file").trigger("click");
        $("#browse_file").focus();
    });

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            if (e.target.id != "browse_file") {
                $('.PopupClose').click();
                window.parent.$("#createButton").focus();
            } else {
                window.$("#publish_file").focus();
            }
        }
    });

    $(document).on("change", "#browse_file", function () {
        var fileExtensionObj = $(this).val().substring($(this).val().lastIndexOf('.') + 1).toLowerCase();
        if (fileExtensionObj == "sydx" || fileExtensionObj == "sydj") {
            var value = $(this).val() == "" ? window.Server.App.LocalizationContent.BrowsePath : $(this).val();
            $("#filename").val(value.substring(value.lastIndexOf('\\') + 1));
            $(".fileUpload").removeClass("error-file-upload");
            $(".fileUpload").removeClass('no-left-border');
            $("#filename").removeClass('error-file-upload');
            $("#filename").closest('td').find("span.validation-message").html("");
        }
        else {
            $(".fileUpload").addClass('error-file-upload');
            $(".fileUpload").addClass('no-left-border');
            $("#filename").addClass('error-file-upload');
            $("#validate-file").html(window.Server.App.LocalizationContent.IsValidSYDX);
            $("#filename").val(window.Server.App.LocalizationContent.BrowsePath);
            $("#browse_file").val("");
            isValid = false;
        }
    });

    $(document).on('keyup', '.bootstrap-select.open input', function () {
        if (canCreateCategory.toLowerCase() === "true") {
            var availableCategory = [];
            $('.bootstrap-select.open ul .add-new-category').remove();
            var enteredValue = $(this).val();
            var compareValue = enteredValue.toLowerCase();
            if (enteredValue == "") {
                $(".divider").show();
            }
            else {
                parent.window.CategoryName = enteredValue;
                $(".divider").hide();
            }
            $(".bootstrap-select.open").find("ul li").each(function () {

                if ($(this).children("a").children("span.text").text() != "") {
                    availableCategory.push($(this).children("a").children("span.text").text().toLowerCase());
                }

            });
            var isValueEqual = $.inArray(compareValue, availableCategory);
            if (compareValue != "") {
                if (isValueEqual == -1) {
                    $('.bootstrap-select.open ul').prepend('<li class="add-new-category" data-original-index="-1"><a class="" tabindex="-1"><span class="text">' + enteredValue + " " + window.Server.App.LocalizationContent.NewCategory + '</span><span class="glyphicon glyphicon-ok check-mark"></span></li>');
                    if ($(".bootstrap-select.open").find("li:not('.hide')").length > 2) {
                        $('.bootstrap-select.open ul .divider').show();
                        if ($('.bootstrap-select.open ul li').hasClass("no-results")) {
                            $('.bootstrap-select.open ul li.no-results').hide();
                            $('.bootstrap-select.open ul .divider').hide();
                        }
                    }
                    else {
                        $('.bootstrap-select.open ul .divider').show();
                    }
                }
                else {
                    $('.bootstrap-select.open ul .add-new-category').remove();
                    $('.bootstrap-select.open ul .divider').hide();
                }
            }
        }        
    });
    
    $(document).on('click', '.bootstrap-select ul li.add-new-category, #add-new-category', function (e) {

        if (e.target.className !== null && e.target.className.toLowerCase() === 'btn btn-default')
        {
            parent.window.CategoryName = "";
        }

        $(this).parent().prev().addClass("input-value");
        parent.$("#report_popup").contents().find('.bootstrap-select ul').find(".divider").show();
        parent.window.IsAddDashboard = true;
        parent.$("#AddCategoryPopup").ejDialog("open");
        $("#invalid-category").hide();
    });

    $(document).on('click', '.dropdown-toggle', function (e) {
        $('.bootstrap-select.open ul .add-new-category').remove();
        $('.bootstrap-select.open ul .divider').hide();
    });

    $(document).on('change', '.selectpicker', function (e) {
        $("#invalid-category").hide();
        if (e.target.id == "selected_category")
        {
            $("#CategoryMessage").removeClass("show").addClass("hide");
        }        
    });
});

function addDashboardValidate() {
    isValid = true;
    var canProceed = false;
    var fileName = $("#file_name").val().trim();
    if ($("#selected_category").val() == null || $("#selected_category").val() == "") {
        if ($("#emtpyCategoryList").length == 0) {
            $("#CategoryMessage").removeClass("hide").addClass("show");
        }
        isValid = false;
    } else {
        $("#CategoryMessage").removeClass("show").addClass("hide");
    }
    ValidateFile();
    if (!$("#add-dashboard-form").valid() || !ValidateFile()) {
        isValid = false;
    }
    if (isValid) {
        parent.$("#report_popup_wrapper").ejWaitingPopup("show");
        var categoryId = $("#selected_category option:selected").val();
        $.ajax({
            type: "POST",
            url: isitemexistinsamecategoryUrl,
            data: { categoryId: categoryId, itemName: fileName },
            async: false,
            success: function (data) {
                if (data.Data) {
                    $("#validate-name").parent('span').addClass("has-error");
                    $("#validate-name").text(window.Server.App.LocalizationContent.IsDashboardExist);
                    $("#validate-name").css("display", "block");
                    $("#validate-file").css("display", "none");
                    parent.$("#report_popup_wrapper").ejWaitingPopup("hide");
                    canProceed = false;
                }
                else {
                    $("#validate-name").parent('span').removeClass("has-error");
                    $("#validate-name").text("");
                    $("#validate-file").text("");
                    canProceed = true;
                }
            }
        });
    }
    if (canProceed) {
        var categoryId = $("#selected_category option:selected").val();
        $('form').submit();
    }
    else {
        parent.$("#report_popup_wrapper").ejWaitingPopup("hide");
    }
}

function closeAddDashboardPopup() {
    parent.$("#report_popup").ejDialog("close");
}

function ValidateFile() {
    var isValidFile = true;
    var filename = $('#browse_file').val();
    if (filename == '') {
        $(".fileUpload").addClass('error-file-upload');
        $(".fileUpload").addClass('no-left-border');
        $("#filename").addClass('error-file-upload');
        $("#validate-file").html(window.Server.App.LocalizationContent.DashboardFileValidator);
        $("#filename").val(window.Server.App.LocalizationContent.BrowsePath);
        $("#browse_file").val("");
        isValidFile = false;
    }
    else {
        $(".fileUpload").removeClass("error-file-upload");
        $(".fileUpload").removeClass('no-left-border');
        $("#filename").removeClass('error-file-upload');
        $("#filename").closest('td').find("span.validation-message").html("");
        isValidFile = true;
    }
    return isValidFile;
}

function closeAddDashboardPopup() {
    parent.window.IsAddDashboard = false;
    parent.window.CategoryName = "";
    parent.$("#report_popup").ejDialog("close");
    parent.$("#report_iframe").contents().find("html").text("");
}

function refreshSelectPicker() {
    $("#selected_category").selectpicker("refresh");
    window.parent.ShowWaitingProgress("#report_popup_wrapper", "hide");
}