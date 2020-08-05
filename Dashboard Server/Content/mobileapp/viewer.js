var viewerScripts = [];
var viewerStyles = [];
var isSydjViewer = true;
var ejViewerType = "ejDashboardDesigner";
var dashboardDesignerUrl = "";
var isDefaultViewMarked = false;
window.onload = function () {
	isSydjViewer = !itemLocation.endsWith(".sydx");
	if(!isSydjViewer){
		ejViewerType = "ejDashboardViewer";
		viewerScripts = [
			"dashboardservice/v1/scripts/ej.dashboardViewer.web.all.min.js",
			"dashboardservice/v1/scripts/ej.dashboardviewer.all.min.js"
		];

		viewerStyles = [
			"dashboardservice/v1/themes/default-theme/ej.dashboardviewer.all.min.css"
		];
	}
	else{
		ejViewerType = "ejDashboardDesigner";
		if(typeof(designerServiceUrl) == "undefined"){
			try {
				$.get(serverUrl + "/api/system-settings/get-url" , function(data, status){
					dashboardDesignerUrl = data.Data.DesignerServerUrl;				
				});
			}
			catch(err){
				dashboardDesignerUrl = "https://data.syncfusion.io";
			}
		}
		else {
			dashboardDesignerUrl = designerServiceUrl;
		}
		
        viewerScripts = [
            "dashboardservice/v2/scripts/designerlocalization.js",
			"dashboardservice/v2/scripts/jsrender.min.js",
			"dashboardservice/v2/scripts/ej1.common.all.min.js",
			"dashboardservice/v2/scripts/ej2.common.all.min.js",
			"dashboardservice/v2/scripts/ej.dashboarddesigner.min.js"
		];

		viewerStyles = [
			"dashboardservice/v2/themes/ej.designerfont.min.css",
			"dashboardservice/v2/themes/ej1.web.all.min.css",
			"dashboardservice/v2/themes/ej2.partone.web.all.min.css",
			"dashboardservice/v2/themes/ej2.parttwo.web.all.min.css",
			"dashboardservice/v2/themes/ej.designerwidgets.all.min.css",
			"dashboardservice/v2/themes/ej.dashboarddesigner.min.css"
		];
	}
	
	loadScripts();
	loadStyles();
};

function loadScripts(){
	if(viewerScripts.length==0){
		if(!isSydjViewer){
			generateReportV1();
		}
		else {
            $.ajax({
                type: "GET",
                url: serverApiUrl + "/V4/dashboards/filter-parameter/" + itemId,
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "bearer " + accessToken,
                },
                success: function (data) {
                    isDefaultViewMarked = data.IsDefaultView;
                    generateReportV2(data);
                },
                error: function () {
                    generateReportV2(filterParameters);
                }
            });
		}
		
		return;
	}
	var currentUrl = viewerScripts.shift();
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = currentUrl;
	script.onload = loadScripts;
	head.appendChild(script);
}

function loadStyles(){
	for (var cssFile = 0; cssFile < viewerStyles.length; cssFile++) {
		var fileref=document.createElement("link")
		fileref.setAttribute("rel", "stylesheet")
		fileref.setAttribute("type", "text/css")
		fileref.setAttribute("href", viewerStyles[cssFile])
		document.getElementsByTagName("head")[0].appendChild(fileref)
	}
}

function generateReportV2(data) {
	if (dashboardDesignerUrl == "") {
		return setTimeout(generateReportV2, 50);
	}
	
	$('#dashboard').empty();	
	 $('#dashboard').ejDashboardDesigner({
		serviceUrl: dashboardDesignerUrl,
		dataServiceUrl: dashboardDesignerUrl,
		serverUrl: serverApiUrl,
		mode: ej.dashboardDesigner.mode.view,
		itemId: itemId,
		dashboardPath: itemId + "/" + version,
		dashboardName: reportName,
		dashboardDescription: reportDescription,
		serviceAuthorizationToken: accessToken,
		showGetLinkIcon: false,
		viewerSettings: {      
			serviceUrl: serviceUrl 
         },
        filterParameters: (data != null && typeof (data.QueryString) != "undefined") ? decodeURI(data.QueryString) : data,
		enableExport: true,
		enablePrint: false,
		enableFilterOverview: true,
		_isPublic: isPublic,
		actionComplete: "OnActionComplete",
		favoriteSettings: {
			enabled: false
		},
		filterOverviewSettings: {
			showSaveIcon: true,
			showSaveAsIcon: true,
			showViewSavedFilterIcon:false,
		},

		_onSaveFilter: "onSaveFilterAction",
		_onSaveAsFilter: "onSaveAsFilterAction",
		_onViewSavedFilters: "openViewSection",
		onBannerIconClick: "onBannerIconClick",		
        cdnPath: "dashboardservice\\v2\\scripts\\"
    });

    if (isDefaultViewMarked) {
        var result = $('#dashboard').data(ejViewerType);
        result.model.filterOverviewSettings.viewName = data.ViewName;
        result.model.filterOverviewSettings.viewId = data.ViewId;
    } 
}

 function generateReportV1() {
	$('#dashboard').empty();
	$("#dashboard").ejDashboardViewer({
		accessToken: accessToken,
		serviceUrl: serviceUrl,
		serverUrl: serverUrl,
		dashboardPath: itemId + '/' +version,
		reportName: reportName,
		reportDescription: reportDescription,
		filterParameters: filterParameters,
		enableExport: true,
		enablePrint: false,
		enableFilterOverview: true,
		_isPublic: isPublic,
		_itemId: itemId,
		allowCommenting: false,
		actionComplete: "OnActionComplete",
		favoriteSettings: {
			enabled: false
		},

		filterPanelSettings: {
			showIcon: false,
			showHeader: false,
			filterPanelId: "filter-panel"
		},

		filterOverviewSettings: {
			showSaveIcon: true,
			showSaveAsIcon: true,
			showViewSavedFilterIcon:false,
		},

		onSaveFilter: "onSaveFilterAction",
		onSaveAsFilter: "onSaveAsFilterAction",
		onViewSavedFilters: "openViewSection",
		beforeLayoutRender: "resetViewPanel",
		tabActive: "resetViewPanel",
		_baseUrl: dashboardUrl
	});
}


