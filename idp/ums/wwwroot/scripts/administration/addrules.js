$(document).ready(function () {
    addPlacehoder("#rules-add-dialog");
    createWaitingPopup('rules-add-dialog');
    var addRulesDialog = new ej.popups.Dialog({
        header: window.Server.App.LocalizationContent.AddRules,
        content: document.getElementById("dialog-container"),
        showCloseIcon: true,
        width: "500px",
        height: "auto",
        isModal: true,
        visible: false,
        closeOnEscape: true,
        animationSettings: { effect: 'Zoom' },
        close: "onRuleAddDialogClose",
    });
    addRulesDialog.appendTo("#rules-add-dialog");

    $.validator.addMethod("isRequired", function (value, element) {
        return !isEmptyOrWhitespace(value);
    }, window.Server.App.LocalizationContent.InvalidRuleName);

    $.validator.addMethod("hasWhiteSpaceExisits", function (value, element) {
        return !/\s/g.test(value);
    }, window.Server.App.LocalizationContent.RuleHasSpecialCharacter);

    $.validator.addMethod("isValidRuleName", function (value, element) {
        return /^[a-zA-Z0-9\s]+$/.test(value) && !/^\s/.test(value);
    }, window.Server.App.LocalizationContent.RuleHasSpecialCharacter);

    $.validator.addMethod("isIPaddressExists", function (value, element) {
        return !isIPAddressExists($.trim(value));
    }, window.Server.App.LocalizationContent.IPAddressExists);

    $.validator.addMethod("isRuleNameExists", function (value, element) {
        return !isRuleNameExists($.trim(value));
    }, window.Server.App.LocalizationContent.RuleNameExists);
    $.validator.addMethod("isValidIPAddress", function (value, element) {
        var ipType = $('input[name="ipaddress-type"]:checked').val();
        if (ipType === 'IPv4') {
            var ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/;
            if (!ipv4Regex.test(value)) {
                $.validator.messages.isValidIPAddress = window.Server.App.LocalizationContent.InvalidIPV4IPAddress;
                return false;
            }
        } else if (ipType === 'IPv6') {
            var ipv6Regex = /^(?:(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,7}:|(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}|(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}|(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}|(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:(?::[0-9a-fA-F]{1,4}){1,6}|:(?::[0-9a-fA-F]{1,4}){1,7}|::|(?:[0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])|::(?:ffff(?::0{1,4}){0,1}:){0,1}((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]))(?:%[0-9a-zA-Z]{1,})?$/;
            if (!ipv6Regex.test(value)) {
                $.validator.messages.isValidIPAddress = window.Server.App.LocalizationContent.InvalidIPV6IPAddress;
                return false;
            }
        } else {
            return false;
        }
        return true;
    }, window.Server.App.LocalizationContent.InvalidIPAddress);
    
    $("#dialog-container").validate({
        errorElement: 'span',
        onkeyup: function (element, event) {
            if (event.keyCode != 9) {
                isKeyUp = true;
                $(element).valid();
                isKeyUp = false;
            }
            else
                true;
        },
        onfocusout: function (element) { $(element).valid(); },
        rules: {
            "rule-name": {
                isRequired: true,
                isValidRuleName: true,
                isRuleNameExists: true,
            },
            "ip-address": {
                isRequired: true,
                isValidIPAddress: true,
                isIPaddressExists: true,
            },
        },
        highlight: function (element) {
            $(element).closest('div').addClass("has-error");
        },
        unhighlight: function (element) {
            $(element).closest('div').removeClass('has-error');
            $(element).closest('div').find("span.ruleadd-validation-messages").html("");
        },
        errorPlacement: function (error, element) {
            $(element).closest('div').find("span.ruleadd-validation-messages").html(error.html()).css("display", "block");
        },
        messages: {
            "rule-name": {
                isRequired: window.Server.App.LocalizationContent.InvalidRuleName,
            },
            "ip-address": {
                isRequired: window.Server.App.LocalizationContent.InvalidIPAddress,
                hasWhiteSpaceExisits: window.Server.App.LocalizationContent.RuleHasSpecialCharacter
            },
        }
    });

    $(document).on("keyup", "#dialog-container", function (e) {
        if (e.keyCode == 13) {
            if ($("#cancel-rule").is(":focus")) {
                onRuleAddDialogClose();
            } else if ($("#add-rule").is(":focus")) { e.preventDefault(); }
            else {
                $("input#add-rule").trigger("click");
            }
        }
    });

    $(document).on("click", "#create-rule", function () {
        if ($("#dialog-container").valid()) {
            $("#add-rule").removeAttr("disabled");
            $(".form input[type='text']").val('');
            var usergrid = document.getElementById('rules-grid').ej2_instances[0];
            usergrid.clearSelection();
            $(".validation").closest("div").removeClass("has-error");
            $(".ruleadd-validation-messages").css("display", "none");
        }
    });
    function isIPAddressExists(ipAddress) {
        if(isEditing) {
            if (ipAddress === existsIpAddress) {
                return false;
            }
        }
        if (dataSourceRule) {
            return dataSourceRule.some(function (rule) {
                return rule.IPAddress === ipAddress;
            });
        }
        return false;
    }
    function isRuleNameExists(ruleName) {
        if(isEditing) {
            if (ruleName === exisitingRuleName) {
                return false;
            }
            return dataSourceRule.some(function (rule) {
                return rule.RuleName.toLowerCase().toString() === ruleName.toLowerCase().toString();
            });
        }else{
            return dataSourceRule.some(function (rule) {
                return rule.RuleName.toLowerCase().toString() === ruleName.toLowerCase().toString();
            });
        }
    }

});

function onRuleAddDialogClose() {
    document.getElementById("rules-add-dialog").ej2_instances[0].hide();
    $(".form input[type='text']").val('');
    $("#dialog-container").find("div").removeClass("e-error");
}

function onRuleAddDialogOpen() {
    $("#add-rule").removeAttr("disabled");
    $(".dropdown").removeClass("open");
    document.getElementById("rules-add-dialog").ej2_instances[0].show();
    $(".e-dialog-icon").attr("title", "Close");
    $(".validation").closest("div").removeClass("has-error");
    $(".ruleadd-validation-messages").css("display", "none");
    $("#dialog-container").find("div").removeClass("e-error");

}

$(document).on("click", "#add-rule-btn", function () {
    isEditing = false;
    $('#rules-add-dialog_title').text("Add Rules");
    $("#add-rule").val("Add Rule");
    onRuleAddDialogOpen();
});
$(document).on("click", "#cancel-rule", function () {
    onRuleAddDialogClose();
});
