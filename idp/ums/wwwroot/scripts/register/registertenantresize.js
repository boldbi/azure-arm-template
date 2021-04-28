$(window).resize(function () {
    initPage();
});

$(window).load(function () {
    initPage();
});

function initPage() {
    var height = 0;
    $(".link-bottom").css("margin-left", $(".register-tenant-container").width() - $(".link-bottom").width());

    if (window.innerWidth < 992) {
        height = $(".form-container").height() + $(".info-container").height() + $(".cookie-notification").height() + $("footer").height();
    }
    else {
        height = $(".form-container").height();
    }
    if (hasVsDevOffer.toLowerCase() != "true") {
        if (window.innerHeight < height) {
            $(".register-tenant-parent").css("height", height);
            $("#body").css("height", height);
            $("html").css("height", height);
        }
        else {
            $(".register-tenant-parent").css("height", "100%");
            $("#body").css("height", "100%");
            $("html").css("height", "100%");
        }
    }

    if (window.innerWidth >= 992) {
        $(".dashboard-image").removeClass("display-none");
        $(".link-bottom").removeClass("display-none");
        $(".link-top").addClass("display-none");
    }
    else {
        $(".dashboard-image").addClass("display-none");
        $(".link-bottom").addClass("display-none");
        $(".link-top").removeClass("display-none");
    }
}