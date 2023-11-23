$(function () {
    refreshSidePanelMenu();
    if (getCookie("collapse_cookie") === "") {
        $(".mobile-menu-icon").click();
        createCookie("collapse_cookie", "menu-collapse");
    }
});

$(window).resize(refreshSidePanelMenu);

function refreshSidePanelMenu() {
    $("#main-nav").css("height", (window.innerHeight - $("#header-area").outerHeight()));

    if (window.innerHeight < 400) {
        var b = 400 - window.innerHeight;
        $(".li-logout").css("bottom", -b);
    } else {
        $(".li-logout").css("bottom", 0);
    }
}


//used to create cookie with expiry
function createCookie(cookieName, cookieValue) {
    var d = new Date();
    var expires = '';
    d.setMonth(d.getMonth() + 24);
    expires = ";expires=" + d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + expires + ";" + extractDomain(window.location.href) + ";path=/";
}

//used to check the given cookie is available or not
function getCookie(cookieName) {
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

function extractDomain(url) {
    var domain;

    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    domain = domain.split(':')[0];

    return domain;
}