$(window).resize(function () {
	var data = $("#dashboard").data(ejViewerType);
	data.resizeDashboard();
});

function OpenFilterPanel() {
	$('.e-ddl-popup').hide();
	$('#dashboard').click();
	$('#filter-panel').show();
	$('#dashboard').hide();
	var dashboardObj = $('#dashboard').data(ejViewerType);
	if (dashboardObj.hasFilterPanel == true) {
		$("#filter-panel #validation-message").hide();
		dashboardObj.openFilterPanel();
	} else {
		$("#filter-panel #validation-message").show();
		if(typeof(dashboardObj.closeFilterPanel) != "undefined"){
			dashboardObj.closeFilterPanel();
		}
	}
}

function CloseAllWindows() {
	$('#filter-panel').hide();
	$('#dashboard').show();
	var data = $('#dashboard').data(ejViewerType);
	data.closeAllWindows();
	if(typeof(data.closeFilterPanel) != "undefined"){
		data.closeFilterPanel();
	}
}

function OnActionComplete(args) {
	if (args.eventType === "maximizeDialogOpen" || args.eventType === "exportDialogOpen" || args.eventType === "filterOverViewOpen" || args.eventType === "informationOpen" || args.eventType === "getLinkDialogOpen")
	{
		try {
			var data = {
				Action: "HideBackButton",
				Data: JSON.stringify(args.eventType)
			}
			invokeCSharpAction(JSON.stringify(data));
		}
		catch (err)
		{ }
	}
	else if (args.eventType === "maximizeDialogClose" || args.eventType === "exportDialogClose" || args.eventType === "filterOverViewClose" || args.eventType === "informationClose" || args.eventType === "exportCompleted" || args.eventType === "clearAllFilter" || args.eventType === "clearIndividualFilter" || args.eventType == "getLinkDialogClose") {
		try {
			var data = {
				Action: "ShowBackButton",
				Data: JSON.stringify(args.eventType)
			}
			invokeCSharpAction(JSON.stringify(data));
		}
		catch (err)
		{ }
    }
    else if (args.eventType === "interactionCompleted" && !isDefaultViewMarked) {
        var widgetFilterQuery = args.source.data.encryptedData;
        var filterRequest = { ItemId: itemId, QueryString: widgetFilterQuery };

        $.ajax({
            type: "POST",
            url: serverApiUrl + "/V4/dashboards/views/autosave",
            headers: {
                "Content-type": "application/json",
                "Authorization": "bearer " + accessToken,
            },
            data: JSON.stringify(filterRequest)
        });
    }
}

function ApplyView(filterQuery) {
	$("#dashboard").data(ejViewerType).option("filterParameters", filterQuery);
}

function onSaveFilterAction(args) {
	try {
		var data = {
			Action: "saveView",
			Data: JSON.stringify(args)
		}
		invokeCSharpAction(JSON.stringify(data));
	} catch (err) {  }
}

function onSaveAsFilterAction(args) {
	try {
		var data = {
			Action: "saveViewAs",
			Data: JSON.stringify(args)
		}
		invokeCSharpAction(JSON.stringify(data));
	} catch (err) { }
}

function DecryptFilterParameter(queryString) {
	var viewerObj = $("#dashboard").data(ejViewerType);
	if (viewerObj) {
		return JSON.stringify(viewerObj._parseParameterQuery(queryString));
	}
	return "";
}

function ClearFilterOverView(id) {
	var data = $('#dashboard').data(ejViewerType);
	if (data.model.filterOverviewSettings.viewId === id) {
		data.model.filterOverviewSettings.viewName = null;
		data.model.filterOverviewSettings.viewId = null;
	} 
}

function resetViewPanel(args) {
	try {
		var data = {
			Action: "resetViewPanel",
			Data: JSON.stringify(args)
		}
		invokeCSharpAction(JSON.stringify(data));
	} catch (err) { }
	$('#dashboard').data(ejViewerType).model.filterOverviewSettings.viewName = null;
	$('#dashboard').data(ejViewerType).model.filterOverviewSettings.viewId = null;
}

function GetCurrentDashboardGuid() {
	return JSON.stringify($("#dashboard").data(ejViewerType)._getCurrentDashboardGuid());
}

function onBannerIconClick(arg) {
	var dashboardViewerInstance = $("#dashboard").data(ejViewerType);
	if (typeof (arg.name) != "undefined") {
		switch (arg.name.toLowerCase()) {
			case "link":
					var dashboardLink = dashboardUrl;
					var dashboardViewerObj = $("#dashboard").data(ejViewerType);
					var filterObj = dashboardViewerObj.getCurrentFilters();
					if (filterObj != null && filterObj.isInitialFilter != null && !filterObj.isInitialFilter) {
						dashboardLink += "?" + filterObj.encryptedData;
					}
					$(".link-field").val(dashboardLink);
					$(".get-link-popup").show();
                break;
            case "theming":
				dashboardViewerInstance.applyDashboardTheme(arg.selectedTheme);
                break;
			default:
				break;
		}
	}
}

$(document).on("click", ".copy-link-btn", function () {
	$(".link-field").select();
	document.execCommand("copy");
});

$(document).on("click", ".close-get-link", function () {
	$(".get-link-popup").hide();
});