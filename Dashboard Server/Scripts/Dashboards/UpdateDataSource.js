$(function () {
    if ($(parent.window).width() > 1400) {
        $("#datasource-update").addClass("iframe-content-height");
    }
    else {
        $("#datasource-update").removeClass("iframe-content-height");
    }
    parent.$("#update-data-source-popup-iframe").contents().find("#share-datasource").attr("disabled", true);
    window.parent.ShowWaitingProgress("#update-data-source-popup_wrapper", "hide");
    $(document).on('click', '.bootstrap-select ul li.add-new', function () {
        $(this).parent().prev().addClass("input-value");
        parent.$("#update-data-source-popup-iframe").contents().find('.bootstrap-select ul').find(".select-data-source").show();
        parent.$("#update-data-source-popup-iframe").contents().find('.bootstrap-select ul').find(".divider").show();
        parent.$("#datasource-popup").ejDialog("open");
        parent.$("#datasource-popup_wrapper").ejWaitingPopup("show");
    });
    $(document).on('click', '#add-new-datasource', function () {
        parent.$("#update-data-source-popup-iframe").contents().find("select").removeClass("current-select");
        $(this).parent().prev().children().find("select").addClass("current-select");
        parent.$("#update-data-source-popup-iframe").contents().find('.bootstrap-select ul').find(".select-data-source").show();
        parent.$("#update-data-source-popup-iframe").contents().find('.bootstrap-select ul').find(".divider").show();
        parent.$("#datasource-popup").ejDialog("open");
        parent.$("#datasource-popup_wrapper").ejWaitingPopup("show");
    });
    $(document).on('click', '#update-data-source-popup-iframe .dropdown-toggle', function (e) {
        parent.$("#update-data-source-popup-iframe").contents().find("select").removeClass("current-select");
        $('.bootstrap-select.open ul .add-new').remove();
        $(this).parent().prev().addClass("current-select");
        parent.$("#update-data-source-popup-iframe").contents().find('.bootstrap-select ul').find(".select-data-source").show();
        parent.$("#update-data-source-popup-iframe").contents().find('.bootstrap-select ul').find(".divider").show();
    });
    $(document).on('keyup', '.update-datasource.bootstrap-select.open input', function () {
        var availableDataSources = [];
        $('.bootstrap-select.open ul .add-new').remove();
        var enteredValue = $(this).val();
        var compareValue = enteredValue.toLowerCase();
        if (enteredValue == "") {
            $(".select-data-source").show();
            $(".divider").show();
        }
        else {
            $(".select-data-source").hide();
            $(".divider").hide();
        }
        $(".bootstrap-select.open").find("ul li").each(function () {

            if ($(this).children("a").children("span.text").text() != "") {
                availableDataSources.push($(this).children("a").children("span.text").text().toLowerCase());
            }

        });
        var isValueEqual = $.inArray(compareValue, availableDataSources);
        if (compareValue != "") {
            if (isValueEqual == -1) {
               // $('.bootstrap-select.open ul').prepend('<li class="add-new" data-original-index=""><a class="" tabindex="0"><span class="text">' + enteredValue + window.Server.App.LocalizationContent.NewDataSource + '</span><span class="glyphicon glyphicon-ok check-mark"></span></li>');
                if ($(".bootstrap-select.open").find("li:not('.hide')").length > 2) {
                    $('.bootstrap-select.open ul .divider').show();
                    if ($('.bootstrap-select.open ul li').hasClass("no-results")) {
                        $('.bootstrap-select.open ul .no-results').hide();
                        $('.bootstrap-select.open ul .divider').hide();
                    }
                }
                else {
                    $('.bootstrap-select.open ul .divider').hide();
                }
            }
            else {
                $('.bootstrap-select.open ul .add-new').remove();
                $('.bootstrap-select.open ul .divider').hide();

            }
        }
    });

    $(document).on('click', '#share-datasource', function () {
        window.parent.ShowWaitingProgress("#update-data-source-popup_wrapper", "show");
        var itemId = $(this).attr("data-item-id");
        var selectContents = parent.$("#update-data-source-popup-iframe").contents().find("select");
        var changedDataSources = [];
        var changedInfo;
        $(selectContents).each(function (index, value) {
            if ($(this).attr("data-original-value") != $(this).val()) {
                changedInfo = { DataSourceId: this.value, Name: $(this).attr("name") }
                changedDataSources.push(changedInfo);
            }
        });
        $.ajax({
            type: "POST",
            url: updatedatasource,
            data: { itemId: itemId, updatedDataSources: changedDataSources },
            success: function (data) {
                if (data.Success) {
                    closeUpdateDataSourcePopup();
                    parent.messageBox("su-update-data-source", window.Server.App.LocalizationContent.UpdatedataSources, window.Server.App.LocalizationContent.UpdateDataSourcesSuccess, "success", function () {
                        var categoryId = parent.window.CategoryId;
                        if (typeof categoryId != "undefined") {
                            if (categoryId != "") {
                                {
                                    var dashboardScope = parent.angular.element(parent.document.getElementById("server-items-container")).scope();
                                    var gridName = window.parent.$('#item-grid-container').attr("data-grid-name");
                                    if (gridName == "dashboards") {
                                        dashboardScope.refreshCategorySection(categoryId);
                                    }
                                    parent.window.CategoryId = "";
                                }
                            }
                        }
                        parent.onCloseMessageBox();
                        var $scope = parent.angular.element('[ng-controller=DashboardCtrl]').scope();
                        $scope.refreshDashboardList();
                    });
                }
                else {
                    parent.messageBox("su-update-data-source", window.Server.App.LocalizationContent.UpdateDataSourcesError, window.Server.App.LocalizationContent.InternalServerError, "success", function () {
                        parent.onCloseMessageBox();
                    });
                }
            }
        });
        window.parent.ShowWaitingProgress("#update-data-source-popup_wrapper", "hide");
    });

    $(document).on('change', '.update-datasource', function () {
        var dataOriginalValue = [];
        var changedValue = [];
        var isValueChanged = parent.$("#update-data-source-popup-iframe").contents().find("select");
        $(isValueChanged).each(function (index, value) {
            dataOriginalValue.push($(this).attr("data-original-value"));
            changedValue.push($(this).val());
        });
        if (dataOriginalValue.toString() == changedValue.toString()) {
            parent.$("#update-data-source-popup-iframe").contents().find("#share-datasource").attr("disabled", true);
        }
        else {
            parent.$("#update-data-source-popup-iframe").contents().find("#share-datasource").attr("disabled", false);
        }
    });
});

function closeUpdateDataSourcePopup() {
    parent.window.IsUpdateDashboard = false;
    parent.$("#update-data-source-popup").ejDialog("close");
    parent.$("#update-data-source-popup-iframe").contents().find("html").text("");
}

function refreshSelectPicker() {
    $("select.update-datasource").selectpicker("refresh");
    parent.$("#update-data-source-popup-iframe").contents().find("#share-datasource").attr("disabled", false);
    parent.$("#update-data-source-popup-iframe").contents().find(".input-value").removeClass("input-value");
    window.parent.ShowWaitingProgress("#update-data-source-popup_wrapper", "hide");
}
