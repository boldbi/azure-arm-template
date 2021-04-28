$(document).ready(function () {

    if (($(parent.window).width()) > 1400) {
        $("#user-delete").addClass("lg-flexible");
    }
    if (($(parent.window).width()) < 1400) {
        $("#user-delete").removeClass("lg-flexible");
    }

    parent.$("#delete-group-area_wrapper").ejWaitingPopup("hide");
    $(document).on("click", ".popup-close", function (e) {
        eDialog = parent.$("#delete-group-area").data("ejDialog");
        eDialog.close();
        parent.$("#user-list").selectpicker("refresh");
        parent.$("#delete-group-area iframe").attr("src", "");
    });
    $(document).on("click", "#delete-user", function () {
        var hiddenId = $("#hidden-id").val();
        var hiddenName = $("#hidden-name").val();
        var hiddengroupId = $("#hidden-group-id").val();
        doAjaxPost("POST", deleteUserFromGroupUrl, { groupId: hiddengroupId, userId: hiddenId },
            function (data) {
                if (data == "True") {
                    eDialog = parent.$("#delete-group-area").data("ejDialog");
                    eDialog.close();
                    if (parent.$("#user-list option").length <= 0) {
                        parent.$("#user-list-container .noResult").remove();
                        parent.$("#user-list-container div.bs-deselect-all-custom").removeClass('bs-deselect-all-custom').addClass('bs-select-all-custom');
                        parent.$("#user-list-container div.bs-select-all-custom").children("span:eq(0)").text("Select All");
                        parent.$("#user-list-container div.bs-select-all-custom").show();
                    }
                    parent.$(".show-tick").addClass("open");
                    parent.$("#user-list").selectpicker("deselectAll");
                    parent.$(".show-tick").removeClass("open");
                    parent.$("#user-list").append("<option value='" + hiddenId + "'>" + hiddenName + "</option>");
                    sortAddedUsers();
                    parent.$("#user-list").selectpicker("refresh");
                    var gridObj = parent.$("#Grid").ejGrid("instance");
                    var currentPage = gridObj.model.pageSettings.currentPage;
                    var pageSize = gridObj.model.pageSettings.pageSize;
                    var totalRecordsCount = gridObj.model.pageSettings.totalRecordsCount;
                    var lastPageRecordCount = gridObj.model.pageSettings.totalRecordsCount % gridObj.model.pageSettings.pageSize;

                    if (lastPageRecordCount != 0 && lastPageRecordCount <= 1) {
                        gridObj.model.pageSettings.currentPage = currentPage - 1;
                    }
                    gridObj.refreshContent()
                }
            });
    });
    $(document).on("click", "#delete-group", function () {
        var hiddengroupId = $("#hidden-id").val();
        doAjaxPost("POST", deleteGroupUrl, { "GroupId": hiddengroupId },
            function (data) {
                if (data === "True") {
                    parent.location.href = "/groups";
                }
            }
        );
    });

    $(document).keyup(function (e) {
        if (e.keyCode === 27) {
            parent.$("#delete-group-area").ejDialog("close");
        }
    });
});

function sortAddedUsers() {
    var options = parent.$("#user-list option");
    options.sort(function (currentOption, nextOption) {
        if (currentOption.text > nextOption.text) return 1;
        else if (currentOption.text < nextOption.text) return -1;
        else return 0;
    });
    parent.$("#user-list").empty().append(options).selectpicker("refresh");
}