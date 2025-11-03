var isFirstRequest = false;
var attributeGrid;
var FavoriteGrids;
var skipAll = 0;
var take = Math.ceil((window.innerHeight -180) / 150) * 3;
var totalRecordsAll = 0;
var skipFavorite = 0;
var totalRecordsFavorite = 0;
var skeletonWrapper;
var skeletonCard;
var onScroll= true;
var innerCard;
var fetchCard= false;
$(document).ready(function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    $("#card-loading").hide();
    $(".inner-card ").hide();
    $(".close-icon").css("display", "none");
    $("#search-tenants-allsites").hide();
    $(".searchFavorite-sites").hide();
    $("#sorting-options-sites").hide();
    $("#sorting-favorites").hide();
    $('#grid-view-button').addClass('active');
    $('#favorite-sites-tile').hide();
    $("#all-sites-tile").hide();
   
    
    if (viewCookie === '' || viewCookie === 'true') {
        onScroll=true;
        $('#card-view-button').addClass('active');
        $('#grid-view-button').removeClass('active');
        $('#AllSitesGrid').hide();
        $('#FavoriteGrid').hide();
        $('#favorite-sites-tile').show();
        $("#all-sites-tile").show();
    } else  {
        onScroll=false;
        $('#grid-view-button').addClass('active');
        $('#card-view-button').removeClass('active');
        $('#favorite-sites-tile').hide();
        $("#all-sites-tile").hide();
        $('#AllSitesGrid').show();
        $('#FavoriteGrid').show();
    }
    resizeContainer();
    initializePage();
    $('#grid-view-button').on('click', function () {
        if (!$(this).hasClass('active')) {
            $('#all-sites-container').scrollTop(0);
            $('#grid-view-button').addClass('active');
            $('#card-view-button').removeClass('active');
            $('#favorite-sites-tile').hide();
            $("#all-sites-tile").hide();
            $('#AllSitesGrid').show();
            $('#FavoriteGrid').show();
            SetHttpOnlyCookie("home_card_view", false, 7);
            if ($("#all-sites-tab").parent().hasClass("active")) {
                var gridObj = document.getElementById('AllSitesGrid').ej2_instances[0];
                gridObj.pageSettings.currentPage = 1;
                gridObj.refresh();
            }
            else{
                var gridObj = document.getElementById('FavoriteGrid').ej2_instances[0];
                gridObj.pageSettings.currentPage = 1;
                gridObj.refresh();
            }
        }
    });
    $('#card-view-button').on('click', function () {
        onScroll=true;
        if (!$(this).hasClass('active')) {
            $('#all-sites-container').scrollTop(0);
            $('#card-view-button').addClass('active');
            $('#grid-view-button').removeClass('active');
            $('#AllSitesGrid').hide();
            $('#FavoriteGrid').hide();
            if ($("#all-sites-tab").parent().hasClass("active"))
            {
                $('#search-tenants-allsites').show();
                $('#search-tenants-favorite').hide();
                skipAll = 0;
                $("#tenant-cards-container-all").empty();
                loadTenantCards(TenantSites + "?userId=" + userId, skipAll, take);
                $("#all-sites-tile").show();
            }
            else{
                $('#search-tenants-allsites').hide();
                $('#search-tenants-favorite').show();
                skipFavorite = 0;
                $("#tenant-cards-container-favorite").empty();
                loadFavoriteCards(TenantFavoriteListurl + "?userId=" + userId, skipFavorite, take);
                $('#favorite-sites-tile').show();
            }
            SetHttpOnlyCookie("home_card_view", true, 7);
        }
    });

    document.getElementById('body-container').addEventListener('scroll', function() {
        var container = document.getElementById('body-container');
        var scrollHeight = container.scrollHeight;
        var scrollTop = container.scrollTop;
        var containerHeight = container.clientHeight;
        var middleScrollThreshold = scrollHeight / 2;
        onScroll= false;
        $(".no-records").hide();

        if(!fetchCard) {
            if ($('#tenant-cards-container-all').is(':visible')) {
                if (scrollTop + containerHeight >= scrollHeight - 50) {
                    if (skipAll + take < totalRecordsAll) {
                        skipAll += take;
                        $(".inner-card ").show();
                        loadTenantCards(TenantSites + "?userId=" + userId, skipAll, take);
                    }
                }
            } else if ($('#tenant-cards-container-favorite').is(':visible')) {
                if (scrollTop + containerHeight >= scrollHeight - 50) {
                    if (skipFavorite + take < totalRecordsFavorite) {
                        skipFavorite += take;
                        $(".inner-card ").show();
                        loadFavoriteCards(TenantFavoriteListurl + "?userId=" + userId, skipFavorite, take);
                    }
                }
            }
        }
    });

});
function resizeContainer(){
    skipAll=0;
    skipFavorite=0;
    take=0;
    skeletonWrapper = document.querySelector('.skeleton-wrapper');
    skeletonCard = document.querySelector('.skeleton-card');
    innerCard =document.querySelector('.inner-card');
    $('.skeleton-wrapper').empty();
    $('.inner-card').empty();
    if(window.innerWidth< 650) {
        take = Math.ceil((window.innerHeight -170) / 200) ;
        cardGenerate(1);
    }else  if(window.innerWidth > 651 && window.innerWidth < 1080){
        take = Math.ceil((window.innerHeight -170) / 200) * 2;
        cardGenerate(3);
    }else  if(window.innerWidth > 1081 && window.innerWidth < 1700){
        take = Math.ceil((window.innerHeight -170) / 200) * 3;
        cardGenerate(5);
    }else{
        take = Math.ceil((window.innerHeight -170) / 200) * 4;
        cardGenerate(7);
    }

}
function initializePage() {
    var currentUrl = window.location.search;
    var isFavoriteTab = (currentUrl == "?view=favorites");
    generateProfileAvatar();
    addPlacehoder("#search-area-sites");
    addPlacehoder("#search-area");
    showSiteDownAlert();
    createAndAppendAttributeGrid();
    showAppropriateTab();
    initializeFavoriteGrid();
    initializeTooltip();
    handleTabClicks(isFavoriteTab);
    handleLogoError();
    activeTab();
   
    if ($('#card-view-button').hasClass('active')) {
        onScroll = true;
        loadTenantCards(TenantSites + "?userId=" + userId, skipAll, take);
        loadFavoriteCards(TenantFavoriteListurl + "?userId=" + userId, skipFavorite, take);
    }
    
    $(window).on("resize", function () {
       resizeContainer();
        activeTab();
    });
    $(document).on("click", ".e-row", function () {
        if (window.innerWidth < 730) {
            var actionLink = $(this).find('.open-link a').attr('href');
            window.open(actionLink, '_blank');
        }
    });

    $(document).on('click', '.tenant-card', function (event) {
        if (!$(event.target).is('a')) {
            var siteUrl = $(this).find('.sites-card a').attr('href');
            window.open(siteUrl, '_blank');
        }
    });
}
function cardGenerate(n)
{
    for (let i = 0; i <= n; i++) {
        var clone = skeletonCard.cloneNode(true);
        skeletonWrapper.appendChild(clone);
    }
    for (let i = 0; i <=n; i++) {
        var innerClone = skeletonCard.cloneNode(true);
        innerCard.appendChild(innerClone);
    }
    
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
    $("#search-tenants-allsites").closest("li").addClass("active");
    $("#search-tenants-allsites").show();
    $(".search-icon").addClass("no-border");
});
$(document).on('click', '.search-favorite', function () {
    $("#search-tenants-favorite").closest("li").addClass("active");
    $("#search-tenants-favorite").show();
    $(".search-icon").addClass("no-border");

});

