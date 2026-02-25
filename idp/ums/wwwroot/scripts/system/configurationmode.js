$(document).ready(function () {

    $(document).on("click", "#configurationmode", function () {
        ValidateConfigurationMode();
    });
});

function ValidateConfigurationMode() {
    var configurationModeType = getRadioButtonValue('ConfigurationMode');
    window.configurationModeType = configurationModeType;
    if (configurationModeType !== undefined && configurationModeType === "0") {
        $(".startup-waiting-popup").removeClass("storage-page-content");
        $("#system-settings-configuration-mode-container").hide();
        $("#image-parent-container .startup-image").hide().attr("src", serverSetupImageUrl).fadeIn();
        $(".startup-content span.first-content").hide().text(window.Server.App.LocalizationContent.YourSite).slideDown();
        $(".startup-content span.second-content").hide().text(window.Server.App.LocalizationContent.YourSite2 + displayName + " " + window.Server.App.LocalizationContent.SiteLetter).slideDown();
        $(".startup-content span.third-content").hide().text("").slideDown();
        $("#help-link").attr("href", databaseConfigurationUrl);
        $("#system-settings-db-selection-container").show();
        $("#db-content-holder,#db-config-submit").show();
        $("#sql-existing-db-submit, .sql-server-existing-db").hide();
        autoFocus("txt-servername");
        prefillDbNames();
        if (!isBoldBI) {
            hideDataStore();
        }

        var obj = document.getElementById("database-type");
        var dropDownList = obj.ej2_instances[0];
        var itemsList = obj.ej2_instances[0].list.querySelectorAll('.e-list-item');

        dropDownList.value = 'MSSQL';
        
        dropDownList.dataBind();

        itemsList[2].style.display = "none";
        itemsList[3].style.display = "none";
    } else {
        $(".startup-waiting-popup").removeClass("storage-page-content");
        $("#system-settings-configuration-mode-container").hide();
        $("#image-parent-container .startup-image").hide().attr("src", serverSetupImageUrl).fadeIn();
        $(".startup-content span.first-content").hide().text(window.Server.App.LocalizationContent.YourSite).slideDown();
        $(".startup-content span.second-content").hide().text(window.Server.App.LocalizationContent.YourSite2 + displayName + " " + window.Server.App.LocalizationContent.SiteLetter).slideDown();
        $(".startup-content span.third-content").hide().text("").slideDown();
        $("#help-link").attr("href", databaseConfigurationUrl);
        $("#system-settings-db-selection-container").show();
        $("#db-content-holder,#db-config-submit").show();
        $("#sql-existing-db-submit, .sql-server-existing-db").hide();
        $("#advanced_tab_db_name").hide();
        autoFocus("txt-servername");
        prefillDbNames();
        if (!isBoldBI) {
            hideDataStore();
        }

        var obj = document.getElementById("database-type");
        var itemsList = obj.ej2_instances[0].list.querySelectorAll('.e-list-item');
        if (isBoldReports && !IsOracleSupportReports) {
            itemsList[3].style.display = "none";
        }
        else if (isBoldReports && IsOracleSupportReports) {
            itemsList[3].style.display = "";
        }

        if (isBoldBI && !IsOracleSupportBi) {
            itemsList[3].style.display = "none";
        }
        else if (isBoldBI && IsOracleSupportBi) {
            itemsList[3].style.display = "";
        }
    }
}