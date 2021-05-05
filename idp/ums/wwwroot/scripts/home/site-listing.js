$(document).ready(function () {
    var contentAreaWaitingPopupTemplateId = createLoader("content-area");
    $("#content-area").ejWaitingPopup({ template: $("#" + contentAreaWaitingPopupTemplateId) });

    if (location.href.match(/cloud/) !== null && location.href.match(/boldbi/) !== null) {
        $("#cloud-sites").tab("show");
    }
    else if (location.href.match(/on-premise/) !== null && location.href.match(/boldreports/) !== null) {
        $("#bold-reports-on-premise").tab("show");
    }
    else if (location.href.match(/on-premise/) !== null && location.href.match(/boldbi/) !== null) {
        $("#on-premise-sites").tab("show");
    }
    else if (location.href.match(/cloud/) !== null && location.href.match(/boldreports/) !== null) {
        $("#report-cloud-sites").tab("show");
    }


    $("a[data-toggle='tab']").on('click', function (e) {
        var query = (window.location.search).toString();

        switch ($(this).attr("id")) {
            case "cloud-sites":
                if (query !== "?product=boldbi&environment=cloud") {
                    history.pushState(null, '', '?product=boldbi&environment=cloud');
                }
                break;

            case "report-cloud-sites":
                if (query !== "?product=boldreports&environment=cloud") {
                    history.pushState(null, '', '?product=boldreports&environment=cloud');
                }
                break;

            case "on-premise-sites":
                if (query !== "?product=boldbi&environment=on-premise") {
                    history.pushState(null, '', '?product=boldbi&environment=on-premise');
                }
                break;

            case "bold-reports-on-premise":
                if (query !== "?product=boldreports&environment=on-premise") {
                    history.pushState(null, '', '?product=boldreports&environment=on-premise');
                }
                break;
        }
    });

    $(document).on("click", ".tenant-action-button", function () {
        window.open($(this).attr("href"));
    });

    $(document).on("click", ".add-site-action-button", function () {
        $("#content-area").ejWaitingPopup("show");

        if ($(this).attr("data-is-cloud").toLowerCase() == "true") {
            window.history.pushState('', window.location.href, window.location.href);
            window.location.href = $(this).attr("data-url");
        }
        else {
            $.ajax(
                {
                    type: "POST",
                    url: addOnPremisePortalUrl,
                    data: { TenantType: $(this).attr("data-tenant-type") },
                    success: function (result) {
                        if (result.Status) {
                            setTimeout(function () {
                                $("#content-area").ejWaitingPopup("hide");
                                SuccessAlert("Create Portal", "Portal created successfully.", 7000);
                                window.location.reload();
                            }, 2000);
                        }
                        else if (!result.Status && result.IsCorporateEmail != undefined && !result.IsCorporateEmail) {
                            $("#content-area").ejWaitingPopup("hide");
                            WarningAlert("Create Portal", "Error while creating portal. We need a business email address.", 7000);
                        }
                        else {
                            $("#content-area").ejWaitingPopup("hide");
                            WarningAlert("Create Portal", "Error while creating portal.", 7000);
                        }
                    },
                    error: function (e) {
                        $("#content-area").ejWaitingPopup("hide");
                        WarningAlert("Create Portal", "Error while creating portal.", 7000);
                    }
                });
        }
    });
});