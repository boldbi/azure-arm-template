var isFirstRequest = false;
var attributeGrid;
var FavoriteGrids;
$(document).ready(function () {
    initializePage(); 
    $('[data-toggle="tooltip"]').tooltip();
    $(".close-icon").css("display", "none");
    $("#search-tenants-allsites").hide();
    $(".searchFavorite-sites").hide();
    $("#sorting-options-sites").hide();
    $("#sorting-favorites").hide();
});

function initializePage() {
    generateProfileAvatar();
    addPlacehoder("#search-area-sites");
    addPlacehoder("#search-area");
    showSiteDownAlert();
    createAndAppendAttributeGrid();
    showAppropriateTab();
    initializeFavoriteGrid();
    scrollBar();
    initializeTooltip();
    activeTab();
    handleTabClicks();
    handleLogoError();
    $(window).on("resize", function () {
        activeTab()
    });
    $(document).on("click", ".e-row", function () {
        if (window.innerWidth < 730) {
            var actionLink = $(this).find('.open-link a').attr('href');
            window.open(actionLink, '_blank');
        }
    });
    
}
function activeTab()
{
    var gridObjs;
    if ($("#all-sites-tab").parent().hasClass("active")) {
        gridObjs = document.getElementById("AllSitesGrid").ej2_instances[0];
    } else {
        gridObjs = document.getElementById("FavoriteGrid").ej2_instances[0];
    }
    resizing(gridObjs);
}
function showSiteDownAlert() {

    if (isShowAlert.toLowerCase() === "true") {
        var siteDownAlertDialogobj = new ejs.popups.Dialog({
            content: document.getElementById("site-down-alert-content"),
            isModal: true,
            beforeOpen: showAlertContent,
            showCloseIcon: true,
            closeOnEscape: false,
            visible: false,
            width: '472px',
            height: "auto",
            animationSettings: { effect: 'Zoom' },
            zIndex: 4
        });

        siteDownAlertDialogobj.appendTo('#site-down-alert');
        siteDownAlertDialogobj.show();

        function showAlertContent() {
            $("#site-down-alert-content").show();
        }
    }
}
$(document).on('click', '.search-allsites', function () {
    $("#search-tenants-allsites").show();
    $(".search-icon").addClass("no-border");
});
$(document).on('click', '.search-favorite', function () {
    $("#search-tenants-favorite").show();
    $(".search-icon").addClass("no-border");

});

$(document).on("click", "#sort-site-button", function () {
    $("#sorting-options-sites").toggle();
});
$(document).on("click", "#sort-favorite-button", function () {
    $("#sorting-options-favorites").toggle();
});

$(document).on("click", function (e) {
    var target = $(e.target);
    var closeIcon = $(".close-icon");

    if (!target.closest(".search-bar").length && !closeIcon.is(":visible")) {
        $(".search-bar input[type='text']").hide();
        $(".search-icon").removeClass("no-border");
    }
});

$(document).on("mousedown", function (e) {
        var container = $("#sorting-options-sites");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide();
        }  
});
$(document).on("mousedown", function (e) {
    var container = $("#sorting-options-favorites");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
    }
});

$(document).on('click', '.toggle-button-favorite', function (event) {
    event.stopPropagation();
    var $button = $(this);
    var isFavorite = $button.attr('data-isFavorite');
    isFavorite = (isFavorite === 'true') ? 'false' : 'true';
    $button.data('isFavorite', isFavorite);
    var $icon = $button.find('i');
    var tenantId = $button.data('tenantid');
    var userId = $button.data('userid');

    var UpdateFavorite = [{
        IsFavorite: isFavorite,
        TenantinfoId: tenantId,
    }];

    $.ajax({
        type: "POST",
        url: UpdateFavoriteUrl,
        data: { userId,UpdateFavorite },
        success: function (result) {
            if (result.Status) {
                if (isFavorite) {
                    $icon.removeClass('su-favorite').addClass('su-favorite-fill');
                } else {
                    $icon.removeClass('su-favorite-fill').addClass('su-favorite');
                }
                if ($("#all-sites-tab").parent().hasClass("active")) {
                    var gridObj = document.getElementById("AllSitesGrid").ej2_instances[0];
                    var siteData = new ej.data.DataManager({ url: TenantSites + "?userId=" + userId, adaptor: new ej.data.UrlAdaptor() });
                    gridObj.dataSource = siteData;
                } else {
                    var gridObj = document.getElementById("FavoriteGrid").ej2_instances[0];
                    var siteData = new ej.data.DataManager({ url: TenantFavoriteListurl + "?userId=" + userId, adaptor: new ej.data.UrlAdaptor() });
                    gridObj.dataSource = siteData;
                }
               

            } 
        }
    });
});


