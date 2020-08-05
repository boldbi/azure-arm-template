var publishedDashboardInfo = "";
var isPublishDialogBinded = false;
var resetAngularEvent = false;
var isAdvancedPage = false;

function publishSiteDetailDialog(itemDetail) {
    publishedDashboardInfo = itemDetail;
    var dialogHeader = '<span class ="publish-dialog-header">' + window.Server.App.LocalizationContent.PublishDialogHeader + '</span>';
    if (!isPublishDialogBinded) {
        var createDialogId = document.createElement("div");
        createDialogId.setAttribute("id", "publish-site-dialog");
        var element = document.getElementById("dashboard-page-container");
        element.appendChild(createDialogId);
        var dialog = new ejs.popups.Dialog({
            header: dialogHeader,
            content: document.getElementById("publish-site-content"),
            buttons: [
                {
                    'click': function (e) {
                        if (e.currentTarget.ej2_instances[0].content == window.Server.App.LocalizationContent.Back) {
                            backToPublishDialog();
                        } else {
                            advancedPublishDialog();
                        }
                    },
                    buttonModel: {
                        disabled: true,
                        content: window.Server.App.LocalizationContent.Advanced,
                    }
                },
                {
                    'click': function (e) {
                        if (e.currentTarget.ej2_instances[0].content == window.Server.App.LocalizationContent.Submit) {
                            submitTargetSiteDetails();
                        }

                        if (e.currentTarget.ej2_instances[0].content == window.Server.App.LocalizationContent.Next) {
                            backToPublishDialog();
                        }
                    },
                    buttonModel: {
                        isPrimary: true,
                        content: window.Server.App.LocalizationContent.Submit
                    }
                },
                {
                    'click': function () {
                        dialog.hide();
                        $("#publish-advanced-container").hide();
                    },
                    buttonModel: {
                        content: window.Server.App.LocalizationContent.CloseButton
                    }
                },
            ],
            animationSettings: { effect: 'Zoom' },
            open: validatePublishItem,
            beforeOpen: beforeOpenPublishDialog,
            beforeClose: beforeClosePublishDialog,
            width: '700px',
            showCloseIcon: true,
            isModal: true
        });
        dialog.appendTo(createDialogId);
        isPublishDialogBinded = true;
    }
    else {
        var dialog = document.getElementById("publish-site-dialog").ej2_instances;
        dialog[0].header = dialogHeader;
        dialog[0].btnObj[0].disabled = true;
        dialog[0].show();
    }

    ejs.popups.createSpinner({
        target: document.getElementById('publish-site-dialog')
    });
    ejs.popups.setSpinner({ type: 'Material' });
    ejs.popups.showSpinner(document.getElementById('publish-site-dialog'));
}

function beforeOpenPublishDialog() {
    $("#publish-site-content").show();
    $("#publish-advanced-container").hide();
    var dialog = document.getElementById("publish-site-dialog").ej2_instances;
    if (isSelfHosted) {
        $("#publish-base-container").hide();
        $("#publish-select-site-container").show();
        dialog[0].btnObj[1].content = window.Server.App.LocalizationContent.Next;
        dialog[0].btnObj[0].cssClass = "display-none";
    } else {
        dialog[0].btnObj[1].content = window.Server.App.LocalizationContent.Submit;
        dialog[0].btnObj[0].cssClass = "";
        $("#publish-select-site-container").hide();
        $("#publish-base-container").show();
        var scope = angular.element('[ng-controller=PublishCtrl]').scope();
        scope.publishType = "External";
    }
}

function validatePublishItem() {
    $.ajax({
        type: "GET",
        url: validatePublishItemUrl,
        data: { itemId: publishedDashboardInfo.Id },
        success: function (data) {
            if (data.Result) {
                var scope = angular.element('[ng-controller=PublishCtrl]').scope();
                ejs.popups.hideSpinner(document.getElementById('publish-site-dialog'));
                if (isSelfHosted) {
                    $("#internal-site").click();
                } else {
                    scope.publishType = "External";
                    backToPublishDialog();
                }
            } else {
                var dialog = document.getElementById("publish-site-dialog").ej2_instances;
                dialog[0].hide();
                WarningAlert(window.Server.App.LocalizationContent.PublishDashboard, window.Server.App.LocalizationContent.PublishItemValidation, 7000);
            }
        }
    });
}

