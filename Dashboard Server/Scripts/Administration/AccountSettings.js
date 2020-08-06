$(document).ready(function () {
    if ($("#user-settings-container").is(":visible")) {
        if (location.hash !== null && location.hash !== "" && $("#user-settings-container .panel-title a").attr("href") !== location.hash) {
            $("a[href= '" + location.hash + "']").trigger("click");
        }
    }

    $(document).on("click", ".css-radio", function () {
        $(this).siblings("label").removeClass("notransition");
    });
});