function createAndAppendAttributeGrid() {


    var actionTemplate = '<div class="open-link"><a href="${SiteUrl}" target="_blank">Open</a></div>';
   
    var searchQuery = window.location.href.slice(window.location.href.indexOf('?') + 1).split('=');
    if (searchQuery[0] == "searchKey") {
        $("#search-tenants-allsites").val(searchQuery[1]);
    }
    else {
        $("#search-tenants-allsites").val();
    }
    var data = new ejs.data.DataManager({
        url: TenantSites + "?userId=" + userId,
        adaptor: new ejs.data.UrlAdaptor(),
        crossDomain: true
    });
    attributeGrid = new ejs.grids.Grid({
        dataSource: data,
        gridLines: 'Default',
        allowSorting: true,
        allowSearching: false,
        allowPaging: true,
        allowFiltering: false,
        load: fnOnSitesGridLoad,
        actionBegin: fnOnSitesGridActionBegin,
        pageSettings: { pageSize: 10 },
        enableHover: true,
        enableAltRow: true,
        rowDataBound: function () {
            var height = $(".e-gridcontent").height();
            if (height != null) {
                rowBound();
            }
        },
        dataBound: function (args) {
            $('[data-toggle="tooltip"]').tooltip(
                {
                    container: '#AllSitesGrid'
                });
        },
        columns: [
            { width: 5, template: '${favoriteButtonTemplate(IsFavorite, Id, UserId)}', clipMode: 'Clip' },
            { field: 'TenantName', template: '#application-name-template',headerText: 'Site Name', width: 17, allowSorting: true, allowFiltering: false, clipMode: 'EllipsisWithTooltip' },
            { field: 'TenantType', template: '#application-tenant-template', headerText: 'Type', width: 9, allowSorting: false, allowFiltering: false },
            { field: 'SiteUrl', headerText: 'URL', width: 30,allowSorting:false, allowFiltering: false },
            { field: 'CreatedDateString', headerText: 'Created Date', width: 16, type: 'string', allowSorting: false, allowFiltering: false },
            { field:'IsFavorite',headerText: '', width: 8, template: actionTemplate, allowSorting: false, allowFiltering: false }
        ]
    });

    attributeGrid.appendTo("#AllSitesGrid");   
}

function scrollBar() { 
    var scrollBars = document.getElementsByClassName("e-content");
    for (var i = 0; i < scrollBars.length; i++) {
        scrollBars[i].style.display = 'absolute';
        scrollBars[i].style.overflowX = 'auto';
        scrollBars[i].style.maxHeight = '45vh';
    }
}

