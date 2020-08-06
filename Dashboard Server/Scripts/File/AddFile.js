$(function () {
    parent.$("#file-popup_wrapper").ejWaitingPopup("hide");

    $('#file_name').bind("keypress", function (e) {
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

    $(document).keyup(function (e) {
        if (e.keyCode == 27) {
            if (e.target.id != "browse_file") {
                $('.PopupClose').click();
                window.parent.$("#createButton").focus();
            } else {
                window.$('#filename').focus();
            }
        }
    });

    $.validator.addMethod("isRequired", function (value, element) {
        return !parent.isEmptyOrWhitespace(value);
    }, window.Server.App.LocalizationContent.ItemNameValidator);

    $.validator.addMethod("isValidName", function (value, element) {
        return parent.IsValidName("name", value);
    }, window.Server.App.LocalizationContent.AvoidSpecialCharactors);

    $("#addItemForm").validate({
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
            "fileName": {
                isRequired: true,
                isValidName: true
            }
        },
        messages: {
            "fileName": {
                isRequired: window.Server.App.LocalizationContent.FileValidator
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

    $(document).on("focusout", "#filename", function (event) {
        $("#addItemForm").valid();
    });

    $(document).on("change", "#browse_file", function () {
        var value = $(this).val() == "" ?  window.Server.App.LocalizationContent.BrowsePath : $(this).val();
        $("#filename").val(value.substring(value.lastIndexOf('\\') + 1));
        if ($(this).val() != '' && IsValidUploadFile()) {
            $("#validate-file").html("");
            $(".fileUpload").removeClass("error-file-upload");
            $("#filename").removeClass('error-file-upload');
            $("#filename").closest('td').find("span.validation-message").html("");
            $('.imagepath').removeClass('has-error');
            $("#publish_file").trigger("focus");
            $('#browse_file').attr('title', $(this).val());
        }
        else if ($(this).val() != '' && !IsValidUploadFile()) {
            $(".fileUpload").addClass("error-file-upload");
            $("#filename").addClass('error-file-upload');
            $("#validate-file").text( window.Server.App.LocalizationContent.IsHarmfulFile);
            $("#browse_file").val("");
            $('#browse_file').attr('title', $(this).val());
            isValid = false;
        }
        else {
            $(".fileUpload").addClass("error-file-upload");
            $("#filename").addClass('error-file-upload');
            $("#validate-file").text( window.Server.App.LocalizationContent.IsValidFile);
            $("#filename").val("Browse file path");
            $("#browse_file").val("");
            $('#browse_file').attr('title', $(this).val());
            isValid = false;
        }
    });

    $(document).on("click", "#filename", function () {
        $("#browse_file").trigger("click");
        $("#browse_file").focus();
    });
});

function addfileValidate() {
    var canProceed = false;
    var fileName = $("#file_name").val().trim();
    ValidateFile();
    if ($("#addItemForm").valid() && ValidateFile() && IsValidUploadFile()) {
        parent.$("#file-popup_wrapper").ejWaitingPopup("show");
        $.ajax({
            type: "POST",
            url: isFileExistUrl,
            data: { filename: fileName },
            async: false,
            success: function (data) {
                if (data.Data) {
                    $("#validate-name").parent('span').addClass("has-error");
                    $("#validate-name").text( window.Server.App.LocalizationContent.IsFileExist);
                    $("#validate-name").css("display", "block");
                    $("#validate-file").closest('td').removeClass("has-error");
                    $("#validate-file").css("display", "none");
                    canProceed = false;
                }
                else {
                    $("#validate-name").css("display", "none");
                    $("#validate-file").css("display", "none");
                    canProceed = true;
                }
            }
        });
    }
    if (canProceed) {
        $('form').submit();
    }
    else {
        parent.$("#file-popup_wrapper").ejWaitingPopup("hide");
    }
}

function closeAddItemPopup() {
    parent.$("#file-popup").ejDialog("close");
}

function ValidateFile() {
    var isValidFile = true;
    if ($('#browse_file').val() == '') {
        $(".fileUpload").addClass("error-file-upload");
        $(".fileUpload").addClass("no-left-border");
        $("#filename").addClass('error-file-upload');
        $("#validate-file").html("Please upload a file");
        $("#filename").val("Browse file path");
        isValidFile = false;
    }
    else {
        $(".fileUpload").removeClass("error-file-upload");
        $(".fileUpload").removeClass("no-left-border");
        $("#filename").removeClass('error-file-upload');
        $("#validate-file").html("");
        $("#filename").closest('td').find("span.validation-message").html("");
        $('.imagepath').removeClass('has-error');
        isValidFile = true;
    }
    return isValidFile;
}

function IsValidUploadFile() {
    var regex = /(\.|\/)(ace|ade|adp|ani|app|asp|aspx|asx|bas|bat|class|cer|chm|cmd|cnt|com|cpl|crt|csh|der|dll|docm|exe|fxp|gadget|hlp|hpj|hta|htc|isu|inf|ins|inx|isp|its|jar|job|js|jse|ksh|lnk|mad|maf|mag|mam|maq|mar|mas|mat|mau|mav|maw|mda|mdb|mde|mdt|mdw|mdz|mht|mhtml|msc|msh|msh1|msh1xml|msh2|msh2xml|mshxml|msi|msp|mst|paf|ops|osd|pcd|pif|plg|prf|prg|ps1|ps1xml|ps2|ps2xml|psc1|psc2|pst|reg|rgs|scf|scr|sct|shb|shs|tmp|u3p|url|vb|vbe|vbp|vbs|vbscript|vsmacros|vss|vst|vsw|ws|wsc|wsf|wsh|xap|xbap|xml)$/i;
    if (!regex.test($('#browse_file').val())) {
        return true;
    }
    else {
        return false;
    }
}