function beforeClosePublishDialog() {
    var $scope = angular.element('[ng-controller=PublishCtrl]').scope();
    var dialog = document.getElementById("publish-site-dialog").ej2_instances;
    dialog[0].btnObj[0].content = window.Server.App.LocalizationContent.Advanced;
    $scope.selectedSites = [];
    $scope.activeSites = [];
    $scope.selectedDatasources = [];
    $scope.TargetSiteDetail = [];
    $scope.userLists = [];
    $scope.updateDatasources = [];
    $scope.updateUser = [];
    $scope.updateSites = [];
    $scope.publishType = "Internal";
    
    $("#multiselect-dropdown").empty();
    $('#multiselect-dropdown').selectpicker('refresh');
    $("#publish-category-name").val("");
    $("#publish-dashboard-descrition").val("");
    $("#publish-dashboard-edit").prop("checked", false);
    $("#publish-datasource-edit").prop("checked", false);
    removeCategoryValidation();
    removeDropdownValidation();
}

serverApp.controller('PublishCtrl', ["$scope", "$http", function ($scope, $http) {
    $scope.selectedSites = [];
    $scope.activeSites = [];
    $scope.userLists = [];
    $scope.selectedDatasources = [];
    $scope.TargetSiteDetail = [];
    $scope.sampleDetail = [];
    $scope.activeMenu = [];
    $scope.PublishedItems = [];
    $scope.updateDatasources = [];
    $scope.updateUser = [];
    $scope.updateSites = [];
    $scope.publishType = "Internal";

    if (!isSelfHosted) {
        $scope.publishType = "External";
    }

    $scope.selectPublishType = function (type) {
        $scope.publishType = type;
    };

    $scope.setActive = function (sites, event) {
        $scope.activeMenu = sites;
        $(".selected-sites li").removeClass("active");
        $(event.currentTarget).addClass("active");
        setTimeout(function() {
            pushDatasources();
            pushUserList();
            $("#user-selected").addClass("selectpicker");
            $('#user-selected').selectpicker('refresh');
        }, 100);
    }
 }]);

function advancedPublishDialog() {
    isAdvancedPage = true;
    ejs.popups.showSpinner(document.getElementById('publish-site-dialog'));
    var dialog = document.getElementById("publish-site-dialog").ej2_instances;
    dialog[0].btnObj[0].content = window.Server.App.LocalizationContent.Back;
    dialog[0].btnObj[1].content = window.Server.App.LocalizationContent.Submit;
    var scope = angular.element('[ng-controller=PublishCtrl]').scope();
    if (!$(".selected-sites li").hasClass("active")) {
        scope.activeMenu = scope.selectedSites[0];
        $(".selected-sites li:first").addClass("active");
    } else {
        var setActiveMenu = scope.selectedSites.some(selectedSites => selectedSites.TenantId == scope.activeMenu.TenantId);
        if (!setActiveMenu) {
            scope.activeMenu = scope.selectedSites[0];
        }
    }
    scope.$apply();
    updateUsersList();
}

function backToPublishDialog() {
    isAdvancedPage = false;
    ejs.popups.showSpinner(document.getElementById('publish-site-dialog'));
    var scope = angular.element('[ng-controller=PublishCtrl]').scope();
    var dialog = document.getElementById("publish-site-dialog").ej2_instances;
    if (isSelfHosted) {
        dialog[0].btnObj[0].cssClass = "";
        dialog[0].btnObj[1].content = window.Server.App.LocalizationContent.Submit;
    }
    if (scope.publishType == "Internal") {
        $("#active-sites-dropdown").removeClass("external-dropdown");
        $("#publish-base-container .publish-container").removeClass("external-publish-separator");
    } else {
        $("#active-sites-dropdown").addClass("external-dropdown");
        $("#publish-base-container .publish-container").addClass("external-publish-separator");
    }
    dialog[0].btnObj[0].content = window.Server.App.LocalizationContent.Advanced;
    $("#publish-base-container").show();
    $("#publish-advanced-container").hide();
    $("#publish-select-site-container").hide();

    $("#publish-dashboard-name").val(publishedDashboardInfo.Name + "_" + $.now());
    if ($('#multiselect-dropdown > option').length === 0) {
        showActiveSites(scope.publishType);
    } else {
        ejs.popups.hideSpinner(document.getElementById('publish-site-dialog'));
        updateTitleForDisabledItem();
    }
}

function updateTitleForDisabledItem() {
    $("#active-sites-dropdown .dropdown-menu .inner .disabled").attr("data-toggle", "tooltip");
    if (!$("#active-sites-dropdown .dropdown-menu .inner li a").hasClass("no-sites")) {
        $("#active-sites-dropdown .dropdown-menu .inner .disabled").attr("data-original-title", window.Server.App.LocalizationContent.ItemPublishedTitle);
    }
    $('[data-toggle="tooltip"]').tooltip()
}

