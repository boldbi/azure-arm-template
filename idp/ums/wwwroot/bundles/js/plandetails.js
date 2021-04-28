//$(document).ready(function () {
//    $(document).on("click", '.choose-plan-button', function () {
//        $("body").ejWaitingPopup("show");
//        planId = $(this).attr("data-plan-id");
//        $("#hidden-plan-id").val(planId);
//        $(".billing-message div #plan-name").text($(this).attr("data-plan-name"));
//        $(".current-plan #plan-name").text($(this).attr("data-plan-name"));
//        if (window.location.search.split("&plan=")[1] != undefined) {
//            var stateObj = window.top.history.state;
//            var url = window.location.href.substring(0, window.location.href.indexOf("&plan=")) + "&plan=";
//            window.top.history.replaceState(stateObj, null, url + $(this).attr("data-plan-id"));
//        }
//        moveToNextStep();
//        $(".plan-chooser-container").fadeOut(300, function () {
//            $("#card-form-id").fadeIn(300);
//        });
//        $("body").ejWaitingPopup("hide");
//    });
//});

$(document).on("click", '.choose-plan-button', function () {
    triggerGoogleAnalyticsOnSetupComplete();
    var registerUrl = window.location.href;
    var planId = $(this).attr("data-plan-id");
    var deployUrl = registerUrl.split("/");
    deployUrl.pop();
    window.location.href = deployUrl.join("/") + "/deploy?id=" + $("#tenantid").val() + "&planId=" + planId;
});