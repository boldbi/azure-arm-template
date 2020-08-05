function onTourStepShown(tour) {
    $("#backdropFallback").addClass("hide");
    var stepElement = $(".tour-" + tour._options.name + "-element");
    var step = tour._options.steps[tour._current];
    $(step.element).siblings('.tour-step-backdrop-parent').remove();
    var disabledOverlay = $('<div class="tour-step-backdrop-parent"></div>');
    $(step.element).before(disabledOverlay);
    disabledOverlay.outerHeight(stepElement.outerHeight() + 1).outerWidth(stepElement.outerWidth() + 1);
    var offset = stepElement.offset();
    offset.top = offset.top - (step.backdropPadding || 0);
    offset.left = offset.left - (step.backdropPadding || 0);
    disabledOverlay.offset(offset);
}

function onTourStepHidden(tour) {
    $("#backdropFallback").removeClass("hide");
    var step = tour._options.steps[tour._current];
    $(step.element).siblings('.tour-step-backdrop-parent').remove();
}

$(document).ready(function () {
    var goToStep = 1;
    var cookie = getCookie();
    var showTour = true;
    if (cookie !== "") {
        var jsonCookie = JSON.parse(JSON.parse(cookie));
        var pageList = GetPageList(jsonCookie.visited_pages);
        goToStep = Math.max.apply(Math, pageList);
        showTour = jsonCookie.tour_skipped.toLowerCase() === "false" && jsonCookie.tour_completed.toLowerCase() === "false";
    }

    if (showTour) {
        if (goToStep < TotalTour) {
            tour.restart();
            tour.goTo(goToStep - 1);
        } else {
            tour.end();
        }
    } else {
        if (tour._options.name === "serverTour") {
            tour.end();
        } else {
            if (showDatasourceTour.toLowerCase() === "true") {
                datasourceTour.restart();
            } else {
                datasourceTour.end();
            }
        }
    }
});

function setCookie(tourSkipped, tourCompleted, currentPage) {
    var cookieValue = '';
    var cookie = getCookie();
    if (cookie === "") {
        cookieValue = JSON.stringify('{ "tour_skipped": "' + tourSkipped + '", "tour_completed": "' + tourCompleted + '", "visited_pages":"1"}');
    } else {
        var jsonCookie = JSON.parse(JSON.parse(cookie));
        cookieValue = JSON.stringify('{ "tour_skipped": "' + tourSkipped + '", "tour_completed": "' + tourCompleted + '", "visited_pages":"' + jsonCookie.visited_pages + ',' + currentPage + '"}');
    }
    document.cookie = cookieName + "=" + cookieValue + ";expires='Fri, 31 Dec 9999 23:59:59 GMT';path=/";
}
function getCookie() {
    var name = cookieName + "=";
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

tour.init();

$(document).on("click", ".su-close", function () {
    if ($(this).hasClass("datasource-close")) {
        datasourceTour.end();
    } else {
        tour.end();
        setCookie(true, false, tour._current + 1);
    }
});

$(document).on("click", ".end-nav", function () {
    tour.end();
    setCookie(false, true, tour._current + 1);
});

$(document).on("click", ".prev-nav", function () {
    tour.prev();
    setCookie(false, false, tour._current + 2);
});

$(document).on("click", ".next-nav", function () {
    tour.next();
    setCookie(false, false, tour._current);
});

$(document).on('keyup', function (e) {
    if (e.keyCode == 27) {
        if (tour._current != null) {
            tour.end();
            setCookie(true, false, tour._current + 1);
        } else if(datasourceTour._current != null) {
            datasourceTour.end();
        }
    }
});

function GetPageList(pages) {
    var pageList = new Array();
    pageList = pages.split(",");
    for (var i = 0; i < pageList.length; i++) {
        pageList[i] = parseInt(pageList[i], 10);
    }

    return pageList;
}