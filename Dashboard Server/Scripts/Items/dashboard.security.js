var itemInfo = "";
var isDomainSelected = false;
var isDialogBinded = false;
var isIpChipBinded = false;
var isDomainChipBinded = false;
var isChipChanged = false;
var isIPv6 = false;
var domainChipData = [];
var ipChipData = [];
var domainCount = 0;
var ipCount = 0;
var isChrome = navigator.userAgent.indexOf("Chrome") != -1;
var isEdge = navigator.userAgent.indexOf("Edge") != -1;
var isIE = browser != null && browser.name === "msie" && parseFloat(browser.version) >= 8.0;

function openItemSettingsDialog(itemDetail) {
    itemInfo = itemDetail;
    var dialogHeader = '<span class ="dialog-header-title">' + window.Server.App.LocalizationContent.Security + '</span>' + '<span class="dashboard-item-name">' + itemInfo.Name + '</span>';
    if (!isDialogBinded) {
        var createDialogId = document.createElement("div");
        createDialogId.setAttribute("id", "item-settings-dialog");
        var element = document.getElementById("dashboard-page-container");
        element.appendChild(createDialogId);
        var dialog = new ejs.popups.Dialog({
            header: dialogHeader,
            content: document.getElementById("itemsettings-dialog-content"),
            buttons: [
                {
                    'click': function (e) {
                        if (e.keyCode == keyCode.Enter) {
                            e.preventDefault();
                            return false;
                        }
                        saveItemSettings();
                    },
                    buttonModel: {
                        isPrimary: true,
                        disabled: true,
                        content: window.Server.App.LocalizationContent.SaveButton
                    }
                },
                {
                    'click': function () {
                        dialog.hide();
                        $(".domain-name-validation").hide();
                        $(".ip-address-validation").hide();
                        cancelItemSettings();
                        ClearSettingsFields();
                    },
                    buttonModel: {
                        content: window.Server.App.LocalizationContent.CancelButton
                    }
                }
            ],
            animationSettings: { effect: 'Zoom' },
            beforeOpen: beforeOpenSecurityDialog,
            width: '600px',
            showCloseIcon: true,
            isModal: true,
        });
        dialog.appendTo(createDialogId);
        isDialogBinded = true;
    }
    else {
        var dialog = document.getElementById("item-settings-dialog").ej2_instances;
        dialog[0].header = dialogHeader;
        dialog[0].show();
        $("#item-settings-dialog .e-primary").attr("disabled", "true");
    }
    ejs.popups.createSpinner({
        target: document.getElementById('item-settings-dialog')
    });
    ejs.popups.setSpinner({ type: 'Material' });
    ejs.popups.showSpinner(document.getElementById('item-settings-dialog'));
    getItemSettings();
    isChipChanged = false;
};

function beforeOpenSecurityDialog() {
    $("#itemsettings-dialog-content").show();
}

function saveItemSettings() {
    var domainInstance = document.getElementById("domain-chip-content").ej2_instances;
    var ipInstance = document.getElementById("ip-chip-content").ej2_instances;
    var setting = $("#select-option").val();
    var shareDashboardLink = $('<a/>', {
        href: getDashboardShareLink(itemInfo.Id, itemInfo.CategoryName, itemInfo.Name),
        target:"_blank",
        html: " " + itemInfo.Name + ".",
    });
    if (domainInstance != undefined) {
        var domainList = domainInstance[0].chips;
        if (domainList == null) {
            domainList = [];
        }
    } else {
        var domainList = [];
    }

    if (ipInstance != undefined) {
        var ipAddressList = ipInstance[0].chips;
        if (ipAddressList == null) {
            ipAddressList = [];
        }
    } else {
        var ipAddressList = [];
    }
    $.ajax({
        type: "POST",
        url: itemSettingsAccessUrl,
        data: {
            itemId: itemInfo.Id, ipAddressList: ipAddressList, domainList: domainList, setting: setting
        },
        success: function (Status) {
            if (Status.result) {
                SuccessAlert(window.Server.App.LocalizationContent.DashboardSecurity, window.Server.App.LocalizationContent.AddDashboardSecurity + shareDashboardLink[0].outerHTML, 7000);
            }
            else {
                WarningAlert(window.Server.App.LocalizationContent.DashboardSecurity, window.Server.App.LocalizationContent.SecurityFailed, 7000);
            }
            var dialog = document.getElementById("item-settings-dialog").ej2_instances;
            dialog[0].hide();
        }
    });
}

