$(document).ready(function () {

    var tooltip = new ej.popups.Tooltip({
        target: ".grid-content",
        position: 'TopCenter',
        beforeRender: beforeRender
    }, "#grid-tooltip");

    var attributeGrid = new ejs.grids.Grid({
        dataSource: null,
        gridLines: 'None',
        allowSorting: true,
        allowSearching: false,
        allowPaging: true,
        allowSelection: true,
        allowFiltering: false,
        pageSettings: { pageSize: 10 },
        enableHover: true,
        enableAltRow: false,
        dataBound: function (args) {
        },
        columns: [
            { field: 'Name', template: "#attribute-name-template", headerText: window.Server.App.LocalizationContent.Name, width: 40, allowSorting: true, allowFiltering: true },
            { field: 'Value', template: "#attribute-value-template", headerText: window.Server.App.LocalizationContent.Value, width: 60, allowSorting: true, allowFiltering: true },
            { field: 'Description', template: "#attribute-description-template", headerText: window.Server.App.LocalizationContent.Description, width: 50, allowSorting: true, allowFiltering: true },
            { field: 'ModifiedDateString', headerText: window.Server.App.LocalizationContent.LastModified, width: 40, allowSorting: true, allowFiltering: false },
            { field: 'Options', headerText: '', template: "#options", width: 20, allowSorting: false, allowFiltering: false }
        ]
    });
    attributeGrid.appendTo("#UsersAttributesGrid");
    if (typeof (userAttributesUrl) != "undefined") {
        $.ajax({
            type: "GET",
            url: userAttributesUrl,
            data: { userId: userId },
            success: function (result) {
                if (result.Status) {
                    var userAttributesGrid = document.getElementById('UsersAttributesGrid').ej2_instances[0];
                    userAttributesGrid.dataSource = result.Attributes;
                }
                hideWaitingPopup("UsersAttributesGrid");
            }
        });
    }

    function beforeRender(args) {
        tooltip.content = args.target.closest("td").innerText;
    }
});