$(document).on("ready", function () {
    $(".show-hide-password").on("click", function () {
        if ($(this).siblings("input").is(":password")) {
            $(this).siblings("input").attr('type', 'text').val();
            $(this).removeClass('su-show').addClass('su-hide').attr("data-original-title", window.TM.App.LocalizationContent.ClicktoHide);
            $(this).tooltip('show');
        }
        else {
            $(this).siblings("input").attr('type', 'password');
            $(this).removeClass('su-hide').addClass('su-show').attr("data-original-title", window.TM.App.LocalizationContent.ClicktoView);
            $(this).tooltip('show');
        }
    });

    //For the purpose of Responsive layout
    $(".show-hide-password").bind("touchstart", function () {
        if ($(this).siblings("input").is(":password")) {
            $(this).siblings("input").attr("type", "text");
        }
        else {
            $(this).siblings("input").attr("type", "password");
        }
    });
    $(".show-hide-password").on("touchend", function () {
        if ($(this).siblings("input").is(":password")) {
            $(this).siblings("input").attr('type', 'text');
        }
        else {
            $(this).siblings("input").attr('type', 'password');
        }
    });

  
    if (window.innerWidth < 1041) {

        $(".show-hide-password").on("click", function () {
            if ($(this).siblings("input").is(":password")) {
                $(this).siblings("input").attr('type', 'text');
            }
            else {
                $(this).siblings("input").attr('type', 'password');
            }
        });
    }


    //Ej2 inputbox show/hide password
    $(".show-hide-password-ej2").on("click", function () {
        if ($(this).siblings().find("input").is(":password")) {
            $(this).siblings().find("input").attr('type', 'text');
            $(this).removeClass('su-show').addClass('su-hide').attr("data-original-title", window.TM.App.LocalizationContent.ClicktoHide);
            $(this).tooltip('show');
        }
        else {
            $(this).siblings().find("input").attr('type', 'password');
            $(this).removeClass('su-hide').addClass('su-show').attr("data-original-title", window.TM.App.LocalizationContent.ClicktoView);
            $(this).tooltip('show');
        }
    });

    $(".show-hide-password-ej2").bind("touch", function () {
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