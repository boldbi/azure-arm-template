$(document).ready(function (e) {
    var siteInfo = $(".popover-detail-text");

    $(siteInfo).popover({ trigger: "manual", html: true, animation: false })
        .on("mouseenter", function () {
            var _this = this;
            $(this).popover("show");
            $(".popover").on("mouseleave", function () {
                $(_this).popover('hide');
            });
        }).on("mouseleave", function () {
            var _this = this;
            setTimeout(function () {
                if (!$(".popover:hover").length) {
                    $(_this).popover("hide");
                }
            }, 300);
        });

    if (window.isMobile.toLowerCase() == 'true' || (window.innerWidth >= 990 && window.innerWidth <= 1280)) {
        siteInfo.popover('destroy');
        siteInfo.popover({ placement: 'left' });
    }
    else {
        siteInfo.popover('destroy');
        siteInfo.popover({ placement: 'top' });
    }

});