function showActiveSites(type) {
    if (type === "Internal") {
        updateActiveSites();
        $("#active-sites-dropdown").removeClass("external-dropdown");
    } else {
        updateExternalSites();
        $("#active-sites-dropdown").addClass("external-dropdown");
    }
}

function updateUsersList() {
    var scope = angular.element('[ng-controller=PublishCtrl]').scope();
    scope.userDetail = [];
    $.each(scope.selectedSites, function (index, val) {
        $.ajax({
            type: "GET",
            url: getUsersPermissionUrl,
            data: { publishType: scope.publishType, tenantId: val.TenantId },
            success: function (result) {
                var publishUserList = [];
                if (typeof (result.Sites) !== "undefined") {
                    $.each(result.Sites, function (index1, value) {
                        scope.userDetail.push({ Name: value.DisplayName, Id: value.IdPReferenceId, UserId: value.UserId, IsSelected: index1 == 0 ? true : false });
                        angular.copy(scope.userDetail, publishUserList);
                    });

                    if (scope.publishType === "Internal") {
                        scope.sampleDetail = {
                            SiteIdentifier: val.SiteIdentifier,
                            UserList:
                                publishUserList
                        };
                    } else {
                        scope.sampleDetail = {
                            SiteIdentifier: val.TenantId,
                            UserList:
                                publishUserList
                        };
                    }
                    scope.userLists.push(scope.sampleDetail);
                    scope.sampleDetail = [];
                    scope.userDetail = [];
                    if (scope.selectedSites.length - 1 == index) {
                        scope.selectedDatasources = [];
                        $.ajax({
                            type: "GET",
                            url: getDatasourceUrl,
                            data: { itemId: publishedDashboardInfo.Id },
                            success: function (result) {
                                if (result.Datasources != null) {
                                    $.each(result.Datasources, function (index2, value) {
                                        scope.selectedDatasources.push({ Id: value.DataSourceId, Name: value.DataSourceName, IsLocked: $("#publish-datasource-edit").is(":checked") });
                                    });
                                }

                                if (resetAngularEvent) {
                                    scope.TargetSiteDetail = [];
                                    updateDatasourceIsLocked();
                                    prepareTargetSiteDetail();
                                }
                                resetAngularEvent = false;
                                pushUserList();
                                pushDatasources();
                                $("#user-selected").addClass("selectpicker");
                                $('#user-selected').selectpicker('refresh');
                                $("#publish-base-container").hide();
                                $("#publish-select-site-container").hide();
                                $("#publish-advanced-container").show();
                                ejs.popups.hideSpinner(document.getElementById('publish-site-dialog'));
                            }
                        });
                    }
                }
            }
        });
    });
}

function submitTargetSiteDetails() {
    var canSubmit = canPublish();
    if (canSubmit) {
        ejs.popups.showSpinner(document.getElementById('publish-site-dialog'));
        if (!isAdvancedPage) {
            var scope = angular.element('[ng-controller=PublishCtrl]').scope();
            scope.selectedDatasources = [];
            $.ajax({
                type: "GET",
                url: getDatasourceUrl,
                data: { itemId: publishedDashboardInfo.Id },
                success: function (result) {
                    if (result.Datasources != null) {
                        $.each(result.Datasources, function (index, value) {
                            scope.selectedDatasources.push({ Id: value.DataSourceId, Name: value.DataSourceName, IsLocked: $("#publish-datasource-edit").is(":checked") });
                        });
                    }

                    publishDashboard();
                }
            });
        } else {
            publishDashboard();
        }
    }
}

function publishDashboard() {
    var scope = angular.element('[ng-controller=PublishCtrl]').scope();
    var dialog = document.getElementById("publish-site-dialog").ej2_instances;
    if (scope.TargetSiteDetail.length == 0) {
        scope.activeMenu = scope.selectedSites[0];
        prepareTargetSiteDetail();
    }
    pushUserList();
    pushDatasources();
    var requestData = { targetSiteDetail: JSON.stringify(scope.TargetSiteDetail), itemId: publishedDashboardInfo.Id };
    $.ajax({
        type: "POST",
        url: publishDashboardUrl,
        data: requestData,
        success: function (result) {
            if (result.Status) {
                SuccessAlert(window.Server.App.LocalizationContent.PublishDashboard, window.Server.App.LocalizationContent.PublishSuccess, 7000);
            } else {
                WarningAlert(window.Server.App.LocalizationContent.PublishDashboard, window.Server.App.LocalizationContent.PublishFailure, 7000);
            }
            ejs.popups.hideSpinner(document.getElementById('publish-site-dialog'));
            dialog[0].hide();
        }
    });
}

