var journeyCookieName = "syncfusion.dashboards.server.journey";

$(document).on("click", "#donot-show-journey", function () {
    SetJourneyCookie(true);
    $(".setup-journey, .tooltip").hide();
});

function SetJourneyCookie(donotShowJourney) {
    var cookieValue = JSON.stringify('{ "donot_show_journey": "' + donotShowJourney + '"}');
    document.cookie = journeyCookieName + "=" + cookieValue + ";expires='Fri, 31 Dec 9999 23:59:59 GMT';path=/";
}

function getJourneyCookie() {
    var name = journeyCookieName + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ')
            cookie = cookie.substring(1);
        if (cookie.indexOf(name) == 0)
            return cookie.substring(name.length, cookie.length);
    }
    return "";
}