$(document).on("click", "#sorting-sites input[type='radio']", function () {
    var gridObj = document.getElementById("AllSitesGrid").ej2_instances[0];
    var sorting = $("input[name='order-by-sites']:checked").val();
    if (gridObj != undefined) {
        attributeGrid.sortColumn('TenantName', sorting, true);
        gridObj.refresh();
    }
});
$(document).on("click", "#sorting-favorites input[type='radio']", function () {
    var gridObj = document.getElementById("FavoriteGrid").ej2_instances[0];
    var sorting = $("input[name='order-by-favorite']:checked").val();
    if (gridObj != undefined) {
        FavoriteGrids.sortColumn('TenantName', sorting, true);
        gridObj.refresh();
    }
});
function favoriteButtonTemplate(data, tenantInfoId, userId) {
    if (data) {
        return `<button  class="favorite-button toggle-button-favorite" data-isFavorite="${data}" data-tenantid="${tenantInfoId}" data-userid="${userId}"><i class="su su-favorite-fill"></i></button>`;
    } else {
        return `<button  class="favorite-button toggle-button-favorite" data-isFavorite="${data}" data-tenantid="${tenantInfoId}" data-userid="${userId}"><i class="su su-favorite"></i></button>`;
    }
}
function showAppropriateTab() {

    if ($("#all-sites-container").is(":visible")) {
        if (location.href.match(/favorites/)) {
            $("#favorite-sites-tab").tab("show");
            $("#all-sites").hide();
            var query = (window.location.search).toString();
            if (query != "?view=favorites") {
                history.pushState(null, '', '?view=favorites');
            }
        }
        else {
            $("#all-sites-tab").tab("show");
            $("#favorites").hide();
            var query = (window.location.search).toString();
            if (query != "?view=all-sites") {
                history.pushState(null, '', '?view=all-sites');
            }
           
        }
    }
}
function initializeFavoriteGrid() {

    if (document.getElementById('FavoriteGrid').ej2_instances == null) {
        var searchQuery = window.location.href.slice(window.location.href.indexOf('?') + 1).split('=');
        if (searchQuery[0] == "searchKey") {
            $("#search-tenants-favorite").val(searchQuery[1]);
        }
        else {

            $("#search-tenants-favorite").val();
        }
        var data = new ejs.data.DataManager({
            url: TenantFavoriteListurl + "?userId=" + userId,
            adaptor: new ejs.data.UrlAdaptor()
        });
        FavoriteGrids = new ej.grids.Grid({
            dataSource: data,
            gridLines: 'Default',
            allowSorting: true,
            allowSearching: false,
            allowPaging: true,
            allowSelection: true,
            allowFiltering: false,
            load: fnOnSitesGridLoad,
            actionBegin: fnOnSitesGridActionBegin,
            pageSettings: { pageSize: 10 },
            dataBound: function (args) {
                $('[data-toggle="tooltip"]').tooltip(
                    {
                        container: '#FavoriteGrid'
                    });
            },
            columns: [

                { width: 5, template: '${favoriteButtonTemplate(IsFavorite, Id, UserId)}', clipMode: 'Clip' },
                { field: 'TenantName', template: '#application-name-template', headerText: 'Site Name', width: 17, allowSorting: true, allowFiltering: false, clipMode: 'EllipsisWithTooltip' },
                { field: 'TenantType', template: '#application-tenant-template', headerText: 'Type', width: 9, allowSorting: false, allowFiltering: false },
                { field: 'SiteUrl', headerText: 'URL', width: 30, allowSorting: false, allowFiltering: false },
                { field: 'CreatedDateString', headerText: 'Created Date', width: 16, allowSorting: false, allowFiltering: false },
                { field: 'IsFavorite', headerText: '', width: 8, template: '<div class="open-link"><a href="${SiteUrl}" target="_blank">Open</a></div>' }
            ]
        });

        FavoriteGrids.appendTo("#FavoriteGrid");
    }
}

function initializeTooltip() {
    var tooltip = new ej.popups.Tooltip({
        target: ".grid-content",
        position: 'TopCenter',
        beforeRender: beforeRender
    }, "#grid-tooltip");

    function beforeRender(args) {
        tooltip.content = args.target.closest("td").innerText;
    }
}