function ClearSettingsFields() {
    $("#domain-input-text").val("");
    var domainInstance = document.getElementById("domain-chip-content").ej2_instances;
    if (domainInstance == undefined && $("#domain-input-text").val().length == 0) {
        applyDomainContainer();
    }
    $("#ip-input-text").val("");
    var ipInstance = document.getElementById("ip-chip-content").ej2_instances;
    if (ipInstance == undefined && $("#ip-input-text").val().length == 0) {
        applyIpContainer();
    }
}

function getItemSettings() {
    domainChipData = [];
    ipChipData = [];
    getDomainInstance();
    getIpInstance();
    var itemId = itemInfo.Id;
    $.ajax({
        type: "POST",
        url: getItemSettingsUrl,
        data: {
            itemId: itemId
        },
        success: function (data) {
            if (data.Status) {

                $("#select-option").val(data.result.SecuritySettingScope).selectpicker("refresh");
                
                if (data.result.Domains != null) {
                    for (i = 0; i < data.result.Domains.length; i++) {
                        domainChipData[i] = data.result.Domains[i];
                        if (domainChipData[i].length != 0) {
                            domainChipConversion(domainChipData);
                        }
                    }
                    domainCount = data.result.Domains.length;
                }
                if (data.result.IPAddresses != null) {
                    for (i = 0; i < data.result.IPAddresses.length; i++) {
                        ipChipData[i] = data.result.IPAddresses[i];
                        if (ipChipData[i].length != 0) {
                            ipChipConversion(ipChipData);
                        }
                    }
                    ipCount = data.result.IPAddresses.length;
                }
            }
            ejs.popups.hideSpinner(document.getElementById('item-settings-dialog'));
        }
    });
}

$(document).on("keyup", "#domain-input-text", function (e) {
    if ($("#domain-input-text").length == 1) {
        $("#domain-input-text").focus();
    }
    if (e.keyCode == keyCode.Comma || (e.keyCode == keyCode.SemiColon && !e.shiftKey) || e.keyCode == keyCode.Enter) {
        var domainNames = $("#domain-input-text").val();
        isDomainSelected = true;
        objectConvertAsChip(domainNames);
    }
});

function objectConvertAsChip(inputValue) {
    if (inputValue.endsWith(",") || inputValue.endsWith(";") || inputValue.endsWith("\n")) {
        inputValue = inputValue.slice(0, -1).trim();
    }
    if (inputValue.length != 0) {
        if (isDomainSelected) {
            if (validateDomainName(inputValue)) {
                if (isAlreadyExists(inputValue)) {
                    domainChipData.push(inputValue);
                    domainChipConversion(domainChipData);
                    $(".domain-name-validation").hide();
                    enableSaveButton();
                }
            } else {
                $("#domain-input-text").val(inputValue);
                addDomainValidation();
            }
        }
        else {
            if (validateIpAddress(inputValue)) {
                if (!inputValue.contains("/")) {
                    if (isIPv6) {
                        inputValue = inputValue + "/128";
                    } else {
                        inputValue = inputValue + "/32";
                    }
                } 
                if (isIpAlreadyExistsorNot(inputValue)) {
                    ipChipData.push(inputValue);
                    ipChipConversion(ipChipData);
                    $(".ip-address-validation").hide();
                    enableSaveButton();
                }
            } else {
                $("#ip-input-text").val(inputValue);
                addIpValidation();
            }
        }
    } else { ClearSettingsFields(); }
}

function isAlreadyExists(obj) {
    var domainInstance = document.getElementById("domain-chip-content").ej2_instances;
    if (domainInstance != undefined && domainInstance[0].chips != 0 && domainInstance[0].chips != null) {
        for (i = 0; i < domainInstance[0].chips.length; i++) {
            if (domainInstance[0].chips[i].toLowerCase() == obj.toLowerCase()) {
                $("#domain-input-text").val("");
                return false;
            }
        }
    }
    return true;
}