function prepareTargetSiteDetail() {
    var scope = angular.element('[ng-controller=PublishCtrl]').scope();
    $.each(scope.selectedSites, function (index, value) {
        var activeSiteUser = scope.userLists.find(activeSiteUser => activeSiteUser.SiteIdentifier == value.SiteIdentifier)
        var publishDatasource = [];
        angular.copy(scope.selectedDatasources, publishDatasource);
        scope.sampleDetail = {
            SiteIdentifier: value.SiteIdentifier,
            TenantId: value.TenantId,
            UserId: (typeof (activeSiteUser) == "undefined" || activeSiteUser.UserList.length == 0) ? 0 : activeSiteUser.UserList[0].UserId,
            IdpReferenceIdString: (typeof (activeSiteUser) == "undefined" || activeSiteUser.UserList.length == 0) ? null : activeSiteUser.UserList[0].Id,
            PublishItem: {
                CategoryName: $("#publish-category-name").val().trim(),
                Description: $("#publish-dashboard-descrition").val().trim(),
                Name: $("#publish-dashboard-name").val().trim(),
                IsLocked: $("#publish-dashboard-edit").is(":checked")
            },
            Datasources: publishDatasource,
            PublishType: scope.publishType
        };
        scope.TargetSiteDetail.push(scope.sampleDetail);
        scope.sampleDetail = [];     
    })
    scope.$apply();
}

$(document).on("click", "#active-sites-dropdown .bootstrap-select .dropdown-menu .selectpicker li a", function (e) {
    e.stopPropagation();
    var scope = angular.element('[ng-controller=PublishCtrl]').scope();
    scope.selectedSites = [];
    $.each($("#active-sites-dropdown option:selected"), function (index, value) {
        var activeTenantDetail = scope.activeSites.find(activeTenantDetail => activeTenantDetail.TenantId == value.attributes.id.value);
        scope.selectedSites.push({ SiteIdentifier: activeTenantDetail.SiteIdentifier, TenantId: activeTenantDetail.TenantId, TenantName: activeTenantDetail.TenantName });
    });

    activateSubmit();
    resetAngularEvent = true;
    scope.$apply();
});

$(document).on("click", "#selected-datasources .bootstrap-select .dropdown-menu .selectpicker li a", function (e) {
    e.stopPropagation();
    var scope = angular.element('[ng-controller=PublishCtrl]').scope();
    var activeSiteDetail = scope.TargetSiteDetail.find(activeSiteDetail => activeSiteDetail.TenantId == scope.activeMenu.TenantId); 
    var selectedDatasource = activeSiteDetail.Datasources.find(selectedDatasource => selectedDatasource.Id == $("#selected-datasources option")[$(e.target.parentElement).index()].value);
    if ($(e.target.parentElement).hasClass("selected")) {
        selectedDatasource.IsLocked = true;
    } else {
        selectedDatasource.IsLocked = false;
    }
});

$(document).on("click", ".users-list .bootstrap-select .dropdown-menu .selectpicker li a", function (e) {
    var scope = angular.element('[ng-controller=PublishCtrl]').scope();
    var activeSiteUser = [];
    if (scope.publishType === "Internal") {
        activeSiteUser = scope.userLists.find(activeSiteUser => activeSiteUser.SiteIdentifier == scope.activeMenu.SiteIdentifier);
    } else {
        activeSiteUser = scope.userLists.find(activeSiteUser => activeSiteUser.SiteIdentifier == scope.activeMenu.TenantId);
    }
    var unSelectUser = activeSiteUser.UserList.find(unSelectUser => unSelectUser.IsSelected == true);
    if (typeof (unSelectUser) !== "undefined") {
        unSelectUser.IsSelected = false;
    }
    var selectUser = activeSiteUser.UserList.find(selectUser => selectUser.UserId == $(".users-list option")[$(e.target.parentElement).index()].value);
    selectUser.IsSelected = true;   
});