$(document).on("click", "#sort-site-button", function () {
    $("#sorting-options-sites").toggle();
});
$(document).on("click", "#sort-favorite-button", function () {
    $("#sorting-options-favorites").toggle();
});
$(document).on("click", ".close-favorite", function () {
    $(".close-icon").css("display", "none");
    $(".search-favorite").css("display","block");
    if ($('#card-view-button').hasClass('active')) {
        skipFavorite = 0;
        $("#tenant-cards-container-favorite").empty();
        loadFavoriteCards(TenantFavoriteListurl + "?userId=" + userId, skipFavorite, take);
    }
});
$(document).on("click", ".close-allSites", function () {
    if ($('#card-view-button').hasClass('active')) {
        skipAll = 0;
        $("#tenant-cards-container-all").empty();
        loadTenantCards(TenantSites + "?userId=" + userId, skipAll, take);
    }
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
    var isFavorite = $button.attr('data-isFavorite') === 'true';
    isFavorite = !isFavorite;
    $button.attr('data-isFavorite', isFavorite);
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
        data: { userId, UpdateFavorite },
        success: function (result) {
            if (result.Status) {
                if ($("#all-sites-tab").parent().hasClass("active")) {
                    if (isFavorite) {
                        $icon.removeClass('su-favorite').addClass('su-favorite-fill');
                        $(".no-records").hide();
                    } else {
                        $icon.removeClass('su-favorite-fill').addClass('su-favorite');
                    }
                    var gridObj = document.getElementById("AllSitesGrid").ej2_instances[0];
                    var siteData = new ej.data.DataManager({ url: TenantSites + "?userId=" + userId, adaptor: new ej.data.UrlAdaptor() });
                    gridObj.dataSource = siteData;
                } else {
                    $icon.removeClass('su-favorite-fill').addClass('su-favorite');
                    $button.closest('.tenant-card').remove();
                    if ($("#tenant-cards-container-favorite").children().length === 0) {
                        $(".no-records").show();
                    }
                    var gridObj = document.getElementById("FavoriteGrid").ej2_instances[0];
                    var siteData = new ej.data.DataManager({ url: TenantFavoriteListurl + "?userId=" + userId, adaptor: new ej.data.UrlAdaptor() });
                    gridObj.dataSource = siteData;
                }
            }
        }
    });
});

