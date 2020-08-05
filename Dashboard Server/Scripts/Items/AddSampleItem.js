//angular
var samples = angular.module('samples', ['angular.filter']);
var currentCategory = "";
var isSampleDashboardAdded;

samples.controller('SampleListCtrl', ["$scope", function ($scope) {
    $scope.samples = window.samplesList;
    $scope.orderList = "Name";
    $scope.selectedCategory = '';
    $scope.dummies = [];
    $scope.clone = {};
    $scope.count = 0;

    $scope.setFilterCategory = function (value) {
        $scope.selectedCategory = value;
    };

    $scope.filterByCategory = function (item) {
        if ($scope.selectedCategory)
            return $scope.selectedCategory === item.Name;
        else
            return item;
    };

    $scope.countFilterObjects = function (items, search) {
        var count = 0; var clear = false;
        var scope = angular.element($("#samples")).scope();
        var selectedCategory = scope.selectedCategory;
        if (Object.keys(items).length == 0 && search !== "") {
            var element = angular.element(document.querySelector('.all-dashboard-count'));
            element.text("0");
            var allElement = angular.element(document.querySelector('li'));
            allElement.addClass("highlight-list-item");
            scope.selectedCategory = undefined;
        }
        Object.keys(items).forEach(function (key) {
            if (key == scope.selectedCategory) {
                clear = true;
            }
        });
        if (!clear) {
            var allElement = angular.element(document.querySelector('li'));
            allElement.addClass("highlight-list-item");
            scope.selectedCategory = undefined;
        }
        if (search == undefined || search == "") {
            count = -1;
        }
        else {
            angular.forEach(items, function (value, key) {
                if (selectedCategory != undefined && selectedCategory.toLowerCase() == key.toLowerCase()) {
                    count = count + value.length;
                }
                else if (selectedCategory == undefined || selectedCategory == "") {
                    count = count + value.length;
                }
            });
        }
        return count;
    }

    $scope.getCategoryItemsCount = function (items, categoryName) {
        var count = 0; var allCount = 0;
        var element = angular.element(document.querySelector('.all-dashboard-count'));
        angular.forEach(items, function (value, key) {
            if (key == categoryName) {
                count = value.length;
            }
            allCount = allCount + value.length;
            element.text(allCount);
        });
        element.text(allCount);
        return count;
    }

    $scope.createDummyArray = function (items) {
        var array = [];
        if ($scope.clone != items) {
            if ($scope.count <= 2) {
                $scope.count++;
            }
            $scope.clone = items;
            angular.forEach(items, function (value, key) {
                array.push({ "category": key, "items": value, "itemscount": value.length });
            });
            array.sort(function (a, b) {
                return (a.itemscount < b.itemscount ? 1 : -1);
            });
            if ($scope.count == 1) {
                $scope.dummies = array;
            }
        }
    }

}]);

//js
$(document).ready(function () {
    isSampleDashboardAdded = false;
    if (($(parent.window).width()) > 1400) {
        $("#sample-item-container").addClass("sampleitems");
    }

    if (($(parent.window).width()) < 1400) {
        $("#sample-item-container").removeClass("sampleitems");
    }

    var totalNumberOfDashboards = 0;
    for (i = 0; i < window.samplesList.length; i++) {
        totalNumberOfDashboards += window.samplesList[i].Dashboards.length;
    }
    $(".all-dashboard-count").text(totalNumberOfDashboards);
    parent.hideWaitingPopup("sample-item-popup_wrapper");
});

$(document).on("click", ".sample-item-popup-close, #close-button", function (e) {
    eDialog = parent.$("#sample-item-popup").data("ejDialog");
    eDialog.close();
    $("#sample-item-popup iframe").attr("src", "");
    if ((window.parent.location.href.indexOf("/dashboards") > 0) && (parseInt(parent.dashboardItemCount) === 0) && isSampleDashboardAdded) {
        parent.$("body").ejWaitingPopup("show");
        parent.location.reload();
    }
});

$(document).on("click", ".list-group-item", function (e) {
    $(".list-group-item").removeClass("highlight-list-item");
    $(this).addClass("highlight-list-item");
});


$(document).on("click", ".sample-add-button", function (e) {
    var addButtonObj = $(this);
    addSampleDashboard(addButtonObj);
});

function addSampleDashboard(addButtonObj) {
    var categoryName = addButtonObj.attr("data-category-name");
    var itemName = addButtonObj.attr("data-sample-name");
    var description = addButtonObj.attr("data-sample-description");
    var fileName = addButtonObj.attr("data-sample-filename");
    addButtonObj.hide();
    addButtonObj.parent().append($("<span class='no-padding loader-gif' style='display:block; background-image:url(" + dashboardServerResourceUrl + "/images/waitingpopup.gif); background-size:cover; right:60px; position:absolute; height:30px; width:30px; bottom: 5px;z-index:10001'></span>"));
    $.ajax({
        type: "POST",
        url: addSampleDashboardUrl,
        data: { itemName: itemName, description: description, fileName: fileName, categoryName: categoryName },
        success: function (data) {
            addButtonObj.show();
            addButtonObj.siblings('.loader-gif').hide();
            if (data.Status) {
                isSampleDashboardAdded = true;
                if ((parseInt(parent.dashboardItemCount) > 0) && typeof (parent.RefreshCategorySection) === "function") {
                    parent.RefreshCategorySection(data.CategoryId);
                }
            } else {
                parent.messageBox("", data.Title, data.Message, "success", function () {
                    parent.onCloseMessageBox()
                });
            }
        }
    });
}