function pushDatasources() {
    $("#datasource-list-dropdown").empty();
    var scope = angular.element('[ng-controller=PublishCtrl]').scope();
    var activeSiteDetail = scope.TargetSiteDetail.find(activeSiteDetail => activeSiteDetail.TenantId == scope.activeMenu.TenantId);
    if (typeof (activeSiteDetail) != "undefined" && activeSiteDetail.Datasources.length != 0) {
        $.each(activeSiteDetail.Datasources, function (index, value) {
             if (value.IsLocked) {
                $("#datasource-list-dropdown").append('<option value="' + value.Id + '"selected>' + value.Name + '</option>');
            } else {
                $("#datasource-list-dropdown").append('<option value="' + value.Id + '">' + value.Name + '</option>');
            }
        })
    }
    if (scope.selectedDatasources.length == 0) {
        $("#datasource-list-dropdown").append('<option disabled>' + window.Server.App.LocalizationContent.NoDataSources + '</option>');
    }
    $('#datasource-list-dropdown').selectpicker('refresh');
}

function pushUserList() {
    $("#user-selected").empty();
    var scope = angular.element('[ng-controller=PublishCtrl]').scope();
    scope.selectedUsers = [];
    var activeSiteUser = [];
    if (scope.publishType === "Internal") {
        activeSiteUser = scope.userLists.find(activeSiteUser => activeSiteUser.SiteIdentifier == scope.activeMenu.SiteIdentifier);
    } else {
        activeSiteUser = scope.userLists.find(activeSiteUser => activeSiteUser.SiteIdentifier == scope.activeMenu.TenantId);
    }
    var getTargetDetail = scope.TargetSiteDetail.find(getTargetDetail => getTargetDetail.TenantId == scope.activeMenu.TenantId);
    if (typeof (activeSiteUser) != "undefined" && activeSiteUser.UserList.length != 0) {
        $.each(activeSiteUser.UserList, function (index, value) {
            if (value.IsSelected) {
                $("#user-selected").append('<option value="' + value.UserId + '"selected>' + value.Name + '</option>');
                getTargetDetail.UserId = value.UserId;
                getTargetDetail.IdpReferenceIdString = value.Id;
            } else {
                $("#user-selected").append('<option value="' + value.UserId + '">' + value.Name + '</option>');
            }
        });
        $('#user-selected').selectpicker('refresh');
    }
}

$(document).on("change", "input", "textarea", function () {
    resetAngularEvent = true;
});


$(document).on("keyup focusout", "#active-sites-dropdown", function (e) {
    if ($("#active-sites-dropdown li.selected").length > 0) {
        $("#active-sites-dropdown .bootstrap-select .selectpicker").removeClass("has-error");
        $("#add-external-sites .btn.btn-default").removeClass("has-error");
        $("#active-sites-validation").html("");
    } else {
        $("#active-sites-validation").html(window.Server.App.LocalizationContent.SelectSites);
        $("#active-sites-dropdown .bootstrap-select .selectpicker").addClass("has-error");
        $("#add-external-sites .btn.btn-default").addClass("has-error");
    }
    activateSubmit();
});

$(document).on("keyup focusout", "#publish-category-name", function (e) {
    var publishCategoryName = $("#publish-category-name").val().trim();
    if (parent.isEmptyOrWhitespace(publishCategoryName)) {
        $("#publish-category-validation").html("");
        $("#publish-plugin-validation").html(window.Server.App.LocalizationContent.Categoryvalidator);
        $("#publish-category-name").addClass("has-error");
    }
    else if (!parent.IsValidName("name", publishCategoryName)) {
        $("#publish-plugin-validation").html("");
        $("#publish-category-validation").html(window.Server.App.LocalizationContent.AvoidSpecialCharactors);
        $("#publish-category-name").addClass("has-error");
    }
    else {
        $("#publish-category-name").removeClass("has-error");
        $("#publish-category-validation").html("");
        $("#publish-plugin-validation").html("");
    }
    activateSubmit();
});

$(document).on("keyup focusout", "#advanced-category-name", function (e) {
    var advancedCategoryName = $("#advanced-category-name").val().trim();
    if (parent.isEmptyOrWhitespace(advancedCategoryName)) {
        $("#advanced-category-validation").html("");
        $("#advanced-plugin-validation").html(window.Server.App.LocalizationContent.ItemNameValidator);
        $("#advanced-category-name").addClass("has-error");
    }
    else if (!parent.IsValidName("name", advancedCategoryName)) {
        $("#advanced-plugin-validation").html("");
        $("#advanced-category-validation").html(window.Server.App.LocalizationContent.AvoidSpecialCharactors);
        $("#advanced-category-name").addClass("has-error");
    }
    else {
        $("#advanced-category-name").removeClass("has-error");
        $("#advanced-category-validation").html("");
        $("#advanced-plugin-validation").html("");
    }
    activateSubmit();
});