$(document).on('keyup', '#search-tenants-allsites', function () {
    if ($('#card-view-button').hasClass('active')) {
        skipAll = 0;
        $("#tenant-cards-container-all").empty();
        loadTenantCards(TenantSites + "?userId=" + userId, skipAll, take);
    }
});
$(document).on('keyup', '#search-tenants-favorite', function () {
    if ($('#card-view-button').hasClass('active')) {
        skipFavorite = 0;
        $("#tenant-cards-container-favorite").empty();
        loadFavoriteCards(TenantFavoriteListurl + "?userId=" + userId, skipFavorite, take);
    }
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
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl, {
                    boundary: document.getElementById('AllSitesGrid')
                });
            });
        },
        columns: [
            { width: 5, template: '${favoriteButtonTemplate(IsFavorite, Id, UserId)}', clipMode: 'Clip' },
            { field: 'TenantName', template: '#application-name-template',headerText: window.Server.App.LocalizationContent.SiteName, width: 17, allowSorting: true, allowFiltering: false, clipMode: 'EllipsisWithTooltip' },
            { field: 'TenantType', template: '#application-tenant-template', headerText: window.Server.App.LocalizationContent.TenantType , width: 9, allowSorting: false, allowFiltering: false },
            { field: 'SiteUrl', template:'#application-url-template', width: 30,allowSorting:false, allowFiltering: false },
            { field: 'CreatedDateString', headerText: window.Server.App.LocalizationContent.CreatedDate, width: 16, type: 'string', allowSorting: false, allowFiltering: false },
            { field:'IsFavorite',headerText: '', width: 8, template: actionTemplate, allowSorting: false, allowFiltering: false }
        ]
    });

    attributeGrid.appendTo("#AllSitesGrid");   
}
$(document).on("click", "#sorting-sites input[type='radio']", function () {
    var gridObj = document.getElementById("AllSitesGrid").ej2_instances[0];
    var sorting = $("input[name='order-by-sites']:checked").val();
    if (gridObj != undefined) {
        attributeGrid.sortColumn('TenantName', sorting, true);
        gridObj.refresh();
    }
    if ($('#card-view-button').hasClass('active')) {
        skipAll = 0;
        $("#tenant-cards-container-all").empty();
        loadTenantCards(TenantSites + "?userId=" + userId, skipAll, take);
    }
});
$(document).on("click", "#sorting-favorites input[type='radio']", function () {
    var gridObj = document.getElementById("FavoriteGrid").ej2_instances[0];
    var sorting = $("input[name='order-by-favorite']:checked").val();
    if (gridObj != undefined) {
        FavoriteGrids.sortColumn('TenantName', sorting, true);
        gridObj.refresh();
    }
    if ($('#card-view-button').hasClass('active')) {
        skipFavorite = 0;
        $("#tenant-cards-container-favorite").empty();
        loadFavoriteCards(TenantFavoriteListurl + "?userId=" + userId, skipFavorite, take);
    }
});
function favoriteButtonTemplate(data, tenantInfoId, userId) {
    if (data) {
        return `<button  class="favorite-button  toggle-button-favorite" data-isFavorite="${data}" data-tenantid="${tenantInfoId}" data-userid="${userId}"><i class="su su-favorite-fill"></i></button>`;
    } else {
        return `<button  class="favorite-button  toggle-button-favorite" data-isFavorite="${data}" data-tenantid="${tenantInfoId}" data-userid="${userId}"><i class="su su-favorite"></i></button>`;
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
                var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
                var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                    return new bootstrap.Tooltip(tooltipTriggerEl, {
                        boundary: document.getElementById('FavoriteGrid')
                    });
                });
            },
            columns: [

                { width: 5, template: '${favoriteButtonTemplate(IsFavorite, Id, UserId)}', clipMode: 'Clip' },
                { field: 'TenantName', template: '#application-name-template', headerText:  window.Server.App.LocalizationContent.SiteName , width: 17, allowSorting: true, allowFiltering: false, clipMode: 'EllipsisWithTooltip' },
                { field: 'TenantType', template: '#application-tenant-template', headerText:  window.Server.App.LocalizationContent.TenantType, width: 9, allowSorting: false, allowFiltering: false },
                { field: 'SiteUrl', template: '#application-url-template', width: 30, allowSorting: false, allowFiltering: false },
                { field: 'CreatedDateString', headerText:  window.Server.App.LocalizationContent.CreatedDate , width: 16, allowSorting: false, allowFiltering: false },
                { field: 'IsFavorite', headerText: '', width: 8, template: '<div class="open-link"><a href="${SiteUrl}" target="_blank">Open</a></div>' }
            ]
        });
        FavoriteGrids.appendTo("#FavoriteGrid");
    }
}

