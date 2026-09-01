$(window).on("load",
    function () {
        $.ajax({
            url: "/home/getrecentusers",
            type: "POST",
            success: function (response) {
                if (response.status == true) {
                    var users = "";
                    if (response.data.length === 0) {
                        users += "<li>";
                        users += "No users found.";
                        users += "</li>";
                    } else {
                        for (var i = 0; i < response.data.length; i++) {
                            users += "<li>";
                            users += "<a href='/administration/user-management/users/view?username=" + response.data[i].UserName + "'>";
                            users += "<img width='32' height='32' src='/user/avatar?ImageSize=64&Username=" +
                                response.data[i].UserName +
                                "'/>";
                            users += "<span class='user-display-name' title='" + response.data[i].DisplayName + "' data-bs-toggle='tooltip' data-bs-placement='top'>" + response.data[i].DisplayName + "</span>";
                            users += "</a>";
                            users += "</li>";
                        }
                    }

                    $(".recent-users-list").html(users);
                    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                        return new bootstrap.Tooltip(tooltipTriggerEl);
                    });
                } else {
                    WarningAlert("Server Error", "Unable to retrieve the recently logged in users.", null, 7000);
                }
            },
            error: function () {
                WarningAlert("Server Error", "Unable to retrieve the recently logged in users.", null, 7000);
            }
        });
    });

$(document).ready(function () {
    var date = new Date();
    var hours = date.getHours();
    var userName = $("#salutation-text").data("name");
    var salutation = "Good Day, " + userName;

    if (hours >= 5 && hours < 12) {
        salutation = "Good Morning, " + userName;
    }
    else if (hours >= 12 && hours < 16) {
        salutation = "Good Afternoon, " + userName;
    }
    else if (hours >= 16 && hours < 21) {
        salutation = "Good Evening, " + userName;
    }

    $("#salutation-text").html(salutation);

    $(".app-list > ul > li").click(function (e) {
        $("#app-list").css("display", "none");
        var appLink = $(this).find("a");
        if (e.target.className === "home-app-url") {
            window.open(e.target.getAttribute("href"));
            $('.tooltip').css('display', 'none');
            $('.popover').popover('hide');
        }
        if (appLink.attr("data-content") === undefined) {
            window.open(appLink.attr("href"));
        } else {
            e.stopPropagation();
            $('.popover').not($(this).children(".popover")).popover('hide');
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }

        return false;
    });

    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl, {
            html: true
        });
    });
});

$(document).on('click', function (e) {
    if (($('.popover').has(e.target).length == 0) || $(e.target).is('.close')) {
        $('.popover').popover('hide');
    }

    if (e.target.className !== "popover-link" && e.target.className !== "app-icon" && e.target.className !== "app-name" && e.target.className !== "application-navigation" && e.target.className !== "su su-apps-menu application-navigation-logo") {
        $("#app-list").css("display", "none");
    }
});