function removeCategoryValidation() {
    $("#publish-category-validation, #advanced-category-validation, #publish-plugin-validation, #advanced-plugin-validation").html("");
    $("#publish-category-name, #advanced-category-name").removeClass("has-error");
}

function removeDropdownValidation() {
    $("#active-sites-dropdown .bootstrap-select .selectpicker").removeClass("has-error");
    $("#add-external-sites .btn.btn-default").removeClass("has-error");
    $("#active-sites-validation").html("");
}

function canPublish() {
    var categoryName = isAdvancedPage ? $("#advanced-category-name").val().trim() : $("#publish-category-name").val().trim();
    if ($("#active-sites-dropdown li.selected").length > 0) {
        if (isAdvancedPage && parent.isEmptyOrWhitespace(categoryName)) {
            $("#advanced-category-validation").html("");
            $("#advanced-plugin-validation").html(window.Server.App.LocalizationContent.ItemNameValidator);
            $("#advanced-category-name").addClass("has-error");
            return false;
        }
        else if (parent.isEmptyOrWhitespace(categoryName)) {
            $("#publish-category-validation").html("");
            $("#publish-plugin-validation").html(window.Server.App.LocalizationContent.Categoryvalidator);
            $("#publish-category-name").addClass("has-error");
            return false;
        }
        else {
            removeCategoryValidation();
            removeDropdownValidation();
        }
    } else {
        $("#active-sites-validation").html(window.Server.App.LocalizationContent.SelectSites);
        $("#active-sites-dropdown .bootstrap-select .selectpicker").addClass("has-error");
        $("#add-external-sites .btn.btn-default").addClass("has-error");
        if (isAdvancedPage && parent.isEmptyOrWhitespace(categoryName)) {
            $("#advanced-category-validation").html("");
            $("#advanced-plugin-validation").html(window.Server.App.LocalizationContent.ItemNameValidator);
            $("#advanced-category-name").addClass("has-error");
            return false;
        }
        else if (parent.isEmptyOrWhitespace(categoryName)) {
            $("#publish-category-validation").html("");
            $("#publish-plugin-validation").html(window.Server.App.LocalizationContent.Categoryvalidator);
            $("#publish-category-name").addClass("has-error");
            return false;
        }
        else {
            removeCategoryValidation();
        }

        return false;
    }
    return true;
}

function activateSubmit() {
    var dialog = document.getElementById("publish-site-dialog").ej2_instances;
    var categoryName = isAdvancedPage ? $("#advanced-category-name").val().trim() : $("#publish-category-name").val().trim();
    if ($("#active-sites-dropdown li.selected").length > 0 && !parent.isEmptyOrWhitespace(categoryName)) {
        dialog[0].btnObj[0].disabled = false;
    } else {
        dialog[0].btnObj[0].disabled = true;
    }
}

function updateDatasourceIsLocked() {
    var scope = angular.element('[ng-controller=PublishCtrl]').scope();
    $.each(scope.selectedDatasources, function (index, value) {
        value.IsLocked = $("#publish-datasource-edit").is(":checked");
    })
}

function updateActiveSites() {
    $.ajax({
        type: "GET",
        url: getActiveSitesUrl,
        data: { itemId: publishedDashboardInfo.Id },
        success: function (result) {
            var scope = angular.element('[ng-controller=PublishCtrl]').scope();
            $.each(result.Sites, function (index, value) {
                scope.activeSites.push({ TenantId: value.TenantId, SiteIdentifier: value.TenantIdentifier, TenantName: value.TenantName });
                if (value.IsPublished) {
                    $("#multiselect-dropdown").append('<option id=' + value.TenantId + ' value=' + value.TenantIdentifier + ' disabled>' + value.TenantName + '</option>');
                } else {
                    $("#multiselect-dropdown").append('<option id=' + value.TenantId + ' value=' + value.TenantIdentifier + '>' + value.TenantName + '</option>');
                }
            });

            if (result.Sites.length == 0) {
                $("#multiselect-dropdown").append('<option class = "no-sites" disabled>' + window.Server.App.LocalizationContent.NoActiveSites + '</option>');
            }
            $("#multiselect-dropdown").selectpicker('refresh');
            ejs.popups.hideSpinner(document.getElementById('publish-site-dialog'));
            updateTitleForDisabledItem();
        }
    });
}