function loadTenantCards(baseUrl, skip, take) {
    var searchValue = $("#search-tenants-allsites").val().trim();
    var sorting = $("input[name='order-by-sites']:checked").val();
    var url = `${baseUrl}&sort=${sorting}&searchValue=${searchValue}&skip=${skip}&take=${take}`;
    if(onScroll) {
        $("#card-loading").show();
    }
    fetchCard=true;
    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",
        success: function (response) {
            $("#card-loading").hide();
            $(".inner-card ").hide();
            onScroll=true;
            if (response && response.result) {
                var allTenants = response.result;
                totalRecordsAll = response.count || totalRecordsAll;
                var allSitesContainer = $("#tenant-cards-container-all");
                var innerResponse = $("#all-sites-tile");
                if (skip === 0) {
                    allSitesContainer.empty();
                }
                if ($("#all-sites-tab").parent().hasClass("active")) {
                    if (allTenants.length === 0) {
                        $(".no-records").show();
                        return;
                    }
                }
                
                $(".no-records").hide();
                allTenants.forEach(function (tenant) {
                    var useCustomBranding = tenant.UseCustomBranding;
                    var brandingHtml = useCustomBranding
                        ? `<img id="icon-logo" class="icon-logo-container" alt="Site Logo" loading="lazy" src="@GlobalAppSettings.SystemSettings.LoginLogo">`
                        : `<img id="icon-logo" class="icon-logo" alt="Site Logo" loading="lazy" src="${tenant.SiteUrl}/get-client-logo?logotype=login&theme=${theme}">`; 
                    
                    var cardHtml = `<div class="tenant-card card">
                                           <div class="icon-container">${brandingHtml}</div>
                                                    <div class="tenant-card-header card-header">
                                                        <div class="card-header-title">${tenant.TenantName}</div>
                                                         <div class="sites-card card-sub-title"> <a class="text-decoration-none" href="${tenant.SiteUrl}" target="_blank" data-toggle="tooltip" title="${tenant.SiteUrl}">${tenant.SiteUrl}</a></div>
                                                           <div class="data-card card-content"> ${tenant.CreatedDateString}</div>
                                                    </div> 
                                                      <div class="fav-card-icon"> ${favoriteButtonTemplate(tenant.IsFavorite, tenant.Id, tenant.UserId)}</div>
                                                </div>`;
                    allSitesContainer.append(cardHtml);
                    fetchCard=false;
                });

                document.querySelectorAll('.icon-logo').forEach(function(img) {
                    img.addEventListener('error', function() {
                        this.src = brokenImageForTiles;
                        this.alt = "Broken Logo";
                    });
                });
            }
        },
        error: function (error) {
            console.error("Error loading tenants:", error);
        }
    });
}
function loadFavoriteCards(baseUrl, skip, take) {
    var searchValue = $("#search-tenants-favorite").val().trim();
    var sorting = $("input[name='order-by-favorite']:checked").val();
    var url = `${baseUrl}&sort=${sorting}&searchValue=${searchValue}&skip=${skip}&take=${take}`;
    if(onScroll) {
        $("#card-loading").show();
    }
    fetchCard=true;
    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",
        success: function (response) {
            $("#card-loading").hide();
            $(".inner-card ").hide();
            onScroll=true;
            if (response && response.result) {
                var allTenants = response.result;
                totalRecordsFavorite = response.count || totalRecordsFavorite;
                var favoriteSitesContainer = $("#tenant-cards-container-favorite");
                if (skip === 0) {
                    favoriteSitesContainer.empty();
                }
                if ($("#favorite-sites-tab").parent().hasClass("active")) {
                    if (allTenants.length === 0) {
                        $(".no-records").show();
                        return;
                    }
                }
                $(".no-records").hide();
                allTenants.forEach(function (tenant) {
                    var useCustomBranding = tenant.UseCustomBranding;
                    var brandingHtml = useCustomBranding
                        ? `<img id="icon-logo" class="icon-logo-container"  alt="Site Logo" loading="lazy" src="@GlobalAppSettings.SystemSettings.LoginLogo">`
                        : `<img id="icon-logo" class="icon-logo"  alt="Site Logo" loading="lazy" src="${tenant.SiteUrl}/get-client-logo?logotype=login&theme=${theme}">`;


                    var cardHtml = `<div class="tenant-card card">
                                           <div class="icon-container">${brandingHtml}</div>
                                                    <div class="tenant-card-header card-header">
                                                        <div class="card-header-title">${tenant.TenantName}</div>
                                                         <div class="sites-card card-sub-title"> <a class="text-decoration-none" href="${tenant.SiteUrl}" target="_blank">${tenant.SiteUrl}</a></div>
                                                           <div class="data-card card-content"> ${tenant.CreatedDateString}</div>
                                                    </div> 
                                                      <div class="fav-card-icon"> ${favoriteButtonTemplate(tenant.IsFavorite, tenant.Id, tenant.UserId)}</div>
                                                </div>`;
                    favoriteSitesContainer.append(cardHtml);
                    fetchCard=false;
                });

                document.querySelectorAll('.icon-logo').forEach(function(img) {
                    img.addEventListener('error', function() {
                        this.src = brokenImageForTiles;
                        this.alt = "Broken Logo";
                    });
                });
            }
        },
        error: function (error) {
            console.error("Error loading tenants:", error);
        }
    });
}
function initializeTooltip() {
    var tooltip = new ej.popups.Tooltip({
        target: ".grid-content",
        position: 'TopCenter',
        beforeRender: beforeRender
    }, "#grid-tooltip");

    function beforeRender(args) {
        const rawContent = args.target.closest("td").innerText;
        const tempDiv = document.createElement('div');
        tempDiv.innerText = rawContent;
        tooltip.content = tempDiv.innerHTML;
    }
}
$(document).on('click',"[data-bs-toggle='tab']", function(){
    var currentUrl = (window.location.search).toString();
    var isFavoriteTab= ($(this).attr("id") == "favorite-sites-tab");
    handleTabClicks(isFavoriteTab);
})
function handleTabClicks(isFavoriteTab) {
    onScroll=false;
    var currentUrl = (window.location.search).toString();
    $("ul.nav.nav-tabs li").removeClass("active");
    if (isFavoriteTab ) {
        $("#favorite-sites-tab").closest("li").addClass("active");
        $("#favorites").show();
        $("#all-sites").hide();
        $(".inner-card ").hide();
        $("#tenant-cards-container-favorite").empty();
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
        $('#all-sites-container').scrollTop(0);
        var gridObj = document.getElementById("FavoriteGrid").ej2_instances[0];
        resizing(gridObj);
        resizeContainer();
        gridObj.datasource = new ej.data.DataManager({ url: TenantFavoriteListurl + "?userId=" + userId, adaptor: new ej.data.UrlAdaptor() });
        gridObj.refresh();
        if ($('#card-view-button').hasClass('active')) {
            onScroll=true;
            skipFavorite=0;
            loadFavoriteCards(TenantFavoriteListurl + "?userId=" + userId, skipFavorite, take);
            $('#favorite-sites-tile').show();
        }
        $(".searchAll-sites").hide();
        $(".searchFavorite-sites").show();
        $("#search-tenants-favorite").val();

        $("#search-tenants-favorite").hide();
    }
    else {
        $("#all-sites-tab").closest("li").addClass("active");
        $("#all-sites").show();
        $("#favorites").hide();
        $(".inner-card ").hide();
        $("#tenant-cards-container-all").empty();
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
        $('#all-sites-container').scrollTop(0);
        var gridObj = document.getElementById("AllSitesGrid").ej2_instances[0];
        resizing(gridObj);
        resizeContainer();
        gridObj.datasource = new ej.data.DataManager({ url: TenantSites + "?userId=" + userId, adaptor: new ej.data.UrlAdaptor() });
        gridObj.refresh();
        if ($('#card-view-button').hasClass('active')) {
            onScroll = true;
            skipAll=0;
            loadTenantCards(TenantSites + "?userId=" + userId, skipAll, take);
            $("#all-sites-tile").show();
        }
        $(".searchFavorite-sites").hide();
        $(".searchAll-sites").show();
        $("#search-tenants-allsites").val();

        $("#search-tenants-allsites").hide();

    }
}
function resizing(gridObj) {
    if (gridObj != null) {

        if (window.innerWidth > 995 && window.innerWidth < 1280) {
            gridObj.showHider.hide('CreatedDateString', 'field');
        }
        else if (window.innerWidth > 741 && window.innerWidth < 995) {
            gridObj.showHider.hide('SiteUrl', 'field');
            gridObj.showHider.hide('CreatedDateString', 'field');
        }
        else if (window.innerWidth > 600 && window.innerWidth < 740) {
            gridObj.showHider.hide('SiteUrl', 'field');
            gridObj.showHider.hide('CreatedDateString', 'field');
        }
        else if (window.innerWidth < 600) {
            gridObj.showHider.hide('SiteUrl', 'field');
            gridObj.showHider.hide('CreatedDateString', 'field');
            gridObj.showHider.hide('TenantType', 'field');
        }
        else {
            gridObj.showHider.show('SiteUrl', 'field');
            gridObj.showHider.show('CreatedDateString', 'field');
            gridObj.showHider.show('TenantType', 'field');
        }
    }
}
function fnOnSitesGridLoad() {
    isFirstRequest = true;
    var searchValue;
    if ($("#all-sites-tab").parent().hasClass("active")) {
        searchValue = $("#search-tenants-allsites").val().trim();
    } else {
        searchValue = $("#search-tenants-favorite").val().trim();
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
        searchValue = $("#search-tenants-allsites").val().trim();
    } else {
        searchValue = $("#search-tenants-favorite").val().trim();
    }

    if (this.properties.query.params.length > 0) {
        this.properties.query.params = [];
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    } else {
        this.properties.query.params.push({ key: "searchKey", value: searchValue });
    }
}

$(document).on("click", ".search-allsites", function () {
    if (!$('#card-view-button').hasClass('active')) {
        var gridObj = document.getElementById('AllSitesGrid').ej2_instances[0];
        gridObj.pageSettings.currentPage = 1;
        gridObj.refresh();
    }
});

$(document).on("click", ".search-favorite", function () {
    if (!$('#card-view-button').hasClass('active')) {
        var gridObj = document.getElementById('FavoriteGrid').ej2_instances[0];
        gridObj.pageSettings.currentPage = 1;
        gridObj.refresh();
    }
});

function handleLogoError() {
    $('#boldbi-logo').on("error", function () {
        $(this).attr("src", defaultErrorImageSrc);
    });
}



