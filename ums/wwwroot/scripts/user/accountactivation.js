$(document).ready(function () {
    $("#Save_Activate").on('click', function () {
        if ($("#new_password").val() == '') {
            $("#password_validate").html(window.TM.App.LocalizationContent.PasswordValidator);
            return;
        }
        if ($("#new_password").val() != $("#Confirm_password").val()) {
            $("#re_password_validate").html(window.TM.App.LocalizationContent.PasswordsMismatch);
            return;
        }
        $.ajax({
            type: "POST",
            url: "../User/SavePasswordActivate",
            data: { UserName: username, Password: $("#new_password").val() },
            success: function (data, result) {
                $('#Account_Activation_Fields_Container').remove();
                $("#Account_Activated_Message_Container").css("display", "block");
            }
        });
    });
    if (window.innerWidth < 1041) {
        $(".showHidePassword").on("click", function () {
            if ($(this).siblings("input").is(":password")) {
                $(this).siblings("input").attr('type', 'text');
            }
            else {
                $(this).siblings("input").attr('type', 'password');
            }
        });
    }
    $(".showHidePassword").on("mousedown", function () {
        if ($(this).siblings("input").is(":password")) {
            $(this).siblings("input").attr('type', 'text');
        }
        else {
            $(this).siblings("input").attr('type', 'password');
        }
    });

    $(".showHidePassword").on("mouseup", function () {
        if ($(this).siblings("input").is(":password")) {
            $(this).siblings("input").attr('type', 'text');
        }
        else {
            $(this).siblings("input").attr('type', 'password');
        }
    });
    $(".password-form-element").blur(function () {
        $(".password-validate-holder").html("");
    });

    $(".account-activation-bg").keypress(function (event) {
        if (event.keyCode == 13) {
            $("#Save_Activate").click();
        }
    });
});