function domainChipConversion(domainChipData) {
    if (!isDomainChipBinded) {
        new ejs.buttons.ChipList({ chips: domainChipData, enableDelete: true, delete: onDomainChipDelete }, '#domain-chip-content');
        isDomainChipBinded = true;
    } else {
        var domainInstance = document.getElementById("domain-chip-content").ej2_instances;
        domainInstance[0].chips = [];
        domainInstance[0].chips = domainChipData;
        domainInstance[0].createChip();
        domainInstance[0].refresh();
    }
    if ($("#domain-name-content").height() > 140) {
        var element = document.getElementById("domain-name-content");
        element.scrollTop = element.scrollHeight;
    }
    $("#domain-chip-content .e-chip-delete").addClass("domain-name");
    removeDomainContainer();
    applyDomainTooltip();
}

function removeDomainContainer() {
    $("#domain-input-text").css("width", "10%").removeAttr('placeholder').val("");
    $("#domain-chip-content").css("display", "inline");
}

$(document).on("keyup", "#domain-name-content", function (e) {
    var domainInstance = document.getElementById("domain-chip-content").ej2_instances;
    if (domainInstance != undefined && (domainInstance[0].chips == null || domainInstance[0].chips == 0)) {
        if ($("#domain-input-text").val() == "") {
            applyDomainContainer();
        }
        domainInstance[0].chips = [];
        setTimeout(function () {
            $("#domain-chip-content").html("");
        }, 100);
    } else if (domainInstance == undefined && $("#domain-input-text").val().length == 0) {
        applyDomainContainer();
    }
    setTimeout(function () {
        removeDomainValidation();
        checkSaveEnabled();
    }, 100);
});

function applyDomainContainer() {
    $("#domain-input-text").css("width", "100%").attr("placeholder", window.Server.App.LocalizationContent.DomainContent);
    $("#domain-chip-content").hide();
}

$(document).on("paste", "#domain-input-text", function (e) {
    if (isIE) {
        var data = window.clipboardData.getData('Text').trim();
    }
    else {
        var data = e.originalEvent.clipboardData.getData('Text').trim();
    }
    var content = data.split(/[\s,;\r?\n]+/);
    if (content.length > 1) {
        for (var i = 0; i < content.length; i++) {
            var value = content[i];
            if (isAlreadyExists(value) && value != "") {
                domainChipData.push(value);
                domainChipConversion(domainChipData);
            }
        }
        setTimeout(function () {
            $("#domain-input-text").val("");
            checkDomainValidation();
        }, 100);
    }
});

$(document).on("paste", "#ip-input-text", function (e) {
    if (isIE) {
        var data = window.clipboardData.getData('Text').trim();
    }
    else {
        var data = e.originalEvent.clipboardData.getData('Text').trim();
    }
    var content = data.split(/[\s,;\r?\n]+/);
    if (content.length > 1) {
        for (var i = 0; i < content.length; i++) {
            var value = content[i];
            if (validateIpAddress(value)) {
                if (!value.contains("/")) {
                    if (isIPv6) {
                        value = value + "/128";
                    } else {
                        value = value + "/32";
                    }
                }
            }
            if (isIpAlreadyExistsorNot(value) && value != "") {
                ipChipData.push(value);
                ipChipConversion(ipChipData);
            }
        }
        setTimeout(function () {
            $("#ip-input-text").val("");
            checkIpValidation();
        }, 100);
    }
});

function cancelItemSettings() {
    getDomainInstance();
    getIpInstance();
    ClearSettingsFields();
    domainCount = 0;
    ipCount = 0;
    $("#select-option").val("1").selectpicker("refresh");
}

function ipChipConversion(ipChipData) {
    if (!isIpChipBinded) {
        new ejs.buttons.ChipList({ chips: ipChipData, enableDelete: true, delete: onIpChipDelete }, '#ip-chip-content');
        isIpChipBinded = true;
    } else {
        var ipInstance = document.getElementById("ip-chip-content").ej2_instances;
        ipInstance[0].chips = [];
        ipInstance[0].chips = ipChipData;
        ipInstance[0].createChip();
        ipInstance[0].refresh();
    }
    if ($("#ip-address-content").height() > 140) {
        var element = document.getElementById("ip-address-content");
        element.scrollTop = element.scrollHeight;
    }
    removeIpContainer();
    applyIpTooltip();
}

