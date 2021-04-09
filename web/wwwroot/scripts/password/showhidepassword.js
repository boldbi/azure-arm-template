$(document).on("ready", function () {
    $(".show-hide-password").on("click", function () {
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

    $(".show-hide-password").bind("touch", function () {
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