function handleTabClicks() {
    $("a[data-toggle='tab']").on('click', function (e) {
        if ($(this).attr("id") == "favorite-sites-tab") {
            $("#favorites").show();
            $("#all-sites").hide();
            var query = (window.location.search).toString();
            if (query != "?view=favorites") {
                history.pushState(null, '', '?view=favorites');
            }

            var searchQuery = window.location.href.slice(window.location.href.indexOf('?') + 1).split('=');
            if (searchQuery[0] == "searchKey") {
                $("#search-tenants-favorite").val(searchQuery[1]);
            }
            else {

                $("#search-tenants-favorite").val();
            }
            $("#search-tenants-allsites").val('');
            $(".close-icon").css("display", "none");
            $(".search-allsites").css("display", "block");
            $("#sorting-sites").hide();
            $("#sorting-favorites").show();
            $("#sorting-options-favorites").hide();
            var gridObj = document.getElementById("FavoriteGrid").ej2_instances[0];
            resizing(gridObj);
            gridObj.datasource = new ej.data.DataManager({ url: TenantFavoriteListurl + "?userId=" + userId, adaptor: new ej.data.UrlAdaptor() });
            gridObj.refresh();
           
            $(".searchAll-sites").hide();
            $(".searchFavorite-sites").show();
            $("#search-tenants-favorite").val();
            
            $("#search-tenants-favorite").hide();
        }
        else if ($(this).attr("id") == "all-sites-tab") {
            $("#all-sites").show();
            $("#favorites").hide();
            var query = (window.location.search).toString();
            if (query != "?view=all-sites") {
                history.pushState(null, '', '?view=all-sites');
            }
            $("#search-tenants-favorite").val('');
            $(".close-icon").css("display", "none");
            $(".search-favorite").css("display", "block");
            $("#sorting-sites").show();
            $("#sorting-favorites").hide();
            $("#sorting-options-sites").hide();
            var gridObj = document.getElementById("AllSitesGrid").ej2_instances[0];
            resizing(gridObj);
            gridObj.datasource = new ej.data.DataManager({ url: TenantSites + "?userId=" + userId, adaptor: new ej.data.UrlAdaptor() });
            gridObj.refresh();
            $(".searchFavorite-sites").hide();
            $(".searchAll-sites").show();
            $("#search-tenants-allsites").val();
            
            $("#search-tenants-allsites").hide();

        }
    });
}
function resizing(gridObj) {
    if (gridObj != null) {

        if (window.innerWidth > 995 && window.innerWidth < 1280) {
            gridObj.showHider.hide('Created Date', 'headerText');
        }
        else if (window.innerWidth > 741 && window.innerWidth < 995) {
            gridObj.showHider.hide('URL', 'headerText');
            gridObj.showHider.hide('Created Date', 'headerText');
        }
        else if (window.innerWidth > 600 && window.innerWidth < 740) {
            gridObj.showHider.hide('URL', 'headerText');
            gridObj.showHider.hide('Created Date', 'headerText');
        }
        else if (window.innerWidth < 600) {
            gridObj.showHider.hide('URL', 'headerText');
            gridObj.showHider.hide('Created Date', 'headerText');
            gridObj.showHider.hide('TenantType', 'field');
        }
        else {
            gridObj.showHider.show('URL', 'headerText');
            gridObj.showHider.show('Created Date', 'headerText');
            gridObj.showHider.show('TenantType', 'field');
        }
    }
}
function fnOnSitesGridLoad() {
    isFirstRequest = true;
    var searchValue;
    if ($("#all-sites-tab").parent().hasClass("active")) {
        searchValue = $("#search-tenants-allsites").val();
    } else {
        searchValue = $("#search-tenants-favorite").val();
    }

    if (this.properties.query.params.length > 0) {
        this.properties.query.params = [];
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    } else {
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
}

function rowBound() {
    if (isFirstRequest) {
        isFirstRequest = false;
    }
}

function fnOnSitesGridActionBegin(args) {
    isFirstRequest = true;
    var searchValue;
    if ($("#all-sites-tab").parent().hasClass("active")) {
        searchValue = $("#search-tenants-allsites").val();
    } else {
        searchValue = $("#search-tenants-favorite").val();
    }

    if (this.properties.query.params.length > 0) {
        this.properties.query.params = [];
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    } else {
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
}

$(document).on("click", ".search-allsites", function () {
    var gridObj = document.getElementById('AllSitesGrid').ej2_instances[0];
    gridObj.pageSettings.currentPage = 1;
    gridObj.refresh();
});

$(document).on("click", ".search-favorite", function () {
    var gridObj = document.getElementById('FavoriteGrid').ej2_instances[0];
    gridObj.pageSettings.currentPage = 1;
    gridObj.refresh();
});

function handleLogoError() {
    $('#boldbi-logo').on("error", function () {
        $(this).attr("src", defaultErrorImageSrc);
    });
}