function removeIpContainer() {
    $("#ip-input-text").css("width", "10%").removeAttr('placeholder').val("");
    $("#ip-chip-content").css("display", "inline");
}

$(document).on("keyup", "#ip-address-content", function (e) {
    var ipInstance = document.getElementById("ip-chip-content").ej2_instances;
    if (ipInstance != undefined && (ipInstance[0].chips == null || ipInstance[0].chips == 0)) {
        if ($("#ip-input-text").val() == "") {
            applyIpContainer();
        }
        ipInstance[0].chips = [];
        setTimeout(function () {
            $("#ip-chip-content").html("");
        }, 100);
    } else if (ipInstance == undefined && $("#ip-input-text").val().length == 0) {
        applyIpContainer();
    }

    setTimeout(function () {
        removeIpValidation();
        checkSaveEnabled();
    }, 100);
});

function applyIpContainer() {
    $("#ip-input-text").css("width", "100%").attr("placeholder", window.Server.App.LocalizationContent.IpContent);
    $("#ip-chip-content").hide();
}

function isIpAlreadyExistsorNot(obj) {
    var ipInstance = document.getElementById("ip-chip-content").ej2_instances;
    if (ipInstance != undefined && ipInstance[0].chips != 0 && ipInstance[0].chips != null) {
        for (i = 0; i < ipInstance[0].chips.length; i++) {
            if (ipInstance[0].chips[i] == obj) {
                $("#ip-input-text").val("");
                return false;
            }
        }
    }
    return true;
}

$(document).on("keyup", "#ip-input-text", function (e) {
    if (e.keyCode == keyCode.Comma || (e.keyCode == keyCode.SemiColon && !e.shiftKey) || e.keyCode == keyCode.Enter) {
        var ipAddress = $("#ip-input-text").val();
        isDomainSelected = false;
        objectConvertAsChip(ipAddress);
    }
});

function getDomainInstance() {
    var domainInstance = document.getElementById("domain-chip-content").ej2_instances;
    if (domainInstance != undefined) {
        domainInstance[0].chips = [];
        applyDomainContainer();
    }
    $("#domain-chip-content").html("");
}

function getIpInstance() {
    var ipInstance = document.getElementById("ip-chip-content").ej2_instances;
    if (ipInstance != undefined) {
        ipInstance[0].chips = [];
        applyIpContainer();
    }
    $("#ip-chip-content").html("");
}

function validateDomainName(domainName) {
    var regex = /(?=^.{4,253}$)(^((?!-)[a-zA-Z0-9-]{0,62}[a-zA-Z0-9]\.)+[a-zA-Z]{2,63}$)/;
    if (regex.test(domainName)) {
        return true;
    }
    else {
        var ipv4 = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (ipv4.test(domainName)) {
            return true;
        }
        return false;
    }
}

function validateIpAddress(ipAddress) {
    var subnet;
    var ipv4 = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    var ipv6 = /^s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]d|1dd|[1-9]?d)(.(25[0-5]|2[0-4]d|1dd|[1-9]?d)){3}))|:)))(%.+)?s*(\/([0-9]|[1-9][0-9]|1[0-1][0-9]|12[0-8]))?$/;
    if (ipAddress.contains("/")) {
        ipAddress = ipAddress.split("/");
        subnet = ipAddress[1];
        ipAddress = ipAddress[0];
    }

    if (ipv4.test(ipAddress)) {
        isIPv6 = false;
        if (typeof (subnet) != "undefined" && subnet > 32) {
            return false;
        }
        return true;
    } else if (ipv6.test(ipAddress)) {
        isIPv6 = true;
        if (typeof (subnet) != "undefined" && subnet > 128) {
            return false;
        }
        return true;
    }else {
        return false;
    }
}

