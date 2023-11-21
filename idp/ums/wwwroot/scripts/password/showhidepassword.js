$(function () {
    $(document).on("click", ".show-hide-password", function () {
        if ($(this).siblings("input").is(":password")) {
            $(this).siblings("input").attr('type', 'text').val();
            $(this).removeClass('su-show').addClass('su-hide').attr("data-original-title", window.Server.App.LocalizationContent.ClicktoHide);
            $(this).tooltip('show');
        }
        else {
            $(this).siblings("input").attr('type', 'password');
            $(this).removeClass('su-hide').addClass('su-show').attr("data-original-title", window.Server.App.LocalizationContent.ClicktoView);
            $(this).tooltip('show');
        }
    });

    //For the purpose of Responsive layout
    $(document).on("touchstart", ".show-hide-password", function () {
        if ($(this).siblings("input").is(":password")) {
            $(this).siblings("input").attr("type", "text");
        }
        else {
            $(this).siblings("input").attr("type", "password");
        }
    });
    $(document).on("touchend", ".show-hide-password", function () {
        if ($(this).siblings("input").is(":password")) {
            $(this).siblings("input").attr('type', 'text');
        }
        else {
            $(this).siblings("input").attr('type', 'password');
        }
    });


    if (window.innerWidth < 1041) {

        $(document).on("click", ".show-hide-password", function () {
            if ($(this).siblings("input").is(":password")) {
                $(this).siblings("input").attr('type', 'text');
            }
            else {
                $(this).siblings("input").attr('type', 'password');
            }
        });
    }


    //Ej2 inputbox show/hide password
    $(document).on("click", ".show-hide-password-ej2", function () {
        if ($(this).siblings().find("input").is(":password")) {
            $(this).siblings().find("input").attr('type', 'text');
            $(this).removeClass('su-show').addClass('su-hide').attr("data-original-title", window.Server.App.LocalizationContent.ClicktoHide);
            $(this).tooltip('show');
        }
        else {
            $(this).siblings().find("input").attr('type', 'password');
            $(this).removeClass('su-hide').addClass('su-show').attr("data-original-title", window.Server.App.LocalizationContent.ClicktoView);
            $(this).tooltip('show');
        }
    });

    $(document).on("touch", ".show-hide-password-ej2", function () {
        if ($(this).siblings().find("input").is(":password")) {
            $(this).siblings().find("input").attr('type', 'text');
            $(this).removeClass('su-show');
            $(this).addClass('su-hide');

        }
        else {
            $(this).siblings().find("input").attr('type', 'password');
            $(this).removeClass('su-hide');
            $(this).addClass('su-show');

        }
    });
});