function addDomainValidation() {
    $(".domain-name-validation").show();
    $("#item-settings-dialog .e-primary").attr("disabled", "true");
}

function addIpValidation() {
    $(".ip-address-validation").show();
    $("#item-settings-dialog .e-primary").attr("disabled", "true");
}

function checkDomainValidation() {
    var domainArray = $("#domain-chip-content .e-chip").toArray();
    var i = 0;
    $("#domain-chip-content .e-chip").each(function () {
        if (i < domainArray.length) {
            var value = $(domainArray[i]).find(".e-chip-text").text();
            var valid = validateDomainName(value);
            if (!valid) {
                $(this).addClass("chip-validation");
                addDomainValidation();
            }
            i++;
        }
    });
}

function checkIpValidation() {
    var ipArray = $("#ip-chip-content .e-chip").toArray();
    var i = 0;
    $("#ip-chip-content .e-chip").each(function () {
        if (i < ipArray.length) {
            var value = $(ipArray[i]).find(".e-chip-text").text();
            var valid = validateIpAddress(value);
            if (!valid) {
                $(this).addClass("chip-validation");
                addIpValidation();
            }
            i++;
        }
    });
}

$(document).on("focusin", "#domain-input-text", function () {
    $("#domain-name-content").addClass("focused");
});

$(document).on("focusout", "#domain-input-text", function () {
    var domainNames = $("#domain-input-text").val() + ",";
    if (domainNames.length > 1) {
        isDomainSelected = true;
        objectConvertAsChip(domainNames);
    }
    $("#domain-name-content").removeClass("focused");
});

$(document).on("focusin", "#ip-input-text", function () {
    $("#ip-address-content").addClass("focused");
});

$(document).on("focusout", "#ip-input-text", function () {
    var ipAddress = $("#ip-input-text").val() + ",";
    if (ipAddress.length > 1) {
        isDomainSelected = false;
        objectConvertAsChip(ipAddress);
    }
    $("#ip-address-content").removeClass("focused");
});

$(document).on("click", "#domain-name-content", function (e) {
    if (!$(e.target).hasClass("e-chip") && !$(e.target).hasClass("e-chip-text")) {
        $("#domain-input-text").focus();
    }
});

$(document).on("click", "#ip-address-content", function (e) {
    if (!$(e.target).hasClass("e-chip") && !$(e.target).hasClass("e-chip-text")) {
        $("#ip-input-text").focus();
    }
});

$(document).on("keypress", "#domain-input-text", function (e) {
    var inputValue = (($('#domain-input-text').val().length + 1) * 8);
    $("#domain-input-text").css("width", inputValue + 'px');
});

$(document).on("keypress", "#ip-input-text", function (e) {
    var inputValue = (($('#ip-input-text').val().length + 1) * 8);
    $("#ip-input-text").css("width", inputValue + 'px');
});

$(document).on("change", "#select-option", function (e) {
    enableSaveButton();
});

function enableSaveButton() {
    if (!$("#domain-chip-content .e-chip").hasClass("chip-validation") && !$("#ip-chip-content .e-chip").hasClass("chip-validation") && $("#domain-input-text").val() == "" && $("#ip-input-text").val() == "") {
        $("#item-settings-dialog .e-primary").removeAttr("disabled");
        isChipChanged = true;
    }
}

function applyDomainTooltip() {
    for (var i = 0; i < $("#domain-chip-content .e-chip").length; i++) {
        $("#domain-chip-content .e-chip")[i].setAttribute("data-toggle", "tooltip");
        $("#domain-chip-content .e-chip")[i].setAttribute("data-placement", "top");
        var value = $('#domain-chip-content .e-chip > .e-chip-text')[i].innerText;
        $("#domain-chip-content .e-chip")[i].setAttribute("data-original-title", value);
    }
    $('[data-toggle="tooltip"]').tooltip();
}

function applyIpTooltip() {
    for (var i = 0; i < $("#ip-chip-content .e-chip").length; i++) {
        $("#ip-chip-content .e-chip")[i].setAttribute("data-toggle", "tooltip");
        $("#ip-chip-content .e-chip")[i].setAttribute("data-placement", "top");
        var value = $('#ip-chip-content .e-chip > .e-chip-text')[i].innerText;
        $("#ip-chip-content .e-chip")[i].setAttribute("data-original-title", value);
    }
    $('[data-toggle="tooltip"]').tooltip();
}

$(document).on("keydown", "#domain-name-content", function (e) {
    if (e.keyCode == keyCode.BackSpace && $("#domain-input-text").val().length == 0) {
        if (!isChrome || !isEdge) {
            e.preventDefault();
        }
        var domainInstance = document.getElementById("domain-chip-content").ej2_instances;
        if (domainInstance != undefined && domainInstance[0].chips != 0 && domainInstance[0].chips != null) {
            if ($("#domain-chip-content > .e-chip:last").hasClass("e-focused")) {
                domainInstance[0].chips.pop();
                if (domainInstance[0].chips.length > 0) {
                    domainInstance[0].refresh();
                }
                applyDomainTooltip();
                checkDomainValidation();
                removeDomainValidation();
                checkSaveEnabled();
                $("#domain-input-text").focus();
            } else {
                $("#domain-chip-content > .e-chip:last").addClass("e-focused");
                $("#domain-chip-content > .e-chip:last").focus();
            }
            if (domainInstance[0].chips == null || domainInstance[0].chips.length == 0) {
                getDomainInstance();
            }
        }
    }
});

$(document).on("keydown", "#ip-address-content", function (e) {
    if (e.keyCode == keyCode.BackSpace && $("#ip-input-text").val().length == 0) {
        if (!isChrome || !isEdge) {
            e.preventDefault();
        }
        var ipInstance = document.getElementById("ip-chip-content").ej2_instances;
        if (ipInstance != undefined && ipInstance[0].chips != 0 && ipInstance[0].chips != null) {
            if ($("#ip-chip-content > .e-chip:last").hasClass("e-focused")) {
                ipInstance[0].chips.pop();
                if (ipInstance[0].chips.length > 0) {
                    ipInstance[0].refresh();
                }
                applyIpTooltip();
                checkIpValidation();
                removeIpValidation();
                checkSaveEnabled();
                $("#ip-input-text").focus();
            } else {
                $("#ip-chip-content > .e-chip:last").addClass("e-focused");
                $("#ip-chip-content > .e-chip:last").focus();
            }
            if (ipInstance[0].chips == null || ipInstance[0].chips.length == 0) {
                getIpInstance();
            }
        }
    }
});

function removeDomainValidation() {
    if (!$("#domain-chip-content .e-chip").hasClass("chip-validation") && $("#domain-input-text").val() == "") {
        $(".domain-name-validation").hide();
    }
}

function removeIpValidation() {
    if (!$("#ip-chip-content .e-chip").hasClass("chip-validation") && $("#ip-input-text").val() == "") {
        $(".ip-address-validation").hide();
    }
}

function checkSaveEnabled() {
    if ($("#domain-chip-content > .e-chip").length != domainCount || $("#ip-chip-content > .e-chip").length != ipCount && !isChipChanged) {
        enableSaveButton();
    } else if (isChipChanged) {
        enableSaveButton();
    }
}

function onDomainChipDelete() {
    $("#domain-input-text").focus();
    setTimeout(function () {
        removeDomainValidation();
        checkSaveEnabled();
    }, 100);
    $(".tooltip").hide();
    var domainInstance = document.getElementById("domain-chip-content").ej2_instances;
    if (domainInstance[0].chips.length == 1) {
        applyDomainContainer();
        $(".domain-name-validation").hide();
    }
}

function onIpChipDelete() {
    $("#ip-input-text").focus();
    setTimeout(function () {
        removeIpValidation();
        checkSaveEnabled();
    }, 100);
    $(".tooltip").hide();
    var ipInstance = document.getElementById("ip-chip-content").ej2_instances;
    if (ipInstance[0].chips.length == 1) {
        applyIpContainer();
        $(".ip-address-validation").hide();
    }
}

$(document).on("click", ".e-icon-dlg-close", function (e) {
    $(".domain-name-validation").hide();
    $(".ip-address-validation").hide();
    cancelItemSettings();
    ClearSettingsFields();
});